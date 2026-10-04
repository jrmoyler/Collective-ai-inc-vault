#!/usr/bin/env node
// Local MCP server (stdio, zero dependencies). Every tool call goes to the live vault, so the team sees it.
// Needs VAULT_AGENT_TOKEN in the environment or a .vault-agent file at the repo root.
import fs from "node:fs";
import path from "node:path";
import readline from "node:readline";
import { fileURLToPath } from "node:url";
import { call } from "../scripts/agent.mjs";

const HERE = path.dirname(fileURLToPath(import.meta.url));
const T = JSON.parse(fs.readFileSync(path.join(HERE, "tools.json"), "utf8"));
const PROTOCOL = fs.readFileSync(path.join(HERE, "..", "AGENTS.md"), "utf8");
const send = (m) => process.stdout.write(JSON.stringify(m) + "\n");

async function runTool(name, args = {}) {
  const t = T.tools.find((x) => x.name === name);
  if (!t) throw new Error("unknown tool " + name);
  if (!t.action) return PROTOCOL;
  const body = {};
  for (const [k, v] of Object.entries(args)) body[(t.map && t.map[k]) || k] = v;
  return call(t.action, body, { timeout: 30000 });
}
async function handle(msg) {
  const { id, method, params = {} } = msg;
  if (id === undefined) return; // notification
  try {
    if (method === "initialize") return send({ jsonrpc: "2.0", id, result: { protocolVersion: params.protocolVersion || "2025-06-18", capabilities: { tools: {} }, serverInfo: { name: "collective-vault", version: "2.0.0" }, instructions: T.instructions } });
    if (method === "ping") return send({ jsonrpc: "2.0", id, result: {} });
    if (method === "tools/list") return send({ jsonrpc: "2.0", id, result: { tools: T.tools.map(({ name, description, inputSchema }) => ({ name, description, inputSchema })) } });
    if (method === "tools/call") {
      try {
        const r = await runTool(params.name, params.arguments || {});
        return send({ jsonrpc: "2.0", id, result: { content: [{ type: "text", text: typeof r === "string" ? r : JSON.stringify(r, null, 2) }] } });
      } catch (e) {
        return send({ jsonrpc: "2.0", id, result: { isError: true, content: [{ type: "text", text: String(e.message || e) }] } });
      }
    }
    send({ jsonrpc: "2.0", id, error: { code: -32601, message: "method not found: " + method } });
  } catch (e) {
    send({ jsonrpc: "2.0", id, error: { code: -32603, message: String(e.message || e) } });
  }
}
const rl = readline.createInterface({ input: process.stdin });
const inflight = new Set();
rl.on("line", (l) => { if (!l.trim()) return; let m; try { m = JSON.parse(l); } catch { return; } (Array.isArray(m) ? m : [m]).forEach((x) => { const p = handle(x); inflight.add(p); p.finally(() => inflight.delete(p)); }); });
call("heartbeat", { status: "idle", detail: "connected over MCP" }, { timeout: 4000 }).catch(() => {});
const bye = async () => { await Promise.allSettled([...inflight]); return call("heartbeat", { status: "offline", detail: null }, { timeout: 2000 }).catch(() => {}).finally(() => process.exit(0)); };
rl.on("close", bye);
process.on("SIGINT", bye);
process.on("SIGTERM", bye);
