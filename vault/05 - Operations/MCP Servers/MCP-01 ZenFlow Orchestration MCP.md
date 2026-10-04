---
title: MCP-01 ZenFlow Orchestration MCP
id: MCP-01
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
platform: Python FastMCP + FastAPI on Railway + Supabase agent registry
---
# MCP-01 ZenFlow Orchestration MCP

Custom MCP server 01 of 20 in the [[MCP Matrix]]. Owner: [[ZenFlow Division]]. Also used by: All 20 Divisions. Status: to build.

[[ZenFlow Division]] is one of the 9 operating divisions.

## Purpose

Master internal MCP server that ZENITH and all Division Directors use to dispatch tasks, query agent registry, check Aegis status, and route multi-agent workflows across the lattice.

## Tools (7)

Inputs and outputs come from the build prompt. Where the matrix gives only the tool name, the cell says so.

| Tool | Input | Output / behavior |
|---|---|---|
| `dispatch_task` | agent_id, task, division, aegis_level | Validates JWT, checks the HOLD-001 list, routes the task to an n8n webhook |
| `get_agent_status` | agent_id | Agent status from the Supabase agent registry |
| `check_aegis_hold` | product_id | Hold status and required clearance |
| `list_active_agents` | Not specified in the matrix | Not specified in the matrix |
| `route_to_division` | Not specified in the matrix | Not specified in the matrix |
| `get_workflow_trace` | Not specified in the matrix | Not specified in the matrix |
| `escalate_to_zenith` | Not specified in the matrix | Not specified in the matrix |

## Auth

JWT validated on dispatch_task. Tasks are checked against the HOLD-001 list.

## Data sources

- Supabase agent registry
- n8n webhooks
- HOLD-001 list
- Aegis status

## Platform

Python FastMCP + FastAPI on Railway + Supabase agent registry

## Build prompt

```
Build FastMCP server with @mcp.tool() decorated functions. dispatch_task(agent_id, task, division, aegis_level) validates JWT, checks HOLD-001 list, routes to n8n webhook. get_agent_status(agent_id) queries Supabase agent registry. check_aegis_hold(product_id) returns hold status and required clearance. Mount on ZenFlow runtime.
```

## Related

- Users: [[ZENITH]] and all Division Directors.
- Aegis rules: [[Aegis Protocol Spec]]. Workflows: [[n8n Workflow Blueprint]].
- Runtime: [[ZenFlow API — FastAPI Docs]].
- Division: [[ZenFlow Division]]
- Hub: [[MCP Matrix]]
