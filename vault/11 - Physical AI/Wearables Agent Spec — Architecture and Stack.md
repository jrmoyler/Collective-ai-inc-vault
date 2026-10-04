---
title: Wearables Agent Spec — Architecture and Stack
tags:
- physical-ai
- wearables
- architecture
type: spec-section
owner: JR Moyler (Hataalii)
source: Physical AI Wearables Agent Spec
updated: 2026-10-04
---
# Wearables Agent Spec — Architecture and Stack

Stack layers stated on the cover of the [[Physical AI Wearables Agent Spec]].

| Layer | As stated in the spec |
|---|---|
| Owner | [[JR Moyler]] / [[Hataalii Persona]] — Collective AI Inc |
| Classification | Private Operating Blueprint |
| Entities | 1 Parent + 10 Divisions (partial, priority divisions) |
| Products | 56 total products |
| Agent layer | ZenFlow 600-agent lattice, Tiers 1-4 |
| API layer | Anthropic claude-sonnet-4-6 / claude-haiku-4-5 / claude-opus-4-6 |
| Workflow layer | 150 n8n workflows, named per product |
| MCP layer | ZenFlow MCP, Notion, Slack, GitHub, Sentry, HuggingFace, Blockscout, LSEG + more |
| Safety gate | Aegis Protocol: all physical motion Aegis-cleared before execution |
| Hardware | Physical AI Foundry catalog |
| Intelligence | 120-tool Collective AI stack (120-Tool Toolkit Edition) |

> [!note] Model strings
> The spec's model strings are kept as written. Current vault routing is in [[Agent Tier Registry]]. Tier 1 is [[ZENITH]] alone.

## Device classes
| Type | Count | Devices |
|---|---|---|
| Wearable | 14 | Zenith Command Band, Herald Badge Node, Synaptic Relay Badge, Herald Consultant Badge, AI Audit Wearable Kit, Cohort Engagement Badge, Creator Nexus Wearable, Alpha Signal Wristband, Kinetic IQ Wearable, Threat Intel Wearable, Embodied AI Control Wearable, Flight Ops Wearable, Habit Architecture Wearable, Neuro-Pulse Wristband |
| Physical AI | 18 | Aegis Command Station, Atlas Perception Tower, Zenith Oracle Voice Shell, CORTEX Director Shell, Strategy Scan Node, Workshop Presence Node, Instructor Capture Node, P.E.T.E.E.R. Assessment Node, Resonance Studio Node, Vision Director Node, Documentary Capture Rig, Institutional Briefing Node, Apex Motion Cage, Recovery Intelligence Node, Cipher Guardian Rack, Sentinel Prime Tower, Cognitive Coaching Shell, Behavioral Sensing Station |
| Edge Terminal | 10 | Knowledge Keeper Vault Node, Agent Eval Bench, Client Intelligence Terminal, Atlas Learning Kiosk, Collective Times Broadcast Node, Aurum Trading Terminal, Chain Ledger Node, Scout Intelligence Terminal, Forensic Evidence Node, SOC Intelligence Terminal |
| Mesh Node | 3 | Mesh Sentinel Array, ZenFlow Meshtastic Gateway, Logistics Mesh Node |
| Field Kit | 4 | Field Learning Kit, Market Intelligence Field Kit, Team OS Field Station, Psychographic Field Kit |
| Android/Robot | 7 | Prime Shell v0.1, Titan Bench Arm, Dexterous Hand Node, Mobile Base Rover, Sky Vector Dev Drone, Ground Vector Rover, Aerial Mesh Relay Drone |

## Sections
| Section | Devices | Note |
|---|---|---|
| Collective AI Inc (parent) | 6 | [[Wearables Agent Spec — Parent Devices]] |
| ZenFlow | 5 | [[Wearables Agent Spec — ZenFlow Devices]] |
| The Collective | 5 | [[Wearables Agent Spec — The Collective Devices]] |
| Hybrid Living | 5 | [[Wearables Agent Spec — Hybrid Living Devices]] |
| Nexus Labs | 5 | [[Wearables Agent Spec — Nexus Labs Devices]] |
| Quantum Ledger | 5 | [[Wearables Agent Spec — Quantum Ledger Devices]] |
| Kinetic Edge | 5 | [[Wearables Agent Spec — Kinetic Edge Devices]] |
| Obsidian Arc | 5 | [[Wearables Agent Spec — Obsidian Arc Devices]] |
| Animus Prime | 5 | [[Wearables Agent Spec — Animus Prime Devices]] |
| VectorShift | 5 | [[Wearables Agent Spec — VectorShift Devices]] |
| Cognara Mind | 5 | [[Wearables Agent Spec — Cognara Mind Devices]] |

Divisions covered: ZenFlow, The Collective, Hybrid Living, Nexus Labs, Quantum Ledger, Kinetic Edge, Obsidian Arc, Animus Prime, VectorShift, Cognara Mind. The spec uses its own division numbers; the vault uses names.

## Shared agent backbone
- [[Knowledge Keeper (Device Agent)]] appears on 45 of 56 devices.
- [[Aegis Protocol Guardian]] appears on 21 of 56 devices.
- 85 distinct agent names appear across the 56 device agent lists. Each has a note in the Agent Specs folder.
- Every device lists the ZenFlow Internal API MCP (some in staging, local or local-cache mode).

## Foundry compute and network references
- Aegis Command Station: Mac mini M4 Pro 64GB parent command node; displays health from all 30 Mac mini nodes.
- Named Mac mini nodes: Mac-02 (ZenFlow node, CORTEX Director Shell), Mac-11 (Obsidian Arc node, SOC Intelligence Terminal), Mac-30 (Model Sandbox, Agent Eval Bench), plus Quantum Ledger, TeamOS, Hybrid Living and Cognara Mac minis.
- VLANs named: VLAN 10 Command, VLAN 20 Department Nodes, VLAN 40 Physical AI / Robotics, VLAN 80 Quarantine. The SOC terminal monitors all 8 VLAN streams.
- Synology DS1825+ 8-bay NAS (with encrypted share and air-gapped partition uses).

## Related
- [[Wearables Agent Spec — Device Data Flow]]
- [[Wearables Agent Spec — Aegis Physical Safety Gate]]
- [[Wearables Agent Spec — Edge and Cloud Model Split]]
- [[ZenFlow API]]
- [[n8n Workflow Blueprint]]
- [[ZenFlow Division]]
