---
title: CIT v5 — Source Interaction and Intelligence Contracts
tags:
- source-specification
- historical-plan
type: reference-spec
owner: JR Moyler (Hataalii)
status: source-planned
updated: 2026-10-06
source_refs:
- id: 1S4XNL33N3nTnw70al1eVz3iJaWTlZ2O3
  url: https://drive.google.com/file/d/1S4XNL33N3nTnw70al1eVz3iJaWTlZ2O3/view?usp=drivesdk
  title: Collective Intelligence Terminal User Guide.pdf
---
# CIT v5 — Source Interaction and Intelligence Contracts

> [!warning] Versioned product reference
> This is the source user-guide design, not a current live-feature or financial-performance guarantee. Signal colors, Kelly sizing and model scores are source heuristics; they do not establish profitable trades. API keys and wallet authorization require private configuration and user approval. v5 and v7 are retained separately because their domain/source inventories differ.

## Technical interaction sections
```text
3. THE COLOR AND SIGNAL SYSTEM
Every number, bar, badge, and indicator follows one rule. Learn this and you can read the entire
terminal at a glance.
COLOR MEANING WHAT TO DO
GREEN #00FFB2 Healthy / Safe / Positive signal Proceed with confidence
AMBER #FFB800 Caution / Elevated risk Slow down, reduce size
RED #FF3B5C Danger / Risk-off / Active threat Stand aside entirely
GOLD #F5C842 Collective AI brand / Key metrics Primary information label
VIOLET #A855F7
OL Penthouse agents / ZenFlow /
Vault
Advanced / AI system data
BLUE #3B82F6
Portfolio / Execution /
Institutional
Market structure data
THE UNIVERSAL RULE:
Green = go. Amber = slow down. Red = stop.
This applies to every score, badge, gauge, bar, and indicator
across all 15+ panels. Master this and everything else follows.COLLECTIVE INTELLIGENCE TERMINAL v5.0 USER GUIDE · COLLECTIVE AI
COLLECTIVE AI · ARCHITECTING A HUMANE FUTURE PAGE 6
```

```text
5. THE 3D BUILDING — 108 AGENTS EXPLAINED
The centerpiece of the terminal is a three-floor 3D building rendered in real time using Three.js. It
contains 108 humanoid AI agents organized into a deliberation hierarchy that mirrors how institutional
prediction markets actually work.
FLOOR ZONE AGENTS COLOR ROLE
Floor
1
Retail Pit 48 AMBER
Retail traders — trend-followers,
sentiment-driven, herd-prone
Floor
2
Institutional
Floor
36 TEAL
3 factions: Alpha (momentum), Sigma
(contrarian), Delta (hedge)
Floor
3
OL Penthouse 24 VIOLET
6 named specialists + broader OL cohort —
highest signal agents
The 6 OL Specialist Personas
AGENT ROLE ANALYTICAL LENSCOLLECTIVE INTELLIGENCE TERMINAL v5.0 USER GUIDE · COLLECTIVE AI
COLLECTIVE AI · ARCHITECTING A HUMANE FUTURE PAGE 7
AXIOM
Quantitative Macro
Strategist
Data-driven, contrarian at extremes, trusts
historical base rates
SPECTRE
Geopolitical Risk
Analyst
Bear-biased, assigns higher probability to tail
events than consensus
VANTA
Technology & Innovation
Forecaster
Bull-biased, sees disruption happening faster than
expected
ORACLE
Historical Pattern
Analyst
Neutral, weight base rates and analogical reasoning
heavily
HERALD
Behavioral Finance
Specialist
Contrarian, focuses on crowd psychology and
sentiment extremes
CIPHER
Scientific Consensus
Evaluator
Conservative, demands reproducible evidence before
raising probability
Agent states are visible as color and animation: BULLISH (amber glow, raised arms), BEARISH (teal,
hunched), COMMITTED (white, elevated, fast rotation), FADING (dim, slow), WAITING (violet, idle),
NEUTRAL (default). Watch Floor 3 first — OL agents animate based on their actual deliberation verdicts.COLLECTIVE INTELLIGENCE TERMINAL v5.0 USER GUIDE · COLLECTIVE AI
COLLECTIVE AI · ARCHITECTING A HUMANE FUTURE PAGE 8
```

```text
11. THE PREDICTION MARKET MICROSTRUCTURE ENGINE
Five professional-grade quant models — PMM panel (■ MICROSTRUCTURE button)
The PMM panel runs five mathematical models used by institutional market makers and quant hedge funds.
When Polymarket live order book data is available, every model runs on real fills (MEASURED badge).
Otherwise it falls back to market-data proxies (SYNTHETIC PROXY).
MODULE KEY QUESTION HOW TO READ IT
KYLE'S LAMBDA
Are informed traders
(smart money)
active?
R² above 15% = informed flow detected. MEASURED
badge = calculated from real fills. WIDEN
SPREADS warning = reduce size.
HAWKES PROCESS
Is order flow
self-reinforcing?
Branching ratio α/β below 0.8 = calm. Above 0.8
= HOT MARKET. Above 0.95 = EXPLOSIVE FLOW — one
big order cascades.
ALMGREN-CHRISS
How should I split a
large trade?
Optimal slices count, slippage %, $10K loss
risk. Green curve on SVG = optimal path. Red
dashed = naive TWAP.
AVELLANEDA-STOIKO
V
Where should a
market maker quote?
Reservation Price = adjusted fair value. Bid/Ask
spreads. Inventory Q = position skew. Warning at
Q > 3.
VPIN + CLOB
How toxic is the
flow? What does it
cost to trade?
VPIN above 0.5 = toxic. RT spread shows
Polymarket round-trip cost vs equities.
Typically 300-400x more expensive.
MEASURED vs SYNTHETIC PROXY:
MEASURED (green dot) = model is running on real Polymarket trade fills.
This is the highest-quality input — numbers come from actual executed orders.
SYNTHETIC PROXY (dim circle) = Polymarket data unavailable.
Model is estimated from SPY, VIX, breadth, and sector data. Still directionally
useful but treat outputs as approximate rather than precise.COLLECTIVE INTELLIGENCE TERMINAL v5.0 USER GUIDE · COLLECTIVE AI
COLLECTIVE AI · ARCHITECTING A HUMANE FUTURE PAGE 13
```

```text
14. EXECUTION LAYER — POSITION SIZING
■ EXECUTION button — top right of screen
The Execution Layer translates microstructure signals into a concrete position sizing recommendation
using the Kelly Criterion formula. Not automated execution — a structured answer to 'how much should I
risk on this trade right now.'
The Kelly Criterion Formula
The raw Kelly fraction: f* = (b·p - q) / b
Where b = odds received, p = estimated true probability, q = 1 - p
Five microstructure multipliers are then applied sequentially:
MULTIPLIER WHAT IT DOES
VPIN Penalty
High toxic flow (VPIN > 0.5) reduces size by up to 70%. Protects
against being on the wrong side of informed flow.
Kyle Penalty
Informed traders detected (R² > 15%) reduces size proportionally.
Adverse selection risk.
Spread Penalty
Wide A-S spread = high adverse selection cost. Reduces size when the
market maker is quoting defensively.
Hawkes Penalty
HOT MARKET (branching > 0.8) applies a 25% size reduction. Slippage
risk in reactive flow.
Confidence
Multiplier
HIGH confidence = full Kelly. MEDIUM = 70%. LOW = 50%. Never bet full
Kelly on low-confidence deliberations.
READING THE OUTPUT:
ENTER (green) — edge exists after all penalties, size is viable. Enter at limit price.
CAUTION (amber) — marginal edge, Kelly fraction is tiny (<3%). Consider skipping.
AVOID (red) — negative EV, flash crash risk, or explosive Hawkes. Do not enter.
The limit order price is set at market price minus half the A-S spread,
improving expected fill quality vs market orders.COLLECTIVE INTELLIGENCE TERMINAL v5.0 USER GUIDE · COLLECTIVE AI
COLLECTIVE AI · ARCHITECTING A HUMANE FUTURE PAGE 16
```

```text
16. ZENFLOW AGENT ENSEMBLE
■ ZENFLOW toggle in top bar — OFF by default
ZenFlow turns the 108 cosmetic agents into real computational units. When enabled, 12 sub-agents run
lightweight Claude API calls between Phase 3 and Phase 4 of deliberation, contributing domain-weighted
signals to the final synthesis.
■ 6 Retail archetypes: Alpha (momentum), Beta (news-chaser), Gamma (contrarian), Delta (domain
expert), Epsilon (naive bettor), Zeta (risk-off conservative)
■ 6 Institutional archetypes: Quant, Macro Strategist, Event-Driven Specialist, Risk Manager, Alpha
Seeker, Fade Specialist
■ Results feed into Phase 4 synthesis as a weighted ensemble: Retail avg + Institutional avg →
visible in analysis drawer
WHEN TO ENABLE ZENFLOW:
ZenFlow adds 12 extra Claude API calls per simulation (~$0.04-0.08 per deliberation).
Enable it for high-stakes decisions where you want maximum signal depth.
Leave it OFF for routine scanning — the 6 OL specialists already provide strong signal.
The toggle persists until you turn it off.COLLECTIVE INTELLIGENCE TERMINAL v5.0 USER GUIDE · COLLECTIVE AI
COLLECTIVE AI · ARCHITECTING A HUMANE FUTURE PAGE 17
```

```text
17. THE SESSION VAULT
■ VAULT button — top bar, center
Every simulation result is automatically saved to your browser's localStorage. The vault stores the
full deliberation record — verdict, probability, all 6 specialist verdicts, faction stances, summary,
key edge, risk factors, market price, and timestamp. Up to 500 records persist across browser sessions.
TAB WHAT IT SHOWS
HISTORY
Every simulation in reverse chronological order. Searchable by event text,
domain, confidence. Click any row to expand full detail. Mark outcomes when
contracts resolve.
CALIBRATION
Calibration curve (predicted vs actual resolution rate), Brier score by
domain, probability distribution histogram. Requires at least 5 resolved
records.
PERSONAS
Specialist accuracy rates — how often each OL agent's verdict matched the
actual outcome. Herd frequency by domain. Requires resolved records.
■ ■ CSV exports your entire vault as a spreadsheet for external analysis
■ ■ CALIBRATE button (also in top bar) opens directly to the Calibration tab
■ Marking outcomes: expand any vault record → click YES RESOLVED or NO RESOLVED → Brier score
computes automatically
■ Content saved via Nexus Labs attaches to the vault record permanently
```

```text
18. RESOLUTION MONITOR + CALIBRATION FEEDBACK LOOP
The one that changes everything — starts automatically on boot
The Resolution Monitor runs silently in the background from the moment the terminal loads. Every 5
minutes it polls Polymarket for recently resolved contracts, matches them against your vault records
using exact token ID matching and fuzzy text similarity, and automatically marks outcomes — no manual
intervention needed.
Once 5+ records are auto-resolved, the calibration engine activates:
■ Brier Score — (predicted_prob - outcome)² per prediction. 0.0 = perfect. 0.25 = random. Lower is
better.
■ Systematic Bias — are you consistently too bullish or bearish? If |bias| > 5%, a correction signal
fires.
■ Overconfidence — are your 70% calls actually resolving at 70%? Overconfidence > 8% widens your
estimates toward 50%.
■ Specialist Accuracy — which OL agents are actually right vs wrong over your history.COLLECTIVE INTELLIGENCE TERMINAL v5.0 USER GUIDE · COLLECTIVE AI
COLLECTIVE AI · ARCHITECTING A HUMANE FUTURE PAGE 18
THE FEEDBACK LOOP — THIS IS WHAT MAKES THE SYSTEM IMPROVE:
Calibration corrections inject directly into Phase 4 synthesis:
'BIAS WARNING: System is 8% too bullish across 23 resolved predictions.
Adjust probability DOWN by ~6%.'
The terminal literally gets smarter every time a contract resolves.
After 20-30 resolved records, the synthesis prompt is being actively
corrected for your specific historical biases.
The colored dot on the VAULT button shows calibration health at a glance: green = Brier < 0.15
(excellent), amber = 0.15-0.25 (good), red = above 0.25 (needs calibration work).COLLECTIVE INTELLIGENCE TERMINAL v5.0 USER GUIDE · COLLECTIVE AI
COLLECTIVE AI · ARCHITECTING A HUMANE FUTURE PAGE 19
```

```text
19. BACKTEST MODE
■ BACKTEST button — bottom left of screen
Backtest mode fetches already-resolved Polymarket contracts, runs each through the full 4-phase
deliberation engine, and scores the results against actual outcomes. Select number of contracts (5, 10,
20, 30) and a domain filter, then click ■ RUN HISTORICAL SIM.
■ Results show for each contract: predicted direction, market price at time, actual outcome,
probability delta, Brier score, confidence
■ Summary strip shows: accuracy %, average Brier score, average delta vs market, high-confidence
accuracy
■ Calibration curve plots your predicted probabilities against actual resolution rates
■ Results are saved to localStorage alongside vault data — persistent across sessions
```

```text
21. API KEYS SETUP
Click ■ MARKET in the top bar
SOURCE
KEY
REQUIRED
WHAT IT UPGRADES WHERE TO GET IT
Yahoo
Finance
None
Prices, VIX, sectors, TNX, DXY.
Always active.
Automatic
Alpha
Vantage
Free
Server-verified RSI + moving
averages. 25 req/day.
alphavantage.co/s
upport
Polygon.io Free
Real NYSE breadth data replacing
estimates.
polygon.io —
Starter planCOLLECTIVE INTELLIGENCE TERMINAL v5.0 USER GUIDE · COLLECTIVE AI
COLLECTIVE AI · ARCHITECTING A HUMANE FUTURE PAGE 20
Polymarket
CLOB
None
Live order book, fills, MEASURED
microstructure.
Automatic
FRED Free
Fed rate, CPI, 10-year yield for
deliberation context.
fred.stlouisfed.o
rg
Finnhub Free
AAPL, MSFT, NVDA live prices for
deliberation context.
finnhub.io
Keys are saved to localStorage automatically. You only enter them once. The SRC indicator in the bottom
bar shows which sources are currently live vs degraded.COLLECTIVE INTELLIGENCE TERMINAL v5.0 USER GUIDE · COLLECTIVE AI
COLLECTIVE AI · ARCHITECTING A HUMANE FUTURE PAGE 21
```

## Ownership
- [[Collective Intelligence Terminal]]
- [[Quantum Ledger Division]]
- [[ZenFlow Division]]
- [[003 — Products MOC]]

## Source
- [Collective Intelligence Terminal User Guide.pdf](https://drive.google.com/file/d/1S4XNL33N3nTnw70al1eVz3iJaWTlZ2O3/view?usp=drivesdk) — version 5 — selected interaction, source, ensemble and calibration sections. Reviewed 2026-10-06.

### Source records
- [Collective Intelligence Terminal User Guide.pdf](https://drive.google.com/file/d/1S4XNL33N3nTnw70al1eVz3iJaWTlZ2O3/view?usp=drivesdk)

<!-- drive-expansion:1f6fb82b628d2266236d -->
