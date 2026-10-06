---
title: Physical AI Foundry — Purchase Phase Gates
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
# Physical AI Foundry — Purchase Phase Gates

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
6. Purchase Phases and Budget Tiers
Phase Buy / Build Outcome
Phase 1: AI Shell Lab Pi 5, power/cooling, M.2 HAT/NVMe, PiSugar, Whisplay, ReSpeaker, Speaker
Bonnet, Pi Camera, Arduino, soldering/debug basics
ZenShell v0.1 and first wearable/camera
nodes
Phase 2: Perception Lab Jetson Orin Nano Super, OAK-D/RealSense, RPLIDAR, AI Camera, Global
Shutter, Bambu A1 + P1S
Vision Sentinel v0.1 and physical perception
stack
Phase 3: Actuation Lab PCA9685, motor drivers, DYNAMIXEL, emergency stop, bench PSU, robot
chassis, SO-101/Amazing Hand
Prime Shell and Titan Bench Arm path
Phase 4: Drone Lab Holybro X500 V2, Pixhawk 6C, GPS, telemetry, LiPo tools, companion
Pi/Jetson, AI camera
Sky Vector Dev Drone v0.1
Phase 5: Local Cloud / Mesh 30 Mac minis, 10GbE switching, UDM Pro Max, APs, NAS, UPS, rack,
Meshtastic nodes
Private autonomous agent cloud and
hardware mesh
Budget Bands
Tier Estimated spend Capability unlocked
Lean starter ~$1,200-$1,800 Pi shell, Arduino, one printer, basic sensors, soldering/debug basics
Serious Physical AI Lab ~$3,000-$4,500 Pi + Jetson + 2 printers + LiDAR/depth/cameras + bench tools
Prototype Foundry ~$6,000-$9,000 Robotics arm, smart servos, stronger scope, extra printers, larger parts inventory
Drone + Android Bench ~$5,000-$15,000+ PX4 dev drone, robot arm/hand, mobile base, perception stack
Mac Mini Local Cloud + Mesh Variable, likely
$35,000-$75,000+
depending configs
30-node private compute fabric, NAS, 10GbE, rack, UPS, Wi-Fi/LoRa mesh
Top Priority Purchase Order
Rank Purchase Why
1 Network core: UDM Pro Max + Enterprise XG 24 +
rack UPS
Without network/power, the 30 Mac mini cluster becomes unmanaged sprawl.
2 30 Mac mini allocation plan + labels + VLAN map Every department node needs identity before services deploy.
3 Synology DS1825+ + drives Central source of truth for CAD, videos, logs, backups, and local datasets.
4 Raspberry Pi 5 + Jetson Orin Nano Super Edge agent brain and physical AI control/perception.
5 Bambu A1 + P1S Turns specs into enclosures, brackets, chassis, and shells.
6 Audio/camera/wearable kit Makes AI shells interact with the physical world.
7 Robot arm/hand + e-stop bench Embodied AI manipulation without full humanoid risk.
8 Holybro X500 + Pixhawk 6C Safe drone development platform before custom drones.
```

## Source
- [Collective_AI_Physical_AI_Foundry_Final.pdf](https://drive.google.com/file/d/1pZSHaIg3QjaBn5aKzESwq9zBND7LtshJ/view?usp=drivesdk) — Section 6 — Purchase Phases and Budget TiersCOLLECTIVE AI INC / PHYSICAL AI FOUNDRY Architecting a Humane Future. Read in full from Drive on 2026-10-06.

### Source records
- [Collective_AI_Physical_AI_Foundry_Final.pdf](https://drive.google.com/file/d/1pZSHaIg3QjaBn5aKzESwq9zBND7LtshJ/view?usp=drivesdk)

<!-- drive-expansion:2c4ef97375cabd38a292 -->
