#!/usr/bin/env node
// Plan by default. --apply reads each live note immediately before a versioned append/create.
import fs from 'node:fs';
import path from 'node:path';
import os from 'node:os';
import { fileURLToPath } from 'node:url';
import { call } from './agent.mjs';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const args = process.argv.slice(2);
const apply = args.includes('--apply');
const opt = key => { const i = args.indexOf(key); return i < 0 ? undefined : args[i + 1]; };
const task = opt('--task');
const output = opt('--out') || path.join(os.tmpdir(), 'collective-vault-district-note-plan.json');
const index = JSON.parse(fs.readFileSync(path.join(ROOT, 'vault/_index.json'), 'utf8'));
const registry = fs.readFileSync(path.join(ROOT, 'web-src/b_districts.js'), 'utf8');
const folders = [...registry.matchAll(/^\s*\['([^']+)'/gm)].map(m => m[1]);
if (folders.length !== 13 || new Set(folders).size !== 13) throw new Error('Expected exactly 13 unique district folders in b_districts.js');
const link = name => `[[${name}]]`;
const existing = name => Boolean(index[name]);
const namesIn = folder => Object.keys(index).filter(n => String(index[n].folder).split('/')[0] === folder).sort();
const requireName = name => { if (!existing(name)) throw new Error(`Missing required live anchor: ${name}. Sync notes before planning.`); return name; };
const rootMoc = requireName('000 — Collective AI Knowledge Base');
const sources = {
  vault: ['Obsidian Vault Matrix', 'https://drive.google.com/file/d/1JNX7pTq-WEUMmvsc3ZjGB0jltsic-0xa/view'],
  bible: ['Company Bible expanded — June 2026', 'https://drive.google.com/file/d/19p-3NH3dVx6FNS1J32uVpUYp8xMCUSAc/view'],
  mcp: ['MCP Matrix', 'https://drive.google.com/file/d/1vZ5AW8TV_92b74qz8pkQXW3Lity3M8d7/view'],
  graph: ['Knowledge Graph Matrix', 'https://drive.google.com/file/d/1_TtjcnDjiMY9_jTV2PjWNoEwpW9Y5xmT/view']
};
const citations = keys => keys.map(k => `- [${sources[k][0]}](${sources[k][1]})`).join('\n');
const configs = [
  ['Atlas','000 — Collective AI Knowledge Base','The Collective',
   'Navigation is a map of sources, responsibilities, and decisions. A hub lists existing notes; a route through the city must lead to work a member can inspect.',
   ['Maintain links to the division, product, people, operations, finance, brand, research, projects, and physical AI hubs.','Check every linked note exists. Distinguish company canon from historical source documents.','Use one note per subject and reciprocal hub links so knowledge remains discoverable.'],
   ['Source title and URL','Authority and effective date','Related hub and division','Open question or next action'],['vault','graph']],
  ['Division council','002 — Divisions MOC','The Collective',
   'Division charters define capability and boundaries. Charter existence does not establish operating status. Pending divisions are outside the current twenty-division structure until activated.',
   ['Nine operating divisions are ZenFlow, The Collective, Hybrid Living, Nexus Labs, Signal Velocity, Quantum Ledger, Binary Loom, Obsidian Arc, and Juris Guard.','The remaining eleven of divisions 01–20 are chartered. Divisions 21–30 are Pending Until Activation.','Use the Division Activation Scorecard, current director registry, dependencies, and evidence when assessing readiness.'],
   ['Current operating status','Mandate and product links','Director and human responsibility from current records','Dependencies and activation evidence'],['vault','bible']],
  ['Agent foundry','001 — ZenFlow MOC','ZenFlow',
   'Agent work begins with a scoped mandate, current routing, and an evidence trail. ZENITH is Tier 1 and routes or escalates; HATAALII is Tier 0.5.',
   ['Read Agent Tier Registry and Director Codenames before assigning agent identities. June director names are historical.','Define inputs, outputs, tools, memory scope, evaluation, and escalation for each blueprint.','The 600-agent lattice is reference architecture. Report live connected agents from presence evidence rather than assuming every planned specialist runs.'],
   ['Role and scoped mandate','Input and output contracts','Tool authorization and memory scope','Aegis state, evaluation cases, and failure recovery'],['vault','mcp','graph']],
  ['Product workshop','003 — Products MOC','The Collective',
   'A product note connects a user problem to a specification and evidence of delivery. A catalog entry does not mean a product is shipped or earning revenue.',
   ['Separate specification, prototype, deployed service, and paid adoption evidence.','Link technical dependencies, acceptance criteria, task records, and the owning division.','Helios Grid remains blocked pending SEC legal opinion. Preserve the hold and source record; do not turn its roadmap into a current offering.'],
   ['Problem and intended user','Observed product state','Acceptance criteria and dependency links','Delivery evidence and known limitations'],['bible','vault']],
  ['Team commons','004 — People MOC','The Collective',
   'People notes describe responsibilities and collaboration context from current records. They must not invent titles, ownership, or sensitive personal details.',
   ['Only JR Moyler and Devon Scott are cofounders. The current CFO spelling is Ahmad Muhammad.','Link responsibility to an existing division, project, or operating note. Leave unassigned responsibility unknown.','The historical Stanley Constant veto was removed October 1, 2026. Read Civic Core Fiduciary Veto for its superseded history.'],
   ['Current recorded name and role','Division and project responsibilities','Responsibility source','Open coordination question'],['bible','vault']],
  ['Control room','005 — Operations MOC','The Collective',
   'Operating procedures turn knowledge into repeatable work. Task records hold assignment and state; notes hold the work product and its evidence.',
   ['Read and claim a task, report presence, read existing notes, then append findings through the live API.','Send work to review with a result that identifies changed notes and unresolved decisions.','Tool connections need real authorization and observed health. A city terminal or sentinel does not grant external access.'],
   ['Trigger and required inputs','Procedure and authorized tools','Expected outputs and acceptance check','Failure recovery and escalation'],['vault','mcp']],
  ['Finance chamber','006 — Finance MOC','Quantum Ledger',
   'Finance records distinguish dated actuals, forecasts, assumptions, and targets. September 2026 company actuals are zero paying customers and $0 MRR.',
   ['Label source revenue figures as targets unless a current financial record verifies actual revenue.','Record assumptions and confidence for scenario models; never fabricate a price, balance, or funding event.','Mega Campus cost and power models are October 2026 estimates. The $6.54B figure belongs to the historical v3.0 model.'],
   ['Measure and reporting period','Actual, target, or estimate label','Assumptions and source','Decision and review evidence'],['bible']],
  ['Brand atelier','007 — Brand MOC','Nexus Labs',
   'Brand work follows current voice and visual standards. Source assets and dated approvals determine what can be used.',
   ['Read JR Voice Standard and current brand records before writing or producing assets.','Use the recorded division identity and palette. Do not borrow an accent simply because a scene would look brighter.','Keep claims tied to observed capability. Distinguish future plans from current operating products.'],
   ['Audience and purpose','Voice and design references','Source asset and usage scope','Approval record and delivery evidence'],['bible','vault']],
  ['Research observatory','008 — Research MOC','ZenFlow',
   'Research notes preserve questions, sources, findings, uncertainty, and implications. Separate what a source says from an inference about Collective AI.',
   ['Capture author or institution, publication date, source URL, and the question investigated.','Separate peer-reviewed work, preprints, vendor documentation, and internal observations.','Connect a finding to a relevant division and decision. Tool documentation in older matrices is a design reference, not current integration proof.'],
   ['Research question','Source and evidence type','Findings and inference boundary','Unknowns and follow-up test'],['vault','graph']],
  ['Delivery yard','009 — Projects MOC','Binary Loom',
   'A project has a bounded outcome, an acceptance check, and a visible next action. Notes contain delivery evidence, while tasks manage work assignment.',
   ['Use a project brief with problem, scope, dependencies, acceptance criteria, milestone evidence, and open decisions.','Link the owning division and related product; include current repository or deployment only when verified.','For collaboration spanning divisions, identify the contribution of each participating division; the current Synergy Mandate requires at least three active divisions per engagement.'],
   ['Outcome and scope','Acceptance criteria','Dependencies and work records','Milestone evidence, blockers, and next action'],['vault','bible']],
  ['Archive stacks','000 — Collective AI Knowledge Base','The Collective',
   'Historical records preserve decision context. Archive is not deletion and superseded material must not be silently presented as current canon.',
   ['Retain the original claim with its date and source. Add a superseded notice and replacement link.','Completed projects retain outcomes and lessons; deprecated agent versions retain evaluation history.','Use current AGENTS.md over conflicting June PDFs, especially division numbering, operating status, people, director names, and campus structure.'],
   ['Original source and effective date','Reason for supersession or completion','Replacement note','Outcome and lessons'],['vault','bible']],
  ['Physical systems lab','011 — Physical AI MOC','Animus Prime',
   'Physical AI records connect hardware, software, validation, and readiness evidence. Animus Prime is chartered; reference hardware is not automatically an operating product.',
   ['Separate simulation, prototype, bench test, physical validation, and deployment evidence.','Document interfaces, bill of materials source, constraints, safety scope, and recovery paths. Unknown costs stay unknown.','The current physical Mega Campus is 220 acres, 35 facilities, 2,045,000 square feet, and six districts. These are separate from thirteen virtual knowledge districts.'],
   ['System role and interfaces','Hardware and software dependencies','Simulation versus physical evidence','Readiness limits, safety gate, and next validation'],['bible','vault']],
  ['Daily log','005 — Operations MOC','The Collective',
   'Daily records preserve continuity through dated observations and outcomes. Do not create invented activity, wins, or agent health measurements.',
   ['Record priorities, completed work with evidence, blockers, learning, and observed agent health.','Meeting captures record actual attendees, decisions, and action items with known owners.','Weekly review identifies accomplishments, open loops, and next priorities; link to the work notes instead of repeating their full contents.'],
   ['Observed date and context','Priorities and completed work links','Blockers and decisions','Learning and next action'],['vault']]
];

const plan = [];
const plannedNames = new Set();
function add(name, folder, sections, anchors, type = 'handbook') {
  if (plannedNames.has(name)) throw new Error(`Duplicate planned note ${name}`);
  plannedNames.add(name);
  const body = `# ${name}\n\n${sections}\n\n## Linked records\n${anchors.map(n => `- ${link(requireName(n))}`).join('\n')}\n`;
  plan.push({ name, folder, body, fm: { type, tags: ['district-handbook', 'source-grounded'], source_status: 'distilled-with-current-canon-overrides' }, anchors });
}
for (let i = 0; i < folders.length; i++) {
  const [title,moc,division,purpose,steps,fields,keys] = configs[i];
  const residents = namesIn(folders[i]).filter(n => !/District Handbook/.test(n));
  const selected = [...new Set([moc, `${division} Division`, ...residents.filter(n => /Registry|Scorecard|Standard|Model|Charter|Runbook|Spec|MOC|Veto/.test(n)).slice(0, 7)])].filter(existing);
  add(`District Handbook — ${title}`, folders[i],
    `## District purpose\n${purpose}\n\nFolder: ${folders[i]}. This handbook describes the virtual knowledge district, not a physical campus district.\n\n## Work kit\n${steps.map(s => `- ${s}`).join('\n')}\n\n## Required record fields\n${fields.map(s => `- ${s}`).join('\n')}\n\n## Completion check\n- The source and its effective date are recorded.\n- Current facts and historical targets are distinct.\n- Linked division and hub notes exist.\n- The next action or unresolved question is stated.\n- An existing note is extended before a duplicate is created.\n\n## Source basis\n${citations(keys)}\n\nCurrent repository AGENTS.md overrides earlier source documents. Inventory, ownership, delivery state, and tool health must be read from current notes and services.`, selected);
}

const reconciliation = `## Authority rule\nThe current repository AGENTS.md, dated October 4, 2026, overrides disagreeing older Drive documents. Preserve historical facts with a superseded notice; do not silently erase them.\n\n## Reconciliation ledger\n| Topic | Older source | Current canon |\n| --- | --- | --- |\n| Division status | Some June documents call all twenty active | Nine operating and eleven chartered; 21–30 Pending Until Activation |\n| Division numbering | Numbering varies across June PDFs | Follow July numbering in AGENTS.md; VectorShift is one word |\n| CFO | Earlier spelling Ahmad Mohammed | Ahmad Muhammad |\n| Civic Core veto | June Bible grants Stanley Constant permanent veto | Removed October 1, 2026; retain history in Civic Core Fiduciary Veto |\n| Agent hierarchy | Earlier prompts and director codenames | HATAALII Tier 0.5, ZENITH alone Tier 1; current Agent Tier Registry and Director Codenames |\n| Revenue | Forecasts and ARR targets | September 2026 actuals: zero paying customers and $0 MRR |\n| Mega Campus | Earlier four districts and smaller facility manifests | September 16 register: 220 acres, 35 facilities, 2,045,000 sq ft, six physical districts |\n| Campus budgets | Earlier v3.0 $6.54B figure | October 2026 cost and power models are estimates; preserve version labels |\n| Helios Grid | Roadmap architecture | Still blocked pending SEC legal opinion; no inferred clearance |\n| Vault geography | Matrix lists eleven historical master folders | Thirteen current virtual knowledge districts follow b_districts.js and live folders |\n\n## Source handling\nOnly distilled findings and source metadata are imported. The expanded Company Bible is marked confidential/internal distribution only. Complete document bodies are not reproduced in the repository. Drive file availability does not authorize tool access or demonstrate current deployment.\n\n## Read sources\n${citations(['vault','bible','mcp','graph'])}\n\nSource folder: https://drive.google.com/drive/folders/1zDLaXV53JgvGpmXuzeZkijGnWL9EIIjs\nEverything Collective: https://drive.google.com/drive/folders/18EQ8w2ogW4UxPcvBeVh_Utdgq-1znLkv\n\n## Unresolved evidence\nCurrent tool connectivity, specialist deployment counts, product delivery state, prices, and new activation decisions must be verified from their present records. No source fetched establishes a separate thirteen-district physical campus.`;
add('Drive Source Reconciliation Ledger','05 - Operations',reconciliation,
  [rootMoc,'005 — Operations MOC','The Collective Division','Agent Tier Registry','Director Codenames','Civic Core Fiduciary Veto','Division Activation Scorecard'].filter(existing),'reference');
const templates = [
 ['Evidence Record Template','08 - Research','008 — Research MOC','ZenFlow',
  '## Question or claim\nunknown\n\n## Evidence\n- Source title and URL: unknown\n- Effective date: unknown\n- Evidence type: unknown\n- Observed result: unknown\n- Test environment: unknown\n\n## Interpretation\nSeparate source statements from inference. Record confidence and limits.\n\n## Next check\nunknown'],
 ['Decision Record Template','05 - Operations','005 — Operations MOC','The Collective',
  '## Decision context\nunknown\n\n## Options\nRecord options, costs from sources, dependencies, and tradeoffs.\n\n## Decision and rationale\nNot yet decided.\n\n## Responsibility and gate\n- Decision authority: unknown\n- Aegis level: unknown\n- Required evidence: unknown\n- Review date: unknown\n\n## Outcome review\nRecord observed outcome and replacement decision when superseded.'],
 ['Project Brief Template','09 - Projects','009 — Projects MOC','Binary Loom',
  '## Problem and outcome\nunknown\n\n## Scope\nunknown\n\n## Acceptance criteria\n- [ ] Define an observable completion check.\n\n## Dependencies and participation\nLink verified product, division, and task records. For an engagement, identify at least three active divisions and their contributions under the current Synergy Mandate.\n\n## Milestones and evidence\nNo milestone completion claimed.\n\n## Responsibility and next action\n- Owner: unknown\n- Due date: unknown\n- Next action: unknown\n- Blocker: unknown']
];
for (const [name,folder,moc,division,sections] of templates) add(name,folder,
 `## Template use\nCopy this structure into a subject-specific note. Replace unknown only with an observed fact.\n\n${sections}\n\n## Source basis\n${citations(['vault'])}`, [moc, `${division} Division`], 'template');

for (const n of plan) {
  for (const match of n.body.matchAll(/\[\[([^\]]+)\]\]/g)) if (!existing(match[1]) && !plannedNames.has(match[1])) throw new Error(`Unresolved planned link ${match[1]}`);
}
fs.writeFileSync(output, JSON.stringify({ mode: apply ? 'apply' : 'plan', authority: 'AGENTS.md', districts: folders, notes: plan }, null, 2) + '\n');
console.log(`Planned ${plan.length} notes across ${folders.length} districts. Plan: ${output}`);
if (apply) {
  // Search/read live state before every creation. Existing body is never replaced.
  async function live(name) {
    try { return (await call('notes.get', { name })).note; }
    catch (e) { if (/no such note/.test(e.message)) return null; throw e; }
  }
  await call('heartbeat', { status: 'working', ...(task ? { task } : {}), detail: 'Completing thirteen district handbooks from Drive sources and current canon' });
  let created = 0, appended = 0, skipped = 0;
  try {
    for (const n of plan) {
      await call('notes.search', { q: n.name, limit: 20 });
      const current = await live(n.name);
      const marker = '<!-- district-handbook-source-v1 -->';
      const body = n.body + `\n${marker}\n`;
      let result;
      if (!current) { result = await call('notes.upsert', { name: n.name, folder: n.folder, fm: n.fm, body, task, summary: 'Add source-grounded district work kit and current canon' }); created++; }
      else if (!current.body.includes(marker)) { result = await call('notes.append', { name: n.name, section: `## Source-grounded completion kit\n\n${body.replace(/^# .+\n/, '')}`, task, summary: 'Append missing source-grounded completion kit; preserve existing sections' }); appended++; }
      else skipped++;
      if (result?.unresolved?.length) throw new Error(`Unresolved live links for ${n.name}: ${result.unresolved.join(', ')}`);
      const hub = n.anchors.find(a => index[a]?.type === 'moc') || rootMoc;
      const hubNote = await live(hub);
      if (!hubNote) throw new Error(`Live hub missing: ${hub}`);
      if (!hubNote.body.includes(link(n.name))) {
        const reciprocal = await call('notes.append', { name: hub, section: `- ${link(n.name)} — district work kit and source-grounded records.`, task, summary: 'Link new district handbook or template from its existing hub' });
        if (reciprocal.unresolved?.length) throw new Error(`Unresolved reciprocal link in ${hub}`);
      }
      console.log(`${current ? 'Checked' : 'Created'} ${n.name}`);
    }
    console.log(JSON.stringify({ created, appended, skipped }));
  } finally { await call('heartbeat', { status: 'idle', detail: 'District note completion run finished' }); }
}
