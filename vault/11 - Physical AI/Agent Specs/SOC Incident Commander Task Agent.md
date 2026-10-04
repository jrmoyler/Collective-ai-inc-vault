---
title: SOC Incident Commander Task Agent
tags:
- device-agent
- physical-ai
- wearables
- edge-terminal
tier: not stated
type: device-agent
model: not stated
owner: JR Moyler (Hataalii)
device: OA-W05 SOC Intelligence Terminal
source: Physical AI Wearables Agent Spec
status: spec
updated: 2026-10-04
division: Obsidian Arc
clearance: Aegis-governed device(s); see Aegis clause
device_count: 1
---
# SOC Incident Commander Task Agent

Device agent from the [[Physical AI Wearables Agent Spec]]. Divisions: [[Obsidian Arc Division]].

## Role
Runs on the SOC Intelligence Terminal's unified dashboard (8 VLAN health indicators, Aegis queue depth, Sentinel Tower alerts, Sentry errors).

## Device it runs on
**OA-W05 SOC Intelligence Terminal** (Edge Terminal), described in [[Wearables Agent Spec — Obsidian Arc Devices]]. Obsidian Arc's Security Operations Center terminal. A Mac mini node with Pi 5 ambient display running the Network Anomaly Detection Agent, DeFi Risk Monitor cross-feed, and physical threat event log in a unified SOC dashboard. All 8 VLAN streams are monitored in real time. Sentry MCP surfaces application-level anomalies alongside network events in one operational picture.

## Inputs and sensors
- **SOC Intelligence Terminal**: Mac mini M4 24GB (Obsidian Arc node Mac-11); Raspberry Pi 5 + Whisplay HAT (SOC display); Logic analyzer Saleae clone

## Outputs and actions
- Route acknowledged events to the right response workflow on one button press
- On SOC Intelligence Terminal: The SOC Terminal shows a unified view: 8 VLAN health indicators, Aegis queue depth, active physical alerts from Sentinel Tower, and Sentry application errors, all in one display. One button press on the Whisplay acknowledges and routes any event to the appropriate response workflow.

## Permissions
API and MCP access listed for its device(s):
- **SOC Intelligence Terminal**: APIs: UniFi Controller API; ZenFlow Agent API; Sentry API; Slack API; OpenTelemetry API (traces + metrics). MCPs: Sentry MCP; Slack MCP; ZenFlow Internal API MCP; n8n MCP.

## Aegis clause
- **SOC Intelligence Terminal**: Dashboard shows Aegis queue depth.

## Escalation
Alert and review workflows on its devices:
- **SOC Intelligence Terminal**: Aegis Safety Review Queue; Aegis Protocol Compliance Logger; ZenFlow API Error Alerting

## System prompt
The spec gives no system prompt text for this agent.

## Dependencies
- Co-resident agents: [[Network Anomaly Detection Agent]], [[Aegis Protocol Guardian]], [[Physical Security Task Agent]]
- n8n workflows: Aegis Safety Review Queue; Aegis Protocol Compliance Logger; ZenFlow API Error Alerting; JWT Token Rotation Monitor. See [[n8n Workflow Blueprint]].
- MCPs: Sentry MCP; Slack MCP; ZenFlow Internal API MCP; n8n MCP
