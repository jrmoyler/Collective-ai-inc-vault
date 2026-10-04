---
title: SYN-12 Nomad Intelligence Kit
id: SYN-12
cost: ~$580–$780
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
divisions: Nomad Nexus, ZenFlow
---
# SYN-12 Nomad Intelligence Kit

Physical Synergy Node SYN-12 from the [[Full Synergy Node Catalog]]. Phase 2 — Intelligence + Sensing. Divisions: [[Nomad Nexus Division]] ✦ [[ZenFlow Division]].

| Field | Value |
|---|---|
| Node | SYN-12 |
| Kind | Physical hardware fusion node |
| Phase | 2 — Intelligence + Sensing |
| Divisions | Nomad Nexus, ZenFlow |
| Est. build budget | ~$580–$780 |
| Status | planned |

## Why These Divisions Fuse
Nomad Nexus serves location-independent professionals who need their full AI infrastructure while travelling. ZenFlow is that infrastructure. A portable kit giving a nomad their complete ZenFlow agent stack — offline-capable, mesh-connected, and ruggedized for travel.

## Product Description
A ruggedized carry case housing a Pi 5 running a local ZenFlow agent cache, a battery-backed Whisplay shell for voice interaction with ZENITH Overseer, a T-Deck Meshtastic terminal for off-grid mesh sync, and a Seeed XIAO wearable badge. The local NVMe cache holds a full snapshot of the Knowledge Keeper vector store. When off-grid, it runs on the local cache with claude-haiku for edge inference. On reconnect, the Session Archive Sync workflow pushes all offline interactions back to the Foundry.

> [!note] Model routing
> The catalog names the model string as written above. The vault's current model routing (Tier 1 = [[ZENITH]], [[HATAALII]] at Tier 0.5) lives in [[Agent Tier Registry]].

## Hardware Components (Bill of Materials)
The catalog gives one estimated budget for the whole build (~$580–$780); it does not price parts individually.
- Raspberry Pi 5 8GB — local ZenFlow agent cache + voice interface host
- Whisplay HAT — voice shell display for ZENITH Overseer
- ReSpeaker 2-Mics Pi HAT — field voice query input
- LILYGO T-Deck Meshtastic terminal — off-grid mesh sync + keyboard input
- LILYGO T-Beam Meshtastic — mesh gateway node
- Seeed XIAO nRF52840 Sense — nomad credential badge
- Pi M.2 HAT+ + 2TB NVMe — Knowledge Keeper local vector cache
- PiSugar 3 Plus — 5000mAh battery
- Pelican 1150 case with custom foam insert — ruggedized travel housing

## ZenFlow Agents
- ZenFlow ZENITH Overseer (local cache mode)
- Nomad Nexus Relocation Intelligence Agent
- Knowledge Keeper Local Sync Agent
- ZenFlow Agent Health Monitor (offline mode)

## n8n Workflows
- Session Archive Sync — reconnect push of offline interactions
- Nomad Visa Intelligence Update — daily policy sync when online
- Knowledge Keeper Snapshot Refresh — weekly cache update

## Division Contributions
| Division | Contribution |
|---|---|
| [[Nomad Nexus Division]] | Travel ruggedization, visa/relocation intelligence, portable office infrastructure, global mobility context |
| [[ZenFlow Division]] | Local ZENITH Overseer cache, Knowledge Keeper vector store, n8n workflow state, offline agent operations |

## Build Outcome
The full Foundry intelligence stack in a carry case — offline-capable, mesh-connected, syncs on reconnect.

**Est. budget:** ~$580–$780

## Phase Context
Wearables, terminals, compliance rigs, and intelligence kits. The human-scale sensing and data intelligence layer. 11 nodes, no actuation — these can all be built and operated before Phase 3 Aegis-Hold clearance.

> [!note] Build rule
> Phase 1 funds Phase 2. Phase 2 funds Phase 3. Phase 3 funds Phase 4. Do not build Phase 4 before Phase 1 proves revenue and operating discipline. This applies to both digital and physical nodes.

## Related
- [[ZENITH]]
- [[Knowledge Keeper]]
- [[Visa Intelligence Database]]
- [[The Mesh]]
- [[Director_Nomad_Nexus]]
- [[Director_ZenFlow]]
- [[Full Synergy Node Catalog]]
- [[Synergy Node Handbook]]
- [[Aegis Protocol]]
