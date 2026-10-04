---
title: Vision Tagging Task Agent
tags:
- device-agent
- physical-ai
- wearables
tier: not stated
type: device-agent
model: claude-haiku-4-5
owner: JR Moyler (Hataalii)
device: NL-W02 Vision Director Node
source: Physical AI Wearables Agent Spec
status: spec
updated: 2026-10-04
division: Nexus Labs
clearance: not stated
device_count: 1
---
# Vision Tagging Task Agent

Device agent from the [[Physical AI Wearables Agent Spec]]. Divisions: [[Nexus Labs Division]].

## Role
Runs on the Vision Director Node. Works with on-sensor scene tagging and Jetson object/person detection to classify clips.

## Device it runs on
**NL-W02 Vision Director Node** (Physical AI), described in [[Wearables Agent Spec — Nexus Labs Devices]]. A 4-camera production node for content sessions. AI camera handles on-sensor scene tagging, Jetson runs object/person detection and clip classification, and all footage is indexed with searchable metadata in the Knowledge Keeper. The Creator Nexus platform receives a structured content brief automatically after each session.

## Inputs and sensors
- **Vision Director Node**: Raspberry Pi 5 8GB (×2); Pi Camera Module 3 Wide (×2); Arducam 64MP Hawkeye (hero close-up); Pi AI Camera (Sony IMX500 scene tagging); NVIDIA Jetson Orin Nano Super

## Outputs and actions
- Tag clips by scene type
- Index footage metadata in Knowledge Keeper
- On Vision Director Node: A 60-minute content session produces 4 camera angles, all AI-tagged by scene type. The Creator Nexus Brief Generator produces a structured repurposing plan (clips → Reels, long-form → YouTube, key quotes → social) before the editor reviews a single frame.

## Permissions
API and MCP access listed for its device(s):
- **Vision Director Node**: APIs: Anthropic claude-haiku-4-5 (clip metadata); ZenFlow /v1/knowledge/write; Notion API; HeyGen API (optional avatar layer). MCPs: Notion MCP; Google Drive MCP; ZenFlow Internal API MCP; Cloudinary MCP.

## Aegis clause
The spec states no device-specific Aegis rule for this agent. The document-wide gate applies: all physical motion is Aegis-cleared before execution. See [[Wearables Agent Spec — Aegis Physical Safety Gate]].

## Escalation
No escalation path is stated beyond the device's workflows listed under Dependencies.

## System prompt
The spec gives no system prompt text for this agent.

## Dependencies
- Co-resident agents: [[Creator Nexus Brief Generator]], [[Knowledge Keeper (Device Agent)]], [[Distribution Agent]]
- n8n workflows: Collective Times Content Pipeline; Creator Nexus Brief Auto-Generator; Brand Asset Request Workflow. See [[n8n Workflow Blueprint]].
- MCPs: Notion MCP; Google Drive MCP; ZenFlow Internal API MCP; Cloudinary MCP
- Models as written in the spec: claude-haiku-4-5. Current vault routing is in [[Agent Tier Registry]].
