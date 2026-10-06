---
title: ZenFlow Foundry — Service and Routing Architecture
tags:
- drive-source
- reference-spec
type: spec
owner: JR Moyler (Hataalii)
status: reference-planned
updated: 2026-10-06
source_refs:
- id: 1uDkAakG4a5U7_yer5VW6WWY1YzRZmfiO
  url: https://drive.google.com/file/d/1uDkAakG4a5U7_yer5VW6WWY1YzRZmfiO/view?usp=drivesdk
  title: Collective_AI_Agent_Foundry_Config_Spec.pdf
---
# ZenFlow Foundry — Service and Routing Architecture

> [!warning] Source build specification
> This is a documented architecture and build plan. Provisioning, deployment, uptime, customer counts, hardware ownership and performance targets require live evidence. Source numbering, director codenames, model identifiers and dates remain historical; current [[Agent Tier Registry]], [[Director Codenames]] and division charters take precedence. Physical autonomy remains Aegis-Hold until staged testing and human approval. Hardware prices are source estimates, not current purchase quotes.

## Linked ownership
- [[ZenFlow Division]]
- [[Binary Loom Division]]
- [[ZenFlow Master Blueprint]]
- [[ZenFlow Agent Foundry]]
- [[001 — ZenFlow MOC]]

## Full source section

```text
SECTION 01 ◆ ARCHITECTURE OVERVIEW
Layer 0 — Human Interface
JR Moyler, Devon Scott, Ahmed Mohammed. Direct escalation targets from ZENITH. Human override authority on any Aegis-Hold
decision. Access via secure admin panel, Slack webhook, and mobile alert.
COMPONENTS:
◆ Zenith OS Admin Panel (Next.js)
◆ Human Escalation Webhook (HTTPS POST)
◆ Mobile Alert API (Twilio)
◆ Slack Escalation Channel
Layer 1 — ZENITH Master Overseer
Single Tier 1 agent. Routes all requests. Monitors all 20 division clusters. Enforces Aegis Protocol. Never executes domain tasks. Runs in
its own isolated FastAPI service with dedicated Redis routing queue.
COMPONENTS:
◆ ZENITH FastAPI service (port 8000)
◆ Routing Engine (LangGraph StateGraph)
◆ Knowledge Keeper Write Client
◆ Aegis Protocol Engine
◆ Synergy Node Activator
◆ Division Director Message Bus (Redis pub/sub)
Layer 2 — Division Director Agents (×20)
One Director per division. Each runs in its own Docker container with division-scoped database access. Communicates with ZENITH via
Redis pub/sub. Communicates with Tier 3 agents via the Agent Task Queue.
COMPONENTS:
◆ 20 × Director FastAPI containers
◆ Division-scoped PostgreSQL schemas
◆ Director-to-ZENITH Redis channel
◆ Director-to-Tier3 Task Queue (Redis Streams)
◆ Aegis Compliance Middleware
Layer 3 — Specialist Agents (600 × Tier 3)
30 agents per division. Instantiated on-demand or as persistent workers depending on function type. Short-lived task agents use Redis
Streams for job pickup. Long-running agents (SOC monitoring, fleet tracking) run as persistent workers.
COMPONENTS:
◆ Agent Worker Pool (Python async workers)
◆ Redis Streams task queue
◆ Agent State Store (PostgreSQL)
◆ Tool integration layer (n8n webhooks + direct API calls)
◆ Aegis output filter
Layer 4 — Infrastructure (Binary Loom)
The fabric everything runs on. Kubernetes orchestration, PostgreSQL cluster, Redis cluster, API Gateway, observability stack, and CI/CD
pipelines. Managed by LOOM with Binary Loom's 30-agent infrastructure cluster.
COMPONENTS:
◆ Kubernetes 1.28 (AWS EKS)
◆ PostgreSQL 15 cluster (primary + 2 read replicas)
◆ Redis 7 cluster (3-node)
◆ Kong API Gateway
◆ Prometheus + Grafana observability
◆ GitHub Actions CI/CD
◆ OpenTelemetry distributed tracing
REQUEST DATA FLOW — End to End
1. Request arrives at Kong API Gateway → authenticated via JWT → routed to ZENITH service
2. ZENITH classifies request → identifies target division(s) → publishes to Director Redis channel
3. Division Director picks up from Redis → assigns to appropriate Tier 3 agent via Task Queue
4. Tier 3 agent executes → calls Anthropic Claude API + division tools → produces output
5. Output passes through Aegis middleware → classified Clear / Review / Hold
6. Clear outputs returned to caller → Review outputs flagged for Director review → Hold outputs escalate to ZENITH → ZENITH
escalates to human if unresolved
7. All decisions logged to Knowledge Keeper (PostgreSQL audit schema) via async write
```

## Source
- [Collective_AI_Agent_Foundry_Config_Spec.pdf](https://drive.google.com/file/d/1uDkAakG4a5U7_yer5VW6WWY1YzRZmfiO/view?usp=drivesdk) — Section 01 — ARCHITECTURE OVERVIEW. Read in full from Drive on 2026-10-06.

### Source records
- [Collective_AI_Agent_Foundry_Config_Spec.pdf](https://drive.google.com/file/d/1uDkAakG4a5U7_yer5VW6WWY1YzRZmfiO/view?usp=drivesdk)

<!-- drive-expansion:787886a64b3139e38338 -->
