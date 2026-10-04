---
title: ZF-03 Agent Eval Bench (Build Spec)
id: ZF-03
cost: ~$500–$700 (beyond Mac mini infrastructure)
tags:
- physical-ai
- build-spec
- hardware
- zenflow
- jetson
- mac-mini
type: build-spec
owner: JR Moyler (Hataalii)
phase: prototype
source: Physical AI Build Spec
status: specified
updated: 2026-10-04
cost_low: 500
division: ZenFlow
cost_high: 700
division_status: operating
---
# ZF-03 Agent Eval Bench (Build Spec)

*Test every agent before it touches the network.*

**Division:** [[ZenFlow Division]] (operating) · **Director:** [[Director_ZenFlow]] · **Hub:** [[Physical AI Build Spec]]

| Field | Value |
|---|---|
| Build ID | `ZF-03` |
| Product | Agent Eval Bench |
| Est. budget | ~$500–$700 (beyond Mac mini infrastructure) |
| Parts listed | 6 |
| Status | Specified in build spec (prototype to working product) |

## What it is

An isolated Mac mini sandbox node paired with a Jetson for local model testing and agent evaluation. No VLAN trust until the eval bench signs off. The Aegis-Hold enforcement hardware.

## Outcome

Isolated agent evaluation sandbox — model tests, eval runs, no trusted network access until approved.

## Hardware (bill of materials)

- [ ] Mac mini M4 24GB (model sandbox — Mac-30)
- [ ] NVIDIA Jetson Orin Nano Super
- [ ] Logic analyzer Saleae clone
- [ ] Bench power supply
- [ ] Raspberry Pi 5 (test driver)
- [ ] Labeled Cat6A drop to VLAN 80 Quarantine

Est. budget: **~$500–$700 (beyond Mac mini infrastructure)**. All parts come from the Physical AI Foundry Catalog (2025–2026). Shared parts across builds are listed in [[Physical AI Build Spec — Hardware Component Index]].
