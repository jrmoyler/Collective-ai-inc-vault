---
title: Spatial Intelligence Task Agent
tags:
- device-agent
- physical-ai
- wearables
tier: not stated
type: device-agent
model: claude-haiku-4-5
owner: JR Moyler (Hataalii)
device: OA-W02 Sentinel Prime Tower
source: Physical AI Wearables Agent Spec
status: spec
updated: 2026-10-04
division: Obsidian Arc
clearance: Aegis-governed device(s); see Aegis clause
device_count: 1
---
# Spatial Intelligence Task Agent

Device agent from the [[Physical AI Wearables Agent Spec]]. Divisions: [[Obsidian Arc Division]].

## Role
Runs on the Sentinel Prime Tower. Classifies spatial detections (e.g. a person in the Animus Prime robot arm test zone after hours).

## Device it runs on
**OA-W02 Sentinel Prime Tower** (Physical AI), described in [[Wearables Agent Spec — Obsidian Arc Devices]]. A mounted perception mast combining LiDAR + depth + RGB AI + Jetson inference for physical threat detection. Runs the same Aegis Protocol queue as software agents: physical detections become aegis_review or aegis_hold events in the ZenFlow API. All spatial data is logged to Knowledge Keeper with timestamps and person-count metadata.

## Inputs and sensors
- **Sentinel Prime Tower**: NVIDIA Jetson Orin Nano Super; RPLIDAR A1M8; Luxonis OAK-D Lite; Pi AI Camera (Sony IMX500); RealSense D435i

## Outputs and actions
- Classify events as aegis_review or aegis_hold
- Fire the Sentry incident log
- Trigger the emergency stop relay on the arm bench
- On Sentinel Prime Tower: The Sentinel Tower detects a person in the Animus Prime robot arm test zone after hours. The Spatial Intelligence Task Agent classifies it as aegis_hold, fires the Sentry incident log, and triggers the emergency stop relay on the arm bench: physical safety through the same system that governs software agent safety.

## Permissions
API and MCP access listed for its device(s):
- **Sentinel Prime Tower**: APIs: ZenFlow /v1/aegis (physical event injection); UniFi NVR API; ZenFlow /v1/knowledge/write; Anthropic claude-haiku-4-5 (edge inference); Sentry API. MCPs: Sentry MCP; ZenFlow Internal API MCP; Slack MCP.

## Aegis clause
- **Sentinel Prime Tower**: Physical detections become aegis_review or aegis_hold events; aegis_hold can trigger the arm bench emergency stop relay.

## Escalation
Alert and review workflows on its devices:
- **Sentinel Prime Tower**: Aegis Safety Review Queue; Aegis Protocol Compliance Logger

## System prompt
The spec gives no system prompt text for this agent.

## Dependencies
- Co-resident agents: [[Physical Security Task Agent]], [[Aegis Protocol Guardian]], [[Knowledge Keeper (Device Agent)]]
- n8n workflows: Aegis Safety Review Queue; Aegis Protocol Compliance Logger. See [[n8n Workflow Blueprint]].
- MCPs: Sentry MCP; ZenFlow Internal API MCP; Slack MCP
- Models as written in the spec: claude-haiku-4-5. Current vault routing is in [[Agent Tier Registry]].
