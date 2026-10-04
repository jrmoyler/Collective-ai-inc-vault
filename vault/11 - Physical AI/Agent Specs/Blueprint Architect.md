---
title: Blueprint Architect
tags:
- device-agent
- physical-ai
- wearables
- wearable
tier: not stated
type: device-agent
model: claude-haiku-4-5, claude-sonnet-4-6, claude-opus-4-6
owner: JR Moyler (Hataalii)
device: CAI-W02 Herald Badge Node, ZF-W01 AXIS Director Shell
source: Physical AI Wearables Agent Spec
status: spec
updated: 2026-10-04
division: Collective AI (parent), ZenFlow
clearance: Aegis-governed device(s); see Aegis clause
device_count: 2
---
# Blueprint Architect

Device agent from the [[Physical AI Wearables Agent Spec]]. Divisions: [[Collective AI — Company Charter]], [[ZenFlow Division]].

## Role
Configures devices and new agents. Handles badge configuration on the Herald Badge Node. On the CORTEX Director Shell it runs with the New Agent Onboarding n8n workflow when a new agent is onboarded.

## Devices it runs on
| Code | Device | Type | Section | Listed as |
|---|---|---|---|---|
| CAI-W02 | Herald Badge Node | Wearable | [[Wearables Agent Spec — Parent Devices]] | Blueprint Architect (badge config) |
| ZF-W01 | CORTEX Director Shell | Physical AI | [[Wearables Agent Spec — ZenFlow Devices]] | Blueprint Architect |

## Inputs and sensors
- **Herald Badge Node**: Seeed XIAO ESP32S3 Sense; Adafruit DRV2605L Haptic Controller; Circuit Playground Bluefruit
- **CORTEX Director Shell**: Mac mini M4 24GB (ZenFlow node Mac-02); Raspberry Pi 5 + Whisplay HAT; ReSpeaker 2-Mics Pi HAT; Adafruit I2S Speaker Bonnet

## Outputs and actions
- Configure Herald badges
- Execute new agent onboarding with the New Agent Onboarding Flow
- On Herald Badge Node: During any Foundry meeting or workshop, all badges passively log key phrases and action items. At session end, the Knowledge Keeper produces a structured briefing and pushes it to Notion automatically.
- On CORTEX Director Shell: CORTEX Director runs continuously on this node. Every division infrastructure request routes through here. When a new agent is onboarded, the Blueprint Architect and New Agent Onboarding n8n workflow both execute from this station.

## Permissions
API and MCP access listed for its device(s):
- **Herald Badge Node**: APIs: ZenFlow /v1/knowledge/write; Anthropic claude-haiku-4-5 (transcription); BLE Gateway API. MCPs: ZenFlow Internal API MCP; Notion MCP.
- **CORTEX Director Shell**: APIs: ZenFlow Agent API (all tiers); Anthropic claude-sonnet-4-6 + claude-opus-4-6; GitHub API; Anthropic API Console; n8n REST API. MCPs: ZenFlow Internal API MCP; GitHub MCP; n8n MCP; Slack MCP.

## Aegis clause
- **CORTEX Director Shell**: CORTEX Director enforces Aegis Protocol for the cluster.

## Escalation
Alert and review workflows on its devices:
- **Herald Badge Node**: Aegis Protocol Compliance Logger
- **CORTEX Director Shell**: ZenFlow API Error Alerting

## System prompt
The spec gives no system prompt text for this agent.

## Dependencies
- Co-resident agents: [[Knowledge Keeper (Device Agent)]], [[Transcription Task Agent]], [[CORTEX Director]], [[Aegis Protocol Guardian]], [[ZenFlow Marketplace Listing Auto-Generator]]
- n8n workflows: Cross-Division Weekly Standup Digest; Aegis Protocol Compliance Logger; Agent Spawn + Teardown Orchestrator; Prompt Library Version Control; ZenFlow API Error Alerting; Daily Agent Performance Digest; New Agent Onboarding Flow. See [[n8n Workflow Blueprint]].
- MCPs: ZenFlow Internal API MCP; Notion MCP; GitHub MCP; n8n MCP; Slack MCP
- Models as written in the spec: claude-haiku-4-5, claude-sonnet-4-6, claude-opus-4-6. Current vault routing is in [[Agent Tier Registry]].
