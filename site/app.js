const T = {
  de: {
    search: "Suchen: Skill, Projekt, Hook, Regel …", overview: "Überblick", agents: "Agents", projects: "Projekte", skills: "Skills", rules: "Regeln",
    hooks: "Hooks", plugins: "Plugins", mcp: "MCP-Server", mcpNav: "MCP", auto: "Automatik", toolBy: "ein Werkzeug von", otherLang: "English",
    overviewLead: "Stand der Dinge: was offen ist, was von selbst läuft und was sich zuletzt geändert hat.",
    allGood: "Alles läuft", needsYou: n => n === 1 ? "1 Punkt braucht Aufmerksamkeit" : `${n} Punkte brauchen Aufmerksamkeit`,
    notes: n => n === 1 ? "1 Hinweis ohne Eile" : `${n} Hinweise ohne Eile`, pausedCount: n => `${n} pausiert`, onChange: "bei Änderungen",
    map: "Zusammenspiel", mapLead: "Wie Robin, Claude, Codex und Savor zusammenarbeiten, und was dafür eingerichtet ist.",
    hintEntry: "Hier fängt Robin an.", hintAgents: "Arbeiten im Auftrag.", hintBase: "Lesen beide Agents.", hintWork: "Hier wird gearbeitet.",
    hintAuto: "Läuft nach Zeitplan oder bei Änderungen, ohne Robin.",
    howToRead: "So liest du die Karte", tapHint: "Einen Knoten antippen, um seine Verbindungen und Details zu sehen.",
    keyLine: "Linie: startet oder liest", keyGen: "Gestrichelt: generierte Kopie für Codex, nicht von Hand ändern",
    colEntry: "Einstieg", colAgents: "Agents", colBase: "Gemeinsame Basis", colWork: "Arbeitet in", colAuto: "Läuft von selbst",
    attention: "Braucht Aufmerksamkeit", recent: "Zuletzt geändert", nothing: "Nichts offen.",
    stamp: (d, h) => `Stand: ${d}<br>von <code>${h}</code>`,
    agentsLead: "Installierte Agent-CLIs mit Standardmodell und den Dateien, die sie lesen.",
    projectsLead: "Welche Agent-Datei ein Projekt hat, welche davon die echte ist und ob es im Nacht-Review steckt. Zeile antippen für den Inhalt.",
    skillsLead: "Quelle ~/.skills, verlinkt nach ~/.claude/skills, von codex-sync nach ~/.agents/skills kopiert. Dazu Skills einzelner Projekte.",
    rulesLead: "Globale Regeln für alle Agents. Claude liest sie direkt, Codex über die generierte ~/.codex/AGENTS.md. Antippen für den Text.",
    hooksLead: "Laufen automatisch bei Ereignissen der Agents, ohne dass jemand sie aufruft.",
    pluginsLead: "Claude-Code-Plugins. Nutzung laut Claude Code, alle Zeiten.",
    mcpLead: "MCP-Server aus Konfiguration, Plugins, Savor und claude.ai-Connectoren.",
    autoLead: "Was ohne Robin läuft: Savor-Workflows und systemd-Units auf dem Laptop.",
    khalaLead: "Geteiltes Ideen-Repo. Ohne Agent-Datei, die README ist die einzige Autorität.",
    project: "Projekt", agentFile: "Agent-Datei", lines: "Zeilen", nightReview: "Nacht-Review", sessions30: "Sessions 30 T.",
    when: "Wann", what: "Was", where: "Wo", source: "Quelle", provides: "Bringt mit", uses: "Nutzung", updated: "Aktualisiert", state: "Status", lastRun: "Zuletzt",
    on: "an", off: "aus", paused: "pausiert", never: "noch nie", nightly: "nachts", none: "keine", yes: "ja", no: "nein",
    symlinkFor: n => `${n} ist Symlink`, importOf: n => `${n} importiert sie`, external: "verlinkt nach außen", twoFiles: "zwei getrennte Dateien",
    noFile: "Keine Agent-Datei. Hier gelten nur die globalen Regeln.", sessions: "Sessions in 30 Tagen", reads: "liest", model: "Modell", effort: "Effort", standard: "Standard",
    ideas: "Ideen", contributors: "Mitwirkende", latest: "Zuletzt", openInCatalog: "Im Katalog öffnen", showAll: "Alles zeigen", connected: "Verbunden mit",
    steps: ["Robin startet über Savor oder das Terminal.", "Claude oder Codex übernimmt.", "Beide lesen dieselben Regeln und Skills, Codex über generierte Kopien.", "Gearbeitet wird in den Projekten, jedes mit eigener Agent-Datei.", "Darunter läuft, was ohne Robin passiert."],
    globalScope: "global", onlyIn: p => `nur ${p}`, userOnly: "nur per /Befehl", codexToo: "auch Codex", claudeOnly: "nur Claude", usedTimes: n => `${n}× genutzt`,
    orphans: "Skill-Quellen ohne Verknüpfung", close: "Schließen", content: "Inhalt", firstLines: n => `erste ${n} Zeilen`,
    groupClaude: "CLAUDE.md", groupAgents: "AGENTS.md", groupNone: "Ohne Agent-Datei", entryRobin: "Laptop oder Handy", entrySavor: "Daemon · Relay · Workflows",
    entryTerminal: "claude / codex direkt", robinText: "Startet Gespräche, gibt Mockups, Commits und Pushes frei.",
    savorText: "Startet Agents pro Projekt, plant Workflows, zeigt die Vorschau. Unterwegs über den Relay.", terminalText: "Der direkte Weg ohne Savor.",
    rulesNode: n => `${n} Dateien · ~/.claude/rules`, codexMirror: "generiert von codex-sync", codexMirrorText: "Spiegel der Regeln für Codex. Nicht von Hand bearbeiten.",
    skillsNode: n => `${n} global · Quelle ~/.skills`, skillsCopy: "Kopie für Codex", skillsCopyText: "Kopien statt Symlinks, weil Codex verlinkte SKILL.md überspringt.",
    pluginsNode: (p, m) => `${p} Plugins an · ${m} MCP-Server`, khalaNode: (n, c) => `${n} Ideen · ${c}`,
    kind: { rule: "Regel", skill: "Skill", plugin: "Plugin", config: "Konfiguration", hook: "Hook", khala: "Khala" },
    scope: { savor: "Savor", extension: "Browser-Erweiterung", user: "Benutzer", project: "Projekt", plugin: "Plugin", connector: "claude.ai-Connector" },
    days: ["So", "Mo", "Di", "Mi", "Do", "Fr", "Sa"], daily: t => `täglich ${t}`, weekly: (d, t) => `${d} ${t}`, once: (d, t) => `einmalig ${d} ${t}`, manual: "von Hand",
    drift: {
      staleMatcher: d => [`${d.hook} hängt an einem fehlenden MCP-Server`, `Der Matcher ${d.matcher} zeigt auf „${d.server}“, den es nicht mehr gibt. Der Hook greift dort nicht.`, "~/.claude/settings.json"],
      codexRulesStale: () => ["Codex-Regeln veraltet", "~/.codex/AGENTS.md ist älter als die Regeln. codex-sync ist nicht gelaufen.", "codex-sync.path"],
      codexSkillsMissing: d => ["Skills fehlen in Codex", d.items.join(", "), "~/.agents/skills"],
      reviewRepoMissing: d => ["Repo aus dem Nacht-Review fehlt", d.items.join(", "), "review-repos.conf"],
      unitInactive: d => ["systemd-Unit nicht aktiv", d.items.join(", "), "systemctl --user"],
      unitFailed: d => ["systemd-Unit zuletzt fehlgeschlagen", d.items.join(", "), "journalctl --user"],
      orphanSkills: d => [`${d.items.length} Skill-Quellen ohne Verknüpfung`, `${d.items.join(", ")} liegen in ~/.skills, kein Agent lädt sie.`, "~/.skills"],
      codexStaleTrust: d => [`Codex vertraut ${d.items.length} Pfaden, die es nicht mehr gibt`, d.items.slice(0, 6).join(", ") + (d.items.length > 6 ? " …" : ""), "~/.codex/config.toml"],
      pluginsDisabled: d => [`${d.items.length} Plugins installiert, aber aus`, d.items.join(", "), "~/.claude/settings.json"],
      agentFilesDiverge: d => ["CLAUDE.md und AGENTS.md getrennt gepflegt", d.items.join(", "), "~/dev"],
      noAgentFile: d => [`${d.items.length} Repos ohne Agent-Datei`, d.items.join(", "), "~/dev"],
      workflowsPaused: d => ["Wiederkehrende Workflows pausiert", d.items.join(", "), "Savor"],
    },
  },
  en: {
    search: "Search: skill, project, hook, rule …", overview: "Overview", agents: "Agents", projects: "Projects", skills: "Skills", rules: "Rules",
    hooks: "Hooks", plugins: "Plugins", mcp: "MCP servers", mcpNav: "MCP", auto: "Automation", toolBy: "a tool by", otherLang: "Deutsch",
    overviewLead: "State of things: what is open, what runs on its own and what changed lately.",
    allGood: "All running", needsYou: n => n === 1 ? "1 item needs attention" : `${n} items need attention`,
    notes: n => n === 1 ? "1 note, no rush" : `${n} notes, no rush`, pausedCount: n => `${n} paused`, onChange: "on changes",
    map: "Interplay", mapLead: "How Robin, Claude, Codex and Savor work together, and what is set up for it.",
    hintEntry: "Where Robin starts.", hintAgents: "Do the work.", hintBase: "Read by both agents.", hintWork: "Where the work happens.",
    hintAuto: "Runs on a schedule or on changes, without Robin.",
    howToRead: "How to read the map", tapHint: "Tap a node to see its connections and details.",
    keyLine: "Line: starts or reads", keyGen: "Dashed: generated copy for Codex, do not edit by hand",
    colEntry: "Entry", colAgents: "Agents", colBase: "Shared base", colWork: "Works in", colAuto: "Runs on its own",
    attention: "Needs attention", recent: "Recently changed", nothing: "Nothing open.",
    stamp: (d, h) => `Snapshot: ${d}<br>from <code>${h}</code>`,
    agentsLead: "Installed agent CLIs with their default model and the files they read.",
    projectsLead: "Which agent file a project has, which one is the real one and whether it is in the nightly review. Tap a row for the content.",
    skillsLead: "Source ~/.skills, linked into ~/.claude/skills, copied to ~/.agents/skills by codex-sync. Plus skills of single projects.",
    rulesLead: "Global rules for all agents. Claude reads them directly, Codex through the generated ~/.codex/AGENTS.md. Tap for the text.",
    hooksLead: "Run automatically on agent events, without anyone calling them.",
    pluginsLead: "Claude Code plugins. Usage as counted by Claude Code, all time.",
    mcpLead: "MCP servers from configuration, plugins, Savor and claude.ai connectors.",
    autoLead: "What runs without Robin: Savor workflows and systemd units on the laptop.",
    khalaLead: "Shared idea repository. No agent file, the README is the only authority.",
    project: "Project", agentFile: "Agent file", lines: "Lines", nightReview: "Nightly review", sessions30: "Sessions 30 d",
    when: "When", what: "What", where: "Where", source: "Source", provides: "Provides", uses: "Usage", updated: "Updated", state: "State", lastRun: "Last run",
    on: "on", off: "off", paused: "paused", never: "never", nightly: "nightly", none: "none", yes: "yes", no: "no",
    symlinkFor: n => `${n} is a symlink`, importOf: n => `${n} imports it`, external: "links outside", twoFiles: "two separate files",
    noFile: "No agent file. Only the global rules apply here.", sessions: "sessions in 30 days", reads: "reads", model: "Model", effort: "Effort", standard: "default",
    ideas: "ideas", contributors: "contributors", latest: "Latest", openInCatalog: "Open in catalog", showAll: "Show all", connected: "Connected to",
    steps: ["Robin starts through Savor or the terminal.", "Claude or Codex takes over.", "Both read the same rules and skills, Codex through generated copies.", "The work happens in the projects, each with its own agent file.", "Below runs what happens without Robin."],
    globalScope: "global", onlyIn: p => `only ${p}`, userOnly: "only via /command", codexToo: "Codex too", claudeOnly: "Claude only", usedTimes: n => `used ${n}×`,
    orphans: "Skill sources without a link", close: "Close", content: "Content", firstLines: n => `first ${n} lines`,
    groupClaude: "CLAUDE.md", groupAgents: "AGENTS.md", groupNone: "Without agent file", entryRobin: "Laptop or phone", entrySavor: "Daemon · relay · workflows",
    entryTerminal: "claude / codex directly", robinText: "Starts conversations, approves mockups, commits and pushes.",
    savorText: "Starts agents per project, schedules workflows, shows the preview. On the go through the relay.", terminalText: "The direct way without Savor.",
    rulesNode: n => `${n} files · ~/.claude/rules`, codexMirror: "generated by codex-sync", codexMirrorText: "Mirror of the rules for Codex. Do not edit by hand.",
    skillsNode: n => `${n} global · source ~/.skills`, skillsCopy: "copy for Codex", skillsCopyText: "Copies instead of symlinks, because Codex skips symlinked SKILL.md files.",
    pluginsNode: (p, m) => `${p} plugins on · ${m} MCP servers`, khalaNode: (n, c) => `${n} ideas · ${c}`,
    kind: { rule: "Rule", skill: "Skill", plugin: "Plugin", config: "Config", hook: "Hook", khala: "Khala" },
    scope: { savor: "Savor", extension: "Browser extension", user: "User", project: "Project", plugin: "Plugin", connector: "claude.ai connector" },
    days: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"], daily: t => `daily ${t}`, weekly: (d, t) => `${d} ${t}`, once: (d, t) => `once ${d} ${t}`, manual: "manual",
    drift: {
      staleMatcher: d => [`${d.hook} points at a missing MCP server`, `The matcher ${d.matcher} refers to "${d.server}", which no longer exists. The hook does not fire there.`, "~/.claude/settings.json"],
      codexRulesStale: () => ["Codex rules out of date", "~/.codex/AGENTS.md is older than the rules. codex-sync has not run.", "codex-sync.path"],
      codexSkillsMissing: d => ["Skills missing in Codex", d.items.join(", "), "~/.agents/skills"],
      reviewRepoMissing: d => ["Repo from the nightly review is missing", d.items.join(", "), "review-repos.conf"],
      unitInactive: d => ["systemd unit not active", d.items.join(", "), "systemctl --user"],
      unitFailed: d => ["systemd unit failed last time", d.items.join(", "), "journalctl --user"],
      orphanSkills: d => [`${d.items.length} skill sources without a link`, `${d.items.join(", ")} are in ~/.skills, no agent loads them.`, "~/.skills"],
      codexStaleTrust: d => [`Codex trusts ${d.items.length} paths that no longer exist`, d.items.slice(0, 6).join(", ") + (d.items.length > 6 ? " …" : ""), "~/.codex/config.toml"],
      pluginsDisabled: d => [`${d.items.length} plugins installed but off`, d.items.join(", "), "~/.claude/settings.json"],
      agentFilesDiverge: d => ["CLAUDE.md and AGENTS.md kept separately", d.items.join(", "), "~/dev"],
      noAgentFile: d => [`${d.items.length} repos without an agent file`, d.items.join(", "), "~/dev"],
      workflowsPaused: d => ["Recurring workflows paused", d.items.join(", "), "Savor"],
    },
  },
};

let lang = localStorage.getItem("lang") || (navigator.language.startsWith("de") ? "de" : "en");
let S;
const $ = id => document.getElementById(id);
const t = k => T[lang][k];
const esc = s => String(s ?? "").replace(/[&<>"']/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]);
const dots = a => a.map(x => `<span class="dot ${x}" title="${x}"></span>`).join(" ");
const fmtDate = iso => iso ? new Date(iso).toLocaleString(lang === "de" ? "de-DE" : "en-GB", { day: "2-digit", month: "2-digit", hour: "2-digit", minute: "2-digit" }) : t("never");
const fmtDay = iso => iso ? new Date(iso).toLocaleDateString(lang === "de" ? "de-DE" : "en-GB", { day: "2-digit", month: "2-digit" }) : "";
function ago(iso) {
  if (!iso) return t("never");
  const s = (new Date(iso) - Date.now()) / 1000, rtf = new Intl.RelativeTimeFormat(lang, { numeric: "auto" });
  for (const [u, n] of [["day", 86400], ["hour", 3600], ["minute", 60]]) if (Math.abs(s) >= n) return rtf.format(Math.round(s / n), u);
  return rtf.format(Math.round(s), "second");
}
function cron(c) {
  if (!c) return t("manual");
  const [m, h, dom, mon, dow] = c.split(" "), time = `${h.padStart(2, "0")}:${m.padStart(2, "0")}`;
  if (dom === "*" && mon === "*" && dow === "*") return t("daily")(time);
  if (dom === "*" && mon === "*" && /^\d$/.test(dow)) return t("weekly")(t("days")[+dow], time);
  if (dom !== "*" && mon !== "*") return t("once")(`${dom.padStart(2, "0")}.${mon.padStart(2, "0")}.`, time);
  return c;
}
function systemdWhen(a, short) {
  if (short && a.schedule.every(s => s.startsWith("PathChanged="))) return t("onChange");
  return a.schedule.map(s => {
    const [k, v] = s.split("=");
    if (k === "OnCalendar") { const m = v.match(/\*-\*-\* (\d\d:\d\d)/); return m ? t("daily")(m[1]) : v; }
    return v;
  }).join(", ");
}

// ---------- catalog sections ----------

const secs = () => [["overview", t("overview"), ""], ["agents", t("agents"), S.agents.length], ["projects", t("projects"), S.projects.length],
  ["skills", t("skills"), S.skills.length], ["rules", t("rules"), S.rules.length], ["hooks", t("hooks"), S.hooks.length],
  ["plugins", t("plugins"), S.plugins.length], ["mcp", t("mcpNav"), S.mcp.length], ["auto", t("auto"), S.automations.length], ["khala", "Khala", S.khala.ideas], ["map", t("map"), ""]];

function show() {
  const id = (location.hash || "#overview").slice(1);
  document.querySelectorAll("section").forEach(s => s.classList.toggle("on", s.id === "s-" + id));
  document.querySelectorAll("#nav a").forEach(a => a.classList.toggle("active", a.dataset.id === id));
  $("q").value = ""; resetSearch(); closeDrawer(); scrollTo(0, 0);
  if (id === "map") requestAnimationFrame(() => mreset());
}

function openDrawer(html) {
  $("drawer").innerHTML = `<button class="ghost" onclick="closeDrawer()">${t("close")}</button>${html}`;
  $("drawer").classList.add("open");
}
function closeDrawer() { $("drawer").classList.remove("open"); }

function agentFileCell(f) {
  if (!f) return `<span class="off">–</span>`;
  const notes = [];
  if (f.canonical.length > 1) notes.push(`<span class="warn">${t("twoFiles")}</span>`);
  for (const n of Object.keys(f.links)) if (n !== f.main) notes.push(t("symlinkFor")(n));
  for (const n of f.imports) notes.push(t("importOf")(n));
  if (f.external) notes.push(t("external"));
  return `${f.main}${notes.length ? ` <span class="muted">· ${notes.join(" · ")}</span>` : ""}`;
}
const sessTotal = s => s.claude + s.codex + s.opencode;

function render() {
  document.documentElement.lang = lang;
  document.querySelectorAll("[data-i18n]").forEach(e => e.textContent = t(e.dataset.i18n));
  $("q").placeholder = t("search");
  $("lang").textContent = t("otherLang");
  $("stamp").innerHTML = t("stamp")(fmtDate(S.generatedAt), esc(S.host));
  $("nav").innerHTML = secs().map(([id, l, c]) => `<a href="#${id}" data-id="${id}"><span>${l}</span><span class="muted">${c}</span></a>`).join("");

  const warns = S.drift.filter(d => d.level === "warn").length, infos = S.drift.length - warns;
  $("status").innerHTML = `<span class="lamp ${warns ? "warn" : "ok"}"></span><div><div class="big">${warns ? t("needsYou")(warns) : t("allGood")}</div>
    ${infos ? `<div class="muted">${t("notes")(infos)}</div>` : ""}</div>`;
  const on = {}, paused = S.automations.filter(a => !a.enabled).length;
  for (const a of S.automations.filter(a => a.enabled)) {
    const sys = a.kind === "systemd", name = sys ? a.name.replace(/\.(timer|path)$/, "") : a.name, k = (sys ? "u:" : "w:") + name, o = on[k] ||= { name, when: [], bad: false, last: null };
    o.when.push(sys ? systemdWhen(a, true) : cron(a.cron));
    o.bad ||= sys && !!a.result && a.result !== "success";
    if (a.lastRun > (o.last || "")) o.last = a.lastRun;
  }
  $("autoState").innerHTML = Object.values(on).map(o => `<div class="state"><span class="${o.bad ? "warn" : "ok"}">●</span><div><b>${esc(o.name)}</b> <span class="muted">${esc(o.when.join(" · "))}</span></div>
      <span class="when ${o.bad ? "warn" : "muted"}">${ago(o.last)}</span></div>`).join("")
    + (paused ? `<div class="state"><span class="off">●</span><div class="muted">${t("pausedCount")(paused)}</div><a class="when" href="#auto">${t("auto")} →</a></div>` : "");
  $("hints").innerHTML = S.drift.length ? S.drift.map(d => { const [title, detail, where] = t("drift")[d.key](d);
    return `<div class="hint"><span class="${d.level === "warn" ? "warn" : "muted"}">${d.level === "warn" ? "●" : "○"}</span><div><b>${esc(title)}</b><div class="muted">${esc(detail)}</div><code class="muted">${esc(where)}</code></div></div>`; }).join("")
    : `<p class="muted">${t("nothing")}</p>`;
  $("changes").innerHTML = S.changes.map(c => `<div class="hint"><span class="muted" style="min-width:48px">${fmtDay(c.date)}</span><div><span class="pill">${t("kind")[c.kind]}</span> ${esc(c.what)}</div></div>`).join("");

  $("agents").innerHTML = S.agents.map(a => `<div class="card"><div style="display:flex;justify-content:space-between;gap:8px"><h3 style="font-size:22px"><span class="dot ${a.id}"></span> ${esc(a.name)}</h3><span class="pill">${esc(a.version || "–")}</span></div>
    <div class="muted" style="margin-top:8px">${t("model")}: ${esc(a.model || t("standard"))}${a.effort ? ` · ${t("effort")}: ${esc(a.effort)}` : ""}</div>
    <div class="muted" style="margin-top:6px">${t("reads")}: ${a.reads.map(r => `<code>${esc(r)}</code>`).join(", ")}</div>
    <div style="margin-top:12px"><b class="display" style="font-size:28px">${a.sessions30}</b> <span class="muted">${t("sessions")}</span></div></div>`).join("");

  $("projects").innerHTML = S.projects.map((p, i) => `<tr class="click" onclick="openProject(${i})"><td><b>${esc(p.name)}</b>${p.skills.length ? ` <span class="pill">${p.skills.length} Skill</span>` : ""}</td>
    <td>${agentFileCell(p.agentFile)}</td><td class="hide-m">${p.agentFile ? p.agentFile.lines : ""}</td>
    <td>${p.review ? `<span class="ok">${t("nightly")}</span>` : `<span class="off">–</span>`}</td><td class="hide-m">${p.savor ? t("yes") : `<span class="off">–</span>`}</td>
    <td class="hide-m">${sessTotal(p.sessions30) || ""} ${sessTotal(p.sessions30) ? dots(Object.keys(p.sessions30).filter(k => p.sessions30[k])) : ""}</td></tr>`).join("");

  $("skills").innerHTML = S.skills.map((s, i) => `<div class="card skill click" onclick="openSkill(${i})"><h3>${esc(s.name)}</h3><p class="muted" style="margin:6px 0 0">${esc(s.description)}</p>
    <div class="meta"><span class="pill">${s.codex ? dots(["claude", "codex"]) + " " + t("codexToo") : dots(["claude"]) + " " + t("claudeOnly")}</span>
    <span class="pill">${s.scope === "global" ? t("globalScope") : t("onlyIn")(esc(s.scope))}</span>${s.userOnly ? `<span class="pill">${t("userOnly")}</span>` : ""}
    <span class="pill">${t("usedTimes")(s.uses)}</span></div></div>`).join("");
  $("orphans").innerHTML = S.orphanSkills.length ? `<h3 class="sub">${t("orphans")}</h3><div class="card">${S.orphanSkills.map(o => `<span class="pill">${esc(o)}</span>`).join(" ")}</div>` : "";

  $("rules").innerHTML = S.rules.map((r, i) => `<tr class="click" onclick="openRule(${i})"><td><code>${esc(r.file)}</code></td><td>${esc(r.gist)}</td><td class="muted hide-m">${r.lines} ${t("lines")}</td></tr>`).join("");
  $("hooks").innerHTML = S.hooks.map(h => `<tr><td><code>${esc(h.script)}</code></td><td class="muted">${h.triggers.map(esc).join("<br>")}</td><td>${dots(h.agents)}</td><td>${esc(h.does)}</td></tr>`).join("");
  $("plugins").innerHTML = S.plugins.map(p => `<tr><td><b>${esc(p.name)}</b><div class="muted">${esc(p.marketplace)}</div></td><td>${p.provides.map(x => `<span class="pill">${x}</span>`).join(" ")}</td>
    <td class="hide-m">${p.uses}</td><td class="hide-m muted">${fmtDay(p.updated)}</td><td>${p.enabled ? `<span class="ok">${t("on")}</span>` : `<span class="off">${t("off")}</span>`}</td></tr>`).join("");
  $("mcp").innerHTML = S.mcp.map(m => `<tr><td><b>${esc(m.name)}</b></td><td class="muted">${t("scope")[m.scope]}</td><td><code>${esc(m.where)}</code></td></tr>`).join("");
  $("auto").innerHTML = S.automations.map(a => a.kind === "savor"
    ? `<tr><td><b>${esc(a.name)}</b><div class="muted">${esc(a.what)}</div></td><td>${esc(cron(a.cron))}</td><td class="hide-m muted">Savor · ${esc(a.project)}</td><td class="${a.enabled ? "" : "off"}">${a.enabled ? ago(a.lastRun) : t("paused")}</td></tr>`
    : `<tr><td><b>${esc(a.name)}</b><div class="muted">${esc(a.description)}</div></td><td>${esc(systemdWhen(a))}</td><td class="hide-m muted">systemd --user</td><td class="${a.result && a.result !== "success" ? "warn" : a.enabled ? "" : "off"}">${a.enabled ? ago(a.lastRun) : t("off")}</td></tr>`).join("");

  $("khala").innerHTML = `<div class="card kpi"><b>${S.khala.ideas}</b><span class="muted">${t("ideas")}</span></div><div class="card kpi"><b>${S.khala.contributors.length}</b><span class="muted">${esc(S.khala.contributors.join(", "))}</span></div>
    <div class="card"><span class="muted">${t("latest")}</span><div>${esc(S.khala.recent[0]?.date)} · ${esc(S.khala.recent[0]?.author)}</div><div class="muted">${esc(S.khala.recent[0]?.subject)}</div></div>`;
  $("khalaRecent").innerHTML = S.khala.recent.map(c => `<div class="hint"><span class="muted" style="min-width:90px">${esc(c.date)}</span><div><b>${esc(c.author)}</b> ${esc(c.subject)}</div></div>`).join("");

  buildMap();
  show();
}

function openProject(i) {
  const p = S.projects[i], f = p.agentFile, s = p.sessions30;
  openDrawer(`<h2 style="font-size:30px;margin:16px 0 4px">${esc(p.name)}</h2><div class="muted"><code>${esc(p.path)}</code></div>
    <div class="meta" style="margin:14px 0">${p.review ? `<span class="pill">${t("nightReview")}</span>` : ""}${p.design ? `<span class="pill">DESIGN.md</span>` : ""}${p.savor ? `<span class="pill">Savor</span>` : ""}
    ${p.skills.map(k => `<span class="pill">Skill ${esc(k)}</span>`).join("")}</div>
    <p>${dots(["claude"])} ${s.claude} · ${dots(["codex"])} ${s.codex} · ${dots(["opencode"])} ${s.opencode} <span class="muted">${t("sessions")}</span></p>
    ${f ? `<h3 style="font-size:20px">${agentFileCell(f)}</h3><p class="muted">${f.files.join(", ")} · ${f.lines} ${t("lines")}</p><pre>${esc(f.content)}</pre>` : `<p class="warn">${t("noFile")}</p>`}`);
}
function openRule(i) {
  const r = S.rules[i];
  openDrawer(`<h2 style="font-size:30px;margin:16px 0 4px">${esc(r.file)}</h2><div class="muted"><code>~/.claude/rules/${esc(r.file)}</code> · ${fmtDate(r.changed)}</div><pre>${esc(r.content)}</pre>`);
}
function openSkill(i) {
  const s = S.skills[i];
  openDrawer(`<h2 style="font-size:30px;margin:16px 0 4px">${esc(s.name)}</h2><div class="muted"><code>${esc(s.source)}</code></div><p>${esc(s.description)}</p>
    ${s.hint ? `<p class="muted">${esc(s.hint)}</p>` : ""}<p class="muted">${t("usedTimes")(s.uses)}${s.lastUsed ? " · " + fmtDate(s.lastUsed) : ""} · ${t("updated")} ${fmtDate(s.changed)}</p>`);
}

// ---------- map ----------

let N = {}, edges = [];
function buildMap() {
  const proj = S.projects, byMain = m => proj.filter(p => p.agentFile && p.agentFile.main === m).map(p => p.name);
  const none = proj.filter(p => !p.agentFile && p.name !== "khala").map(p => p.name);
  const global = S.skills.filter(s => s.scope === "global");
  const autos = S.automations.filter(a => a.enabled);
  N = {
    robin: { col: 0, t: "Robin", s: t("entryRobin"), d: t("robinText"), links: ["savor", "terminal"] },
    savor: { col: 0, t: "Savor", s: t("entrySavor"), d: t("savorText"), links: S.agents.map(a => a.id) },
    terminal: { col: 0, t: "Terminal", s: t("entryTerminal"), d: t("terminalText"), links: ["claude", "codex"] },
  };
  for (const a of S.agents) N[a.id] = { col: 1, t: a.name, s: `${a.model || t("standard")} · ${a.sessions30} Sessions`, d: `${t("reads")}: ${a.reads.join(", ")}`, agent: true, go: "agents",
    links: a.id === "claude" ? ["rules", "skills", "hooks", "plugins"] : a.id === "codex" ? ["agentsmd", "agentskills", "hooks"] : [] };
  Object.assign(N, {
    rules: { col: 2, t: t("rules"), s: t("rulesNode")(S.rules.length), list: S.rules.map(r => `${r.file} – ${r.gist}`), links: ["agentsmd"], go: "rules" },
    agentsmd: { col: 2, t: "~/.codex/AGENTS.md", s: t("codexMirror"), d: t("codexMirrorText"), links: [], gen: true },
    skills: { col: 2, t: t("skills"), s: t("skillsNode")(global.length), list: global.map(s => s.name), links: ["agentskills"], go: "skills" },
    agentskills: { col: 2, t: "~/.agents/skills", s: t("skillsCopy"), d: t("skillsCopyText"), links: [], gen: true },
    hooks: { col: 2, t: t("hooks"), s: S.hooks.map(h => h.script.replace(".sh", "")).join(", "), list: S.hooks.map(h => `${h.script} – ${h.does}`), links: [], go: "hooks" },
    plugins: { col: 2, t: "Plugins + MCP", s: t("pluginsNode")(S.plugins.filter(p => p.enabled).length, S.mcp.length),
      list: S.plugins.filter(p => p.enabled).map(p => p.name).concat(S.mcp.map(m => `${m.name} (MCP)`)), links: [], go: "plugins" },
    g_claude: { col: 3, t: t("groupClaude"), s: byMain("CLAUDE.md").join(", "), list: byMain("CLAUDE.md"), links: ["claude", "codex"], go: "projects" },
    g_agents: { col: 3, t: t("groupAgents"), s: byMain("AGENTS.md").join(", "), list: byMain("AGENTS.md"), links: ["claude", "codex"], go: "projects" },
    g_none: { col: 3, t: t("groupNone"), s: none.join(", "), list: none, links: ["claude", "codex"], go: "projects" },
    khala: { col: 3, t: "Khala", s: t("khalaNode")(S.khala.ideas, S.khala.contributors.join(", ")), d: t("khalaLead"), links: ["hooks", "skills"], go: "khala" },
  });
  autos.forEach((a, i) => {
    const id = "a" + i, sys = a.kind === "systemd";
    const links = !sys ? [] : a.name.startsWith("codex-sync") ? ["agentsmd", "agentskills"] : a.name.startsWith("review") ? ["g_claude", "g_agents", "g_none"] : [];
    N[id] = { col: 4, t: sys ? a.name.replace(/\.(timer|path)$/, "") : a.name, s: sys ? systemdWhen(a, true) : cron(a.cron), d: sys ? a.description : a.what, links, go: "auto" };
  });
  for (const c of [0, 1, 2, 3, 4]) $("c" + c).innerHTML = "";
  for (const [id, n] of Object.entries(N)) $("c" + n.col).insertAdjacentHTML("beforeend",
    `<div class="node${n.gen ? " gen" : ""}" id="n-${id}" onclick="pick('${id}')">${n.agent ? `<span class="dot ${id}"></span> ` : ""}<b>${esc(n.t)}</b><br><small>${esc(n.s)}</small></div>`);
  edges = [];
  for (const [a, n] of Object.entries(N)) n.links.forEach(b => N[b] && edges.push([a, b]));
}
function draw(sel) {
  const m = $("map").getBoundingClientRect(), c = id => $("n-" + id).getBoundingClientRect();
  if (!m.width) return;
  $("lines").innerHTML = edges.map(([a, b]) => {
    const A = c(a), B = c(b), fwd = A.left < B.left;
    let x1 = (fwd ? A.right : A.left) - m.left, y1 = A.top + A.height / 2 - m.top, x2 = (fwd ? B.left : B.right) - m.left, y2 = B.top + B.height / 2 - m.top;
    if (Math.abs(A.left - B.left) < 5 || N[a].col === 4 || N[b].col === 4) {
      const [U, D] = A.top < B.top ? [A, B] : [B, A];
      x1 = U.left + U.width / 2 - m.left; y1 = U.bottom - m.top; x2 = D.left + D.width / 2 - m.left; y2 = D.top - m.top;
      const my = (y1 + y2) / 2; const hl = sel && (a === sel || b === sel) ? "hl" : "";
      return `<path class="${hl}" d="M${x1} ${y1} C${x1} ${my} ${x2} ${my} ${x2} ${y2}"/>`;
    }
    const mx = (x1 + x2) / 2, hl = sel && (a === sel || b === sel) ? "hl" : "";
    return `<path class="${hl}" d="M${x1} ${y1} C${mx} ${y1} ${mx} ${y2} ${x2} ${y2}"/>`;
  }).join("");
}
function pick(id) {
  const n = N[id];
  document.querySelectorAll(".node").forEach(e => e.classList.remove("sel", "hl"));
  $("n-" + id).classList.add("sel"); $("map").classList.add("dim");
  const rel = edges.filter(e => e.includes(id)).map(e => e[0] === id ? e[1] : e[0]);
  rel.forEach(r => $("n-" + r).classList.add("hl")); draw(id);
  const cols = [t("colEntry"), t("colAgents"), t("colBase"), t("colWork"), t("colAuto")];
  $("mpanel").innerHTML = `<div class="muted" style="font-size:12px">${cols[n.col]}</div><h3 style="font-size:22px;margin:4px 0 8px">${esc(n.t)}</h3>${n.d ? `<p>${esc(n.d)}</p>` : ""}
    ${n.list ? `<ul>${n.list.map(x => `<li>${esc(x)}</li>`).join("")}</ul>` : ""}
    <h4 style="margin:14px 0 6px">${t("connected")}</h4><div class="meta">${[...new Set(rel)].map(r => `<span class="pill click" onclick="pick('${r}')">${esc(N[r].t)}</span>`).join("") || `<span class="muted">${t("none")}</span>`}</div>
    <div style="display:flex;gap:8px;margin-top:18px;flex-wrap:wrap">${n.go ? `<a class="btn" href="#${n.go}">${t("openInCatalog")}</a>` : ""}<button class="ghost" onclick="mreset()">${t("showAll")}</button></div>`;
}
function mreset() {
  document.querySelectorAll(".node").forEach(e => e.classList.remove("sel", "hl")); $("map").classList.remove("dim"); draw();
  $("mpanel").innerHTML = `<h3 style="font-size:22px;margin-bottom:8px">${t("howToRead")}</h3>
    <ol class="legend">${t("steps").map((s, i) => `<li><span class="step">${i + 1}</span><span>${s}</span></li>`).join("")}</ol>
    <div class="key"><i style="height:2px;background:rgba(255,255,255,.3)"></i>${t("keyLine")}</div>
    <div class="key"><i style="border:1px dashed var(--muted)"></i>${t("keyGen")}</div>
    <p class="muted" style="margin:14px 0 0">${t("tapHint")}</p>`;
}

// ---------- search ----------

function resetSearch() { document.querySelectorAll("section tr, section .card, section .hint").forEach(el => el.style.display = ""); }
$("q").addEventListener("input", e => {
  const q = e.target.value.toLowerCase(); resetSearch();
  if (!q) return show();
  document.querySelectorAll("section").forEach(s => s.classList.toggle("on", s.id !== "s-overview" && s.id !== "s-map"));
  document.querySelectorAll("section:not(#s-overview) tbody tr, section:not(#s-overview) .grid2 > .card, #khalaRecent .hint")
    .forEach(el => el.style.display = el.textContent.toLowerCase().includes(q) ? "" : "none");
});

$("lang").onclick = () => { lang = lang === "de" ? "en" : "de"; localStorage.setItem("lang", lang); render(); };
addEventListener("hashchange", show);
addEventListener("resize", () => { if (location.hash === "#map") draw(document.querySelector(".node.sel")?.id.slice(2)); });
addEventListener("keydown", e => { if (e.key === "Escape") closeDrawer(); });
fetch("data.json", { cache: "no-store" }).then(r => r.json()).then(d => { S = d; render(); });
