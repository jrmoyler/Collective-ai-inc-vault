---
title: Physical AI Wearables Agent Spec
tags:
- hub
- physical-ai
- wearables
- device-agents
type: hub
owner: JR Moyler (Hataalii)
pages: 58
agents: 85
source: Physical AI Wearables Agent Spec
updated: 2026-10-06
products: 56
---
# Physical AI Wearables Agent Spec

Agent-integrated build spec (120-Tool Toolkit Edition) for Collective AI's physical AI and wearable devices. Every product pairs Physical AI Foundry hardware with specific ZenFlow agents, Anthropic APIs, n8n workflows and MCP servers. Owner: [[JR Moyler]] / Hataalii. Classification: Private Operating Blueprint. 58 pages.

## Headline counts
- 56 products: 6 parent + 5 in each of 10 divisions
- 85 distinct device agents (one note each)
- Agent layer: ZenFlow 600-agent lattice, Tiers 1-4
- 150 n8n workflows in the workflow layer
- Models listed: claude-sonnet-4-6, claude-haiku-4-5, claude-opus-4-6 (kept as written; routing in [[Agent Tier Registry]])
- Safety gate: all physical motion Aegis-cleared before execution

> [!note] Status
> These are build specs. Budgets are estimates. Nothing here is a shipped product.

## Cross-cutting sections
- [[Wearables Agent Spec — Architecture and Stack]]
- [[Wearables Agent Spec — Device Data Flow]]
- [[Wearables Agent Spec — Aegis Physical Safety Gate]]
- [[Wearables Agent Spec — Edge and Cloud Model Split]]
- [[Wearables Agent Spec — Haptic Code Map]]
- [[Wearables Agent Spec — n8n Workflow and MCP Index]]
- [[Wearables Agent Spec — Budget Summary]]

## Device sections
| Section | Division | Devices |
|---|---|---|
| [[Wearables Agent Spec — Parent Devices]] | [[Collective AI — Company Charter]] | CAI-W01 Zenith Command Band, CAI-W02 Herald Badge Node, CAI-W03 Aegis Command Station, CAI-W04 Mesh Sentinel Array, CAI-W05 Atlas Perception Tower, CAI-W06 Zenith Oracle Voice Shell |
| [[Wearables Agent Spec — ZenFlow Devices]] | [[ZenFlow Division]] | ZF-W01 CORTEX Director Shell, ZF-W02 Synaptic Relay Badge, ZF-W03 Knowledge Keeper Vault Node, ZF-W04 Agent Eval Bench, ZF-W05 ZenFlow Meshtastic Gateway |
| [[Wearables Agent Spec — The Collective Devices]] | [[The Collective Division]] | TC-W01 Herald Consultant Badge, TC-W02 Client Intelligence Terminal, TC-W03 Strategy Scan Node, TC-W04 AI Audit Wearable Kit, TC-W05 Workshop Presence Node |
| [[Wearables Agent Spec — Hybrid Living Devices]] | [[Hybrid Living Division]] | HL-W01 Atlas Learning Kiosk, HL-W02 Cohort Engagement Badge, HL-W03 Instructor Capture Node, HL-W04 P.E.T.E.E.R. Assessment Node, HL-W05 Field Learning Kit |
| [[Wearables Agent Spec — Nexus Labs Devices]] | [[Nexus Labs Division]] | NL-W01 Resonance Studio Node, NL-W02 Vision Director Node, NL-W03 Creator Nexus Wearable, NL-W04 Collective Times Broadcast Node, NL-W05 Documentary Capture Rig |
| [[Wearables Agent Spec — Quantum Ledger Devices]] | [[Quantum Ledger Division]] | QL-W01 Aurum Trading Terminal, QL-W02 Alpha Signal Wristband, QL-W03 Chain Ledger Node, QL-W04 Market Intelligence Field Kit, QL-W05 Institutional Briefing Node |
| [[Wearables Agent Spec — Kinetic Edge Devices]] | [[Kinetic Edge Division]] | KE-W01 Apex Motion Cage, KE-W02 Kinetic IQ Wearable, KE-W03 Team OS Field Station, KE-W04 Recovery Intelligence Node, KE-W05 Scout Intelligence Terminal |
| [[Wearables Agent Spec — Obsidian Arc Devices]] | [[Obsidian Arc Division]] | OA-W01 Cipher Guardian Rack, OA-W02 Sentinel Prime Tower, OA-W03 Forensic Evidence Node, OA-W04 Threat Intel Wearable, OA-W05 SOC Intelligence Terminal |
| [[Wearables Agent Spec — Animus Prime Devices]] | [[Animus Prime Division]] | AP-W01 Prime Shell v0.1, AP-W02 Titan Bench Arm, AP-W03 Dexterous Hand Node, AP-W04 Mobile Base Rover, AP-W05 Embodied AI Control Wearable |
| [[Wearables Agent Spec — VectorShift Devices]] | [[VectorShift Division]] | VS-W01 Sky Vector Dev Drone, VS-W02 Ground Vector Rover, VS-W03 Logistics Mesh Node, VS-W04 Aerial Mesh Relay Drone, VS-W05 Flight Ops Wearable |
| [[Wearables Agent Spec — Cognara Mind Devices]] | [[Cognara Mind Division]] | CM-W01 Cognitive Coaching Shell, CM-W02 Habit Architecture Wearable, CM-W03 Behavioral Sensing Station, CM-W04 Psychographic Field Kit, CM-W05 Neuro-Pulse Wristband |

## Device agents
### Shared across divisions
- [[Aegis Protocol Guardian]] (21 devices)
- [[Knowledge Keeper (Device Agent)]] (45 devices)
- [[Agent Health Monitor]] (4 devices)
- [[Transcription Task Agent]] (3 devices)
- [[Blueprint Architect]] (2 devices)
- [[CORTEX Director]] (2 devices)
- [[Director_Operations (Device Agent)]] (4 devices)
- [[Physical Security Task Agent]] (5 devices)
- [[Research Director]] (6 devices)
- [[Distribution Agent]] (4 devices)
- [[Obstacle Avoidance Agent]] (3 devices)
- [[Field Telemetry Task Agent]] (5 devices)
### Parent
- [[ZENITH Overseer]]
### ZenFlow
- [[ZenFlow Marketplace Listing Auto-Generator]]
- [[Status Check Task Agent]]
- [[JWT Token Rotation Monitor]]
- [[Data Ingestion Task Agent]]
- [[Model Performance Auditor]]
- [[Agent Spawner]]
- [[MCP Tool Integration Test Agent]]
- [[Device Registry Task Agent]]
### The Collective
- [[Inbound Inquiry Handler]]
- [[Proposal Generator Task Agent]]
- [[Client Intelligence Task Agent]]
- [[OCR + Structure Task Agent]]
- [[Audit Intelligence Task Agent]]
- [[Engagement Monitor Task Agent]]
- [[Workshop Facilitator Task Agent]]
### Hybrid Living
- [[AI Tutor Task Agent]]
- [[Learning Path Agent]]
- [[Cohort Manager Task Agent]]
- [[Curriculum Synthesis Task Agent]]
- [[Nexus Labs Content Relay Task Agent]]
- [[P.E.T.E.E.R. Assessment Task Agent]]
### Nexus Labs
- [[Collective Times Content Writer Task Agent]]
- [[Vision Tagging Task Agent]]
- [[Creator Nexus Brief Generator]]
- [[Idea Capture Task Agent]]
- [[Creator Nexus Vault Agent]]
- [[Skool Community Monitor Agent]]
- [[Scene Classification Task Agent]]
### Quantum Ledger
- [[Quantum Alpha Signal Agent]]
- [[Portfolio P&L Aggregator Task Agent]]
- [[Crypto Risk Monitor Agent]]
- [[Prediction Market Signal Aggregator]]
- [[DeFi Risk Monitor Agent]]
- [[Quantum Genesis Token Logger Task Agent]]
- [[Regulatory Compliance Monitor Agent]]
- [[Quantum Alpha Institutional Report Generator Agent]]
### Kinetic Edge
- [[Apex System Performance Agent]]
- [[Injury Risk Monitor Task Agent]]
- [[Biomechanical Analysis Task Agent]]
- [[Coaching Cue Dispatch Task Agent]]
- [[TeamOS Coaching Agent]]
- [[Voice Observation Task Agent]]
- [[Recovery Intelligence Task Agent]]
- [[Athlete Recovery Alert Agent]]
- [[Vital Helix Integration Task Agent]]
- [[Scout Intelligence Agent]]
- [[Prospect Profile Generator Task Agent]]
### Obsidian Arc
- [[Network Anomaly Detection Agent]]
- [[Spatial Intelligence Task Agent]]
- [[Evidence Integrity Task Agent]]
- [[SOC Incident Commander Task Agent]]
### Animus Prime
- [[Prime Shell Agent]]
- [[Speech Synthesis Task Agent]]
- [[Vision Perception Task Agent]]
- [[Titan Arm Agent]]
- [[LeRobot Teleoperation Task Agent]]
- [[Manipulation Training Data Collector]]
- [[Dexterous Hand Task Agent]]
- [[Grasp Planning Agent]]
- [[Mobile Navigation Task Agent]]
- [[Teleoperation Mapping Task Agent]]
- [[LeRobot Training Data Collector]]
### VectorShift
- [[Sky Vector Flight Agent]]
- [[Ground Vector Navigation Agent]]
- [[Logistics Tracker Task Agent]]
- [[Mesh Relay Flight Agent]]
- [[Aether Link Mesh Extension Task Agent]]
### Cognara Mind
- [[Cognitive Coach Task Agent]]
- [[Behavioral Pattern Analysis Agent]]
- [[Habit Architecture Agent]]
- [[Psychographic Profile Agent]]
- [[Cognitive Load Monitor Task Agent]]

## Related
- [[ZenFlow Master Blueprint]]
- [[Aegis Protocol Spec]]
- [[ZenFlow API]]
- [[n8n Workflow Blueprint]]
- [[002 — Divisions MOC]]

## Drive source audit — original catalog edition

> [!info] Source edition scope
> This is a comparison against the original Drive document, not a new deployment claim. The current catalog and linked item notes above remain in place. Source source-phase revenue figures and hardware costs are targets/estimates. Current canonical division numbers, Director Codenames, [[Agent Tier Registry]] and [[Civic Core Fiduciary Veto]] override older labels/authority. Different wearable editions have different scopes; retain each edition rather than combine their item counts.

### Source-defined scope
```text
Collective AI Inc · Physical AI & Wearables · Agent-Integrated Build Spec · Page 1
COLLECTIVE AI INC
PHYSICAL AI & WEARABLES
Agent-Integrated Build Spec — 120-Tool Toolkit Edition
Every product integrates specific ZenFlow agents, Anthropic APIs, n8n workflows, and MCP servers.
Hardware from the Physical AI Foundry catalog. Intelligence from the 120-tool Collective AI stack.
Owner JR Moyler / Hataalii — Collective AI Inc
Classification Private Operating Blueprint
Entities 1 Parent + 10 Divisions (partial — priority divisions)
Products 56 total products
Agent Layer ZenFlow 600-agent lattice — Tiers 1-4
API Layer Anthropic claude-sonnet-4-6 / claude-haiku-4-5 / claude-opus-4-6
Workflow Layer 150 n8n workflows — named per product
MCP Layer ZenFlow MCP, Notion, Slack, GitHub, Sentry, HuggingFace, Blockscout, LSEG + more
Safety Gate Aegis Protocol — all physical motion Aegis-cleared before execution
Architecting a Humane FutureCollective AI Inc · Physical AI & Wearables · Agent-Integrated Build Spec · Page 2
TABLE OF CONTENTS
PARENT Collective AI Inc 6 products
D-01 ZenFlow 5 products
D-02 The Collective 5 products
D-03 Hybrid Living 5 products
D-04 Nexus Labs 5 products
D-08 Quantum Ledger 5 products
D-09 Kinetic Edge 5 products
D-10 Obsidian Arc 5 products
D-15 Animus Prime 5 products
D-14 Vector Shift 5 products
D-20 Cognara Mind 5 productsCollective AI Inc · Physical AI & Wearables · Agent-Integrated Build Spec · Page 3
PARENT COMPANY
COLLECTIVE AI INC
The physical command layer for a 20-division AI venture studio.
CAI-W01 Wearable
ZENITH COMMAND BAND
JR's wrist becomes the Foundry's nerve center.
A custom smartband for the Founder/CEO that delivers real-time ZenFlow agent status, Aegis Protocol alerts, and division KPI pulses via haptic
codes. BLE-synced to the Aegis Command Station and ZenFlow API. Vibration patterns are mapped to division health states — green pulse for
aegis_clear, amber double-tap for aegis_review, red triple for aegis_hold.
Hardware
• Adafruit Feather nRF52840 Sense
• Adafruit DRV2605L Haptic Controller
• IMU ICM-20948
• PowerBoost 1000 + LiPo cell
• 3D-printed Bambu A1 PETG/TPU wristband
ZenFlow Agents
• ZENITH Overseer (Tier 1)
• Aegis Protocol Guardian
• Knowledge Keeper
• Agent Health Monitor
APIs
• ZenFlow Agent API /v1/aegis/queue
• ZenFlow /v1/agents/health
• Anthropic claude-sonnet-4-6
• Slack alert webhook
n8n Workflows
• ZenFlow Agent Health Monitor (n8n)
• Aegis Incident Reporter (n8n)
• Daily Agent Performance Digest (n8n)
MCPs
• ZenFlow Internal API MCP
• Slack MCP
• n8n MCP
Use Case
JR receives a haptic pulse pattern and knows instantly — without looking
at a screen — whether a division agent is blocked, an Aegis flag is
queued, or the cluster is healthy. Operates 24/7 with 72-hour battery life.
Build Outcome
Always-on Foundry health wristband — Aegis alerts, agent status, KPI
pulses via haptic codes.
Est. Budget
~$130–$190Collective AI Inc · Physical AI & Wearables · Agent-Integrated Build Spec · Page 4
CAI-W02 Wearable
HERALD BADGE NODE
Collective AI identity, always on body.
A smart clip badge worn by all Foundry team members. Captures ambient session audio in 30-second snippets, sends BLE summaries to the
nearest Pi gateway, and logs action items to the Knowledge Keeper via the ZenFlow API. Haptic confirmation acknowledges receipt. Each badge
is registered in the ZenFlow agent registry as a sensor endpoint with its own device identity.
Hardware
• Seeed XIAO ESP32S3 Sense
• Adafruit DRV2605L Haptic Controller
• Circuit Playground Bluefruit
• PowerBoost 1000 + LiPo
• 3D-printed Bambu A1 TPU badge shell
ZenFlow Agents
• Knowledge Keeper
• Task Agent (transcription)
• Blueprint Architect (badge config)
APIs
• ZenFlow /v1/knowledge/write
• Anthropic claude-haiku-4-5 (transcription)
• BLE Gateway A
```

### Existing named coverage verified against extracted source
- [[AI Readiness Audit]]
- [[AI Tutor Task Agent]]
- [[Aegis Protocol]]
- [[Aegis Protocol Guardian]]
- [[Aether Link Mesh Extension Task Agent]]
- [[Agent Health Monitor]]
- [[Agent Spawner]]
- [[Apex System]]
- [[Apex System Performance Agent]]
- [[Athlete Recovery Alert Agent]]
- [[Atlas Platform]]
- [[Audit Intelligence Task Agent]]
- [[Behavioral Pattern Analysis Agent]]
- [[Biomechanical Analysis Task Agent]]
- [[Blueprint Architect]]
- [[Client Intelligence Task Agent]]
- [[Coaching Cue Dispatch Task Agent]]
- [[Cognitive Coach Task Agent]]
- [[Cognitive Load Monitor Task Agent]]
- [[Cohort Manager Task Agent]]
- [[Collective Times]]
- [[Collective Times Content Writer Task Agent]]
- [[Creator Nexus]]
- [[Creator Nexus Brief Generator]]
- [[Creator Nexus Vault Agent]]
- [[Creator Track]]
- [[Crypto Risk Monitor Agent]]
- [[Curriculum Synthesis Task Agent]]
- [[Data Ingestion Task Agent]]
- [[DeFi Risk Monitor Agent]]

### Closing source build/governance instructions
```text
w Internal API MCP (local cache)
• n8n MCP
Use Case
Cognara Mind deploys to an off-site corporate wellness event. The field kit
runs full coaching sessions on local inference, no internet required. On
return, the Behavioral Pattern Analysis Agent's session data syncs to the
Foundry NAS and the Airtable habit tracking system automatically.
Build Outcome
Portable behavioral coaching kit — offline AI coach, post-session report,
auto-sync on mesh reconnect.
Est. Budget
~$380–$510Collective AI Inc · Physical AI & Wearables · Agent-Integrated Build Spec · Page 58
CM-W05 Wearable
NEURO-PULSE WRISTBAND
Cognitive performance, measured from the wrist.
Cognara Mind's cognitive performance wearable. Captures continuous motion, orientation, and environmental signals that the Psychographic
Profile Agent uses to build a longitudinal cognitive performance map. The wristband delivers context-sensitive haptic cues for: focus session start,
distraction alert, cognitive load peak warning, and recovery prompt — all timed by the Habit Architecture Agent.
Hardware
• Arduino Nano 33 BLE Sense Rev2
• IMU BNO085 (orientation + motion)
• Adafruit DRV2605L Haptic Controller
• Adafruit Feather nRF52840 Sense (BLE hub)
• PowerBoost 1000 + LiPo
• 3D-printed Bambu A1 PETG Signal Rose wristband
ZenFlow Agents
• Psychographic Profile Agent
• Habit Architecture Agent
• Cognitive Load Monitor Task Agent
• Knowledge Keeper
APIs
• ZenFlow /v1/agents (haptic event dispatch)
• Anthropic claude-haiku-4-5 (cognitive load inference)
• Airtable API
• BLE Gateway API
n8n Workflows
• Habit Architecture Workflow (n8n)
• Behavioral Pattern Digest (n8n — longitudinal update)
MCPs
• Airtable MCP
• ZenFlow Internal API MCP
Use Case
The user enters a deep work block. The Cognitive Load Monitor Task
Agent detects sustained focus from motion stability and delivers a single
confirming pulse — 'you're in flow'. 90 minutes later, a double pulse
signals optimal break timing. The Psychographic Profile Agent logs the
session and refines the user's cognitive performance model.
Build Outcome
Cognitive performance wristband — flow state detection, load warning,
timed break cues, longitudinal profile.
Est. Budget
~$150–$210

```

## Source
- [Collective_AI_Physical_AI_Wearables_Agent_Spec.pdf](https://drive.google.com/file/d/1RciKlBu78QWILMzOGKmt8I5s-P3dQmv-/view?usp=drivesdk) — opening scope and closing governance/build notes; full text compared against existing item names. Reviewed 2026-10-06.

### Source records
- [Collective_AI_Physical_AI_Wearables_Agent_Spec.pdf](https://drive.google.com/file/d/1RciKlBu78QWILMzOGKmt8I5s-P3dQmv-/view?usp=drivesdk)

<!-- drive-expansion:198793662b223b15c695 -->
