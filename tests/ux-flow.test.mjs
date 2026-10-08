import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';

// UX pass: first-run quality detection, the go-to palette sources, keyboard building order, the tracked first walk,
// district kit progress, undo, and the boot/title/live wiring that closes the dead ends between title, gate and city.
const read=f=>fs.readFileSync(new URL('../'+f,import.meta.url),'utf8');
const ux=read('web-src/g_ux.js');

function sandbox(extra={}){
  const mem=new Map();
  const store={get(k,d){return mem.has(k)?JSON.parse(mem.get(k)):d},set(k,v){mem.set(k,JSON.stringify(v))}};
  const ctx=vm.createContext({window:{},navigator:{},store,setTimeout,clearTimeout,setInterval,clearInterval,console,Date,Math,JSON,Array,Map,Set,Number,String,...extra});
  vm.runInContext(ux,ctx);
  return {UX:ctx.window.UX,store,mem,ctx};
}

test('first-run quality: phones, software renderers and weak laptops start on Low; capable desktops on High',()=>{
  const {UX}=sandbox();
  const q=env=>UX.detectQuality(env).q;
  assert.equal(q({gpu:'Mali-G57 MC2',memory:4,cores:8}),'low','Galaxy A15 class');
  assert.equal(q({gpu:'ANGLE (Google, Vulkan 1.3.0 (SwiftShader Device (Subzero)), SwiftShader driver)'}),'low');
  assert.equal(q({gpu:'ANGLE (Intel, Intel(R) UHD Graphics 620 Direct3D11 vs_5_0 ps_5_0, D3D11)',memory:8,cores:8}),'low');
  assert.equal(q({gpu:'Adreno (TM) 610',memory:6,cores:8}),'low');
  assert.equal(q({gpu:'ANGLE (NVIDIA, NVIDIA GeForce RTX 3060 Direct3D11 vs_5_0 ps_5_0, D3D11)',memory:8,cores:12}),'high');
  assert.equal(q({gpu:'ANGLE (Intel, Intel(R) Iris(R) Xe Graphics Direct3D11 vs_5_0 ps_5_0, D3D11)',memory:8,cores:8}),'high');
  assert.equal(q({gpu:'Adreno (TM) 730',memory:8,cores:8}),'high');
  assert.equal(q({gpu:'',memory:2,cores:8}),'low');
  assert.equal(q({gpu:'',cores:4}),'low');
  assert.equal(q({gpu:'Apple M2',saveData:true}),'low');
});

test('ensureQuality writes once and never overrides a stored choice',()=>{
  const a=sandbox({navigator:{deviceMemory:4,hardwareConcurrency:8}});
  assert.equal(a.UX.ensureQuality(),'low');
  assert.equal(a.store.get('vault.quality'),'low');assert.equal(a.store.get('vault.quality.auto'),true);
  assert.match(a.UX.qualityLabel(),/^Auto · Low/);
  const b=sandbox({navigator:{deviceMemory:2}});b.store.set('vault.quality','high');
  assert.equal(b.UX.ensureQuality(),'high');assert.equal(b.store.get('vault.quality.auto',null),null);
  b.UX.setQuality('low',true);assert.equal(b.store.get('vault.quality'),'low');assert.equal(b.store.get('vault.quality.auto'),false);
  b.UX.setQuality('auto',true);assert.equal(b.store.get('vault.quality'),'low');assert.equal(b.store.get('vault.quality.auto'),true);
});

test('keyboard stepping orders buildings by distance, skips gaps and is bounded',()=>{
  const {UX}=sandbox();
  const B=[{cx:50,cz:0},undefined,{cx:2,cz:1},{cx:-5,cz:0},{cx:NaN,cz:0},{cx:0,cz:20}];
  assert.deepEqual([...UX._test.nearbyIds(B,0,0)],[2,3,5,0]);
  assert.deepEqual([...UX._test.nearbyIds(B,0,0,2)],[2,3]);
  const many=Array.from({length:500},(_,i)=>({cx:i,cz:0}));
  assert.equal(UX._test.nearbyIds(many,0,0).length,24);
});

test('the first walk advances Warden, note, cable, task and finishes once',()=>{
  const {UX,store}=sandbox();
  assert.equal(UX.walk().finished,false);
  assert.deepEqual([...UX._test.STEPS.map(s=>s.id)],['warden','note','cable','task']);
  assert.equal(UX.mark('note'),true);assert.equal(UX.mark('note'),false,'a step counts once');
  assert.equal(UX._test.nextStep(UX.walk()).id,'warden');
  assert.equal(UX.mark('nonsense'),false);
  ['warden','cable','task'].forEach(id=>UX.mark(id));
  assert.equal(UX.walk().finished,true);assert.equal(UX._test.nextStep(UX.walk()),null);
  assert.ok(store.get('vault.ux.walk').done.task);
  for(const s of UX._test.STEPS)for(const t of [s.title,s.body,s.act])assert.ok(!/\b(delve|leverage|robust|seamless|transformative|empower|elevate|game-changing|cutting-edge|innovative|tapestry)\b/i.test(t),t);
});

test('arrival keeps the objective compact until the user chooses to expand it',()=>{
  for(const innerWidth of [390,1440]){
    const {UX,store}=sandbox({innerWidth});
    assert.equal(UX.walk().min,true,'compact first arrival at '+innerWidth);
    store.set('vault.ux.walk',{done:{},minUser:true,min:false});
    assert.equal(UX.walk().min,false,'explicit expanded preference is retained');
  }
});

test('district kit progress is per district and survives reloads',()=>{
  const {UX,store}=sandbox();
  assert.deepEqual([...UX.kitState('00 - MOCs',3)],[false,false,false]);
  assert.equal(UX.kitMark('00 - MOCs',0,true,true),true);
  assert.equal(UX.kitMark('00 - MOCs',0,true,true),false);
  UX.kitMark('Daily',2,true,true);
  assert.deepEqual([...UX.kitState('00 - MOCs',3)],[true,false,false]);
  assert.deepEqual([...UX.kitState('Daily',3)],[false,false,true]);
  assert.deepEqual(store.get('vault.ux.kit')['00 - MOCs'],[true]);
});

test('undo runs once, and hints show once per id',()=>{
  const {UX}=sandbox();let n=0;
  UX.undo('Hidden.',()=>n++);assert.equal(UX.runUndo(),true);assert.equal(UX.runUndo(),false);assert.equal(n,1);
  assert.equal(UX.hint('note','Alt ← goes back.'),true);assert.equal(UX.hint('note','Alt ← goes back.'),false);
});

test('go-to palette: exact names first, > narrows to actions, every query offers full-text search',()=>{
  const NOTES=[{id:0,name:'🏠 Home',folder:'',fm:{type:'home'}},{id:1,name:'Agent Tier Registry',folder:'02 - ZenFlow',fm:{}},{id:2,name:'Tier notes',folder:'Daily',fm:{}}];
  const Districts={all:[{folder:'02 - ZenFlow',title:'Agent foundry'}],get:f=>({folder:f,title:'Agent foundry'}),notesFor:()=>[NOTES[1]],worldTop:n=>n.folder||'00 - MOCs'};
  const {UX}=sandbox({NOTES,Districts,byName:new Map(NOTES.map(n=>[n.name,n]))});
  const groups=UX._test.sources('agent tier registry');
  const notes=groups.find(g=>g.label==='Notes');assert.equal(notes.items[0].label,'Agent Tier Registry');
  assert.equal(groups.at(-1).label,'Search');
  const acts=UX._test.sources('>quality');assert.ok(acts.every(g=>g.label==='Actions'));assert.ok(acts[0].items.some(i=>i.label==='Quality: Auto'));
  const empty=UX._test.sources('');assert.ok(empty.some(g=>g.label==='Districts'));assert.ok(empty.some(g=>g.label==='Start here'));
  assert.ok(UX._test.score('Agent Tier Registry','agent')>UX._test.score('Agent Tier Registry','registry'));
  assert.equal(UX._test.score('Atlas','zzz'),0);
});

test('boot never strands the user: resumable steps, retry card, UX wiring before the first open',()=>{
  const boot=read('web-src/e_boot.js');
  assert.match(boot,/catch\(e\)\{console\.warn\(e\);if\(typeof UX!=="undefined"\)UX\.fatal\(e,enter\)/);
  assert.match(boot,/if\(!done\.notes\)\{/);assert.match(boot,/Campus\.boot\(\);done\.city=true\}/);assert.match(boot,/if\(!done\.live\)\{/);assert.match(boot,/if\(!done\.sub\)\{Live\.subscribe\(\);done\.sub=true\}/);assert.doesNotMatch(boot,/if\(done\.city\)return;/,'a retry after the city is up must still start the live layer');
  assert.ok(boot.indexOf('UX.afterEnter()')<boot.indexOf('if(!Campus.ok()){open('),'palette and breadcrumbs wired before the first open');
  assert.match(boot,/UX\.ensureQuality\(\)/);
  const build=read('scripts/build_web.py');assert.match(build,/"g_journey\.js", "g_ux\.js", "f_title\.js"/);
});

test('title: inert app behind it, quality detected before its renderer, Auto setting, labelled skip',()=>{
  const title=read('web-src/f_title.js');
  assert.match(title,/aria-modal","true"/);assert.match(title,/appInert\(true\)/);assert.match(title,/appInert\(false\)/);
  assert.ok(title.indexOf('UX.ensureQuality()')<title.indexOf('const city=makeCity(canvas,quality)'));
  assert.match(title,/<button data-v="auto">Auto<\/button>/);assert.match(title,/aria-label="Skip intro"/);
  assert.match(title,/aria-pressed/);
});

test('live quality, background-tab throttling and the journey checklist are wired',()=>{
  const campus=read('web-src/c_campus.js');assert.match(campus,/applyQuality:\(\)=>\{const t=applyQuality\(\);if\(renderer\)resize\(\);return t\}/);
  const live=read('web-src/d_live.js');
  assert.match(live,/setInterval\(\(\)=>\{if\(document\.hidden\)return;syncPeople\(\);pushAgents\(\);drawFloor\(\)\},10000\)/);
  assert.match(live,/setInterval\(\(\)=>\{if\(connected&&!document\.hidden\)trackSelf\(\)\},1000\)/);
  assert.match(live,/if\(signature===lastPositionSignature&&Date\.now\(\)-lastTrack<10000\)return/,'trackSelf dedupes unchanged positions for 10 s');
  const journey=read('web-src/g_journey.js');
  assert.match(journey,/'journey-kit'/);assert.match(journey,/UX\.kitMark\(top,i,box\.checked,true\)/);
  assert.match(journey,/UX\.undo\(/);assert.match(journey,/async function persist\(action,extra=\{\},target\)/);
  // palette and stepping keys are documented in the shortcut sheet
  assert.match(ux,/Step through nearby buildings/);assert.match(ux,/role","combobox"/);assert.match(ux,/aria-activedescendant/);
  assert.match(ux,/min-height:44px/);
});

test('UX in a real browser: palette, stepping, coach, crumbs, offline pill and retry card, desktop and phone',async()=>{
  const {chromium}=await import('playwright');
  const head=read('web-src/a_head.html');const html=head.split('<script')[0].replace(/<link\b[^>]*>/g,'');
  const browser=await chromium.launch({headless:true,args:['--no-sandbox']});
  // Minimal stand-ins for the shared globals the UX module reaches (b_data, Campus, Guides, Live); no WebGL needed.
  const stubs=`var mem=new Map();window.store={get(k,d){return mem.has(k)?JSON.parse(mem.get(k)):d},set(k,v){mem.set(k,JSON.stringify(v))}};/* about:blank has no localStorage */
    var NOTES=[{id:0,name:'🏠 Home',folder:'',fm:{type:'home'},out:new Set([1]),back:new Set()},{id:1,name:'Agent Tier Registry',folder:'02 - ZenFlow/Routing',fm:{},out:new Set(),back:new Set([0])},{id:2,name:'Daily log',folder:'Daily',fm:{},out:new Set(),back:new Set()}];
    var byName=new Map(NOTES.map(n=>[n.name,n])),cur=null,opened=[],sheet={view:'note',atab:'floor'},sheetOpened=[];
    function open(n){cur=n;opened.push(n.name);updateCrumb()}
    function openSheet(v){sheet.view=v;sheetOpened.push(v+':'+sheet.atab)}
    function closeSheet(){}
    function updateCrumb(){document.querySelector('#crumb').innerHTML=cur?'Campus › <b>'+cur.name+'</b>':'Campus'}
    function openSwitcher(q){window.switched=q}
    var focused=[],flown=[];
    var Campus={ok:()=>true,buildings:()=>[{cx:0,cz:0},{cx:3,cz:0},{cx:40,cz:0}],position:()=>({x:0,z:0,yaw:0,walking:false}),focus:n=>focused.push(n.name),
      districts:()=>[{top:'02 - ZenFlow',name:'ZenFlow',color:'#3B82F6',count:1},{top:'Daily',name:'Daily',color:'#888',count:1}],flyDistrict:t=>flown.push(t),overview:()=>flown.push('overview'),toggleWalk(){},cycleTime(){},flyTo:()=>true,agentPos:()=>[0,0,0],applyQuality:()=>'low'};
    var Guides={talk:t=>{window.talked=t;return true},isTalking:()=>!!window.talked,list:()=>[{top:'02 - ZenFlow',name:'ZenFlow',color:'#3B82F6',open:2}]};
    var Live={snapshot:()=>({agents:[{id:'codex',name:'Codex',color:'#fff'}],tasks:[]})};`;
  try{
    for(const viewport of [{width:1440,height:900},{width:390,height:844}]){
      const page=await browser.newPage({viewport,reducedMotion:'reduce',hasTouch:viewport.width<500});
      try{
        const errors=[];page.on('pageerror',e=>errors.push(e.message));
        await page.setContent(html);
        await page.addScriptTag({content:stubs});
        await page.addScriptTag({content:read('web-src/b_districts.js')+'\nwindow.Districts=Districts;'});
        await page.addScriptTag({content:read('web-src/b_hud.js')});
        await page.addScriptTag({content:read('web-src/g_ux.js')});
        await page.evaluate(()=>{document.querySelector('#loading')?.remove();UX.afterEnter()});
        // the HUD button is a labelled 44 px target on phones and sits in the top bar
        const go=await page.evaluate(()=>{const b=document.querySelector('#uxGo');const r=b.getBoundingClientRect();return {h:r.height,label:b.getAttribute('aria-label'),parent:b.parentElement.className}});
        assert.match(go.label,/Go to/);assert.equal(go.parent,'hudtop');if(viewport.width<500)assert.ok(go.h>=44,`go button ${go.h}`);
        // Ctrl+K opens the palette over an inert app; typing filters; Enter flies to the note; focus comes back
        await page.evaluate(()=>document.querySelector('#uxGo').focus());
        await page.keyboard.press('Control+k');
        const p1=await page.evaluate(()=>({open:!document.querySelector('#uxPal').hidden,inert:document.querySelector('#app').inert,focus:document.activeElement.id,opts:document.querySelectorAll('#uxPalL [role=option]').length}));
        assert.deepEqual([p1.open,p1.inert,p1.focus],[true,true,'uxPalQ']);assert.ok(p1.opts>3);
        await page.keyboard.type('tier reg');
        const p2=await page.evaluate(()=>{const on=document.querySelector('#uxPalL .on');return {first:on?.querySelector('b').textContent,sel:on?.getAttribute('aria-selected'),active:document.querySelector('#uxPalQ').getAttribute('aria-activedescendant')===on?.id,h:on?.getBoundingClientRect().height}});
        assert.equal(p2.first,'Agent Tier Registry');assert.equal(p2.sel,'true');assert.equal(p2.active,true);assert.ok(p2.h>=44,`option ${p2.h}`);
        await page.keyboard.press('Enter');
        const p3=await page.evaluate(()=>({open:!document.querySelector('#uxPal').hidden,inert:document.querySelector('#app').inert,opened:opened.at(-1),focus:document.activeElement.id,crumb:[...document.querySelectorAll('#crumb .ux-cb')].map(b=>b.textContent),district:Districts.get(Districts.worldTop(NOTES[1])).title,current:document.querySelector('#crumb [aria-current]')?.textContent,walk:UX.walk().done.note>0}));
        assert.deepEqual([p3.open,p3.inert,p3.opened,p3.focus],[false,false,'Agent Tier Registry','uxGo']);
        assert.deepEqual(p3.crumb,['Campus',p3.district]);assert.equal(p3.current,'Agent Tier Registry');assert.equal(p3.walk,true);
        // > narrows to actions; Escape closes without running anything
        await page.keyboard.press('Control+k');await page.keyboard.type('>board');
        assert.equal(await page.evaluate(()=>[...document.querySelectorAll('#uxPalL .ux-pal-g')].map(g=>g.textContent).join()),'Actions');
        await page.keyboard.press('Escape');assert.equal(await page.evaluate(()=>document.querySelector('#uxPal').hidden),true);
        // [ ] step through buildings nearest first, announce, and Enter opens the chosen one
        await page.evaluate(()=>{document.activeElement.blur();focused.length=0});
        await page.keyboard.press(']');await page.keyboard.press(']');
        const st=await page.evaluate(()=>({focused:[...focused],cue:document.querySelector('.ux-cue')?.textContent}));
        assert.deepEqual(st.focused,['🏠 Home','Agent Tier Registry']);assert.match(st.cue,/2 of 3 nearby · Agent Tier Registry/);
        await page.waitForFunction(()=>/Enter opens it/.test(document.querySelector('#uxLive').textContent));
        await page.keyboard.press('Enter');assert.equal(await page.evaluate(()=>opened.at(-1)),'Agent Tier Registry');
        await page.keyboard.press('}');assert.deepEqual(await page.evaluate(()=>flown.at(-1)),'02 - ZenFlow');
        // the coach: visible, inside the viewport, step 1 runs the Warden, skip hides with undo
        await page.evaluate(()=>UX.showWalk(true));
        const c=await page.evaluate(()=>{const el=document.querySelector('#uxCoach');const r=el.getBoundingClientRect();const pri=el.querySelector('.ux-coach-act .pri');return {vis:!el.hidden,right:r.right<=innerWidth,left:r.left>=0,title:el.querySelector('.ux-coach-t b').textContent,pri:pri.textContent,ph:pri.getBoundingClientRect().height}});
        assert.equal(c.vis,true);assert.ok(c.right&&c.left);assert.equal(c.title,'Meet a Warden');assert.equal(c.pri,'Fly to a Warden');if(viewport.width<500)assert.ok(c.ph>=44,`coach button ${c.ph}`);
        await page.click('#uxCoach .ux-coach-act .pri');
        await page.waitForFunction(()=>UX.walk().done.warden>0);
        assert.equal(await page.evaluate(()=>window.talked===Districts.worldTop(cur)),true,'the Warden of the district you are in');
        await page.click('#uxCoach .ux-link');
        assert.equal(await page.evaluate(()=>document.querySelector('#uxCoach').hidden),true);
        await page.evaluate(()=>document.activeElement?.blur());await page.keyboard.press('Control+z');
        assert.equal(await page.evaluate(()=>document.querySelector('#uxCoach').hidden),false,'Ctrl+Z restores the walk');
        // offline pill in the top bar, then back online
        await page.context().setOffline(true);await page.waitForFunction(()=>document.querySelector('.hudtop .ux-net:not([hidden])'));
        await page.context().setOffline(false);await page.waitForFunction(()=>document.querySelector('.ux-net')?.hidden===true);
        // retry card: modal, focused, and Try again resumes
        await page.evaluate(()=>{window.tries=0;UX.fatal(new Error('fetch failed'),async()=>{window.tries++})});
        const f=await page.evaluate(()=>({role:document.querySelector('.ux-fail').getAttribute('role'),focus:document.activeElement.textContent}));
        assert.equal(f.role,'alertdialog');assert.equal(f.focus,'Try again');
        await page.keyboard.press('Enter');await page.waitForFunction(()=>window.tries===1);
        // the shortcut sheet lists the new keys
        assert.match(await page.evaluate(()=>document.querySelector('#keys').textContent),/Step through nearby buildings/);
        const wide=await page.evaluate(()=>[...document.querySelectorAll('[class*=ux-]:not([hidden]), [class*=ux-]:not([hidden]) *')].filter(e=>!e.closest('#crumb')).concat([document.querySelector('#crumb')]).filter(e=>e.getBoundingClientRect().right>innerWidth+1).slice(0,6).map(e=>e.tagName+'#'+e.id+'.'+e.className+':'+Math.round(e.getBoundingClientRect().right)).join(' '));
        assert.equal(wide,'','UX surfaces stay inside the viewport at '+viewport.width);
        assert.deepEqual(errors,[]);
      }finally{await page.close()}
    }
  }finally{await browser.close()}
});
