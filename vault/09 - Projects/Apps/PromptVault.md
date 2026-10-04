---
title: PromptVault
url: https://promptvault-one.vercel.app
kind: app
repo: github.com/jrmoyler/promptvault
tags:
- project
- app
- vercel
- prompts
- internal-tool
- nextjs
type: project
owner: JR Moyler (Hataalii)
source: Vercel (team jrmoyler93-7522s-projects) + GitHub repos
status: live
created: 2026-02-19
updated: 2026-10-04
division: Collective AI (parent)
framework: none detected
last_deploy: 2026-02-20
vercel_project: promptvault
---
# PromptVault

An internal team prompt library: the "GitHub for prompts" for the company's AI tool stack. The PRD targets 5,000+ prompts; the Feb 20, 2026 audit expanded the library to 10k+ items.

## At a glance

| Field | Value |
|---|---|
| Kind | app |
| Status | live |
| Division | Collective AI (parent) |
| Live URL | [promptvault-one.vercel.app](https://promptvault-one.vercel.app) |
| Repo | [jrmoyler/promptvault](https://github.com/jrmoyler/promptvault) |
| Vercel project | `promptvault` |
| Framework preset | none detected |
| Vercel project created | 2026-02-19 |
| Last production deploy | 2026-02-20 (READY) |
| Commits read | 37 (first 2026-02-19) |

## Features

- Discover, save, share and upload prompts.
- Dark-mode design system, virtualized masonry grid, Framer Motion, CMD-K palette.
- Scraper and audit scripts that normalize prompt frontmatter and keep the real prompt text.
- PRD goals: time-to-good-prompt under 5 minutes, 90%+ weekly AI tool use, 500+ team-sourced prompts.

## Tech stack

Next.js, TanStack Query and Virtual, Zustand, Framer Motion, Tailwind.

## Recent commits

- 2026-02-20 — Fix prompt frontmatter parsing for TS target compatibility
- 2026-02-20 — Preserve real prompt text in normalized prompt DB
- 2026-02-20 — Fix CSV parser type shape for build
- 2026-02-20 — Audit prompts for quality and expand library to 10k+ items
- 2026-02-20 — feat: 2026 Vision UI overhaul — dark mode design system, virtualized masonry grid, Framer Motion animations, CMD-K palette
- 2026-02-20 — Debug and fix all prompts, UI, and perf issues across the app
- 2026-02-19 — Harden prompt readiness and fix prompt card layout
- 2026-02-19 — Fix prompt content mapping and virtualize library rendering

## Linked

- [[Vercel Projects]]
- [[009 — Projects MOC]]
- [[Skill Library]]
