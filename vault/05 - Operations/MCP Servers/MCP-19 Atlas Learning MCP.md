---
title: MCP-19 Atlas Learning MCP
id: MCP-19
tags:
- mcp-server
- to-build
- hybrid-living
type: mcp-server
owner: JR Moyler (Hataalii)
source: MCP Matrix
status: to-build
updated: 2026-10-04
division: Hybrid Living
platform: Python FastMCP + Hybrid Learning API + Supabase + Cognara Behavioral Pattern API
---
# MCP-19 Atlas Learning MCP

Custom MCP server 19 of 20 in the [[MCP Matrix]]. Owner: [[Hybrid Living Division]]. Also used by: ZenFlow, Cognara Mind. Status: to build.

[[Hybrid Living Division]] is one of the 9 operating divisions.

## Purpose

Hybrid Living adaptive education MCP for the Atlas platform. Provides learning path queries, student progress retrieval, lesson recommendation, and educator dashboard data.

## Tools (7)

Inputs and outputs come from the build prompt. Where the matrix gives only the tool name, the cell says so.

| Tool | Input | Output / behavior |
|---|---|---|
| `get_learning_path` | student_id | Current position in the prerequisite graph |
| `get_student_progress` | Not specified in the matrix | Not specified in the matrix |
| `recommend_next_lesson` | student_id | Recommendation combining mastery gaps + Cognara engagement prediction + prerequisite chain |
| `get_cohort_analytics` | cohort_id, period | Completion rate, mastery distribution, engagement scores |
| `assess_mastery` | Not specified in the matrix | Not specified in the matrix |
| `get_engagement_metrics` | Not specified in the matrix | Not specified in the matrix |
| `generate_lesson_brief` | topic, level | Educator-ready lesson plan from the Claude API |

## Auth

Not specified in the matrix

## Data sources

- Hybrid Learning API
- Supabase
- Cognara Behavioral Pattern API
- Claude API

## Platform

Python FastMCP + Hybrid Learning API + Supabase + Cognara Behavioral Pattern API

## Build prompt

```
get_learning_path(student_id) returns current position in prerequisite graph. recommend_next_lesson(student_id) combines mastery gaps + engagement prediction from Cognara API + prerequisite chain. get_cohort_analytics(cohort_id, period) returns completion rate, mastery distribution, engagement scores. generate_lesson_brief(topic, level) calls Claude API to produce educator-ready lesson plan.
```

## Related

- Platform: [[Atlas Platform]].
- Graph: [[KG-11 Hybrid Learning Path Knowledge Graph]].
- Division: [[Hybrid Living Division]]
- Hub: [[MCP Matrix]]
