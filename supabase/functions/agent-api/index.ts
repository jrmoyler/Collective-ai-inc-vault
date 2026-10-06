// Agent API for the Collective AI vault.
// Every agent (Claude Code, Codex, Hermes, Muse Spark, GrokBot, ChatGPT, Cursor) calls this with its own token.
// Writes land in Postgres and stream to every open viewer through Supabase Realtime.
import { createClient } from "jsr:@supabase/supabase-js@2";

const cors = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, content-type, x-agent-token, x-client-info, apikey",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};
const json = (b: unknown, s = 200) => new Response(JSON.stringify(b), { status: s, headers: { ...cors, "content-type": "application/json" } });
const db = createClient(Deno.env.get("SUPABASE_URL")!, Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!, { auth: { persistSession: false } });
const sha = async (s: string) => [...new Uint8Array(await crypto.subtle.digest("SHA-256", new TextEncoder().encode(s)))].map((b) => b.toString(16).padStart(2, "0")).join("");
const NAME_RE = /^[^\/\\:\[\]|#^]{1,180}$/;
const STATUSES = ["working", "thinking", "reading", "writing", "reviewing", "blocked", "idle", "offline"];
const PRI: Record<string, number> = { high: 0, medium: 1, low: 2 };

async function allNotes(cols: string, since?: string) {
  const out: any[] = [];
  for (let from = 0; ; from += 1000) {
    let q = db.from("notes").select(cols).order("name").range(from, from + 999);
    if (since) q = q.gt("updated_at", since);
    const { data, error } = await q;
    if (error) throw error;
    out.push(...(data || []));
    if (!data || data.length < 1000) return out;
  }
}
function links(body: string) {
  return [...new Set([...(body || "").matchAll(/\[\[([^\]|#]+)/g)].map((m) => m[1]))];
}
async function unresolved(body: string, self: string) {
  const ls = links(body).filter((l) => l !== self);
  if (!ls.length) return [];
  const { data } = await db.from("notes").select("name").in("name", ls);
  const have = new Set((data || []).map((d: any) => d.name));
  return ls.filter((l) => !have.has(l));
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: cors });
  if (req.method !== "POST") return json({ error: "POST only" }, 405);
  const tok = (req.headers.get("x-agent-token") || (req.headers.get("authorization") || "").replace(/^Bearer\s+/i, "")).trim();
  if (!tok) return json({ error: "missing agent token" }, 401);
  const { data: agent } = await db.from("agents").select("id,name,active").eq("token_hash", await sha(tok)).maybeSingle();
  if (!agent || !agent.active) return json({ error: "unknown agent token" }, 401);
  let body: any;
  try { body = await req.json(); } catch { return json({ error: "JSON body required" }, 400); }
  const A = agent.id as string, now = new Date().toISOString(), act = String(body.action || "");
  const log = (kind: string, text: string | null, note: string | null = null, task: string | null = null) =>
    db.from("activity").insert({ actor: A, actor_kind: "agent", kind, text, note, task });
  const beat = (p: Record<string, unknown> = {}) => db.from("presence").upsert({ agent: A, last_seen: now, ...p });

  try {
    switch (act) {
      case "whoami":
        await beat();
        return json({ ok: true, agent });

      case "heartbeat": {
        const status = STATUSES.includes(body.status) ? body.status : "working";
        const p: Record<string, unknown> = { status };
        for (const k of ["task", "note", "detail", "tool"]) if (k in body) p[k] = body[k] == null ? null : String(body[k]).slice(0, 300);
        if (status === "offline" || status === "idle") { p.task = body.task ?? null; }
        await beat(p);
        return json({ ok: true });
      }

      case "log": {
        if (!body.kind) return json({ error: "kind required" }, 400);
        await log(String(body.kind).slice(0, 40), body.text ? String(body.text).slice(0, 500) : null, body.note || null, body.task || null);
        await beat(body.note ? { note: body.note } : {});
        return json({ ok: true });
      }

      case "tasks.list": {
        let q = db.from("tasks").select("*");
        if (body.status) q = q.eq("status", body.status);
        const { data, error } = await q;
        if (error) throw error;
        data!.sort((a: any, b: any) => (PRI[a.priority] ?? 1) - (PRI[b.priority] ?? 1) || String(a.created_at).localeCompare(String(b.created_at)));
        return json({ ok: true, tasks: data });
      }
      case "tasks.get": {
        const { data } = await db.from("tasks").select("*").eq("id", body.id).maybeSingle();
        return data ? json({ ok: true, task: data }) : json({ error: "no such task" }, 404);
      }
      case "tasks.create": {
        if (!body.title) return json({ error: "title required" }, 400);
        const { data: ids } = await db.from("tasks").select("id").like("id", "CV-%");
        const n = Math.max(0, ...(ids || []).map((r: any) => parseInt(String(r.id).slice(3)) || 0)) + 1;
        const id = "CV-" + String(n).padStart(3, "0");
        const row = { id, title: String(body.title).slice(0, 200), detail: body.detail || null, note: body.note || null, division: body.division || null, priority: PRI[body.priority] !== undefined ? body.priority : "medium", requested_by: A };
        const { error } = await db.from("tasks").insert(row);
        if (error) throw error;
        await log("opened", row.title, row.note, id);
        return json({ ok: true, id });
      }
      case "tasks.claim": {
        const { data: t } = await db.from("tasks").select("*").eq("id", body.id).maybeSingle();
        if (!t) return json({ error: "no such task" }, 404);
        const stale = t.claimed_at && Date.now() - Date.parse(t.claimed_at) > 48 * 3600e3;
        if (!(t.status === "open" || (t.status === "claimed" && (t.agent === A || stale)))) return json({ error: `task is ${t.status}${t.agent ? " by " + t.agent : ""}` }, 409);
        await db.from("tasks").update({ status: "claimed", agent: A, claimed_at: now }).eq("id", t.id);
        await log("claimed", t.title, t.note, t.id);
        await beat({ status: "working", task: t.id, note: t.note, detail: t.title });
        return json({ ok: true, task: { ...t, status: "claimed", agent: A } });
      }
      case "tasks.update": {
        const { data: t } = await db.from("tasks").select("*").eq("id", body.id).maybeSingle();
        if (!t) return json({ error: "no such task" }, 404);
        if (t.agent && t.agent !== A) return json({ error: `task belongs to ${t.agent}` }, 403);
        const st = String(body.status || "");
        if (!["open", "claimed", "review", "blocked", "done"].includes(st)) return json({ error: "status must be open, claimed, review, blocked or done" }, 400);
        const p: Record<string, unknown> = { status: st };
        if (body.result) p.result = String(body.result).slice(0, 4000);
        if (st === "done") p.done_at = now;
        if (st === "open") { p.agent = null; p.claimed_at = null; }
        await db.from("tasks").update(p).eq("id", t.id);
        const verb: Record<string, string> = { review: "sent to review", blocked: "blocked", done: "finished", open: "released", claimed: "resumed" };
        await log(verb[st], body.result ? String(body.result).slice(0, 300) : t.title, t.note, t.id);
        await beat(st === "done" || st === "open" ? { status: "idle", task: null, detail: null } : { status: st === "blocked" ? "blocked" : "working", task: t.id });
        return json({ ok: true });
      }

      case "notes.get": {
        const { data } = await db.from("notes").select("*").eq("name", body.name).maybeSingle();
        if (!data) return json({ error: "no such note" }, 404);
        const { data: back } = await db.from("notes").select("name").ilike("body", `%[[${String(body.name).replace(/[%_]/g, "")}%`).limit(200);
        await beat({ note: data.name, status: "reading" });
        return json({ ok: true, note: data, backlinks: (back || []).map((b: any) => b.name).filter((n: string) => n !== data.name) });
      }
      case "notes.search": {
        const q = String(body.q || "").replace(/[,()%*]/g, " ").trim();
        if (!q) return json({ error: "q required" }, 400);
        const { data, error } = await db.from("notes").select("name,folder,body").or(`name.ilike.%${q}%,body.ilike.%${q}%`).limit(Math.min(50, body.limit || 20));
        if (error) throw error;
        const ql = q.toLowerCase();
        const hits = (data || []).map((n: any) => { const i = n.body.toLowerCase().indexOf(ql); return { name: n.name, folder: n.folder, snippet: i < 0 ? "" : n.body.slice(Math.max(0, i - 60), i + 120).replace(/\n/g, " ") }; })
          .sort((a: any, b: any) => (b.name.toLowerCase().includes(ql) ? 1 : 0) - (a.name.toLowerCase().includes(ql) ? 1 : 0));
        return json({ ok: true, hits });
      }
      case "notes.list": {
        const rows = await allNotes("name,folder,updated_at,updated_by");
        return json({ ok: true, notes: body.folder ? rows.filter((r: any) => String(r.folder).startsWith(body.folder)) : rows });
      }
      case "notes.upsert": {
        const name = String(body.name || "").trim();
        if (!NAME_RE.test(name)) return json({ error: "invalid note name (no / \\ : [ ] | # ^)" }, 400);
        if (!body.body) return json({ error: "body required" }, 400);
        const { data: ex } = await db.from("notes").select("name,folder,fm").eq("name", name).maybeSingle();
        const fm = { ...(ex?.fm || {}), ...(body.fm || {}), updated: now.slice(0, 10) };
        if (!fm.owner) fm.owner = "JR Moyler (Hataalii)";
        const row = { name, folder: body.folder ?? ex?.folder ?? "09 - Projects", fm, body: String(body.body), updated_by: A };
        const { error } = ex ? await db.from("notes").update(row).eq("name", name) : await db.from("notes").insert(row);
        if (error) throw error;
        await log(ex ? "edited" : "created", body.summary ? String(body.summary).slice(0, 300) : null, name, body.task || null);
        await beat({ status: "writing", note: name });
        return json({ ok: true, created: !ex, unresolved: await unresolved(row.body, name) });
      }
      case "notes.append": {
        const { data: ex } = await db.from("notes").select("*").eq("name", body.name).maybeSingle();
        if (!ex) return json({ error: "no such note" }, 404);
        if (!body.section) return json({ error: "section required" }, 400);
        const nb = ex.body.replace(/\s+$/, "") + "\n\n" + String(body.section).trim() + "\n";
        const { error } = await db.from("notes").update({ body: nb, fm: { ...ex.fm, updated: now.slice(0, 10) }, updated_by: A }).eq("name", ex.name);
        if (error) throw error;
        await log("added to", body.summary ? String(body.summary).slice(0, 300) : null, ex.name, body.task || null);
        await beat({ status: "writing", note: ex.name });
        return json({ ok: true, unresolved: await unresolved(body.section, ex.name) });
      }
      case "notes.history": {
        const { data } = await db.from("note_revisions").select("id,version,edited_by,edited_at").eq("name", body.name).order("edited_at", { ascending: false }).limit(50);
        return json({ ok: true, revisions: data });
      }

      case "notes.bulk": {
        if (A !== "repo-sync") return json({ error: "repo-sync only" }, 403);
        const list = (body.notes || []).filter((n: any) => NAME_RE.test(n.name) && typeof n.body === "string").map((n: any) => ({ name: n.name, folder: n.folder || "", fm: n.fm || {}, body: n.body, updated_by: body.as || A }));
        for (let i = 0; i < list.length; i += 200) {
          const { error } = await db.from("notes").upsert(list.slice(i, i + 200), { onConflict: "name" });
          if (error) throw error;
        }
        if (!body.quiet) await log("synced", `${list.length} notes from the repo`);
        return json({ ok: true, count: list.length });
      }
      case "notes.export": {
        if (A !== "repo-sync") return json({ error: "repo-sync only" }, 403);
        return json({ ok: true, notes: await allNotes("name,folder,fm,body,updated_at,updated_by", body.since) });
      }
      case "tasks.bulk": {
        if (A !== "repo-sync") return json({ error: "repo-sync only" }, 403);
        const { error } = await db.from("tasks").upsert(body.tasks || [], { onConflict: "id", ignoreDuplicates: true });
        if (error) throw error;
        return json({ ok: true });
      }
      case "say": {
        const text = String(body.text || "").trim().slice(0, 500);
        if (!text) return json({ error: "text required" }, 400);
        const target = body.to ? String(body.to).slice(0, 80) : null;
        const { error } = await db.from("activity").insert({ actor: A, actor_kind: "agent", kind: "say", text, note: body.note || null, task: body.task || null, target });
        if (error) throw error;
        await beat(body.note ? { note: body.note } : {});
        return json({ ok: true, delivered_to: target || "floor" });
      }
      case "inbox": {
        let q = db.from("activity").select("id,ts,actor,actor_kind,text,note,task,target").eq("kind", "say").or(`target.eq.${A},target.is.null,target.eq.${agent.name}`).neq("actor", A).order("ts", { ascending: false }).limit(Math.min(100, body.limit || 30));
        if (body.since) q = q.gt("ts", String(body.since));
        const { data, error } = await q;
        if (error) throw error;
        return json({ ok: true, messages: (data || []).reverse(), you: A });
      }
      case "memory.set": {
        const key = String(body.key || "").trim();
        if (!key || key.length > 80) return json({ error: "key required (max 80 chars)" }, 400);
        if (JSON.stringify(body.value ?? null).length > 4096) return json({ error: "value too large (4 KB max)" }, 400);
        const { error } = await db.from("sentinel_memory").upsert({ actor: A, key, value: body.value ?? null, updated_at: now });
        if (error) throw error;
        return json({ ok: true, key });
      }
      case "memory.get": {
        let q = db.from("sentinel_memory").select("key,value,updated_at").eq("actor", A).order("updated_at", { ascending: false });
        if (body.key) q = q.eq("key", String(body.key));
        const { data, error } = await q;
        if (error) throw error;
        return body.key ? json({ ok: true, key: body.key, value: data?.[0]?.value ?? null, updated_at: data?.[0]?.updated_at ?? null }) : json({ ok: true, memory: data });
      }
      case "memory.delete": {
        const { error } = await db.from("sentinel_memory").delete().eq("actor", A).eq("key", String(body.key || ""));
        if (error) throw error;
        return json({ ok: true });
      }
      case "rank": {
        const [{ data: mine }, { data: league }] = await Promise.all([
          db.from("agent_stats").select("*").eq("actor", A).maybeSingle(),
          db.from("agent_stats").select("actor,actor_kind,xp,week_xp,streak").order("week_xp", { ascending: false }).limit(10),
        ]);
        const xp = mine?.xp || 0, level = Math.floor(Math.sqrt(xp / 60));
        const titles = ["Initiate", "Surveyor", "Mason", "Drafter", "Builder", "Architect", "Keeper", "Warden", "Chancellor", "Luminary", "Sentinel Prime"];
        return json({ ok: true, you: { actor: A, xp, level, title: titles[Math.min(level, 10)], next_level_at: 60 * (level + 1) ** 2, week_xp: mine?.week_xp || 0, streak: mine?.streak || 0, best_streak: mine?.best_streak || 0, notes_touched: Object.keys(mine?.touched || {}).length, peers: Object.keys(mine?.peers || {}), counters: mine?.counters || {} }, league: league || [] });
      }
      case "activity.recent": {
        const { data } = await db.from("activity").select("*").order("ts", { ascending: false }).limit(Math.min(200, body.limit || 30));
        return json({ ok: true, activity: data });
      }
      default:
        return json({ error: "unknown action", actions: ["whoami", "heartbeat", "log", "tasks.list", "tasks.get", "tasks.create", "tasks.claim", "tasks.update", "notes.get", "notes.search", "notes.list", "notes.upsert", "notes.append", "notes.history", "activity.recent", "say", "inbox", "memory.set", "memory.get", "memory.delete", "rank"] }, 400);
    }
  } catch (e) {
    return json({ error: String((e as any)?.message || e) }, 500);
  }
});
