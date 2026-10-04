---
title: Sky Vector Flight Agent
tags:
- device-agent
- physical-ai
- wearables
- android-robot
- wearable
tier: not stated
type: device-agent
model: claude-haiku-4-5
owner: JR Moyler (Hataalii)
device: VS-W01 Sky Vector Dev Drone, VS-W05 Flight Ops Wearable
source: Physical AI Wearables Agent Spec
status: spec
updated: 2026-10-04
division: VectorShift
clearance: Aegis-governed device(s); see Aegis clause
device_count: 2
---
# Sky Vector Flight Agent

Device agent from the [[Physical AI Wearables Agent Spec]]. Divisions: [[VectorShift Division]].
Related: [[Sky Vector]], [[Sky Vector Aerial Delivery]].

## Role
Runs on the Sky Vector Dev Drone. Manages waypoint missions, YOLO-based visual navigation and telemetry logging via the ZenFlow API. Also drives Flight Ops Wearable alerts.

## Devices it runs on
| Code | Device | Type | Section | Listed as |
|---|---|---|---|---|
| VS-W01 | Sky Vector Dev Drone | Android/Robot | [[Wearables Agent Spec — VectorShift Devices]] | Sky Vector Flight Agent |
| VS-W05 | Flight Ops Wearable | Wearable | [[Wearables Agent Spec — VectorShift Devices]] | Sky Vector Flight Agent |

## Inputs and sensors
- **Sky Vector Dev Drone**: Holybro X500 V2 PX4 Dev Kit; Pixhawk 6C Flight Controller; NVIDIA Jetson Orin Nano Super (companion); Pi AI Camera (visual navigation); LILYGO T-Beam Meshtastic (mesh telemetry)
- **Flight Ops Wearable**: Adafruit Feather nRF52840 Sense; Adafruit DRV2605L Haptic Controller; IMU ICM-20948

## Outputs and actions
- Validate the geofence
- Request Aegis clearance and fly only after aegis_clear
- Log every position fix to Knowledge Keeper
- On Sky Vector Dev Drone: A waypoint mission is planned via voice command to the Zenith Oracle Shell. ZENITH routes it to the Sky Vector Flight Agent, which validates the geofence, requests Aegis clearance, and initiates the flight only after aegis_clear. Every position fix is logged to Knowledge Keeper as a timestamped flight record.
- On Flight Ops Wearable: A flight operations technician is rigging the payload while the drone warms up. The wristband delivers 'GPS lock' single pulse, 'motors armed' double pulse, and a triple pulse for Aegis hold, all without the technician turning away from the physical task.

## Permissions
API and MCP access listed for its device(s):
- **Sky Vector Dev Drone**: APIs: ZenFlow /v1/aegis (flight command clearance); PX4 MAVLink API; Meshtastic Python API; ZenFlow /v1/knowledge/write; Anthropic claude-haiku-4-5 (mission planning). MCPs: ZenFlow Internal API MCP; n8n MCP.
- **Flight Ops Wearable**: APIs: ZenFlow /v1/aegis/queue (haptic dispatch); PX4 MAVLink API; BLE Gateway API; Meshtastic Python API. MCPs: ZenFlow Internal API MCP.

## Aegis clause
- **Sky Vector Dev Drone**: All flight commands Aegis-cleared; indoor tethered tests required before outdoor autonomy unlock; flight only after aegis_clear.
- **Flight Ops Wearable**: Triple haptic pulse for Aegis flight hold.

## Escalation
Alert and review workflows on its devices:
- **Sky Vector Dev Drone**: Aegis Safety Review Queue (all flight events); Agent Health Monitor (drone as registered agent)
- **Flight Ops Wearable**: Aegis Safety Review Queue

## System prompt
The spec gives no system prompt text for this agent.

## Dependencies
- Co-resident agents: [[Obstacle Avoidance Agent]], [[Aegis Protocol Guardian]], [[Field Telemetry Task Agent]], [[Knowledge Keeper (Device Agent)]]
- n8n workflows: Aegis Safety Review Queue (all flight events); Agent Health Monitor (drone as registered agent); ZenFlow Meshtastic Gateway bridge; VectorShift Logistics Tracker; Aegis Safety Review Queue. See [[n8n Workflow Blueprint]].
- MCPs: ZenFlow Internal API MCP; n8n MCP
- Models as written in the spec: claude-haiku-4-5. Current vault routing is in [[Agent Tier Registry]].
