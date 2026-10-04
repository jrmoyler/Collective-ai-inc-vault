---
title: Truth Lens
tags:
- product
- spec
type: product
owner: JR Moyler (Hataalii)
status: spec
updated: 2026-10-04
division: Aether Link
---
# Truth Lens

Claim verification and content credibility support. Misinformation verification.

## Division
- [[Aether Link Division]]

## Open items
- [ ] Full spec

## Linked
- [[003 — Products MOC]]

## MVP plan

MVP brief: [[MVP — Truth Lens]] (from [[MVP Build Guide]])

- Objective: AI-powered verification and misinformation detection with credibility scoring and claim corroboration.
- Build platform: Claude API, source classifier, Snopes/PolitiFact APIs, FastAPI, Redis cache.
- Priority: 9 (build order #9); complexity: Medium
- Governance: Standard Aegis-Clear with privacy, audit logging, and role-based access controls.
- Timeline: 90 days in 5 phases; status planned.

## Master Product Catalog entry

- **Division:** [[Aether Link Division]]
- **Type:** Content Verification Platform

**Description.** AI-powered content verification and misinformation detection. Source credibility scoring, claim corroboration, real-time content moderation API for media organizations and platform clients.

**Build / creation platform.** Claude API for claim analysis. Custom ML classifier for source credibility. Integration with Snopes / PolitiFact APIs. FastAPI for Truth Lens API. Served via Redis-cached response layer.

Source: [[Master Product Catalog]]
