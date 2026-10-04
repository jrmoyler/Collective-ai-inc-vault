---
title: Contract Lifecycle Management
tags:
- product
- spec
type: product
owner: JR Moyler (Hataalii)
status: spec
updated: 2026-10-04
division: Juris Guard
---
# Contract Lifecycle Management

Repository, renewal alerts, search, execution, and audit trail.

## Division
- [[Juris Guard Division]]

## Open items
- [ ] Full spec

## Linked
- [[003 — Products MOC]]

## MVP plan

MVP brief: [[MVP — Contract Lifecycle Management]] (from [[MVP Build Guide]])

- Objective: Contract lifecycle tracking: expirations, obligations, renewal alerts, and searchable repository.
- Build platform: Next.js, PostgreSQL full-text search, n8n alerts, DocuSign, S3-compatible storage.
- Priority: Phase 1/2; complexity: Medium
- Governance: LegalTech boundary: assistive review only; attorney review for legal advice.
- Timeline: 90 days in 5 phases; status planned.

## Master Product Catalog entry

- **Division:** [[Juris Guard Division]]
- **Type:** Contract Management Platform

**Description.** Full contract lifecycle tracking across all 20 divisions. Expiration monitoring, obligation tracking, renewal alerts (90-day advance), and searchable contract repository.

**Build / creation platform.** Custom Next.js frontend. PostgreSQL + full-text search. Automated alert system via n8n. DocuSign API integration. PDF storage in S3-compatible object storage.

Source: [[Master Product Catalog]]
