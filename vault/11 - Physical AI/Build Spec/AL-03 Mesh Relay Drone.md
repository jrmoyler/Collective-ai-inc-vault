---
title: AL-03 Mesh Relay Drone
id: AL-03
cost: ~$800–$1,100
tags:
- physical-ai
- build-spec
- hardware
- aether-link
- drone
- aegis-hold
- lora-mesh
type: build-spec
owner: JR Moyler (Hataalii)
phase: prototype
source: Physical AI Build Spec
status: specified
updated: 2026-10-04
cost_low: 800
division: Aether Link
cost_high: 1100
division_status: chartered
---
# AL-03 Mesh Relay Drone

*Communications infrastructure that flies.*

**Division:** [[Aether Link Division]] (chartered, not operating) · **Director:** [[Director_Aether_Link]] · **Hub:** [[Physical AI Build Spec]]

| Field | Value |
|---|---|
| Build ID | `AL-03` |
| Product | Mesh Relay Drone |
| Est. budget | ~$800–$1,100 |
| Parts listed | 7 |
| Status | Specified in build spec (prototype to working product) |

## What it is

An X500-based drone carrying a Pi 5 + LoRa mesh payload for extending the Aether Link mesh network to areas beyond fixed node reach — field operations, disaster comms, remote demos.

## Outcome

Aerial mesh relay — extends LoRa network to remote areas, mobile comms infrastructure.

## Hardware (bill of materials)

- [ ] Holybro X500 V2 ARF Kit
- [ ] Pixhawk 6C Flight Controller
- [ ] Raspberry Pi 5 (companion + mesh payload)
- [ ] LILYGO T-Beam Meshtastic (aerial mesh node)
- [ ] Directional LoRa antennas
- [ ] LiPo battery + XT60 harness
- [ ] 3D-printed Bambu P1S payload enclosure

Est. budget: **~$800–$1,100**. All parts come from the Physical AI Foundry Catalog (2025–2026). Shared parts across builds are listed in [[Physical AI Build Spec — Hardware Component Index]].

> [!warning] Aegis-Hold
> This build has physical autonomy (flight, drive or actuation). The spec stages all physical autonomy behind the Aegis-Hold safety gate. See [[Physical AI Build Spec — Safety and Network Isolation]].
