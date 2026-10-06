---
title: Physical AI Foundry — Segmented Mesh and Private Cloud
tags:
- drive-source
- reference-spec
type: spec
owner: JR Moyler (Hataalii)
status: reference-planned
updated: 2026-10-06
source_refs:
- id: 1pZSHaIg3QjaBn5aKzESwq9zBND7LtshJ
  url: https://drive.google.com/file/d/1pZSHaIg3QjaBn5aKzESwq9zBND7LtshJ/view?usp=drivesdk
  title: Collective_AI_Physical_AI_Foundry_Final.pdf
---
# Physical AI Foundry — Segmented Mesh and Private Cloud

> [!warning] Source build specification
> This is a documented architecture and build plan. Provisioning, deployment, uptime, customer counts, hardware ownership and performance targets require live evidence. Source numbering, director codenames, model identifiers and dates remain historical; current [[Agent Tier Registry]], [[Director Codenames]] and division charters take precedence. Physical autonomy remains Aegis-Hold until staged testing and human approval. Hardware prices are source estimates, not current purchase quotes.

## Linked ownership
- [[Animus Prime Division]]
- [[Binary Loom Division]]
- [[ZenFlow Division]]
- [[Foundry Infrastructure Hardware Catalog]]
- [[011 — Physical AI MOC]]

## Full source section

```text
3. Mesh Network + Autonomous Cloud Hardware
This layer turns the Foundry from a pile of devices into a private, segmented, observable, locally owned agent cloud. The aim
is not only Wi-Fi coverage; the aim is identity, routing, auditability, backup, and hardware-to-agent control.
Item Est. price Description Use case
UniFi Dream Machine Pro Max ~$599-$634 10G cloud gateway, firewall, IDS/IPS, UniFi controller, NVR
option
Network command gateway for Foundry VLANs and
security
UniFi Enterprise XG 24 ~$1,200-$1,470 24x 10GbE RJ45 + 2x 25G SFP28 managed switch Core switch for 30 Mac minis, NAS, Jetsons, and
high-speed storage
UniFi Pro XG 24 PoE ~$1,100-$1,900 10GbE PoE switch option Powers cameras, APs, sensor nodes, desks, and
physical AI devices
UniFi Enterprise 24 PoE ~$799-$865 2.5GbE PoE+ managed access switch Cost-effective PoE layer for cameras, APs, Pi/Jetson
adapters
UniFi U7 Pro Max ~$279 Wi-Fi 7 AP, 6GHz, 8 spatial streams Main indoor high-density wireless layer
UniFi U6 Mesh ~$179-$229 Indoor/outdoor Wi-Fi 6 mesh AP Outdoor, workshop, garage, or mobile bench
coverage
UniFi U7 Outdoor ~$199-$210 Outdoor AP Yard, drone test zone, vehicle bay, exterior mesh
LILYGO T-Beam Meshtastic ~$31-$46 ESP32 LoRa node with GPS options Off-grid telemetry and low-bandwidth field mesh
Heltec V3 / Meshnology N30
Meshtastic
~$27-$30 SX1262 ESP32 LoRa device Low-cost mesh nodes for people, rooms, drones,
vehicles
LILYGO T-Deck Meshtastic ~$68-$82 LoRa handheld with display/keyboard Field terminal for off-grid node status and
messaging
Synology DS1825+ 8-bay NAS ~$1,150-$1,280
diskless
Central storage, snapshots, project archive, backup
target
CAD, models, logs, media, department storage
NAS drives: 8x 12TB-22TB HDD varies Bulk storage pool Local datasets, images, CAD, video, backups
NVMe cache / SSD pool varies High-speed storage tier Model cache, indexes, logs, active project data
CyberPower rackmount UPS
1500VA
~$360-$630 Rack UPS for network and servers Graceful shutdown and power protection
Rack, PDU, patch panel, cable
management
~$400-$1,500+ Physical infrastructure Keeps the local cloud serviceable and labeled
Cat6A bulk cable + patch cords varies 10GbE-ready cabling Department nodes, APs, cameras, workbenches
SFP+/SFP28 DAC or fiber modules varies Switch uplinks and NAS/core links High-throughput rack backbone
Sonnet RackMac mini / xMac mini varies Rackmount and expansion for Mac minis Clean Mac mini cluster mounting and PCIe
expansion
USB4 / Thunderbolt 10GbE
adapters
~$80-$250 10GbE for nodes without built-in 10G Fallback when Mac minis are purchased without
10GbE
LTE/5G failover gateway varies WAN failover for critical demos Keeps cloud-agent operations online when ISP fails
Network Segmentation Blueprint
VLAN Name Devices
10 Command / Admin Parent Mac, infra Macs, admin laptops, controller UI
20 Department Nodes 21 department Mac minis and department-owned services
30 Engineering / Build Engineering Macs, CI workers, repos, build agents
40 Physical AI / Robotics Jetsons, Raspberry Pis, robots, android subsystems, drones on bench
50 Cameras / Sensors PoE cameras, AI cameras, LiDAR gateways, telemetry devices
60 Guest / Workshop Workshop attendees and demo devices
70 LoRa / Field Mesh Bridge Meshtastic gateways, relay nodes, outdoor devices
80 Quarantine / Lab Unknown devices, Alibaba boards, test devices before trust
Local Cloud Software Pattern
Use K3s or Nomad for edge orchestration and Docker Compose for small single-node stacks. K3s is useful for Raspberry Pi,
edge, homelab, IoT, and air-gapped environments; Docker Compose is still the fastest way to define and run multi-container
local apps. Use OpenTelemetry for traces, metrics, and logs. Proxmox is excellent for x86/AMD64 virtualization, but it is not
the default fit for Apple Silicon Mac minis; use separate AMD/Intel mini servers if Proxmox is required.
```

## Source
- [Collective_AI_Physical_AI_Foundry_Final.pdf](https://drive.google.com/file/d/1pZSHaIg3QjaBn5aKzESwq9zBND7LtshJ/view?usp=drivesdk) — Section 3 — Mesh Network + Autonomous Cloud HardwareCOLLECTIVE AI INC / PHYSICAL AI FOUNDRY Architecting a Humane Future. Read in full from Drive on 2026-10-06.

### Source records
- [Collective_AI_Physical_AI_Foundry_Final.pdf](https://drive.google.com/file/d/1pZSHaIg3QjaBn5aKzESwq9zBND7LtshJ/view?usp=drivesdk)

<!-- drive-expansion:dfd71353b30a019d02a3 -->
