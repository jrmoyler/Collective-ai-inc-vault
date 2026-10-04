---
title: SYN-14 Terra Habitat Sentinel
id: SYN-14
cost: ~$280–$420
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
divisions: Terra Axis, Obsidian Arc
---
# SYN-14 Terra Habitat Sentinel

Physical Synergy Node SYN-14 from the [[Full Synergy Node Catalog]]. Phase 2 — Intelligence + Sensing. Divisions: [[Terra Axis Division]] ✦ [[Obsidian Arc Division]].

| Field | Value |
|---|---|
| Node | SYN-14 |
| Kind | Physical hardware fusion node |
| Phase | 2 — Intelligence + Sensing |
| Divisions | Terra Axis, Obsidian Arc |
| Est. build budget | ~$280–$420 |
| Status | planned |

## Why These Divisions Fuse
Terra Axis monitors physical property conditions. Obsidian Arc monitors physical security. A shared sensor node installed at a property monitors both simultaneously — property intelligence and security intelligence from one device, one power connection, one data stream.

## Product Description
A building-mounted smart sensor hub generating both Terra Axis property intelligence data and Obsidian Arc physical security event data from a single installed unit. Environmental sensors feed the Property Intelligence Agent for building health monitoring and energy optimization. The security sensor layer feeds the Network Anomaly Agent for access event logging and intrusion detection. Both agents run on the same embedded Pi controller.

## Hardware Components (Bill of Materials)
The catalog gives one estimated budget for the whole build (~$280–$420); it does not price parts individually.
- Raspberry Pi 5 4GB — dual-agent node controller
- BME688 Environmental Sensor — temperature, humidity, VOC, pressure
- SCD41 CO2 Sensor — occupancy proxy + air quality
- PIR Motion Sensor ×2 — security perimeter + occupancy detection
- Magnetic door/window contact sensors ×4 — access event logging
- LILYGO T-Beam Meshtastic — mesh reporting to Foundry
- Pi M.2 HAT+ + 512GB NVMe — property + security time-series
- PoE+ HAT — single ethernet cable deployment
- Weatherproof enclosure (IP65)

## ZenFlow Agents
- Terra Axis Property Intelligence Agent
- Obsidian Arc Network Anomaly Agent (physical layer)
- Habitat Sentinel Fusion Task Agent
- ZenFlow Knowledge Keeper

## n8n Workflows
- Terra Property Health Dashboard Sync — continuous environmental feed
- Obsidian Arc Physical Event Logger — access + intrusion events
- Maintenance Schedule Trigger — fires on environmental threshold breach
- Security Alert Escalation — Aegis-Review for anomalous access events

## Division Contributions
| Division | Contribution |
|---|---|
| [[Terra Axis Division]] | Environmental property health monitoring, occupancy analytics, energy optimization, maintenance scheduling |
| [[Obsidian Arc Division]] | Physical access event logging, intrusion detection, security anomaly alerting, incident escalation |

## Build Outcome
Unified property + security intelligence node — one installation generates both building health and security event data.

**Est. budget:** ~$280–$420

## Phase Context
Wearables, terminals, compliance rigs, and intelligence kits. The human-scale sensing and data intelligence layer. 11 nodes, no actuation — these can all be built and operated before Phase 3 Aegis-Hold clearance.

> [!note] Build rule
> Phase 1 funds Phase 2. Phase 2 funds Phase 3. Phase 3 funds Phase 4. Do not build Phase 4 before Phase 1 proves revenue and operating discipline. This applies to both digital and physical nodes.

## Related
- [[Smart Habitat System]]
- [[HomeHub]]
- [[Physical Security Intelligence]]
- [[Knowledge Keeper]]
- [[Director_Terra_Axis]]
- [[Director_Obsidian_Arc]]
- [[Full Synergy Node Catalog]]
- [[Synergy Node Handbook]]
- [[Aegis Protocol]]
