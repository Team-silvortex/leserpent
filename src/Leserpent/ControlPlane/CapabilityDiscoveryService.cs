using System.Net.Http.Json;
using System.Text.Json.Serialization;

namespace Leserpent.ControlPlane;

public sealed class CapabilityDiscoveryService(HttpClient httpClient)
{
    public async Task<CapabilityDiscoveryResult> DiscoverAsync(string endpoint, string? capabilityEndpoint, CancellationToken cancellationToken)
    {
        var capabilityUrl = BuildCapabilityUrl(endpoint, capabilityEndpoint);
        try
        {
            var payload = await httpClient.GetFromJsonAsync<GewyvernCapabilityPayload>(capabilityUrl, cancellationToken);
            if (payload is null)
            {
                return CapabilityDiscoveryResult.Failed(capabilityUrl, "failed to decode gewyvern capability payload");
            }

            var capabilities = new List<RuntimeCapability>
            {
                new("api.latest_snapshot", payload.LatestSnapshot ? "fully_supported" : "not_supported", "runtime publishes latest snapshot metadata and JSON surfaces"),
                new("api.target_routing", "fully_supported", $"target routing uses {payload.TargetPathSegmentEncoding} path encoding"),
                new("api.external_sidecar_context", payload.ExternalSidecarContext ? "fully_supported" : "not_supported", "runtime can expose additive nearby sidecar collaboration context"),
                new("runtime.serve_required", payload.ServeRequired ? "fully_supported" : "not_supported", "runtime requires standalone serve mode for latest-snapshot API access")
            };

            var endpointSet = payload.Endpoints ?? Array.Empty<string>();
            AddEndpointCapability(capabilities, endpointSet, "/v1/latest/meta", "api.latest.meta", "latest snapshot metadata surface");
            AddEndpointCapability(capabilities, endpointSet, "/v1/latest/targets", "api.latest.targets", "latest target index surface");
            AddEndpointCapability(capabilities, endpointSet, "/v1/latest/summary.json", "api.summary_json", "machine-facing summary JSON surface");
            AddEndpointCapability(capabilities, endpointSet, "/v1/latest/analysis.json", "api.analysis_json", "machine-facing analysis JSON surface");
            AddEndpointCapability(capabilities, endpointSet, "/v1/latest/report.html", "api.report_html", "human-facing HTML report surface");

            return CapabilityDiscoveryResult.Succeeded(
                capabilityUrl,
                capabilities.OrderBy(capability => capability.Key, StringComparer.OrdinalIgnoreCase).ToArray());
        }
        catch (Exception ex)
        {
            return CapabilityDiscoveryResult.Failed(capabilityUrl, ex.Message);
        }
    }

    public async Task<RuntimeStatusDiscoveryResult> DiscoverStatusAsync(string endpoint, string? statusEndpoint, CancellationToken cancellationToken)
    {
        var statusUrl = BuildStatusUrl(endpoint, statusEndpoint);
        try
        {
            var payload = await httpClient.GetFromJsonAsync<GewyvernLatestMetaPayload>(statusUrl, cancellationToken);
            if (payload is null)
            {
                return RuntimeStatusDiscoveryResult.Failed(statusUrl, "failed to decode gewyvern latest-meta payload");
            }

            return RuntimeStatusDiscoveryResult.Succeeded(
                statusUrl,
                new RuntimeStatusSnapshot(
                    "gewyvern-api",
                    DateTimeOffset.UtcNow,
                    null,
                    true,
                    payload.Kind,
                    payload.TargetCount,
                    payload.HasSummaryJson,
                    payload.HasAnalysisJson,
                    payload.HasExternalSidecarContext,
                    payload.HasExternalEvidenceChainEnrichment,
                    payload.HasExternalDiagnosticOpinion));
        }
        catch (Exception ex)
        {
            return RuntimeStatusDiscoveryResult.Failed(statusUrl, ex.Message);
        }
    }

    public async Task<RuntimeSidecarDiscoveryResult> DiscoverSidecarStatusAsync(
        string sidecarEndpoint,
        string? sidecarStatusEndpoint,
        CancellationToken cancellationToken)
    {
        var healthUrl = BuildSidecarHealthUrl(sidecarEndpoint);
        var statusUrl = BuildSidecarStatusUrl(sidecarEndpoint, sidecarStatusEndpoint);
        var enrichmentUrl = BuildSidecarEnrichmentUrl(sidecarEndpoint);
        var opinionUrl = BuildSidecarOpinionUrl(sidecarEndpoint);

        try
        {
            var healthPayload = await httpClient.GetFromJsonAsync<EtragonHealthPayload>(healthUrl, cancellationToken);
            if (healthPayload is null || !string.Equals(healthPayload.Status, "ok", StringComparison.OrdinalIgnoreCase))
            {
                return RuntimeSidecarDiscoveryResult.Failed(statusUrl, "failed to decode etragon health payload");
            }

            var statusPayload = await httpClient.GetFromJsonAsync<EtragonLatestStatusPayload>(statusUrl, cancellationToken);
            if (statusPayload is null)
            {
                return RuntimeSidecarDiscoveryResult.Failed(statusUrl, "failed to decode etragon latest-status payload");
            }

            var hasEnrichment = await EndpointReturnsUsefulBodyAsync(enrichmentUrl, cancellationToken);
            var hasOpinion = await EndpointReturnsUsefulBodyAsync(opinionUrl, cancellationToken);

            return RuntimeSidecarDiscoveryResult.Succeeded(
                statusUrl,
                new RuntimeSidecarStatusSnapshot(
                    "etragon-api",
                    DateTimeOffset.UtcNow,
                    null,
                    true,
                    NormalizeSidecarDaemonStatus(statusPayload.Status),
                    statusPayload.TargetCount,
                    statusPayload.LearningActive,
                    statusPayload.LearnedRoutes,
                    hasEnrichment,
                    hasOpinion,
                    statusPayload.LastError));
        }
        catch (Exception ex)
        {
            return RuntimeSidecarDiscoveryResult.Failed(statusUrl, ex.Message);
        }
    }

    private static void AddEndpointCapability(List<RuntimeCapability> capabilities, IReadOnlyList<string> endpoints, string path, string key, string description)
    {
        capabilities.Add(new RuntimeCapability(
            key,
            endpoints.Contains(path, StringComparer.OrdinalIgnoreCase) ? "fully_supported" : "not_supported",
            description));
    }

    private static string BuildCapabilityUrl(string endpoint, string? capabilityEndpoint)
    {
        if (!string.IsNullOrWhiteSpace(capabilityEndpoint))
        {
            return capabilityEndpoint.Trim();
        }

        return endpoint.TrimEnd('/') + "/v1/capabilities";
    }

    private static string BuildStatusUrl(string endpoint, string? statusEndpoint)
    {
        if (!string.IsNullOrWhiteSpace(statusEndpoint))
        {
            return statusEndpoint.Trim();
        }

        return endpoint.TrimEnd('/') + "/v1/latest/meta";
    }

    private static string BuildSidecarHealthUrl(string sidecarEndpoint) =>
        sidecarEndpoint.TrimEnd('/') + "/health";

    private static string BuildSidecarStatusUrl(string sidecarEndpoint, string? sidecarStatusEndpoint)
    {
        if (!string.IsNullOrWhiteSpace(sidecarStatusEndpoint))
        {
            return sidecarStatusEndpoint.Trim();
        }

        return sidecarEndpoint.TrimEnd('/') + "/v1/latest/status";
    }

    private static string BuildSidecarEnrichmentUrl(string sidecarEndpoint) =>
        sidecarEndpoint.TrimEnd('/') + "/v1/latest/evidence-chain-enrichment.json";

    private static string BuildSidecarOpinionUrl(string sidecarEndpoint) =>
        sidecarEndpoint.TrimEnd('/') + "/v1/latest/diagnostic-opinion.json";

    private async Task<bool> EndpointReturnsUsefulBodyAsync(string url, CancellationToken cancellationToken)
    {
        try
        {
            using var response = await httpClient.GetAsync(url, cancellationToken);
            if (!response.IsSuccessStatusCode)
            {
                return false;
            }

            var body = (await response.Content.ReadAsStringAsync(cancellationToken)).Trim();
            return !string.IsNullOrWhiteSpace(body)
                && !string.Equals(body, "null", StringComparison.OrdinalIgnoreCase)
                && !string.Equals(body, "{}", StringComparison.OrdinalIgnoreCase);
        }
        catch
        {
            return false;
        }
    }

    private static string NormalizeSidecarDaemonStatus(string? status)
    {
        if (string.IsNullOrWhiteSpace(status))
        {
            return "unknown";
        }

        return status.Trim().ToLowerInvariant() switch
        {
            "ready" => "ready",
            "degraded" => "degraded",
            "starting" => "starting",
            _ => "unknown",
        };
    }

    private sealed record GewyvernCapabilityPayload(
        [property: JsonPropertyName("service")] string Service,
        [property: JsonPropertyName("version")] string Version,
        [property: JsonPropertyName("latest_snapshot")] bool LatestSnapshot,
        [property: JsonPropertyName("serve_required")] bool ServeRequired,
        [property: JsonPropertyName("external_sidecar_context")] bool ExternalSidecarContext,
        [property: JsonPropertyName("target_path_segment_encoding")] string TargetPathSegmentEncoding,
        [property: JsonPropertyName("endpoints")] string[] Endpoints
    );

    private sealed record GewyvernLatestMetaPayload(
        [property: JsonPropertyName("kind")] string? Kind,
        [property: JsonPropertyName("target_count")] int? TargetCount,
        [property: JsonPropertyName("has_summary_json")] bool HasSummaryJson,
        [property: JsonPropertyName("has_analysis_json")] bool HasAnalysisJson,
        [property: JsonPropertyName("has_external_sidecar_context")] bool HasExternalSidecarContext,
        [property: JsonPropertyName("has_external_evidence_chain_enrichment")] bool HasExternalEvidenceChainEnrichment,
        [property: JsonPropertyName("has_external_diagnostic_opinion")] bool HasExternalDiagnosticOpinion
    );

    private sealed record EtragonHealthPayload(
        [property: JsonPropertyName("status")] string Status
    );

    private sealed record EtragonLatestStatusPayload(
        [property: JsonPropertyName("status")] string? Status,
        [property: JsonPropertyName("target_count")] int? TargetCount,
        [property: JsonPropertyName("learning_active")] bool LearningActive,
        [property: JsonPropertyName("learned_routes")] int LearnedRoutes,
        [property: JsonPropertyName("last_error")] string? LastError
    );
}

public sealed record CapabilityDiscoveryResult(
    string CapabilityEndpoint,
    IReadOnlyList<RuntimeCapability> Capabilities,
    string CapabilitySource,
    DateTimeOffset? CapabilityFetchedAt,
    string? CapabilityFetchError)
{
    public static CapabilityDiscoveryResult Succeeded(string capabilityEndpoint, IReadOnlyList<RuntimeCapability> capabilities) =>
        new(capabilityEndpoint, capabilities, "gewyvern-api", DateTimeOffset.UtcNow, null);

    public static CapabilityDiscoveryResult Failed(string capabilityEndpoint, string error) =>
        new(capabilityEndpoint, Array.Empty<RuntimeCapability>(), "fetch_failed", null, error);
}

public sealed record RuntimeStatusDiscoveryResult(
    string StatusEndpoint,
    RuntimeStatusSnapshot Status)
{
    public static RuntimeStatusDiscoveryResult Succeeded(string statusEndpoint, RuntimeStatusSnapshot status) =>
        new(statusEndpoint, status);

    public static RuntimeStatusDiscoveryResult Failed(string statusEndpoint, string error) =>
        new(statusEndpoint, new RuntimeStatusSnapshot(
            "fetch_failed",
            null,
            error,
            false,
            null,
            null,
            false,
            false,
            false,
            false,
            false));
}

public sealed record RuntimeSidecarDiscoveryResult(
    string StatusEndpoint,
    RuntimeSidecarStatusSnapshot? SidecarStatus)
{
    public static RuntimeSidecarDiscoveryResult Succeeded(string statusEndpoint, RuntimeSidecarStatusSnapshot status) =>
        new(statusEndpoint, status);

    public static RuntimeSidecarDiscoveryResult Failed(string statusEndpoint, string error) =>
        new(statusEndpoint, new RuntimeSidecarStatusSnapshot(
            "fetch_failed",
            null,
            error,
            false,
            "fetch_failed",
            null,
            false,
            0,
            false,
            false,
            error));
}
