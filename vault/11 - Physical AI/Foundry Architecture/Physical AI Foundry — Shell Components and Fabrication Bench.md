---
title: Physical AI Foundry — Shell Components and Fabrication Bench
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
# Physical AI Foundry — Shell Components and Fabrication Bench

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
4. Physical AI Shell Hardware Catalog
This section consolidates the first two portions of the conversation: compute, fabrication, storage, power, audio, cameras,
wearables, actuation, electronics, and debugging.
Compute, Storage, and Power
Item Est. price Description / use case
Raspberry Pi 5 8GB ~$80-$175 Flexible control/UI/IoT shell board for sensors, cameras, local APIs, dashboards, and lightweight local
models.
NVIDIA Jetson Orin Nano Super
Developer Kit
~$249 Edge AI/perception brain for CV, robotics, ROS2, local multimodal agents, and CUDA workloads.
Arduino Starter Kit ~$95-$110 Microcontroller foundation for GPIO, PWM, sensors, motors, and physical interaction.
Arduino Plug and Make Kit ~$85 Beginner IoT/microcontroller prototyping kit with modular sensor approach.
Raspberry Pi 27W USB-C Power Supply ~$17-$18 Stable Pi 5 bench power; avoids brownouts.
Raspberry Pi Active Cooler / case ~$10-$25 Thermal stability for long-running Pi inference and camera nodes.
Raspberry Pi M.2 HAT+ + NVMe SSD ~$45 + SSD Fast model/cache/log storage; replaces SD-card fragility for serious devices.
Raspberry Pi AI HAT+ / Hailo
accelerator
~$70-$118 Dedicated edge inference for object detection, segmentation, and low-power perception.
PiSugar 3 Plus Battery ~$50 Portable UPS/battery for Pi-based AI shell and handheld agent devices.
Geekworm X1202 / Waveshare UPS
HAT
~$47-$48 before
batteries
More serious Pi 5 UPS for installed devices, kiosks, and field tools.
12V/24V battery system + buck
converters
varies Power rails for robots, motors, Jetsons, Pi, LEDs, fans, and sensors.
PowerBoost 1000 Charger ~$20 LiPo charging and 5V boost for wearables, badges, and handheld shells.
Fabrication and Mechanical Bench
Item Est. price Description / use case
Bambu Lab A1 ~$299 Fast prototyping printer for brackets, shells, mounts, and fixtures.
Bambu Lab A1 mini / Combo ~$219-$329 Small printer/farm unit for quick parts and department prototyping.
Bambu Lab P1S ~$399-$549 Enclosed printer for stronger functional parts and higher-temperature materials.
Prusa CORE One+ ~$925-$1,200 Premium enclosed printer/workhorse with open ecosystem.
Filament: PLA, PETG, TPU, ASA/ABS,
PLA-CF
varies Prototype shells, flexible wearables, durable mounts, and mechanical parts.
Heat-set inserts + M2/M3 screws +
standoffs
~$50-$150 Durable enclosures and serviceable assemblies.
JST/Dupont/XT30/XT60/ferrules/heat
shrink/silicone wire
~$50-$150 Reliable physical wiring and connector standard.
Calipers, rotary tool, deburring tools ~$50-$200 Mechanical finishing, fitment, and enclosure iteration.
Vision and Perception
Item Est. price Description / use case
Whisplay HAT ~$36 Display, mic, audio, RGB LEDs, and buttons for Pi Zero/Zero 2 style shells; also used in Pi chatbot
patterns.
Raspberry Pi Camera Module 3 from ~$25 Default 12MP autofocus camera for shells, object detection, desk agents, QR scanning.
Raspberry Pi Camera Module 3 Wide /
NoIR
~$35-$38 Wider FOV and IR/night experiments for room, robot, and field nodes.
Raspberry Pi Global Shutter Camera ~$50 Machine vision for fast motion, sports, conveyor, drone, and robot tracking.
Raspberry Pi AI Camera ~$70 Sony IMX500 AI sensor for on-sensor inference and low-power smart vision.
Arducam 64MP Hawkeye Camera ~$60-$74 High-resolution inspection, product capture, evidence, and dataset collection.
Arducam OV9281 Global Shutter ~$42 Lower-cost marker/motion tracking global-shutter camera.
M5Stack ATOMS3R Camera Kit ~$20 Tiny Wi-Fi camera/sensor node with ESP32-S3 for wearable or room capture.
M5Stack UnitV2 AI Camera ~$75 Standalone edge AI camera for rapid experiments.
Seeed Grove Vision AI Module V2 ~$25-$38 Tiny embedded vision AI module for microcontroller and wearable projects.
Luxonis OAK-D Lite ~$149-$199 Depth + RGB + onboard neural inference for robots, kiosks, and spatial perception.
RealSense D435i / D455 ~$280-$320+ Depth sensing, SLAM, obstacle avoidance, room mapping, and body/hand tracking.
RPLIDAR A1M8 ~$99 360-degree 2D LiDAR for indoor mapping, navigation, and obstacle detection.
IMU module: BNO085 / ICM-20948 ~$15-$35 Orientation, tilt, gesture, and motion tracking for wearables and mobile robots.
Audio, Voice, and Wearables
Item Est. price Description / use case
Adafruit I2S 3W Stereo Speaker
Bonnet
~$13 Clean embedded stereo output for Pi agents, robot voices, kiosk devices.
Stereo enclosed 3W 4-ohm speakers ~$8 Compact audio output paired with I2S amplifier boards.
ReSpeaker 2-Mics Pi HAT ~$14 Wake word, voice capture, and small voice agent input layer.
ReSpeaker 4-Mic / Mic Array v2.0 ~$70 Far-field voice capture, beamforming, noise suppression, room agents.
USB speaker-mic puck ~$20-$60 Fast plug-and-play audio prototype before embedded audio integration.
Seeed XIAO ESP32S3 Sense ~$14 Tiny wearable AI board with camera, mic, Wi-Fi/BLE, PSRAM, flash, SD.
Arduino Nano 33 BLE Sense Rev2 ~$39 TinyML wearable board for gesture, motion, sound, and environment sensing.
Adafruit Feather nRF52840 Sense ~$40 BLE sensor wearable platform with battery support.
Circuit Playground Bluefruit ~$25 Beginner wearable board with LEDs, buttons, sensors, speaker, mic, BLE.
Adafruit DRV2605L Haptic Controller ~$8 Vibration/haptic feedback for rings, badges, wristbands, handheld shells.
Brilliant Labs Halo ~$349 Open-source AI glasses reference for wearable agent UI experiments.
Vuzix Z100 Smart Glasses ~$500 BLE smart glasses with developer SDK access for field assistant UX.
Vuzix Shield ~$2,500 Enterprise AR/safety glasses reference for industrial guided-work prototypes.
XREAL Air / One series ~$399-$449+ Heads-up display layer for dashboards, coding, and field-agent interfaces.
Actuation, Robotics Control, and Debugging
Item Est. price Description / use case
PCA9685 16-channel servo driver ~$15 Control up to 16 servos over I2C for robot heads, arms, pan-tilt rigs.
TB6612FNG dual motor driver ~$5 Small DC motors and small rovers.
Cytron MD10C / MD13S motor driver ~$14-$16 Larger brushed DC motors for mobile bases and kinetic tools.
DYNAMIXEL XL330 smart servos ~$20-$30 each Feedback-capable robot joints with position, velocity, current, temperature.
Logic analyzer: Saleae Logic 8 or clone ~$10-$499 Debug I2C, SPI, UART, PWM, and timing issues.
Oscilloscope: Siglent/Rigol class ~$350-$500+ Power noise, PWM, motor spikes, regulator behavior.
Bench power supply ~$60-$180 Current-limited hardware testing before battery deployment.
Soldering station + hot air + helping
hands
~$80-$200 Headers, wires, connectors, repairs, and rework.
Emergency stop switch + fuses ~$20-$100 Required for robot and actuator bench safety.
ROS-compatible rover chassis /
ROSMASTER kit
~$25-$650+ Mobile robotics base for ROS2 navigation and hardware-agent testing.
```

## Source
- [Collective_AI_Physical_AI_Foundry_Final.pdf](https://drive.google.com/file/d/1pZSHaIg3QjaBn5aKzESwq9zBND7LtshJ/view?usp=drivesdk) — Section 4 — Physical AI Shell Hardware Catalog. Read in full from Drive on 2026-10-06.

### Source records
- [Collective_AI_Physical_AI_Foundry_Final.pdf](https://drive.google.com/file/d/1pZSHaIg3QjaBn5aKzESwq9zBND7LtshJ/view?usp=drivesdk)

<!-- drive-expansion:b4c61d77bf9d61bf860a -->
