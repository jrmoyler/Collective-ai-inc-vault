---
title: Collective Claw
url: https://collective-claw.vercel.app
kind: app
repo: github.com/jrmoyler/Collective-Claw
tags:
- project
- app
- vercel
- agent-simulation
- webgpu
- threejs
type: project
owner: JR Moyler (Hataalii)
source: Vercel (team jrmoyler93-7522s-projects) + GitHub repos
status: demo
created: 2026-02-25
updated: 2026-10-04
division: Collective AI (parent)
framework: vite
last_deploy: 2026-02-25
vercel_project: collective-claw
---
# Collective Claw

CollectiveClaw: a corporate simulation of autonomous agents. The README title is "Autonomous Characters Lab": a Three.js WebGPU simulation of a small city with 100 instanced characters (1 player + 99 NPCs). [[Corporate Claw]] is its later office-based successor.

## At a glance

| Field | Value |
|---|---|
| Kind | app |
| Status | demo |
| Division | Collective AI (parent) |
| Live URL | [collective-claw.vercel.app](https://collective-claw.vercel.app) |
| Repo | [jrmoyler/Collective-Claw](https://github.com/jrmoyler/Collective-Claw) |
| Vercel project | `collective-claw` |
| Framework preset | vite |
| Vercel project created | 2026-02-25 |
| Last production deploy | 2026-02-25 (READY) |
| Commits read | 17 (first 2026-02-23) |

## Features

- GPU compute for movement, CPU logic for behaviors; CPU boids fallback.
- Click-to-move player, NPC selection, encounter detection and speech bubbles.
- Debug panel with world and behavior visualization.

## Tech stack

Vite + React + TypeScript, Three.js (WebGPU), Zustand, Express, better-sqlite3, Google GenAI.

## Notes

3D models in `/public/models` are by Arturo Paracuellos (unboring.net) under CC BY-NC 4.0, so they cannot be used commercially.

## Recent commits

- 2026-02-24 — Restore CPU simulation fallback and backend-aware startup
- 2026-02-24 — Harden renderer initialization and async frame error handling
- 2026-02-24 — refactor: Rename project and update metadata
- 2026-02-25 — fix: browser compatibility, CPU boids fallback, and mobile responsiveness
- 2026-02-25 — fix: resolve white screen and all Vercel deployment issues
- 2026-02-24 — Update developer name in README.md
- 2026-02-24 — feat: Add error handling and simulation controls
- 2026-02-24 — feat: Show speech bubbles for active NPCs

## Linked

- [[Vercel Projects]]
- [[009 — Projects MOC]]
