---
title: Zukan Arena
url: https://zukan-arena.vercel.app
kind: game
repo: github.com/jrmoyler/Zukan-Arena
tags:
- project
- game
- vercel
- browser-game
- arena-battler
- threejs
- pwa
type: project
owner: JR Moyler (Hataalii)
source: Vercel (team jrmoyler93-7522s-projects) + GitHub repos
status: live
created: 2026-08-13
updated: 2026-10-04
division: Unassigned
framework: vite
last_deploy: 2026-10-01
vercel_project: zukan-arena
---
# Zukan Arena

An elemental 3D arena battler starring all 68 Zukan. Pick a fighter, draft a squad and win best-of-three rounds in a porcelain colosseum on desktop, mobile or gamepad. Installs as an app and works offline.

## At a glance

| Field | Value |
|---|---|
| Kind | game |
| Status | live |
| Division | Unassigned |
| Live URL | [zukan-arena.vercel.app](https://zukan-arena.vercel.app) |
| Repo | [jrmoyler/Zukan-Arena](https://github.com/jrmoyler/Zukan-Arena) |
| Vercel project | `zukan-arena` |
| Framework preset | vite |
| Vercel project created | 2026-08-13 |
| Last production deploy | 2026-10-01 (READY) |
| Commits read | 20 (first 2026-08-13) |

## Features

- Four-slot kits per fighter: role-shaped basic bolt (Builders, Creators, Strategists), elemental signature, dash with invulnerability frames, charged ultimate.
- Two elemental triangles: Earth › Plasma › Hydro › Earth and Gale › Nature › Void › Gale. Resonant hits +25%, resisted hits −20%.
- Arena with four porcelain plinths and a central Resonance Bloom that heals and charges ultimates. First team to two rounds; 75-second round clock.
- Modes: Skirmish (1v1, 2v2, 3v3 vs Novice, Adept or Master AI), Rift Gauntlet (eight-stage ladder ending at a colossal Sovereign boss), Training Grounds.
- Progression: Archivist level, Glimmer currency, per-fighter mastery, win streaks and a Zukan encyclopedia.
- Utility-scoring AI; difficulty changes reaction, aim and dodge rate, never stats.
- All audio synthesized with Web Audio (no audio files). Hand-written service worker precaches the shell and all 68 fighter sprites.

## Tech stack

Vite + TypeScript, Three.js, Vitest, PWA (custom service worker).

## Notes

Two other Vercel projects, `solana-zukan-arena` and `zukan-arena-smoke`, have no linked repository and are not covered here.

## Recent commits

- 2026-10-01 — Overhaul Zukan Arena into a complete, installable arena battler
- 2026-08-13 — fix: restore functional FighterRig recovery + full Game.ts polish (undo placeholder)
- 2026-08-13 — feat: restore full award-standard FighterRig + cinematic Game post-process polish
- 2026-08-13 — fix+polish: restore Game.ts with cinematic exposure, bloom, and fog
- 2026-08-13 — fix+polish: restore LivingArena with cinematic 4-light setup (key, rim, fill, bounce)
- 2026-08-13 — polish(render): cinematic exposure, bloom, fog for arena lighting
- 2026-08-13 — polish(ui): selection cards, glass panels, filter chips, focus rings
- 2026-08-13 — restore styles.css from main (prep for UI polish)

## Linked

- [[Vercel Projects]]
- [[009 — Projects MOC]]
