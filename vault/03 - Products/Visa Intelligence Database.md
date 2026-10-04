---
title: Visa Intelligence Database
tags:
- product
- spec
type: product
owner: JR Moyler (Hataalii)
status: spec
updated: 2026-10-04
division: Nomad Nexus
---
# Visa Intelligence Database

Continuously updated mobility and residency rules.

## Division
- [[Nomad Nexus Division]]

## Open items
- [ ] Full spec

## Linked
- [[003 — Products MOC]]

## MVP plan

MVP brief: [[MVP — Visa Intelligence Database]] (from [[MVP Build Guide]])

- Objective: Continuously updated database of digital nomad visas, residency, tax treaty implications, and entry requirements.
- Build platform: PostgreSQL, n8n scrapers/official feeds, Claude synthesis, n8n alerts.
- Priority: Year 3 - Series B; complexity: Medium
- Governance: Standard Aegis-Clear with privacy, audit logging, and role-based access controls.
- Timeline: 90 days in 5 phases; status planned.

## Master Product Catalog entry

- **Division:** [[Nomad Nexus Division]]
- **Type:** Data Product

**Description.** Comprehensive, continuously updated database of digital nomad visa programs, residency requirements, tax treaty implications, and entry requirements across 130+ countries. Real-time alert system for program changes.

**Build / creation platform.** PostgreSQL data store. Automated monitoring via n8n web scrapers + official immigration authority feeds. Claude API for synthesis. Alert routing via n8n + email/push.

Source: [[Master Product Catalog]]
