---
title: KG-09 Nomad Nexus Destination Intelligence Graph
id: KG-09
tags:
- knowledge-graph
- to-build
- nomad-nexus
type: knowledge-graph
owner: JR Moyler (Hataalii)
source: Knowledge Graph Matrix
status: to-build
updated: 2026-10-04
division: Nomad Nexus
platform: Neo4j Aura + Nomad Nexus Intelligence API + public datasets
---
# KG-09 Nomad Nexus Destination Intelligence Graph

Custom knowledge graph 09 of 20 in the [[Knowledge Graph Matrix]]. Owner: [[Nomad Nexus Division]]. Status: to build.

[[Nomad Nexus Division]] is chartered, not operating. This spec is a build plan for when the division activates.

## Purpose

Global destination relationship graph mapping cities, countries, visa policies, cost-of-living, nomad infrastructure, safety scores, and community hubs into a connected mobility intelligence layer.

**Purpose:** Global mobility intelligence and relocation path optimization

## Node types

- `City`
- `Country`
- `VisaPolicy`
- `CostIndex`
- `NomadHub`
- `SafetyScore`
- `Connectivity`

## Edge types

- `LOCATED_IN`
- `REQUIRES_VISA`
- `CONNECTED_TO`
- `HOSTS`
- `RATED_AS`

## Platform

Neo4j Aura + Nomad Nexus Intelligence API + public datasets

Platform tools are described in [[Knowledge Graph Tools]].

## Build prompt

```
Seed from Numbeo, Nomad List, Teleport APIs. Build Neo4j graph. Cypher query: find top 5 cities reachable from US with visa-free stay > 90d, cost index < 60, internet score > 80, nomad community present. Expose via Nomad Nexus Intelligence API.
```

## Related

- Related MCP: [[MCP-15 Nomad Mobility MCP]].
- Related products: [[Nomad Nexus Platform]], [[Visa Intelligence Database]].
- Division: [[Nomad Nexus Division]]
- Hub: [[Knowledge Graph Matrix]]
