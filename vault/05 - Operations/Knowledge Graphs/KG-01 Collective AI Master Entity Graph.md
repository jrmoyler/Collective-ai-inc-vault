---
title: KG-01 Collective AI Master Entity Graph
id: KG-01
tags:
- knowledge-graph
- to-build
- zenflow
type: knowledge-graph
owner: JR Moyler (Hataalii)
source: Knowledge Graph Matrix
status: to-build
updated: 2026-10-04
division: ZenFlow
platform: Neo4j Aura + LlamaIndex ingestion pipeline
---
# KG-01 Collective AI Master Entity Graph

Custom knowledge graph 01 of 20 in the [[Knowledge Graph Matrix]]. Owner: [[ZenFlow Division]]. Status: to build.

[[ZenFlow Division]] is one of the 9 operating divisions.

## Purpose

The central enterprise knowledge graph connecting all 20 departments, 600 agents, 115 products, 146 services, 262 tools, Synergy Nodes, and key personnel into one traversable graph. ZENITH uses this for cross-division reasoning.

**Purpose:** Cross-division intelligence and agent routing context

## Node types

- `Division`
- `Agent`
- `Product`
- `Service`
- `Tool`
- `Person`
- `Synergy Node`
- `API`
- `MCP`

## Edge types

- `OWNS`
- `USES_TOOL`
- `SERVES_DEPT`
- `DEPENDS_ON`
- `MANAGED_BY`
- `GATES`

## Platform

Neo4j Aura + LlamaIndex ingestion pipeline

Platform tools are described in [[Knowledge Graph Tools]].

## Build prompt

```
Ingest all source documents via LlamaIndex. Extract entities and relationships. Load to Neo4j Aura. Build Cypher queries for: which agents use which tools, which products belong to which divisions, which Synergy Nodes span which departments. Expose read API to ZENITH.
```

## Related

- [[ZENITH]] is the main consumer.
- [[Synergy Node Handbook]] defines the Synergy Nodes.
- MCP access: [[MCP-03 Ace Knowledge Graph MCP]].
- Division: [[ZenFlow Division]]
- Hub: [[Knowledge Graph Matrix]]
