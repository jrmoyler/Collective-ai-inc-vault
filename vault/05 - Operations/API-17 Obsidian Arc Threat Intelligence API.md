---
title: API-17 Obsidian Arc Threat Intelligence API
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
# API-17 Obsidian Arc Threat Intelligence API

> [!info] Source design, not a deployed integration
> The API Matrix labels all 20 custom APIs as work to build. This note preserves a planning contract and does not assert that an endpoint exists.

## Interface and data contract
GET /threats/summary returns active_threats, cve_alerts, anomaly_score and recommended_actions for the selected scope. Source requires Obsidian Arc Director authentication.

## Proposed dependencies
Supabase; FastAPI; proposed MISP, NVD and VirusTotal feeds. Availability, authorization and current deployment require separate evidence.

## Current gates and interpretation
Aegis-classified asset data must remain scope-limited. Recommendations do not authorize exploitation or automatic changes to client environments.

## Acceptance record before activation
Record the versioned schema, authenticated principal, division scope, source freshness, error behavior and retention policy. Attach test evidence for invalid input and unauthorized requests, a deployment reference and the approving decision. Leave absent owners, dates, prices and metrics unfilled.

[[API Matrix]] · [[MCP Matrix]] · [[Knowledge Graph Matrix]]

## Related operating notes
[[005 — Operations MOC]] · [[Obsidian Arc Division]]

## Source record
- [Collective_AI_API_Matrix.pdf](https://drive.google.com/file/d/14CeOA7wd1msMmI8PPoastdsUOC-fr-LJ/view?usp=drivesdk) — reviewed relevant sections on 2026-10-06.

### Source records
- [Collective_AI_API_Matrix.pdf](https://drive.google.com/file/d/14CeOA7wd1msMmI8PPoastdsUOC-fr-LJ/view?usp=drivesdk)

<!-- drive-expansion:deb0b870afca6a0c574d -->
