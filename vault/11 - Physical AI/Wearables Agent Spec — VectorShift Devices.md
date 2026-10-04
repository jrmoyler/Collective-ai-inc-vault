---
title: Wearables Agent Spec — VectorShift Devices
tags:
- physical-ai
- wearables
- device-specs
- vectorshift
type: spec-section
owner: JR Moyler (Hataalii)
source: Physical AI Wearables Agent Spec
updated: 2026-10-04
division: VectorShift
device_count: 5
---
# Wearables Agent Spec — VectorShift Devices

Section of the [[Physical AI Wearables Agent Spec]]. Autonomous logistics and aerial mobility: every node in motion. Division: [[VectorShift Division]].

| Code | Device | Type | Est. budget |
|---|---|---|---|
| VS-W01 | Sky Vector Dev Drone | Android/Robot | ~$900–$1,300 |
| VS-W02 | Ground Vector Rover | Android/Robot | ~$1,100–$1,600 |
| VS-W03 | Logistics Mesh Node | Mesh Node | ~$200–$310 |
| VS-W04 | Aerial Mesh Relay Drone | Android/Robot | ~$800–$1,100 |
| VS-W05 | Flight Ops Wearable | Wearable | ~$110–$160 |

## VS-W01 Sky Vector Dev Drone
*First flight, first autonomy: the aerial proving ground.* (Android/Robot)

VectorShift's PX4/ArduPilot development quad with Jetson companion compute. The Sky Vector Flight Agent manages waypoint missions, YOLO-based visual navigation, and telemetry logging via the ZenFlow API. All flight commands are Aegis-cleared before execution: indoor tethered tests required before outdoor autonomy unlock. Meshtastic LoRa provides GPS telemetry to the Foundry mesh even when MAVLink radio is out of range.

### Hardware
- Holybro X500 V2 PX4 Dev Kit
- Pixhawk 6C Flight Controller
- NVIDIA Jetson Orin Nano Super (companion)
- Pi AI Camera (visual navigation)
- LILYGO T-Beam Meshtastic (mesh telemetry)
- LiPo battery + XT60
- Emergency stop + ground station Pi 5

### ZenFlow agents
- [[Sky Vector Flight Agent]]
- [[Obstacle Avoidance Agent]]
- [[Aegis Protocol Guardian]] (flight)
- [[Field Telemetry Task Agent]]
- [[Knowledge Keeper (Device Agent)]]

### APIs
- ZenFlow /v1/aegis (flight command clearance)
- PX4 MAVLink API
- Meshtastic Python API
- ZenFlow /v1/knowledge/write
- Anthropic claude-haiku-4-5 (mission planning)

### n8n workflows
- Aegis Safety Review Queue (all flight events)
- Agent Health Monitor (drone as registered agent)
- ZenFlow Meshtastic Gateway bridge
- VectorShift Logistics Tracker

### MCPs
- ZenFlow Internal API MCP
- n8n MCP

### Use case
A waypoint mission is planned via voice command to the Zenith Oracle Shell. ZENITH routes it to the Sky Vector Flight Agent, which validates the geofence, requests Aegis clearance, and initiates the flight only after aegis_clear. Every position fix is logged to Knowledge Keeper as a timestamped flight record.

### Build outcome
PX4 autonomous dev drone: Aegis-governed flight, YOLO navigation, mesh GPS telemetry, Knowledge Keeper log.

**Est. budget:** ~$900–$1,300

> [!warning] Aegis
> All flight commands Aegis-cleared; indoor tethered tests required before outdoor autonomy unlock; flight only after aegis_clear.

## VS-W02 Ground Vector Rover
*Last-mile delivery: autonomous, Aegis-governed.* (Android/Robot)

A ROS2 rover for autonomous last-mile navigation experiments. The Ground Vector Navigation Agent handles path planning via LiDAR + depth camera, with Aegis Protocol enforcing speed limits and geofence boundaries. Meshtastic LoRa uplinks GPS position to the logistics mesh. All route completions are logged to the n8n Logistics Tracker workflow and Knowledge Keeper.

### Hardware
- ROSMASTER R2 ROS2 rover base
- NVIDIA Jetson Orin Nano Super
- RPLIDAR A1M8
- Luxonis OAK-D Lite
- Cytron MD13S motor driver
- LILYGO T-Beam Meshtastic
- Emergency stop + fused rails

### ZenFlow agents
- [[Ground Vector Navigation Agent]]
- [[Obstacle Avoidance Agent]]
- [[Aegis Protocol Guardian]]
- [[Field Telemetry Task Agent]]
- [[Knowledge Keeper (Device Agent)]]

### APIs
- ZenFlow /v1/aegis (navigation clearance)
- ROS2 nav2 API
- Meshtastic Python API
- ZenFlow /v1/knowledge/write

### n8n workflows
- VectorShift Logistics Tracker
- Aegis Safety Review Queue
- Agent Health Monitor

### MCPs
- ZenFlow Internal API MCP
- n8n MCP

### Use case
Ground Vector receives a delivery instruction from ZENITH Overseer. The Navigation Agent plans the route, Aegis clears all waypoints, and the rover autonomously delivers while broadcasting GPS position via LoRa. On arrival, the Logistics Tracker n8n workflow marks the route complete.

### Build outcome
Autonomous last-mile rover: ROS2 path planning, Aegis-governed motion, mesh GPS, logistics workflow integration.

**Est. budget:** ~$1,100–$1,600

> [!warning] Aegis
> Aegis enforces speed limits and geofence; all waypoints cleared.

## VS-W03 Logistics Mesh Node
*Every package tracked, every route logged, no internet required.* (Mesh Node)

A fixed outdoor LoRa mesh node deployed along logistics corridors and drone test zones. GPS-tagged position beacons from Sky Vector and Ground Vector assets are relayed through these nodes to the Foundry MQTT gateway, where the n8n Logistics Tracker workflow updates asset positions in real time. Solar-powered and weatherproof for permanent outdoor deployment.

### Hardware
- LILYGO T-Beam Meshtastic (GPS + LoRa)
- Raspberry Pi 5 (MQTT bridge)
- 12V battery + solar input
- Heltec V3 relay nodes (×2 corridor)
- Waterproof 3D-printed Bambu P1S ASA enclosure
- Directional LoRa antenna

### ZenFlow agents
- [[Field Telemetry Task Agent]]
- [[Agent Health Monitor]]
- [[Logistics Tracker Task Agent]]

### APIs
- Meshtastic Python API
- ZenFlow /v1/agents/health (device registration)
- MQTT broker
- n8n webhook

### n8n workflows
- VectorShift Logistics Tracker
- ZenFlow Agent Health Monitor (physical nodes)
- ZenFlow Meshtastic Gateway bridge

### MCPs
- ZenFlow Internal API MCP
- n8n MCP

### Use case
Sky Vector Dev Drone loses Wi-Fi during a field mission. Meshtastic LoRa nodes relay its GPS position through the corridor mesh to the Foundry gateway; the Logistics Tracker workflow continues showing live position without interruption. No internet, no cloud dependency.

### Build outcome
Solar outdoor logistics mesh: GPS relay without internet, asset tracking, drone + rover position logging.

**Est. budget:** ~$200–$310

## VS-W04 Aerial Mesh Relay Drone
*Communications infrastructure that flies.* (Android/Robot)

An X500 carrying a Pi 5 + LoRa mesh payload for extending the Aether Link mesh to areas beyond fixed node range. The Mesh Relay Flight Agent manages altitude and geofence for maximum relay coverage. When deployed, it registers as a ZenFlow mesh bridge node: all Foundry devices gain extended LoRa range while it's airborne.

### Hardware
- Holybro X500 V2 ARF Kit
- Pixhawk 6C
- Raspberry Pi 5 (mesh payload)
- LILYGO T-Beam Meshtastic (aerial relay)
- Directional LoRa antennas
- LiPo + XT60
- 3D-printed Bambu P1S payload bay

### ZenFlow agents
- [[Mesh Relay Flight Agent]]
- [[Aegis Protocol Guardian]] (flight)
- [[Aether Link Mesh Extension Task Agent]]
- [[Knowledge Keeper (Device Agent)]]

### APIs
- ZenFlow /v1/aegis
- PX4 MAVLink API
- Meshtastic Python API
- ZenFlow /v1/knowledge/write

### n8n workflows
- Aegis Safety Review Queue
- Aether Link Mesh Status
- Agent Health Monitor

### MCPs
- ZenFlow Internal API MCP
- n8n MCP

### Use case
During a remote field operation, fixed LoRa nodes can't reach the site. The Aerial Mesh Relay Drone is deployed, hovers at 100 feet, and instantly extends the Foundry mesh network by 8km. All Ground Vector rovers and field kits reconnect through the airborne relay.

### Build outcome
Airborne LoRa mesh relay: extends Foundry comms coverage on demand, aerial bridge for field operations.

**Est. budget:** ~$800–$1,100

> [!warning] Aegis
> Flight runs under Aegis Protocol Guardian (flight) and the Aegis Safety Review Queue.

## VS-W05 Flight Ops Wearable
*The pilot's wrist: flight telemetry on the body.* (Wearable)

A BLE wearable for VectorShift flight operations personnel. Delivers coded haptic alerts for: drone GPS lock acquired, waypoint reached, battery warning, geofence breach, and Aegis flight hold. A single press triggers a voice status read from the Zenith Oracle Shell via the ZenFlow API. Allows hands-free flight monitoring during physical setup tasks.

### Hardware
- Adafruit Feather nRF52840 Sense
- Adafruit DRV2605L Haptic Controller
- IMU ICM-20948
- PowerBoost 1000 + LiPo
- 3D-printed Bambu A1 PETG flight ops wristband

### ZenFlow agents
- [[Sky Vector Flight Agent]]
- [[Aegis Protocol Guardian]]
- [[Field Telemetry Task Agent]]

### APIs
- ZenFlow /v1/aegis/queue (haptic dispatch)
- PX4 MAVLink API
- BLE Gateway API
- Meshtastic Python API

### n8n workflows
- VectorShift Logistics Tracker
- Aegis Safety Review Queue

### MCPs
- ZenFlow Internal API MCP

### Use case
A flight operations technician is rigging the payload while the drone warms up. The wristband delivers 'GPS lock' single pulse, 'motors armed' double pulse, and a triple pulse for Aegis hold, all without the technician turning away from the physical task.

### Build outcome
Flight ops wristband: hands-free haptic drone status alerts, Aegis hold notification, voice status on demand.

**Est. budget:** ~$110–$160

> [!warning] Aegis
> Triple haptic pulse for Aegis flight hold.

The spec spells the division "Vector Shift"; the vault uses VectorShift.
