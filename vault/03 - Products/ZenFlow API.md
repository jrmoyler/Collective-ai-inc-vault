---
title: ZenFlow API
tags:
- product
- spec
type: product
owner: JR Moyler (Hataalii)
status: spec
updated: 2026-10-04
division: ZenFlow
---
# ZenFlow API

Developer interface for agent orchestration and embedded intelligence.

## Division
- [[ZenFlow Division]]

## Open items
- [ ] Full spec

## Linked
- [[003 — Products MOC]]

## MVP plan

MVP brief: [[MVP — ZenFlow API]] (from [[MVP Build Guide]])

- Objective: Commercial REST API for third-party access to agent routing, orchestration, and Aegis compliance infrastructure.
- Build platform: FastAPI, OAuth 2.0, API keys, Redis rate limiting, OpenAPI/Swagger, Docker cloud.
- Priority: Phase 1/2; complexity: Medium
- Governance: Standard Aegis-Clear with privacy, audit logging, and role-based access controls.
- Timeline: 90 days in 5 phases; status planned.

## Master Product Catalog entry

- **Division:** [[ZenFlow Division]]
- **Type:** Developer API

**Description.** Public REST API enabling third-party developers to access ZenFlow's agent routing, orchestration, and Aegis Protocol compliance infrastructure. The commercial API layer.

**Build / creation platform.** FastAPI. OAuth 2.0 + API key auth. Rate limiting via Redis. Documentation via OpenAPI/Swagger. Deployed on Docker / ZenFlow cloud infrastructure.

Source: [[Master Product Catalog]]
