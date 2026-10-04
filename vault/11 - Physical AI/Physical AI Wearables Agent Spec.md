---
title: Physical AI Wearables Agent Spec
tags:
- hub
- physical-ai
- wearables
- device-agents
type: hub
owner: JR Moyler (Hataalii)
pages: 58
agents: 85
source: Physical AI Wearables Agent Spec
updated: 2026-10-04
products: 56
---
# Physical AI Wearables Agent Spec

Agent-integrated build spec (120-Tool Toolkit Edition) for Collective AI's physical AI and wearable devices. Every product pairs Physical AI Foundry hardware with specific ZenFlow agents, Anthropic APIs, n8n workflows and MCP servers. Owner: [[JR Moyler]] / Hataalii. Classification: Private Operating Blueprint. 58 pages.

## Headline counts
- 56 products: 6 parent + 5 in each of 10 divisions
- 85 distinct device agents (one note each)
- Agent layer: ZenFlow 600-agent lattice, Tiers 1-4
- 150 n8n workflows in the workflow layer
- Models listed: claude-sonnet-4-6, claude-haiku-4-5, claude-opus-4-6 (kept as written; routing in [[Agent Tier Registry]])
- Safety gate: all physical motion Aegis-cleared before execution

> [!note] Status
> These are build specs. Budgets are estimates. Nothing here is a shipped product.

## Cross-cutting sections
- [[Wearables Agent Spec — Architecture and Stack]]
- [[Wearables Agent Spec — Device Data Flow]]
- [[Wearables Agent Spec — Aegis Physical Safety Gate]]
- [[Wearables Agent Spec — Edge and Cloud Model Split]]
- [[Wearables Agent Spec — Haptic Code Map]]
- [[Wearables Agent Spec — n8n Workflow and MCP Index]]
- [[Wearables Agent Spec — Budget Summary]]

## Device sections
| Section | Division | Devices |
|---|---|---|
| [[Wearables Agent Spec — Parent Devices]] | [[Collective AI — Company Charter]] | CAI-W01 Zenith Command Band, CAI-W02 Herald Badge Node, CAI-W03 Aegis Command Station, CAI-W04 Mesh Sentinel Array, CAI-W05 Atlas Perception Tower, CAI-W06 Zenith Oracle Voice Shell |
| [[Wearables Agent Spec — ZenFlow Devices]] | [[ZenFlow Division]] | ZF-W01 CORTEX Director Shell, ZF-W02 Synaptic Relay Badge, ZF-W03 Knowledge Keeper Vault Node, ZF-W04 Agent Eval Bench, ZF-W05 ZenFlow Meshtastic Gateway |
| [[Wearables Agent Spec — The Collective Devices]] | [[The Collective Division]] | TC-W01 Herald Consultant Badge, TC-W02 Client Intelligence Terminal, TC-W03 Strategy Scan Node, TC-W04 AI Audit Wearable Kit, TC-W05 Workshop Presence Node |
| [[Wearables Agent Spec — Hybrid Living Devices]] | [[Hybrid Living Division]] | HL-W01 Atlas Learning Kiosk, HL-W02 Cohort Engagement Badge, HL-W03 Instructor Capture Node, HL-W04 P.E.T.E.E.R. Assessment Node, HL-W05 Field Learning Kit |
| [[Wearables Agent Spec — Nexus Labs Devices]] | [[Nexus Labs Division]] | NL-W01 Resonance Studio Node, NL-W02 Vision Director Node, NL-W03 Creator Nexus Wearable, NL-W04 Collective Times Broadcast Node, NL-W05 Documentary Capture Rig |
| [[Wearables Agent Spec — Quantum Ledger Devices]] | [[Quantum Ledger Division]] | QL-W01 Aurum Trading Terminal, QL-W02 Alpha Signal Wristband, QL-W03 Chain Ledger Node, QL-W04 Market Intelligence Field Kit, QL-W05 Institutional Briefing Node |
| [[Wearables Agent Spec — Kinetic Edge Devices]] | [[Kinetic Edge Division]] | KE-W01 Apex Motion Cage, KE-W02 Kinetic IQ Wearable, KE-W03 Team OS Field Station, KE-W04 Recovery Intelligence Node, KE-W05 Scout Intelligence Terminal |
| [[Wearables Agent Spec — Obsidian Arc Devices]] | [[Obsidian Arc Division]] | OA-W01 Cipher Guardian Rack, OA-W02 Sentinel Prime Tower, OA-W03 Forensic Evidence Node, OA-W04 Threat Intel Wearable, OA-W05 SOC Intelligence Terminal |
| [[Wearables Agent Spec — Animus Prime Devices]] | [[Animus Prime Division]] | AP-W01 Prime Shell v0.1, AP-W02 Titan Bench Arm, AP-W03 Dexterous Hand Node, AP-W04 Mobile Base Rover, AP-W05 Embodied AI Control Wearable |
| [[Wearables Agent Spec — VectorShift Devices]] | [[VectorShift Division]] | VS-W01 Sky Vector Dev Drone, VS-W02 Ground Vector Rover, VS-W03 Logistics Mesh Node, VS-W04 Aerial Mesh Relay Drone, VS-W05 Flight Ops Wearable |
| [[Wearables Agent Spec — Cognara Mind Devices]] | [[Cognara Mind Division]] | CM-W01 Cognitive Coaching Shell, CM-W02 Habit Architecture Wearable, CM-W03 Behavioral Sensing Station, CM-W04 Psychographic Field Kit, CM-W05 Neuro-Pulse Wristband |

## Device agents
### Shared across divisions
- [[Aegis Protocol Guardian]] (21 devices)
- [[Knowledge Keeper (Device Agent)]] (45 devices)
- [[Agent Health Monitor]] (4 devices)
- [[Transcription Task Agent]] (3 devices)
- [[Blueprint Architect]] (2 devices)
- [[CORTEX Director]] (2 devices)
- [[Director_Operations (Device Agent)]] (4 devices)
- [[Physical Security Task Agent]] (5 devices)
- [[Research Director]] (6 devices)
- [[Distribution Agent]] (4 devices)
- [[Obstacle Avoidance Agent]] (3 devices)
- [[Field Telemetry Task Agent]] (5 devices)
### Parent
- [[ZENITH Overseer]]
### ZenFlow
- [[ZenFlow Marketplace Listing Auto-Generator]]
- [[Status Check Task Agent]]
- [[JWT Token Rotation Monitor]]
- [[Data Ingestion Task Agent]]
- [[Model Performance Auditor]]
- [[Agent Spawner]]
- [[MCP Tool Integration Test Agent]]
- [[Device Registry Task Agent]]
### The Collective
- [[Inbound Inquiry Handler]]
- [[Proposal Generator Task Agent]]
- [[Client Intelligence Task Agent]]
- [[OCR + Structure Task Agent]]
- [[Audit Intelligence Task Agent]]
- [[Engagement Monitor Task Agent]]
- [[Workshop Facilitator Task Agent]]
### Hybrid Living
- [[AI Tutor Task Agent]]
- [[Learning Path Agent]]
- [[Cohort Manager Task Agent]]
- [[Curriculum Synthesis Task Agent]]
- [[Nexus Labs Content Relay Task Agent]]
- [[P.E.T.E.E.R. Assessment Task Agent]]
### Nexus Labs
- [[Collective Times Content Writer Task Agent]]
- [[Vision Tagging Task Agent]]
- [[Creator Nexus Brief Generator]]
- [[Idea Capture Task Agent]]
- [[Creator Nexus Vault Agent]]
- [[Skool Community Monitor Agent]]
- [[Scene Classification Task Agent]]
### Quantum Ledger
- [[Quantum Alpha Signal Agent]]
- [[Portfolio P&L Aggregator Task Agent]]
- [[Crypto Risk Monitor Agent]]
- [[Prediction Market Signal Aggregator]]
- [[DeFi Risk Monitor Agent]]
- [[Quantum Genesis Token Logger Task Agent]]
- [[Regulatory Compliance Monitor Agent]]
- [[Quantum Alpha Institutional Report Generator Agent]]
### Kinetic Edge
- [[Apex System Performance Agent]]
- [[Injury Risk Monitor Task Agent]]
- [[Biomechanical Analysis Task Agent]]
- [[Coaching Cue Dispatch Task Agent]]
- [[TeamOS Coaching Agent]]
- [[Voice Observation Task Agent]]
- [[Recovery Intelligence Task Agent]]
- [[Athlete Recovery Alert Agent]]
- [[Vital Helix Integration Task Agent]]
- [[Scout Intelligence Agent]]
- [[Prospect Profile Generator Task Agent]]
### Obsidian Arc
- [[Network Anomaly Detection Agent]]
- [[Spatial Intelligence Task Agent]]
- [[Evidence Integrity Task Agent]]
- [[SOC Incident Commander Task Agent]]
### Animus Prime
- [[Prime Shell Agent]]
- [[Speech Synthesis Task Agent]]
- [[Vision Perception Task Agent]]
- [[Titan Arm Agent]]
- [[LeRobot Teleoperation Task Agent]]
- [[Manipulation Training Data Collector]]
- [[Dexterous Hand Task Agent]]
- [[Grasp Planning Agent]]
- [[Mobile Navigation Task Agent]]
- [[Teleoperation Mapping Task Agent]]
- [[LeRobot Training Data Collector]]
### VectorShift
- [[Sky Vector Flight Agent]]
- [[Ground Vector Navigation Agent]]
- [[Logistics Tracker Task Agent]]
- [[Mesh Relay Flight Agent]]
- [[Aether Link Mesh Extension Task Agent]]
### Cognara Mind
- [[Cognitive Coach Task Agent]]
- [[Behavioral Pattern Analysis Agent]]
- [[Habit Architecture Agent]]
- [[Psychographic Profile Agent]]
- [[Cognitive Load Monitor Task Agent]]

## Related
- [[ZenFlow Master Blueprint]]
- [[Aegis Protocol Spec]]
- [[ZenFlow API]]
- [[n8n Workflow Blueprint]]
- [[002 — Divisions MOC]]
