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
