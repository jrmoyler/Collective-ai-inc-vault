import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';
import {spawnSync} from 'node:child_process';

// Note reader (web-src/d_reader.js) and the vault canon report (scripts/canon.py).
const read=f=>fs.readFileSync(new URL('../'+f,import.meta.url),'utf8');
const src=read('web-src/d_reader.js');

function sandbox(){
  const mem=new Map();
  const store={get(k,d){return mem.has(k)?JSON.parse(mem.get(k)):d},set(k,v){mem.set(k,JSON.stringify(v))}};
  const ctx=vm.createContext({store,console,Math,JSON,Array,Map,Set,Number,String,Object,RegExp,setTimeout,clearTimeout,
    colorOf:n=>n.color||'#E8A33D',ago:ts=>'at '+ts});
  vm.runInContext(src+'\nthis.Reader=Reader;',ctx);
  return {R:ctx.Reader,T:ctx.Reader._test,mem};
}
const note=(id,name,folder,body,extra={})=>({id,name,folder,body,back:new Set(),out:new Set(),...extra});

test('wikilink targets split into note, heading and block',()=>{
  const {T}=sandbox();
  assert.deepEqual({...T.parseTarget('Agent Tier Registry#Tier 0.5')},{name:'Agent Tier Registry',anchor:'Tier 0.5',block:''});
  assert.deepEqual({...T.parseTarget('MCP Matrix^rule-1')},{name:'MCP Matrix',anchor:'',block:'rule-1'});
  assert.deepEqual({...T.parseTarget(' Plain ')},{name:'Plain',anchor:'',block:''});
  assert.equal(T.slug('Tier 0.5 — HATAALII'),'tier-0-5-hataalii');
  assert.equal(T.slug('[[Link]] heading'),'link-heading');
});

test('stats count words outside code, checklist progress, callouts and reading time',()=>{
  const {T}=sandbox();
  const body='# Title\n\nOne two three [[Some Note|alias]].\n\n```js\nconst ignored = 1 + 2 + 3;\n```\n- [x] done item\n- [ ] open item\n1. [X] numbered done\n> [!warning] Careful\n> text';
  const s=T.stats(body);
  assert.equal(s.tasks.total,3);assert.equal(s.tasks.done,2);
  assert.equal(s.callouts,1);assert.equal(s.headings,1);
  assert.ok(s.words>=10&&s.words<=16,'words '+s.words);
  assert.equal(s.minutes,1);
  assert.equal(T.stats('word '.repeat(1100)).minutes,5);
});

test('numeric cells: money, percents, counts and multipliers align right; words do not',()=>{
  const {T}=sandbox();
  for(const v of ['$21.7K','2,045,000','35','12%','$6.54B','-3','1.5x'])assert.ok(T.isNumeric(v),v);
  for(const v of ['unknown','Year 1 / 2025','v3.0 target','',' — '])assert.ok(!T.isNumeric(v),v);
});

test('backlink preview shows the linking line as plain text',()=>{
  const {T}=sandbox();
  const line=T.linkLine('# X\n- [ ] Ship [[Target Note|the target]] by Friday with **care**\nother','Target Note');
  assert.equal(line,'Ship Target Note by Friday with care');
  assert.equal(T.linkLine('see [[Target Note#Part]] here','Target Note'),'see Target Note here');
  assert.equal(T.linkLine('nothing','Target Note'),'');
});

test('folder siblings follow explorer order and stop at the ends',()=>{
  const {T}=sandbox();
  const a=note(0,'Note 2','F',''),b=note(1,'Note 10','F',''),c=note(2,'Note 1','F',''),x=note(3,'Other','G','');
  const s=T.siblings(a,[a,b,c,x]);
  assert.equal(s.prev.name,'Note 1');assert.equal(s.next.name,'Note 10');assert.equal(s.count,3);
  assert.equal(T.siblings(c,[a,b,c,x]).prev,null);
  assert.equal(T.siblings(b,[a,b,c,x]).next,null);
});

test('history rows collapse runs of the same editor, newest first, bounded',()=>{
  const {T}=sandbox();
  const rows=[{edited_by:'Claude Code',edited_at:'t5',version:5},{edited_by:'Claude Code',edited_at:'t4',version:4},{edited_by:'codex',edited_at:'t3',version:3},{edited_by:null,edited_at:'t2',version:2},{edited_by:'JR',edited_at:'t1',version:1},{edited_by:'codex',edited_at:'t0',version:0}];
  const e=T.editors(rows);
  assert.equal(e.length,4);
  assert.deepEqual([...e.map(r=>r.by)],['Claude Code','codex','unknown','JR']);
  assert.equal(e[0].n,2);assert.equal(e[0].v,5);
  assert.equal(T.editors(null).length,0);
});

test('resume position is stored per note, cleared at the ends and capped at 60 notes',()=>{
  const {T}=sandbox();
  T.resumeSet('A',.5);assert.equal(T.resumeGet('A'),.5);
  T.resumeSet('A',.99);assert.equal(T.resumeGet('A'),0,'finished notes are forgotten');
  T.resumeSet('B',.02);assert.equal(T.resumeGet('B'),0,'the top of a note is not a resume point');
  for(let i=0;i<80;i++)T.resumeSet('N'+i,.4);
  assert.equal(T.resumeGet('N79'),.4);assert.equal(T.resumeGet('N0'),0);
});

test('footer: backlinks with context, fly-to chips for linked notes, folder neighbours and history entry',()=>{
  const {T}=sandbox();
  const n=note(0,'Hub','00 - MOCs','# Hub\n[[Leaf]]',{updated_by:'codex',updated_at:'2026-10-06',version:3});
  const leaf=note(1,'Leaf','00 - MOCs','# Leaf\n- Back to [[Hub]] for the map',{color:'#7C3AED'});
  n.out.add(1);n.back.add(1);
  const html=T.footer(n,[n,leaf]);
  assert.match(html,/Linked from <span>1<\/span>/);
  assert.match(html,/class="rd-back" data-id="1"/);
  assert.match(html,/Back to Hub for the map/);
  assert.match(html,/Fly to <span>1<\/span>/);
  assert.match(html,/class="rd-chip" data-id="1" style="--c:#7C3AED" title="Fly to Leaf"/);
  assert.match(html,/<small>Next<\/small><b>Leaf<\/b>/);
  assert.match(html,/data-rd-tab="history"/);
  assert.match(html,/<b>codex<\/b> · v3/);
  const lonely=note(5,'<Alone>','X','x');
  const h2=T.footer(lonely,[lonely]);
  assert.match(h2,/No notes link here yet/);assert.ok(!h2.includes('<Alone>'),'names are escaped');
  assert.ok(!/Fly to/.test(h2),'no chip row without links');
  const many=note(9,'Many','Y','');for(let i=0;i<30;i++){many.out.add(10+i)}
  const all=[];all[9]=many;for(let i=0;i<30;i++)all[10+i]=note(10+i,'L'+i,'Z','');
  const h3=T.footer(many,all);
  assert.equal((h3.match(/class="rd-chip"/g)||[]).length,24,'chips are bounded');
  assert.match(h3,/All 30 links/);
});

test('meta strip reports reading time, checklist bar and link counts',()=>{
  const {T}=sandbox();
  const n=note(0,'N','F','- [x] a\n- [ ] b\nwords here',{updated_by:'hermes',version:2});n.back.add(3);
  const h=T.metaStrip(n);
  assert.match(h,/<b>1 min<\/b> read/);assert.match(h,/Checklist <b>1\/2<\/b>/);assert.match(h,/width:50%/);
  assert.match(h,/<b>1<\/b> in · <b>0<\/b> out/);assert.match(h,/v2 · hermes/);
});

test('wiring: the reader loads after the live layer and runs from renderSheet once per note render',()=>{
  const build=read('scripts/build_web.py');
  assert.match(build,/"d_live\.js", "d_reader\.js"/);
  const data=read('web-src/b_data.js');
  assert.match(data,/if\(typeof Reader!=="undefined"\)try\{Reader\.enhance\(sb,n\)\}catch/);
  assert.ok(!/requestAnimationFrame\(\s*loop|setInterval/.test(src),'no animation loop in the reader');
  assert.match(src,/\{passive:true\}/);
  assert.match(src,/prefers-reduced-motion:reduce/);
  for(const cls of ['rd-chip','rd-back','rd-resume','rd-more'])assert.match(src,new RegExp('\\.'+cls+'\\{[^}]*min-height:44px'),cls+' is a 44px target');
});

test('reader copy follows the voice standard',()=>{
  const copy=(src.match(/>[^<>{}$]{3,}</g)||[]).join(' ')+' '+(src.match(/"[A-Z][^"]{3,}"/g)||[]).join(' ');
  const banned=/\b(delve|leverage|robust|seamless|transformative|empower|elevate|game-changing|cutting-edge|innovative|tapestry)\b/i;
  assert.ok(!banned.test(src.replace(/^\/\/.*$/gm,'')),'no banned words in the reader');
  assert.ok(copy.length>0);
});

// ---------- canon report
const py=code=>spawnSync('python3',['-c',code],{cwd:new URL('../scripts/',import.meta.url).pathname,encoding:'utf8'});
const hasPy=py('import yaml').status===0;

test('canon report finds each rule and passes clean notes',{skip:!hasPy&&'python3 with pyyaml is not installed'},()=>{
  const r=py(`
import json, canon
N=lambda folder,name,body,fm=None:{"folder":folder,"name":name,"body":body,"fm":fm if fm is not None else {"type":"x","tags":["t"]}}
notes=[
 N("00 - MOCs","000 — Collective AI Knowledge Base","# Collective AI Knowledge Base\\n[[Good]] [[Bad Spelling]] [[Voice]] [[Veto]] [[Pending]] [[Old]] [[Quoted]]"),
 N("01","Good","# Good\\n[[000 — Collective AI Knowledge Base]]"),
 N("01","Bad Spelling","# Bad Spelling\\nThe Vector Shift hub. [[Good]]"),
 N("01","Voice","# Voice\\nWe leverage data. [[Good]]"),
 N("01","Quoted","# Quoted\\n> We leverage data.\\nThe course \\"Cutting-Edge AI\\".\\n## Banned\\ndelve, robust, seamless\\n\`\`\`text\\nseamless robust\\n\`\`\`\\n[[Good]]"),
 N("01","Veto","# Veto\\nStanley Constant holds the Civic Core veto. [[Good]]"),
 N("01","Veto Gone","# Veto Gone\\nThe Civic Core veto was removed Oct 1, 2026. [[Good]]"),
 N("01","Pending","# Pending\\nAstral Forge is active today. [[Good]]"),
 N("01","Pending Ok","# Pending Ok\\nAstral Forge is not active. [[Good]]"),
 N("01","Orphan","# Orphan\\n[[Good]]"),
 N("01","Dead End","Wrong heading\\nno links", {"type":"x"}),
 N("10 - Archive","Old","# Old\\nGone."),
 N("01","Aether Link Division","# Aether Link\\n[[Good]]"),
 N("Daily","2026-10-04","# Sunday, Oct 4, 2026\\n[[Good]]"),
]
f=canon.check(notes)
print(json.dumps(sorted([r,n] for r,n,d in f)))
`);
  assert.equal(r.status,0,r.stderr);
  const got=JSON.parse(r.stdout).map(([a,b])=>a+':'+b);
  const want=['archive:Old','dead-end:Dead End','dead-end:Old','fm:Dead End','h1:Dead End','orphan:Aether Link Division','orphan:Dead End','orphan:Orphan','orphan:Pending Ok','orphan:Veto Gone','pending:Pending','spelling:Bad Spelling','veto:Veto','voice:Voice'];
  assert.deepEqual(got,want);
});

test('build.py prints the canon report, keeps it report-only by default and can skip the index write',{skip:!hasPy&&'python3 with pyyaml is not installed'},()=>{
  const b=read('scripts/build.py');
  assert.match(b,/import canon/);assert.match(b,/--canon-strict/);assert.match(b,/--no-index/);
  assert.match(b,/if a\.canon_strict and canon_errors:\n\s+sys\.exit\(1\)/);
  const before=fs.readFileSync(new URL('../vault/_index.json',import.meta.url),'utf8');
  const r=spawnSync('python3',['scripts/build.py','--strict','--no-index'],{cwd:new URL('../',import.meta.url).pathname,encoding:'utf8'});
  assert.equal(r.status,0,r.stderr);
  assert.match(r.stdout,/canon: \d+ findings, \d+ errors/);
  assert.equal(fs.readFileSync(new URL('../vault/_index.json',import.meta.url),'utf8'),before,'--no-index leaves vault/_index.json alone');
});
