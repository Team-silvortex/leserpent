const state = {
  filter: {
    environment: "",
    cluster: "",
    role: "",
  },
  runtimeSearch: "",
  runtimeSort: "name",
  selectedRuntimeId: null,
};

const nodes = {
  fleetSummaryCards: document.getElementById("fleet-summary-cards"),
  fleetSummaryGroups: document.getElementById("fleet-summary-groups"),
  attentionSummaryCards: document.getElementById("attention-summary-cards"),
  attentionReasons: document.getElementById("attention-reasons"),
  attentionList: document.getElementById("attention-list"),
  sessionList: document.getElementById("session-list"),
  runtimeTableBody: document.getElementById("runtime-table-body"),
  fleetFilterChip: document.getElementById("fleet-filter-chip"),
  attentionCount: document.getElementById("attention-count"),
  sessionCount: document.getElementById("session-count"),
  runtimeCount: document.getElementById("runtime-count"),
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
  runtimeDetailCopyLink: document.getElementById("runtime-detail-copy-link"),
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
  registerToken: document.getElementById("register-token"),
  registerRuntimeEnvironment: document.getElementById("register-runtime-environment"),
  registerRuntimeCluster: document.getElementById("register-runtime-cluster"),
  registerRuntimeRole: document.getElementById("register-runtime-role"),
  registerFetchCapabilities: document.getElementById("register-fetch-capabilities"),
  registerFormClear: document.getElementById("register-form-clear"),
  registerResult: document.getElementById("register-result"),
};

function buildQuery() {
  const params = new URLSearchParams();
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

async function getJson(path) {
  const response = await fetch(path, { headers: { accept: "application/json" } });
  if (!response.ok) {
    throw new Error(`${path} -> ${response.status}`);
  }
  return response.json();
}

async function postJson(path) {
  const response = await fetch(path, { method: "POST", headers: { accept: "application/json" } });
  if (!response.ok) {
    throw new Error(`${path} -> ${response.status}`);
  }
  return response.json();
}

async function postJsonBody(path, body) {
  const response = await fetch(path, {
    method: "POST",
    headers: {
      accept: "application/json",
      "content-type": "application/json",
    },
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
    ? "Runtime refresh-all"
    : kind === "status"
      ? "Runtime status refresh"
      : "Runtime capability refresh";
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
    target.innerHTML = `<div class="group-card"><div class="group-title">No grouped data yet.</div></div>`;
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
    nodes.attentionReasons.innerHTML = `<div class="reason-line">No active attention reasons.</div>`;
    return;
  }

  nodes.attentionReasons.innerHTML = entries.map(([reason, count]) => `
    <div class="reason-line"><strong>${escapeHtml(reason)}</strong> · ${escapeHtml(count)} runtimes</div>
  `).join("");
}

function renderAttentionList(payload) {
  const items = payload.runtimes || [];
  nodes.attentionCount.textContent = `${items.length} runtime${items.length === 1 ? "" : "s"}`;
  if (!items.length) {
    nodes.attentionList.innerHTML = `<div class="attention-item"><div class="item-meta">No runtimes need attention in this slice.</div></div>`;
    return;
  }

  nodes.attentionList.innerHTML = items.map((item) => `
    <div class="attention-item ${escapeHtml(item.severity)}">
      <div class="item-head">
        <div>
          <h3>${escapeHtml(item.name)}</h3>
          <div class="item-meta">${escapeHtml(item.endpoint)}</div>
        </div>
        <div class="severity ${escapeHtml(item.severity)}">${escapeHtml(item.severity)}</div>
      </div>
      <div class="item-meta">
        ${escapeHtml(item.tags.environment || "no-env")} · ${escapeHtml(item.tags.cluster || "no-cluster")} · ${escapeHtml(item.tags.role || "no-role")}
      </div>
      <div class="reason-list">
        ${(item.reasons || []).map((reason) => `<span class="reason-pill">${escapeHtml(reason)}</span>`).join("")}
      </div>
    </div>
  `).join("");
}

function renderSessions(payload) {
  const items = payload.sessions || [];
  nodes.sessionCount.textContent = `${items.length} session${items.length === 1 ? "" : "s"}`;
  if (!items.length) {
    nodes.sessionList.innerHTML = `<div class="session-item"><div class="item-meta">No sessions yet.</div></div>`;
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
      <div class="hint-line">runtime: ${escapeHtml(item.runtimeId)}</div>
    </div>
  `).join("");
}

function statusBadge(status) {
  if (status.statusSource === "fetch_failed") {
    return { text: "fetch failed", tone: "bad" };
  }
  if (!status.hasLatestSnapshot) {
    return { text: "unobserved", tone: "warn" };
  }
  return { text: `${status.snapshotKind || "observed"} snapshot`, tone: "good" };
}

function renderRuntimes(payload, attentionMap) {
  const allItems = payload.runtimes || [];
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
  nodes.runtimeCount.textContent = `${items.length} runtime${items.length === 1 ? "" : "s"}`;
  if (!items.length) {
    state.selectedRuntimeId = null;
    nodes.runtimeTableBody.innerHTML = `<tr><td colspan="6">No runtimes match the current filter or search.</td></tr>`;
    renderRuntimeDetail(null, null);
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
      runtime.status.hasExternalSidecarContext ? "context" : null,
      runtime.status.hasExternalEvidenceChainEnrichment ? "enrichment" : null,
      runtime.status.hasExternalDiagnosticOpinion ? "opinion" : null,
    ].filter(Boolean);

    return `
      <tr class="${runtime.runtimeId === state.selectedRuntimeId ? "selected" : ""}" data-runtime-id="${escapeHtml(runtime.runtimeId)}">
        <td>
          <strong>${escapeHtml(runtime.name)}</strong>
          <div class="item-meta">${escapeHtml(runtime.endpoint)}</div>
        </td>
        <td>
          <div class="runtime-tags">
            <span class="tag-pill">${escapeHtml(runtime.tags.environment || "no-env")}</span>
            <span class="tag-pill">${escapeHtml(runtime.tags.cluster || "no-cluster")}</span>
            <span class="tag-pill">${escapeHtml(runtime.tags.role || "no-role")}</span>
          </div>
        </td>
        <td>
          <span class="runtime-state ${escapeHtml(badge.tone)}">${escapeHtml(badge.text)}</span>
          <div class="item-meta">source: ${escapeHtml(runtime.status.statusSource)}</div>
        </td>
        <td>
          <div class="runtime-surface">
            ${capabilityKeys.length ? capabilityKeys.map((key) => `<span class="tag-pill">${escapeHtml(key)}</span>`).join("") : `<span class="item-meta">No fully-supported capabilities</span>`}
          </div>
        </td>
        <td>
          <div class="runtime-sidecar">
            ${sidecarBits.length ? sidecarBits.map((bit) => `<span class="tag-pill">${escapeHtml(bit)}</span>`).join("") : `<span class="item-meta">none</span>`}
          </div>
        </td>
        <td>
          <div class="runtime-attention">
            ${attention
              ? `<span class="runtime-state ${attention.severity === "critical" ? "bad" : "warn"}">${escapeHtml(attention.severity)}</span>
                 ${(attention.reasons || []).map((reason) => `<span class="tag-pill">${escapeHtml(reason)}</span>`).join("")}`
              : `<span class="runtime-state good">clear</span>`}
          </div>
        </td>
        <td>
          <div class="inline-actions">
            <button type="button" data-action="show-attention" data-runtime-id="${escapeHtml(runtime.runtimeId)}">Attention</button>
            <button type="button" data-action="refresh-status" data-runtime-id="${escapeHtml(runtime.runtimeId)}">Status</button>
            <button type="button" data-action="refresh-all" data-runtime-id="${escapeHtml(runtime.runtimeId)}">All</button>
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
        state.selectedRuntimeId = runtimeId;
        renderRuntimes(payload, attentionMap);
        syncLocation();
        nodes.runtimeDetailPanel.scrollIntoView({ behavior: "smooth", block: "start" });
        return;
      }

      const kind = button.dataset.action === "refresh-status" ? "status" : "all";
      await refreshRuntimeById(runtimeId, kind);
    });
  }

  const selectedRuntime = items.find((runtime) => runtime.runtimeId === state.selectedRuntimeId) || null;
  const selectedAttention = selectedRuntime ? attentionMap.get(selectedRuntime.runtimeId) || null : null;
  renderRuntimeDetail(selectedRuntime, selectedAttention);
}

function renderRuntimeDetail(runtime, attention) {
  if (!runtime) {
    nodes.runtimeDetailChip.textContent = "nothing selected";
    nodes.runtimeDetailActions.classList.add("hidden");
    nodes.runtimeDetailEmpty.classList.remove("hidden");
    nodes.runtimeDetailPanel.classList.add("hidden");
    nodes.runtimeDetailIdentity.innerHTML = "";
    nodes.runtimeDetailStatus.innerHTML = "";
    nodes.runtimeDetailCapabilities.innerHTML = "";
    nodes.runtimeDetailAttention.innerHTML = "";
    return;
  }

  const badge = statusBadge(runtime.status);
  nodes.runtimeDetailChip.textContent = runtime.name;
  nodes.runtimeDetailActions.classList.remove("hidden");
  nodes.runtimeDetailEmpty.classList.add("hidden");
  nodes.runtimeDetailPanel.classList.remove("hidden");
  nodes.runtimeDetailIdentity.innerHTML = `
    <div><strong>${escapeHtml(runtime.name)}</strong></div>
    <div class="item-meta">${escapeHtml(runtime.endpoint)}</div>
    <div class="hint-line">registered: ${escapeHtml(runtime.registeredAt)}</div>
    <div class="hint-line">updated: ${escapeHtml(runtime.updatedAt)}</div>
    <div class="group-list">
      <span class="tag-pill">${escapeHtml(runtime.tags.environment || "no-env")}</span>
      <span class="tag-pill">${escapeHtml(runtime.tags.cluster || "no-cluster")}</span>
      <span class="tag-pill">${escapeHtml(runtime.tags.role || "no-role")}</span>
    </div>
  `;
  nodes.runtimeDetailStatus.innerHTML = `
    <div><span class="runtime-state ${escapeHtml(badge.tone)}">${escapeHtml(badge.text)}</span></div>
    <div class="hint-line">source: ${escapeHtml(runtime.status.statusSource)}</div>
    <div class="hint-line">snapshot kind: ${escapeHtml(runtime.status.snapshotKind || "none")}</div>
    <div class="hint-line">target count: ${escapeHtml(runtime.status.targetCount ?? "n/a")}</div>
    <div class="hint-line">summary json: ${escapeHtml(runtime.status.hasSummaryJson)}</div>
    <div class="hint-line">analysis json: ${escapeHtml(runtime.status.hasAnalysisJson)}</div>
  `;
  const capabilityKeys = (runtime.capabilities || [])
    .map((item) => [item.key, item.support])
    .sort((a, b) => a[0].localeCompare(b[0]));
  nodes.runtimeDetailCapabilities.innerHTML = capabilityKeys.length
    ? capabilityKeys.map(([key, support]) => `<span class="tag-pill">${escapeHtml(key)} · ${escapeHtml(support)}</span>`).join("")
    : `<span class="item-meta">No capabilities recorded.</span>`;

  if (!attention) {
    nodes.runtimeDetailAttention.innerHTML = `
      <div><span class="runtime-state good">clear</span></div>
      <div class="hint-line">No attention reasons for this runtime.</div>
    `;
    return;
  }

  nodes.runtimeDetailAttention.innerHTML = `
    <div><span class="runtime-state ${attention.severity === "critical" ? "bad" : "warn"}">${escapeHtml(attention.severity)}</span></div>
    <div class="hint-line">needs attention: ${escapeHtml(attention.needsAttention)}</div>
    <div class="reason-list">
      ${(attention.reasons || []).map((reason) => `<span class="reason-pill">${escapeHtml(reason)}</span>`).join("")}
    </div>
  `;
}

async function refreshRuntimeById(runtimeId, kind) {
  if (!runtimeId) {
    nodes.statusLine.textContent = "No runtime selected.";
    return;
  }

  const label = refreshLabel(kind);
  nodes.statusLine.textContent = `${label}...`;

  try {
    if (kind === "all") {
      await postJson(`/v1/runtimes/${runtimeId}/refresh-capabilities`);
      await postJson(`/v1/runtimes/${runtimeId}/refresh-status`);
    } else if (kind === "status") {
      await postJson(`/v1/runtimes/${runtimeId}/refresh-status`);
    } else {
      await postJson(`/v1/runtimes/${runtimeId}/refresh-capabilities`);
    }

    state.selectedRuntimeId = runtimeId;
    await loadDashboard();
    nodes.statusLine.textContent = `${label} complete.`;
  } catch (error) {
    console.error(error);
    nodes.statusLine.textContent = `${label} failed: ${error.message}`;
  }
}

async function refreshSelectedRuntime(kind) {
  await refreshRuntimeById(state.selectedRuntimeId, kind);
}

async function copySelectedRuntimeLink() {
  if (!state.selectedRuntimeId) {
    nodes.statusLine.textContent = "No runtime selected.";
    return;
  }

  const url = `${window.location.origin}${window.location.pathname}${buildQuery()}`;
  try {
    await navigator.clipboard.writeText(url);
    nodes.statusLine.textContent = "Runtime link copied.";
  } catch (error) {
    console.error(error);
    nodes.statusLine.textContent = `Copy link failed: ${error.message}`;
  }
}

function syncFilterInputs() {
  nodes.environmentInput.value = state.filter.environment;
  nodes.clusterInput.value = state.filter.cluster;
  nodes.roleInput.value = state.filter.role;
  nodes.runtimeSearch.value = state.runtimeSearch;
  nodes.runtimeSort.value = state.runtimeSort;
  const parts = [state.filter.environment, state.filter.cluster, state.filter.role].filter(Boolean);
  nodes.fleetFilterChip.textContent = parts.length ? parts.join(" / ") : "all runtimes";
}

function clearRegisterForm() {
  nodes.registerName.value = "";
  nodes.registerEndpoint.value = "";
  nodes.registerToken.value = "";
  syncRegisterFormTagsFromFilter();
  nodes.registerFetchCapabilities.checked = true;
  nodes.registerResult.textContent = "No runtime submitted yet.";
}

function syncRegisterFormTagsFromFilter() {
  nodes.registerRuntimeEnvironment.value = state.filter.environment;
  nodes.registerRuntimeCluster.value = state.filter.cluster;
  nodes.registerRuntimeRole.value = state.filter.role;
}

function currentSliceLabel() {
  const parts = [state.filter.environment, state.filter.cluster, state.filter.role].filter(Boolean);
  return parts.length ? parts.join(" / ") : "all runtimes";
}

async function loadDashboard() {
  syncLocation();
  syncFilterInputs();
  syncRegisterFormTagsFromFilter();
  const query = buildQuery();
  nodes.statusLine.textContent = "Loading control-plane state...";

  try {
    const [fleetSummary, attentionSummary, attentionList, runtimes, sessions] = await Promise.all([
      getJson(`/v1/fleet/summary${query}`),
      getJson(`/v1/fleet/attention-summary${query}`),
      getJson(`/v1/fleet/runtimes-needing-attention${query}`),
      getJson(`/v1/runtimes${query}`),
      getJson(`/v1/sessions`),
    ]);

    renderMetricCards(nodes.fleetSummaryCards, [
      ["runtimes", fleetSummary.summary.runtimeCount],
      ["latest snapshots", fleetSummary.summary.runtimesWithLatestSnapshot],
      ["summary json", fleetSummary.summary.runtimesWithSummaryJson],
      ["analysis json", fleetSummary.summary.runtimesWithAnalysisJson],
      ["sidecar context", fleetSummary.summary.runtimesWithExternalSidecarContext],
      ["diagnostic opinions", fleetSummary.summary.runtimesWithExternalDiagnosticOpinion],
    ]);

    renderGroupCards(nodes.fleetSummaryGroups, {
      "snapshot kinds": fleetSummary.summary.snapshotKindCounts,
      "status sources": fleetSummary.summary.statusSourceCounts,
      environments: fleetSummary.summary.environmentCounts,
      clusters: fleetSummary.summary.clusterCounts,
      roles: fleetSummary.summary.roleCounts,
    });

    renderMetricCards(nodes.attentionSummaryCards, [
      ["critical", attentionSummary.summary.criticalCount],
      ["warning", attentionSummary.summary.warningCount],
    ]);
    renderAttentionReasons(attentionSummary.summary);
    renderAttentionList(attentionList);
    renderSessions(sessions);

    const attentionMap = new Map((attentionList.runtimes || []).map((item) => [item.runtimeId, item]));
    renderRuntimes(runtimes, attentionMap);

    nodes.statusLine.textContent = `Loaded ${runtimes.runtimes.length} runtimes.`;
  } catch (error) {
    console.error(error);
    nodes.statusLine.textContent = `Dashboard load failed: ${error.message}`;
  }
}

async function postAndReload(path, label) {
  nodes.statusLine.textContent = `${label}...`;
  try {
    await postJson(`${path}${buildQuery()}`);
    await loadDashboard();
    nodes.statusLine.textContent = `${label} complete.`;
  } catch (error) {
    console.error(error);
    nodes.statusLine.textContent = `${label} failed: ${error.message}`;
  }
}

async function submitRegisterForm(event) {
  event.preventDefault();
  const body = {
    name: nodes.registerName.value.trim(),
    endpoint: nodes.registerEndpoint.value.trim(),
    pairingToken: nodes.registerToken.value.trim(),
    capabilities: [],
    tags: {
      environment: nodes.registerRuntimeEnvironment.value.trim() || null,
      cluster: nodes.registerRuntimeCluster.value.trim() || null,
      role: nodes.registerRuntimeRole.value.trim() || null,
    },
    fetchCapabilities: nodes.registerFetchCapabilities.checked,
  };

  nodes.registerResult.textContent = "Registering runtime...";
  try {
    const result = await postJsonBody("/v1/runtimes/register", body);
    state.selectedRuntimeId = result.runtimeId;
    nodes.registerResult.textContent = `Registered ${result.name} (${result.runtimeId}) into ${currentSliceLabel()}.`;
    await loadDashboard();
    nodes.runtimeDetailPanel.scrollIntoView({ behavior: "smooth", block: "start" });
  } catch (error) {
    console.error(error);
    nodes.registerResult.textContent = `Registration failed: ${error.message}`;
  }
}

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

nodes.refreshAllButton.addEventListener("click", () => postAndReload("/v1/fleet/refresh-all", "Fleet refresh-all"));
nodes.refreshStatusButton.addEventListener("click", () => postAndReload("/v1/fleet/refresh-status", "Fleet status refresh"));
nodes.refreshCapabilitiesButton.addEventListener("click", () => postAndReload("/v1/fleet/refresh-capabilities", "Fleet capability refresh"));
nodes.runtimeDetailRefreshAll.addEventListener("click", () => refreshSelectedRuntime("all"));
nodes.runtimeDetailRefreshStatus.addEventListener("click", () => refreshSelectedRuntime("status"));
nodes.runtimeDetailRefreshCapabilities.addEventListener("click", () => refreshSelectedRuntime("capabilities"));
nodes.runtimeDetailCopyLink.addEventListener("click", copySelectedRuntimeLink);
nodes.registerForm.addEventListener("submit", submitRegisterForm);
nodes.registerFormClear.addEventListener("click", clearRegisterForm);

hydrateStateFromLocation();
loadDashboard();
