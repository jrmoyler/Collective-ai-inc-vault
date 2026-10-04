---
title: Dominion Ascendant
url: https://dominon-ascendant.vercel.app
kind: game
repo: github.com/jrmoyler/DOMINON-ASCENDANT-
tags:
- project
- game
- vercel
- browser-game
- city-builder
- strategy
- babylonjs
- unreal-engine
type: project
owner: JR Moyler (Hataalii)
source: Vercel (team jrmoyler93-7522s-projects) + GitHub repos
status: live
created: 2026-08-26
updated: 2026-10-04
division: Unassigned
framework: none detected
last_deploy: 2026-10-01
vercel_project: dominon-ascendant
---
# Dominion Ascendant

DOMINION // ASCENDANT is a city-building strategy campaign. You build a self-sufficient capital in Ashcroft Basin through three acts (the First Hour, the Regional Crisis, and Iron at the Border, where Forge Lord Daxton Rhe tries to take Ashcroft). Factions include Synara, Forgeweave and Eden Circuit. The repo ships two builds that share the content manifests under `Content/`.

## At a glance

| Field | Value |
|---|---|
| Kind | game |
| Status | live |
| Division | Unassigned |
| Live URL | [dominon-ascendant.vercel.app](https://dominon-ascendant.vercel.app) |
| Repo | [jrmoyler/DOMINON-ASCENDANT-](https://github.com/jrmoyler/DOMINON-ASCENDANT-) |
| Vercel project | `dominon-ascendant` |
| Framework preset | none detected |
| Vercel project created | 2026-08-26 |
| Last production deploy | 2026-10-01 (READY) |
| Commits read | 11 (first 2026-08-26) |

## Features

- **Browser slice (`web/`)**: TypeScript + Babylon.js with Three.js geometry and Anime.js. Playable now and deployed by Vercel.
- **Unreal slice (`Source/`)**: Unreal Engine 5.8, C++ gameplay, Gameplay Ability System, StateTree, Mass Entity, World Partition, Niagara, MetaSounds, CommonUI. Source-complete, never compiled.
- A campaign takes 30–60 minutes: three acts, 15 objectives, five endings. In Act III, Ironheart Dominance rises each cycle; at 100% Ashcroft falls.
- Card-driven building: select a card, place it on the grid; tactic cards for units and leaders.
- Installable, works offline; `npm run build:single` writes a one-file ~3 MB HTML build. Tagged releases attach the one-file build to a GitHub Release.
- Headless balance bot: `npm run sim -- governor 0 5`.

## Tech stack

Browser: React, Babylon.js, Three.js, Anime.js, TypeScript. Desktop: Unreal Engine 5.8 (C++).

## Notes

The Vercel project slug and repo name carry a typo ("DOMINON"). The in-game title is DOMINION // ASCENDANT. The vertical-slice spec (v1.1) is in `docs/bibles/` and lists out-of-scope items: a fourth major civilization, multiplayer, full 20-civilization production, Axiom Crown, a 128×128 player city.

## Recent commits

- 2026-10-01 — Turn the browser slice into a full campaign game
- 2026-09-08 — Upgrade Ashcroft gameplay, civic world, architecture and command UX
- 2026-08-26 — fix(web): preserve command shell when WebGL is unavailable
- 2026-08-26 — feat(web): replace graybox renderer with cinematic Babylon city
- 2026-08-26 — feat: add browser-playable vertical slice and fix Vercel deployment
- 2026-08-26 — feat: complete DOMINION ASCENDANT vertical slice tasks 1-28
- 2026-08-26 — chore: initialize repository

## Linked

- [[Vercel Projects]]
- [[009 — Projects MOC]]
