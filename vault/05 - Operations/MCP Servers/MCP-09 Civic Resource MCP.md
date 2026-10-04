---
title: MCP-09 Civic Resource MCP
id: MCP-09
tags:
- mcp-server
- to-build
- civic-core
type: mcp-server
owner: JR Moyler (Hataalii)
source: MCP Matrix
status: to-build
updated: 2026-10-04
division: Civic Core
platform: Python FastMCP + Civic Core Resource Matching API + 211 data + Supabase
---
# MCP-09 Civic Resource MCP

Custom MCP server 09 of 20 in the [[MCP Matrix]]. Owner: [[Civic Core Division]]. Also used by: ZenFlow, Vital Helix. Status: to build.

[[Civic Core Division]] is chartered, not operating. This spec is a build plan for when the division activates.

> [!note] Superseded
> The matrix states that Stanley Constant holds an independent veto here. That veto was removed on Oct 1, 2026. The line is kept as written in the source. See [[Civic Core Fiduciary Veto]] and [[Stanley Constant]].

## Purpose

Civic Core community resource MCP. Enables agents and community assistants to query available programs, match needs to services, find equity gaps, and generate grant application data.

## Tools (7)

Inputs and outputs come from the build prompt. Where the matrix gives only the tool name, the cell says so.

| Tool | Input | Output / behavior |
|---|---|---|
| `find_programs` | zip, needs_list | Ranked program matches |
| `match_needs_to_services` | profile | Result of the full matching algorithm |
| `get_equity_gaps` | geography | Service coverage analysis |
| `get_program_details` | Not specified in the matrix | Not specified in the matrix |
| `log_referral` | Not specified in the matrix | Not specified in the matrix |
| `generate_grant_data` | program_id, period | Aggregated impact metrics for a grant narrative |
| `get_coverage_map` | Not specified in the matrix | Not specified in the matrix |

## Auth

All operations require a consent flag. The matrix says the Stanley Constant independent veto path is preserved (removed Oct 1, 2026).

## Data sources

- Civic Core Resource Matching API
- 211 data
- Supabase

## Platform

Python FastMCP + Civic Core Resource Matching API + 211 data + Supabase

## Build prompt

```
find_programs(zip, needs_list) returns ranked program matches. match_needs_to_services(profile) runs full matching algorithm. get_equity_gaps(geography) returns service coverage analysis. generate_grant_data(program_id, period) aggregates impact metrics for grant narrative. All operations require consent flag. Stanley Constant independent veto path preserved.
```

## Related

- Related graph: [[KG-16 Civic Core Community Resource Graph]].
- Division: [[Civic Core Division]]
- Hub: [[MCP Matrix]]
