---
title: Prime Shell Agent
tags:
- device-agent
- physical-ai
- wearables
- android-robot
tier: not stated
type: device-agent
model: claude-sonnet-4-6
owner: JR Moyler (Hataalii)
device: AP-W01 Prime Shell v0.1
source: Physical AI Wearables Agent Spec
status: spec
updated: 2026-10-04
division: Animus Prime
clearance: aegis_clear required before physical motion
device_count: 1
---
# Prime Shell Agent

Device agent from the [[Physical AI Wearables Agent Spec]]. Divisions: [[Animus Prime Division]].

## Role
Listed as 'Prime Shell Agent (embodied)'. Runs as a persistent ZenFlow Task Agent on the Prime Shell v0.1 Jetson. Receives voice via ReSpeaker, generates responses via Claude, and controls head/neck/hand servos via PCA9685 + DYNAMIXEL.

## Devices it runs on
| Code | Device | Type | Section | Listed as |
|---|---|---|---|---|
| AP-W01 | Prime Shell v0.1 | Android/Robot | [[Wearables Agent Spec — Animus Prime Devices]] | Prime Shell Agent (embodied) |

## Inputs and sensors
- **Prime Shell v0.1**: Amazing Hand (<$200 parts); NVIDIA Jetson Orin Nano Super; ReSpeaker 4-Mic Array v2.0; Adafruit I2S Speaker Bonnet; Pi Camera Module 3 Wide; PCA9685 16-channel servo driver; DYNAMIXEL XL330 smart servos

## Outputs and actions
- Hold voice conversations
- Send gestures through Aegis for clearance
- Respond with synchronized voice + gesture
- On Prime Shell v0.1: A demo visitor asks Prime Shell a question about ZenFlow. The Vision Task Agent tracks their face, the Speech Synthesis Agent generates a response through Claude, and the head/hand gesture is sent through Aegis Protocol: aegis_clear fires in <50ms, and PRIME SHELL responds with synchronized voice + gesture. Full interaction logged to Knowledge Keeper.

## Permissions
API and MCP access listed for its device(s):
- **Prime Shell v0.1**: APIs: ZenFlow /v1/aegis (motion clearance); Anthropic claude-sonnet-4-6 (conversation); ZenFlow /v1/knowledge/write; DYNAMIXEL SDK API; ROS2 action API. MCPs: ZenFlow Internal API MCP; Slack MCP (demo notifications).

## Aegis clause
- **Prime Shell v0.1**: No servo moves without aegis_clear; aegis_clear fires in <50ms in the spec's example.

## Escalation
Alert and review workflows on its devices:
- **Prime Shell v0.1**: Aegis Safety Review Queue (all motion events)

## System prompt
The spec gives no system prompt text for this agent.

## Dependencies
- Co-resident agents: [[Aegis Protocol Guardian]], [[Speech Synthesis Task Agent]], [[Vision Perception Task Agent]], [[Knowledge Keeper (Device Agent)]]
- n8n workflows: Agent Spawn + Teardown Orchestrator (session lifecycle); Aegis Safety Review Queue (all motion events); Knowledge Keeper Digest (embodied session archive). See [[n8n Workflow Blueprint]].
- MCPs: ZenFlow Internal API MCP; Slack MCP (demo notifications)
- Models as written in the spec: claude-sonnet-4-6. Current vault routing is in [[Agent Tier Registry]].
