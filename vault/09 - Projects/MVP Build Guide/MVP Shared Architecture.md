---
title: MVP Shared Architecture
tags:
- mvp
- mvp-build-guide
- stack
- architecture
type: mvp-standard
owner: JR Moyler (Hataalii)
source: MVP Build Guide
updated: 2026-10-04
---
# MVP Shared Architecture

Use one reusable platform shell so the team can build quickly without making every app feel generic.

| Layer | Default choice | Notes |
|---|---|---|
| Frontend | Next.js / React / Tailwind | React Native only where mobile-first is required. |
| Backend | Supabase first; FastAPI for advanced services | Start with Supabase for speed, graduate heavy logic into FastAPI. |
| Data | PostgreSQL + pgvector where useful | One tenant-safe schema pattern with division-specific tables. |
| Auth | Supabase Auth or JWT/API keys | RBAC and org-level membership from day one. |
| AI | ZenFlow adapter layer | Never hard-code one model provider into product logic. |
| Automation | n8n/Zapier hooks | Use event-based actions for reports, notifications, intake, and alerts. |
| Payments | Stripe / Stripe Connect | Use Connect for marketplaces and payouts. |
| Observability | Sentry, Langfuse/Braintrust later | Audit logs are mandatory for governance products. |
| Design | Parent shell + division-native themes | No plain generic Collective dashboard clones. |

## Schema pattern

Every brief suggests four product-prefixed tables plus shared `users` and `organizations` tables. The prefix pattern depends on the module archetype (for example `_items, _workflows, _status_events, _metrics` for command shells, or `_profiles, _listings, _offers, _orders` for marketplaces). See [[MVP Module Archetypes]].

> [!note] Model routing
> The AI layer goes through the ZenFlow adapter. Current tier routing lives in [[Agent Tier Registry]] ([[ZENITH]] at Tier 1).

Related: [[Zenith OS]], [[ZenFlow API]], [[n8n Workflow Blueprint]], [[MVP Service and Tooling Appendix]]

## Links

- Hub: [[MVP Build Guide]]
