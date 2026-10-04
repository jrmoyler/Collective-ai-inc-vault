---
title: Longevity Protocol Builder
tags:
- product
- spec
type: product
owner: JR Moyler (Hataalii)
status: spec
updated: 2026-10-04
division: Eon Core
---
# Longevity Protocol Builder

Evidence-graded, physician-reviewed protocol design.

## Division
- [[Eon Core Division]]

## Open items
- [ ] Full spec

## Linked
- [[003 — Products MOC]]

## MVP plan

MVP brief: [[MVP — Longevity Protocol Builder]] (from [[MVP Build Guide]])

- Objective: Evidence-graded protocol design across Tier 1 RCTs, Tier 2 physician-supervised, and Tier 3 emerging interventions.
- Build platform: Claude Aegis-Review, PostgreSQL evidence DB, Supabase review queue, Next.js physician portal.
- Priority: Year 4 - Series C; complexity: Medium
- Governance: Aegis-Review: clinical oversight, HIPAA/privacy, no unsupported medical claims.
- Timeline: 90 days in 5 phases; status planned.

## Master Product Catalog entry

- **Division:** [[Eon Core Division]]
- **Type:** Personalized Protocol Platform

**Description.** Evidence-graded longevity protocol design platform. Tiers interventions by evidence strength: Tier 1 (multiple RCTs), Tier 2 (physician-supervised), Tier 3 (emerging). Personalized to biomarker profile and genetic predispositions.

**Build / creation platform.** Claude API for protocol generation (Aegis-Review tier for Tier 2 interventions). Evidence database in PostgreSQL. Clinical review queue via Supabase. Physician reviewer portal in Next.js.

> [!warning] Clinical oversight
> Per the catalog, all health and longevity recommendations from Vital Helix and Eon Core require clinical oversight before delivery. Aegis-Review is mandatory. See [[Aegis Protocol]].

Source: [[Master Product Catalog]]
