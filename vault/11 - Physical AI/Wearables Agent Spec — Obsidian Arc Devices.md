---
title: Wearables Agent Spec — Obsidian Arc Devices
tags:
- physical-ai
- wearables
- device-specs
- obsidian-arc
type: spec-section
owner: JR Moyler (Hataalii)
source: Physical AI Wearables Agent Spec
updated: 2026-10-04
division: Obsidian Arc
device_count: 5
---
# Wearables Agent Spec — Obsidian Arc Devices

Section of the [[Physical AI Wearables Agent Spec]]. Unified cyber + physical security: Aegis enforced in hardware. Division: [[Obsidian Arc Division]].

| Code | Device | Type | Est. budget |
|---|---|---|---|
| OA-W01 | Cipher Guardian Rack | Physical AI | ~$2,200–$3,000 |
| OA-W02 | Sentinel Prime Tower | Physical AI | ~$650–$850 |
| OA-W03 | Forensic Evidence Node | Edge Terminal | ~$560–$760 |
| OA-W04 | Threat Intel Wearable | Wearable | ~$110–$160 |
| OA-W05 | SOC Intelligence Terminal | Edge Terminal | ~$380–$520 (beyond Mac mini) |

## OA-W01 Cipher Guardian Rack
*Zero-trust enforcement in a rack: the Foundry's immune system.* (Physical AI)

Obsidian Arc's full network security enforcement rack. Runs UniFi Controller, IDS/IPS, VLAN policy, and NVR on the UDM Pro Max while a dedicated Pi 5 audit node runs the Aegis Protocol Compliance Logger continuously. Every network event is cross-referenced against the ZenFlow agent registry: an unknown MAC address triggers aegis_hold and fires Sentry + Slack alerts simultaneously.

### Hardware
- UniFi Dream Machine Pro Max
- UniFi Enterprise XG 24
- UniFi Enterprise 24 PoE
- UniFi U7 Pro Max
- Raspberry Pi 5 (audit logger + SIEM)
- Logic analyzer Saleae clone
- CyberPower Rackmount UPS 1500VA
- Rack + PDU + patch panel

### ZenFlow agents
- [[Aegis Protocol Guardian]]
- [[Physical Security Task Agent]]
- [[Network Anomaly Detection Agent]]
- [[Knowledge Keeper (Device Agent)]]

### APIs
- UniFi Controller API
- ZenFlow /v1/aegis (network → Aegis injection)
- Sentry API (anomaly logging)
- Slack API
- ZenFlow /v1/knowledge/write

### n8n workflows
- Aegis Safety Review Queue
- Aegis Protocol Compliance Logger
- JWT Token Rotation Monitor
- ZenFlow API Error Alerting

### MCPs
- ZenFlow Internal API MCP
- Sentry MCP
- Slack MCP
- n8n MCP

### Use case
An unknown device attempts to join VLAN 20 (Department Nodes). The Network Anomaly Detection Agent intercepts, fires aegis_hold, routes the MAC to the VLAN 80 Quarantine, and posts an incident to Sentry + Slack, all before a human is aware of the attempt. JR's Zenith Command Band receives a triple haptic pulse.

### Build outcome
Zero-trust network enforcement: unknown device quarantine, Aegis injection, SIEM logging, haptic founder alert.

**Est. budget:** ~$2,200–$3,000

> [!warning] Aegis
> Unknown MAC address triggers aegis_hold, VLAN 80 quarantine, Sentry + Slack alerts and a triple pulse on the Zenith Command Band.

## OA-W02 Sentinel Prime Tower
*The Foundry sees threats before they arrive.* (Physical AI)

A mounted perception mast combining LiDAR + depth + RGB AI + Jetson inference for physical threat detection. Runs the same Aegis Protocol queue as software agents: physical detections become aegis_review or aegis_hold events in the ZenFlow API. All spatial data is logged to Knowledge Keeper with timestamps and person-count metadata.

### Hardware
- NVIDIA Jetson Orin Nano Super
- RPLIDAR A1M8
- Luxonis OAK-D Lite
- Pi AI Camera (Sony IMX500)
- RealSense D435i
- Pi M.2 HAT+ + 1TB NVMe
- 3D-printed Prusa CORE One+ mast
- PoE injector

### ZenFlow agents
- [[Physical Security Task Agent]]
- [[Aegis Protocol Guardian]]
- [[Spatial Intelligence Task Agent]]
- [[Knowledge Keeper (Device Agent)]]

### APIs
- ZenFlow /v1/aegis (physical event injection)
- UniFi NVR API
- ZenFlow /v1/knowledge/write
- Anthropic claude-haiku-4-5 (edge inference)
- Sentry API

### n8n workflows
- Aegis Safety Review Queue
- Aegis Protocol Compliance Logger

### MCPs
- Sentry MCP
- ZenFlow Internal API MCP
- Slack MCP

### Use case
The Sentinel Tower detects a person in the Animus Prime robot arm test zone after hours. The Spatial Intelligence Task Agent classifies it as aegis_hold, fires the Sentry incident log, and triggers the emergency stop relay on the arm bench: physical safety through the same system that governs software agent safety.

### Build outcome
Physical Aegis enforcement mast: spatial threat detection, emergency stop integration, unified Aegis queue.

**Est. budget:** ~$650–$850

> [!warning] Aegis
> Physical detections become aegis_review or aegis_hold events; aegis_hold can trigger the arm bench emergency stop relay.

## OA-W03 Forensic Evidence Node
*Capture, hash, preserve: on premises, forever.* (Edge Terminal)

A 64MP camera + Jetson node for forensic-grade evidence capture. Every image is hashed on-device (SHA-256) at the moment of capture, written to an encrypted NVMe partition, and backed up to an air-gapped Synology NAS partition. The Evidence Integrity Task Agent logs each capture as a Knowledge Keeper entry with hash, timestamp, capture context, and Aegis classification.

### Hardware
- NVIDIA Jetson Orin Nano Super
- Arducam 64MP Hawkeye Camera
- Pi M.2 HAT+ + 2TB NVMe (encrypted)
- Raspberry Pi 5 (controller)
- Synology NAS air-gapped partition
- 3D-printed Bambu P1S forensic enclosure

### ZenFlow agents
- [[Evidence Integrity Task Agent]]
- [[Aegis Protocol Guardian]]
- [[Knowledge Keeper (Device Agent)]]

### APIs
- ZenFlow /v1/knowledge/write
- ZenFlow /v1/aegis (evidence classification)
- Anthropic claude-haiku-4-5 (context tagging)
- Synology NAS API

### n8n workflows
- Aegis Protocol Compliance Logger
- Evidence Archive Sync (NAS backup trigger)

### MCPs
- ZenFlow Internal API MCP
- Sentry MCP

### Use case
During a Juris Guard legal matter, Obsidian Arc captures documentary evidence. Every photograph is hash-signed on-device, logged to Knowledge Keeper with legal context, and immediately backed up to the air-gapped NAS partition: tamper-evident chain of custody from the moment of capture.

### Build outcome
Forensic capture station: 64MP hash-signed evidence, encrypted storage, air-gapped backup, Knowledge Keeper chain.

**Est. budget:** ~$560–$760

> [!warning] Aegis
> Each capture carries an Aegis classification via /v1/aegis.

## OA-W04 Threat Intel Wearable
*Obsidian Arc's security status, worn by every team member.* (Wearable)

A BLE wearable for Obsidian Arc security personnel that delivers real-time haptic alerts for: network anomaly detection, Aegis hold events, physical zone breaches, and drone/field device going offline. Three distinct vibration patterns map to cyber threat, physical threat, and system health, enabling instant situational awareness without screen interaction.

### Hardware
- Adafruit Feather nRF52840 Sense
- Adafruit DRV2605L Haptic Controller
- IMU BNO085 (wearer location context)
- PowerBoost 1000 + LiPo
- 3D-printed Bambu A1 PETG security wristband

### ZenFlow agents
- [[Aegis Protocol Guardian]]
- [[Network Anomaly Detection Agent]]
- [[Physical Security Task Agent]]

### APIs
- ZenFlow /v1/aegis/queue (haptic event dispatch)
- UniFi Controller API
- BLE Gateway API
- Slack API

### n8n workflows
- Aegis Safety Review Queue
- ZenFlow API Error Alerting

### MCPs
- ZenFlow Internal API MCP
- Sentry MCP
- Slack MCP

### Use case
An Obsidian Arc security engineer is doing a physical walkthrough. The wristband delivers a distinct cyber-threat pulse pattern: a network anomaly was detected on VLAN 40 (Physical AI / Robotics). They know before checking their phone and can respond immediately.

### Build outcome
Security personnel wristband: coded haptic alerts for cyber threats, physical breaches, Aegis hold events.

**Est. budget:** ~$110–$160

> [!warning] Aegis
> Haptic alert pattern for Aegis hold events.

## OA-W05 SOC Intelligence Terminal
*Security operations, run from a desk node.* (Edge Terminal)

Obsidian Arc's Security Operations Center terminal. A Mac mini node with Pi 5 ambient display running the Network Anomaly Detection Agent, DeFi Risk Monitor cross-feed, and physical threat event log in a unified SOC dashboard. All 8 VLAN streams are monitored in real time. Sentry MCP surfaces application-level anomalies alongside network events in one operational picture.

### Hardware
- Mac mini M4 24GB (Obsidian Arc node Mac-11)
- Raspberry Pi 5 + Whisplay HAT (SOC display)
- Pi M.2 HAT+ + 2TB NVMe
- Logic analyzer Saleae clone
- Labeled Cat6A to VLAN 10 Command
- 3D-printed Bambu A1 SOC station enclosure

### ZenFlow agents
- [[Network Anomaly Detection Agent]]
- [[Aegis Protocol Guardian]]
- [[Physical Security Task Agent]]
- [[SOC Incident Commander Task Agent]]

### APIs
- UniFi Controller API
- ZenFlow Agent API
- Sentry API
- Slack API
- OpenTelemetry API (traces + metrics)

### n8n workflows
- Aegis Safety Review Queue
- Aegis Protocol Compliance Logger
- ZenFlow API Error Alerting
- JWT Token Rotation Monitor

### MCPs
- Sentry MCP
- Slack MCP
- ZenFlow Internal API MCP
- n8n MCP

### Use case
The SOC Terminal shows a unified view: 8 VLAN health indicators, Aegis queue depth, active physical alerts from Sentinel Tower, and Sentry application errors, all in one display. One button press on the Whisplay acknowledges and routes any event to the appropriate response workflow.

### Build outcome
Unified SOC terminal: network + physical + application threat monitoring, one-button incident routing.

**Est. budget:** ~$380–$520 (beyond Mac mini)

> [!warning] Aegis
> Dashboard shows Aegis queue depth.
