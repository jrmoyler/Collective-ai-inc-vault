---
title: Wearables Agent Spec — Hybrid Living Devices
tags:
- physical-ai
- wearables
- device-specs
- hybrid-living
type: spec-section
owner: JR Moyler (Hataalii)
source: Physical AI Wearables Agent Spec
updated: 2026-10-04
division: Hybrid Living
device_count: 5
---
# Wearables Agent Spec — Hybrid Living Devices

Section of the [[Physical AI Wearables Agent Spec]]. AI-native education: the classroom made physical and intelligent. Division: [[Hybrid Living Division]].

| Code | Device | Type | Est. budget |
|---|---|---|---|
| HL-W01 | Atlas Learning Kiosk | Edge Terminal | ~$490–$650 |
| HL-W02 | Cohort Engagement Badge | Wearable | ~$110–$160 per badge |
| HL-W03 | Instructor Capture Node | Physical AI | ~$600–$820 |
| HL-W04 | P.E.T.E.E.R. Assessment Node | Physical AI | ~$320–$420 |
| HL-W05 | Field Learning Kit | Field Kit | ~$380–$510 |

## HL-W01 Atlas Learning Kiosk
*Every student gets a local AI tutor.* (Edge Terminal)

A voice-first student learning terminal. Routes questions to the Hybrid Living AI Tutor Task Agent via the ZenFlow API, which uses Claude to generate Socratic responses calibrated to the student's current learning state (tracked in Notion/Airtable). Works offline via the local Foundry cloud. The P.E.T.E.E.R. pedagogical framework is embedded in the agent system prompt.

### Hardware
- Raspberry Pi 5 8GB
- Whisplay HAT
- ReSpeaker 4-Mic Array v2.0
- Adafruit I2S Speaker Bonnet
- Pi Camera Module 3
- Pi M.2 HAT+ + 1TB NVMe
- Geekworm X1202 UPS HAT
- 3D-printed Prusa CORE One+ kiosk

### ZenFlow agents
- [[AI Tutor Task Agent]] (P.E.T.E.E.R. framework)
- [[Learning Path Agent]]
- [[Knowledge Keeper (Device Agent)]]
- [[Cohort Manager Task Agent]]

### APIs
- ZenFlow /v1/agents/spawn
- Anthropic claude-sonnet-4-6
- Notion API (learning state)
- Airtable API (progress tracking)

### n8n workflows
- Student Progress Report Generator
- Cohort Engagement Monitor
- Hybrid Living Enrollment Sequence

### MCPs
- Notion MCP
- Airtable MCP
- ZenFlow Internal API MCP

### Use case
A student asks the kiosk a question about AI ethics. The AI Tutor Task Agent retrieves their learning history from Notion, generates a Socratic question calibrated to their level, and logs the exchange to Knowledge Keeper for curriculum optimization.

### Build outcome
AI tutoring terminal: P.E.T.E.E.R. pedagogy, learning state tracking, offline-capable, cohort analytics.

**Est. budget:** ~$490–$650

## HL-W02 Cohort Engagement Badge
*Engagement signals, worn by every learner.* (Wearable)

A BLE wearable badge distributed to cohort participants. Captures attention signals (motion, sound proximity, interaction frequency) and logs them to the Cohort Manager Task Agent. When engagement drops, the badge vibrates with a gentle single pulse: a discreet nudge from the AI to re-engage. All data stays on the local Hybrid Living Mac mini.

### Hardware
- Arduino Nano 33 BLE Sense Rev2
- Adafruit DRV2605L Haptic Controller
- IMU BNO085
- Circuit Playground Bluefruit
- PowerBoost 1000 + LiPo
- 3D-printed Bambu A1 PETG badge clip

### ZenFlow agents
- [[Cohort Manager Task Agent]]
- [[Learning Path Agent]]
- [[Knowledge Keeper (Device Agent)]]

### APIs
- ZenFlow /v1/knowledge/write
- Anthropic claude-haiku-4-5 (engagement analysis)
- Airtable API
- BLE Gateway API

### n8n workflows
- Cohort Engagement Monitor
- Student Progress Report Generator
- Weekly Performance Report Generator

### MCPs
- Airtable MCP
- Notion MCP
- ZenFlow Internal API MCP

### Use case
During a 3-day AI business cohort, every participant wears a badge. Engagement data feeds the Cohort Manager Task Agent, which surfaces real-time insights to the instructor's display and adjusts the session pacing recommendation automatically.

### Build outcome
Cohort engagement wearable: attention signal capture, haptic nudge, instructor dashboard, learning analytics.

**Est. budget:** ~$110–$160 per badge

## HL-W03 Instructor Capture Node
*Every lesson archived, every insight extracted.* (Physical AI)

A dual-camera, far-field audio capture node for recording instructor sessions. A Jetson-powered transcription Task Agent produces a full session transcript, then Claude extracts learning objectives, key concepts, and study questions, all indexed in Knowledge Keeper. The Creator Track content pipeline also receives a summary for Nexus Labs cross-promotion.

### Hardware
- Raspberry Pi 5 8GB (×2 dual-camera)
- Pi Camera Module 3 Wide
- Pi Global Shutter Camera
- ReSpeaker 4-Mic Array v2.0
- NVIDIA Jetson Orin Nano Super
- Pi M.2 HAT+ + 2TB NVMe
- 3D-printed Bambu P1S ceiling mount

### ZenFlow agents
- [[Transcription Task Agent]]
- [[Curriculum Synthesis Task Agent]]
- [[Knowledge Keeper (Device Agent)]]
- [[Nexus Labs Content Relay Task Agent]]

### APIs
- Anthropic claude-sonnet-4-6 (concept extraction)
- ZenFlow /v1/knowledge/write
- Notion API
- Airtable API

### n8n workflows
- Instructor Session Archive
- Creator Track Content Pipeline
- Nexus Labs Content Pipeline cross-link

### MCPs
- Notion MCP
- Airtable MCP
- Google Drive MCP
- ZenFlow Internal API MCP

### Use case
After a 2-hour session, the Curriculum Synthesis Task Agent has already produced a formatted study guide, extracted 12 learning objectives, and queued a content summary for the Collective Times newsletter, all before the instructor saves their notes.

### Build outcome
Session capture + knowledge extraction: dual-camera archive, auto study guides, cross-division content relay.

**Est. budget:** ~$600–$820

## HL-W04 P.E.T.E.E.R. Assessment Node
*The framework that teaches teachers.* (Physical AI)

A dedicated Pi 5 assessment terminal running the P.E.T.E.E.R. pedagogical evaluation framework as a persistent Task Agent. Instructors voice-log observations about student progress, and the Assessment Task Agent produces structured competency maps, intervention recommendations, and personalized learning path updates, all stored in the Atlas platform database.

### Hardware
- Raspberry Pi 5 8GB
- Whisplay HAT
- ReSpeaker 2-Mics Pi HAT
- Adafruit I2S Speaker Bonnet
- Pi M.2 HAT+ + 1TB NVMe
- PiSugar 3 Plus Battery
- 3D-printed Bambu A1 instructor desk shell

### ZenFlow agents
- [[P.E.T.E.E.R. Assessment Task Agent]]
- [[Learning Path Agent]]
- [[Knowledge Keeper (Device Agent)]]
- [[Cohort Manager Task Agent]]

### APIs
- ZenFlow /v1/agents/spawn
- Anthropic claude-sonnet-4-6
- Notion API
- Airtable API (competency matrix)

### n8n workflows
- Student Progress Report Generator
- Cohort Engagement Monitor

### MCPs
- Notion MCP
- Airtable MCP
- ZenFlow Internal API MCP

### Use case
An instructor voice-logs 'Marcus is strong on systems thinking but struggles with prompt design'. The Assessment Task Agent updates Marcus's competency map, flags a recommended exercise, and schedules a check-in for next session.

### Build outcome
P.E.T.E.E.R. evaluation node: voice-log observations, auto-competency mapping, personalized path updates.

**Est. budget:** ~$320–$420

## HL-W05 Field Learning Kit
*Take the Atlas platform anywhere.* (Field Kit)

A portable battery-backed Hybrid Living field kit for off-site workshops, community education events, and cohort sessions outside the Foundry. Mesh-connected via Meshtastic for remote data sync. The AI Tutor Task Agent and P.E.T.E.E.R. framework run locally on the NVMe: no internet required.

### Hardware
- Raspberry Pi 5 8GB
- PiSugar 3 Plus Battery
- Whisplay HAT
- ReSpeaker 4-Mic Array v2.0
- LILYGO T-Deck Meshtastic
- Pi M.2 HAT+ + 1TB NVMe
- 3D-printed Bambu A1 carry case (PETG)

### ZenFlow agents
- [[AI Tutor Task Agent]] (offline mode)
- [[P.E.T.E.E.R. Assessment Task Agent]]
- [[Knowledge Keeper (Device Agent)]] (local cache)

### APIs
- ZenFlow Agent API (local cache)
- Anthropic claude-haiku-4-5 (edge inference)
- Meshtastic Python API

### n8n workflows
- Session Archive Sync on Return (fires on reconnect)
- Cohort Engagement Monitor

### MCPs
- ZenFlow Internal API MCP (local cache)
- n8n MCP

### Use case
Hybrid Living deploys to a community center with no reliable internet. The field kit runs the full Atlas learning experience locally, caches all interactions, and auto-syncs to the Foundry NAS and Knowledge Keeper the moment it reconnects to the mesh.

### Build outcome
Portable Atlas learning kit: full AI tutor offline, mesh sync, auto-archive on reconnect, P.E.T.E.E.R. assessment.

**Est. budget:** ~$380–$510
