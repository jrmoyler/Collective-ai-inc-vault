# Nineteen-district source expansion

This extends PR #4 on the existing branch. The vault has 1,405 notes, including 185 new notes, and 13,751 resolved internal links. There are no duplicate note names or unresolved links. Existing content and note identities are preserved; three historical product aliases are archived with canonical links.

## Districts and content

The original thirteen folder districts remain. Six source-backed virtual districts add Tools and Integrations, Learning and Curriculum, Governance and Decisions, Clients and Delivery, Facilities and Infrastructure, and Synergy Nodes. These are virtual navigation groupings, not newly activated corporate divisions or changes to the six physical-campus districts.

Content includes twenty division business plans, all 600 specialist roles in source reference rosters, product specifications, G-COSA and foundry contracts, learning modules, workbooks, client workflows, research, governance and infrastructure. Twenty API contract notes describe work still to build; they do not claim those integrations are deployed.

All 52 primary-folder documents have a documented review disposition. The broader inventory covers 425 documents, 414 readable extracts and 11 empty extracts. This is a scoped inventory, not a claim to have exhaustively reviewed every item throughout Drive. Current repository canon overrides historical forecasts and organizational assertions. See drive-expansion-provenance.json and source-note-associations.json for the audit trail.

## Application

The navigator exposes all nineteen districts with searchable, paginated directories, metadata facets, entry notes and source links. Membership may overlap in navigation, but each note occupies exactly one world building. Live membership changes rebuild placement while preserving camera state; stale server catalogs cannot replace the newer reviewed layout.

Nineteen code-built landmarks use three merged materials and bounded geometry. Guides use the same district placement rules. The prior code-only cinematics, sound assets, Sentinel upgrades, animejs and Babylon camera paths remain. Adaptive resolution now reacts to three consecutive extreme frame stalls without overreacting to an isolated stall. These are browser-rendered assets; PS5 or Steam Deck hardware performance has not been measured.

## Backend state and merge gate

The provenance schema migration and JWT-protected district-catalog and district-progress functions were deployed. Nineteen registry entries were verified and all authored notes were saved through the versioned vault API with readback.

The Supabase management connector subsequently returned Unauthorized. The final 425-document catalog seed, 364 note/source associations and updated thematic membership are prepared in supabase/source_catalog_seed.sql but are NOT yet applied to production. Reconnect Supabase, apply that transaction, run supabase/tests/district_catalog_verification.sql and inspect advisors before merging. Existing frontend definitions keep all nineteen districts available while metadata is pending.

The seed is idempotent and only associates source review with a matching note-body hash. Database tests validate row isolation and evidence ownership. Production verification after the final seed remains outstanding.

## Validation

49 automated tests passed, followed by all 10 district tests passing with the added realtime-task regression; vault and web builds passed. Playwright rendered the real 1,405-note mirror on desktop (1440×900) and mobile (390×844, reduced motion), with nineteen landmarks and districts, all buildings, seven loaded audio assets and zero browser errors. Member sessions and backend transport were mocked: these checks do not establish production authentication or hardware frame rate. The final emergency-resolution adjustment was separately covered by passing tests after the rendered run. Screenshots and structured results are in district-expansion-evidence/.

PR review fixes also refresh open district task lists on realtime changes and align the package, lockfile and CI with Node 22 or newer.
