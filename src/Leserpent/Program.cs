using System.Text.Json;
using Leserpent.ControlPlane;

namespace Leserpent;

public class Program
{
    public static void Main(string[] args)
    {
        var builder = WebApplication.CreateBuilder(args);

        builder.Services.AddAuthorization();
        builder.Services.AddOpenApi();
        builder.Services.AddSingleton<ControlPlaneSecurityPolicy>();
        builder.Services.AddSingleton<ControlPlaneStateStore>();
        builder.Services.AddSingleton<RegistryService>();
        builder.Services.AddHttpClient<CapabilityDiscoveryService>();

        var app = builder.Build();

        if (app.Environment.IsDevelopment())
        {
            app.MapOpenApi();
        }

        app.UseDefaultFiles();
        app.UseStaticFiles();
        app.UseHttpsRedirection();
        app.Use(async (context, next) =>
        {
            var security = context.RequestServices.GetRequiredService<ControlPlaneSecurityPolicy>();
            if (!security.TryAuthorize(context, out var statusCode, out var payload))
            {
                context.Response.StatusCode = statusCode;
                await context.Response.WriteAsJsonAsync(payload);
                return;
            }

            await next();
        });
        app.UseAuthorization();

        app.MapGet("/health", (ControlPlaneStateStore stateStore, RegistryService registry, ControlPlaneSecurityPolicy security) => Results.Ok(new
        {
            ok = true,
            service = "leserpent",
            role = "control-plane",
            version = typeof(Program).Assembly.GetName().Version?.ToString() ?? "dev",
            security = new
            {
                apiMode = security.ApiMode,
                adminTokenConfigured = security.AdminTokenConfigured,
                publicEndpointDiscoveryAllowed = security.PublicEndpointDiscoveryAllowed,
            },
            runtimePosture = BuildRuntimePosture(stateStore),
            persistence = new
            {
                statePath = stateStore.StatePath,
                backupStatePath = stateStore.BackupStatePath,
                lastSavedAt = stateStore.LastSavedAt,
                schemaVersion = stateStore.SchemaVersion,
                isDirty = stateStore.IsDirty,
                lastSaveError = stateStore.LastSaveError,
                restoredRuntimeCount = registry.RestoredRuntimeCount,
                restoredSessionCount = registry.RestoredSessionCount,
                restoredFromSavedAt = registry.RestoredFromSavedAt,
            },
        }));

        app.MapGet("/v1/capabilities", (ControlPlaneStateStore stateStore, RegistryService registry, ControlPlaneSecurityPolicy security) =>
            Results.Ok(new ServiceCapabilities(
                "leserpent",
                typeof(Program).Assembly.GetName().Version?.ToString() ?? "dev",
                "control-plane",
                new[]
                {
                    "/health",
                    "/v1/capabilities",
                    "/v1/persistence/export",
                    "/v1/persistence/import",
                    "/v1/persistence/save",
                    "/v1/fleet/summary",
                    "/v1/fleet/attention-summary",
                    "/v1/fleet/refresh-all",
                    "/v1/fleet/refresh-capabilities",
                    "/v1/fleet/refresh-sidecars",
                    "/v1/fleet/refresh-status",
                    "/v1/fleet/runtimes-needing-attention",
                    "/v1/runtimes",
                    "/v1/runtimes/{id}",
                    "/v1/runtimes/{id}/attention",
                    "/v1/runtimes/{id}/sidecar",
                    "/v1/runtimes/{id}/refresh-sidecar",
                    "/v1/runtimes/{id}/status",
                    "/v1/runtimes/register",
                    "/v1/runtimes/{id}/refresh-capabilities",
                    "/v1/runtimes/{id}/refresh-status",
                    "/v1/sessions",
                    "/v1/sessions/{id}",
                    "/v1/sessions/{id}/stop",
                },
                new ServicePersistenceCapabilities(
                    stateStore.StatePath,
                    stateStore.BackupStatePath,
                    stateStore.LastSavedAt,
                    true,
                    stateStore.SchemaVersion,
                    stateStore.IsDirty,
                    stateStore.LastSaveError,
                    registry.RestoredRuntimeCount,
                    registry.RestoredSessionCount,
                    registry.RestoredFromSavedAt),
                new ServiceSecurityCapabilities(
                    security.ApiMode,
                    security.AdminTokenConfigured,
                    security.PublicEndpointDiscoveryAllowed),
                BuildRuntimePosture(stateStore))));

        app.MapPost("/v1/persistence/save", (RegistryService registry) =>
            Results.Ok(new PersistenceSaveResponse(true, registry.SaveNow())));

        app.MapGet("/v1/persistence/export", (RegistryService registry) =>
        {
            var state = registry.ExportState();
            return ResultExtensions.FileDownloadJson(
                state,
                $"leserpent-control-plane-state-{state.SavedAt:yyyyMMddHHmmss}.json");
        });

        app.MapPost("/v1/persistence/import", async (HttpRequest request, RegistryService registry, ControlPlaneStateStore stateStore, ControlPlaneSecurityPolicy security, CancellationToken cancellationToken) =>
        {
            PersistedControlPlaneState? imported;
            try
            {
                imported = await request.ReadFromJsonAsync<PersistedControlPlaneState>(cancellationToken: cancellationToken);
            }
            catch (Exception ex)
            {
                return Results.BadRequest(new
                {
                    error = "invalid_persistence_import",
                    reason = ex.Message,
                });
            }

            if (imported is null)
            {
                return Results.BadRequest(new
                {
                    error = "invalid_persistence_import",
                    reason = "request body did not contain a control-plane state document",
                });
            }

            if (!stateStore.IsCompatible(imported))
            {
                return Results.BadRequest(new
                {
                    error = "incompatible_persistence_import",
                    schemaVersion = imported.SchemaVersion,
                    expectedSchemaVersion = stateStore.SchemaVersion,
                });
            }

            var importValidation = await security.ValidateImportAsync(imported, cancellationToken);
            if (importValidation is not null)
            {
                return Results.BadRequest(new
                {
                    error = "invalid_persistence_import",
                    reason = importValidation,
                });
            }

            return Results.Ok(registry.ImportState(imported));
        });

        app.MapGet("/v1/fleet/summary", (string? environment, string? cluster, string? role, RegistryService registry) =>
            Results.Ok(new
            {
                filter = new RuntimeListFilter(environment, cluster, role),
                summary = registry.GetFleetSummary(new RuntimeListFilter(environment, cluster, role)),
            }));

        app.MapGet("/v1/fleet/runtimes-needing-attention", (string? environment, string? cluster, string? role, RegistryService registry) =>
            Results.Ok(new
            {
                filter = new RuntimeListFilter(environment, cluster, role),
                runtimes = registry.GetRuntimesNeedingAttention(new RuntimeListFilter(environment, cluster, role)),
            }));

        app.MapGet("/v1/fleet/attention-summary", (string? environment, string? cluster, string? role, RegistryService registry) =>
            Results.Ok(new
            {
                filter = new RuntimeListFilter(environment, cluster, role),
                summary = registry.GetFleetAttentionSummary(new RuntimeListFilter(environment, cluster, role)),
            }));

        app.MapPost("/v1/fleet/refresh-all", async (string? environment, string? cluster, string? role, RegistryService registry, CapabilityDiscoveryService discovery, CancellationToken cancellationToken) =>
        {
            var filter = new RuntimeListFilter(environment, cluster, role);
            var refreshed = new List<FleetRefreshAllItem>();
            foreach (var runtime in registry.ListRuntimes(filter))
            {
                var capabilityResult = registry.RefreshRuntimeCapabilities(
                    runtime.RuntimeId,
                    await discovery.DiscoverAsync(runtime.Endpoint, null, cancellationToken));
                var statusResult = registry.RefreshRuntimeStatus(
                    runtime.RuntimeId,
                    await discovery.DiscoverStatusAsync(runtime.Endpoint, null, cancellationToken));

                if (capabilityResult is not null && statusResult is not null)
                {
                    var sidecarResult = string.IsNullOrWhiteSpace(runtime.SidecarEndpoint)
                        ? null
                        : registry.RefreshRuntimeSidecar(
                            runtime.RuntimeId,
                            await discovery.DiscoverSidecarStatusAsync(runtime.SidecarEndpoint!, null, cancellationToken));

                    refreshed.Add(new FleetRefreshAllItem(
                        capabilityResult.RuntimeId,
                        capabilityResult.Name,
                        capabilityResult.Endpoint,
                        runtime.SidecarEndpoint,
                        runtime.Tags,
                        capabilityResult.Capabilities,
                        capabilityResult.CapabilitySource,
                        capabilityResult.CapabilityFetchedAt,
                        capabilityResult.CapabilityFetchError,
                        statusResult.Status,
                        sidecarResult?.SidecarStatus));
                }
            }

            return Results.Ok(new
            {
                filter,
                refresh = new FleetRefreshAllResponse(refreshed.Count, refreshed),
            });
        });

        app.MapPost("/v1/fleet/refresh-capabilities", async (string? environment, string? cluster, string? role, RegistryService registry, CapabilityDiscoveryService discovery, CancellationToken cancellationToken) =>
        {
            var filter = new RuntimeListFilter(environment, cluster, role);
            var refreshed = new List<FleetCapabilityRefreshItem>();
            foreach (var runtime in registry.ListRuntimes(filter))
            {
                var result = registry.RefreshRuntimeCapabilities(
                    runtime.RuntimeId,
                    await discovery.DiscoverAsync(runtime.Endpoint, null, cancellationToken));
                if (result is not null)
                {
                    refreshed.Add(new FleetCapabilityRefreshItem(
                        result.RuntimeId,
                        result.Name,
                        result.Endpoint,
                        runtime.Tags,
                        result.Capabilities,
                        result.CapabilitySource,
                        result.CapabilityFetchedAt,
                        result.CapabilityFetchError));
                }
            }

            return Results.Ok(new
            {
                filter,
                refresh = new FleetCapabilityRefreshResponse(refreshed.Count, refreshed),
            });
        });

        app.MapPost("/v1/fleet/refresh-sidecars", async (string? environment, string? cluster, string? role, RegistryService registry, CapabilityDiscoveryService discovery, CancellationToken cancellationToken) =>
        {
            var filter = new RuntimeListFilter(environment, cluster, role);
            var refreshed = new List<FleetSidecarRefreshItem>();
            foreach (var runtime in registry.ListRuntimes(filter))
            {
                if (string.IsNullOrWhiteSpace(runtime.SidecarEndpoint))
                {
                    continue;
                }

                var result = registry.RefreshRuntimeSidecar(
                    runtime.RuntimeId,
                    await discovery.DiscoverSidecarStatusAsync(runtime.SidecarEndpoint!, null, cancellationToken));
                if (result is not null)
                {
                    refreshed.Add(new FleetSidecarRefreshItem(
                        result.RuntimeId,
                        result.Name,
                        result.Endpoint,
                        result.SidecarEndpoint,
                        runtime.Tags,
                        result.SidecarStatus));
                }
            }

            return Results.Ok(new
            {
                filter,
                refresh = new FleetSidecarRefreshResponse(refreshed.Count, refreshed),
            });
        });

        app.MapPost("/v1/fleet/refresh-status", async (string? environment, string? cluster, string? role, RegistryService registry, CapabilityDiscoveryService discovery, CancellationToken cancellationToken) =>
        {
            var filter = new RuntimeListFilter(environment, cluster, role);
            var refreshed = new List<FleetStatusRefreshItem>();
            foreach (var runtime in registry.ListRuntimes(filter))
            {
                var result = registry.RefreshRuntimeStatus(
                    runtime.RuntimeId,
                    await discovery.DiscoverStatusAsync(runtime.Endpoint, null, cancellationToken));
                if (result is not null)
                {
                    refreshed.Add(new FleetStatusRefreshItem(
                        result.RuntimeId,
                        result.Name,
                        result.Endpoint,
                        runtime.Tags,
                        result.Status));
                }
            }

            return Results.Ok(new
            {
                filter,
                refresh = new FleetStatusRefreshResponse(refreshed.Count, refreshed),
            });
        });

        app.MapGet("/v1/runtimes", (string? environment, string? cluster, string? role, RegistryService registry) =>
            Results.Ok(new
            {
                filter = new RuntimeListFilter(environment, cluster, role),
                runtimes = registry.ListRuntimes(new RuntimeListFilter(environment, cluster, role)),
            }));

        app.MapGet("/v1/runtimes/{id}", (string id, RegistryService registry) =>
        {
            var runtime = registry.GetRuntime(id);
            return runtime is null ? Results.NotFound(new { error = "runtime_not_found", runtimeId = id }) : Results.Ok(runtime);
        });

        app.MapGet("/v1/runtimes/{id}/attention", (string id, RegistryService registry) =>
        {
            var attention = registry.GetRuntimeAttention(id);
            return attention is null
                ? Results.NotFound(new { error = "runtime_not_found", runtimeId = id })
                : Results.Ok(attention);
        });

        app.MapGet("/v1/runtimes/{id}/status", (string id, RegistryService registry) =>
        {
            var runtime = registry.GetRuntime(id);
            return runtime is null
                ? Results.NotFound(new { error = "runtime_not_found", runtimeId = id })
                : Results.Ok(new RuntimeStatusRefreshResponse(runtime.RuntimeId, runtime.Name, runtime.Endpoint, runtime.Status));
        });

        app.MapGet("/v1/runtimes/{id}/sidecar", (string id, RegistryService registry) =>
        {
            var runtime = registry.GetRuntime(id);
            return runtime is null
                ? Results.NotFound(new { error = "runtime_not_found", runtimeId = id })
                : Results.Ok(new RuntimeSidecarRefreshResponse(runtime.RuntimeId, runtime.Name, runtime.Endpoint, runtime.SidecarEndpoint, runtime.SidecarStatus));
        });

        app.MapPost("/v1/runtimes/register", async (RuntimeRegistrationRequest request, RegistryService registry, CapabilityDiscoveryService discovery, ControlPlaneSecurityPolicy security, CancellationToken cancellationToken) =>
        {
            if (string.IsNullOrWhiteSpace(request.Name) || string.IsNullOrWhiteSpace(request.Endpoint))
            {
                return Results.BadRequest(new
                {
                    error = "invalid_runtime_registration",
                    reason = "name and endpoint are required",
                });
            }

            var registrationValidation = await security.ValidateRegistrationAsync(request, cancellationToken);
            if (registrationValidation is not null)
            {
                return Results.BadRequest(new
                {
                    error = "invalid_runtime_registration",
                    reason = registrationValidation,
                });
            }

            if (request.FetchCapabilities)
            {
                var capabilityDiscovery = await discovery.DiscoverAsync(request.Endpoint, request.CapabilityEndpoint, cancellationToken);
                var statusDiscovery = await discovery.DiscoverStatusAsync(request.Endpoint, request.StatusEndpoint, cancellationToken);
                var sidecarDiscovery = string.IsNullOrWhiteSpace(request.SidecarEndpoint)
                    ? null
                    : await discovery.DiscoverSidecarStatusAsync(request.SidecarEndpoint!, request.SidecarStatusEndpoint, cancellationToken);
                return Results.Ok(registry.RegisterRuntimeFromDiscovery(request, capabilityDiscovery, statusDiscovery, sidecarDiscovery));
            }

            return Results.Ok(registry.RegisterRuntime(request));
        });

        app.MapPost("/v1/runtimes/{id}/refresh-capabilities", async (string id, RegistryService registry, CapabilityDiscoveryService discovery, CancellationToken cancellationToken) =>
        {
            var runtime = registry.GetRuntime(id);
            if (runtime is null)
            {
                return Results.NotFound(new { error = "runtime_not_found", runtimeId = id });
            }

            var refreshed = registry.RefreshRuntimeCapabilities(
                id,
                await discovery.DiscoverAsync(runtime.Endpoint, null, cancellationToken));
            return refreshed is null
                ? Results.NotFound(new { error = "runtime_not_found", runtimeId = id })
                : Results.Ok(refreshed);
        });

        app.MapPost("/v1/runtimes/{id}/refresh-status", async (string id, RegistryService registry, CapabilityDiscoveryService discovery, CancellationToken cancellationToken) =>
        {
            var runtime = registry.GetRuntime(id);
            if (runtime is null)
            {
                return Results.NotFound(new { error = "runtime_not_found", runtimeId = id });
            }

            var refreshed = registry.RefreshRuntimeStatus(
                id,
                await discovery.DiscoverStatusAsync(runtime.Endpoint, null, cancellationToken));
            return refreshed is null
                ? Results.NotFound(new { error = "runtime_not_found", runtimeId = id })
                : Results.Ok(refreshed);
        });

        app.MapPost("/v1/runtimes/{id}/refresh-sidecar", async (string id, RegistryService registry, CapabilityDiscoveryService discovery, CancellationToken cancellationToken) =>
        {
            var runtime = registry.GetRuntime(id);
            if (runtime is null)
            {
                return Results.NotFound(new { error = "runtime_not_found", runtimeId = id });
            }

            if (string.IsNullOrWhiteSpace(runtime.SidecarEndpoint))
            {
                return Results.BadRequest(new { error = "runtime_has_no_sidecar_endpoint", runtimeId = id });
            }

            var refreshed = registry.RefreshRuntimeSidecar(
                id,
                await discovery.DiscoverSidecarStatusAsync(runtime.SidecarEndpoint!, null, cancellationToken));
            return refreshed is null
                ? Results.NotFound(new { error = "runtime_not_found", runtimeId = id })
                : Results.Ok(refreshed);
        });

        app.MapGet("/v1/sessions", (RegistryService registry) =>
            Results.Ok(new
            {
                sessions = registry.ListSessions(),
            }));

        app.MapGet("/v1/sessions/{id}", (string id, RegistryService registry) =>
        {
            var session = registry.GetSession(id);
            return session is null ? Results.NotFound(new { error = "session_not_found", sessionId = id }) : Results.Ok(session);
        });

        app.MapPost("/v1/sessions", (SessionCreateRequest request, RegistryService registry) =>
        {
            if (string.IsNullOrWhiteSpace(request.RuntimeId) ||
                string.IsNullOrWhiteSpace(request.PipelineKind) ||
                string.IsNullOrWhiteSpace(request.RequestedBy))
            {
                return Results.BadRequest(new
                {
                    error = "invalid_session_request",
                    reason = "runtimeId, pipelineKind, and requestedBy are required",
                });
            }

            var result = registry.CreateSession(request);
            if (result.RuntimeMissing is not null)
            {
                return Results.NotFound(new
                {
                    error = "runtime_not_found",
                    runtimeId = result.RuntimeMissing,
                });
            }

            if (result.Rejections.Count > 0)
            {
                return Results.BadRequest(new
                {
                    error = "capability_requirements_not_satisfied",
                    rejections = result.Rejections,
                });
            }

            return Results.Ok(result.Session);
        });

        app.MapPost("/v1/sessions/{id}/stop", (string id, SessionStopRequest request, RegistryService registry) =>
        {
            if (string.IsNullOrWhiteSpace(request.RequestedBy))
            {
                return Results.BadRequest(new
                {
                    error = "invalid_stop_request",
                    reason = "requestedBy is required",
                });
            }

            var session = registry.StopSession(id);
            return session is null ? Results.NotFound(new { error = "session_not_found", sessionId = id }) : Results.Ok(session);
        });

        app.MapFallbackToFile("index.html");

        app.Run();
    }

    private static ServiceRuntimePosture BuildRuntimePosture(ControlPlaneStateStore stateStore)
    {
        var persistenceReady = string.IsNullOrWhiteSpace(stateStore.LastSaveError);
        return new ServiceRuntimePosture(
            CoreReady: true,
            PersistenceReady: persistenceReady,
            DegradedButOperable: !persistenceReady,
            OptionalAdapters: new[]
            {
                new ServiceOptionalAdapter(
                    "docker_scenarios",
                    "optional_unconfigured",
                    "Docker-backed scenario launch and stack validation are optional helpers, not startup requirements."),
                new ServiceOptionalAdapter(
                    "local_process_launch",
                    "optional_unconfigured",
                    "Local process launch helpers should remain optional rather than part of the core boot contract."),
                new ServiceOptionalAdapter(
                    "remote_ssh_management",
                    "optional_unconfigured",
                    "Remote SSH-based management is an optional adapter and should not be required for local control-plane operation."),
                new ServiceOptionalAdapter(
                    "kubernetes_integration",
                    "optional_unconfigured",
                    "Future scheduler integration is optional and should not block the control plane from starting."),
            });
    }
}

internal static class ResultExtensions
{
    private static readonly JsonSerializerOptions SerializerOptions = new()
    {
        WriteIndented = true,
    };

    public static IResult FileDownloadJson<T>(T payload, string fileName) =>
        Results.File(
            JsonSerializer.SerializeToUtf8Bytes(payload, SerializerOptions),
            "application/json",
            fileName);
}
