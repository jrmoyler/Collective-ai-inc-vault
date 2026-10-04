---
title: KG-10 Signal Velocity Content Performance Graph
id: KG-10
tags:
- knowledge-graph
- to-build
- signal-velocity
type: knowledge-graph
owner: JR Moyler (Hataalii)
source: Knowledge Graph Matrix
status: to-build
updated: 2026-10-04
division: Signal Velocity
platform: Neo4j Aura + Signal Velocity Growth API + PostHog
---
# KG-10 Signal Velocity Content Performance Graph

Custom knowledge graph 10 of 20 in the [[Knowledge Graph Matrix]]. Owner: [[Signal Velocity Division]]. Status: to build.

[[Signal Velocity Division]] is one of the 9 operating divisions.

## Purpose

Cross-platform content knowledge graph. Maps content pieces, platforms, audiences, engagement events, and conversion paths. Identifies viral patterns and optimal distribution sequences.

**Purpose:** Content ROI intelligence and distribution optimization

## Node types

- `ContentPiece`
- `Platform`
- `Audience`
- `EngagementEvent`
- `ConversionPath`
- `Campaign`

## Edge types

- `PUBLISHED_ON`
- `REACHED`
- `ENGAGED_WITH`
- `CONVERTED_FROM`
- `PART_OF`

## Platform

Neo4j Aura + Signal Velocity Growth API + PostHog

Platform tools are described in [[Knowledge Graph Tools]].

## Build prompt

```
Ingest from PostHog + YouTube/TikTok/X APIs via n8n. Build Neo4j graph. Cypher: which content pieces on TikTok with >10k views drove the most Shopify conversions in last 30d? Identify content-to-conversion path length. Feed to growth agent.
```

## Related

- [[MCP-11 Growth Signal MCP]] auto-logs ad briefs to this graph.
- Ingestion runs in n8n: [[n8n Workflow Blueprint]].
- Related product: [[Growth Intelligence Platform]].
- Division: [[Signal Velocity Division]]
- Hub: [[Knowledge Graph Matrix]]
