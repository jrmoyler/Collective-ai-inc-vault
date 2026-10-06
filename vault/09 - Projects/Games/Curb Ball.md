---
title: Curb Ball
url: https://curbball-jrmoyler93-7522s-projects.vercel.app
kind: game
repo: github.com/jrmoyler/curbball
tags:
- project
- game
- vercel
- mobile-game
- facebook-instant-games
- react
type: project
owner: JR Moyler (Hataalii)
source: Vercel (team jrmoyler93-7522s-projects) + GitHub repos
status: building
created: 2026-04-19
updated: 2026-10-05
division: Unassigned
framework: vite
last_deploy: 2026-04-27
vercel_project: curbball
---
# Curb Ball

Curb Ball, "Urban Street Game": a mobile browser game built for Facebook Instant Games embedding. It is the Curb Ball Challenge associated with [[Dante Cook]].

## At a glance

| Field | Value |
|---|---|
| Kind | game |
| Status | building |
| Division | Unassigned |
| Live URL | [curbball-jrmoyler93-7522s-projects.vercel.app](https://curbball-jrmoyler93-7522s-projects.vercel.app) |
| Repo | [jrmoyler/curbball](https://github.com/jrmoyler/curbball) |
| Vercel project | `curbball` |
| Framework preset | vite |
| Vercel project created | 2026-04-19 |
| Last production deploy | 2026-04-27 (ERROR) |
| Commits read | 148 (first 2025-11-16) |

## Features

- Difficulty select, timed round, score tracking, persistence and post-game summary.
- Coins, confetti, challenge progression and toasts; wake-lock and pause handling for mobile.
- Rewarded and interstitial ad hooks.
- Perspective road with near and far curbs; ball launches from its current position.

## Tech stack

Vite + React + TypeScript, shadcn/Radix UI, Supabase client; started on Lovable.

## Notes

The latest production deployment (Apr 27, 2026, 03:34 UTC) ended in ERROR; the READY build before it is from 03:15 UTC the same day. The project has no plain `.vercel.app` alias. An April 24, 2026 launch-readiness audit is in `AUDIT_REPORT.md`.

## Recent commits

- 2026-04-26 — Fix canvas alignment and control overlap regressions
- 2026-04-26 — Align gameplay canvas layout with target mobile design
- 2026-04-27 — chore: ignore .claude/ directory
- 2026-04-27 — feat: expand road to fill screen with perspective near/far curb layout
- 2026-04-27 — fix: ball launches from current position instead of snapping to playerStart
- 2026-04-26 — Fix game canvas visual composition
- 2026-04-26 — Fix broken GameCanvas.tsx merge — restore clean feature branch version
- 2026-04-26 — Fix Vercel JSON syntax for deployment


## Deploy diagnosis (CV-008, 2026-10-05)

**Failed deploy:** dpl_CbFirbBvT6iG5SPgpkaV26LGRsXC, production, Apr 27 2026 03:34 UTC. Triggered by merge of PR #39 ("Refactor GameCanvas layout, HUD, and controls").

**Root cause:** `src/components/GameCanvas.tsx` has 6 syntax errors from a bad merge. The merge kept two versions of the same code:
- Lines 54-57 declare `roadTopY` and `controlsTopY` twice (duplicate const declarations).
- Lines 1306-1433 have mismatched JSX tags: a `</div>` closing an open `<svg>`, a stray `>` inside a JSX element, and a `</Button>` closing an open `<div>`.

The build (`vite build`) fails at the transform step. Nothing wrong with the Vercel config or the framework. The fix is in the repo: remove the duplicated constant declarations (keep one set) and repair the JSX tag mismatches around lines 1306-1433.

**Status:** diagnosed. Fix and redeploy need GitHub repo access (pending Jr completing the app installation) and Jr's go-ahead.

## Linked

- [[Vercel Projects]]
- [[009 — Projects MOC]]
- [[Dante Cook]]
