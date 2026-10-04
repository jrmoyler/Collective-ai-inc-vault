---
title: Grad Season
url: https://grad-season.vercel.app
kind: app
repo: github.com/jrmoyler/Grad-season
tags:
- project
- app
- vercel
- ecommerce
- keepsakes
- stripe
- static-site
type: project
owner: JR Moyler (Hataalii)
source: Vercel (team jrmoyler93-7522s-projects) + GitHub repos
status: live
created: 2026-03-15
updated: 2026-10-04
division: Collective AI (parent)
framework: none detected
last_deploy: 2026-04-19
vercel_project: grad-season
---
# Grad Season

Personalized graduation keepsakes: custom figurines, comic books and storybooks. Built and operated by Collective AI, Columbus, Ohio.

## At a glance

| Field | Value |
|---|---|
| Kind | app |
| Status | live |
| Division | Collective AI (parent) |
| Live URL | [grad-season.vercel.app](https://grad-season.vercel.app) |
| Repo | [jrmoyler/Grad-season](https://github.com/jrmoyler/Grad-season) |
| Vercel project | `grad-season` |
| Framework preset | none detected |
| Vercel project created | 2026-03-15 |
| Last production deploy | 2026-04-19 (READY) |
| Commits read | 32 (first 2026-03-15) |

## Features

- Pages: landing page, pre-order form, internal production card, production runner, profile and order-success.
- Pricing: Custom Figurine $89, Custom Comic Book $34, Custom Storybook $44, Full Bundle $167.
- Orders flow to a Google Sheet via Apps Script; a Gemini Gem ("Grad Season Creator") and six production prompt templates.
- Profiles, order tracking, Stripe checkout and a cutoff banner (Apr 19, 2026). Remotion ad video in `ad-video/`.

## Tech stack

Static HTML in `public/`, Vercel serverless `api/create-checkout-session.js` (Stripe), Google Apps Script, Remotion.

## Recent commits

- 2026-04-19 — Add order-success page and profile/order-success routes to vercel.json
- 2026-04-19 — Add profiles, order tracking, Stripe payments, cutoff banner, and footer email
- 2026-03-28 — Add package-lock.json for ad-video Remotion project
- 2026-03-28 — Add Remotion advertisement video for Grad Season landing page
- 2026-03-26 — Fix pageTurnIn to preserve fixed positioning
- 2026-03-26 — Add book-like page turn animations across site
- 2026-03-23 — Refresh site for 2026 graduation season
- 2026-03-23 — Update print statement from 'Hello' to 'Goodbye'

## Linked

- [[Vercel Projects]]
- [[009 — Projects MOC]]
