---
title: KG-12 Obsidian Arc Threat Intelligence Graph
id: KG-12
tags:
- knowledge-graph
- to-build
- obsidian-arc
type: knowledge-graph
owner: JR Moyler (Hataalii)
source: Knowledge Graph Matrix
status: to-build
updated: 2026-10-04
division: Obsidian Arc
platform: AWS Neptune + MISP + NVD API
---
# KG-12 Obsidian Arc Threat Intelligence Graph

Custom knowledge graph 12 of 20 in the [[Knowledge Graph Matrix]]. Owner: [[Obsidian Arc Division]]. Status: to build.

[[Obsidian Arc Division]] is one of the 9 operating divisions.

## Purpose

Unified cyber threat knowledge graph. Nodes are threat actors, CVEs, attack vectors, affected assets, and mitigation actions. Edges track threat propagation and defense chain.

**Purpose:** Cyber threat situational awareness and automated defense routing

## Node types

- `ThreatActor`
- `CVE`
- `AttackVector`
- `AffectedAsset`
- `MitigationAction`
- `Incident`

## Edge types

- `EXPLOITS`
- `AFFECTS`
- `MITIGATED_BY`
- `PRECEDED`
- `RELATED_TO`

## Platform

AWS Neptune + MISP + NVD API

Platform tools are described in [[Knowledge Graph Tools]].

## Build prompt

```
Ingest MISP threat intel + NVD CVE feed into Neptune. Gremlin query: which CVEs affect Collective AI's current tech stack (from Binary Loom manifest) and have active exploit code in wild? Return priority list. Feed to Obsidian Arc Director agent.
```

## Related

- Consumer: [[Director_Obsidian_Arc]].
- Tech stack input comes from [[KG-17 Binary Loom Infrastructure Dependency Graph]].
- Related MCP: [[MCP-16 Threat Intelligence MCP]].
- Related product: [[Cyber Threat Intelligence Platform]].
- Division: [[Obsidian Arc Division]]
- Hub: [[Knowledge Graph Matrix]]
