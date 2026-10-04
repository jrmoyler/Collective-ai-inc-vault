---
title: Field Telemetry Task Agent
tags:
- device-agent
- physical-ai
- wearables
- android-robot
- mesh-node
- wearable
tier: not stated
type: device-agent
model: claude-haiku-4-5
owner: JR Moyler (Hataalii)
device: AP-W04 Mobile Base Rover, VS-W01 Sky Vector Dev Drone, VS-W02 Ground Vector Rover, VS-W03 Logistics Mesh Node, VS-W05 Flight Ops Wearable
source: Physical AI Wearables Agent Spec
status: spec
updated: 2026-10-04
division: Animus Prime, VectorShift
clearance: Aegis-governed device(s); see Aegis clause
device_count: 5
---
# Field Telemetry Task Agent

Device agent from the [[Physical AI Wearables Agent Spec]]. Divisions: [[Animus Prime Division]], [[VectorShift Division]].

## Role
Handles Meshtastic LoRa telemetry for rovers, drones, mesh nodes and the flight ops wristband.

## Devices it runs on
| Code | Device | Type | Section | Listed as |
|---|---|---|---|---|
| AP-W04 | Mobile Base Rover | Android/Robot | [[Wearables Agent Spec — Animus Prime Devices]] | Field Telemetry Task Agent |
| VS-W01 | Sky Vector Dev Drone | Android/Robot | [[Wearables Agent Spec — VectorShift Devices]] | Field Telemetry Task Agent |
| VS-W02 | Ground Vector Rover | Android/Robot | [[Wearables Agent Spec — VectorShift Devices]] | Field Telemetry Task Agent |
| VS-W03 | Logistics Mesh Node | Mesh Node | [[Wearables Agent Spec — VectorShift Devices]] | Field Telemetry Task Agent |
| VS-W05 | Flight Ops Wearable | Wearable | [[Wearables Agent Spec — VectorShift Devices]] | Field Telemetry Task Agent |

## Inputs and sensors
- **Mobile Base Rover**: ROSMASTER R2 ROS2 rover base; NVIDIA Jetson Orin Nano Super; RPLIDAR A1M8 (navigation); Luxonis OAK-D Lite (obstacle depth); LILYGO T-Beam Meshtastic (field telemetry); Cytron MD13S motor driver
- **Sky Vector Dev Drone**: Holybro X500 V2 PX4 Dev Kit; Pixhawk 6C Flight Controller; NVIDIA Jetson Orin Nano Super (companion); Pi AI Camera (visual navigation); LILYGO T-Beam Meshtastic (mesh telemetry)
- **Ground Vector Rover**: ROSMASTER R2 ROS2 rover base; NVIDIA Jetson Orin Nano Super; RPLIDAR A1M8; Luxonis OAK-D Lite; Cytron MD13S motor driver; LILYGO T-Beam Meshtastic
- **Logistics Mesh Node**: LILYGO T-Beam Meshtastic (GPS + LoRa); Raspberry Pi 5 (MQTT bridge); Heltec V3 relay nodes (×2 corridor); Directional LoRa antenna
- **Flight Ops Wearable**: Adafruit Feather nRF52840 Sense; Adafruit DRV2605L Haptic Controller; IMU ICM-20948

## Outputs and actions
- Report GPS position to the Foundry mesh when off Wi-Fi
- Relay position beacons for the Logistics Tracker

## Permissions
API and MCP access listed for its device(s):
- **Mobile Base Rover**: APIs: ZenFlow /v1/aegis (navigation clearance); ROS2 nav2 stack API; Meshtastic Python API; ZenFlow /v1/knowledge/write; RPLIDAR Python API. MCPs: ZenFlow Internal API MCP; n8n MCP.
- **Sky Vector Dev Drone**: APIs: ZenFlow /v1/aegis (flight command clearance); PX4 MAVLink API; Meshtastic Python API; ZenFlow /v1/knowledge/write; Anthropic claude-haiku-4-5 (mission planning). MCPs: ZenFlow Internal API MCP; n8n MCP.
- **Ground Vector Rover**: APIs: ZenFlow /v1/aegis (navigation clearance); ROS2 nav2 API; Meshtastic Python API; ZenFlow /v1/knowledge/write. MCPs: ZenFlow Internal API MCP; n8n MCP.
- **Logistics Mesh Node**: APIs: Meshtastic Python API; ZenFlow /v1/agents/health (device registration); MQTT broker; n8n webhook. MCPs: ZenFlow Internal API MCP; n8n MCP.
- **Flight Ops Wearable**: APIs: ZenFlow /v1/aegis/queue (haptic dispatch); PX4 MAVLink API; BLE Gateway API; Meshtastic Python API. MCPs: ZenFlow Internal API MCP.

## Aegis clause
- **Mobile Base Rover**: All movement commands pass through Aegis; speed limits, geofence and e-stop are hard-enforced at firmware level; a person in path triggers aegis_hold.
- **Sky Vector Dev Drone**: All flight commands Aegis-cleared; indoor tethered tests required before outdoor autonomy unlock; flight only after aegis_clear.
- **Ground Vector Rover**: Aegis enforces speed limits and geofence; all waypoints cleared.
- **Flight Ops Wearable**: Triple haptic pulse for Aegis flight hold.

## Escalation
Alert and review workflows on its devices:
- **Mobile Base Rover**: Aegis Safety Review Queue; Agent Health Monitor (rover as registered agent)
- **Sky Vector Dev Drone**: Aegis Safety Review Queue (all flight events); Agent Health Monitor (drone as registered agent)
- **Ground Vector Rover**: Aegis Safety Review Queue; Agent Health Monitor
- **Logistics Mesh Node**: ZenFlow Agent Health Monitor (physical nodes)
- **Flight Ops Wearable**: Aegis Safety Review Queue

## System prompt
The spec gives no system prompt text for this agent.

## Dependencies
- Co-resident agents: [[Mobile Navigation Task Agent]], [[Obstacle Avoidance Agent]], [[Aegis Protocol Guardian]], [[Knowledge Keeper (Device Agent)]], [[Sky Vector Flight Agent]], [[Ground Vector Navigation Agent]], [[Agent Health Monitor]], [[Logistics Tracker Task Agent]]
- n8n workflows: Aegis Safety Review Queue; Agent Health Monitor (rover as registered agent); ZenFlow Meshtastic Gateway bridge; Aegis Safety Review Queue (all flight events); Agent Health Monitor (drone as registered agent); VectorShift Logistics Tracker; Agent Health Monitor; ZenFlow Agent Health Monitor (physical nodes). See [[n8n Workflow Blueprint]].
- MCPs: ZenFlow Internal API MCP; n8n MCP
- Models as written in the spec: claude-haiku-4-5. Current vault routing is in [[Agent Tier Registry]].
