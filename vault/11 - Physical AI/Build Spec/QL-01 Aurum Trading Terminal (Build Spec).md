---
title: QL-01 Aurum Trading Terminal (Build Spec)
id: QL-01
cost: ~$600–$780
tags:
- physical-ai
- build-spec
- hardware
- quantum-ledger
- jetson
type: build-spec
owner: JR Moyler (Hataalii)
phase: prototype
source: Physical AI Build Spec
status: specified
updated: 2026-10-04
cost_low: 600
division: Quantum Ledger
cost_high: 780
division_status: operating
---
# QL-01 Aurum Trading Terminal (Build Spec)

*Seven years of options experience, in hardware.*

**Division:** [[Quantum Ledger Division]] (operating) · **Director:** [[Director_Quantum_Ledger]] · **Hub:** [[Physical AI Build Spec]]

| Field | Value |
|---|---|
| Build ID | `QL-01` |
| Product | Aurum Trading Terminal |
| Est. budget | ~$600–$780 |
| Parts listed | 8 |
| Status | Specified in build spec (prototype to working product) |

## What it is

Quantum Ledger's dedicated financial intelligence terminal. A Jetson-powered inference node with Whisplay display, Pi camera for QR/doc scan, and NVMe-backed local market data cache.

## Outcome

Local trading intelligence terminal — AI inference, signal display, audio alerts, encrypted trade log.

## Hardware (bill of materials)

- [ ] NVIDIA Jetson Orin Nano Super
- [ ] Raspberry Pi 5 (display controller)
- [ ] Whisplay HAT
- [ ] Pi Camera Module 3 (QR scan)
- [ ] Pi M.2 HAT+ + 2TB NVMe
- [ ] ReSpeaker 2-Mics HAT
- [ ] Adafruit I2S Speaker Bonnet
- [ ] 3D-printed Bambu P1S terminal enclosure

Est. budget: **~$600–$780**. All parts come from the Physical AI Foundry Catalog (2025–2026). Shared parts across builds are listed in [[Physical AI Build Spec — Hardware Component Index]].
