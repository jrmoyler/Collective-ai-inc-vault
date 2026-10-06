---
title: ZenFlow Foundry — Redis Queue and Cache Contracts
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
# ZenFlow Foundry — Redis Queue and Cache Contracts

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
SECTION 03 ◆ REDIS ARCHITECTURE
VERSION Redis 7.2
HOSTING AWS ElastiCache — 3-node cluster, cache.r6g.large per node
PERSISTENCE AOF enabled — appendonly yes, appendfsync everysec
EVICTION allkeys-lru — memory limit 8GB per node
DATA STRUCTURES
KEY PATTERN TYPE PURPOSE TTL
zenith:routing:queue Redis Stream Inbound request queue to ZENITH. All external requests enter here… MAXLEN 10000 (approximate)
division:{id}:inbox Redis Stream ZENITH-to-Director message channel. One stream per division (20 t… MAXLEN 5000
division:{id}:task_queue Redis Stream Director-to-Tier3 agent task distribution. Director publishes; wo…MAXLEN 20000
agent:{id}:state Redis Hash Hot agent state — current task, last heartbeat, token budget rema… 300 seconds
aegis:review_queue Redis Sorted Set Pending Aegis-Review outputs awaiting Director review. Score = pr… —
aegis:hold_queue Redis List Aegis-Hold outputs pending ZENITH escalation decision. RPUSH/LPOP… —
zenith:health:snapshot Redis Hash Real-time health snapshot of all 621 agents. Updated by each agen… 60 seconds (auto-expire alerts s
rate_limit:{service}:{client_id}Redis String with TTL API rate limiting for external Marketplace API clients. Sliding w…3600 seconds (1 hour window)
session:{agent_id}:context Redis String (JSON) Active conversation context for stateful agent sessions. Compress… 1800 seconds (30 min idle timeo
knowledge:write_buffer Redis List Async write buffer for Knowledge Keeper entries. Workers drain to… —
EXAMPLE REDIS COMMANDS
XADD zenith:routing:queue * request_id source user content '' timestamp
XADD division:1:inbox * task_id routing_log_id priority normal payload ''
XADD division:1:task_queue * agent_name 'God_Prompt_Engineer' task_id input ''
HSET agent::state status active current_task last_hb tokens_remaining 150000
ZADD aegis:review_queue 1 ''
RPUSH aegis:hold_queue ''
HSET zenith:health:snapshot ZENITH active ZEN active COMMONS active ...
INCR rate_limit:oracle_api:client_ | EXPIRE rate_limit:oracle_api:client_ 3600
SET session::context '' EX 1800
RPUSH knowledge:write_buffer ''
PUB/SUB CHANNELS
CHANNEL PURPOSE
zenith:alerts ZENITH broadcasts system-wide alerts to all Director subscribers
aegis:violations Aegis Protocol engine broadcasts violations to ZENITH and relevant Director
division:{id}:updates Division Directors broadcast status updates to ZENITH
infra:alerts Binary Loom infrastructure alerts broadcast to ZENITH and OBSIDIAN
```

## Source
- [Collective_AI_Agent_Foundry_Config_Spec.pdf](https://drive.google.com/file/d/1uDkAakG4a5U7_yer5VW6WWY1YzRZmfiO/view?usp=drivesdk) — Section 03 — REDIS ARCHITECTURE. Read in full from Drive on 2026-10-06.

### Source records
- [Collective_AI_Agent_Foundry_Config_Spec.pdf](https://drive.google.com/file/d/1uDkAakG4a5U7_yer5VW6WWY1YzRZmfiO/view?usp=drivesdk)

<!-- drive-expansion:f6fcb84e762bf6ab0844 -->
