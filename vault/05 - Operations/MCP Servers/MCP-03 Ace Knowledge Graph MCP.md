---
title: MCP-03 Ace Knowledge Graph MCP
id: MCP-03
tags:
- mcp-server
- to-build
- zenflow
type: mcp-server
owner: JR Moyler (Hataalii)
source: MCP Matrix
status: to-build
updated: 2026-10-04
division: ZenFlow
platform: Python FastMCP + Ace Knowledge Graph API + Neo4j Aura
---
# MCP-03 Ace Knowledge Graph MCP

Custom MCP server 03 of 20 in the [[MCP Matrix]]. Owner: [[ZenFlow Division]]. Also used by: All Divisions. Status: to build.

[[ZenFlow Division]] is one of the 9 operating divisions.

## Purpose

MCP interface to the Collective AI master entity graph in Ace. Allows agents to query entity relationships, add new nodes, traverse division graphs, and surface cross-portfolio intelligence.

## Tools (7)

Inputs and outputs come from the build prompt. Where the matrix gives only the tool name, the cell says so.

| Tool | Input | Output / behavior |
|---|---|---|
| `query_graph` | cypher_query | Results of a read-only Cypher query against Neo4j |
| `add_entity` | name, type, properties, division | Creates a node |
| `add_relationship` | from_id, to_id, type, properties | Creates an edge |
| `get_neighbors` | Not specified in the matrix | Not specified in the matrix |
| `search_entities` | Not specified in the matrix | Not specified in the matrix |
| `get_division_graph` | Not specified in the matrix | Not specified in the matrix |
| `find_path` | from_entity, to_entity | Shortest path with hop count |

## Auth

ZenFlow JWT required. Write operations require Aegis level Standard minimum.

## Data sources

- Ace Knowledge Graph API
- Neo4j Aura

## Platform

Python FastMCP + Ace Knowledge Graph API + Neo4j Aura

## Build prompt

```
query_graph(cypher_query) executes read-only Cypher against Neo4j. add_entity(name, type, properties, division) creates node. add_relationship(from_id, to_id, type, properties) creates edge. find_path(from_entity, to_entity) returns shortest path with hop count. Auth: ZenFlow JWT required. Write operations: Aegis level Standard minimum.
```

## Related

- Graph: [[KG-01 Collective AI Master Entity Graph]]. Ace is listed in [[Knowledge Graph Tools]].
- Also listed as a planned server (5+ tools) in [[Established MCP Servers]].
- Division: [[ZenFlow Division]]
- Hub: [[MCP Matrix]]
