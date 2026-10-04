---
title: Voice Observation Task Agent
tags:
- device-agent
- physical-ai
- wearables
- field-kit
tier: not stated
type: device-agent
model: claude-haiku-4-5
owner: JR Moyler (Hataalii)
device: KE-W03 Team OS Field Station
source: Physical AI Wearables Agent Spec
status: spec
updated: 2026-10-04
division: Kinetic Edge
clearance: not stated
device_count: 1
---
# Voice Observation Task Agent

Device agent from the [[Physical AI Wearables Agent Spec]]. Divisions: [[Kinetic Edge Division]].

## Role
Turns sideline coaching voice notes into structured session observations.

## Device it runs on
**KE-W03 Team OS Field Station** (Field Kit), described in [[Wearables Agent Spec — Kinetic Edge Devices]]. A portable sideline station that gives coaches real-time Apex System data during practice. Whisplay shows live athlete performance metrics. Far-field mic captures coaching voice notes, which are processed by a Task Agent into structured session observations. Mesh-connected via T-Beam for sync with the TeamOS Mac mini when field Wi-Fi is unavailable.

## Inputs and sensors
- **Team OS Field Station**: Raspberry Pi 5 8GB; Whisplay HAT; ReSpeaker 4-Mic Array v2.0; Pi Camera Module 3 Wide; LILYGO T-Beam Meshtastic

## Outputs and actions
- Log structured notes
- Tag them to athlete profiles in Airtable
- Flag notes for the next weekly performance report
- On Team OS Field Station: Sideline coach says 'Marcus showed excellent lateral acceleration in set 3 but lost composure under defensive pressure'. The Voice Observation Task Agent logs a structured note, tags it to Marcus's profile in Airtable, and flags it for inclusion in next week's performance report.

## Permissions
API and MCP access listed for its device(s):
- **Team OS Field Station**: APIs: ZenFlow /v1/knowledge/write; Anthropic claude-haiku-4-5 (observation processing); Airtable API; Meshtastic Python API. MCPs: Airtable MCP; ZenFlow Internal API MCP; n8n MCP.

## Aegis clause
The spec states no device-specific Aegis rule for this agent. The document-wide gate applies: all physical motion is Aegis-cleared before execution. See [[Wearables Agent Spec — Aegis Physical Safety Gate]].

## Escalation
No escalation path is stated beyond the device's workflows listed under Dependencies.

## System prompt
The spec gives no system prompt text for this agent.

## Dependencies
- Co-resident agents: [[TeamOS Coaching Agent]], [[Knowledge Keeper (Device Agent)]], [[Apex System Performance Agent]]
- n8n workflows: Weekly Performance Report Generator; Partnership Sponsorship Tracker; Scout Intelligence Aggregator. See [[n8n Workflow Blueprint]].
- MCPs: Airtable MCP; ZenFlow Internal API MCP; n8n MCP
- Models as written in the spec: claude-haiku-4-5. Current vault routing is in [[Agent Tier Registry]].
