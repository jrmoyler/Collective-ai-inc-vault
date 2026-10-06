---
title: ZenFlow Master Blueprint
tags:
- zenflow
- architecture
type: spec
owner: JR Moyler (Hataalii)
updated: 2026-10-06
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

## Complete foundry engineering reference
The configuration source defines service, database, queue, endpoint, deployment, observability, release and security contracts. Targets in that source require deployment evidence.

- [[ZenFlow Foundry — Service and Routing Architecture]]
- [[ZenFlow Foundry — PostgreSQL Schema Contracts]]
- [[ZenFlow Foundry — Redis Queue and Cache Contracts]]
- [[ZenFlow Foundry — FastAPI Endpoint Contracts]]
- [[ZenFlow Foundry — Model Client and Cost Configuration]]
- [[ZenFlow Foundry — Container and Cluster Configuration]]
- [[ZenFlow Foundry — Metrics Alerts and Dashboards]]
- [[ZenFlow Foundry — Release and Rollback Pipeline]]
- [[ZenFlow Foundry — Security and Authentication Architecture]]
- [[ZenFlow Foundry — Production Launch Checklist]]

## Source
- [Collective_AI_Agent_Foundry_Config_Spec.pdf](https://drive.google.com/file/d/1uDkAakG4a5U7_yer5VW6WWY1YzRZmfiO/view?usp=drivesdk) — Sections 01–10. Read in full from Drive on 2026-10-06.

### Source records
- [Collective_AI_Agent_Foundry_Config_Spec.pdf](https://drive.google.com/file/d/1uDkAakG4a5U7_yer5VW6WWY1YzRZmfiO/view?usp=drivesdk)

<!-- drive-expansion:49b8115cc1ebd0e2120f -->

## G-COSA source architecture
The corrected G-COSA source specifies cognitive layers, per-node overseers, verification and loop detection, RabbitMQ/SSE transport, and typed frame/control contracts. Its 25-node baseline is a historical allocation; the Physical AI Foundry source proposes a separate 30-node allocation. Neither document proves hardware acquisition.

- [[G-COSA — Physical Compute Matrix]]
- [[G-COSA — Nine-Layer Cognitive Architecture]]
- [[G-COSA — Execution Harness and Verification Loop]]
- [[G-COSA — Reasoning Emotion and Coordination Subsystems]]
- [[G-COSA — ZenFlow Gateway Transport]]
- [[G-COSA — Continuous Cognitive Loop]]
- [[G-COSA — Cognitive Frame and Control Policy Contracts]]
- [[G-COSA — Staged Implementation Order]]

## Source
- [G-COSA Comprehensive Architecture & Blueprint](https://docs.google.com/document/d/1usMY1CnWbXdS05CPL13_DLNpL4y1AE0-YsIuRa4tTcM/edit?usp=drivesdk) — Sections 1–8. Read in full from Drive on 2026-10-06.

### Source records
- [G-COSA Comprehensive Architecture & Blueprint](https://docs.google.com/document/d/1usMY1CnWbXdS05CPL13_DLNpL4y1AE0-YsIuRa4tTcM/edit?usp=drivesdk)

<!-- drive-expansion:cf2232955d73db7a20ca -->
