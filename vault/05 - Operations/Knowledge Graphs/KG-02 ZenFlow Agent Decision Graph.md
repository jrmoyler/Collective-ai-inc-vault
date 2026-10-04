---
title: KG-02 ZenFlow Agent Decision Graph
id: KG-02
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
platform: Graphiti (Zep) + Supabase + pgvector
---
# KG-02 ZenFlow Agent Decision Graph

Custom knowledge graph 02 of 20 in the [[Knowledge Graph Matrix]]. Owner: [[ZenFlow Division]]. Status: to build.

[[ZenFlow Division]] is one of the 9 operating divisions.

## Purpose

Knowledge graph of every ZenFlow agent decision log. Nodes are decisions, tools called, inputs, outputs, and confidence scores. Edges track causal chains across multi-step agent runs.

**Purpose:** Agent auditability, debugging, and ZENITH oversight

## Node types

- `Decision`
- `ToolCall`
- `Agent`
- `Input`
- `Output`
- `Error`
- `AegisCheck`

## Edge types

- `TRIGGERED`
- `CALLED_TOOL`
- `PRODUCED`
- `ESCALATED_TO`
- `REVIEWED_BY`

## Platform

Graphiti (Zep) + Supabase + pgvector

Platform tools are described in [[Knowledge Graph Tools]].

## Build prompt

```
On each agent run, emit structured decision events to Graphiti. Store agent_id, task, tools_called, outputs, aegis_level, timestamp. Query: trace a decision chain across agents. Flag divergence from expected behavior. Feed to Knowledge Keeper.
```

## Related

- Feeds [[Knowledge Keeper]] and the [[Knowledge_Keeper]] agent.
- AegisCheck nodes follow [[Aegis Protocol Spec]].
- Related MCP: [[MCP-02 Knowledge Keeper MCP]].
- Division: [[ZenFlow Division]]
- Hub: [[Knowledge Graph Matrix]]
