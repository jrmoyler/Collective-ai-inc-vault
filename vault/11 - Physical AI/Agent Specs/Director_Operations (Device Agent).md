---
title: Director_Operations (Device Agent)
tags:
- device-agent
- physical-ai
- wearables
- mesh-node
tier: not stated
type: device-agent
model: claude-sonnet-4-6, claude-opus-4-6
owner: JR Moyler (Hataalii)
device: CAI-W03 Aegis Command Station, CAI-W04 Mesh Sentinel Array, CAI-W06 Zenith Oracle Voice Shell, ZF-W05 ZenFlow Meshtastic Gateway
source: Physical AI Wearables Agent Spec
status: spec
updated: 2026-10-04
division: Collective AI (parent), ZenFlow
clearance: Aegis-governed device(s); see Aegis clause
device_count: 4
---
# Director_Operations (Device Agent)

Device agent from the [[Physical AI Wearables Agent Spec]]. Divisions: [[Collective AI — Company Charter]], [[ZenFlow Division]].
The spec names this agent **Director_Operations**. The vault already has a note by that name, so this note carries the device suffix.
Related: [[Director_Operations]].

## Role
Operations director listed on the parent command devices and the mesh gateways. Sits alongside ZENITH on the Aegis Command Station and Zenith Oracle Voice Shell, and alongside the Agent Health Monitor on the mesh devices.

## Devices it runs on
| Code | Device | Type | Section | Listed as |
|---|---|---|---|---|
| CAI-W03 | Aegis Command Station | Physical AI | [[Wearables Agent Spec — Parent Devices]] | Director_Operations |
| CAI-W04 | Mesh Sentinel Array | Mesh Node | [[Wearables Agent Spec — Parent Devices]] | Director_Operations |
| CAI-W06 | Zenith Oracle Voice Shell | Physical AI | [[Wearables Agent Spec — Parent Devices]] | Director_Operations |
| ZF-W05 | ZenFlow Meshtastic Gateway | Mesh Node | [[Wearables Agent Spec — ZenFlow Devices]] | Director_Operations |

## Inputs and sensors
- **Aegis Command Station**: Mac mini M4 Pro 64GB (parent command node); Synology DS1825+ 8-bay NAS; UniFi Dream Machine Pro Max; Raspberry Pi 5 + Whisplay HAT (ZenFlow shell); ReSpeaker 4-Mic Array v2.0
- **Mesh Sentinel Array**: LILYGO T-Beam Meshtastic (×4); Heltec V3 Meshtastic nodes (×6); LILYGO T-Deck (field terminal); Raspberry Pi 5 (MQTT bridge gateway)
- **Zenith Oracle Voice Shell**: Raspberry Pi 5 8GB; Whisplay HAT; ReSpeaker 4-Mic Array v2.0; Adafruit I2S Speaker Bonnet; Pi Camera Module 3
- **ZenFlow Meshtastic Gateway**: Raspberry Pi 5 8GB (MQTT bridge); LILYGO T-Beam Meshtastic (master node); Heltec V3 relay nodes (×2 ZenFlow zone)

## Outputs and actions
- Take part in cross-division routing from the command station and voice shell
- Receive device heartbeat and mesh health events

## Permissions
API and MCP access listed for its device(s):
- **Aegis Command Station**: APIs: ZenFlow Agent API (all endpoints); Anthropic claude-sonnet-4-6 / claude-opus-4-6; n8n REST API; Slack API; Notion API; GitHub API. MCPs: ZenFlow Internal API MCP; Slack MCP; Notion MCP; GitHub MCP; n8n MCP; Google Drive MCP.
- **Mesh Sentinel Array**: APIs: ZenFlow /v1/agents/health (device registration); MQTT broker API; n8n webhook triggers; Meshtastic Python API. MCPs: ZenFlow Internal API MCP; n8n MCP.
- **Zenith Oracle Voice Shell**: APIs: ZenFlow Agent API (all); Anthropic claude-sonnet-4-6; n8n webhook API; Slack API; Notion API. MCPs: ZenFlow Internal API MCP; n8n MCP; Notion MCP; Slack MCP.
- **ZenFlow Meshtastic Gateway**: APIs: ZenFlow /v1/agents (device registration); Meshtastic Python API; MQTT broker; n8n webhook API. MCPs: ZenFlow Internal API MCP; n8n MCP.

## Aegis clause
- **Aegis Command Station**: Runs the Aegis Safety Review Queue; JR receives Aegis queue alerts here.
- **Zenith Oracle Voice Shell**: Reads Aegis queue items aloud for review.

## Escalation
Alert and review workflows on its devices:
- **Aegis Command Station**: ZenFlow Agent Health Monitor; Aegis Safety Review Queue
- **Mesh Sentinel Array**: ZenFlow Agent Health Monitor; Aegis Protocol Compliance Logger
- **Zenith Oracle Voice Shell**: ZenFlow Agent Health Monitor
- **ZenFlow Meshtastic Gateway**: ZenFlow Agent Health Monitor (physical devices)

## System prompt
The spec gives no system prompt text for this agent.

## Dependencies
- Co-resident agents: [[ZENITH Overseer]], [[CORTEX Director]], [[Aegis Protocol Guardian]], [[Knowledge Keeper (Device Agent)]], [[Agent Health Monitor]], [[Device Registry Task Agent]]
- n8n workflows: ZenFlow Agent Health Monitor; Portfolio Revenue Dashboard Sync; Cross-Division Weekly Standup Digest; Aegis Safety Review Queue; JWT Token Rotation Monitor; Cost Tracker; Aegis Protocol Compliance Logger; All 150 n8n workflows via voice-triggered webhook; Daily Agent Performance Digest; Knowledge Keeper Digest; ZenFlow Agent Health Monitor (physical devices); Cross-Division Intelligence Request Router. See [[n8n Workflow Blueprint]].
- MCPs: ZenFlow Internal API MCP; Slack MCP; Notion MCP; GitHub MCP; n8n MCP; Google Drive MCP
- Models as written in the spec: claude-sonnet-4-6, claude-opus-4-6. Current vault routing is in [[Agent Tier Registry]].
