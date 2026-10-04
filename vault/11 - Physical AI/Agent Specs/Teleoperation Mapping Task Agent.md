---
title: Teleoperation Mapping Task Agent
tags:
- device-agent
- physical-ai
- wearables
- wearable
tier: not stated
type: device-agent
model: not stated
owner: JR Moyler (Hataalii)
device: AP-W05 Embodied AI Control Wearable
source: Physical AI Wearables Agent Spec
status: spec
updated: 2026-10-04
division: Animus Prime
clearance: Aegis-governed device(s); see Aegis clause
device_count: 1
---
# Teleoperation Mapping Task Agent

Device agent from the [[Physical AI Wearables Agent Spec]]. Divisions: [[Animus Prime Division]].

## Role
Runs for the Embodied AI Control Wearable. IMUs on wrist, elbow and torso capture operator motion at 100Hz.

## Device it runs on
**AP-W05 Embodied AI Control Wearable** (Wearable), described in [[Wearables Agent Spec — Animus Prime Devices]]. A full-body gesture control wearable for Prime Shell and Titan Arm teleoperation. IMU sensors on wrist, elbow, and torso capture operator motion at 100Hz. The Teleoperation Task Agent maps operator gestures to robot joint commands through the ZenFlow API, with Aegis Protocol enforcing joint limits in real time. All teleoperation sessions generate LeRobot training episodes automatically.

## Inputs and sensors
- **Embodied AI Control Wearable**: Arduino Nano 33 BLE Sense Rev2 (×3: wrist, elbow, torso); IMU BNO085 (×3); Adafruit DRV2605L Haptic Controller (force feedback); Adafruit Feather nRF52840 Sense (BLE hub)

## Outputs and actions
- Map operator gestures to robot joint commands through the ZenFlow API
- Deliver haptic resistance at joint limits
- On Embodied AI Control Wearable: An operator puts on the Embodied AI Wearable and performs a manipulation sequence. Their body motion is mapped to the Titan Arm in real time. Haptic feedback delivers resistance sensations at joint limits. Every movement is logged as a LeRobot training episode: operator becomes the robot's teacher.

## Permissions
API and MCP access listed for its device(s):
- **Embodied AI Control Wearable**: APIs: ZenFlow /v1/aegis (joint limit gate); Hugging Face LeRobot API; ZenFlow /v1/knowledge/write; DYNAMIXEL SDK (command relay); BLE Gateway API. MCPs: Hugging Face MCP; ZenFlow Internal API MCP.

## Aegis clause
- **Embodied AI Control Wearable**: Aegis enforces joint limits in real time.

## Escalation
Alert and review workflows on its devices:
- **Embodied AI Control Wearable**: Aegis Safety Review Queue

## System prompt
The spec gives no system prompt text for this agent.

## Dependencies
- Co-resident agents: [[Aegis Protocol Guardian]], [[LeRobot Training Data Collector]], [[Knowledge Keeper (Device Agent)]]
- n8n workflows: LeRobot Episode Archive; Aegis Safety Review Queue; Embodied AI Session Log. See [[n8n Workflow Blueprint]].
- MCPs: Hugging Face MCP; ZenFlow Internal API MCP
