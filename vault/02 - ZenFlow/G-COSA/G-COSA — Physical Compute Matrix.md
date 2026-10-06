---
title: G-COSA — Physical Compute Matrix
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
# G-COSA — Physical Compute Matrix

> [!warning] Source build specification
> This is a documented architecture and build plan. Provisioning, deployment, uptime, customer counts, hardware ownership and performance targets require live evidence. Source numbering, director codenames, model identifiers and dates remain historical; current [[Agent Tier Registry]], [[Director Codenames]] and division charters take precedence. Physical autonomy remains Aegis-Hold until staged testing and human approval. Hardware prices are source estimates, not current purchase quotes.

## Linked ownership
- [[ZenFlow Division]]
- [[Binary Loom Division]]
- [[001 — ZenFlow MOC]]
- [[ZenFlow Master Blueprint]]

## Full source section

```text
1. Executive Summary & The Hardware Matrix
G-COSA is a manifold-native cognitive operating system designed for Collective AI Inc. It acts as a geometric substrate upon which 600 specialized agents, 20 divisions, human operators, and market environments co-adapt. It relies on a decentralized, physical infrastructure—a "Hardware Matrix" of Apple Mac Minis—bridged by a highly concurrent routing layer.
The Hardware Matrix Topology
To achieve a local-first, highly secure, and computationally distributed ecosystem that perfectly mirrors the G-COSA parameters, the physical architecture relies on a 25-node cluster of interconnected Apple Mac Minis (M1/M2/M3):
* The Division Nodes (20 Mac Minis): Each of these 20 nodes is dedicated strictly to a specific division (e.g., Vector Shift, Eon Core, Juris Guard).
   * Each node houses exactly 30 specialized sub-agents (20 nodes × 30 agents = the 600 agents defined in the spec).
   * Runs localized tools (local LLM CLIs, sandboxed browser environments, isolated credentials).
* The Parent Company Node (1 Mac Mini): A dedicated node exclusively for parent-company operations, global strategic alignment, and hosting the highest-level Master HRL (Hierarchical Reinforcement Learning) goals.
* The Engineering & Core Nodes (4 Mac Minis): Reserved for engineering tasks, CI/CD pipelines, the ZenFlow Gateway routing, global persistent memory (The Regime Atlas), and ARC-R global coordination.
* The Master Terminal: Your central laptop acts as the "Virtual Boardroom," communicating with all 25 nodes simultaneously via the ZenFlow Gateway.
Each Mac Mini runs a Local Overseer (the COSA Executive Kernel), which governs its local processes and reports up to the central Terminal.
```

## Source
- [G-COSA Comprehensive Architecture & Blueprint](https://docs.google.com/document/d/1usMY1CnWbXdS05CPL13_DLNpL4y1AE0-YsIuRa4tTcM/edit?usp=drivesdk) — Section 1 — Executive Summary & The Hardware Matrix. Read in full from Drive on 2026-10-06.

### Source records
- [G-COSA Comprehensive Architecture & Blueprint](https://docs.google.com/document/d/1usMY1CnWbXdS05CPL13_DLNpL4y1AE0-YsIuRa4tTcM/edit?usp=drivesdk)

<!-- drive-expansion:2fc994ea9466542951f4 -->
