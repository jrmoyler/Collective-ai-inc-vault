---
title: SYN-01 Sentinel Guardian
id: SYN-01
cost: ~$750–$1,000
kind: physical
tags:
- synergy-node
- physical-node
- phase-2
type: synergy-node
owner: JR Moyler (Hataalii)
phase: 2
source: Full Synergy Node Catalog
status: planned
updated: 2026-10-04
divisions: Obsidian Arc, ZenFlow
---
# SYN-01 Sentinel Guardian

Physical Synergy Node SYN-01 from the [[Full Synergy Node Catalog]]. Phase 2 — Intelligence + Sensing. Divisions: [[Obsidian Arc Division]] ✦ [[ZenFlow Division]].

| Field | Value |
|---|---|
| Node | SYN-01 |
| Kind | Physical hardware fusion node |
| Phase | 2 — Intelligence + Sensing |
| Divisions | Obsidian Arc, ZenFlow |
| Est. build budget | ~$750–$1,000 |
| Status | planned |

## Why These Divisions Fuse
Obsidian Arc generates physical threat events. ZenFlow governs software agent safety. This node unifies both under a single Aegis Protocol queue — a person in a restricted zone and a rogue agent output are treated as the same class of event and resolved through identical human-review workflows.

## Product Description
A mounted perception mast feeding both the Obsidian Arc security layer and the ZenFlow Aegis Protocol simultaneously. LiDAR + depth camera classify physical events (zone breach, unknown person, forced entry) and inject them into the ZenFlow `/v1/aegis` queue alongside software agent flags. Physical and digital threats are investigated through the same n8n Aegis Safety Review Queue. An e-stop relay output halts any robot or actuator the moment a physical intrusion is detected.

## Hardware Components (Bill of Materials)
The catalog gives one estimated budget for the whole build (~$750–$1,000); it does not price parts individually.
- NVIDIA Jetson Orin Nano Super — inference engine
- RPLIDAR A1M8 — 360° 2D LiDAR zone mapping
- Luxonis OAK-D Lite — depth + RGB + on-device neural inference
- Raspberry Pi AI Camera / Sony IMX500 — on-sensor object classification
- Raspberry Pi 5 — unified incident dashboard controller
- Whisplay HAT — incident display + acknowledge button
- Emergency stop relay output — hardwired to robot bench e-stop rail
- Pi M.2 HAT+ + 2TB NVMe — event log + video clips
- PoE injector — UniFi Enterprise 24 PoE powered

## ZenFlow Agents
- ZenFlow Aegis Protocol Guardian
- Obsidian Arc Network Anomaly Detection Agent
- Physical Security Task Agent
- ZenFlow Knowledge Keeper

## n8n Workflows
- Aegis Safety Review Queue — fires on any aegis_hold event
- Aegis Protocol Compliance Logger — daily event batch report
- UniFi VLAN Alert Trigger

## Division Contributions
| Division | Contribution |
|---|---|
| [[Obsidian Arc Division]] | Network/physical threat detection, VLAN policy, NVR, IDS/IPS context |
| [[ZenFlow Division]] | Aegis Protocol queue, Knowledge Keeper logging, ZENITH incident routing |

## Build Outcome
Unified physical + software threat node — one Aegis queue governs both robot safety and perimeter intrusion.

**Est. budget:** ~$750–$1,000

## Phase Context
Wearables, terminals, compliance rigs, and intelligence kits. The human-scale sensing and data intelligence layer. 11 nodes, no actuation — these can all be built and operated before Phase 3 Aegis-Hold clearance.

> [!note] Build rule
> Phase 1 funds Phase 2. Phase 2 funds Phase 3. Phase 3 funds Phase 4. Do not build Phase 4 before Phase 1 proves revenue and operating discipline. This applies to both digital and physical nodes.

## Related
- [[Aegis Protocol]]
- [[Aegis Protocol Spec]]
- [[Knowledge Keeper]]
- [[ZENITH]]
- [[Physical Security Intelligence]]
- [[Director_Obsidian_Arc]]
- [[Director_ZenFlow]]
- [[Full Synergy Node Catalog]]
- [[Synergy Node Handbook]]
