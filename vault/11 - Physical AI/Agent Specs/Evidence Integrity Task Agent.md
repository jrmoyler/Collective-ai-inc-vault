---
title: Evidence Integrity Task Agent
tags:
- device-agent
- physical-ai
- wearables
- edge-terminal
tier: not stated
type: device-agent
model: claude-haiku-4-5
owner: JR Moyler (Hataalii)
device: OA-W03 Forensic Evidence Node
source: Physical AI Wearables Agent Spec
status: spec
updated: 2026-10-04
division: Obsidian Arc
clearance: Aegis-governed device(s); see Aegis clause
device_count: 1
---
# Evidence Integrity Task Agent

Device agent from the [[Physical AI Wearables Agent Spec]]. Divisions: [[Obsidian Arc Division]].

## Role
Runs on the Forensic Evidence Node. Every image is SHA-256 hashed on-device at capture, written to an encrypted NVMe partition and backed up to an air-gapped Synology NAS partition.

## Device it runs on
**OA-W03 Forensic Evidence Node** (Edge Terminal), described in [[Wearables Agent Spec — Obsidian Arc Devices]]. A 64MP camera + Jetson node for forensic-grade evidence capture. Every image is hashed on-device (SHA-256) at the moment of capture, written to an encrypted NVMe partition, and backed up to an air-gapped Synology NAS partition. The Evidence Integrity Task Agent logs each capture as a Knowledge Keeper entry with hash, timestamp, capture context, and Aegis classification.

## Inputs and sensors
- **Forensic Evidence Node**: NVIDIA Jetson Orin Nano Super; Arducam 64MP Hawkeye Camera; Raspberry Pi 5 (controller); Synology NAS air-gapped partition

## Outputs and actions
- Log each capture as a Knowledge Keeper entry with hash, timestamp, capture context and Aegis classification
- On Forensic Evidence Node: During a Juris Guard legal matter, Obsidian Arc captures documentary evidence. Every photograph is hash-signed on-device, logged to Knowledge Keeper with legal context, and immediately backed up to the air-gapped NAS partition: tamper-evident chain of custody from the moment of capture.

## Permissions
API and MCP access listed for its device(s):
- **Forensic Evidence Node**: APIs: ZenFlow /v1/knowledge/write; ZenFlow /v1/aegis (evidence classification); Anthropic claude-haiku-4-5 (context tagging); Synology NAS API. MCPs: ZenFlow Internal API MCP; Sentry MCP.

## Aegis clause
- **Forensic Evidence Node**: Each capture carries an Aegis classification via /v1/aegis.

## Escalation
Alert and review workflows on its devices:
- **Forensic Evidence Node**: Aegis Protocol Compliance Logger

## System prompt
The spec gives no system prompt text for this agent.

## Dependencies
- Co-resident agents: [[Aegis Protocol Guardian]], [[Knowledge Keeper (Device Agent)]]
- n8n workflows: Aegis Protocol Compliance Logger; Evidence Archive Sync (NAS backup trigger). See [[n8n Workflow Blueprint]].
- MCPs: ZenFlow Internal API MCP; Sentry MCP
- Models as written in the spec: claude-haiku-4-5. Current vault routing is in [[Agent Tier Registry]].
