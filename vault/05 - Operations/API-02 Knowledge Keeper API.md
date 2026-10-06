---
title: API-02 Knowledge Keeper API
tags:
- source-specification
type: reference-spec
owner: JR Moyler (Hataalii)
status: source-planned
updated: 2026-10-06
source_refs:
- id: 14CeOA7wd1msMmI8PPoastdsUOC-fr-LJ
  url: https://drive.google.com/file/d/14CeOA7wd1msMmI8PPoastdsUOC-fr-LJ/view?usp=drivesdk
  title: Collective_AI_API_Matrix.pdf
---
# API-02 Knowledge Keeper API

> [!info] Source design, not a deployed integration
> The API Matrix labels all 20 custom APIs as work to build. This note preserves a planning contract and does not assert that an endpoint exists.

## Interface and data contract
/memories/store records decisions, tool results, sources and confidence. /memories/retrieve performs embedding similarity search, constrained by division, agent_id, aegis_level and date range.

## Proposed dependencies
Supabase pgvector; FastAPI. Availability, authorization and current deployment require separate evidence.

## Current gates and interpretation
Retrieval filters must respect division access boundaries. Embedding similarity does not establish source authority.

## Acceptance record before activation
Record the versioned schema, authenticated principal, division scope, source freshness, error behavior and retention policy. Attach test evidence for invalid input and unauthorized requests, a deployment reference and the approving decision. Leave absent owners, dates, prices and metrics unfilled.

[[API Matrix]] · [[MCP Matrix]] · [[Knowledge Graph Matrix]]

## Related operating notes
[[005 — Operations MOC]] · [[ZenFlow Division]]

## Source record
- [Collective_AI_API_Matrix.pdf](https://drive.google.com/file/d/14CeOA7wd1msMmI8PPoastdsUOC-fr-LJ/view?usp=drivesdk) — reviewed relevant sections on 2026-10-06.

### Source records
- [Collective_AI_API_Matrix.pdf](https://drive.google.com/file/d/14CeOA7wd1msMmI8PPoastdsUOC-fr-LJ/view?usp=drivesdk)

<!-- drive-expansion:bacacca02dacaad657b9 -->
