---
title: Child Care Compass
url: https://child-compass-iota.vercel.app
kind: app
repo: github.com/jrmoyler/child-compass
tags:
- project
- app
- vercel
- child-care
- operations
- pwa
- capacitor
- electron
type: project
owner: JR Moyler (Hataalii)
source: Vercel (team jrmoyler93-7522s-projects) + GitHub repos
status: demo
created: 2026-07-14
updated: 2026-10-04
division: Unassigned
framework: none detected
last_deploy: 2026-07-14
vercel_project: child-compass, jrmoyler-child-compass
---
# Child Care Compass

A child-care operations platform with Admin, Teacher and Parent portals, built as calm, tactile "soft software".

## At a glance

| Field | Value |
|---|---|
| Kind | app |
| Status | demo |
| Division | Unassigned |
| Live URL | [child-compass-iota.vercel.app](https://child-compass-iota.vercel.app) |
| Repo | [jrmoyler/child-compass](https://github.com/jrmoyler/child-compass) |
| Vercel project | `child-compass`, `jrmoyler-child-compass` |
| Framework preset | none detected |
| Vercel project created | 2026-07-14 |
| Last production deploy | 2026-07-14 (READY) |
| Commits read | 15 (first 2026-07-12) |

## Features

- Admin: center control, classroom pulse, people, billing and compliance.
- Teacher: dashboard, attendance Kanban, quick logs, handover, curriculum and messages.
- Parent: daily stories, live feed, secure messages, billing and child profile.
- Demo accounts for each portal. On Vercel, real-time sync falls back from Socket.IO to 15-second polling and demo data lives in function memory.
- One codebase, four targets: Vercel web + serverless API, PWA, Capacitor iOS/Android, Electron desktop.

## Tech stack

TypeScript monorepo, Express API bundled as one Vercel function, Socket.IO, Capacitor, Electron, Vitest.

## Notes

Two Vercel projects deploy this repo: `child-compass` and `jrmoyler-child-compass`. Demo storage resets; a managed Postgres store is needed before real center data.

## Recent commits

- 2026-07-14 — Fix Vercel build failure that blocked the login API from deploying
- 2026-07-14 — Bundle the serverless API function to fix production login 500s
- 2026-07-14 — Fix production login/API crash and polish portal UI
- 2026-07-14 — Audit and deploy-prep: fix lint setup, auth scoping, dead code, and hardcoded demo data
- 2026-07-13 — Replace Docker deployment with Vercel, PWA, mobile, and desktop targets
- 2026-07-13 — Fix Vercel build failure: tsc not found in apps/api
- 2026-07-12 — feat: build connected Child Care Compass platform
- 2026-07-12 — chore: initialize repository

## Linked

- [[Vercel Projects]]
- [[009 — Projects MOC]]
