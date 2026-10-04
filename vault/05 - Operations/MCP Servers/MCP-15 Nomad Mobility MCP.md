---
title: MCP-15 Nomad Mobility MCP
id: MCP-15
tags:
- mcp-server
- to-build
- nomad-nexus
type: mcp-server
owner: JR Moyler (Hataalii)
source: MCP Matrix
status: to-build
updated: 2026-10-04
division: Nomad Nexus
platform: Python FastMCP + Nomad Nexus Intelligence API + Teleport API + Numbeo
---
# MCP-15 Nomad Mobility MCP

Custom MCP server 15 of 20 in the [[MCP Matrix]]. Owner: [[Nomad Nexus Division]]. Also used by: ZenFlow, Aether Link. Status: to build.

[[Nomad Nexus Division]] is chartered, not operating. This spec is a build plan for when the division activates.

## Purpose

Nomad Nexus destination intelligence MCP. Provides real-time visa data, cost-of-living queries, digital nomad infrastructure scores, co-living availability, and relocation route planning.

## Tools (7)

Inputs and outputs come from the build prompt. Where the matrix gives only the tool name, the cell says so.

| Tool | Input | Output / behavior |
|---|---|---|
| `search_destinations` | from_country, preferences{} | Ranked destinations with visa, cost, infrastructure scores |
| `get_visa_requirements` | from, to | Results from IATA + government visa databases |
| `get_cost_comparison` | Not specified in the matrix | Not specified in the matrix |
| `get_nomad_score` | Not specified in the matrix | Not specified in the matrix |
| `find_coliving` | Not specified in the matrix | Not specified in the matrix |
| `plan_relocation_route` | from, to, constraints{} | Step-by-step relocation timeline with document checklist |
| `get_community_events` | city | Meetup + Nomad List local events |

## Auth

Not specified in the matrix

## Data sources

- Nomad Nexus Intelligence API
- Teleport API
- Numbeo
- IATA and government visa databases
- Meetup
- Nomad List

## Platform

Python FastMCP + Nomad Nexus Intelligence API + Teleport API + Numbeo

## Build prompt

```
search_destinations(from_country, preferences{}) returns ranked destinations with visa, cost, infrastructure scores. get_visa_requirements(from, to) queries IATA + government visa databases. plan_relocation_route(from, to, constraints{}) generates step-by-step relocation timeline with document checklist. get_community_events(city) pulls Meetup + Nomad List local events.
```

## Related

- Related graph: [[KG-09 Nomad Nexus Destination Intelligence Graph]].
- Related products: [[Visa Intelligence Database]], [[Global Housing Matching Engine]].
- Division: [[Nomad Nexus Division]]
- Hub: [[MCP Matrix]]
