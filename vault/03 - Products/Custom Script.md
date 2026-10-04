---
title: Custom Script
tags:
- product
- spec
type: product
owner: JR Moyler (Hataalii)
status: spec
updated: 2026-10-04
division: Vital Helix
---
# Custom Script

Personalized medication or supplement workflow requiring physician co-signature. Pharmacogenomic prescribing support, backed by PREPARE trial evidence.

## Division
- [[Vital Helix Division]]

## Open items
- [ ] Full spec

## Linked
- [[003 — Products MOC]]

## MVP plan

MVP brief: [[MVP — Custom Script]] (from [[MVP Build Guide]])

- Objective: AI-assisted personalized medication/supplement compounding with physician-reviewed formulation recommendations.
- Build platform: HIPAA FastAPI, Claude Aegis-Review, encrypted physician portal, pharmacy API, Juris Guard FDA layer.
- Priority: Year 4 - Series C; complexity: High
- Governance: Aegis-Review: clinical oversight, HIPAA/privacy, no unsupported medical claims.
- Timeline: 90 days in 5 phases; status planned.

## Master Product Catalog entry

- **Division:** [[Vital Helix Division]]
- **Type:** Personalized Medicine Platform

**Description.** AI-assisted personalized medication and supplement compounding. Analyzes patient biomarkers, genomics, and health history to generate physician-reviewed custom formulation recommendations. Requires physician co-signature.

**Build / creation platform.** HIPAA-compliant FastAPI backend. Claude API for formulation analysis (Aegis-Review tier). Physician review queue via encrypted portal. Pharmacy partner integration API. Juris Guard FDA compliance layer.

> [!warning] Clinical oversight
> Per the catalog, all health and longevity recommendations from Vital Helix and Eon Core require clinical oversight before delivery. Aegis-Review is mandatory. See [[Aegis Protocol]].

Source: [[Master Product Catalog]]
