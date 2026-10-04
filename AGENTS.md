# Agent protocol for the Collective AI vault

This repository and its live database are the second brain of Collective AI Inc. Every agent that works here follows this file: Claude Code, Codex, Cursor, Hermes, Muse Spark, GrokBot, ChatGPT agents, and people. The same text is in `CLAUDE.md`, `codex.md`, `HERMES.md`, `MUSE.md`, `GROK.md` and `.cursorrules` so each tool picks it up.

Owner: JR Moyler (Hataalii), Co-Founder and CEO. Read before you write, keep it accurate, keep it his.

## The team can see you

The vault is live. The team watches it at the campus app: every note is a building, and each agent is a lantern over the note it is touching. Your status, task, current note and every write show up within seconds. So:

- Say what you are doing. Call `vault_status` (MCP) or `node scripts/agent.mjs status ...` when you start, when you move to another note, and when you stop (`idle`).
- Write through the live API (MCP tools, the CLI, or HTTP). A note edited only in a local file is invisible until it syncs.
- Claude Code in this repo reports itself automatically through the hooks in `.claude/settings.json`.

## Where things live

| What | Where |
|---|---|
| Notes (source of truth) | Supabase `notes` table, edited through the agent API. Mirrored to `vault/` in git every 30 minutes and on every push. |
| Tasks | Supabase `tasks` table. `tasks/BOARD.md` is a read-only snapshot. |
| Activity and presence | Supabase `activity` and `presence` tables, streamed to the app. |
| The app | `web/` (built from `web-src/` by `scripts/build_web.py`), deployed on Vercel. |
| Agent API | `https://vczwabqqmiskrqxmiomi.supabase.co/functions/v1/agent-api` |
| Remote MCP | `https://vczwabqqmiskrqxmiomi.supabase.co/functions/v1/vault-mcp` |
| Local MCP | `node mcp/stdio.mjs` (no install) |
| CLI | `node scripts/agent.mjs` |

## Identify yourself

Each agent has its own token from JR (`claude-code`, `codex`, `cursor`, `hermes`, `muse-spark`, `grokbot`, `chatgpt`). Put it in `VAULT_AGENT_TOKEN` or a one-line `.vault-agent` file at the repo root (gitignored). The token is your name in the activity feed. Never write a token into a note, a commit, a log line, or a chat a teammate can read.

## Work loop

1. **Find a task.** `tasks_list` (status `open`). Highest priority first, then oldest. Read the whole task and every note it points at.
2. **Claim it.** `tasks_claim`. A claimed task belongs to the agent named on it. You can take over a claim only when it is more than 48 hours old.
3. **Say what you're doing.** `vault_status` with `status: working`, the task id, the note and a one-line detail.
4. **Do the work in notes.** `vault_read`, `vault_search`, then `vault_append` (preferred) or `vault_write`. Everything the task produces lives in notes, not in the task.
5. **Finish.** `tasks_update` to `review` (JR checks) or `done`, with a `result`: what changed, which notes, what still needs JR.
6. **Stop.** `vault_status` with `status: idle`.
7. **Stuck?** `tasks_update` to `blocked` with a result that says exactly what is needed.

New work you discover becomes a new task (`tasks_create`). Do not do unrequested work inside a task you did not claim.

## Writing notes

- One note per thing. Search first; if it exists, add to it.
- New notes: body starts with `# Exact Note Name`. Pass `folder` (look at neighbors: `00 - MOCs` … `11 - Physical AI`, `Daily`) and `fm` with at least `type` and `tags`. `updated` and `owner` are filled in for you.
- Names cannot contain `/ \ : [ ] | # ^`.
- Markdown the app renders: `#`/`##`/`###`, paragraphs, `-` lists, `- [ ]` tasks, `1.` lists, pipe tables (no `|` inside a cell), callouts `> [!note] Title` / `[!warning]` / `[!danger]` / `[!info]` / `[!success]`, bold, italic, inline code, fenced code, external links, wikilinks.
- Keep what is there. Add sections; do not rewrite someone's section to say the same thing differently. If a fact is superseded, keep it and mark it `> [!note] Superseded` with the date and the new fact.
- Every edit is versioned. `vault_history` shows who changed a note and when.

## Linking

- `[[Exact Note Name]]` only, to notes that exist or that you create in the same piece of work. The API returns `unresolved` links; fix them.
- Division notes: `[[Terra Axis Division]]`. Director agents: `[[Director_Terra_Axis]]`. People: `[[Ahmad Muhammad]]`, `[[JR Moyler]]`.
- Every new note links to its division note and to the hub or MOC that should list it, and you add a line to that MOC.

## Canon (current as of Oct 4, 2026; overrides any document that disagrees)

- Division numbering and names follow the July 2026 dossiers: 01 ZenFlow, 02 The Collective, 03 Hybrid Living, 04 Nexus Labs, 05 Terra Axis, 06 Vital Helix, 07 Binary Loom, 08 Gaia Synthesis, 09 Animus Prime, 10 Aether Link, 11 Obsidian Arc, 12 Kinetic Edge, 13 Civic Core, 14 Quantum Ledger, 15 Cognara Mind, 16 Juris Guard, 17 Signal Velocity, 18 VectorShift, 19 Nomad Nexus, 20 Eon Core. Pending 21–30: Astral Forge, Materia Nova, Aqua Meridian, Nourish Grid, Sovereign Key, Praesidium Mutual, Mercantile Circuit, Human Foundry, Volta Grid, Hearth Nexus.
- Spell it "VectorShift" (one word).
- Operating divisions (9): ZenFlow, The Collective, Hybrid Living, Nexus Labs, Signal Velocity, Quantum Ledger, Binary Loom, Obsidian Arc, Juris Guard. The other 11 of the 20 are chartered, not operating. Pending 21–30 are never described as active.
- Stanley Constant's Civic Core veto was removed on Oct 1, 2026. Where a source states it, keep the fact and mark it superseded. Link `[[Civic Core Fiduciary Veto]]`.
- CFO is "Ahmad Muhammad". Co-Founders: `[[JR Moyler]]` and `[[Devon Scott]]` only.
- Helios Grid stays blocked pending an SEC legal opinion.
- Tier 1 is ZENITH alone; HATAALII is Tier 0.5. Current model routing is in `[[Agent Tier Registry]]`.
- Collective AI has 0 paying customers and $0 MRR as of Sept 2026. Revenue figures in documents are targets.
- Director codenames are the Oct 4, 2026 industry set in `[[Director Codenames]]`. Older sets appear only as previous names.
- Mega Campus canon is the Sept 16, 2026 register: 220 acres, 35 facilities, 2,045,000 sq ft, six districts. Cost and power figures for it are the Oct 2026 estimates in `[[Mega Campus Cost Model (Oct 2026)]]` and `[[Mega Campus Power and Data Center Model (Oct 2026)]]`, labeled as estimates. The $6.54B figure belongs to v3.0.

## Voice

JR's writing standard applies to every sentence you add (`[[JR Voice Standard]]`):

- Banned words: delve, leverage, robust, seamless, transformative, empower, elevate, game-changing, cutting-edge, innovative, tapestry.
- No warm-up openers, no summary closers.
- Direct and architectural. Short sentences. Tables for structured facts. Say what is unknown.

## Git (for agents working in a checkout)

- Edits to `vault/*.md` that you push to `main` sync to the live vault automatically (`.github/workflows/vault-sync.yml`). The live API is still the better path: the team sees it immediately.
- Commit subject `[vault] <task-id>: <what>`, trailer `Agent: <agent id>`. Pull before you start; rebase before you push. Never force-push.
- `[vault] sync:` commits come from the sync job. Do not hand-edit `vault/_index.json`, `vault/.last_pull`, `tasks/BOARD.md` or `web/index.html`.

## Never

- Invent figures, dates, names, prices, counts or quotes. `unknown` is a valid value; say what document would settle it.
- Describe pending divisions as active, or chartered divisions as operating.
- Delete a note. Move it to `10 - Archive` with `status: archived` and a line saying why and what replaced it.
- Rename a note without updating every link to it and the MOC that lists it.
- Change this protocol, the canon or the voice standard without a task requested by JR Moyler.
- Put secrets, tokens or client personal data in notes.
- Write to systems outside this vault unless the task says so and you have been given access.
