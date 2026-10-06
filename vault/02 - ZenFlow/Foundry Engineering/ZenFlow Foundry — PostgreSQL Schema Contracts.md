---
title: ZenFlow Foundry — PostgreSQL Schema Contracts
tags:
- drive-source
- reference-spec
type: spec
owner: JR Moyler (Hataalii)
status: reference-planned
updated: 2026-10-06
source_refs:
- id: 1uDkAakG4a5U7_yer5VW6WWY1YzRZmfiO
  url: https://drive.google.com/file/d/1uDkAakG4a5U7_yer5VW6WWY1YzRZmfiO/view?usp=drivesdk
  title: Collective_AI_Agent_Foundry_Config_Spec.pdf
---
# ZenFlow Foundry — PostgreSQL Schema Contracts

> [!warning] Source build specification
> This is a documented architecture and build plan. Provisioning, deployment, uptime, customer counts, hardware ownership and performance targets require live evidence. Source numbering, director codenames, model identifiers and dates remain historical; current [[Agent Tier Registry]], [[Director Codenames]] and division charters take precedence. Physical autonomy remains Aegis-Hold until staged testing and human approval. Hardware prices are source estimates, not current purchase quotes.

## Linked ownership
- [[ZenFlow Division]]
- [[Binary Loom Division]]
- [[ZenFlow Master Blueprint]]
- [[ZenFlow Agent Foundry]]
- [[001 — ZenFlow MOC]]

## Full source section

```text
SECTION 02 ◆ POSTGRESQL DATABASE SCHEMA
ENGINE PostgreSQL 15.3
HOSTING AWS RDS — db.r6g.2xlarge primary, 2× db.r6g.xlarge read replicas
CONNECTION POOL pgBouncer — max_client_conn=1000, default_pool_size=25 per service
BACKUP Automated daily snapshots, 30-day retention, point-in-time recovery enabled
REQUIRED POSTGRESQL EXTENSIONS
CREATE EXTENSION IF NOT EXISTS pgvector; -- semantic search on Knowledge Keeper
CREATE EXTENSION IF NOT EXISTS pg_trgm; -- fuzzy text search on agent names
CREATE EXTENSION IF NOT EXISTS btree_gin; -- composite GIN indexes
CREATE EXTENSION IF NOT EXISTS pgcrypto; -- gen_random_uuid(), encryption functions
SCHEMA: ZENITH
ZENITH Master Overseer state, routing log, and cross-portfolio audit trail
TABLE: zenith.routing_log — Every request routed by ZENITH with outcome
COLUMN TYPE / DEFINITION
id UUID PRIMARY KEY DEFAULT gen_random_uuid()
request_id UUID NOT NULL
request_text TEXT NOT NULL
source_type VARCHAR(50) -- user | agent | webhook | scheduled
target_division_id SMALLINT REFERENCES divisions(id)
synergy_node_id SMALLINT REFERENCES synergy_nodes(id) NULL
aegis_tier VARCHAR(20) NOT NULL DEFAULT 'Clear' -- Clear | Review | Hold
routing_decision JSONB NOT NULL
resolution_status VARCHAR(30) DEFAULT 'pending'
escalated_to_human BOOLEAN DEFAULT FALSE
created_at TIMESTAMPTZ DEFAULT NOW()
resolved_at TIMESTAMPTZ NULL
INDEXES:
CREATE INDEX idx_routing_log_division ON zenith.routing_log(target_division_id);
CREATE INDEX idx_routing_log_aegis ON zenith.routing_log(aegis_tier) WHERE aegis_tier != 'Clear';
CREATE INDEX idx_routing_log_created ON zenith.routing_log(created_at DESC);
TABLE: zenith.agent_health — Real-time health status for all 621 agents
COLUMN TYPE / DEFINITION
agent_id UUID PRIMARY KEY
agent_name VARCHAR(100) NOT NULL
division_id SMALLINT REFERENCES divisions(id)
tier SMALLINT NOT NULL -- 1 | 2 | 3 | 4
status VARCHAR(20) DEFAULT 'active' -- active | degraded | offline | maintenance
last_heartbeat TIMESTAMPTZ DEFAULT NOW()
last_task_at TIMESTAMPTZ NULL
error_count_24h SMALLINT DEFAULT 0
avg_response_ms INTEGER DEFAULT 0
model VARCHAR(60) NOT NULL
aegis_tier VARCHAR(20) NOT NULL DEFAULT 'Clear'
updated_at TIMESTAMPTZ DEFAULT NOW()
INDEXES:
CREATE INDEX idx_agent_health_division ON zenith.agent_health(division_id);
CREATE INDEX idx_agent_health_status ON zenith.agent_health(status) WHERE status != 'active';
TABLE: zenith.divisions — Division registry — all 20 divisions
COLUMN TYPE / DEFINITION
id SMALLINT PRIMARY KEY
name VARCHAR(100) NOT NULL UNIQUE
director_agent_id UUID REFERENCES zenith.agent_health(agent_id)
launch_year SMALLINT
status VARCHAR(20) DEFAULT 'active'
aegis_default_tier VARCHAR(20) DEFAULT 'Clear'
special_constraints JSONB DEFAULT '{}'::jsonb -- e.g. helios_blocked, stanley_veto
TABLE: zenith.synergy_nodes — Synergy Node registry — all 20 nodes
COLUMN TYPE / DEFINITION
id SMALLINT PRIMARY KEY
name VARCHAR(100) NOT NULL UNIQUE
phase SMALLINT NOT NULL -- 1 | 2 | 3 | 4
division_ids SMALLINT[] NOT NULL
status VARCHAR(20) DEFAULT 'inactive' -- inactive | active | building
activated_at TIMESTAMPTZ NULL
SCHEMA: AGENTS
Agent registry, blueprints, and instantiation records
TABLE: agents.agent_registry — Master registry of all 621 agents in the portfolio
COLUMN TYPE / DEFINITION
id UUID PRIMARY KEY DEFAULT gen_random_uuid()
name VARCHAR(100) NOT NULL
full_title VARCHAR(200)
division_id SMALLINT REFERENCES zenith.divisions(id)
tier SMALLINT NOT NULL
model VARCHAR(60) NOT NULL DEFAULT 'claude-sonnet-4-20250514'
system_prompt TEXT NOT NULL
system_prompt_version SMALLINT DEFAULT 1
aegis_tier VARCHAR(20) NOT NULL DEFAULT 'Clear'
clearance_level SMALLINT NOT NULL DEFAULT 3
tools JSONB DEFAULT '[]'::jsonb
creation_platform VARCHAR(200)
status VARCHAR(20) DEFAULT 'active'
created_at TIMESTAMPTZ DEFAULT NOW()
updated_at TIMESTAMPTZ DEFAULT NOW()
INDEXES:
CREATE INDEX idx_agent_registry_division ON agents.agent_registry(division_id);
CREATE INDEX idx_agent_registry_tier ON agents.agent_registry(tier);
CREATE UNIQUE INDEX idx_agent_registry_name_div ON agents.agent_registry(name, division_id);
TABLE: agents.agent_sessions — Session records for every agent invocation
COLUMN TYPE / DEFINITION
id UUID PRIMARY KEY DEFAULT gen_random_uuid()
agent_id UUID REFERENCES agents.agent_registry(id)
session_start TIMESTAMPTZ DEFAULT NOW()
session_end TIMESTAMPTZ NULL
input_tokens INTEGER DEFAULT 0
output_tokens INTEGER DEFAULT 0
cost_usd NUMERIC(10,6) DEFAULT 0
aegis_outcome VARCHAR(20) DEFAULT 'Clear'
task_summary TEXT NULL
error TEXT NULL
routing_log_id UUID REFERENCES zenith.routing_log(id) NULL
INDEXES:
CREATE INDEX idx_sessions_agent ON agents.agent_sessions(agent_id);
CREATE INDEX idx_sessions_start ON agents.agent_sessions(session_start DESC);
CREATE INDEX idx_sessions_cost ON agents.agent_sessions(cost_usd DESC);
TABLE: agents.agent_tools — Tool registry — every tool available to agents
COLUMN TYPE / DEFINITION
id UUID PRIMARY KEY DEFAULT gen_random_uuid()
name VARCHAR(100) NOT NULL UNIQUE
type VARCHAR(50) -- api | webhook | database | n8n | internal
endpoint VARCHAR(500)
auth_type VARCHAR(50) -- api_key | oauth | jwt | none
aegis_required VARCHAR(20) DEFAULT 'Clear'
division_ids SMALLINT[] -- NULL means available to all
active BOOLEAN DEFAULT TRUE
INDEXES:
CREATE INDEX idx_tools_type ON agents.agent_tools(type);
SCHEMA: KNOWLEDGE
Knowledge Keeper — the portfolio-wide memory and audit layer
TABLE: knowledge.knowledge_entries — All significant agent decisions, outputs, and events across the
portfolio
COLUMN TYPE / DEFINITION
id UUID PRIMARY KEY DEFAULT gen_random_uuid()
agent_id UUID REFERENCES agents.agent_registry(id)
division_id SMALLINT REFERENCES zenith.divisions(id)
entry_type VARCHAR(50) -- decision | output | escalation | alert | milestone
content TEXT NOT NULL
content_embedding vector(1536) NULL -- pgvector for semantic search
aegis_tier VARCHAR(20) DEFAULT 'Clear'
tags TEXT[] DEFAULT '{}'
metadata JSONB DEFAULT '{}'::jsonb
created_at TIMESTAMPTZ DEFAULT NOW()
retention_policy VARCHAR(20) DEFAULT 'permanent' -- permanent | 90d | 30d
INDEXES:
CREATE INDEX idx_knowledge_division ON knowledge.knowledge_entries(division_id);
CREATE INDEX idx_knowledge_type ON knowledge.knowledge_entries(entry_type);
CREATE INDEX idx_knowledge_created ON knowledge.knowledge_entries(created_at DESC);
CREATE INDEX idx_knowledge_tags ON knowledge.knowledge_entries USING GIN(tags);
CREATE INDEX idx_knowledge_embedding ON knowledge.knowledge_entries USING ivfflat(content_embedding
vector_cosine_ops) WITH (lists = 100);
TABLE: knowledge.aegis_audit — Immutable audit trail for all Aegis Protocol decisions
COLUMN TYPE / DEFINITION
id UUID PRIMARY KEY DEFAULT gen_random_uuid()
agent_id UUID REFERENCES agents.agent_registry(id)
session_id UUID REFERENCES agents.agent_sessions(id)
aegis_classification VARCHAR(20) NOT NULL
trigger_reason TEXT NOT NULL
action_taken VARCHAR(50) -- delivered | flagged | held | escalated
reviewer_agent_id UUID NULL
human_reviewer VARCHAR(100) NULL
resolution TEXT NULL
created_at TIMESTAMPTZ DEFAULT NOW()
INDEXES:
CREATE INDEX idx_aegis_audit_agent ON knowledge.aegis_audit(agent_id);
CREATE INDEX idx_aegis_audit_class ON knowledge.aegis_audit(aegis_classification);
CREATE INDEX idx_aegis_audit_created ON knowledge.aegis_audit(created_at DESC);
SCHEMA: MARKETPLACE
ZenFlow Marketplace — agent listings, licensing, and billing
TABLE: marketplace.listings — Public ZenFlow Marketplace agent listings
COLUMN TYPE / DEFINITION
id UUID PRIMARY KEY DEFAULT gen_random_uuid()
agent_registry_id UUID REFERENCES agents.agent_registry(id)
slug VARCHAR(100) UNIQUE NOT NULL
display_name VARCHAR(200) NOT NULL
description TEXT NOT NULL
tier VARCHAR(50) -- solo_blueprint | smb_stack | enterprise_engine
price_monthly_usd NUMERIC(10,2)
price_annual_usd NUMERIC(10,2)
aegis_rating VARCHAR(20) NOT NULL
published BOOLEAN DEFAULT FALSE
created_at TIMESTAMPTZ DEFAULT NOW()
INDEXES:
CREATE INDEX idx_listings_tier ON marketplace.listings(tier);
CREATE INDEX idx_listings_published ON marketplace.listings(published) WHERE published = TRUE;
TABLE: marketplace.licenses — Active marketplace license records
COLUMN TYPE / DEFINITION
id UUID PRIMARY KEY DEFAULT gen_random_uuid()
listing_id UUID REFERENCES marketplace.listings(id)
customer_id UUID NOT NULL
license_key VARCHAR(64) UNIQUE NOT NULL
tier VARCHAR(50)
status VARCHAR(20) DEFAULT 'active'
starts_at TIMESTAMPTZ DEFAULT NOW()
expires_at TIMESTAMPTZ NULL
stripe_subscription_id VARCHAR(200) NULL
INDEXES:
CREATE INDEX idx_licenses_customer ON marketplace.licenses(customer_id);
CREATE INDEX idx_licenses_status ON marketplace.licenses(status) WHERE status = 'active';
SPECIAL DATABASE CONSTRAINTS
◆ helios_grid_block: INSERT trigger on zenith.divisions — prevents Helios Grid (id=5, product='helios_grid') from changing status to
'active' without Juris Guard clearance flag set
◆ stanley_veto: Application-level check before any Civic Core (division_id=11) routing_log record is resolved — must confirm
stanley_constant_review = TRUE
◆ health_hipaa: Row-level security on all patient/health data tables (Vital Helix schema, Eon Core schema) — only clearance_level >=
4 service accounts can read
◆ financial_audit: Immutable audit rows in knowledge.aegis_audit — no DELETE or UPDATE permitted (enforced via REVOKE)
```

## Source
- [Collective_AI_Agent_Foundry_Config_Spec.pdf](https://drive.google.com/file/d/1uDkAakG4a5U7_yer5VW6WWY1YzRZmfiO/view?usp=drivesdk) — Section 02 — POSTGRESQL DATABASE SCHEMA. Read in full from Drive on 2026-10-06.

### Source records
- [Collective_AI_Agent_Foundry_Config_Spec.pdf](https://drive.google.com/file/d/1uDkAakG4a5U7_yer5VW6WWY1YzRZmfiO/view?usp=drivesdk)

<!-- drive-expansion:43eae3331920b97f1a83 -->
