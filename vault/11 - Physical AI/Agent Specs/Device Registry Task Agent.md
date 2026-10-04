---
title: Device Registry Task Agent
tags:
- device-agent
- physical-ai
- wearables
- mesh-node
tier: not stated
type: device-agent
model: not stated
owner: JR Moyler (Hataalii)
device: ZF-W05 ZenFlow Meshtastic Gateway
source: Physical AI Wearables Agent Spec
status: spec
updated: 2026-10-04
division: ZenFlow
clearance: not stated
device_count: 1
---
# Device Registry Task Agent

Device agent from the [[Physical AI Wearables Agent Spec]]. Divisions: [[ZenFlow Division]].

## Role
Runs on the ZenFlow Meshtastic Gateway. Registers every physical device on the mesh as a sensor endpoint with an agent identity, and translates LoRa telemetry packets into ZenFlow API calls.

## Device it runs on
**ZF-W05 ZenFlow Meshtastic Gateway** (Mesh Node), described in [[Wearables Agent Spec — ZenFlow Devices]]. A Pi 5 node that bridges the Foundry's Meshtastic LoRa mesh into the ZenFlow agent registry. Every physical device on the mesh is registered as a sensor endpoint with an agent identity. The gateway translates LoRa telemetry packets into ZenFlow API calls: device heartbeats, GPS coordinates, and sensor readings become agent status events in the same operational dashboard as software agents.

## Inputs and sensors
- **ZenFlow Meshtastic Gateway**: Raspberry Pi 5 8GB (MQTT bridge); LILYGO T-Beam Meshtastic (master node); Heltec V3 relay nodes (×2 ZenFlow zone)

## Outputs and actions
- Register mesh devices via /v1/agents
- Turn heartbeats, GPS coordinates and sensor readings into agent status events
- On ZenFlow Meshtastic Gateway: When VectorShift's Sky Vector Drone goes offline mid-flight, the Meshtastic Gateway registers the lost heartbeat as an agent health event in ZenFlow: the same alert path as a software agent crash. Hardware and software failure modes handled identically.

## Permissions
API and MCP access listed for its device(s):
- **ZenFlow Meshtastic Gateway**: APIs: ZenFlow /v1/agents (device registration); Meshtastic Python API; MQTT broker; n8n webhook API. MCPs: ZenFlow Internal API MCP; n8n MCP.

## Aegis clause
The spec states no device-specific Aegis rule for this agent. The document-wide gate applies: all physical motion is Aegis-cleared before execution. See [[Wearables Agent Spec — Aegis Physical Safety Gate]].

## Escalation
Alert and review workflows on its devices:
- **ZenFlow Meshtastic Gateway**: ZenFlow Agent Health Monitor (physical devices)

## System prompt
The spec gives no system prompt text for this agent.

## Dependencies
- Co-resident agents: [[Agent Health Monitor]], [[Director_Operations (Device Agent)]]
- n8n workflows: ZenFlow Agent Health Monitor (physical devices); Cross-Division Intelligence Request Router. See [[n8n Workflow Blueprint]].
- MCPs: ZenFlow Internal API MCP; n8n MCP
