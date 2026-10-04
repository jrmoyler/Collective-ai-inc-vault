---
title: BetEdge AI
url: https://betedge-ai-eta.vercel.app
kind: app
repo: github.com/jrmoyler/betedge-ai-
tags:
- project
- app
- vercel
- sports-betting
- research
- nextjs
- expo
type: project
owner: JR Moyler (Hataalii)
source: Vercel (team jrmoyler93-7522s-projects) + GitHub repos
status: live
created: 2026-09-09
updated: 2026-10-04
division: Unassigned
framework: none detected
last_deploy: 2026-09-12
vercel_project: betedge-ai
---
# BetEdge AI

An AI sports betting research assistant for NFL, NBA, MLB, NCAA Football and NCAA Basketball. "Compare the market. Inspect the evidence. Find your edge."

## At a glance

| Field | Value |
|---|---|
| Kind | app |
| Status | live |
| Division | Unassigned |
| Live URL | [betedge-ai-eta.vercel.app](https://betedge-ai-eta.vercel.app) |
| Repo | [jrmoyler/betedge-ai-](https://github.com/jrmoyler/betedge-ai-) |
| Vercel project | `betedge-ai` |
| Framework preset | none detected |
| Vercel project created | 2026-09-09 |
| Last production deploy | 2026-09-12 (READY) |
| Commits read | 11 (first 2026-09-09) |

## Features

- AI-graded picks (A–F) with confidence percentages.
- Cross-book odds comparison, player props with historical trends, editable parlay builder with AI grading.
- Pick tracker with ROI analytics; line movement and injury alerts (premium).
- Planned tiers: Free, Pro $9.99/mo, Elite $19.99/mo.
- Without third-party keys the app serves bundled demo data and billing returns 503.

## Tech stack

Web: Next.js, TypeScript, Tailwind, NextAuth, PostgreSQL + Prisma, Stripe, Claude. Mobile: React Native + Expo. Data: The Odds API, ESPN API, BALLDONTLIE, College Football Data API.

## Notes

Monorepo: `web/` is the Vercel deploy root, `mobile/` is the Expo app. Pricing tiers are planned; no paying users are recorded.

## Recent commits

- 2026-09-12 — Make BetEdge look and feel like a professional sportsbook
- 2026-09-10 — Move Vercel install/build commands into scripts
- 2026-09-10 — Fix Vercel deployment for the web app in this monorepo
- 2026-09-09 — Fix singular/plural in the locked-picks notice
- 2026-09-09 — Fix two defects the first CI run surfaced
- 2026-09-09 — Add CI: types, lint, build, bundle, and an auth end-to-end run
- 2026-09-09 — Audit and clean up web + mobile apps for launch
- 2026-09-09 — Initial commit: BetEdge AI — Web + Mobile sports betting research assistant

## Linked

- [[Vercel Projects]]
- [[009 — Projects MOC]]
