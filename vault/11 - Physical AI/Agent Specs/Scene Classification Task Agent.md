---
title: Scene Classification Task Agent
tags:
- device-agent
- physical-ai
- wearables
tier: not stated
type: device-agent
model: claude-haiku-4-5
owner: JR Moyler (Hataalii)
device: NL-W05 Documentary Capture Rig
source: Physical AI Wearables Agent Spec
status: spec
updated: 2026-10-04
division: Nexus Labs
clearance: not stated
device_count: 1
---
# Scene Classification Task Agent

Device agent from the [[Physical AI Wearables Agent Spec]]. Divisions: [[Nexus Labs Division]].

## Role
Runs local shot classification on the Documentary Capture Rig's Jetson.

## Device it runs on
**NL-W05 Documentary Capture Rig** (Physical AI), described in [[Wearables Agent Spec — Nexus Labs Devices]]. A mobile 3-camera rig for capturing Collective AI documentary footage across the Foundry. Global shutter for fast-motion sequences (drone bench, robot arms), wide for environment, and AI camera for scene tagging. Jetson inference runs local shot classification, automatically organizing raw footage into scene folders by division and activity type for post-production.

## Inputs and sensors
- **Documentary Capture Rig**: Pi Global Shutter Camera (fast motion); Pi Camera Module 3 Wide (environment); Pi AI Camera (scene classifier); NVIDIA Jetson Orin Nano Super (inference); Raspberry Pi 5 (controller)

## Outputs and actions
- Auto-sort clips into folders by division, activity type and shot composition
- On Documentary Capture Rig: Nexus Labs captures a 3-hour Foundry build day. The Scene Classification Task Agent auto-sorts 200+ clips into labeled folders by division, activity type, and shot composition. The post editor receives a structured assembly brief with recommended cuts: no manual logging required.

## Permissions
API and MCP access listed for its device(s):
- **Documentary Capture Rig**: APIs: Anthropic claude-haiku-4-5 (scene metadata); ZenFlow /v1/knowledge/write; Cloudinary API (media management); Notion API. MCPs: Cloudinary MCP; Notion MCP; ZenFlow Internal API MCP.

## Aegis clause
The spec states no device-specific Aegis rule for this agent. The document-wide gate applies: all physical motion is Aegis-cleared before execution. See [[Wearables Agent Spec — Aegis Physical Safety Gate]].

## Escalation
No escalation path is stated beyond the device's workflows listed under Dependencies.

## System prompt
The spec gives no system prompt text for this agent.

## Dependencies
- Co-resident agents: [[Creator Nexus Brief Generator]], [[Knowledge Keeper (Device Agent)]]
- n8n workflows: Creator Nexus Brief Auto-Generator; Brand Asset Request Workflow. See [[n8n Workflow Blueprint]].
- MCPs: Cloudinary MCP; Notion MCP; ZenFlow Internal API MCP
- Models as written in the spec: claude-haiku-4-5. Current vault routing is in [[Agent Tier Registry]].
