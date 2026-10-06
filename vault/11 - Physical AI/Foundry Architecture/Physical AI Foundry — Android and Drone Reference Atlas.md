---
title: Physical AI Foundry — Android and Drone Reference Atlas
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
# Physical AI Foundry — Android and Drone Reference Atlas

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
5. Androids and Drones: Open-Source CAD +
Hardware Atlas
The android path should begin with subsystems: head, torso, arm, hand, perception mast, mobile base, and e-stop. Full
humanoids come after the local cloud, power, actuation, and safety bench are stable. Drones should begin with a
PX4/ArduPilot development quad before custom payload drones.
Android / Humanoid Options
Platform Type Est. cost Collective AI use case
Asimov v1 Full open-source biped
humanoid
Advanced / high Mechanical CAD, electrical CAD, simulation, and onboard software reference.
Long-horizon Prime Directorate reference.
Berkeley Humanoid Lite Low-cost humanoid Sub-$5k target Modular 3D-printed gearbox, available components, open-source
hardware/software/training framework.
Poppy Humanoid 3D-printed humanoid Variable Research/education humanoid with modular open-source ecosystem.
InMoov Life-size 3D-printed humanoid Parts-driven Best maker android shell for head, torso, arms, hands, public demos.
NimbRo-OP / OP2X Adult humanoid research
platform
High Serious humanoid research CAD/code reference.
Reachy 2 Open-source upper-body
humanoid
High ROS2, URDF, Gazebo, manipulation and human-interaction reference.
Reachy Mini Desktop humanoid kit Kit-based Agentic desk android/head kit for interaction demos.
Otto DIY Small 3D-printed biped Low Starter locomotion and workshop robot kit.
Project OpaNoid 3D-printable humanoid Variable Open STL reference for modular humanoid parts.
Platform Type Est. cost Collective AI use case
Roboto Origin Open full-stack biped
humanoid
~$7k BOM signal Mechanical files, schematics, code, BOM, manufacturing workflow reference.
AGILOped Open humanoid research
platform
Research Emerging high-performance humanoid reference; track, do not start with it.
Amazing Hand 3D-printed humanoid hand <$200 parts target Best first android hand build for manipulation experiments.
DexHand Dexterous robot hand Variable Open-source dexterous hand for humanoid research.
SO-101 / LeRobot 6-axis arm training path ~$200-$400 signal Best embodied AI arm data/control platform; pair leader/follower arms.
reBot-DevArm B601 Open-source robot arm ~$1,200+ signal Higher-end arm with ROS1/ROS2, Python SDK, LeRobot, Isaac Sim/Pinocchio
support signals.
Hiwonder JetArm ROS vision robot arm ~$1,100 Vision arm kit for pick/place and AI interaction.
ROSbot 2 Orin Nano Mobile robot base ~$3,100 Mobile ROS robot with Jetson-class compute option.
ROSMASTER R2 ROS2 rover base ~$650 Lower-cost mobile base for navigation and perception.
Drone / Aerial Robotics Options
Platform Type Est. cost Collective AI use case
PX4 Autopilot Open-source autopilot Free software Core flight-control stack for multirotors, fixed-wing, VTOL, rovers, and
experimental platforms.
ArduPilot Open-source autopilot Free software Mature autopilot stack for copters, planes, rovers, boats, submarines.
Holybro X500 V2 ARF 500mm quad frame kit ~$123 Best first drone hardware base: frame, motors, ESCs, props, power board.
Holybro X500 V2 PX4 Dev Kit Complete dev drone ~$533-$819 Best plug-and-play PX4 development quad with Pixhawk/GPS/telemetry options.
Pixhawk 6C Flight controller ~$131-$195 First autopilot brain for Sky Vector Dev Drone.
Pixhawk 6X Higher-end flight controller ~$167-$321 Higher-reliability/larger drone autopilot path.
Pixhawk Jetson Baseboard Companion bridge ~$396 Bridge autopilot and Jetson for CV/autonomy.
Holybro X650 Dev Kit Larger drone dev kit ~$880-$960 Alibaba
signal
Second drone for payload/sensor headroom after X500.
DroneHub 450mm smart frame Open frame Variable Cheap Pixhawk/ArduPilot research quad.
FunCub QuadPlane VTOL VTOL reference Variable Future VTOL research path.
GAAS Autonomy software stack Free Autonomous VTOL/drone research layer.
Awesome Flying FPV Resource index Free Open hardware/software resource map for flying platforms.
Awesome Drones Resource index Free MAVLink/autopilot tools and ground station resource map.
Pi + Pixhawk DIY pattern Architecture reference ~$300-$900 Community-validated companion-computer approach with YOLO/waypoints.
Obstacle avoidance quad
pattern
Vision drone reference Variable Camera/LiDAR obstacle-avoidance build path.
First Physical AI Prototypes
Prototype Hardware stack Result
ZenShell v0.1 Pi 5, PiSugar, Whisplay, ReSpeaker, Speaker Bonnet, Pi Camera, 3D-printed
shell
Portable voice/display AI shell with local tools
and Knowledge Keeper logging
Vision Sentinel v0.1 Pi 5 or Jetson, AI Camera, Global Shutter Camera, OAK-D/RealSense, NVMe Smart camera/perception node for facilities,
demos, inventory, inspection
Agent Badge v0.1 XIAO ESP32S3 Sense, LiPo, haptic driver, BLE, 3D-printed clip Wearable AI capture/control node
Prime Shell v0.1 InMoov-style torso/head, Jetson, ReSpeaker, cameras, Amazing Hand/SO-101
arm
Talking, seeing, gesturing android shell
Titan Bench Arm v0.1 reBot/SO-101/PAROL/OpenMANIPULATOR, OAK-D/RealSense, Jetson,
ROS2/LeRobot
Embodied AI manipulation bench
Sky Vector Dev Drone v0.1 Holybro X500 V2, Pixhawk 6C, GPS, telemetry, Pi/Jetson companion, AI camera Safe PX4/ArduPilot drone for autonomy
experiments
Aether Link Mesh Relay Drone
v0.1
X500/X650, Pi 5, telemetry, LoRa/mesh payload, antenna mast Mobile communications and field relay
prototype
Terra/Gaia Inspection Drone v0.1 X500/X650, Jetson, AI/depth camera, rangefinder/GPS, later thermal Property, field, construction, and environmental
inspection
```

## Source
- [Collective_AI_Physical_AI_Foundry_Final.pdf](https://drive.google.com/file/d/1pZSHaIg3QjaBn5aKzESwq9zBND7LtshJ/view?usp=drivesdk) — Section 5 — Androids and Drones: Open-Source CAD +. Read in full from Drive on 2026-10-06.

### Source records
- [Collective_AI_Physical_AI_Foundry_Final.pdf](https://drive.google.com/file/d/1pZSHaIg3QjaBn5aKzESwq9zBND7LtshJ/view?usp=drivesdk)

<!-- drive-expansion:7ca1bd3fd1f38262e195 -->
