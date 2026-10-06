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
    if (method === "initialize") return send({ jsonrpc: "2.0", id, result: { protocolVersion: params.protocolVersion || "2025-06-18", capabilities: { tools: {} }, serverInfo: { name: "collective-vault", title: "Collective AI Vault", version: "2.1.0", websiteUrl: "https://github.com/jrmoyler/collective-ai-inc-vault", icons: [{ src: "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCA1MTIgNTEyIj48ZGVmcz48bGluZWFyR3JhZGllbnQgaWQ9ImciIHgxPSIwIiB5MT0iMCIgeDI9IjEiIHkyPSIxIj48c3RvcCBvZmZzZXQ9IjAiIHN0b3AtY29sb3I9IiMxNDFDM0EiLz48c3RvcCBvZmZzZXQ9IjEiIHN0b3AtY29sb3I9IiMwNzBBMTYiLz48L2xpbmVhckdyYWRpZW50PjxsaW5lYXJHcmFkaWVudCBpZD0iYSIgeDE9IjAiIHkxPSIwIiB4Mj0iMCIgeTI9IjEiPjxzdG9wIG9mZnNldD0iMCIgc3RvcC1jb2xvcj0iI0YyQzU2QSIvPjxzdG9wIG9mZnNldD0iMSIgc3RvcC1jb2xvcj0iI0Q0QTg0MyIvPjwvbGluZWFyR3JhZGllbnQ+PC9kZWZzPjxyZWN0IHdpZHRoPSI1MTIiIGhlaWdodD0iNTEyIiByeD0iMTA0IiBmaWxsPSJ1cmwoI2cpIi8+PHJlY3QgeD0iMjQiIHk9IjI0IiB3aWR0aD0iNDY0IiBoZWlnaHQ9IjQ2NCIgcng9Ijg4IiBmaWxsPSJub25lIiBzdHJva2U9IiNENEE4NDMiIHN0cm9rZS1vcGFjaXR5PSIuMjgiIHN0cm9rZS13aWR0aD0iMyIvPjxwYXRoIGQ9Ik0xMTIgNDA0VjIyMGw4MC00OHYyMzJNMTkyIDQwNFYxMDRsMTEyIDQ4djI1Mk0zMDQgNDA0VjI2MGw5NiAzMnYxMTIiIGZpbGw9Im5vbmUiIHN0cm9rZT0idXJsKCNhKSIgc3Ryb2tlLXdpZHRoPSIzNCIgc3Ryb2tlLWxpbmVqb2luPSJyb3VuZCIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIi8+PGNpcmNsZSBjeD0iNDAwIiBjeT0iMTI4IiByPSIyMiIgZmlsbD0iIzAwRDlCNSIvPjwvc3ZnPg==", mimeType: "image/svg+xml", sizes: ["any"] }] }, instructions: T.instructions } });
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
