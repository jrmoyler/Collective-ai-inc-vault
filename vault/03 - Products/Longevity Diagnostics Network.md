---
title: Longevity Diagnostics Network
tags:
- product
- spec
type: product
owner: JR Moyler (Hataalii)
status: spec
updated: 2026-10-04
division: Eon Core
---
# Longevity Diagnostics Network

Lab coordination, data integration, quality control, and review.

## Division
- [[Eon Core Division]]

## Open items
- [ ] Full spec

## Linked
- [[003 — Products MOC]]

## MVP plan

MVP brief: [[MVP — Longevity Diagnostics Network]] (from [[MVP Build Guide]])

- Objective: Lab partner network for longevity testing panels, logistics, result integration, and clinical review.
- Build platform: Lab APIs, Airtable + Shippo logistics, HL7 FHIR, automated QC.
- Priority: Year 4 - Series C; complexity: Low-Medium
- Governance: Aegis-Review: clinical oversight, HIPAA/privacy, no unsupported medical claims.
- Timeline: 90 days in 5 phases; status planned.

## Master Product Catalog entry

- **Division:** [[Eon Core Division]]
- **Type:** Lab Partner Network

**Description.** Curated lab partner network for comprehensive longevity testing panels. Coordinates testing kit logistics, result integration, and clinical review. Partners: Function Health, LabCorp, Quest, Ulta Lab Tests.

**Build / creation platform.** Lab partner API integrations. Kit logistics managed via Airtable + shipping APIs (Shippo). Results integration into Eon platform via HL7 FHIR standard. QC monitoring via automated checks.

> [!warning] Clinical oversight
> Per the catalog, all health and longevity recommendations from Vital Helix and Eon Core require clinical oversight before delivery. Aegis-Review is mandatory. See [[Aegis Protocol]].

Source: [[Master Product Catalog]]
