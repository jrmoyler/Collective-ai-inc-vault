---
title: Agent Health Monitor
tags:
- device-agent
- physical-ai
- wearables
- wearable
- mesh-node
tier: not stated
type: device-agent
model: claude-sonnet-4-6
owner: JR Moyler (Hataalii)
device: CAI-W01 Zenith Command Band, CAI-W04 Mesh Sentinel Array, ZF-W05 ZenFlow Meshtastic Gateway, VS-W03 Logistics Mesh Node
source: Physical AI Wearables Agent Spec
status: spec
updated: 2026-10-04
division: Collective AI (parent), ZenFlow, VectorShift
clearance: Aegis-governed device(s); see Aegis clause
device_count: 4
---
# Agent Health Monitor

Device agent from the [[Physical AI Wearables Agent Spec]]. Divisions: [[Collective AI — Company Charter]], [[ZenFlow Division]], [[VectorShift Division]].

## Role
Watches heartbeats from software agents and registered physical devices. Mesh nodes, rovers and drones register as agents, so a lost hardware heartbeat follows the same alert path as a software agent failure.

## Devices it runs on
| Code | Device | Type | Section | Listed as |
|---|---|---|---|---|
| CAI-W01 | Zenith Command Band | Wearable | [[Wearables Agent Spec — Parent Devices]] | Agent Health Monitor |
| CAI-W04 | Mesh Sentinel Array | Mesh Node | [[Wearables Agent Spec — Parent Devices]] | Agent Health Monitor |
| ZF-W05 | ZenFlow Meshtastic Gateway | Mesh Node | [[Wearables Agent Spec — ZenFlow Devices]] | Agent Health Monitor |
| VS-W03 | Logistics Mesh Node | Mesh Node | [[Wearables Agent Spec — VectorShift Devices]] | Agent Health Monitor |

## Inputs and sensors
- **Zenith Command Band**: Adafruit Feather nRF52840 Sense; Adafruit DRV2605L Haptic Controller; IMU ICM-20948
- **Mesh Sentinel Array**: LILYGO T-Beam Meshtastic (×4); Heltec V3 Meshtastic nodes (×6); LILYGO T-Deck (field terminal); Raspberry Pi 5 (MQTT bridge gateway)
- **ZenFlow Meshtastic Gateway**: Raspberry Pi 5 8GB (MQTT bridge); LILYGO T-Beam Meshtastic (master node); Heltec V3 relay nodes (×2 ZenFlow zone)
- **Logistics Mesh Node**: LILYGO T-Beam Meshtastic (GPS + LoRa); Raspberry Pi 5 (MQTT bridge); Heltec V3 relay nodes (×2 corridor); Directional LoRa antenna

## Outputs and actions
- Receive device heartbeats via /v1/agents/health
- Fire the ZenFlow Agent Health Monitor alert path on offline nodes
- Feed agent status to the Zenith Command Band

## Permissions
API and MCP access listed for its device(s):
- **Zenith Command Band**: APIs: ZenFlow Agent API /v1/aegis/queue; ZenFlow /v1/agents/health; Anthropic claude-sonnet-4-6; Slack alert webhook. MCPs: ZenFlow Internal API MCP; Slack MCP; n8n MCP.
- **Mesh Sentinel Array**: APIs: ZenFlow /v1/agents/health (device registration); MQTT broker API; n8n webhook triggers; Meshtastic Python API. MCPs: ZenFlow Internal API MCP; n8n MCP.
- **ZenFlow Meshtastic Gateway**: APIs: ZenFlow /v1/agents (device registration); Meshtastic Python API; MQTT broker; n8n webhook API. MCPs: ZenFlow Internal API MCP; n8n MCP.
- **Logistics Mesh Node**: APIs: Meshtastic Python API; ZenFlow /v1/agents/health (device registration); MQTT broker; n8n webhook. MCPs: ZenFlow Internal API MCP; n8n MCP.

## Aegis clause
- **Zenith Command Band**: Haptic codes map to Aegis states: green pulse aegis_clear, amber double-tap aegis_review, red triple aegis_hold.

## Escalation
Alert and review workflows on its devices:
- **Zenith Command Band**: ZenFlow Agent Health Monitor; Aegis Incident Reporter
- **Mesh Sentinel Array**: ZenFlow Agent Health Monitor; Aegis Protocol Compliance Logger
- **ZenFlow Meshtastic Gateway**: ZenFlow Agent Health Monitor (physical devices)
- **Logistics Mesh Node**: ZenFlow Agent Health Monitor (physical nodes)

## System prompt
The spec gives no system prompt text for this agent.

## Dependencies
- Co-resident agents: [[ZENITH Overseer]], [[Aegis Protocol Guardian]], [[Knowledge Keeper (Device Agent)]], [[Director_Operations (Device Agent)]], [[Device Registry Task Agent]], [[Field Telemetry Task Agent]], [[Logistics Tracker Task Agent]]
- n8n workflows: ZenFlow Agent Health Monitor; Aegis Incident Reporter; Daily Agent Performance Digest; Aegis Protocol Compliance Logger; ZenFlow Agent Health Monitor (physical devices); Cross-Division Intelligence Request Router; VectorShift Logistics Tracker; ZenFlow Agent Health Monitor (physical nodes); ZenFlow Meshtastic Gateway bridge. See [[n8n Workflow Blueprint]].
- MCPs: ZenFlow Internal API MCP; Slack MCP; n8n MCP
- Models as written in the spec: claude-sonnet-4-6. Current vault routing is in [[Agent Tier Registry]].
