---
title: MCP-14 Infrastructure Ops MCP
id: MCP-14
tags:
- mcp-server
- to-build
- binary-loom
type: mcp-server
owner: JR Moyler (Hataalii)
source: MCP Matrix
status: to-build
updated: 2026-10-04
division: Binary Loom
platform: Python FastMCP + Vercel API + Sentry API + GitHub API + Supabase
---
# MCP-14 Infrastructure Ops MCP

Custom MCP server 14 of 20 in the [[MCP Matrix]]. Owner: [[Binary Loom Division]]. Also used by: ZenFlow, Obsidian Arc. Status: to build.

[[Binary Loom Division]] is one of the 9 operating divisions.

## Purpose

Binary Loom DevOps intelligence MCP. Monitors deployed services, surfaces Sentry errors, retrieves build logs, triggers Vercel deployments, and provides infrastructure health summaries.

## Tools (7)

Inputs and outputs come from the build prompt. Where the matrix gives only the tool name, the cell says so.

| Tool | Input | Output / behavior |
|---|---|---|
| `get_service_health` | (none) | Vercel deployment status + Sentry error rates for all products |
| `get_error_summary` | service, period | Top 5 errors by frequency |
| `trigger_deployment` | project, branch | Calls the Vercel deploy API |
| `get_build_logs` | Not specified in the matrix | Not specified in the matrix |
| `rollback_deployment` | project, deployment_id | Reverts to the prior build |
| `get_infrastructure_graph` | Not specified in the matrix | Not specified in the matrix |
| `alert_on_anomaly` | Not specified in the matrix | Anomalies with error_rate > threshold auto-alert to the #ops Slack channel |

## Auth

Not specified in the matrix

## Data sources

- Vercel API
- Sentry API
- GitHub API
- Supabase
- Slack #ops channel

## Platform

Python FastMCP + Vercel API + Sentry API + GitHub API + Supabase

## Build prompt

```
get_service_health() aggregates Vercel deployment status + Sentry error rates for all products. get_error_summary(service, period) returns top 5 errors by frequency. trigger_deployment(project, branch) calls Vercel deploy API. rollback_deployment(project, deployment_id) reverts to prior build. All anomalies with error_rate > threshold auto-alert to #ops Slack channel.
```

## Related

- Related graph: [[KG-17 Binary Loom Infrastructure Dependency Graph]].
- Related product: [[Observability Stack]].
- Incidents: [[SOP — Incident Response]].
- Division: [[Binary Loom Division]]
- Hub: [[MCP Matrix]]
