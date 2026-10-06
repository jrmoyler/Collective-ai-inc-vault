---
title: Physical AI Foundry — Operating Layers
tags:
- drive-source
- reference-spec
type: spec
owner: JR Moyler (Hataalii)
status: reference-planned
updated: 2026-10-06
source_refs:
- id: 1pZSHaIg3QjaBn5aKzESwq9zBND7LtshJ
  url: https://drive.google.com/file/d/1pZSHaIg3QjaBn5aKzESwq9zBND7LtshJ/view?usp=drivesdk
  title: Collective_AI_Physical_AI_Foundry_Final.pdf
---
# Physical AI Foundry — Operating Layers

> [!warning] Source build specification
> This is a documented architecture and build plan. Provisioning, deployment, uptime, customer counts, hardware ownership and performance targets require live evidence. Source numbering, director codenames, model identifiers and dates remain historical; current [[Agent Tier Registry]], [[Director Codenames]] and division charters take precedence. Physical autonomy remains Aegis-Hold until staged testing and human approval. Hardware prices are source estimates, not current purchase quotes.

## Linked ownership
- [[Animus Prime Division]]
- [[Binary Loom Division]]
- [[ZenFlow Division]]
- [[Foundry Infrastructure Hardware Catalog]]
- [[011 — Physical AI MOC]]

## Full source section

```text
1. Operating Architecture
Layer Name Purpose Primary hardware
0 Governance / Safety Aegis-Hold policy, logs, human gates,
deployment approvals
Admin Mac mini, NAS logs, cameras, e-stop hardware
1 Core Network Secure routing, VLANs, firewall, Wi-Fi, mesh,
device segmentation
UDM Pro Max, 10GbE switch, PoE switch, Wi-Fi 7 APs
2 Mac Mini Local Cloud Department agents, local apps, orchestration,
internal tools
30 Mac minis, Satechi hubs, external NVMe, rack mounts
3 Storage / Data Plane Datasets, vector stores, logs, backups, media,
CAD, model files
Synology DS1825+, HDDs/SSDs, backup drives, UPS
4 Edge Compute AI perception, robotics, camera nodes,
embedded control
Jetson Orin Nano Super, Raspberry Pi 5, ESP32-S3, Arduino
5 Physical I/O Audio, cameras, sensors, motors, servos,
LiDAR, IMU, haptics
Pi AI Camera, OAK-D, RealSense, RPLIDAR, PCA9685, DYNAMIXEL
6 Fabrication Enclosures, brackets, chassis, shells, fixtures Bambu A1, Bambu P1S, Prusa CORE One+, tools and fasteners
7 Robotics / Drones Android subsystems, arms, hands, mobile
bases, drones
InMoov, SO-101, Amazing Hand, Holybro X500, Pixhawk
Core Design Rule
Every physical AI device should be treated as a node with identity, network segment, owner, logs, power profile, update
policy, and shutdown behavior. That makes hardware manageable the same way Collective AI manages digital agents.
```

## Source
- [Collective_AI_Physical_AI_Foundry_Final.pdf](https://drive.google.com/file/d/1pZSHaIg3QjaBn5aKzESwq9zBND7LtshJ/view?usp=drivesdk) — Section 1 — Operating Architecture. Read in full from Drive on 2026-10-06.

### Source records
- [Collective_AI_Physical_AI_Foundry_Final.pdf](https://drive.google.com/file/d/1pZSHaIg3QjaBn5aKzESwq9zBND7LtshJ/view?usp=drivesdk)

<!-- drive-expansion:e4540886913d30b3fefa -->
