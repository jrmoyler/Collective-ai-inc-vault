---
title: Mega Campus Power and Data Center Model (Oct 2026)
date: 2026-10-04
tags:
- mega-campus
- energy
- data-center
- power-model
- estimate
- sept-16-register
type: campus-system
owner: JR Moyler (Hataalii)
source: Oct 4, 2026 web benchmarks applied to Sept 16 register
status: estimate (concept class)
updated: 2026-10-04
peak_mw_low: 18
dc_it_mw_low: 9
peak_mw_high: 44
dc_it_mw_high: 21
annual_gwh_low: 96
annual_gwh_high: 271
---
# Mega Campus Power and Data Center Model (Oct 2026)

Demand, data center capacity, on-site generation and grid notes for the [[Collective AI Mega Campus]] under the Sept 16, 2026 register. Built Oct 4, 2026 from published benchmarks. **All figures are estimates.** The register gives no MW, MWh or GWh figure; the campus is grid-connected and not self-powered. The v3.0 figures (96 MW critical IT, 150 MW peak, 24 MWdc solar, 40 MW / 160 MWh battery) are superseded and not reused.

## Headline figures

| Metric | Low | High | Note |
|---|---|---|---|
| Neural Block (CF-02) critical IT | 9 MW | 21 MW | central case 13.5 MW |
| Neural Block build cost | $88M | $420M | central case $162M |
| Campus annual electricity | 96 GWh | 271 GWh | buildings 30 GWh–44 GWh plus data center 66 GWh–227 GWh |
| Campus peak load | 18 MW | 44 MW | buildings 8–11 MW plus data center 11–32 MW |
| On-site solar | 11.0 MWac | 14.4 MWac | 10.3 MWdc roof plus 3.4–6.7 MWac ground; 25–34 GWh/yr |
| On-site CHP (EnerGenius) | 10 MW | 20 MW | 44–140 GWh/yr if run 50–80% |
| Battery | 40 MWh | 100 MWh | 4-hour class, $13M–$33M |
| Solar share of annual demand | 13–26% | | low-demand case with small array vs high-demand case with large array |
| Solar plus CHP share | 64–71% | | matched cases; grid supplies the rest and all firming |
| Annual electricity bill at AEP Ohio commercial rates | $16M | $57M | 16.51¢ (2024) to 21.08¢/kWh (2026 est.), before on-site generation |

## 1. Data center (CF-02, The Neural Block)

60,000 sq ft over two floors ([[The Neural Block]]).

### Capacity
- Assumption: 50% of gross area is white space (30,000 sq ft); the rest is electrical, cooling, network rooms and mission control.
- Density benchmarks: modern efficient halls design to 200–300 W/sq ft, hyperscale 350–600 W/sq ft, AI flagship liquid-cooled halls 600–1,000+ W/sq ft; dense liquid-cooled halls run 12–15 sq ft per rack against about 20 sq ft in air-cooled layouts ([Obel Infrastructure, Data Center Capacity Math: kW per Square Foot vs kW per Rack (Aug 27, 2026)](https://obelinf.com/blog/data-center-capacity-math-kw-per-square-foot-vs-kw-per-rack/)).
- Rack benchmarks: Uptime's 2025 survey puts most racks at 10–30 kW with extreme densities rare ([DCD on Uptime Institute 2025 Global Data Center Survey (July 30, 2025)](https://www.datacenterdynamics.com/en/news/roughly-one-third-of-data-center-owners-and-operators-doing-ai-training-or-inference-uptime-institute/)); 50–70 kW racks are now common in AI deployments and NVIDIA Vera Rubin can reach 246 kW per rack ([Schneider Electric blog, Data center power density: planning liquid-cooled AI data centers (July 28, 2026)](https://blog.se.com/datacenter/2026/07/28/data-center-power-density-planning-liquid-cooled-ai-data-centers-around-grid-and-power-constraints/)); GB300 NVL72 is up to 142 kW per rack and air cooling tops out near 50 kW per rack ([Data Center Knowledge, AI Rack Density's Real Limits](https://www.datacenterknowledge.com/ai-data-centers/ai-rack-density-s-real-limits-power-cooling-failure-risk)).
- Result: 30,000 sq ft x 300 W = **9 MW** (low, mixed air/liquid); x 450 W = **13.5 MW** (central); x 700 W = **21 MW** (high, AI-dense liquid-cooled). Cross-check: 30,000 sq ft / 15 sq ft per rack = 2,000 dense rack positions; at a blended 10 kW that is 20 MW, so the high case assumes a hall of GPU racks at 50–70 kW with wide service spacing rather than every position filled.
- At 21 MW the facility stays under AEP Ohio's 25 MW data center tariff threshold ([POWER Magazine, Regulator Approves AEP Ohio's Landmark Data Center Tariff (July 2025)](https://www.powermag.com/regulator-approves-aep-ohios-landmark-data-center-tariff/)); the campus as a whole does not (see grid notes).

### Cost
- Turner & Townsend's 2025 index prices Columbus at **US$9.8 per watt**, with liquid-cooled AI facilities carrying a 7–10% premium and 2025 costs up 5.5% ([Turner & Townsend, Data Centre Construction Cost Index 2025](https://reports.turnerandtownsend.com/data-centre-construction-cost-index-2025/data-centre-cost-trends)).
- JLL expects the global average to rise 6% to **$11.3 million per MW** in 2026 (shell and core; AI tenant fit-out can add up to $25 million per MW) ([JLL, 2026 Global Data Center Outlook (Jan 5, 2026)](https://www.jll.com/en-us/insights/market-outlook/data-center-outlook)).
- iRecruit's 2026 table: colocation/Tier III $10–12M per MW, hyperscale $12–15M, **AI-optimized $15–20M+ per MW** ($1,100–$1,500+/sq ft); MEP is about 75% of an AI build ([iRecruit, Data Center Construction Cost per MW (2026)](https://www.irecruit.co/insights/data-center-construction-cost-per-mw-2026-benchmarks-owners)).
- Result: 9 MW x $9.8M = **$88M** (low); 13.5 MW x $12M = **$162M** (central); 21 MW x $20M = **$420M** (high). GPUs and servers are not included.

### Energy and water
- PUE: Uptime 2025 average 1.54, 1.48 for facilities under five years old ([DCD on Uptime Institute 2025 Global Data Center Survey (July 30, 2025)](https://www.datacenterdynamics.com/en/news/roughly-one-third-of-data-center-owners-and-operators-doing-ai-training-or-inference-uptime-institute/)); direct-to-chip liquid cooling commonly 1.10–1.20 ([Schneider Electric blog, Data center power density: planning liquid-cooled AI data centers (July 28, 2026)](https://blog.se.com/datacenter/2026/07/28/data-center-power-density-planning-liquid-cooled-ai-data-centers-around-grid-and-power-constraints/)).
- Annual energy: low 9 MW x PUE 1.20 x 70% utilization = **66 GWh**; high 21 MW x PUE 1.54 x 80% = **227 GWh**. Peak 11–32 MW.
- Water: EPRI's 2023 US average site WUE is 0.36 L/kWh (range 0.1–9.0), rising to 0.45–0.48 by 2028 ([Nona Technologies, Data Center Water Consumption Per Day, WUE and Peak Demand (EPRI figures)](https://www.nona-technologies.com/blog/data-center-water-consumption)). At 0.36 L/kWh the Neural Block would use about 6–22 million gallons a year; a closed-loop liquid design sits at the bottom of the EPRI range. Columbus 2026 commercial rates are $4.731 water and $6.690 sewer per CCF ([City of Columbus Department of Public Utilities, 2026 rate chart](https://columbus.gov/files/sharedassets/city/v/1/services/public-utilities/ratechart24.pdf)), so even the high case is about $0M a year in water and sewer charges.
- Context: US data centers used 176 TWh (4.4% of US electricity) in 2023 and are projected at 325–580 TWh (6.7–12%) by 2028 ([Berkeley Lab, 2024 United States Data Center Energy Usage Report (Dec 20, 2024)](https://bies.lbl.gov/news/berkeley-lab-report-evaluates-increase-electricity-demand-data-centers)).

## 2. Campus demand model

Annual kWh per sq ft by facility class, mainly from EIA CBECS 2018 Table C14 ({L('cbecs')}), with lab intensity derived from ENERGY STAR national median site EUIs (laboratory 115.3 vs office 52.9 kBtu/sq ft; {L('estar')}). The Boston lab benchmarking study puts lab source EUI at 580–630 kBtu/sq ft against 148 for offices ({L('grc')}), so the derived lab figure is conservative. Manufacturing and vertical-farm intensities are planning assumptions because CBECS has no row for either.

| CF | Facility | Sq ft | kWh/sf low | kWh/sf high | GWh/yr low | GWh/yr high | Basis |
|---|---|---|---|---|---|---|---|
| CF-01 | [[The Prism]] | 80,000 | 13.6 | 13.6 | 1.1 | 1.1 | CBECS office 13.6 |
| CF-02 | [[The Neural Block]] | 60,000 | — | — | 66 | 227 | modeled by MW |
| CF-03 | [[The Vault]] | 40,000 | 13.6 | 13.9 | 0.5 | 0.6 | CBECS office 13.6 / public order and safety 13.9 |
| CF-04 | [[Royal Library & Hybrid Living Academy]] | 100,000 | 9.4 | 12.1 | 0.9 | 1.2 | CBECS education 9.4 / public assembly 12.1 |
| CF-05 | [[Nexus Labs Production Complex]] | 60,000 | 13.6 | 23.8 | 0.8 | 1.4 | CBECS office 13.6 to health care 23.8 as a stage/equipment proxy (assumption) |
| CF-06 | [[Signal Velocity Growth War Room]] | 14,000 | 13.6 | 13.6 | 0.2 | 0.2 | CBECS office 13.6 |
| CF-07 | [[Glyph Forge Works]] | 60,000 | 10.0 | 25.0 | 0.6 | 1.5 | planning assumption; CBECS has no manufacturing row (bracketed by warehouse 5.8 and health care 23.8) |
| CF-08 | [[Titan Works]] | 200,000 | 10.0 | 25.0 | 2.0 | 5.0 | planning assumption; see general manufacturing |
| CF-09 | [[Vector Hub]] | 150,000 | 5.8 | 7.2 | 0.9 | 1.1 | CBECS warehouse 5.8 / service 7.2 |
| CF-10 | [[Materials + Inventory Warehouse]] | 45,000 | 5.8 | 5.8 | 0.3 | 0.3 | CBECS warehouse 5.8 |
| CF-11 | [[Eden Spire]] | 50,000 | 50.0 | 100.0 | 2.5 | 5.0 | planning assumption; Agritecture says energy dominates CEA operating cost but gives no kWh/sf |
| CF-12 | [[Vitality Center]] | 40,000 | 29.6 | 29.6 | 1.2 | 1.2 | derived: office 13.6 x (ENERGY STAR lab site EUI 115.3 / office 52.9) |
| CF-13 | [[Eon Core Longevity Research Pavilion]] | 18,000 | 29.6 | 29.6 | 0.5 | 0.5 | derived: office 13.6 x (ENERGY STAR lab site EUI 115.3 / office 52.9) |
| CF-14 | [[Cognara Mind Behavioral Intelligence Institute]] | 15,000 | 13.6 | 13.6 | 0.2 | 0.2 | CBECS office 13.6 |
| CF-15 | [[Kinetic Edge Performance Center]] | 60,000 | 12.1 | 17.4 | 0.7 | 1.0 | CBECS public assembly 12.1 / outpatient health 17.4 |
| CF-16 | [[Civic Core Public Hub]] | 30,000 | 12.1 | 13.9 | 0.4 | 0.4 | CBECS public assembly 12.1 / public order 13.9 |
| CF-17 | [[Terra Axis Living Systems Yard]] | 75,000 | 5.8 | 13.6 | 0.4 | 1.0 | CBECS warehouse 5.8 to office 13.6 |
| CF-18 | [[Nomad Nexus Global Mobility Hub]] | 12,000 | 13.6 | 13.6 | 0.2 | 0.2 | CBECS office 13.6 |
| CF-19 | [[Juris Guard Regulatory Command Wing]] | 12,000 | 13.6 | 13.9 | 0.2 | 0.2 | CBECS office 13.6 / public order and safety 13.9 |
| CF-20 | [[Aether Link Mesh Operations Spire]] | 25,000 | 13.6 | 13.6 | 0.3 | 0.3 | CBECS office 13.6 |
| CF-21 | [[EnerGenius + Helios Central Utility Plant]] | 50,000 | 7.2 | 13.6 | 0.4 | 0.7 | CBECS service 7.2 to office 13.6 (plant auxiliaries excluded; see CHP) |
| CF-22 | [[Visitor, Security and Campus Operations Center]] | 25,000 | 12.1 | 13.9 | 0.3 | 0.3 | CBECS public assembly 12.1 / public order 13.9 |
| CF-23 | [[Employee Commons and Wellness Village]] | 90,000 | 14.4 | 43.8 | 1.3 | 3.9 | CBECS lodging 14.4 to food service 43.8 |
| CF-24 | [[Kinetic Energy Operations Center (KEOC)]] | 60,000 | 13.6 | 13.6 | 0.8 | 0.8 | CBECS office 13.6 |
| CF-25 | [[Gaia Synthesis Bio-Energy Center]] | 104,000 | 29.6 | 29.6 | 3.1 | 3.1 | derived as wet lab |
| CF-26 | [[The Orbital Foundry — Astral Forge]] | 65,000 | 15.0 | 30.0 | 1.0 | 1.9 | planning assumption; see general manufacturing, higher for test power |
| CF-27 | [[The Matter Works — Materia Nova]] | 85,000 | 29.6 | 29.6 | 2.5 | 2.5 | derived as wet lab |
| CF-28 | [[The Water Observatory — Aqua Meridian]] | 50,000 | 29.6 | 29.6 | 1.5 | 1.5 | derived as wet lab |
| CF-29 | [[The Living Provision — Nourish Grid]] | 60,000 | 10.0 | 25.0 | 0.6 | 1.5 | planning assumption; CBECS has no manufacturing row (bracketed by warehouse 5.8 and health care 23.8) |
| CF-30 | [[The Trust Vault — Sovereign Key]] | 35,000 | 13.6 | 13.9 | 0.5 | 0.5 | CBECS office 13.6 / public order and safety 13.9 |
| CF-31 | [[The Resilience House — Praesidium Mutual]] | 40,000 | 13.6 | 13.6 | 0.5 | 0.5 | CBECS office 13.6 |
| CF-32 | [[The Exchange Pavilion — Mercantile Circuit]] | 55,000 | 13.7 | 13.7 | 0.8 | 0.8 | CBECS retail (other than mall) 13.7 |
| CF-33 | [[The Human Systems Institute — Human Foundry]] | 50,000 | 13.6 | 13.6 | 0.7 | 0.7 | CBECS office 13.6 |
| CF-34 | [[The Energy Commons — Volta Grid]] | 60,000 | 13.6 | 23.8 | 0.8 | 1.4 | CBECS office 13.6 to health care 23.8 |
| CF-35 | [[The Care Village — Hearth Nexus]] | 70,000 | 14.4 | 23.8 | 1.0 | 1.7 | CBECS lodging 14.4 / health care 23.8 |
| **Total** | | **2,045,000** | | | **96** | **271** | |

- Buildings excluding the data center: **30 GWh–44 GWh** a year, about 14.9–22.3 kWh/sq ft blended (CBECS all-buildings average is 12.6).
- Peak: building annual energy / 8,760 h / 0.45 load factor (assumption) = 8–11 MW; plus data center 11–32 MW = **18–44 MW campus peak**. The high case is roughly one-fifth of the superseded 150 MW figure, which was sized for a 1,036,800 sq ft data center.
- Cost of energy: Ohio commercial rates rose from 10.69¢/kWh (Apr 2024) to 13.65¢ (Apr 2026); AEP Ohio bundled commercial was 16.51¢ in 2024 and about 21.08¢ in 2026 ([OhEnergyRatings, Ohio commercial electricity rates jumped nearly 28% in two years](https://www.ohenergyratings.com/resources/ohio-commercial-electricity-rates-rise-28-percent)). Before on-site generation the campus bill would be about **$16M–$57M a year**.

## 3. On-site generation share

### Solar
- Roof: building footprint about 1,309,167 sq ft; at 40% usable coverage and the Q1 2025 reference module density of 19.6 W per module-face sq ft ([NuWatt Energy, Commercial Solar Cost 2026 (Aug 31, 2026)](https://nuwattenergy.com/en/commercial-solar/cost-guide)) that is **10.3 MWdc** (7.7 MWac at ILR 1.34).
- Ground: NREL's capacity-weighted land use is 8.9 acres per MWac total, 7.3 acres direct, or 2.8 acres per GWh/yr for fixed-tilt ([NREL land-use figures via Renewable Energy World](https://www.renewableenergyworld.com/solar/calculating-solar-energys-land-use-footprint/)). If 30–60 of the roughly 190 non-building acres go to solar, that is **3.4–6.7 MWac**.
- Yield: NREL ATB class 6–7 capacity factors are 26.9% and 25.5% (resource 4.25–4.75 kWh/m²/day, which covers central Ohio) ([NREL ATB 2024, Utility-Scale PV](https://atb.nrel.gov/electricity/2024/utility-scale_pv)), so 11.0–14.4 MWac produces **25–34 GWh/yr**, or 13–26% of campus demand (small array against the low-demand case, large array against the high-demand case).
- Cost: commercial systems $1.10–$1.50/W at 500 kW–1 MW ([NuWatt Energy, Commercial Solar Cost 2026 (Aug 31, 2026)](https://nuwattenergy.com/en/commercial-solar/cost-guide)); utility-scale $1.56/Wac in the ATB 2023 base year plus grid connection ([NREL ATB 2024, Utility-Scale PV](https://atb.nrel.gov/electricity/2024/utility-scale_pv)). Solar budget **$17M–$27M**.
- Ohio context: 6,330 MW installed as of March 2026, 5.75% of state generation; Fox Squirrel 577 MW is the largest operating plant ([Wikipedia, Solar power in Ohio (as of March 2026)](https://en.wikipedia.org/wiki/Solar_power_in_Ohio)). Oak Run is approved for 800 MW solar plus 300 MW storage on about 4,400 acres ([American Public Power Association, Ohio Siting Board authorizes Oak Run (Mar 2024)](https://www.publicpower.org/periodical/article/ohio-siting-board-authorizes-construction-800-mw-solar-project-300-mw-storage-facility)); Harvey Solar is 350 MW on 2,630 acres in Licking County and Flint Grid is a 200 MW / 800 MWh battery on 15 acres in Jersey Township ([Ohio Power Siting Board news release (Oct 20, 2022)](https://opsb.ohio.gov/news/opsb-approves-new-energy-facilities-in-franklin-and-licking-counties-denies-solar-project-in-allen-auglaize-counties)). Those ratios (5.5–7.5 acres per MW) match the NREL figure used here. [[Helios Grid]] is the solar canon term and stays blocked pending SEC legal opinion.

### CHP (EnerGenius)
- Gas turbines are typically economical above 5 MW at $1,250–$3,300 per kW installed; reciprocating engines $1,433–$2,900 per kW; total CHP efficiency 70–80% ([UnderstandingCHP.com, Understanding CHP and the Cost of Installation (2018, rev. 2021)](https://understandingchp.com/blog/understanding-chp-and-the-cost-of-installation/); 2018 figures last revised 2021, so treat as a floor).
- Sizing 10–20 MW against a 18–44 MW peak gives **$12M–$66M** and 44–140 GWh/yr if dispatched 50–80% of hours. This covers the Neural Block's liquid-cooling heat rejection and campus heating; see [[EnerGenius CHP Microgrid]].

### Battery
- NREL's 2025 update puts a 4-hour utility-scale battery at **$334/kWh** in 2024 (about $1,336/kW), falling to $207–$354/kWh by 2030; tariff effects after Feb 2025 are excluded ([NREL, Cost Projections for Utility-Scale Battery Storage: 2025 Update](https://docs.nrel.gov/docs/fy25osti/93281.pdf)).
- 40–100 MWh (10–25 MW, 4-hour) = **$13M–$33M**. Enough to ride through the data center's UPS-to-generator window and shift solar, not to island the campus.

- **Combined**: in the low case (96 GWh demand, 11.0 MWac solar, 10 MW CHP at 50%) solar plus CHP covers about 71% of annual energy; in the high case (271 GWh demand, 14.4 MWac, 20 MW at 80%) about 64%. On paper, but firm capacity, the data center's 24/7 load and winter mornings all come from AEP Ohio. The campus stays **grid-connected hybrid**, as the register says.

## 4. Grid interconnect notes (AEP Ohio / Columbus)

- **Tariff**: PUCO approved AEP Ohio's data center tariff on July 9, 2025. Loads above 25 MW pay for at least 85% of subscribed capacity monthly, contracts run up to 12 years with a four-year ramp (50%, 65%, 80%, 90%), with exit fees and financial assurances; a sliding scale eases terms for smaller operators and existing sites are grandfathered unless they add capacity above 25 MW ([POWER Magazine, Regulator Approves AEP Ohio's Landmark Data Center Tariff (July 2025)](https://www.powermag.com/regulator-approves-aep-ohios-landmark-data-center-tariff/); [Data Center Frontier, Ohio Sets New Precedent: AEP's Power Rules (July 23, 2025)](https://www.datacenterfrontier.com/energy/article/55304787/ohio-sets-new-precedent-aeps-power-rules-shift-data-center-cost-burden)). A 18–44 MW mixed-use campus with a 9–21 MW data center should get legal advice on whether the data center load is measured alone or with the campus.
- **Load growth**: central Ohio data center load went from about 100 MW (2020) to 600 MW (2024) and AEP projects 5 GW by 2030; AEP Ohio has preliminary requests from over 50 customers at over 90 sites totaling more than 30,000 MW ([POWER Magazine, Regulator Approves AEP Ohio's Landmark Data Center Tariff (July 2025)](https://www.powermag.com/regulator-approves-aep-ohios-landmark-data-center-tariff/)). AEP stopped signing new service agreements for a period because of capacity constraints ([Renewable Energy World, Data centers are flocking to Ohio; here comes the transmission (Jan 10, 2025)](https://www.renewableenergyworld.com/news/data-centers-are-flocking-to-ohio-here-comes-the-transmission-to-support-them/)).
- **Transmission**: PJM approved a roughly 225-mile central Ohio solution at nearly $2 billion, in service June 2029, within a wider 765 kV / 500 kV / 345 kV build ([Renewable Energy World, Data centers are flocking to Ohio; here comes the transmission (Jan 10, 2025)](https://www.renewableenergyworld.com/news/data-centers-are-flocking-to-ohio-here-comes-the-transmission-to-support-them/)). AEP's Ohio 765 kV Piketon project is cited as a further $10 billion ([Utility Dive, AEP eyes exit from PJM, SPP (May 6, 2026)](https://www.utilitydive.com/news/aep-pjm-spp-data-centers-earnings/819419/)).
- **PJM**: peak load growth of 32 GW from 2024 to 2030, 30 GW of it data centers; Columbus residential bills were set to rise about $27 a month ([DCD, PJM reports peak load growth of 30GW through 2030 from data centers (Aug 12, 2025)](https://www.datacenterdynamics.com/en/news/pjm-reports-peak-load-growth-of-30gw-through-2030-from-data-center-sector/)). AEP had 63 GW of contracted large load by 2030 and a 190 GW queue as of May 2026, and is evaluating leaving PJM over slow interconnection ([Utility Dive, AEP eyes exit from PJM, SPP (May 6, 2026)](https://www.utilitydive.com/news/aep-pjm-spp-data-centers-earnings/819419/)).
- **Wait times**: average grid-connection wait in primary data center markets exceeds four years ([JLL, 2026 Global Data Center Outlook (Jan 5, 2026)](https://www.jll.com/en-us/insights/market-outlook/data-center-outlook)). The campus timeline in [[Mega Campus Cost Model (Oct 2026)]] assumes a 2027–2028 application and a 2031 energization for Phase 1.
- **What to ask AEP Ohio for**: a dual-fed distribution service at 13.2 kV or a dedicated 138 kV tap depending on the final peak, a large-load study, and whether CF-21 CHP can run in parallel under AEP's interconnection rules for customer generation.

## Assumptions

- White space 50% of data center gross area; utilization 70–80%; PUE 1.20–1.54.
- Building load factor 0.45 for peak; no diversity credit between buildings; no electric-vehicle or android fleet charging load (see [[Clone Alpha Android Fleet]], [[Mega Campus Mobility and Logistics]]).
- Manufacturing 10–30 kWh/sq ft and vertical farm 50–100 kWh/sq ft are planning assumptions, not benchmarks.
- Solar 40% roof coverage; 30–60 acres ground-mount; ILR 1.34; CHP dispatch 50–80%.
- Kinetic paving (CF-24) and algae bio-energy (CF-25) are treated as research pilots with no capacity credit.

## Sources

- [Obel Infrastructure, Data Center Capacity Math: kW per Square Foot vs kW per Rack (Aug 27, 2026)](https://obelinf.com/blog/data-center-capacity-math-kw-per-square-foot-vs-kw-per-rack/)
- [DCD on Uptime Institute 2025 Global Data Center Survey (July 30, 2025)](https://www.datacenterdynamics.com/en/news/roughly-one-third-of-data-center-owners-and-operators-doing-ai-training-or-inference-uptime-institute/)
- [Schneider Electric blog, Data center power density: planning liquid-cooled AI data centers (July 28, 2026)](https://blog.se.com/datacenter/2026/07/28/data-center-power-density-planning-liquid-cooled-ai-data-centers-around-grid-and-power-constraints/)
- [Data Center Knowledge, AI Rack Density's Real Limits](https://www.datacenterknowledge.com/ai-data-centers/ai-rack-density-s-real-limits-power-cooling-failure-risk)
- [Turner & Townsend, Data Centre Construction Cost Index 2025](https://reports.turnerandtownsend.com/data-centre-construction-cost-index-2025/data-centre-cost-trends)
- [JLL, 2026 Global Data Center Outlook (Jan 5, 2026)](https://www.jll.com/en-us/insights/market-outlook/data-center-outlook)
- [iRecruit, Data Center Construction Cost per MW (2026)](https://www.irecruit.co/insights/data-center-construction-cost-per-mw-2026-benchmarks-owners)
- [Nona Technologies, Data Center Water Consumption Per Day, WUE and Peak Demand (EPRI figures)](https://www.nona-technologies.com/blog/data-center-water-consumption)
- [City of Columbus Department of Public Utilities, 2026 rate chart](https://columbus.gov/files/sharedassets/city/v/1/services/public-utilities/ratechart24.pdf)
- [Berkeley Lab, 2024 United States Data Center Energy Usage Report (Dec 20, 2024)](https://bies.lbl.gov/news/berkeley-lab-report-evaluates-increase-electricity-demand-data-centers)
- [EIA CBECS 2018 Table C14, electricity consumption intensities](https://www.eia.gov/consumption/commercial/data/2018/ce/pdf/c14.pdf)
- [ENERGY STAR Portfolio Manager, U.S. Energy Use Intensity by Property Type (Aug 2024)](https://portfoliomanager.energystar.gov/pdf/reference/US%20National%20Median%20Table.pdf)
- [Boston Green Ribbon Commission, Lab Energy Benchmarking Study (May 2017)](https://www.greenribboncommission.org/wp-content/uploads/2017/05/GRC-Lab-Benchmarking-Final-Report-May-2017_REV.pdf)
- [OhEnergyRatings, Ohio commercial electricity rates jumped nearly 28% in two years](https://www.ohenergyratings.com/resources/ohio-commercial-electricity-rates-rise-28-percent)
- [NuWatt Energy, Commercial Solar Cost 2026 (Aug 31, 2026)](https://nuwattenergy.com/en/commercial-solar/cost-guide)
- [NREL land-use figures via Renewable Energy World](https://www.renewableenergyworld.com/solar/calculating-solar-energys-land-use-footprint/)
- [NREL ATB 2024, Utility-Scale PV](https://atb.nrel.gov/electricity/2024/utility-scale_pv)
- [Wikipedia, Solar power in Ohio (as of March 2026)](https://en.wikipedia.org/wiki/Solar_power_in_Ohio)
- [American Public Power Association, Ohio Siting Board authorizes Oak Run (Mar 2024)](https://www.publicpower.org/periodical/article/ohio-siting-board-authorizes-construction-800-mw-solar-project-300-mw-storage-facility)
- [Ohio Power Siting Board news release (Oct 20, 2022)](https://opsb.ohio.gov/news/opsb-approves-new-energy-facilities-in-franklin-and-licking-counties-denies-solar-project-in-allen-auglaize-counties)
- [UnderstandingCHP.com, Understanding CHP and the Cost of Installation (2018, rev. 2021)](https://understandingchp.com/blog/understanding-chp-and-the-cost-of-installation/)
- [NREL, Cost Projections for Utility-Scale Battery Storage: 2025 Update](https://docs.nrel.gov/docs/fy25osti/93281.pdf)
- [POWER Magazine, Regulator Approves AEP Ohio's Landmark Data Center Tariff (July 2025)](https://www.powermag.com/regulator-approves-aep-ohios-landmark-data-center-tariff/)
- [Data Center Frontier, Ohio Sets New Precedent: AEP's Power Rules (July 23, 2025)](https://www.datacenterfrontier.com/energy/article/55304787/ohio-sets-new-precedent-aeps-power-rules-shift-data-center-cost-burden)
- [Renewable Energy World, Data centers are flocking to Ohio; here comes the transmission (Jan 10, 2025)](https://www.renewableenergyworld.com/news/data-centers-are-flocking-to-ohio-here-comes-the-transmission-to-support-them/)
- [Utility Dive, AEP eyes exit from PJM, SPP (May 6, 2026)](https://www.utilitydive.com/news/aep-pjm-spp-data-centers-earnings/819419/)
- [DCD, PJM reports peak load growth of 30GW through 2030 from data centers (Aug 12, 2025)](https://www.datacenterdynamics.com/en/news/pjm-reports-peak-load-growth-of-30gw-through-2030-from-data-center-sector/)

## Related

- [[Collective AI Mega Campus]]
- [[Mega Campus Power and Data Center Infrastructure]] (register-level description)
- [[Mega Campus Cost Model (Oct 2026)]]
- [[Mega Campus Comparables]]
- [[EnerGenius + Helios Central Utility Plant]]
- [[Aether Link Campus Mesh]]
