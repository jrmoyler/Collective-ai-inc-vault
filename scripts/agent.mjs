#!/usr/bin/env node
// Zero-dependency CLI for the live vault. Node 18+.
// Token: VAULT_AGENT_TOKEN env var, or a one-line .vault-agent file at the repo root (gitignored).
//
//   node scripts/agent.mjs whoami
//   node scripts/agent.mjs status <working|writing|reading|thinking|reviewing|blocked|idle|offline> [--task CV-001] [--note "Exact Note"] [--detail "what I'm doing"]
//   node scripts/agent.mjs log <kind> <text...> [--note ..] [--task ..]
//   node scripts/agent.mjs tasks [open|claimed|review|blocked|done]
//   node scripts/agent.mjs task CV-001
//   node scripts/agent.mjs claim CV-001
//   node scripts/agent.mjs update CV-001 <review|blocked|done|open> [--result "..."]
//   node scripts/agent.mjs create "Title" [--detail ..] [--note ..] [--priority high]
//   node scripts/agent.mjs get "Exact Note"
//   node scripts/agent.mjs search <query...>
//   node scripts/agent.mjs write "Exact Note" --file note.md [--folder "09 - Projects"] [--task CV-001] [--summary ".."]
//   node scripts/agent.mjs append "Exact Note" --file section.md [--task CV-001] [--summary ".."]
//   node scripts/agent.mjs activity
//   node scripts/agent.mjs hook        (Claude Code hook: reads the event JSON on stdin, never fails)
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const API = process.env.VAULT_API_URL || "https://vczwabqqmiskrqxmiomi.supabase.co/functions/v1/agent-api";

function token() {
  if (process.env.VAULT_AGENT_TOKEN) return process.env.VAULT_AGENT_TOKEN.trim();
  for (const p of [path.join(process.cwd(), ".vault-agent"), path.join(ROOT, ".vault-agent")]) {
    try { return fs.readFileSync(p, "utf8").trim(); } catch {}
  }
  return "";
}
export async function call(action, body = {}, { timeout = 15000 } = {}) {
  const t = token();
  if (!t) throw new Error("No agent token. Set VAULT_AGENT_TOKEN or create .vault-agent with your token.");
  const ctl = new AbortController();
  const timer = setTimeout(() => ctl.abort(), timeout);
  try {
    const r = await fetch(API, { method: "POST", signal: ctl.signal, headers: { authorization: "Bearer " + t, "content-type": "application/json" }, body: JSON.stringify({ action, ...body }) });
    const j = await r.json().catch(() => ({ error: "bad response " + r.status }));
    if (!r.ok || j.error) throw new Error(j.error || "HTTP " + r.status);
    return j;
  } finally { clearTimeout(timer); }
}

function parse(argv) {
  const pos = [], opt = {};
  for (let i = 0; i < argv.length; i++) {
    if (argv[i].startsWith("--")) { const k = argv[i].slice(2); opt[k] = argv[i + 1] && !argv[i + 1].startsWith("--") ? argv[++i] : true; }
    else pos.push(argv[i]);
  }
  return { pos, opt };
}
const readBody = (o) => (o.file ? fs.readFileSync(o.file, "utf8") : o.body ? String(o.body) : fs.readFileSync(0, "utf8"));

// Claude Code hook: map tool events to presence so the team sees what the agent is touching.
async function hook() {
  let ev = {};
  try { ev = JSON.parse(fs.readFileSync(0, "utf8") || "{}"); } catch {}
  const name = ev.hook_event_name || "";
  const tool = ev.tool_name || "";
  const inp = ev.tool_input || {};
  const fp = inp.file_path || inp.path || inp.notebook_path || "";
  let note = null;
  const m = String(fp).match(/vault\/(.+)\.md$/);
  if (m) {
    note = path.basename(m[1]);
    try { const t = fs.readFileSync(path.isAbsolute(fp) ? fp : path.join(ROOT, fp), "utf8").match(/^title:\s*(.+)$/m); if (t) note = t[1].trim().replace(/^["']|["']$/g, ""); } catch {}
  }
  let status = "working", detail = tool ? `${tool}${fp ? " " + path.relative(ROOT, fp) : inp.command ? " " + String(inp.command).slice(0, 80) : inp.pattern ? " " + inp.pattern : ""}` : null;
  if (/^(Edit|Write|MultiEdit|NotebookEdit)$/.test(tool)) status = note ? "writing" : "working";
  else if (/^(Read|Grep|Glob)$/.test(tool)) status = note ? "reading" : "working";
  if (name === "UserPromptSubmit") { status = "thinking"; detail = String(ev.prompt || "").replace(/\s+/g, " ").slice(0, 140) || "new instruction"; }
  if (name === "Stop" || name === "SessionEnd") { status = "idle"; detail = "waiting for the next instruction"; }
  if (name === "SessionStart") { status = "idle"; detail = "session started"; }
  const body = { status, detail };
  if (note) body.note = note;
  if (tool) body.tool = tool;
  try { await call("heartbeat", body, { timeout: 2500 }); } catch {}
  if (note && /^(Edit|Write|MultiEdit)$/.test(tool) && fp) {
    // push the edited note to the live vault right away
    try {
      const { execFileSync } = await import("node:child_process");
      execFileSync("python3", [path.join(ROOT, "scripts", "sync.py"), "push-file", fp], { stdio: "ignore", timeout: 8000 });
    } catch {}
  }
}

async function main() {
  const [cmd, ...rest] = process.argv.slice(2);
  const { pos, opt } = parse(rest);
  const out = (x) => console.log(JSON.stringify(x, null, 2));
  switch (cmd) {
    case "hook": return hook();
    case "whoami": return out(await call("whoami"));
    case "status": case "beat": case "heartbeat":
      return out(await call("heartbeat", { status: pos[0] || "working", ...(opt.task !== undefined ? { task: opt.task } : {}), ...(opt.note !== undefined ? { note: opt.note } : {}), ...(opt.detail !== undefined ? { detail: opt.detail } : {}) }));
    case "log": return out(await call("log", { kind: pos[0], text: pos.slice(1).join(" "), note: opt.note, task: opt.task }));
    case "tasks": { const r = await call("tasks.list", pos[0] ? { status: pos[0] } : {}); for (const t of r.tasks) console.log(`${t.id}  ${t.status.padEnd(8)} ${t.priority.padEnd(6)} ${(t.agent || "").padEnd(12)} ${t.title}`); return; }
    case "task": return out(await call("tasks.get", { id: pos[0] }));
    case "claim": return out(await call("tasks.claim", { id: pos[0] }));
    case "update": return out(await call("tasks.update", { id: pos[0], status: pos[1], result: opt.result }));
    case "create": return out(await call("tasks.create", { title: pos.join(" "), detail: opt.detail, note: opt.note, priority: opt.priority, division: opt.division }));
    case "get": { const r = await call("notes.get", { name: pos.join(" ") }); console.log(r.note.body); console.error(`\n-- ${r.note.folder} · v${r.note.version} · last edit ${r.note.updated_by} · ${r.backlinks.length} backlinks`); return; }
    case "search": { const r = await call("notes.search", { q: pos.join(" ") }); for (const h of r.hits) console.log(`${h.name}  [${h.folder}]\n    ${h.snippet}`); return; }
    case "write": return out(await call("notes.upsert", { name: pos.join(" "), body: readBody(opt), folder: opt.folder, task: opt.task, summary: opt.summary }));
    case "append": return out(await call("notes.append", { name: pos.join(" "), section: readBody(opt), task: opt.task, summary: opt.summary }));
    case "activity": { const r = await call("activity.recent", { limit: 30 }); for (const a of r.activity) console.log(`${a.ts.slice(11, 19)}  ${a.actor.padEnd(12)} ${a.kind} ${a.task || ""} ${a.note || a.text || ""}`); return; }
    default:
      console.log(fs.readFileSync(fileURLToPath(import.meta.url), "utf8").split("\n").slice(1, 21).map((l) => l.replace(/^\/\/ ?/, "")).join("\n"));
  }
}
const isMain = process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url);
if (isMain) main().catch((e) => { if (process.argv[2] === "hook") process.exit(0); console.error("error:", e.message); process.exit(1); });
