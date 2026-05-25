namespace Leserpent.ControlPlane;

public sealed record RuntimeCapability(
    string Key,
    string Support,
    string Description
);

public sealed record RuntimeStatusSnapshot(
    string StatusSource,
    DateTimeOffset? StatusFetchedAt,
    string? StatusFetchError,
    bool HasLatestSnapshot,
    string? SnapshotKind,
    int? TargetCount,
    bool HasSummaryJson,
    bool HasAnalysisJson,
    bool HasExternalSidecarContext,
    bool HasExternalEvidenceChainEnrichment,
    bool HasExternalDiagnosticOpinion
);

public sealed record RuntimeSidecarStatusSnapshot(
    string StatusSource,
    DateTimeOffset? StatusFetchedAt,
    string? StatusFetchError,
    bool Healthy,
    string DaemonStatus,
    int? TargetCount,
    bool LearningActive,
    int LearnedRoutes,
    bool HasEvidenceChainEnrichment,
    bool HasDiagnosticOpinion,
    string? LastError = null
);

public sealed record RuntimeTags(
    string? Environment,
    string? Cluster,
    string? Role
);

public sealed record RuntimeListFilter(
    string? Environment,
    string? Cluster,
    string? Role
);

public sealed record RuntimeRegistrationRequest(
    string Name,
    string Endpoint,
    string PairingToken,
    IReadOnlyList<RuntimeCapability> Capabilities,
    RuntimeTags? Tags = null,
    bool FetchCapabilities = false,
    string? CapabilityEndpoint = null,
    string? StatusEndpoint = null,
    string? SidecarEndpoint = null,
    string? SidecarStatusEndpoint = null
);

public sealed record RuntimeRegistrationResponse(
    string RuntimeId,
    string Name,
    string Endpoint,
    string? SidecarEndpoint,
    DateTimeOffset RegisteredAt,
    IReadOnlyList<RuntimeCapability> Capabilities,
    string CapabilitySource,
    DateTimeOffset? CapabilityFetchedAt,
    string? CapabilityFetchError,
    RuntimeTags Tags,
    RuntimeStatusSnapshot Status,
    RuntimeSidecarStatusSnapshot? SidecarStatus
);

public sealed record RuntimeSummary(
    string RuntimeId,
    string Name,
    string Endpoint,
    string? SidecarEndpoint,
    DateTimeOffset RegisteredAt,
    DateTimeOffset UpdatedAt,
    IReadOnlyList<RuntimeCapability> Capabilities,
    string CapabilitySource,
    DateTimeOffset? CapabilityFetchedAt,
    string? CapabilityFetchError,
    RuntimeTags Tags,
    RuntimeStatusSnapshot Status,
    RuntimeSidecarStatusSnapshot? SidecarStatus
);

public sealed record SessionCapabilityRequirement(
    string Key,
    string MinimumSupport
);

public sealed record SessionCreateRequest(
    string RuntimeId,
    string PipelineKind,
    string RequestedBy,
    IReadOnlyList<SessionCapabilityRequirement> Requirements
);

public sealed record SessionSummary(
    string SessionId,
    string RuntimeId,
    string PipelineKind,
    string RequestedBy,
    string Status,
    DateTimeOffset CreatedAt,
    DateTimeOffset UpdatedAt,
    IReadOnlyList<SessionCapabilityRequirement> Requirements
);

public sealed record SessionStopRequest(string RequestedBy, string Reason);

public sealed record CapabilityRejection(
    string Key,
    string Support,
    string Reason
);

public sealed record ServiceCapabilities(
    string Service,
    string Version,
    string Role,
    IReadOnlyList<string> Routes,
    ServicePersistenceCapabilities? Persistence = null
);

public sealed record ServicePersistenceCapabilities(
    string StatePath,
    string BackupStatePath,
    DateTimeOffset? LastSavedAt,
    bool Enabled,
    int SchemaVersion,
    bool IsDirty,
    string? LastSaveError = null,
    int RestoredRuntimeCount = 0,
    int RestoredSessionCount = 0,
    DateTimeOffset? RestoredFromSavedAt = null
);

public sealed record PersistenceSaveResponse(
    bool Ok,
    DateTimeOffset SavedAt
);

public sealed record PersistenceImportResponse(
    bool Ok,
    int ImportedRuntimeCount,
    int ImportedSessionCount,
    DateTimeOffset SavedAt,
    DateTimeOffset? ImportedFromSavedAt
);

public sealed record RuntimeCapabilityRefreshResponse(
    string RuntimeId,
    string Name,
    string Endpoint,
    IReadOnlyList<RuntimeCapability> Capabilities,
    string CapabilitySource,
    DateTimeOffset? CapabilityFetchedAt,
    string? CapabilityFetchError
);

public sealed record RuntimeStatusRefreshResponse(
    string RuntimeId,
    string Name,
    string Endpoint,
    RuntimeStatusSnapshot Status
);

public sealed record RuntimeSidecarRefreshResponse(
    string RuntimeId,
    string Name,
    string Endpoint,
    string? SidecarEndpoint,
    RuntimeSidecarStatusSnapshot? SidecarStatus
);

public sealed record FleetSummary(
    int RuntimeCount,
    int RuntimesWithLatestSnapshot,
    int RuntimesWithSummaryJson,
    int RuntimesWithAnalysisJson,
    int RuntimesWithExternalSidecarContext,
    int RuntimesWithExternalEvidenceChainEnrichment,
    int RuntimesWithExternalDiagnosticOpinion,
    int RuntimesWithObservedStatus,
    int RuntimesWithStatusFetchFailed,
    int RuntimesWithPairedSidecar,
    int RuntimesWithHealthySidecar,
    int RuntimesWithObservedSidecarStatus,
    int RuntimesWithSidecarStatusFetchFailed,
    int RuntimesWithSidecarEvidenceChainEnrichment,
    int RuntimesWithSidecarDiagnosticOpinion,
    IReadOnlyDictionary<string, int> SnapshotKindCounts,
    IReadOnlyDictionary<string, int> StatusSourceCounts,
    IReadOnlyDictionary<string, int> SidecarStatusSourceCounts,
    IReadOnlyDictionary<string, int> EnvironmentCounts,
    IReadOnlyDictionary<string, int> ClusterCounts,
    IReadOnlyDictionary<string, int> RoleCounts
);

public sealed record RuntimeAttentionItem(
    string RuntimeId,
    string Name,
    string Endpoint,
    RuntimeTags Tags,
    RuntimeStatusSnapshot Status,
    string Severity,
    IReadOnlyList<string> Reasons
);

public sealed record RuntimeAttentionView(
    string RuntimeId,
    string Name,
    string Endpoint,
    RuntimeTags Tags,
    RuntimeStatusSnapshot Status,
    bool NeedsAttention,
    string Severity,
    IReadOnlyList<string> Reasons
);

public sealed record FleetAttentionSummary(
    int CriticalCount,
    int WarningCount,
    IReadOnlyDictionary<string, int> ReasonCounts
);

public sealed record FleetStatusRefreshItem(
    string RuntimeId,
    string Name,
    string Endpoint,
    RuntimeTags Tags,
    RuntimeStatusSnapshot Status
);

public sealed record FleetStatusRefreshResponse(
    int RefreshedCount,
    IReadOnlyList<FleetStatusRefreshItem> Runtimes
);

public sealed record FleetSidecarRefreshItem(
    string RuntimeId,
    string Name,
    string Endpoint,
    string? SidecarEndpoint,
    RuntimeTags Tags,
    RuntimeSidecarStatusSnapshot? SidecarStatus
);

public sealed record FleetSidecarRefreshResponse(
    int RefreshedCount,
    IReadOnlyList<FleetSidecarRefreshItem> Runtimes
);

public sealed record FleetCapabilityRefreshItem(
    string RuntimeId,
    string Name,
    string Endpoint,
    RuntimeTags Tags,
    IReadOnlyList<RuntimeCapability> Capabilities,
    string CapabilitySource,
    DateTimeOffset? CapabilityFetchedAt,
    string? CapabilityFetchError
);

public sealed record FleetCapabilityRefreshResponse(
    int RefreshedCount,
    IReadOnlyList<FleetCapabilityRefreshItem> Runtimes
);

public sealed record FleetRefreshAllItem(
    string RuntimeId,
    string Name,
    string Endpoint,
    string? SidecarEndpoint,
    RuntimeTags Tags,
    IReadOnlyList<RuntimeCapability> Capabilities,
    string CapabilitySource,
    DateTimeOffset? CapabilityFetchedAt,
    string? CapabilityFetchError,
    RuntimeStatusSnapshot Status,
    RuntimeSidecarStatusSnapshot? SidecarStatus
);

public sealed record FleetRefreshAllResponse(
    int RefreshedCount,
    IReadOnlyList<FleetRefreshAllItem> Runtimes
);

public sealed record PersistedRuntimeState(
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
    RuntimeSidecarStatusSnapshot? SidecarStatus
);

public sealed record PersistedSessionState(
    string SessionId,
    string RuntimeId,
    string PipelineKind,
    string RequestedBy,
    string Status,
    DateTimeOffset CreatedAt,
    DateTimeOffset UpdatedAt,
    IReadOnlyList<SessionCapabilityRequirement> Requirements
);

public sealed record PersistedControlPlaneState(
    int SchemaVersion,
    DateTimeOffset SavedAt,
    IReadOnlyList<PersistedRuntimeState> Runtimes,
    IReadOnlyList<PersistedSessionState> Sessions
);
