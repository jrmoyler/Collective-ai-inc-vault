---
title: Collective Stock
url: https://collective-stock-lake.vercel.app
kind: app
repo: github.com/jrmoyler/Collective-Stock
tags:
- project
- app
- vercel
- media-library
- brand-assets
- mcp
type: project
owner: JR Moyler (Hataalii)
source: Vercel (team jrmoyler93-7522s-projects) + GitHub repos
status: live
created: 2026-08-09
updated: 2026-10-04
division: Collective AI (parent)
framework: vite
last_deploy: 2026-08-17
vercel_project: collective-stock
---
# Collective Stock

A manifest-driven media library for Collective AI Inc.: a public discovery layer, twenty division galleries plus a parent-brand gallery, collections, fuzzy search, faceted filters, rights metadata and responsive renditions.

## At a glance

| Field | Value |
|---|---|
| Kind | app |
| Status | live |
| Division | Collective AI (parent) |
| Live URL | [collective-stock-lake.vercel.app](https://collective-stock-lake.vercel.app) |
| Repo | [jrmoyler/Collective-Stock](https://github.com/jrmoyler/Collective-Stock) |
| Vercel project | `collective-stock` |
| Framework preset | vite |
| Vercel project created | 2026-08-09 |
| Last production deploy | 2026-08-17 (READY) |
| Commits read | 17 (first 2026-08-08) |

## Features

- Public read-only remote MCP server at `/api/mcp` (search, citable records, rendition URLs, division brand kits); setup portal at `/mcp`.
- Catalog of 466 unique records with zero broken references and zero unassigned assets.
- Google Photos export: 330 files (326 images, 4 videos), all assigned across the parent brand and twenty divisions.
- Collective AI Inc Component Library (42 records), Division Intro Video Library (20 films), 26 MP4s from Google Drive.

## Tech stack

Vite, Tailwind, serverless API (`api/manifest.js`, `api/download.js`, `api/mcp.js`), Playwright, Lighthouse, ffmpeg tooling.

## Recent commits

- 2026-08-16 — Add remote MCP asset connector
- 2026-08-10 — Address media audit review findings
- 2026-08-10 — Audit media classifications and isolate stock collections
- 2026-08-09 — feat: add motion archive and cinematic polish
- 2026-08-09 — Add component and intro media libraries
- 2026-08-09 — Pack media grids as masonry and fix layout defects across the app
- 2026-08-09 — Fix Vercel build by bundling ffmpeg and ffprobe binaries
- 2026-08-08 — Ingest complete Google Photos media archive

## Linked

- [[Vercel Projects]]
- [[009 — Projects MOC]]
- [[Design System Bible v3]]
