---
title: MCP-02 Knowledge Keeper MCP
id: MCP-02
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
platform: Python FastMCP + Supabase + pgvector + OpenAI embeddings
---
# MCP-02 Knowledge Keeper MCP

Custom MCP server 02 of 20 in the [[MCP Matrix]]. Owner: [[ZenFlow Division]]. Also used by: All 20 Divisions. Status: to build.

[[ZenFlow Division]] is one of the 9 operating divisions.

## Purpose

Persistent shared memory MCP for all 600 ZenFlow agents. Stores decisions, tool call results, sources, and confidence scores. Retrieves by semantic similarity using pgvector.

## Tools (6)

Inputs and outputs come from the build prompt. Where the matrix gives only the tool name, the cell says so.

| Tool | Input | Output / behavior |
|---|---|---|
| `store_memory` | agent_id, content, metadata (Aegis level required in metadata) | Generates an embedding with text-embedding-3-small and upserts it to the pgvector table |
| `retrieve_memory` | query, agent_id, top_k | Cosine similarity matches, with metadata filters |
| `list_agent_memories` | Not specified in the matrix | Not specified in the matrix |
| `delete_memory` | Not specified in the matrix | Not specified in the matrix |
| `search_by_division` | Not specified in the matrix | Not specified in the matrix |
| `get_audit_log` | Not specified in the matrix | Not specified in the matrix. All reads and writes append to the audit_log table. |

## Auth

JWT validated per agent. Aegis level required in metadata. Every read and write appends to audit_log.

## Data sources

- Supabase pgvector table
- audit_log table
- OpenAI text-embedding-3-small

## Platform

Python FastMCP + Supabase + pgvector + OpenAI embeddings

## Build prompt

```
store_memory(agent_id, content, metadata) generates embedding via text-embedding-3-small, upserts to pgvector table. retrieve_memory(query, agent_id, top_k) cosine similarity search with metadata filters. All reads/writes append to audit_log table. Aegis level required in metadata. JWT validated per agent.
```

## Related

- Product: [[Knowledge Keeper]]. Agent: [[Knowledge_Keeper]].
- Fed by [[KG-02 ZenFlow Agent Decision Graph]].
- Division: [[ZenFlow Division]]
- Hub: [[MCP Matrix]]
