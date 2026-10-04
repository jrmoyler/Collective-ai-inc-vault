---
title: SYN-04 Herald Campus Kiosk
id: SYN-04
cost: ~$420–$580
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
divisions: Hybrid Living, Civic Core
---
# SYN-04 Herald Campus Kiosk

Physical Synergy Node SYN-04 from the [[Full Synergy Node Catalog]]. Phase 3 — Mobility + Actuation. Divisions: [[Hybrid Living Division]] ✦ [[Civic Core Division]].

| Field | Value |
|---|---|
| Node | SYN-04 |
| Kind | Physical hardware fusion node |
| Phase | 3 — Mobility + Actuation |
| Divisions | Hybrid Living, Civic Core |
| Est. build budget | ~$420–$580 |
| Status | planned |

## Why These Divisions Fuse
Hybrid Living runs educational programs and needs learner onboarding hardware. Civic Core runs community access programs and needs public-facing digital equity terminals. The same kiosk serves both — Hybrid Living during Academy sessions, Civic Core during community open hours.

## Product Description
A wall-mounted touch kiosk functioning as a Hybrid Living learner onboarding terminal during Academy sessions and a Civic Core public access station during community open hours. Mode switching is automated via n8n time-based trigger — no physical intervention required. All interactions are logged to Knowledge Keeper under respective division partitions.

## Hardware Components (Bill of Materials)
The catalog gives one estimated budget for the whole build (~$420–$580); it does not price parts individually.
- Raspberry Pi 5 8GB — kiosk controller
- Waveshare 10.1" touchscreen — primary interaction surface
- PN532 NFC module — Herald Badge learner check-in
- ReSpeaker 2-Mics Pi HAT — voice accessibility
- Pi Camera Module 3 — presence detection
- Pi M.2 HAT+ + 512GB NVMe — local session data + community resource cache
- CanaKit PoE+ HAT — single-cable installation
- Bambu A1 wall-mount kiosk enclosure

## ZenFlow Agents
- Hybrid Living Cohort Manager Task Agent
- Civic Core Community Engagement Agent
- ZenFlow Knowledge Keeper
- Herald Badge Authentication Task Agent

## n8n Workflows
- Cohort Session Mode Switch — time-based mode toggle
- Learner Attendance Logger — NFC badge tap to Knowledge Keeper
- Civic Core Resource Update Sync — daily community resource refresh

## Division Contributions
| Division | Contribution |
|---|---|
| [[Hybrid Living Division]] | Cohort check-in, learning path display, attendance + assignment logging, Academy session management |
| [[Civic Core Division]] | Community resource portal, digital literacy access, grant application pathways, public service navigation |

## Build Outcome
Dual-mode campus kiosk — learner onboarding during sessions, public community access during open hours.

**Est. budget:** ~$420–$580

## Phase Context
Kiosks, rovers, and labs. Ground-level mobility and human interaction surfaces. Aegis-Hold for all actuation nodes until e-stop verification is complete.

> [!note] Build rule
> Phase 1 funds Phase 2. Phase 2 funds Phase 3. Phase 3 funds Phase 4. Do not build Phase 4 before Phase 1 proves revenue and operating discipline. This applies to both digital and physical nodes.

## Related
- [[Digital Equity Initiative]]
- [[Community Resource Network]]
- [[Knowledge Keeper]]
- [[Director_Hybrid_Living]]
- [[Director_Civic_Core]]
- [[Full Synergy Node Catalog]]
- [[Synergy Node Handbook]]
- [[Aegis Protocol]]
