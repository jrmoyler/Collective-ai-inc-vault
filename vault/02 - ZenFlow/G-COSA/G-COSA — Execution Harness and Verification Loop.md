---
title: G-COSA — Execution Harness and Verification Loop
tags:
- drive-source
- reference-spec
type: spec
owner: JR Moyler (Hataalii)
status: reference-planned
updated: 2026-10-06
source_refs:
- id: 1usMY1CnWbXdS05CPL13_DLNpL4y1AE0-YsIuRa4tTcM
  url: https://docs.google.com/document/d/1usMY1CnWbXdS05CPL13_DLNpL4y1AE0-YsIuRa4tTcM/edit?usp=drivesdk
  title: G-COSA Comprehensive Architecture & Blueprint
---
# G-COSA — Execution Harness and Verification Loop

> [!warning] Source build specification
> This is a documented architecture and build plan. Provisioning, deployment, uptime, customer counts, hardware ownership and performance targets require live evidence. Source numbering, director codenames, model identifiers and dates remain historical; current [[Agent Tier Registry]], [[Director Codenames]] and division charters take precedence. Physical autonomy remains Aegis-Hold until staged testing and human approval. Hardware prices are source estimates, not current purchase quotes.

## Linked ownership
- [[ZenFlow Division]]
- [[Binary Loom Division]]
- [[001 — ZenFlow MOC]]
- [[ZenFlow Master Blueprint]]

## Full source section

```text
3. Core Systems & Agentic Execution (The OpenClaw Harness)
Agents in G-COSA don't just "chat"—they act. We incorporate advanced Harness Engineering principles to ensure they execute tasks without catastrophic failure loops.
3.1 The Skill Framework & Sandboxing
Instead of granting root shell access to agents, we implement a Command & Control (C2) harness.
* SKILL.md Registry: Every tool is defined locally on the Mac Mini in a markdown/YAML format (Name, Parameters, Command).
* Docker Sandboxing: Agents execute scripts inside localized Docker containers on their specific Mac Mini to prevent prompt-injection attacks from wiping the host drive.
* LocalContextMiddleware: Upon waking, agents are injected with a snapshot of their specific Mac Mini's active context (budget, tools available, time constraints).
3.2 The Automated Trace & "Build/Verify" Loop
We mitigate "Doom Loops" (where agents endlessly repeat broken actions) through execution harnesses:
* PreCompletionChecklistMiddleware: Before an agent marks a task "Done," it must pass a verification phase.
* LoopDetectionMiddleware: If an agent tries the exact same command 5 times, COSA intervenes with a system message forcing a strategic pivot.
* The "Reasoning Sandwich": Compute is strategically budgeted. High-power reasoning is used for Planning (Top bun) and Verification (Bottom bun), while lower-cost, faster execution is used for the actual coding/building phase (The meat).
```

## Source
- [G-COSA Comprehensive Architecture & Blueprint](https://docs.google.com/document/d/1usMY1CnWbXdS05CPL13_DLNpL4y1AE0-YsIuRa4tTcM/edit?usp=drivesdk) — Section 3 — Core Systems & Agentic Execution (The OpenClaw Harness). Read in full from Drive on 2026-10-06.

### Source records
- [G-COSA Comprehensive Architecture & Blueprint](https://docs.google.com/document/d/1usMY1CnWbXdS05CPL13_DLNpL4y1AE0-YsIuRa4tTcM/edit?usp=drivesdk)

<!-- drive-expansion:5ee23d68c23a28b33ce1 -->
