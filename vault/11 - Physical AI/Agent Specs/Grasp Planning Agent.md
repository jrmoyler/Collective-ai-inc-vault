---
title: Grasp Planning Agent
tags:
- device-agent
- physical-ai
- wearables
- android-robot
tier: not stated
type: device-agent
model: not stated
owner: JR Moyler (Hataalii)
device: AP-W03 Dexterous Hand Node
source: Physical AI Wearables Agent Spec
status: spec
updated: 2026-10-04
division: Animus Prime
clearance: aegis_clear required before physical motion
device_count: 1
---
# Grasp Planning Agent

Device agent from the [[Physical AI Wearables Agent Spec]]. Divisions: [[Animus Prime Division]].

## Role
Plans grasps on the Dexterous Hand Node.

## Device it runs on
**AP-W03 Dexterous Hand Node** (Android/Robot), described in [[Wearables Agent Spec — Animus Prime Devices]]. An isolated Amazing Hand prototype on a Jetson node for fine motor AI research. The Dexterous Hand Task Agent receives grasp targets from an OAK-D depth camera, executes via DYNAMIXEL finger servos (all Aegis-cleared), and logs success/failure data to Knowledge Keeper. Hugging Face LeRobot receives the grasp dataset after each session.

## Inputs and sensors
- **Dexterous Hand Node**: NVIDIA Jetson Orin Nano Super; DYNAMIXEL XL330 (finger joints); PCA9685 servo driver; Luxonis OAK-D Lite (visual target)

## Outputs and actions
- Identify targets from the OAK-D depth map
- Compute grasp configurations
- Log grasp force profiles (500 grasps → fine-tunable dataset in the spec's example)
- On Dexterous Hand Node: The Grasp Planning Agent identifies a target object via OAK-D depth map, computes a grasp configuration, sends it to DYNAMIXEL servos through Aegis clearance, and logs success/failure with the grasp force profile. 500 grasps later: a fine-tunable manipulation dataset on Hugging Face.

## Permissions
API and MCP access listed for its device(s):
- **Dexterous Hand Node**: APIs: DYNAMIXEL SDK; ZenFlow /v1/aegis; Hugging Face LeRobot API; ZenFlow /v1/knowledge/write; Luxonis DepthAI API. MCPs: Hugging Face MCP; ZenFlow Internal API MCP.

## Aegis clause
- **Dexterous Hand Node**: All finger servo commands are Aegis-cleared.

## Escalation
Alert and review workflows on its devices:
- **Dexterous Hand Node**: Aegis Safety Review Queue

## System prompt
The spec gives no system prompt text for this agent.

## Dependencies
- Co-resident agents: [[Dexterous Hand Task Agent]], [[Vision Perception Task Agent]], [[Aegis Protocol Guardian]], [[Knowledge Keeper (Device Agent)]]
- n8n workflows: Aegis Safety Review Queue; LeRobot Episode Archive; Embodied AI Session Log. See [[n8n Workflow Blueprint]].
- MCPs: Hugging Face MCP; ZenFlow Internal API MCP
