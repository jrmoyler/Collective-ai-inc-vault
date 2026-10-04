---
title: Mobile Navigation Task Agent
tags:
- device-agent
- physical-ai
- wearables
- android-robot
tier: not stated
type: device-agent
model: not stated
owner: JR Moyler (Hataalii)
device: AP-W04 Mobile Base Rover
source: Physical AI Wearables Agent Spec
status: spec
updated: 2026-10-04
division: Animus Prime
clearance: aegis_clear required before physical motion
device_count: 1
---
# Mobile Navigation Task Agent

Device agent from the [[Physical AI Wearables Agent Spec]]. Divisions: [[Animus Prime Division]].

## Role
Runs on the Mobile Base Rover Jetson. LiDAR obstacle avoidance and depth perception feed the autonomous navigation stack.

## Device it runs on
**AP-W04 Mobile Base Rover** (Android/Robot), described in [[Wearables Agent Spec — Animus Prime Devices]]. A ROS2 ROSMASTER R2 rover running the Mobile Navigation Task Agent on a Jetson. LiDAR-based obstacle avoidance + depth camera perception feed an autonomous navigation stack. All movement commands pass through Aegis Protocol: speed limits, geofence boundaries, and emergency stop are hard-enforced at the firmware level. Meshtastic LoRa provides field telemetry when Wi-Fi is unavailable.

## Inputs and sensors
- **Mobile Base Rover**: ROSMASTER R2 ROS2 rover base; NVIDIA Jetson Orin Nano Super; RPLIDAR A1M8 (navigation); Luxonis OAK-D Lite (obstacle depth); LILYGO T-Beam Meshtastic (field telemetry); Cytron MD13S motor driver

## Outputs and actions
- Navigate autonomously (e.g. deliver a component to the Titan Bench Arm station)
- On Mobile Base Rover: The rover navigates autonomously to deliver a component to the Titan Bench Arm station. Every navigation command is Aegis-cleared. When a person enters its path, OAK-D triggers aegis_hold and the rover stops. Meshtastic LoRa reports its GPS position to the Foundry mesh even when off the Wi-Fi VLAN.

## Permissions
API and MCP access listed for its device(s):
- **Mobile Base Rover**: APIs: ZenFlow /v1/aegis (navigation clearance); ROS2 nav2 stack API; Meshtastic Python API; ZenFlow /v1/knowledge/write; RPLIDAR Python API. MCPs: ZenFlow Internal API MCP; n8n MCP.

## Aegis clause
- **Mobile Base Rover**: All movement commands pass through Aegis; speed limits, geofence and e-stop are hard-enforced at firmware level; a person in path triggers aegis_hold.

## Escalation
Alert and review workflows on its devices:
- **Mobile Base Rover**: Aegis Safety Review Queue; Agent Health Monitor (rover as registered agent)

## System prompt
The spec gives no system prompt text for this agent.

## Dependencies
- Co-resident agents: [[Obstacle Avoidance Agent]], [[Aegis Protocol Guardian]], [[Knowledge Keeper (Device Agent)]], [[Field Telemetry Task Agent]]
- n8n workflows: Aegis Safety Review Queue; Agent Health Monitor (rover as registered agent); ZenFlow Meshtastic Gateway bridge. See [[n8n Workflow Blueprint]].
- MCPs: ZenFlow Internal API MCP; n8n MCP
