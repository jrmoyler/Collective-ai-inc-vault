---
title: MCP-07 Athlete Performance MCP
id: MCP-07
tags:
- mcp-server
- to-build
- kinetic-edge
type: mcp-server
owner: JR Moyler (Hataalii)
source: MCP Matrix
status: to-build
updated: 2026-10-04
division: Kinetic Edge
platform: Python FastMCP + Apex Performance API + Supabase athlete DB
---
# MCP-07 Athlete Performance MCP

Custom MCP server 07 of 20 in the [[MCP Matrix]]. Owner: [[Kinetic Edge Division]]. Also used by: Vital Helix, ZenFlow. Status: to build.

[[Kinetic Edge Division]] is chartered, not operating. This spec is a build plan for when the division activates.

## Purpose

Kinetic Edge performance intelligence MCP. Exposes athlete biometric retrieval, session analysis, training load queries, injury risk scoring, and coaching recommendation generation.

## Tools (7)

Inputs and outputs come from the build prompt. Where the matrix gives only the tool name, the cell says so.

| Tool | Input | Output / behavior |
|---|---|---|
| `get_athlete_profile` | athlete_id | Full profile + current readiness score |
| `get_session_data` | athlete_id, date_range | Biometric streams |
| `calculate_training_load` | athlete_id, days | ACWR (acute:chronic workload ratio) |
| `get_injury_risk` | (none listed) | risk_score + contributing_factors |
| `generate_coaching_brief` | Not specified in the matrix | Not specified in the matrix |
| `compare_athletes` | Not specified in the matrix | Not specified in the matrix |
| `get_team_readiness` | Not specified in the matrix | Not specified in the matrix |

## Auth

Coach JWT or Athlete JWT. An athlete can only access their own data.

## Data sources

- Apex Performance API
- Supabase athlete DB

## Platform

Python FastMCP + Apex Performance API + Supabase athlete DB

## Build prompt

```
get_athlete_profile(athlete_id) returns full profile + current readiness score. get_session_data(athlete_id, date_range) returns biometric streams. calculate_training_load(athlete_id, days) returns ACWR (acute:chronic workload ratio). get_injury_risk() returns risk_score + contributing_factors. Auth: Coach JWT or Athlete JWT (athlete can only access own data).
```

## Related

- Related graph: [[KG-06 Kinetic Edge Athlete Performance Graph]].
- Related product: [[Performance Science Platform]].
- Division: [[Kinetic Edge Division]]
- Hub: [[MCP Matrix]]
