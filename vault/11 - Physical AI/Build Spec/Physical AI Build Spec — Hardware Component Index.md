---
title: Physical AI Build Spec — Hardware Component Index
tags:
- physical-ai
- build-spec
- procurement
- bill-of-materials
type: build-spec-index
owner: JR Moyler (Hataalii)
source: Physical AI Build Spec
status: specified
updated: 2026-10-04
---
# Physical AI Build Spec — Hardware Component Index

Cross-reference of every component named in the [[Physical AI Build Spec]], showing which builds use it. Built from the 65 part lists for procurement planning. Quantities and roles are kept as written in each build's list.

> [!info] How to use
> Group purchases by component. Mac mini and Synology NAS lines are shared infrastructure; budgets marked "beyond Mac mini infrastructure" exclude them.

## Components by number of builds

| Component | Builds |
|---|---|
| Raspberry Pi 5 | 46 |
| Raspberry Pi M.2 HAT+ + NVMe SSD | 34 |
| 3D print — Bambu A1 | 27 |
| NVIDIA Jetson Orin Nano Super | 27 |
| Whisplay HAT | 27 |
| 3D print — Bambu P1S | 22 |
| ReSpeaker 4-Mic Array v2.0 | 15 |
| Adafruit I2S (3W Stereo) Speaker Bonnet | 14 |
| Adafruit DRV2605L Haptic Controller | 11 |
| Pi Camera Module 3 | 11 |
| LILYGO T-Beam Meshtastic | 10 |
| PowerBoost 1000 Charger + LiPo | 10 |
| Arduino Nano 33 BLE Sense Rev2 | 9 |
| Holybro X500 V2 (ARF / PX4 Dev Kit) | 9 |
| Raspberry Pi AI Camera (Sony IMX500) | 9 |
| Adafruit Feather nRF52840 Sense | 8 |
| Arducam 64MP Hawkeye Camera | 8 |
| PiSugar 3 Plus Battery | 8 |
| Emergency stop + fused rails | 7 |
| Luxonis OAK-D Lite | 7 |
| Synology NAS (DS1825+ / share / partition) | 7 |
| 3D print — Prusa CORE One+ | 5 |
| Circuit Playground Bluefruit | 5 |
| IMU BNO085 | 5 |
| Labeled Cat6A VLAN drop | 5 |
| LiPo battery + XT60 harness | 5 |
| Pi Camera Module 3 Wide | 5 |
| 12V battery + solar input | 4 |
| Bench power supply | 4 |
| Heltec V3 Meshtastic | 4 |
| IMU ICM-20948 | 4 |
| LILYGO T-Deck Meshtastic | 4 |
| Logic analyzer (Saleae / clone) | 4 |
| Mac mini M4 24GB | 4 |
| Pixhawk 6C Flight Controller | 4 |
| RPLIDAR A1M8 | 4 |
| ReSpeaker 2-Mics Pi HAT | 4 |
| Seeed XIAO ESP32S3 Sense | 4 |
| DYNAMIXEL XL330 smart servos | 3 |
| Directional LoRa antennas | 3 |
| Geekworm X1202 UPS HAT | 3 |
| PCA9685 16-channel servo driver | 3 |
| RealSense D435i | 3 |
| Amazing Hand | 2 |
| Arduino Starter Kit | 2 |
| CyberPower Rackmount UPS 1500VA | 2 |
| Cytron MD13S motor driver | 2 |
| Holybro GPS + telemetry | 2 |
| Mac mini M4 Pro 48GB | 2 |
| Pi Global Shutter Camera | 2 |
| PoE injector (UniFi powered) | 2 |
| ROSMASTER R2 ROS2 rover base | 2 |
| Soldering station + hot air | 2 |
| UniFi Dream Machine Pro Max | 2 |
| UniFi Enterprise XG 24 | 2 |
| Arduino Plug and Make Kit | 1 |
| Bambu Lab A1 printer | 1 |
| Bambu Lab P1S printer | 1 |
| Calipers + rotary tool + deburring kit | 1 |
| Heat-set inserts + M2/M3 screw kit | 1 |
| InMoov 3D-printed head + torso | 1 |
| JST/Dupont/XT30/XT60/ferrule/heat-shrink kit | 1 |
| M5Stack ATOMS3R Camera Kit | 1 |
| Mac mini M4 Pro 64GB | 1 |
| Oscilloscope (Siglent/Rigol class) | 1 |
| PLA/PETG/TPU/ASA filament inventory | 1 |
| Rack + PDU + patch panel | 1 |
| SO-101 / LeRobot arm (leader + follower) | 1 |
| Seeed Grove Vision AI Module V2 | 1 |
| Sonnet RackMac mini rack mount | 1 |
| Stereo 3W 4-ohm speakers | 1 |
| UniFi Enterprise 24 PoE | 1 |
| UniFi U7 Pro Max | 1 |

## Where each component is used

### Raspberry Pi 5

- [[P-01 Aegis Command Station (Build Spec)]] — Raspberry Pi 5 + Whisplay HAT (ambient ZenFlow shell)
- [[P-02 Herald Broadcast Node]] — Raspberry Pi 5 8GB
- [[P-03 Mesh Sentinel Array (Build Spec)]] — Raspberry Pi 5 (MQTT bridge gateway)
- [[P-04 Zenith Oracle Shell]] — Raspberry Pi 5 8GB
- [[ZF-01 Synaptic Relay Shell]] — Raspberry Pi 5 8GB
- [[ZF-02 Knowledge Keeper Vault]] — Raspberry Pi 5 (indexer daemon)
- [[ZF-03 Agent Eval Bench (Build Spec)]] — Raspberry Pi 5 (test driver)
- [[TC-02 Client Presentation Node]] — Raspberry Pi 5 8GB
- [[TC-03 Strategy Audit Scanner]] — Raspberry Pi 5 (UI controller)
- [[HL-01 Atlas Learning Kiosk (Build Spec)]] — Raspberry Pi 5 8GB
- [[HL-02 Instructor Capture Node (Build Spec)]] — Raspberry Pi 5 8GB (×2 dual-camera)
- [[NL-01 Resonance Studio Node (Build Spec)]] — Raspberry Pi 5 (UI controller)
- [[NL-02 Vision Director Node (Build Spec)]] — Raspberry Pi 5 8GB (×2 — dual controller)
- [[TA-02 Home Sentinel Node]] — Raspberry Pi 5 8GB
- [[TA-03 Axis Market Scan Node]] — Raspberry Pi 5 8GB
- [[VH-01 Helix Bio Scanner]] — Raspberry Pi 5 (gateway + display)
- [[VH-03 Bio-Digital Twin Station]] — Raspberry Pi 5 (display/UI)
- [[BL-01 Glyph Forge Station]] — Raspberry Pi 5 (print queue controller)
- [[BL-02 Natural Script Compiler Node]] — Raspberry Pi 5 (test driver)
- [[QL-01 Aurum Trading Terminal (Build Spec)]] — Raspberry Pi 5 (display controller)
- [[QL-02 Chain Ledger Node (Build Spec)]] — Raspberry Pi 5 (UI + wallet display)
- [[KE-01 Apex Motion Cage (Build Spec)]] — Raspberry Pi 5 8GB (×2)
- [[KE-03 Team OS Field Station (Build Spec)]] — Raspberry Pi 5 8GB
- [[OA-01 Cipher Guardian Node]] — Raspberry Pi 5 (audit logger)
- [[OA-03 Forensic Evidence Node (Build Spec)]] — Raspberry Pi 5 (controller)
- [[CC-01 Civic Broadcast Kiosk]] — Raspberry Pi 5 8GB
- [[CC-02 Equity Badge Kit]] — Raspberry Pi 5 (BLE gateway)
- [[CC-03 Digital Equity Field Kit]] — Raspberry Pi 5 8GB
- [[AL-01 Aether Relay Mesh]] — Raspberry Pi 5 (MQTT gateway)
- [[AL-02 Babel Translation Node]] — Raspberry Pi 5 (display controller)
- [[AL-03 Mesh Relay Drone]] — Raspberry Pi 5 (companion + mesh payload)
- [[GS-01 Gaia Crop Sentinel]] — Raspberry Pi 5 8GB
- [[VS-01 Sky Vector Dev Drone (Build Spec)]] — Emergency stop + ground station Pi 5
- [[VS-03 Logistics Mesh Node (Build Spec)]] — Raspberry Pi 5 (MQTT bridge)
- [[JG-01 Juris Scan Terminal]] — Raspberry Pi 5 (UI controller)
- [[JG-02 Compliance Audit Node]] — Raspberry Pi 5 (audit display)
- [[JG-03 Evidence Vault Node]] — Raspberry Pi 5 8GB (air-gap controller)
- [[SV-01 Signal Dashboard Node]] — Raspberry Pi 5 8GB
- [[SV-02 Conversion Capture Node]] — Raspberry Pi 5 8GB
- [[NN-01 Axiom Field Kit]] — Raspberry Pi 5 8GB
- [[NN-02 Nomad Broadcast Node]] — Raspberry Pi 5 8GB
- [[NN-03 Visa Intel Terminal]] — Raspberry Pi 5 8GB (controller)
- [[EC-01 Eon Longevity Station]] — Raspberry Pi 5 (gateway + display)
- [[EC-03 Protocol Scan Node]] — Raspberry Pi 5 8GB
- [[CM-01 Cognara Behavior Node]] — Raspberry Pi 5 8GB
- [[CM-03 Cognitive Coaching Shell (Build Spec)]] — Raspberry Pi 5 8GB

### Raspberry Pi M.2 HAT+ + NVMe SSD

- [[P-02 Herald Broadcast Node]] — Raspberry Pi M.2 HAT+ + 1TB NVMe
- [[P-04 Zenith Oracle Shell]] — Raspberry Pi M.2 HAT+ + 1TB NVMe
- [[P-05 Atlas Perception Tower (Build Spec)]] — Raspberry Pi M.2 HAT+ + NVMe SSD
- [[ZF-01 Synaptic Relay Shell]] — Pi M.2 HAT+ + 512GB NVMe
- [[ZF-02 Knowledge Keeper Vault]] — Raspberry Pi M.2 HAT+ + 2TB NVMe
- [[TC-02 Client Presentation Node]] — Pi M.2 HAT+ + 1TB NVMe
- [[TC-03 Strategy Audit Scanner]] — Pi M.2 HAT+ + 1TB NVMe
- [[HL-01 Atlas Learning Kiosk (Build Spec)]] — Pi M.2 HAT+ + 1TB NVMe
- [[HL-02 Instructor Capture Node (Build Spec)]] — Pi M.2 HAT+ + 2TB NVMe
- [[NL-01 Resonance Studio Node (Build Spec)]] — Pi M.2 HAT+ + 2TB NVMe
- [[NL-02 Vision Director Node (Build Spec)]] — Pi M.2 HAT+ + 2TB NVMe
- [[TA-02 Home Sentinel Node]] — Raspberry Pi M.2 HAT+ + 512GB NVMe
- [[TA-03 Axis Market Scan Node]] — Pi M.2 HAT+ + 1TB NVMe
- [[VH-01 Helix Bio Scanner]] — Pi M.2 HAT+ + 2TB NVMe
- [[VH-03 Bio-Digital Twin Station]] — Pi M.2 HAT+ + 2TB NVMe
- [[BL-02 Natural Script Compiler Node]] — Pi M.2 HAT+ + 2TB NVMe
- [[QL-01 Aurum Trading Terminal (Build Spec)]] — Pi M.2 HAT+ + 2TB NVMe
- [[QL-02 Chain Ledger Node (Build Spec)]] — Pi M.2 HAT+ + 2TB NVMe
- [[KE-01 Apex Motion Cage (Build Spec)]] — Pi M.2 HAT+ + NVMe SSD
- [[OA-02 Sentinel Prime Tower (Build Spec)]] — Pi M.2 HAT+ + 1TB NVMe
- [[OA-03 Forensic Evidence Node (Build Spec)]] — Pi M.2 HAT+ + 2TB NVMe (encrypted)
- [[CC-01 Civic Broadcast Kiosk]] — Pi M.2 HAT+ + 1TB NVMe
- [[AL-02 Babel Translation Node]] — Pi M.2 HAT+ + 1TB NVMe
- [[JG-01 Juris Scan Terminal]] — Pi M.2 HAT+ + 2TB NVMe
- [[JG-02 Compliance Audit Node]] — Pi M.2 HAT+ + 2TB NVMe (encrypted)
- [[JG-03 Evidence Vault Node]] — Pi M.2 HAT+ + 2TB NVMe (encrypted)
- [[SV-01 Signal Dashboard Node]] — Pi M.2 HAT+ + NVMe
- [[SV-02 Conversion Capture Node]] — Pi M.2 HAT+ + 512GB NVMe
- [[NN-02 Nomad Broadcast Node]] — Pi M.2 HAT+ + 1TB NVMe
- [[NN-03 Visa Intel Terminal]] — Pi M.2 HAT+ + 1TB NVMe
- [[EC-01 Eon Longevity Station]] — Pi M.2 HAT+ + 2TB NVMe
- [[EC-03 Protocol Scan Node]] — Pi M.2 HAT+ + 1TB NVMe
- [[CM-01 Cognara Behavior Node]] — Pi M.2 HAT+ + 1TB NVMe
- [[CM-03 Cognitive Coaching Shell (Build Spec)]] — Pi M.2 HAT+ + 1TB NVMe

### 3D print — Bambu A1

- [[P-02 Herald Broadcast Node]] — 3D-printed Bambu A1 branded enclosure shell
- [[P-04 Zenith Oracle Shell]] — 3D-printed Bambu A1 handle-grip carry shell (PETG)
- [[ZF-01 Synaptic Relay Shell]] — 3D-printed Bambu A1 desk pod
- [[ZF-02 Knowledge Keeper Vault]] — 3D-printed Bambu A1 enclosure
- [[TC-01 Herald Wearable Badge]] — 3D-printed Bambu A1 TPU badge clip
- [[TC-02 Client Presentation Node]] — 3D-printed Bambu A1 conference wedge
- [[HL-03 Cohort Wearable Kit]] — 3D-printed Bambu A1 badge shells (TPU)
- [[NL-03 Creator Nexus Badge]] — 3D-printed Bambu A1 TPU creator badge
- [[TA-02 Home Sentinel Node]] — 3D-printed Bambu A1 architectural enclosure (PETG white)
- [[TA-03 Axis Market Scan Node]] — 3D-printed Bambu A1 ruggedized field shell (TPU bumper)
- [[VH-01 Helix Bio Scanner]] — 3D-printed Bambu A1 clinical enclosure (PETG)
- [[VH-02 Neuro Pulse Wearable]] — 3D-printed Bambu A1 TPU/PETG wristband shell
- [[QL-03 Alpha Signal Wearable]] — 3D-printed Bambu A1 TPU wristband enclosure
- [[KE-02 Kinetic IQ Wearable (Build Spec)]] — 3D-printed Bambu A1 PETG/TPU sport enclosure
- [[KE-03 Team OS Field Station (Build Spec)]] — 3D-printed Bambu A1 ruggedized field case
- [[CC-02 Equity Badge Kit]] — 3D-printed Bambu A1 TPU badge shells (×10)
- [[CC-03 Digital Equity Field Kit]] — 3D-printed Bambu A1 carry case (PETG)
- [[SV-01 Signal Dashboard Node]] — 3D-printed Bambu A1 wall-mount panel
- [[SV-02 Conversion Capture Node]] — 3D-printed Bambu A1 touchpoint enclosure
- [[SV-03 Ad Intel Wearable]] — 3D-printed Bambu A1 TPU wrist enclosure
- [[NN-01 Axiom Field Kit]] — 3D-printed Bambu A1 ruggedized carry shell (TPU bumper)
- [[NN-02 Nomad Broadcast Node]] — 3D-printed Bambu A1 travel wedge (PETG)
- [[EC-01 Eon Longevity Station]] — 3D-printed Bambu A1 clinical enclosure (PETG)
- [[EC-02 Lifespan Wearable]] — 3D-printed Bambu A1 PETG/TPU wristband
- [[EC-03 Protocol Scan Node]] — 3D-printed Bambu A1 document scan tray
- [[CM-01 Cognara Behavior Node]] — 3D-printed Bambu A1 behavioral lab enclosure
- [[CM-02 Habit Architecture Wearable (Build Spec)]] — 3D-printed Bambu A1 PETG/TPU wristband

### NVIDIA Jetson Orin Nano Super

- [[P-05 Atlas Perception Tower (Build Spec)]] — NVIDIA Jetson Orin Nano Super Developer Kit
- [[ZF-03 Agent Eval Bench (Build Spec)]] — NVIDIA Jetson Orin Nano Super
- [[TC-03 Strategy Audit Scanner]] — NVIDIA Jetson Orin Nano Super
- [[HL-02 Instructor Capture Node (Build Spec)]] — NVIDIA Jetson Orin Nano Super (transcription)
- [[NL-01 Resonance Studio Node (Build Spec)]] — NVIDIA Jetson Orin Nano Super
- [[NL-02 Vision Director Node (Build Spec)]] — NVIDIA Jetson Orin Nano Super (inference + tagging)
- [[TA-01 Terra Inspector Drone]] — NVIDIA Jetson Orin Nano Super
- [[VH-01 Helix Bio Scanner]] — NVIDIA Jetson Orin Nano Super
- [[VH-03 Bio-Digital Twin Station]] — NVIDIA Jetson Orin Nano Super (sensor gateway)
- [[BL-02 Natural Script Compiler Node]] — NVIDIA Jetson Orin Nano Super (inference)
- [[QL-01 Aurum Trading Terminal (Build Spec)]] — NVIDIA Jetson Orin Nano Super
- [[KE-01 Apex Motion Cage (Build Spec)]] — NVIDIA Jetson Orin Nano Super
- [[OA-02 Sentinel Prime Tower (Build Spec)]] — NVIDIA Jetson Orin Nano Super
- [[OA-03 Forensic Evidence Node (Build Spec)]] — NVIDIA Jetson Orin Nano Super
- [[AL-02 Babel Translation Node]] — NVIDIA Jetson Orin Nano Super
- [[GS-02 Field Rover Base]] — NVIDIA Jetson Orin Nano Super
- [[GS-03 Gaia Inspection Drone]] — NVIDIA Jetson Orin Nano Super
- [[VS-01 Sky Vector Dev Drone (Build Spec)]] — NVIDIA Jetson Orin Nano Super (companion)
- [[VS-02 Ground Vector Rover (Build Spec)]] — NVIDIA Jetson Orin Nano Super
- [[AP-01 Prime Shell v0.1 (Build Spec)]] — NVIDIA Jetson Orin Nano Super
- [[AP-02 Titan Bench Arm (Build Spec)]] — NVIDIA Jetson Orin Nano Super
- [[AP-03 Dexterous Hand Node (Build Spec)]] — NVIDIA Jetson Orin Nano Super
- [[JG-01 Juris Scan Terminal]] — NVIDIA Jetson Orin Nano Super
- [[NN-03 Visa Intel Terminal]] — NVIDIA Jetson Orin Nano Super (inference)
- [[EC-01 Eon Longevity Station]] — NVIDIA Jetson Orin Nano Super
- [[EC-03 Protocol Scan Node]] — NVIDIA Jetson Orin Nano Super (OCR + categorization)
- [[CM-03 Cognitive Coaching Shell (Build Spec)]] — NVIDIA Jetson Orin Nano Super (local model inference)

### Whisplay HAT

- [[P-01 Aegis Command Station (Build Spec)]] — Raspberry Pi 5 + Whisplay HAT (ambient ZenFlow shell)
- [[P-02 Herald Broadcast Node]] — Whisplay HAT (display + mic + RGB LEDs + buttons)
- [[P-04 Zenith Oracle Shell]] — Whisplay HAT
- [[ZF-01 Synaptic Relay Shell]] — Whisplay HAT
- [[ZF-02 Knowledge Keeper Vault]] — Whisplay HAT (status display)
- [[TC-02 Client Presentation Node]] — Whisplay HAT
- [[TC-03 Strategy Audit Scanner]] — Whisplay HAT
- [[HL-01 Atlas Learning Kiosk (Build Spec)]] — Whisplay HAT
- [[NL-01 Resonance Studio Node (Build Spec)]] — Whisplay HAT
- [[VH-01 Helix Bio Scanner]] — Whisplay HAT
- [[VH-03 Bio-Digital Twin Station]] — Whisplay HAT
- [[QL-01 Aurum Trading Terminal (Build Spec)]] — Whisplay HAT
- [[QL-02 Chain Ledger Node (Build Spec)]] — Whisplay HAT
- [[KE-03 Team OS Field Station (Build Spec)]] — Whisplay HAT
- [[CC-01 Civic Broadcast Kiosk]] — Whisplay HAT
- [[CC-02 Equity Badge Kit]] — Whisplay HAT (gateway status display)
- [[CC-03 Digital Equity Field Kit]] — Whisplay HAT
- [[AL-02 Babel Translation Node]] — Whisplay HAT
- [[JG-01 Juris Scan Terminal]] — Whisplay HAT
- [[JG-02 Compliance Audit Node]] — Whisplay HAT
- [[SV-01 Signal Dashboard Node]] — Whisplay HAT
- [[SV-02 Conversion Capture Node]] — Whisplay HAT
- [[NN-01 Axiom Field Kit]] — Whisplay HAT
- [[NN-03 Visa Intel Terminal]] — Whisplay HAT
- [[EC-01 Eon Longevity Station]] — Whisplay HAT
- [[CM-01 Cognara Behavior Node]] — Whisplay HAT
- [[CM-03 Cognitive Coaching Shell (Build Spec)]] — Whisplay HAT (display + ambient UI)

### 3D print — Bambu P1S

- [[P-03 Mesh Sentinel Array (Build Spec)]] — Waterproof 3D-printed Bambu P1S ASA node enclosures
- [[TC-03 Strategy Audit Scanner]] — 3D-printed Bambu P1S document tray
- [[HL-02 Instructor Capture Node (Build Spec)]] — 3D-printed Bambu P1S ceiling/desk mount
- [[NL-01 Resonance Studio Node (Build Spec)]] — 3D-printed Bambu P1S studio wedge
- [[NL-02 Vision Director Node (Build Spec)]] — 3D-printed Bambu P1S multi-mount rig
- [[TA-01 Terra Inspector Drone]] — 3D-printed Bambu P1S payload bay
- [[VH-03 Bio-Digital Twin Station]] — 3D-printed Bambu P1S workstation enclosure
- [[QL-01 Aurum Trading Terminal (Build Spec)]] — 3D-printed Bambu P1S terminal enclosure
- [[KE-01 Apex Motion Cage (Build Spec)]] — 3D-printed Bambu P1S sensor brackets + mounts
- [[OA-03 Forensic Evidence Node (Build Spec)]] — 3D-printed Bambu P1S forensic case enclosure
- [[AL-01 Aether Relay Mesh]] — Waterproof 3D-printed Bambu P1S ASA enclosures
- [[AL-02 Babel Translation Node]] — 3D-printed Bambu P1S translation terminal
- [[AL-03 Mesh Relay Drone]] — 3D-printed Bambu P1S payload enclosure
- [[GS-01 Gaia Crop Sentinel]] — 3D-printed Bambu P1S ASA outdoor enclosure
- [[VS-03 Logistics Mesh Node (Build Spec)]] — Waterproof 3D-printed Bambu P1S ASA enclosure
- [[AP-01 Prime Shell v0.1 (Build Spec)]] — InMoov 3D-printed head + torso (Bambu P1S + Prusa CORE One+)
- [[AP-02 Titan Bench Arm (Build Spec)]] — 3D-printed Bambu P1S arm mount
- [[AP-03 Dexterous Hand Node (Build Spec)]] — 3D-printed Bambu P1S wrist mount + fixture
- [[JG-01 Juris Scan Terminal]] — 3D-printed Bambu P1S document tray + enclosure
- [[JG-03 Evidence Vault Node]] — 3D-printed Bambu P1S secure enclosure
- [[NN-03 Visa Intel Terminal]] — 3D-printed Bambu P1S document tray
- [[CM-03 Cognitive Coaching Shell (Build Spec)]] — 3D-printed Bambu P1S desk coaching shell

### ReSpeaker 4-Mic Array v2.0

- [[P-01 Aegis Command Station (Build Spec)]] — ReSpeaker 4-Mic Array v2.0
- [[P-02 Herald Broadcast Node]] — ReSpeaker 4-Mic Array v2.0
- [[P-04 Zenith Oracle Shell]] — ReSpeaker 4-Mic Array v2.0
- [[TC-02 Client Presentation Node]] — ReSpeaker 4-Mic Array v2.0
- [[HL-01 Atlas Learning Kiosk (Build Spec)]] — ReSpeaker 4-Mic Array v2.0
- [[HL-02 Instructor Capture Node (Build Spec)]] — ReSpeaker 4-Mic Array v2.0
- [[NL-01 Resonance Studio Node (Build Spec)]] — ReSpeaker 4-Mic Array v2.0
- [[KE-03 Team OS Field Station (Build Spec)]] — ReSpeaker 4-Mic Array v2.0
- [[CC-01 Civic Broadcast Kiosk]] — ReSpeaker 4-Mic Array v2.0
- [[CC-03 Digital Equity Field Kit]] — ReSpeaker 4-Mic Array v2.0
- [[AL-02 Babel Translation Node]] — ReSpeaker 4-Mic Array v2.0
- [[AP-01 Prime Shell v0.1 (Build Spec)]] — ReSpeaker 4-Mic Array v2.0
- [[NN-02 Nomad Broadcast Node]] — ReSpeaker 4-Mic Array v2.0
- [[CM-01 Cognara Behavior Node]] — ReSpeaker 4-Mic Array v2.0 (voice tone capture)
- [[CM-03 Cognitive Coaching Shell (Build Spec)]] — ReSpeaker 4-Mic Array v2.0

### Adafruit I2S (3W Stereo) Speaker Bonnet

- [[P-02 Herald Broadcast Node]] — Adafruit I2S 3W Stereo Speaker Bonnet
- [[P-04 Zenith Oracle Shell]] — Adafruit I2S 3W Stereo Speaker Bonnet
- [[ZF-01 Synaptic Relay Shell]] — Adafruit I2S Speaker Bonnet
- [[TC-02 Client Presentation Node]] — Adafruit I2S Speaker Bonnet
- [[HL-01 Atlas Learning Kiosk (Build Spec)]] — Adafruit I2S Speaker Bonnet
- [[NL-01 Resonance Studio Node (Build Spec)]] — Adafruit I2S 3W Stereo Speaker Bonnet
- [[QL-01 Aurum Trading Terminal (Build Spec)]] — Adafruit I2S Speaker Bonnet
- [[CC-01 Civic Broadcast Kiosk]] — Adafruit I2S Speaker Bonnet + speakers
- [[CC-03 Digital Equity Field Kit]] — Adafruit I2S Speaker Bonnet
- [[AL-02 Babel Translation Node]] — Adafruit I2S Speaker Bonnet
- [[AP-01 Prime Shell v0.1 (Build Spec)]] — Adafruit I2S Speaker Bonnet
- [[SV-01 Signal Dashboard Node]] — Adafruit I2S Speaker Bonnet
- [[NN-02 Nomad Broadcast Node]] — Adafruit I2S Speaker Bonnet
- [[CM-03 Cognitive Coaching Shell (Build Spec)]] — Adafruit I2S Speaker Bonnet

### Adafruit DRV2605L Haptic Controller

- [[TC-01 Herald Wearable Badge]] — Adafruit DRV2605L Haptic Controller
- [[HL-03 Cohort Wearable Kit]] — Adafruit DRV2605L Haptic Controller (×6)
- [[NL-03 Creator Nexus Badge]] — Adafruit DRV2605L Haptic Controller
- [[VH-02 Neuro Pulse Wearable]] — Adafruit DRV2605L Haptic Controller
- [[QL-03 Alpha Signal Wearable]] — Adafruit DRV2605L Haptic Controller
- [[KE-02 Kinetic IQ Wearable (Build Spec)]] — Adafruit DRV2605L Haptic Controller
- [[CC-02 Equity Badge Kit]] — Adafruit DRV2605L Haptic Controller (×10)
- [[SV-03 Ad Intel Wearable]] — Adafruit DRV2605L Haptic Controller
- [[NN-01 Axiom Field Kit]] — Adafruit DRV2605L Haptic Controller
- [[EC-02 Lifespan Wearable]] — Adafruit DRV2605L Haptic Controller
- [[CM-02 Habit Architecture Wearable (Build Spec)]] — Adafruit DRV2605L Haptic Controller

### Pi Camera Module 3

- [[P-02 Herald Broadcast Node]] — Pi Camera Module 3 (presence trigger)
- [[P-04 Zenith Oracle Shell]] — Pi Camera Module 3
- [[ZF-01 Synaptic Relay Shell]] — Pi Camera Module 3
- [[HL-01 Atlas Learning Kiosk (Build Spec)]] — Pi Camera Module 3
- [[NL-02 Vision Director Node (Build Spec)]] — Pi Camera Module 3 (×2)
- [[QL-01 Aurum Trading Terminal (Build Spec)]] — Pi Camera Module 3 (QR scan)
- [[CC-01 Civic Broadcast Kiosk]] — Pi Camera Module 3
- [[SV-01 Signal Dashboard Node]] — Pi Camera Module 3 (presence trigger)
- [[SV-02 Conversion Capture Node]] — Pi Camera Module 3 (QR + presence)
- [[NN-01 Axiom Field Kit]] — Pi Camera Module 3
- [[CM-01 Cognara Behavior Node]] — Pi Camera Module 3 (facial context, opt-in only)

### LILYGO T-Beam Meshtastic

- [[P-03 Mesh Sentinel Array (Build Spec)]] — LILYGO T-Beam Meshtastic nodes (×4 indoor/outdoor)
- [[TA-03 Axis Market Scan Node]] — LILYGO T-Beam Meshtastic (GPS + LoRa)
- [[KE-03 Team OS Field Station (Build Spec)]] — LILYGO T-Beam Meshtastic (field comms)
- [[AL-01 Aether Relay Mesh]] — LILYGO T-Beam Meshtastic (×3)
- [[AL-03 Mesh Relay Drone]] — LILYGO T-Beam Meshtastic (aerial mesh node)
- [[GS-02 Field Rover Base]] — LILYGO T-Beam Meshtastic (field mesh uplink)
- [[VS-01 Sky Vector Dev Drone (Build Spec)]] — LILYGO T-Beam Meshtastic (mesh telemetry)
- [[VS-02 Ground Vector Rover (Build Spec)]] — LILYGO T-Beam Meshtastic (route comms)
- [[VS-03 Logistics Mesh Node (Build Spec)]] — LILYGO T-Beam Meshtastic (GPS + LoRa)
- [[NN-02 Nomad Broadcast Node]] — LILYGO T-Beam Meshtastic

### PowerBoost 1000 Charger + LiPo

- [[TC-01 Herald Wearable Badge]] — PowerBoost 1000 Charger + LiPo
- [[HL-03 Cohort Wearable Kit]] — PowerBoost 1000 Charger + LiPo (×6)
- [[NL-03 Creator Nexus Badge]] — PowerBoost 1000 + LiPo
- [[VH-02 Neuro Pulse Wearable]] — PowerBoost 1000 Charger + LiPo
- [[QL-03 Alpha Signal Wearable]] — PowerBoost 1000 Charger + LiPo
- [[KE-02 Kinetic IQ Wearable (Build Spec)]] — PowerBoost 1000 + LiPo
- [[CC-02 Equity Badge Kit]] — PowerBoost 1000 + LiPo (×10)
- [[SV-03 Ad Intel Wearable]] — PowerBoost 1000 + LiPo
- [[EC-02 Lifespan Wearable]] — PowerBoost 1000 + LiPo
- [[CM-02 Habit Architecture Wearable (Build Spec)]] — PowerBoost 1000 + LiPo

### Arduino Nano 33 BLE Sense Rev2

- [[HL-03 Cohort Wearable Kit]] — Arduino Nano 33 BLE Sense Rev2 (×6 per cohort)
- [[VH-01 Helix Bio Scanner]] — Arduino Nano 33 BLE Sense Rev2
- [[VH-02 Neuro Pulse Wearable]] — Arduino Nano 33 BLE Sense Rev2
- [[KE-01 Apex Motion Cage (Build Spec)]] — Arduino Nano 33 BLE Sense Rev2
- [[KE-02 Kinetic IQ Wearable (Build Spec)]] — Arduino Nano 33 BLE Sense Rev2
- [[EC-01 Eon Longevity Station]] — Arduino Nano 33 BLE Sense Rev2
- [[EC-02 Lifespan Wearable]] — Arduino Nano 33 BLE Sense Rev2
- [[CM-01 Cognara Behavior Node]] — Arduino Nano 33 BLE Sense Rev2
- [[CM-02 Habit Architecture Wearable (Build Spec)]] — Arduino Nano 33 BLE Sense Rev2

### Holybro X500 V2 (ARF / PX4 Dev Kit)

- [[P-05 Atlas Perception Tower (Build Spec)]] — Raspberry Pi AI Camera (Sony IMX500, on-sensor AI)
- [[TA-01 Terra Inspector Drone]] — Holybro X500 V2 ARF Kit
- [[TA-02 Home Sentinel Node]] — Pi AI Camera (Sony IMX500)
- [[OA-02 Sentinel Prime Tower (Build Spec)]] — Pi AI Camera (Sony IMX500)
- [[AL-03 Mesh Relay Drone]] — Holybro X500 V2 ARF Kit
- [[GS-03 Gaia Inspection Drone]] — Holybro X500 V2 ARF Kit
- [[VS-01 Sky Vector Dev Drone (Build Spec)]] — Holybro X500 V2 PX4 Dev Kit
- [[SV-02 Conversion Capture Node]] — Pi AI Camera (Sony IMX500, on-sensor scan)
- [[EC-03 Protocol Scan Node]] — Pi AI Camera (IMX500, on-sensor tag)

### Raspberry Pi AI Camera (Sony IMX500)

- [[P-05 Atlas Perception Tower (Build Spec)]] — Raspberry Pi AI Camera (Sony IMX500, on-sensor AI)
- [[NL-02 Vision Director Node (Build Spec)]] — Pi AI Camera (scene tagging)
- [[TA-01 Terra Inspector Drone]] — Pi AI Camera
- [[TA-02 Home Sentinel Node]] — Pi AI Camera (Sony IMX500)
- [[OA-02 Sentinel Prime Tower (Build Spec)]] — Pi AI Camera (Sony IMX500)
- [[GS-03 Gaia Inspection Drone]] — Pi AI Camera (field AI inspection)
- [[VS-01 Sky Vector Dev Drone (Build Spec)]] — Pi AI Camera
- [[SV-02 Conversion Capture Node]] — Pi AI Camera (Sony IMX500, on-sensor scan)
- [[EC-03 Protocol Scan Node]] — Pi AI Camera (IMX500, on-sensor tag)

### Adafruit Feather nRF52840 Sense

- [[TC-01 Herald Wearable Badge]] — Adafruit Feather nRF52840 Sense
- [[VH-01 Helix Bio Scanner]] — Adafruit Feather nRF52840 Sense
- [[QL-03 Alpha Signal Wearable]] — Adafruit Feather nRF52840 Sense
- [[KE-02 Kinetic IQ Wearable (Build Spec)]] — Adafruit Feather nRF52840 Sense
- [[SV-03 Ad Intel Wearable]] — Adafruit Feather nRF52840 Sense
- [[EC-01 Eon Longevity Station]] — Adafruit Feather nRF52840 Sense
- [[EC-02 Lifespan Wearable]] — Adafruit Feather nRF52840 Sense
- [[CM-02 Habit Architecture Wearable (Build Spec)]] — Adafruit Feather nRF52840 Sense

### Arducam 64MP Hawkeye Camera

- [[TC-03 Strategy Audit Scanner]] — Arducam 64MP Hawkeye Camera
- [[NL-02 Vision Director Node (Build Spec)]] — Arducam 64MP Hawkeye Camera (hero close-up)
- [[TA-03 Axis Market Scan Node]] — Arducam 64MP Hawkeye Camera
- [[OA-03 Forensic Evidence Node (Build Spec)]] — Arducam 64MP Hawkeye Camera
- [[JG-01 Juris Scan Terminal]] — Arducam 64MP Hawkeye Camera
- [[JG-03 Evidence Vault Node]] — Arducam 64MP Hawkeye Camera (document capture)
- [[NN-03 Visa Intel Terminal]] — Arducam 64MP Hawkeye Camera (document scan)
- [[EC-03 Protocol Scan Node]] — Arducam 64MP Hawkeye Camera

### PiSugar 3 Plus Battery

- [[P-02 Herald Broadcast Node]] — PiSugar 3 Plus Battery
- [[P-04 Zenith Oracle Shell]] — PiSugar 3 Plus Battery
- [[TA-02 Home Sentinel Node]] — PiSugar 3 Plus Battery
- [[TA-03 Axis Market Scan Node]] — PiSugar 3 Plus Battery
- [[KE-03 Team OS Field Station (Build Spec)]] — PiSugar 3 Plus Battery
- [[CC-03 Digital Equity Field Kit]] — PiSugar 3 Plus Battery
- [[NN-01 Axiom Field Kit]] — PiSugar 3 Plus Battery
- [[NN-02 Nomad Broadcast Node]] — PiSugar 3 Plus Battery

### Emergency stop + fused rails

- [[BL-03 Infrastructure Wire Bench]] — Emergency stop switches + fuses (inventory)
- [[GS-02 Field Rover Base]] — Emergency stop switch + fused rails
- [[VS-01 Sky Vector Dev Drone (Build Spec)]] — Emergency stop + ground station Pi 5
- [[VS-02 Ground Vector Rover (Build Spec)]] — Emergency stop + fused rails
- [[AP-01 Prime Shell v0.1 (Build Spec)]] — Emergency stop + fused rails
- [[AP-02 Titan Bench Arm (Build Spec)]] — Emergency stop switch + fused rails
- [[AP-03 Dexterous Hand Node (Build Spec)]] — Emergency stop + bench PSU

### Luxonis OAK-D Lite

- [[P-05 Atlas Perception Tower (Build Spec)]] — Luxonis OAK-D Lite (depth + RGB + neural inference)
- [[TA-02 Home Sentinel Node]] — Luxonis OAK-D Lite
- [[OA-02 Sentinel Prime Tower (Build Spec)]] — Luxonis OAK-D Lite
- [[GS-02 Field Rover Base]] — Luxonis OAK-D Lite (visual crop inspection)
- [[VS-02 Ground Vector Rover (Build Spec)]] — Luxonis OAK-D Lite
- [[AP-02 Titan Bench Arm (Build Spec)]] — Luxonis OAK-D Lite
- [[AP-03 Dexterous Hand Node (Build Spec)]] — Luxonis OAK-D Lite (visual feedback)

### Synology NAS (DS1825+ / share / partition)

- [[P-01 Aegis Command Station (Build Spec)]] — Synology DS1825+ 8-bay NAS + 8×12TB HDDs
- [[ZF-02 Knowledge Keeper Vault]] — Synology DS1825+ NAS share
- [[VH-03 Bio-Digital Twin Station]] — Synology NAS share (encrypted partition)
- [[QL-02 Chain Ledger Node (Build Spec)]] — Synology NAS encrypted share
- [[OA-03 Forensic Evidence Node (Build Spec)]] — Synology NAS air-gapped partition
- [[JG-02 Compliance Audit Node]] — Synology NAS encrypted audit partition
- [[JG-03 Evidence Vault Node]] — Synology NAS air-gapped partition

### 3D print — Prusa CORE One+

- [[P-05 Atlas Perception Tower (Build Spec)]] — 3D-printed Prusa CORE One+ perception mast
- [[HL-01 Atlas Learning Kiosk (Build Spec)]] — 3D-printed Prusa CORE One+ enclosure
- [[OA-02 Sentinel Prime Tower (Build Spec)]] — 3D-printed Prusa CORE One+ mast enclosure
- [[CC-01 Civic Broadcast Kiosk]] — 3D-printed Prusa CORE One+ kiosk enclosure
- [[AP-01 Prime Shell v0.1 (Build Spec)]] — InMoov 3D-printed head + torso (Bambu P1S + Prusa CORE One+)

### Circuit Playground Bluefruit

- [[TC-01 Herald Wearable Badge]] — Circuit Playground Bluefruit
- [[HL-03 Cohort Wearable Kit]] — Circuit Playground Bluefruit (×6)
- [[NL-03 Creator Nexus Badge]] — Circuit Playground Bluefruit
- [[CC-02 Equity Badge Kit]] — Circuit Playground Bluefruit (×10 per cohort)
- [[SV-03 Ad Intel Wearable]] — Circuit Playground Bluefruit

### IMU BNO085

- [[TA-02 Home Sentinel Node]] — IMU BNO085 (vibration/motion)
- [[VH-02 Neuro Pulse Wearable]] — IMU BNO085
- [[KE-01 Apex Motion Cage (Build Spec)]] — IMU BNO085 (×3)
- [[EC-02 Lifespan Wearable]] — IMU BNO085
- [[CM-01 Cognara Behavior Node]] — IMU BNO085 (micro-gesture + motion)

### Labeled Cat6A VLAN drop

- [[ZF-03 Agent Eval Bench (Build Spec)]] — Labeled Cat6A drop to VLAN 80 Quarantine
- [[BL-02 Natural Script Compiler Node]] — Labeled Cat6A drop to VLAN 30 Engineering
- [[QL-02 Chain Ledger Node (Build Spec)]] — Labeled Cat6A drop to VLAN 20
- [[JG-02 Compliance Audit Node]] — Labeled Cat6A drop to VLAN 20
- [[JG-03 Evidence Vault Node]] — Labeled Cat6A drop to VLAN 80 Quarantine

### LiPo battery + XT60 harness

- [[TA-01 Terra Inspector Drone]] — LiPo battery + XT60 harness
- [[BL-03 Infrastructure Wire Bench]] — JST/Dupont/XT30/XT60/ferrule/heat-shrink kit
- [[AL-03 Mesh Relay Drone]] — LiPo battery + XT60 harness
- [[GS-03 Gaia Inspection Drone]] — LiPo battery + XT60 harness
- [[VS-01 Sky Vector Dev Drone (Build Spec)]] — LiPo battery + XT60

### Pi Camera Module 3 Wide

- [[TC-02 Client Presentation Node]] — Pi Camera Module 3 Wide
- [[HL-02 Instructor Capture Node (Build Spec)]] — Pi Camera Module 3 Wide
- [[KE-03 Team OS Field Station (Build Spec)]] — Pi Camera Module 3 Wide
- [[AP-01 Prime Shell v0.1 (Build Spec)]] — Pi Camera Module 3 Wide
- [[NN-02 Nomad Broadcast Node]] — Pi Camera Module 3 Wide

### 12V battery + solar input

- [[P-03 Mesh Sentinel Array (Build Spec)]] — 12V battery packs + solar input for outdoor nodes
- [[AL-01 Aether Relay Mesh]] — 12V battery packs + solar input
- [[GS-01 Gaia Crop Sentinel]] — 12V battery + solar charge controller
- [[VS-03 Logistics Mesh Node (Build Spec)]] — 12V battery + solar input

### Bench power supply

- [[ZF-03 Agent Eval Bench (Build Spec)]] — Bench power supply
- [[BL-03 Infrastructure Wire Bench]] — Bench power supply (current-limited)
- [[AP-02 Titan Bench Arm (Build Spec)]] — Bench power supply
- [[AP-03 Dexterous Hand Node (Build Spec)]] — Emergency stop + bench PSU

### Heltec V3 Meshtastic

- [[P-03 Mesh Sentinel Array (Build Spec)]] — Heltec V3 Meshtastic nodes (×6 room relays)
- [[AL-01 Aether Relay Mesh]] — Heltec V3 nodes (×4)
- [[GS-01 Gaia Crop Sentinel]] — Heltec V3 Meshtastic LoRa node
- [[VS-03 Logistics Mesh Node (Build Spec)]] — Heltec V3 relay nodes (×2 corridor)

### IMU ICM-20948

- [[VH-01 Helix Bio Scanner]] — IMU ICM-20948
- [[KE-02 Kinetic IQ Wearable (Build Spec)]] — IMU ICM-20948
- [[EC-01 Eon Longevity Station]] — IMU ICM-20948
- [[CM-02 Habit Architecture Wearable (Build Spec)]] — IMU ICM-20948 (response motion capture)

### LILYGO T-Deck Meshtastic

- [[P-03 Mesh Sentinel Array (Build Spec)]] — LILYGO T-Deck Meshtastic (field terminal with keyboard)
- [[CC-03 Digital Equity Field Kit]] — LILYGO T-Deck Meshtastic
- [[AL-01 Aether Relay Mesh]] — LILYGO T-Deck (field terminal)
- [[NN-01 Axiom Field Kit]] — LILYGO T-Deck Meshtastic

### Logic analyzer (Saleae / clone)

- [[ZF-03 Agent Eval Bench (Build Spec)]] — Logic analyzer Saleae clone
- [[BL-02 Natural Script Compiler Node]] — Logic analyzer Saleae clone (debug)
- [[BL-03 Infrastructure Wire Bench]] — Logic analyzer Saleae Logic 8
- [[OA-01 Cipher Guardian Node]] — Logic analyzer Saleae clone

### Mac mini M4 24GB

- [[ZF-02 Knowledge Keeper Vault]] — Mac mini M4 24GB (ZenFlow orchestration node)
- [[ZF-03 Agent Eval Bench (Build Spec)]] — Mac mini M4 24GB (model sandbox — Mac-30)
- [[QL-02 Chain Ledger Node (Build Spec)]] — Mac mini M4 24GB (Quantum Ledger node)
- [[JG-02 Compliance Audit Node]] — Mac mini M4 24GB (Juris Guard node)

### Pixhawk 6C Flight Controller

- [[TA-01 Terra Inspector Drone]] — Pixhawk 6C Flight Controller
- [[AL-03 Mesh Relay Drone]] — Pixhawk 6C Flight Controller
- [[GS-03 Gaia Inspection Drone]] — Pixhawk 6C
- [[VS-01 Sky Vector Dev Drone (Build Spec)]] — Pixhawk 6C

### RPLIDAR A1M8

- [[P-05 Atlas Perception Tower (Build Spec)]] — RPLIDAR A1M8 (360-degree 2D LiDAR)
- [[OA-02 Sentinel Prime Tower (Build Spec)]] — RPLIDAR A1M8
- [[GS-02 Field Rover Base]] — RPLIDAR A1M8 (navigation)
- [[VS-02 Ground Vector Rover (Build Spec)]] — RPLIDAR A1M8

### ReSpeaker 2-Mics Pi HAT

- [[ZF-01 Synaptic Relay Shell]] — ReSpeaker 2-Mics Pi HAT
- [[QL-01 Aurum Trading Terminal (Build Spec)]] — ReSpeaker 2-Mics HAT
- [[JG-01 Juris Scan Terminal]] — ReSpeaker 2-Mics HAT
- [[SV-01 Signal Dashboard Node]] — ReSpeaker 2-Mics HAT (voice query)

### Seeed XIAO ESP32S3 Sense

- [[TC-01 Herald Wearable Badge]] — Seeed XIAO ESP32S3 Sense
- [[HL-03 Cohort Wearable Kit]] — Seeed XIAO ESP32S3 Sense (×6)
- [[NL-03 Creator Nexus Badge]] — Seeed XIAO ESP32S3 Sense (camera + mic + BLE)
- [[NN-01 Axiom Field Kit]] — Seeed XIAO ESP32S3 Sense

### DYNAMIXEL XL330 smart servos

- [[AP-01 Prime Shell v0.1 (Build Spec)]] — DYNAMIXEL XL330 smart servos
- [[AP-02 Titan Bench Arm (Build Spec)]] — DYNAMIXEL XL330 smart servos
- [[AP-03 Dexterous Hand Node (Build Spec)]] — DYNAMIXEL XL330 smart servos (finger joints)

### Directional LoRa antennas

- [[P-03 Mesh Sentinel Array (Build Spec)]] — Directional LoRa antennas
- [[AL-03 Mesh Relay Drone]] — Directional LoRa antennas
- [[VS-03 Logistics Mesh Node (Build Spec)]] — Directional LoRa antenna

### Geekworm X1202 UPS HAT

- [[HL-01 Atlas Learning Kiosk (Build Spec)]] — Geekworm X1202 UPS HAT
- [[CC-01 Civic Broadcast Kiosk]] — Geekworm X1202 UPS HAT
- [[EC-01 Eon Longevity Station]] — Geekworm X1202 UPS HAT

### PCA9685 16-channel servo driver

- [[AP-01 Prime Shell v0.1 (Build Spec)]] — PCA9685 16-channel servo driver
- [[AP-02 Titan Bench Arm (Build Spec)]] — PCA9685 16-channel servo driver
- [[AP-03 Dexterous Hand Node (Build Spec)]] — PCA9685 servo driver

### RealSense D435i

- [[P-05 Atlas Perception Tower (Build Spec)]] — RealSense D435i (room SLAM + depth)
- [[TA-01 Terra Inspector Drone]] — RealSense D435i
- [[GS-03 Gaia Inspection Drone]] — RealSense D435i (depth)

### Amazing Hand

- [[AP-01 Prime Shell v0.1 (Build Spec)]] — Amazing Hand (<$200 parts)
- [[AP-03 Dexterous Hand Node (Build Spec)]] — Amazing Hand 3D-printed humanoid hand

### Arduino Starter Kit

- [[BL-03 Infrastructure Wire Bench]] — Arduino Starter Kit
- [[GS-01 Gaia Crop Sentinel]] — Arduino Starter Kit (soil/moisture GPIO)

### CyberPower Rackmount UPS 1500VA

- [[P-01 Aegis Command Station (Build Spec)]] — CyberPower Rackmount UPS 1500VA
- [[OA-01 Cipher Guardian Node]] — CyberPower Rackmount UPS 1500VA

### Cytron MD13S motor driver

- [[GS-02 Field Rover Base]] — Cytron MD13S motor driver
- [[VS-02 Ground Vector Rover (Build Spec)]] — Cytron MD13S motor driver

### Holybro GPS + telemetry

- [[TA-01 Terra Inspector Drone]] — Holybro GPS + telemetry
- [[GS-03 Gaia Inspection Drone]] — Holybro GPS + telemetry

### Mac mini M4 Pro 48GB

- [[VH-03 Bio-Digital Twin Station]] — Mac mini M4 Pro 48GB (Vital Helix node)
- [[BL-02 Natural Script Compiler Node]] — Mac mini M4 Pro 48GB (Engineering A node)

### Pi Global Shutter Camera

- [[HL-02 Instructor Capture Node (Build Spec)]] — Pi Global Shutter Camera
- [[KE-01 Apex Motion Cage (Build Spec)]] — Pi Global Shutter Camera (×2)

### PoE injector (UniFi powered)

- [[P-05 Atlas Perception Tower (Build Spec)]] — PoE injector (UniFi PoE switch powered)
- [[OA-02 Sentinel Prime Tower (Build Spec)]] — PoE injector (UniFi powered)

### ROSMASTER R2 ROS2 rover base

- [[GS-02 Field Rover Base]] — ROSMASTER R2 ROS2 rover base
- [[VS-02 Ground Vector Rover (Build Spec)]] — ROSMASTER R2 ROS2 rover base

### Soldering station + hot air

- [[BL-01 Glyph Forge Station]] — Soldering station + hot air rework
- [[BL-03 Infrastructure Wire Bench]] — Soldering station + hot air + helping hands

### UniFi Dream Machine Pro Max

- [[P-01 Aegis Command Station (Build Spec)]] — UniFi Dream Machine Pro Max
- [[OA-01 Cipher Guardian Node]] — UniFi Dream Machine Pro Max

### UniFi Enterprise XG 24

- [[P-01 Aegis Command Station (Build Spec)]] — UniFi Enterprise XG 24 (10GbE core switch)
- [[OA-01 Cipher Guardian Node]] — UniFi Enterprise XG 24

### Arduino Plug and Make Kit

- [[BL-03 Infrastructure Wire Bench]] — Arduino Plug and Make Kit

### Bambu Lab A1 printer

- [[BL-01 Glyph Forge Station]] — Bambu Lab A1 (fast prototyping)

### Bambu Lab P1S printer

- [[BL-01 Glyph Forge Station]] — Bambu Lab P1S (enclosed PETG/ABS/CF)

### Calipers + rotary tool + deburring kit

- [[BL-01 Glyph Forge Station]] — Calipers + rotary tool + deburring kit

### Heat-set inserts + M2/M3 screw kit

- [[BL-01 Glyph Forge Station]] — Heat-set inserts + M2/M3 screw kit

### InMoov 3D-printed head + torso

- [[AP-01 Prime Shell v0.1 (Build Spec)]] — InMoov 3D-printed head + torso (Bambu P1S + Prusa CORE One+)

### JST/Dupont/XT30/XT60/ferrule/heat-shrink kit

- [[BL-03 Infrastructure Wire Bench]] — JST/Dupont/XT30/XT60/ferrule/heat-shrink kit

### M5Stack ATOMS3R Camera Kit

- [[GS-01 Gaia Crop Sentinel]] — M5Stack ATOMS3R Camera Kit

### Mac mini M4 Pro 64GB

- [[P-01 Aegis Command Station (Build Spec)]] — Mac mini M4 Pro 64GB (parent command node)

### Oscilloscope (Siglent/Rigol class)

- [[BL-03 Infrastructure Wire Bench]] — Oscilloscope Siglent/Rigol class

### PLA/PETG/TPU/ASA filament inventory

- [[BL-01 Glyph Forge Station]] — PLA/PETG/TPU/ASA filament inventory

### Rack + PDU + patch panel

- [[OA-01 Cipher Guardian Node]] — Rack + PDU + patch panel

### SO-101 / LeRobot arm (leader + follower)

- [[AP-02 Titan Bench Arm (Build Spec)]] — SO-101 / LeRobot arm (leader + follower pair)

### Seeed Grove Vision AI Module V2

- [[GS-01 Gaia Crop Sentinel]] — Seeed Grove Vision AI Module V2

### Sonnet RackMac mini rack mount

- [[P-01 Aegis Command Station (Build Spec)]] — Sonnet RackMac mini rack mount

### Stereo 3W 4-ohm speakers

- [[NL-01 Resonance Studio Node (Build Spec)]] — Stereo 3W 4-ohm speakers

### UniFi Enterprise 24 PoE

- [[OA-01 Cipher Guardian Node]] — UniFi Enterprise 24 PoE

### UniFi U7 Pro Max

- [[OA-01 Cipher Guardian Node]] — UniFi U7 Pro Max
