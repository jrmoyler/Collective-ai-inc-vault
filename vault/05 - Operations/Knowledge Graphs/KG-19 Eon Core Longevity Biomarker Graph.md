---
title: KG-19 Eon Core Longevity Biomarker Graph
id: KG-19
tags:
- knowledge-graph
- to-build
- eon-core
type: knowledge-graph
owner: JR Moyler (Hataalii)
source: Knowledge Graph Matrix
status: to-build
updated: 2026-10-04
division: Eon Core
platform: Graphiti (Zep) + Supabase + Eon Core Longevity API
---
# KG-19 Eon Core Longevity Biomarker Graph

Custom knowledge graph 19 of 20 in the [[Knowledge Graph Matrix]]. Owner: [[Eon Core Division]]. Status: to build.

[[Eon Core Division]] is chartered, not operating. This spec is a build plan for when the division activates.

## Purpose

Longitudinal longevity knowledge graph mapping biomarkers, interventions, biological age trajectories, and outcome correlations across Eon Core user population.

**Purpose:** Population longevity intelligence and protocol optimization

## Node types

- `User`
- `Biomarker`
- `Intervention`
- `BiologicalAge`
- `OutcomeEvent`
- `LongevityProtocol`

## Edge types

- `MEASURED_AT`
- `RECEIVED`
- `CORRELATED_WITH`
- `PREDICTED_BY`
- `ASSIGNED_TO`

## Platform

Graphiti (Zep) + Supabase + Eon Core Longevity API

Platform tools are described in [[Knowledge Graph Tools]].

## Build prompt

```
Ingest from Eon Core Longevity API + Vital Helix shared pipeline. Graphiti temporal graph: track biological age delta per intervention type over 12 months. Query: which interventions produce the largest biological age reduction in users over 45? Feed to longevity coaching agent.
```

## Related

- Shares a pipeline with [[KG-07 Vital Helix Bio-Digital Twin Graph]].
- Related MCP: [[MCP-18 Longevity Intelligence MCP]].
- Related products: [[Eon Biological Age Platform]], [[Longevity Protocol Builder]].
- Division: [[Eon Core Division]]
- Hub: [[Knowledge Graph Matrix]]
