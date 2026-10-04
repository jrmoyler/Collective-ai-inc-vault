---
title: Knowledge Keeper (Device Agent)
tags:
- device-agent
- physical-ai
- wearables
- wearable
- mesh-node
- edge-terminal
- field-kit
- android-robot
tier: not stated
type: device-agent
model: claude-sonnet-4-6, claude-haiku-4-5, claude-opus-4-6
owner: JR Moyler (Hataalii)
device: CAI-W01 Zenith Command Band, CAI-W02 Herald Badge Node, CAI-W03 Aegis Command Station, CAI-W04 Mesh Sentinel Array, CAI-W05 Atlas Perception Tower, CAI-W06 Zenith Oracle Voice Shell, ZF-W01 AXIS Director Shell, ZF-W03 Knowledge Keeper Vault Node, TC-W01 Herald Consultant Badge, TC-W02 Client Intelligence Terminal, TC-W03 Strategy Scan Node, TC-W04 AI Audit Wearable Kit, TC-W05 Workshop Presence Node, HL-W01 Atlas Learning Kiosk, HL-W02 Cohort Engagement Badge, HL-W03 Instructor Capture Node, HL-W04 P.E.T.E.E.R. Assessment Node, HL-W05 Field Learning Kit, NL-W01 Resonance Studio Node, NL-W02 Vision Director Node, NL-W03 Creator Nexus Wearable, NL-W05 Documentary Capture Rig, QL-W01 Aurum Trading Terminal, QL-W03 Chain Ledger Node, QL-W05 Institutional Briefing Node, KE-W01 Apex Motion Cage, KE-W03 Team OS Field Station, KE-W04 Recovery Intelligence Node, KE-W05 Scout Intelligence Terminal, OA-W01 Cipher Guardian Rack, OA-W02 Sentinel Prime Tower, OA-W03 Forensic Evidence Node, AP-W01 Prime Shell v0.1, AP-W02 Titan Bench Arm, AP-W03 Dexterous Hand Node, AP-W04 Mobile Base Rover, AP-W05 Embodied AI Control Wearable, VS-W01 Sky Vector Dev Drone, VS-W02 Ground Vector Rover, VS-W04 Aerial Mesh Relay Drone, CM-W01 Cognitive Coaching Shell, CM-W02 Habit Architecture Wearable, CM-W03 Behavioral Sensing Station, CM-W04 Psychographic Field Kit, CM-W05 Neuro-Pulse Wristband
source: Physical AI Wearables Agent Spec
status: spec
updated: 2026-10-04
division: Collective AI (parent), ZenFlow, The Collective, Hybrid Living, Nexus Labs, Quantum Ledger, Kinetic Edge, Obsidian Arc, Animus Prime, VectorShift, Cognara Mind
clearance: Aegis-governed device(s); see Aegis clause
device_count: 45
---
# Knowledge Keeper (Device Agent)

Device agent from the [[Physical AI Wearables Agent Spec]]. Divisions: [[Collective AI — Company Charter]], [[ZenFlow Division]], [[The Collective Division]], [[Hybrid Living Division]], [[Nexus Labs Division]], [[Quantum Ledger Division]], [[Kinetic Edge Division]], [[Obsidian Arc Division]], [[Animus Prime Division]], [[VectorShift Division]], [[Cognara Mind Division]].
The spec names this agent **Knowledge Keeper**. The vault already has a note by that name, so this note carries the device suffix.
Related: [[Knowledge_Keeper]], [[Knowledge Keeper]].

## Role
Foundry-wide memory. Present on 45 of the 56 devices. Logs sessions, interactions, captures, flight records and evidence entries through ZenFlow /v1/knowledge/write. Its physical home is the Knowledge Keeper Vault Node, which indexes all 600 agent interactions with vector embeddings and answers semantic search for any division's shell. Field kits run it as a local cache that syncs on reconnect.

## Devices it runs on
| Code | Device | Type | Section | Listed as |
|---|---|---|---|---|
| CAI-W01 | Zenith Command Band | Wearable | [[Wearables Agent Spec — Parent Devices]] | Knowledge Keeper |
| CAI-W02 | Herald Badge Node | Wearable | [[Wearables Agent Spec — Parent Devices]] | Knowledge Keeper |
| CAI-W03 | Aegis Command Station | Physical AI | [[Wearables Agent Spec — Parent Devices]] | Knowledge Keeper |
| CAI-W04 | Mesh Sentinel Array | Mesh Node | [[Wearables Agent Spec — Parent Devices]] | Knowledge Keeper |
| CAI-W05 | Atlas Perception Tower | Physical AI | [[Wearables Agent Spec — Parent Devices]] | Knowledge Keeper |
| CAI-W06 | Zenith Oracle Voice Shell | Physical AI | [[Wearables Agent Spec — Parent Devices]] | Knowledge Keeper |
| ZF-W01 | CORTEX Director Shell | Physical AI | [[Wearables Agent Spec — ZenFlow Devices]] | Knowledge Keeper |
| ZF-W03 | Knowledge Keeper Vault Node | Edge Terminal | [[Wearables Agent Spec — ZenFlow Devices]] | Knowledge Keeper |
| TC-W01 | Herald Consultant Badge | Wearable | [[Wearables Agent Spec — The Collective Devices]] | Knowledge Keeper |
| TC-W02 | Client Intelligence Terminal | Edge Terminal | [[Wearables Agent Spec — The Collective Devices]] | Knowledge Keeper |
| TC-W03 | Strategy Scan Node | Physical AI | [[Wearables Agent Spec — The Collective Devices]] | Knowledge Keeper |
| TC-W04 | AI Audit Wearable Kit | Wearable | [[Wearables Agent Spec — The Collective Devices]] | Knowledge Keeper |
| TC-W05 | Workshop Presence Node | Physical AI | [[Wearables Agent Spec — The Collective Devices]] | Knowledge Keeper |
| HL-W01 | Atlas Learning Kiosk | Edge Terminal | [[Wearables Agent Spec — Hybrid Living Devices]] | Knowledge Keeper |
| HL-W02 | Cohort Engagement Badge | Wearable | [[Wearables Agent Spec — Hybrid Living Devices]] | Knowledge Keeper |
| HL-W03 | Instructor Capture Node | Physical AI | [[Wearables Agent Spec — Hybrid Living Devices]] | Knowledge Keeper |
| HL-W04 | P.E.T.E.E.R. Assessment Node | Physical AI | [[Wearables Agent Spec — Hybrid Living Devices]] | Knowledge Keeper |
| HL-W05 | Field Learning Kit | Field Kit | [[Wearables Agent Spec — Hybrid Living Devices]] | Knowledge Keeper (local cache) |
| NL-W01 | Resonance Studio Node | Physical AI | [[Wearables Agent Spec — Nexus Labs Devices]] | Knowledge Keeper |
| NL-W02 | Vision Director Node | Physical AI | [[Wearables Agent Spec — Nexus Labs Devices]] | Knowledge Keeper |
| NL-W03 | Creator Nexus Wearable | Wearable | [[Wearables Agent Spec — Nexus Labs Devices]] | Knowledge Keeper |
| NL-W05 | Documentary Capture Rig | Physical AI | [[Wearables Agent Spec — Nexus Labs Devices]] | Knowledge Keeper |
| QL-W01 | Aurum Trading Terminal | Edge Terminal | [[Wearables Agent Spec — Quantum Ledger Devices]] | Knowledge Keeper |
| QL-W03 | Chain Ledger Node | Edge Terminal | [[Wearables Agent Spec — Quantum Ledger Devices]] | Knowledge Keeper |
| QL-W05 | Institutional Briefing Node | Physical AI | [[Wearables Agent Spec — Quantum Ledger Devices]] | Knowledge Keeper |
| KE-W01 | Apex Motion Cage | Physical AI | [[Wearables Agent Spec — Kinetic Edge Devices]] | Knowledge Keeper |
| KE-W03 | Team OS Field Station | Field Kit | [[Wearables Agent Spec — Kinetic Edge Devices]] | Knowledge Keeper |
| KE-W04 | Recovery Intelligence Node | Physical AI | [[Wearables Agent Spec — Kinetic Edge Devices]] | Knowledge Keeper |
| KE-W05 | Scout Intelligence Terminal | Edge Terminal | [[Wearables Agent Spec — Kinetic Edge Devices]] | Knowledge Keeper |
| OA-W01 | Cipher Guardian Rack | Physical AI | [[Wearables Agent Spec — Obsidian Arc Devices]] | Knowledge Keeper |
| OA-W02 | Sentinel Prime Tower | Physical AI | [[Wearables Agent Spec — Obsidian Arc Devices]] | Knowledge Keeper |
| OA-W03 | Forensic Evidence Node | Edge Terminal | [[Wearables Agent Spec — Obsidian Arc Devices]] | Knowledge Keeper |
| AP-W01 | Prime Shell v0.1 | Android/Robot | [[Wearables Agent Spec — Animus Prime Devices]] | Knowledge Keeper |
| AP-W02 | Titan Bench Arm | Android/Robot | [[Wearables Agent Spec — Animus Prime Devices]] | Knowledge Keeper |
| AP-W03 | Dexterous Hand Node | Android/Robot | [[Wearables Agent Spec — Animus Prime Devices]] | Knowledge Keeper |
| AP-W04 | Mobile Base Rover | Android/Robot | [[Wearables Agent Spec — Animus Prime Devices]] | Knowledge Keeper |
| AP-W05 | Embodied AI Control Wearable | Wearable | [[Wearables Agent Spec — Animus Prime Devices]] | Knowledge Keeper |
| VS-W01 | Sky Vector Dev Drone | Android/Robot | [[Wearables Agent Spec — VectorShift Devices]] | Knowledge Keeper |
| VS-W02 | Ground Vector Rover | Android/Robot | [[Wearables Agent Spec — VectorShift Devices]] | Knowledge Keeper |
| VS-W04 | Aerial Mesh Relay Drone | Android/Robot | [[Wearables Agent Spec — VectorShift Devices]] | Knowledge Keeper |
| CM-W01 | Cognitive Coaching Shell | Physical AI | [[Wearables Agent Spec — Cognara Mind Devices]] | Knowledge Keeper |
| CM-W02 | Habit Architecture Wearable | Wearable | [[Wearables Agent Spec — Cognara Mind Devices]] | Knowledge Keeper |
| CM-W03 | Behavioral Sensing Station | Physical AI | [[Wearables Agent Spec — Cognara Mind Devices]] | Knowledge Keeper |
| CM-W04 | Psychographic Field Kit | Field Kit | [[Wearables Agent Spec — Cognara Mind Devices]] | Knowledge Keeper (local) |
| CM-W05 | Neuro-Pulse Wristband | Wearable | [[Wearables Agent Spec — Cognara Mind Devices]] | Knowledge Keeper |

## Inputs and sensors
- **Zenith Command Band**: Adafruit Feather nRF52840 Sense; Adafruit DRV2605L Haptic Controller; IMU ICM-20948
- **Herald Badge Node**: Seeed XIAO ESP32S3 Sense; Adafruit DRV2605L Haptic Controller; Circuit Playground Bluefruit
- **Aegis Command Station**: Mac mini M4 Pro 64GB (parent command node); Synology DS1825+ 8-bay NAS; UniFi Dream Machine Pro Max; Raspberry Pi 5 + Whisplay HAT (ZenFlow shell); ReSpeaker 4-Mic Array v2.0
- **Mesh Sentinel Array**: LILYGO T-Beam Meshtastic (×4); Heltec V3 Meshtastic nodes (×6); LILYGO T-Deck (field terminal); Raspberry Pi 5 (MQTT bridge gateway)
- **Atlas Perception Tower**: NVIDIA Jetson Orin Nano Super; RPLIDAR A1M8; Luxonis OAK-D Lite; Raspberry Pi AI Camera (Sony IMX500); RealSense D435i
- **Zenith Oracle Voice Shell**: Raspberry Pi 5 8GB; Whisplay HAT; ReSpeaker 4-Mic Array v2.0; Adafruit I2S Speaker Bonnet; Pi Camera Module 3
- **CORTEX Director Shell**: Mac mini M4 24GB (ZenFlow node Mac-02); Raspberry Pi 5 + Whisplay HAT; ReSpeaker 2-Mics Pi HAT; Adafruit I2S Speaker Bonnet
- **Knowledge Keeper Vault Node**: Raspberry Pi 5 8GB; Whisplay HAT (ingestion rate display)
- **Herald Consultant Badge**: Seeed XIAO ESP32S3 Sense; Adafruit DRV2605L Haptic Controller; Circuit Playground Bluefruit
- **Client Intelligence Terminal**: NVIDIA Jetson Orin Nano Super; Raspberry Pi 5 + Whisplay HAT; ReSpeaker 4-Mic Array v2.0; Pi Camera Module 3; Adafruit I2S Speaker Bonnet
- **Strategy Scan Node**: NVIDIA Jetson Orin Nano Super; Arducam 64MP Hawkeye Camera; Raspberry Pi 5 (controller + display); Whisplay HAT
- **AI Audit Wearable Kit**: Arduino Nano 33 BLE Sense Rev2 (×3); Adafruit DRV2605L Haptic Controller (×3); IMU BNO085 (×3)
- **Workshop Presence Node**: Raspberry Pi 5 8GB; Raspberry Pi AI Camera (Sony IMX500); Luxonis OAK-D Lite (depth); IMU BNO085; Whisplay HAT (facilitator display)
- **Atlas Learning Kiosk**: Raspberry Pi 5 8GB; Whisplay HAT; ReSpeaker 4-Mic Array v2.0; Adafruit I2S Speaker Bonnet; Pi Camera Module 3
- **Cohort Engagement Badge**: Arduino Nano 33 BLE Sense Rev2; Adafruit DRV2605L Haptic Controller; IMU BNO085; Circuit Playground Bluefruit
- **Instructor Capture Node**: Raspberry Pi 5 8GB (×2 dual-camera); Pi Camera Module 3 Wide; Pi Global Shutter Camera; ReSpeaker 4-Mic Array v2.0; NVIDIA Jetson Orin Nano Super
- **P.E.T.E.E.R. Assessment Node**: Raspberry Pi 5 8GB; Whisplay HAT; ReSpeaker 2-Mics Pi HAT; Adafruit I2S Speaker Bonnet
- **Field Learning Kit**: Raspberry Pi 5 8GB; Whisplay HAT; ReSpeaker 4-Mic Array v2.0; LILYGO T-Deck Meshtastic
- **Resonance Studio Node**: NVIDIA Jetson Orin Nano Super; ReSpeaker 4-Mic Array v2.0; Adafruit I2S Speaker Bonnet; Stereo 3W speakers; Raspberry Pi 5 (UI); Whisplay HAT
- **Vision Director Node**: Raspberry Pi 5 8GB (×2); Pi Camera Module 3 Wide (×2); Arducam 64MP Hawkeye (hero close-up); Pi AI Camera (Sony IMX500 scene tagging); NVIDIA Jetson Orin Nano Super
- **Creator Nexus Wearable**: Seeed XIAO ESP32S3 Sense; Circuit Playground Bluefruit; Adafruit DRV2605L Haptic Controller
- **Documentary Capture Rig**: Pi Global Shutter Camera (fast motion); Pi Camera Module 3 Wide (environment); Pi AI Camera (scene classifier); NVIDIA Jetson Orin Nano Super (inference); Raspberry Pi 5 (controller)
- **Aurum Trading Terminal**: NVIDIA Jetson Orin Nano Super; Raspberry Pi 5 + Whisplay HAT; Pi Camera Module 3 (QR scan); ReSpeaker 2-Mics HAT; Adafruit I2S Speaker Bonnet
- **Chain Ledger Node**: Mac mini M4 24GB (Quantum Ledger node); Raspberry Pi 5 + Whisplay HAT; Synology NAS encrypted share
- **Institutional Briefing Node**: Raspberry Pi 5 8GB; Whisplay HAT (report review + approval); Adafruit I2S Speaker Bonnet
- **Apex Motion Cage**: Raspberry Pi 5 8GB (×2); Pi Global Shutter Camera (×2); IMU BNO085 (×3); NVIDIA Jetson Orin Nano Super; Arduino Nano 33 BLE Sense Rev2
- **Team OS Field Station**: Raspberry Pi 5 8GB; Whisplay HAT; ReSpeaker 4-Mic Array v2.0; Pi Camera Module 3 Wide; LILYGO T-Beam Meshtastic
- **Recovery Intelligence Node**: Raspberry Pi 5 8GB; Adafruit Feather nRF52840 Sense (BLE aggregator hub); IMU BNO085 (ambient motion baseline); Whisplay HAT
- **Scout Intelligence Terminal**: Raspberry Pi 5 8GB; Whisplay HAT; Pi Camera Module 3; Adafruit I2S Speaker Bonnet
- **Cipher Guardian Rack**: UniFi Dream Machine Pro Max; UniFi Enterprise XG 24; UniFi Enterprise 24 PoE; UniFi U7 Pro Max; Raspberry Pi 5 (audit logger + SIEM); Logic analyzer Saleae clone
- **Sentinel Prime Tower**: NVIDIA Jetson Orin Nano Super; RPLIDAR A1M8; Luxonis OAK-D Lite; Pi AI Camera (Sony IMX500); RealSense D435i
- **Forensic Evidence Node**: NVIDIA Jetson Orin Nano Super; Arducam 64MP Hawkeye Camera; Raspberry Pi 5 (controller); Synology NAS air-gapped partition
- **Prime Shell v0.1**: Amazing Hand (<$200 parts); NVIDIA Jetson Orin Nano Super; ReSpeaker 4-Mic Array v2.0; Adafruit I2S Speaker Bonnet; Pi Camera Module 3 Wide; PCA9685 16-channel servo driver; DYNAMIXEL XL330 smart servos
- **Titan Bench Arm**: SO-101 / LeRobot arm (leader + follower); NVIDIA Jetson Orin Nano Super; Luxonis OAK-D Lite; DYNAMIXEL XL330 smart servos; PCA9685 servo driver
- **Dexterous Hand Node**: NVIDIA Jetson Orin Nano Super; DYNAMIXEL XL330 (finger joints); PCA9685 servo driver; Luxonis OAK-D Lite (visual target)
- **Mobile Base Rover**: ROSMASTER R2 ROS2 rover base; NVIDIA Jetson Orin Nano Super; RPLIDAR A1M8 (navigation); Luxonis OAK-D Lite (obstacle depth); LILYGO T-Beam Meshtastic (field telemetry); Cytron MD13S motor driver
- **Embodied AI Control Wearable**: Arduino Nano 33 BLE Sense Rev2 (×3: wrist, elbow, torso); IMU BNO085 (×3); Adafruit DRV2605L Haptic Controller (force feedback); Adafruit Feather nRF52840 Sense (BLE hub)
- **Sky Vector Dev Drone**: Holybro X500 V2 PX4 Dev Kit; Pixhawk 6C Flight Controller; NVIDIA Jetson Orin Nano Super (companion); Pi AI Camera (visual navigation); LILYGO T-Beam Meshtastic (mesh telemetry)
- **Ground Vector Rover**: ROSMASTER R2 ROS2 rover base; NVIDIA Jetson Orin Nano Super; RPLIDAR A1M8; Luxonis OAK-D Lite; Cytron MD13S motor driver; LILYGO T-Beam Meshtastic
- **Aerial Mesh Relay Drone**: Holybro X500 V2 ARF Kit; Pixhawk 6C; Raspberry Pi 5 (mesh payload); LILYGO T-Beam Meshtastic (aerial relay); Directional LoRa antennas
- **Cognitive Coaching Shell**: Raspberry Pi 5 8GB; Whisplay HAT; ReSpeaker 4-Mic Array v2.0; NVIDIA Jetson Orin Nano Super; Adafruit I2S Speaker Bonnet
- **Habit Architecture Wearable**: Adafruit Feather nRF52840 Sense; Adafruit DRV2605L Haptic Controller; IMU ICM-20948 (post-nudge response capture); Arduino Nano 33 BLE Sense Rev2
- **Behavioral Sensing Station**: Raspberry Pi 5 8GB; ReSpeaker 4-Mic Array v2.0 (tone analysis); IMU BNO085 (micro-gesture); Pi Camera Module 3 (opt-in facial context); Arduino Nano 33 BLE Sense Rev2; Whisplay HAT
- **Psychographic Field Kit**: Raspberry Pi 5 8GB; Whisplay HAT; ReSpeaker 4-Mic Array v2.0; LILYGO T-Deck Meshtastic
- **Neuro-Pulse Wristband**: Arduino Nano 33 BLE Sense Rev2; IMU BNO085 (orientation + motion); Adafruit DRV2605L Haptic Controller; Adafruit Feather nRF52840 Sense (BLE hub)

## Outputs and actions
- Write session, interaction and capture logs
- Index interactions as vector embeddings
- Answer semantic search through /v1/knowledge
- Produce structured briefings (e.g. Herald Badge session briefings pushed to Notion)
- Cache locally on field kits and sync on mesh reconnect

## Permissions
API and MCP access listed for its device(s):
- **Zenith Command Band**: APIs: ZenFlow Agent API /v1/aegis/queue; ZenFlow /v1/agents/health; Anthropic claude-sonnet-4-6; Slack alert webhook. MCPs: ZenFlow Internal API MCP; Slack MCP; n8n MCP.
- **Herald Badge Node**: APIs: ZenFlow /v1/knowledge/write; Anthropic claude-haiku-4-5 (transcription); BLE Gateway API. MCPs: ZenFlow Internal API MCP; Notion MCP.
- **Aegis Command Station**: APIs: ZenFlow Agent API (all endpoints); Anthropic claude-sonnet-4-6 / claude-opus-4-6; n8n REST API; Slack API; Notion API; GitHub API. MCPs: ZenFlow Internal API MCP; Slack MCP; Notion MCP; GitHub MCP; n8n MCP; Google Drive MCP.
- **Mesh Sentinel Array**: APIs: ZenFlow /v1/agents/health (device registration); MQTT broker API; n8n webhook triggers; Meshtastic Python API. MCPs: ZenFlow Internal API MCP; n8n MCP.
- **Atlas Perception Tower**: APIs: ZenFlow /v1/aegis (physical flag injection); ZenFlow /v1/knowledge/write; Anthropic claude-haiku-4-5 (edge inference); UniFi NVR API; Sentry MCP (anomaly logging). MCPs: ZenFlow Internal API MCP; Sentry MCP; Obsidian Arc Security MCP.
- **Zenith Oracle Voice Shell**: APIs: ZenFlow Agent API (all); Anthropic claude-sonnet-4-6; n8n webhook API; Slack API; Notion API. MCPs: ZenFlow Internal API MCP; n8n MCP; Notion MCP; Slack MCP.
- **CORTEX Director Shell**: APIs: ZenFlow Agent API (all tiers); Anthropic claude-sonnet-4-6 + claude-opus-4-6; GitHub API; Anthropic API Console; n8n REST API. MCPs: ZenFlow Internal API MCP; GitHub MCP; n8n MCP; Slack MCP.
- **Knowledge Keeper Vault Node**: APIs: ZenFlow /v1/knowledge (read + write); Anthropic claude-haiku-4-5 (embedding); Notion API (export); OpenTelemetry (traces). MCPs: ZenFlow Internal API MCP; Notion MCP; n8n MCP.
- **Herald Consultant Badge**: APIs: ZenFlow /v1/knowledge/write; Anthropic claude-sonnet-4-6 (proposal drafting); Notion API; Slack API. MCPs: Notion MCP; Slack MCP; ZenFlow Internal API MCP.
- **Client Intelligence Terminal**: APIs: Anthropic claude-sonnet-4-6; Perplexity Pro API (pre-meeting research); Notion API; Slack API; Apollo/Clearbit enrichment API. MCPs: Notion MCP; Slack MCP; Google Drive MCP; ZenFlow Internal API MCP.
- **Strategy Scan Node**: APIs: ZenFlow /v1/knowledge/write; Anthropic claude-sonnet-4-6 (structure extraction); Notion API; Figma API (design hand-off). MCPs: Notion MCP; Figma MCP; Google Drive MCP; ZenFlow Internal API MCP.
- **AI Audit Wearable Kit**: APIs: ZenFlow /v1/knowledge/write; Anthropic claude-sonnet-4-6 (report generation); Notion API; Airtable API (scoring matrix). MCPs: Notion MCP; Airtable MCP; ZenFlow Internal API MCP.
- **Workshop Presence Node**: APIs: ZenFlow /v1/knowledge/write; Anthropic claude-haiku-4-5 (edge inference); Slack API (facilitator alert). MCPs: Slack MCP; Notion MCP; ZenFlow Internal API MCP.
- **Atlas Learning Kiosk**: APIs: ZenFlow /v1/agents/spawn; Anthropic claude-sonnet-4-6; Notion API (learning state); Airtable API (progress tracking). MCPs: Notion MCP; Airtable MCP; ZenFlow Internal API MCP.
- **Cohort Engagement Badge**: APIs: ZenFlow /v1/knowledge/write; Anthropic claude-haiku-4-5 (engagement analysis); Airtable API; BLE Gateway API. MCPs: Airtable MCP; Notion MCP; ZenFlow Internal API MCP.
- **Instructor Capture Node**: APIs: Anthropic claude-sonnet-4-6 (concept extraction); ZenFlow /v1/knowledge/write; Notion API; Airtable API. MCPs: Notion MCP; Airtable MCP; Google Drive MCP; ZenFlow Internal API MCP.
- **P.E.T.E.E.R. Assessment Node**: APIs: ZenFlow /v1/agents/spawn; Anthropic claude-sonnet-4-6; Notion API; Airtable API (competency matrix). MCPs: Notion MCP; Airtable MCP; ZenFlow Internal API MCP.
- **Field Learning Kit**: APIs: ZenFlow Agent API (local cache); Anthropic claude-haiku-4-5 (edge inference); Meshtastic Python API. MCPs: ZenFlow Internal API MCP (local cache); n8n MCP.
- **Resonance Studio Node**: APIs: Anthropic claude-sonnet-4-6 (content generation); ZenFlow /v1/knowledge/write; Notion API; Slack API; Meta Graph API (post queue). MCPs: Notion MCP; Slack MCP; Google Drive MCP; ZenFlow Internal API MCP.
- **Vision Director Node**: APIs: Anthropic claude-haiku-4-5 (clip metadata); ZenFlow /v1/knowledge/write; Notion API; HeyGen API (optional avatar layer). MCPs: Notion MCP; Google Drive MCP; ZenFlow Internal API MCP; Cloudinary MCP.
- **Creator Nexus Wearable**: APIs: ZenFlow /v1/knowledge/write; Anthropic claude-haiku-4-5 (tagging); Notion API; Slack API. MCPs: Notion MCP; Slack MCP; ZenFlow Internal API MCP.
- **Documentary Capture Rig**: APIs: Anthropic claude-haiku-4-5 (scene metadata); ZenFlow /v1/knowledge/write; Cloudinary API (media management); Notion API. MCPs: Cloudinary MCP; Notion MCP; ZenFlow Internal API MCP.
- **Aurum Trading Terminal**: APIs: Anthropic claude-sonnet-4-6 (signal analysis); Polymarket CLOB API; Kalshi API; Broker webhook API; LSEG/FactSet data API; Notion API (trade journal). MCPs: LSEG MCP; FactSet MCP; Notion MCP; ZenFlow Internal API MCP; LunarCrush MCP (crypto sentiment).
- **Chain Ledger Node**: APIs: Anthropic claude-sonnet-4-6; Blockscout API (on-chain data); LunarCrush API (sentiment); SEC/CFTC RSS feeds; LSEG data API; Notion API. MCPs: Blockscout MCP; LSEG MCP; FactSet MCP; LunarCrush MCP; ZenFlow Internal API MCP.
- **Institutional Briefing Node**: APIs: Anthropic claude-sonnet-4-6 (report authoring); Notion API; Gmail API (distribution); LSEG API; FactSet API. MCPs: Notion MCP; Gmail MCP; LSEG MCP; FactSet MCP; ZenFlow Internal API MCP.
- **Apex Motion Cage**: APIs: ZenFlow /v1/knowledge/write; Anthropic claude-sonnet-4-6 (profile generation); Airtable API (athlete profiles); Slack API (coach alerts). MCPs: Airtable MCP; Slack MCP; ZenFlow Internal API MCP.
- **Team OS Field Station**: APIs: ZenFlow /v1/knowledge/write; Anthropic claude-haiku-4-5 (observation processing); Airtable API; Meshtastic Python API. MCPs: Airtable MCP; ZenFlow Internal API MCP; n8n MCP.
- **Recovery Intelligence Node**: APIs: ZenFlow /v1/knowledge/write; Anthropic claude-sonnet-4-6 (load recommendation); Airtable API; Vital Helix API (health cross-reference); Slack API. MCPs: Airtable MCP; Slack MCP; ZenFlow Internal API MCP.
- **Scout Intelligence Terminal**: APIs: Anthropic claude-sonnet-4-6 (profile generation); LunarCrush API (athlete social); Perplexity Pro API (news research); Airtable API; ZenFlow /v1/knowledge/write. MCPs: LunarCrush MCP; Airtable MCP; ZenFlow Internal API MCP; Notion MCP.
- **Cipher Guardian Rack**: APIs: UniFi Controller API; ZenFlow /v1/aegis (network → Aegis injection); Sentry API (anomaly logging); Slack API; ZenFlow /v1/knowledge/write. MCPs: ZenFlow Internal API MCP; Sentry MCP; Slack MCP; n8n MCP.
- **Sentinel Prime Tower**: APIs: ZenFlow /v1/aegis (physical event injection); UniFi NVR API; ZenFlow /v1/knowledge/write; Anthropic claude-haiku-4-5 (edge inference); Sentry API. MCPs: Sentry MCP; ZenFlow Internal API MCP; Slack MCP.
- **Forensic Evidence Node**: APIs: ZenFlow /v1/knowledge/write; ZenFlow /v1/aegis (evidence classification); Anthropic claude-haiku-4-5 (context tagging); Synology NAS API. MCPs: ZenFlow Internal API MCP; Sentry MCP.
- **Prime Shell v0.1**: APIs: ZenFlow /v1/aegis (motion clearance); Anthropic claude-sonnet-4-6 (conversation); ZenFlow /v1/knowledge/write; DYNAMIXEL SDK API; ROS2 action API. MCPs: ZenFlow Internal API MCP; Slack MCP (demo notifications).
- **Titan Bench Arm**: APIs: ZenFlow /v1/aegis (motion safety gate); Hugging Face LeRobot API (dataset push); DYNAMIXEL SDK; ROS2 action API; ZenFlow /v1/knowledge/write. MCPs: Hugging Face MCP; ZenFlow Internal API MCP; Sentry MCP.
- **Dexterous Hand Node**: APIs: DYNAMIXEL SDK; ZenFlow /v1/aegis; Hugging Face LeRobot API; ZenFlow /v1/knowledge/write; Luxonis DepthAI API. MCPs: Hugging Face MCP; ZenFlow Internal API MCP.
- **Mobile Base Rover**: APIs: ZenFlow /v1/aegis (navigation clearance); ROS2 nav2 stack API; Meshtastic Python API; ZenFlow /v1/knowledge/write; RPLIDAR Python API. MCPs: ZenFlow Internal API MCP; n8n MCP.
- **Embodied AI Control Wearable**: APIs: ZenFlow /v1/aegis (joint limit gate); Hugging Face LeRobot API; ZenFlow /v1/knowledge/write; DYNAMIXEL SDK (command relay); BLE Gateway API. MCPs: Hugging Face MCP; ZenFlow Internal API MCP.
- **Sky Vector Dev Drone**: APIs: ZenFlow /v1/aegis (flight command clearance); PX4 MAVLink API; Meshtastic Python API; ZenFlow /v1/knowledge/write; Anthropic claude-haiku-4-5 (mission planning). MCPs: ZenFlow Internal API MCP; n8n MCP.
- **Ground Vector Rover**: APIs: ZenFlow /v1/aegis (navigation clearance); ROS2 nav2 API; Meshtastic Python API; ZenFlow /v1/knowledge/write. MCPs: ZenFlow Internal API MCP; n8n MCP.
- **Aerial Mesh Relay Drone**: APIs: ZenFlow /v1/aegis; PX4 MAVLink API; Meshtastic Python API; ZenFlow /v1/knowledge/write. MCPs: ZenFlow Internal API MCP; n8n MCP.
- **Cognitive Coaching Shell**: APIs: ZenFlow /v1/agents/spawn; Anthropic claude-sonnet-4-6 (coaching dialogue); Notion API (behavioral profile); Airtable API (habit tracking); ZenFlow /v1/knowledge/write. MCPs: Notion MCP; Airtable MCP; ZenFlow Internal API MCP.
- **Habit Architecture Wearable**: APIs: ZenFlow /v1/agents (haptic dispatch); Anthropic claude-haiku-4-5 (nudge optimization); Airtable API (habit log); BLE Gateway API. MCPs: Airtable MCP; ZenFlow Internal API MCP.
- **Behavioral Sensing Station**: APIs: Anthropic claude-sonnet-4-6 (tone + pattern analysis); ZenFlow /v1/knowledge/write; Airtable API; ZenFlow /v1/agents/spawn. MCPs: Airtable MCP; Notion MCP; ZenFlow Internal API MCP.
- **Psychographic Field Kit**: APIs: ZenFlow Agent API (local cache); Anthropic claude-haiku-4-5 (edge inference); Meshtastic Python API. MCPs: ZenFlow Internal API MCP (local cache); n8n MCP.
- **Neuro-Pulse Wristband**: APIs: ZenFlow /v1/agents (haptic event dispatch); Anthropic claude-haiku-4-5 (cognitive load inference); Airtable API; BLE Gateway API. MCPs: Airtable MCP; ZenFlow Internal API MCP.

## Aegis clause
- **Zenith Command Band**: Haptic codes map to Aegis states: green pulse aegis_clear, amber double-tap aegis_review, red triple aegis_hold.
- **Aegis Command Station**: Runs the Aegis Safety Review Queue; JR receives Aegis queue alerts here.
- **Atlas Perception Tower**: Detections become aegis_clear or aegis_review events; a person in the quarantine zone after hours triggers aegis_hold and routes to the Zenith Command Band.
- **Zenith Oracle Voice Shell**: Reads Aegis queue items aloud for review.
- **CORTEX Director Shell**: CORTEX Director enforces Aegis Protocol for the cluster.
- **Chain Ledger Node**: DeFi TVL anomaly queues an aegis_review before any automated action.
- **Cipher Guardian Rack**: Unknown MAC address triggers aegis_hold, VLAN 80 quarantine, Sentry + Slack alerts and a triple pulse on the Zenith Command Band.
- **Sentinel Prime Tower**: Physical detections become aegis_review or aegis_hold events; aegis_hold can trigger the arm bench emergency stop relay.
- **Forensic Evidence Node**: Each capture carries an Aegis classification via /v1/aegis.
- **Prime Shell v0.1**: No servo moves without aegis_clear; aegis_clear fires in <50ms in the spec's example.
- **Titan Bench Arm**: Aegis enforces current and speed limits; out-of-bounds motion triggers aegis_hold and physical e-stop.
- **Dexterous Hand Node**: All finger servo commands are Aegis-cleared.
- **Mobile Base Rover**: All movement commands pass through Aegis; speed limits, geofence and e-stop are hard-enforced at firmware level; a person in path triggers aegis_hold.
- **Embodied AI Control Wearable**: Aegis enforces joint limits in real time.
- **Sky Vector Dev Drone**: All flight commands Aegis-cleared; indoor tethered tests required before outdoor autonomy unlock; flight only after aegis_clear.
- **Ground Vector Rover**: Aegis enforces speed limits and geofence; all waypoints cleared.
- **Aerial Mesh Relay Drone**: Flight runs under Aegis Protocol Guardian (flight) and the Aegis Safety Review Queue.

## Escalation
Alert and review workflows on its devices:
- **Zenith Command Band**: ZenFlow Agent Health Monitor; Aegis Incident Reporter
- **Herald Badge Node**: Aegis Protocol Compliance Logger
- **Aegis Command Station**: ZenFlow Agent Health Monitor; Aegis Safety Review Queue
- **Mesh Sentinel Array**: ZenFlow Agent Health Monitor; Aegis Protocol Compliance Logger
- **Atlas Perception Tower**: Aegis Safety Review Queue; ZenFlow Agent Health Monitor
- **Zenith Oracle Voice Shell**: ZenFlow Agent Health Monitor
- **CORTEX Director Shell**: ZenFlow API Error Alerting
- **Aurum Trading Terminal**: Options Trade Alert + Journal Logger; Crypto Market Anomaly Alert
- **Apex Motion Cage**: Injury Risk Flag + Coaching Alert; Athlete Recovery Alert
- **Recovery Intelligence Node**: Athlete Recovery Alert
- **Cipher Guardian Rack**: Aegis Safety Review Queue; Aegis Protocol Compliance Logger; ZenFlow API Error Alerting
- **Sentinel Prime Tower**: Aegis Safety Review Queue; Aegis Protocol Compliance Logger
- **Forensic Evidence Node**: Aegis Protocol Compliance Logger
- **Prime Shell v0.1**: Aegis Safety Review Queue (all motion events)
- **Titan Bench Arm**: Aegis Safety Review Queue (all arm motion)
- **Dexterous Hand Node**: Aegis Safety Review Queue
- **Mobile Base Rover**: Aegis Safety Review Queue; Agent Health Monitor (rover as registered agent)
- **Embodied AI Control Wearable**: Aegis Safety Review Queue
- **Sky Vector Dev Drone**: Aegis Safety Review Queue (all flight events); Agent Health Monitor (drone as registered agent)
- **Ground Vector Rover**: Aegis Safety Review Queue; Agent Health Monitor
- **Aerial Mesh Relay Drone**: Aegis Safety Review Queue; Agent Health Monitor

## System prompt
The spec gives no system prompt text for this agent.

## Dependencies
- Co-resident agents: [[ZENITH Overseer]], [[Aegis Protocol Guardian]], [[Agent Health Monitor]], [[Transcription Task Agent]], [[Blueprint Architect]], [[CORTEX Director]], [[Director_Operations (Device Agent)]], [[Physical Security Task Agent]], [[ZenFlow Marketplace Listing Auto-Generator]], [[Research Director]], [[Data Ingestion Task Agent]], [[Inbound Inquiry Handler]], [[Proposal Generator Task Agent]], [[Client Intelligence Task Agent]], [[OCR + Structure Task Agent]], [[Audit Intelligence Task Agent]], [[Engagement Monitor Task Agent]], [[Workshop Facilitator Task Agent]], [[AI Tutor Task Agent]], [[Learning Path Agent]], [[Cohort Manager Task Agent]], [[Curriculum Synthesis Task Agent]], [[Nexus Labs Content Relay Task Agent]], [[P.E.T.E.E.R. Assessment Task Agent]], [[Collective Times Content Writer Task Agent]], [[Distribution Agent]], [[Vision Tagging Task Agent]], [[Creator Nexus Brief Generator]], [[Idea Capture Task Agent]], [[Creator Nexus Vault Agent]], [[Scene Classification Task Agent]], [[Quantum Alpha Signal Agent]], [[Portfolio P&L Aggregator Task Agent]], [[Crypto Risk Monitor Agent]], [[DeFi Risk Monitor Agent]], [[Quantum Genesis Token Logger Task Agent]], [[Regulatory Compliance Monitor Agent]], [[Quantum Alpha Institutional Report Generator Agent]], [[Apex System Performance Agent]], [[Injury Risk Monitor Task Agent]], [[Biomechanical Analysis Task Agent]], [[TeamOS Coaching Agent]], [[Voice Observation Task Agent]], [[Recovery Intelligence Task Agent]], [[Athlete Recovery Alert Agent]], [[Vital Helix Integration Task Agent]], [[Scout Intelligence Agent]], [[Prospect Profile Generator Task Agent]], [[Network Anomaly Detection Agent]], [[Spatial Intelligence Task Agent]], [[Evidence Integrity Task Agent]], [[Prime Shell Agent]], [[Speech Synthesis Task Agent]], [[Vision Perception Task Agent]], [[Titan Arm Agent]], [[LeRobot Teleoperation Task Agent]], [[Manipulation Training Data Collector]], [[Dexterous Hand Task Agent]], [[Grasp Planning Agent]], [[Mobile Navigation Task Agent]], [[Obstacle Avoidance Agent]], [[Field Telemetry Task Agent]], [[Teleoperation Mapping Task Agent]], [[LeRobot Training Data Collector]], [[Sky Vector Flight Agent]], [[Ground Vector Navigation Agent]], [[Mesh Relay Flight Agent]], [[Aether Link Mesh Extension Task Agent]], [[Cognitive Coach Task Agent]], [[Behavioral Pattern Analysis Agent]], [[Habit Architecture Agent]], [[Psychographic Profile Agent]], [[Cognitive Load Monitor Task Agent]]
- n8n workflows: ZenFlow Agent Health Monitor; Aegis Incident Reporter; Daily Agent Performance Digest; Cross-Division Weekly Standup Digest; Aegis Protocol Compliance Logger; Portfolio Revenue Dashboard Sync; Aegis Safety Review Queue; JWT Token Rotation Monitor; Cost Tracker; All 150 n8n workflows via voice-triggered webhook; Knowledge Keeper Digest; Agent Spawn + Teardown Orchestrator; Prompt Library Version Control; ZenFlow API Error Alerting; New Agent Onboarding Flow; ZenFlow Marketplace Listing Auto-Generator; Research Pipeline; Inbound Inquiry → Proposal Generator; Client Onboarding Sequence; Cross-Division Intelligence Request Router; Brand Asset Request Workflow; AI Readiness Audit Scoring; Impact Report Auto-Generator; Participant Success Story Pipeline; Student Progress Report Generator; Cohort Engagement Monitor; Hybrid Living Enrollment Sequence; Weekly Performance Report Generator; Instructor Session Archive; Creator Track Content Pipeline; Nexus Labs Content Pipeline cross-link; Session Archive Sync on Return (fires on reconnect); Collective Times Content Pipeline; Skool Community Engagement Monitor; Creator Nexus Brief Auto-Generator; Options Trade Alert + Journal Logger; Crypto Market Anomaly Alert; Portfolio P&L Daily Aggregator; Prediction Market Signal Aggregator; Regulatory Compliance Monitor; Quantum Genesis Tokenization Event Logger; DeFi Protocol Risk Monitor; Quantum Alpha Institutional Report Generator; Quantum Alpha Institutional Report Generator (weekly); Invoice + Revenue Recognition Automation; Investor Update Auto-Pack; Injury Risk Flag + Coaching Alert; Athlete Recovery Alert; Scout Intelligence Aggregator; Partnership Sponsorship Tracker; Vital Helix cross-integration (shared recovery data); Kinetic IQ Consumer Onboarding; Evidence Archive Sync (NAS backup trigger); Agent Spawn + Teardown Orchestrator (session lifecycle); Aegis Safety Review Queue (all motion events); Knowledge Keeper Digest (embodied session archive); Aegis Safety Review Queue (all arm motion); LeRobot Episode Archive (training data sync to HuggingFace); Embodied AI Session Log; LeRobot Episode Archive; Agent Health Monitor (rover as registered agent); ZenFlow Meshtastic Gateway bridge; Aegis Safety Review Queue (all flight events); Agent Health Monitor (drone as registered agent); VectorShift Logistics Tracker; Agent Health Monitor; Aether Link Mesh Status; Habit Architecture Workflow (scheduled interventions); Behavioral Pattern Digest (weekly profile update); Cognara Mind Engagement Monitor; Habit Architecture Workflow (nudge scheduling); Behavioral Pattern Digest (weekly model update); Behavioral Pattern Digest; Habit Architecture Workflow; Session Archive Sync (fires on mesh reconnect); Behavioral Pattern Digest (longitudinal update). See [[n8n Workflow Blueprint]].
- MCPs: ZenFlow Internal API MCP; Slack MCP; n8n MCP; Notion MCP; GitHub MCP; Google Drive MCP; Sentry MCP; Obsidian Arc Security MCP; Figma MCP; Airtable MCP; ZenFlow Internal API MCP (local cache); Cloudinary MCP; LSEG MCP; FactSet MCP; LunarCrush MCP (crypto sentiment); Blockscout MCP; LunarCrush MCP; Gmail MCP; Slack MCP (demo notifications); Hugging Face MCP
- Models as written in the spec: claude-sonnet-4-6, claude-haiku-4-5, claude-opus-4-6. Current vault routing is in [[Agent Tier Registry]].
