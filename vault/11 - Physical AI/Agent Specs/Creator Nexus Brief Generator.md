---
title: Creator Nexus Brief Generator
tags:
- device-agent
- physical-ai
- wearables
tier: not stated
type: device-agent
model: claude-haiku-4-5
owner: JR Moyler (Hataalii)
device: NL-W02 Vision Director Node, NL-W05 Documentary Capture Rig
source: Physical AI Wearables Agent Spec
status: spec
updated: 2026-10-04
division: Nexus Labs
clearance: not stated
device_count: 2
---
# Creator Nexus Brief Generator

Device agent from the [[Physical AI Wearables Agent Spec]]. Divisions: [[Nexus Labs Division]].
Related: [[Creator Nexus]].

## Role
Turns tagged footage into structured content briefs for the Creator Nexus platform.

## Devices it runs on
| Code | Device | Type | Section | Listed as |
|---|---|---|---|---|
| NL-W02 | Vision Director Node | Physical AI | [[Wearables Agent Spec — Nexus Labs Devices]] | Creator Nexus Brief Generator |
| NL-W05 | Documentary Capture Rig | Physical AI | [[Wearables Agent Spec — Nexus Labs Devices]] | Creator Nexus Brief Generator |

## Inputs and sensors
- **Vision Director Node**: Raspberry Pi 5 8GB (×2); Pi Camera Module 3 Wide (×2); Arducam 64MP Hawkeye (hero close-up); Pi AI Camera (Sony IMX500 scene tagging); NVIDIA Jetson Orin Nano Super
- **Documentary Capture Rig**: Pi Global Shutter Camera (fast motion); Pi Camera Module 3 Wide (environment); Pi AI Camera (scene classifier); NVIDIA Jetson Orin Nano Super (inference); Raspberry Pi 5 (controller)

## Outputs and actions
- Produce repurposing plans (clips → Reels, long-form → YouTube, key quotes → social)
- Produce assembly briefs with recommended cuts
- On Vision Director Node: A 60-minute content session produces 4 camera angles, all AI-tagged by scene type. The Creator Nexus Brief Generator produces a structured repurposing plan (clips → Reels, long-form → YouTube, key quotes → social) before the editor reviews a single frame.
- On Documentary Capture Rig: Nexus Labs captures a 3-hour Foundry build day. The Scene Classification Task Agent auto-sorts 200+ clips into labeled folders by division, activity type, and shot composition. The post editor receives a structured assembly brief with recommended cuts: no manual logging required.

## Permissions
API and MCP access listed for its device(s):
- **Vision Director Node**: APIs: Anthropic claude-haiku-4-5 (clip metadata); ZenFlow /v1/knowledge/write; Notion API; HeyGen API (optional avatar layer). MCPs: Notion MCP; Google Drive MCP; ZenFlow Internal API MCP; Cloudinary MCP.
- **Documentary Capture Rig**: APIs: Anthropic claude-haiku-4-5 (scene metadata); ZenFlow /v1/knowledge/write; Cloudinary API (media management); Notion API. MCPs: Cloudinary MCP; Notion MCP; ZenFlow Internal API MCP.

## Aegis clause
The spec states no device-specific Aegis rule for this agent. The document-wide gate applies: all physical motion is Aegis-cleared before execution. See [[Wearables Agent Spec — Aegis Physical Safety Gate]].

## Escalation
No escalation path is stated beyond the device's workflows listed under Dependencies.

## System prompt
The spec gives no system prompt text for this agent.

## Dependencies
- Co-resident agents: [[Vision Tagging Task Agent]], [[Knowledge Keeper (Device Agent)]], [[Distribution Agent]], [[Scene Classification Task Agent]]
- n8n workflows: Collective Times Content Pipeline; Creator Nexus Brief Auto-Generator; Brand Asset Request Workflow. See [[n8n Workflow Blueprint]].
- MCPs: Notion MCP; Google Drive MCP; ZenFlow Internal API MCP; Cloudinary MCP
- Models as written in the spec: claude-haiku-4-5. Current vault routing is in [[Agent Tier Registry]].
