---
title: Collective Strike 3D
url: https://collective-strike-3d.vercel.app
kind: game
repo: github.com/jrmoyler/collective-strike-3d
tags:
- project
- game
- vercel
- browser-game
- tactical-shooter
- threejs
- pwa
type: project
owner: JR Moyler (Hataalii)
source: Vercel (team jrmoyler93-7522s-projects) + GitHub repos
status: live
created: 2026-07-24
updated: 2026-10-04
division: All 20 divisions
framework: none detected
last_deploy: 2026-09-30
vercel_project: collective-strike-3d
---
# Collective Strike 3D

A browser-native 5v5 tactical arena built with Three.js. Choose one of 20 Collective AI division operators, buy weapons, use operator abilities and team doctrines, plant or defuse the spike, and play first-to-six matches against adaptive bot squads. It is the COLLECTIVE STRIKE entry in the [[Collective Games Suite]].

## At a glance

| Field | Value |
|---|---|
| Kind | game |
| Status | live |
| Division | All 20 divisions |
| Live URL | [collective-strike-3d.vercel.app](https://collective-strike-3d.vercel.app) |
| Repo | [jrmoyler/collective-strike-3d](https://github.com/jrmoyler/collective-strike-3d) |
| Vercel project | `collective-strike-3d` |
| Framework preset | none detected |
| Vercel project created | 2026-07-24 |
| Last production deploy | 2026-09-30 (READY) |
| Commits read | 102 (first 2026-07-23) |

## Features

- Ten arenas in the offline build: Neon Foundry, Sunken Archive, Skygrave Bastion, Verdant Overrun, Cryo Rift, Null Cathedral, Neon Canopy, Solar Bastion, Lunar Excavation, Ember Caldera.
- `ARENA_LAYOUT_RULES` in `src/arena-core.js` defines a playable plant/defuse map; tests walk the collision grid of all ten arenas against it.
- Per-arena strategy kits built from instanced prop families, enforced by tests and measured by `npm run budget`.
- Operators are procedural "Specimen Series 21" lifeforms (no character meshes): two-bone IK, spring-driven tails and antennae. 150 health; Animus Prime 190, Kinetic Edge 135.
- Difficulty tiers Rookie, Tactical, Elite. Playlists: Tactical (spike match plus post-match Apex Challenge vs one of 12 bosses), Boss Mode, Wave Mode.
- Installable offline PWA with mobile arena and combat HUD (Sept 29, 2026 App Store pass).

## Tech stack

Three.js, Anime.js, esbuild, Playwright; single-file build `COLLECTIVE_STRIKE_3D.html` also in repo.

## Recent commits

- 2026-09-30 — Restore committed arena budget evidence to main's versions
- 2026-09-30 — AAA presentation finish for operators, weapons and bosses (identity unchanged)
- 2026-09-29 — App Store pass: installable offline PWA, mobile arena + combat HUD, native feel, LOW-quality washout fix
- 2026-09-12 — Reconstruct Forge details and add physical-device capture gates
- 2026-09-09 — Overhaul Collective Strike 3D while preserving operator identities
- 2026-08-11 — fix(vfx-kit): FrostLance resource reset, ctx qualityScale, scratch vectors for pointAt
- 2026-08-11 — fix(vfx-kit): fireZone invokes onDoctrineCast; README includes full upstream MIT copyright notice
- 2026-08-11 — fix(vfx-kit): settings.fadeTime, qualityScale via context, fireZone uses onDoctrineCast, MIT copyright notice

## Linked

- [[Vercel Projects]]
- [[009 — Projects MOC]]
- [[002 — Divisions MOC]]
