---
title: Titan Arm Agent
tags:
- device-agent
- physical-ai
- wearables
- android-robot
tier: not stated
type: device-agent
model: not stated
owner: JR Moyler (Hataalii)
device: AP-W02 Titan Bench Arm
source: Physical AI Wearables Agent Spec
status: spec
updated: 2026-10-04
division: Animus Prime
clearance: aegis_clear required before physical motion
device_count: 1
---
# Titan Arm Agent

Device agent from the [[Physical AI Wearables Agent Spec]]. Divisions: [[Animus Prime Division]].

## Role
Runs on the Titan Bench Arm Jetson. Receives teleoperation commands from the SO-101 leader arm and mirrors them on the follower.

## Device it runs on
**AP-W02 Titan Bench Arm** (Android/Robot), described in [[Wearables Agent Spec — Animus Prime Devices]]. A 6-axis SO-101 arm pair for LeRobot teleoperation and manipulation training. The Titan Arm Agent runs on Jetson, receives teleoperation commands from the leader arm, mirrors them on the follower, and logs every trajectory as a training episode in the LeRobot data pipeline. Aegis Protocol enforces current limits and speed limits: any out-of-bounds motion triggers aegis_hold and physical e-stop.

## Inputs and sensors
- **Titan Bench Arm**: SO-101 / LeRobot arm (leader + follower); NVIDIA Jetson Orin Nano Super; Luxonis OAK-D Lite; DYNAMIXEL XL330 smart servos; PCA9685 servo driver

## Outputs and actions
- Mirror leader-arm commands
- Log every trajectory as a LeRobot training episode
- On Titan Bench Arm: JR teleoperates the leader arm for a pick-and-place task. The follower mirrors. Every trajectory is logged as a training episode and automatically pushed to Hugging Face via the LeRobot n8n workflow. 100 episodes later, the Manipulation Training Data Collector has a fine-tunable dataset.

## Permissions
API and MCP access listed for its device(s):
- **Titan Bench Arm**: APIs: ZenFlow /v1/aegis (motion safety gate); Hugging Face LeRobot API (dataset push); DYNAMIXEL SDK; ROS2 action API; ZenFlow /v1/knowledge/write. MCPs: Hugging Face MCP; ZenFlow Internal API MCP; Sentry MCP.

## Aegis clause
- **Titan Bench Arm**: Aegis enforces current and speed limits; out-of-bounds motion triggers aegis_hold and physical e-stop.

## Escalation
Alert and review workflows on its devices:
- **Titan Bench Arm**: Aegis Safety Review Queue (all arm motion)

## System prompt
The spec gives no system prompt text for this agent.

## Dependencies
- Co-resident agents: [[LeRobot Teleoperation Task Agent]], [[Manipulation Training Data Collector]], [[Aegis Protocol Guardian]], [[Knowledge Keeper (Device Agent)]]
- n8n workflows: Aegis Safety Review Queue (all arm motion); LeRobot Episode Archive (training data sync to HuggingFace); Embodied AI Session Log. See [[n8n Workflow Blueprint]].
- MCPs: Hugging Face MCP; ZenFlow Internal API MCP; Sentry MCP
