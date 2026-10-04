---
title: SYN-20 Zenith Orchestration Tower
id: SYN-20
cost: ~$12,000–$18,000
kind: physical
tags:
- synergy-node
- physical-node
- phase-5
type: synergy-node
owner: JR Moyler (Hataalii)
phase: 5
source: Full Synergy Node Catalog
status: planned
updated: 2026-10-04
divisions: ZenFlow + all 20 divisions
---
# SYN-20 Zenith Orchestration Tower

Physical Synergy Node SYN-20 from the [[Full Synergy Node Catalog]]. Phase 5 — Command Infrastructure. Divisions: [[ZenFlow Division]] ✦ all 20 divisions.

| Field | Value |
|---|---|
| Node | SYN-20 |
| Kind | Physical hardware fusion node |
| Phase | 5 — Command Infrastructure |
| Divisions | ZenFlow + all 20 divisions |
| Est. build budget | ~$12,000–$18,000 |
| Status | planned |

## Why These Divisions Fuse
ZenFlow is the Central Nervous System of Collective AI. Every division runs on it. The Zenith Orchestration Tower is the physical manifestation of ZenFlow's role: a full-height rack presence that hosts ZENITH Overseer, all 20 Division Director agents, the Knowledge Keeper, and a real-time division health display showing every node in the 30-Mac cluster. It belongs to every division equally because every division depends on it.

## Product Description
A full-height rack terminal housing the Collective AI local cloud command layer: Mac mini M4 Pro running ZENITH Overseer, Synology DS1825+ NAS as the Knowledge Keeper Vault, UniFi Dream Machine Pro Max as the network command gateway, and a Pi 5 ambient display tower showing real-time health state for all 30 Mac mini nodes and all 600 ZenFlow agents. The tower's Whisplay display cycles through 20 division health panels. A far-field ReSpeaker array allows voice queries to ZENITH from anywhere on the Foundry floor.

## Hardware Components (Bill of Materials)
The catalog gives one estimated budget for the whole build (~$12,000–$18,000); it does not price parts individually.
- Mac mini M4 Pro 64GB — ZENITH Overseer permanent host (Mac-01 Parent Command Node)
- Synology DS1825+ 8-bay NAS + 8x12TB HDDs — Knowledge Keeper Vault + all division storage
- UniFi Dream Machine Pro Max — network command gateway, 8-VLAN policy enforcement
- UniFi Enterprise XG 24 — 10GbE core switch, all 30 Mac mini nodes
- Raspberry Pi 5 8GB ×2 — division health display controller + voice shell controller
- Whisplay HAT ×2 — 20-division cycling health panel + voice query display
- ReSpeaker 4-Mic Array v2.0 — far-field ZENITH voice interface (Foundry-floor range)
- CyberPower Rackmount UPS 1500VA — network + NAS + Mac mini power protection
- Sonnet RackMac mini — clean Mac mini cluster mount in rack
- LILYGO T-Beam Meshtastic — mesh bridge, Foundry gateway node for all physical devices

## ZenFlow Agents
- ZenFlow ZENITH Overseer Agent — Tier 1 (cross-portfolio command)
- All 20 Division Director Agents (routed through this tower)
- ZenFlow Knowledge Keeper (primary Vault)
- ZenFlow Aegis Protocol Guardian (master queue — all physical + software flags)
- Director_Operations Agent (150 n8n workflow health)
- ZenFlow Agent Health Monitor (30-Mac cluster + 600-agent lattice)

## n8n Workflows
- ZenFlow Agent Health Monitor — fires every 15 min, all 30 nodes
- Aegis Safety Review Queue — master incident router, all divisions + physical
- Portfolio Revenue Dashboard Sync — weekly executive summary
- Cross-Division Intelligence Request Router — ZENITH routes to correct division
- Daily Agent Performance Digest

## Division Contributions
| Division | Contribution |
|---|---|
| [[ZenFlow Division]] | ZENITH Overseer host, Knowledge Keeper Vault, Aegis master queue, agent API gateway, mesh bridge |
| All 20 Divisions | Each division's Director Agent is permanently hosted and routed through this tower |

## Build Outcome
The physical Overseer — every division visible, every agent reachable, every node monitored. The Foundry's single source of truth.

**Est. budget:** ~$12,000–$18,000

## Phase Context
The full Foundry command layer — ZENITH Overseer, Knowledge Keeper Vault, 30-node cluster, 600-agent lattice. Build this last; it becomes the most powerful when everything else is already connected.

> [!note] Build rule
> Phase 1 funds Phase 2. Phase 2 funds Phase 3. Phase 3 funds Phase 4. Do not build Phase 4 before Phase 1 proves revenue and operating discipline. This applies to both digital and physical nodes.

## Related
- [[ZENITH]]
- [[HATAALII]]
- [[Knowledge Keeper]]
- [[Aegis Protocol]]
- [[Director_Operations]]
- [[Agent Tier Registry]]
- [[Zenith OS]]
- [[Full Synergy Node Catalog]]
- [[Synergy Node Handbook]]
