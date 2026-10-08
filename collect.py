#!/usr/bin/env python3
"""Snapshot of the local agent setup (Claude Code, Codex, OpenCode, Savor) as JSON for the dashboard.

Reads only configuration, names and metadata. Never reads ~/.secrets, auth files or token fields.
Usage: collect.py > data.json
"""
import json
import os
import re
import shutil
import socket
import sqlite3
import subprocess
import time
import tomllib
from datetime import datetime, timezone
from pathlib import Path

HOME = Path.home()
DEV = HOME / "dev"
SETUP = DEV / "kontor"
CLAUDE = HOME / ".claude"
CODEX = HOME / ".codex"
SKILL_SOURCES = HOME / ".skills"
NOW = time.time()
MONTH = 30 * 86400
PATH_EXTRA = [HOME / ".local/bin", HOME / ".bun/bin", HOME / ".npm-global/bin", HOME / ".opencode/bin"]
# long random-looking strings in agent files are masked, in case a token ever lands in one
SECRET_LIKE = re.compile(r"\b(?=[A-Za-z0-9_\-]*\d)(?=[A-Za-z0-9_\-]*[A-Za-z])[A-Za-z0-9_\-]{36,}\b")


def read_json(path):
    return json.loads(Path(path).read_text())


def iso(ts):
    return datetime.fromtimestamp(ts, timezone.utc).isoformat(timespec="seconds")


def run(*cmd, cwd=None):
    exe = shutil.which(cmd[0], path=os.pathsep.join([os.environ.get("PATH", ""), *map(str, PATH_EXTRA)]))
    if not exe:
        return ""
    out = subprocess.run([exe, *cmd[1:]], cwd=cwd, capture_output=True, text=True, timeout=20)
    return out.stdout.strip()


def frontmatter(text):
    meta = {}
    if text.startswith("---"):
        head = text.split("---", 2)[1]
        for line in head.splitlines():
            m = re.match(r"^([\w-]+):\s*(.*)$", line)
            if m:
                meta[m.group(1)] = m.group(2).strip().strip('"')
    return meta


def body_lines(text):
    if text.startswith("---"):
        text = text.split("---", 2)[2]
    return [line for line in text.splitlines()]


def first_bullet(text):
    for line in body_lines(text):
        line = line.strip()
        if line.startswith("- "):
            return line[2:]
    return ""


def script_comment(path):
    """Second line of a script, the comment that says what it does."""
    lines = [l[1:].strip() for l in Path(path).read_text().splitlines()[1:4] if l.startswith("#")]
    return " ".join(lines)


def encode_project(path):
    return re.sub(r"[^A-Za-z0-9]", "-", str(path))


# ---------- sources ----------

claude_settings = read_json(CLAUDE / "settings.json")
claude_state = read_json(HOME / ".claude.json")
codex_config = tomllib.loads((CODEX / "config.toml").read_text())
savor_projects = {p["id"]: p["path"] for p in read_json(HOME / ".savor/state.json")["projects"]}
# old project paths kept as symlinks in ~/dev (e.g. New AI Setup -> kontor) count for their target
links = {str(p): str(p.resolve()) for p in DEV.iterdir() if p.is_symlink()}
aliases = {encode_project(old): encode_project(new) for old, new in links.items()}


def unalias(path):
    for old, new in links.items():
        if path == old or path.startswith(old + "/"):
            return new + path[len(old):]
    return path

# ---------- sessions ----------

claude_sessions = {}  # project path -> count in the last 30 days
claude_total = 0
for d in (CLAUDE / "projects").iterdir():
    n = sum(1 for f in d.glob("*.jsonl") if NOW - f.stat().st_mtime < MONTH)
    if not n:
        continue
    claude_total += n
    key = d.name
    m = re.match(r"^-home-[^-]+--savor-worktrees-([0-9a-f]+)-", key)
    if m and m.group(1) in savor_projects:
        key = encode_project(savor_projects[m.group(1)])
    key = aliases.get(key, key)
    claude_sessions[key] = claude_sessions.get(key, 0) + n

codex_sessions = {}  # cwd -> count
codex_total = 0
for f in (CODEX / "sessions").rglob("*.jsonl"):
    if NOW - f.stat().st_mtime > MONTH:
        continue
    with f.open() as fh:
        meta = json.loads(fh.readline())
    cwd = unalias(meta.get("payload", {}).get("cwd", ""))
    codex_total += 1
    codex_sessions[cwd] = codex_sessions.get(cwd, 0) + 1

opencode_sessions = {}
opencode_total = 0
oc_db = HOME / ".local/share/opencode/opencode.db"
if oc_db.exists():
    con = sqlite3.connect(f"file:{oc_db}?mode=ro", uri=True)
    for directory, n in con.execute(
        "select directory, count(*) from session where time_created > ? group by directory", (int((NOW - MONTH) * 1000),)
    ):
        directory = unalias(directory)
        opencode_sessions[directory] = opencode_sessions.get(directory, 0) + n
        opencode_total += n
    con.close()


def sessions_for(path):
    path = str(path)
    inside = lambda cwd: cwd == path or cwd.startswith(path + "/")
    return {
        "claude": claude_sessions.get(encode_project(path), 0),
        "codex": sum(n for cwd, n in codex_sessions.items() if inside(cwd)),
        "opencode": sum(n for cwd, n in opencode_sessions.items() if inside(cwd)),
    }


# ---------- agents ----------

agents = [
    {
        "id": "claude",
        "name": "Claude Code",
        "version": run("claude", "--version").split(" ")[0],
        "model": claude_settings.get("model", ""),
        "effort": claude_settings.get("effortLevel", ""),
        "sessions30": claude_total,
        "reads": ["~/.claude/rules/*.md", "CLAUDE.md"],
    },
    {
        "id": "codex",
        "name": "Codex",
        "version": run("codex", "--version").split(" ")[-1],
        "model": codex_config.get("model", ""),
        "effort": codex_config.get("model_reasoning_effort", ""),
        "sessions30": codex_total,
        "reads": ["~/.codex/AGENTS.md", "AGENTS.md"],
    },
    {
        "id": "opencode",
        "name": "OpenCode",
        "version": run("opencode", "--version"),
        "model": "",
        "effort": "",
        "sessions30": opencode_total,
        "reads": ["AGENTS.md"],
    },
]

# ---------- rules ----------

rules = []
for f in sorted((CLAUDE / "rules").glob("*.md")):
    text = f.read_text()
    rules.append({
        "file": f.name,
        "lines": len([l for l in body_lines(text) if l.strip()]),
        "gist": first_bullet(text),
        "content": text.strip(),
        "changed": iso(f.stat().st_mtime),
    })

# ---------- skills ----------

skill_usage = claude_state.get("skillUsage", {})
codex_skills = {p.name for p in (HOME / ".agents/skills").iterdir()} if (HOME / ".agents/skills").exists() else set()
linked_sources = set()
skills = []
for skill_md in sorted(CLAUDE.glob("skills/*/SKILL.md")):
    real = skill_md.resolve()
    if real.is_relative_to(SKILL_SOURCES):
        linked_sources.add(real)
    meta = frontmatter(skill_md.read_text())
    name = meta.get("name", skill_md.parent.name)
    usage = skill_usage.get(name, {})
    skills.append({
        "name": name,
        "description": meta.get("description", ""),
        "hint": meta.get("argument-hint", ""),
        "userOnly": meta.get("disable-model-invocation") == "true",
        "scope": "global",
        "codex": skill_md.parent.name in codex_skills,
        "source": str(real).replace(str(HOME), "~"),
        "uses": usage.get("usageCount", 0),
        "lastUsed": iso(usage["lastUsedAt"] / 1000) if usage.get("lastUsedAt") else None,
        "changed": iso(real.stat().st_mtime),
    })
orphan_skills = sorted(f.stem for f in SKILL_SOURCES.glob("*.md") if f.resolve() not in linked_sources)

# ---------- plugins ----------

installed = read_json(CLAUDE / "plugins/installed_plugins.json")["plugins"]
enabled_map = claude_settings.get("enabledPlugins", {})
plugin_usage = claude_state.get("pluginUsage", {})
plugins = []
plugin_mcp = []
for key, entries in sorted(installed.items()):
    entry = entries[0]
    name, market = key.split("@", 1)
    enabled = enabled_map.get(key, True)
    install = Path(entry["installPath"])
    provides = []
    if (install / "skills").exists():
        provides.append("skills")
    if (install / "agents").exists():
        provides.append("agents")
    if (install / "commands").exists():
        provides.append("commands")
    if (install / ".mcp.json").exists():
        provides.append("mcp")
        if enabled:
            servers = read_json(install / ".mcp.json")
            plugin_mcp += [(n, name) for n in servers.get("mcpServers", servers)]
    if (install / ".lsp.json").exists() or name.endswith("-lsp"):
        provides.append("lsp")
    plugins.append({
        "name": name,
        "marketplace": market,
        "version": entry.get("version", "")[:12],
        "enabled": enabled,
        "provides": provides,
        "uses": plugin_usage.get(key, {}).get("usageCount", 0),
        "updated": entry.get("lastUpdated") or entry.get("installedAt"),
    })

# ---------- MCP servers ----------

mcp = []
if (HOME / ".savor/mcp").exists():
    mcp.append({"name": "savor", "scope": "savor", "where": "Savor"})
if claude_state.get("cachedChromeExtensionInstalled"):
    mcp.append({"name": "claude-in-chrome", "scope": "extension", "where": "Claude Code"})
for name in claude_state.get("mcpServers", {}):
    mcp.append({"name": name, "scope": "user", "where": "Claude Code"})
for path, proj in claude_state.get("projects", {}).items():
    for name in proj.get("mcpServers", {}):
        mcp.append({"name": name, "scope": "project", "where": path.replace(str(HOME), "~") or "~"})
for name, plugin in plugin_mcp:
    mcp.append({"name": name, "scope": "plugin", "where": plugin})
for name in codex_config.get("mcp_servers", {}):
    mcp.append({"name": name, "scope": "user", "where": "Codex"})
for name in claude_state.get("claudeAiMcpEverConnected", []):
    mcp.append({"name": name.removeprefix("claude.ai "), "scope": "connector", "where": "claude.ai"})

# ---------- hooks ----------

hooks = {}


def add_hooks(config, agent):
    for event, groups in config.get("hooks", {}).items():
        for group in groups:
            for h in group.get("hooks", []):
                m = re.search(r"(~?/[\w./-]+\.sh)", h.get("command", ""))
                script = m.group(1) if m else h.get("command", "")
                entry = hooks.setdefault(script, {"script": Path(script).name, "path": script, "triggers": [], "agents": []})
                trigger = event + (f" · {group['matcher']}" if group.get("matcher") else "")
                if trigger not in entry["triggers"]:
                    entry["triggers"].append(trigger)
                if agent not in entry["agents"]:
                    entry["agents"].append(agent)


add_hooks(claude_settings, "claude")
if (CODEX / "hooks.json").exists():
    add_hooks(read_json(CODEX / "hooks.json"), "codex")
for h in hooks.values():
    p = Path(h["path"].replace("~", str(HOME), 1))
    h["does"] = script_comment(p) if p.exists() else ""

# ---------- projects ----------

review_repos = {}
for line in (SETUP / "review-repos.conf").read_text().splitlines():
    if line.strip() and not line.startswith("#"):
        review_repos[line.split(" | ")[0].strip()] = True
savor_paths = {unalias(p) for p in savor_projects.values()}


def agent_file(d):
    files = {n: d / n for n in ("CLAUDE.md", "AGENTS.md") if (d / n).exists()}
    if not files:
        return None
    links = {n: os.readlink(p) for n, p in files.items() if p.is_symlink()}
    real = [n for n in files if n not in links]
    imports = {n for n in real if files[n].read_text().strip() in ("@AGENTS.md", "@CLAUDE.md")}
    canonical = [n for n in real if n not in imports]
    main = canonical[0] if canonical else real[0] if real else next(iter(files))
    text = files[main].read_text()
    heading = next((l.lstrip("# ").strip() for l in text.splitlines() if l.startswith("#")), "")
    return {
        "files": sorted(files),
        "canonical": canonical,
        "links": {n: t for n, t in links.items()},
        "imports": sorted(imports),
        "main": main,
        "external": main in links and not (d / links[main]).resolve().is_relative_to(d.resolve()),
        "lines": len(text.splitlines()),
        "heading": heading[:120],
        "content": SECRET_LIKE.sub("‹…›", "\n".join(text.splitlines()[:120])),
    }


projects = []
for d in sorted(DEV.iterdir(), key=lambda p: p.name.lower()):
    if d.is_symlink() or not d.is_dir() or d.name.startswith((".", "_")) or not (d / ".git").exists():
        continue
    project_skills = sorted({p.parent.name for p in d.glob(".claude/skills/*/SKILL.md")} | {p.parent.name for p in d.glob(".agents/skills/*/SKILL.md")})
    for name in project_skills:
        skill_md = next(iter(d.glob(f".*/skills/{name}/SKILL.md")))
        meta = frontmatter(skill_md.read_text())
        skills.append({"name": meta.get("name", name), "description": meta.get("description", ""), "hint": meta.get("argument-hint", ""),
                       "userOnly": False, "scope": d.name, "codex": (d / ".agents/skills" / name).exists(),
                       "source": str(skill_md).replace(str(HOME), "~"), "uses": skill_usage.get(name, {}).get("usageCount", 0),
                       "lastUsed": None, "changed": iso(skill_md.stat().st_mtime)})
    mcp_file = d / ".mcp.json"
    if mcp_file.exists():
        for name in read_json(mcp_file).get("mcpServers", {}):
            mcp.append({"name": name, "scope": "project", "where": d.name})
    last_commit = run("git", "log", "-1", "--format=%cI", cwd=d)
    projects.append({
        "name": d.name,
        "path": str(d).replace(str(HOME), "~"),
        "agentFile": agent_file(d),
        "design": (d / "DESIGN.md").exists(),
        "review": d.name in review_repos,
        "savor": str(d) in savor_paths,
        "skills": project_skills,
        "sessions30": sessions_for(d),
        "lastCommit": last_commit or None,
    })

# ---------- automations ----------

automations = []
for project_path in sorted(savor_paths):
    for f in sorted(Path(project_path).glob(".savor/workflows/*.json")):
        wf = read_json(f)
        automations.append({
            "kind": "savor",
            "name": wf["name"],
            "project": Path(f).parents[2].name,
            "cron": wf.get("cron"),
            "label": wf.get("scheduleLabel"),
            "enabled": wf.get("enabled", True),
            "lastRun": wf.get("lastRunAt"),
            "what": re.sub(r"\s+", " ", wf.get("prompt", ""))[:220],
        })


def systemctl_show(unit, *props):
    out = run("systemctl", "--user", "show", unit, *[f"-p{p}" for p in props])
    return dict(line.split("=", 1) for line in out.splitlines() if "=" in line)


def systemd_time(value):
    if not value or value == "n/a":
        return None
    out = run("date", "-d", value, "+%s")
    return iso(int(out)) if out else None


unit_dir = HOME / ".config/systemd/user"
for unit in sorted(list(unit_dir.glob("*.timer")) + list(unit_dir.glob("*.path"))):
    info = systemctl_show(unit.name, "Description", "ActiveState", "UnitFileState")
    service = unit.stem + ".service"
    svc = systemctl_show(service, "ExecMainStartTimestamp", "Result")
    text = unit.read_text()
    schedule = re.findall(r"^(OnCalendar|PathChanged|PathModified)=(.+)$", text, re.M)
    automations.append({
        "kind": "systemd",
        "name": unit.name,
        "description": info.get("Description", ""),
        "schedule": [f"{k}={v.replace('%h', '~')}" for k, v in schedule],
        "enabled": info.get("ActiveState") == "active",
        "lastRun": systemd_time(svc.get("ExecMainStartTimestamp")),
        "result": svc.get("Result"),
    })

# ---------- khala ----------

khala_dir = DEV / "khala"
readme = (khala_dir / "README.md").read_text()
contrib_line = next((l for l in readme.splitlines() if l.startswith("**Contributors:**")), "")
khala = {
    "ideas": sum(1 for p in (khala_dir / "ideas").iterdir() if (p / "IDEA.md").exists()),
    "contributors": re.findall(r"(\w+) \(\[@", contrib_line),
    "recent": [dict(zip(("date", "author", "subject"), l.split("|", 2)))
               for l in run("git", "log", "-8", "--format=%cs|%an|%s", cwd=khala_dir).splitlines()],
}

# ---------- recent changes ----------

changes = []
for r in rules:
    changes.append({"date": r["changed"], "kind": "rule", "what": r["file"]})
for s in skills:
    changes.append({"date": s["changed"], "kind": "skill", "what": s["name"]})
for p in plugins:
    changes.append({"date": p["updated"], "kind": "plugin", "what": p["name"]})
for f in (CLAUDE / "settings.json", CODEX / "config.toml"):
    changes.append({"date": iso(f.stat().st_mtime), "kind": "config", "what": str(f).replace(str(HOME), "~")})
for h in hooks.values():
    p = Path(h["path"].replace("~", str(HOME), 1))
    if p.exists():
        changes.append({"date": iso(p.stat().st_mtime), "kind": "hook", "what": h["script"]})
for c in khala["recent"]:
    changes.append({"date": c["date"], "kind": "khala", "what": f'{c["author"]}: {c["subject"]}'})
cutoff = datetime.fromtimestamp(NOW - MONTH, timezone.utc).date().isoformat()
changes = sorted((c for c in changes if c["date"] and c["date"][:10] >= cutoff), key=lambda c: c["date"], reverse=True)[:20]

# ---------- drift ----------

drift = []
mcp_names = {m["name"] for m in mcp}
for h in hooks.values():
    for t in h["triggers"]:
        m = re.search(r"mcp__([\w-]+?)__", t)
        if m and m.group(1) not in mcp_names:
            drift.append({"level": "warn", "key": "staleMatcher", "hook": h["script"], "matcher": t.split(" · ", 1)[-1], "server": m.group(1)})
rules_newest = max((CLAUDE / "rules" / r["file"]).stat().st_mtime for r in rules)
if (CODEX / "AGENTS.md").stat().st_mtime < rules_newest - 60:
    drift.append({"level": "warn", "key": "codexRulesStale"})
missing_in_codex = [s["name"] for s in skills if s["scope"] == "global" and not s["codex"]]
if missing_in_codex:
    drift.append({"level": "warn", "key": "codexSkillsMissing", "items": missing_in_codex})
for repo in review_repos:
    if not (DEV / repo).exists():
        drift.append({"level": "warn", "key": "reviewRepoMissing", "items": [repo]})
for a in automations:
    if a["kind"] == "systemd" and not a["enabled"]:
        drift.append({"level": "warn", "key": "unitInactive", "items": [a["name"]]})
    if a["kind"] == "systemd" and a.get("result") not in (None, "", "success"):
        drift.append({"level": "warn", "key": "unitFailed", "items": [a["name"]]})
if orphan_skills:
    drift.append({"level": "info", "key": "orphanSkills", "items": orphan_skills})
stale_trust = [p for p in codex_config.get("projects", {}) if not Path(p).exists()]
if stale_trust:
    drift.append({"level": "info", "key": "codexStaleTrust", "items": [p.replace(str(HOME), "~") for p in stale_trust]})
disabled = [p["name"] for p in plugins if not p["enabled"]]
if disabled:
    drift.append({"level": "info", "key": "pluginsDisabled", "items": disabled})
both = [p["name"] for p in projects if p["agentFile"] and len(p["agentFile"]["canonical"]) > 1]
if both:
    drift.append({"level": "info", "key": "agentFilesDiverge", "items": both})
without = [p["name"] for p in projects if not p["agentFile"] and p["name"] != "khala"]
if without:
    drift.append({"level": "info", "key": "noAgentFile", "items": without})
running = {a["name"] for a in automations if a["enabled"]}
paused = [a["name"] for a in automations if a["kind"] == "savor" and not a["enabled"] and a["cron"] and a["cron"].split()[2] == "*" and a["name"] not in running]
if paused:
    drift.append({"level": "info", "key": "workflowsPaused", "items": paused})

print(json.dumps({
    "generatedAt": iso(NOW),
    "host": socket.gethostname(),
    "agents": agents,
    "rules": rules,
    "skills": skills,
    "orphanSkills": orphan_skills,
    "plugins": plugins,
    "mcp": mcp,
    "hooks": list(hooks.values()),
    "projects": projects,
    "reviewRepos": list(review_repos),
    "automations": automations,
    "khala": khala,
    "changes": changes,
    "drift": drift,
}, ensure_ascii=False, indent=1))
