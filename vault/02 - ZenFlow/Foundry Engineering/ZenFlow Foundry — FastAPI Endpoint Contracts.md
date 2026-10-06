---
title: ZenFlow Foundry — FastAPI Endpoint Contracts
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
# ZenFlow Foundry — FastAPI Endpoint Contracts

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
SECTION 04 ◆ FASTAPI SERVICE ARCHITECTURE
FRAMEWORK FastAPI 0.110+
PYTHON Python 3.12
ASYNC asyncio + uvicorn (4 workers per container)
AUTH JWT (RS256) — asymmetric keys, 24h access tokens, 30d refresh tokens
SERVICE: ZENITH-SERVICE (port 8000)
ZENITH Master Overseer API. Receives all external requests. Handles routing, health monitoring, and human escalation.
Replicas: 2 (active-active, no state stored in process) | CPU: 500m → 2000m | Mem: 512Mi → 2Gi
ENDPOINTS:
METHOD PATH DESCRIPTION AUTH AEGIS
POST /v1/route Route a request to the appropriate division JWT required Aegis-Clear
GET /v1/health Portfolio-wide health snapshot from Redis JWT required Aegis-Clear
POST /v1/synergy/activate Activate a Synergy Node cross-division workflow JWT + Admin scope Aegis-Review
GET /v1/agents List all agents with status JWT + Admin scope Aegis-Clear
POST /v1/escalate Human escalation endpoint — posts to Slack + TwilioInternal only Aegis-Hold
GET /v1/aegis/queue View pending Review and Hold queue items JWT + Admin scope Aegis-Review
POST /v1/aegis/resolve/{item_id} Resolve an Aegis Review or Hold item JWT + Admin scope Aegis-Review
SERVICE: AGENT-FOUNDRY-SERVICE (port 8001)
Agent lifecycle management. Instantiate, update, version, and retire agents. Manages the agents.agent_registry table.
Replicas: 2 | CPU: 250m → 1000m | Mem: 256Mi → 1Gi
ENDPOINTS:
METHOD PATH DESCRIPTION AUTH AEGIS
POST /v1/agents Create a new agent from blueprint JWT + Admin scope Aegis-Review
GET /v1/agents/{id} Fetch agent config and current status JWT required Aegis-Clear
PUT /v1/agents/{id}/prompt Update agent system prompt (creates new version)JWT + Admin scope Aegis-Review
POST /v1/agents/{id}/activate Activate an agent (transitions status to active) JWT + Admin scope Aegis-Review
POST /v1/agents/{id}/retire Gracefully retire an agent JWT + Admin scope Aegis-Review
GET /v1/agents/{id}/versions List all system prompt versions for an agent JWT + Admin scope Aegis-Clear
POST /v1/agents/batch-deploy Deploy up to 30 Tier 3 agents from a division blueprint JSON JWT + Admin scope Aegis-Review
SERVICE: DIRECTOR-SERVICE-{DIVISION} (port 8100–8119 (one per division))
20 identical FastAPI containers, one per division. Each loads its Division Director God Prompt on startup. Routes tasks to Tier 3 agents via
Redis Streams.
Replicas: 1 per division (2 for high-traffic: ZenFlow, The Collective, Hybrid Living) | CPU: 500m → 2000m | Mem:
512Mi → 2Gi
REQUIRED ENV VARS:
DIVISION_ID — integer 1–20
DIRECTOR_AGENT_ID — UUID from agents.agent_registry
ANTHROPIC_API_KEY — from AWS Secrets Manager
REDIS_URL — Redis cluster connection string
DATABASE_URL — PostgreSQL connection string (division-scoped role)
ZENITH_REDIS_CHANNEL — e.g. division:1:inbox
AEGIS_TIER — default Aegis tier for this division
ENDPOINTS:
METHOD PATH DESCRIPTION AUTH AEGIS
GET /v1/status Director health and current task queue depth Internal JWT Aegis-Clear
POST /v1/tasks Accept a task from ZENITH (internal only) Internal JWT Aegis-Clear
GET /v1/tasks/{id} Get task status and output Internal JWT Aegis-Clear
POST /v1/agents/{id}/invoke Direct agent invocation (Director use only) Internal JWT Aegis-Review
SERVICE: KNOWLEDGE-KEEPER-SERVICE (port 8200)
Knowledge Keeper read/write API. Async write via Redis buffer. Semantic search via pgvector.
Replicas: 3 (write volume is high — async drain workers) | CPU: 500m → 2000m | Mem: 1Gi → 4Gi
ENDPOINTS:
METHOD PATH DESCRIPTION AUTH AEGIS
POST /v1/entries Write a knowledge entry (queued async to Redis buffer) Internal JWT Aegis-Clear
GET /v1/entries/search Semantic + keyword search across knowledge baseJWT required Aegis-Clear
GET /v1/entries/{id} Fetch a specific knowledge entry JWT required Aegis-Clear
GET /v1/audit Aegis audit trail query with filters JWT + Admin scope Aegis-Review
POST /v1/embed Generate and store embedding for a knowledge entryInternal JWT Aegis-Clear
SERVICE: AEGIS-SERVICE (port 8300)
Aegis Protocol classification engine. Called by every agent before output delivery. Classifies Clear / Review / Hold. Routes Review to
Director queue, Hold to ZENITH.
Replicas: 3 (high-frequency — every agent output passes through) | CPU: 500m → 1500m | Mem: 512Mi → 2Gi
ENDPOINTS:
METHOD PATH DESCRIPTION AUTH AEGIS
POST /v1/classify Classify an agent output — returns Clear/Review/Hold + reason Internal JWT N/A — IS the gate
GET /v1/queue/review List pending Review items for a division Internal JWT + Director scopeAegis-Review
GET /v1/queue/hold List pending Hold items Internal JWT + ZENITH scopeAegis-Hold
POST /v1/resolve/{item_id} Resolve a Review or Hold item with decision JWT + appropriate scope Aegis-Review
SERVICE: MARKETPLACE-SERVICE (port 8400)
ZenFlow Marketplace public API. Agent listings, licensing, and Stripe billing.
Replicas: 2 | CPU: 250m → 1000m | Mem: 256Mi → 1Gi
ENDPOINTS:
METHOD PATH DESCRIPTION AUTH AEGIS
GET /v1/listings Public agent listing catalog None Aegis-Clear
GET /v1/listings/{slug} Fetch a specific listing detail None Aegis-Clear
POST /v1/licenses Purchase a license — triggers Stripe checkout JWT required Aegis-Review
GET /v1/licenses/me Fetch caller's active licenses JWT required Aegis-Clear
POST /v1/webhook/stripe Stripe payment webhook — license activation Stripe signature Aegis-Clear
SHARED MIDDLEWARE (Applied to All Services)
JWTAuthMiddleware
Validates RS256 JWT on all non-public endpoints. Extracts division_id, agent_id, and scope claims. Rejects expired or invalid tokens with
401.
Implementation: Custom FastAPI middleware using python-jose. Public keys fetched from /v1/auth/jwks on startup and refreshed every 6h.
AegisGateMiddleware
Intercepts all agent output responses and routes them through the Aegis service before returning to caller. Adds X-Aegis-Tier header to
every response.
Implementation: Async middleware calling aegis-service /v1/classify. Adds < 50ms latency (Redis-cached classification results for identical output
patterns).
RequestTracingMiddleware
Injects trace_id, span_id, and division_id into every request context. Sends trace spans to OpenTelemetry collector.
Implementation: opentelemetry-instrumentation-fastapi. Trace context propagated via W3C traceparent header.
RateLimitMiddleware
Sliding window rate limiting via Redis. Per-client limits on external-facing endpoints. Internal service calls exempt.
Implementation: slowapi library wrapping Redis INCR. Limits: 60 req/min (standard), 600 req/min (enterprise), unlimited (internal JWT).
KnowledgeKeeperMiddleware
Async post-response middleware that queues significant responses to the Knowledge Keeper Redis buffer. Fires after response is sent —
zero latency impact.
Implementation: asyncio.create_task() post-response hook. Writes to knowledge:write_buffer Redis list.
```

## Source
- [Collective_AI_Agent_Foundry_Config_Spec.pdf](https://drive.google.com/file/d/1uDkAakG4a5U7_yer5VW6WWY1YzRZmfiO/view?usp=drivesdk) — Section 04 — FASTAPI SERVICE ARCHITECTURE. Read in full from Drive on 2026-10-06.

### Source records
- [Collective_AI_Agent_Foundry_Config_Spec.pdf](https://drive.google.com/file/d/1uDkAakG4a5U7_yer5VW6WWY1YzRZmfiO/view?usp=drivesdk)

<!-- drive-expansion:b72fad01485cdef0a835 -->
