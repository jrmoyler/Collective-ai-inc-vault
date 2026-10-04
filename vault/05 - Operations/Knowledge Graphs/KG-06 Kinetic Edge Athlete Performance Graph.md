---
title: KG-06 Kinetic Edge Athlete Performance Graph
id: KG-06
tags:
- knowledge-graph
- to-build
- kinetic-edge
type: knowledge-graph
owner: JR Moyler (Hataalii)
source: Knowledge Graph Matrix
status: to-build
updated: 2026-10-04
division: Kinetic Edge
platform: Graphiti (Zep) + Supabase + Apex Performance API
---
# KG-06 Kinetic Edge Athlete Performance Graph

Custom knowledge graph 06 of 20 in the [[Knowledge Graph Matrix]]. Owner: [[Kinetic Edge Division]]. Status: to build.

[[Kinetic Edge Division]] is chartered, not operating. This spec is a build plan for when the division activates.

## Purpose

Temporal performance graph for each athlete. Nodes are training sessions, biometric readings, competitions, and recovery events. Edges track performance trajectories and intervention impact.

**Purpose:** Athlete performance trajectory and coaching intelligence

## Node types

- `Athlete`
- `Session`
- `Biometric`
- `Competition`
- `Intervention`
- `Injury`
- `Recovery`

## Edge types

- `COMPETED_IN`
- `TRAINED_ON`
- `MEASURED_AT`
- `INTERVENED_WITH`
- `RECOVERED_FROM`

## Platform

Graphiti (Zep) + Supabase + Apex Performance API

Platform tools are described in [[Knowledge Graph Tools]].

## Build prompt

```
On each Apex API session POST, write nodes to Graphiti. Build temporal queries: show performance trend for athlete_id over last 90 days. Identify sessions that preceded injury events. Score intervention effectiveness. Feed to coaching agent.
```

## Related

- Related MCP: [[MCP-07 Athlete Performance MCP]].
- Related product: [[Athlete Digital Twin]].
- Division: [[Kinetic Edge Division]]
- Hub: [[Knowledge Graph Matrix]]
