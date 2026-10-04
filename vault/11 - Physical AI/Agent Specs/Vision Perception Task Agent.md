---
title: Vision Perception Task Agent
tags:
- device-agent
- physical-ai
- wearables
- android-robot
tier: not stated
type: device-agent
model: claude-sonnet-4-6
owner: JR Moyler (Hataalii)
device: AP-W01 Prime Shell v0.1, AP-W03 Dexterous Hand Node
source: Physical AI Wearables Agent Spec
status: spec
updated: 2026-10-04
division: Animus Prime
clearance: aegis_clear required before physical motion
device_count: 2
---
# Vision Perception Task Agent

Device agent from the [[Physical AI Wearables Agent Spec]]. Divisions: [[Animus Prime Division]].

## Role
Vision agent on the Prime Shell (tracks visitor faces) and Dexterous Hand Node.

## Devices it runs on
| Code | Device | Type | Section | Listed as |
|---|---|---|---|---|
| AP-W01 | Prime Shell v0.1 | Android/Robot | [[Wearables Agent Spec — Animus Prime Devices]] | Vision Perception Task Agent |
| AP-W03 | Dexterous Hand Node | Android/Robot | [[Wearables Agent Spec — Animus Prime Devices]] | Vision Perception Task Agent |

## Inputs and sensors
- **Prime Shell v0.1**: Amazing Hand (<$200 parts); NVIDIA Jetson Orin Nano Super; ReSpeaker 4-Mic Array v2.0; Adafruit I2S Speaker Bonnet; Pi Camera Module 3 Wide; PCA9685 16-channel servo driver; DYNAMIXEL XL330 smart servos
- **Dexterous Hand Node**: NVIDIA Jetson Orin Nano Super; DYNAMIXEL XL330 (finger joints); PCA9685 servo driver; Luxonis OAK-D Lite (visual target)

## Outputs and actions
- Track faces
- Provide visual targets for grasping
- On Prime Shell v0.1: A demo visitor asks Prime Shell a question about ZenFlow. The Vision Task Agent tracks their face, the Speech Synthesis Agent generates a response through Claude, and the head/hand gesture is sent through Aegis Protocol: aegis_clear fires in <50ms, and PRIME SHELL responds with synchronized voice + gesture. Full interaction logged to Knowledge Keeper.
- On Dexterous Hand Node: The Grasp Planning Agent identifies a target object via OAK-D depth map, computes a grasp configuration, sends it to DYNAMIXEL servos through Aegis clearance, and logs success/failure with the grasp force profile. 500 grasps later: a fine-tunable manipulation dataset on Hugging Face.

## Permissions
API and MCP access listed for its device(s):
- **Prime Shell v0.1**: APIs: ZenFlow /v1/aegis (motion clearance); Anthropic claude-sonnet-4-6 (conversation); ZenFlow /v1/knowledge/write; DYNAMIXEL SDK API; ROS2 action API. MCPs: ZenFlow Internal API MCP; Slack MCP (demo notifications).
- **Dexterous Hand Node**: APIs: DYNAMIXEL SDK; ZenFlow /v1/aegis; Hugging Face LeRobot API; ZenFlow /v1/knowledge/write; Luxonis DepthAI API. MCPs: Hugging Face MCP; ZenFlow Internal API MCP.

## Aegis clause
- **Prime Shell v0.1**: No servo moves without aegis_clear; aegis_clear fires in <50ms in the spec's example.
- **Dexterous Hand Node**: All finger servo commands are Aegis-cleared.

## Escalation
Alert and review workflows on its devices:
- **Prime Shell v0.1**: Aegis Safety Review Queue (all motion events)
- **Dexterous Hand Node**: Aegis Safety Review Queue

## System prompt
The spec gives no system prompt text for this agent.

## Dependencies
- Co-resident agents: [[Prime Shell Agent]], [[Aegis Protocol Guardian]], [[Speech Synthesis Task Agent]], [[Knowledge Keeper (Device Agent)]], [[Dexterous Hand Task Agent]], [[Grasp Planning Agent]]
- n8n workflows: Agent Spawn + Teardown Orchestrator (session lifecycle); Aegis Safety Review Queue (all motion events); Knowledge Keeper Digest (embodied session archive); Aegis Safety Review Queue; LeRobot Episode Archive; Embodied AI Session Log. See [[n8n Workflow Blueprint]].
- MCPs: ZenFlow Internal API MCP; Slack MCP (demo notifications); Hugging Face MCP
- Models as written in the spec: claude-sonnet-4-6. Current vault routing is in [[Agent Tier Registry]].
