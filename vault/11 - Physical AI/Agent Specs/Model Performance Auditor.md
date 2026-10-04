---
title: Model Performance Auditor
tags:
- device-agent
- physical-ai
- wearables
- edge-terminal
tier: not stated
type: device-agent
model: claude-sonnet-4-6
owner: JR Moyler (Hataalii)
device: ZF-W04 Agent Eval Bench
source: Physical AI Wearables Agent Spec
status: spec
updated: 2026-10-04
division: ZenFlow
clearance: Aegis-governed device(s); see Aegis clause
device_count: 1
---
# Model Performance Auditor

Device agent from the [[Physical AI Wearables Agent Spec]]. Divisions: [[ZenFlow Division]].

## Role
Runs continuously on the Agent Eval Bench. Samples 10% of all agent outputs against the 5-dimension scoring rubric: accuracy, coherence, relevance, safety, efficiency.

## Device it runs on
**ZF-W04 Agent Eval Bench** (Edge Terminal), described in [[Wearables Agent Spec — ZenFlow Devices]]. An isolated Jetson + Mac mini pair for agent evaluation and model testing. The Model Performance Auditor agent runs continuously here, sampling 10% of all agent outputs against the 5-dimension scoring rubric (accuracy, coherence, relevance, safety, efficiency). Operates in VLAN 80 Quarantine: no trusted network access until eval signs off.

## Inputs and sensors
- **Agent Eval Bench**: Mac mini M4 24GB (Mac-30 Model Sandbox); NVIDIA Jetson Orin Nano Super (eval runner); Raspberry Pi 5 (test driver); Logic analyzer Saleae clone

## Outputs and actions
- Score sampled outputs on the 5-dimension rubric
- Gate agents before production
- On Agent Eval Bench: Before any new agent goes to production, it runs a full eval suite here. The Model Performance Auditor scores outputs, the MCP Integration Test pipeline validates tool connections, and Aegis Protocol Guardian signs off. Fail = blocked from VLAN 20.

## Permissions
API and MCP access listed for its device(s):
- **Agent Eval Bench**: APIs: ZenFlow Agent API (staging); Anthropic claude-sonnet-4-6; GitHub API; n8n staging API. MCPs: ZenFlow Internal API MCP (staging); GitHub MCP; Sentry MCP.

## Aegis clause
- **Agent Eval Bench**: Aegis Protocol Guardian signs off after eval. Fail = blocked from VLAN 20. Bench sits in VLAN 80 Quarantine.

## Escalation
No escalation path is stated beyond the device's workflows listed under Dependencies.

## System prompt
The spec gives no system prompt text for this agent.

## Dependencies
- Co-resident agents: [[Agent Spawner]], [[Aegis Protocol Guardian]], [[MCP Tool Integration Test Agent]]
- n8n workflows: MCP Tool Integration Test Pipeline; New Agent Onboarding Flow; Prompt Library Version Control. See [[n8n Workflow Blueprint]].
- MCPs: ZenFlow Internal API MCP (staging); GitHub MCP; Sentry MCP
- Models as written in the spec: claude-sonnet-4-6. Current vault routing is in [[Agent Tier Registry]].
