---
title: n8n Workflow Blueprint
tags:
- ops
- n8n
type: blueprint
owner: JR Moyler (Hataalii)
updated: 2026-10-06
---
# n8n Workflow Blueprint

150 workflows, 10 per division across the original 15. Self-hosted n8n.

> [!danger] Urgent
> Patch self-hosted n8n against the ten security advisories flagged in the Sept 2026 toolkit update.

## Workflow groups
- [[Workflows — ZenFlow]]
- [[Workflows — The Collective]]
- [[Workflows — Hybrid Living]]
- [[Workflows — Nexus Labs]]
- [[Workflows — Quantum Ledger]]
- [[Workflows — Signal Velocity]]
- [[Workflows — Binary Loom]]
- [[Workflows — Obsidian Arc]]
- [[Workflows — Juris Guard]]
- [[Workflows — Kinetic Edge]]
- [[Workflows — Terra Axis]]
- [[Workflows — Aether Link]]
- [[Workflows — VectorShift]]
- [[Workflows — Civic Core]]
- [[Workflows — Gaia Synthesis]]

## Drive source expansion — 2026-10-06

## Source-version reconciliation
The full Drive blueprint library describes **27 workflows, 211 nodes, 20 divisions and four infrastructure workflows** on its cover. These are document specifications, not verified running deployments. The earlier 150-workflow/15-division statement above belongs to a different planning inventory and is not the count of this source edition.

The source's n8n 1.40+ and Kubernetes namespace `n8n` are dated architecture assumptions. They do not establish the currently installed version or a running cluster. Verify the current instance and security patches before any deployment.

## Required workflow conventions
- Webhook path convention: `/webhook/{division-slug}/{workflow-slug}`.
- Credentials are named entries in n8n's credential manager, never inline secrets.
- Canvas documentation states purpose, trigger, division and Aegis tier.
- Each node's failure path routes to a shared error handler.
- Start/end records go to Knowledge Keeper.
- Failure records go to Knowledge Keeper and the designated operations alert channel; the source calls for at most three retries with exponential backoff.
- Aegis conditional gates stop review/hold work before external action.

## Four shared infrastructure specifications
| ID | Workflow | Trigger | Aegis |
|---|---|---|---|
| INFRA-001 | Agent Health Heartbeat Monitor | Every minute | Clear |
| INFRA-002 | Aegis Protocol Violation Response | Webhook | Hold |
| INFRA-003 | Knowledge Keeper Async Write Drain | Every 30 seconds | Clear |
| INFRA-004 | Daily Portfolio Cost Report | Daily scheduled trigger | Clear |

INFRA-001 specifies status polling, Redis/PostgreSQL health snapshots and alerting. These paths must be connected to actual registered agents; a source's claimed population does not prove live endpoint availability.

## Operational readiness
Store an execution example, credential names without values, owner, timeout, retry behavior, sample error and review gate evidence for every imported workflow. An exported canvas is a blueprint until these checks pass. Link [[Workflow Delivery Record Template]] and [[SOP — Agent Deployment Checklist]].

## Source record
- [Collective_AI_n8n_Workflow_Blueprint_Library.pdf](https://drive.google.com/file/d/1TthEJ514_JKA_Hmqy4ywVDYs65BJvgSo/view?usp=drivesdk) — cover and pp. 2–6.

### Source records
- [Collective_AI_n8n_Workflow_Blueprint_Library.pdf](https://drive.google.com/file/d/1TthEJ514_JKA_Hmqy4ywVDYs65BJvgSo/view?usp=drivesdk)

<!-- drive-expansion:81f6c517bec3f0646e99 -->
