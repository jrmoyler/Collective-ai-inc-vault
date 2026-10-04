---
title: Clause Marker Pen Clip
cost: ~$80-$140
tags:
- wearable
- physical-ai
- juris-guard
- pen-clip
type: wearable
owner: JR Moyler (Hataalii)
phase: prototype
source: Wearable Catalog
status: Aegis-Hold (prototype)
updated: 2026-10-04
category: Pen Clip
cost_low: 80
division: Juris Guard
cost_high: 140
data_class: legal
form_factor: pen clip
catalog_entry: 85
division_status: operating
---
# Clause Marker Pen Clip

**Pen Clip** for [[Juris Guard Division]] · budget **~$80-$140** · status: staged under Aegis-Hold. Part of the [[Wearable Catalog]].

## Purpose
Smart clip that turns a normal pen into a clause-marking workflow controller.

## Spec
| Field | Value |
|---|---|
| Form factor | pen clip |
| Catalog category | Pen Clip |
| Entity | Juris Guard (LegalTech and AI Governance) |
| Budget | ~$80-$140 |
| Industrial design | Indigo pen clip with gold micro-button. |
| Data class | legal |

## Sensors, signals and outputs
- Clause marker
- Margin note cue
- Haptic receipt

## Bill of materials
| # | Part |
|---|---|
| 1 | Nano 33 BLE Sense |
| 2 | Tactile micro button |
| 3 | DRV2605L |
| 4 | LiPo |
| 5 | Tiny clip shell |

The catalog prices the whole build at **~$80-$140**; it does not itemize per-part costs or name a firmware build. Shared parts are standardized platforms, see [[Wearable Catalog — Shared Platforms]].

## Agents and APIs
Juris document scanner, OCR annotation system.

Linked notes: [[Director_Juris_Guard]]

## Safety gate and data handling
- **Safety gate:** Annotation assistant only.
- **Data class:** legal — stays local/encrypted unless a reviewed workflow permits export.
- Physical autonomy stays staged under Aegis-Hold until testing, human review, logging and deployment safety checks are complete.

## Deployment gate
Steps from the catalog build governance rules ([[Wearable Catalog — Build Governance]]):
- [ ] Assign device ID, owner, division, firmware version, physical label and registry entry
- [ ] Start on VLAN 80 Quarantine
- [ ] Pass Binary Loom QA
- [ ] Pass Aegis review ([[Aegis Protocol]])
- [ ] LiPo: fire-safe charging, thermal monitoring where possible, labeled storage

## Related
- Division: [[Juris Guard Division]]
- Hub: [[Wearable Catalog]]
- Standards: [[Wearable Catalog — Operating Standard]], [[Wearable Catalog — Build Governance]]
