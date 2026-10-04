---
title: Client Intelligence Task Agent
tags:
- device-agent
- physical-ai
- wearables
- edge-terminal
tier: not stated
type: device-agent
model: claude-sonnet-4-6
owner: JR Moyler (Hataalii)
device: TC-W02 Client Intelligence Terminal
source: Physical AI Wearables Agent Spec
status: spec
updated: 2026-10-04
division: The Collective
clearance: not stated
device_count: 1
---
# Client Intelligence Task Agent

Device agent from the [[Physical AI Wearables Agent Spec]]. Divisions: [[The Collective Division]].

## Role
Runs on the Client Intelligence Terminal during meetings. Monitors the conversation captured by the ReSpeaker array and surfaces competitive data on the Whisplay without interrupting the consultant.

## Device it runs on
**TC-W02 Client Intelligence Terminal** (Edge Terminal), described in [[Wearables Agent Spec — The Collective Devices]]. A Pi 5 + Jetson desk terminal for pre-engagement research and real-time session support. Before a client meeting, the Research Director agent (powered by Perplexity + Claude) builds a full intelligence brief. During the meeting, the ReSpeaker array captures questions and a Task Agent provides real-time research support through the Whisplay display without interrupting the consultant.

## Inputs and sensors
- **Client Intelligence Terminal**: NVIDIA Jetson Orin Nano Super; Raspberry Pi 5 + Whisplay HAT; ReSpeaker 4-Mic Array v2.0; Pi Camera Module 3; Adafruit I2S Speaker Bonnet

## Outputs and actions
- Provide real-time research support on the Whisplay display
- On Client Intelligence Terminal: Research Director pre-loads a client intelligence brief 30 minutes before every meeting. During the call, the terminal's Task Agent monitors the conversation and surfaces competitive data on the Whisplay screen: the consultant sees answers before the client finishes asking.

## Permissions
API and MCP access listed for its device(s):
- **Client Intelligence Terminal**: APIs: Anthropic claude-sonnet-4-6; Perplexity Pro API (pre-meeting research); Notion API; Slack API; Apollo/Clearbit enrichment API. MCPs: Notion MCP; Slack MCP; Google Drive MCP; ZenFlow Internal API MCP.

## Aegis clause
The spec states no device-specific Aegis rule for this agent. The document-wide gate applies: all physical motion is Aegis-cleared before execution. See [[Wearables Agent Spec — Aegis Physical Safety Gate]].

## Escalation
No escalation path is stated beyond the device's workflows listed under Dependencies.

## System prompt
The spec gives no system prompt text for this agent.

## Dependencies
- Co-resident agents: [[Research Director]], [[Proposal Generator Task Agent]], [[Knowledge Keeper (Device Agent)]]
- n8n workflows: Inbound Inquiry → Proposal Generator; Client Onboarding Sequence; Brand Asset Request Workflow. See [[n8n Workflow Blueprint]].
- MCPs: Notion MCP; Slack MCP; Google Drive MCP; ZenFlow Internal API MCP
- Models as written in the spec: claude-sonnet-4-6. Current vault routing is in [[Agent Tier Registry]].
