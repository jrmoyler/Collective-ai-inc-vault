---
title: KG-20 Nexus Labs Content Narrative Graph
id: KG-20
tags:
- knowledge-graph
- to-build
- nexus-labs
type: knowledge-graph
owner: JR Moyler (Hataalii)
source: Knowledge Graph Matrix
status: to-build
updated: 2026-10-04
division: Nexus Labs
platform: Neo4j Aura + Nexus Labs Content Intelligence API
---
# KG-20 Nexus Labs Content Narrative Graph

Custom knowledge graph 20 of 20 in the [[Knowledge Graph Matrix]]. Owner: [[Nexus Labs Division]]. Status: to build.

[[Nexus Labs Division]] is one of the 9 operating divisions.

## Purpose

Creative knowledge graph mapping content narratives, characters, storylines, brand themes, and audience resonance data across all Nexus Labs media properties.

**Purpose:** Creative continuity and audience-aligned storytelling

## Node types

- `ContentPiece`
- `Narrative`
- `Character`
- `Theme`
- `AudienceSegment`
- `ResonanceScore`

## Edge types

- `FEATURES`
- `EXPLORES_THEME`
- `RESONATES_WITH`
- `SEQUEL_OF`
- `PART_OF_SERIES`

## Platform

Neo4j Aura + Nexus Labs Content Intelligence API

Platform tools are described in [[Knowledge Graph Tools]].

## Build prompt

```
Ingest from Nexus Labs content database + YouTube/TikTok analytics. Build narrative continuity graph. Cypher: which themes have >75 resonance with 18-34 audience AND have not been covered in last 60 days? Surface content opportunities. Feed to creative director agent.
```

## Related

- Consumer: [[Creative_Director]] agent.
- Related MCP: [[MCP-08 Content Intelligence MCP]].
- Related product: [[Original IP Library]].
- Division: [[Nexus Labs Division]]
- Hub: [[Knowledge Graph Matrix]]
