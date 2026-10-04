---
title: ZenFlow Agent Foundry
tags:
- product
- spec
type: product
owner: JR Moyler (Hataalii)
status: spec
updated: 2026-10-04
division: ZenFlow
---
# ZenFlow Agent Foundry

Builder environment for production-ready agents and agent clusters.

## Division
- [[ZenFlow Division]]

## Open items
- [ ] Full spec

## Linked
- [[003 — Products MOC]]

## MVP plan

MVP brief: [[MVP — ZenFlow Agent Foundry]] (from [[MVP Build Guide]])

- Objective: Factory for God Prompt construction, agent blueprints, division-specific agent configuration, versioning, and deployment.
- Build platform: FastAPI, Claude API, PostgreSQL agent registry, Redis sessions, JWT/API key auth, Docker.
- Priority: 4 (build order #4); complexity: Medium
- Governance: Standard Aegis-Clear with privacy, audit logging, and role-based access controls.
- Timeline: 90 days in 5 phases; status planned.

## Master Product Catalog entry

- **Division:** [[ZenFlow Division]]
- **Type:** Agent Builder Platform

**Description.** God Prompt construction, agent blueprint generation, division-specific agent configuration, and marketplace listing. The factory where all 600 agents in the portfolio are built, versioned, and deployed.

**Build / creation platform.** FastAPI backend + Anthropic Claude API. PostgreSQL for agent registry. Redis for session routing. JWT + API key auth. Docker on ZenFlow infrastructure.

Source: [[Master Product Catalog]]
