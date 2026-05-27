const translations = {
  en: {
    hero: {
      title: "Control Plane Dashboard",
      subcopy: "A very-light fleet view for many nearby gewyvern runtimes.",
    },
    language: {
      label: "Language",
      auto: "Follow Browser",
      english: "English",
      simplifiedChinese: "简体中文",
    },
    theme: {
      label: "Theme",
      auto: "Follow System",
      light: "Day",
      dark: "Night",
    },
    security: {
      title: "Security",
      adminToken: "Admin Token",
      adminTokenPlaceholder: "optional for remote access",
      clearToken: "Clear Token",
      showToken: "Show Token",
      hideToken: "Hide Token",
      testToken: "Test Token",
      localModeHint: "Loopback mode is active locally. Add a token only when you are intentionally connecting through a protected remote endpoint.",
      tokenStored: "Admin token stored in this browser session.",
      tokenCleared: "Admin token cleared.",
      tokenRequired: "This control plane denied the request. If you are connecting remotely, add the configured admin token.",
      tokenTestRunning: "Testing admin token...",
      tokenTestOk: "Admin token accepted for the current control-plane endpoint.",
      tokenTestFailed: "Admin token test failed: {message}",
      tokenMissing: "Add an admin token first, then test it.",
      lastTokenTest: "Last token test",
      neverTested: "never tested",
      testStateOk: "ok",
      testStateFailed: "failed",
      testStateRunning: "running",
      mode: "security mode",
      tokenConfigured: "admin token",
      publicDiscovery: "public discovery",
      configured: "configured",
      notConfigured: "not configured",
      enabled: "enabled",
      disabled: "disabled",
      loopbackOnly: "loopback only",
      tokenMode: "loopback or token",
    },
    actions: {
      refreshAll: "Fleet Refresh All",
      refreshStatus: "Refresh Status",
      refreshCapabilities: "Refresh Capabilities",
    },
    filters: {
      environment: "Environment",
      environmentPlaceholder: "prod",
      cluster: "Cluster",
      clusterPlaceholder: "alpha",
      role: "Role",
      rolePlaceholder: "edge",
      apply: "Apply Filters",
      clear: "Clear",
      allRuntimes: "all runtimes",
    },
    tabs: {
      overview: "Overview",
      runtimes: "Runtimes",
      register: "Register",
      persistence: "Persistence",
      sessions: "Sessions",
    },
    overview: {
      fleetSummary: "Fleet Summary",
      attentionSummary: "Attention Summary",
      triage: "triage",
      runtimesNeedingAttention: "Runtimes Needing Attention",
      kicker: "Fleet posture",
      spotlightTitle: "Stay oriented before you drill into individual runtimes.",
      spotlightBody: "Use this shell to move between fleet posture, runtime detail, intake, persistence, and sessions without falling into one long scrolling page.",
      spotlightRail1: "fleet slice",
      spotlightRail2: "current mode",
      summaryChip: "live counts",
    },
    runtimes: {
      title: "Runtimes",
      workspaceTabs: {
        select: "Select",
        register: "Register",
        detail: "Detail",
        panel: "Child Panel",
      },
      quickSearch: "Quick Search",
      quickSearchPlaceholder: "name or endpoint",
      sortBy: "Sort By",
      noMatch: "No runtimes match the current filter or search.",
      columns: {
        name: "Name",
        tags: "Tags",
        status: "Status",
        capabilitySurface: "Capability Surface",
        sidecar: "Sidecar",
        attention: "Attention",
        actions: "Actions",
      },
      sort: {
        name: "Name",
        status: "Status Source",
        snapshot: "Snapshot Kind",
      },
      actions: {
        attention: "Attention",
        status: "Status",
        all: "All",
      },
      states: {
        clear: "clear",
        none: "none",
        noEnv: "no-env",
        noCluster: "no-cluster",
        noRole: "no-role",
        noCapabilities: "No fully-supported capabilities",
      },
    },
    runtimeDetail: {
      title: "Runtime Detail",
      nothingSelected: "nothing selected",
      empty: "Select a runtime from the table to inspect its capability, status, and attention state.",
      identity: "Identity",
      status: "Status",
      capabilities: "Capabilities",
      attention: "Attention",
      refreshAll: "Refresh This Runtime",
      refreshStatus: "Refresh Status",
      refreshCapabilities: "Refresh Capabilities",
      refreshSidecar: "Refresh Sidecar",
      copyLink: "Copy Runtime Link",
      registered: "registered",
      updated: "updated",
      source: "source",
      sidecarSource: "sidecar source",
      sidecarLearning: "sidecar learning",
      snapshotKind: "snapshot kind",
      targetCount: "target count",
      summaryJson: "summary json",
      analysisJson: "analysis json",
      noCapabilities: "No capabilities recorded.",
      clear: "clear",
      noAttention: "No attention reasons for this runtime.",
      needsAttention: "needs attention",
      none: "none",
      na: "n/a",
    },
    runtimePanel: {
      title: "Runtime Child Panel",
      notReady: "no runtime selected",
      empty: "Select a runtime to load its child control panel.",
      compactTrustObserved: "Live runtime snapshot is available.",
      compactTrustUnobserved: "Waiting for the first runtime snapshot.",
      compactTrustFetchFailed: "Last runtime refresh failed; treat data as stale.",
      compactTrustSidecarObserved: "Live sidecar snapshot is available.",
      compactTrustSidecarUnobserved: "Waiting for the first sidecar snapshot.",
      compactTrustSidecarFetchFailed: "Last sidecar refresh failed; treat data as stale.",
      compactTrustNoSidecar: "No paired sidecar is configured.",
      blankRuntimeTitle: "This runtime panel is not ready yet",
      blankRuntimeBody: "We know where this runtime lives, but it has not published panel-ready data yet. Use the control-plane summary above as your source of truth first.",
      blankSidecarTitle: "This sidecar panel is not ready yet",
      blankSidecarBody: "The paired diagnostic sidecar is configured, but it has not produced a panel-ready status snapshot yet. Start with the control-plane view, then refresh when needed.",
      blankFetchFailedTitle: "We could not safely open this panel yet",
      blankFetchFailedBody: "The latest status refresh failed, so showing the raw endpoint would be more confusing than helpful right now. Refresh first, then try again.",
      blankHintRefreshRuntime: "Try refreshing runtime status first.",
      blankHintRefreshSidecar: "Try refreshing sidecar status first.",
      blankHintEndpoint: "endpoint",
      breadcrumbFleet: "runtime panel",
      breadcrumbSource: "source",
      breadcrumbView: "view",
      currentView: "current view",
      sourceUrl: "source url",
      sourceStatus: "source status",
      trustTitle: "runtime trust",
      trustObserved: "Observed runtime state",
      trustObservedMessage: "This child panel is backed by an observed gewyvern snapshot and is generally safe to read as live runtime context.",
      trustUnobserved: "Unobserved runtime state",
      trustUnobservedMessage: "This runtime has not published a latest snapshot yet, so treat the child panel as a thin endpoint shell until status arrives.",
      trustFetchFailed: "Status fetch failed",
      trustFetchFailedMessage: "The control plane could not refresh this runtime's status, so the child panel may be stale or unreachable right now.",
      trustSidecarObserved: "Observed sidecar state",
      trustSidecarObservedMessage: "This child panel is backed by a reachable paired etragon sidecar and is safe to read as nearby diagnostic-partner context.",
      trustSidecarUnobserved: "Sidecar not observed yet",
      trustSidecarUnobservedMessage: "A paired etragon endpoint is configured, but the control plane has not observed a sidecar status snapshot yet.",
      trustSidecarFetchFailed: "Sidecar status fetch failed",
      trustSidecarFetchFailedMessage: "The control plane could not refresh this paired etragon sidecar, so the sidecar panel may be stale or unreachable right now.",
      trustNoSidecar: "No paired sidecar",
      trustNoSidecarMessage: "This runtime does not currently advertise a paired etragon endpoint.",
      trustMeta: "status source: {source} · snapshot: {snapshot}",
      trustRefreshStatus: "Refresh Status Now",
      trustRefreshSidecar: "Refresh Sidecar Now",
      openExternal: "Open in New Tab",
      sources: {
        runtime: "Runtime",
        sidecar: "Sidecar",
      },
      views: {
        root: "Home",
        health: "Health",
        meta: "Latest Meta",
        summary: "Summary",
        analysis: "Analysis",
        targets: "Targets",
        sidecarRoot: "Sidecar Home",
        sidecarHealth: "Sidecar Health",
        sidecarStatus: "Sidecar Status",
        sidecarEnrichment: "Enrichment",
        sidecarOpinion: "Opinion",
      },
    },
    register: {
      title: "Register Runtime",
      intake: "very-light intake",
      name: "Name",
      namePlaceholder: "gw-prod-edge-01",
      endpoint: "Endpoint",
      endpointPlaceholder: "http://127.0.0.1:9910",
      sidecarEndpoint: "Sidecar Endpoint",
      sidecarEndpointPlaceholder: "http://127.0.0.1:4321",
      pairingToken: "Pairing Token",
      tokenPlaceholder: "token-123",
      fetchCapabilities: "Fetch capability and latest-meta from gewyvern",
      submit: "Register Runtime",
      clear: "Clear Form",
      untouched: "No runtime submitted yet.",
      previewTitle: "Live Preview",
      previewName: "name",
      previewSlice: "slice",
      previewEndpoint: "endpoint",
      previewSidecar: "sidecar",
      previewCapabilityFetch: "capability fetch",
      suggested: "suggested",
      pendingRuntimeName: "pending runtime name",
      endpointPending: "pending",
      endpointValid: "valid",
      endpointInvalid: "invalid",
      sidecarUnpaired: "not paired",
      capabilityEnabled: "enabled",
      capabilityDisabled: "disabled",
      blockedEndpoint: "Registration blocked: endpoint must start with http:// or https:// and be a valid URL.",
      blockedSidecarEndpoint: "Registration blocked: sidecar endpoint must start with http:// or https:// and be a valid URL.",
      blockedDuplicate: "Registration blocked: {reason} already exists on {name} ({endpoint}).",
      duplicateNameAndEndpoint: "name and endpoint",
      duplicateName: "name",
      duplicateEndpoint: "endpoint",
      registering: "Registering runtime...",
      registered: "Registered {name} ({runtimeId}) into {slice} with status {status}.",
      failed: "Registration failed: {message}. If this runtime already exists, try selecting it from the table instead of registering again.",
      allRuntimes: "all runtimes",
    },
    persistence: {
      title: "Persistence",
      chip: "control-plane state",
      yes: "yes",
      no: "no",
      saveNow: "Save Now",
      exportState: "Export State",
      importState: "Import State",
      enabled: "enabled",
      schema: "schema",
      state: "state",
      stateFile: "state file",
      lastSaved: "last saved",
      restoredRuntimes: "restored runtimes",
      restoredSessions: "restored sessions",
      statePath: "state path",
      backupPath: "backup path",
      schemaVersion: "schema version",
      lastSavedAt: "last saved at",
      lastSaveError: "last save error",
      restoredFromSave: "restored from save",
      configured: "configured",
      missing: "missing",
      never: "never",
      unknown: "unknown",
      none: "none",
      clean: "clean",
      dirty: "dirty",
      saving: "Saving control-plane state...",
      saved: "Control-plane state saved.",
      saveFailed: "Save now failed: {message}",
      exporting: "Exporting control-plane state...",
      exported: "Control-plane state exported.",
      exportFailed: "Export failed: {message}",
      importing: "Importing control-plane state from {file}...",
      invalidJson: "selected file is not valid JSON",
      imported: "Imported {runtimes} runtimes and {sessions} sessions.",
      importFailed: "Import failed: {message}",
    },
    attention: {
      noReasons: "No active attention reasons.",
      reasonLine: "{reason} · {count} runtimes",
      noRuntimes: "No runtimes need attention in this slice.",
      critical: "critical",
      warning: "warning",
      statusFetchFailed: "status_fetch_failed",
      sidecarStatusFetchFailed: "sidecar_status_fetch_failed",
      noLatestSnapshot: "no_latest_snapshot",
      noAnalysisJson: "no_analysis_json",
    },
    sessions: {
      title: "Sessions",
      none: "No sessions yet.",
      runtime: "runtime",
    },
    metrics: {
      runtimes: "runtimes",
      latestSnapshots: "latest snapshots",
      summaryJson: "summary json",
      analysisJson: "analysis json",
      sidecarContext: "sidecar context",
      diagnosticOpinions: "diagnostic opinions",
      pairedSidecars: "paired sidecars",
      healthySidecars: "healthy sidecars",
      critical: "critical",
      warning: "warning",
    },
    groups: {
      snapshotKinds: "snapshot kinds",
      statusSources: "status sources",
      sidecarStatusSources: "sidecar status sources",
      environments: "environments",
      clusters: "clusters",
      roles: "roles",
      empty: "No grouped data yet.",
    },
    statuses: {
      fetchFailed: "fetch failed",
      unobserved: "unobserved",
      observedSnapshot: "{kind} snapshot",
      observed: "observed",
      sidecarObserved: "sidecar observed",
      sidecarStarting: "sidecar starting",
      sidecarDegraded: "sidecar degraded",
      sidecarFetchFailed: "sidecar fetch failed",
    },
    notifications: {
      noRuntimeSelected: "No runtime selected.",
      runtimeLinkCopied: "Runtime link copied.",
      runtimeLinkFailed: "Copy link failed: {message}",
      runtimeRefreshAll: "Runtime refresh-all",
      runtimeRefreshStatus: "Runtime status refresh",
      runtimeRefreshCapabilities: "Runtime capability refresh",
      runtimeRefreshComplete: "{label} complete.",
      runtimeRefreshFailed: "{label} failed: {message}",
      loading: "Loading control-plane state...",
      loaded: "Loaded {count} runtimes.",
      dashboardLoadFailed: "Dashboard load failed: {message}",
      fleetRefreshAll: "Fleet refresh-all",
      fleetStatusRefresh: "Fleet status refresh",
      fleetCapabilityRefresh: "Fleet capability refresh",
      fleetRefreshComplete: "{label} complete.",
      fleetRefreshFailed: "{label} failed: {message}",
      badgeUpdated: "updated",
    },
  },
  "zh-CN": {
    hero: {
      title: "控制平面面板",
      subcopy: "面向多台邻近 gewyvern runtime 的轻量级 fleet 视图。",
    },
    language: {
      label: "语言",
      auto: "跟随浏览器",
      english: "English",
      simplifiedChinese: "简体中文",
    },
    theme: {
      label: "主题",
      auto: "跟随系统",
      light: "白天",
      dark: "夜晚",
    },
    security: {
      title: "安全",
      adminToken: "管理令牌",
      adminTokenPlaceholder: "远程接入时可选",
      clearToken: "清除令牌",
      showToken: "显示令牌",
      hideToken: "隐藏令牌",
      testToken: "测试令牌",
      localModeHint: "当前本地是 loopback 模式。只有在你明确通过受保护的远程入口访问时，才需要填管理令牌。",
      tokenStored: "管理令牌已保存在当前浏览器。",
      tokenCleared: "管理令牌已清除。",
      tokenRequired: "这次请求被控制面拒绝了。如果你现在是远程接入，请填入已配置的管理令牌。",
      tokenTestRunning: "正在测试管理令牌...",
      tokenTestOk: "这枚管理令牌已被当前控制面接受。",
      tokenTestFailed: "管理令牌测试失败：{message}",
      tokenMissing: "先填一枚管理令牌，再测试。",
      lastTokenTest: "最近一次令牌测试",
      neverTested: "从未测试",
      testStateOk: "成功",
      testStateFailed: "失败",
      testStateRunning: "测试中",
      mode: "安全模式",
      tokenConfigured: "管理令牌",
      publicDiscovery: "公网发现",
      configured: "已配置",
      notConfigured: "未配置",
      enabled: "开启",
      disabled: "关闭",
      loopbackOnly: "仅本机",
      tokenMode: "本机或令牌",
    },
    actions: {
      refreshAll: "整组刷新",
      refreshStatus: "刷新状态",
      refreshCapabilities: "刷新能力",
    },
    filters: {
      environment: "环境",
      environmentPlaceholder: "prod",
      cluster: "集群",
      clusterPlaceholder: "alpha",
      role: "角色",
      rolePlaceholder: "edge",
      apply: "应用筛选",
      clear: "清空",
      allRuntimes: "全部 runtimes",
    },
    tabs: {
      overview: "总览",
      runtimes: "节点",
      register: "注册",
      persistence: "持久化",
      sessions: "会话",
    },
    overview: {
      fleetSummary: "Fleet 总览",
      attentionSummary: "告警总览",
      triage: "分诊",
      runtimesNeedingAttention: "需要关注的 runtimes",
      kicker: "Fleet 姿态",
      spotlightTitle: "先建立全局方向感，再深入到单个 runtime。",
      spotlightBody: "现在你可以在同一个 shell 里切换 fleet 姿态、runtime 详情、注册 intake、持久化和 sessions，不再需要一条很长的滚动页面。",
      spotlightRail1: "当前切片",
      spotlightRail2: "当前模式",
      summaryChip: "实时计数",
    },
    runtimes: {
      title: "Runtimes",
      workspaceTabs: {
        select: "选取",
        register: "注册",
        detail: "详情",
        panel: "子面板",
      },
      quickSearch: "快速搜索",
      quickSearchPlaceholder: "名称或 endpoint",
      sortBy: "排序方式",
      noMatch: "当前筛选或搜索下没有匹配的 runtime。",
      columns: {
        name: "名称",
        tags: "标签",
        status: "状态",
        capabilitySurface: "能力面",
        sidecar: "Sidecar",
        attention: "关注项",
        actions: "操作",
      },
      sort: {
        name: "名称",
        status: "状态来源",
        snapshot: "快照类型",
      },
      actions: {
        attention: "查看关注",
        status: "刷新状态",
        all: "全部刷新",
      },
      states: {
        clear: "正常",
        none: "无",
        noEnv: "无环境",
        noCluster: "无集群",
        noRole: "无角色",
        noCapabilities: "没有 fully-supported 的能力",
      },
    },
    runtimeDetail: {
      title: "节点详情",
      nothingSelected: "未选择节点",
      empty: "从表格中选择一个 runtime，就能查看它的 capability、status 和 attention 状态。",
      identity: "身份信息",
      status: "状态",
      capabilities: "能力",
      attention: "关注项",
      refreshAll: "刷新该节点",
      refreshStatus: "刷新状态",
      refreshCapabilities: "刷新能力",
      refreshSidecar: "刷新 Sidecar",
      copyLink: "复制节点链接",
      registered: "注册时间",
      updated: "更新时间",
      source: "来源",
      sidecarSource: "sidecar 来源",
      sidecarLearning: "sidecar 学习态",
      snapshotKind: "快照类型",
      targetCount: "target 数量",
      summaryJson: "summary json",
      analysisJson: "analysis json",
      noCapabilities: "当前没有记录 capability。",
      clear: "正常",
      noAttention: "该 runtime 当前没有 attention reason。",
      needsAttention: "是否需要关注",
      none: "无",
      na: "暂无",
    },
    runtimePanel: {
      title: "Runtime 子面板",
      notReady: "尚未选择 runtime",
      empty: "选择一个 runtime 后，就能加载它的子控制页面。",
      compactTrustObserved: "runtime 实时快照已可用。",
      compactTrustUnobserved: "正在等待第一份 runtime 快照。",
      compactTrustFetchFailed: "最近一次 runtime 刷新失败，请把当前数据当作可能过期。",
      compactTrustSidecarObserved: "sidecar 实时快照已可用。",
      compactTrustSidecarUnobserved: "正在等待第一份 sidecar 快照。",
      compactTrustSidecarFetchFailed: "最近一次 sidecar 刷新失败，请把当前数据当作可能过期。",
      compactTrustNoSidecar: "当前没有配置 paired sidecar。",
      blankRuntimeTitle: "这个 runtime 面板还没准备好",
      blankRuntimeBody: "我们已经知道这台 runtime 在哪，但它还没有发布适合直接展示的面板数据。现在先把上面的控制平面摘要当作准绳更合适。",
      blankSidecarTitle: "这个 sidecar 面板还没准备好",
      blankSidecarBody: "配对的诊断 sidecar 已经配置好了，但还没有产出可稳定展示的状态快照。现在先看控制平面视图，再按需刷新。",
      blankFetchFailedTitle: "这个面板暂时不适合直接打开",
      blankFetchFailedBody: "最近一次状态刷新失败了，这时直接展示原始 endpoint 往往比帮助更容易误导。先刷新，再回来查看会更稳。",
      blankHintRefreshRuntime: "先刷新一下 runtime 状态。",
      blankHintRefreshSidecar: "先刷新一下 sidecar 状态。",
      blankHintEndpoint: "endpoint",
      breadcrumbFleet: "runtime 面板",
      breadcrumbSource: "来源",
      breadcrumbView: "当前视图",
      currentView: "当前视图",
      sourceUrl: "来源地址",
      sourceStatus: "来源状态",
      trustTitle: "可信度提示",
      trustObserved: "已观测到 runtime 状态",
      trustObservedMessage: "这块子面板背后已经有可用的 gewyvern latest snapshot，一般可以把它当成实时 runtime 上下文来读。",
      trustUnobserved: "runtime 尚未观测",
      trustUnobservedMessage: "这条 runtime 还没有发布 latest snapshot，所以在状态到达前，更适合把子面板理解成一个薄的 endpoint 壳。",
      trustFetchFailed: "状态抓取失败",
      trustFetchFailedMessage: "控制面这次没能刷新这条 runtime 的状态，所以右侧子面板当前可能是陈旧的，或者已经不可达。",
      trustSidecarObserved: "Sidecar 状态已观测",
      trustSidecarObservedMessage: "这块子面板背后已经能连到 paired etragon sidecar，可以把它当成邻近诊断搭档的实时上下文来读。",
      trustSidecarUnobserved: "Sidecar 尚未观测",
      trustSidecarUnobservedMessage: "这条 runtime 已经配置了 paired etragon endpoint，但控制面还没有拿到 sidecar 状态快照。",
      trustSidecarFetchFailed: "Sidecar 状态抓取失败",
      trustSidecarFetchFailedMessage: "控制面这次没能刷新 paired etragon sidecar，所以右侧 sidecar 子面板当前可能是陈旧的，或者已经不可达。",
      trustNoSidecar: "没有 paired sidecar",
      trustNoSidecarMessage: "这条 runtime 当前还没有配置 etragon sidecar endpoint。",
      trustMeta: "状态来源：{source} · 快照：{snapshot}",
      trustRefreshStatus: "立即刷新状态",
      trustRefreshSidecar: "立即刷新 Sidecar",
      openExternal: "新标签打开",
      sources: {
        runtime: "Runtime",
        sidecar: "Sidecar",
      },
      views: {
        root: "主页",
        health: "健康",
        meta: "最新 Meta",
        summary: "摘要",
        analysis: "分析",
        targets: "Targets",
        sidecarRoot: "Sidecar 主页",
        sidecarHealth: "Sidecar 健康",
        sidecarStatus: "Sidecar 状态",
        sidecarEnrichment: "补强",
        sidecarOpinion: "诊断意见",
      },
    },
    register: {
      title: "注册 Runtime",
      intake: "轻量 intake",
      name: "名称",
      namePlaceholder: "gw-prod-edge-01",
      endpoint: "Endpoint",
      endpointPlaceholder: "http://127.0.0.1:9910",
      sidecarEndpoint: "Sidecar Endpoint",
      sidecarEndpointPlaceholder: "http://127.0.0.1:4321",
      pairingToken: "配对令牌",
      tokenPlaceholder: "token-123",
      fetchCapabilities: "注册时从 gewyvern 拉取 capability 和 latest-meta",
      submit: "注册 Runtime",
      clear: "清空表单",
      untouched: "还没有提交 runtime。",
      previewTitle: "实时预览",
      previewName: "名称",
      previewSlice: "归属切片",
      previewEndpoint: "endpoint",
      previewSidecar: "sidecar",
      previewCapabilityFetch: "能力抓取",
      suggested: "建议",
      pendingRuntimeName: "等待生成 runtime 名称",
      endpointPending: "待输入",
      endpointValid: "有效",
      endpointInvalid: "无效",
      sidecarUnpaired: "未配对",
      capabilityEnabled: "开启",
      capabilityDisabled: "关闭",
      blockedEndpoint: "注册已拦截：endpoint 必须以 http:// 或 https:// 开头，并且是合法 URL。",
      blockedSidecarEndpoint: "注册已拦截：sidecar endpoint 必须以 http:// 或 https:// 开头，并且是合法 URL。",
      blockedDuplicate: "注册已拦截：{reason} 已存在于 {name} ({endpoint})。",
      duplicateNameAndEndpoint: "名称和 endpoint",
      duplicateName: "名称",
      duplicateEndpoint: "endpoint",
      registering: "正在注册 runtime...",
      registered: "已将 {name} ({runtimeId}) 注册到 {slice}，当前状态为 {status}。",
      failed: "注册失败：{message}。如果这条 runtime 已经存在，建议直接在表格里选中它。",
      allRuntimes: "全部 runtimes",
    },
    persistence: {
      title: "持久化",
      chip: "控制面状态",
      yes: "是",
      no: "否",
      saveNow: "立即保存",
      exportState: "导出状态",
      importState: "导入状态",
      enabled: "已启用",
      schema: "schema",
      state: "状态",
      stateFile: "状态文件",
      lastSaved: "最近保存",
      restoredRuntimes: "恢复 runtimes",
      restoredSessions: "恢复 sessions",
      statePath: "状态文件路径",
      backupPath: "备份路径",
      schemaVersion: "schema 版本",
      lastSavedAt: "最近保存时间",
      lastSaveError: "最近保存错误",
      restoredFromSave: "恢复来源",
      configured: "已配置",
      missing: "缺失",
      never: "从未",
      unknown: "未知",
      none: "无",
      clean: "已同步",
      dirty: "有变更",
      saving: "正在保存控制面状态...",
      saved: "控制面状态已保存。",
      saveFailed: "保存失败：{message}",
      exporting: "正在导出控制面状态...",
      exported: "控制面状态已导出。",
      exportFailed: "导出失败：{message}",
      importing: "正在从 {file} 导入控制面状态...",
      invalidJson: "所选文件不是合法 JSON",
      imported: "已导入 {runtimes} 个 runtime 和 {sessions} 个 session。",
      importFailed: "导入失败：{message}",
    },
    attention: {
      noReasons: "当前没有 active attention reasons。",
      reasonLine: "{reason} · {count} 个 runtime",
      noRuntimes: "当前切片里没有需要关注的 runtime。",
      critical: "严重",
      warning: "警告",
      statusFetchFailed: "状态抓取失败",
      sidecarStatusFetchFailed: "sidecar 状态抓取失败",
      noLatestSnapshot: "没有 latest snapshot",
      noAnalysisJson: "没有 analysis json",
    },
    sessions: {
      title: "Sessions",
      none: "当前还没有 session。",
      runtime: "runtime",
    },
    metrics: {
      runtimes: "runtimes",
      latestSnapshots: "latest snapshots",
      summaryJson: "summary json",
      analysisJson: "analysis json",
      sidecarContext: "sidecar context",
      diagnosticOpinions: "diagnostic opinions",
      pairedSidecars: "paired sidecars",
      healthySidecars: "healthy sidecars",
      critical: "严重",
      warning: "警告",
    },
    groups: {
      snapshotKinds: "快照类型",
      statusSources: "状态来源",
      sidecarStatusSources: "sidecar 状态来源",
      environments: "环境",
      clusters: "集群",
      roles: "角色",
      empty: "当前还没有分组数据。",
    },
    statuses: {
      fetchFailed: "抓取失败",
      unobserved: "未观测",
      observedSnapshot: "{kind} 快照",
      observed: "已观测",
      sidecarObserved: "sidecar 已观测",
      sidecarStarting: "sidecar 启动中",
      sidecarDegraded: "sidecar 已降级",
      sidecarFetchFailed: "sidecar 抓取失败",
    },
    notifications: {
      noRuntimeSelected: "当前没有选中的 runtime。",
      runtimeLinkCopied: "已复制 runtime 链接。",
      runtimeLinkFailed: "复制链接失败：{message}",
      runtimeRefreshAll: "刷新该节点的全部信息",
      runtimeRefreshStatus: "刷新该节点状态",
      runtimeRefreshCapabilities: "刷新该节点能力",
      runtimeRefreshComplete: "{label} 完成。",
      runtimeRefreshFailed: "{label} 失败：{message}",
      loading: "正在加载控制面状态...",
      loaded: "已加载 {count} 个 runtime。",
      dashboardLoadFailed: "面板加载失败：{message}",
      fleetRefreshAll: "整组全部刷新",
      fleetStatusRefresh: "整组状态刷新",
      fleetCapabilityRefresh: "整组能力刷新",
      fleetRefreshComplete: "{label} 完成。",
      fleetRefreshFailed: "{label} 失败：{message}",
      badgeUpdated: "已更新",
    },
  },
};

const state = {
  filter: {
    environment: "",
    cluster: "",
    role: "",
  },
  languagePreference: "auto",
  language: "en",
  themePreference: "auto",
  theme: "light",
  activeTab: "overview",
  activeOverviewTab: "summary",
  activeRuntimeMainTab: "select",
  activeRuntimeSideTab: "detail",
  activeRuntimeDetailTab: "identity",
  runtimePanelView: "root",
  runtimeSearch: "",
  runtimeSort: "name",
  selectedRuntimeId: null,
  recentBadgeRefresh: {
    runtime: null,
    sidecar: null,
  },
  latestRuntimes: [],
  registerNameTouched: false,
  adminToken: "",
  adminTokenVisible: false,
  adminTokenTestState: "never",
  adminTokenTestAt: null,
  cache: {
    capabilities: null,
    fleetSummary: null,
    attentionSummary: null,
    attentionList: null,
    runtimes: null,
    sessions: null,
  },
};

const storageKeys = {
  languagePreference: "leserpent.languagePreference",
  themePreference: "leserpent.themePreference",
  adminToken: "leserpent.adminToken",
  adminTokenTestState: "leserpent.adminTokenTestState",
  adminTokenTestAt: "leserpent.adminTokenTestAt",
};

const nodes = {
  fleetSummaryCards: document.getElementById("fleet-summary-cards"),
  fleetSummaryGroups: document.getElementById("fleet-summary-groups"),
  persistenceCards: document.getElementById("persistence-cards"),
  persistenceDetails: document.getElementById("persistence-details"),
  persistenceSaveNow: document.getElementById("persistence-save-now"),
  persistenceExportState: document.getElementById("persistence-export-state"),
  persistenceImportState: document.getElementById("persistence-import-state"),
  persistenceImportFile: document.getElementById("persistence-import-file"),
  attentionSummaryCards: document.getElementById("attention-summary-cards"),
  attentionReasons: document.getElementById("attention-reasons"),
  attentionList: document.getElementById("attention-list"),
  sessionList: document.getElementById("session-list"),
  runtimeTableBody: document.getElementById("runtime-table-body"),
  fleetFilterChip: document.getElementById("fleet-filter-chip"),
  attentionCount: document.getElementById("attention-count"),
  sessionCount: document.getElementById("session-count"),
  runtimeCount: document.getElementById("runtime-count"),
  runtimeWorkspace: document.getElementById("runtime-workspace"),
  runtimeMainTabButtons: Array.from(document.querySelectorAll(".runtime-main-tab-button")),
  runtimeMainPanels: Array.from(document.querySelectorAll(".runtime-main-panel")),
  runtimeSearch: document.getElementById("runtime-search"),
  runtimeSort: document.getElementById("runtime-sort"),
  runtimeDetailChip: document.getElementById("runtime-detail-chip"),
  runtimeDetailActions: document.getElementById("runtime-detail-actions"),
  runtimeDetailEmpty: document.getElementById("runtime-detail-empty"),
  runtimeDetailPanel: document.getElementById("runtime-detail-panel"),
  runtimeDetailIdentity: document.getElementById("runtime-detail-identity"),
  runtimeDetailStatus: document.getElementById("runtime-detail-status"),
  runtimeDetailCapabilities: document.getElementById("runtime-detail-capabilities"),
  runtimeDetailAttention: document.getElementById("runtime-detail-attention"),
  runtimeDetailRefreshAll: document.getElementById("runtime-detail-refresh-all"),
  runtimeDetailRefreshStatus: document.getElementById("runtime-detail-refresh-status"),
  runtimeDetailRefreshCapabilities: document.getElementById("runtime-detail-refresh-capabilities"),
  runtimeDetailRefreshSidecar: document.getElementById("runtime-detail-refresh-sidecar"),
  runtimeDetailCopyLink: document.getElementById("runtime-detail-copy-link"),
  runtimeDetailSubtabButtons: Array.from(document.querySelectorAll(".runtime-detail-subtab-button")),
  runtimeDetailSections: Array.from(document.querySelectorAll(".runtime-detail-section")),
  runtimePanelChip: document.getElementById("runtime-panel-chip"),
  runtimePanelBreadcrumb: document.getElementById("runtime-panel-breadcrumb"),
  runtimePanelTrust: document.getElementById("runtime-panel-trust"),
  runtimePanelSourceSwitch: document.getElementById("runtime-panel-source-switch"),
  runtimePanelSourceButtons: Array.from(document.querySelectorAll(".runtime-panel-source-button")),
  runtimePanelSourceBadges: document.getElementById("runtime-panel-source-badges"),
  runtimePanelActions: document.getElementById("runtime-panel-actions"),
  runtimePanelEmpty: document.getElementById("runtime-panel-empty"),
  runtimePanelFrameWrap: document.getElementById("runtime-panel-frame-wrap"),
  runtimePanelBlank: document.getElementById("runtime-panel-blank"),
  runtimePanelFrame: document.getElementById("runtime-panel-frame"),
  runtimePanelUrl: document.getElementById("runtime-panel-url"),
  runtimePanelTabs: Array.from(document.querySelectorAll(".runtime-panel-tab")),
  runtimePanelOpenExternal: document.getElementById("runtime-panel-open-external"),
  statusLine: document.getElementById("status-line"),
  environmentInput: document.getElementById("filter-environment"),
  clusterInput: document.getElementById("filter-cluster"),
  roleInput: document.getElementById("filter-role"),
  applyFiltersButton: document.getElementById("apply-filters"),
  clearFiltersButton: document.getElementById("clear-filters"),
  refreshAllButton: document.getElementById("refresh-all"),
  refreshStatusButton: document.getElementById("refresh-status"),
  refreshCapabilitiesButton: document.getElementById("refresh-capabilities"),
  registerForm: document.getElementById("register-form"),
  registerName: document.getElementById("register-name"),
  registerEndpoint: document.getElementById("register-endpoint"),
  registerSidecarEndpoint: document.getElementById("register-sidecar-endpoint"),
  registerToken: document.getElementById("register-token"),
  registerRuntimeEnvironment: document.getElementById("register-runtime-environment"),
  registerRuntimeCluster: document.getElementById("register-runtime-cluster"),
  registerRuntimeRole: document.getElementById("register-runtime-role"),
  registerFetchCapabilities: document.getElementById("register-fetch-capabilities"),
  registerFormClear: document.getElementById("register-form-clear"),
  registerPreview: document.getElementById("register-preview"),
  registerResult: document.getElementById("register-result"),
  languageSelect: document.getElementById("language-select"),
  themeSelect: document.getElementById("theme-select"),
  securityDetails: document.getElementById("security-details"),
  adminTokenInput: document.getElementById("admin-token-input"),
  adminTokenToggleVisibility: document.getElementById("admin-token-toggle-visibility"),
  adminTokenTest: document.getElementById("admin-token-test"),
  adminTokenClear: document.getElementById("admin-token-clear"),
  adminTokenState: document.getElementById("admin-token-state"),
  adminTokenLastTest: document.getElementById("admin-token-last-test"),
  tabButtons: Array.from(document.querySelectorAll(".tab-button")),
  tabPanels: Array.from(document.querySelectorAll(".tab-panel")),
  overviewSubtabButtons: Array.from(document.querySelectorAll(".overview-subtab-button")),
  overviewSubpanels: Array.from(document.querySelectorAll(".overview-subpanel")),
};

function t(key, params = {}) {
  const parts = key.split(".");
  let value = translations[state.language] || translations.en;
  for (const part of parts) {
    value = value?.[part];
  }

  if (typeof value !== "string") {
    value = key;
  }

  return value.replace(/\{(\w+)\}/g, (_, name) => String(params[name] ?? `{${name}}`));
}

function getStoredLanguagePreference() {
  try {
    return window.localStorage.getItem(storageKeys.languagePreference);
  } catch {
    return null;
  }
}

function setStoredLanguagePreference(value) {
  try {
    if (!value || value === "auto") {
      window.localStorage.removeItem(storageKeys.languagePreference);
      return;
    }
    window.localStorage.setItem(storageKeys.languagePreference, value);
  } catch {
    // ignore storage failures
  }
}

function getStoredThemePreference() {
  try {
    return window.localStorage.getItem(storageKeys.themePreference);
  } catch {
    return null;
  }
}

function setStoredThemePreference(value) {
  try {
    if (!value || value === "auto") {
      window.localStorage.removeItem(storageKeys.themePreference);
      return;
    }
    window.localStorage.setItem(storageKeys.themePreference, value);
  } catch {
    // ignore storage failures
  }
}

function getStoredAdminToken() {
  try {
    return window.localStorage.getItem(storageKeys.adminToken) || "";
  } catch {
    return "";
  }
}

function setStoredAdminToken(value) {
  try {
    const normalized = value?.trim() || "";
    if (!normalized) {
      window.localStorage.removeItem(storageKeys.adminToken);
      return;
    }
    window.localStorage.setItem(storageKeys.adminToken, normalized);
  } catch {
    // ignore storage failures
  }
}

function getStoredAdminTokenTestState() {
  try {
    return window.localStorage.getItem(storageKeys.adminTokenTestState) || "never";
  } catch {
    return "never";
  }
}

function getStoredAdminTokenTestAt() {
  try {
    return window.localStorage.getItem(storageKeys.adminTokenTestAt) || null;
  } catch {
    return null;
  }
}

function setStoredAdminTokenTest(stateValue, atValue) {
  try {
    window.localStorage.setItem(storageKeys.adminTokenTestState, stateValue || "never");
    if (atValue) {
      window.localStorage.setItem(storageKeys.adminTokenTestAt, atValue);
    } else {
      window.localStorage.removeItem(storageKeys.adminTokenTestAt);
    }
  } catch {
    // ignore storage failures
  }
}

function updateAdminTokenVisibilityButton() {
  if (!nodes.adminTokenToggleVisibility || !nodes.adminTokenInput) {
    return;
  }
  nodes.adminTokenInput.type = state.adminTokenVisible ? "text" : "password";
  nodes.adminTokenToggleVisibility.textContent = state.adminTokenVisible
    ? t("security.hideToken")
    : t("security.showToken");
}

function closeSecurityDetails() {
  if (!nodes.securityDetails) {
    return;
  }
  nodes.securityDetails.open = false;
}


function browserPreferredLanguage() {
  const browserLanguage = navigator.language || navigator.languages?.[0] || "en";
  return browserLanguage.toLowerCase().startsWith("zh") ? "zh-CN" : "en";
}

function browserPreferredTheme() {
  return window.matchMedia?.("(prefers-color-scheme: dark)")?.matches ? "dark" : "light";
}

function resolveLanguage(preference) {
  if (preference && preference !== "auto" && translations[preference]) {
    return preference;
  }
  return browserPreferredLanguage();
}

function resolveTheme(preference) {
  if (preference === "light" || preference === "dark") {
    return preference;
  }
  return browserPreferredTheme();
}

function applyTheme() {
  document.documentElement.dataset.theme = state.theme;
  if (nodes.themeSelect) {
    nodes.themeSelect.value = state.themePreference;
  }
}

function buildQuery() {
  const params = new URLSearchParams();
  if (state.languagePreference && state.languagePreference !== "auto") params.set("lang", state.languagePreference);
  if (state.themePreference && state.themePreference !== "auto") params.set("theme", state.themePreference);
  if (state.activeTab && state.activeTab !== "overview") params.set("tab", state.activeTab);
  if (state.activeOverviewTab && state.activeOverviewTab !== "summary") params.set("overview", state.activeOverviewTab);
  if (state.activeRuntimeMainTab && state.activeRuntimeMainTab !== "select") params.set("runtimePane", state.activeRuntimeMainTab);
  if (state.activeRuntimeDetailTab && state.activeRuntimeDetailTab !== "identity") params.set("runtimeDetail", state.activeRuntimeDetailTab);
  if (state.runtimePanelView && state.runtimePanelView !== "root") params.set("runtimeView", state.runtimePanelView);
  if (state.filter.environment) params.set("environment", state.filter.environment);
  if (state.filter.cluster) params.set("cluster", state.filter.cluster);
  if (state.filter.role) params.set("role", state.filter.role);
  if (state.runtimeSearch) params.set("search", state.runtimeSearch);
  if (state.runtimeSort && state.runtimeSort !== "name") params.set("sort", state.runtimeSort);
  if (state.selectedRuntimeId) params.set("runtimeId", state.selectedRuntimeId);
  const qs = params.toString();
  return qs ? `?${qs}` : "";
}

function hydrateStateFromLocation() {
  const params = new URLSearchParams(window.location.search);
  const lang = params.get("lang");
  const theme = params.get("theme");
  const storedPreference = getStoredLanguagePreference();
  const storedThemePreference = getStoredThemePreference();
  state.languagePreference =
    (lang && (lang === "auto" || translations[lang])) ? lang :
      (storedPreference && (storedPreference === "auto" || translations[storedPreference])) ? storedPreference :
        "auto";
  state.language = resolveLanguage(state.languagePreference);
  state.themePreference =
    (theme && (theme === "auto" || theme === "light" || theme === "dark")) ? theme :
      (storedThemePreference && (storedThemePreference === "auto" || storedThemePreference === "light" || storedThemePreference === "dark")) ? storedThemePreference :
        "auto";
  state.theme = resolveTheme(state.themePreference);
  state.adminToken = getStoredAdminToken();
  state.adminTokenVisible = false;
  state.adminTokenTestState = getStoredAdminTokenTestState();
  state.adminTokenTestAt = getStoredAdminTokenTestAt();
  state.activeTab = params.get("tab") || "overview";
  if (state.activeTab === "register") {
    state.activeTab = "runtimes";
    state.activeRuntimeMainTab = "register";
  }
  state.activeOverviewTab = params.get("overview") || "summary";
  state.activeRuntimeMainTab =
    state.activeRuntimeMainTab ||
    params.get("runtimePane") ||
    params.get("runtimeMode") ||
    params.get("runtimeSide") ||
    "select";
  state.activeRuntimeSideTab = state.activeRuntimeMainTab === "panel" ? "panel" : "detail";
  state.activeRuntimeDetailTab = params.get("runtimeDetail") || "identity";
  state.runtimePanelView = params.get("runtimeView") || "root";
  state.filter.environment = params.get("environment") || "";
  state.filter.cluster = params.get("cluster") || "";
  state.filter.role = params.get("role") || "";
  state.runtimeSearch = params.get("search") || "";
  state.runtimeSort = params.get("sort") || "name";
  state.selectedRuntimeId = params.get("runtimeId") || null;
}

function syncLocation() {
  const next = `${window.location.pathname}${buildQuery()}`;
  window.history.replaceState(null, "", next);
}

function escapeHtml(value) {
  return String(value ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

function applyTranslations() {
  document.documentElement.lang = state.language;
  document.title = `leserpent · ${t("hero.title")}`;
  nodes.languageSelect.value = state.languagePreference;
  if (nodes.themeSelect) {
    nodes.themeSelect.value = state.themePreference;
  }

  for (const node of document.querySelectorAll("[data-i18n]")) {
    node.textContent = t(node.dataset.i18n);
  }

  for (const node of document.querySelectorAll("[data-i18n-placeholder]")) {
    node.placeholder = t(node.dataset.i18nPlaceholder);
  }

  const options = Array.from(nodes.languageSelect.options);
  for (const option of options) {
    if (option.value === "auto") {
      option.textContent = t("language.auto");
    } else if (option.value === "en") {
      option.textContent = t("language.english");
    } else if (option.value === "zh-CN") {
      option.textContent = t("language.simplifiedChinese");
    }
  }

  if (nodes.themeSelect) {
    const themeOptions = Array.from(nodes.themeSelect.options);
    for (const option of themeOptions) {
      if (option.value === "auto") {
        option.textContent = t("theme.auto");
      } else if (option.value === "light") {
        option.textContent = t("theme.light");
      } else if (option.value === "dark") {
        option.textContent = t("theme.dark");
      }
    }
  }
}

function applyTabShell() {
  for (const button of nodes.tabButtons) {
    button.classList.toggle("active", button.dataset.tab === state.activeTab);
  }
  for (const panel of nodes.tabPanels) {
    panel.classList.toggle("active", panel.dataset.tabPanel === state.activeTab);
  }
  for (const button of nodes.runtimeMainTabButtons) {
    button.classList.toggle("active", button.dataset.runtimeMainTab === state.activeRuntimeMainTab);
  }
  for (const panel of nodes.runtimeMainPanels) {
    const isActive = panel.dataset.runtimeMainPanel === state.activeRuntimeMainTab;
    panel.classList.toggle("active", isActive);
    panel.hidden = !isActive;
  }
  for (const button of nodes.overviewSubtabButtons) {
    button.classList.toggle("active", button.dataset.overviewTab === state.activeOverviewTab);
  }
  for (const panel of nodes.overviewSubpanels) {
    panel.classList.toggle("active", panel.dataset.overviewPanel === state.activeOverviewTab);
  }
  if (nodes.runtimeWorkspace) {
    nodes.runtimeWorkspace.classList.toggle("register-focus", state.activeRuntimeMainTab === "register");
    nodes.runtimeWorkspace.classList.toggle("panel-focus", state.activeRuntimeMainTab === "panel");
    nodes.runtimeWorkspace.classList.toggle("detail-focus", state.activeRuntimeMainTab === "detail");
    nodes.runtimeWorkspace.dataset.mainTab = state.activeRuntimeMainTab;
  }
  for (const button of nodes.runtimeDetailSubtabButtons) {
    button.classList.toggle("active", button.dataset.runtimeDetailTab === state.activeRuntimeDetailTab);
  }
  for (const panel of nodes.runtimeDetailSections) {
    panel.classList.toggle("active", panel.dataset.runtimeDetailPanel === state.activeRuntimeDetailTab);
  }
}

function isSidecarView(view = state.runtimePanelView) {
  return typeof view === "string" && view.startsWith("sidecar-");
}

function runtimePanelSource(view = state.runtimePanelView) {
  return isSidecarView(view) ? "sidecar" : "runtime";
}

function shouldRenderRuntimePanelBlank(runtime, trust, view = state.runtimePanelView) {
  const source = runtimePanelSource(view);
  if (source === "sidecar") {
    return !runtime.sidecarEndpoint || runtime.sidecarStatus?.statusSource === "fetch_failed" || runtime.sidecarStatus?.statusSource === "unobserved";
  }

  return runtime.status.statusSource === "fetch_failed"
    || runtime.status.statusSource === "unobserved"
    || !runtime.status.hasLatestSnapshot
    || runtime.status.snapshotKind === "none";
}

function renderRuntimePanelBlank(runtime, trust, url, view = state.runtimePanelView) {
  const source = runtimePanelSource(view);
  const isFetchFailed = trust.source === "fetch_failed";
  const title = isFetchFailed
    ? t("runtimePanel.blankFetchFailedTitle")
    : source === "sidecar"
      ? t("runtimePanel.blankSidecarTitle")
      : t("runtimePanel.blankRuntimeTitle");
  const body = isFetchFailed
    ? t("runtimePanel.blankFetchFailedBody")
    : source === "sidecar"
      ? t("runtimePanel.blankSidecarBody")
      : t("runtimePanel.blankRuntimeBody");
  const hint = source === "sidecar"
    ? t("runtimePanel.blankHintRefreshSidecar")
    : t("runtimePanel.blankHintRefreshRuntime");

  nodes.runtimePanelBlank.classList.remove("hidden");
  nodes.runtimePanelBlank.innerHTML = `
    <div class="runtime-panel-blank-copy">
      <strong>${escapeHtml(title)}</strong>
      <p>${escapeHtml(body)}</p>
      <div class="runtime-panel-blank-hints">
        <span class="tag-pill">${escapeHtml(hint)}</span>
      </div>
    </div>
  `;
}

function compactTrustMessage(trust, view = state.runtimePanelView) {
  const source = runtimePanelSource(view);
  if (source === "sidecar") {
    if (trust.source === "fetch_failed") return t("runtimePanel.compactTrustSidecarFetchFailed");
    if (trust.source === "unobserved") return t("runtimePanel.compactTrustSidecarUnobserved");
    if (trust.label === t("runtimePanel.trustNoSidecar")) return t("runtimePanel.compactTrustNoSidecar");
    return t("runtimePanel.compactTrustSidecarObserved");
  }

  if (trust.source === "fetch_failed") return t("runtimePanel.compactTrustFetchFailed");
  if (trust.source === "unobserved") return t("runtimePanel.compactTrustUnobserved");
  return t("runtimePanel.compactTrustObserved");
}

function defaultRuntimePanelViewForSource(source) {
  return source === "sidecar" ? "sidecar-root" : "root";
}

function markBadgeRefresh(kind) {
  if (kind !== "runtime" && kind !== "sidecar") {
    return;
  }
  state.recentBadgeRefresh[kind] = Date.now();
}

function badgeRecentlyUpdated(kind) {
  const value = state.recentBadgeRefresh[kind];
  return typeof value === "number" && Date.now() - value < 2400;
}

function switchRuntimePanelSource(source, runtime) {
  if (source === "sidecar" && !runtime?.sidecarEndpoint) {
    return;
  }

  state.runtimePanelView = defaultRuntimePanelViewForSource(source);
  renderRuntimePanel(runtime);
  syncLocation();
}

function runtimeSourceBadge(status) {
  if (!status || status.statusSource === "fetch_failed") {
    return { tone: "bad", text: t("statuses.fetchFailed"), refreshKind: "status" };
  }
  if (!status.hasLatestSnapshot) {
    return { tone: "warn", text: t("statuses.unobserved"), refreshKind: "status" };
  }
  return {
    tone: "good",
    text: t("statuses.observedSnapshot", { kind: status.snapshotKind || t("statuses.observed") }),
    refreshKind: null,
  };
}

function runtimePanelUrl(runtime, view = state.runtimePanelView) {
  if (!runtime) {
    return "";
  }

  if (isSidecarView(view)) {
    if (!runtime.sidecarEndpoint) {
      return "";
    }

    const sidecarBase = runtime.sidecarEndpoint.replace(/\/+$/, "");
    switch (view) {
      case "sidecar-health":
        return `${sidecarBase}/health`;
      case "sidecar-status":
        return `${sidecarBase}/v1/latest/status`;
      case "sidecar-enrichment":
        return `${sidecarBase}/v1/latest/evidence-chain-enrichment.json`;
      case "sidecar-opinion":
        return `${sidecarBase}/v1/latest/diagnostic-opinion.json`;
      case "sidecar-root":
      default:
        return sidecarBase;
    }
  }

  if (!runtime.endpoint) {
    return "";
  }

  const base = runtime.endpoint.replace(/\/+$/, "");
  switch (view) {
    case "health":
      return `${base}/health`;
    case "meta":
      return `${base}/v1/latest/meta`;
    case "summary":
      return `${base}/v1/latest/summary.json`;
    case "analysis":
      return `${base}/v1/latest/analysis.json`;
    case "targets":
      return `${base}/v1/latest/targets`;
    case "root":
    default:
      return base;
  }
}

function runtimePanelTrustState(runtime, view = state.runtimePanelView) {
  if (isSidecarView(view)) {
    if (!runtime?.sidecarEndpoint) {
      return {
        tone: "warn",
        label: t("runtimePanel.trustNoSidecar"),
        message: t("runtimePanel.trustNoSidecarMessage"),
        source: "none",
        snapshot: "sidecar",
        refreshKind: null,
      };
    }

    const sidecarStatus = runtime.sidecarStatus;
    if (!sidecarStatus) {
      return {
        tone: "warn",
        label: t("runtimePanel.trustSidecarUnobserved"),
        message: t("runtimePanel.trustSidecarUnobservedMessage"),
        source: "unobserved",
        snapshot: "starting",
        refreshKind: "sidecar",
      };
    }

    if (sidecarStatus.statusSource === "fetch_failed") {
      return {
        tone: "bad",
        label: t("runtimePanel.trustSidecarFetchFailed"),
        message: t("runtimePanel.trustSidecarFetchFailedMessage"),
        source: sidecarStatus.statusSource,
        snapshot: sidecarStatus.daemonStatus || "unknown",
        refreshKind: "sidecar",
      };
    }

    if (sidecarStatus.statusSource === "unobserved" || sidecarStatus.daemonStatus === "starting") {
      return {
        tone: "warn",
        label: t("runtimePanel.trustSidecarUnobserved"),
        message: t("runtimePanel.trustSidecarUnobservedMessage"),
        source: sidecarStatus.statusSource,
        snapshot: sidecarStatus.daemonStatus || "starting",
        refreshKind: "sidecar",
      };
    }

    return {
      tone: sidecarStatus.daemonStatus === "degraded" ? "warn" : "good",
      label: t("runtimePanel.trustSidecarObserved"),
      message: t("runtimePanel.trustSidecarObservedMessage"),
      source: sidecarStatus.statusSource,
      snapshot: sidecarStatus.daemonStatus || "ready",
      refreshKind: null,
    };
  }

  const status = runtime?.status;
  if (!status || status.statusSource === "fetch_failed") {
    return {
      tone: "bad",
      label: t("runtimePanel.trustFetchFailed"),
      message: t("runtimePanel.trustFetchFailedMessage"),
      source: status?.statusSource || "fetch_failed",
      snapshot: status?.snapshotKind || t("runtimeDetail.none"),
      refreshKind: "status",
    };
  }

  if (!status.hasLatestSnapshot) {
    return {
      tone: "warn",
      label: t("runtimePanel.trustUnobserved"),
      message: t("runtimePanel.trustUnobservedMessage"),
      source: status.statusSource,
      snapshot: status.snapshotKind || t("runtimeDetail.none"),
      refreshKind: null,
    };
  }

  return {
    tone: "good",
    label: t("runtimePanel.trustObserved"),
    message: t("runtimePanel.trustObservedMessage"),
    source: status.statusSource,
    snapshot: status.snapshotKind || t("runtimeDetail.none"),
    refreshKind: null,
  };
}

async function testAdminToken() {
  const token = state.adminToken?.trim();
  if (!token) {
    nodes.statusLine.textContent = t("security.tokenMissing");
    nodes.securityDetails?.setAttribute("open", "open");
    return;
  }

  state.adminTokenTestState = "running";
  state.adminTokenTestAt = null;
  setStoredAdminTokenTest(state.adminTokenTestState, state.adminTokenTestAt);
  renderSecurityState();
  nodes.statusLine.textContent = t("security.tokenTestRunning");
  try {
    const capabilities = await getJson("/v1/capabilities");
    state.cache.capabilities = capabilities;
    state.adminTokenTestState = "ok";
    state.adminTokenTestAt = new Date().toLocaleString();
    setStoredAdminTokenTest(state.adminTokenTestState, state.adminTokenTestAt);
    nodes.statusLine.textContent = t("security.tokenTestOk");
    renderSecurityState(capabilities);
  } catch (error) {
    console.error(error);
    state.adminTokenTestState = "failed";
    state.adminTokenTestAt = new Date().toLocaleString();
    setStoredAdminTokenTest(state.adminTokenTestState, state.adminTokenTestAt);
    const message = looksLikeTokenDenied(error.message)
      ? t("security.tokenRequired")
      : error.message;
    nodes.statusLine.textContent = t("security.tokenTestFailed", { message });
    renderSecurityState();
    nodes.securityDetails?.setAttribute("open", "open");
  }
}

async function getJson(path) {
  const response = await fetch(path, { headers: apiHeaders() });
  if (!response.ok) {
    throw new Error(await decodeApiError(response, path));
  }
  return response.json();
}

async function postJson(path) {
  const response = await fetch(path, {
    method: "POST",
    headers: apiHeaders({ intent: "mutate" }),
  });
  if (!response.ok) {
    throw new Error(await decodeApiError(response, path));
  }
  return response.json();
}

async function postJsonBody(path, body) {
  const response = await fetch(path, {
    method: "POST",
    headers: apiHeaders({ contentType: "application/json", intent: "mutate" }),
    body: JSON.stringify(body),
  });

  const payload = await response.json().catch(() => null);
  if (!response.ok) {
    const reason = payload?.reason || payload?.error || `${response.status}`;
    throw new Error(reason);
  }
  return payload;
}

function refreshLabel(kind) {
  return kind === "all"
    ? t("notifications.runtimeRefreshAll")
    : kind === "status"
      ? t("notifications.runtimeRefreshStatus")
      : kind === "sidecar"
        ? t("runtimeDetail.refreshSidecar")
        : t("notifications.runtimeRefreshCapabilities");
}

function renderMetricCards(target, items) {
  target.innerHTML = items.map(([label, value]) => `
    <div class="metric">
      <div class="metric-label">${escapeHtml(label)}</div>
      <div class="metric-value">${escapeHtml(value)}</div>
    </div>
  `).join("");
}

function renderGroupCards(target, groups) {
  const entries = Object.entries(groups);
  if (!entries.length) {
    target.innerHTML = `<div class="group-card"><div class="group-title">${escapeHtml(t("groups.empty"))}</div></div>`;
    return;
  }

  target.innerHTML = entries.map(([title, values]) => `
    <div class="group-card">
      <div class="group-title">${escapeHtml(title)}</div>
      <div class="group-list">
        ${Object.entries(values).map(([key, count]) => `
          <span class="tag-pill">${escapeHtml(key)}: ${escapeHtml(count)}</span>
        `).join("")}
      </div>
    </div>
  `).join("");
}

function renderAttentionReasons(summary) {
  const entries = Object.entries(summary.reasonCounts || {});
  if (!entries.length) {
    nodes.attentionReasons.innerHTML = `<div class="reason-line">${escapeHtml(t("attention.noReasons"))}</div>`;
    return;
  }

  nodes.attentionReasons.innerHTML = entries.map(([reason, count]) => `
    <div class="reason-line"><strong>${escapeHtml(t(`attention.${reason}`))}</strong> · ${escapeHtml(count)} ${escapeHtml(t("metrics.runtimes"))}</div>
  `).join("");
}

function renderPersistence(capabilities) {
  const persistence = capabilities.persistence || {
    enabled: false,
    schemaVersion: null,
    statePath: t("persistence.unknown"),
    backupStatePath: t("persistence.unknown"),
    lastSavedAt: null,
    isDirty: false,
    lastSaveError: null,
    restoredRuntimeCount: 0,
    restoredSessionCount: 0,
    restoredFromSavedAt: null,
  };

  renderMetricCards(nodes.persistenceCards, [
    [t("persistence.enabled"), persistence.enabled ? t("persistence.yes") : t("persistence.no")],
    [t("persistence.schema"), persistence.schemaVersion ?? t("persistence.unknown")],
    [t("persistence.state"), persistence.isDirty ? t("persistence.dirty") : t("persistence.clean")],
    [t("persistence.stateFile"), persistence.statePath ? t("persistence.configured") : t("persistence.missing")],
    [t("persistence.lastSaved"), persistence.lastSavedAt || t("persistence.never")],
    [t("persistence.restoredRuntimes"), persistence.restoredRuntimeCount ?? 0],
    [t("persistence.restoredSessions"), persistence.restoredSessionCount ?? 0],
  ]);

  nodes.persistenceDetails.innerHTML = `
    <div class="hint-line">${escapeHtml(t("persistence.statePath"))}: <strong>${escapeHtml(persistence.statePath || t("persistence.unknown"))}</strong></div>
    <div class="hint-line">${escapeHtml(t("persistence.backupPath"))}: <strong>${escapeHtml(persistence.backupStatePath || t("persistence.unknown"))}</strong></div>
    <div class="hint-line">${escapeHtml(t("persistence.schemaVersion"))}: <strong>${escapeHtml(persistence.schemaVersion ?? t("persistence.unknown"))}</strong></div>
    <div class="hint-line">${escapeHtml(t("persistence.state"))}: <strong>${escapeHtml(persistence.isDirty ? t("persistence.dirty") : t("persistence.clean"))}</strong></div>
    <div class="hint-line">${escapeHtml(t("persistence.lastSavedAt"))}: <strong>${escapeHtml(persistence.lastSavedAt || t("persistence.never"))}</strong></div>
    <div class="hint-line">${escapeHtml(t("persistence.lastSaveError"))}: <strong>${escapeHtml(persistence.lastSaveError || t("persistence.none"))}</strong></div>
    <div class="hint-line">${escapeHtml(t("persistence.restoredFromSave"))}: <strong>${escapeHtml(persistence.restoredFromSavedAt || t("persistence.none"))}</strong></div>
  `;
}

function renderAttentionList(payload) {
  const items = payload.runtimes || [];
  nodes.attentionCount.textContent = `${items.length} ${t("metrics.runtimes")}`;
  if (!items.length) {
    nodes.attentionList.innerHTML = `<div class="attention-item"><div class="item-meta">${escapeHtml(t("attention.noRuntimes"))}</div></div>`;
    return;
  }

  nodes.attentionList.innerHTML = items.map((item) => `
    <div class="attention-item ${escapeHtml(item.severity)}">
      <div class="item-head">
        <div>
          <h3>${escapeHtml(item.name)}</h3>
          <div class="item-meta">${escapeHtml(item.endpoint)}</div>
        </div>
        <div class="severity ${escapeHtml(item.severity)}">${escapeHtml(t(`attention.${item.severity}`))}</div>
      </div>
      <div class="item-meta">
        ${escapeHtml(item.tags.environment || t("runtimes.states.noEnv"))} · ${escapeHtml(item.tags.cluster || t("runtimes.states.noCluster"))} · ${escapeHtml(item.tags.role || t("runtimes.states.noRole"))}
      </div>
      <div class="reason-list">
        ${(item.reasons || []).map((reason) => `<span class="reason-pill">${escapeHtml(t(`attention.${reason}`) || reason)}</span>`).join("")}
      </div>
    </div>
  `).join("");
}

function renderSessions(payload) {
  const items = payload.sessions || [];
  nodes.sessionCount.textContent = `${items.length} ${t("tabs.sessions").toLowerCase()}`;
  if (!items.length) {
    nodes.sessionList.innerHTML = `<div class="session-item"><div class="item-meta">${escapeHtml(t("sessions.none"))}</div></div>`;
    return;
  }

  nodes.sessionList.innerHTML = items.map((item) => `
    <div class="session-item">
      <div class="item-head">
        <div>
          <h3>${escapeHtml(item.pipelineKind)}</h3>
          <div class="item-meta">${escapeHtml(item.requestedBy)}</div>
        </div>
        <div class="chip">${escapeHtml(item.status)}</div>
      </div>
      <div class="hint-line">${escapeHtml(t("sessions.runtime"))}: ${escapeHtml(item.runtimeId)}</div>
    </div>
  `).join("");
}

function statusBadge(status) {
  if (status.statusSource === "fetch_failed") {
    return { text: t("statuses.fetchFailed"), tone: "bad" };
  }
  if (!status.hasLatestSnapshot) {
    return { text: t("statuses.unobserved"), tone: "warn" };
  }
  return { text: t("statuses.observedSnapshot", { kind: status.snapshotKind || t("statuses.observed") }), tone: "good" };
}

function sidecarStatusBadge(sidecarStatus) {
  if (!sidecarStatus) {
    return { text: t("register.sidecarUnpaired"), tone: "warn", refreshKind: null };
  }
  if (sidecarStatus.statusSource === "fetch_failed") {
    return { text: t("statuses.sidecarFetchFailed"), tone: "bad", refreshKind: "sidecar" };
  }
  if (sidecarStatus.daemonStatus === "starting") {
    return { text: t("statuses.sidecarStarting"), tone: "warn", refreshKind: "sidecar" };
  }
  if (sidecarStatus.daemonStatus === "degraded") {
    return { text: t("statuses.sidecarDegraded"), tone: "warn", refreshKind: "sidecar" };
  }
  return { text: t("statuses.sidecarObserved"), tone: "good", refreshKind: null };
}

function runtimeStatusHint(status) {
  if (!status) {
    return t("statuses.unobserved");
  }
  if (status.statusSource === "fetch_failed") {
    return t("statuses.fetchFailed");
  }
  if (!status.hasLatestSnapshot) {
    return t("statuses.unobserved");
  }
  return t("statuses.observed");
}

function findDuplicateRuntime(name, endpoint) {
  const normalizedName = name.trim().toLowerCase();
  const normalizedEndpoint = endpoint.trim().toLowerCase();
  return state.latestRuntimes.find((runtime) =>
    runtime.name.toLowerCase() === normalizedName ||
    runtime.endpoint.toLowerCase() === normalizedEndpoint
  ) || null;
}

function isLikelyHttpEndpoint(endpoint) {
  if (!(endpoint.startsWith("http://") || endpoint.startsWith("https://"))) {
    return false;
  }

  try {
    const parsed = new URL(endpoint);
    return parsed.protocol === "http:" || parsed.protocol === "https:";
  } catch {
    return false;
  }
}

function suggestedRuntimeName(endpoint) {
  try {
    const parsed = new URL(endpoint);
    const hostBits = parsed.hostname
      .split(".")
      .filter(Boolean)
      .slice(0, 4)
      .map((bit) => bit.replace(/[^a-zA-Z0-9-]/g, "-"))
      .filter(Boolean);
    const portBit = parsed.port ? `-${parsed.port}` : "";
    const hostPart = hostBits.length ? hostBits.join("-").toLowerCase() : "runtime";
    return `gw-${hostPart}${portBit}`;
  } catch {
    return "";
  }
}

function maybePrefillRuntimeNameFromEndpoint() {
  if (state.registerNameTouched) {
    renderRegisterPreview();
    return;
  }

  const endpoint = nodes.registerEndpoint.value.trim();
  if (!isLikelyHttpEndpoint(endpoint)) {
    renderRegisterPreview();
    return;
  }

  const suggestion = suggestedRuntimeName(endpoint);
  if (suggestion) {
    nodes.registerName.value = suggestion;
  }
  renderRegisterPreview();
}

function renderRegisterPreview() {
  const endpoint = nodes.registerEndpoint.value.trim();
  const sidecarEndpoint = nodes.registerSidecarEndpoint.value.trim();
  const explicitName = nodes.registerName.value.trim();
  const endpointValid = endpoint.length > 0 && isLikelyHttpEndpoint(endpoint);
  const sidecarEndpointValid = sidecarEndpoint.length > 0 ? isLikelyHttpEndpoint(sidecarEndpoint) : true;
  const suggestedName = endpointValid ? suggestedRuntimeName(endpoint) : "";
  const effectiveName = explicitName || suggestedName || t("register.pendingRuntimeName");
  const endpointState = endpoint.length === 0
    ? t("register.endpointPending")
    : endpointValid ? t("register.endpointValid") : t("register.endpointInvalid");
  const sidecarState = sidecarEndpoint.length === 0
    ? t("register.sidecarUnpaired")
    : sidecarEndpointValid ? t("register.endpointValid") : t("register.endpointInvalid");
  const slice = [
    nodes.registerRuntimeEnvironment.value.trim(),
    nodes.registerRuntimeCluster.value.trim(),
    nodes.registerRuntimeRole.value.trim(),
  ].filter(Boolean).join(" / ") || t("register.allRuntimes");

  nodes.registerPreview.innerHTML = `
    <div><strong>${escapeHtml(t("register.previewTitle"))}</strong></div>
    <div class="hint-line">${escapeHtml(t("register.previewName"))}: <strong>${escapeHtml(effectiveName)}</strong>${!explicitName && suggestedName ? ` <span class="tag-pill">${escapeHtml(t("register.suggested"))}</span>` : ""}</div>
    <div class="hint-line">${escapeHtml(t("register.previewSlice"))}: <strong>${escapeHtml(slice)}</strong></div>
    <div class="hint-line">${escapeHtml(t("register.previewEndpoint"))}: <strong>${escapeHtml(endpointState)}</strong>${endpoint ? ` · ${escapeHtml(endpoint)}` : ""}</div>
    <div class="hint-line">${escapeHtml(t("register.previewSidecar"))}: <strong>${escapeHtml(sidecarState)}</strong>${sidecarEndpoint ? ` · ${escapeHtml(sidecarEndpoint)}` : ""}</div>
    <div class="hint-line">${escapeHtml(t("register.previewCapabilityFetch"))}: <strong>${escapeHtml(nodes.registerFetchCapabilities.checked ? t("register.capabilityEnabled") : t("register.capabilityDisabled"))}</strong></div>
  `;
}

function renderRuntimes(payload, attentionMap) {
  const allItems = payload.runtimes || [];
  state.latestRuntimes = allItems;
  const query = state.runtimeSearch.trim().toLowerCase();
  const filteredItems = query
    ? allItems.filter((runtime) =>
      runtime.name.toLowerCase().includes(query) ||
      runtime.endpoint.toLowerCase().includes(query))
    : allItems;
  const items = [...filteredItems].sort((left, right) => {
    if (state.runtimeSort === "status") {
      return (left.status.statusSource || "").localeCompare(right.status.statusSource || "") ||
        left.name.localeCompare(right.name);
    }
    if (state.runtimeSort === "snapshot") {
      return (left.status.snapshotKind || "").localeCompare(right.status.snapshotKind || "") ||
        left.name.localeCompare(right.name);
    }
    return left.name.localeCompare(right.name);
  });
  nodes.runtimeCount.textContent = `${items.length} ${t("metrics.runtimes")}`;
  if (!items.length) {
    state.selectedRuntimeId = null;
    nodes.runtimeTableBody.innerHTML = `<tr><td colspan="7">${escapeHtml(t("runtimes.noMatch"))}</td></tr>`;
    renderRuntimeDetail(null, null);
    renderRuntimePanel(null);
    return;
  }

  if (!items.some((item) => item.runtimeId === state.selectedRuntimeId)) {
    state.selectedRuntimeId = items[0].runtimeId;
  }

  nodes.runtimeTableBody.innerHTML = items.map((runtime) => {
    const badge = statusBadge(runtime.status);
    const attention = attentionMap.get(runtime.runtimeId);
    const capabilityKeys = (runtime.capabilities || [])
      .filter((item) => item.support === "fully_supported")
      .map((item) => item.key);
    const sidecarBits = [
      runtime.sidecarEndpoint ? "paired" : null,
      runtime.sidecarStatus?.Healthy ? "healthy" : null,
      runtime.sidecarStatus?.HasEvidenceChainEnrichment ? "enrichment" : null,
      runtime.sidecarStatus?.HasDiagnosticOpinion ? "opinion" : null,
      runtime.status.hasExternalSidecarContext ? "context" : null,
      runtime.status.hasExternalDiagnosticOpinion ? "merged-opinion" : null,
    ].filter(Boolean);

    return `
      <tr class="${runtime.runtimeId === state.selectedRuntimeId ? "selected" : ""}" data-runtime-id="${escapeHtml(runtime.runtimeId)}">
        <td>
          <strong>${escapeHtml(runtime.name)}</strong>
          <div class="item-meta">${escapeHtml(runtime.endpoint)}</div>
        </td>
        <td>
          <div class="runtime-tags">
            <span class="tag-pill">${escapeHtml(runtime.tags.environment || t("runtimes.states.noEnv"))}</span>
            <span class="tag-pill">${escapeHtml(runtime.tags.cluster || t("runtimes.states.noCluster"))}</span>
            <span class="tag-pill">${escapeHtml(runtime.tags.role || t("runtimes.states.noRole"))}</span>
          </div>
        </td>
        <td>
          <span class="runtime-state ${escapeHtml(badge.tone)}">${escapeHtml(badge.text)}</span>
          <div class="item-meta">${escapeHtml(t("runtimeDetail.source"))}: ${escapeHtml(runtime.status.statusSource)}</div>
        </td>
        <td>
          <div class="runtime-surface">
            ${capabilityKeys.length ? capabilityKeys.map((key) => `<span class="tag-pill">${escapeHtml(key)}</span>`).join("") : `<span class="item-meta">${escapeHtml(t("runtimes.states.noCapabilities"))}</span>`}
          </div>
        </td>
        <td>
          <div class="runtime-sidecar">
            ${sidecarBits.length ? sidecarBits.map((bit) => `<span class="tag-pill">${escapeHtml(bit)}</span>`).join("") : `<span class="item-meta">${escapeHtml(t("runtimes.states.none"))}</span>`}
          </div>
        </td>
        <td>
          <div class="runtime-attention">
            ${attention
              ? `<span class="runtime-state ${attention.severity === "critical" ? "bad" : "warn"}">${escapeHtml(t(`attention.${attention.severity}`))}</span>
                 ${(attention.reasons || []).map((reason) => `<span class="tag-pill">${escapeHtml(t(`attention.${reason}`) || reason)}</span>`).join("")}`
              : `<span class="runtime-state good">${escapeHtml(t("runtimes.states.clear"))}</span>`}
          </div>
        </td>
        <td>
          <div class="inline-actions">
            <button type="button" data-action="show-attention" data-runtime-id="${escapeHtml(runtime.runtimeId)}">${escapeHtml(t("runtimes.actions.attention"))}</button>
            <button type="button" data-action="refresh-status" data-runtime-id="${escapeHtml(runtime.runtimeId)}">${escapeHtml(t("runtimes.actions.status"))}</button>
            ${runtime.sidecarEndpoint ? `<button type="button" data-action="refresh-sidecar" data-runtime-id="${escapeHtml(runtime.runtimeId)}">${escapeHtml(t("runtimeDetail.refreshSidecar"))}</button>` : ""}
            <button type="button" data-action="refresh-all" data-runtime-id="${escapeHtml(runtime.runtimeId)}">${escapeHtml(t("runtimes.actions.all"))}</button>
          </div>
        </td>
      </tr>
    `;
  }).join("");

  for (const row of nodes.runtimeTableBody.querySelectorAll("tr[data-runtime-id]")) {
    row.addEventListener("click", () => {
      state.selectedRuntimeId = row.dataset.runtimeId;
      renderRuntimes(payload, attentionMap);
      syncLocation();
    });
  }

  for (const button of nodes.runtimeTableBody.querySelectorAll("button[data-action][data-runtime-id]")) {
    button.addEventListener("click", async (event) => {
      event.stopPropagation();
      const runtimeId = button.dataset.runtimeId;
      if (button.dataset.action === "show-attention") {
        state.activeTab = "runtimes";
        state.activeRuntimeMainTab = "detail";
        state.selectedRuntimeId = runtimeId;
        applyTabShell();
        renderRuntimes(payload, attentionMap);
        syncLocation();
        nodes.runtimeDetailPanel.scrollIntoView({ behavior: "smooth", block: "start" });
        return;
      }

      const kind = button.dataset.action === "refresh-status"
        ? "status"
        : button.dataset.action === "refresh-sidecar"
          ? "sidecar"
          : "all";
      await refreshRuntimeById(runtimeId, kind);
    });
  }

  const selectedRuntime = items.find((runtime) => runtime.runtimeId === state.selectedRuntimeId) || null;
  const selectedAttention = selectedRuntime ? attentionMap.get(selectedRuntime.runtimeId) || null : null;
  renderRuntimeDetail(selectedRuntime, selectedAttention);
  renderRuntimePanel(selectedRuntime);
}

function renderRuntimeDetail(runtime, attention) {
  if (!runtime) {
    nodes.runtimeDetailChip.textContent = t("runtimeDetail.nothingSelected");
    nodes.runtimeDetailActions.classList.add("hidden");
    nodes.runtimeDetailRefreshSidecar.disabled = true;
    nodes.runtimeDetailEmpty.classList.remove("hidden");
    nodes.runtimeDetailPanel.classList.add("hidden");
    nodes.runtimeDetailIdentity.innerHTML = "";
    nodes.runtimeDetailStatus.innerHTML = "";
    nodes.runtimeDetailCapabilities.innerHTML = "";
    nodes.runtimeDetailAttention.innerHTML = "";
    return;
  }

  const badge = statusBadge(runtime.status);
  const sidecarBadge = sidecarStatusBadge(runtime.sidecarStatus);
  nodes.runtimeDetailChip.textContent = runtime.name;
  nodes.runtimeDetailActions.classList.remove("hidden");
  nodes.runtimeDetailRefreshSidecar.disabled = !runtime.sidecarEndpoint;
  nodes.runtimeDetailEmpty.classList.add("hidden");
  nodes.runtimeDetailPanel.classList.remove("hidden");
  nodes.runtimeDetailIdentity.innerHTML = `
    <div><strong>${escapeHtml(runtime.name)}</strong></div>
    <div class="item-meta">${escapeHtml(runtime.endpoint)}</div>
    ${runtime.sidecarEndpoint ? `<div class="item-meta">${escapeHtml(t("register.sidecarEndpoint"))}: ${escapeHtml(runtime.sidecarEndpoint)}</div>` : ""}
    <div class="hint-line">${escapeHtml(t("runtimeDetail.registered"))}: ${escapeHtml(runtime.registeredAt)}</div>
    <div class="hint-line">${escapeHtml(t("runtimeDetail.updated"))}: ${escapeHtml(runtime.updatedAt)}</div>
    <div class="group-list">
      <span class="tag-pill">${escapeHtml(runtime.tags.environment || t("runtimes.states.noEnv"))}</span>
      <span class="tag-pill">${escapeHtml(runtime.tags.cluster || t("runtimes.states.noCluster"))}</span>
      <span class="tag-pill">${escapeHtml(runtime.tags.role || t("runtimes.states.noRole"))}</span>
    </div>
  `;
  nodes.runtimeDetailStatus.innerHTML = `
    <div><span class="runtime-state ${escapeHtml(badge.tone)}">${escapeHtml(badge.text)}</span></div>
    <div class="hint-line">${escapeHtml(t("runtimeDetail.source"))}: ${escapeHtml(runtime.status.statusSource)}</div>
    <div class="hint-line">${escapeHtml(t("runtimeDetail.snapshotKind"))}: ${escapeHtml(runtime.status.snapshotKind || t("runtimeDetail.none"))}</div>
    <div class="hint-line">${escapeHtml(t("runtimeDetail.targetCount"))}: ${escapeHtml(runtime.status.targetCount ?? t("runtimeDetail.na"))}</div>
    <div class="hint-line">${escapeHtml(t("runtimeDetail.summaryJson"))}: ${escapeHtml(runtime.status.hasSummaryJson)}</div>
    <div class="hint-line">${escapeHtml(t("runtimeDetail.analysisJson"))}: ${escapeHtml(runtime.status.hasAnalysisJson)}</div>
    <div class="hint-line">${escapeHtml(t("register.sidecarEndpoint"))}: <strong>${escapeHtml(runtime.sidecarEndpoint || t("register.sidecarUnpaired"))}</strong></div>
    <div class="hint-line">${escapeHtml(t("runtimes.columns.sidecar"))}: <span class="runtime-state ${escapeHtml(sidecarBadge.tone)}">${escapeHtml(sidecarBadge.text)}</span></div>
    ${runtime.sidecarStatus ? `<div class="hint-line">${escapeHtml(t("runtimeDetail.sidecarSource"))}: ${escapeHtml(runtime.sidecarStatus.statusSource)}</div>
    <div class="hint-line">${escapeHtml(t("runtimeDetail.sidecarLearning"))}: ${escapeHtml(runtime.sidecarStatus.learningActive)} · ${escapeHtml(runtime.sidecarStatus.learnedRoutes)}</div>` : ""}
  `;
  const capabilityKeys = (runtime.capabilities || [])
    .map((item) => [item.key, item.support])
    .sort((a, b) => a[0].localeCompare(b[0]));
  nodes.runtimeDetailCapabilities.innerHTML = capabilityKeys.length
    ? capabilityKeys.map(([key, support]) => `<span class="tag-pill">${escapeHtml(key)} · ${escapeHtml(support)}</span>`).join("")
    : `<span class="item-meta">${escapeHtml(t("runtimeDetail.noCapabilities"))}</span>`;

  if (!attention) {
    nodes.runtimeDetailAttention.innerHTML = `
      <div><span class="runtime-state good">${escapeHtml(t("runtimeDetail.clear"))}</span></div>
      <div class="hint-line">${escapeHtml(t("runtimeDetail.noAttention"))}</div>
    `;
    return;
  }

  nodes.runtimeDetailAttention.innerHTML = `
    <div><span class="runtime-state ${attention.severity === "critical" ? "bad" : "warn"}">${escapeHtml(t(`attention.${attention.severity}`))}</span></div>
    <div class="hint-line">${escapeHtml(t("runtimeDetail.needsAttention"))}: ${escapeHtml(attention.needsAttention)}</div>
    <div class="reason-list">
      ${(attention.reasons || []).map((reason) => `<span class="reason-pill">${escapeHtml(t(`attention.${reason}`) || reason)}</span>`).join("")}
    </div>
  `;
}

function renderRuntimePanel(runtime) {
  if (!runtime) {
    nodes.runtimePanelChip.textContent = t("runtimePanel.notReady");
    nodes.runtimePanelChip.classList.remove("hidden");
    nodes.runtimePanelBreadcrumb.classList.add("hidden");
    nodes.runtimePanelTrust.className = "runtime-panel-trust hidden";
    nodes.runtimePanelTrust.innerHTML = "";
    nodes.runtimePanelSourceSwitch.classList.add("hidden");
    nodes.runtimePanelSourceBadges.classList.add("hidden");
    nodes.runtimePanelSourceBadges.innerHTML = "";
    nodes.runtimePanelActions.classList.add("hidden");
    nodes.runtimePanelEmpty.classList.remove("hidden");
    nodes.runtimePanelFrameWrap.classList.add("hidden");
    nodes.runtimePanelBlank.classList.add("hidden");
    nodes.runtimePanelBlank.innerHTML = "";
    nodes.runtimePanelFrame.src = "about:blank";
    nodes.runtimePanelUrl.textContent = "";
    nodes.runtimePanelOpenExternal.removeAttribute("href");
    return;
  }

  const url = runtimePanelUrl(runtime);
  const viewLabel = t(`runtimePanel.views.${state.runtimePanelView}`);
  const trust = runtimePanelTrustState(runtime, state.runtimePanelView);
  const source = runtimePanelSource(state.runtimePanelView);
  const sourceLabel = t(`runtimePanel.sources.${source}`);
  const runtimeBadge = runtimeSourceBadge(runtime.status);
  const sidecarBadge = sidecarStatusBadge(runtime.sidecarStatus);

  nodes.runtimePanelChip.textContent = runtime.name;
  nodes.runtimePanelChip.classList.add("hidden");
  nodes.runtimePanelBreadcrumb.classList.remove("hidden");
  nodes.runtimePanelBreadcrumb.innerHTML = `
    <span class="crumb-label">${escapeHtml(t("runtimePanel.breadcrumbFleet"))}</span>
    <span class="crumb-value">${escapeHtml(runtime.name)}</span>
    <span class="crumb-sep">/</span>
    <span class="crumb-value">${escapeHtml(sourceLabel)}</span>
    <span class="crumb-sep">/</span>
    <span class="crumb-value">${escapeHtml(viewLabel)}</span>
    <span class="crumb-status ${escapeHtml(trust.tone)}">${escapeHtml(trust.label)}</span>
  `;
  nodes.runtimePanelTrust.className = "runtime-panel-trust hidden";
  nodes.runtimePanelTrust.innerHTML = "";
  nodes.runtimePanelSourceSwitch.classList.remove("hidden");
  for (const button of nodes.runtimePanelSourceButtons) {
    const isSidecar = button.dataset.runtimePanelSource === "sidecar";
    button.disabled = isSidecar && !runtime.sidecarEndpoint;
    button.classList.toggle("is-active", button.dataset.runtimePanelSource === source);
  }
  nodes.runtimePanelSourceBadges.classList.add("hidden");
  nodes.runtimePanelSourceBadges.innerHTML = "";
  nodes.runtimePanelActions.classList.remove("hidden");
  for (const tab of nodes.runtimePanelTabs) {
    const wantsSidecar = isSidecarView(tab.dataset.runtimePanelView);
    tab.disabled = wantsSidecar && !runtime.sidecarEndpoint;
    tab.classList.toggle("hidden", tab.dataset.runtimePanelSource !== source);
  }
  const sidecarViewWithoutEndpoint = isSidecarView(state.runtimePanelView) && !runtime.sidecarEndpoint;
  nodes.runtimePanelEmpty.classList.add("hidden");
  nodes.runtimePanelFrameWrap.classList.remove("hidden");
  if (sidecarViewWithoutEndpoint) {
    renderRuntimePanelBlank(runtime, trust, "", state.runtimePanelView);
    nodes.runtimePanelFrame.classList.add("hidden");
    nodes.runtimePanelFrame.src = "about:blank";
    nodes.runtimePanelUrl.textContent = "";
    nodes.runtimePanelUrl.classList.add("hidden");
    nodes.runtimePanelOpenExternal.removeAttribute("href");
    return;
  }
  const useBlankShell = shouldRenderRuntimePanelBlank(runtime, trust, state.runtimePanelView);
  if (useBlankShell) {
    renderRuntimePanelBlank(runtime, trust, url, state.runtimePanelView);
    nodes.runtimePanelFrame.classList.add("hidden");
    nodes.runtimePanelFrame.src = "about:blank";
    nodes.runtimePanelUrl.textContent = "";
    nodes.runtimePanelUrl.classList.add("hidden");
  } else {
    nodes.runtimePanelBlank.classList.add("hidden");
    nodes.runtimePanelBlank.innerHTML = "";
    nodes.runtimePanelFrame.classList.remove("hidden");
    nodes.runtimePanelFrame.src = url;
    nodes.runtimePanelUrl.textContent = "";
    nodes.runtimePanelUrl.classList.add("hidden");
  }
  nodes.runtimePanelOpenExternal.href = url;
  nodes.runtimePanelOpenExternal.target = "_blank";
  nodes.runtimePanelOpenExternal.rel = "noreferrer";
  for (const tab of nodes.runtimePanelTabs) {
    tab.classList.toggle("is-active", tab.dataset.runtimePanelView === state.runtimePanelView);
  }
}

async function refreshRuntimeById(runtimeId, kind) {
  if (!runtimeId) {
    nodes.statusLine.textContent = t("notifications.noRuntimeSelected");
    return;
  }

  const label = refreshLabel(kind);
  nodes.statusLine.textContent = `${label}...`;

  try {
    if (kind === "all") {
      await postJson(`/v1/runtimes/${runtimeId}/refresh-capabilities`);
      await postJson(`/v1/runtimes/${runtimeId}/refresh-status`);
      const selectedRuntime = state.latestRuntimes.find((runtime) => runtime.runtimeId === runtimeId) || null;
      if (selectedRuntime?.sidecarEndpoint) {
        await postJson(`/v1/runtimes/${runtimeId}/refresh-sidecar`);
        markBadgeRefresh("sidecar");
      }
      markBadgeRefresh("runtime");
    } else if (kind === "status") {
      await postJson(`/v1/runtimes/${runtimeId}/refresh-status`);
      markBadgeRefresh("runtime");
    } else if (kind === "sidecar") {
      await postJson(`/v1/runtimes/${runtimeId}/refresh-sidecar`);
      markBadgeRefresh("sidecar");
    } else {
      await postJson(`/v1/runtimes/${runtimeId}/refresh-capabilities`);
    }

    state.activeTab = "runtimes";
    state.selectedRuntimeId = runtimeId;
    await loadDashboard();
    const selectedRuntime = state.latestRuntimes.find((runtime) => runtime.runtimeId === runtimeId) || null;
    if (selectedRuntime) {
      renderRuntimePanel(selectedRuntime);
      window.setTimeout(() => {
        const latestSelected = state.latestRuntimes.find((runtime) => runtime.runtimeId === state.selectedRuntimeId) || null;
        if (latestSelected) {
          renderRuntimePanel(latestSelected);
        }
      }, 2500);
    }
    nodes.statusLine.textContent = t("notifications.runtimeRefreshComplete", { label });
  } catch (error) {
    console.error(error);
    nodes.statusLine.textContent = t("notifications.runtimeRefreshFailed", { label, message: error.message });
  }
}

async function refreshSelectedRuntime(kind) {
  await refreshRuntimeById(state.selectedRuntimeId, kind);
}

async function copySelectedRuntimeLink() {
  if (!state.selectedRuntimeId) {
    nodes.statusLine.textContent = t("notifications.noRuntimeSelected");
    return;
  }

  const url = `${window.location.origin}${window.location.pathname}${buildQuery()}`;
  try {
    await navigator.clipboard.writeText(url);
    nodes.statusLine.textContent = t("notifications.runtimeLinkCopied");
  } catch (error) {
    console.error(error);
    nodes.statusLine.textContent = t("notifications.runtimeLinkFailed", { message: error.message });
  }
}

function syncFilterInputs() {
  nodes.environmentInput.value = state.filter.environment;
  nodes.clusterInput.value = state.filter.cluster;
  nodes.roleInput.value = state.filter.role;
  nodes.runtimeSearch.value = state.runtimeSearch;
  nodes.runtimeSort.value = state.runtimeSort;
  const parts = [state.filter.environment, state.filter.cluster, state.filter.role].filter(Boolean);
  nodes.fleetFilterChip.textContent = parts.length ? parts.join(" / ") : t("filters.allRuntimes");
  renderRegisterPreview();
}

function clearRegisterForm() {
  state.registerNameTouched = false;
  nodes.registerName.value = "";
  nodes.registerEndpoint.value = "";
  nodes.registerSidecarEndpoint.value = "";
  nodes.registerToken.value = "";
  syncRegisterFormTagsFromFilter();
  nodes.registerFetchCapabilities.checked = true;
  renderRegisterPreview();
  nodes.registerResult.textContent = t("register.untouched");
}

function syncRegisterFormTagsFromFilter() {
  nodes.registerRuntimeEnvironment.value = state.filter.environment;
  nodes.registerRuntimeCluster.value = state.filter.cluster;
  nodes.registerRuntimeRole.value = state.filter.role;
}

function currentSliceLabel() {
  const parts = [state.filter.environment, state.filter.cluster, state.filter.role].filter(Boolean);
  return parts.length ? parts.join(" / ") : t("register.allRuntimes");
}

function renderDashboardFromCache() {
  const { capabilities, fleetSummary, attentionSummary, attentionList, runtimes, sessions } = state.cache;
  if (!capabilities || !fleetSummary || !attentionSummary || !attentionList || !runtimes || !sessions) {
    return;
  }

  renderMetricCards(nodes.fleetSummaryCards, [
    [t("metrics.runtimes"), fleetSummary.summary.runtimeCount],
    [t("metrics.latestSnapshots"), fleetSummary.summary.runtimesWithLatestSnapshot],
    [t("metrics.summaryJson"), fleetSummary.summary.runtimesWithSummaryJson],
    [t("metrics.analysisJson"), fleetSummary.summary.runtimesWithAnalysisJson],
    [t("metrics.pairedSidecars"), fleetSummary.summary.runtimesWithPairedSidecar],
    [t("metrics.healthySidecars"), fleetSummary.summary.runtimesWithHealthySidecar],
    [t("metrics.sidecarContext"), fleetSummary.summary.runtimesWithExternalSidecarContext],
    [t("metrics.diagnosticOpinions"), fleetSummary.summary.runtimesWithExternalDiagnosticOpinion],
  ]);

  renderPersistence(capabilities);

  renderGroupCards(nodes.fleetSummaryGroups, {
    [t("groups.snapshotKinds")]: fleetSummary.summary.snapshotKindCounts,
    [t("groups.statusSources")]: fleetSummary.summary.statusSourceCounts,
    [t("groups.sidecarStatusSources")]: fleetSummary.summary.sidecarStatusSourceCounts,
    [t("groups.environments")]: fleetSummary.summary.environmentCounts,
    [t("groups.clusters")]: fleetSummary.summary.clusterCounts,
    [t("groups.roles")]: fleetSummary.summary.roleCounts,
  });

  renderMetricCards(nodes.attentionSummaryCards, [
    [t("metrics.critical"), attentionSummary.summary.criticalCount],
    [t("metrics.warning"), attentionSummary.summary.warningCount],
  ]);
  renderAttentionReasons(attentionSummary.summary);
  renderAttentionList(attentionList);
  renderSessions(sessions);

  const attentionMap = new Map((attentionList.runtimes || []).map((item) => [item.runtimeId, item]));
  renderRuntimes(runtimes, attentionMap);
}

async function loadDashboard() {
  syncLocation();
  applyTranslations();
  applyTabShell();
  syncFilterInputs();
  syncRegisterFormTagsFromFilter();
  const query = buildQuery();
  nodes.statusLine.textContent = t("notifications.loading");

  try {
    const [capabilities, fleetSummary, attentionSummary, attentionList, runtimes, sessions] = await Promise.all([
      getJson("/v1/capabilities"),
      getJson(`/v1/fleet/summary${query}`),
      getJson(`/v1/fleet/attention-summary${query}`),
      getJson(`/v1/fleet/runtimes-needing-attention${query}`),
      getJson(`/v1/runtimes${query}`),
      getJson("/v1/sessions"),
    ]);

    state.cache = {
      capabilities,
      fleetSummary,
      attentionSummary,
      attentionList,
      runtimes,
      sessions,
    };

    renderDashboardFromCache();
    nodes.statusLine.textContent = t("notifications.loaded", { count: runtimes.runtimes.length });
  } catch (error) {
    console.error(error);
    nodes.statusLine.textContent = t("notifications.dashboardLoadFailed", { message: error.message });
    if (looksLikeTokenDenied(error.message)) {
      renderSecurityState(null);
      nodes.adminTokenState.textContent = t("security.tokenRequired");
      nodes.securityDetails?.setAttribute("open", "open");
    }
  }
}

async function postAndReload(path, label) {
  nodes.statusLine.textContent = `${label}...`;
  try {
    await postJson(`${path}${buildQuery()}`);
    await loadDashboard();
    nodes.statusLine.textContent = t("notifications.fleetRefreshComplete", { label });
  } catch (error) {
    console.error(error);
    nodes.statusLine.textContent = t("notifications.fleetRefreshFailed", { label, message: error.message });
  }
}

async function savePersistenceNow() {
  nodes.statusLine.textContent = t("persistence.saving");
  try {
    await postJson("/v1/persistence/save");
    await loadDashboard();
    nodes.statusLine.textContent = t("persistence.saved");
  } catch (error) {
    console.error(error);
    nodes.statusLine.textContent = t("persistence.saveFailed", { message: error.message });
  }
}

async function exportPersistenceState() {
  nodes.statusLine.textContent = t("persistence.exporting");
  try {
    const response = await fetch("/v1/persistence/export", {
      headers: apiHeaders({ intent: "export" }),
    });
    if (!response.ok) {
      throw new Error(`/v1/persistence/export -> ${response.status}`);
    }

    const blob = await response.blob();
    const downloadUrl = URL.createObjectURL(blob);
    const anchor = document.createElement("a");
    const disposition = response.headers.get("content-disposition") || "";
    const match = disposition.match(/filename=\"?([^\";]+)\"?/i);
    anchor.href = downloadUrl;
    anchor.download = match?.[1] || "leserpent-control-plane-state.json";
    document.body.appendChild(anchor);
    anchor.click();
    anchor.remove();
    URL.revokeObjectURL(downloadUrl);
    nodes.statusLine.textContent = t("persistence.exported");
  } catch (error) {
    console.error(error);
    nodes.statusLine.textContent = t("persistence.exportFailed", { message: error.message });
  }
}

function triggerPersistenceImportPicker() {
  nodes.persistenceImportFile.value = "";
  nodes.persistenceImportFile.click();
}

async function importPersistenceState(file) {
  if (!file) {
    return;
  }

  nodes.statusLine.textContent = t("persistence.importing", { file: file.name });
  try {
    const text = await file.text();
    let parsed;
    try {
      parsed = JSON.parse(text);
    } catch {
      throw new Error(t("persistence.invalidJson"));
    }

    const response = await fetch("/v1/persistence/import", {
      method: "POST",
      headers: apiHeaders({ contentType: "application/json", intent: "mutate" }),
      body: JSON.stringify(parsed),
    });
    const payload = await response.json().catch(() => null);
    if (!response.ok) {
      throw new Error(payload?.reason || payload?.error || `${response.status}`);
    }

    state.selectedRuntimeId = null;
    await loadDashboard();
    nodes.statusLine.textContent = t("persistence.imported", {
      runtimes: payload.importedRuntimeCount,
      sessions: payload.importedSessionCount,
    });
  } catch (error) {
    console.error(error);
    nodes.statusLine.textContent = t("persistence.importFailed", { message: error.message });
  }
}

async function submitRegisterForm(event) {
  event.preventDefault();
  const name = nodes.registerName.value.trim();
  const endpoint = nodes.registerEndpoint.value.trim();
  const sidecarEndpoint = nodes.registerSidecarEndpoint.value.trim();
  if (!isLikelyHttpEndpoint(endpoint)) {
    nodes.registerResult.textContent = t("register.blockedEndpoint");
    state.activeTab = "runtimes";
    state.activeRuntimeMainTab = "register";
    applyTabShell();
    return;
  }

  if (sidecarEndpoint && !isLikelyHttpEndpoint(sidecarEndpoint)) {
    nodes.registerResult.textContent = t("register.blockedSidecarEndpoint");
    state.activeTab = "runtimes";
    state.activeRuntimeMainTab = "register";
    applyTabShell();
    return;
  }

  const duplicate = findDuplicateRuntime(name, endpoint);
  if (duplicate) {
    const nameConflict = duplicate.name.toLowerCase() === name.toLowerCase();
    const endpointConflict = duplicate.endpoint.toLowerCase() === endpoint.toLowerCase();
    const conflictReason = nameConflict && endpointConflict
      ? t("register.duplicateNameAndEndpoint")
      : nameConflict
        ? t("register.duplicateName")
        : t("register.duplicateEndpoint");
    nodes.registerResult.textContent = t("register.blockedDuplicate", {
      reason: conflictReason,
      name: duplicate.name,
      endpoint: duplicate.endpoint,
    });
    state.activeTab = "runtimes";
    state.activeRuntimeMainTab = "register";
    applyTabShell();
    return;
  }

  const body = {
    name,
    endpoint,
    sidecarEndpoint: sidecarEndpoint || null,
    pairingToken: nodes.registerToken.value.trim(),
    capabilities: [],
    tags: {
      environment: nodes.registerRuntimeEnvironment.value.trim() || null,
      cluster: nodes.registerRuntimeCluster.value.trim() || null,
      role: nodes.registerRuntimeRole.value.trim() || null,
    },
    fetchCapabilities: nodes.registerFetchCapabilities.checked,
  };

  nodes.registerResult.textContent = t("register.registering");
  try {
    const result = await postJsonBody("/v1/runtimes/register", body);
    state.registerNameTouched = false;
    state.activeTab = "runtimes";
    state.activeRuntimeMainTab = "detail";
    state.selectedRuntimeId = result.runtimeId;
    nodes.registerResult.textContent = t("register.registered", {
      name: result.name,
      runtimeId: result.runtimeId,
      slice: currentSliceLabel(),
      status: runtimeStatusHint(result.status),
    });
    await loadDashboard();
    nodes.runtimeDetailPanel.scrollIntoView({ behavior: "smooth", block: "start" });
  } catch (error) {
    console.error(error);
    nodes.registerResult.textContent = t("register.failed", { message: error.message });
    state.activeTab = "runtimes";
    state.activeRuntimeMainTab = "register";
    applyTabShell();
  }
}

function activateTab(tab) {
  state.activeTab = tab;
  applyTabShell();
  syncLocation();
}

function activateOverviewSubtab(tab) {
  state.activeOverviewTab = tab;
  applyTabShell();
  syncLocation();
}

function activateRuntimeMainTab(tab) {
  state.activeRuntimeMainTab = ["register", "detail", "panel"].includes(tab) ? tab : "select";
  state.activeRuntimeSideTab = state.activeRuntimeMainTab === "panel" ? "panel" : "detail";
  state.activeTab = "runtimes";
  applyTabShell();
  syncLocation();
}

function activateRuntimeDetailTab(tab) {
  state.activeRuntimeDetailTab = tab;
  applyTabShell();
  syncLocation();
}

nodes.tabButtons.forEach((button) => {
  button.addEventListener("click", () => activateTab(button.dataset.tab));
});

nodes.overviewSubtabButtons.forEach((button) => {
  button.addEventListener("click", () => activateOverviewSubtab(button.dataset.overviewTab));
});

nodes.runtimeMainTabButtons.forEach((button) => {
  button.addEventListener("click", () => activateRuntimeMainTab(button.dataset.runtimeMainTab));
});

nodes.runtimeDetailSubtabButtons.forEach((button) => {
  button.addEventListener("click", () => activateRuntimeDetailTab(button.dataset.runtimeDetailTab));
});

nodes.runtimePanelTabs.forEach((button) => {
  button.addEventListener("click", () => {
    state.runtimePanelView = button.dataset.runtimePanelView;
    const selectedRuntime = state.latestRuntimes.find((runtime) => runtime.runtimeId === state.selectedRuntimeId) || null;
    renderRuntimePanel(selectedRuntime);
    syncLocation();
  });
});

nodes.runtimePanelSourceButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const selectedRuntime = state.latestRuntimes.find((runtime) => runtime.runtimeId === state.selectedRuntimeId) || null;
    switchRuntimePanelSource(button.dataset.runtimePanelSource, selectedRuntime);
  });
});

nodes.runtimePanelOpenExternal.addEventListener("click", () => {
  const selectedRuntime = state.latestRuntimes.find((runtime) => runtime.runtimeId === state.selectedRuntimeId) || null;
  const targetUrl = runtimePanelUrl(selectedRuntime);
  if (!targetUrl) {
    nodes.statusLine.textContent = t("notifications.noRuntimeSelected");
    return;
  }

  window.open(targetUrl, "_blank", "noopener,noreferrer");
});

nodes.languageSelect.addEventListener("change", () => {
  state.languagePreference = nodes.languageSelect.value;
  state.language = resolveLanguage(state.languagePreference);
  setStoredLanguagePreference(state.languagePreference);
  applyTranslations();
  renderDashboardFromCache();
  syncLocation();
});

nodes.themeSelect.addEventListener("change", () => {
  state.themePreference = nodes.themeSelect.value;
  state.theme = resolveTheme(state.themePreference);
  setStoredThemePreference(state.themePreference);
  applyTheme();
  syncLocation();
});

nodes.applyFiltersButton.addEventListener("click", () => {
  state.filter.environment = nodes.environmentInput.value.trim();
  state.filter.cluster = nodes.clusterInput.value.trim();
  state.filter.role = nodes.roleInput.value.trim();
  loadDashboard();
});

nodes.clearFiltersButton.addEventListener("click", () => {
  state.filter.environment = "";
  state.filter.cluster = "";
  state.filter.role = "";
  state.runtimeSearch = "";
  state.selectedRuntimeId = null;
  loadDashboard();
});

nodes.runtimeSearch.addEventListener("input", () => {
  state.runtimeSearch = nodes.runtimeSearch.value.trim();
  loadDashboard();
});

nodes.runtimeSort.addEventListener("change", () => {
  state.runtimeSort = nodes.runtimeSort.value;
  loadDashboard();
});

nodes.refreshAllButton.addEventListener("click", () => postAndReload("/v1/fleet/refresh-all", t("notifications.fleetRefreshAll")));
nodes.refreshStatusButton.addEventListener("click", () => postAndReload("/v1/fleet/refresh-status", t("notifications.fleetStatusRefresh")));
nodes.refreshCapabilitiesButton.addEventListener("click", () => postAndReload("/v1/fleet/refresh-capabilities", t("notifications.fleetCapabilityRefresh")));
nodes.persistenceSaveNow.addEventListener("click", savePersistenceNow);
nodes.persistenceExportState.addEventListener("click", exportPersistenceState);
nodes.persistenceImportState.addEventListener("click", triggerPersistenceImportPicker);
nodes.persistenceImportFile.addEventListener("change", (event) => {
  const [file] = event.target.files || [];
  importPersistenceState(file);
});
nodes.runtimeDetailRefreshAll.addEventListener("click", () => refreshSelectedRuntime("all"));
nodes.runtimeDetailRefreshStatus.addEventListener("click", () => refreshSelectedRuntime("status"));
nodes.runtimeDetailRefreshCapabilities.addEventListener("click", () => refreshSelectedRuntime("capabilities"));
nodes.runtimeDetailRefreshSidecar.addEventListener("click", () => refreshSelectedRuntime("sidecar"));
nodes.runtimeDetailCopyLink.addEventListener("click", copySelectedRuntimeLink);
nodes.registerName.addEventListener("input", () => {
  state.registerNameTouched = nodes.registerName.value.trim().length > 0;
  renderRegisterPreview();
});
nodes.registerEndpoint.addEventListener("input", maybePrefillRuntimeNameFromEndpoint);
nodes.registerSidecarEndpoint.addEventListener("input", renderRegisterPreview);
nodes.registerRuntimeEnvironment.addEventListener("input", renderRegisterPreview);
nodes.registerRuntimeCluster.addEventListener("input", renderRegisterPreview);
nodes.registerRuntimeRole.addEventListener("input", renderRegisterPreview);
nodes.registerFetchCapabilities.addEventListener("change", renderRegisterPreview);
nodes.registerForm.addEventListener("submit", submitRegisterForm);
nodes.registerFormClear.addEventListener("click", clearRegisterForm);

document.addEventListener("click", (event) => {
  if (!nodes.securityDetails?.open) {
    return;
  }
  if (!(event.target instanceof Node)) {
    return;
  }
  if (!nodes.securityDetails.contains(event.target)) {
    closeSecurityDetails();
  }
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && nodes.securityDetails?.open) {
    closeSecurityDetails();
  }
});

nodes.securityDetails?.addEventListener("toggle", () => {
  if (nodes.securityDetails.open) {
    window.setTimeout(() => {
      nodes.adminTokenInput?.focus();
      nodes.adminTokenInput?.select();
    }, 0);
  }
});

window.matchMedia?.("(prefers-color-scheme: dark)")?.addEventListener("change", () => {
  if (state.themePreference !== "auto") {
    return;
  }
  state.theme = resolveTheme(state.themePreference);
  applyTheme();
});

hydrateStateFromLocation();
applyTheme();
applyTranslations();
applyTabShell();
clearRegisterForm();
loadDashboard();
