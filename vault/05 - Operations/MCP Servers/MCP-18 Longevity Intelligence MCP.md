---
title: MCP-18 Longevity Intelligence MCP
id: MCP-18
tags:
- mcp-server
- to-build
- eon-core
type: mcp-server
owner: JR Moyler (Hataalii)
source: MCP Matrix
status: to-build
updated: 2026-10-04
division: Eon Core
platform: Python FastMCP + Eon Core Longevity API + PubMed MCP + Supabase
---
# MCP-18 Longevity Intelligence MCP

Custom MCP server 18 of 20 in the [[MCP Matrix]]. Owner: [[Eon Core Division]]. Also used by: Vital Helix, ZenFlow. Status: to build.

[[Eon Core Division]] is chartered, not operating. This spec is a build plan for when the division activates.

## Purpose

Eon Core longevity science MCP. Provides biological age assessment, intervention protocol queries, longevity literature search, and population benchmark comparisons.

## Tools (7)

Inputs and outputs come from the build prompt. Where the matrix gives only the tool name, the cell says so.

| Tool | Input | Output / behavior |
|---|---|---|
| `assess_biological_age` | user_id | Result from the Eon Core Longevity API |
| `get_longevity_protocol` | biological_age, goals | Personalized protocol from the evidence-based intervention database |
| `search_longevity_literature` | query | Peer-reviewed research via the PubMed MCP |
| `get_population_benchmark` | Not specified in the matrix | Not specified in the matrix |
| `track_age_trajectory` | Not specified in the matrix | Trajectory from the Graphiti temporal graph; flags a biological age increase over 3 months for immediate protocol review |
| `recommend_intervention` | Not specified in the matrix | Not specified in the matrix |
| `get_biomarker_targets` | Not specified in the matrix | Not specified in the matrix |

## Auth

Not specified in the matrix

## Data sources

- Eon Core Longevity API
- PubMed MCP
- Supabase
- Graphiti temporal graph

## Platform

Python FastMCP + Eon Core Longevity API + PubMed MCP + Supabase

## Build prompt

```
assess_biological_age(user_id) calls Eon Core Longevity API. get_longevity_protocol(biological_age, goals) generates personalized protocol from evidence-based intervention database. search_longevity_literature(query) calls PubMed MCP for peer-reviewed research. Track trajectory via Graphiti temporal graph — flag biological age increase over 3 months for immediate protocol review.
```

## Related

- Graph: [[KG-19 Eon Core Longevity Biomarker Graph]].
- Related products: [[BioAge Engine]], [[Longevity Research Intelligence]].
- Division: [[Eon Core Division]]
- Hub: [[MCP Matrix]]
