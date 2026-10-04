---
title: Knowledge Keeper
tags:
- product
- spec
type: product
owner: JR Moyler (Hataalii)
status: spec
updated: 2026-10-04
division: ZenFlow
---
# Knowledge Keeper

Shared institutional memory and cross-portfolio retrieval layer.

## Division
- [[ZenFlow Division]]

## Open items
- [ ] Full spec

## Linked
- [[003 — Products MOC]]

## MVP plan

MVP brief: [[MVP — Knowledge Keeper]] (from [[MVP Build Guide]])

- Objective: Portfolio-wide shared memory and audit layer for significant decisions, outputs, anomalies, and cross-division learning.
- Build platform: PostgreSQL + pgvector, Redis hot cache, Python async SQLAlchemy, ZenFlow logging hooks.
- Priority: Phase 1/2; complexity: Low-Medium
- Governance: Standard Aegis-Clear with privacy, audit logging, and role-based access controls.
- Timeline: 90 days in 5 phases; status planned.

## Master Product Catalog entry

- **Division:** [[ZenFlow Division]]
- **Type:** Shared Memory & Audit Layer

**Description.** Portfolio-wide shared memory. All significant agent decisions, outputs, and anomalies logged and indexed. Enables cross-division learning, audit trails, and the Meta-Reasoning Auditor.

**Build / creation platform.** PostgreSQL + pgvector for semantic memory. Redis for hot cache. Python async SQLAlchemy ORM. Integrated into all Zenith OS agents via standard logging hook.

Source: [[Master Product Catalog]]
