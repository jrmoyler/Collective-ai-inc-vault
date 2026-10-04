---
title: Physical Security Task Agent
tags:
- device-agent
- physical-ai
- wearables
- wearable
- edge-terminal
tier: not stated
type: device-agent
model: claude-haiku-4-5
owner: JR Moyler (Hataalii)
device: CAI-W05 Atlas Perception Tower, OA-W01 Cipher Guardian Rack, OA-W02 Sentinel Prime Tower, OA-W04 Threat Intel Wearable, OA-W05 SOC Intelligence Terminal
source: Physical AI Wearables Agent Spec
status: spec
updated: 2026-10-04
division: Collective AI (parent), Obsidian Arc
clearance: Aegis-governed device(s); see Aegis clause
device_count: 5
---
# Physical Security Task Agent

Device agent from the [[Physical AI Wearables Agent Spec]]. Divisions: [[Collective AI — Company Charter]], [[Obsidian Arc Division]].

## Role
Runs on the Jetson of the perception masts and supports the network rack, SOC terminal and Threat Intel wristband. Classifies detected objects and people as aegis_clear or aegis_review events and routes physical security flags through the Aegis Protocol queue.

## Devices it runs on
| Code | Device | Type | Section | Listed as |
|---|---|---|---|---|
| CAI-W05 | Atlas Perception Tower | Physical AI | [[Wearables Agent Spec — Parent Devices]] | Physical Security Task Agent |
| OA-W01 | Cipher Guardian Rack | Physical AI | [[Wearables Agent Spec — Obsidian Arc Devices]] | Physical Security Task Agent |
| OA-W02 | Sentinel Prime Tower | Physical AI | [[Wearables Agent Spec — Obsidian Arc Devices]] | Physical Security Task Agent |
| OA-W04 | Threat Intel Wearable | Wearable | [[Wearables Agent Spec — Obsidian Arc Devices]] | Physical Security Task Agent |
| OA-W05 | SOC Intelligence Terminal | Edge Terminal | [[Wearables Agent Spec — Obsidian Arc Devices]] | Physical Security Task Agent |

## Inputs and sensors
- **Atlas Perception Tower**: NVIDIA Jetson Orin Nano Super; RPLIDAR A1M8; Luxonis OAK-D Lite; Raspberry Pi AI Camera (Sony IMX500); RealSense D435i
- **Cipher Guardian Rack**: UniFi Dream Machine Pro Max; UniFi Enterprise XG 24; UniFi Enterprise 24 PoE; UniFi U7 Pro Max; Raspberry Pi 5 (audit logger + SIEM); Logic analyzer Saleae clone
- **Sentinel Prime Tower**: NVIDIA Jetson Orin Nano Super; RPLIDAR A1M8; Luxonis OAK-D Lite; Pi AI Camera (Sony IMX500); RealSense D435i
- **Threat Intel Wearable**: Adafruit Feather nRF52840 Sense; Adafruit DRV2605L Haptic Controller; IMU BNO085 (wearer location context)
- **SOC Intelligence Terminal**: Mac mini M4 24GB (Obsidian Arc node Mac-11); Raspberry Pi 5 + Whisplay HAT (SOC display); Logic analyzer Saleae clone

## Outputs and actions
- Classify detections as Aegis events
- Inject physical flags through ZenFlow /v1/aegis
- Feed physical threat alerts to the SOC terminal and security wristbands

## Permissions
API and MCP access listed for its device(s):
- **Atlas Perception Tower**: APIs: ZenFlow /v1/aegis (physical flag injection); ZenFlow /v1/knowledge/write; Anthropic claude-haiku-4-5 (edge inference); UniFi NVR API; Sentry MCP (anomaly logging). MCPs: ZenFlow Internal API MCP; Sentry MCP; Obsidian Arc Security MCP.
- **Cipher Guardian Rack**: APIs: UniFi Controller API; ZenFlow /v1/aegis (network → Aegis injection); Sentry API (anomaly logging); Slack API; ZenFlow /v1/knowledge/write. MCPs: ZenFlow Internal API MCP; Sentry MCP; Slack MCP; n8n MCP.
- **Sentinel Prime Tower**: APIs: ZenFlow /v1/aegis (physical event injection); UniFi NVR API; ZenFlow /v1/knowledge/write; Anthropic claude-haiku-4-5 (edge inference); Sentry API. MCPs: Sentry MCP; ZenFlow Internal API MCP; Slack MCP.
- **Threat Intel Wearable**: APIs: ZenFlow /v1/aegis/queue (haptic event dispatch); UniFi Controller API; BLE Gateway API; Slack API. MCPs: ZenFlow Internal API MCP; Sentry MCP; Slack MCP.
- **SOC Intelligence Terminal**: APIs: UniFi Controller API; ZenFlow Agent API; Sentry API; Slack API; OpenTelemetry API (traces + metrics). MCPs: Sentry MCP; Slack MCP; ZenFlow Internal API MCP; n8n MCP.

## Aegis clause
- **Atlas Perception Tower**: Detections become aegis_clear or aegis_review events; a person in the quarantine zone after hours triggers aegis_hold and routes to the Zenith Command Band.
- **Cipher Guardian Rack**: Unknown MAC address triggers aegis_hold, VLAN 80 quarantine, Sentry + Slack alerts and a triple pulse on the Zenith Command Band.
- **Sentinel Prime Tower**: Physical detections become aegis_review or aegis_hold events; aegis_hold can trigger the arm bench emergency stop relay.
- **Threat Intel Wearable**: Haptic alert pattern for Aegis hold events.
- **SOC Intelligence Terminal**: Dashboard shows Aegis queue depth.

## Escalation
Alert and review workflows on its devices:
- **Atlas Perception Tower**: Aegis Safety Review Queue; ZenFlow Agent Health Monitor
- **Cipher Guardian Rack**: Aegis Safety Review Queue; Aegis Protocol Compliance Logger; ZenFlow API Error Alerting
- **Sentinel Prime Tower**: Aegis Safety Review Queue; Aegis Protocol Compliance Logger
- **Threat Intel Wearable**: Aegis Safety Review Queue; ZenFlow API Error Alerting
- **SOC Intelligence Terminal**: Aegis Safety Review Queue; Aegis Protocol Compliance Logger; ZenFlow API Error Alerting

## System prompt
The spec gives no system prompt text for this agent.

## Dependencies
- Co-resident agents: [[Aegis Protocol Guardian]], [[Knowledge Keeper (Device Agent)]], [[Network Anomaly Detection Agent]], [[Spatial Intelligence Task Agent]], [[SOC Incident Commander Task Agent]]
- n8n workflows: Aegis Safety Review Queue; ZenFlow Agent Health Monitor; Aegis Protocol Compliance Logger; JWT Token Rotation Monitor; ZenFlow API Error Alerting. See [[n8n Workflow Blueprint]].
- MCPs: ZenFlow Internal API MCP; Sentry MCP; Obsidian Arc Security MCP; Slack MCP; n8n MCP
- Models as written in the spec: claude-haiku-4-5. Current vault routing is in [[Agent Tier Registry]].
