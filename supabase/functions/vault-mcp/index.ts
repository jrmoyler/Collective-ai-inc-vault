// Remote MCP server (Streamable HTTP, JSON responses) for agents that run in the cloud:
// ChatGPT / OpenAI Responses API, Grok, Muse Spark, Claude.ai connectors.
// Auth: the agent's own token as "Authorization: Bearer <token>" or ?token=<token>.
// Each tool call is forwarded to agent-api with that token, so it shows up live for the team.
import T from "./tools.json" with { type: "json" };

const cors = { "Access-Control-Allow-Origin": "*", "Access-Control-Allow-Headers": "authorization, content-type, mcp-session-id, mcp-protocol-version, accept", "Access-Control-Allow-Methods": "GET, POST, DELETE, OPTIONS", "Access-Control-Expose-Headers": "mcp-session-id" };
const API = Deno.env.get("SUPABASE_URL") + "/functions/v1/agent-api";
const PROTOCOL = "Protocol: work through tasks (tasks_list, tasks_claim, tasks_update). Tell the team what you are doing with vault_status. Read before you write; add sections instead of rewriting. Never invent figures, dates, names or prices: write 'unknown'. Link only to notes that exist, as [[Exact Note Name]]. Canon (Oct 2026): 30-division model, 9 operating (ZenFlow, The Collective, Hybrid Living, Nexus Labs, Signal Velocity, Quantum Ledger, Binary Loom, Obsidian Arc, Juris Guard), 11 chartered, 10 pending (21-30) never described as active; spell VectorShift as one word; CFO Ahmad Muhammad; co-founders JR Moyler and Devon Scott; Civic Core veto removed Oct 1, 2026; Helios Grid blocked pending SEC opinion; ZENITH is Tier 1, HATAALII Tier 0.5; 0 customers and $0 MRR as of Sept 2026, so revenue figures are targets; Mega Campus canon is the Sept 16, 2026 register (220 acres, 35 facilities, 2,045,000 sq ft). Voice: short direct sentences; banned words delve, leverage, robust, seamless, transformative, empower, elevate, game-changing, cutting-edge, innovative, tapestry. The full text is AGENTS.md in github.com/jrmoyler/collective-ai-inc-vault.";
const out = (b: unknown, s = 200, extra: Record<string, string> = {}) => new Response(b === null ? null : JSON.stringify(b), { status: s, headers: { ...cors, "content-type": "application/json", ...extra } });

async function tool(token: string, name: string, args: Record<string, unknown>) {
  const t = (T as any).tools.find((x: any) => x.name === name);
  if (!t) throw new Error("unknown tool " + name);
  if (!t.action) return PROTOCOL;
  const body: Record<string, unknown> = { action: t.action };
  for (const [k, v] of Object.entries(args || {})) body[(t.map && t.map[k]) || k] = v;
  const r = await fetch(API, { method: "POST", headers: { authorization: "Bearer " + token, "content-type": "application/json" }, body: JSON.stringify(body) });
  const j = await r.json().catch(() => ({ error: "bad response" }));
  if (!r.ok || j.error) throw new Error(j.error || "HTTP " + r.status);
  return j;
}
async function one(token: string, m: any) {
  const { id, method, params = {} } = m || {};
  if (id === undefined || id === null) return null;
  try {
    if (method === "initialize") return { jsonrpc: "2.0", id, result: { protocolVersion: params.protocolVersion || "2025-06-18", capabilities: { tools: {} }, serverInfo: { name: "collective-vault", title: "Collective AI Vault", version: "2.1.0", websiteUrl: "https://collective-ai-inc-vault.vercel.app", icons: [{ src: "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCA1MTIgNTEyIj48ZGVmcz48bGluZWFyR3JhZGllbnQgaWQ9ImciIHgxPSIwIiB5MT0iMCIgeDI9IjEiIHkyPSIxIj48c3RvcCBvZmZzZXQ9IjAiIHN0b3AtY29sb3I9IiMxNDFDM0EiLz48c3RvcCBvZmZzZXQ9IjEiIHN0b3AtY29sb3I9IiMwNzBBMTYiLz48L2xpbmVhckdyYWRpZW50PjxsaW5lYXJHcmFkaWVudCBpZD0iYSIgeDE9IjAiIHkxPSIwIiB4Mj0iMCIgeTI9IjEiPjxzdG9wIG9mZnNldD0iMCIgc3RvcC1jb2xvcj0iI0YyQzU2QSIvPjxzdG9wIG9mZnNldD0iMSIgc3RvcC1jb2xvcj0iI0Q0QTg0MyIvPjwvbGluZWFyR3JhZGllbnQ+PC9kZWZzPjxyZWN0IHdpZHRoPSI1MTIiIGhlaWdodD0iNTEyIiByeD0iMTA0IiBmaWxsPSJ1cmwoI2cpIi8+PHJlY3QgeD0iMjQiIHk9IjI0IiB3aWR0aD0iNDY0IiBoZWlnaHQ9IjQ2NCIgcng9Ijg4IiBmaWxsPSJub25lIiBzdHJva2U9IiNENEE4NDMiIHN0cm9rZS1vcGFjaXR5PSIuMjgiIHN0cm9rZS13aWR0aD0iMyIvPjxwYXRoIGQ9Ik0xMTIgNDA0VjIyMGw4MC00OHYyMzJNMTkyIDQwNFYxMDRsMTEyIDQ4djI1Mk0zMDQgNDA0VjI2MGw5NiAzMnYxMTIiIGZpbGw9Im5vbmUiIHN0cm9rZT0idXJsKCNhKSIgc3Ryb2tlLXdpZHRoPSIzNCIgc3Ryb2tlLWxpbmVqb2luPSJyb3VuZCIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIi8+PGNpcmNsZSBjeD0iNDAwIiBjeT0iMTI4IiByPSIyMiIgZmlsbD0iIzAwRDlCNSIvPjwvc3ZnPg==", mimeType: "image/svg+xml", sizes: ["any"] }] }, instructions: (T as any).instructions } };
    if (method === "ping") return { jsonrpc: "2.0", id, result: {} };
    if (method === "tools/list") return { jsonrpc: "2.0", id, result: { tools: (T as any).tools.map(({ name, description, inputSchema }: any) => ({ name, description, inputSchema })) } };
    if (method === "tools/call") {
      try {
        const r = await tool(token, params.name, params.arguments || {});
        return { jsonrpc: "2.0", id, result: { content: [{ type: "text", text: typeof r === "string" ? r : JSON.stringify(r, null, 2) }] } };
      } catch (e) {
        return { jsonrpc: "2.0", id, result: { isError: true, content: [{ type: "text", text: String((e as Error).message || e) }] } };
      }
    }
    return { jsonrpc: "2.0", id, error: { code: -32601, message: "method not found: " + method } };
  } catch (e) {
    return { jsonrpc: "2.0", id, error: { code: -32603, message: String((e as Error).message || e) } };
  }
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: cors });
  if (req.method === "DELETE") return out(null, 204);
  if (req.method === "GET") return out({ error: "This server answers POST requests (Streamable HTTP, JSON responses)." }, 405, { allow: "POST" });
  const url = new URL(req.url);
  const token = ((req.headers.get("authorization") || "").replace(/^Bearer\s+/i, "") || url.searchParams.get("token") || "").trim();
  if (!token) return out({ jsonrpc: "2.0", id: null, error: { code: -32001, message: "Agent token required (Authorization: Bearer <token> or ?token=)" } }, 401, { "www-authenticate": "Bearer" });
  let body: any;
  try { body = await req.json(); } catch { return out({ jsonrpc: "2.0", id: null, error: { code: -32700, message: "parse error" } }, 400); }
  const sid = req.headers.get("mcp-session-id") || crypto.randomUUID();
  if (Array.isArray(body)) {
    const res = (await Promise.all(body.map((m) => one(token, m)))).filter(Boolean);
    return res.length ? out(res, 200, { "mcp-session-id": sid }) : out(null, 202);
  }
  const r = await one(token, body);
  return r ? out(r, 200, { "mcp-session-id": sid }) : out(null, 202, { "mcp-session-id": sid });
});
