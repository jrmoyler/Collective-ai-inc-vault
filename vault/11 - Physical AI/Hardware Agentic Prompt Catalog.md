---
title: Hardware Agentic Prompt Catalog
tags:
- hub
- hardware
- prompt-catalog
- physical-ai
- image-prompt
type: hub
owner: JR Moyler (Hataalii)
parts: 7
source: Hardware Agentic Prompt Catalog
updated: 2026-10-04
prompt_count: 116
---
# Hardware Agentic Prompt Catalog

Image-generation prompt catalog for every Collective AI hardware asset: drones, androids, Titan industrial robots, Ground Vector autonomous vehicles, division terminals, agentic-integration visuals and campus scenes. Each prompt has its own note with the full prompt text.

> [!info] Headline counts
> - 116 prompts across 7 parts
> - Part 1: 33 · Part 2: 32 · Part 3: 7 · Part 4: 8 · Part 5: 22 · Part 6: 6 · Part 7: 8
> - 48 prompts carry a TOOLKIT line (agent + API + n8n workflow pairing)
> - Covers all 20 divisions plus the parent company

## How the catalog works
- Every prompt has an ID, a title, a MODE and an aspect ratio (`--ar`).
- Modes used: MODE 1 Artistic Scene, MODE 2 Architectural, MODE 3 Character Pose Sheet, MODE 5 Front-Back View, MODE 6 Full Body Design Sheet, MODE 8 Multiple Pose Sheet.
- Mode counts: MODE 1 Scene: 55, MODE 2 Architectural: 3, MODE 3 Character Pose Sheet: 4, MODE 5 Front-Back View: 6, MODE 6 Design Sheet: 46, MODE 8 Multiple Pose Sheet: 2
- Part 1 states the target models: Nano Banana 2, GPT Image 2, Midjourney, Grok Imagine. Other parts don't name a model.
- Brand hex codes inside prompts follow [[Division Palettes]] and [[Design System Bible v3]].
- Toolkit lines pair hardware with ZenFlow agents, n8n workflows (see [[n8n Workflow Blueprint]]) and MCP servers. The catalog calls the stack the "120-tool toolkit"; the vault's current list is [[External Toolkit — 130 Tools]].

> [!note] Canon notes
> - The source spells "Vector Shift". Notes use "VectorShift" ([[VectorShift Division]]), including inside prompt text.
> - Tier labels and model strings in toolkit lines are kept as written. Current routing: [[Agent Tier Registry]]. Tier 1 is [[ZENITH]] alone.
> - [[Helios Grid]] (named in TA-P01) stays blocked pending an SEC legal opinion.
> - These are concept prompts. They don't mean the hardware exists. Collective AI has 0 paying customers and $0 MRR as of Sept 2026.
> - The catalog shows the ZenFlow lattice as "600 agents"; that is the catalog's visual framing.


## Part 1 — Drone Fleet

### VectorShift — Sky Vector

| ID | Prompt | Device | Division | Mode | AR |
|---|---|---|---|---|---|
| SV-01 | [[SV-01 Sky Vector Delivery Drone — Full Body Design Sheet — Prompt]] | Sky Vector Delivery Drone | VectorShift | 6 | 3:2 |
| SV-02 | [[SV-02 Sky Vector Drone — Front-Back Reference — Prompt]] | Sky Vector Delivery Drone | VectorShift | 5 | 5:4 |
| SV-03 | [[SV-03 Sky Vector Drone — Artistic Hero Scene — Prompt]] | Sky Vector Delivery Drone | VectorShift | 1 | 16:9 |
| SV-04 | [[SV-04 Sky Vector Swarm — Formation Scene — Prompt]] | Sky Vector Delivery Drone | VectorShift | 1 | 21:9 |
| SV-05 | [[SV-05 Sky Vector Recon-Surveillance Variant — Prompt]] | Sky Vector Recon Drone | VectorShift | 1 | 16:9 |
| SV-06 | [[SV-06 Ground Vector Long-Haul Truck — Full Body Design Sheet — Prompt]] | Ground Vector Long-Haul Truck | VectorShift | 6 | 3:2 |
| SV-07 | [[SV-07 Ground Vector Urban Last-Mile Van — Prompt]] | Ground Vector Urban Last-Mile Van | VectorShift | 6 | 3:2 |
| SV-08 | [[SV-08 Ground Vector Fleet — Night Convoy Scene — Prompt]] | Ground Vector Long-Haul Truck | VectorShift | 1 | 21:9 |
| SV-09 | [[SV-09 Vector Hub Logistics Dock — Architectural Scene — Prompt]] | Ground Vector Logistics Hub (Vector Hub) | VectorShift | 2 | 16:9 |

### Obsidian Arc

| ID | Prompt | Device | Division | Mode | AR |
|---|---|---|---|---|---|
| OA-01 | [[OA-01 OA-S6 Sentinel Drone — Full Body Design Sheet — Prompt]] | OA-S6 Sentinel Drone | Obsidian Arc | 6 | 3:2 |
| OA-02 | [[OA-02 Obsidian Arc Security Drone — Pose Sheet — Prompt]] | OA-S6 Sentinel Drone | Obsidian Arc | 3 | 3:1 |
| OA-03 | [[OA-03 Obsidian Arc Perimeter Drone — Hardened Variant — Prompt]] | Obsidian Arc Perimeter Drone | Obsidian Arc | 6 | 3:2 |
| OA-04 | [[OA-04 Night Surveillance Scene — Prompt]] | OA-S6 Sentinel Drone | Obsidian Arc | 1 | 16:9 |
| OA-05 | [[OA-05 Drone Wall — Campus Perimeter Scene — Prompt]] | Obsidian Arc Perimeter Drone | Obsidian Arc | 1 | 21:9 |

### Juris Guard

| ID | Prompt | Device | Division | Mode | AR |
|---|---|---|---|---|---|
| JG-01 | [[JG-01 JG-47 Enforcement Drone — Full Body Design Sheet — Prompt]] | JG-47 Enforcement Drone | Juris Guard | 6 | 3:2 |
| JG-02 | [[JG-02 JG-47 Enforcement Drone — Scene — Prompt]] | JG-47 Enforcement Drone | Juris Guard | 1 | 16:9 |
| JG-03 | [[JG-03 JG-47 — Evidence Collection Scene — Prompt]] | JG-47 Enforcement Drone | Juris Guard | 1 | 16:9 |

### Vital Helix

| ID | Prompt | Device | Division | Mode | AR |
|---|---|---|---|---|---|
| VH-01 | [[VH-01 VX6 Medical Rapid-Response Drone — Full Body Design Sheet — Prompt]] | VX6 Medical Rapid-Response Drone | Vital Helix | 6 | 3:2 |
| VH-02 | [[VH-02 VX6 Medical Drone — Campus Emergency Scene — Prompt]] | VX6 Medical Rapid-Response Drone | Vital Helix | 1 | 16:9 |
| VH-03 | [[VH-03 Medical Drone Delivery Network — Scene — Prompt]] | Vital Helix Medical Drone Network | Vital Helix | 1 | 16:9 |

### Kinetic Edge

| ID | Prompt | Device | Division | Mode | AR |
|---|---|---|---|---|---|
| KE-01 | [[KE-01 Athletic Tracking Drone — Full Body Design Sheet — Prompt]] | KE-01 Athletic Tracking Drone | Kinetic Edge | 6 | 3:2 |
| KE-02 | [[KE-02 KE-01 Athletic Tracking Scene — Prompt]] | KE-01 Athletic Tracking Drone | Kinetic Edge | 1 | 16:9 |
| KE-03 | [[KE-03 KE-01 — Game Coverage Scene — Prompt]] | KE-01 Athletic Tracking Drone | Kinetic Edge | 1 | 21:9 |

### Gaia Synthesis

| ID | Prompt | Device | Division | Mode | AR |
|---|---|---|---|---|---|
| GS-01 | [[GS-01 GS-6X Agri Monitor Drone — Full Body Design Sheet — Prompt]] | GS-6X Agri Monitor Drone | Gaia Synthesis | 6 | 3:2 |
| GS-02 | [[GS-02 GS-6X — Crop Survey Scene — Prompt]] | GS-6X Agri Monitor Drone | Gaia Synthesis | 1 | 21:9 |
| GS-03 | [[GS-03 Seed Dispersal Swarm — Scene — Prompt]] | Gaia Synthesis Seed-Dispersal Micro-Drone Swarm | Gaia Synthesis | 1 | 21:9 |

### Aether Link

| ID | Prompt | Device | Division | Mode | AR |
|---|---|---|---|---|---|
| AL-01 | [[AL-01 AL-MRD4 Mesh Relay Drone — Full Body Design Sheet — Prompt]] | AL-MRD4 Mesh Relay Drone | Aether Link | 6 | 3:2 |
| AL-02 | [[AL-02 AL-MRD4 — Campus Connectivity Scene — Prompt]] | AL-MRD4 Mesh Relay Drone | Aether Link | 1 | 16:9 |
| AL-03 | [[AL-03 Mesh Relay Drone — Emergency Deploy Scene — Prompt]] | AL-MRD4 Mesh Relay Drone | Aether Link | 1 | 16:9 |

### Terra Axis

| ID | Prompt | Device | Division | Mode | AR |
|---|---|---|---|---|---|
| TA-01 | [[TA-01 TAI-8 Infrastructure Inspection Drone — Full Body Design Sheet — Prompt]] | TAI-8 Infrastructure Inspection Drone | Terra Axis | 6 | 3:2 |
| TA-02 | [[TA-02 TAI-8 — Campus Building Inspection Scene — Prompt]] | TAI-8 Infrastructure Inspection Drone | Terra Axis | 1 | 16:9 |

### ZenFlow

| ID | Prompt | Device | Division | Mode | AR |
|---|---|---|---|---|---|
| ZF-01 | [[ZF-01 ZenFlow Intelligence Relay Drone — Full Body Design Sheet — Prompt]] | ZenFlow Intelligence Relay Drone | ZenFlow | 6 | 3:2 |
| ZF-02 | [[ZF-02 ZenFlow Drone — Campus Intelligence Network Scene — Prompt]] | ZenFlow Intelligence Relay Drone | ZenFlow | 1 | 16:9 |

## Part 2 — Android Fleet — Campus Units

### Gaia Synthesis — Solar Androids

| ID | Prompt | Device | Division | Mode | AR |
|---|---|---|---|---|---|
| SOL-01 | [[SOL-01 Solar Android — Full Body Design Sheet — Prompt]] | Solar Android | Gaia Synthesis | 6 | 3:2 |
| SOL-02 | [[SOL-02 Solar Android — Front-Back Reference — Prompt]] | Solar Android | Gaia Synthesis | 5 | 5:4 |
| SOL-03 | [[SOL-03 Solar Android — Outdoor Campus Scene — Prompt]] | Solar Android | Gaia Synthesis | 1 | 16:9 |
| SOL-04 | [[SOL-04 Solar Android — Campus Duties Pose Sheet — Prompt]] | Solar Android | Gaia Synthesis | 3 | 3:1 |
| SOL-05 | [[SOL-05 Solar Android — Multiple Pose Sheet — Prompt]] | Solar Android | Gaia Synthesis | 8 | 1:1 |

### Aether Link — Hydro Androids

| ID | Prompt | Device | Division | Mode | AR |
|---|---|---|---|---|---|
| HYD-01 | [[HYD-01 Hydro Android — Full Body Design Sheet — Prompt]] | Hydro Android | Aether Link | 6 | 3:2 |
| HYD-02 | [[HYD-02 Hydro Android — Front-Back Reference — Prompt]] | Hydro Android | Aether Link | 5 | 5:4 |
| HYD-03 | [[HYD-03 Hydro Android — Campus Scene — Prompt]] | Hydro Android | Aether Link | 1 | 16:9 |
| HYD-04 | [[HYD-04 Hydro Android — Comms Duties Pose Sheet — Prompt]] | Hydro Android | Aether Link | 3 | 3:1 |
| HYD-05 | [[HYD-05 Hydro Android — Night Campus Scene — Prompt]] | Hydro Android | Aether Link | 1 | 21:9 |

### Animus Prime — Prime Directorate — Social Androids

| ID | Prompt | Device | Division | Mode | AR |
|---|---|---|---|---|---|
| SOC-01 | [[SOC-01 Social Campus Android — Full Body Design Sheet — Prompt]] | Social Campus Android | Animus Prime | 6 | 3:2 |
| SOC-02 | [[SOC-02 Social Android — Front-Back Reference — Prompt]] | Social Campus Android | Animus Prime | 5 | 5:4 |
| SOC-03 | [[SOC-03 Social Android — Interaction Pose Sheet — Prompt]] | Social Campus Android | Animus Prime | 3 | 3:1 |
| SOC-04 | [[SOC-04 Social Android — Campus Welcome Scene — Prompt]] | Social Campus Android | Animus Prime | 1 | 16:9 |
| SOC-05 | [[SOC-05 Social Android Expression Sheet — Prompt]] | Social Campus Android | Animus Prime | 8 | 1:1 |
| SOC-06 | [[SOC-06 Social Android Trio — Campus Community Scene — Prompt]] | Social Campus Android | Animus Prime | 1 | 21:9 |

### Vital Helix — Medical Androids

| ID | Prompt | Device | Division | Mode | AR |
|---|---|---|---|---|---|
| MED-01 | [[MED-01 Medical Campus Android — Full Body Design Sheet — Prompt]] | Medical Campus Android | Vital Helix | 6 | 3:2 |
| MED-02 | [[MED-02 Medical Android — Patient Assist Scene — Prompt]] | Medical Campus Android | Vital Helix | 1 | 16:9 |

### Obsidian Arc — Security Androids

| ID | Prompt | Device | Division | Mode | AR |
|---|---|---|---|---|---|
| SEC-01 | [[SEC-01 Security Campus Android — Full Body Design Sheet — Prompt]] | Security Campus Android | Obsidian Arc | 6 | 3:2 |
| SEC-02 | [[SEC-02 Security Android — Perimeter Patrol Scene — Prompt]] | Security Campus Android | Obsidian Arc | 1 | 16:9 |

### Hybrid Living — Education Androids

| ID | Prompt | Device | Division | Mode | AR |
|---|---|---|---|---|---|
| EDU-01 | [[EDU-01 Education Campus Android — Full Body Design Sheet — Prompt]] | Education Campus Android | Hybrid Living | 6 | 3:2 |
| EDU-02 | [[EDU-02 Education Android — Classroom Scene — Prompt]] | Education Campus Android | Hybrid Living | 1 | 16:9 |

### VectorShift — Logistics Androids

| ID | Prompt | Device | Division | Mode | AR |
|---|---|---|---|---|---|
| LOG-01 | [[LOG-01 Logistics Campus Android — Full Body Design Sheet — Prompt]] | Logistics Campus Android | VectorShift | 6 | 3:2 |
| LOG-02 | [[LOG-02 Logistics Android — Campus Delivery Scene — Prompt]] | Logistics Campus Android | VectorShift | 1 | 16:9 |

### Gaia Synthesis — Agricultural Androids

| ID | Prompt | Device | Division | Mode | AR |
|---|---|---|---|---|---|
| AGR-01 | [[AGR-01 Agricultural Campus Android — Full Body Design Sheet — Prompt]] | Agricultural Campus Android | Gaia Synthesis | 6 | 3:2 |
| AGR-02 | [[AGR-02 Agricultural Android — Campus Biosphere Scene — Prompt]] | Agricultural Campus Android | Gaia Synthesis | 1 | 16:9 |

### ZenFlow / Binary Loom — Research Androids

| ID | Prompt | Device | Division | Mode | AR |
|---|---|---|---|---|---|
| RES-01 | [[RES-01 Research Android — Full Body Design Sheet — Prompt]] | Research Android | ZenFlow, Binary Loom | 6 | 3:2 |
| RES-02 | [[RES-02 Research Android — Data Lab Scene — Prompt]] | Research Android | ZenFlow, Binary Loom | 1 | 16:9 |

### Eon Core — Longevity Androids

| ID | Prompt | Device | Division | Mode | AR |
|---|---|---|---|---|---|
| EON-01 | [[EON-01 Longevity Wellness Android — Full Body Design Sheet — Prompt]] | Longevity Wellness Android | Eon Core | 6 | 3:2 |
| EON-02 | [[EON-02 Longevity Android — Wellness Scene — Prompt]] | Longevity Wellness Android | Eon Core | 1 | 16:9 |

### Campus Android Family — Cross-Division

| ID | Prompt | Device | Division | Mode | AR |
|---|---|---|---|---|---|
| CAM-01 | [[CAM-01 All Three Power-Type Androids — Lineup — Prompt]] | Campus Android Family (solar, social, hydro) | Gaia Synthesis, Animus Prime, Aether Link | 1 | 21:9 |
| CAM-02 | [[CAM-02 Full Android Family — Design Comparison Sheet — Prompt]] | Campus Android Family (solar, social, hydro) | Gaia Synthesis, Animus Prime, Aether Link | 6 | 3:2 |

## Part 3 — Industrial Robots — Titan Directorate

### Animus Prime — Titan Directorate

| ID | Prompt | Device | Division | Mode | AR |
|---|---|---|---|---|---|
| TI-01 | [[TI-01 Titan Construction Robot — Full Body Design Sheet — Prompt]] | Titan Construction Robot | Animus Prime | 6 | 3:2 |
| TI-02 | [[TI-02 Titan Robot — Front-Back Reference — Prompt]] | Titan Construction Robot | Animus Prime | 5 | 5:4 |
| TI-03 | [[TI-03 Titan — Smart Factory Assembly Scene — Prompt]] | Titan Construction Robot | Animus Prime | 1 | 16:9 |
| TI-04 | [[TI-04 Titan — Campus Construction Scene — Prompt]] | Titan Construction Robot | Animus Prime | 1 | 16:9 |
| TI-05 | [[TI-05 Titan Agricultural Robot (Gaia Synthesis) — Prompt]] | Titan Agricultural Robot | Gaia Synthesis, Animus Prime | 6 | 3:2 |
| TI-06 | [[TI-06 Titan Medical Assembly Robot (Vital Helix) — Prompt]] | Titan Medical Assembly Robot | Vital Helix, Animus Prime | 6 | 3:2 |
| TI-07 | [[TI-07 Titan Infrastructure Maintenance Robot (Terra Axis) — Prompt]] | Titan Infrastructure Maintenance Robot | Terra Axis, Animus Prime | 6 | 3:2 |

## Part 4 — Autonomous Fleet Vehicles

### VectorShift — Ground Vector Fleet

| ID | Prompt | Device | Division | Mode | AR |
|---|---|---|---|---|---|
| GV-01 | [[GV-01 Ground Vector Long-Haul Truck — Full Body Design Sheet — Prompt]] | Ground Vector Long-Haul Truck | VectorShift | 6 | 3:2 |
| GV-02 | [[GV-02 Ground Vector Truck — Front-Side Reference — Prompt]] | Ground Vector Long-Haul Truck | VectorShift | 5 | 5:4 |
| GV-03 | [[GV-03 Ground Vector — Night Convoy Scene — Prompt]] | Ground Vector Long-Haul Truck | VectorShift | 1 | 21:9 |
| GV-04 | [[GV-04 Ground Vector Urban Last-Mile Van — Design Sheet — Prompt]] | Ground Vector Urban Last-Mile Van | VectorShift | 6 | 3:2 |
| GV-05 | [[GV-05 Ground Vector Medical Rapid-Response Van — Prompt]] | Ground Vector Medical Rapid-Response Van | Vital Helix, VectorShift | 6 | 3:2 |
| GV-06 | [[GV-06 Ground Vector Agricultural Transport — Prompt]] | Ground Vector Agricultural Transport | Gaia Synthesis, VectorShift | 6 | 3:2 |
| GV-07 | [[GV-07 Nomad Nexus Campus Shuttle — Prompt]] | Nomad Nexus Campus Shuttle | VectorShift, Nomad Nexus | 6 | 3:2 |
| GV-08 | [[GV-08 Ground Vector Hub — Architectural Scene — Prompt]] | Ground Vector Logistics Hub (Vector Hub) | VectorShift | 2 | 16:9 |

## Part 5 — Division Hardware Assets — All 20 Divisions + Parent

### Parent Company

| ID | Prompt | Device | Division | Mode | AR |
|---|---|---|---|---|---|
| CAI-P01 | [[CAI-P01 Collective AI Command Station — Scene — Prompt]] | Collective AI Command Station | Collective AI (Parent), Animus Prime, VectorShift | 1 | 21:9 |
| CAI-P02 | [[CAI-P02 Parent Hardware Family — Product Reveal — Prompt]] | Parent Hardware Family | Collective AI (Parent), Gaia Synthesis, Animus Prime, Aether Link, VectorShift | 1 | 21:9 |

### ZenFlow

| ID | Prompt | Device | Division | Mode | AR |
|---|---|---|---|---|---|
| ZF-P01 | [[ZF-P01 ZenFlow Aegis Command Terminal — Design Sheet — Prompt]] | ZenFlow Aegis Command Terminal | ZenFlow | 6 | 3:2 |

### The Collective

| ID | Prompt | Device | Division | Mode | AR |
|---|---|---|---|---|---|
| TC-P01 | [[TC-P01 The Collective AI Strategy Terminal — Scene — Prompt]] | The Collective AI Strategy Terminal | The Collective | 1 | 16:9 |

### Hybrid Living

| ID | Prompt | Device | Division | Mode | AR |
|---|---|---|---|---|---|
| HL-P01 | [[HL-P01 Atlas Platform Education Terminal — Design Sheet — Prompt]] | Atlas Platform Education Terminal | Hybrid Living | 6 | 3:2 |

### Nexus Labs

| ID | Prompt | Device | Division | Mode | AR |
|---|---|---|---|---|---|
| NL-P01 | [[NL-P01 Nexus Labs Creator Broadcast Station — Scene — Prompt]] | Nexus Labs Creator Broadcast Station | Nexus Labs | 1 | 16:9 |

### Terra Axis

| ID | Prompt | Device | Division | Mode | AR |
|---|---|---|---|---|---|
| TA-P01 | [[TA-P01 Terra Axis Smart Building Hub Terminal — Design Sheet — Prompt]] | Terra Axis Smart Building Hub Terminal | Terra Axis | 6 | 3:2 |

### Vital Helix

| ID | Prompt | Device | Division | Mode | AR |
|---|---|---|---|---|---|
| VH-P01 | [[VH-P01 Vital Helix Bio-Digital Twin Station — Design Sheet — Prompt]] | Vital Helix Bio-Digital Twin Station | Vital Helix | 6 | 3:2 |

### Binary Loom

| ID | Prompt | Device | Division | Mode | AR |
|---|---|---|---|---|---|
| BL-P01 | [[BL-P01 Binary Loom Natural Script Dev Terminal — Design Sheet — Prompt]] | Binary Loom Natural Script Dev Terminal | Binary Loom | 6 | 3:2 |

### Quantum Ledger

| ID | Prompt | Device | Division | Mode | AR |
|---|---|---|---|---|---|
| QL-P01 | [[QL-P01 Quantum Ledger Trading Intelligence Terminal — Scene — Prompt]] | Quantum Ledger Trading Intelligence Terminal | Quantum Ledger | 1 | 16:9 |

### Juris Guard

| ID | Prompt | Device | Division | Mode | AR |
|---|---|---|---|---|---|
| JG-P01 | [[JG-P01 Juris Guard Compliance Station — Design Sheet — Prompt]] | Juris Guard Compliance Station | Juris Guard | 6 | 3:2 |

### Signal Velocity

| ID | Prompt | Device | Division | Mode | AR |
|---|---|---|---|---|---|
| SV-P01 | [[SV-P01 Signal Velocity Growth Intelligence Terminal — Scene — Prompt]] | Signal Velocity Growth Intelligence Terminal | Signal Velocity | 1 | 16:9 |

### Nomad Nexus

| ID | Prompt | Device | Division | Mode | AR |
|---|---|---|---|---|---|
| NN-P01 | [[NN-P01 Nomad Nexus Global Mobility Terminal — Design Sheet — Prompt]] | Nomad Nexus Global Mobility Terminal | Nomad Nexus | 6 | 3:2 |

### Eon Core

| ID | Prompt | Device | Division | Mode | AR |
|---|---|---|---|---|---|
| EC-P01 | [[EC-P01 EonOS Longevity Station — Design Sheet — Prompt]] | EonOS Longevity Station | Eon Core | 6 | 3:2 |

### Cognara Mind

| ID | Prompt | Device | Division | Mode | AR |
|---|---|---|---|---|---|
| CM-P01 | [[CM-P01 Cognara Mind Behavioral Intelligence Terminal — Scene — Prompt]] | Cognara Mind Behavioral Intelligence Terminal | Cognara Mind | 1 | 16:9 |

### Obsidian Arc

| ID | Prompt | Device | Division | Mode | AR |
|---|---|---|---|---|---|
| OA-P01 | [[OA-P01 Obsidian Arc Cyber Command Terminal — Design Sheet — Prompt]] | Obsidian Arc Cyber Command Terminal | Obsidian Arc | 6 | 3:2 |

### Kinetic Edge

| ID | Prompt | Device | Division | Mode | AR |
|---|---|---|---|---|---|
| KE-P01 | [[KE-P01 Kinetic Edge Apex System Performance Station — Scene — Prompt]] | Kinetic Edge Apex System Performance Station | Kinetic Edge | 1 | 16:9 |

### Civic Core

| ID | Prompt | Device | Division | Mode | AR |
|---|---|---|---|---|---|
| CC-P01 | [[CC-P01 Civic Core Community Access Terminal — Design Sheet — Prompt]] | Civic Core Community Access Terminal | Civic Core | 6 | 3:2 |

### VectorShift

| ID | Prompt | Device | Division | Mode | AR |
|---|---|---|---|---|---|
| VS-P01 | [[VS-P01 VectorShift Fleet Command Terminal — Design Sheet — Prompt]] | VectorShift Fleet Command Terminal | VectorShift | 6 | 3:2 |

### Animus Prime

| ID | Prompt | Device | Division | Mode | AR |
|---|---|---|---|---|---|
| AP-P01 | [[AP-P01 Animus Prime — Prime Android v1.0 Full Design Sheet — Prompt]] | Prime Android v1.0 | Animus Prime | 6 | 3:2 |

### Aether Link

| ID | Prompt | Device | Division | Mode | AR |
|---|---|---|---|---|---|
| AL-P01 | [[AL-P01 Aether Link Babel Translation Hub — Design Sheet — Prompt]] | Aether Link Babel Translation Hub | Aether Link | 6 | 3:2 |

### Gaia Synthesis

| ID | Prompt | Device | Division | Mode | AR |
|---|---|---|---|---|---|
| GS-P01 | [[GS-P01 Gaia Synthesis Bio-Lab Station — Design Sheet — Prompt]] | Gaia Synthesis Bio-Lab Station | Gaia Synthesis | 6 | 3:2 |

## Part 6 — Agentic Foundry Integration Prompts

### ZenFlow Agent-Driven Hardware Control

| ID | Prompt | Device | Division | Mode | AR |
|---|---|---|---|---|---|
| AF-01 | [[AF-01 ZenFlow Multi-Agent Hardware Coordination — Scene — Prompt]] | ZenFlow Multi-Agent Hardware Coordination | ZenFlow | 1 | 21:9 |
| AF-02 | [[AF-02 Aegis Protocol Safety Override — Hardware Scene — Prompt]] | Aegis Protocol Safety Override | ZenFlow, Animus Prime | 1 | 16:9 |
| AF-03 | [[AF-03 Knowledge Keeper Data Harvest — Multi-Hardware Scene — Prompt]] | Knowledge Keeper Data Harvest | ZenFlow, Animus Prime, VectorShift | 1 | 21:9 |
| AF-04 | [[AF-04 n8n Workflow Hardware Trigger — Visual — Prompt]] | n8n Workflow Hardware Trigger | ZenFlow, Vital Helix | 1 | 16:9 |
| AF-05 | [[AF-05 MCP Server Hardware Integration — Visual — Prompt]] | MCP Server Hardware Integration | ZenFlow, Hybrid Living, Binary Loom | 1 | 16:9 |
| AF-06 | [[AF-06 120-Toolkit Agentic Hardware Stack — Hero Visual — Prompt]] | 120-Toolkit Agentic Hardware Stack | ZenFlow | 1 | 21:9 |

## Part 7 — Cross-Campus Scene Prompts

### Campus Zones — Core, Foundry, Biosphere, Public Interface

| ID | Prompt | Device | Division | Mode | AR |
|---|---|---|---|---|---|
| CZ-01 | [[CZ-01 The Core — Command District Scene — Prompt]] | The Core | ZenFlow, Animus Prime | 1 | 21:9 |
| CZ-02 | [[CZ-02 The Foundry — Industrial District Scene — Prompt]] | The Foundry | Animus Prime, VectorShift | 1 | 21:9 |
| CZ-03 | [[CZ-03 The Biosphere — Eden Spire Scene — Prompt]] | The Biosphere | Gaia Synthesis | 1 | 21:9 |
| CZ-04 | [[CZ-04 The Public Interface — Campus Welcome Zone — Prompt]] | The Public Interface | Vital Helix, Animus Prime, Aether Link | 1 | 21:9 |

### Hardware Family Hero Shots

| ID | Prompt | Device | Division | Mode | AR |
|---|---|---|---|---|---|
| HH-01 | [[HH-01 Full Campus Hardware Assembly — Night Hero — Prompt]] | Full Campus Hardware Assembly | Animus Prime, VectorShift | 1 | 21:9 |
| HH-02 | [[HH-02 Drone Fleet Formation — Hero Shot — Prompt]] | Drone Fleet Formation | Terra Axis, Vital Helix, Gaia Synthesis, Aether Link, Obsidian Arc, Kinetic Edge, Juris Guard, VectorShift | 1 | 21:9 |
| HH-03 | [[HH-03 Android Family — Plaza Scene — Prompt]] | Android Family | Vital Helix, Gaia Synthesis, Animus Prime, Aether Link, Obsidian Arc | 1 | 21:9 |
| HH-04 | [[HH-04 Complete Hardware Ecosystem — Architectural Scene — Prompt]] | Complete Hardware Ecosystem | Animus Prime | 2 | 16:9 |

## Divisions
Each division note has a "Hardware prompts" section listing its prompts.

- [[ZenFlow Division]] (12)
- [[The Collective Division]] (1)
- [[Hybrid Living Division]] (4)
- [[Nexus Labs Division]] (1)
- [[Terra Axis Division]] (5)
- [[Vital Helix Division]] (12)
- [[Binary Loom Division]] (4)
- [[Gaia Synthesis Division]] (19)
- [[Animus Prime Division]] (26)
- [[Aether Link Division]] (15)
- [[Obsidian Arc Division]] (10)
- [[Kinetic Edge Division]] (5)
- [[Civic Core Division]] (1)
- [[Quantum Ledger Division]] (1)
- [[Cognara Mind Division]] (1)
- [[Juris Guard Division]] (5)
- [[Signal Velocity Division]] (1)
- [[VectorShift Division]] (26)
- [[Nomad Nexus Division]] (2)
- [[Eon Core Division]] (3)

## Related
- [[Titan Directorate]] · [[Prime Directorate]] · [[Sky Vector]] · [[Ground Vector]]
- [[Aegis Protocol]] · [[Knowledge Keeper]] · [[Zenith OS]]
- [[002 — Divisions MOC]] · [[003 — Products MOC]] · [[JR Moyler]]
