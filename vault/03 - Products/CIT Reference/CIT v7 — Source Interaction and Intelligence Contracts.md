---
title: CIT v7 — Source Interaction and Intelligence Contracts
tags:
- source-specification
- historical-plan
type: reference-spec
owner: JR Moyler (Hataalii)
status: source-planned
updated: 2026-10-06
source_refs:
- id: 1a8JbR0asCwA2XVZSHOzsWycRJIM1uzjL
  url: https://drive.google.com/file/d/1a8JbR0asCwA2XVZSHOzsWycRJIM1uzjL/view?usp=drivesdk
  title: CIT_v7_User_Guide.pdf
---
# CIT v7 — Source Interaction and Intelligence Contracts

> [!warning] Versioned product reference
> This is the source user-guide design, not a current live-feature or financial-performance guarantee. Signal colors, Kelly sizing and model scores are source heuristics; they do not establish profitable trades. API keys and wallet authorization require private configuration and user approval. v5 and v7 are retained separately because their domain/source inventories differ.

## Technical interaction sections
```text
3. THE UNIVERSAL COLOR SYSTEM
LEARN THIS ONCE. READ EVERYTHING INSTANTLY.
Every number, badge, bar, chip, gauge, and indicator in the entire terminal follows one rule:
COLOR MEANING ON SCREEN ACTION
GREEN #00FFB2 Healthy · Safe · Positive Score bars, YES verdict, Kelly
ENTER
Proceed at full size
AMBER #FFB800 Elevated · Caution CAUTION verdict, VPIN warning,
MED conf
Half size, A+ setups
only
RED #FF3B5C Danger · Risk-off NO verdict, flash crash, AVOID
signal
Do not trade, step
away
GOLD #D4A017 Key metrics · Labels
Score labels, section headers,
GOLD Primary information
INDIGO #4F46E5 AI deliberation · Phases
Phase headers, deliberation
engine
AI reasoning in
progress
VIOLET #A855F7
ZenFlow · OL
Penthouse
ZenFlow toggle, vault button dot
Advanced AI signal
data
BLUE #3B82F6 Portfolio · Congress Portfolio panel, political tab Market structure
dataCOLLECTIVE INTELLIGENCE TERMINAL v7.0 USER GUIDE · PAGE 6
Collective AI · Architecting a Humane Future · Hataalii (JR Moyler), CEO collective-intelligence-terminal-v7.html
```

```text
7. THE 3D BUILDING — 108 AGENTS
Three.js renders a live 3D building with 108 humanoid agents organized into a deliberation hierarchy that mirrors how
institutional prediction markets work. Agents animate based on actual deliberation verdicts — not random states.
FLOOR AGENT
S
COLOR ROLE
Floor 1 — Retail Pit 48 AMBER
Trend-followers, news-chasers, herd-prone. Animated by
retailBias from Phase 4 synthesis.
Floor 2 — Institutional 36 TEAL
3 factions (Alpha/Sigma/Delta) each 12 analysts.
Animated by instBehavior: FADE / CONFIRM / WAIT.
Floor 3 — OL Penthouse 24 VIOLET
6 named specialists + OL cohort. Highest signal.
Animated by olSignal: COMMIT_YES / COMMIT_NO.
■ The Six OL Specialist Personas
AGENT ROLE ANALYTICAL LENS
AXIOM Quantitative Macro Base rates, historical distributions, contrarian at extremes. Data-first,
skeptical of narratives.
SPECTR
E
Geopolitical Risk Bear-biased, assigns higher probability to tail events than
consensus. Pessimism is his edge.
VANTA Technology & Innovation
Bull-biased, sees disruption faster than expected. Underweights
incumbents, overweights rate of change.
ORACLE Historical Pattern
Neutral. Weight base rates and analogical reasoning heavily. 'This
has happened before.'
HERALD Behavioral Finance
Contrarian. Crowd psychology and sentiment extremes. Fades what
the market is screaming.
CIPHER Scientific Consensus Conservative. Demands reproducible evidence before raising
probability. Rarely commits HIGH confidence.COLLECTIVE INTELLIGENCE TERMINAL v7.0 USER GUIDE · PAGE 10
Collective AI · Architecting a Humane Future · Hataalii (JR Moyler), CEO collective-intelligence-terminal-v7.html
8. 19 DOMAIN TABS
Click any icon in the tab bar to switch domains. Each tab auto-populates with live data from its relevant sources.
TAB ICO
N
LIVE DATA SOURCES ASSET CORRELATIONS
POLYMARKET ■
Top 20 contracts by 24h volume, live
CLOB Cross-asset per contract domain
MARKETS ■
CoinGecko crypto, Alpha Vantage equities,
FRED macro, Finnhub
SPY, QQQ, BTC, GLD, TLT by
direction
SPORTS ■
ESPN NBA/NFL live scores, upcoming
games
DKNG, MGM, CHZ fan tokens
MEDICINE ■
ClinicalTrials.gov, arXiv medical, GDELT
health news
XLV, XBI, biotech
SCIENCE ■
arXiv physics/chemistry, NASA EONET,
SpaceX launches QQQ, XBI, SPCE by discovery
TECHNOLOG
Y
■
arXiv AI papers, GDELT tech, Reddit
r/technology QQQ, XLK, NVDA, MSFT, ETH
SOCIETY ■
ProPublica Congress, GDELT political,
Reddit r/politics SPY broad, GLD on instability
ENVIRONMEN
T
■
NWS alerts, EONET events, GBIF
biodiversity
ICLN, ENPH, XLE inverse
GEOLOGY ■ USGS earthquakes (M2.5+) in real-time FCX copper on seismic events
BIOLOGY ■ GBIF species observations, arXiv biology XBI on CRISPR/gene breakthroughs
ASTROPHYSI
CS ■ NASA NEO close approaches, JWST data LMT, SPCE on mission events
WORLD
NEWS ■
GDELT, GNews headlines, Reddit
worldnews, EONET, sanctions GLD crisis hedge, TLT flight
POLITICAL ■
■
ProPublica votes, Unusual Whales
congress, GDELT political SPY on clarity, GLD on riskCOLLECTIVE INTELLIGENCE TERMINAL v7.0 USER GUIDE · PAGE 11
Collective AI · Architecting a Humane Future · Hataalii (JR Moyler), CEO collective-intelligence-terminal-v7.html
```

```text
11. SIGNAL FUSION ENGINE
The persistent bar just above the ticker — 13 data sources → one directional score from -100 to +100.
# SIGNAL SOURCE BULLISH CONDITION WEIG
HT
1 Market Quality Hero Panel Score Score > 60 → positive
contribution
2.0×
2
UW Options
Flow
Unusual Whales BULLISH flow, call% > 55% 1.8×
3 CBOE P/C Ratio CBOE + Yahoo P/C > 1.2 = contrarian bullish
signal
1.5×
4 Fear & Greed alternative.me
< 25 Extreme Fear = contrarian
buy
1.2×
5 Breadth >200d Polygon + CBOE > 60% stocks above 200d MA 1.4×
6 VIX Level Yahoo Finance 15–22 ideal range 1.3×
7 SPY Trend Yahoo (1yr closes) SPY above 50d AND 200d 1.4×
8 SPY RSI Alpha Vantage
RSI 40–60 neutral, < 30
contrarian buy
1.0×
9 10Y Yield
FRED / Yahoo
TNX
< 4.0% = equity supportive 1.1×
1
0
DXY Dollar Yahoo DX-Y.NYB
< 100 = risk-on, emerging market
lift 1.0×
1
1
BTC 24h Change CoinGecko > 0% = risk appetite present 0.8×
1
2
Congress Trades Unusual Whales Buy/sell ratio from recent trades 0.7×
1
3
FOMC / CPI Flags Calendar + FRED Event within 72h = always
negative
1.0×COLLECTIVE INTELLIGENCE TERMINAL v7.0 USER GUIDE · PAGE 14
Collective AI · Architecting a Humane Future · Hataalii (JR Moyler), CEO collective-intelligence-terminal-v7.html
```

```text
13. MICROSTRUCTURE ENGINE (PMM)
FIVE INSTITUTIONAL QUANT MODELS — CLICK ■ MICROSTRUCTURE TO OPEN
MODEL QUESTION READ IT AS
Kyle's Lambda
Are informed traders (smart money)
active right now?
R² > 15% = informed flow. WIDEN
SPREADS warning = reduce size
immediately.
Hawkes Process Is order flow self-reinforcing?
Branching ratio > 0.8 = HOT MARKET. >
0.95 = EXPLOSIVE — one large order
cascades into others.
Almgren-Chriss How should a large order be split
across time?
Optimal slices and slippage for $10K
notional. Green curve = optimal. Red dashed
= naive TWAP.
Avellaneda-Stoikov Where should the market maker
quote?
Reservation Price = fair value adjusted for
inventory. Bid/Ask spread. Inventory Q > 3 =
warning.
VPIN + CLOB How toxic is the order flow? What is
the actual cost to trade?
VPIN > 0.5 = toxic. RT spread shows
Polymarket round-trip cost vs liquid equities
(typically 300×+).
MEASURED vs SYNTHETIC PROXY:
MEASURED (green ●) = model running on real Polymarket trade fills. Highest quality input.
SYNTHETIC PROXY (■) = Polymarket data unavailable. Estimated from SPY/VIX/breadth.
Still directionally useful but treat SYNTHETIC outputs as approximate, not precise.
```

```text
15. EXECUTION LAYER — POSITION SIZING
■ EXECUTION button (top right). Translates microstructure signals into a concrete position size.
Kelly Criterion: f* = (b·p – q) / b where b = odds received, p = AI probability, q = 1-p
Five multipliers then scale the raw Kelly fraction down from there:
VPIN Penalty (×0.3–1.0)
Toxic flow (VPIN > 0.5) reduces size up to 70%. Protects against being on the
wrong side of informed flow.
Kyle Penalty (×0.5–1.0)
Informed traders active (R² > 15%) = adverse selection risk. Size reduced
proportionally.
Spread Penalty (×0.4–1.0)
Wide A-S spread = high adverse selection cost. Market maker is quoting
defensively.
Hawkes Penalty (×0.75/1.0)
HOT MARKET (branching > 0.8) = 25% size reduction. Slippage risk in
reactive flow.
Confidence Multiplier
HIGH = full Kelly. MEDIUM = 70%. LOW = 50%. Never full Kelly on
low-confidence deliberations.
```

```text
18. WALLET CONNECTION + TRADE EXECUTION
■ CONNECT WALLET BUTTON IN THE TOP BAR
WALLET / PLATFORM WHAT IT ENABLES SETUP
MetaMask (EVM) Polymarket CLOB orders signed directly via
EIP-712. Real USDC on Polygon.
metamask.io · switch to
Polygon · load USDC
Phantom (Solana) Solana wallet connection. View-only for
Polymarket (which runs on Polygon/EVM). phantom.app · connect once
Manual Address View-only mode. See balance, no execution. Paste address at prompt
Alpaca Paper
Stocks/ETFs/crypto at paper prices against
live market. No deposit required.
alpaca.markets · free paper
account · add keys in ■
MARKET
Trade confirmation modal — always fires before any execution:
Shows: exchange, instrument, side, size, limit price, Kelly fraction, agent source, AI probability.
PAPER TRADING: amber warning banner — no real money, Alpaca paper account.
REAL FUNDS (Polymarket): red warning with USDC balance check before allowing confirmation.
Wallet not connected: confirm button disabled. Must connect first.
```

```text
19. AGENT TRADE SUGGESTIONS
After every deliberation, three agent trade cards appear (bottom right, auto-dismiss in 30s). Each agent proposes a concrete
trade based on their analytical lens. Click ■ EXECUTE to open the confirmation modal. Click DISMISS to ignore.
AXIOM — Quantitative
Highest-EV Polymarket entry based on Kelly + microstructure. Only fires when
|edge| > 8¢ and Kelly > 1%.
SPECTRE —
Risk/Correlated
Top correlated equity play via Alpaca paper. Derived from cross-asset correlation
map for the simulation domain.
HERALD — Crowd
Sentiment
Fires when Reddit WSB posts mention the simulation scenario. Crowd momentum
entry on Polymarket.
```

```text
21. ZENFLOW AGENT ENSEMBLE
■ ZENFLOW: OFF/ON toggle in the top bar. Adds 12 sub-agents to deliberation between Phase 3 and Phase 4.
→ 6 Retail archetypes: Alpha (momentum), Beta (news-chaser), Gamma (contrarian), Delta (domain expert), Epsilon (naive
bettor), Zeta (risk-off)
→ 6 Institutional archetypes: Quant, Macro, Event-Driven, Risk Manager, Alpha Seeker, Fade Specialist
→ Results feed into Phase 4 synthesis as weighted ensemble: Retail avg (35%) + Institutional avg (65%)
→ Cost: 12 extra Claude API calls per simulation (~$0.04–0.08). Leave OFF for routine scanning.
```

```text
23. SESSION VAULT
■ VAULT button (top bar). Every simulation auto-saves to localStorage (500 record cap, persistent across sessions).
HISTORY
All simulations in reverse order. Searchable. Expand any record for full detail. Mark outcomes
with YES RESOLVED / NO RESOLVED.
CALIBRATIO
N
Calibration curve (predicted vs actual resolution rate), Brier score by domain, probability
histogram. Needs 5+ resolved records.
PERSONAS
OL specialist accuracy rates. Which agent's verdict most often matched the final collective
outcome.
```

```text
24. RESOLUTION MONITOR + CALIBRATION FEEDBACK
LOOP
THE ONE THAT CHANGES EVERYTHING — STARTS AUTOMATICALLY ON BOOT
Polls Polymarket every 5 minutes. Matches resolved contracts against vault records using exact token ID matching and
fuzzy text similarity (Levenshtein). Auto-marks outcomes, computes Brier scores, and injects calibration corrections directly
into Phase 4 synthesis after 5+ resolved records.COLLECTIVE INTELLIGENCE TERMINAL v7.0 USER GUIDE · PAGE 23
Collective AI · Architecting a Humane Future · Hataalii (JR Moyler), CEO collective-intelligence-terminal-v7.html
What gets corrected automatically:
Systematic bullish/bearish bias: 'System is 8% too bullish — adjust DOWN by ~6%'
Overconfidence: 'Predictions are 12% too confident — widen toward 50%'
Specialist accuracy: low-accuracy agents flagged, their verdicts discounted in synthesis.
Calibration dot on VAULT button: green = Brier < 0.15 (excellent) · amber = 0.15–0.25 · red = above 0.25
```

```text
25. BACKTEST MODE
■ BACKTEST button (bottom left of screen). Runs full 4-phase deliberation on already-resolved Polymarket contracts.
→ Select contract count (5/10/20/30) and domain filter, then click ■ RUN HISTORICAL SIM
→ Each contract runs the full deliberation: Phase 1 web search → Phase 2 specialists → Phase 3 factions → Phase 4 synthesis
→ Scores each result: predicted direction vs actual outcome, probability delta vs market, Brier score
→ Calibration curve plots predicted probabilities against actual resolution rates across the runCOLLECTIVE INTELLIGENCE TERMINAL v7.0 USER GUIDE · PAGE 24
Collective AI · Architecting a Humane Future · Hataalii (JR Moyler), CEO collective-intelligence-terminal-v7.html
```

```text
26. API KEYS SETUP
CLICK ■ MARKET IN THE TOP BAR TO ENTER KEYS. ALL SAVED TO LOCALSTORAGE — ONE-TIME SETUP.
KEY FREE TIER WHAT IT UNLOCKS WHERE TO GET IT
Alpha Vantage
25
req/day
Server-verified SPY RSI + SMAs
(upgrades breadth quality) alphavantage.co/support
Polygon.io Starter Real NYSE breadth — % stocks above
each MA from full exchange polygon.io — Starter plan
FRED Free
Fed Funds rate, CPI, 10Y yield, DGS
series for macro scoring fred.stlouisfed.org/docs/api
Finnhub Free
AAPL, MSFT, NVDA live prices in
deliberation context
finnhub.io
NASA 1000/hr NEO asteroid database for astrophysics
domain
api.nasa.gov — demo key
works
Unusual Whales Free tier
Full institutional options flow + dark pool
prints
unusualwhales.com
GNews 100/day Full headline feeds: political,
entertainment, world, crime
gnews.io
Alpaca Paper Free
Stock/ETF/crypto paper trading — no
deposit required
alpaca.markets — paper
account
Yahoo Finance None
needed
SPY/QQQ/VIX/sectors/DXY/TNX —
always active via allOrigins
Automatic — no setup
needed
Polymarket
CLOB
None
needed
Live order book, fills, MEASURED
microstructure
Automatic — no setup
needed
CoinGecko None
needed
10 crypto prices with 24h change and
market cap
Automatic — no setup
needed
GDELT
None
needed
Global event intelligence — conflict,
political, crime, culture
Automatic — no setup
needed
Reddit None
needed
5 subreddit hot feeds for crowd sentiment Automatic — no setup
neededCOLLECTIVE INTELLIGENCE TERMINAL v7.0 USER GUIDE · PAGE 25
Collective AI · Architecting a Humane Future · Hataalii (JR Moyler), CEO collective-intelligence-terminal-v7.html
```

```text
28. DAILY PRE-SESSION CHECKLIST
RUN THIS EVERY MORNING BEFORE MARKET OPEN
STE
P
ACTION
1 Open the HTML file in Chrome or Firefox
2 Wait for ● LIVE to appear and all 31 loading steps to complete
3 Read the Hero Panel verdict word — YES / CAUTION / NO
4 Check the Market Quality Score percentage and REGIME badge
5 Scan the Alert Banner — FOMC or CPI event today?
6 Read the five score bars — which category is the weak link?
7 Check the Signal Fusion bar — score and direction with top 5 signals
8 Scan the Sector Heatmap — which ETFs are leading today?
9 Check World News tab for any major events affecting your positions
10 Review Unusual Whales panel — flow bias and P/C ratio
11 Open ■ EXECUTION — check VPIN and Kyle informed-flow signal
12 Open ■ PORTFOLIO — scan top contracts for toxic flow
13 Check VAULT calibration dot — green/amber/red shows system health
14 If YES → run simulation on highest-conviction scenario, add to PARLAY if edge > 5%
15 If CAUTION → half size only, A+ setups only, skip anything marginal
16 If NO → close the terminal. Do not trade. Come back tomorrow.COLLECTIVE INTELLIGENCE TERMINAL v7.0 USER GUIDE · PAGE 26
Collective AI · Architecting a Humane Future · Hataalii (JR Moyler), CEO collective-intelligence-terminal-v7.html
COLLECTIVE AI · ARCHITECTING A HUMANE FUTURE
Collective Intelligence Terminal v7.0 · 19 Domains · 108 Agents · 31 Live Sources
```

## Ownership
- [[Collective Intelligence Terminal]]
- [[Quantum Ledger Division]]
- [[ZenFlow Division]]
- [[003 — Products MOC]]

## Source
- [CIT_v7_User_Guide.pdf](https://drive.google.com/file/d/1a8JbR0asCwA2XVZSHOzsWycRJIM1uzjL/view?usp=drivesdk) — version 7 — selected interaction, source, ensemble and calibration sections. Reviewed 2026-10-06.

### Source records
- [CIT_v7_User_Guide.pdf](https://drive.google.com/file/d/1a8JbR0asCwA2XVZSHOzsWycRJIM1uzjL/view?usp=drivesdk)

<!-- drive-expansion:714516ad6b172db0968a -->
