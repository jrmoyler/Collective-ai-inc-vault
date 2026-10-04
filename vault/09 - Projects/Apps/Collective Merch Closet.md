---
title: Collective Merch Closet
url: https://collective-closet.vercel.app
kind: app
repo: github.com/jrmoyler/Collective-Merch-Closet
tags:
- project
- app
- vercel
- merch
- storefront
- ai-try-on
- react
type: project
owner: JR Moyler (Hataalii)
source: Vercel (team jrmoyler93-7522s-projects) + GitHub repos
status: live
created: 2026-07-17
updated: 2026-10-04
division: Collective AI (parent)
framework: vite
last_deploy: 2026-08-23
vercel_project: collective-closet
---
# Collective Merch Closet

"Wear the ecosystem." A merch storefront with 325 clothing pieces across 21 Collective AI divisions and an AI fitting room.

## At a glance

| Field | Value |
|---|---|
| Kind | app |
| Status | live |
| Division | Collective AI (parent) |
| Live URL | [collective-closet.vercel.app](https://collective-closet.vercel.app) |
| Repo | [jrmoyler/Collective-Merch-Closet](https://github.com/jrmoyler/Collective-Merch-Closet) |
| Vercel project | `collective-closet` |
| Framework preset | vite |
| Vercel project created | 2026-07-17 |
| Last production deploy | 2026-08-23 (READY) |
| Commits read | 19 (first 2026-07-17) |

## Features

- Closet filterable by division, garment type and full-text search (including OCR of product photos). Clothing only.
- 21 division brand worlds with accent colors, taglines and tags; favorites.
- Every piece maps to a body slot (head, neck, outer layer, top, hands, bottom, socks, footwear, full body).
- Outfit Studio: pick one of three models (JR, Hataalii or Gustavo), up to six pieces, then generate a try-on image via Agnes AI or the OpenAI Images API. Without a key it composes an on-device fit sheet.
- AI Stylist fills open slots ("Complete my fit").

## Tech stack

React + Vite, `/api/try-on` serverless function, service worker. Node 22+.

## Notes

Vercel project slug is `collective-closet`. A separate project `collective-merch-closet` has no linked repository.

## Recent commits

- 2026-08-23 — Harden the fitting room and put the closet's logic under test
- 2026-08-23 — Place clothes by body slot and rebuild the storyboard as a fit sheet
- 2026-07-18 — Support Agnes AI as the fitting-room image provider
- 2026-07-18 — Embed 3 model sheets, 6-piece fits, and an AI auto-stylist
- 2026-07-18 — Fix ByteString crash, mobile product details, and 3 photo mismatches
- 2026-07-18 — Make the closet clothing-only, fix key detection, add models & offline boards
- 2026-07-17 — Match every product photo to its real catalog entry
- 2026-07-17 — Optimize mobile load and polish the AI fitting room

## Linked

- [[Vercel Projects]]
- [[009 — Projects MOC]]
- [[Design System Bible v3]]
