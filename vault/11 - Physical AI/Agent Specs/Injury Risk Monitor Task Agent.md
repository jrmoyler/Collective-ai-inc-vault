---
title: Injury Risk Monitor Task Agent
tags:
- device-agent
- physical-ai
- wearables
tier: not stated
type: device-agent
model: claude-sonnet-4-6
owner: JR Moyler (Hataalii)
device: KE-W01 Apex Motion Cage
source: Physical AI Wearables Agent Spec
status: spec
updated: 2026-10-04
division: Kinetic Edge
clearance: not stated
device_count: 1
---
# Injury Risk Monitor Task Agent

Device agent from the [[Physical AI Wearables Agent Spec]]. Divisions: [[Kinetic Edge Division]].
Related: [[Vital Helix Division]].

## Role
Runs on the Apex Motion Cage. Watches for biomechanical anomalies (e.g. an asymmetry in the left knee torque vector).

## Device it runs on
**KE-W01 Apex Motion Cage** (Physical AI), described in [[Wearables Agent Spec — Kinetic Edge Devices]]. Kinetic Edge's multi-camera, multi-IMU performance sensing cage. Two global shutter cameras + three BNO085 IMUs capture 3D motion, gait patterns, and reaction timing. The Apex System Task Agent processes raw sensor data through the performance analysis pipeline and delivers structured athletic profiles to the TeamOS Mac mini node. Injury Risk Flag n8n workflow fires immediately on biomechanical anomaly detection.

## Inputs and sensors
- **Apex Motion Cage**: Raspberry Pi 5 8GB (×2); Pi Global Shutter Camera (×2); IMU BNO085 (×3); NVIDIA Jetson Orin Nano Super; Arduino Nano 33 BLE Sense Rev2

## Outputs and actions
- Fire the Injury Risk Flag + Coaching Alert workflow
- Alert the trainer via Slack, schedule a wellness check in Airtable, log a Vital Helix integration request
- On Apex Motion Cage: An athlete runs a gait protocol. The Injury Risk Monitor detects an asymmetry in the left knee torque vector, fires the Injury Risk Flag workflow, which instantly alerts the trainer via Slack, schedules a wellness check in Airtable, and logs a Vital Helix integration request for recovery protocol generation.

## Permissions
API and MCP access listed for its device(s):
- **Apex Motion Cage**: APIs: ZenFlow /v1/knowledge/write; Anthropic claude-sonnet-4-6 (profile generation); Airtable API (athlete profiles); Slack API (coach alerts). MCPs: Airtable MCP; Slack MCP; ZenFlow Internal API MCP.

## Aegis clause
The spec states no device-specific Aegis rule for this agent. The document-wide gate applies: all physical motion is Aegis-cleared before execution. See [[Wearables Agent Spec — Aegis Physical Safety Gate]].

## Escalation
Alert and review workflows on its devices:
- **Apex Motion Cage**: Injury Risk Flag + Coaching Alert; Athlete Recovery Alert

## System prompt
The spec gives no system prompt text for this agent.

## Dependencies
- Co-resident agents: [[Apex System Performance Agent]], [[Biomechanical Analysis Task Agent]], [[Knowledge Keeper (Device Agent)]]
- n8n workflows: Injury Risk Flag + Coaching Alert; Weekly Performance Report Generator; Athlete Recovery Alert; Scout Intelligence Aggregator. See [[n8n Workflow Blueprint]].
- MCPs: Airtable MCP; Slack MCP; ZenFlow Internal API MCP
- Models as written in the spec: claude-sonnet-4-6. Current vault routing is in [[Agent Tier Registry]].
