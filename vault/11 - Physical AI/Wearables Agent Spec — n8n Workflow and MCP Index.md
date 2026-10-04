---
title: Wearables Agent Spec — n8n Workflow and MCP Index
tags:
- physical-ai
- wearables
- n8n
- mcp
type: spec-section
owner: JR Moyler (Hataalii)
source: Physical AI Wearables Agent Spec
updated: 2026-10-04
---
# Wearables Agent Spec — n8n Workflow and MCP Index

Every n8n workflow and MCP named on a device in the [[Physical AI Wearables Agent Spec]]. The spec states a 150-workflow layer; 63 distinct workflow names appear on devices. See [[n8n Workflow Blueprint]].

## n8n workflows
| Workflow | Devices |
|---|---|
| Aegis Safety Review Queue | Aegis Command Station, Atlas Perception Tower, Cipher Guardian Rack, Sentinel Prime Tower, Threat Intel Wearable, SOC Intelligence Terminal, Prime Shell v0.1, Titan Bench Arm, Dexterous Hand Node, Mobile Base Rover, Embodied AI Control Wearable, Sky Vector Dev Drone, Ground Vector Rover, Aerial Mesh Relay Drone, Flight Ops Wearable |
| ZenFlow Agent Health Monitor | Zenith Command Band, Aegis Command Station, Mesh Sentinel Array, Atlas Perception Tower, Zenith Oracle Voice Shell, ZenFlow Meshtastic Gateway, Logistics Mesh Node |
| Aegis Protocol Compliance Logger | Herald Badge Node, Mesh Sentinel Array, Cipher Guardian Rack, Sentinel Prime Tower, Forensic Evidence Node, SOC Intelligence Terminal |
| Weekly Performance Report Generator | Cohort Engagement Badge, Apex Motion Cage, Kinetic IQ Wearable, Team OS Field Station, Recovery Intelligence Node, Scout Intelligence Terminal |
| ZenFlow API Error Alerting | CORTEX Director Shell, Synaptic Relay Badge, Cipher Guardian Rack, Threat Intel Wearable, SOC Intelligence Terminal |
| Brand Asset Request Workflow | Client Intelligence Terminal, Strategy Scan Node, Resonance Studio Node, Vision Director Node, Documentary Capture Rig |
| Behavioral Pattern Digest | Cognitive Coaching Shell, Habit Architecture Wearable, Behavioral Sensing Station, Psychographic Field Kit, Neuro-Pulse Wristband |
| JWT Token Rotation Monitor | Aegis Command Station, Synaptic Relay Badge, Cipher Guardian Rack, SOC Intelligence Terminal |
| Cohort Engagement Monitor | Atlas Learning Kiosk, Cohort Engagement Badge, P.E.T.E.E.R. Assessment Node, Field Learning Kit |
| Collective Times Content Pipeline | Resonance Studio Node, Vision Director Node, Creator Nexus Wearable, Collective Times Broadcast Node |
| Agent Health Monitor | Mobile Base Rover, Sky Vector Dev Drone, Ground Vector Rover, Aerial Mesh Relay Drone |
| VectorShift Logistics Tracker | Sky Vector Dev Drone, Ground Vector Rover, Logistics Mesh Node, Flight Ops Wearable |
| Habit Architecture Workflow | Cognitive Coaching Shell, Habit Architecture Wearable, Behavioral Sensing Station, Neuro-Pulse Wristband |
| Daily Agent Performance Digest | Zenith Command Band, Zenith Oracle Voice Shell, CORTEX Director Shell |
| Cross-Division Weekly Standup Digest | Herald Badge Node, Aegis Command Station, Workshop Presence Node |
| Knowledge Keeper Digest | Zenith Oracle Voice Shell, Knowledge Keeper Vault Node, Prime Shell v0.1 |
| Inbound Inquiry → Proposal Generator | Herald Consultant Badge, Client Intelligence Terminal, Strategy Scan Node |
| Client Onboarding Sequence | Herald Consultant Badge, Client Intelligence Terminal, AI Audit Wearable Kit |
| Student Progress Report Generator | Atlas Learning Kiosk, Cohort Engagement Badge, P.E.T.E.E.R. Assessment Node |
| Skool Community Engagement Monitor | Resonance Studio Node, Creator Nexus Wearable, Collective Times Broadcast Node |
| Prediction Market Signal Aggregator | Aurum Trading Terminal, Alpha Signal Wristband, Market Intelligence Field Kit |
| Athlete Recovery Alert | Apex Motion Cage, Kinetic IQ Wearable, Recovery Intelligence Node |
| Scout Intelligence Aggregator | Apex Motion Cage, Team OS Field Station, Scout Intelligence Terminal |
| LeRobot Episode Archive | Titan Bench Arm, Dexterous Hand Node, Embodied AI Control Wearable |
| Embodied AI Session Log | Titan Bench Arm, Dexterous Hand Node, Embodied AI Control Wearable |
| ZenFlow Meshtastic Gateway bridge | Mobile Base Rover, Sky Vector Dev Drone, Logistics Mesh Node |
| Aegis Incident Reporter | Zenith Command Band, Synaptic Relay Badge |
| Portfolio Revenue Dashboard Sync | Aegis Command Station, Collective Times Broadcast Node |
| Agent Spawn + Teardown Orchestrator | CORTEX Director Shell, Prime Shell v0.1 |
| Prompt Library Version Control | CORTEX Director Shell, Agent Eval Bench |
| New Agent Onboarding Flow | CORTEX Director Shell, Agent Eval Bench |
| Cross-Division Intelligence Request Router | ZenFlow Meshtastic Gateway, Herald Consultant Badge |
| Creator Nexus Brief Auto-Generator | Vision Director Node, Documentary Capture Rig |
| Options Trade Alert + Journal Logger | Aurum Trading Terminal, Alpha Signal Wristband |
| Crypto Market Anomaly Alert | Aurum Trading Terminal, Alpha Signal Wristband |
| Portfolio P&L Daily Aggregator | Aurum Trading Terminal, Market Intelligence Field Kit |
| Regulatory Compliance Monitor | Aurum Trading Terminal, Chain Ledger Node |
| Quantum Alpha Institutional Report Generator | Chain Ledger Node, Institutional Briefing Node |
| Injury Risk Flag + Coaching Alert | Apex Motion Cage, Kinetic IQ Wearable |
| Cognara Mind Engagement Monitor | Cognitive Coaching Shell, Behavioral Sensing Station |
| Cost Tracker | Aegis Command Station |
| All 150 n8n workflows via voice-triggered webhook | Zenith Oracle Voice Shell |
| ZenFlow Marketplace Listing Auto-Generator | Knowledge Keeper Vault Node |
| Research Pipeline | Knowledge Keeper Vault Node |
| MCP Tool Integration Test Pipeline | Agent Eval Bench |
| AI Readiness Audit Scoring | AI Audit Wearable Kit |
| Impact Report Auto-Generator | AI Audit Wearable Kit |
| Participant Success Story Pipeline | Workshop Presence Node |
| Hybrid Living Enrollment Sequence | Atlas Learning Kiosk |
| Instructor Session Archive | Instructor Capture Node |
| Creator Track Content Pipeline | Instructor Capture Node |
| Nexus Labs Content Pipeline cross-link | Instructor Capture Node |
| Session Archive Sync on Return | Field Learning Kit |
| Quantum Genesis Tokenization Event Logger | Chain Ledger Node |
| DeFi Protocol Risk Monitor | Chain Ledger Node |
| Invoice + Revenue Recognition Automation | Institutional Briefing Node |
| Investor Update Auto-Pack | Institutional Briefing Node |
| Partnership Sponsorship Tracker | Team OS Field Station |
| Vital Helix cross-integration | Recovery Intelligence Node |
| Kinetic IQ Consumer Onboarding | Scout Intelligence Terminal |
| Evidence Archive Sync | Forensic Evidence Node |
| Aether Link Mesh Status | Aerial Mesh Relay Drone |
| Session Archive Sync | Psychographic Field Kit |

## MCP servers
| MCP | Device count | Devices |
|---|---|---|
| ZenFlow Internal API MCP | 56 | Zenith Command Band, Herald Badge Node, Aegis Command Station, Mesh Sentinel Array, Atlas Perception Tower, Zenith Oracle Voice Shell, CORTEX Director Shell, Synaptic Relay Badge, Knowledge Keeper Vault Node, Agent Eval Bench, ZenFlow Meshtastic Gateway, Herald Consultant Badge, Client Intelligence Terminal, Strategy Scan Node, AI Audit Wearable Kit, Workshop Presence Node, Atlas Learning Kiosk, Cohort Engagement Badge, Instructor Capture Node, P.E.T.E.E.R. Assessment Node, Field Learning Kit, Resonance Studio Node, Vision Director Node, Creator Nexus Wearable, Collective Times Broadcast Node, Documentary Capture Rig, Aurum Trading Terminal, Alpha Signal Wristband, Chain Ledger Node, Market Intelligence Field Kit, Institutional Briefing Node, Apex Motion Cage, Kinetic IQ Wearable, Team OS Field Station, Recovery Intelligence Node, Scout Intelligence Terminal, Cipher Guardian Rack, Sentinel Prime Tower, Forensic Evidence Node, Threat Intel Wearable, SOC Intelligence Terminal, Prime Shell v0.1, Titan Bench Arm, Dexterous Hand Node, Mobile Base Rover, Embodied AI Control Wearable, Sky Vector Dev Drone, Ground Vector Rover, Logistics Mesh Node, Aerial Mesh Relay Drone, Flight Ops Wearable, Cognitive Coaching Shell, Habit Architecture Wearable, Behavioral Sensing Station, Psychographic Field Kit, Neuro-Pulse Wristband |
| Notion MCP | 23 | Herald Badge Node, Aegis Command Station, Zenith Oracle Voice Shell, Knowledge Keeper Vault Node, Herald Consultant Badge, Client Intelligence Terminal, Strategy Scan Node, AI Audit Wearable Kit, Workshop Presence Node, Atlas Learning Kiosk, Cohort Engagement Badge, Instructor Capture Node, P.E.T.E.E.R. Assessment Node, Resonance Studio Node, Vision Director Node, Creator Nexus Wearable, Collective Times Broadcast Node, Documentary Capture Rig, Aurum Trading Terminal, Institutional Briefing Node, Scout Intelligence Terminal, Cognitive Coaching Shell, Behavioral Sensing Station |
| Slack MCP | 18 | Zenith Command Band, Aegis Command Station, Zenith Oracle Voice Shell, CORTEX Director Shell, Synaptic Relay Badge, Herald Consultant Badge, Client Intelligence Terminal, Workshop Presence Node, Resonance Studio Node, Creator Nexus Wearable, Collective Times Broadcast Node, Apex Motion Cage, Recovery Intelligence Node, Cipher Guardian Rack, Sentinel Prime Tower, Threat Intel Wearable, SOC Intelligence Terminal, Prime Shell v0.1 |
| n8n MCP | 17 | Zenith Command Band, Aegis Command Station, Mesh Sentinel Array, Zenith Oracle Voice Shell, CORTEX Director Shell, Knowledge Keeper Vault Node, ZenFlow Meshtastic Gateway, Field Learning Kit, Team OS Field Station, Cipher Guardian Rack, SOC Intelligence Terminal, Mobile Base Rover, Sky Vector Dev Drone, Ground Vector Rover, Logistics Mesh Node, Aerial Mesh Relay Drone, Psychographic Field Kit |
| Airtable MCP | 14 | AI Audit Wearable Kit, Atlas Learning Kiosk, Cohort Engagement Badge, Instructor Capture Node, P.E.T.E.E.R. Assessment Node, Apex Motion Cage, Kinetic IQ Wearable, Team OS Field Station, Recovery Intelligence Node, Scout Intelligence Terminal, Cognitive Coaching Shell, Habit Architecture Wearable, Behavioral Sensing Station, Neuro-Pulse Wristband |
| Sentry MCP | 8 | Atlas Perception Tower, Agent Eval Bench, Cipher Guardian Rack, Sentinel Prime Tower, Forensic Evidence Node, Threat Intel Wearable, SOC Intelligence Terminal, Titan Bench Arm |
| Google Drive MCP | 7 | Aegis Command Station, Client Intelligence Terminal, Strategy Scan Node, Instructor Capture Node, Resonance Studio Node, Vision Director Node, Collective Times Broadcast Node |
| LunarCrush MCP | 5 | Aurum Trading Terminal, Alpha Signal Wristband, Chain Ledger Node, Market Intelligence Field Kit, Scout Intelligence Terminal |
| GitHub MCP | 3 | Aegis Command Station, CORTEX Director Shell, Agent Eval Bench |
| LSEG MCP | 3 | Aurum Trading Terminal, Chain Ledger Node, Institutional Briefing Node |
| FactSet MCP | 3 | Aurum Trading Terminal, Chain Ledger Node, Institutional Briefing Node |
| Hugging Face MCP | 3 | Titan Bench Arm, Dexterous Hand Node, Embodied AI Control Wearable |
| Cloudinary MCP | 2 | Vision Director Node, Documentary Capture Rig |
| Obsidian Arc Security MCP | 1 | Atlas Perception Tower |
| Figma MCP | 1 | Strategy Scan Node |
| Blockscout MCP | 1 | Chain Ledger Node |
| Gmail MCP | 1 | Institutional Briefing Node |

Related: [[Collective Intelligence MCP Server]], [[External Toolkit — 130 Tools]].
