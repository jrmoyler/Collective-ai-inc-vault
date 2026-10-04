---
title: Wearables Agent Spec — Cognara Mind Devices
tags:
- physical-ai
- wearables
- device-specs
- cognara-mind
type: spec-section
owner: JR Moyler (Hataalii)
source: Physical AI Wearables Agent Spec
updated: 2026-10-04
division: Cognara Mind
device_count: 5
---
# Wearables Agent Spec — Cognara Mind Devices

Section of the [[Physical AI Wearables Agent Spec]]. Behavioral science and cognitive intelligence at the physical edge. Division: [[Cognara Mind Division]].

| Code | Device | Type | Est. budget |
|---|---|---|---|
| CM-W01 | Cognitive Coaching Shell | Physical AI | ~$530–$720 |
| CM-W02 | Habit Architecture Wearable | Wearable | ~$150–$210 |
| CM-W03 | Behavioral Sensing Station | Physical AI | ~$380–$510 |
| CM-W04 | Psychographic Field Kit | Field Kit | ~$380–$510 |
| CM-W05 | Neuro-Pulse Wristband | Wearable | ~$150–$210 |

## CM-W01 Cognitive Coaching Shell
*Your behavioral AI coach, embodied on the desk.* (Physical AI)

Cognara Mind's primary conversational coaching terminal. The Cognitive Coach Task Agent (built on the #E0267E Signal Rose brand framework) runs as a persistent ZenFlow session. Voice input via ReSpeaker triggers Claude-powered responses calibrated to the user's behavioral profile stored in Notion/Airtable. Habit formation protocols fire via the n8n Habit Architecture Workflow at scheduled intervention points.

### Hardware
- Raspberry Pi 5 8GB
- Whisplay HAT
- ReSpeaker 4-Mic Array v2.0
- NVIDIA Jetson Orin Nano Super
- Adafruit I2S Speaker Bonnet
- Pi M.2 HAT+ + 1TB NVMe
- 3D-printed Bambu P1S desk coaching shell (Signal Rose accent)

### ZenFlow agents
- [[Cognitive Coach Task Agent]]
- [[Behavioral Pattern Analysis Agent]]
- [[Habit Architecture Agent]]
- [[Knowledge Keeper (Device Agent)]]
- [[Psychographic Profile Agent]]

### APIs
- ZenFlow /v1/agents/spawn
- Anthropic claude-sonnet-4-6 (coaching dialogue)
- Notion API (behavioral profile)
- Airtable API (habit tracking)
- ZenFlow /v1/knowledge/write

### n8n workflows
- Habit Architecture Workflow (scheduled interventions)
- Behavioral Pattern Digest (weekly profile update)
- Cognara Mind Engagement Monitor

### MCPs
- Notion MCP
- Airtable MCP
- ZenFlow Internal API MCP

### Use case
A user starts their morning check-in with Cognara Mind. The Psychographic Profile Agent retrieves yesterday's behavioral log, the Cognitive Coach generates a calibrated challenge question, and the Habit Architecture Agent fires a scheduled micro-commitment exercise, all coordinated through the ZenFlow agent API in a single conversational session.

### Build outcome
Behavioral AI coaching terminal: profile-calibrated coaching, habit intervention, psychographic intelligence.

**Est. budget:** ~$530–$720

## CM-W02 Habit Architecture Wearable
*The nudge engine: behavior change you feel.* (Wearable)

A BLE wristband that receives precisely timed haptic nudges from the Habit Architecture Agent running on the Cognara Mac mini. Nudge timing is determined by the Behavioral Pattern Analysis Agent based on the user's historical habit formation data. The wristband also captures response signals (motion patterns post-nudge) that feed back into the behavioral model for self-optimizing nudge scheduling.

### Hardware
- Adafruit Feather nRF52840 Sense
- Adafruit DRV2605L Haptic Controller
- IMU ICM-20948 (post-nudge response capture)
- Arduino Nano 33 BLE Sense Rev2
- PowerBoost 1000 + LiPo
- 3D-printed Bambu A1 PETG/TPU Signal Rose wristband

### ZenFlow agents
- [[Habit Architecture Agent]]
- [[Behavioral Pattern Analysis Agent]]
- [[Psychographic Profile Agent]]
- [[Knowledge Keeper (Device Agent)]]

### APIs
- ZenFlow /v1/agents (haptic dispatch)
- Anthropic claude-haiku-4-5 (nudge optimization)
- Airtable API (habit log)
- BLE Gateway API

### n8n workflows
- Habit Architecture Workflow (nudge scheduling)
- Behavioral Pattern Digest (weekly model update)

### MCPs
- Airtable MCP
- ZenFlow Internal API MCP

### Use case
The Behavioral Pattern Analysis Agent determines that the user has an 85% habit completion rate when nudged at 9:47AM versus 71% at 10:15AM. The next day's nudge is automatically rescheduled to 9:47AM: the wristband self-optimizes without user configuration.

### Build outcome
Self-optimizing habit wristband: response-signal-driven nudge timing, behavioral model feedback loop.

**Est. budget:** ~$150–$210

## CM-W03 Behavioral Sensing Station
*The room reads the room.* (Physical AI)

Cognara Mind's ambient behavioral sensing station for research sessions and coaching environments. Captures voice tone valence, micro-gesture frequency, and environmental context via far-field mic + IMU arrays. The Behavioral Pattern Analysis Agent processes raw signals through Claude and produces a structured behavioral state map; all data remains on the local Cognara Mac mini, never cloud-synced.

### Hardware
- Raspberry Pi 5 8GB
- ReSpeaker 4-Mic Array v2.0 (tone analysis)
- IMU BNO085 (micro-gesture)
- Pi Camera Module 3 (opt-in facial context)
- Arduino Nano 33 BLE Sense Rev2
- Whisplay HAT
- Pi M.2 HAT+ + 1TB NVMe
- 3D-printed Bambu A1 behavioral lab enclosure

### ZenFlow agents
- [[Behavioral Pattern Analysis Agent]]
- [[Psychographic Profile Agent]]
- [[Knowledge Keeper (Device Agent)]]
- [[Cognitive Coach Task Agent]]

### APIs
- Anthropic claude-sonnet-4-6 (tone + pattern analysis)
- ZenFlow /v1/knowledge/write
- Airtable API
- ZenFlow /v1/agents/spawn

### n8n workflows
- Behavioral Pattern Digest
- Cognara Mind Engagement Monitor
- Habit Architecture Workflow

### MCPs
- Airtable MCP
- Notion MCP
- ZenFlow Internal API MCP

### Use case
During a Cognara Mind coaching session, the Behavioral Sensing Station monitors vocal tone and physical micro-gestures. The Behavioral Pattern Analysis Agent detects cognitive load elevation at minute 23 and signals the Cognitive Coach to shift from analytical to narrative framing, in real time.

### Build outcome
Ambient behavioral sensing node: tone + gesture analysis, real-time coaching adaptation, local-only data.

**Est. budget:** ~$380–$510

## CM-W04 Psychographic Field Kit
*Behavioral intelligence, deployed anywhere.* (Field Kit)

A portable Cognara Mind field kit for off-site coaching sessions, behavioral research events, and workshop deployments. Battery-backed Pi 5 with the Cognitive Coach Task Agent running on local NVMe cache. ReSpeaker captures session audio, Behavioral Pattern Analysis Agent produces a post-session report, and all data syncs to the Cognara Mac mini on mesh reconnect.

### Hardware
- Raspberry Pi 5 8GB
- PiSugar 3 Plus Battery
- Whisplay HAT
- ReSpeaker 4-Mic Array v2.0
- LILYGO T-Deck Meshtastic
- Pi M.2 HAT+ + 1TB NVMe
- 3D-printed Bambu A1 PETG carry case

### ZenFlow agents
- [[Cognitive Coach Task Agent]] (offline)
- [[Behavioral Pattern Analysis Agent]] (local cache)
- [[Knowledge Keeper (Device Agent)]] (local)

### APIs
- ZenFlow Agent API (local cache)
- Anthropic claude-haiku-4-5 (edge inference)
- Meshtastic Python API

### n8n workflows
- Session Archive Sync (fires on mesh reconnect)
- Behavioral Pattern Digest

### MCPs
- ZenFlow Internal API MCP (local cache)
- n8n MCP

### Use case
Cognara Mind deploys to an off-site corporate wellness event. The field kit runs full coaching sessions on local inference, no internet required. On return, the Behavioral Pattern Analysis Agent's session data syncs to the Foundry NAS and the Airtable habit tracking system automatically.

### Build outcome
Portable behavioral coaching kit: offline AI coach, post-session report, auto-sync on mesh reconnect.

**Est. budget:** ~$380–$510

## CM-W05 Neuro-Pulse Wristband
*Cognitive performance, measured from the wrist.* (Wearable)

Cognara Mind's cognitive performance wearable. Captures continuous motion, orientation, and environmental signals that the Psychographic Profile Agent uses to build a longitudinal cognitive performance map. The wristband delivers context-sensitive haptic cues for: focus session start, distraction alert, cognitive load peak warning, and recovery prompt, all timed by the Habit Architecture Agent.

### Hardware
- Arduino Nano 33 BLE Sense Rev2
- IMU BNO085 (orientation + motion)
- Adafruit DRV2605L Haptic Controller
- Adafruit Feather nRF52840 Sense (BLE hub)
- PowerBoost 1000 + LiPo
- 3D-printed Bambu A1 PETG Signal Rose wristband

### ZenFlow agents
- [[Psychographic Profile Agent]]
- [[Habit Architecture Agent]]
- [[Cognitive Load Monitor Task Agent]]
- [[Knowledge Keeper (Device Agent)]]

### APIs
- ZenFlow /v1/agents (haptic event dispatch)
- Anthropic claude-haiku-4-5 (cognitive load inference)
- Airtable API
- BLE Gateway API

### n8n workflows
- Habit Architecture Workflow
- Behavioral Pattern Digest (longitudinal update)

### MCPs
- Airtable MCP
- ZenFlow Internal API MCP

### Use case
The user enters a deep work block. The Cognitive Load Monitor Task Agent detects sustained focus from motion stability and delivers a single confirming pulse: 'you're in flow'. 90 minutes later, a double pulse signals optimal break timing. The Psychographic Profile Agent logs the session and refines the user's cognitive performance model.

### Build outcome
Cognitive performance wristband: flow state detection, load warning, timed break cues, longitudinal profile.

**Est. budget:** ~$150–$210
