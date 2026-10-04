---
title: KG-03 The Collective Client Intelligence Graph
id: KG-03
tags:
- knowledge-graph
- to-build
- the-collective
type: knowledge-graph
owner: JR Moyler (Hataalii)
source: Knowledge Graph Matrix
status: to-build
updated: 2026-10-04
division: The Collective
platform: Neo4j Aura + Notion sync via n8n
---
# KG-03 The Collective Client Intelligence Graph

Custom knowledge graph 03 of 20 in the [[Knowledge Graph Matrix]]. Owner: [[The Collective Division]]. Status: to build.

[[The Collective Division]] is one of the 9 operating divisions.

## Purpose

Relationship graph of clients, projects, contacts, engagement history, and contracts. Surfaces warm paths, referral networks, and upsell opportunities across client relationships.

**Purpose:** Revenue intelligence and relationship management

## Node types

- `Client`
- `Contact`
- `Project`
- `Contract`
- `Engagement`
- `Referral`
- `Revenue`

## Edge types

- `WORKS_WITH`
- `REFERRED_BY`
- `HAS_CONTRACT`
- `ENGAGED_ON`
- `UPSELL_CANDIDATE`

## Platform

Neo4j Aura + Notion sync via n8n

Platform tools are described in [[Knowledge Graph Tools]].

## Build prompt

```
Sync Notion client pipeline to Neo4j nightly via n8n. Extract REFERRED_BY edges from notes. Build Cypher query: find clients with 2+ projects not yet upsold. Surface referral network paths. Feed to account manager agents.
```

## Related

- Source data is the Notion client pipeline database (one of the 9 Notion databases).
- Sync runs in n8n: [[n8n Workflow Blueprint]].
- Related MCP: [[MCP-04 Notion Operations MCP]].
- Division: [[The Collective Division]]
- Hub: [[Knowledge Graph Matrix]]
