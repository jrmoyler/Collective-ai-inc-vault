---
title: SYN-16 Civic Babel Kiosk
id: SYN-16
cost: ~$520–$720 per unit
kind: physical
tags:
- synergy-node
- physical-node
- phase-3
type: synergy-node
owner: JR Moyler (Hataalii)
phase: 3
source: Full Synergy Node Catalog
status: planned
updated: 2026-10-04
divisions: Civic Core, Aether Link
---
# SYN-16 Civic Babel Kiosk

Physical Synergy Node SYN-16 from the [[Full Synergy Node Catalog]]. Phase 3 — Mobility + Actuation. Divisions: [[Civic Core Division]] ✦ [[Aether Link Division]].

| Field | Value |
|---|---|
| Node | SYN-16 |
| Kind | Physical hardware fusion node |
| Phase | 3 — Mobility + Actuation |
| Divisions | Civic Core, Aether Link |
| Est. build budget | ~$520–$720 per unit |
| Status | planned |

## Why These Divisions Fuse
Civic Core serves communities with limited English proficiency who need access to digital services. Aether Link provides multilingual translation through Babel AI. A public kiosk combining both removes the language barrier from digital equity entirely.

## Product Description
A multilingual public access kiosk deploying Civic Core digital equity services with Aether Link Babel AI real-time translation making every service available in any language. The kiosk requires no language selection — it adapts automatically from first utterance via Whisper speech-to-text, translating all UI text and audio responses in real time.

## Hardware Components (Bill of Materials)
The catalog gives one estimated budget for the whole build (~$520–$720 per unit); it does not price parts individually.
- Raspberry Pi 5 8GB — kiosk controller with Babel AI edge inference
- Waveshare 13.3" touchscreen — primary multilingual UI surface
- ReSpeaker 4-Mic Array v2.0 — multilingual voice input with language detection
- Adafruit I2S 3W Stereo Speaker — multilingual audio output
- PN532 NFC reader — ID document reading for service eligibility
- Pi M.2 HAT+ + 1TB NVMe — translation model cache + community resource database
- LTE/4G USB modem — connectivity fallback
- Bambu P1S ABS kiosk enclosure — vandal-resistant

## ZenFlow Agents
- Civic Core Community Engagement Agent
- Aether Link Babel AI Translation Agent
- Language Detection Task Agent (automatic)
- ZenFlow Knowledge Keeper

## n8n Workflows
- Real-Time Translation Pipeline — every UI interaction translated on-demand
- Civic Resource Cache Sync — daily community service database update
- Translation Quality Audit Logger — feeds Aether Link accuracy improvement

## Division Contributions
| Division | Contribution |
|---|---|
| [[Civic Core Division]] | Digital equity service navigation, community resource access, grant pathways, public service portal |
| [[Aether Link Division]] | Babel AI real-time multilingual translation, language detection, translation quality audit, accessibility |

## Build Outcome
Language-barrier-free civic kiosk — automatic translation makes every community service accessible in any language.

**Est. budget:** ~$520–$720 per unit

## Phase Context
Kiosks, rovers, and labs. Ground-level mobility and human interaction surfaces. Aegis-Hold for all actuation nodes until e-stop verification is complete.

> [!note] Build rule
> Phase 1 funds Phase 2. Phase 2 funds Phase 3. Phase 3 funds Phase 4. Do not build Phase 4 before Phase 1 proves revenue and operating discipline. This applies to both digital and physical nodes.

## Related
- [[Babel AI]]
- [[Digital Equity Initiative]]
- [[Community Resource Network]]
- [[Knowledge Keeper]]
- [[Director_Civic_Core]]
- [[Director_Aether_Link]]
- [[Full Synergy Node Catalog]]
- [[Synergy Node Handbook]]
- [[Aegis Protocol]]
