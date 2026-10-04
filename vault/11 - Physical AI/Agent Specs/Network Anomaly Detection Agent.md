---
title: Network Anomaly Detection Agent
tags:
- device-agent
- physical-ai
- wearables
- wearable
- edge-terminal
tier: not stated
type: device-agent
model: not stated
owner: JR Moyler (Hataalii)
device: OA-W01 Cipher Guardian Rack, OA-W04 Threat Intel Wearable, OA-W05 SOC Intelligence Terminal
source: Physical AI Wearables Agent Spec
status: spec
updated: 2026-10-04
division: Obsidian Arc
clearance: Aegis-governed device(s); see Aegis clause
device_count: 3
---
# Network Anomaly Detection Agent

Device agent from the [[Physical AI Wearables Agent Spec]]. Divisions: [[Obsidian Arc Division]].

## Role
Runs on the Cipher Guardian Rack and SOC Intelligence Terminal. Cross-references every network event against the ZenFlow agent registry.

## Devices it runs on
| Code | Device | Type | Section | Listed as |
|---|---|---|---|---|
| OA-W01 | Cipher Guardian Rack | Physical AI | [[Wearables Agent Spec — Obsidian Arc Devices]] | Network Anomaly Detection Agent |
| OA-W04 | Threat Intel Wearable | Wearable | [[Wearables Agent Spec — Obsidian Arc Devices]] | Network Anomaly Detection Agent |
| OA-W05 | SOC Intelligence Terminal | Edge Terminal | [[Wearables Agent Spec — Obsidian Arc Devices]] | Network Anomaly Detection Agent |

## Inputs and sensors
- **Cipher Guardian Rack**: UniFi Dream Machine Pro Max; UniFi Enterprise XG 24; UniFi Enterprise 24 PoE; UniFi U7 Pro Max; Raspberry Pi 5 (audit logger + SIEM); Logic analyzer Saleae clone
- **Threat Intel Wearable**: Adafruit Feather nRF52840 Sense; Adafruit DRV2605L Haptic Controller; IMU BNO085 (wearer location context)
- **SOC Intelligence Terminal**: Mac mini M4 24GB (Obsidian Arc node Mac-11); Raspberry Pi 5 + Whisplay HAT (SOC display); Logic analyzer Saleae clone

## Outputs and actions
- Intercept unknown devices and fire aegis_hold
- Route unknown MACs to the VLAN 80 Quarantine
- Post incidents to Sentry + Slack
- Trigger cyber-threat haptic patterns on the Threat Intel Wearable
- On Cipher Guardian Rack: An unknown device attempts to join VLAN 20 (Department Nodes). The Network Anomaly Detection Agent intercepts, fires aegis_hold, routes the MAC to the VLAN 80 Quarantine, and posts an incident to Sentry + Slack, all before a human is aware of the attempt. JR's Zenith Command Band receives a triple haptic pulse.
- On Threat Intel Wearable: An Obsidian Arc security engineer is doing a physical walkthrough. The wristband delivers a distinct cyber-threat pulse pattern: a network anomaly was detected on VLAN 40 (Physical AI / Robotics). They know before checking their phone and can respond immediately.
- On SOC Intelligence Terminal: The SOC Terminal shows a unified view: 8 VLAN health indicators, Aegis queue depth, active physical alerts from Sentinel Tower, and Sentry application errors, all in one display. One button press on the Whisplay acknowledges and routes any event to the appropriate response workflow.

## Permissions
API and MCP access listed for its device(s):
- **Cipher Guardian Rack**: APIs: UniFi Controller API; ZenFlow /v1/aegis (network → Aegis injection); Sentry API (anomaly logging); Slack API; ZenFlow /v1/knowledge/write. MCPs: ZenFlow Internal API MCP; Sentry MCP; Slack MCP; n8n MCP.
- **Threat Intel Wearable**: APIs: ZenFlow /v1/aegis/queue (haptic event dispatch); UniFi Controller API; BLE Gateway API; Slack API. MCPs: ZenFlow Internal API MCP; Sentry MCP; Slack MCP.
- **SOC Intelligence Terminal**: APIs: UniFi Controller API; ZenFlow Agent API; Sentry API; Slack API; OpenTelemetry API (traces + metrics). MCPs: Sentry MCP; Slack MCP; ZenFlow Internal API MCP; n8n MCP.

## Aegis clause
- **Cipher Guardian Rack**: Unknown MAC address triggers aegis_hold, VLAN 80 quarantine, Sentry + Slack alerts and a triple pulse on the Zenith Command Band.
- **Threat Intel Wearable**: Haptic alert pattern for Aegis hold events.
- **SOC Intelligence Terminal**: Dashboard shows Aegis queue depth.

## Escalation
Alert and review workflows on its devices:
- **Cipher Guardian Rack**: Aegis Safety Review Queue; Aegis Protocol Compliance Logger; ZenFlow API Error Alerting
- **Threat Intel Wearable**: Aegis Safety Review Queue; ZenFlow API Error Alerting
- **SOC Intelligence Terminal**: Aegis Safety Review Queue; Aegis Protocol Compliance Logger; ZenFlow API Error Alerting

## System prompt
The spec gives no system prompt text for this agent.

## Dependencies
- Co-resident agents: [[Aegis Protocol Guardian]], [[Physical Security Task Agent]], [[Knowledge Keeper (Device Agent)]], [[SOC Incident Commander Task Agent]]
- n8n workflows: Aegis Safety Review Queue; Aegis Protocol Compliance Logger; JWT Token Rotation Monitor; ZenFlow API Error Alerting. See [[n8n Workflow Blueprint]].
- MCPs: ZenFlow Internal API MCP; Sentry MCP; Slack MCP; n8n MCP
