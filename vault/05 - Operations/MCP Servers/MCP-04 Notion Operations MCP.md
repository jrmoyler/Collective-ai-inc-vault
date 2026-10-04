---
title: MCP-04 Notion Operations MCP
id: MCP-04
tags:
- mcp-server
- to-build
- the-collective
type: mcp-server
owner: JR Moyler (Hataalii)
source: MCP Matrix
status: to-build
updated: 2026-10-04
division: The Collective
platform: Python FastMCP + Notion API + division database IDs config
---
# MCP-04 Notion Operations MCP

Custom MCP server 04 of 20 in the [[MCP Matrix]]. Owner: [[The Collective Division]]. Also used by: ZenFlow, All Divisions. Status: to build.

[[The Collective Division]] is one of the 9 operating divisions.

## Purpose

Extended Notion MCP optimized for Collective AI internal ops. Adds division-specific database queries, client pipeline CRUD, task management, and structured knowledge retrieval beyond the base Notion MCP.

## Tools (7)

Inputs and outputs come from the build prompt. Where the matrix gives only the tool name, the cell says so.

| Tool | Input | Output / behavior |
|---|---|---|
| `get_client_pipeline` | status, division | Filtered records from the Notion CRM database |
| `update_client_stage` | client_id, stage | Updates deal status |
| `create_task` | title, assignee, division, due_date | Creates a task in the tracker |
| `get_division_wiki` | Not specified in the matrix | Not specified in the matrix |
| `log_agent_decision` | agent_id, decision, sources | Appends to the decision log database |
| `search_by_division` | Not specified in the matrix | Not specified in the matrix |
| `get_open_tasks` | Not specified in the matrix | Not specified in the matrix |

## Auth

Not specified in the matrix. All database IDs live in env config.

## Data sources

- Notion API: CRM / client pipeline, task tracker, division wikis, decision log databases

## Platform

Python FastMCP + Notion API + division database IDs config

## Build prompt

```
get_client_pipeline(status, division) queries Notion CRM database with filters. update_client_stage(client_id, stage) updates deal status. create_task(title, assignee, division, due_date) creates task in tracker. log_agent_decision(agent_id, decision, sources) appends to decision log database. All database IDs stored in env config.
```

## Related

- Extends the base Notion MCP listed in [[Established MCP Servers]]. Notion is the 9-database team hub in [[Knowledge Graph Tools]].
- Related graph: [[KG-03 The Collective Client Intelligence Graph]].
- See also [[Airtable Operations Hub]].
- Division: [[The Collective Division]]
- Hub: [[MCP Matrix]]
