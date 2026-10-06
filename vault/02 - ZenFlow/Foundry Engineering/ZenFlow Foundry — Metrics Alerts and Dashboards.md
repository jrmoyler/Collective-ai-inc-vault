---
title: ZenFlow Foundry — Metrics Alerts and Dashboards
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
# ZenFlow Foundry — Metrics Alerts and Dashboards

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
SECTION 07 ◆ OBSERVABILITY STACK
Stack: OpenTelemetry → Prometheus → Grafana + Loki + Sentry
PROMETHEUS METRICS (12)
METRIC NAME TYPE DESCRIPTION
zenith_routing_requests_total Counter Total routing requests by division and aegis_tier
zenith_routing_latency_ms Histogram Routing decision latency in milliseconds
agent_session_duration_seconds Histogram Agent session duration by tier and division
agent_token_usage_total Counter Token consumption by agent, model, and direction (input/output)
agent_cost_usd_total Counter USD cost by division and model tier
aegis_classifications_total Counter Aegis classifications by tier (Clear/Review/Hold) and division
aegis_hold_queue_depth Gauge Current depth of Aegis Hold queue
knowledge_entries_total Counter Knowledge Keeper entries written by division and type
redis_stream_lag Gauge Consumer group lag per Redis Stream — alerts when > 1000
division_health_status Gauge 1=active, 0.5=degraded, 0=offline — per division
api_request_duration_seconds Histogram External API request duration by service and endpoint
marketplace_licenses_active Gauge Active Marketplace licenses by tier
ALERT RULES (6)
ALERT SEVERITY CONDITION ACTION
ZENITHDown CRITICAL division_health_status{agent='ZENITH'} == 0 for 1m Page JR immediately via PagerDuty + Twilio SMS
AegisHoldQueueHigh WARNING aegis_hold_queue_depth > 50 for 5m Slack alert to #zenflow-ops + ZENITH notification
DirectorDown HIGH division_health_status < 1 for 2m (any director) Slack alert + ZENITH escalation attempt + PagerDuty if …
TokenBudgetExceeded WARNING agent_cost_usd_total > division_daily_budget * 0.8 (per division) Slack alert to Division Director + Ahmed Mohammed
SecurityIncident CRITICAL OBSIDIAN publishes to zenith:alerts channel with type=security_incident Immediate PagerDuty page + ZENITH escalation to JR with…
HeliosGridAttempt CRITICAL Any write attempt to divisions table setting helios_grid status = active without clearance flag DB trigger blocks write + immediate alert to JURIS + ZE…
GRAFANA DASHBOARDS (6)
DASHBOARD CONTENTS
ZenFlow Portfolio Overview Real-time status of all 21 agents, token costs, Aegis queue depths, and routing volume
Division Director Health Per-division: task queue depth, session counts, error rates, token usage
Aegis Protocol Monitor Clear/Review/Hold breakdown by division, queue depths, resolution times
Knowledge Keeper Analytics Entry write rates, search query volume, embedding generation, semantic cluster visualization
Cost Intelligence Real-time and projected costs by division, model, and tier against daily budgets
Infrastructure Health Kubernetes pod status, PostgreSQL replication lag, Redis cluster health, API Gateway latency
```

## Source
- [Collective_AI_Agent_Foundry_Config_Spec.pdf](https://drive.google.com/file/d/1uDkAakG4a5U7_yer5VW6WWY1YzRZmfiO/view?usp=drivesdk) — Section 07 — OBSERVABILITY STACK. Read in full from Drive on 2026-10-06.

### Source records
- [Collective_AI_Agent_Foundry_Config_Spec.pdf](https://drive.google.com/file/d/1uDkAakG4a5U7_yer5VW6WWY1YzRZmfiO/view?usp=drivesdk)

<!-- drive-expansion:c7c749b26f2dc4497569 -->
