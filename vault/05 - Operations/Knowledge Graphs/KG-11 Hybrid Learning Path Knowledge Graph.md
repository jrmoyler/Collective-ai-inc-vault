---
title: KG-11 Hybrid Learning Path Knowledge Graph
id: KG-11
tags:
- knowledge-graph
- to-build
- hybrid-living
type: knowledge-graph
owner: JR Moyler (Hataalii)
source: Knowledge Graph Matrix
status: to-build
updated: 2026-10-04
division: Hybrid Living
platform: Neo4j Aura + Hybrid Learning API
---
# KG-11 Hybrid Learning Path Knowledge Graph

Custom knowledge graph 11 of 20 in the [[Knowledge Graph Matrix]]. Owner: [[Hybrid Living Division]]. Status: to build.

[[Hybrid Living Division]] is one of the 9 operating divisions.

## Purpose

Adaptive education graph for the Atlas platform. Maps learning objectives, lessons, student mastery levels, prerequisite chains, and skill clusters into a dynamic curriculum graph.

**Purpose:** Adaptive curriculum personalization

## Node types

- `Student`
- `Lesson`
- `Objective`
- `MasteryLevel`
- `Prerequisite`
- `SkillCluster`
- `Cohort`

## Edge types

- `COMPLETED`
- `REQUIRES`
- `MEASURES`
- `PART_OF`
- `ASSIGNED_TO`

## Platform

Neo4j Aura + Hybrid Learning API

Platform tools are described in [[Knowledge Graph Tools]].

## Build prompt

```
Ingest from Hybrid Learning API. Build prerequisite chains for all lessons. Cypher: find student_id's next lesson given mastery_levels and prerequisite graph. Return ordered learning path. Feed to Atlas tutoring agent.
```

## Related

- Platform: [[Atlas Platform]]; tutoring agent context in [[Atlas_Onboarding]].
- Related MCP: [[MCP-19 Atlas Learning MCP]].
- Division: [[Hybrid Living Division]]
- Hub: [[Knowledge Graph Matrix]]
