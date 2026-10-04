---
title: Aegis Protocol Guardian
tags:
- device-agent
- physical-ai
- wearables
- wearable
- edge-terminal
- android-robot
tier: not stated
type: device-agent
model: claude-sonnet-4-6, claude-opus-4-6, claude-haiku-4-5
owner: JR Moyler (Hataalii)
device: CAI-W01 Zenith Command Band, CAI-W03 Aegis Command Station, CAI-W05 Atlas Perception Tower, CAI-W06 Zenith Oracle Voice Shell, ZF-W01 AXIS Director Shell, ZF-W02 Synaptic Relay Badge, ZF-W04 Agent Eval Bench, OA-W01 Cipher Guardian Rack, OA-W02 Sentinel Prime Tower, OA-W03 Forensic Evidence Node, OA-W04 Threat Intel Wearable, OA-W05 SOC Intelligence Terminal, AP-W01 Prime Shell v0.1, AP-W02 Titan Bench Arm, AP-W03 Dexterous Hand Node, AP-W04 Mobile Base Rover, AP-W05 Embodied AI Control Wearable, VS-W01 Sky Vector Dev Drone, VS-W02 Ground Vector Rover, VS-W04 Aerial Mesh Relay Drone, VS-W05 Flight Ops Wearable
source: Physical AI Wearables Agent Spec
status: spec
updated: 2026-10-04
division: Collective AI (parent), ZenFlow, Obsidian Arc, Animus Prime, VectorShift
clearance: issues aegis_clear / aegis_review / aegis_hold
device_count: 21
---
# Aegis Protocol Guardian

Device agent from the [[Physical AI Wearables Agent Spec]]. Divisions: [[Collective AI — Company Charter]], [[ZenFlow Division]], [[Obsidian Arc Division]], [[Animus Prime Division]], [[VectorShift Division]].
Related: [[Aegis Protocol Spec]], [[Aegis Protocol]].

## Role
Safety gate on every device that moves, flies, holds evidence, or raises flags. Physical motion, flight commands, navigation waypoints and servo moves only execute after aegis_clear. Physical and network detections are injected into the same Aegis queue that governs the software agents. Signs off agents on the Agent Eval Bench before production.

## Devices it runs on
| Code | Device | Type | Section | Listed as |
|---|---|---|---|---|
| CAI-W01 | Zenith Command Band | Wearable | [[Wearables Agent Spec — Parent Devices]] | Aegis Protocol Guardian |
| CAI-W03 | Aegis Command Station | Physical AI | [[Wearables Agent Spec — Parent Devices]] | Aegis Protocol Guardian |
| CAI-W05 | Atlas Perception Tower | Physical AI | [[Wearables Agent Spec — Parent Devices]] | Aegis Protocol Guardian |
| CAI-W06 | Zenith Oracle Voice Shell | Physical AI | [[Wearables Agent Spec — Parent Devices]] | Aegis Protocol Guardian |
| ZF-W01 | CORTEX Director Shell | Physical AI | [[Wearables Agent Spec — ZenFlow Devices]] | Aegis Protocol Guardian |
| ZF-W02 | Synaptic Relay Badge | Wearable | [[Wearables Agent Spec — ZenFlow Devices]] | Aegis Protocol Guardian |
| ZF-W04 | Agent Eval Bench | Edge Terminal | [[Wearables Agent Spec — ZenFlow Devices]] | Aegis Protocol Guardian |
| OA-W01 | Cipher Guardian Rack | Physical AI | [[Wearables Agent Spec — Obsidian Arc Devices]] | Aegis Protocol Guardian |
| OA-W02 | Sentinel Prime Tower | Physical AI | [[Wearables Agent Spec — Obsidian Arc Devices]] | Aegis Protocol Guardian |
| OA-W03 | Forensic Evidence Node | Edge Terminal | [[Wearables Agent Spec — Obsidian Arc Devices]] | Aegis Protocol Guardian |
| OA-W04 | Threat Intel Wearable | Wearable | [[Wearables Agent Spec — Obsidian Arc Devices]] | Aegis Protocol Guardian |
| OA-W05 | SOC Intelligence Terminal | Edge Terminal | [[Wearables Agent Spec — Obsidian Arc Devices]] | Aegis Protocol Guardian |
| AP-W01 | Prime Shell v0.1 | Android/Robot | [[Wearables Agent Spec — Animus Prime Devices]] | Aegis Protocol Guardian (motion safety) |
| AP-W02 | Titan Bench Arm | Android/Robot | [[Wearables Agent Spec — Animus Prime Devices]] | Aegis Protocol Guardian (motion) |
| AP-W03 | Dexterous Hand Node | Android/Robot | [[Wearables Agent Spec — Animus Prime Devices]] | Aegis Protocol Guardian |
| AP-W04 | Mobile Base Rover | Android/Robot | [[Wearables Agent Spec — Animus Prime Devices]] | Aegis Protocol Guardian (motion) |
| AP-W05 | Embodied AI Control Wearable | Wearable | [[Wearables Agent Spec — Animus Prime Devices]] | Aegis Protocol Guardian |
| VS-W01 | Sky Vector Dev Drone | Android/Robot | [[Wearables Agent Spec — VectorShift Devices]] | Aegis Protocol Guardian (flight) |
| VS-W02 | Ground Vector Rover | Android/Robot | [[Wearables Agent Spec — VectorShift Devices]] | Aegis Protocol Guardian |
| VS-W04 | Aerial Mesh Relay Drone | Android/Robot | [[Wearables Agent Spec — VectorShift Devices]] | Aegis Protocol Guardian (flight) |
| VS-W05 | Flight Ops Wearable | Wearable | [[Wearables Agent Spec — VectorShift Devices]] | Aegis Protocol Guardian |

## Inputs and sensors
- **Zenith Command Band**: Adafruit Feather nRF52840 Sense; Adafruit DRV2605L Haptic Controller; IMU ICM-20948
- **Aegis Command Station**: Mac mini M4 Pro 64GB (parent command node); Synology DS1825+ 8-bay NAS; UniFi Dream Machine Pro Max; Raspberry Pi 5 + Whisplay HAT (ZenFlow shell); ReSpeaker 4-Mic Array v2.0
- **Atlas Perception Tower**: NVIDIA Jetson Orin Nano Super; RPLIDAR A1M8; Luxonis OAK-D Lite; Raspberry Pi AI Camera (Sony IMX500); RealSense D435i
- **Zenith Oracle Voice Shell**: Raspberry Pi 5 8GB; Whisplay HAT; ReSpeaker 4-Mic Array v2.0; Adafruit I2S Speaker Bonnet; Pi Camera Module 3
- **CORTEX Director Shell**: Mac mini M4 24GB (ZenFlow node Mac-02); Raspberry Pi 5 + Whisplay HAT; ReSpeaker 2-Mics Pi HAT; Adafruit I2S Speaker Bonnet
- **Synaptic Relay Badge**: Seeed XIAO ESP32S3 Sense; Adafruit DRV2605L Haptic Controller; Arduino Nano 33 BLE Sense Rev2
- **Agent Eval Bench**: Mac mini M4 24GB (Mac-30 Model Sandbox); NVIDIA Jetson Orin Nano Super (eval runner); Raspberry Pi 5 (test driver); Logic analyzer Saleae clone
- **Cipher Guardian Rack**: UniFi Dream Machine Pro Max; UniFi Enterprise XG 24; UniFi Enterprise 24 PoE; UniFi U7 Pro Max; Raspberry Pi 5 (audit logger + SIEM); Logic analyzer Saleae clone
- **Sentinel Prime Tower**: NVIDIA Jetson Orin Nano Super; RPLIDAR A1M8; Luxonis OAK-D Lite; Pi AI Camera (Sony IMX500); RealSense D435i
- **Forensic Evidence Node**: NVIDIA Jetson Orin Nano Super; Arducam 64MP Hawkeye Camera; Raspberry Pi 5 (controller); Synology NAS air-gapped partition
- **Threat Intel Wearable**: Adafruit Feather nRF52840 Sense; Adafruit DRV2605L Haptic Controller; IMU BNO085 (wearer location context)
- **SOC Intelligence Terminal**: Mac mini M4 24GB (Obsidian Arc node Mac-11); Raspberry Pi 5 + Whisplay HAT (SOC display); Logic analyzer Saleae clone
- **Prime Shell v0.1**: Amazing Hand (<$200 parts); NVIDIA Jetson Orin Nano Super; ReSpeaker 4-Mic Array v2.0; Adafruit I2S Speaker Bonnet; Pi Camera Module 3 Wide; PCA9685 16-channel servo driver; DYNAMIXEL XL330 smart servos
- **Titan Bench Arm**: SO-101 / LeRobot arm (leader + follower); NVIDIA Jetson Orin Nano Super; Luxonis OAK-D Lite; DYNAMIXEL XL330 smart servos; PCA9685 servo driver
- **Dexterous Hand Node**: NVIDIA Jetson Orin Nano Super; DYNAMIXEL XL330 (finger joints); PCA9685 servo driver; Luxonis OAK-D Lite (visual target)
- **Mobile Base Rover**: ROSMASTER R2 ROS2 rover base; NVIDIA Jetson Orin Nano Super; RPLIDAR A1M8 (navigation); Luxonis OAK-D Lite (obstacle depth); LILYGO T-Beam Meshtastic (field telemetry); Cytron MD13S motor driver
- **Embodied AI Control Wearable**: Arduino Nano 33 BLE Sense Rev2 (×3: wrist, elbow, torso); IMU BNO085 (×3); Adafruit DRV2605L Haptic Controller (force feedback); Adafruit Feather nRF52840 Sense (BLE hub)
- **Sky Vector Dev Drone**: Holybro X500 V2 PX4 Dev Kit; Pixhawk 6C Flight Controller; NVIDIA Jetson Orin Nano Super (companion); Pi AI Camera (visual navigation); LILYGO T-Beam Meshtastic (mesh telemetry)
- **Ground Vector Rover**: ROSMASTER R2 ROS2 rover base; NVIDIA Jetson Orin Nano Super; RPLIDAR A1M8; Luxonis OAK-D Lite; Cytron MD13S motor driver; LILYGO T-Beam Meshtastic
- **Aerial Mesh Relay Drone**: Holybro X500 V2 ARF Kit; Pixhawk 6C; Raspberry Pi 5 (mesh payload); LILYGO T-Beam Meshtastic (aerial relay); Directional LoRa antennas
- **Flight Ops Wearable**: Adafruit Feather nRF52840 Sense; Adafruit DRV2605L Haptic Controller; IMU ICM-20948

## Outputs and actions
- Issue aegis_clear, aegis_review or aegis_hold
- Gate servo, arm, joint-limit, navigation and flight commands
- Accept physical, network and evidence-classification flag injection through ZenFlow /v1/aegis
- Feed haptic Aegis alerts through /v1/aegis/queue
- Sign off new agents before VLAN 20 access

## Permissions
API and MCP access listed for its device(s):
- **Zenith Command Band**: APIs: ZenFlow Agent API /v1/aegis/queue; ZenFlow /v1/agents/health; Anthropic claude-sonnet-4-6; Slack alert webhook. MCPs: ZenFlow Internal API MCP; Slack MCP; n8n MCP.
- **Aegis Command Station**: APIs: ZenFlow Agent API (all endpoints); Anthropic claude-sonnet-4-6 / claude-opus-4-6; n8n REST API; Slack API; Notion API; GitHub API. MCPs: ZenFlow Internal API MCP; Slack MCP; Notion MCP; GitHub MCP; n8n MCP; Google Drive MCP.
- **Atlas Perception Tower**: APIs: ZenFlow /v1/aegis (physical flag injection); ZenFlow /v1/knowledge/write; Anthropic claude-haiku-4-5 (edge inference); UniFi NVR API; Sentry MCP (anomaly logging). MCPs: ZenFlow Internal API MCP; Sentry MCP; Obsidian Arc Security MCP.
- **Zenith Oracle Voice Shell**: APIs: ZenFlow Agent API (all); Anthropic claude-sonnet-4-6; n8n webhook API; Slack API; Notion API. MCPs: ZenFlow Internal API MCP; n8n MCP; Notion MCP; Slack MCP.
- **CORTEX Director Shell**: APIs: ZenFlow Agent API (all tiers); Anthropic claude-sonnet-4-6 + claude-opus-4-6; GitHub API; Anthropic API Console; n8n REST API. MCPs: ZenFlow Internal API MCP; GitHub MCP; n8n MCP; Slack MCP.
- **Synaptic Relay Badge**: APIs: ZenFlow /v1/agents/status; ZenFlow /v1/aegis/queue; Anthropic claude-haiku-4-5; BLE Gateway API. MCPs: ZenFlow Internal API MCP; Slack MCP.
- **Agent Eval Bench**: APIs: ZenFlow Agent API (staging); Anthropic claude-sonnet-4-6; GitHub API; n8n staging API. MCPs: ZenFlow Internal API MCP (staging); GitHub MCP; Sentry MCP.
- **Cipher Guardian Rack**: APIs: UniFi Controller API; ZenFlow /v1/aegis (network → Aegis injection); Sentry API (anomaly logging); Slack API; ZenFlow /v1/knowledge/write. MCPs: ZenFlow Internal API MCP; Sentry MCP; Slack MCP; n8n MCP.
- **Sentinel Prime Tower**: APIs: ZenFlow /v1/aegis (physical event injection); UniFi NVR API; ZenFlow /v1/knowledge/write; Anthropic claude-haiku-4-5 (edge inference); Sentry API. MCPs: Sentry MCP; ZenFlow Internal API MCP; Slack MCP.
- **Forensic Evidence Node**: APIs: ZenFlow /v1/knowledge/write; ZenFlow /v1/aegis (evidence classification); Anthropic claude-haiku-4-5 (context tagging); Synology NAS API. MCPs: ZenFlow Internal API MCP; Sentry MCP.
- **Threat Intel Wearable**: APIs: ZenFlow /v1/aegis/queue (haptic event dispatch); UniFi Controller API; BLE Gateway API; Slack API. MCPs: ZenFlow Internal API MCP; Sentry MCP; Slack MCP.
- **SOC Intelligence Terminal**: APIs: UniFi Controller API; ZenFlow Agent API; Sentry API; Slack API; OpenTelemetry API (traces + metrics). MCPs: Sentry MCP; Slack MCP; ZenFlow Internal API MCP; n8n MCP.
- **Prime Shell v0.1**: APIs: ZenFlow /v1/aegis (motion clearance); Anthropic claude-sonnet-4-6 (conversation); ZenFlow /v1/knowledge/write; DYNAMIXEL SDK API; ROS2 action API. MCPs: ZenFlow Internal API MCP; Slack MCP (demo notifications).
- **Titan Bench Arm**: APIs: ZenFlow /v1/aegis (motion safety gate); Hugging Face LeRobot API (dataset push); DYNAMIXEL SDK; ROS2 action API; ZenFlow /v1/knowledge/write. MCPs: Hugging Face MCP; ZenFlow Internal API MCP; Sentry MCP.
- **Dexterous Hand Node**: APIs: DYNAMIXEL SDK; ZenFlow /v1/aegis; Hugging Face LeRobot API; ZenFlow /v1/knowledge/write; Luxonis DepthAI API. MCPs: Hugging Face MCP; ZenFlow Internal API MCP.
- **Mobile Base Rover**: APIs: ZenFlow /v1/aegis (navigation clearance); ROS2 nav2 stack API; Meshtastic Python API; ZenFlow /v1/knowledge/write; RPLIDAR Python API. MCPs: ZenFlow Internal API MCP; n8n MCP.
- **Embodied AI Control Wearable**: APIs: ZenFlow /v1/aegis (joint limit gate); Hugging Face LeRobot API; ZenFlow /v1/knowledge/write; DYNAMIXEL SDK (command relay); BLE Gateway API. MCPs: Hugging Face MCP; ZenFlow Internal API MCP.
- **Sky Vector Dev Drone**: APIs: ZenFlow /v1/aegis (flight command clearance); PX4 MAVLink API; Meshtastic Python API; ZenFlow /v1/knowledge/write; Anthropic claude-haiku-4-5 (mission planning). MCPs: ZenFlow Internal API MCP; n8n MCP.
- **Ground Vector Rover**: APIs: ZenFlow /v1/aegis (navigation clearance); ROS2 nav2 API; Meshtastic Python API; ZenFlow /v1/knowledge/write. MCPs: ZenFlow Internal API MCP; n8n MCP.
- **Aerial Mesh Relay Drone**: APIs: ZenFlow /v1/aegis; PX4 MAVLink API; Meshtastic Python API; ZenFlow /v1/knowledge/write. MCPs: ZenFlow Internal API MCP; n8n MCP.
- **Flight Ops Wearable**: APIs: ZenFlow /v1/aegis/queue (haptic dispatch); PX4 MAVLink API; BLE Gateway API; Meshtastic Python API. MCPs: ZenFlow Internal API MCP.

## Aegis clause
- **Zenith Command Band**: Haptic codes map to Aegis states: green pulse aegis_clear, amber double-tap aegis_review, red triple aegis_hold.
- **Aegis Command Station**: Runs the Aegis Safety Review Queue; JR receives Aegis queue alerts here.
- **Atlas Perception Tower**: Detections become aegis_clear or aegis_review events; a person in the quarantine zone after hours triggers aegis_hold and routes to the Zenith Command Band.
- **Zenith Oracle Voice Shell**: Reads Aegis queue items aloud for review.
- **CORTEX Director Shell**: CORTEX Director enforces Aegis Protocol for the cluster.
- **Synaptic Relay Badge**: Haptic notification for Aegis Protocol flags that need engineering review.
- **Agent Eval Bench**: Aegis Protocol Guardian signs off after eval. Fail = blocked from VLAN 20. Bench sits in VLAN 80 Quarantine.
- **Cipher Guardian Rack**: Unknown MAC address triggers aegis_hold, VLAN 80 quarantine, Sentry + Slack alerts and a triple pulse on the Zenith Command Band.
- **Sentinel Prime Tower**: Physical detections become aegis_review or aegis_hold events; aegis_hold can trigger the arm bench emergency stop relay.
- **Forensic Evidence Node**: Each capture carries an Aegis classification via /v1/aegis.
- **Threat Intel Wearable**: Haptic alert pattern for Aegis hold events.
- **SOC Intelligence Terminal**: Dashboard shows Aegis queue depth.
- **Prime Shell v0.1**: No servo moves without aegis_clear; aegis_clear fires in <50ms in the spec's example.
- **Titan Bench Arm**: Aegis enforces current and speed limits; out-of-bounds motion triggers aegis_hold and physical e-stop.
- **Dexterous Hand Node**: All finger servo commands are Aegis-cleared.
- **Mobile Base Rover**: All movement commands pass through Aegis; speed limits, geofence and e-stop are hard-enforced at firmware level; a person in path triggers aegis_hold.
- **Embodied AI Control Wearable**: Aegis enforces joint limits in real time.
- **Sky Vector Dev Drone**: All flight commands Aegis-cleared; indoor tethered tests required before outdoor autonomy unlock; flight only after aegis_clear.
- **Ground Vector Rover**: Aegis enforces speed limits and geofence; all waypoints cleared.
- **Aerial Mesh Relay Drone**: Flight runs under Aegis Protocol Guardian (flight) and the Aegis Safety Review Queue.
- **Flight Ops Wearable**: Triple haptic pulse for Aegis flight hold.

## Escalation
Alert and review workflows on its devices:
- **Zenith Command Band**: ZenFlow Agent Health Monitor; Aegis Incident Reporter
- **Aegis Command Station**: ZenFlow Agent Health Monitor; Aegis Safety Review Queue
- **Atlas Perception Tower**: Aegis Safety Review Queue; ZenFlow Agent Health Monitor
- **Zenith Oracle Voice Shell**: ZenFlow Agent Health Monitor
- **CORTEX Director Shell**: ZenFlow API Error Alerting
- **Synaptic Relay Badge**: ZenFlow API Error Alerting; Aegis Incident Reporter
- **Cipher Guardian Rack**: Aegis Safety Review Queue; Aegis Protocol Compliance Logger; ZenFlow API Error Alerting
- **Sentinel Prime Tower**: Aegis Safety Review Queue; Aegis Protocol Compliance Logger
- **Forensic Evidence Node**: Aegis Protocol Compliance Logger
- **Threat Intel Wearable**: Aegis Safety Review Queue; ZenFlow API Error Alerting
- **SOC Intelligence Terminal**: Aegis Safety Review Queue; Aegis Protocol Compliance Logger; ZenFlow API Error Alerting
- **Prime Shell v0.1**: Aegis Safety Review Queue (all motion events)
- **Titan Bench Arm**: Aegis Safety Review Queue (all arm motion)
- **Dexterous Hand Node**: Aegis Safety Review Queue
- **Mobile Base Rover**: Aegis Safety Review Queue; Agent Health Monitor (rover as registered agent)
- **Embodied AI Control Wearable**: Aegis Safety Review Queue
- **Sky Vector Dev Drone**: Aegis Safety Review Queue (all flight events); Agent Health Monitor (drone as registered agent)
- **Ground Vector Rover**: Aegis Safety Review Queue; Agent Health Monitor
- **Aerial Mesh Relay Drone**: Aegis Safety Review Queue; Agent Health Monitor
- **Flight Ops Wearable**: Aegis Safety Review Queue

## System prompt
The spec gives no system prompt text for this agent.

## Dependencies
- Co-resident agents: [[ZENITH Overseer]], [[Knowledge Keeper (Device Agent)]], [[Agent Health Monitor]], [[CORTEX Director]], [[Director_Operations (Device Agent)]], [[Physical Security Task Agent]], [[Blueprint Architect]], [[ZenFlow Marketplace Listing Auto-Generator]], [[Status Check Task Agent]], [[JWT Token Rotation Monitor]], [[Model Performance Auditor]], [[Agent Spawner]], [[MCP Tool Integration Test Agent]], [[Network Anomaly Detection Agent]], [[Spatial Intelligence Task Agent]], [[Evidence Integrity Task Agent]], [[SOC Incident Commander Task Agent]], [[Prime Shell Agent]], [[Speech Synthesis Task Agent]], [[Vision Perception Task Agent]], [[Titan Arm Agent]], [[LeRobot Teleoperation Task Agent]], [[Manipulation Training Data Collector]], [[Dexterous Hand Task Agent]], [[Grasp Planning Agent]], [[Mobile Navigation Task Agent]], [[Obstacle Avoidance Agent]], [[Field Telemetry Task Agent]], [[Teleoperation Mapping Task Agent]], [[LeRobot Training Data Collector]], [[Sky Vector Flight Agent]], [[Ground Vector Navigation Agent]], [[Mesh Relay Flight Agent]], [[Aether Link Mesh Extension Task Agent]]
- n8n workflows: ZenFlow Agent Health Monitor; Aegis Incident Reporter; Daily Agent Performance Digest; Portfolio Revenue Dashboard Sync; Cross-Division Weekly Standup Digest; Aegis Safety Review Queue; JWT Token Rotation Monitor; Cost Tracker; All 150 n8n workflows via voice-triggered webhook; Knowledge Keeper Digest; Agent Spawn + Teardown Orchestrator; Prompt Library Version Control; ZenFlow API Error Alerting; New Agent Onboarding Flow; MCP Tool Integration Test Pipeline; Aegis Protocol Compliance Logger; Evidence Archive Sync (NAS backup trigger); Agent Spawn + Teardown Orchestrator (session lifecycle); Aegis Safety Review Queue (all motion events); Knowledge Keeper Digest (embodied session archive); Aegis Safety Review Queue (all arm motion); LeRobot Episode Archive (training data sync to HuggingFace); Embodied AI Session Log; LeRobot Episode Archive; Agent Health Monitor (rover as registered agent); ZenFlow Meshtastic Gateway bridge; Aegis Safety Review Queue (all flight events); Agent Health Monitor (drone as registered agent); VectorShift Logistics Tracker; Agent Health Monitor; Aether Link Mesh Status. See [[n8n Workflow Blueprint]].
- MCPs: ZenFlow Internal API MCP; Slack MCP; n8n MCP; Notion MCP; GitHub MCP; Google Drive MCP; Sentry MCP; Obsidian Arc Security MCP; ZenFlow Internal API MCP (staging); Slack MCP (demo notifications); Hugging Face MCP
- Models as written in the spec: claude-sonnet-4-6, claude-opus-4-6, claude-haiku-4-5. Current vault routing is in [[Agent Tier Registry]].
