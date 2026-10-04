---
title: Wearables Agent Spec — The Collective Devices
tags:
- physical-ai
- wearables
- device-specs
- the-collective
type: spec-section
owner: JR Moyler (Hataalii)
source: Physical AI Wearables Agent Spec
updated: 2026-10-04
division: The Collective
device_count: 5
---
# Wearables Agent Spec — The Collective Devices

Section of the [[Physical AI Wearables Agent Spec]]. Expert AI consulting: the revenue engine with a physical presence. Division: [[The Collective Division]].

| Code | Device | Type | Est. budget |
|---|---|---|---|
| TC-W01 | Herald Consultant Badge | Wearable | ~$130–$190 |
| TC-W02 | Client Intelligence Terminal | Edge Terminal | ~$550–$730 |
| TC-W03 | Strategy Scan Node | Physical AI | ~$500–$680 |
| TC-W04 | AI Audit Wearable Kit | Wearable | ~$280–$400 per 3-badge kit |
| TC-W05 | Workshop Presence Node | Physical AI | ~$400–$550 |

## TC-W01 Herald Consultant Badge
*The consulting credential that captures the session.* (Wearable)

A smart clip badge for all Collective consultants. Captures ambient session audio, logs key phrases via BLE to the nearest Pi gateway, triggers the Inbound Inquiry → Proposal Generator n8n workflow on new client intake, and delivers haptic confirmation when a proposal draft lands in Notion. Each badge maps to a consultant's agent persona in the ZenFlow registry.

### Hardware
- Seeed XIAO ESP32S3 Sense
- Adafruit DRV2605L Haptic Controller
- Circuit Playground Bluefruit
- PowerBoost 1000 + LiPo
- 3D-printed Bambu A1 TPU badge shell

### ZenFlow agents
- [[Inbound Inquiry Handler]] (Task Agent)
- [[Knowledge Keeper (Device Agent)]]
- [[Proposal Generator Task Agent]]

### APIs
- ZenFlow /v1/knowledge/write
- Anthropic claude-sonnet-4-6 (proposal drafting)
- Notion API
- Slack API

### n8n workflows
- Inbound Inquiry → Proposal Generator
- Client Onboarding Sequence
- Cross-Division Intelligence Request Router

### MCPs
- Notion MCP
- Slack MCP
- ZenFlow Internal API MCP

### Use case
During a discovery call, the consultant's badge logs the conversation. At call end, the Proposal Generator Task Agent fires, drafts an SOW in Notion, and the consultant's badge vibrates to confirm delivery, all before the client hangs up.

### Build outcome
Smart consulting badge: session capture, auto-proposal trigger, Notion delivery confirmation, client CRM logging.

**Est. budget:** ~$130–$190

## TC-W02 Client Intelligence Terminal
*Know the client before you walk in the room.* (Edge Terminal)

A Pi 5 + Jetson desk terminal for pre-engagement research and real-time session support. Before a client meeting, the Research Director agent (powered by Perplexity + Claude) builds a full intelligence brief. During the meeting, the ReSpeaker array captures questions and a Task Agent provides real-time research support through the Whisplay display without interrupting the consultant.

### Hardware
- NVIDIA Jetson Orin Nano Super
- Raspberry Pi 5 + Whisplay HAT
- ReSpeaker 4-Mic Array v2.0
- Pi Camera Module 3
- Adafruit I2S Speaker Bonnet
- Pi M.2 HAT+ + 1TB NVMe
- 3D-printed Bambu P1S conference wedge

### ZenFlow agents
- [[Research Director]]
- [[Proposal Generator Task Agent]]
- [[Knowledge Keeper (Device Agent)]]
- [[Client Intelligence Task Agent]]

### APIs
- Anthropic claude-sonnet-4-6
- Perplexity Pro API (pre-meeting research)
- Notion API
- Slack API
- Apollo/Clearbit enrichment API

### n8n workflows
- Inbound Inquiry → Proposal Generator
- Client Onboarding Sequence
- Brand Asset Request Workflow

### MCPs
- Notion MCP
- Slack MCP
- Google Drive MCP
- ZenFlow Internal API MCP

### Use case
Research Director pre-loads a client intelligence brief 30 minutes before every meeting. During the call, the terminal's Task Agent monitors the conversation and surfaces competitive data on the Whisplay screen: the consultant sees answers before the client finishes asking.

### Build outcome
Pre-meeting intelligence terminal: auto-briefing, real-time research support, session logging, proposal trigger.

**Est. budget:** ~$550–$730

## TC-W03 Strategy Scan Node
*Whiteboards become structured strategy documents.* (Physical AI)

A 64MP camera + Jetson node that photographs whiteboards, sticky-note frameworks, and physical documents during consulting sessions, then runs Claude-powered OCR and structural analysis. Outputs land in Notion as formatted strategy documents within 90 seconds of capture. Integrates with the Brand Asset Request Workflow for any frameworks that need designed.

### Hardware
- NVIDIA Jetson Orin Nano Super
- Arducam 64MP Hawkeye Camera
- Raspberry Pi 5 (controller + display)
- Whisplay HAT
- Pi M.2 HAT+ + 1TB NVMe
- 3D-printed Bambu P1S adjustable scan arm

### ZenFlow agents
- [[OCR + Structure Task Agent]]
- [[Research Director]]
- [[Knowledge Keeper (Device Agent)]]

### APIs
- ZenFlow /v1/knowledge/write
- Anthropic claude-sonnet-4-6 (structure extraction)
- Notion API
- Figma API (design hand-off)

### n8n workflows
- Brand Asset Request Workflow
- Inbound Inquiry → Proposal Generator

### MCPs
- Notion MCP
- Figma MCP
- Google Drive MCP
- ZenFlow Internal API MCP

### Use case
Consultant photographs a whiteboard at session end. Within 90 seconds, Claude has extracted the framework, structured it as a Notion document, and a design-ready version is queued in Figma for the Brand Asset Request Workflow.

### Build outcome
Whiteboard-to-Notion pipeline: 64MP capture, Claude OCR + structure, auto-formatted strategy doc, Figma queue.

**Est. budget:** ~$500–$680

## TC-W04 AI Audit Wearable Kit
*The AI readiness audit, worn by the client.* (Wearable)

A 3-badge wearable kit deployed to client teams during AI readiness audits. Each badge captures ambient workflow signals (motion patterns, conversation frequency, device interaction cadence) and logs them as structured behavioral data to the Collective's Mac mini. The Audit Intelligence Task Agent synthesizes these signals alongside interview data to generate a scored AI readiness report.

### Hardware
- Arduino Nano 33 BLE Sense Rev2 (×3)
- Adafruit DRV2605L Haptic Controller (×3)
- IMU BNO085 (×3)
- PowerBoost 1000 + LiPo (×3)
- 3D-printed Bambu A1 TPU client badge shells (×3)

### ZenFlow agents
- [[Audit Intelligence Task Agent]]
- [[Research Director]]
- [[Knowledge Keeper (Device Agent)]]
- [[Proposal Generator Task Agent]]

### APIs
- ZenFlow /v1/knowledge/write
- Anthropic claude-sonnet-4-6 (report generation)
- Notion API
- Airtable API (scoring matrix)

### n8n workflows
- AI Readiness Audit Scoring
- Client Onboarding Sequence
- Impact Report Auto-Generator

### MCPs
- Notion MCP
- Airtable MCP
- ZenFlow Internal API MCP

### Use case
During a 2-day AI readiness audit, client team members wear the badges. Behavioral signals + interview data feed the Audit Intelligence Task Agent, which generates a scored report with specific AI implementation recommendations by end of day 2.

### Build outcome
Client-worn AI audit kit: behavioral signal capture, automated readiness scoring, report generation.

**Est. budget:** ~$280–$400 per 3-badge kit

## TC-W05 Workshop Presence Node
*The room knows who's engaged.* (Physical AI)

A Pi 5 + AI camera + depth sensor node deployed in workshop spaces. Tracks participant engagement levels via presence detection and micro-motion analysis, feeding real-time engagement data to the Knowledge Keeper. When engagement drops below threshold, a Task Agent notifies the facilitator via haptic badge pulse and suggests a format change using the Collective's workshop playbook.

### Hardware
- Raspberry Pi 5 8GB
- Raspberry Pi AI Camera (Sony IMX500)
- Luxonis OAK-D Lite (depth)
- IMU BNO085
- Whisplay HAT (facilitator display)
- Pi M.2 HAT+ + 512GB NVMe
- 3D-printed Bambu A1 ceiling/shelf mount

### ZenFlow agents
- [[Engagement Monitor Task Agent]]
- [[Knowledge Keeper (Device Agent)]]
- [[Workshop Facilitator Task Agent]]

### APIs
- ZenFlow /v1/knowledge/write
- Anthropic claude-haiku-4-5 (edge inference)
- Slack API (facilitator alert)

### n8n workflows
- Cross-Division Weekly Standup Digest
- Participant Success Story Pipeline

### MCPs
- Slack MCP
- Notion MCP
- ZenFlow Internal API MCP

### Use case
During a 4-hour AI strategy workshop, the node monitors group engagement. At the 2-hour mark, it detects declining attention, fires a Task Agent that suggests a 10-minute breakout exercise, and logs the intervention in Knowledge Keeper for future workshop optimization.

### Build outcome
Workshop engagement sensor: real-time attention monitoring, facilitator alerts, intervention suggestions, session logging.

**Est. budget:** ~$400–$550
