---
title: Aether Link Mesh Extension Task Agent
tags:
- device-agent
- physical-ai
- wearables
- android-robot
tier: not stated
type: device-agent
model: not stated
owner: JR Moyler (Hataalii)
device: VS-W04 Aerial Mesh Relay Drone
source: Physical AI Wearables Agent Spec
status: spec
updated: 2026-10-04
division: VectorShift
clearance: aegis_clear required before physical motion
device_count: 1
---
# Aether Link Mesh Extension Task Agent

Device agent from the [[Physical AI Wearables Agent Spec]]. Divisions: [[VectorShift Division]].
Related: [[Aether Link Division]].

## Role
Registers the airborne drone as a ZenFlow mesh bridge node, extending the Aether Link mesh beyond fixed node range.

## Device it runs on
**VS-W04 Aerial Mesh Relay Drone** (Android/Robot), described in [[Wearables Agent Spec — VectorShift Devices]]. An X500 carrying a Pi 5 + LoRa mesh payload for extending the Aether Link mesh to areas beyond fixed node range. The Mesh Relay Flight Agent manages altitude and geofence for maximum relay coverage. When deployed, it registers as a ZenFlow mesh bridge node: all Foundry devices gain extended LoRa range while it's airborne.

## Inputs and sensors
- **Aerial Mesh Relay Drone**: Holybro X500 V2 ARF Kit; Pixhawk 6C; Raspberry Pi 5 (mesh payload); LILYGO T-Beam Meshtastic (aerial relay); Directional LoRa antennas

## Outputs and actions
- Register the drone as a mesh bridge
- Reconnect rovers and field kits through the airborne relay
- On Aerial Mesh Relay Drone: During a remote field operation, fixed LoRa nodes can't reach the site. The Aerial Mesh Relay Drone is deployed, hovers at 100 feet, and instantly extends the Foundry mesh network by 8km. All Ground Vector rovers and field kits reconnect through the airborne relay.

## Permissions
API and MCP access listed for its device(s):
- **Aerial Mesh Relay Drone**: APIs: ZenFlow /v1/aegis; PX4 MAVLink API; Meshtastic Python API; ZenFlow /v1/knowledge/write. MCPs: ZenFlow Internal API MCP; n8n MCP.

## Aegis clause
- **Aerial Mesh Relay Drone**: Flight runs under Aegis Protocol Guardian (flight) and the Aegis Safety Review Queue.

## Escalation
Alert and review workflows on its devices:
- **Aerial Mesh Relay Drone**: Aegis Safety Review Queue; Agent Health Monitor

## System prompt
The spec gives no system prompt text for this agent.

## Dependencies
- Co-resident agents: [[Mesh Relay Flight Agent]], [[Aegis Protocol Guardian]], [[Knowledge Keeper (Device Agent)]]
- n8n workflows: Aegis Safety Review Queue; Aether Link Mesh Status; Agent Health Monitor. See [[n8n Workflow Blueprint]].
- MCPs: ZenFlow Internal API MCP; n8n MCP
