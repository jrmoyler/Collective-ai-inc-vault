---
title: SYN-08 Prime Shepherd Rover
id: SYN-08
cost: ~$1,800–$2,600
kind: physical
tags:
- synergy-node
- physical-node
- phase-3
- aegis-hold
type: synergy-node
owner: JR Moyler (Hataalii)
phase: 3
source: Full Synergy Node Catalog
status: aegis-hold
updated: 2026-10-04
divisions: Animus Prime, VectorShift
---
# SYN-08 Prime Shepherd Rover

Physical Synergy Node SYN-08 from the [[Full Synergy Node Catalog]]. Phase 3 — Mobility + Actuation. Divisions: [[Animus Prime Division]] ✦ [[VectorShift Division]].

> [!warning] Aegis-Hold
> Aegis-Hold until e-stop verification is complete. The emergency stop GPIO relay is hardwired to the e-stop rail, and the E-Stop Incident Log workflow is mandatory on any safety halt.

| Field | Value |
|---|---|
| Node | SYN-08 |
| Kind | Physical hardware fusion node |
| Phase | 3 — Mobility + Actuation |
| Divisions | Animus Prime, VectorShift |
| Est. build budget | ~$1,800–$2,600 |
| Status | aegis-hold |

## Why These Divisions Fuse
Animus Prime builds android and robotic systems. VectorShift builds autonomous logistics routing. A ground rover using Animus Prime's embodied AI and sensor stack for physical navigation while running VectorShift's routing and delivery logic for material transport is the natural hardware fusion.

## Product Description
A ground-based autonomous rover serving as both the Animus Prime android mobility testbed and the VectorShift indoor logistics platform. The Prime Shell mobility subsystem provides the chassis and perception stack. The VectorShift Autonomous Routing Agent runs delivery mission logic. When not on a delivery mission, the Animus Prime Titan Director takes over for mobility research.

## Hardware Components (Bill of Materials)
The catalog gives one estimated budget for the whole build (~$1,800–$2,600); it does not price parts individually.
- Yahboom ROSMASTER X3 Plus ROS2 chassis — 4WD mecanum ground rover
- NVIDIA Jetson Orin Nano Super — primary navigation + routing inference
- Raspberry Pi 5 8GB — mission logic + sensor hub
- RPLIDAR S2 — high-resolution 2D LiDAR for floor SLAM
- Intel RealSense D435i — depth + RGB obstacle detection
- LiPo 10000mAh — 4+ hour operational endurance
- Emergency stop GPIO relay — hardwired to e-stop rail (Aegis-Hold)

## ZenFlow Agents
- VectorShift Autonomous Routing Agent
- Animus Prime Titan Director (mobility R&D mode)
- Prime Shepherd Navigation Task Agent
- ZenFlow Knowledge Keeper (Aegis-Hold)

## n8n Workflows
- Logistics Mission Dispatch — VectorShift routing
- SLAM Map Update Sync — continuous environment mapping
- E-Stop Incident Log — mandatory on any safety halt
- Mission Completion Report — post-delivery to both Directors

## Division Contributions
| Division | Contribution |
|---|---|
| [[Animus Prime Division]] | Chassis, motor control, perception stack, mobility R&D, SLAM + embodied navigation |
| [[VectorShift Division]] | Mission routing logic, delivery coordination, logistics telemetry, indoor route optimization |

## Build Outcome
Dual-intelligence ground rover — Animus Prime mobility R&D platform + VectorShift indoor logistics. Aegis-Hold until e-stop verification complete.

**Est. budget:** ~$1,800–$2,600

## Phase Context
Kiosks, rovers, and labs. Ground-level mobility and human interaction surfaces. Aegis-Hold for all actuation nodes until e-stop verification is complete.

> [!note] Build rule
> Phase 1 funds Phase 2. Phase 2 funds Phase 3. Phase 3 funds Phase 4. Do not build Phase 4 before Phase 1 proves revenue and operating discipline. This applies to both digital and physical nodes.

## Related
- [[Titan Directorate]]
- [[Prime Humanoid R&D]]
- [[Ground Vector]]
- [[Knowledge Keeper]]
- [[Director_Animus_Prime]]
- [[Director_VectorShift]]
- [[Full Synergy Node Catalog]]
- [[Synergy Node Handbook]]
- [[Aegis Protocol]]
