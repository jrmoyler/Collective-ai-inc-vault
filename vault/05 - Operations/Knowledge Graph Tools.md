---
title: Knowledge Graph Tools
tags:
- knowledge-graph
- tools
- registry
type: tool-registry
owner: JR Moyler (Hataalii)
source: Knowledge Graph Matrix
updated: 2026-10-04
---
# Knowledge Graph Tools

The 20 established knowledge graph tools in the [[Knowledge Graph Matrix]], with type, primary department, secondary departments, and deployment status as given in the matrix.

> [!info] Vault and Notion
> Obsidian is JR's local vault (this second brain). Notion is the 9-database team operations hub. Airtable linked tables are tracked in [[Airtable Operations Hub]].

| Tool | Type | Description | Primary dept | Also used by | Status |
|---|---|---|---|---|---|
| Ace Knowledge Graph | Graph Database / KM | JR's primary personal knowledge graph for Collective AI intelligence. Entities, relationships, and context layers for cross-division reasoning. Central node repository. | ZenFlow | All Divisions | Production — active |
| Obsidian (local vault) | Personal KM | Markdown-based local knowledge vault. Daily notes, meeting logs, division folders, Dataview queries, Graph View for visual node exploration. Syncs to GitHub. | All Internal | JR personal ops | Production — active |
| Notion (9-database hub) | Team KM / Ops DB | Nine linked databases: client pipeline, product catalog, agent roster, meeting notes, task tracker, content calendar, division wikis, financial log, HR. Primary team operations layer. | The Collective | All Divisions | Production — active |
| Neo4j Aura | Graph Database | Property graph database with Cypher query language. Stores entity-relationship networks, supply chains, org hierarchies. Best for multi-hop relationship queries across divisions. | ZenFlow | Juris Guard, Quantum Ledger | Available — not yet deployed |
| Pinecone | Vector KG / Semantic Memory | Vector database storing agent memory embeddings. Enables semantic similarity search, RAG retrieval, and context-aware agent decisions. Knowledge retrieval backbone. | ZenFlow | Cognara Mind, Vital Helix | Production — active |
| Weaviate | Hybrid Vector + KG | Combines vector search with structured graph traversal. GraphQL schema supports cross-object references. Best for knowledge-intensive domains like legal and medical. | ZenFlow | Juris Guard, Vital Helix | Available — not yet deployed |
| LlamaIndex | KG Construction Framework | Python framework for building knowledge graphs from documents. Ingests PDFs, URLs, Notion pages and constructs entity-relationship triples for RAG. | ZenFlow | The Collective | Available — in use for prototypes |
| LangChain / LangGraph | Agent Memory + Graph | Provides agent state graphs, memory modules (short/long-term), and entity extraction pipelines. Used alongside ZenFlow agent loops. | ZenFlow | Binary Loom | Production — active |
| Mem0 | Persistent Agent Memory | AI-native memory layer that extracts entities, facts, and preferences from conversations and stores them as structured memories. Auto-updates on new interactions. | ZenFlow | Cognara Mind | Available — evaluating |
| Zep | Conversational Memory Graph | Long-term conversational memory with temporal graph. Stores user facts, extracted entities, and session summaries. Best for client-facing agents. | ZenFlow | The Collective, Hybrid Living | Available — evaluating |
| Graphiti (Zep) | Temporal Knowledge Graph | Bi-temporal graph that tracks when facts were learned and when they were true. Resolves contradictions, handles evolving knowledge. Research-grade agent memory. | ZenFlow | Quantum Ledger, Juris Guard | Available — not yet deployed |
| Obsidian Dataview | Query Layer | SQL-like queries over Obsidian markdown frontmatter. Builds dynamic tables, task boards, and analytics from vault files. Powers division knowledge dashboards. | All Internal | JR personal ops | Production — active |
| Roam Research | Networked Thought | Bidirectional link-based PKM. Alternative to Obsidian for networked daily notes and block-level references. Less structured, more fluid than Obsidian. | ZenFlow | JR personal ops | Available — secondary |
| Logseq | Open-Source PKM Graph | Markdown + outliner PKM with built-in graph view. Open-source alternative for team knowledge graphs without Obsidian Sync costs. | ZenFlow | Hybrid Living team | Available — secondary |
| Confluence | Enterprise KM | Atlassian wiki for structured technical documentation. Integration with Jira. Used if enterprise client or team size requires compliance-grade documentation system. | Binary Loom | Juris Guard, The Collective | Available — not yet deployed |
| Airtable (linked tables) | Relational KG Lite | Linked record fields create quasi-graph relationships between tables. Product catalog, agent roster, and client pipeline cross-reference via linked records. See [[Airtable Operations Hub]]. | Signal Velocity | The Collective | Production — active |
| Glean | Enterprise Search + KG | Enterprise knowledge graph that indexes across Google Drive, Notion, Slack, GitHub, and email. Unified search with entity understanding. | ZenFlow | The Collective | Available — future enterprise tier |
| AWS Neptune | Managed Graph DB | Fully managed graph database supporting both Gremlin (property graph) and SPARQL (RDF). Best for regulatory compliance graphs (Juris Guard) and supply chain graphs (VectorShift). | Juris Guard | VectorShift, Terra Axis | Available — not yet deployed |
| Stardog | Enterprise Knowledge Graph | Semantic knowledge graph with OWL/SPARQL reasoning. Best for ontology-driven domains: healthcare (Vital Helix), legal (Juris Guard), environmental (Gaia Synthesis). | Juris Guard | Vital Helix, Gaia Synthesis | Available — not yet deployed |
| Google Knowledge Graph API | Web Entity Graph | Google's public knowledge graph for entity disambiguation and enrichment. Person, org, place entities with Wikipedia-derived attributes. Enriches Nomad Nexus and Signal Velocity data. | Signal Velocity | Nomad Nexus, The Collective | Available — active |

## Status counts

- Production — active: 7
- Available — not yet deployed: 6
- Available — evaluating: 2
- Available — secondary: 2
- Available — in use for prototypes: 1
- Available — future enterprise tier: 1
- Available — active: 1

## Which custom graphs use which platform

### Neo4j Aura (13)

- [[KG-01 Collective AI Master Entity Graph]]
- [[KG-03 The Collective Client Intelligence Graph]]
- [[KG-08 Gaia Synthesis Environmental Knowledge Graph]]
- [[KG-09 Nomad Nexus Destination Intelligence Graph]]
- [[KG-10 Signal Velocity Content Performance Graph]]
- [[KG-11 Hybrid Learning Path Knowledge Graph]]
- [[KG-13 Aether Link Communication Network Graph]]
- [[KG-14 VectorShift Logistics Intelligence Graph]]
- [[KG-15 Terra Axis Property Intelligence Graph]]
- [[KG-16 Civic Core Community Resource Graph]]
- [[KG-17 Binary Loom Infrastructure Dependency Graph]]
- [[KG-18 Cognara Behavioral Psychographic Graph]]
- [[KG-20 Nexus Labs Content Narrative Graph]]

### Graphiti (Zep) (3)

- [[KG-02 ZenFlow Agent Decision Graph]]
- [[KG-06 Kinetic Edge Athlete Performance Graph]]
- [[KG-19 Eon Core Longevity Biomarker Graph]]

### AWS Neptune (2)

- [[KG-04 Quantum Ledger Asset Relationship Graph]]
- [[KG-12 Obsidian Arc Threat Intelligence Graph]]

### Stardog (2)

- [[KG-05 Juris Guard AI Regulation Ontology]]
- [[KG-07 Vital Helix Bio-Digital Twin Graph]]

### LlamaIndex (1)

- [[KG-01 Collective AI Master Entity Graph]]

Note: Neo4j Aura, Graphiti, AWS Neptune and Stardog are all listed as "Available — not yet deployed", while most custom graphs are specified to run on them.

Hub: [[Knowledge Graph Matrix]] · Division: [[ZenFlow Division]]
