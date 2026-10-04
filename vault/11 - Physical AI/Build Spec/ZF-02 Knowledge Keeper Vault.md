---
title: ZF-02 Knowledge Keeper Vault
id: ZF-02
cost: ~$400–$600 (beyond Mac mini/NAS infrastructure)
tags:
- physical-ai
- build-spec
- hardware
- zenflow
- mac-mini
type: build-spec
owner: JR Moyler (Hataalii)
phase: prototype
source: Physical AI Build Spec
status: specified
updated: 2026-10-04
cost_low: 400
division: ZenFlow
cost_high: 600
division_status: operating
---
# ZF-02 Knowledge Keeper Vault

*Every session remembered — the memory of the machine.*

**Division:** [[ZenFlow Division]] (operating) · **Director:** [[Director_ZenFlow]] · **Hub:** [[Physical AI Build Spec]]

| Field | Value |
|---|---|
| Build ID | `ZF-02` |
| Product | Knowledge Keeper Vault |
| Est. budget | ~$400–$600 (beyond Mac mini/NAS infrastructure) |
| Parts listed | 6 |
| Status | Specified in build spec (prototype to working product) |

## What it is

A NAS-connected logging node that captures all agent interactions across the 30-node cluster, indexes them with vector embeddings on an NVMe SSD, and serves semantic search from any department shell.

## Outcome

Persistent agent memory store — all interactions indexed, semantically searchable across all 30 nodes.

## Hardware (bill of materials)

- [ ] Mac mini M4 24GB (ZenFlow orchestration node)
- [ ] Synology DS1825+ NAS share
- [ ] Raspberry Pi M.2 HAT+ + 2TB NVMe
- [ ] Raspberry Pi 5 (indexer daemon)
- [ ] Whisplay HAT (status display)
- [ ] 3D-printed Bambu A1 enclosure

Est. budget: **~$400–$600 (beyond Mac mini/NAS infrastructure)**. All parts come from the Physical AI Foundry Catalog (2025–2026). Shared parts across builds are listed in [[Physical AI Build Spec — Hardware Component Index]].

## Related vault notes

- [[Knowledge Keeper]]
- [[Knowledge_Keeper]]
