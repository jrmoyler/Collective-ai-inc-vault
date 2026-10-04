---
title: CORTEX Director
tags:
- device-agent
- physical-ai
- wearables
tier: not stated
type: device-agent
model: claude-sonnet-4-6, claude-opus-4-6
owner: JR Moyler (Hataalii)
device: CAI-W03 Aegis Command Station, ZF-W01 AXIS Director Shell
source: Physical AI Wearables Agent Spec
status: spec
updated: 2026-10-04
division: Collective AI (parent), ZenFlow
clearance: Aegis-governed device(s); see Aegis clause
device_count: 2
---
# CORTEX Director

Device agent from the [[Physical AI Wearables Agent Spec]]. Divisions: [[Collective AI — Company Charter]], [[ZenFlow Division]].
Related: [[Director_ZenFlow]].

## Role
Listed as 'CORTEX Director (ZenFlow)' on the Aegis Command Station and permanently hosted on the CORTEX Director Shell. Monitors the full 30-agent ZenFlow cluster, routes infrastructure requests from all 19 divisions, and enforces Aegis Protocol.

## Devices it runs on
| Code | Device | Type | Section | Listed as |
|---|---|---|---|---|
| CAI-W03 | Aegis Command Station | Physical AI | [[Wearables Agent Spec — Parent Devices]] | CORTEX Director (ZenFlow) |
| ZF-W01 | CORTEX Director Shell | Physical AI | [[Wearables Agent Spec — ZenFlow Devices]] | CORTEX Director |

## Inputs and sensors
- **Aegis Command Station**: Mac mini M4 Pro 64GB (parent command node); Synology DS1825+ 8-bay NAS; UniFi Dream Machine Pro Max; Raspberry Pi 5 + Whisplay HAT (ZenFlow shell); ReSpeaker 4-Mic Array v2.0
- **CORTEX Director Shell**: Mac mini M4 24GB (ZenFlow node Mac-02); Raspberry Pi 5 + Whisplay HAT; ReSpeaker 2-Mics Pi HAT; Adafruit I2S Speaker Bonnet

## Outputs and actions
- Route every division infrastructure request
- Manage agent lifecycle (spawn, teardown, onboarding)
- Drive the green/amber/red LED ring that maps to cluster health
- On Aegis Command Station: JR's primary physical intelligence terminal. Voice-queries ZENITH for division status, receives Aegis queue alerts, monitors 150 n8n workflows, and routes cross-division intelligence requests, all from one desk node.
- On CORTEX Director Shell: CORTEX Director runs continuously on this node. Every division infrastructure request routes through here. When a new agent is onboarded, the Blueprint Architect and New Agent Onboarding n8n workflow both execute from this station.

## Permissions
API and MCP access listed for its device(s):
- **Aegis Command Station**: APIs: ZenFlow Agent API (all endpoints); Anthropic claude-sonnet-4-6 / claude-opus-4-6; n8n REST API; Slack API; Notion API; GitHub API. MCPs: ZenFlow Internal API MCP; Slack MCP; Notion MCP; GitHub MCP; n8n MCP; Google Drive MCP.
- **CORTEX Director Shell**: APIs: ZenFlow Agent API (all tiers); Anthropic claude-sonnet-4-6 + claude-opus-4-6; GitHub API; Anthropic API Console; n8n REST API. MCPs: ZenFlow Internal API MCP; GitHub MCP; n8n MCP; Slack MCP.

## Aegis clause
- **Aegis Command Station**: Runs the Aegis Safety Review Queue; JR receives Aegis queue alerts here.
- **CORTEX Director Shell**: CORTEX Director enforces Aegis Protocol for the cluster.

## Escalation
Alert and review workflows on its devices:
- **Aegis Command Station**: ZenFlow Agent Health Monitor; Aegis Safety Review Queue
- **CORTEX Director Shell**: ZenFlow API Error Alerting

## System prompt
The spec gives no system prompt text for this agent.

## Dependencies
- Co-resident agents: [[ZENITH Overseer]], [[Aegis Protocol Guardian]], [[Knowledge Keeper (Device Agent)]], [[Director_Operations (Device Agent)]], [[Blueprint Architect]], [[ZenFlow Marketplace Listing Auto-Generator]]
- n8n workflows: ZenFlow Agent Health Monitor; Portfolio Revenue Dashboard Sync; Cross-Division Weekly Standup Digest; Aegis Safety Review Queue; JWT Token Rotation Monitor; Cost Tracker; Agent Spawn + Teardown Orchestrator; Prompt Library Version Control; ZenFlow API Error Alerting; Daily Agent Performance Digest; New Agent Onboarding Flow. See [[n8n Workflow Blueprint]].
- MCPs: ZenFlow Internal API MCP; Slack MCP; Notion MCP; GitHub MCP; n8n MCP; Google Drive MCP
- Models as written in the spec: claude-sonnet-4-6, claude-opus-4-6. Current vault routing is in [[Agent Tier Registry]].
