---
title: JG-02 Compliance Audit Node
id: JG-02
cost: ~$350–$500 (beyond Mac mini infrastructure)
tags:
- physical-ai
- build-spec
- hardware
- juris-guard
- mac-mini
type: build-spec
owner: JR Moyler (Hataalii)
phase: prototype
source: Physical AI Build Spec
status: specified
updated: 2026-10-04
cost_low: 350
division: Juris Guard
cost_high: 500
division_status: operating
---
# JG-02 Compliance Audit Node

*Every decision logged, every policy enforced.*

**Division:** [[Juris Guard Division]] (operating) · **Director:** [[Director_Juris_Guard]] · **Hub:** [[Physical AI Build Spec]]

| Field | Value |
|---|---|
| Build ID | `JG-02` |
| Product | Compliance Audit Node |
| Est. budget | ~$350–$500 (beyond Mac mini infrastructure) |
| Parts listed | 6 |
| Status | Specified in build spec (prototype to working product) |

## What it is

A dedicated Mac mini node running Juris Guard's compliance monitoring agents. Isolated on its own VLAN, it ingests policy documents, monitors agent actions across the cluster, and flags violations to the Aegis Command Station.

## Outcome

AI governance monitoring — policy ingestion, cluster-wide compliance flagging, encrypted audit log.

## Hardware (bill of materials)

- [ ] Mac mini M4 24GB (Juris Guard node)
- [ ] Raspberry Pi 5 (audit display)
- [ ] Whisplay HAT
- [ ] Pi M.2 HAT+ + 2TB NVMe (encrypted)
- [ ] Synology NAS encrypted audit partition
- [ ] Labeled Cat6A drop to VLAN 20

Est. budget: **~$350–$500 (beyond Mac mini infrastructure)**. All parts come from the Physical AI Foundry Catalog (2025–2026). Shared parts across builds are listed in [[Physical AI Build Spec — Hardware Component Index]].

## Connected builds

- [[P-01 Aegis Command Station (Build Spec)]]
