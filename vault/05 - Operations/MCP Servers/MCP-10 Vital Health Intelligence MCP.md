---
title: MCP-10 Vital Health Intelligence MCP
id: MCP-10
tags:
- mcp-server
- to-build
- vital-helix
type: mcp-server
owner: JR Moyler (Hataalii)
source: MCP Matrix
status: to-build
updated: 2026-10-04
division: Vital Helix
platform: Python FastMCP + Bio-Digital Twin API + Supabase HIPAA instance
---
# MCP-10 Vital Health Intelligence MCP

Custom MCP server 10 of 20 in the [[MCP Matrix]]. Owner: [[Vital Helix Division]]. Also used by: Eon Core, Juris Guard, ZenFlow. Status: to build.

[[Vital Helix Division]] is chartered, not operating. This spec is a build plan for when the division activates.

## Purpose

Vital Helix health data MCP. Provides HIPAA-aware access to Bio-Digital Twin data, biomarker queries, intervention recommendations, and clinical referral routing. All clinical outputs require Juris Guard clearance.

## Tools (7)

Inputs and outputs come from the build prompt. Where the matrix gives only the tool name, the cell says so.

| Tool | Input | Output / behavior |
|---|---|---|
| `get_health_summary` | user_id | Current vitals, risk flags, biological age |
| `query_biomarkers` | user_id, markers_list | Values with reference ranges |
| `get_intervention_recommendations` | Not specified in the matrix | Not specified in the matrix |
| `calculate_biological_age` | user_id | Runs the longevity model |
| `get_clinical_referral` | Not specified in the matrix | Not specified in the matrix |
| `log_health_event` | Not specified in the matrix | Not specified in the matrix |
| `get_risk_flags` | Not specified in the matrix | Not specified in the matrix |

## Auth

HIPAA-aware access. Outputs with clinical_review_required=True go to the Juris Guard compliance API and are blocked from patient display until cleared.

## Data sources

- Bio-Digital Twin API
- Supabase HIPAA instance
- Juris Guard compliance API

## Platform

Python FastMCP + Bio-Digital Twin API + Supabase HIPAA instance

## Build prompt

```
get_health_summary(user_id) returns current vitals, risk flags, biological age. query_biomarkers(user_id, markers_list) returns values with reference ranges. calculate_biological_age(user_id) runs longevity model. All outputs where clinical_review_required=True are routed to Juris Guard compliance API and blocked from patient display until cleared.
```

## Related

- Data source: [[Bio-Digital Twin]].
- Related graph: [[KG-07 Vital Helix Bio-Digital Twin Graph]].
- Related product: [[Clinical Intelligence Layer]].
- Division: [[Vital Helix Division]]
- Hub: [[MCP Matrix]]
