---
title: Data Ingestion Task Agent
tags:
- device-agent
- physical-ai
- wearables
- edge-terminal
tier: not stated
type: device-agent
model: claude-haiku-4-5
owner: JR Moyler (Hataalii)
device: ZF-W03 Knowledge Keeper Vault Node
source: Physical AI Wearables Agent Spec
status: spec
updated: 2026-10-04
division: ZenFlow
clearance: not stated
device_count: 1
---
# Data Ingestion Task Agent

Device agent from the [[Physical AI Wearables Agent Spec]]. Divisions: [[ZenFlow Division]].

## Role
Feeds the Knowledge Keeper Vault Node. The Whisplay display on that node shows the live ingestion rate.

## Device it runs on
**ZF-W03 Knowledge Keeper Vault Node** (Edge Terminal), described in [[Wearables Agent Spec — ZenFlow Devices]]. A dedicated NVMe-backed Pi 5 node that serves as the physical Knowledge Keeper endpoint. All 600 ZenFlow agent interactions are indexed here using vector embeddings. The Whisplay display shows live ingestion rate. Any division's physical shell can query this node for semantic search via the ZenFlow /v1/knowledge API, making this the memory hardware for the entire Foundry.

## Inputs and sensors
- **Knowledge Keeper Vault Node**: Raspberry Pi 5 8GB; Whisplay HAT (ingestion rate display)

## Outputs and actions
- Ingest agent interactions into the vector index
- On Knowledge Keeper Vault Node: Every physical AI shell in the Foundry queries this node for agent memory. When a division's Pi shell asks 'what did we decide about the Quantum Ledger Web3 architecture?', the Knowledge Keeper Vault Node returns the indexed answer from any prior session.

## Permissions
API and MCP access listed for its device(s):
- **Knowledge Keeper Vault Node**: APIs: ZenFlow /v1/knowledge (read + write); Anthropic claude-haiku-4-5 (embedding); Notion API (export); OpenTelemetry (traces). MCPs: ZenFlow Internal API MCP; Notion MCP; n8n MCP.

## Aegis clause
The spec states no device-specific Aegis rule for this agent. The document-wide gate applies: all physical motion is Aegis-cleared before execution. See [[Wearables Agent Spec — Aegis Physical Safety Gate]].

## Escalation
No escalation path is stated beyond the device's workflows listed under Dependencies.

## System prompt
The spec gives no system prompt text for this agent.

## Dependencies
- Co-resident agents: [[Knowledge Keeper (Device Agent)]], [[Research Director]]
- n8n workflows: Knowledge Keeper Digest; ZenFlow Marketplace Listing Auto-Generator; Research Pipeline. See [[n8n Workflow Blueprint]].
- MCPs: ZenFlow Internal API MCP; Notion MCP; n8n MCP
- Models as written in the spec: claude-haiku-4-5. Current vault routing is in [[Agent Tier Registry]].
