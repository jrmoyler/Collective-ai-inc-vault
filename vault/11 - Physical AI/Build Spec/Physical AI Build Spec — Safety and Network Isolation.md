---
title: Physical AI Build Spec — Safety and Network Isolation
tags:
- physical-ai
- build-spec
- safety
- aegis-hold
- network-isolation
type: build-spec-section
owner: JR Moyler (Hataalii)
source: Physical AI Build Spec
status: specified
updated: 2026-10-04
---
# Physical AI Build Spec — Safety and Network Isolation

Safety rules and isolation hardware stated in the [[Physical AI Build Spec]]. The spec has no separate safety chapter; this note gathers the cover-page gate and every safety-related part, VLAN drop and privacy rule from the individual builds.

> [!danger] Safety gate
> **Aegis-Hold — all physical autonomy staged.** (Spec cover.) This covers the drones, rovers, arm, hand and android shell below.

## Aegis-Hold enforcement hardware

- [[ZF-03 Agent Eval Bench (Build Spec)]] is described as "the Aegis-Hold enforcement hardware": an isolated sandbox with no VLAN trust until the eval bench signs off. Wired to VLAN 80 Quarantine.

## Builds with physical autonomy (Aegis-Hold applies)

| ID | Build | Autonomy | Safety parts in BOM |
|---|---|---|---|
| TA-01 | [[TA-01 Terra Inspector Drone]] | flight | none listed |
| AL-03 | [[AL-03 Mesh Relay Drone]] | flight | none listed |
| GS-02 | [[GS-02 Field Rover Base]] | drive | Emergency stop switch + fused rails |
| GS-03 | [[GS-03 Gaia Inspection Drone]] | flight | none listed |
| VS-01 | [[VS-01 Sky Vector Dev Drone (Build Spec)]] | flight | Emergency stop + ground station Pi 5 |
| VS-02 | [[VS-02 Ground Vector Rover (Build Spec)]] | drive | Emergency stop + fused rails |
| AP-01 | [[AP-01 Prime Shell v0.1 (Build Spec)]] | actuation | Emergency stop + fused rails |
| AP-02 | [[AP-02 Titan Bench Arm (Build Spec)]] | actuation | Emergency stop switch + fused rails |
| AP-03 | [[AP-03 Dexterous Hand Node (Build Spec)]] | actuation | Emergency stop + bench PSU |

## Emergency stops and fused rails

- [[BL-03 Infrastructure Wire Bench]] — Emergency stop switches + fuses (inventory)
- [[GS-02 Field Rover Base]] — Emergency stop switch + fused rails
- [[VS-01 Sky Vector Dev Drone (Build Spec)]] — Emergency stop + ground station Pi 5
- [[VS-02 Ground Vector Rover (Build Spec)]] — Emergency stop + fused rails
- [[AP-01 Prime Shell v0.1 (Build Spec)]] — Emergency stop + fused rails
- [[AP-02 Titan Bench Arm (Build Spec)]] — Emergency stop switch + fused rails
- [[AP-03 Dexterous Hand Node (Build Spec)]] — Emergency stop + bench PSU

## Network isolation and encrypted storage (VLAN drops, air gaps)

- [[ZF-03 Agent Eval Bench (Build Spec)]] — Labeled Cat6A drop to VLAN 80 Quarantine
- [[VH-03 Bio-Digital Twin Station]] — Synology NAS share (encrypted partition)
- [[BL-02 Natural Script Compiler Node]] — Labeled Cat6A drop to VLAN 30 Engineering
- [[QL-02 Chain Ledger Node (Build Spec)]] — Synology NAS encrypted share; Labeled Cat6A drop to VLAN 20
- [[OA-01 Cipher Guardian Node]] — isolated from all department nodes for audit integrity
- [[OA-03 Forensic Evidence Node (Build Spec)]] — Pi M.2 HAT+ + 2TB NVMe (encrypted); Synology NAS air-gapped partition; air-gapped (description)
- [[JG-02 Compliance Audit Node]] — Pi M.2 HAT+ + 2TB NVMe (encrypted); Synology NAS encrypted audit partition; Labeled Cat6A drop to VLAN 20
- [[JG-03 Evidence Vault Node]] — Raspberry Pi 5 8GB (air-gap controller); Pi M.2 HAT+ + 2TB NVMe (encrypted); Synology NAS air-gapped partition; Labeled Cat6A drop to VLAN 80 Quarantine; air-gapped (description)

VLANs named in the spec: VLAN 20 (Quantum Ledger and Juris Guard nodes), VLAN 30 Engineering (Binary Loom), VLAN 80 Quarantine (eval bench, evidence vault).

## Zero-trust network core

- [[OA-01 Cipher Guardian Node]] runs UniFi controller, IDS/IPS, VLAN segmentation and camera NVR, isolated from all department nodes.
- [[P-01 Aegis Command Station (Build Spec)]] is the zero-trust network gateway and single point of visibility for all department nodes.

## Privacy and data-locality rules stated in builds

- [[VH-03 Bio-Digital Twin Station]] — all data stored on-premises
- [[BL-02 Natural Script Compiler Node]] — no cloud dependency
- [[OA-03 Forensic Evidence Node (Build Spec)]] — files hashed on-device at ingestion
- [[CC-02 Equity Badge Kit]] — local data only
- [[JG-01 Juris Scan Terminal]] — processing entirely on-premises
- [[JG-03 Evidence Vault Node]] — files hashed on-device at ingestion
- [[NN-03 Visa Intel Terminal]] — processing entirely on-premises
- [[CM-01 Cognara Behavior Node]] — camera is opt-in only

## Related

- [[Aegis Protocol Spec]]
- [[Obsidian Arc Division]]
- [[Juris Guard Division]]
- [[Binary Loom Division]]
