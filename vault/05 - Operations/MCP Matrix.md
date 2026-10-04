---
title: MCP Matrix
tags:
- hub
- mcp
type: hub
owner: JR Moyler (Hataalii)
source: MCP Matrix
updated: 2026-10-04
---
# MCP Matrix

Source of truth for Model Context Protocol servers (v1.0, 2026): 38 established MCP servers with department assignments and 20 custom MCP servers to build, each with exposed tools, platform, and build prompt. The matrix describes MCP as the standard interface that connects AI agents to external tools, databases, and services.

- Established servers: [[Established MCP Servers]] (38 rows: 33 Active, 1 Available, 4 Planned)
- Custom servers to build: 20, all status to-build, 138 tools in total
- Companion document: [[Knowledge Graph Matrix]]

> [!note] Canon applied
> The Civic Core veto in MCP-09 was removed Oct 1, 2026 ([[Civic Core Fiduciary Veto]]). "Vector Shift" is written VectorShift. MCPs for chartered divisions are build plans, not active work.

## Custom MCP servers

| ID | Server | Division | Division status | Tools | Also used by |
|---|---|---|---|---|---|
| MCP-01 | [[MCP-01 ZenFlow Orchestration MCP]] | [[ZenFlow Division]] | operating | 7 | All 20 Divisions |
| MCP-02 | [[MCP-02 Knowledge Keeper MCP]] | [[ZenFlow Division]] | operating | 6 | All 20 Divisions |
| MCP-03 | [[MCP-03 Ace Knowledge Graph MCP]] | [[ZenFlow Division]] | operating | 7 | All Divisions |
| MCP-04 | [[MCP-04 Notion Operations MCP]] | [[The Collective Division]] | operating | 7 | ZenFlow, All Divisions |
| MCP-05 | [[MCP-05 GitHub Intelligence MCP]] | [[Binary Loom Division]] | operating | 7 | ZenFlow, Obsidian Arc |
| MCP-06 | [[MCP-06 Quantum Intelligence MCP]] | [[Quantum Ledger Division]] | operating | 6 | Juris Guard, ZenFlow |
| MCP-07 | [[MCP-07 Athlete Performance MCP]] | [[Kinetic Edge Division]] | chartered | 7 | Vital Helix, ZenFlow |
| MCP-08 | [[MCP-08 Content Intelligence MCP]] | [[Nexus Labs Division]] | operating | 7 | Signal Velocity, ZenFlow |
| MCP-09 | [[MCP-09 Civic Resource MCP]] | [[Civic Core Division]] | chartered | 7 | ZenFlow, Vital Helix |
| MCP-10 | [[MCP-10 Vital Health Intelligence MCP]] | [[Vital Helix Division]] | chartered | 7 | Eon Core, Juris Guard, ZenFlow |
| MCP-11 | [[MCP-11 Growth Signal MCP]] | [[Signal Velocity Division]] | operating | 7 | Nexus Labs, ZenFlow |
| MCP-12 | [[MCP-12 Regulatory Intelligence MCP]] | [[Juris Guard Division]] | operating | 7 | ZenFlow, All Divisions |
| MCP-13 | [[MCP-13 Gaia Field Intelligence MCP]] | [[Gaia Synthesis Division]] | chartered | 7 | VectorShift, ZenFlow |
| MCP-14 | [[MCP-14 Infrastructure Ops MCP]] | [[Binary Loom Division]] | operating | 7 | ZenFlow, Obsidian Arc |
| MCP-15 | [[MCP-15 Nomad Mobility MCP]] | [[Nomad Nexus Division]] | chartered | 7 | ZenFlow, Aether Link |
| MCP-16 | [[MCP-16 Threat Intelligence MCP]] | [[Obsidian Arc Division]] | operating | 7 | Binary Loom, ZenFlow, Juris Guard |
| MCP-17 | [[MCP-17 Behavioral Personalization MCP]] | [[Cognara Mind Division]] | chartered | 7 | Signal Velocity, Hybrid Living, ZenFlow |
| MCP-18 | [[MCP-18 Longevity Intelligence MCP]] | [[Eon Core Division]] | chartered | 7 | Vital Helix, ZenFlow |
| MCP-19 | [[MCP-19 Atlas Learning MCP]] | [[Hybrid Living Division]] | operating | 7 | ZenFlow, Cognara Mind |
| MCP-20 | [[MCP-20 Connectivity Network MCP]] | [[Aether Link Division]] | chartered | 7 | ZenFlow, Nomad Nexus, Civic Core |

## Common build pattern

- All 20 are specified as Python FastMCP servers.
- Supabase appears in the platform for 10 of them.
- Restricted callers: MCP-06 (Quantum Ledger Director JWT only), MCP-16 (Obsidian Arc Director JWT only), MCP-07 (Coach or Athlete JWT).
- Compliance routing: MCP-06 and MCP-10 send outputs to the Juris Guard compliance API; MCP-12 routes flags to [[Dr. Joseph Johnson]].
- Consent flags: MCP-09 and MCP-17.

Related: [[005 — Operations MOC]] · [[ZenFlow Division]] · [[Collective Intelligence MCP Server]] · [[Airtable Operations Hub]]
