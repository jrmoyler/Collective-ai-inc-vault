---
title: Passport Lanyard Controller
cost: ~$90-$150
tags:
- wearable
- physical-ai
- nomad-nexus
- lanyard
type: wearable
owner: JR Moyler (Hataalii)
phase: prototype
source: Wearable Catalog
status: Aegis-Hold (prototype)
updated: 2026-10-04
category: Lanyard
cost_low: 90
division: Nomad Nexus
cost_high: 150
data_class: standard internal
form_factor: lanyard
catalog_entry: 94
division_status: chartered
---
# Passport Lanyard Controller

**Lanyard** for [[Nomad Nexus Division]] · budget **~$90-$150** · status: staged under Aegis-Hold. Part of the [[Wearable Catalog]].

## Purpose
Travel lanyard controller for event check-ins, remote-work sessions, and client demos.

## Spec
| Field | Value |
|---|---|
| Form factor | lanyard |
| Catalog category | Lanyard |
| Entity | Nomad Nexus (Global Mobility and Digital Nomad Infrastructure) |
| Budget | ~$90-$150 |
| Industrial design | Sand lanyard module with globe/route lines. |
| Data class | standard internal |

## Sensors, signals and outputs
- Check-in
- Task trigger
- Haptic receipt

## Bill of materials
| # | Part |
|---|---|
| 1 | Circuit Playground Bluefruit |
| 2 | NFC |
| 3 | LiPo |
| 4 | Haptic |
| 5 | Buttons |

The catalog prices the whole build at **~$90-$150**; it does not itemize per-part costs or name a firmware build. Shared parts are standardized platforms, see [[Wearable Catalog — Shared Platforms]].

## Agents and APIs
Nomad Nexus trip log, Knowledge Keeper.

Linked notes: [[Director_Nomad_Nexus]], [[Knowledge_Keeper]]

## Safety gate and data handling
- **Safety gate:** No sensitive travel docs stored on-device.
- **Data class:** standard internal
- Physical autonomy stays staged under Aegis-Hold until testing, human review, logging and deployment safety checks are complete.

## Deployment gate
Steps from the catalog build governance rules ([[Wearable Catalog — Build Governance]]):
- [ ] Assign device ID, owner, division, firmware version, physical label and registry entry
- [ ] Start on VLAN 80 Quarantine
- [ ] Pass Binary Loom QA
- [ ] Pass Aegis review ([[Aegis Protocol]])
- [ ] LiPo: fire-safe charging, thermal monitoring where possible, labeled storage

## Related
- Division: [[Nomad Nexus Division]]
- Hub: [[Wearable Catalog]]
- Standards: [[Wearable Catalog — Operating Standard]], [[Wearable Catalog — Build Governance]]
