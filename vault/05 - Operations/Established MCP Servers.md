---
title: Established MCP Servers
tags:
- mcp
- tools
- registry
type: tool-registry
owner: JR Moyler (Hataalii)
source: MCP Matrix
updated: 2026-10-04
---
# Established MCP Servers

All 38 established MCP servers in the [[MCP Matrix]], with URL or package, tool count, key tools, primary department, secondary departments, and status. Key tool lists ending in "…" are truncated in the source document.

Status: 33 Active, 1 Available, 4 Planned.

| Server | URL / package | Tools | Key tools | Primary dept | Also used by | Status |
|---|---|---|---|---|---|---|
| Claude.ai Native MCPs (Anthropic) | Built into claude.ai interface | 10+ | web_search, image_search, chart_display, recipe_display, alarm_create, event_create, timer… | ZenFlow | All Divisions (via claude.ai) | Active |
| Notion MCP | mcp.notion.com/mcp | 12+ | notion-fetch, notion-search, notion-create-pages, notion-update-page, notion-create-databa… | ZenFlow | The Collective, All Divisions | Active |
| Google Drive MCP | drivemcp.googleapis.com/mcp/v1 | 8 | search_files, read_file_content, download_file_content, get_file_metadata, get_file_permis… | ZenFlow | The Collective, Hybrid Living | Active |
| Gmail MCP | gmailmcp.googleapis.com/mcp/v1 | 12 | search_threads, get_thread, create_draft, label_message, label_thread, unlabel_message, li… | Signal Velocity | The Collective | Active |
| Google Calendar MCP | calendarmcp.googleapis.com/mcp/v1 | 8 | list_events, create_event, update_event, delete_event, get_event, list_calendars, respond_… | The Collective | ZenFlow, Kinetic Edge | Active |
| Figma MCP | mcp.figma.com/mcp | 16 | get_design_context, get_screenshot, search_design_system, use_figma, generate_diagram, get… | Binary Loom | All Divisions (Design) | Active |
| Vercel MCP | mcp.vercel.com | 18 | deploy_to_vercel, get_deployment, list_deployments, get_project, list_projects, get_deploy… | Binary Loom | All Web Products | Active |
| GitHub MCP | Available via gh CLI / third-party | 15+ | list_repos, create_repo, get_file, create_or_update_file, create_issue, create_pull_reques… | Binary Loom | ZenFlow, All Dev | Available |
| Supabase MCP | mcp.supabase.com/mcp | 29 | execute_sql, list_tables, apply_migration, list_projects, get_project, deploy_edge_functio… | Binary Loom | All Products | Active |
| Cloudinary MCP | asset-management.mcp.cloudinary.com/sse | 17 | upload-asset, search-assets, list-images, list-videos, get-asset-details, transform-asset,… | Nexus Labs | Signal Velocity, All Divisions | Active |
| Sentry MCP | mcp.sentry.dev/mcp | 6+ | list_issues, get_issue, resolve_issue, create_project, get_event_details, search_errors | Binary Loom | ZenFlow | Active |
| Hugging Face MCP | huggingface.co/mcp | 9 | hf_hub_query, hub_repo_search, dynamic_space, paper_search, space_search, hf_doc_search, h… | ZenFlow | Cognara Mind, Vital Helix | Active |
| Excalidraw MCP | mcp.excalidraw.com/mcp | 2 | create_view, read_me | Binary Loom | ZenFlow (diagramming) | Active |
| Gamma MCP | mcp.gamma.app/mcp | 3+ | create_presentation, update_slide, export_presentation | Nexus Labs | The Collective, Signal Velocity | Active |
| LunarCrush MCP | lunarcrush.ai/mcp | 15 | cryptocurrencies, stocks, topic, topic_posts, topic_time_series, creator, creator_posts, k… | Quantum Ledger | Signal Velocity, Nexus Labs | Active |
| Blockscout MCP | mcp.blockscout.com/mcp | 16 | get_transaction_info, get_address_info, get_tokens_by_address, get_token_transfers_by_addr… | Quantum Ledger | Juris Guard | Active |
| Mercury MCP | mcp.mercury.com/mcp | 5+ | get_account_balances, list_transactions, get_account_details, create_payment, list_account… | Quantum Ledger | The Collective (finance) | Active |
| Intercom MCP | mcp.intercom.com/mcp | 8+ | search_conversations, get_conversation, create_note, assign_conversation, tag_conversation… | Signal Velocity | The Collective, All Products | Active |
| Day AI MCP | day.ai/api/mcp | 5+ | search_contacts, get_contact, log_interaction, get_relationships, find_warm_paths | The Collective | Signal Velocity | Active |
| Vibe Prospecting MCP (Explorium) | vibeprospecting.explorium.ai/mcp | 10 | fetch-entities, enrich-business, enrich-prospects, export-to-csv, match-business, fetch-bu… | Signal Velocity | The Collective, Kinetic Edge | Active |
| Scholar Gateway MCP | connector.scholargateway.ai/mcp | 5+ | search_papers, get_paper, get_citations, get_related_papers, semantic_search | Hybrid Living | Vital Helix, ZenFlow (research) | Active |
| PubMed MCP | pubmed.mcp.claude.com/mcp | 7 | search_articles, get_article_metadata, get_full_text_article, find_related_articles, get_c… | Vital Helix | Gaia Synthesis, Eon Core | Active |
| Clinical Trials MCP | hcls.mcp.claude.com/clinical_trials/mcp | 6 | search_trials, get_trial_details, search_by_eligibility, search_by_sponsor, search_investi… | Vital Helix | Eon Core, Juris Guard | Active |
| bioRxiv MCP | hcls.mcp.claude.com/biorxiv/mcp | 7 | search_preprints, get_preprint, get_categories, search_published_preprints, search_by_fund… | Gaia Synthesis | Vital Helix, Eon Core | Active |
| ChEMBL MCP | hcls.mcp.claude.com/chembl/mcp | 6 | compound_search, drug_search, target_search, get_bioactivity, get_mechanism, get_admet | Vital Helix | Gaia Synthesis, Eon Core | Active |
| Context7 MCP | mcp.context7.com/mcp | 2 | resolve-library-id, query-docs | Binary Loom | ZenFlow (coding) | Active |
| Three.js 3D Viewer MCP | example-server.modelcontextprotocol.io/threejs/mcp | 2 | show_threejs_scene, learn_threejs | Nexus Labs | Binary Loom | Active |
| S&P Global MCP (Kensho) | kfinance.kensho.com/integrations/mcp | 5+ | get_company_financials, search_entities, get_market_data, get_earnings, get_sector_analysi… | Quantum Ledger | The Collective | Active |
| LSEG MCP | api.analytics.lseg.com/lfa/mcp | 5+ | get_market_data, get_company_profile, search_instruments, get_news, get_fundamentals | Quantum Ledger | Signal Velocity | Active |
| Open Targets MCP | mcp.platform.opentargets.org/mcp | 5 | search_entities, query_open_targets_graphql, batch_query_open_targets_graphql, get_type_de… | Vital Helix | Gaia Synthesis | Active |
| FactSet AI-Ready Data MCP | mcp.factset.com/content/v1 | 5+ | get_financial_data, search_companies, get_estimates, get_ownership, get_transcripts | Quantum Ledger | The Collective | Active |
| NPI Registry MCP | mcp.deepsense.ai/npi_registry/mcp | 3+ | lookup_provider, search_providers, get_provider_details | Vital Helix | Civic Core | Active |
| ICD-10 Codes MCP | mcp.deepsense.ai/icd10_codes/mcp | 3+ | search_codes, get_code_details, get_related_codes | Vital Helix | Juris Guard | Active |
| CMS Coverage MCP | mcp.deepsense.ai/cms_coverage/mcp | 3+ | search_coverage, get_policy, get_lcd_details | Vital Helix | Civic Core, Juris Guard | Active |
| Ace Knowledge Graph MCP | Local FastMCP / internal | 5+ | query_graph, add_node, add_edge, search_entities, get_neighbors | ZenFlow | All Divisions | Planned |
| n8n MCP Bridge | Local n8n instance + FastMCP | 8+ | trigger_workflow, list_workflows, get_execution, create_workflow, list_executions, pause_w… | ZenFlow | All Divisions | Planned |
| Reddit MCP | Third-party / PRAW FastMCP | 6+ | search_subreddit, get_hot_posts, get_new_posts, get_post_comments, search_reddit, get_user… | Signal Velocity | Cognara Mind, ZenFlow | Planned |
| TikTok Creator MCP | TikTok API + FastMCP | 5+ | publish_video, get_video_analytics, search_hashtags, get_trending_sounds, schedule_post | Nexus Labs | Signal Velocity | Planned |

## Notes

- The planned Ace Knowledge Graph MCP row matches the custom build spec [[MCP-03 Ace Knowledge Graph MCP]] (the build spec names its tools add_entity and add_relationship; this row says add_node and add_edge). It fronts the Ace graph listed in [[Knowledge Graph Tools]].
- The planned n8n MCP Bridge connects agents to the workflows in [[n8n Workflow Blueprint]].
- Notion MCP is the base that [[MCP-04 Notion Operations MCP]] extends. GitHub MCP is the base for [[MCP-05 GitHub Intelligence MCP]]. Sentry and Vercel feed [[MCP-14 Infrastructure Ops MCP]].
- PubMed MCP is a data source for [[MCP-18 Longevity Intelligence MCP]].
- Airtable is not in this list; see [[Airtable Operations Hub]].

## Primary department counts

- [[Binary Loom Division]]: 7
- [[Vital Helix Division]]: 7
- [[ZenFlow Division]]: 6
- [[Quantum Ledger Division]]: 6
- [[Signal Velocity Division]]: 4
- [[Nexus Labs Division]]: 4
- [[The Collective Division]]: 2
- [[Hybrid Living Division]]: 1
- [[Gaia Synthesis Division]]: 1

Hub: [[MCP Matrix]]
