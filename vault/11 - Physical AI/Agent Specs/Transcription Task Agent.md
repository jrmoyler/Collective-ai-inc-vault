---
title: Transcription Task Agent
tags:
- device-agent
- physical-ai
- wearables
- wearable
tier: not stated
type: device-agent
model: claude-haiku-4-5, claude-sonnet-4-6
owner: JR Moyler (Hataalii)
device: CAI-W02 Herald Badge Node, HL-W03 Instructor Capture Node, NL-W01 Resonance Studio Node
source: Physical AI Wearables Agent Spec
status: spec
updated: 2026-10-04
division: Collective AI (parent), Hybrid Living, Nexus Labs
clearance: not stated
device_count: 3
---
# Transcription Task Agent

Device agent from the [[Physical AI Wearables Agent Spec]]. Divisions: [[Collective AI — Company Charter]], [[Hybrid Living Division]], [[Nexus Labs Division]].

## Role
Transcribes captured audio. On the Herald Badge Node it is listed as 'Task Agent (transcription)' and uses claude-haiku-4-5. On the Instructor Capture Node it runs Jetson-powered transcription of instructor sessions. On the Resonance Studio Node it transcribes production sessions.

## Devices it runs on
| Code | Device | Type | Section | Listed as |
|---|---|---|---|---|
| CAI-W02 | Herald Badge Node | Wearable | [[Wearables Agent Spec — Parent Devices]] | Task Agent (transcription) |
| HL-W03 | Instructor Capture Node | Physical AI | [[Wearables Agent Spec — Hybrid Living Devices]] | Transcription Task Agent |
| NL-W01 | Resonance Studio Node | Physical AI | [[Wearables Agent Spec — Nexus Labs Devices]] | Transcription Task Agent |

## Inputs and sensors
- **Herald Badge Node**: Seeed XIAO ESP32S3 Sense; Adafruit DRV2605L Haptic Controller; Circuit Playground Bluefruit
- **Instructor Capture Node**: Raspberry Pi 5 8GB (×2 dual-camera); Pi Camera Module 3 Wide; Pi Global Shutter Camera; ReSpeaker 4-Mic Array v2.0; NVIDIA Jetson Orin Nano Super
- **Resonance Studio Node**: NVIDIA Jetson Orin Nano Super; ReSpeaker 4-Mic Array v2.0; Adafruit I2S Speaker Bonnet; Stereo 3W speakers; Raspberry Pi 5 (UI); Whisplay HAT

## Outputs and actions
- Produce session transcripts
- Hand transcripts to Knowledge Keeper, Curriculum Synthesis and Collective Times content agents
- On Herald Badge Node: During any Foundry meeting or workshop, all badges passively log key phrases and action items. At session end, the Knowledge Keeper produces a structured briefing and pushes it to Notion automatically.
- On Instructor Capture Node: After a 2-hour session, the Curriculum Synthesis Task Agent has already produced a formatted study guide, extracted 12 learning objectives, and queued a content summary for the Collective Times newsletter, all before the instructor saves their notes.
- On Resonance Studio Node: JR records a 20-minute strategic session. Resonance Studio Node transcribes it, the Collective Times Content Writer Task Agent produces the newsletter draft, Meta post, and Skool briefing, all within 3 minutes of session end, before JR reviews the recording.

## Permissions
API and MCP access listed for its device(s):
- **Herald Badge Node**: APIs: ZenFlow /v1/knowledge/write; Anthropic claude-haiku-4-5 (transcription); BLE Gateway API. MCPs: ZenFlow Internal API MCP; Notion MCP.
- **Instructor Capture Node**: APIs: Anthropic claude-sonnet-4-6 (concept extraction); ZenFlow /v1/knowledge/write; Notion API; Airtable API. MCPs: Notion MCP; Airtable MCP; Google Drive MCP; ZenFlow Internal API MCP.
- **Resonance Studio Node**: APIs: Anthropic claude-sonnet-4-6 (content generation); ZenFlow /v1/knowledge/write; Notion API; Slack API; Meta Graph API (post queue). MCPs: Notion MCP; Slack MCP; Google Drive MCP; ZenFlow Internal API MCP.

## Aegis clause
The spec states no device-specific Aegis rule for this agent. The document-wide gate applies: all physical motion is Aegis-cleared before execution. See [[Wearables Agent Spec — Aegis Physical Safety Gate]].

## Escalation
Alert and review workflows on its devices:
- **Herald Badge Node**: Aegis Protocol Compliance Logger

## System prompt
The spec gives no system prompt text for this agent.

## Dependencies
- Co-resident agents: [[Knowledge Keeper (Device Agent)]], [[Blueprint Architect]], [[Curriculum Synthesis Task Agent]], [[Nexus Labs Content Relay Task Agent]], [[Collective Times Content Writer Task Agent]], [[Distribution Agent]]
- n8n workflows: Cross-Division Weekly Standup Digest; Aegis Protocol Compliance Logger; Instructor Session Archive; Creator Track Content Pipeline; Nexus Labs Content Pipeline cross-link; Collective Times Content Pipeline; Skool Community Engagement Monitor; Brand Asset Request Workflow. See [[n8n Workflow Blueprint]].
- MCPs: ZenFlow Internal API MCP; Notion MCP; Airtable MCP; Google Drive MCP; Slack MCP
- Models as written in the spec: claude-haiku-4-5, claude-sonnet-4-6. Current vault routing is in [[Agent Tier Registry]].
