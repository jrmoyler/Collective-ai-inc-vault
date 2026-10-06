---
title: Kre8trix
tags:
- project
- blocked
type: project
owner: JR Moyler (Hataalii)
status: blocked
updated: 2026-10-04
---
# Kre8trix

Creator fintech SPA. React + Vite, 67 commits, 33 routes, 12,441 lines TS/TSX. Phases A–D complete. Contract KRE8-EQ-001 Rev3 with Kre8trix Inc. Lead Advisor [[Stanley Constant]].

- [x] Build finished
- [ ] Deploy Phase E Node backend
- [ ] Add vercel.json rewrite (deep links 404)
- [ ] Real BaaS, KYC, OAuth
- [ ] Replace CCS mock data
- [ ] Bank partner → [[Kre8trix Reg CF Gate]]

## Linked
- [[009 — Projects MOC]]

## Deployment

- Vercel project: `kre8trix`
- URL: [kre8trix.vercel.app](https://kre8trix.vercel.app)
- Repo: [jrmoyler/kre8trix](https://github.com/jrmoyler/kre8trix)
- Framework preset: vite
- Vercel project created: 2026-07-07
- Last production deploy: 2026-07-30 (READY)

Listed in [[Vercel Projects]].

## Phase E backend deploy runbook

Written Oct 4, 2026 by grokbot (task CV-002). Facts come from a read-only look at the repo `jrmoyler/kre8trix` (commit `29ecf902`) and the project file dated Oct 2, 2026. Nothing was deployed or changed. Anything not found in those sources is marked unknown.

**What the backend is.** A dependency-free `node:http` server in `server/` (`server/index.ts`, `jwt.ts`, `store.ts`, `users.ts`). It runs the same route handlers as the in-browser mock (`src/backend/handlers.ts`, `src/backend/public.ts`) and adds real HS256 JWTs, scrypt password hashes and per-account state saved to disk. It is a long-running Node process, not a Vercel serverless function. Do not try to run it inside the Vite static deploy.

**Prerequisites**
- A host that runs a long-lived Node process and keeps a persistent disk or volume (state is JSON files). Choice of host: unknown (see Open questions).
- Node version: unknown. `package.json` has no `engines` field. Vite 7 and `@types/node` 24 point to a current LTS, so confirm before the first deploy.
- Install must include dev dependencies. The start command uses `tsx`, which sits in `devDependencies`, and `server/index.ts` imports files from `src/backend/` and `src/lib/`. Deploy from the repo root, not from `server/` alone.
- A JWT secret generated for production and stored only in the host's secret store.
- Exactly one running instance. The rate limiter for the public routes is per process and the file store is single writer. More than one node needs Redis for the limiter first (see the repo README).

**Environment variables.** Values are never stored in this note.

| NAME | Purpose | Where to set |
|---|---|---|
| `KRE8TRIX_JWT_SECRET` | HMAC secret that signs and verifies login tokens. If unset, the server makes a random one at every boot and all tokens die on restart. Required in production. | Backend host, secret store |
| `KRE8TRIX_DATA_DIR` | Folder for per-account state and users. Default is `server/.data`. Point it at the persistent volume. | Backend host |
| `KRE8TRIX_DEMO` | Default is on: an unknown email is auto-created on first sign in. Set to `0` to turn that off. Decide before the URL is public. | Backend host |
| `KRE8TRIX_EPHEMERAL` | Set to `1` to keep everything in memory (tests and demos only). Leave unset in production. | Backend host |
| `KRE8TRIX_TRUST_PROXY` | Set to `1` only if a proxy you control sets `X-Forwarded-For`. Otherwise callers can fake their address and skip the rate limit. | Backend host |
| `PORT` | Listen port. Default 4000. Many hosts inject this themselves. | Backend host (often automatic) |
| `VITE_API_URL` | Front end build setting. Unset means the app uses the in-browser mock backend. `/api` means same origin calls that the `vercel.json` rewrite sends to the backend. An absolute backend URL also works but needs CORS. | Vercel project `kre8trix`, Settings, Environment Variables (build time; redeploy after changing) |

**Build command.**
- Backend: no build step found. The server runs from TypeScript source through `tsx`. A `tsconfig.server.json` exists, but no script uses it. Whether to compile first is unknown.
- Front end (Vercel project `kre8trix`, preset vite): `npm run build` (runs `tsc -b && vite build`), output folder `dist`.

**Start command (backend).** `npm run api` (runs `tsx server/index.ts`). Install first with `npm ci`, keeping dev dependencies.

**Health check.** `GET /health` returns HTTP 200 with JSON `{"ok":true,"ephemeral":<bool>,"demo":<bool>}`. The server also accepts the `/api` prefix, so `/api/health` works too. Use `/health` as the host's health check path.

```bash
# directly on the backend host (replace BACKEND_HOST)
curl -fsS https://BACKEND_HOST/health

# through the Vercel rewrite, after Block B below is live
curl -fsS https://kre8trix.vercel.app/api/health
```

Expected: `{"ok":true,"ephemeral":false,"demo":true}` with demo defaulting to true unless `KRE8TRIX_DEMO=0`. For a fuller check, the repo has `npm run test:e2e:api` (Playwright smoke suite for the real API). How it finds the API URL is unknown.

**Vercel configuration**
- Project: `kre8trix`, repo `jrmoyler/kre8trix`, preset vite. Last production deploy was 2026-07-30 (READY).
- There is no `vercel.json` in the repo root today. That is why deep links return 404.
- Steps, in order:
  1. Ship Block A in the next note section. It fixes deep links on its own and keeps the in-browser mock.
  2. Deploy the backend on the chosen host, confirm `/health`.
  3. Set `VITE_API_URL=/api` in the Vercel project, swap `vercel.json` to Block B with the real backend host, redeploy.
  4. Run the `curl` check through `kre8trix.vercel.app/api/health`, then sign in and open a deep link.
- Local check before any of it: `npm run api`, then `VITE_API_URL=/api npm run dev`. The Vite dev proxy already strips `/api` and forwards to port 4000.

Status: not deployed. The app still runs on mock data. Real BaaS, KYC and OAuth are not integrated, so a deployed backend alone does not open the [[Kre8trix Reg CF Gate]].

## vercel.json rewrite for deep links

Stack found: React 19 + Vite 7 single page app with `react-router` 7 (33 routes). Deep links such as `/login` or any inner route return 404 on a hard refresh because Vercel looks for a file at that path and the repo has no `vercel.json`. Vercel serves real files first and applies rewrites only when no file matches, so the fallback below does not break assets in `dist/`.

Order matters. The API rewrite goes first, the SPA fallback goes last. If the fallback comes first it swallows `/api/*` and returns `index.html` for API calls.

**Block A: ship now (SPA fallback only; no backend host needed).** Save as `vercel.json` in the repo root.

```json
{
  "rewrites": [
    { "source": "/(.*)", "destination": "/index.html" }
  ]
}
```

**Block B: use after the Node backend is live.** Replace `BACKEND_HOST` with the real host name. Set `VITE_API_URL=/api` in the Vercel project and redeploy. The browser then calls the same origin, so no CORS setup is needed. The backend routes live at the root (`/auth/login`, `/health`, `/public/...`), so the rewrite strips `/api`, the same way the Vite dev proxy does. The backend also accepts the `/api` prefix, so `https://BACKEND_HOST/api/:path*` would work as well.

```json
{
  "rewrites": [
    { "source": "/api/:path*", "destination": "https://BACKEND_HOST/:path*" },
    { "source": "/(.*)", "destination": "/index.html" }
  ]
}
```

How to point `/api` at the backend:
- Separate service (recommended; the server needs a persistent disk and one long-lived process): use Block B with the service's public URL.
- Not recommended: running the server as a Vercel Function. It writes JSON state to disk, keeps a per-process rate limiter and has no serverless entry point in the repo.
- If `VITE_API_URL` stays unset, keep Block A. The app keeps using the in-browser mock.

PR status: not opened. See Open questions.

## Open questions

- Hosting for the Node backend: unknown. It needs a long-lived Node process, one instance and a persistent volume. No provider is chosen. JR decides.
- Backend public URL (the `BACKEND_HOST` in Block B): unknown until the host is chosen.
- Node version for the host: unknown (no `engines` field).
- Backend build step: unknown. The server runs from source with `tsx`. A compiled build would need a script that uses `tsconfig.server.json`.
- Persistent storage: where `KRE8TRIX_DATA_DIR` points, and who backs it up: unknown.
- Production flags: whether to set `KRE8TRIX_DEMO=0` and whether `KRE8TRIX_TRUST_PROXY=1` is safe behind the chosen host: unknown. The server also echoes any request `Origin` in its CORS headers, so review that before exposing it publicly.
- BaaS and KYC providers: none integrated. The Adelphi Bank BaaS relationship did not close by the July 30, 2026 milestone. No replacement provider is named in the vault. CCS still runs on hardcoded mock data and OAuth is not real.
- Bank backer gate: the Reg CF raise cannot open until at least one bank backs the project. No bank is secured. Research drafts of Columbus bank and credit union prospects exist (Oct 2 and Oct 3, 2026); no outreach has been made to any bank. See [[Kre8trix Reg CF Gate]].
- Pull request: not opened. `gh` on the box is not logged in, so there is no repo access through the sanctioned route for this task. The change itself is one new file, `vercel.json`, with Block A. JR can approve opening the PR, or paste Block A into the repo.
- Whether the Phase E deploy should wait for the real BaaS and KYC work, or ship the mock-backed server first: unknown.
