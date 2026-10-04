---
title: KG-18 Cognara Behavioral Psychographic Graph
id: KG-18
tags:
- knowledge-graph
- to-build
- cognara-mind
type: knowledge-graph
owner: JR Moyler (Hataalii)
source: Knowledge Graph Matrix
status: to-build
updated: 2026-10-04
division: Cognara Mind
platform: Neo4j Aura + Cognara Behavioral Pattern API + PostHog
---
# KG-18 Cognara Behavioral Psychographic Graph

Custom knowledge graph 18 of 20 in the [[Knowledge Graph Matrix]]. Owner: [[Cognara Mind Division]]. Status: to build.

[[Cognara Mind Division]] is chartered, not operating. This spec is a build plan for when the division activates.

> [!warning] Consent rule
> Requires explicit user consent. No shadow profiling.

## Purpose

Human behavior knowledge graph mapping user archetypes, behavioral patterns, preference clusters, and interaction histories. Powers personalization across all Collective AI consumer products.

**Purpose:** Cross-product personalization and behavioral intelligence

## Node types

- `User`
- `Archetype`
- `BehavioralPattern`
- `Preference`
- `InteractionEvent`
- `CohortCluster`

## Edge types

- `BELONGS_TO`
- `EXHIBITS`
- `PREFERS`
- `TRIGGERED_BY`
- `GROUPED_WITH`

## Platform

Neo4j Aura + Cognara Behavioral Pattern API + PostHog

Platform tools are described in [[Knowledge Graph Tools]].

## Build prompt

```
Ingest from PostHog + Cognara Pattern API. Build archetype-to-behavior edges. Cypher: find users in 'High-Agency Explorer' archetype with churn risk > 0.6. Return top 3 intervention recommendations. Requires explicit user consent. No shadow profiling.
```

## Related

- Related MCP: [[MCP-17 Behavioral Personalization MCP]].
- Related product: [[Behavioral Intelligence Platform]].
- Division: [[Cognara Mind Division]]
- Hub: [[Knowledge Graph Matrix]]
