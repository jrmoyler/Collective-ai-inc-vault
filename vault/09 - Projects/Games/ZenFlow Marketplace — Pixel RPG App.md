---
title: ZenFlow Marketplace — Pixel RPG App
url: https://zenflow-pixel-app.vercel.app
kind: game
repo: github.com/jrmoyler/rork-zenflow-pixel-app
tags:
- project
- game
- vercel
- ios
- spritekit
- action-rpg
- rork
type: project
owner: JR Moyler (Hataalii)
source: Vercel (team jrmoyler93-7522s-projects) + GitHub repos
status: demo
created: 2026-02-17
updated: 2026-10-04
division: ZenFlow
framework: none detected
last_deploy: 2026-03-27
vercel_project: zenflow-pixel-app
---
# ZenFlow Marketplace — Pixel RPG App

ZenFlow Marketplace as a hybrid SaaS + Zelda-style action RPG. A Simulation Mode manages AI agents in a neural marketplace with 16 agent departments; a Battle Mode is real-time combat with a virtual joystick. It is a game build of the [[ZenFlow Marketplace]] product.

## At a glance

| Field | Value |
|---|---|
| Kind | game |
| Status | demo |
| Division | ZenFlow |
| Live URL | [zenflow-pixel-app.vercel.app](https://zenflow-pixel-app.vercel.app) |
| Repo | [jrmoyler/rork-zenflow-pixel-app](https://github.com/jrmoyler/rork-zenflow-pixel-app) |
| Vercel project | `zenflow-pixel-app` |
| Framework preset | none detected |
| Vercel project created | 2026-02-17 |
| Last production deploy | 2026-03-27 (READY) |
| Commits read | 36 (first 2026-02-12) |

## Features

- Dual mode with a toggle between simulation and battle.
- GameplayKit enemy state machines (Patrol → Chase → Attack), knockback and damage numbers.
- Hybrid XP from productivity (API) and battle rewards; 500 XP per level; progress in UserDefaults.
- Marketplace of 16 services at $20–$90/month and 9 enhancements (1.15x–1.25x multipliers).
- A playable web version for Vercel was added Feb 17, 2026 alongside the Swift app.

## Tech stack

Swift 5.9, SpriteKit, GameplayKit (iOS 17+); built with Rork. Web build via Vite.

## Notes

Private repository (read through the session GitHub connection). Current `main` holds the iOS app under `ios/` plus `rork.json`.

## Recent commits

- 2026-03-27 — Agent update
- 2026-02-17 — Scope realtime stream by user+agent and align web deployment docs
- 2026-02-17 — Add Vite package scaffold and preserve playable demo asset
- 2026-02-17 — Fix ghost-hit collision and pointer release handling in web game
- 2026-02-17 — Build playable web version for Vercel while preserving Swift app
- 2026-02-17 — Fix Vercel 404 with static entrypoint and routing
- 2026-02-13 — Fix sprite rendering, remove debug artifacts, add playthrough tests
- 2026-02-13 — Implement professional polish: Y-sort depth, texture fixes, shadow anchors, NPC patrol

## Linked

- [[Vercel Projects]]
- [[009 — Projects MOC]]
- [[ZenFlow Division]]
- [[ZenFlow Marketplace]]
