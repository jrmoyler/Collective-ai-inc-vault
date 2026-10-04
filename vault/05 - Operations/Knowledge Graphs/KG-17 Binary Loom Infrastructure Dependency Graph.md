---
title: KG-17 Binary Loom Infrastructure Dependency Graph
id: KG-17
tags:
- knowledge-graph
- to-build
- binary-loom
type: knowledge-graph
owner: JR Moyler (Hataalii)
source: Knowledge Graph Matrix
status: to-build
updated: 2026-10-04
division: Binary Loom
platform: Neo4j Aura + GitHub API + Sentry API
---
# KG-17 Binary Loom Infrastructure Dependency Graph

Custom knowledge graph 17 of 20 in the [[Knowledge Graph Matrix]]. Owner: [[Binary Loom Division]]. Status: to build.

[[Binary Loom Division]] is one of the 9 operating divisions.

## Purpose

Developer infrastructure knowledge graph. Maps services, dependencies, APIs, databases, and deployment pipelines into a traversable architecture graph for impact analysis and security audits.

**Purpose:** Architecture impact analysis and security audit

## Node types

- `Service`
- `Dependency`
- `API`
- `Database`
- `Pipeline`
- `DeploymentUnit`
- `SecurityBoundary`

## Edge types

- `DEPENDS_ON`
- `EXPOSES`
- `WRITES_TO`
- `DEPLOYED_BY`
- `SECURED_BY`

## Platform

Neo4j Aura + GitHub API + Sentry API

Platform tools are described in [[Knowledge Graph Tools]].

## Build prompt

```
Ingest from GitHub (repo manifests, package.json, requirements.txt) + Sentry error map. Cypher: which services have a critical Sentry error that also depend on a service with a 3+ day deployment gap? Flag for Binary Loom Director. Auto-update on each GitHub push.
```

## Related

- Consumer: [[Director_Binary_Loom]].
- [[MCP-05 GitHub Intelligence MCP]] writes flag results here; [[MCP-14 Infrastructure Ops MCP]] exposes get_infrastructure_graph.
- Feeds tech stack data to [[KG-12 Obsidian Arc Threat Intelligence Graph]] and [[MCP-16 Threat Intelligence MCP]].
- Division: [[Binary Loom Division]]
- Hub: [[Knowledge Graph Matrix]]
