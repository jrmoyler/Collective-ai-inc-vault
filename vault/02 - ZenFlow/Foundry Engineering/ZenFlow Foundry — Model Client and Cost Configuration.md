---
title: ZenFlow Foundry — Model Client and Cost Configuration
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
# ZenFlow Foundry — Model Client and Cost Configuration

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
SECTION 05 ◆ ANTHROPIC CLAUDE API CONFIGURATION
PRIMARY MODEL claude-sonnet-4-20250514
FALLBACK MODEL claude-haiku-4-5-20251001
API BASE https://api.anthropic.com/v1/messages
COST TARGET $0.08/session-hour
MODEL TIER CONFIGURATION
TIER MODEL MAX TOKENS TEMP CONTEXT STRATEGY
Tier 1 claude… 4096 0.1 ZENITH never accumulates conversation history — every call is sta…
Tier 2 claude… 4096 0.2 Directors maintain 10-turn rolling context window stored in Redis…
Tier 3 claude… 8192 0.3 Task-scoped context only. No cross-task memory in process — all p…
Tier 3 claude… 1024 0.1 Stateless — no context window needed for structured operational t…
Tier 4 claude… 512 0.0 Stateless. Single prompt → single output. No history.
PYTHON CLIENT WRAPPER — Standard Agent Invocation
import anthropic
import os
from tenacity import retry, stop_after_attempt, wait_exponential
client = anthropic.Anthropic(
api_key=os.environ["ANTHROPIC_API_KEY"],
max_retries=3,
timeout=60.0,
)
@retry(
stop=stop_after_attempt(3),
wait=wait_exponential(multiplier=1, min=2, max=10)
)
async def call_agent(
system_prompt: str,
user_message: str,
model: str = "claude-sonnet-4-20250514",
max_tokens: int = 4096,
temperature: float = 0.2,
metadata: dict = None,
) -> anthropic.types.Message:
"""
Standard agent invocation wrapper.
Handles retries, token tracking, and cost logging.
All calls log to agents.agent_sessions via async background task.
"""
response = await client.messages.create(
model=model,
max_tokens=max_tokens,
temperature=temperature,
system=system_prompt,
messages=[{"role": "user", "content": user_message}],
metadata=metadata or {},
)
return response
COST CONTROL MECHANISMS
METRIC VALUE
Sonnet Input $3.0/M tokens
Sonnet Output $15.0/M tokens
Haiku Input $0.8/M tokens
Haiku Output $4.0/M tokens
Session-Hour Target $0.08/hour
◆ Tier 3 operational agents use Haiku — 75% cost reduction vs Sonnet
◆ Tier 4 on-demand agents use Haiku with 512 max_tokens — minimal footprint
◆ Context window management via rolling summary prevents prompt bloat
◆ Redis-cached Aegis classifications prevent repeat API calls for identical output patterns
◆ Token budget tracked per agent per session in agents.agent_sessions
◆ Cost alerts via Prometheus when division exceeds daily token budget threshold
```

## Source
- [Collective_AI_Agent_Foundry_Config_Spec.pdf](https://drive.google.com/file/d/1uDkAakG4a5U7_yer5VW6WWY1YzRZmfiO/view?usp=drivesdk) — Section 05 — ANTHROPIC CLAUDE API CONFIGURATION. Read in full from Drive on 2026-10-06.

### Source records
- [Collective_AI_Agent_Foundry_Config_Spec.pdf](https://drive.google.com/file/d/1uDkAakG4a5U7_yer5VW6WWY1YzRZmfiO/view?usp=drivesdk)

<!-- drive-expansion:5a9d90965496fbde41bf -->
