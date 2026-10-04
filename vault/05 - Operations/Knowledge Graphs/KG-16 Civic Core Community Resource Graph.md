---
title: KG-16 Civic Core Community Resource Graph
id: KG-16
tags:
- knowledge-graph
- to-build
- civic-core
type: knowledge-graph
owner: JR Moyler (Hataalii)
source: Knowledge Graph Matrix
status: to-build
updated: 2026-10-04
division: Civic Core
platform: Neo4j Aura + Civic Core Resource Matching API
---
# KG-16 Civic Core Community Resource Graph

Custom knowledge graph 16 of 20 in the [[Knowledge Graph Matrix]]. Owner: [[Civic Core Division]]. Status: to build.

[[Civic Core Division]] is chartered, not operating. This spec is a build plan for when the division activates.

> [!note] Superseded
> The matrix states that Stanley Constant holds an independent veto here. That veto was removed on Oct 1, 2026. The line is kept as written in the source. See [[Civic Core Fiduciary Veto]] and [[Stanley Constant]].

## Purpose

Nonprofit service availability graph. Maps community programs, eligibility requirements, organizations, geographic coverage, and service gaps into a resource intelligence layer.

**Purpose:** Community resource access and equity gap analysis

## Node types

- `Program`
- `Organization`
- `EligibilityRequirement`
- `GeographicCoverage`
- `ServiceGap`
- `Beneficiary`

## Edge types

- `OFFERED_BY`
- `REQUIRES`
- `COVERS`
- `GAPS_IN`
- `SERVED_BY`

## Platform

Neo4j Aura + Civic Core Resource Matching API

Platform tools are described in [[Knowledge Graph Tools]].

## Build prompt

```
Ingest 211 data + Civic Core program database. Cypher: find zip codes in Columbus with population > 5000 and < 2 food security programs. Surface equity gaps for grant applications. Stanley Constant independent veto applies to all data collection decisions.
```

## Related

- Related MCP: [[MCP-09 Civic Resource MCP]].
- Related product: [[Community Resource Network]].
- Division: [[Civic Core Division]]
- Hub: [[Knowledge Graph Matrix]]
