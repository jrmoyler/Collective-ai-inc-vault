---
title: KG-14 VectorShift Logistics Intelligence Graph
id: KG-14
tags:
- knowledge-graph
- to-build
- vectorshift
type: knowledge-graph
owner: JR Moyler (Hataalii)
source: Knowledge Graph Matrix
status: to-build
updated: 2026-10-04
division: VectorShift
platform: Neo4j Aura + VectorShift Route Optimization API + HERE API
---
# KG-14 VectorShift Logistics Intelligence Graph

Custom knowledge graph 14 of 20 in the [[Knowledge Graph Matrix]]. Owner: [[VectorShift Division]]. Status: to build.

[[VectorShift Division]] is chartered, not operating. This spec is a build plan for when the division activates.

## Purpose

Autonomous logistics network graph. Maps delivery nodes, routes, fleet units, geofences, traffic conditions, and delivery outcomes into a real-time routing intelligence layer.

**Purpose:** Last-mile logistics route intelligence

## Node types

- `DeliveryNode`
- `Route`
- `FleetUnit`
- `Geofence`
- `TrafficCondition`
- `DeliveryOutcome`

## Edge types

- `CONNECTS`
- `TRAVELS`
- `BLOCKED_BY`
- `COMPLETED`
- `OPTIMIZED_BY`

## Platform

Neo4j Aura + VectorShift Route Optimization API + HERE API

Platform tools are described in [[Knowledge Graph Tools]].

## Build prompt

```
Ingest from VectorShift Route API + HERE traffic. Build route graph. Cypher: find fastest route from Columbus hub to 50 delivery nodes avoiding active geofences and traffic incidents. Return sequence with ETA per stop.
```

## Related

- Related product: [[Route Intelligence Platform]].
- Division: [[VectorShift Division]]
- Hub: [[Knowledge Graph Matrix]]
