---
title: Ground Vector Navigation Agent
tags:
- device-agent
- physical-ai
- wearables
- android-robot
tier: not stated
type: device-agent
model: not stated
owner: JR Moyler (Hataalii)
device: VS-W02 Ground Vector Rover
source: Physical AI Wearables Agent Spec
status: spec
updated: 2026-10-04
division: VectorShift
clearance: aegis_clear required before physical motion
device_count: 1
---
# Ground Vector Navigation Agent

Device agent from the [[Physical AI Wearables Agent Spec]]. Divisions: [[VectorShift Division]].
Related: [[Ground Vector]], [[Ground Vector Fleet]].

## Role
Runs on the Ground Vector Rover. Plans paths via LiDAR + depth camera.

## Device it runs on
**VS-W02 Ground Vector Rover** (Android/Robot), described in [[Wearables Agent Spec — VectorShift Devices]]. A ROS2 rover for autonomous last-mile navigation experiments. The Ground Vector Navigation Agent handles path planning via LiDAR + depth camera, with Aegis Protocol enforcing speed limits and geofence boundaries. Meshtastic LoRa uplinks GPS position to the logistics mesh. All route completions are logged to the n8n Logistics Tracker workflow and Knowledge Keeper.

## Inputs and sensors
- **Ground Vector Rover**: ROSMASTER R2 ROS2 rover base; NVIDIA Jetson Orin Nano Super; RPLIDAR A1M8; Luxonis OAK-D Lite; Cytron MD13S motor driver; LILYGO T-Beam Meshtastic

## Outputs and actions
- Plan delivery routes from ZENITH instructions
- Deliver autonomously while broadcasting GPS via LoRa
- On Ground Vector Rover: Ground Vector receives a delivery instruction from ZENITH Overseer. The Navigation Agent plans the route, Aegis clears all waypoints, and the rover autonomously delivers while broadcasting GPS position via LoRa. On arrival, the Logistics Tracker n8n workflow marks the route complete.

## Permissions
API and MCP access listed for its device(s):
- **Ground Vector Rover**: APIs: ZenFlow /v1/aegis (navigation clearance); ROS2 nav2 API; Meshtastic Python API; ZenFlow /v1/knowledge/write. MCPs: ZenFlow Internal API MCP; n8n MCP.

## Aegis clause
- **Ground Vector Rover**: Aegis enforces speed limits and geofence; all waypoints cleared.

## Escalation
Alert and review workflows on its devices:
- **Ground Vector Rover**: Aegis Safety Review Queue; Agent Health Monitor

## System prompt
The spec gives no system prompt text for this agent.

## Dependencies
- Co-resident agents: [[Obstacle Avoidance Agent]], [[Aegis Protocol Guardian]], [[Field Telemetry Task Agent]], [[Knowledge Keeper (Device Agent)]]
- n8n workflows: VectorShift Logistics Tracker; Aegis Safety Review Queue; Agent Health Monitor. See [[n8n Workflow Blueprint]].
- MCPs: ZenFlow Internal API MCP; n8n MCP
