---
title: ZenFlow Master Blueprint
tags:
- zenflow
- architecture
type: spec
owner: JR Moyler (Hataalii)
updated: 2026-10-04
---
# ZenFlow Master Blueprint

ZenFlow is the central nervous system of Collective AI. Every division runs a 30-agent cluster under one Director, all routed through [[ZENITH]].

## Scale
| Measure | Current (Oct 2026) | Superseded |
|---|---|---|
| Agents | 600 across 20 divisions | ~450 across 15 |
| Synergy Nodes | 20 across 4 phases | — |
| Phase 1 blueprints | 27 | — |
| Runtime cost target | ~$0.08 per session-hour | — |

## Stack
FastAPI, PostgreSQL 15, Redis 7, Docker, Kubernetes (AWS EKS), LangGraph. Orchestration through n8n ([[n8n Workflow Blueprint]]). Lattice documented in the [[Airtable Operations Hub]].

## Tiers
See [[Agent Tier Registry]]. Tier 0.5 is [[HATAALII]], above ZENITH and below JR.

## Governance
Every output carries an Aegis clearance. See [[Aegis Protocol Spec]].

## Linked
- [[001 — ZenFlow MOC]]
- [[ZenFlow Division]]
- [[ZenFlow Runbook]]
