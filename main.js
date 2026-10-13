const LANES = LANE_GROUPS.flatMap((group, groupIndex) =>
  group.lanes.map((lane) => ({ ...lane, groupIndex })),
);
const laneById = Object.fromEntries(LANES.map((lane) => [lane.id, lane]));

const today = new Date().toISOString().slice(0, 7);
const sortDate = (entry) => entry.sortBy ?? (entry.end === null ? today : entry.end ?? entry.start);
const entries = [...ENTRIES].sort(
  (a, b) => sortDate(b).localeCompare(sortDate(a)) || b.start.localeCompare(a.start),
);

const formatMonth = (date) => {
  const [year, month] = date.split("-");
  return `${Number(month)}/${year}`;
};
const formatDates = (entry) => {
  if (entry.end === undefined) return formatMonth(entry.start);
  return `${formatMonth(entry.start)} - ${entry.end ? formatMonth(entry.end) : "present"}`;
};

const hiddenLanes = new Set();
let soloLane = null;

const isLaneVisible = (laneId) => !hiddenLanes.has(laneId);
const isEntryVisible = (entry) => {
  if (soloLane && !entry.lanes.includes(soloLane)) return false;
  return LANE_GROUPS.every((_, groupIndex) => {
    const lanesInGroup = entry.lanes.filter((id) => laneById[id].groupIndex === groupIndex);
    return lanesInGroup.length === 0 || lanesInGroup.some(isLaneVisible);
  });
};

function saveFilterState() {
  return { hidden: new Set(hiddenLanes), solo: soloLane };
}

function restoreFilterState(state) {
  hiddenLanes.clear();
  state.hidden.forEach((laneId) => hiddenLanes.add(laneId));
  soloLane = state.solo;
}

function toggleLane(laneId) {
  soloLane = null;
  if (hiddenLanes.has(laneId)) hiddenLanes.delete(laneId);
  else hiddenLanes.add(laneId);
  render();
}

function soloOrReset(laneId) {
  const { groupIndex } = laneById[laneId];
  const isAlreadySolo = LANES.every(
    (lane) => lane.groupIndex !== groupIndex || (lane.id === laneId) === isLaneVisible(lane.id),
  );
  hiddenLanes.clear();
  soloLane = null;
  if (!isAlreadySolo) {
    soloLane = laneId;
    LANES.forEach((lane) => {
      if (lane.groupIndex === groupIndex && lane.id !== laneId) hiddenLanes.add(lane.id);
    });
  }
  render();
}

const NODE_Y = 25;
const mobileQuery = matchMedia("(max-width: 720px)");

function laneX(laneId) {
  const { groupIndex } = laneById[laneId];
  const index = LANES.findIndex((lane) => lane.id === laneId);
  const [start, step, groupGap] = mobileQuery.matches ? [10, 16, 12] : [14, 20, 18];
  return start + index * step + groupIndex * groupGap;
}

function renderGraph(entry, row, spans) {
  let html = "";
  for (const lane of LANES) {
    const span = spans[lane.id];
    if (!span || !isLaneVisible(lane.id)) continue;
    const style = `left:${laneX(lane.id)}px;--c:var(--${lane.id})`;
    const above = row > span.first && row <= span.last;
    const below = row >= span.first && row < span.last;
    if (above && below && !entry.lanes.includes(lane.id)) {
      html += `<div class="lane-line" style="${style};top:0;bottom:0"></div>`;
      continue;
    }
    if (above) html += `<div class="lane-line" style="${style};top:0;height:${NODE_Y}px"></div>`;
    if (below) html += `<div class="lane-line" style="${style};top:${NODE_Y}px;bottom:0"></div>`;
  }

  const nodeLanes = entry.lanes.filter(isLaneVisible).sort((a, b) => laneX(a) - laneX(b));
  if (nodeLanes.length === 2) {
    const [left, right] = nodeLanes;
    html += `<div class="node-link" style="left:${laneX(left)}px;width:${laneX(right) - laneX(left)}px;--from:var(--${left});--to:var(--${right})"></div>`;
  }
  const nodeClass = entry.end === undefined ? "node" : "node node-hollow";
  for (const laneId of nodeLanes) {
    html += `<div class="${nodeClass}" style="left:${laneX(laneId)}px;--c:var(--${laneId})"></div>`;
  }
  return html;
}

function renderMedia(entry) {
  let className, content;
  if (entry.img) {
    className = "media screenshot";
    content = `<img src="${entry.img}" alt="${entry.title}" loading="lazy" decoding="async">`;
  } else if (entry.logo) {
    className = "media logo";
    content = `<img src="${entry.logo}" alt="${entry.org}" loading="lazy" decoding="async">`;
  } else {
    return "";
  }
  const href = entry.links?.[0].url;
  if (!href) return `<div class="${className}">${content}</div>`;
  return `<a class="${className}" href="${href}" target="_blank" rel="noopener" tabindex="-1" aria-hidden="true">${content}</a>`;
}

const renderList = (className, items = []) =>
  items.length ? `<ul class="${className}">${items.map((item) => `<li>${item}</li>`).join("")}</ul>` : "";

function renderEntry(entry) {
  const laneTags = entry.lanes
    .map((id) => `<span style="color:var(--${id})">${laneById[id].label}</span>`)
    .join(", ");
  const links = (entry.links ?? [])
    .map((link) => `<a href="${link.url}" target="_blank" rel="noopener">${link.label}</a>`)
    .join("");
  return `
    <article class="entry">
      <div>
        <div class="entry-heading"><h2 class="entry-title">${entry.title}</h2><span class="entry-lanes">(${laneTags})</span></div>
        <div class="entry-meta"><span>${entry.org}</span><span>${formatDates(entry)}</span></div>
        ${entry.summary ? `<p class="entry-summary">${entry.summary}</p>` : ""}
        ${renderList("entry-wins", entry.wins)}
        ${renderList("entry-notes", entry.notes)}
        ${links ? `<div class="entry-links">${links}</div>` : ""}
      </div>
      ${renderMedia(entry)}
    </article>`;
}

function yearsSince(date) {
  const [year, month] = date.split("-").map(Number);
  const now = new Date();
  return Math.floor((now.getFullYear() * 12 + now.getMonth() + 1 - (year * 12 + month)) / 12);
}

// Shown with every filter on, and as the empty state when the filters hide everything else.
const isInitialCommitVisible = (visibleEntries) =>
  visibleEntries.length === 0 || (!soloLane && hiddenLanes.size === 0);

function renderInitialCommit(spans) {
  const laneIds = LANES.map((lane) => lane.id).filter((id) => spans[id] && isLaneVisible(id));
  const xs = laneIds.map(laneX);
  const nodeX = xs.length ? xs[0] : laneX(LANES[0].id);
  let graph = laneIds
    .map((id) => `<div class="lane-line" style="left:${laneX(id)}px;--c:var(--${id});top:0;height:${NODE_Y}px"></div>`)
    .join("");
  if (xs.length > 1) {
    graph += `<div class="node-link initial-link" style="left:${nodeX}px;width:${xs[xs.length - 1] - nodeX}px"></div>`;
  }
  graph += `<div class="node initial-node" style="left:${nodeX}px"></div>`;

  const years = yearsSince(INITIAL_COMMIT.start);
  const entry = `
    <article class="entry">
      <div>
        <div class="entry-heading"><h2 class="entry-title">${INITIAL_COMMIT.title}</h2></div>
        <div class="entry-meta"><span>${formatMonth(INITIAL_COMMIT.start)}</span><span>${years} years ago</span></div>
      </div>
    </article>`;
  return `<li class="row"><div class="graph" aria-hidden="true">${graph}</div>${entry}</li>`;
}

const logElement = document.getElementById("log");
const filterElement = document.getElementById("filters");
const statusElement = document.getElementById("log-status");

function render() {
  filterElement.querySelectorAll("[data-lane]").forEach((button) => {
    button.setAttribute("aria-pressed", isLaneVisible(button.dataset.lane));
  });

  const visibleEntries = entries.filter(isEntryVisible);
  const spans = {};
  visibleEntries.forEach((entry, row) => {
    for (const laneId of entry.lanes) {
      spans[laneId] ??= { first: row };
      spans[laneId].last = row;
    }
  });

  // Lanes run down into the initial commit, like branches back to the root.
  const showInitialCommit = isInitialCommitVisible(visibleEntries);
  const initialRow = visibleEntries.length;
  if (showInitialCommit) Object.values(spans).forEach((span) => (span.last = initialRow));

  logElement.innerHTML =
    visibleEntries
      .map((entry, row) => `<li class="row"><div class="graph" aria-hidden="true">${renderGraph(entry, row, spans)}</div>${renderEntry(entry)}</li>`)
      .join("") + (showInitialCommit ? renderInitialCommit(spans) : "");
  statusElement.textContent = `Showing ${visibleEntries.length} of ${entries.length} entries`;
}

filterElement.innerHTML =
  LANE_GROUPS.map(
    (group, groupIndex) => `
      <div class="filter-group" role="group" aria-labelledby="filter-group-${groupIndex}">
        <span class="filter-group-label" id="filter-group-${groupIndex}">${group.label}/</span>
        ${group.lanes
          .map((lane) => `<button type="button" class="filter" data-lane="${lane.id}" style="--c:var(--${lane.id})" aria-pressed="true" aria-describedby="filter-hint-key">${lane.label}</button>`)
          .join("")}
      </div>`,
  ).join("") +
  `<p class="filter-hint">
    <span class="hint-touch"># hold a lane to show only it</span>
    <span class="hint-key" id="filter-hint-key"># shift+enter shows only this lane</span>
  </p>`;

const LONG_PRESS_MS = 450;
let stateBeforeClick = null;
let longPressTimer = null;
let swallowNextClick = false;

const laneOf = (event) => event.target.closest("[data-lane]")?.dataset.lane;

filterElement.addEventListener("click", (event) => {
  const laneId = laneOf(event);
  if (!laneId) return;
  if (swallowNextClick) {
    swallowNextClick = false;
    return;
  }
  if (event.shiftKey) return soloOrReset(laneId);
  if (event.detail > 1) return;
  stateBeforeClick = saveFilterState();
  toggleLane(laneId);
});

filterElement.addEventListener("dblclick", (event) => {
  const laneId = laneOf(event);
  if (!laneId) return;
  if (stateBeforeClick) restoreFilterState(stateBeforeClick);
  stateBeforeClick = null;
  soloOrReset(laneId);
});

filterElement.addEventListener("keydown", (event) => {
  const laneId = laneOf(event);
  if (!laneId || event.key !== "Enter" || !event.shiftKey) return;
  event.preventDefault();
  soloOrReset(laneId);
});

const cancelLongPress = () => clearTimeout(longPressTimer);
filterElement.addEventListener("pointerdown", (event) => {
  const laneId = laneOf(event);
  swallowNextClick = false;
  if (!laneId || event.pointerType === "mouse") return;
  longPressTimer = setTimeout(() => {
    swallowNextClick = true;
    soloOrReset(laneId);
  }, LONG_PRESS_MS);
});
["pointerup", "pointercancel", "pointerleave"].forEach((type) => filterElement.addEventListener(type, cancelLongPress));
filterElement.addEventListener("contextmenu", (event) => {
  if (laneOf(event)) event.preventDefault();
});

document.getElementById("socials").innerHTML = PROFILE.socials
  .map((social) => `<a href="${social.url}" target="_blank" rel="noopener" aria-label="${social.label}"><img src="${social.icon}" alt=""></a>`)
  .join("");
const emailLink = document.getElementById("email");
emailLink.href = `mailto:${PROFILE.email}`;
emailLink.textContent = PROFILE.email;

mobileQuery.addEventListener("change", render);
render();
