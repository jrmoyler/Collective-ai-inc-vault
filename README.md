# Collective AI Vault

JR Moyler's second brain for Collective AI Inc., live. 1,199 linked notes rendered as a 3D campus, a task board, and a floor where the team watches agents work in real time.

**App:** import this repo on Vercel once (vercel.com/new → Import `jrmoyler/collective-ai-inc-vault`; `vercel.json` sets everything, no build step). Every push to `main` redeploys.

## What you see

- **The campus.** Every folder is a district and every note is a building. Taller buildings are longer and more linked. Click one to read it; the camera flies there and draws cables to the notes it links to. `F` walks the streets, the moon button changes the time of day, `Ctrl K` finds any note.
- **The floor.** Each agent (Claude Code, Codex, Cursor, Hermes, Muse Spark, GrokBot, ChatGPT) is a colored lantern on a mast over the note it is reading or writing. The lantern moves when the agent moves. A building flares when someone writes to it, and the note on screen updates in place. The panel in the top right says who is working on what, and who on the team is watching.
- **Live tab** (robot icon): Floor, Board (tasks), Activity, Desk (write a note yourself), Connect (agent setup).
- **History tab** on every note: who changed it and when. Every edit is versioned in the database.

## Team sign-in

Open the app, enter your name and the team passcode from JR. That's it: no email, no password to remember. The owner passcode signs you in as owner. Sessions stay signed in on that browser.

## Connect an agent

Each agent has its own token (JR has them). Put it in the agent's environment as `VAULT_AGENT_TOKEN`, or in a one-line `.vault-agent` file at the repo root (gitignored). Agents follow [AGENTS.md](AGENTS.md); the same text is in `CLAUDE.md`, `codex.md`, `HERMES.md`, `MUSE.md`, `GROK.md` and `.cursorrules`.

| Agent | How |
|---|---|
| **Claude Code** | Open this repo. `.mcp.json` registers the vault tools, and the hooks in `.claude/settings.json` report every file read and edit to the floor automatically. |
| **Codex** | `~/.codex/config.toml` → `[mcp_servers.collective-vault]` `command = "node"`, `args = ["/ABS/PATH/collective-ai-inc-vault/mcp/stdio.mjs"]`, `env = { VAULT_AGENT_TOKEN = "…" }` |
| **Cursor** | `.cursor/mcp.json` is in the repo. Set `VAULT_AGENT_TOKEN` in your shell or `.vault-agent`. |
| **Hermes** | stdio: `node mcp/stdio.mjs` with the token in env. HTTP: the remote MCP below. |
| **ChatGPT / OpenAI agents** | Remote MCP `https://vczwabqqmiskrqxmiomi.supabase.co/functions/v1/vault-mcp` with header `Authorization: Bearer <token>`. Connectors that can't set headers: append `?token=<token>`. |
| **GrokBot, Muse Spark** | Same remote MCP, or the HTTP API if they don't speak MCP. |
| **Anything else** | `POST https://vczwabqqmiskrqxmiomi.supabase.co/functions/v1/agent-api` with `Authorization: Bearer <token>` and a JSON body `{"action": "...", ...}`. |
| **Shell** | `node scripts/agent.mjs` (no install, Node 18+). Run it with no arguments for the command list. |

MCP tools: `vault_protocol`, `vault_status`, `vault_search`, `vault_read`, `vault_write`, `vault_append`, `vault_history`, `tasks_list`, `tasks_claim`, `tasks_update`, `tasks_create`, `vault_log`, `vault_activity`.

API actions: `whoami`, `heartbeat`, `log`, `tasks.list`, `tasks.get`, `tasks.claim`, `tasks.update`, `tasks.create`, `notes.get`, `notes.search`, `notes.list`, `notes.upsert`, `notes.append`, `notes.history`, `activity.recent`.

```bash
node scripts/agent.mjs tasks open
node scripts/agent.mjs claim CV-001
node scripts/agent.mjs status writing --task CV-001 --note SOLOFORGE --detail "drafting the offer"
node scripts/agent.mjs append SOLOFORGE --file offer.md --task CV-001 --summary "offer section"
node scripts/agent.mjs update CV-001 review --result "Offer drafted. Price TBD (JR)."
node scripts/agent.mjs status idle
```

## How it fits together

```
 agents ──MCP / HTTP / CLI──▶ Supabase edge functions ──▶ Postgres (notes, tasks, activity, presence)
                              agent-api, vault-mcp            │ row-level security: team only
                                                              ▼
 team browsers ◀── Realtime (websocket; 8 s polling fallback) ── web/ app on Vercel
                                                              │
 git (this repo) ◀── vault-sync workflow, every 30 min ───────┘   and repo → live on every push to vault/**
```

| Path | What it is |
|---|---|
| `web/` | The app (static). Built from `web-src/` by `python3 scripts/build_web.py`. Commit the built file; CI checks it is current. |
| `vault/` | Markdown mirror of every note, Obsidian-compatible, plus `_index.json`. |
| `tasks/BOARD.md` | Snapshot of the live board. |
| `supabase/` | Schema migration and the three edge functions (`agent-api`, `vault-mcp`, `team-join`). |
| `mcp/` | Local stdio MCP server and the shared tool list. |
| `scripts/` | `agent.mjs` (CLI + Claude Code hook), `sync.py` (git ↔ live), `build.py` (links and index), `build_web.py`. |

Supabase project: `collective-ai-vault` (`vczwabqqmiskrqxmiomi`, us-east-2, org Hybrid Living).

## Security

- Every table has row-level security. Only signed-in team members can read or write; anonymous visitors get nothing even with the public key in `web/config.js`.
- Agents never touch the database directly. Their token is checked by the edge function against a SHA-256 hash; tokens are never stored.
- Passcodes are stored only as SHA-256 hashes, readable only by the service role.
- `settings`, `agents.token_hash` and the service role key are never exposed to the browser.

## Operations

**One secret to add** (GitHub → Settings → Secrets and variables → Actions): `VAULT_SYNC_TOKEN` = the repo-sync token. Without it the sync workflow skips.

**Rotate an agent token** (SQL editor):
```sql
update agents set token_hash = encode(digest('NEW_TOKEN', 'sha256'), 'hex') where id = 'codex';
```
**Turn an agent off:** `update agents set active = false where id = 'grokbot';`

**Change the team passcode:**
```sql
update settings set value = encode(digest(lower('new passcode'), 'sha256'), 'hex') where key = 'team_passcode_sha';
```
**Remove a teammate:** delete their row in `team_members` (Supabase → Table editor). Their browser loses access at once.

**Add an agent:** insert into `agents` (id, name, kind, color, token_hash) and `presence` (agent).

**Work on the app:** edit `web-src/`, run `python3 scripts/build_web.py`, serve `web/` locally (`python3 -m http.server -d web`), commit both.
