---
title: Wearables Agent Spec — Aegis Physical Safety Gate
tags:
- physical-ai
- wearables
- safety
- aegis
type: spec-section
owner: JR Moyler (Hataalii)
source: Physical AI Wearables Agent Spec
updated: 2026-10-04
---
# Wearables Agent Spec — Aegis Physical Safety Gate

Safety rules in the [[Physical AI Wearables Agent Spec]]. The cover states: Aegis Protocol, all physical motion Aegis-cleared before execution. See [[Aegis Protocol Spec]] and [[Aegis Protocol]].

## States
- **aegis_clear**: action may execute. Haptic: green pulse on the Zenith Command Band.
- **aegis_review**: queued for review. Haptic: amber double-tap.
- **aegis_hold**: blocked. Haptic: red triple.

## One queue for software and hardware
Physical threat events, network anomalies and evidence captures are injected into the same Aegis Protocol queue that governs the 600 software agents. Hardware and software failure modes are handled identically.

## Device rules
| Device | Rule |
|---|---|
| CAI-W01 Zenith Command Band | Haptic codes map to Aegis states: green pulse aegis_clear, amber double-tap aegis_review, red triple aegis_hold. |
| CAI-W03 Aegis Command Station | Runs the Aegis Safety Review Queue; JR receives Aegis queue alerts here. |
| CAI-W05 Atlas Perception Tower | Detections become aegis_clear or aegis_review events; a person in the quarantine zone after hours triggers aegis_hold and routes to the Zenith Command Band. |
| CAI-W06 Zenith Oracle Voice Shell | Reads Aegis queue items aloud for review. |
| ZF-W01 CORTEX Director Shell | CORTEX Director enforces Aegis Protocol for the cluster. |
| ZF-W02 Synaptic Relay Badge | Haptic notification for Aegis Protocol flags that need engineering review. |
| ZF-W04 Agent Eval Bench | Aegis Protocol Guardian signs off after eval. Fail = blocked from VLAN 20. Bench sits in VLAN 80 Quarantine. |
| QL-W03 Chain Ledger Node | DeFi TVL anomaly queues an aegis_review before any automated action. |
| OA-W01 Cipher Guardian Rack | Unknown MAC address triggers aegis_hold, VLAN 80 quarantine, Sentry + Slack alerts and a triple pulse on the Zenith Command Band. |
| OA-W02 Sentinel Prime Tower | Physical detections become aegis_review or aegis_hold events; aegis_hold can trigger the arm bench emergency stop relay. |
| OA-W03 Forensic Evidence Node | Each capture carries an Aegis classification via /v1/aegis. |
| OA-W04 Threat Intel Wearable | Haptic alert pattern for Aegis hold events. |
| OA-W05 SOC Intelligence Terminal | Dashboard shows Aegis queue depth. |
| AP-W01 Prime Shell v0.1 | No servo moves without aegis_clear; aegis_clear fires in <50ms in the spec's example. |
| AP-W02 Titan Bench Arm | Aegis enforces current and speed limits; out-of-bounds motion triggers aegis_hold and physical e-stop. |
| AP-W03 Dexterous Hand Node | All finger servo commands are Aegis-cleared. |
| AP-W04 Mobile Base Rover | All movement commands pass through Aegis; speed limits, geofence and e-stop are hard-enforced at firmware level; a person in path triggers aegis_hold. |
| AP-W05 Embodied AI Control Wearable | Aegis enforces joint limits in real time. |
| VS-W01 Sky Vector Dev Drone | All flight commands Aegis-cleared; indoor tethered tests required before outdoor autonomy unlock; flight only after aegis_clear. |
| VS-W02 Ground Vector Rover | Aegis enforces speed limits and geofence; all waypoints cleared. |
| VS-W04 Aerial Mesh Relay Drone | Flight runs under Aegis Protocol Guardian (flight) and the Aegis Safety Review Queue. |
| VS-W05 Flight Ops Wearable | Triple haptic pulse for Aegis flight hold. |

## Physical safeguards in the hardware lists
- Emergency stop + fused rails: Prime Shell v0.1, Titan Bench Arm, Mobile Base Rover, Ground Vector Rover.
- Emergency stop + bench PSU: Dexterous Hand Node. Emergency stop + ground station Pi 5: Sky Vector Dev Drone.
- Network isolation: Agent Eval Bench on VLAN 80 Quarantine; unknown MACs routed to VLAN 80.

## Agents
- [[Aegis Protocol Guardian]] (on 21 devices)
- [[Physical Security Task Agent]]
- [[Spatial Intelligence Task Agent]]
- [[Network Anomaly Detection Agent]]
- [[Evidence Integrity Task Agent]]
- [[Obstacle Avoidance Agent]]

## Workflows
- Aegis Safety Review Queue
- Aegis Protocol Compliance Logger
- Aegis Incident Reporter

Divisions most involved: [[Obsidian Arc Division]], [[Animus Prime Division]], [[VectorShift Division]].
