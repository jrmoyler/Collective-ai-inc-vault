---
title: Eon Biological Age Platform
tags:
- product
- spec
type: product
owner: JR Moyler (Hataalii)
status: spec
updated: 2026-10-04
division: Eon Core
---
# Eon Biological Age Platform

Multi-marker longitudinal aging and healthspan assessment.

## Division
- [[Eon Core Division]]

## Open items
- [ ] Full spec

## Linked
- [[003 — Products MOC]]

## MVP plan

MVP brief: [[MVP — Eon Biological Age Platform]] (from [[MVP Build Guide]])

- Objective: Biological age assessment integrating methylation clocks, telomeres, inflammation, performance, and CGM data.
- Build platform: HIPAA FastAPI, Horvath/TruMe/MyDNAge, lab APIs, wearables, Supabase clinical review.
- Priority: Year 4 - Series C; complexity: Medium
- Governance: Aegis-Review: clinical oversight, HIPAA/privacy, no unsupported medical claims.
- Timeline: 90 days in 5 phases; status planned.

## Master Product Catalog entry

- **Division:** [[Eon Core Division]]
- **Type:** Longevity Tracking Platform

**Description.** Multi-marker biological age assessment and tracking platform. Integrates methylation clocks (GrimAge, PhenoAge), telomere length, inflammatory markers, functional performance metrics, and CGM data to track biological age trajectory.

**Build / creation platform.** HIPAA-compliant FastAPI backend. Epigenetic clock analysis via Horvath lab APIs / TruMe / MyDNAge. Biomarker integration via lab partner APIs. Wearable data via Oura/Whoop/Apple Health. Clinical review queue in Supabase.

> [!warning] Clinical oversight
> Per the catalog, all health and longevity recommendations from Vital Helix and Eon Core require clinical oversight before delivery. Aegis-Review is mandatory. See [[Aegis Protocol]].

Source: [[Master Product Catalog]]
