---
title: MCP-17 Behavioral Personalization MCP
id: MCP-17
tags:
- mcp-server
- to-build
- cognara-mind
type: mcp-server
owner: JR Moyler (Hataalii)
source: MCP Matrix
status: to-build
updated: 2026-10-04
division: Cognara Mind
platform: Python FastMCP + Cognara Behavioral Pattern API + PostHog + Supabase
---
# MCP-17 Behavioral Personalization MCP

Custom MCP server 17 of 20 in the [[MCP Matrix]]. Owner: [[Cognara Mind Division]]. Also used by: Signal Velocity, Hybrid Living, ZenFlow. Status: to build.

[[Cognara Mind Division]] is chartered, not operating. This spec is a build plan for when the division activates.

> [!warning] Consent rule
> Requires a user consent flag. No shadow profiling. Data collection must be disclosed.

## Purpose

Cognara Mind user behavior intelligence MCP. Provides archetype classification, behavioral pattern queries, churn risk scoring, and personalized intervention recommendations across all consumer products.

## Tools (7)

Inputs and outputs come from the build prompt. Where the matrix gives only the tool name, the cell says so.

| Tool | Input | Output / behavior |
|---|---|---|
| `classify_user_archetype` | user_id | Archetype + confidence from the behavioral graph |
| `get_behavioral_patterns` | Not specified in the matrix | Not specified in the matrix |
| `calculate_churn_risk` | user_id | Churn risk from a gradient boost model run against the recent interaction log |
| `get_intervention_recommendations` | user_id | Top 3 product interventions ranked by predicted lift |
| `get_engagement_prediction` | Not specified in the matrix | Not specified in the matrix |
| `compare_cohorts` | Not specified in the matrix | Not specified in the matrix |
| `log_interaction` | Not specified in the matrix | Not specified in the matrix |

## Auth

Requires a user consent flag in the user record. No shadow profiling: data collection must be disclosed.

## Data sources

- Cognara Behavioral Pattern API
- PostHog
- Supabase
- behavioral graph

## Platform

Python FastMCP + Cognara Behavioral Pattern API + PostHog + Supabase

## Build prompt

```
classify_user_archetype(user_id) returns archetype + confidence from behavioral graph. calculate_churn_risk(user_id) runs gradient boost model against recent interaction log. get_intervention_recommendations(user_id) returns top 3 product interventions ranked by predicted lift. Requires user consent flag in user record. No shadow profiling — data collection must be disclosed.
```

## Related

- Graph: [[KG-18 Cognara Behavioral Psychographic Graph]].
- Feeds engagement predictions to [[MCP-19 Atlas Learning MCP]].
- Division: [[Cognara Mind Division]]
- Hub: [[MCP Matrix]]
