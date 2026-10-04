---
title: Wearables Agent Spec — Kinetic Edge Devices
tags:
- physical-ai
- wearables
- device-specs
- kinetic-edge
type: spec-section
owner: JR Moyler (Hataalii)
source: Physical AI Wearables Agent Spec
updated: 2026-10-04
division: Kinetic Edge
device_count: 5
---
# Wearables Agent Spec — Kinetic Edge Devices

Section of the [[Physical AI Wearables Agent Spec]]. Sports technology: human performance captured and coached. Division: [[Kinetic Edge Division]].

| Code | Device | Type | Est. budget |
|---|---|---|---|
| KE-W01 | Apex Motion Cage | Physical AI | ~$700–$950 |
| KE-W02 | Kinetic IQ Wearable | Wearable | ~$150–$210 |
| KE-W03 | Team OS Field Station | Field Kit | ~$430–$580 |
| KE-W04 | Recovery Intelligence Node | Physical AI | ~$310–$420 |
| KE-W05 | Scout Intelligence Terminal | Edge Terminal | ~$280–$380 |

## KE-W01 Apex Motion Cage
*Athletes meet sensors: performance captured in real time.* (Physical AI)

Kinetic Edge's multi-camera, multi-IMU performance sensing cage. Two global shutter cameras + three BNO085 IMUs capture 3D motion, gait patterns, and reaction timing. The Apex System Task Agent processes raw sensor data through the performance analysis pipeline and delivers structured athletic profiles to the TeamOS Mac mini node. Injury Risk Flag n8n workflow fires immediately on biomechanical anomaly detection.

### Hardware
- Raspberry Pi 5 8GB (×2)
- Pi Global Shutter Camera (×2)
- IMU BNO085 (×3)
- NVIDIA Jetson Orin Nano Super
- Arduino Nano 33 BLE Sense Rev2
- Pi M.2 HAT+ + 2TB NVMe
- 3D-printed Bambu P1S sensor brackets

### ZenFlow agents
- [[Apex System Performance Agent]]
- [[Injury Risk Monitor Task Agent]]
- [[Biomechanical Analysis Task Agent]]
- [[Knowledge Keeper (Device Agent)]]

### APIs
- ZenFlow /v1/knowledge/write
- Anthropic claude-sonnet-4-6 (profile generation)
- Airtable API (athlete profiles)
- Slack API (coach alerts)

### n8n workflows
- Injury Risk Flag + Coaching Alert
- Weekly Performance Report Generator
- Athlete Recovery Alert
- Scout Intelligence Aggregator

### MCPs
- Airtable MCP
- Slack MCP
- ZenFlow Internal API MCP

### Use case
An athlete runs a gait protocol. The Injury Risk Monitor detects an asymmetry in the left knee torque vector, fires the Injury Risk Flag workflow, which instantly alerts the trainer via Slack, schedules a wellness check in Airtable, and logs a Vital Helix integration request for recovery protocol generation.

### Build outcome
Athlete motion capture + injury detection: gait analysis, real-time risk flagging, trainer alerts, profile generation.

**Est. budget:** ~$700–$950

## KE-W02 Kinetic IQ Wearable
*Intelligence on the body: the coaching cue you feel.* (Wearable)

An athlete wearable for real-time performance feedback. BLE-connected to the Apex System, it delivers haptic coaching cues during training: a single pulse for 'pace up', double for 'form correction', triple for 'stop and reset'. Post-session, the BLE upload triggers the Weekly Performance Report Generator, which produces a personalized improvement brief in Notion.

### Hardware
- Arduino Nano 33 BLE Sense Rev2
- IMU ICM-20948
- Adafruit DRV2605L Haptic Controller
- Adafruit Feather nRF52840 Sense
- PowerBoost 1000 + LiPo
- 3D-printed Bambu A1 PETG/TPU sport enclosure

### ZenFlow agents
- [[Apex System Performance Agent]]
- [[Biomechanical Analysis Task Agent]]
- [[Coaching Cue Dispatch Task Agent]]

### APIs
- ZenFlow /v1/agents (haptic dispatch)
- Anthropic claude-haiku-4-5 (cue logic)
- Airtable API
- BLE Gateway API

### n8n workflows
- Weekly Performance Report Generator
- Athlete Recovery Alert
- Injury Risk Flag + Coaching Alert

### MCPs
- Airtable MCP
- ZenFlow Internal API MCP

### Use case
During a sprint session, the Coaching Cue Dispatch Task Agent monitors stride frequency via the IMU. When cadence drops below optimal threshold, the wristband delivers a double pulse: a real-time cue without the athlete looking at a screen or stopping to talk to a coach.

### Build outcome
Real-time coaching wristband: haptic cues during training, post-session auto-report, injury alert integration.

**Est. budget:** ~$150–$210

## KE-W03 Team OS Field Station
*Coaching intelligence, sideline-ready.* (Field Kit)

A portable sideline station that gives coaches real-time Apex System data during practice. Whisplay shows live athlete performance metrics. Far-field mic captures coaching voice notes, which are processed by a Task Agent into structured session observations. Mesh-connected via T-Beam for sync with the TeamOS Mac mini when field Wi-Fi is unavailable.

### Hardware
- Raspberry Pi 5 8GB
- Whisplay HAT
- ReSpeaker 4-Mic Array v2.0
- Pi Camera Module 3 Wide
- LILYGO T-Beam Meshtastic
- PiSugar 3 Plus Battery
- 3D-printed Bambu A1 ruggedized field case

### ZenFlow agents
- [[TeamOS Coaching Agent]]
- [[Voice Observation Task Agent]]
- [[Knowledge Keeper (Device Agent)]]
- [[Apex System Performance Agent]] (read)

### APIs
- ZenFlow /v1/knowledge/write
- Anthropic claude-haiku-4-5 (observation processing)
- Airtable API
- Meshtastic Python API

### n8n workflows
- Weekly Performance Report Generator
- Partnership Sponsorship Tracker
- Scout Intelligence Aggregator

### MCPs
- Airtable MCP
- ZenFlow Internal API MCP
- n8n MCP

### Use case
Sideline coach says 'Marcus showed excellent lateral acceleration in set 3 but lost composure under defensive pressure'. The Voice Observation Task Agent logs a structured note, tags it to Marcus's profile in Airtable, and flags it for inclusion in next week's performance report.

### Build outcome
Sideline coaching terminal: live Apex metrics, voice observation logging, mesh sync, auto performance integration.

**Est. budget:** ~$430–$580

## KE-W04 Recovery Intelligence Node
*Rest is a performance metric. This node measures it.* (Physical AI)

A desk recovery monitoring station that aggregates BLE biometric data from athletes' Kinetic IQ wearables overnight and runs the Athlete Recovery Alert workflow. The Recovery Intelligence Task Agent compares current readiness metrics against the athlete's performance baseline and generates a same-morning training load recommendation that coaches receive before the first session.

### Hardware
- Raspberry Pi 5 8GB
- Adafruit Feather nRF52840 Sense (BLE aggregator hub)
- IMU BNO085 (ambient motion baseline)
- Whisplay HAT
- Pi M.2 HAT+ + 1TB NVMe
- 3D-printed Bambu A1 desk monitoring station

### ZenFlow agents
- [[Recovery Intelligence Task Agent]]
- [[Athlete Recovery Alert Agent]]
- [[Vital Helix Integration Task Agent]]
- [[Knowledge Keeper (Device Agent)]]

### APIs
- ZenFlow /v1/knowledge/write
- Anthropic claude-sonnet-4-6 (load recommendation)
- Airtable API
- Vital Helix API (health cross-reference)
- Slack API

### n8n workflows
- Athlete Recovery Alert
- Weekly Performance Report Generator
- Vital Helix cross-integration (shared recovery data)

### MCPs
- Airtable MCP
- Slack MCP
- ZenFlow Internal API MCP

### Use case
Overnight, athletes' Kinetic IQ wearables upload sleep + HRV data. The Recovery Intelligence Task Agent synthesizes training load history + recovery metrics and delivers a color-coded readiness briefing to coaches at 6AM, before any athlete sets foot in the facility.

### Build outcome
Recovery monitoring station: overnight biometric aggregation, readiness scoring, morning load recommendation.

**Est. budget:** ~$310–$420

## KE-W05 Scout Intelligence Terminal
*Draft intelligence: every prospect profiled before the call.* (Edge Terminal)

A dedicated Pi 5 terminal running the Scout Intelligence Aggregator workflow. Monitors draft/transfer news RSS, Claude filters by sport and position relevance, and the Scout Agent builds structured prospect profiles with public performance data, social signals from LunarCrush, and comparable athlete baselines. All profiles are stored in Airtable and accessible from the TeamOS platform.

### Hardware
- Raspberry Pi 5 8GB
- Whisplay HAT
- Pi Camera Module 3
- Pi M.2 HAT+ + 1TB NVMe
- Adafruit I2S Speaker Bonnet
- 3D-printed Bambu A1 scouting station

### ZenFlow agents
- [[Scout Intelligence Agent]]
- [[Research Director]]
- [[Knowledge Keeper (Device Agent)]]
- [[Prospect Profile Generator Task Agent]]

### APIs
- Anthropic claude-sonnet-4-6 (profile generation)
- LunarCrush API (athlete social)
- Perplexity Pro API (news research)
- Airtable API
- ZenFlow /v1/knowledge/write

### n8n workflows
- Scout Intelligence Aggregator
- Weekly Performance Report Generator
- Kinetic IQ Consumer Onboarding

### MCPs
- LunarCrush MCP
- Airtable MCP
- ZenFlow Internal API MCP
- Notion MCP

### Use case
Coaches get a Slack notification: '3 new prospects profiled overnight'. They open Airtable and find fully structured scouting reports: performance data, social presence, comparable baselines, and a fit score against the team's current roster needs, all produced autonomously.

### Build outcome
Autonomous prospect scouting terminal: overnight profile generation, fit scoring, Airtable delivery, social intelligence.

**Est. budget:** ~$280–$380
