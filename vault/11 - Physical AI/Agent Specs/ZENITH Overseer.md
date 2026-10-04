---
title: ZENITH Overseer
tags:
- device-agent
- physical-ai
- wearables
- wearable
tier: '1'
type: device-agent
model: claude-sonnet-4-6, claude-opus-4-6
owner: JR Moyler (Hataalii)
device: CAI-W01 Zenith Command Band, CAI-W03 Aegis Command Station, CAI-W06 Zenith Oracle Voice Shell
source: Physical AI Wearables Agent Spec
status: spec
updated: 2026-10-04
division: Collective AI (parent)
clearance: Aegis-governed device(s); see Aegis clause
device_count: 3
---
# ZENITH Overseer

Device agent from the [[Physical AI Wearables Agent Spec]]. Divisions: [[Collective AI — Company Charter]].
Related: [[ZENITH]], [[Agent Tier Registry]].

## Role
Primary cross-portfolio intelligence layer. Runs on the Aegis Command Station, takes JR's voice queries through the Zenith Oracle Voice Shell, and drives the status pulses on the Zenith Command Band. Routes requests to division agents (for example, a voice-planned waypoint mission goes to the Sky Vector Flight Agent; delivery instructions go to the Ground Vector Navigation Agent).

## Devices it runs on
| Code | Device | Type | Section | Listed as |
|---|---|---|---|---|
| CAI-W01 | Zenith Command Band | Wearable | [[Wearables Agent Spec — Parent Devices]] | ZENITH Overseer (Tier 1) |
| CAI-W03 | Aegis Command Station | Physical AI | [[Wearables Agent Spec — Parent Devices]] | ZENITH Overseer |
| CAI-W06 | Zenith Oracle Voice Shell | Physical AI | [[Wearables Agent Spec — Parent Devices]] | ZENITH Overseer |

## Inputs and sensors
- **Zenith Command Band**: Adafruit Feather nRF52840 Sense; Adafruit DRV2605L Haptic Controller; IMU ICM-20948
- **Aegis Command Station**: Mac mini M4 Pro 64GB (parent command node); Synology DS1825+ 8-bay NAS; UniFi Dream Machine Pro Max; Raspberry Pi 5 + Whisplay HAT (ZenFlow shell); ReSpeaker 4-Mic Array v2.0
- **Zenith Oracle Voice Shell**: Raspberry Pi 5 8GB; Whisplay HAT; ReSpeaker 4-Mic Array v2.0; Adafruit I2S Speaker Bonnet; Pi Camera Module 3

## Outputs and actions
- Answer voice queries on division status
- Read Aegis queue items aloud and surface Knowledge Keeper logs on the Whisplay
- Fire n8n workflows by voice through webhook triggers (e.g. 'run standup digest')
- Route cross-division intelligence requests and agent tasks
- On Zenith Command Band: JR receives a haptic pulse pattern and knows instantly, without looking at a screen, whether a division agent is blocked, an Aegis flag is queued, or the cluster is healthy. Operates 24/7 with 72-hour battery life.
- On Aegis Command Station: JR's primary physical intelligence terminal. Voice-queries ZENITH for division status, receives Aegis queue alerts, monitors 150 n8n workflows, and routes cross-division intelligence requests, all from one desk node.
- On Zenith Oracle Voice Shell: JR carries this to any room in the Foundry and has full ZENITH Overseer access: voice-triggered n8n workflows, live Knowledge Keeper recall, Aegis queue review, and cross-division agent routing without touching a laptop.

## Permissions
API and MCP access listed for its device(s):
- **Zenith Command Band**: APIs: ZenFlow Agent API /v1/aegis/queue; ZenFlow /v1/agents/health; Anthropic claude-sonnet-4-6; Slack alert webhook. MCPs: ZenFlow Internal API MCP; Slack MCP; n8n MCP.
- **Aegis Command Station**: APIs: ZenFlow Agent API (all endpoints); Anthropic claude-sonnet-4-6 / claude-opus-4-6; n8n REST API; Slack API; Notion API; GitHub API. MCPs: ZenFlow Internal API MCP; Slack MCP; Notion MCP; GitHub MCP; n8n MCP; Google Drive MCP.
- **Zenith Oracle Voice Shell**: APIs: ZenFlow Agent API (all); Anthropic claude-sonnet-4-6; n8n webhook API; Slack API; Notion API. MCPs: ZenFlow Internal API MCP; n8n MCP; Notion MCP; Slack MCP.

## Aegis clause
- **Zenith Command Band**: Haptic codes map to Aegis states: green pulse aegis_clear, amber double-tap aegis_review, red triple aegis_hold.
- **Aegis Command Station**: Runs the Aegis Safety Review Queue; JR receives Aegis queue alerts here.
- **Zenith Oracle Voice Shell**: Reads Aegis queue items aloud for review.

## Escalation
Alert and review workflows on its devices:
- **Zenith Command Band**: ZenFlow Agent Health Monitor; Aegis Incident Reporter
- **Aegis Command Station**: ZenFlow Agent Health Monitor; Aegis Safety Review Queue
- **Zenith Oracle Voice Shell**: ZenFlow Agent Health Monitor

## System prompt
The spec gives no system prompt text for this agent.

## Dependencies
- Co-resident agents: [[Aegis Protocol Guardian]], [[Knowledge Keeper (Device Agent)]], [[Agent Health Monitor]], [[CORTEX Director]], [[Director_Operations (Device Agent)]]
- n8n workflows: ZenFlow Agent Health Monitor; Aegis Incident Reporter; Daily Agent Performance Digest; Portfolio Revenue Dashboard Sync; Cross-Division Weekly Standup Digest; Aegis Safety Review Queue; JWT Token Rotation Monitor; Cost Tracker; All 150 n8n workflows via voice-triggered webhook; Knowledge Keeper Digest. See [[n8n Workflow Blueprint]].
- MCPs: ZenFlow Internal API MCP; Slack MCP; n8n MCP; Notion MCP; GitHub MCP; Google Drive MCP
- Models as written in the spec: claude-sonnet-4-6, claude-opus-4-6. Current vault routing is in [[Agent Tier Registry]].
