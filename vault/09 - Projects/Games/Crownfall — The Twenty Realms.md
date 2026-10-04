---
title: Crownfall — The Twenty Realms
url: https://crownfall-the-twenty-realms.vercel.app
kind: game
repo: github.com/jrmoyler/crownfall-the-twenty-realms
tags:
- project
- game
- vercel
- browser-game
- action
- threejs
- capacitor
type: project
owner: JR Moyler (Hataalii)
source: Vercel (team jrmoyler93-7522s-projects) + GitHub repos
status: live
created: 2026-07-12
updated: 2026-10-04
division: All 20 divisions
framework: vite
last_deploy: 2026-10-01
vercel_project: crownfall-the-twenty-realms
---
# Crownfall — The Twenty Realms

A browser action game. Twenty rulers, one war table: pick a civilization, march on its neighbors, keep what you take. Each of the twenty realms is one Collective AI division with its own ruler (ZenFlow is ruled by Asterion Vale, the Oracle-King; The Collective by Caelum Rhys, the Sovereign Architect; Eon Core by Orun Aeon, the Chronarch Elder).

## At a glance

| Field | Value |
|---|---|
| Kind | game |
| Status | live |
| Division | All 20 divisions |
| Live URL | [crownfall-the-twenty-realms.vercel.app](https://crownfall-the-twenty-realms.vercel.app) |
| Repo | [jrmoyler/crownfall-the-twenty-realms](https://github.com/jrmoyler/crownfall-the-twenty-realms) |
| Vercel project | `crownfall-the-twenty-realms` |
| Framework preset | vite |
| Vercel project created | 2026-07-12 |
| Last production deploy | 2026-10-01 (READY) |
| Commits read | 19 (first 2026-07-11) |

## Features

- **Conquest** mode on a war table. Neighboring realms are the only roads. A mission is a shrine, two relic wells and the rival warlord.
- **Endless survival**: warbands until you fall, one relic drafted between waves, a warlord every fifth wave.
- **Forge**: shards from either mode buy permanent seals.
- Controls for keyboard and mouse (WASD, strike, stamina breaker, phase-dodge, four rites on Q E R F, C calls elites), touch (left-half stick, right-thumb action cluster with auto-facing) and standard gamepad.
- Rigged, textured Sketchfab models (CC BY 4.0) on photoscanned Poly Haven battlefields and HDR skies (CC0). `rig.ts` animates mixed skeletons procedurally so one pose set works on every model.
- Asset pipeline (`npm run assets`): download, strip animation, simplify to a triangle budget, WebP textures, meshopt compression. A battle loads only its own realm and cast.
- Progress saved in `localStorage`. Capacitor Android and iOS shells included.

## Tech stack

Vite + TypeScript, Three.js, Capacitor (Android/iOS), gltf-transform, meshoptimizer, Vitest.

## Notes

Realm roster in `src/crownfall/catalog.ts` follows the canon division order 1–20, from ZenFlow to Eon Core.

## Recent commits

- 2026-10-01 — Fix mobile crash and touch controls; replace toy figures and painted maps with scanned realms
- 2026-10-01 — Sculpt Crownfall figures and battlefields in Blender.
- 2026-10-01 — Replace the shared-kit arena with a playable twenty-realm campaign.
- 2026-07-25 — Harden WebGL fallback experience
- 2026-07-25 — Overhaul Crownfall combat and cinematic presentation
- 2026-07-12 — Replace sprite actors with articulated rigs and build real 3D realm environments
- 2026-07-12 — Build cinematic realms and native app shells
- 2026-07-11 — Add living realm animation and combat polish

## Linked

- [[Vercel Projects]]
- [[009 — Projects MOC]]
- [[002 — Divisions MOC]]
