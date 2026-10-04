---
title: Quantum Genesis Token Logger Task Agent
tags:
- device-agent
- physical-ai
- wearables
- edge-terminal
tier: not stated
type: device-agent
model: claude-sonnet-4-6
owner: JR Moyler (Hataalii)
device: QL-W03 Chain Ledger Node
source: Physical AI Wearables Agent Spec
status: spec
updated: 2026-10-04
division: Quantum Ledger
clearance: Aegis-governed device(s); see Aegis clause
device_count: 1
---
# Quantum Genesis Token Logger Task Agent

Device agent from the [[Physical AI Wearables Agent Spec]]. Divisions: [[Quantum Ledger Division]].
Related: [[Quantum Genesis]].

## Role
Runs on the Chain Ledger Node.

## Device it runs on
**QL-W03 Chain Ledger Node** (Edge Terminal), described in [[Wearables Agent Spec — Quantum Ledger Devices]]. A Mac mini node running a local blockchain light client, Web3 wallet monitor, and Quantum Genesis token event logger. All DeFi protocol risk feeds are ingested by the DeFi Risk Monitor Agent, which produces a weekly risk brief. The Regulatory Compliance Monitor n8n workflow ingests SEC, CFTC, and FinCEN RSS feeds and routes Claude summaries to the compliance log.

## Inputs and sensors
- **Chain Ledger Node**: Mac mini M4 24GB (Quantum Ledger node); Raspberry Pi 5 + Whisplay HAT; Synology NAS encrypted share

## Outputs and actions
- Log, timestamp and risk-score every on-chain event for Quantum Genesis tokens
- On Chain Ledger Node: Every on-chain event for Quantum Genesis tokens is logged, timestamped, and risk-scored by the Token Logger Task Agent. When a DeFi protocol shows TVL anomaly signals, the Risk Monitor fires a Slack alert and queues an aegis_review in the Aegis Protocol before any automated action.

## Permissions
API and MCP access listed for its device(s):
- **Chain Ledger Node**: APIs: Anthropic claude-sonnet-4-6; Blockscout API (on-chain data); LunarCrush API (sentiment); SEC/CFTC RSS feeds; LSEG data API; Notion API. MCPs: Blockscout MCP; LSEG MCP; FactSet MCP; LunarCrush MCP; ZenFlow Internal API MCP.

## Aegis clause
- **Chain Ledger Node**: DeFi TVL anomaly queues an aegis_review before any automated action.

## Escalation
No escalation path is stated beyond the device's workflows listed under Dependencies.

## System prompt
The spec gives no system prompt text for this agent.

## Dependencies
- Co-resident agents: [[DeFi Risk Monitor Agent]], [[Regulatory Compliance Monitor Agent]], [[Knowledge Keeper (Device Agent)]]
- n8n workflows: Quantum Genesis Tokenization Event Logger; DeFi Protocol Risk Monitor; Regulatory Compliance Monitor; Quantum Alpha Institutional Report Generator. See [[n8n Workflow Blueprint]].
- MCPs: Blockscout MCP; LSEG MCP; FactSet MCP; LunarCrush MCP; ZenFlow Internal API MCP
- Models as written in the spec: claude-sonnet-4-6. Current vault routing is in [[Agent Tier Registry]].
