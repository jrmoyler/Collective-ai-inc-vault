---
title: The Collective Codex
url: https://the-collective-codex.vercel.app
kind: game
repo: github.com/jrmoyler/the-collective-codex
tags:
- project
- game
- vercel
- browser-game
- card-game
- tcg
- capacitor
type: project
owner: JR Moyler (Hataalii)
source: Vercel (team jrmoyler93-7522s-projects) + GitHub repos
status: live
created: 2026-08-09
updated: 2026-10-04
division: All divisions (21 in-game)
framework: none detected
last_deploy: 2026-09-09
vercel_project: the-collective-codex
---
# The Collective Codex

"Twenty-One Divisions. Infinite Outcomes." A digital card game spanning 21 divisions, 54 source sheets, 28 card families and 1,134 canonical cards.

## At a glance

| Field | Value |
|---|---|
| Kind | game |
| Status | live |
| Division | All divisions (21 in-game) |
| Live URL | [the-collective-codex.vercel.app](https://the-collective-codex.vercel.app) |
| Repo | [jrmoyler/the-collective-codex](https://github.com/jrmoyler/the-collective-codex) |
| Vercel project | `the-collective-codex` |
| Framework preset | none detected |
| Vercel project created | 2026-08-09 |
| Last production deploy | 2026-09-09 (READY) |
| Commits read | 94 (first 2026-08-06) |

## Features

- Full Codex browser with search and filters; costs, rarity, timing, targets, keywords and rules text for every card.
- Three-lane match (Vanguard, Conduit, Flank); each Core starts at 20; Command / Insight / Essence resources cap at 6 / 5 / 4.
- 30-card starter doctrine or custom decks; rival tiers recruit, veteran, sovereign (they differ only in search depth). Seed codes replay a shuffle.
- Fixed a seat-parity bug where the first seat won 77.3% of mirrored matches at veteran.
- Card art fully embedded offline: a 1680×4320 AVIF atlas (21×54 grid) split into 43 checksum-verified chunks; 1500×2100 PNG frame export pipeline.

## Tech stack

Vanilla JS, Capacitor (Android/iOS), sharp for the art pipeline.

## Notes

The game uses 21 divisions; the vault canon has 20 chartered plus 10 pending.

## Recent commits

- 2026-09-09 — Keep unaffordable hand cards inspectable and record release verification
- 2026-09-09 — Upgrade game lobby, touch controls and offline native readiness
- 2026-08-26 — feat(design): give the cards a back and the board an arena
- 2026-08-23 — Make the seat stop deciding the match, and make balance data
- 2026-08-23 — Harden the animation, overlay, engine-clone and build-manifest layers
- 2026-08-23 — fix: make the seed code tell the truth, and close the keyboard and CI gaps
- 2026-08-23 — fix: make the rules the player reads come from the engine, and lock the deployment down
- 2026-08-14 — fix: unblock the late-game board, deepen the art crop, restock the starter

## Linked

- [[Vercel Projects]]
- [[009 — Projects MOC]]
- [[002 — Divisions MOC]]
