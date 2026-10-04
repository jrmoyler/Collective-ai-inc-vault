---
title: SYN-05 Resonance Compliance Rig
id: SYN-05
cost: ~$380–$520
kind: physical
tags:
- synergy-node
- physical-node
- phase-2
type: synergy-node
owner: JR Moyler (Hataalii)
phase: 2
source: Full Synergy Node Catalog
status: planned
updated: 2026-10-04
divisions: Nexus Labs, Juris Guard
---
# SYN-05 Resonance Compliance Rig

Physical Synergy Node SYN-05 from the [[Full Synergy Node Catalog]]. Phase 2 — Intelligence + Sensing. Divisions: [[Nexus Labs Division]] ✦ [[Juris Guard Division]].

| Field | Value |
|---|---|
| Node | SYN-05 |
| Kind | Physical hardware fusion node |
| Phase | 2 — Intelligence + Sensing |
| Divisions | Nexus Labs, Juris Guard |
| Est. build budget | ~$380–$520 |
| Status | planned |

## Why These Divisions Fuse
Nexus Labs records sessions for content production. Juris Guard needs tamper-evident hash-signed records for legal matters. The same physical capture hardware serves both — Juris Guard requires SHA-256 hashing at capture time while Nexus Labs needs metadata tagging for content repurposing. Both run simultaneously from a single recording event.

## Product Description
A studio-grade capture node running both the Nexus Labs Collective Times transcription pipeline and the Juris Guard Evidence Integrity chain-of-custody system from one capture session. On record start, the Transcription Task Agent begins session summarization while the Evidence Integrity Task Agent begins SHA-256 hashing each segment — writing tamper-evident hashes to an encrypted NVMe partition before the session ends.

## Hardware Components (Bill of Materials)
The catalog gives one estimated budget for the whole build (~$380–$520); it does not price parts individually.
- Raspberry Pi 5 8GB — dual-pipeline session controller
- ReSpeaker 4-Mic Array v2.0 — studio-quality session capture
- Whisplay HAT — session status + legal hold button
- Pi Camera Module 3 Wide — video capture
- Pi M.2 HAT+ + 2TB NVMe (encrypted) — dual partition: content + evidence
- ATECC608A hardware encryption
- Legal Hold physical Arcade button — GPIO wired, one-touch hold

## ZenFlow Agents
- Nexus Labs Transcription Task Agent
- Juris Guard Evidence Integrity Task Agent
- Content Rights Classification Agent
- ZenFlow Knowledge Keeper

## n8n Workflows
- Nexus Labs Session Capture + Transcription
- Juris Guard Hash-Sign at Capture — SHA-256 per segment
- Legal Hold Escalation — suspends content pipeline, routes to Evidence Vault
- Daily Compliance Audit Report

## Division Contributions
| Division | Contribution |
|---|---|
| [[Nexus Labs Division]] | Session transcription, content asset production, metadata tagging for repurposing pipeline |
| [[Juris Guard Division]] | SHA-256 tamper-evident hashing, encrypted evidence vault, chain-of-custody logging, legal hold protocol |

## Build Outcome
Content capture station with built-in legal integrity — every session is simultaneously content and evidence.

**Est. budget:** ~$380–$520

## Phase Context
Wearables, terminals, compliance rigs, and intelligence kits. The human-scale sensing and data intelligence layer. 11 nodes, no actuation — these can all be built and operated before Phase 3 Aegis-Hold clearance.

> [!note] Build rule
> Phase 1 funds Phase 2. Phase 2 funds Phase 3. Phase 3 funds Phase 4. Do not build Phase 4 before Phase 1 proves revenue and operating discipline. This applies to both digital and physical nodes.

## Related
- [[Collective Times]]
- [[Knowledge Keeper]]
- [[Director_Nexus_Labs]]
- [[Director_Juris_Guard]]
- [[Full Synergy Node Catalog]]
- [[Synergy Node Handbook]]
- [[Aegis Protocol]]
