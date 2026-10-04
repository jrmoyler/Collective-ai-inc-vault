---
title: Wearables Agent Spec — Animus Prime Devices
tags:
- physical-ai
- wearables
- device-specs
- animus-prime
type: spec-section
owner: JR Moyler (Hataalii)
source: Physical AI Wearables Agent Spec
updated: 2026-10-04
division: Animus Prime
device_count: 5
---
# Wearables Agent Spec — Animus Prime Devices

Section of the [[Physical AI Wearables Agent Spec]]. Robotics: the human-machine boundary, built with agents. Division: [[Animus Prime Division]].

| Code | Device | Type | Est. budget |
|---|---|---|---|
| AP-W01 | Prime Shell v0.1 | Android/Robot | ~$1,200–$1,800 |
| AP-W02 | Titan Bench Arm | Android/Robot | ~$900–$1,400 |
| AP-W03 | Dexterous Hand Node | Android/Robot | ~$600–$900 |
| AP-W04 | Mobile Base Rover | Android/Robot | ~$1,100–$1,600 |
| AP-W05 | Embodied AI Control Wearable | Wearable | ~$320–$460 |

## AP-W01 Prime Shell v0.1
*ZENITH speaks. PRIME SHELL answers.* (Android/Robot)

Animus Prime's inaugural android interaction shell. The Prime Shell Agent runs as a persistent ZenFlow Task Agent on the Jetson, receiving voice commands via ReSpeaker, generating responses via Claude, and controlling head/neck/hand servos via PCA9685 + DYNAMIXEL. All physical actions pass through Aegis Protocol before execution: no servo moves without aegis_clear. Knowledge Keeper logs every interaction as an embodied agent session.

### Hardware
- InMoov 3D-printed head + torso (Bambu P1S + Prusa CORE One+)
- Amazing Hand (<$200 parts)
- NVIDIA Jetson Orin Nano Super
- ReSpeaker 4-Mic Array v2.0
- Adafruit I2S Speaker Bonnet
- Pi Camera Module 3 Wide
- PCA9685 16-channel servo driver
- DYNAMIXEL XL330 smart servos
- Emergency stop + fused rails

### ZenFlow agents
- [[Prime Shell Agent]] (embodied)
- [[Aegis Protocol Guardian]] (motion safety)
- [[Speech Synthesis Task Agent]]
- [[Vision Perception Task Agent]]
- [[Knowledge Keeper (Device Agent)]]

### APIs
- ZenFlow /v1/aegis (motion clearance)
- Anthropic claude-sonnet-4-6 (conversation)
- ZenFlow /v1/knowledge/write
- DYNAMIXEL SDK API
- ROS2 action API

### n8n workflows
- Agent Spawn + Teardown Orchestrator (session lifecycle)
- Aegis Safety Review Queue (all motion events)
- Knowledge Keeper Digest (embodied session archive)

### MCPs
- ZenFlow Internal API MCP
- Slack MCP (demo notifications)

### Use case
A demo visitor asks Prime Shell a question about ZenFlow. The Vision Task Agent tracks their face, the Speech Synthesis Agent generates a response through Claude, and the head/hand gesture is sent through Aegis Protocol: aegis_clear fires in <50ms, and PRIME SHELL responds with synchronized voice + gesture. Full interaction logged to Knowledge Keeper.

### Build outcome
Talking, seeing, gesturing android shell: Aegis-governed servo control, Claude voice, full interaction archive.

**Est. budget:** ~$1,200–$1,800

> [!warning] Aegis
> No servo moves without aegis_clear; aegis_clear fires in <50ms in the spec's example.

## AP-W02 Titan Bench Arm
*Embodied AI starts with 6 axes and a camera.* (Android/Robot)

A 6-axis SO-101 arm pair for LeRobot teleoperation and manipulation training. The Titan Arm Agent runs on Jetson, receives teleoperation commands from the leader arm, mirrors them on the follower, and logs every trajectory as a training episode in the LeRobot data pipeline. Aegis Protocol enforces current limits and speed limits: any out-of-bounds motion triggers aegis_hold and physical e-stop.

### Hardware
- SO-101 / LeRobot arm (leader + follower)
- NVIDIA Jetson Orin Nano Super
- Luxonis OAK-D Lite
- DYNAMIXEL XL330 smart servos
- PCA9685 servo driver
- Emergency stop switch + fused rails
- Bench power supply
- 3D-printed Bambu P1S arm mount + channel

### ZenFlow agents
- [[Titan Arm Agent]]
- [[LeRobot Teleoperation Task Agent]]
- [[Manipulation Training Data Collector]]
- [[Aegis Protocol Guardian]] (motion)
- [[Knowledge Keeper (Device Agent)]]

### APIs
- ZenFlow /v1/aegis (motion safety gate)
- Hugging Face LeRobot API (dataset push)
- DYNAMIXEL SDK
- ROS2 action API
- ZenFlow /v1/knowledge/write

### n8n workflows
- Aegis Safety Review Queue (all arm motion)
- LeRobot Episode Archive (training data sync to HuggingFace)
- Embodied AI Session Log

### MCPs
- Hugging Face MCP
- ZenFlow Internal API MCP
- Sentry MCP

### Use case
JR teleoperates the leader arm for a pick-and-place task. The follower mirrors. Every trajectory is logged as a training episode and automatically pushed to Hugging Face via the LeRobot n8n workflow. 100 episodes later, the Manipulation Training Data Collector has a fine-tunable dataset.

### Build outcome
Embodied AI training bench: teleoperation logging, Aegis-governed motion, auto LeRobot dataset generation.

**Est. budget:** ~$900–$1,400

> [!warning] Aegis
> Aegis enforces current and speed limits; out-of-bounds motion triggers aegis_hold and physical e-stop.

## AP-W03 Dexterous Hand Node
*The Amazing Hand learns by doing.* (Android/Robot)

An isolated Amazing Hand prototype on a Jetson node for fine motor AI research. The Dexterous Hand Task Agent receives grasp targets from an OAK-D depth camera, executes via DYNAMIXEL finger servos (all Aegis-cleared), and logs success/failure data to Knowledge Keeper. Hugging Face LeRobot receives the grasp dataset after each session.

### Hardware
- Amazing Hand (3D-printed humanoid hand, <$200 parts)
- NVIDIA Jetson Orin Nano Super
- DYNAMIXEL XL330 (finger joints)
- PCA9685 servo driver
- Luxonis OAK-D Lite (visual target)
- Emergency stop + bench PSU
- 3D-printed Bambu P1S wrist mount

### ZenFlow agents
- [[Dexterous Hand Task Agent]]
- [[Grasp Planning Agent]]
- [[Vision Perception Task Agent]]
- [[Aegis Protocol Guardian]]
- [[Knowledge Keeper (Device Agent)]]

### APIs
- DYNAMIXEL SDK
- ZenFlow /v1/aegis
- Hugging Face LeRobot API
- ZenFlow /v1/knowledge/write
- Luxonis DepthAI API

### n8n workflows
- Aegis Safety Review Queue
- LeRobot Episode Archive
- Embodied AI Session Log

### MCPs
- Hugging Face MCP
- ZenFlow Internal API MCP

### Use case
The Grasp Planning Agent identifies a target object via OAK-D depth map, computes a grasp configuration, sends it to DYNAMIXEL servos through Aegis clearance, and logs success/failure with the grasp force profile. 500 grasps later: a fine-tunable manipulation dataset on Hugging Face.

### Build outcome
Isolated dexterous hand research node: vision-guided grasping, Aegis-governed servos, auto dataset generation.

**Est. budget:** ~$600–$900

> [!warning] Aegis
> All finger servo commands are Aegis-cleared.

## AP-W04 Mobile Base Rover
*Prime Shell gets legs: the first mobile android base.* (Android/Robot)

A ROS2 ROSMASTER R2 rover running the Mobile Navigation Task Agent on a Jetson. LiDAR-based obstacle avoidance + depth camera perception feed an autonomous navigation stack. All movement commands pass through Aegis Protocol: speed limits, geofence boundaries, and emergency stop are hard-enforced at the firmware level. Meshtastic LoRa provides field telemetry when Wi-Fi is unavailable.

### Hardware
- ROSMASTER R2 ROS2 rover base
- NVIDIA Jetson Orin Nano Super
- RPLIDAR A1M8 (navigation)
- Luxonis OAK-D Lite (obstacle depth)
- LILYGO T-Beam Meshtastic (field telemetry)
- Cytron MD13S motor driver
- Emergency stop + fused rails

### ZenFlow agents
- [[Mobile Navigation Task Agent]]
- [[Obstacle Avoidance Agent]]
- [[Aegis Protocol Guardian]] (motion)
- [[Knowledge Keeper (Device Agent)]]
- [[Field Telemetry Task Agent]]

### APIs
- ZenFlow /v1/aegis (navigation clearance)
- ROS2 nav2 stack API
- Meshtastic Python API
- ZenFlow /v1/knowledge/write
- RPLIDAR Python API

### n8n workflows
- Aegis Safety Review Queue
- Agent Health Monitor (rover as registered agent)
- ZenFlow Meshtastic Gateway bridge

### MCPs
- ZenFlow Internal API MCP
- n8n MCP

### Use case
The rover navigates autonomously to deliver a component to the Titan Bench Arm station. Every navigation command is Aegis-cleared. When a person enters its path, OAK-D triggers aegis_hold and the rover stops. Meshtastic LoRa reports its GPS position to the Foundry mesh even when off the Wi-Fi VLAN.

### Build outcome
Autonomous mobile android base: ROS2 navigation, Aegis-governed motion, mesh telemetry, obstacle-aware.

**Est. budget:** ~$1,100–$1,600

> [!warning] Aegis
> All movement commands pass through Aegis; speed limits, geofence and e-stop are hard-enforced at firmware level; a person in path triggers aegis_hold.

## AP-W05 Embodied AI Control Wearable
*Wear the control layer: teleoperate with your body.* (Wearable)

A full-body gesture control wearable for Prime Shell and Titan Arm teleoperation. IMU sensors on wrist, elbow, and torso capture operator motion at 100Hz. The Teleoperation Task Agent maps operator gestures to robot joint commands through the ZenFlow API, with Aegis Protocol enforcing joint limits in real time. All teleoperation sessions generate LeRobot training episodes automatically.

### Hardware
- Arduino Nano 33 BLE Sense Rev2 (×3: wrist, elbow, torso)
- IMU BNO085 (×3)
- Adafruit DRV2605L Haptic Controller (force feedback)
- Adafruit Feather nRF52840 Sense (BLE hub)
- PowerBoost 1000 + LiPo
- 3D-printed Bambu A1 modular body mount shells (PETG)

### ZenFlow agents
- [[Teleoperation Mapping Task Agent]]
- [[Aegis Protocol Guardian]]
- [[LeRobot Training Data Collector]]
- [[Knowledge Keeper (Device Agent)]]

### APIs
- ZenFlow /v1/aegis (joint limit gate)
- Hugging Face LeRobot API
- ZenFlow /v1/knowledge/write
- DYNAMIXEL SDK (command relay)
- BLE Gateway API

### n8n workflows
- LeRobot Episode Archive
- Aegis Safety Review Queue
- Embodied AI Session Log

### MCPs
- Hugging Face MCP
- ZenFlow Internal API MCP

### Use case
An operator puts on the Embodied AI Wearable and performs a manipulation sequence. Their body motion is mapped to the Titan Arm in real time. Haptic feedback delivers resistance sensations at joint limits. Every movement is logged as a LeRobot training episode: operator becomes the robot's teacher.

### Build outcome
Body-worn teleoperation controller: 3-axis gesture mapping, haptic force feedback, auto LeRobot training data.

**Est. budget:** ~$320–$460

> [!warning] Aegis
> Aegis enforces joint limits in real time.
