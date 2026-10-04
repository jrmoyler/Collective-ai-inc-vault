---
title: KG-15 Terra Axis Property Intelligence Graph
id: KG-15
tags:
- knowledge-graph
- to-build
- terra-axis
type: knowledge-graph
owner: JR Moyler (Hataalii)
source: Knowledge Graph Matrix
status: to-build
updated: 2026-10-04
division: Terra Axis
platform: Neo4j Aura + Terra Axis Helios Grid + public property data
---
# KG-15 Terra Axis Property Intelligence Graph

Custom knowledge graph 15 of 20 in the [[Knowledge Graph Matrix]]. Owner: [[Terra Axis Division]]. Status: to build.

[[Terra Axis Division]] is chartered, not operating. This spec is a build plan for when the division activates.

> [!warning] Helios Grid blocked
> [[Helios Grid]] stays blocked pending an SEC legal opinion. The matrix also requires written clearance from [[Dr. Joseph Johnson]] before any Helios Grid ingestion.

## Purpose

Smart real estate knowledge graph. Maps properties, owners, tenants, valuations, energy profiles, maintenance history, and market comparables into a connected property intelligence layer.

**Purpose:** Property portfolio intelligence and smart habitat management

## Node types

- `Property`
- `Owner`
- `Tenant`
- `Valuation`
- `EnergyProfile`
- `Maintenance`
- `Comparable`

## Edge types

- `OWNED_BY`
- `OCCUPIED_BY`
- `VALUED_AT`
- `HAS_PROFILE`
- `COMPARABLE_TO`

## Platform

Neo4j Aura + Terra Axis Helios Grid + public property data

Platform tools are described in [[Knowledge Graph Tools]].

## Build prompt

```
Ingest from Helios Grid API (HOLD: Dr. Johnson clearance required) + Zillow/CoStar APIs. Cypher: find properties with energy anomaly score > 0.7 and maintenance gap > 180 days. Flag for inspection. HOLD until written clearance from Dr. Joseph Johnson.
```

## Related

- Related products: [[Helios Grid]], [[Smart Habitat System]].
- Division: [[Terra Axis Division]]
- Hub: [[Knowledge Graph Matrix]]
