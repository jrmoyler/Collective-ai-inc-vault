---
title: Obstacle Avoidance Agent
tags:
- device-agent
- physical-ai
- wearables
- android-robot
tier: not stated
type: device-agent
model: claude-haiku-4-5
owner: JR Moyler (Hataalii)
device: AP-W04 Mobile Base Rover, VS-W01 Sky Vector Dev Drone, VS-W02 Ground Vector Rover
source: Physical AI Wearables Agent Spec
status: spec
updated: 2026-10-04
division: Animus Prime, VectorShift
clearance: aegis_clear required before physical motion
device_count: 3
---
# Obstacle Avoidance Agent

Device agent from the [[Physical AI Wearables Agent Spec]]. Divisions: [[Animus Prime Division]], [[VectorShift Division]].

## Role
Obstacle avoidance on the rovers and the Sky Vector Dev Drone.

## Devices it runs on
| Code | Device | Type | Section | Listed as |
|---|---|---|---|---|
| AP-W04 | Mobile Base Rover | Android/Robot | [[Wearables Agent Spec — Animus Prime Devices]] | Obstacle Avoidance Agent |
| VS-W01 | Sky Vector Dev Drone | Android/Robot | [[Wearables Agent Spec — VectorShift Devices]] | Obstacle Avoidance Agent |
| VS-W02 | Ground Vector Rover | Android/Robot | [[Wearables Agent Spec — VectorShift Devices]] | Obstacle Avoidance Agent |

## Inputs and sensors
- **Mobile Base Rover**: ROSMASTER R2 ROS2 rover base; NVIDIA Jetson Orin Nano Super; RPLIDAR A1M8 (navigation); Luxonis OAK-D Lite (obstacle depth); LILYGO T-Beam Meshtastic (field telemetry); Cytron MD13S motor driver
- **Sky Vector Dev Drone**: Holybro X500 V2 PX4 Dev Kit; Pixhawk 6C Flight Controller; NVIDIA Jetson Orin Nano Super (companion); Pi AI Camera (visual navigation); LILYGO T-Beam Meshtastic (mesh telemetry)
- **Ground Vector Rover**: ROSMASTER R2 ROS2 rover base; NVIDIA Jetson Orin Nano Super; RPLIDAR A1M8; Luxonis OAK-D Lite; Cytron MD13S motor driver; LILYGO T-Beam Meshtastic

## Outputs and actions
- Detect obstacles and people in path
- Trigger aegis_hold stops
- On Mobile Base Rover: The rover navigates autonomously to deliver a component to the Titan Bench Arm station. Every navigation command is Aegis-cleared. When a person enters its path, OAK-D triggers aegis_hold and the rover stops. Meshtastic LoRa reports its GPS position to the Foundry mesh even when off the Wi-Fi VLAN.
- On Sky Vector Dev Drone: A waypoint mission is planned via voice command to the Zenith Oracle Shell. ZENITH routes it to the Sky Vector Flight Agent, which validates the geofence, requests Aegis clearance, and initiates the flight only after aegis_clear. Every position fix is logged to Knowledge Keeper as a timestamped flight record.
- On Ground Vector Rover: Ground Vector receives a delivery instruction from ZENITH Overseer. The Navigation Agent plans the route, Aegis clears all waypoints, and the rover autonomously delivers while broadcasting GPS position via LoRa. On arrival, the Logistics Tracker n8n workflow marks the route complete.

## Permissions
API and MCP access listed for its device(s):
- **Mobile Base Rover**: APIs: ZenFlow /v1/aegis (navigation clearance); ROS2 nav2 stack API; Meshtastic Python API; ZenFlow /v1/knowledge/write; RPLIDAR Python API. MCPs: ZenFlow Internal API MCP; n8n MCP.
- **Sky Vector Dev Drone**: APIs: ZenFlow /v1/aegis (flight command clearance); PX4 MAVLink API; Meshtastic Python API; ZenFlow /v1/knowledge/write; Anthropic claude-haiku-4-5 (mission planning). MCPs: ZenFlow Internal API MCP; n8n MCP.
- **Ground Vector Rover**: APIs: ZenFlow /v1/aegis (navigation clearance); ROS2 nav2 API; Meshtastic Python API; ZenFlow /v1/knowledge/write. MCPs: ZenFlow Internal API MCP; n8n MCP.

## Aegis clause
- **Mobile Base Rover**: All movement commands pass through Aegis; speed limits, geofence and e-stop are hard-enforced at firmware level; a person in path triggers aegis_hold.
- **Sky Vector Dev Drone**: All flight commands Aegis-cleared; indoor tethered tests required before outdoor autonomy unlock; flight only after aegis_clear.
- **Ground Vector Rover**: Aegis enforces speed limits and geofence; all waypoints cleared.

## Escalation
Alert and review workflows on its devices:
- **Mobile Base Rover**: Aegis Safety Review Queue; Agent Health Monitor (rover as registered agent)
- **Sky Vector Dev Drone**: Aegis Safety Review Queue (all flight events); Agent Health Monitor (drone as registered agent)
- **Ground Vector Rover**: Aegis Safety Review Queue; Agent Health Monitor

## System prompt
The spec gives no system prompt text for this agent.

## Dependencies
- Co-resident agents: [[Mobile Navigation Task Agent]], [[Aegis Protocol Guardian]], [[Knowledge Keeper (Device Agent)]], [[Field Telemetry Task Agent]], [[Sky Vector Flight Agent]], [[Ground Vector Navigation Agent]]
- n8n workflows: Aegis Safety Review Queue; Agent Health Monitor (rover as registered agent); ZenFlow Meshtastic Gateway bridge; Aegis Safety Review Queue (all flight events); Agent Health Monitor (drone as registered agent); VectorShift Logistics Tracker; Agent Health Monitor. See [[n8n Workflow Blueprint]].
- MCPs: ZenFlow Internal API MCP; n8n MCP
- Models as written in the spec: claude-haiku-4-5. Current vault routing is in [[Agent Tier Registry]].
