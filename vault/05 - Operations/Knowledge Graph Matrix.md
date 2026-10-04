---
title: Knowledge Graph Matrix
tags:
- hub
- knowledge-graph
type: hub
owner: JR Moyler (Hataalii)
source: Knowledge Graph Matrix
updated: 2026-10-04
---
# Knowledge Graph Matrix

Source of truth for Collective AI knowledge graphs (v1.0, 2026): 20 established KG tools with department assignments and 20 custom knowledge graphs to build. The matrix calls knowledge graphs the connective intelligence layer that powers agent reasoning, relationship discovery, and cross-division intelligence.

- Established tools: [[Knowledge Graph Tools]] (20 rows)
- Custom graphs to build: 20, all status to-build
- Companion document: [[MCP Matrix]]

> [!note] Canon applied
> Division names follow the July 2026 dossiers ("VectorShift" as one word). The Civic Core veto in KG-16 was removed Oct 1, 2026 ([[Civic Core Fiduciary Veto]]). [[Helios Grid]] stays blocked pending an SEC legal opinion, so KG-15 cannot ingest from it. Graphs for chartered divisions are build plans, not active work.

## Custom graphs by division

| ID | Graph | Division | Division status | Platform |
|---|---|---|---|---|
| KG-01 | [[KG-01 Collective AI Master Entity Graph]] | [[ZenFlow Division]] | operating | Neo4j Aura + LlamaIndex ingestion pipeline |
| KG-02 | [[KG-02 ZenFlow Agent Decision Graph]] | [[ZenFlow Division]] | operating | Graphiti (Zep) + Supabase + pgvector |
| KG-03 | [[KG-03 The Collective Client Intelligence Graph]] | [[The Collective Division]] | operating | Neo4j Aura + Notion sync via n8n |
| KG-04 | [[KG-04 Quantum Ledger Asset Relationship Graph]] | [[Quantum Ledger Division]] | operating | AWS Neptune + Etherscan API ingestion |
| KG-05 | [[KG-05 Juris Guard AI Regulation Ontology]] | [[Juris Guard Division]] | operating | Stardog (OWL/SPARQL) + Perplexity API for regulation ingestion |
| KG-06 | [[KG-06 Kinetic Edge Athlete Performance Graph]] | [[Kinetic Edge Division]] | chartered | Graphiti (Zep) + Supabase + Apex Performance API |
| KG-07 | [[KG-07 Vital Helix Bio-Digital Twin Graph]] | [[Vital Helix Division]] | chartered | Stardog + Supabase + Bio-Digital Twin API |
| KG-08 | [[KG-08 Gaia Synthesis Environmental Knowledge Graph]] | [[Gaia Synthesis Division]] | chartered | Neo4j Aura + Gaia Field Sensor API |
| KG-09 | [[KG-09 Nomad Nexus Destination Intelligence Graph]] | [[Nomad Nexus Division]] | chartered | Neo4j Aura + Nomad Nexus Intelligence API + public datasets |
| KG-10 | [[KG-10 Signal Velocity Content Performance Graph]] | [[Signal Velocity Division]] | operating | Neo4j Aura + Signal Velocity Growth API + PostHog |
| KG-11 | [[KG-11 Hybrid Learning Path Knowledge Graph]] | [[Hybrid Living Division]] | operating | Neo4j Aura + Hybrid Learning API |
| KG-12 | [[KG-12 Obsidian Arc Threat Intelligence Graph]] | [[Obsidian Arc Division]] | operating | AWS Neptune + MISP + NVD API |
| KG-13 | [[KG-13 Aether Link Communication Network Graph]] | [[Aether Link Division]] | chartered | Neo4j Aura + Aether Link Translation API |
| KG-14 | [[KG-14 VectorShift Logistics Intelligence Graph]] | [[VectorShift Division]] | chartered | Neo4j Aura + VectorShift Route Optimization API + HERE API |
| KG-15 | [[KG-15 Terra Axis Property Intelligence Graph]] | [[Terra Axis Division]] | chartered | Neo4j Aura + Terra Axis Helios Grid + public property data |
| KG-16 | [[KG-16 Civic Core Community Resource Graph]] | [[Civic Core Division]] | chartered | Neo4j Aura + Civic Core Resource Matching API |
| KG-17 | [[KG-17 Binary Loom Infrastructure Dependency Graph]] | [[Binary Loom Division]] | operating | Neo4j Aura + GitHub API + Sentry API |
| KG-18 | [[KG-18 Cognara Behavioral Psychographic Graph]] | [[Cognara Mind Division]] | chartered | Neo4j Aura + Cognara Behavioral Pattern API + PostHog |
| KG-19 | [[KG-19 Eon Core Longevity Biomarker Graph]] | [[Eon Core Division]] | chartered | Graphiti (Zep) + Supabase + Eon Core Longevity API |
| KG-20 | [[KG-20 Nexus Labs Content Narrative Graph]] | [[Nexus Labs Division]] | operating | Neo4j Aura + Nexus Labs Content Intelligence API |

## Platform mix

- Neo4j Aura: 13 graphs
- Supabase: 4 graphs
- Graphiti: 3 graphs
- AWS Neptune: 2 graphs
- Stardog: 2 graphs
- PostHog: 2 graphs
- LlamaIndex: 1 graph

## Gates written into the build prompts

- KG-04: Juris Guard compliance review before any live trading signal.
- KG-07: all clinical outputs need Juris Guard clearance before patient-facing display.
- KG-15: HOLD on Helios Grid until written clearance from [[Dr. Joseph Johnson]]; Helios Grid is also blocked pending SEC legal opinion.
- KG-16: Stanley Constant veto on data collection (removed Oct 1, 2026).
- KG-18: explicit user consent, no shadow profiling.

Related: [[005 — Operations MOC]] · [[ZenFlow Division]] · [[Knowledge Keeper]]
