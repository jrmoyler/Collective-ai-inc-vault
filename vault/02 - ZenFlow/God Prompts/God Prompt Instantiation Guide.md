---
title: God Prompt Instantiation Guide
kind: instantiation-guide
tags:
- god-prompt
- zenflow
- zenith-os
- runbook
type: reference
owner: JR Moyler (Hataalii)
source: ZenFlow God Prompt Library
updated: 2026-10-04
division: ZenFlow
---
# God Prompt Instantiation Guide

How to load the God Prompts into [[Zenith OS]]. Source: ZenFlow God Prompt Library, "How to Instantiate These Prompts".

1. **Install ZENITH first.** ZENITH is the Tier 1 Master Overseer and must run before any Division Director is activated. Load it into Zenith OS as the Master Overseer Module. Assign full portfolio routing permissions, Knowledge Keeper write access, Synergy Node Activator, and configure the human escalation webhook for JR, Devon, and the CFO. See [[ZENITH — God Prompt]].
1. **Activate Division Directors in sequence.** Recommended order: CORTEX (ZenFlow) → NIMBUS (Binary Loom) → LEX (Juris Guard) → BASTION (Obsidian Arc) → then the remaining 16 directors. CORTEX and NIMBUS must be operational first because all infrastructure runs through them. LEX and BASTION activate before revenue divisions for compliance and security coverage. Full order: [[God Prompt Activation Sequence]].
1. **Paste each prompt verbatim.** Each system prompt is complete and production-ready. Do not add filler, remove Aegis clauses, or soften hard constraints. The constraints exist because the downstream risk is real.
1. **Configure the metadata fields.** For each agent: set the model (`claude-sonnet-4-20250514`), assign the clearance level, connect the listed APIs and data sources, configure the escalation target (ZENITH for Directors, human leadership for ZENITH), and enable Knowledge Keeper logging.
1. **Run the Aegis Protocol checklist.** Before each agent goes live: verify the Aegis tier is set correctly, confirm escalation pathways are tested, confirm Knowledge Keeper logging is active, and confirm hard constraints are enforced at the platform level, not just in the prompt. See [[Aegis Protocol Spec]] and [[SOP — Agent Deployment Checklist]].
1. **Activate Tier 3 agents.** Once each Division Director runs, use the [[ZenFlow Agent Foundry]] to instantiate the 30 Tier 3 specialist agents per division. The Master Agent Roster PDF holds the full specialist prompts.

> [!info] Model routing
> The library specifies `claude-sonnet-4-20250514` for every agent. Current vault routing lives in [[Agent Tier Registry]].

> [!warning] Security notice
> The library is marked Confidential: not to be shared outside the Core Four + CLO.

## Generic Director install path

ZenFlow Zenith OS — Division Director Module. New Agent → Tier 2 Director → <Division> → paste system prompt → assign division permissions → connect listed APIs → set ZENITH as escalation target. Each prompt note lists its exact path.

Related: [[God Prompt Library]] · [[God Prompt Format Standard]] · [[God Prompt Critical Constraints]] · [[ZenFlow Runbook]] · [[ZenFlow Division]]
