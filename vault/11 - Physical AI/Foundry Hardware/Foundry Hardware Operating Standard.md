---
title: Foundry Hardware Operating Standard
tags:
- foundry
- physical-ai
- hardware
- governance
type: standard
owner: JR Moyler (Hataalii)
source: Foundry Infrastructure Hardware Catalog
updated: 2026-10-04
---
# Foundry Hardware Operating Standard

Operating standard stated at the front of the [[Foundry Infrastructure Hardware Catalog]].

- The catalog excludes ordinary nodes, terminals, field kits, badges and wrist monitors. It covers control panels, smart furniture, camera rigs, environmental fixtures, storage systems, charging docks, safety hardware, test jigs, display walls, shelves, benches and field infrastructure.
- Every product turns the Foundry into a managed physical operating environment: devices are labeled, registered, powered safely, routed through the right VLAN, and logged into [[Knowledge Keeper]] where appropriate.
- Product concepts avoid duplicate names and repetitive roles. Each division receives five distinct pieces of hardware aligned to its brand persona and operational function.
- Safety-critical infrastructure, actuation, drones, robots, LiPo charging and data-sensitive stations remain under staged Aegis-Hold/Aegis-Review governance until testing is complete.

## Catalog parameters

| Parameter | Value |
|---|---|
| Scope | Parent company + 20 divisions, five distinct hardware products per entity, 105 entries |
| Design system | Dark backgrounds, restrained amber authority, division accent colors, high-contrast product cards, no text over images |
| Source hardware | Raspberry Pi, Jetson, BLE microcontrollers, cameras, audio, haptics, LoRa, fabrication, power, racks, storage, safety equipment |
| Safety gate | Physical autonomy stays staged under Aegis-Hold until testing, human review, logging and deployment safety checks are complete |

> [!info] Aegis states
> Aegis-Clear, Aegis-Review and Aegis-Hold. The [[Aegis Status Beacon]] shows them across the Foundry. See [[Aegis Protocol]].

Related: [[Foundry Hardware Build Governance Rules]], [[Design System Bible v3]].
