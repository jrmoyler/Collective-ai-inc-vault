---
title: Wearables Agent Spec — Nexus Labs Devices
tags:
- physical-ai
- wearables
- device-specs
- nexus-labs
type: spec-section
owner: JR Moyler (Hataalii)
source: Physical AI Wearables Agent Spec
updated: 2026-10-04
division: Nexus Labs
device_count: 5
---
# Wearables Agent Spec — Nexus Labs Devices

Section of the [[Physical AI Wearables Agent Spec]]. AI-powered media: the Foundry's storyteller in hardware. Division: [[Nexus Labs Division]].

| Code | Device | Type | Est. budget |
|---|---|---|---|
| NL-W01 | Resonance Studio Node | Physical AI | ~$580–$780 |
| NL-W02 | Vision Director Node | Physical AI | ~$650–$880 |
| NL-W03 | Creator Nexus Wearable | Wearable | ~$120–$170 |
| NL-W04 | Collective Times Broadcast Node | Edge Terminal | ~$280–$380 |
| NL-W05 | Documentary Capture Rig | Physical AI | ~$590–$800 |

## NL-W01 Resonance Studio Node
*Broadcast-quality capture, edge-processed, cloud-distributed.* (Physical AI)

Nexus Labs' primary production terminal. Beamforming mic array, Jetson noise processing, and session transcription via Claude. The Collective Times Content Pipeline n8n workflow fires at session end, auto-drafting a Skool briefing and Meta post from the transcript. All sessions archived to the Synology NAS with searchable embeddings in Knowledge Keeper.

### Hardware
- NVIDIA Jetson Orin Nano Super
- ReSpeaker 4-Mic Array v2.0
- Adafruit I2S Speaker Bonnet
- Stereo 3W speakers
- Pi M.2 HAT+ + 2TB NVMe
- Raspberry Pi 5 (UI)
- Whisplay HAT
- 3D-printed Bambu P1S studio wedge

### ZenFlow agents
- [[Collective Times Content Writer Task Agent]]
- [[Transcription Task Agent]]
- [[Knowledge Keeper (Device Agent)]]
- [[Distribution Agent]]

### APIs
- Anthropic claude-sonnet-4-6 (content generation)
- ZenFlow /v1/knowledge/write
- Notion API
- Slack API
- Meta Graph API (post queue)

### n8n workflows
- Collective Times Content Pipeline
- Skool Community Engagement Monitor
- Brand Asset Request Workflow

### MCPs
- Notion MCP
- Slack MCP
- Google Drive MCP
- ZenFlow Internal API MCP

### Use case
JR records a 20-minute strategic session. Resonance Studio Node transcribes it, the Collective Times Content Writer Task Agent produces the newsletter draft, Meta post, and Skool briefing, all within 3 minutes of session end, before JR reviews the recording.

### Build outcome
Production capture station: session transcription, auto-content generation for Collective Times, Meta, Skool.

**Est. budget:** ~$580–$780

## NL-W02 Vision Director Node
*4-camera AI director: every frame tagged and filed.* (Physical AI)

A 4-camera production node for content sessions. AI camera handles on-sensor scene tagging, Jetson runs object/person detection and clip classification, and all footage is indexed with searchable metadata in the Knowledge Keeper. The Creator Nexus platform receives a structured content brief automatically after each session.

### Hardware
- Raspberry Pi 5 8GB (×2)
- Pi Camera Module 3 Wide (×2)
- Arducam 64MP Hawkeye (hero close-up)
- Pi AI Camera (Sony IMX500 scene tagging)
- NVIDIA Jetson Orin Nano Super
- Pi M.2 HAT+ + 2TB NVMe
- 3D-printed Bambu P1S multi-mount rig

### ZenFlow agents
- [[Vision Tagging Task Agent]]
- [[Creator Nexus Brief Generator]]
- [[Knowledge Keeper (Device Agent)]]
- [[Distribution Agent]]

### APIs
- Anthropic claude-haiku-4-5 (clip metadata)
- ZenFlow /v1/knowledge/write
- Notion API
- HeyGen API (optional avatar layer)

### n8n workflows
- Collective Times Content Pipeline
- Creator Nexus Brief Auto-Generator
- Brand Asset Request Workflow

### MCPs
- Notion MCP
- Google Drive MCP
- ZenFlow Internal API MCP
- Cloudinary MCP

### Use case
A 60-minute content session produces 4 camera angles, all AI-tagged by scene type. The Creator Nexus Brief Generator produces a structured repurposing plan (clips → Reels, long-form → YouTube, key quotes → social) before the editor reviews a single frame.

### Build outcome
4-camera AI production node: scene tagging, clip metadata, auto content brief, Creator Nexus pipeline.

**Est. budget:** ~$650–$880

## NL-W03 Creator Nexus Wearable
*The creator's always-on co-pilot.* (Wearable)

A BLE badge for Nexus Labs creators that passively captures ambient audio and ideation moments. One press of the Circuit Playground button triggers a 'capture moment': a 15-second audio clip sent to a Task Agent that tags it, adds context, and files it in the Creator Nexus idea vault in Notion. Haptic confirmation tells the creator the idea was saved without breaking creative flow.

### Hardware
- Seeed XIAO ESP32S3 Sense
- Circuit Playground Bluefruit
- Adafruit DRV2605L Haptic Controller
- PowerBoost 1000 + LiPo
- 3D-printed Bambu A1 TPU creator clip

### ZenFlow agents
- [[Idea Capture Task Agent]]
- [[Creator Nexus Vault Agent]]
- [[Knowledge Keeper (Device Agent)]]

### APIs
- ZenFlow /v1/knowledge/write
- Anthropic claude-haiku-4-5 (tagging)
- Notion API
- Slack API

### n8n workflows
- Collective Times Content Pipeline
- Skool Community Engagement Monitor

### MCPs
- Notion MCP
- Slack MCP
- ZenFlow Internal API MCP

### Use case
A creator mid-walk has an idea for the next Collective Times angle. One button press. The Idea Capture Task Agent saves a tagged audio note to the Creator Nexus vault in Notion and a haptic pulse confirms receipt. The idea is in the pipeline before they get back to their desk.

### Build outcome
Creator wearable: one-press idea capture, AI tagging, Notion vault sync, haptic confirmation.

**Est. budget:** ~$120–$170

## NL-W04 Collective Times Broadcast Node
*The newsletter, produced by the room.* (Edge Terminal)

A dedicated Pi 5 terminal permanently running the Collective Times content pipeline. Monitors AI/tech news via RSS + Perplexity API, routes summaries to Claude, and queues the daily Skool briefing and Meta post for JR's approval, all without manual input. JR reviews on the Whisplay display and approves with a button press. The entire Collective Times production cycle runs on this single node.

### Hardware
- Raspberry Pi 5 8GB
- Whisplay HAT (review + approval UI)
- Pi Camera Module 3 (presence trigger)
- Pi M.2 HAT+ + 1TB NVMe
- Adafruit I2S Speaker Bonnet
- PiSugar 3 Plus Battery
- 3D-printed Bambu A1 desk broadcast node

### ZenFlow agents
- [[Collective Times Content Writer Task Agent]]
- [[Research Director]]
- [[Distribution Agent]]
- [[Skool Community Monitor Agent]]

### APIs
- Anthropic claude-sonnet-4-6
- Perplexity Pro API (news research)
- Notion API
- Slack API
- Meta Graph API

### n8n workflows
- Collective Times Content Pipeline
- Skool Community Engagement Monitor
- Portfolio Revenue Dashboard Sync (weekly brief)

### MCPs
- Notion MCP
- Slack MCP
- ZenFlow Internal API MCP
- Google Drive MCP

### Use case
Every morning at 7AM, the Broadcast Node's n8n workflow pulls overnight AI news, Claude drafts the Collective Times briefing, and the display shows JR the draft. One button press publishes to Skool and queues the Meta post. Total time investment: 90 seconds.

### Build outcome
Autonomous Collective Times production node: daily AI news brief, auto-draft, one-press publish to Skool + Meta.

**Est. budget:** ~$280–$380

## NL-W05 Documentary Capture Rig
*The Foundry's story, captured in real time.* (Physical AI)

A mobile 3-camera rig for capturing Collective AI documentary footage across the Foundry. Global shutter for fast-motion sequences (drone bench, robot arms), wide for environment, and AI camera for scene tagging. Jetson inference runs local shot classification, automatically organizing raw footage into scene folders by division and activity type for post-production.

### Hardware
- Pi Global Shutter Camera (fast motion)
- Pi Camera Module 3 Wide (environment)
- Pi AI Camera (scene classifier)
- NVIDIA Jetson Orin Nano Super (inference)
- Raspberry Pi 5 (controller)
- PiSugar 3 Plus Battery
- Pi M.2 HAT+ + 2TB NVMe
- 3D-printed Bambu P1S 3-camera bracket rig

### ZenFlow agents
- [[Scene Classification Task Agent]]
- [[Creator Nexus Brief Generator]]
- [[Knowledge Keeper (Device Agent)]]

### APIs
- Anthropic claude-haiku-4-5 (scene metadata)
- ZenFlow /v1/knowledge/write
- Cloudinary API (media management)
- Notion API

### n8n workflows
- Creator Nexus Brief Auto-Generator
- Brand Asset Request Workflow

### MCPs
- Cloudinary MCP
- Notion MCP
- ZenFlow Internal API MCP

### Use case
Nexus Labs captures a 3-hour Foundry build day. The Scene Classification Task Agent auto-sorts 200+ clips into labeled folders by division, activity type, and shot composition. The post editor receives a structured assembly brief with recommended cuts: no manual logging required.

### Build outcome
Mobile documentary rig: 3-camera capture, AI scene classification, auto-sorted footage, assembly brief.

**Est. budget:** ~$590–$800
