---
title: ZenFlow Marketplace Listing Auto-Generator
tags:
- device-agent
- physical-ai
- wearables
tier: not stated
type: device-agent
model: claude-sonnet-4-6, claude-opus-4-6
owner: JR Moyler (Hataalii)
device: ZF-W01 AXIS Director Shell
source: Physical AI Wearables Agent Spec
status: spec
updated: 2026-10-04
division: ZenFlow
clearance: Aegis-governed device(s); see Aegis clause
device_count: 1
---
# ZenFlow Marketplace Listing Auto-Generator

Device agent from the [[Physical AI Wearables Agent Spec]]. Divisions: [[ZenFlow Division]].
Related: [[ZenFlow Marketplace]].

## Role
Listed as an agent on the CORTEX Director Shell. The same name is used for an n8n workflow on the Knowledge Keeper Vault Node.

## Device it runs on
**ZF-W01 CORTEX Director Shell** (Physical AI), described in [[Wearables Agent Spec — ZenFlow Devices]]. A dedicated Mac mini node with Pi 5 ambient shell that permanently hosts the AXIS Division Director agent. Monitors the full 30-agent ZenFlow cluster, routes infrastructure requests from all 19 divisions, and enforces Aegis Protocol. The Pi shell provides a physical status display: green/amber/red LED ring maps directly to cluster health state.

## Inputs and sensors
- **CORTEX Director Shell**: Mac mini M4 24GB (ZenFlow node Mac-02); Raspberry Pi 5 + Whisplay HAT; ReSpeaker 2-Mics Pi HAT; Adafruit I2S Speaker Bonnet

## Outputs and actions
- Generate ZenFlow Marketplace listings
- On CORTEX Director Shell: CORTEX Director runs continuously on this node. Every division infrastructure request routes through here. When a new agent is onboarded, the Blueprint Architect and New Agent Onboarding n8n workflow both execute from this station.

## Permissions
API and MCP access listed for its device(s):
- **CORTEX Director Shell**: APIs: ZenFlow Agent API (all tiers); Anthropic claude-sonnet-4-6 + claude-opus-4-6; GitHub API; Anthropic API Console; n8n REST API. MCPs: ZenFlow Internal API MCP; GitHub MCP; n8n MCP; Slack MCP.

## Aegis clause
- **CORTEX Director Shell**: CORTEX Director enforces Aegis Protocol for the cluster.

## Escalation
Alert and review workflows on its devices:
- **CORTEX Director Shell**: ZenFlow API Error Alerting

## System prompt
The spec gives no system prompt text for this agent.

## Dependencies
- Co-resident agents: [[CORTEX Director]], [[Blueprint Architect]], [[Aegis Protocol Guardian]], [[Knowledge Keeper (Device Agent)]]
- n8n workflows: Agent Spawn + Teardown Orchestrator; Prompt Library Version Control; ZenFlow API Error Alerting; Daily Agent Performance Digest; New Agent Onboarding Flow. See [[n8n Workflow Blueprint]].
- MCPs: ZenFlow Internal API MCP; GitHub MCP; n8n MCP; Slack MCP
- Models as written in the spec: claude-sonnet-4-6, claude-opus-4-6. Current vault routing is in [[Agent Tier Registry]].
