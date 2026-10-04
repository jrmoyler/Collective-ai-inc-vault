---
title: SOP — Agent Deployment Checklist
tags:
- sop
- ops
type: sop
owner: JR Moyler (Hataalii)
status: active
updated: 2026-10-04
researched: 2026-10-04
---
# SOP — Agent Deployment Checklist

**Owner:** [[Director_ZenFlow]] (AXIS) with [[Denzel McDougald]] · **Applies to:** every new or changed ZenFlow agent, internal or client-facing
**Framework:** NIST AI RMF functions (Govern, Map, Measure, Manage) plus the OWASP 2025 LLM risks, under [[Aegis Protocol Spec]]

## 1. Govern — before any build
- [ ] Named human owner and the Director the agent reports to
- [ ] Aegis clearance level set (Clear, Review, Hold)
- [ ] Agent entered in [[Agent Tier Registry]] and the [[Airtable Operations Hub]]
- [ ] If the agent touches hiring, lending, housing, health, insurance, education or legal decisions about a person, route to [[Juris Guard Division]] for a high-risk AI review (Colorado AI Act and similar laws)

## 2. Map — scope and context
- [ ] Written purpose, users, inputs, outputs and what the agent must never do
- [ ] Data classes it reads (PII, financial, health) and where that data is stored
- [ ] Tools and permissions listed. Least privilege only
- [ ] Physical or financial actions require human approval (standing rule in every division dossier)

## 3. Measure — test before release
- [ ] Evaluation set of at least 25 real tasks with pass criteria. Record task completion rate and cost per successful workflow
- [ ] Red-team pass against the OWASP 2025 list:

| ID | Risk | Check |
|---|---|---|
| LLM01 | Prompt injection | Feed hostile text through every input channel, including retrieved documents |
| LLM02 | Sensitive information disclosure | Confirm no PII, keys or client data leaks in outputs or logs |
| LLM03 | Supply chain | Pin model versions, review third-party tools and MCP servers |
| LLM04 | Data and model poisoning | Review any knowledge base the agent retrieves from |
| LLM05 | Improper output handling | Never pass raw output into code, SQL, shell or HTML without validation |
| LLM06 | Excessive agency | Remove tools and permissions the task does not need |
| LLM07 | System prompt leakage | Keep secrets out of prompts. Assume prompts can leak |
| LLM08 | Vector and embedding weaknesses | Separate tenants in vector stores |
| LLM09 | Misinformation | Require sources for factual claims. Flag low-confidence answers |
| LLM10 | Unbounded consumption | Set token, rate and spend limits per session |

- [ ] Voice check against [[JR Voice Standard]] for anything client-facing

## 4. Manage — release and run
- [ ] Staged rollout: internal → one pilot client → general
- [ ] Logging to [[Knowledge_Keeper]], with an Aegis violation rate tracked weekly
- [ ] Kill switch and rollback tested
- [ ] Incident path: [[SOP — Incident Response]]
- [ ] Review date set (90 days)

## Sources
- [NIST AI 600-1 Generative AI Profile](https://airc.nist.gov/docs/NIST.AI.600-1.GenAI-Profile.ipd.pdf)
- [OWASP Top 10 for LLM Applications 2025](https://www.promptfoo.dev/blog/owasp-top-10-llms-tldr/)

## Linked
- [[005 — Operations MOC]]
