---
title: VANTAGE
tags:
- product
- shipped
type: product
owner: JR Moyler (Hataalii)
status: shipped
updated: 2026-10-04
division: Nexus Labs
---
# VANTAGE

Design intelligence terminal. Also a screen inside [[Architect OS]].

## Division
- [[Nexus Labs Division]]

## Open items
- [ ] Full spec

## Linked
- [[003 — Products MOC]]

## Deployment

- Vercel project: `vantage`
- URL: [vantage-smoky-sigma.vercel.app](https://vantage-smoky-sigma.vercel.app)
- Repo: [jrmoyler/VANTAGE](https://github.com/jrmoyler/VANTAGE)
- Framework preset: python
- Vercel project created: 2026-04-03
- Last production deploy: 2026-04-03 (READY)

### What the repo shows

VANTAGE, the Visual Arts & Design Intelligence Terminal: an operator-grade creative command console with a terminal CLI and a FastAPI web app + API.

- Five screens: Prompt Generator, Knowledge Base (12-card creative intelligence index), Style Explorer, Principles Index, Command Console.
- CLI commands: `GENERATE [intent]`, `ASK [query]`, `STYLES`, `PRINCIPLES`, `KNOWLEDGE`, `SCREEN [1-5]`, `HELP`, `CLEAR`, `EXIT`.
- API: `GET /api/health`, `/api/knowledge`, `/api/styles`, `/api/principles`; `POST /api/generate`, `POST /api/ask`.
- `knowledge_base.json` covers anime artists, graphic designers, art movements, animated films, design rules, color psychology, film directors, cinematography, camera and lens catalog, photography styles.
- Visual DNA: 60% `#080B10`, 30% `#0D1219` / `#121A24`, 10% accent `#00D2B4`, secondary `#FF6B35`; Syne 800 and DM Mono; 40px grid at 1.5% opacity.
- Stack: Python, FastAPI, uvicorn; Vercel Python preset. Built Apr 2–3, 2026.

### Recent commits

- 2026-04-03 — Build end-to-end VANTAGE web UI and harden API/UX
- 2026-04-03 — Add Python entrypoints and Vercel-ready API hosting
- 2026-04-03 — Seed VANTAGE with real creative knowledge base data
- 2026-04-03 — Build operator-grade VANTAGE terminal application
- 2026-04-02 — Initial commit

Listed in [[Vercel Projects]].
