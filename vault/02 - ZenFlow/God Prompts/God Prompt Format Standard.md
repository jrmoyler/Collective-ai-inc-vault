---
title: God Prompt Format Standard
kind: format-standard
tags:
- god-prompt
- zenflow
- prompt-format
type: reference
owner: JR Moyler (Hataalii)
source: ZenFlow God Prompt Library
updated: 2026-10-04
division: ZenFlow
---
# God Prompt Format Standard

The structure every God Prompt in the [[God Prompt Library]] follows. Source: ZenFlow God Prompt Library.

## Prompt body order

CORTEX's own build procedure defines the order: **Role → Mandate → Inputs → Outputs → Aegis clause → Style.** Every prompt in the library follows it:

1. **Role line** — "You are <CODE>, Division Director of <Division> — the <domain> division of Collective AI Inc." (ZENITH: "the Master Overseer of Collective AI Inc.")
1. **Mandate** — "Your mandate: …" One paragraph on what the agent exists to do.
1. **Critical constraints** (where needed) — a capitalized block such as CRITICAL CONSTRAINT, CRITICAL COMPLIANCE CONSTRAINTS, CRITICAL GOVERNANCE CONSTRAINT, CRITICAL CLINICAL CONSTRAINTS, CRITICAL ACCURACY CONSTRAINTS or SAFETY PROTOCOL.
1. **Primary inputs** — "Your primary inputs: …" ending with "and directives from ZENITH".
1. **Primary outputs** — "Your primary outputs: …"
1. **Aegis clause** — "You operate within the Aegis Protocol. This means:" followed by "never" rules, an "escalate to ZENITH when:" rule, and a "log … to the Knowledge Keeper" rule.
1. **Cluster scope** — "Your 30-agent cluster covers: …"
1. **Procedure** (optional) — "When <event>: (1) … (2) …" numbered steps.
1. **Style** — "Your style: …" the voice register.

## Entry layout in the library

Each entry carries these fields above the prompt:

| Field | What it holds |
|---|---|
| Agent code and title | e.g. CORTEX — ZenFlow Division Director |
| Tier | Tier 1 — Master Overseer or Tier 2 — Division Director |
| Department | Owning division |
| Model | `claude-sonnet-4-20250514` for all 21 |
| Clearance | Level 3, 4 or 5 with scope |
| Aegis level | Clear, Review or Hold, with scope |
| Role Summary | Short description |
| Mandate | Why the agent exists |
| Zenith OS Installation Instructions | Admin-panel path and connections |
| System Prompt | Block to copy verbatim |

ZENITH's entry also lists Primary Inputs, Primary Outputs, Key Skills, Hard Constraints and Escalation Triggers outside the prompt.

## Configuration variables

The prompts contain no template placeholders. Per-agent configuration is set in Zenith OS metadata, not in the text:

- **Model** — `claude-sonnet-4-20250514` in the spec. Current routing: [[Agent Tier Registry]].
- **Clearance level** — Level 3 (scoped data), Level 4 (sensitive domain data), Level 5 (portfolio-wide or full infrastructure/security/legal).
- **Aegis tier** — Clear / Review / Hold. See [[Aegis Protocol Spec]].
- **Escalation target** — ZENITH for Directors; human leadership for ZENITH.
- **Knowledge Keeper logging** — enabled for every agent. See [[Knowledge Keeper]].
- **Connected APIs and data sources** — listed in each entry's installation path.

## Aegis levels used

| Aegis level | Agents |
|---|---|
| Hold | ZENITH, CONVOY, TALOS |
| Review | CORTEX, SAGE, KEYSTONE, CADUCEUS, NIMBUS, STERLING, BASTION, COMMONS, SPECTRUM, LEX, CATALYST, WAYFARER, TELOMERE, MIRROR |
| Clear for standard content, Review otherwise | MENTOR, MARQUEE, PODIUM, CANOPY |

The prompt index in the source lists MENTOR, MARQUEE, PODIUM and CANOPY as Review.

## Construction rules

- Paste each prompt verbatim. Do not add filler, remove Aegis clauses, or soften hard constraints.
- New agents: confirm division and tier, apply the format above, assign the model tier, run the Aegis compliance check, deploy via [[ZenFlow Agent Foundry]], log to [[Knowledge Keeper]].
- Hard constraints must be enforced at the platform level, not only in the prompt.

Related: [[God Prompt Instantiation Guide]] · [[God Prompt Critical Constraints]] · [[CORTEX — God Prompt]] · [[ZenFlow Division]] · [[JR Voice Standard]]
