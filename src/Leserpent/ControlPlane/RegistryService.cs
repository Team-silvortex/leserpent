using System.Collections.Concurrent;

namespace Leserpent.ControlPlane;

public sealed class RegistryService
{
    private readonly ConcurrentDictionary<string, RuntimeRecord> runtimes = new();
    private readonly ConcurrentDictionary<string, SessionRecord> sessions = new();
    private readonly ControlPlaneStateStore stateStore;
    private readonly DateTimeOffset? restoredFromSavedAt;

    public int RestoredRuntimeCount { get; }
    public int RestoredSessionCount { get; }
    public DateTimeOffset? RestoredFromSavedAt => restoredFromSavedAt;

    public RegistryService(ControlPlaneStateStore stateStore)
    {
        this.stateStore = stateStore;
        var loaded = stateStore.Load();
        restoredFromSavedAt = loaded?.SavedAt;
        (RestoredRuntimeCount, RestoredSessionCount) = RestorePersistedState(loaded);
    }

    public RuntimeRegistrationResponse RegisterRuntime(RuntimeRegistrationRequest request)
    {
        var capabilities = NormalizeCapabilities(request.Capabilities);
        var capabilitySource = request.FetchCapabilities ? "gewyvern-api" : "manual";
        DateTimeOffset? capabilityFetchedAt = request.FetchCapabilities ? DateTimeOffset.UtcNow : null;
        var status = new RuntimeStatusSnapshot(
            "unobserved",
            null,
            null,
            false,
            null,
            null,
            false,
            false,
            false,
            false,
            false);
        return RegisterRuntimeInternal(request, capabilities, capabilitySource, capabilityFetchedAt, null, status, null);
    }

    public RuntimeRegistrationResponse RegisterRuntimeFromDiscovery(
        RuntimeRegistrationRequest request,
        CapabilityDiscoveryResult capabilityDiscovery,
        RuntimeStatusDiscoveryResult statusDiscovery,
        RuntimeSidecarDiscoveryResult? sidecarDiscovery = null)
    {
        var capabilities = capabilityDiscovery.Capabilities.Count > 0
            ? NormalizeCapabilities(capabilityDiscovery.Capabilities)
            : NormalizeCapabilities(request.Capabilities);
        var capabilitySource = capabilityDiscovery.Capabilities.Count > 0
            ? capabilityDiscovery.CapabilitySource
            : "manual";
        return RegisterRuntimeInternal(
            request,
            capabilities,
            capabilitySource,
            capabilityDiscovery.CapabilityFetchedAt,
            capabilityDiscovery.CapabilityFetchError,
            statusDiscovery.Status,
            sidecarDiscovery?.SidecarStatus);
    }

    public IReadOnlyList<RuntimeSummary> ListRuntimes(RuntimeListFilter? filter = null) =>
        runtimes.Values
            .Where(runtime => MatchesFilter(runtime, filter))
            .OrderBy(runtime => runtime.Name, StringComparer.OrdinalIgnoreCase)
            .Select(runtime => runtime.ToSummary())
            .ToArray();

    public RuntimeSummary? GetRuntime(string runtimeId) =>
        runtimes.TryGetValue(runtimeId, out var runtime) ? runtime.ToSummary() : null;

    public RuntimeAttentionView? GetRuntimeAttention(string runtimeId)
    {
        if (!runtimes.TryGetValue(runtimeId, out var runtime))
        {
            return null;
        }

        var reasons = GetAttentionReasons(runtime.Status, runtime.SidecarStatus);
        return new RuntimeAttentionView(
            runtime.RuntimeId,
            runtime.Name,
            runtime.Endpoint,
            runtime.Tags,
            runtime.Status,
            reasons.Count > 0,
            reasons.Count > 0 ? GetAttentionSeverity(reasons) : "none",
            reasons);
    }

    public FleetSummary GetFleetSummary(RuntimeListFilter? filter = null)
    {
        var values = runtimes.Values
            .Where(runtime => MatchesFilter(runtime, filter))
            .ToArray();
        var snapshotKindCounts = values
            .Where(runtime => runtime.Status.HasLatestSnapshot && !string.IsNullOrWhiteSpace(runtime.Status.SnapshotKind))
            .GroupBy(runtime => runtime.Status.SnapshotKind!, StringComparer.OrdinalIgnoreCase)
            .OrderBy(group => group.Key, StringComparer.OrdinalIgnoreCase)
            .ToDictionary(group => group.Key, group => group.Count(), StringComparer.OrdinalIgnoreCase);
        var statusSourceCounts = values
            .Where(runtime => !string.IsNullOrWhiteSpace(runtime.Status.StatusSource))
            .GroupBy(runtime => runtime.Status.StatusSource, StringComparer.OrdinalIgnoreCase)
            .OrderBy(group => group.Key, StringComparer.OrdinalIgnoreCase)
            .ToDictionary(group => group.Key, group => group.Count(), StringComparer.OrdinalIgnoreCase);
        var sidecarStatusSourceCounts = values
            .Where(runtime => runtime.SidecarStatus is not null && !string.IsNullOrWhiteSpace(runtime.SidecarStatus.StatusSource))
            .GroupBy(runtime => runtime.SidecarStatus!.StatusSource, StringComparer.OrdinalIgnoreCase)
            .OrderBy(group => group.Key, StringComparer.OrdinalIgnoreCase)
            .ToDictionary(group => group.Key, group => group.Count(), StringComparer.OrdinalIgnoreCase);
        var environmentCounts = BuildTagCounts(values, runtime => runtime.Tags.Environment);
        var clusterCounts = BuildTagCounts(values, runtime => runtime.Tags.Cluster);
        var roleCounts = BuildTagCounts(values, runtime => runtime.Tags.Role);

        return new FleetSummary(
            values.Length,
            values.Count(runtime => runtime.Status.HasLatestSnapshot),
            values.Count(runtime => runtime.Status.HasSummaryJson),
            values.Count(runtime => runtime.Status.HasAnalysisJson),
            values.Count(runtime => runtime.Status.HasExternalSidecarContext),
            values.Count(runtime => runtime.Status.HasExternalEvidenceChainEnrichment),
            values.Count(runtime => runtime.Status.HasExternalDiagnosticOpinion),
            values.Count(runtime => !string.Equals(runtime.Status.StatusSource, "unobserved", StringComparison.OrdinalIgnoreCase)),
            values.Count(runtime => string.Equals(runtime.Status.StatusSource, "fetch_failed", StringComparison.OrdinalIgnoreCase)),
            values.Count(runtime => !string.IsNullOrWhiteSpace(runtime.SidecarEndpoint)),
            values.Count(runtime => runtime.SidecarStatus?.Healthy == true),
            values.Count(runtime => runtime.SidecarStatus is not null && !string.Equals(runtime.SidecarStatus.StatusSource, "unobserved", StringComparison.OrdinalIgnoreCase)),
            values.Count(runtime => string.Equals(runtime.SidecarStatus?.StatusSource, "fetch_failed", StringComparison.OrdinalIgnoreCase)),
            values.Count(runtime => runtime.SidecarStatus?.HasEvidenceChainEnrichment == true),
            values.Count(runtime => runtime.SidecarStatus?.HasDiagnosticOpinion == true),
            snapshotKindCounts,
            statusSourceCounts,
            sidecarStatusSourceCounts,
            environmentCounts,
            clusterCounts,
            roleCounts);
    }

    public IReadOnlyList<RuntimeAttentionItem> GetRuntimesNeedingAttention(RuntimeListFilter? filter = null) =>
        runtimes.Values
            .Where(runtime => MatchesFilter(runtime, filter))
            .Select(runtime =>
            {
                var reasons = GetAttentionReasons(runtime.Status, runtime.SidecarStatus);
                return new RuntimeAttentionItem(
                    runtime.RuntimeId,
                    runtime.Name,
                    runtime.Endpoint,
                    runtime.Tags,
                    runtime.Status,
                    GetAttentionSeverity(reasons),
                    reasons);
            })
            .Where(item => item.Reasons.Count > 0)
            .OrderByDescending(item => AttentionSeverityRank(item.Severity))
            .ThenBy(item => item.Name, StringComparer.OrdinalIgnoreCase)
            .ToArray();

    public FleetAttentionSummary GetFleetAttentionSummary(RuntimeListFilter? filter = null)
    {
        var items = GetRuntimesNeedingAttention(filter);
        var reasonCounts = items
            .SelectMany(item => item.Reasons)
            .GroupBy(reason => reason, StringComparer.OrdinalIgnoreCase)
            .OrderByDescending(group => group.Count())
            .ThenBy(group => group.Key, StringComparer.OrdinalIgnoreCase)
            .ToDictionary(group => group.Key, group => group.Count(), StringComparer.OrdinalIgnoreCase);

        return new FleetAttentionSummary(
            items.Count(item => string.Equals(item.Severity, "critical", StringComparison.OrdinalIgnoreCase)),
            items.Count(item => string.Equals(item.Severity, "warning", StringComparison.OrdinalIgnoreCase)),
            reasonCounts);
    }

    public DateTimeOffset SaveNow()
    {
        PersistState();
        return stateStore.LastSavedAt ?? DateTimeOffset.UtcNow;
    }

    public PersistedControlPlaneState ExportState() =>
        stateStore.CreateState(
            runtimes.Values
                .OrderBy(runtime => runtime.Name, StringComparer.OrdinalIgnoreCase)
                .Select(runtime => runtime.ToPersistedState())
                .ToArray(),
            sessions.Values
                .OrderByDescending(session => session.CreatedAt)
                .Select(session => session.ToPersistedState())
                .ToArray());

    public PersistenceImportResponse ImportState(PersistedControlPlaneState state)
    {
        if (!stateStore.IsCompatible(state))
        {
            throw new InvalidOperationException(
                $"imported state schema {state.SchemaVersion} is not compatible with schema {stateStore.SchemaVersion}");
        }

        runtimes.Clear();
        sessions.Clear();
        var (runtimeCount, sessionCount) = RestorePersistedState(state);
        PersistState();
        return new PersistenceImportResponse(
            true,
            runtimeCount,
            sessionCount,
            stateStore.LastSavedAt ?? DateTimeOffset.UtcNow,
            state.SavedAt);
    }

    public RuntimeCapabilityRefreshResponse? RefreshRuntimeCapabilities(string runtimeId, CapabilityDiscoveryResult discovery)
    {
        if (!runtimes.TryGetValue(runtimeId, out var runtime))
        {
            return null;
        }

        var updated = runtime with
        {
            Capabilities = discovery.Capabilities.Count > 0
                ? NormalizeCapabilities(discovery.Capabilities)
                : runtime.Capabilities,
            CapabilitySource = discovery.Capabilities.Count > 0 ? discovery.CapabilitySource : runtime.CapabilitySource,
            CapabilityFetchedAt = discovery.CapabilityFetchedAt,
            CapabilityFetchError = discovery.CapabilityFetchError,
            UpdatedAt = DateTimeOffset.UtcNow,
        };
        runtimes[runtimeId] = updated;
        PersistState();
        return new RuntimeCapabilityRefreshResponse(
            updated.RuntimeId,
            updated.Name,
            updated.Endpoint,
            updated.Capabilities,
            updated.CapabilitySource,
            updated.CapabilityFetchedAt,
            updated.CapabilityFetchError);
    }

    public RuntimeStatusRefreshResponse? RefreshRuntimeStatus(string runtimeId, RuntimeStatusDiscoveryResult discovery)
    {
        if (!runtimes.TryGetValue(runtimeId, out var runtime))
        {
            return null;
        }

        var updated = runtime with
        {
            Status = discovery.Status,
            UpdatedAt = DateTimeOffset.UtcNow,
        };
        runtimes[runtimeId] = updated;
        PersistState();
        return new RuntimeStatusRefreshResponse(
            updated.RuntimeId,
            updated.Name,
            updated.Endpoint,
            updated.Status);
    }

    public RuntimeSidecarRefreshResponse? RefreshRuntimeSidecar(string runtimeId, RuntimeSidecarDiscoveryResult discovery)
    {
        if (!runtimes.TryGetValue(runtimeId, out var runtime))
        {
            return null;
        }

        var updated = runtime with
        {
            SidecarStatus = discovery.SidecarStatus,
            UpdatedAt = DateTimeOffset.UtcNow,
        };
        runtimes[runtimeId] = updated;
        PersistState();
        return new RuntimeSidecarRefreshResponse(
            updated.RuntimeId,
            updated.Name,
            updated.Endpoint,
            updated.SidecarEndpoint,
            updated.SidecarStatus);
    }

    public (SessionSummary? Session, IReadOnlyList<CapabilityRejection> Rejections, string? RuntimeMissing)
        CreateSession(SessionCreateRequest request)
    {
        if (!runtimes.TryGetValue(request.RuntimeId, out var runtime))
        {
            return (null, Array.Empty<CapabilityRejection>(), request.RuntimeId);
        }

        var normalizedRequirements = NormalizeRequirements(request.Requirements);
        var rejections = EvaluateRequirements(runtime.Capabilities, normalizedRequirements);
        if (rejections.Count > 0)
        {
            return (null, rejections, null);
        }

        var now = DateTimeOffset.UtcNow;
        var created = new SessionRecord(
            Guid.NewGuid().ToString("n"),
            runtime.RuntimeId,
            request.PipelineKind.Trim(),
            request.RequestedBy.Trim(),
            "running",
            now,
            now,
            normalizedRequirements);
        sessions[created.SessionId] = created;
        PersistState();
        return (created.ToSummary(), Array.Empty<CapabilityRejection>(), null);
    }

    public IReadOnlyList<SessionSummary> ListSessions() =>
        sessions.Values
            .OrderByDescending(session => session.CreatedAt)
            .Select(session => session.ToSummary())
            .ToArray();

    public SessionSummary? GetSession(string sessionId) =>
        sessions.TryGetValue(sessionId, out var session) ? session.ToSummary() : null;

    public SessionSummary? StopSession(string sessionId)
    {
        if (!sessions.TryGetValue(sessionId, out var session))
        {
            return null;
        }

        var updated = session with
        {
            Status = "stopped",
            UpdatedAt = DateTimeOffset.UtcNow,
        };
        sessions[sessionId] = updated;
        PersistState();
        return updated.ToSummary();
    }

    private RuntimeRegistrationResponse RegisterRuntimeInternal(
        RuntimeRegistrationRequest request,
        IReadOnlyList<RuntimeCapability> capabilities,
        string capabilitySource,
        DateTimeOffset? capabilityFetchedAt,
        string? capabilityFetchError,
        RuntimeStatusSnapshot status,
        RuntimeSidecarStatusSnapshot? sidecarStatus)
    {
        var now = DateTimeOffset.UtcNow;
        var tags = NormalizeTags(request.Tags);
        var existing = runtimes.Values.FirstOrDefault(runtime =>
            string.Equals(runtime.Name, request.Name, StringComparison.OrdinalIgnoreCase));

        if (existing is not null)
        {
            var updated = existing with
            {
                Endpoint = request.Endpoint.Trim(),
                SidecarEndpoint = NormalizeOptionalEndpoint(request.SidecarEndpoint),
                PairingToken = request.PairingToken.Trim(),
                Capabilities = capabilities,
                CapabilitySource = capabilitySource,
                CapabilityFetchedAt = capabilityFetchedAt,
                CapabilityFetchError = capabilityFetchError,
                Tags = tags,
                Status = status,
                SidecarStatus = sidecarStatus,
                UpdatedAt = now,
            };
            runtimes[existing.RuntimeId] = updated;
            PersistState();
            return updated.ToRegistrationResponse();
        }

        var created = new RuntimeRecord(
            Guid.NewGuid().ToString("n"),
            request.Name.Trim(),
            request.Endpoint.Trim(),
            NormalizeOptionalEndpoint(request.SidecarEndpoint),
            request.PairingToken.Trim(),
            now,
            now,
            capabilities,
            capabilitySource,
            capabilityFetchedAt,
            capabilityFetchError,
            tags,
            status,
            sidecarStatus);
        runtimes[created.RuntimeId] = created;
        PersistState();
        return created.ToRegistrationResponse();
    }

    private (int RuntimeCount, int SessionCount) RestorePersistedState(PersistedControlPlaneState? state)
    {
        if (state is null)
        {
            return (0, 0);
        }

        var restoredRuntimeCount = 0;
        foreach (var runtime in state.Runtimes)
        {
            var restored = new RuntimeRecord(
                runtime.RuntimeId,
                runtime.Name.Trim(),
                runtime.Endpoint.Trim(),
                NormalizeOptionalEndpoint(runtime.SidecarEndpoint),
                runtime.PairingToken.Trim(),
                runtime.RegisteredAt,
                runtime.UpdatedAt,
                NormalizeCapabilities(runtime.Capabilities),
                string.IsNullOrWhiteSpace(runtime.CapabilitySource) ? "manual" : runtime.CapabilitySource.Trim(),
                runtime.CapabilityFetchedAt,
                runtime.CapabilityFetchError,
                NormalizeTags(runtime.Tags),
                runtime.Status,
                runtime.SidecarStatus);
            runtimes[restored.RuntimeId] = restored;
            restoredRuntimeCount += 1;
        }

        var restoredSessionCount = 0;
        foreach (var session in state.Sessions)
        {
            var restored = new SessionRecord(
                session.SessionId,
                session.RuntimeId.Trim(),
                session.PipelineKind.Trim(),
                session.RequestedBy.Trim(),
                session.Status.Trim(),
                session.CreatedAt,
                session.UpdatedAt,
                NormalizeRequirements(session.Requirements));
            sessions[restored.SessionId] = restored;
            restoredSessionCount += 1;
        }

        return (restoredRuntimeCount, restoredSessionCount);
    }

    private void PersistState()
    {
        var state = ExportState();
        stateStore.Save(state.Runtimes, state.Sessions);
    }

    private static IReadOnlyList<RuntimeCapability> NormalizeCapabilities(
        IReadOnlyList<RuntimeCapability> capabilities) =>
        capabilities
            .Where(capability => !string.IsNullOrWhiteSpace(capability.Key))
            .Select(capability => capability with
            {
                Key = capability.Key.Trim(),
                Support = NormalizeSupport(capability.Support),
                Description = capability.Description.Trim(),
            })
            .OrderBy(capability => capability.Key, StringComparer.OrdinalIgnoreCase)
            .ToArray();

    private static IReadOnlyList<SessionCapabilityRequirement> NormalizeRequirements(
        IReadOnlyList<SessionCapabilityRequirement> requirements) =>
        requirements
            .Where(requirement => !string.IsNullOrWhiteSpace(requirement.Key))
            .Select(requirement => requirement with
            {
                Key = requirement.Key.Trim(),
                MinimumSupport = NormalizeSupport(requirement.MinimumSupport),
            })
            .OrderBy(requirement => requirement.Key, StringComparer.OrdinalIgnoreCase)
            .ToArray();

    private static RuntimeTags NormalizeTags(RuntimeTags? tags) =>
        new(
            NormalizeTagValue(tags?.Environment),
            NormalizeTagValue(tags?.Cluster),
            NormalizeTagValue(tags?.Role));

    private static string? NormalizeTagValue(string? value)
    {
        if (string.IsNullOrWhiteSpace(value))
        {
            return null;
        }

        return value.Trim();
    }

    private static bool MatchesFilter(RuntimeRecord runtime, RuntimeListFilter? filter)
    {
        if (filter is null)
        {
            return true;
        }

        return MatchesTag(runtime.Tags.Environment, filter.Environment)
            && MatchesTag(runtime.Tags.Cluster, filter.Cluster)
            && MatchesTag(runtime.Tags.Role, filter.Role);
    }

    private static bool MatchesTag(string? actual, string? expected)
    {
        if (string.IsNullOrWhiteSpace(expected))
        {
            return true;
        }

        if (string.IsNullOrWhiteSpace(actual))
        {
            return false;
        }

        return string.Equals(actual, expected.Trim(), StringComparison.OrdinalIgnoreCase);
    }

    private static IReadOnlyList<string> GetAttentionReasons(
        RuntimeStatusSnapshot status,
        RuntimeSidecarStatusSnapshot? sidecarStatus)
    {
        var reasons = new List<string>();
        if (string.Equals(status.StatusSource, "fetch_failed", StringComparison.OrdinalIgnoreCase))
        {
            reasons.Add("status_fetch_failed");
        }

        if (string.Equals(sidecarStatus?.StatusSource, "fetch_failed", StringComparison.OrdinalIgnoreCase))
        {
            reasons.Add("sidecar_status_fetch_failed");
        }

        if (!status.HasLatestSnapshot)
        {
            reasons.Add("no_latest_snapshot");
        }

        if (!status.HasAnalysisJson)
        {
            reasons.Add("no_analysis_json");
        }

        return reasons;
    }

    private static string GetAttentionSeverity(IReadOnlyList<string> reasons) =>
        reasons.Contains("status_fetch_failed", StringComparer.OrdinalIgnoreCase)
            ? "critical"
            : reasons.Contains("sidecar_status_fetch_failed", StringComparer.OrdinalIgnoreCase)
                ? "warning"
            : "warning";

    private static int AttentionSeverityRank(string severity) =>
        string.Equals(severity, "critical", StringComparison.OrdinalIgnoreCase) ? 1 : 0;

    private static IReadOnlyDictionary<string, int> BuildTagCounts(
        IEnumerable<RuntimeRecord> runtimes,
        Func<RuntimeRecord, string?> selector) =>
        runtimes
            .Select(selector)
            .Where(value => !string.IsNullOrWhiteSpace(value))
            .GroupBy(value => value!, StringComparer.OrdinalIgnoreCase)
            .OrderBy(group => group.Key, StringComparer.OrdinalIgnoreCase)
            .ToDictionary(group => group.Key, group => group.Count(), StringComparer.OrdinalIgnoreCase);

    private static List<CapabilityRejection> EvaluateRequirements(
        IReadOnlyList<RuntimeCapability> capabilities,
        IReadOnlyList<SessionCapabilityRequirement> requirements)
    {
        var capabilityMap = capabilities.ToDictionary(
            capability => capability.Key,
            capability => capability,
            StringComparer.OrdinalIgnoreCase);
        var rejections = new List<CapabilityRejection>();

        foreach (var requirement in requirements)
        {
            if (!capabilityMap.TryGetValue(requirement.Key, out var capability))
            {
                rejections.Add(new CapabilityRejection(
                    requirement.Key,
                    "not_supported",
                    "runtime did not advertise this capability"));
                continue;
            }

            if (string.Equals(capability.Support, "not_supported", StringComparison.OrdinalIgnoreCase))
            {
                rejections.Add(new CapabilityRejection(
                    requirement.Key,
                    capability.Support,
                    "runtime explicitly marked this capability as unavailable"));
                continue;
            }

            if (string.Equals(capability.Support, "risky", StringComparison.OrdinalIgnoreCase))
            {
                rejections.Add(new CapabilityRejection(
                    requirement.Key,
                    capability.Support,
                    "runtime marked this capability as risky; leserpent should not remote-execute it"));
                continue;
            }
        }

        return rejections;
    }

    private static string NormalizeSupport(string support)
    {
        if (string.IsNullOrWhiteSpace(support))
        {
            return "not_supported";
        }

        return support.Trim().ToLowerInvariant() switch
        {
            "fully_supported" => "fully_supported",
            "risky" => "risky",
            _ => "not_supported",
        };
    }

    private static string? NormalizeOptionalEndpoint(string? endpoint)
    {
        if (string.IsNullOrWhiteSpace(endpoint))
        {
            return null;
        }

        return endpoint.Trim();
    }

    private sealed record RuntimeRecord(
        string RuntimeId,
        string Name,
        string Endpoint,
        string? SidecarEndpoint,
        string PairingToken,
        DateTimeOffset RegisteredAt,
        DateTimeOffset UpdatedAt,
        IReadOnlyList<RuntimeCapability> Capabilities,
        string CapabilitySource,
        DateTimeOffset? CapabilityFetchedAt,
        string? CapabilityFetchError,
        RuntimeTags Tags,
        RuntimeStatusSnapshot Status,
        RuntimeSidecarStatusSnapshot? SidecarStatus)
    {
        public RuntimeRegistrationResponse ToRegistrationResponse() =>
            new(RuntimeId, Name, Endpoint, SidecarEndpoint, RegisteredAt, Capabilities, CapabilitySource, CapabilityFetchedAt, CapabilityFetchError, Tags, Status, SidecarStatus);

        public RuntimeSummary ToSummary() =>
            new(RuntimeId, Name, Endpoint, SidecarEndpoint, RegisteredAt, UpdatedAt, Capabilities, CapabilitySource, CapabilityFetchedAt, CapabilityFetchError, Tags, Status, SidecarStatus);

        public PersistedRuntimeState ToPersistedState() =>
            new(RuntimeId, Name, Endpoint, SidecarEndpoint, PairingToken, RegisteredAt, UpdatedAt, Capabilities, CapabilitySource, CapabilityFetchedAt, CapabilityFetchError, Tags, Status, SidecarStatus);
    }

    private sealed record SessionRecord(
        string SessionId,
        string RuntimeId,
        string PipelineKind,
        string RequestedBy,
        string Status,
        DateTimeOffset CreatedAt,
        DateTimeOffset UpdatedAt,
        IReadOnlyList<SessionCapabilityRequirement> Requirements)
    {
        public SessionSummary ToSummary() =>
            new(SessionId, RuntimeId, PipelineKind, RequestedBy, Status, CreatedAt, UpdatedAt, Requirements);

        public PersistedSessionState ToPersistedState() =>
            new(SessionId, RuntimeId, PipelineKind, RequestedBy, Status, CreatedAt, UpdatedAt, Requirements);
    }
}
