// Team sign-in without email: the team passcode creates (or re-opens) a viewer account.
// The passcode is checked against a SHA-256 hash in public.settings, which only the service role can read.
import { createClient } from "jsr:@supabase/supabase-js@2";

const cors = { "Access-Control-Allow-Origin": "*", "Access-Control-Allow-Headers": "authorization, content-type, x-client-info, apikey", "Access-Control-Allow-Methods": "POST, OPTIONS" };
const json = (b: unknown, s = 200) => new Response(JSON.stringify(b), { status: s, headers: { ...cors, "content-type": "application/json" } });
const db = createClient(Deno.env.get("SUPABASE_URL")!, Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!, { auth: { persistSession: false } });
const sha = async (s: string) => [...new Uint8Array(await crypto.subtle.digest("SHA-256", new TextEncoder().encode(s)))].map((b) => b.toString(16).padStart(2, "0")).join("");
const rand = (n: number) => [...crypto.getRandomValues(new Uint8Array(n))].map((b) => b.toString(16).padStart(2, "0")).join("");

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: cors });
  if (req.method !== "POST") return json({ error: "POST only" }, 405);
  let b: any;
  try { b = await req.json(); } catch { return json({ error: "JSON body required" }, 400); }
  const name = String(b.name || "").trim().slice(0, 60);
  const pass = String(b.passcode || "").trim().toLowerCase();
  if (!name || !pass) return json({ error: "name and passcode required" }, 400);
  const { data: rows } = await db.from("settings").select("key,value").in("key", ["team_passcode_sha", "owner_passcode_sha"]);
  const h = await sha(pass);
  const role = rows?.find((r) => r.key === "owner_passcode_sha")?.value === h ? "owner" : rows?.find((r) => r.key === "team_passcode_sha")?.value === h ? "member" : null;
  if (!role) { await new Promise((r) => setTimeout(r, 700)); return json({ error: "That passcode isn't right." }, 401); }
  const slug = name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "") || "member";
  const email = `${slug}.${rand(4)}@team.collective-vault.app`, password = rand(24);
  const { data: u, error } = await db.auth.admin.createUser({ email, password, email_confirm: true, user_metadata: { display_name: name } });
  if (error || !u.user) return json({ error: error?.message || "could not create account" }, 500);
  await db.from("team_members").insert({ user_id: u.user.id, display_name: name, role });
  await db.from("activity").insert({ actor: name, actor_kind: "human", kind: "joined", text: role === "owner" ? "as owner" : null });
  return json({ ok: true, email, password, role });
});
