---
title: Corporate Claw
url: https://corporate-claw.vercel.app
kind: app
repo: github.com/jrmoyler/Corporate-Claw
tags:
- project
- app
- vercel
- agent-simulation
- threejs
- gemini
- mcp
type: project
owner: JR Moyler (Hataalii)
source: Vercel (team jrmoyler93-7522s-projects) + GitHub repos
status: live
created: 2026-09-14
updated: 2026-10-04
division: Collective AI (parent)
framework: vite
last_deploy: 2026-09-15
vercel_project: corporate-claw
---
# Corporate Claw

A living 3D office with autonomous agents, searchable team profiles, conversations, leadership training and simulation analytics. It grew out of [[Collective Claw]].

## At a glance

| Field | Value |
|---|---|
| Kind | app |
| Status | live |
| Division | Collective AI (parent) |
| Live URL | [corporate-claw.vercel.app](https://corporate-claw.vercel.app) |
| Repo | [jrmoyler/Corporate-Claw](https://github.com/jrmoyler/Corporate-Claw) |
| Vercel project | `corporate-claw` |
| Framework preset | vite |
| Vercel project created | 2026-09-14 |
| Last production deploy | 2026-09-15 (READY) |
| Commits read | 26 (first 2026-02-24) |

## Features

- Procedural skinned agent rig at adult proportions, tailored per department and varied per person.
- Search and filter the team; select an agent to see their mission and start a conversation (`/api/chat` via Gemini).
- MCP tool calls routed through agent coffee breaks (Sept 15, 2026).
- Training checkpoints persist locally; dashboards start from seeded illustrative metrics, not real company analytics.
- Three.js WebGPURenderer with WebGL2 fallback; Babylon.js viewer for a Blender-authored lounge sofa.

## Tech stack

React + Vite + TypeScript, Three.js (WebGPU), Babylon.js, Zustand, Recharts, Google GenAI, MCP SDK, Tailwind.

## Recent commits

- 2026-09-15 — Rebuild agent rig on measured adult proportions with wrapped garments
- 2026-09-15 — Differentiate department rigs and route MCP tool calls through coffee breaks
- 2026-09-15 — Use native WebGL office materials and architectural touch camera
- 2026-09-14 — Fix binary asset validation, bound WebGL rigs and reach GOTO edges
- 2026-09-14 — Reconstruct reference office, suited agents and shared obstacle navigation
- 2026-09-14 — Run typechecks and tests in Vercel before building
- 2026-09-14 — Fix WebGL agent rendering and verify models in Vercel Git builds
- 2026-09-14 — Verify production workflows and harden simulation recovery

## Linked

- [[Vercel Projects]]
- [[009 — Projects MOC]]
