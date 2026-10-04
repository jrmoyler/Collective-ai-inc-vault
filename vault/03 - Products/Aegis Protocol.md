---
title: Aegis Protocol
tags:
- product
- spec
type: product
owner: JR Moyler (Hataalii)
status: spec
updated: 2026-10-04
division: ZenFlow
---
# Aegis Protocol

Safety and governance framework using clear, review, and hold gates.

## Division
- [[ZenFlow Division]]

## Open items
- [ ] Full spec

## Linked
- [[003 — Products MOC]]

## MVP plan

MVP brief: [[MVP — Aegis Protocol]] (from [[MVP Build Guide]])

- Objective: Portfolio-wide AI ethics and safety enforcement layer with Aegis-Clear, Aegis-Review, and Aegis-Hold clearance tiers.
- Build platform: Python policy engine, PostgreSQL audit logs, Redis routing, structured agent constraints.
- Priority: Phase 1/2; complexity: Low-Medium
- Governance: Standard Aegis-Clear with privacy, audit logging, and role-based access controls.
- Timeline: 90 days in 5 phases; status planned.

## Master Product Catalog entry

- **Division:** [[ZenFlow Division]]
- **Type:** Safety & Governance Framework

**Description.** The portfolio-wide AI ethics and safety enforcement layer. Three-tier clearance: Aegis-Clear (standard), Aegis-Review (PII/health/financial data), Aegis-Hold (bias/legal/ethics escalation). Every agent in every division operates under Aegis.

**Build / creation platform.** Python policy engine integrated into Zenith OS. Rules encoded as structured constraints in agent system prompts. Audit logging via PostgreSQL + Redis.

Source: [[Master Product Catalog]]
