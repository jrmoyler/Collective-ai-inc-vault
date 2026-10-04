---
title: Logistics Tracker Task Agent
tags:
- device-agent
- physical-ai
- wearables
- mesh-node
tier: not stated
type: device-agent
model: not stated
owner: JR Moyler (Hataalii)
device: VS-W03 Logistics Mesh Node
source: Physical AI Wearables Agent Spec
status: spec
updated: 2026-10-04
division: VectorShift
clearance: not stated
device_count: 1
---
# Logistics Tracker Task Agent

Device agent from the [[Physical AI Wearables Agent Spec]]. Divisions: [[VectorShift Division]].

## Role
Runs on the Logistics Mesh Node with the VectorShift Logistics Tracker workflow.

## Device it runs on
**VS-W03 Logistics Mesh Node** (Mesh Node), described in [[Wearables Agent Spec — VectorShift Devices]]. A fixed outdoor LoRa mesh node deployed along logistics corridors and drone test zones. GPS-tagged position beacons from Sky Vector and Ground Vector assets are relayed through these nodes to the Foundry MQTT gateway, where the n8n Logistics Tracker workflow updates asset positions in real time. Solar-powered and weatherproof for permanent outdoor deployment.

## Inputs and sensors
- **Logistics Mesh Node**: LILYGO T-Beam Meshtastic (GPS + LoRa); Raspberry Pi 5 (MQTT bridge); Heltec V3 relay nodes (×2 corridor); Directional LoRa antenna

## Outputs and actions
- Update asset positions in real time from relayed GPS beacons
- On Logistics Mesh Node: Sky Vector Dev Drone loses Wi-Fi during a field mission. Meshtastic LoRa nodes relay its GPS position through the corridor mesh to the Foundry gateway; the Logistics Tracker workflow continues showing live position without interruption. No internet, no cloud dependency.

## Permissions
API and MCP access listed for its device(s):
- **Logistics Mesh Node**: APIs: Meshtastic Python API; ZenFlow /v1/agents/health (device registration); MQTT broker; n8n webhook. MCPs: ZenFlow Internal API MCP; n8n MCP.

## Aegis clause
The spec states no device-specific Aegis rule for this agent. The document-wide gate applies: all physical motion is Aegis-cleared before execution. See [[Wearables Agent Spec — Aegis Physical Safety Gate]].

## Escalation
Alert and review workflows on its devices:
- **Logistics Mesh Node**: ZenFlow Agent Health Monitor (physical nodes)

## System prompt
The spec gives no system prompt text for this agent.

## Dependencies
- Co-resident agents: [[Field Telemetry Task Agent]], [[Agent Health Monitor]]
- n8n workflows: VectorShift Logistics Tracker; ZenFlow Agent Health Monitor (physical nodes); ZenFlow Meshtastic Gateway bridge. See [[n8n Workflow Blueprint]].
- MCPs: ZenFlow Internal API MCP; n8n MCP
