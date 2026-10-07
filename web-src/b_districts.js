// Knowledge districts describe the existing folder structure, not the six physical campus districts.
const Districts = (() => {
  const rows = [
    ['00 - MOCs','Atlas','Find the company map and follow the source notes.','navigation',['Read a hub','Follow a linked source','Check unresolved questions']],
    ['01 - Divisions','Division council','Read division charters and operating boundaries.','council',['Read the charter','Check operating status','Find the director']],
    ['02 - ZenFlow','Agent foundry','Work from current agent routing and orchestration notes.','foundry',['Check model routing','Read an agent protocol','Inspect an open task']],
    ['03 - Products','Product workshop','Trace products from specification to delivery.','workshop',['Read a specification','Check dependencies','Find the next delivery task']],
    ['04 - People','Team commons','Find people, responsibilities and collaboration context.','commons',['Read a profile','Check responsibilities','Find the relevant team note']],
    ['05 - Operations','Control room','Use procedures and task records to run the company.','control',['Read a procedure','Review open work','Connect your work tool']],
    ['06 - Finance','Finance chamber','Review financial records and distinguish targets from actuals.','chamber',['Read a financial source','Check assumptions and date','Inspect a finance task']],
    ['07 - Brand','Brand atelier','Use the voice, visual standards and approved brand records.','atelier',['Read a brand standard','Check source assets','Review a brand task']],
    ['08 - Research','Research observatory','Find evidence, research questions and dated findings.','observatory',['Read a research note','Follow its sources','Check what remains unknown']],
    ['09 - Projects','Delivery yard','Find project state, blockers and next actions.','yard',['Read a project record','Review linked tasks','Connect your delivery tool']],
    ['10 - Archive','Archive stacks','Consult historical records while preserving superseded context.','stacks',['Read the archive record','Check superseded notices','Follow the replacement source']],
    ['11 - Physical AI','Physical systems lab','Explore robotics, hardware and physical system records.','lab',['Read a system record','Check validation evidence','Inspect a hardware task']],
    ['Daily','Daily log','Read dated work records and maintain continuity.','log',['Read the latest entry','Check recent changes','Review today’s work']]
  ];
  const storage = Object.freeze(rows.map(([folder,title,purpose,theme,kit],index)=>Object.freeze({id:index,folder,title,purpose,theme,kit:Object.freeze(kit)})));
  let extensions=[];
  const all=()=>[...storage,...extensions];
  function define(definitions) {
    const previous=new Map(extensions.map(d=>[d.id,d]));
    const used=new Set(storage.map(d=>d.folder));
    extensions=definitions.filter(d=>d&&typeof d.id==='string'&&typeof d.title==='string'&&!used.has(d.id)&&(used.add(d.id),true)).map(d=>Object.freeze({...previous.get(d.id),...d,folder:d.id,virtual:true,kit:Object.freeze(d.kit||['Read the source record','Review linked work','Check current evidence'])}));
  }
  function matches(d,n) {return (d.noteNames||[]).includes(n.name)||(d.folders||[]).some(f=>n.folder===f||(n.folder||'').startsWith(f+'/'))}
  function worldTop(note) {
    const candidates=extensions.filter(d=>matches(d,note)).sort((a,b)=>Number((b.noteNames||[]).includes(note.name))-Number((a.noteNames||[]).includes(note.name))||(b.priority||0)-(a.priority||0)||a.id.localeCompare(b.id));
    return candidates[0]?.id||top(note);
  }
  const placementSignature=notes=>JSON.stringify(notes.map(n=>[n.name,worldTop(n)]).sort((a,b)=>a[0].localeCompare(b[0])));
  const top = note => (note.folder || '').split('/')[0];
  function notesFor(folder,notes,query='') {
    const q=query.trim().toLowerCase();
    const district=all().find(d=>d.folder===folder);
    return notes.filter(n=>(district?.virtual?matches(district,n):top(n)===folder) && (!q || [n.name,n.body||'',...(n.fm?.tags||[])].join(' ').toLowerCase().includes(q)))
      .sort((a,b)=>a.name.localeCompare(b.name,undefined,{numeric:true}));
  }
  function tasksFor(folder,notes,tasks) {
    const names=new Set(notesFor(folder,notes).map(n=>n.name));
    return tasks.filter(t=>t.status!=='done' && names.has(t.note)).sort((a,b)=>({high:0,medium:1,low:2}[a.priority]??3)-({high:0,medium:1,low:2}[b.priority]??3));
  }
  function completedWork(folder,notes,tasks) {
    const names=new Set(notesFor(folder,notes).map(n=>n.name));
    return tasks.filter(t=>t.status==='done' && t.done_at && String(t.result||'').trim() && names.has(t.note));
  }
  function landmarks(folder,notes) {
    return notesFor(folder,notes).sort((a,b)=>Number(b.fm?.type==='moc')-Number(a.fm?.type==='moc') || ((b.out?.size||0)+(b.back?.size||0))-((a.out?.size||0)+(a.back?.size||0))).slice(0,6);
  }
  const category = n => (n.folder||'').split('/').slice(1).join('/') || 'District root';
  function directory(folder,notes) {
    const ns=notesFor(folder,notes);const counts=field=>{
      const found=new Map();ns.forEach(n=>{const values=field(n);values.forEach(v=>found.set(v,(found.get(v)||0)+1))});
      return [...found].sort((a,b)=>b[1]-a[1]||a[0].localeCompare(b[0])).map(([value,count])=>({value,count}));
    };
    return {total:ns.length,categories:counts(n=>[category(n)]),types:counts(n=>[String(n.fm?.type||'untyped')]),tags:counts(n=>[...new Set(n.fm?.tags||[])]),statuses:counts(n=>[String(n.fm?.status||'unspecified')])};
  }
  function browse(folder,notes,filters={}) {
    return notesFor(folder,notes,filters.query||'').filter(n=>(!filters.category||category(n)===filters.category)&&(!filters.type||String(n.fm?.type||'untyped')===filters.type)&&(!filters.status||String(n.fm?.status||'unspecified')===filters.status)&&(!filters.tag||(n.fm?.tags||[]).includes(filters.tag)));
  }
  function sources(note) {
    const values=[];const add=(value,label)=>{
      if(typeof value!=='string')return;try{const url=new URL(value);if(!['https:','http:'].includes(url.protocol)||url.username||url.password)return;if(!values.some(v=>v.url===url.href))values.push({url:url.href,label:label||url.hostname})}catch{}
    };
    ['source_url','source_link','drive_url','document_url','url','source'].forEach(k=>add(note.fm?.[k],k.replace(/_/g,' ')));
    (Array.isArray(note.fm?.sources)?note.fm.sources:[]).forEach(v=>add(typeof v==='string'?v:v?.url,typeof v==='object'?v?.title:undefined));
    for(const m of (note.body||'').matchAll(/\[([^\]]+)\]\((https?:[^)\s]+)\)/g))add(m[2],m[1]);
    return values;
  }
  function recent(folder,notes) {return notesFor(folder,notes).filter(n=>Number.isFinite(Date.parse(n.updated_at))).sort((a,b)=>Date.parse(b.updated_at)-Date.parse(a.updated_at)).slice(0,5)}
  // Source-curated thematic membership. Original storage folders remain unchanged.
  define([
  {
    "id": "12 - Tools and Integrations",
    "title": "Tools and Integrations",
    "purpose": "Inspect tool contracts, MCP servers, API interfaces, and current connection evidence.",
    "noteNames": [
      "API Matrix",
      "API-01 ZenFlow Orchestration API",
      "API-02 Knowledge Keeper API",
      "API-03 CAI Product Catalog API",
      "API-04 Helios Grid Telemetry API",
      "API-05 Apex Performance API",
      "API-06 Quantum Alpha Trading API",
      "API-07 Civic Core Resource Matching API",
      "API-08 Bio-Digital Twin API",
      "API-09 Nomad Nexus Intelligence API",
      "API-10 Signal Velocity Growth API",
      "API-11 Juris Guard Compliance API",
      "API-12 Nexus Labs Content Intelligence API",
      "API-13 Gaia Field Sensor API",
      "API-14 VectorShift Route Optimization API",
      "API-15 Aether Link Translation API",
      "API-16 Hybrid Living Learning API",
      "API-17 Obsidian Arc Threat Intelligence API",
      "API-18 Cognara Behavioral Pattern API",
      "API-19 Binary Loom Infrastructure API",
      "API-20 Eon Core Longevity Intelligence API",
      "Binary Loom API Gateway",
      "Collective AI Tool Stack",
      "Collective Intelligence MCP Server",
      "Developer Tools Suite",
      "District Handbook — Tools and Integrations",
      "Established MCP Servers",
      "External Toolkit — 130 Tools",
      "G-COSA — ARC-R Coordination Layer Design Contract",
      "G-COSA — COSA Executive Kernel Design Contract",
      "G-COSA — Cognitive Frame and Control Policy Contracts",
      "G-COSA — Continuous Cognitive Loop",
      "G-COSA — Curvature Detection Engine Design Contract",
      "G-COSA — Execution Harness and Verification Loop",
      "G-COSA — Geodesic Planner Design Contract",
      "G-COSA — Geometric Regime Atlas Design Contract",
      "G-COSA — HGLAR Reasoning Framework Design Contract",
      "G-COSA — HRM Inference Substrate Design Contract",
      "G-COSA — MELD and ERC Affective-Social Sensing Design Contract",
      "G-COSA — Natural Gradient Optimizer Design Contract",
      "G-COSA — Nine-Layer Cognitive Architecture",
      "G-COSA — Physical Compute Matrix",
      "G-COSA — Reasoning Emotion and Coordination Subsystems",
      "G-COSA — Staged Implementation Order",
      "G-COSA — ZenFlow Gateway Transport",
      "Integration Fabric",
      "KG-01 Collective AI Master Entity Graph",
      "KG-02 ZenFlow Agent Decision Graph",
      "KG-03 The Collective Client Intelligence Graph",
      "KG-04 Quantum Ledger Asset Relationship Graph",
      "KG-05 Juris Guard AI Regulation Ontology",
      "KG-06 Kinetic Edge Athlete Performance Graph",
      "KG-07 Vital Helix Bio-Digital Twin Graph",
      "KG-08 Gaia Synthesis Environmental Knowledge Graph",
      "KG-09 Nomad Nexus Destination Intelligence Graph",
      "KG-10 Signal Velocity Content Performance Graph",
      "KG-11 Hybrid Learning Path Knowledge Graph",
      "KG-12 Obsidian Arc Threat Intelligence Graph",
      "KG-13 Aether Link Communication Network Graph",
      "KG-14 VectorShift Logistics Intelligence Graph",
      "KG-15 Terra Axis Property Intelligence Graph",
      "KG-16 Civic Core Community Resource Graph",
      "KG-17 Binary Loom Infrastructure Dependency Graph",
      "KG-18 Cognara Behavioral Psychographic Graph",
      "KG-19 Eon Core Longevity Biomarker Graph",
      "KG-20 Nexus Labs Content Narrative Graph",
      "Knowledge Graph Tools",
      "MCP Matrix",
      "MCP-01 ZenFlow Orchestration MCP",
      "MCP-02 Knowledge Keeper MCP",
      "MCP-03 Ace Knowledge Graph MCP",
      "MCP-04 Notion Operations MCP",
      "MCP-05 GitHub Intelligence MCP",
      "MCP-06 Quantum Intelligence MCP",
      "MCP-07 Athlete Performance MCP",
      "MCP-08 Content Intelligence MCP",
      "MCP-09 Civic Resource MCP",
      "MCP-10 Vital Health Intelligence MCP",
      "MCP-11 Growth Signal MCP",
      "MCP-12 Regulatory Intelligence MCP",
      "MCP-13 Gaia Field Intelligence MCP",
      "MCP-14 Infrastructure Ops MCP",
      "MCP-15 Nomad Mobility MCP",
      "MCP-16 Threat Intelligence MCP",
      "MCP-17 Behavioral Personalization MCP",
      "MCP-18 Longevity Intelligence MCP",
      "MCP-19 Atlas Learning MCP",
      "MCP-20 Connectivity Network MCP",
      "Tool Evaluation and Routing Contract",
      "ZenFlow — Agent Platform Deployment Strategy Source",
      "ZenFlow — Neural Hub Historical Integration Ledger"
    ],
    "folders": [],
    "priority": 100,
    "sourceUrls": [
      "https://drive.google.com/file/d/1vZ5AW8TV_92b74qz8pkQXW3Lity3M8d7/view",
      "https://drive.google.com/file/d/14CeOA7wd1msMmI8PPoastdsUOC-fr-LJ/view",
      "https://drive.google.com/file/d/1_TtjcnDjiMY9_jTV2PjWNoEwpW9Y5xmT/view"
    ],
    "sourceNotes": [
      "District Handbook — Tools and Integrations",
      "MCP Matrix",
      "Established MCP Servers",
      "Collective AI Tool Stack"
    ],
    "kit": [
      "Read a tool contract",
      "Check authorization and actual health",
      "Inspect an integration task"
    ],
    "theme": "integrations",
    "color": "#A3E635"
  },
  {
    "id": "13 - Learning and Curriculum",
    "title": "Learning and Curriculum",
    "purpose": "Work through curricula, learning products, studybooks, and assessed practice.",
    "noteNames": [
      "AI Fundamentals Course",
      "Artifact Review Rubric",
      "Atlas Platform",
      "Atlas_Onboarding",
      "Corporate AI Training Track",
      "Creator Track",
      "Creator Track Certification",
      "District Handbook — Learning and Curriculum",
      "Hybrid Living Division",
      "LLM Engineering Practice Path",
      "Learning Module — AI Agents and Workflow Automation",
      "Learning Module — AI Fundamentals and History",
      "Learning Module — APIs and Integration Patterns",
      "Learning Module — Advanced AI Applications and Future Trends",
      "Learning Module — Building MVPs with AI",
      "Learning Module — Introduction to Machine Learning",
      "Learning Module — MCPs and Advanced Integration",
      "Learning Module — Mastering Prompt Engineering",
      "Learning Module — Retrieval-Augmented Generation Systems",
      "Learning Module — Understanding Large Language Models",
      "Learning Reference Editions",
      "Learning Science Integration System",
      "MVP — AI Fundamentals Course",
      "MVP — Learning Science Integration System",
      "MVP — P.E.T.E.E.R. Framework",
      "Operator Build Layers and Common Misreadings",
      "P.E.T.E.E.R.",
      "P.E.T.E.E.R. Framework",
      "P.E.T.E.E.R_Core",
      "Prompt Evaluation Record",
      "Stackable AI Certifications",
      "Team Learning Path and Competency Gates",
      "The Forge Learning Studio",
      "Workbook Artifact Record"
    ],
    "folders": [],
    "priority": 101,
    "sourceUrls": [
      "https://drive.google.com/file/d/1_lEwtlwI1FqW17nZVwIcGQSYc3iUlTPF/view",
      "https://drive.google.com/file/d/1fV0LoZvv1OuW67ApemIFwb9PLD9dGxKe/view",
      "https://drive.google.com/file/d/1xl5JPuvJh-0zmJ9CQxmOhYImEtBhIkL8/view"
    ],
    "sourceNotes": [
      "District Handbook — Learning and Curriculum",
      "P.E.T.E.E.R. Framework",
      "Atlas Platform",
      "Hybrid Living Division"
    ],
    "kit": [
      "Read a curriculum",
      "Practice against an assessment",
      "Record evidence and feedback"
    ],
    "theme": "academy",
    "color": "#14B8A6"
  },
  {
    "id": "14 - Governance and Decisions",
    "title": "Governance and Decisions",
    "purpose": "Inspect current governance, legal holds, decisions, and superseded authority records.",
    "noteNames": [
      "AI Governance Framework Suite",
      "Aegis Protocol",
      "Aegis Protocol Spec",
      "Agent Tier Registry",
      "Campaign Evidence Register",
      "Civic Core Fiduciary Veto",
      "Contract Intelligence Platform",
      "Contract Lifecycle Management",
      "Contract Review Work Record",
      "ContractForge",
      "Decision Record Template",
      "Director Codenames",
      "District Handbook — Governance and Decisions",
      "Division Activation Scorecard",
      "Drive Source Reconciliation Ledger",
      "Ethical AI Framework",
      "Financial Forecast Assumption Register",
      "Foundry Hardware Build Governance Rules",
      "G-COSA — Symbiotic AI Governance Design Contract",
      "Helios Grid",
      "Juris Guard Division",
      "JurisIQ",
      "KG-02 ZenFlow Agent Decision Graph",
      "KG-05 Juris Guard AI Regulation Ontology",
      "MVP Governance Flags",
      "Operating Principles and Source Reconciliation",
      "RegPulse",
      "Role Assignment and Handoff Matrix",
      "Vault Note and Access Contracts"
    ],
    "folders": [],
    "priority": 102,
    "sourceUrls": [
      "https://drive.google.com/file/d/1JNX7pTq-WEUMmvsc3ZjGB0jltsic-0xa/view",
      "https://drive.google.com/file/d/19p-3NH3dVx6FNS1J32uVpUYp8xMCUSAc/view"
    ],
    "sourceNotes": [
      "District Handbook — Governance and Decisions",
      "Aegis Protocol Spec",
      "Civic Core Fiduciary Veto",
      "Division Activation Scorecard"
    ],
    "kit": [
      "Read the current gate",
      "Check decision authority",
      "Record rationale and evidence"
    ],
    "theme": "governance",
    "color": "#C9A84C"
  },
  {
    "id": "15 - Clients and Delivery",
    "title": "Clients and Delivery",
    "purpose": "Connect client readiness, onboarding, delivery, and dated billing evidence.",
    "noteNames": [
      "010 — Clients MOC",
      "AI Readiness Audit",
      "AI Readiness Audit Platform",
      "CRM Pipeline and Next-Action Protocol",
      "Client AI Readiness Interview",
      "Client Billing Ledger",
      "Client Intelligence Task Agent",
      "Client Kickoff Agenda and First-Week Record",
      "District Handbook — Clients and Delivery",
      "KG-03 The Collective Client Intelligence Graph",
      "MVP — AI Readiness Audit",
      "Project Brief Template",
      "Project Delivery Record Template",
      "SOP — Client Onboarding",
      "Talent Placement Interview",
      "The Collective Division",
      "Workflow Delivery Record Template"
    ],
    "folders": [],
    "priority": 103,
    "sourceUrls": [
      "https://docs.google.com/document/d/1Cmh7WGMGuh-uKbOTRstgv04hy4TGAJ1UfVvpHsWotfw/edit",
      "https://docs.google.com/document/d/1KmmhRprAIx292-6TxoEj-HxRUzXivH9LniP2X5fsqDg/edit"
    ],
    "sourceNotes": [
      "District Handbook — Clients and Delivery",
      "010 — Clients MOC",
      "SOP — Client Onboarding",
      "AI Readiness Audit"
    ],
    "kit": [
      "Read readiness evidence",
      "Inspect onboarding state",
      "Review delivery acceptance"
    ],
    "theme": "delivery",
    "color": "#FB923C"
  },
  {
    "id": "16 - Facilities and Infrastructure",
    "title": "Facilities and Infrastructure",
    "purpose": "Explore facility programs, infrastructure dependencies, and dated campus estimates.",
    "noteNames": [
      "Aether Link Campus Mesh",
      "Aether Link Mesh Operations Spire",
      "Civic Core Public Hub",
      "Clone Alpha Android Fleet",
      "Cognara Mind Behavioral Intelligence Institute",
      "Collective AI Mega Campus",
      "District Handbook — Facilities and Infrastructure",
      "Eden Spire",
      "Employee Commons and Wellness Village",
      "EnerGenius + Helios Central Utility Plant",
      "EnerGenius CHP Microgrid",
      "Eon Core Longevity Research Pavilion",
      "Gaia Synthesis Bio-Energy Center",
      "Glyph Forge Works",
      "Juris Guard Regulatory Command Wing",
      "Kinetic Edge Performance Center",
      "Kinetic Energy Operations Center (KEOC)",
      "Materials + Inventory Warehouse",
      "Mega Campus 3D Anatomy Map",
      "Mega Campus Comparables",
      "Mega Campus Cost Model (Oct 2026)",
      "Mega Campus Financial Model",
      "Mega Campus Investor and Regional Materials",
      "Mega Campus Mobility and Logistics",
      "Mega Campus Power and Data Center Infrastructure",
      "Mega Campus Power and Data Center Model (Oct 2026)",
      "Mega Campus Security and Governance Systems",
      "Mega Campus Version History",
      "Mega Campus Water and Landscape Systems",
      "Mega Campus — Brain and Governance District",
      "Mega Campus — Energy and Mesh District",
      "Mega Campus — Knowledge and Media District",
      "Mega Campus — Living Systems District",
      "Mega Campus — Manufacturing and Logistics District",
      "Mega Campus — Public and Community District",
      "Nexus Labs Production Complex",
      "Nomad Nexus Global Mobility Hub",
      "Royal Library & Hybrid Living Academy",
      "Signal Velocity Growth War Room",
      "Terra Axis Living Systems Yard",
      "The Care Village — Hearth Nexus",
      "The Energy Commons — Volta Grid",
      "The Exchange Pavilion — Mercantile Circuit",
      "The Human Systems Institute — Human Foundry",
      "The Living Provision — Nourish Grid",
      "The Matter Works — Materia Nova",
      "The Neural Block",
      "The Orbital Foundry — Astral Forge",
      "The Prism",
      "The Resilience House — Praesidium Mutual",
      "The Trust Vault — Sovereign Key",
      "The Vault",
      "The Water Observatory — Aqua Meridian",
      "Titan Works",
      "Vector Hub",
      "Visitor, Security and Campus Operations Center",
      "Vitality Center"
    ],
    "folders": [],
    "priority": 104,
    "sourceUrls": [
      "https://drive.google.com/file/d/1T5Xt-eLBh0h1NMZYX8XLsV43Web2xQhv/view",
      "https://drive.google.com/file/d/1SNC1QfbVZW1Iww1i4mAjsJM0NBEZ8oSZ/view"
    ],
    "sourceNotes": [
      "District Handbook — Facilities and Infrastructure",
      "Collective AI Mega Campus",
      "Mega Campus Version History",
      "Mega Campus Cost Model (Oct 2026)"
    ],
    "kit": [
      "Read a facility program",
      "Check the current register",
      "Inspect infrastructure assumptions"
    ],
    "theme": "infrastructure",
    "color": "#22D3EE"
  },
  {
    "id": "17 - Synergy Nodes",
    "title": "Synergy Nodes",
    "purpose": "Trace cross-division execution units, their dependencies, and phase-specific evidence.",
    "noteNames": [
      "D-01 Resonance Media",
      "D-02 Ascension Campus",
      "D-03 Quantum Commerce Grid",
      "D-04 Oracle Relay",
      "D-05 Kinetic Scholar",
      "D-06 Founder Ark",
      "D-07 Signal Court",
      "D-08 Ghost Protocol",
      "D-09 Aegis Forge",
      "D-10 Blackbox Citadel",
      "D-11 Mythos",
      "D-12 Nomad Market",
      "D-13 BioSovereign",
      "D-14 TerraMind",
      "D-15 Sovereign Assets",
      "D-16 Civilization Twin",
      "D-17 Civic Nervous System",
      "D-18 Eden Logistics",
      "D-19 Mecha Orchard",
      "D-20 Momentum Voyages",
      "District Handbook — Synergy Nodes",
      "Full Synergy Node Catalog",
      "SOLOFORGE",
      "SYN-01 Sentinel Guardian",
      "SYN-02 Apex Recovery Station",
      "SYN-03 Terra Gaia Survey Drone",
      "SYN-04 Herald Campus Kiosk",
      "SYN-05 Resonance Compliance Rig",
      "SYN-06 Aether Relay Drone",
      "SYN-07 Aurum Biosignal Band",
      "SYN-08 Prime Shepherd Rover",
      "SYN-09 Cognara Consulting Kit",
      "SYN-10 Gaia Field Rover",
      "SYN-11 Nexus Signal Broadcast Node",
      "SYN-12 Nomad Intelligence Kit",
      "SYN-13 Binary Forge Station",
      "SYN-14 Terra Habitat Sentinel",
      "SYN-15 Signal Cohort Badge",
      "SYN-16 Civic Babel Kiosk",
      "SYN-17 Eon Performance Lab",
      "SYN-18 Quantum Signal Terminal",
      "SYN-19 Vital Neuro Wristband",
      "SYN-20 Zenith Orchestration Tower",
      "Synergy Node Handbook"
    ],
    "folders": [],
    "priority": 105,
    "sourceUrls": [
      "https://drive.google.com/file/d/1Oi5pSsWu1IYFDs92UnQSlnbXlIaTzI7n/view",
      "https://drive.google.com/file/d/1X-gVDeQmkodcpvqtyh4L_I3yiMQ6YkWA/view"
    ],
    "sourceNotes": [
      "District Handbook — Synergy Nodes",
      "Synergy Node Handbook",
      "Full Synergy Node Catalog",
      "SOLOFORGE"
    ],
    "kit": [
      "Read a node mandate",
      "Inspect participating divisions",
      "Check phase and delivery evidence"
    ],
    "theme": "synergy",
    "color": "#3B82F6"
  }
]);
  return Object.freeze({get all(){return all()},define,worldTop,placementSignature,top,get:folder=>all().find(d=>d.folder===folder),notesFor,tasksFor,completedWork,landmarks,directory,browse,sources,recent,category});
})();

// ---------- District street identity
// Each knowledge district reads as its own place at street level and from the air: paving painted into the one
// ground texture, tree species, lamp and bench finish from the existing instance colours, a named gateway at the
// entry, hanging banners and an activity beacon fed by open tasks and recent writes. Citywide cost: five draws.
// Everything animated runs in shaders off one shared time uniform; reduced motion holds it still.
const DistrictLook=(()=>{
  // paving, tree [hue, saturation, lightness, width, height, hue spread], lamp finish, bench finish, gateway crest
  const L=(paving,tree,lamp,bench,crest)=>Object.freeze({paving,tree:Object.freeze(tree),lamp,bench,crest});
  const LOOKS=Object.freeze({
    navigation:L('compass',[.29,.5,.42,1,1,.05],'#7a5a32','#9a7650','spire'),
    council:L('ashlar',[.31,.42,.33,.66,1.6,.02],'#1d2026','#a7a094','pediment'),
    foundry:L('grid',[.25,.38,.4,1.15,.82,.03],'#6f7782','#6d747e','twin'),
    workshop:L('chevron',[.21,.5,.44,1.05,.95,.04],'#8a4f34','#8a6a48','beam'),
    commons:L('basket',[.27,.55,.46,1.2,1,.06],'#4f7d70','#9a7650','pergola'),
    control:L('lanes',[.32,.44,.36,.9,1.2,.02],'#2b3442','#5a616c','fins'),
    chamber:L('diamond',[.34,.38,.3,.95,1.05,.02],'#9a7a3a','#4d5560','pediment'),
    atelier:L('terrazzo',[.2,.24,.6,1.1,.9,.03],'#d8d4cc','#c9bfae','arch'),
    observatory:L('rings',[.38,.32,.4,.62,1.7,.03],'#d8d4cc','#a7a094','spire'),
    yard:L('hatch',[.17,.48,.42,1.25,.85,.04],'#c08a2a','#7a5232','beam'),
    stacks:L('running',[.08,.5,.4,1.05,1,.03],'#4a3a2c','#7a5232','pediment'),
    lab:L('hex',[.22,.58,.47,.95,1,.03],'#6f7782','#c9bfae','fins'),
    log:L('timeline',[.05,.52,.42,1,1.05,.03],'#1d2026','#9a7650','arch'),
    integrations:L('circuit',[.24,.6,.44,.8,1.25,.03],'#4f7d70','#5a616c','twin'),
    academy:L('herringbone',[.14,.62,.5,1.1,1.05,.02],'#9a7a3a','#9a7650','arch'),
    governance:L('checker',[.33,.4,.3,1,1,.02],'#1d2026','#a7a094','pediment'),
    delivery:L('arrows',[.27,.5,.43,1.1,.95,.05],'#8a4f34','#8a6a48','beam'),
    infrastructure:L('panels',[.4,.36,.4,.75,1.35,.03],'#6f7782','#6d747e','twin'),
    synergy:L('triad',[.45,.42,.42,1,1.1,.04],'#3a5a8a','#5a616c','spire')
  });
  const FALLBACK=L('none',[.28,.5,.42,1,1,.07],'#2a2f38','#8d867a','beam');
  const POLE_BASE='#2a2f38',BENCH_BASE='#8d867a';
  const def=top=>typeof Districts!=='undefined'?Districts.get(top):null;
  const lookOf=top=>LOOKS[def(top)?.theme]||FALLBACK;
  const rgb=h=>{const m=/^#?([0-9a-f]{6})$/i.exec(String(h||''));const v=m?parseInt(m[1],16):0x8a93ad;return [v>>16&255,v>>8&255,v&255]};
  const seeded=s=>{let h=2166136261;for(let i=0;i<s.length;i++)h=Math.imul(h^s.charCodeAt(i),16777619);return ()=>{h=Math.imul(h^h>>>15,2246822507);h=Math.imul(h^h>>>13,3266489909);return ((h^=h>>>16)>>>0)/4294967296}};
  // linear-space ratio so an existing instance colour multiplies a fixed base material into the target finish
  const ratio=(target,base)=>{const t=new THREE.Color(target).convertSRGBToLinear(),b=new THREE.Color(base).convertSRGBToLinear();return new THREE.Color(t.r/Math.max(b.r,1e-3),t.g/Math.max(b.g,1e-3),t.b/Math.max(b.b,1e-3))};

  // ---- state bound to the current layout
  let DIST=[],INDEX=new Map(),NAME_TOP=new Map(),clock=0,lastSeen=-1e9,active=-1,on=0,lastTick=0;
  let OPEN=new Map(),RECENT=new Map(),HEAT=new Map(),lastTasks=[],built=null,hooked=false;
  const U={uDlTime:{value:0},uDlMotion:{value:1},uDistActive:{value:-1},uDistOn:{value:0},uDistT0:{value:-100},uDistRect:{value:null},uDistCol:{value:null},uLamp:{value:0}};
  function ensureU(){if(!U.uDistRect.value){U.uDistRect.value=new THREE.Vector4(0,0,0,0);U.uDistCol.value=new THREE.Color(1,1,1)}}
  function bind(dist,buildings,notes){
    DIST=Array.isArray(dist)?dist:[];INDEX=new Map(DIST.map((d,i)=>[d.top,i]));NAME_TOP=new Map();RECENT=new Map();
    const now=Date.now(),week=7*864e5;
    (notes||[]).forEach(n=>{const b=buildings&&buildings[n.id];const top=b?.worldTop||(typeof Districts!=='undefined'&&Districts.worldTop?Districts.worldTop(n):String(n.folder||'').split('/')[0]);
      NAME_TOP.set(n.name,top);const t=Date.parse(n.updated_at);if(Number.isFinite(t)&&now-t<week&&now>=t-36e5)RECENT.set(top,(RECENT.get(top)||0)+1)});
    if(active>=DIST.length)active=-1;
    tasks(lastTasks);
  }
  const at=(x,z,m=0)=>{for(const d of DIST)if(x>=d.x-m&&x<=d.x+d.w+m&&z>=d.z-m&&z<=d.z+d.d+m)return d;return null};

  // ---- paving, painted once into the ground plan beneath every note footprint
  function lines(g,d,angle,step,X,Z){
    const cx=d.x+d.w/2,cz=d.z+d.d/2,R=Math.hypot(d.w,d.d)/2+step,ux=Math.cos(angle),uz=Math.sin(angle);
    for(let o=-R;o<=R;o+=step){const px=cx-uz*o,pz=cz+ux*o;g.moveTo(X(px-ux*R),Z(pz-uz*R));g.lineTo(X(px+ux*R),Z(pz+uz*R))}
  }
  function paintCourt(g,d,X,Z,sc){
    const look=lookOf(d.top);if(look.paving==='none')return 0;
    const [r,gg,b]=rgb(d.color),rnd=seeded(d.top),x0=d.x,z0=d.z,x1=d.x+d.w,z1=d.z+d.d,cx=(x0+x1)/2,cz=(z0+z1)/2;
    const dark='rgba(74,56,36,.17)',tint=`rgba(${r},${gg},${b},.2)`,light='rgba(255,248,232,.26)';
    let ops=0;const begin=()=>{g.beginPath();ops++};const stroke=(style,w)=>{g.strokeStyle=style;g.lineWidth=Math.max(1,w*sc);g.stroke()};const fill=style=>{g.fillStyle=style;g.fill()};
    g.save();g.beginPath();g.rect(X(x0),Z(z0),d.w*sc,d.d*sc);g.clip();g.setLineDash([]);
    const rectPath=(x,z,w,h)=>g.rect(X(x),Z(z),w*sc,h*sc);
    switch(look.paving){
      case 'compass':
        begin();lines(g,d,0,6,X,Z);lines(g,d,Math.PI/2,6,X,Z);stroke(dark,.08);
        begin();for(let i=0;i<16;i++){const a=i*Math.PI/8,R=Math.hypot(d.w,d.d);g.moveTo(X(cx),Z(cz));g.lineTo(X(cx+Math.cos(a)*R),Z(cz+Math.sin(a)*R))}stroke(tint,.16);
        begin();for(let rr=6;rr<Math.max(d.w,d.d);rr+=9){g.moveTo(X(cx+rr),Z(cz));g.arc(X(cx),Z(cz),rr*sc,0,Math.PI*2)}stroke(light,.2);break;
      case 'ashlar':
        begin();for(let z=z0,row=0;z<z1;z+=3,row++){g.moveTo(X(x0),Z(z));g.lineTo(X(x1),Z(z));for(let x=x0+(row%2?2.25:0);x<x1;x+=4.5){g.moveTo(X(x),Z(z));g.lineTo(X(x),Z(z+3))}}stroke(dark,.1);break;
      case 'grid':
        begin();lines(g,d,0,2,X,Z);lines(g,d,Math.PI/2,2,X,Z);stroke(dark,.07);begin();lines(g,d,0,12,X,Z);lines(g,d,Math.PI/2,12,X,Z);stroke(tint,.22);break;
      case 'chevron':
        begin();for(let z=z0;z<z1+2.4;z+=2.4){g.moveTo(X(x0),Z(z));for(let x=x0,k=0;x<=x1+2;x+=2,k++)g.lineTo(X(x),Z(z+(k%2?1.2:0)))}stroke(dark,.09);
        begin();for(let z=z0+12;z<z1;z+=24){g.moveTo(X(x0),Z(z));for(let x=x0,k=0;x<=x1+2;x+=2,k++)g.lineTo(X(x),Z(z+(k%2?1.2:0)))}stroke(tint,.3);break;
      case 'basket':
        begin();for(let z=z0,j=0;z<z1;z+=2,j++)for(let x=x0,i=0;x<x1;x+=2,i++){rectPath(x,z,2,2);if((i+j)%2){g.moveTo(X(x+1),Z(z));g.lineTo(X(x+1),Z(z+2))}else{g.moveTo(X(x),Z(z+1));g.lineTo(X(x+2),Z(z+1))}}stroke(dark,.06);break;
      case 'lanes':
        begin();lines(g,d,Math.PI/2,3,X,Z);stroke(dark,.08);g.setLineDash([2*sc,2*sc]);begin();lines(g,d,Math.PI/2,15,X,Z);stroke(tint,.22);g.setLineDash([]);break;
      case 'diamond':
        begin();lines(g,d,Math.PI/4,3,X,Z);lines(g,d,-Math.PI/4,3,X,Z);stroke(dark,.08);begin();lines(g,d,Math.PI/4,15,X,Z);stroke(tint,.2);break;
      case 'terrazzo':{
        const chips=['rgba(255,250,238,.5)','rgba(60,52,44,.28)',`rgba(${r},${gg},${b},.42)`,'rgba(196,160,110,.35)'],n=Math.min(3600,Math.floor(d.w*d.d/2.2));
        chips.forEach((c,ci)=>{begin();for(let i=0;i<n/chips.length;i++){const x=x0+rnd()*d.w,z=z0+rnd()*d.d,s=(.14+rnd()*.22)*sc;g.moveTo(X(x)+s,Z(z));g.arc(X(x),Z(z),s,0,Math.PI*2)}fill(c)});
        begin();lines(g,d,0,10,X,Z);lines(g,d,Math.PI/2,10,X,Z);stroke('rgba(200,190,170,.35)',.1);break}
      case 'rings':
        begin();for(let rr=2.5;rr<Math.hypot(d.w,d.d)/2;rr+=2.5){g.moveTo(X(cx+rr),Z(cz));g.arc(X(cx),Z(cz),rr*sc,0,Math.PI*2)}stroke(dark,.08);
        begin();for(let i=0;i<24;i++){const a=i*Math.PI/12,R=Math.hypot(d.w,d.d);g.moveTo(X(cx),Z(cz));g.lineTo(X(cx+Math.cos(a)*R),Z(cz+Math.sin(a)*R))}stroke(tint,.1);break;
      case 'hatch':
        begin();lines(g,d,0,6,X,Z);lines(g,d,Math.PI/2,6,X,Z);stroke(dark,.12);
        begin();for(let x=x0;x<x1;x+=1.6){[z0,z1-2].forEach(z=>{g.moveTo(X(x),Z(z+2));g.lineTo(X(x+.8),Z(z))})}stroke(`rgba(${r},${gg},${b},.4)`,.32);break;
      case 'running':
        begin();for(let z=z0,row=0;z<z1;z+=1.2,row++){g.moveTo(X(x0),Z(z));g.lineTo(X(x1),Z(z));for(let x=x0+(row%2?1.2:0);x<x1;x+=2.4){g.moveTo(X(x),Z(z));g.lineTo(X(x),Z(z+1.2))}}stroke(dark,.06);break;
      case 'hex':{
        const s=1.7,h=s*Math.sqrt(3);begin();
        for(let z=z0-h,row=0;z<z1+h;z+=h/2,row++)for(let x=x0-s*3+(row%2?s*1.5:0);x<x1+s*3;x+=s*3){for(let i=0;i<=6;i++){const a=i*Math.PI/3,px=X(x+Math.cos(a)*s),pz=Z(z+Math.sin(a)*s);i?g.lineTo(px,pz):g.moveTo(px,pz)}}
        stroke(dark,.07);begin();lines(g,d,Math.PI/6,14,X,Z);stroke(tint,.16);break}
      case 'timeline':
        begin();for(let z=z0+2;z<z1;z+=4){g.moveTo(X(x0),Z(z));g.lineTo(X(x1),Z(z));for(let x=x0;x<x1;x+=1)g.moveTo(X(x),Z(z-.35)),g.lineTo(X(x),Z(z+.35))}stroke(dark,.07);
        begin();for(let x=x0+7;x<x1;x+=14){g.moveTo(X(x),Z(z0));g.lineTo(X(x),Z(z1))}stroke(tint,.28);break;
      case 'circuit':{
        begin();lines(g,d,0,8,X,Z);lines(g,d,Math.PI/2,8,X,Z);stroke(dark,.06);
        begin();const nodes=[];for(let i=0;i<Math.min(90,Math.floor(d.w*d.d/220));i++){let x=x0+Math.round(rnd()*d.w/2)*2,z=z0+Math.round(rnd()*d.d/2)*2;g.moveTo(X(x),Z(z));for(let s=0;s<4;s++){if(rnd()<.5)x+=(rnd()<.5?-1:1)*(4+Math.round(rnd()*4)*2);else z+=(rnd()<.5?-1:1)*(4+Math.round(rnd()*4)*2);g.lineTo(X(x),Z(z))}nodes.push([x,z])}
        stroke(tint,.24);begin();nodes.forEach(([x,z])=>{g.moveTo(X(x)+.5*sc,Z(z));g.arc(X(x),Z(z),.5*sc,0,Math.PI*2)});fill(`rgba(${r},${gg},${b},.45)`);break}
      case 'herringbone':
        begin();for(let z=z0-3;z<z1+3;z+=2)for(let x=x0-3,k=0;x<x1+3;x+=1.5,k++){const zz=z+(k%2)*1;g.moveTo(X(x),Z(zz));g.lineTo(X(x+1.5),Z(zz+1.5))}stroke(dark,.07);
        begin();for(let z=z0-3;z<z1+3;z+=2)for(let x=x0-3;x<x1+3;x+=3){g.moveTo(X(x+1.5),Z(z+1.5));g.lineTo(X(x+3),Z(z))}stroke(dark,.07);break;
      case 'checker':
        begin();for(let z=z0,j=0;z<z1;z+=3,j++)for(let x=x0,i=0;x<x1;x+=3,i++)if((i+j)%2)rectPath(x,z,3,3);fill('rgba(52,48,44,.12)');
        begin();lines(g,d,0,3,X,Z);lines(g,d,Math.PI/2,3,X,Z);stroke(light,.06);break;
      case 'arrows':
        begin();lines(g,d,Math.PI/2,3,X,Z);stroke(dark,.07);
        begin();for(let z=z0+6;z<z1;z+=12)for(let x=x0+6;x<x1;x+=12){g.moveTo(X(x-1.6),Z(z-1));g.lineTo(X(x),Z(z+.8));g.lineTo(X(x+1.6),Z(z-1))}stroke(tint,.4);break;
      case 'panels':
        begin();lines(g,d,0,6,X,Z);lines(g,d,Math.PI/2,6,X,Z);stroke(dark,.1);
        begin();for(let z=z0+3;z<z1;z+=12){g.moveTo(X(x0),Z(z));g.lineTo(X(x1),Z(z))}stroke(tint,.42);begin();for(let z=z0+3;z<z1;z+=12){g.moveTo(X(x0),Z(z+.7));g.lineTo(X(x1),Z(z+.7))}stroke(light,.14);break;
      case 'triad':
        begin();lines(g,d,0,3,X,Z);lines(g,d,Math.PI/3,3,X,Z);lines(g,d,-Math.PI/3,3,X,Z);stroke(dark,.06);begin();lines(g,d,Math.PI/3,15,X,Z);lines(g,d,-Math.PI/3,15,X,Z);stroke(tint,.18);break;
    }
    // Threshold medallion at the gateway: a half disc in the district colour with a stone rim.
    const mx=cx,mz=z0,mr=4.2;
    begin();g.moveTo(X(mx-mr),Z(mz));g.arc(X(mx),Z(mz),mr*sc,0,Math.PI);g.closePath();fill(`rgba(${r},${gg},${b},.34)`);
    begin();g.arc(X(mx),Z(mz),(mr-.35)*sc,0,Math.PI);stroke(light,.3);
    begin();for(let i=1;i<8;i++){const a=i*Math.PI/8;g.moveTo(X(mx+Math.cos(a)*1.2),Z(mz+Math.sin(a)*1.2));g.lineTo(X(mx+Math.cos(a)*(mr-.7)),Z(mz+Math.sin(a)*(mr-.7)))}stroke(light,.12);
    g.restore();return ops;
  }

  // ---- furniture finish keyed on the district under each instance (existing batches, no new draws)
  function tree(x,z,k){
    const d=at(x,z,1);if(!d)return null;const t=lookOf(d.top).tree,kk=Number.isFinite(k)?k:.5;
    return {h:((t[0]+(kk-.5)*t[5])%1+1)%1,s:Math.min(1,t[1]+kk*.16),l:Math.min(.9,t[2]+kk*.1),sx:t[3],sy:t[4]};
  }
  const finishCache=new Map();
  const finish=(hex,base)=>{const k=hex+base;if(!finishCache.has(k))finishCache.set(k,ratio(hex,base));return finishCache.get(k).clone()};
  function lampFinish(list){return (list||[]).map(l=>{const d=at(l.x,l.z,2.2);return {...l,c:finish(d?lookOf(d.top).lamp:POLE_BASE,POLE_BASE)}})}
  function bench(d){return finish(d?lookOf(d.top).bench:BENCH_BASE,BENCH_BASE)}

  // ---- active district: ground inlay, entry sweep and gateway light-up
  const GROUND_DECL='uniform float uDlTime;uniform float uDlMotion;uniform float uDistOn;uniform float uDistT0;uniform vec4 uDistRect;uniform vec3 uDistCol;\n';
  const GROUND_GLSL=`{ vec2 dq=vGPos.xz-uDistRect.xy;vec2 dsz=uDistRect.zw;
  if(uDistOn>0.002&&dq.x>-1.0&&dq.y>-1.0&&dq.x<dsz.x+1.0&&dq.y<dsz.y+1.0){
    float de=min(min(dq.x,dsz.x-dq.x),min(dq.y,dsz.y-dq.y));
    float dband=1.0-smoothstep(0.12,0.55,abs(de-0.75));
    float dwash=smoothstep(-0.5,0.5,de)*(1.0-smoothstep(1.0,14.0,de));
    float dage=max(uDlTime-uDistT0,0.0);
    float dring=uDlMotion*(1.0-smoothstep(0.0,2.6,abs(length(dq-vec2(dsz.x*0.5,0.0))-dage*42.0)))*exp(-dage*0.55);
    totalEmissiveRadiance+=uDistCol*uDistOn*(dband*0.42+dwash*0.1+dring*0.55)*(0.55+uLamp*1.3);
  } }`;
  function patchGround(sh){
    ensureU();Object.assign(sh.uniforms,{uDlTime:U.uDlTime,uDlMotion:U.uDlMotion,uDistOn:U.uDistOn,uDistT0:U.uDistT0,uDistRect:U.uDistRect,uDistCol:U.uDistCol});
    sh.fragmentShader=sh.fragmentShader.replace('#include <common>','#include <common>\n'+GROUND_DECL).replace('#include <emissivemap_fragment>','#include <emissivemap_fragment>\n'+GROUND_GLSL);
    return sh;
  }
  const GATE_VERT='attribute float aDist;uniform float uDistActive;uniform float uDistOn;varying float vGate;\n';
  const GATE_SET='vGate=(1.0-step(0.5,abs(aDist-uDistActive)))*uDistOn;';
  function patchGate(sh){
    Object.assign(sh.uniforms,{uDlTime:U.uDlTime,uDlMotion:U.uDlMotion,uDistActive:U.uDistActive,uDistOn:U.uDistOn});
    sh.vertexShader=sh.vertexShader.replace('#include <common>','#include <common>\n'+GATE_VERT).replace('#include <begin_vertex>','#include <begin_vertex>\n'+GATE_SET);
    sh.fragmentShader=sh.fragmentShader.replace('#include <common>','#include <common>\nvarying float vGate;uniform float uDlTime;uniform float uDlMotion;').replace('#include <emissivemap_fragment>','#include <emissivemap_fragment>\ntotalEmissiveRadiance*=1.0+vGate*(2.6+1.2*sin(uDlTime*2.2)*uDlMotion);');
    return sh;
  }
  function tagGates(mesh,list){
    if(!mesh||!mesh.geometry)return mesh;const a=new Float32Array(Math.max(1,(list||[]).length)).fill(-5);(list||[]).forEach((p,i)=>{const k=INDEX.get(p.top);if(k!=null)a[i]=k});
    mesh.geometry.setAttribute('aDist',new THREE.InstancedBufferAttribute(a,1));return mesh;
  }
  function enter(top){
    const i=INDEX.get(top);if(i==null)return false;lastSeen=clock;ensureU();
    if(i!==active){const d=DIST[i];active=i;U.uDistActive.value=i;U.uDistT0.value=clock;U.uDistRect.value.set(d.x,d.z,d.w,d.d);U.uDistCol.value.set(d.color||'#ffffff').convertSRGBToLinear()}
    return true;
  }
  function near(top){if(top)return enter(top);if(clock-lastSeen>2.5)active=-1;return false}
  // Registered once as a Campus frame hook: true only while the highlight is fading, so it never forces ambient frames.
  function tick(t,reduced){
    const dt=Math.min(.25,Math.max(0,t-lastTick));lastTick=t;clock=t;U.uDlTime.value=t;U.uDlMotion.value=reduced?0:1;
    const target=active>=0?1:0;on=reduced?target:on+(target-on)*Math.min(1,dt*2.6);if(Math.abs(on-target)<.004)on=target;
    U.uDistOn.value=on;if(on===0&&active<0)U.uDistActive.value=-1;
    if(typeof DistrictAssets!=='undefined'&&DistrictAssets.tick)DistrictAssets.tick(t,reduced);
    return on>0&&on<1;
  }

  // ---- live activity: open tasks and recent writes per district
  function tasks(list){
    lastTasks=Array.isArray(list)?list:[];OPEN=new Map();
    lastTasks.forEach(t=>{if(!t||t.status==='done')return;const top=NAME_TOP.get(t.note);if(top!=null)OPEN.set(top,(OPEN.get(top)||0)+1)});
    refresh();return OPEN;
  }
  function write(top){if(top==null||!INDEX.has(top))return false;HEAT.set(top,clock);RECENT.set(top,(RECENT.get(top)||0)+1);refresh();return true}
  const beaconHeight=n=>Math.min(64,10+8*Math.sqrt(n||0));
  function activity(top){const open=OPEN.get(top)||0,recent=RECENT.get(top)||0;return {open,recent,height:beaconHeight(open),heat:HEAT.has(top)?HEAT.get(top):-1e4}}
  function beaconBase(d){const r=d.landmark;return r?{x:r.x,y:r.y+(r.height||0)+.6,z:r.z}:{x:d.x+d.w/2,y:1.5,z:d.z+d.d/2}}
  function refresh(){
    if(!built)return;const {shaft,lantern}=built,o=new THREE.Object3D(),act=shaft.geometry.attributes.aAct;
    DIST.forEach((d,i)=>{if(i>=shaft.count)return;const a=activity(d.top),p=beaconBase(d),w=.55+.12*Math.min(4,Math.sqrt(a.open));
      o.position.set(p.x,p.y,p.z);o.rotation.set(0,0,0);o.scale.set(w,a.height,w);o.updateMatrix();shaft.setMatrixAt(i,o.matrix);
      const s=1+.14*Math.min(5,Math.sqrt(a.open));o.position.set(p.x,p.y+a.height+1.2,p.z);o.scale.set(s,s*1.35,s);o.updateMatrix();lantern.setMatrixAt(i,o.matrix);
      act.setXYZ(i,Math.min(1,a.open/12),a.heat,Math.min(1,Math.log2(1+a.recent)/5))});
    shaft.instanceMatrix.needsUpdate=true;lantern.instanceMatrix.needsUpdate=true;act.needsUpdate=true;
  }

  // ---- gateways, banners, name plates and beacons
  const MAT={};
  const ROWS=12,COLS=2;let atlas=null,atlasKey='';
  function nameAtlas(){
    const key=DIST.map(d=>d.top+'|'+(def(d.top)?.title||d.name)+'|'+d.color).join('/');if(atlas&&atlasKey===key)return atlas;
    if(atlas)atlas.dispose();atlasKey=key;
    const c=document.createElement('canvas');c.width=1024;c.height=1024;const g=c.getContext('2d'),cw=512,ch=1024/ROWS;
    g.fillStyle='#10141c';g.fillRect(0,0,1024,1024);
    DIST.slice(0,ROWS*COLS).forEach((d,i)=>{const x=(i%COLS)*cw,y=Math.floor(i/COLS)*ch,title=def(d.top)?.title||d.name||d.top||'Root';
      g.fillStyle='#141a24';g.fillRect(x+3,y+3,cw-6,ch-6);g.fillStyle=d.color||'#D4A843';g.fillRect(x+3,y+3,10,ch-6);g.fillRect(x+13,y+ch-8,cw-16,3);
      g.textBaseline='middle';g.fillStyle=d.color||'#D4A843';let f=20;g.font=`600 ${f}px "JetBrains Mono",ui-monospace,monospace`;
      const sub=String(d.top||'Root').toUpperCase();while(f>11&&g.measureText(sub).width>cw-46){f--;g.font=`600 ${f}px "JetBrains Mono",ui-monospace,monospace`}g.fillText(sub,x+28,y+ch*.3);
      let F=36;g.font=`700 ${F}px "Space Grotesk",ui-sans-serif,system-ui,sans-serif`;while(F>16&&g.measureText(title).width>cw-46){F--;g.font=`700 ${F}px "Space Grotesk",ui-sans-serif,system-ui,sans-serif`}
      g.fillStyle='#F4EFE6';g.fillText(title,x+28,y+ch*.66)});
    atlas=new THREE.CanvasTexture(c);atlas.encoding=THREE.sRGBEncoding;atlas.anisotropy=4;return atlas;
  }
  function crest(kind){
    const p=[],add=(x,y,z,sx,sy,sz,rz=0,glow=0)=>p.push([x,y,z,sx,sy,sz,rz,glow]);
    add(0,5.62,0,4.9,.32,.8);add(0,5.42,-.43,4.3,.07,.05,0,.75);add(0,5.42,.43,4.3,.07,.05,0,.75);
    switch(kind){
      case 'spire':add(0,6.55,0,.3,1.6,.3);add(0,7.42,0,.6,.14,.6,0,.9);break;
      case 'pediment':add(-1.2,6.12,0,2.75,.24,.7,.36);add(1.2,6.12,0,2.75,.24,.7,-.36);add(0,6.62,0,.32,.32,.32,Math.PI/4,.9);break;
      case 'twin':add(0,6.18,0,4.4,.2,.6);for(const x of [-2.1,2.1])add(x,6.5,0,.26,.9,.26,0,.6);break;
      case 'beam':add(0,6.02,0,6.2,.22,.5);for(const x of [-2.9,2.9])add(x,5.7,0,.16,.5,.16,0,.6);break;
      case 'pergola':for(let i=0;i<5;i++)add(-1.8+i*.9,5.92,0,.18,.14,1.7);break;
      case 'fins':for(let i=0;i<5;i++)add(-1.6+i*.8,6.25,0,.12,1-.12*Math.abs(i-2),.55,0,i===2?.8:0);break;
      case 'arch':for(let i=0;i<7;i++){const a=Math.PI*(i+.5)/7;add(-Math.cos(a)*2.2,5.75+Math.sin(a)*1.05,0,1.05,.2,.6,Math.atan2(Math.cos(a)*1.05,Math.sin(a)*2.2))}add(0,6.95,0,.36,.36,.36,Math.PI/4,.9);break;
    }
    return p;
  }
  function material(key){
    if(MAT[key])return MAT[key];
    const vertGate=sh=>{Object.assign(sh.uniforms,{uDlTime:U.uDlTime,uDlMotion:U.uDlMotion,uDistActive:U.uDistActive,uDistOn:U.uDistOn});
      sh.vertexShader=sh.vertexShader.replace('#include <common>','#include <common>\n'+GATE_VERT+'attribute vec4 aAcc;varying vec4 vAcc;uniform float uDlTime;uniform float uDlMotion;\n').replace('#include <begin_vertex>','#include <begin_vertex>\n'+GATE_SET+'vAcc=aAcc;');
      sh.fragmentShader=sh.fragmentShader.replace('#include <common>','#include <common>\nvarying float vGate;varying vec4 vAcc;uniform float uDlTime;uniform float uDlMotion;')};
    if(key==='frame'){const m=new THREE.MeshStandardMaterial({color:0xffffff,roughness:.42,metalness:.55});
      m.onBeforeCompile=sh=>{vertGate(sh);sh.fragmentShader=sh.fragmentShader.replace('#include <emissivemap_fragment>','#include <emissivemap_fragment>\ntotalEmissiveRadiance+=vAcc.rgb*(vAcc.a*(0.35+uLampD*1.4)+vGate*(1.1+0.5*sin(uDlTime*2.2)*uDlMotion));').replace('#include <common>','#include <common>\nuniform float uLampD;');sh.uniforms.uLampD=U.uLamp};MAT[key]=m}
    else if(key==='banner'){const m=new THREE.MeshStandardMaterial({color:0xffffff,roughness:.86,metalness:0,side:THREE.DoubleSide});
      m.onBeforeCompile=sh=>{vertGate(sh);
        sh.vertexShader=sh.vertexShader.replace('#include <common>','#include <common>\nvarying float vBy;').replace('#include <begin_vertex>','#include <begin_vertex>\nvBy=position.y;\n#ifdef USE_INSTANCING\nfloat bph=instanceMatrix[3].x*0.37+instanceMatrix[3].z*0.21;\n#else\nfloat bph=0.0;\n#endif\nfloat bk=clamp(1.5-position.y,0.0,3.0)/3.0;transformed.z+=sin(uDlTime*1.6+bph)*0.22*bk*bk*uDlMotion;transformed.x+=sin(uDlTime*1.1+bph*1.7)*0.05*bk*uDlMotion;');
        sh.fragmentShader=sh.fragmentShader.replace('#include <common>','#include <common>\nvarying float vBy;').replace('#include <color_fragment>','#include <color_fragment>\nfloat bs=step(-1.12,vBy)*step(vBy,-0.92)+step(1.05,vBy)*step(vBy,1.2);diffuseColor.rgb=mix(diffuseColor.rgb,vec3(0.93,0.89,0.82),bs*0.85);').replace('#include <emissivemap_fragment>','#include <emissivemap_fragment>\ntotalEmissiveRadiance+=diffuseColor.rgb*vGate*0.55;')};MAT[key]=m}
    else if(key==='plate'){const m=new THREE.MeshBasicMaterial({map:nameAtlas(),color:0xffffff,toneMapped:false});
      m.onBeforeCompile=sh=>{vertGate(sh);sh.vertexShader=sh.vertexShader.replace('#include <common>','#include <common>\nattribute float aRow;').replace('#include <uv_vertex>',`#ifdef USE_UV\nvUv=vec2((mod(aRow,${COLS}.0)+uv.x)/${COLS}.0,1.0-(floor(aRow/${COLS}.0)+1.0-uv.y)/${ROWS}.0);\n#endif`);
        sh.fragmentShader=sh.fragmentShader.replace('#include <map_fragment>','#include <map_fragment>\ndiffuseColor.rgb*=0.82+vGate*0.4;')};MAT[key]=m}
    else if(key==='shaft'){MAT[key]=new THREE.ShaderMaterial({transparent:true,depthWrite:false,blending:THREE.AdditiveBlending,side:THREE.DoubleSide,
      uniforms:{uDlTime:U.uDlTime,uDlMotion:U.uDlMotion,uLamp:U.uLamp},
      vertexShader:'attribute vec3 aAct;uniform float uDlTime;uniform float uLamp;varying float vY;varying float vI;varying vec3 vC;void main(){vY=position.y;float heat=exp(-max(uDlTime-aAct.y,0.0)/14.0);vI=(0.14+0.42*aAct.x+0.2*aAct.z+1.1*heat)*(0.5+0.9*uLamp);\n#ifdef USE_INSTANCING_COLOR\nvC=instanceColor;\n#else\nvC=vec3(1.0);\n#endif\n#ifdef USE_INSTANCING\ngl_Position=projectionMatrix*modelViewMatrix*instanceMatrix*vec4(position,1.0);\n#else\ngl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.0);\n#endif\n}',
      fragmentShader:'uniform float uDlTime;uniform float uDlMotion;varying float vY;varying float vI;varying vec3 vC;void main(){float f=pow(1.0-clamp(vY,0.0,1.0),1.6)*smoothstep(0.0,0.04,vY);float s=0.78+0.22*sin(vY*42.0-uDlTime*2.6*uDlMotion);gl_FragColor=vec4(vC*vI*f*s,1.0);}'})}
    else if(key==='lantern'){const m=new THREE.MeshBasicMaterial({color:0xffffff});
      m.onBeforeCompile=sh=>{Object.assign(sh.uniforms,{uDlTime:U.uDlTime,uDlMotion:U.uDlMotion});sh.vertexShader=sh.vertexShader.replace('#include <common>','#include <common>\nuniform float uDlTime;uniform float uDlMotion;').replace('#include <begin_vertex>','#include <begin_vertex>\nfloat la=uDlTime*0.7*uDlMotion;transformed.xz=mat2(cos(la),sin(la),-sin(la),cos(la))*transformed.xz;transformed.y+=sin(uDlTime*1.3)*0.18*uDlMotion;')};MAT[key]=m}
    return MAT[key];
  }
  function instanced(geo,mat,items,attrs){
    const m=new THREE.InstancedMesh(geo,mat,Math.max(1,items.length));m.count=items.length;const o=new THREE.Object3D();
    items.forEach((p,i)=>{o.position.set(p.x,p.y,p.z);o.rotation.set(0,p.ry||0,p.rz||0);o.scale.set(p.sx||1,p.sy||1,p.sz||1);o.updateMatrix();m.setMatrixAt(i,o.matrix);if(p.c)m.setColorAt(i,p.c)});
    Object.entries(attrs||{}).forEach(([name,[size,get]])=>{const a=new Float32Array(Math.max(1,items.length)*size);items.forEach((p,i)=>{const v=get(p);if(size===1)a[i]=v;else a.set(v,i*size)});geo.setAttribute(name,new THREE.InstancedBufferAttribute(a,size))});
    m.instanceMatrix.needsUpdate=true;if(m.instanceColor)m.instanceColor.needsUpdate=true;m.frustumCulled=false;return m;
  }
  function build(ctx={}){
    ensureU();if(ctx.SH&&ctx.SH.uLamp)U.uLamp=ctx.SH.uLamp;
    if(!hooked&&typeof ctx.onFrame==='function'){hooked=true;ctx.onFrame((dt,t)=>tick(t,!!ctx.reduced))}
    const group=new THREE.Group();group.name='District identity';const ok=typeof ctx.okCell==='function'?ctx.okCell:()=>true;
    const frames=[],banners=[],plates=[],lin=h=>new THREE.Color(h).convertSRGBToLinear();
    DIST.forEach((d,i)=>{
      const look=lookOf(d.top),col=lin(d.color||'#8A93AD'),fin=lin(look.lamp),gx=d.x+d.w*.5,gz=d.z-2.5,acc=[col.r,col.g,col.b];
      crest(look.crest).forEach(([x,y,z,sx,sy,sz,rz,glow])=>frames.push({x:gx+x,y,z:gz+z,sx,sy,sz,rz,c:glow?fin.clone().lerp(col,.6):fin,di:i,acc:[...acc,glow]}));
      // name plates face the street and the court, so the gateway reads in both directions
      if(i<ROWS*COLS)plates.push({x:gx,y:4.82,z:gz-.43,sx:3.9,sy:.66,sz:1,ry:Math.PI,di:i,row:i},{x:gx,y:4.82,z:gz+.52,sx:3.9,sy:.66,sz:1,ry:0,di:i,row:i});
      // banners hang inside the court edges on slim masts
      const spots=d.w>36?[[.22,0],[.78,0],[.22,1],[.78,1]]:[[.5,1]];
      spots.forEach(([fx,side])=>{const x=d.x+d.w*fx,z=side?d.z+d.d-.9:d.z+.9;if(!ok(x,z,0))return;
        frames.push({x,y:3.3,z,sx:.14,sy:6.6,sz:.14,c:fin,di:i,acc:[...acc,0]},{x:x+.62,y:6.45,z,sx:1.38,sy:.08,sz:.08,c:fin,di:i,acc:[...acc,0]});
        banners.push({x:x+.75,y:4.85,z,c:col,di:i,acc:[...acc,0]})});
    });
    const gateAttrs={aDist:[1,p=>p.di],aAcc:[4,p=>p.acc||[0,0,0,0]]};
    const frame=instanced(new THREE.BoxGeometry(1,1,1),material('frame'),frames,gateAttrs);frame.castShadow=!!ctx.HI;frame.receiveShadow=true;frame.name='District gateways';
    const bannerGeo=new THREE.BoxGeometry(1.3,3,.05,1,6,1);const banner=instanced(bannerGeo,material('banner'),banners,gateAttrs);banner.name='District banners';
    const plate=instanced(new THREE.PlaneGeometry(1,1),material('plate'),plates,{aDist:[1,p=>p.di],aAcc:[4,()=>[0,0,0,0]],aRow:[1,p=>p.row]});plate.name='District name plates';
    if(MAT.plate.map!==nameAtlas()){MAT.plate.map=nameAtlas();MAT.plate.needsUpdate=true}
    const beacons=DIST.map(d=>({x:0,y:0,z:0,c:lin(d.color||'#8A93AD')}));
    const shaftGeo=new THREE.CylinderGeometry(1,1.4,1,12,1,true);shaftGeo.translate(0,.5,0);
    const shaft=instanced(shaftGeo,material('shaft'),beacons,{aAct:[3,()=>[0,-1e4,0]]});shaft.name='District activity beacons';shaft.renderOrder=2;
    const lantern=instanced(new THREE.OctahedronGeometry(.9,0),material('lantern'),beacons);lantern.name='District activity lanterns';
    group.add(frame,banner,plate,shaft,lantern);
    built={frame,banner,plate,shaft,lantern};refresh();
    group.userData.stats={gateways:DIST.length,banners:banners.length,frames:frames.length,draws:group.children.length};
    return group;
  }
  const stats=()=>({districts:DIST.length,active:active>=0?DIST[active]?.top:null,on,draws:built?5:0,open:Object.fromEntries(OPEN),recent:Object.fromEntries(RECENT)});
  // Hand everything back: the title cinematic builds one district with its own renderer and lamp uniform before the city
  // boots, and the cached materials hold that uniform, so the city must start from fresh materials and an empty layout.
  function reset(){
    if(built)Object.values(built).forEach(m=>{if(m&&m.geometry)m.geometry.dispose()});built=null;
    Object.keys(MAT).forEach(k=>{try{MAT[k].dispose()}catch(e){}delete MAT[k]});if(atlas){atlas.dispose();atlas=null;atlasKey=''}
    DIST=[];INDEX=new Map();NAME_TOP=new Map();OPEN=new Map();RECENT=new Map();HEAT=new Map();lastTasks=[];active=-1;on=0;lastSeen=-1e9;
    U.uDistActive.value=-1;U.uDistOn.value=0;U.uDistT0.value=-100;U.uLamp={value:0};
  }
  return Object.freeze({LOOKS,lookOf,bind,at,paintCourt,tree,lampFinish,bench,patchGround,patchGate,tagGates,enter,near,tick,tasks,write,activity,build,reset,stats,uniforms:U});
})();
