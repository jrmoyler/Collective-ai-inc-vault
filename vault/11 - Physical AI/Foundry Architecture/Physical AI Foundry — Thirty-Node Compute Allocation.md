---
title: Physical AI Foundry — Thirty-Node Compute Allocation
tags:
- drive-source
- reference-spec
type: spec
owner: JR Moyler (Hataalii)
status: reference-planned
updated: 2026-10-06
source_refs:
- id: 1pZSHaIg3QjaBn5aKzESwq9zBND7LtshJ
  url: https://drive.google.com/file/d/1pZSHaIg3QjaBn5aKzESwq9zBND7LtshJ/view?usp=drivesdk
  title: Collective_AI_Physical_AI_Foundry_Final.pdf
---
# Physical AI Foundry — Thirty-Node Compute Allocation

> [!warning] Source build specification
> This is a documented architecture and build plan. Provisioning, deployment, uptime, customer counts, hardware ownership and performance targets require live evidence. Source numbering, director codenames, model identifiers and dates remain historical; current [[Agent Tier Registry]], [[Director Codenames]] and division charters take precedence. Physical autonomy remains Aegis-Hold until staged testing and human approval. Hardware prices are source estimates, not current purchase quotes.

## Linked ownership
- [[Animus Prime Division]]
- [[Binary Loom Division]]
- [[ZenFlow Division]]
- [[Foundry Infrastructure Hardware Catalog]]
- [[011 — Physical AI MOC]]

## Full source section

```text
2. Mac Mini Fleet: 30-Node Local Cloud
Apple lists Mac mini configurations with M4 or M4 Pro chips, unified memory options, SSD options, and optional 10Gb
Ethernet. For this Foundry, the practical default is M4 with upgraded memory/storage for departments, and M4 Pro for
orchestration, engineering, inference support, media, and high-throughput nodes.
Pool Count Allocation Recommended config Use case
Parent + Departments 21 Parent company + 20 divisions M4 / 24GB or 32GB RAM / 1TB SSD / 10GbE
when possible
Local department agent host, apps, tools,
vector cache, internal services
Engineering / Ops 4 Binary Loom, ZenFlow ops, DevOps,
automation
M4 Pro / 48GB or 64GB RAM / 1TB-2TB SSD
/ 10GbE
Build pipelines, device orchestration, local
APIs, deployment automation
Pool Count Allocation Recommended config Use case
Shared Infrastructure 5 Failover, CI, observability, storage
gateway, model test
Mixed M4/M4 Pro / 10GbE preferred Cluster control, monitoring, backups,
shared agents, load spillover
Total 30 Full local cloud Standardize accessories and labels Owned compute fabric for Collective AI
30-Node Assignment Draft
# Node Division / Function Primary role
1 Mac-01 Parent Company Parent command node, brand/admin systems, executive dashboards
2 Mac-02 ZenFlow Agent routing, prompt libraries, Knowledge Keeper, local orchestration
3 Mac-03 The Collective Department-owned apps, agents, local data, dashboards, and tooling node
4 Mac-04 Hybrid Living Department-owned apps, agents, local data, dashboards, and tooling node
5 Mac-05 Nexus Labs Department-owned apps, agents, local data, dashboards, and tooling node
6 Mac-06 Terra Axis Department-owned apps, agents, local data, dashboards, and tooling node
7 Mac-07 Vital Helix Department-owned apps, agents, local data, dashboards, and tooling node
8 Mac-08 Binary Loom Engineering services, CI/CD, device APIs, infrastructure automation
9 Mac-09 Quantum Ledger Department-owned apps, agents, local data, dashboards, and tooling node
10 Mac-10 Kinetic Edge Department-owned apps, agents, local data, dashboards, and tooling node
11 Mac-11 Obsidian Arc Department-owned apps, agents, local data, dashboards, and tooling node
12 Mac-12 Civic Core Department-owned apps, agents, local data, dashboards, and tooling node
13 Mac-13 Aether Link Department-owned apps, agents, local data, dashboards, and tooling node
14 Mac-14 Gaia Synthesis Department-owned apps, agents, local data, dashboards, and tooling node
15 Mac-15 Vector Shift Drone, rover, logistics, and autonomous mobility control node
16 Mac-16 Animus Prime Android, robot, actuator, and embodied AI control node
17 Mac-17 Juris Guard Department-owned apps, agents, local data, dashboards, and tooling node
18 Mac-18 Signal Velocity Department-owned apps, agents, local data, dashboards, and tooling node
19 Mac-19 Nomad Nexus Department-owned apps, agents, local data, dashboards, and tooling node
20 Mac-20 Eon Core Department-owned apps, agents, local data, dashboards, and tooling node
21 Mac-21 Cognara Mind Department-owned apps, agents, local data, dashboards, and tooling node
22 Mac-22 Engineering A Build/test runner, code agents, local repositories
23 Mac-23 Engineering B Hardware bridge, ROS2 tooling, CAD/CAM files
24 Mac-24 Ops A Automation, n8n, schedulers, backups
25 Mac-25 Ops B Security, access, audit, device registry
26 Mac-26 Infra Controller Cluster manager, DNS/DHCP, service discovery
27 Mac-27 Observability OpenTelemetry, logs, metrics, traces
28 Mac-28 CI Worker Builds, tests, deploy previews, agent evals
29 Mac-29 Failover Node Hot spare for priority divisions
30 Mac-30 Model Sandbox Local model tests, vector/index experiments
Standard Department Node Kit
Component Quantity per
department
Use case
Mac mini with 10GbE preferred 1 Department-owned compute for agents, apps, databases, dashboards, APIs,
automations
Satechi or equivalent Mac mini hub +
NVMe enclosure
1 Low-cost expansion, SD/USB ports, external local project storage
4TB external NVMe / USB4 SSD 1 Department data, code, local vector store, datasets, exports
Small UPS or rack-backed circuit 1 share Graceful shutdown and power event protection
Labeled Cat6A drop + VLAN 1 Network isolation and routing policy per department
Local microphone/camera kit optional Department-specific testing, video capture, physical AI desk tools
Backup target on NAS 1 share Nightly snapshots and project archive
```

## Source
- [Collective_AI_Physical_AI_Foundry_Final.pdf](https://drive.google.com/file/d/1pZSHaIg3QjaBn5aKzESwq9zBND7LtshJ/view?usp=drivesdk) — Section 2 — Mac Mini Fleet: 30-Node Local Cloud. Read in full from Drive on 2026-10-06.

### Source records
- [Collective_AI_Physical_AI_Foundry_Final.pdf](https://drive.google.com/file/d/1pZSHaIg3QjaBn5aKzESwq9zBND7LtshJ/view?usp=drivesdk)

<!-- drive-expansion:8684f46747148d42eac3 -->
