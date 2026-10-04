---
title: Nexus Labs Content Relay Task Agent
tags:
- device-agent
- physical-ai
- wearables
tier: not stated
type: device-agent
model: claude-sonnet-4-6
owner: JR Moyler (Hataalii)
device: HL-W03 Instructor Capture Node
source: Physical AI Wearables Agent Spec
status: spec
updated: 2026-10-04
division: Hybrid Living
clearance: not stated
device_count: 1
---
# Nexus Labs Content Relay Task Agent

Device agent from the [[Physical AI Wearables Agent Spec]]. Divisions: [[Hybrid Living Division]].
Related: [[Creator Track]], [[Nexus Labs Division]].

## Role
Runs on the Instructor Capture Node. Sends session summaries to the Creator Track content pipeline for Nexus Labs cross-promotion.

## Device it runs on
**HL-W03 Instructor Capture Node** (Physical AI), described in [[Wearables Agent Spec — Hybrid Living Devices]]. A dual-camera, far-field audio capture node for recording instructor sessions. A Jetson-powered transcription Task Agent produces a full session transcript, then Claude extracts learning objectives, key concepts, and study questions, all indexed in Knowledge Keeper. The Creator Track content pipeline also receives a summary for Nexus Labs cross-promotion.

## Inputs and sensors
- **Instructor Capture Node**: Raspberry Pi 5 8GB (×2 dual-camera); Pi Camera Module 3 Wide; Pi Global Shutter Camera; ReSpeaker 4-Mic Array v2.0; NVIDIA Jetson Orin Nano Super

## Outputs and actions
- Relay content summaries to Nexus Labs
- On Instructor Capture Node: After a 2-hour session, the Curriculum Synthesis Task Agent has already produced a formatted study guide, extracted 12 learning objectives, and queued a content summary for the Collective Times newsletter, all before the instructor saves their notes.

## Permissions
API and MCP access listed for its device(s):
- **Instructor Capture Node**: APIs: Anthropic claude-sonnet-4-6 (concept extraction); ZenFlow /v1/knowledge/write; Notion API; Airtable API. MCPs: Notion MCP; Airtable MCP; Google Drive MCP; ZenFlow Internal API MCP.

## Aegis clause
The spec states no device-specific Aegis rule for this agent. The document-wide gate applies: all physical motion is Aegis-cleared before execution. See [[Wearables Agent Spec — Aegis Physical Safety Gate]].

## Escalation
No escalation path is stated beyond the device's workflows listed under Dependencies.

## System prompt
The spec gives no system prompt text for this agent.

## Dependencies
- Co-resident agents: [[Transcription Task Agent]], [[Curriculum Synthesis Task Agent]], [[Knowledge Keeper (Device Agent)]]
- n8n workflows: Instructor Session Archive; Creator Track Content Pipeline; Nexus Labs Content Pipeline cross-link. See [[n8n Workflow Blueprint]].
- MCPs: Notion MCP; Airtable MCP; Google Drive MCP; ZenFlow Internal API MCP
- Models as written in the spec: claude-sonnet-4-6. Current vault routing is in [[Agent Tier Registry]].
