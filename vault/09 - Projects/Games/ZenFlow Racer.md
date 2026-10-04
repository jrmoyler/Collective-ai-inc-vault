---
title: ZenFlow Racer
url: https://zenflow-racer.vercel.app
kind: game
repo: github.com/jrmoyler/Zenflow-Racer
tags:
- project
- game
- vercel
- browser-game
- racing
- threejs
- pwa
type: project
owner: JR Moyler (Hataalii)
source: Vercel (team jrmoyler93-7522s-projects) + GitHub repos
status: live
created: 2026-09-06
updated: 2026-10-04
division: ZenFlow (all 20 division chassis)
framework: none detected
last_deploy: 2026-09-29
vercel_project: zenflow-racer
---
# ZenFlow Racer

ZenFlow Racer, Three Circuit Edition: a floating-island arcade kart racer with three circuits (including Cherry Blossom Skyway), twenty division chassis, twenty signature director powers, 24 equippable add-ons and six items.

## At a glance

| Field | Value |
|---|---|
| Kind | game |
| Status | live |
| Division | ZenFlow (all 20 division chassis) |
| Live URL | [zenflow-racer.vercel.app](https://zenflow-racer.vercel.app) |
| Repo | [jrmoyler/Zenflow-Racer](https://github.com/jrmoyler/Zenflow-Racer) |
| Vercel project | `zenflow-racer` |
| Framework preset | none detected |
| Vercel project created | 2026-09-06 |
| Last production deploy | 2026-09-29 (READY) |
| Commits read | 108 (first 2026-09-05) |

## Features

- Pick a director, circuit and difficulty; a 360° holographic turntable shows each director's chassis.
- Twelve directors per race, three laps. Hop-and-hold drift with release boost, slipstream, tokens and items.
- Nightfall and Apex Pearl chassis tiers for all twenty divisions; in-engine cinematics.
- Keyboard, touch (auto-accelerate, vibration) and gamepad (rumble). Best times stored per circuit, director and difficulty.
- Installable web app with offline cache. A Canvas renderer takes over if WebGL is unavailable.

## Tech stack

Three.js, Anime.js, plain JS modules, jsdom tests. Node 24.x.

## Recent commits

- 2026-09-28 — Fix remaining racer, garage, pacing and cutscene regressions
- 2026-09-25 — Add in-engine cinematics; fix Cherry contrast, add-on scale, Earth rock, tier II/III drivers; upgrade all circuits
- 2026-09-23 — Stage special moves with casts, grounded fields and real impacts
- 2026-09-23 — Fix AI drifting, hairpins, track banking and kart contact; smooth rendering
- 2026-09-23 — Tighten powers and harden race logic
- 2026-09-23 — Add Nightfall and Apex Pearl chassis tiers for all twenty divisions
- 2026-09-16 — Raise the coach skip control to a 44px touch target and commit the clean accessibility run
- 2026-09-16 — Fix three real accessibility defects and correct four checks that mis-modelled the browser

## Linked

- [[Vercel Projects]]
- [[009 — Projects MOC]]
- [[ZenFlow Division]]
