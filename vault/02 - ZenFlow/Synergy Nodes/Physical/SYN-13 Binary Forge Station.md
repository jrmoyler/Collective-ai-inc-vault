---
title: SYN-13 Binary Forge Station
id: SYN-13
cost: ~$3,200–$4,200
kind: physical
tags:
- synergy-node
- physical-node
- phase-1
type: synergy-node
owner: JR Moyler (Hataalii)
phase: 1
source: Full Synergy Node Catalog
status: planned
updated: 2026-10-04
divisions: Binary Loom, Animus Prime
---
# SYN-13 Binary Forge Station

Physical Synergy Node SYN-13 from the [[Full Synergy Node Catalog]]. Phase 1 — Fabrication Anchor. Divisions: [[Binary Loom Division]] ✦ [[Animus Prime Division]].

> [!success] Phase 1 anchor — build this first
> Build the Binary Forge Station first — it produces custom enclosures and parts for every subsequent physical node, reducing per-node cost throughout the entire build sequence.

| Field | Value |
|---|---|
| Node | SYN-13 |
| Kind | Physical hardware fusion node |
| Phase | 1 — Fabrication Anchor |
| Divisions | Binary Loom, Animus Prime |
| Est. build budget | ~$3,200–$4,200 |
| Status | planned |

## Why These Divisions Fuse
Binary Loom provides the fabrication infrastructure — 3D printers, electronics bench, prototyping tools. Animus Prime consumes it constantly: android shells, bracket mounts, servo housings, cable channels, hand bones. Co-locating fabrication intelligence with the Animus Prime build pipeline means the forge station self-manages its print queue based on active build specs.

## Product Description
A dual-printer fabrication workstation where Binary Loom's print queue management Pi node is directly integrated with Animus Prime's parts manifest database. When Animus Prime's CAD pipeline generates a new part spec, the Binary Loom Print Queue Agent automatically receives the STL, selects the correct printer, assigns material, slices, and queues the job. The Animus Prime Parts Tracker Task Agent monitors print completion and updates the Prime Shell BOM in Notion when each part is done.

## Hardware Components (Bill of Materials)
The catalog gives one estimated budget for the whole build (~$3,200–$4,200); it does not price parts individually.
- Bambu Lab A1 — fast prototyping printer (PLA, PETG, TPU)
- Bambu Lab P1S — structural prints (ABS, ASA, CF-PETG for Animus parts)
- Raspberry Pi 5 8GB — print queue manager + BOM tracker
- Whisplay HAT — print queue status + BOM display
- Hakko FX-888D soldering station
- Rigol DS1054Z oscilloscope
- Adafruit feather breakout boards + component bins ×30+
- Label printer + QR/barcode scanner — parts tracking

## ZenFlow Agents
- Binary Loom Print Queue Agent
- Animus Prime Parts Tracker Task Agent
- BOM Sync Agent (Notion integration)
- ZenFlow Knowledge Keeper

## n8n Workflows
- STL-to-Print-Queue Automation — Animus CAD to Binary Loom printer
- BOM Completion Updater — marks parts done in Notion on print completion
- Material Inventory Alert — fires when filament low
- Parts Registry Logger — every printed part logged to Knowledge Keeper

## Division Contributions
| Division | Contribution |
|---|---|
| [[Binary Loom Division]] | Print farm management, queue intelligence, material selection, fabrication logging, Natural Script print routing |
| [[Animus Prime Division]] | CAD pipeline, parts manifest database, BOM management, android build spec generation |

## Build Outcome
Self-managing fabrication station — Animus Prime generates the part spec; Binary Loom prints, tracks, and logs it automatically.

**Est. budget:** ~$3,200–$4,200

## Phase Context
Build the Binary Forge Station first — it produces custom enclosures and parts for every subsequent physical node, reducing per-node cost throughout the entire build sequence.

> [!note] Build rule
> Phase 1 funds Phase 2. Phase 2 funds Phase 3. Phase 3 funds Phase 4. Do not build Phase 4 before Phase 1 proves revenue and operating discipline. This applies to both digital and physical nodes.

## Related
- [[Natural Script]]
- [[Prime Humanoid R&D]]
- [[Knowledge Keeper]]
- [[Director_Binary_Loom]]
- [[Director_Animus_Prime]]
- [[Full Synergy Node Catalog]]
- [[Synergy Node Handbook]]
- [[Aegis Protocol]]
