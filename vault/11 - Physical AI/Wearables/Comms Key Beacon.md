---
title: Comms Key Beacon
cost: ~$75-$130
tags:
- wearable
- physical-ai
- aether-link
- key-fob
type: wearable
owner: JR Moyler (Hataalii)
phase: prototype
source: Wearable Catalog
status: Aegis-Hold (prototype)
updated: 2026-10-04
category: Key Fob
cost_low: 75
division: Aether Link
cost_high: 130
data_class: standard internal
form_factor: key fob
catalog_entry: 65
division_status: chartered
---
# Comms Key Beacon

**Key Fob** for [[Aether Link Division]] · budget **~$75-$130** · status: staged under Aegis-Hold. Part of the [[Wearable Catalog]].

## Purpose
Pocket beacon for checking field mesh membership and summoning backup comms mode.

## Spec
| Field | Value |
|---|---|
| Form factor | key fob |
| Catalog category | Key Fob |
| Entity | Aether Link (Connectivity and Communications) |
| Budget | ~$75-$130 |
| Industrial design | Mint rugged key beacon. |
| Data class | standard internal |

## Sensors, signals and outputs
- BLE check-in
- NFC identity
- Haptic mesh status

## Bill of materials
| # | Part |
|---|---|
| 1 | Circuit Playground Bluefruit |
| 2 | NFC |
| 3 | LiPo |
| 4 | Haptic |
| 5 | Rugged shell |

The catalog prices the whole build at **~$75-$130**; it does not itemize per-part costs or name a firmware build. Shared parts are standardized platforms, see [[Wearable Catalog — Shared Platforms]].

## Agents and APIs
Aether Link registry, Obsidian fallback.

Linked notes: [[Director_Aether_Link]], [[Obsidian Arc Division]]

## Safety gate and data handling
- **Safety gate:** Emergency use policy required.
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
- Division: [[Aether Link Division]]
- Hub: [[Wearable Catalog]]
- Standards: [[Wearable Catalog — Operating Standard]], [[Wearable Catalog — Build Governance]]
