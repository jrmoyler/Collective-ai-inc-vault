---
title: Mega Campus Cost Model (Oct 2026)
gsf: 2045000
date: 2026-10-04
tags:
- mega-campus
- finance
- cost-model
- estimate
- sept-16-register
type: campus-finance
acres: 220
owner: JR Moyler (Hataalii)
source: Oct 4, 2026 web benchmarks applied to Sept 16 register
status: estimate (concept class)
updated: 2026-10-04
total_low_usd: 1053115374
total_high_usd: 2295711602
---
# Mega Campus Cost Model (Oct 2026)

Order-of-magnitude construction cost estimate for the [[Collective AI Mega Campus]] under the canonical Sept 16, 2026 register (220 acres, 35 facilities, 2,045,000 sq ft design area). Built Oct 4, 2026 from published 2025–2026 Columbus and Midwest benchmarks. **Every figure is an estimate.** Collective AI has 0 paying customers and $0 MRR as of Sept 2026; nothing here is funded, bid or priced by a contractor.

> [!warning] Estimate class
> Concept-level (no drawings, no soils, no utility letters). Treat the range as the honest answer, not the midpoint. The register gives no cost; the earlier $6.54B v3.0 figure is superseded and is not reused here. See [[Mega Campus Financial Model]] and [[Mega Campus Version History]].

## Headline range

| Line | Low | High | Basis |
|---|---|---|---|
| Buildings (35 facilities, hard cost) | $686M | $1.43B | per-facility table below |
| Central plant equipment (CHP, battery, solar) | $42M | $127M | [[Mega Campus Power and Data Center Model (Oct 2026)]] |
| Structured parking (~1,333 spaces) | $40M | $49M | WGI 2026 national median $33,300/space |
| Site work allowance (roads, utilities, lakes, surface parking) | $11M | $22M | $50k–$100k per acre x 220 acres |
| **Hard cost subtotal** | **$779M** | **$1.62B** | |
| Land (220 acres) | $24M | $64M | $110k–$290k per acre, New Albany comps |
| Soft costs | $156M | $406M | 20% / 25% of hard cost |
| Contingency | $94M | $203M | 10% of hard + soft |
| **Total development cost** | **$1.05B** | **$2.30B** | about $515–$1,123 per sq ft all-in |

- Of the building subtotal, $193M–$324M is the ten pending-division facilities (CF-26 to CF-35, 545,000 sq ft) and $64M–$104M is the two study-allowance facilities (CF-24, CF-25, 164,000 sq ft). Removing both leaves a 25-facility core of $429M–$997M in building hard cost.
- Prices are 2025–2026 dollars. No escalation is applied; see the timeline section for why that matters.

## Methodology

1. Take each facility's design area and function from the register and its facility note (the register's `Type` field plus the S13 program card).
2. Map each facility to one of the cost classes below. Each class has a low and high hard-cost $/sq ft drawn from a 2025–2026 published benchmark, adjusted toward Columbus where the source gives a regional index (Ximator puts Columbus about 5% under the national benchmark; Terrapin's Midwest index is 0.95–1.02 for manufacturing and 0.93–1.12 for senior care).
3. Multiply area by the class range. The data center (CF-02) is priced per MW instead, in [[Mega Campus Power and Data Center Model (Oct 2026)]], and its result is carried in here.
4. Add plant equipment, structured parking, a per-acre site-work allowance, land, soft costs and contingency.
5. Roll up by district and total.

## Cost classes and benchmarks

| Class | $/sq ft low | $/sq ft high | Benchmark basis |
|---|---|---|---|
| Mid/high-rise HQ office | $450 | $650 | Claris Midwest mid-rise office $454–$556; HomeGuide high-rise $430–$1,000 national; 12-floor tower with observation deck sits at the upper end |
| Low-rise office / R&D office | $225 | $350 | Ximator Columbus commercial office $191–$223 (commodity); HomeGuide single-story office $240–$440 national; Columbus about -5% of national |
| Secure office (hardened, SOC, cold storage) | $300 | $500 | Office class plus hardening; HomeGuide police/government $430–$850 national bounds the top |
| Library / academy | $350 | $600 | HomeGuide schools $300–$380, classroom buildings $500–$660, Midwest about -5% |
| Media / virtual production stages | $250 | $450 | Terrapin general manufacturing $250–$450 used as proxy for stage halls plus office |
| General manufacturing | $250 | $450 | Terrapin general manufacturing $250–$450, Midwest index 0.95–1.02 |
| Heavy robotics assembly and test | $250 | $500 | Terrapin general $250–$450 to lower advanced $450; high-bay, crane and test pits |
| Advanced manufacturing (aerospace high-bay) | $450 | $800 | Terrapin advanced manufacturing $450–$800 |
| Light industrial / yard | $150 | $250 | Terrapin light assembly $150–$250; Claris light industrial $150–$300 |
| Logistics depot / drone port | $125 | $200 | Ximator Columbus warehouse/industrial $108–$145 plus depot systems and apron |
| Warehouse | $108 | $145 | Ximator Columbus warehouse/industrial $108–$145 |
| Vertical farm | $250 | $550 | Light industrial shell $150–$250 plus Agritecture CEA fit-out $100–$300 |
| Wet lab / clinical | $650 | $850 | HomeGuide laboratory buildings $700–$840 national, Midwest about -5%; Lab Design News fit-out $600–$1,400 |
| Pilot-process lab | $500 | $800 | Lab Design News $600–$1,400 fit-out range, lower half, plus process shell |
| Sports science / performance | $350 | $550 | HomeGuide community/gym buildings $430–$850 national, lower half, Midwest adjusted |
| Civic / operations center | $300 | $500 | HomeGuide police/government $430–$850 national bounds the top; office class bounds the bottom |
| Marketplace / retail pavilion | $300 | $500 | HomeGuide retail $370–$580 national, Midwest about -5%; Claris Midwest malls $284–$507 |
| Dining, events, wellness, childcare | $300 | $550 | Claris Midwest hotels $180–$500; HomeGuide hotel $130–$550; commercial kitchens push the top |
| Central utility plant building | $200 | $400 | Industrial shell $150–$250 plus plant-grade structure; equipment priced separately |
| Energy demonstration / control lab | $200 | $350 | Light industrial $150–$250 plus control rooms and labs |
| Energy commons demonstration | $250 | $450 | Terrapin general manufacturing $250–$450 as proxy for equipment halls plus labs |
| Care village (assisted-living grade) | $270 | $480 | Terrapin assisted living $290–$430 ground-up x Midwest 0.93–1.12 |
| AI data center (priced per MW) | — | — | See power note: Turner & Townsend Columbus $9.8/W (2025) to iRecruit AI-optimized $15–20M/MW |

Benchmark sources for the classes: [Ximator, Construction Cost in Columbus, Ohio 2026 (June 2026)](https://ximator.com/blog/construction-cost-columbus-oh-2026); [HomeGuide, Commercial Construction Cost Per Square Foot (updated June 26, 2025)](https://homeguide.com/costs/commercial-construction-cost-per-square-foot); [Claris Design Build, 2025 Update: Commercial Construction Cost per Sq Ft in the US (Apr 14, 2025)](https://www.clarisdesignbuild.com/2025-update-commercial-construction-cost-per-square-foot-in-the-us/); [Terrapin Construction Group, Cost to Build a Manufacturing Facility in the USA (2026) (June 12, 2026)](https://terrapincg.com/news/manufacturing-facility-construction-cost-2026); [Terrapin Construction Group, Average Cost to Build an Assisted Living or Memory Care Facility (June 8, 2026)](https://terrapincg.com/news/average-cost-to-build-assisted-living-memory-care-facility-usa); [Lab Design News, Key Cost Drivers for Lab Construction Projects in 2026 and Beyond](https://www.labdesignnews.com/content/understanding-key-cost-drivers-for-lab-construction-projects-in-2026-and-beyond); [Agritecture, Is Vertical Farming Profitable? (Sept 4, 2026)](https://www.agritecture.com/blog/is-vertical-farming-profitable); [iRecruit, Data Center Construction Cost per MW (2026)](https://www.irecruit.co/insights/data-center-construction-cost-per-mw-2026-benchmarks-owners); [Turner & Townsend, Data Centre Construction Cost Index 2025](https://reports.turnerandtownsend.com/data-centre-construction-cost-index-2025/data-centre-cost-trends).

## Per-facility table

| CF | Facility | District | Sq ft | Class | $/sf low | $/sf high | Cost low | Cost high |
|---|---|---|---|---|---|---|---|---|
| CF-01 | [[The Prism]] | Brain & governance | 80,000 | Mid/high-rise HQ office | $450 | $650 | $36M | $52M |
| CF-02 | [[The Neural Block]] | Brain & governance | 60,000 | AI data center (priced per MW) | $1,470 | $7,000 | $88M | $420M |
| CF-03 | [[The Vault]] | Brain & governance | 40,000 | Secure office (hardened, SOC, cold storage) | $300 | $500 | $12M | $20M |
| CF-04 | [[Royal Library & Hybrid Living Academy]] | Knowledge & media | 100,000 | Library / academy | $350 | $600 | $35M | $60M |
| CF-05 | [[Nexus Labs Production Complex]] | Knowledge & media | 60,000 | Media / virtual production stages | $250 | $450 | $15M | $27M |
| CF-06 | [[Signal Velocity Growth War Room]] | Knowledge & media | 14,000 | Low-rise office / R&D office | $225 | $350 | $3M | $5M |
| CF-07 | [[Glyph Forge Works]] | Manufacturing & logistics | 60,000 | General manufacturing | $250 | $450 | $15M | $27M |
| CF-08 | [[Titan Works]] | Manufacturing & logistics | 200,000 | Heavy robotics assembly and test | $250 | $500 | $50M | $100M |
| CF-09 | [[Vector Hub]] | Manufacturing & logistics | 150,000 | Logistics depot / drone port | $125 | $200 | $19M | $30M |
| CF-10 | [[Materials + Inventory Warehouse]] | Manufacturing & logistics | 45,000 | Warehouse | $108 | $145 | $5M | $7M |
| CF-11 | [[Eden Spire]] | Living systems | 50,000 | Vertical farm | $250 | $550 | $12M | $28M |
| CF-12 | [[Vitality Center]] | Living systems | 40,000 | Wet lab / clinical | $650 | $850 | $26M | $34M |
| CF-13 | [[Eon Core Longevity Research Pavilion]] | Living systems | 18,000 | Wet lab / clinical | $650 | $850 | $12M | $15M |
| CF-14 | [[Cognara Mind Behavioral Intelligence Institute]] | Living systems | 15,000 | Low-rise office / R&D office | $225 | $350 | $3M | $5M |
| CF-15 | [[Kinetic Edge Performance Center]] | Living systems | 60,000 | Sports science / performance | $350 | $550 | $21M | $33M |
| CF-16 | [[Civic Core Public Hub]] | Public & community | 30,000 | Civic / operations center | $300 | $500 | $9M | $15M |
| CF-17 | [[Terra Axis Living Systems Yard]] | Living systems | 75,000 | Light industrial / yard | $150 | $250 | $11M | $19M |
| CF-18 | [[Nomad Nexus Global Mobility Hub]] | Public & community | 12,000 | Low-rise office / R&D office | $225 | $350 | $3M | $4M |
| CF-19 | [[Juris Guard Regulatory Command Wing]] | Brain & governance | 12,000 | Secure office (hardened, SOC, cold storage) | $300 | $500 | $4M | $6M |
| CF-20 | [[Aether Link Mesh Operations Spire]] | Energy & mesh | 25,000 | Low-rise office / R&D office | $225 | $350 | $6M | $9M |
| CF-21 | [[EnerGenius + Helios Central Utility Plant]] | Energy & mesh | 50,000 | Central utility plant building | $200 | $400 | $10M | $20M |
| CF-22 | [[Visitor, Security and Campus Operations Center]] | Public & community | 25,000 | Civic / operations center | $300 | $500 | $8M | $12M |
| CF-23 | [[Employee Commons and Wellness Village]] | Living systems | 90,000 | Dining, events, wellness, childcare | $300 | $550 | $27M | $50M |
| CF-24 | [[Kinetic Energy Operations Center (KEOC)]] | Energy & mesh | 60,000 * | Energy demonstration / control lab | $200 | $350 | $12M | $21M |
| CF-25 | [[Gaia Synthesis Bio-Energy Center]] | Energy & mesh | 104,000 * | Pilot-process lab | $500 | $800 | $52M | $83M |
| CF-26 | [[The Orbital Foundry — Astral Forge]] | Manufacturing & logistics | 65,000 (pending) | Advanced manufacturing (aerospace high-bay) | $450 | $800 | $29M | $52M |
| CF-27 | [[The Matter Works — Materia Nova]] | Manufacturing & logistics | 85,000 (pending) | Pilot-process lab | $500 | $800 | $42M | $68M |
| CF-28 | [[The Water Observatory — Aqua Meridian]] | Living systems | 50,000 (pending) | Pilot-process lab | $500 | $800 | $25M | $40M |
| CF-29 | [[The Living Provision — Nourish Grid]] | Living systems | 60,000 (pending) | General manufacturing | $250 | $450 | $15M | $27M |
| CF-30 | [[The Trust Vault — Sovereign Key]] | Brain & governance | 35,000 (pending) | Secure office (hardened, SOC, cold storage) | $300 | $500 | $10M | $18M |
| CF-31 | [[The Resilience House — Praesidium Mutual]] | Brain & governance | 40,000 (pending) | Low-rise office / R&D office | $225 | $350 | $9M | $14M |
| CF-32 | [[The Exchange Pavilion — Mercantile Circuit]] | Public & community | 55,000 (pending) | Marketplace / retail pavilion | $300 | $500 | $16M | $28M |
| CF-33 | [[The Human Systems Institute — Human Foundry]] | Knowledge & media | 50,000 (pending) | Low-rise office / R&D office | $225 | $350 | $11M | $18M |
| CF-34 | [[The Energy Commons — Volta Grid]] | Energy & mesh | 60,000 (pending) | Energy commons demonstration | $250 | $450 | $15M | $27M |
| CF-35 | [[The Care Village — Hearth Nexus]] | Living systems | 70,000 (pending) | Care village (assisted-living grade) | $270 | $480 | $19M | $34M |
| **Total** | 35 facilities | | **2,045,000** | | | | **$686M** | **$1.43B** |

\* Study allowance; source area unrecovered. CF-02 $/sf is the per-MW result divided by 60,000 sq ft.

## Roll-up by district

| District | Facilities | Sq ft | Cost low | Cost high |
|---|---|---|---|---|
| [[Mega Campus — Brain and Governance District]] | 6 | 267,000 | $159M | $530M |
| [[Mega Campus — Knowledge and Media District]] | 4 | 224,000 | $64M | $109M |
| [[Mega Campus — Manufacturing and Logistics District]] | 6 | 605,000 | $160M | $284M |
| [[Mega Campus — Living Systems District]] | 10 | 528,000 | $172M | $284M |
| [[Mega Campus — Public and Community District]] | 4 | 122,000 | $36M | $59M |
| [[Mega Campus — Energy and Mesh District]] | 5 | 299,000 | $95M | $160M |
| **Total** | **35** | **2,045,000** | **$686M** | **$1.43B** |

## Land, parking, site work, soft costs, contingency

### Land
- 220 acres x $110,000–$290,000 per acre = **$24M–$64M**.
- Comps: Licking County farmland went from $20,000/acre (2021) to $45,000 (2022); New Albany Company bought at $70,000/acre and sold to Intel at about $110,000/acre ([10TV, The Intel effect: Licking County land and housing prices](https://www.10tv.com/article/news/local/licking-county-land-and-housing-prices-are-rising-intel/530-f66d2315-a8e0-4fa0-833a-79ef7e6cb254)). AWS paid $116 million for 400 acres in New Albany, about $290,000/acre ([Data Center Frontier, AWS Readies $3.5B for 5 More Ohio Data Centers in New Albany (Sept 2023)](https://www.datacenterfrontier.com/site-selection/article/33011941/aws-readies-35b-for-5-more-ohio-data-centers-in-booming-columbus-suburb-new-albany)). Amazon's 2019 New Albany purchases were $194,731–$194,999/acre and Lockbourne Industrial Park sold at $216,102/acre in 4Q21 ([Newmark, Land Scarcity and the Increase in Industrial Land Prices Throughout Ohio (2022)](https://www.nmrk.com/perspectives/land-scarcity-and-the-increase-in-industrial-land-prices-throughout-ohio-and-nationally)). A Meta infrastructure partner paid $42 million for a New Albany parcel in Dec 2025, acreage not disclosed ([DCD, Meta DC infrastructure partner purchases $42m land parcel in New Albany (Dec 24, 2025)](https://www.datacenterdynamics.com/en/news/meta-dc-infrastructure-partner-purchases-42m-land-parcel-in-new-albany-ohio/)).
- A 220-acre assembled site with utilities nearby in the New Albany corridor sits at the top of this range; farmland further out sits at the bottom.

### Parking
- Columbus Zoning Code 3312.49 minimums applied to each facility (general office 1:450 sq ft, medical office 1:300, library 1:400, fitness 1:250, manufacturing tiered 1:750 / 1:1,500 / 1:3,000, warehouse tiered 1:1,000 / 1:5,000 / 1:10,000) give roughly **3,334 spaces** ([Columbus Zoning Code 3312.49, minimum parking spaces](https://arequestions.com/wp-content/uploads/2020/10/Columbus-Zoning-Code-Excerpt_-Minimum-numbers-of-parking-spaces-required.-Chapter-3312.-OFF-STREET-PARKING-AND-LOADING-Title-33.-ZONING-CODE-Code-of-Ordinances-Columbus.pdf)). Lab space is counted at the medical-office ratio.
- Assumption: 40% structured (1,333 spaces) in the Brain and Governance and Knowledge and Media districts, 60% surface (2,000 spaces) inside the site-work allowance.
- Structured parking at the WGI 2026 national median of $33,300 per space or $98.75 per sq ft (up 6% from $31,400 in 2025; Columbus not broken out) = about $44M, carried as $40M–$49M ([WGI 2026 Parking Structure Cost Outlook via Parking Today (Sept 1, 2026)](https://parkingtoday.com/press-releases/wgi-releases-2026-parking-structure-cost-outlook-finds-national-construction-costs-rise-6/)).

### Site work
- Allowance of $50,000–$100,000 per acre x 220 acres = **$11M–$22M** for roads, surface parking, utilities, stormwater, grading and the seven connected lakes in the explorer. HomeGuide puts general land development at $20,000–$100,000 per acre, with regrading alone at $17,400–$43,600 per acre and large-development permits at $500,000+ ([HomeGuide, How Much Does It Cost to Develop Land? (Nov 26, 2025)](https://homeguide.com/costs/cost-to-develop-land)). A campus with lakes and a central plant distribution network belongs at the top of that range, so the low end here is the upper half of the published range.
- Building footprint is about 1,309,167 sq ft (30 acres), so roughly 190 acres remain for roads, parking, lakes, solar and landscape.

### Soft costs and contingency
- Soft costs at 20% (low) and 25% (high) of hard cost: **$156M–$406M**. Soft costs typically run 20–30% of total project cost, 15–20% for simple industrial work and 35%+ for complex projects ([SmartBarrel, Hard Costs vs Soft Costs in Construction](https://smartbarrel.io/blog/hard-costs-vs-soft-costs-most-contractors-get-this-wrong/)).
- Contingency at 10% of hard plus soft: **$94M–$203M**. The published industry standard is 3–10% of hard costs ([Rabbet, The Basics of Contingency on Construction Projects](https://rabbet.com/blog/construction-contingency)); the top of that range is used because nothing is designed.
- Financing costs, FF&E, IT fit-out beyond the data center, robotics and production equipment for Titan Works, Glyph Forge and Nexus Labs, and tenant improvements are **not** included.

## Timeline assumption

- Phase 0 (2027–2028): site control, AEP Ohio large-load application, OPSB and New Albany entitlements. JLL reports grid-connection waits in primary data center markets exceed four years ({L('jll')}); AEP Ohio's tariff for loads above 25 MW requires 85% minimum demand payments over up to 12 years with a four-year ramp ({L('powermag')}). CF-02 alone is unlikely to cross 25 MW, so the campus may stay below the data center tariff; see the power note.
- Phase 1 (2029–2031): Brain and Governance core (CF-01, CF-02, CF-03, CF-19), CF-21 utility plant, CF-22 visitor and operations center, site infrastructure.
- Phase 2 (2031–2033): Knowledge and Media, Manufacturing and Logistics, Living Systems operating-division facilities, CF-23 commons.
- Phase 3 (2033+): study-allowance facilities (CF-24, CF-25) once areas are recovered, and pending-division facilities (CF-26 to CF-35) only if those divisions are chartered. Pending divisions 21–30 are not active.
- Escalation: RLB measured 4.4% year-over-year construction cost growth in April 2025 ([Rider Levett Bucknall, Construction Cost Report North America Q2 2025 (July 7, 2025)](https://www.rlb.com/americas/insight/rlb-construction-cost-report-north-america-q2-2025/)); Turner & Townsend's 2025 survey found 60% of data center respondents expect 5–15% increases in 2026 ([Turner & Townsend, Data Centre Construction Cost Index 2025](https://reports.turnerandtownsend.com/data-centre-construction-cost-index-2025/data-centre-cost-trends)). A build that runs 2029–2033 at 4–5% a year would carry the 2026-dollar total materially higher.

## Assumptions

- Design area in the register is treated as gross construction area.
- The register's `Type` and S13 function text decide the cost class; the pending-division facilities (CF-26 to CF-35) are classed from their floor programs.
- CF-21 building shell is priced per sq ft; CHP, battery and solar equipment are priced separately from NREL and CHP benchmarks in the power note.
- Robotics lines, production equipment, studio equipment, lab casework beyond the lab $/sf class, and the Clone Alpha fleet are excluded.
- Columbus benchmarks are used where published (Ximator); national ranges are shifted about 5% down where no Columbus figure exists.
- No incentives (Ohio JobsOhio, TIF, CRA, federal credits) are netted against cost.

## Sources

- [Ximator, Construction Cost in Columbus, Ohio 2026 (June 2026)](https://ximator.com/blog/construction-cost-columbus-oh-2026)
- [HomeGuide, Commercial Construction Cost Per Square Foot (updated June 26, 2025)](https://homeguide.com/costs/commercial-construction-cost-per-square-foot)
- [Claris Design Build, 2025 Update: Commercial Construction Cost per Sq Ft in the US (Apr 14, 2025)](https://www.clarisdesignbuild.com/2025-update-commercial-construction-cost-per-square-foot-in-the-us/)
- [Terrapin Construction Group, Cost to Build a Manufacturing Facility in the USA (2026) (June 12, 2026)](https://terrapincg.com/news/manufacturing-facility-construction-cost-2026)
- [Terrapin Construction Group, Average Cost to Build an Assisted Living or Memory Care Facility (June 8, 2026)](https://terrapincg.com/news/average-cost-to-build-assisted-living-memory-care-facility-usa)
- [Lab Design News, Key Cost Drivers for Lab Construction Projects in 2026 and Beyond](https://www.labdesignnews.com/content/understanding-key-cost-drivers-for-lab-construction-projects-in-2026-and-beyond)
- [Agritecture, Is Vertical Farming Profitable? (Sept 4, 2026)](https://www.agritecture.com/blog/is-vertical-farming-profitable)
- [WGI 2026 Parking Structure Cost Outlook via Parking Today (Sept 1, 2026)](https://parkingtoday.com/press-releases/wgi-releases-2026-parking-structure-cost-outlook-finds-national-construction-costs-rise-6/)
- [HomeGuide, How Much Does It Cost to Develop Land? (Nov 26, 2025)](https://homeguide.com/costs/cost-to-develop-land)
- [SmartBarrel, Hard Costs vs Soft Costs in Construction](https://smartbarrel.io/blog/hard-costs-vs-soft-costs-most-contractors-get-this-wrong/)
- [Rabbet, The Basics of Contingency on Construction Projects](https://rabbet.com/blog/construction-contingency)
- [Rider Levett Bucknall, Construction Cost Report North America Q2 2025 (July 7, 2025)](https://www.rlb.com/americas/insight/rlb-construction-cost-report-north-america-q2-2025/)
- [Turner & Townsend, Data Centre Construction Cost Index 2025](https://reports.turnerandtownsend.com/data-centre-construction-cost-index-2025/data-centre-cost-trends)
- [iRecruit, Data Center Construction Cost per MW (2026)](https://www.irecruit.co/insights/data-center-construction-cost-per-mw-2026-benchmarks-owners)
- [JLL, 2026 Global Data Center Outlook (Jan 5, 2026)](https://www.jll.com/en-us/insights/market-outlook/data-center-outlook)
- [10TV, The Intel effect: Licking County land and housing prices](https://www.10tv.com/article/news/local/licking-county-land-and-housing-prices-are-rising-intel/530-f66d2315-a8e0-4fa0-833a-79ef7e6cb254)
- [Data Center Frontier, AWS Readies $3.5B for 5 More Ohio Data Centers in New Albany (Sept 2023)](https://www.datacenterfrontier.com/site-selection/article/33011941/aws-readies-35b-for-5-more-ohio-data-centers-in-booming-columbus-suburb-new-albany)
- [Newmark, Land Scarcity and the Increase in Industrial Land Prices Throughout Ohio (2022)](https://www.nmrk.com/perspectives/land-scarcity-and-the-increase-in-industrial-land-prices-throughout-ohio-and-nationally)
- [DCD, Meta DC infrastructure partner purchases $42m land parcel in New Albany (Dec 24, 2025)](https://www.datacenterdynamics.com/en/news/meta-dc-infrastructure-partner-purchases-42m-land-parcel-in-new-albany-ohio/)
- [Columbus Zoning Code 3312.49, minimum parking spaces](https://arequestions.com/wp-content/uploads/2020/10/Columbus-Zoning-Code-Excerpt_-Minimum-numbers-of-parking-spaces-required.-Chapter-3312.-OFF-STREET-PARKING-AND-LOADING-Title-33.-ZONING-CODE-Code-of-Ordinances-Columbus.pdf)
- [POWER Magazine, Regulator Approves AEP Ohio's Landmark Data Center Tariff (July 2025)](https://www.powermag.com/regulator-approves-aep-ohios-landmark-data-center-tariff/)

## Related

- [[Collective AI Mega Campus]]
- [[Mega Campus Power and Data Center Model (Oct 2026)]]
- [[Mega Campus Comparables]]
- [[Mega Campus Financial Model]]
- [[Ahmad Muhammad]] (CFO)
