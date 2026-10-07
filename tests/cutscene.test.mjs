// Title cinematic: the shot list, its timings and beats, the cue timelines (full, sting, still), the skip and
// reduced-motion paths, the shared modules it films, and a real-browser pass through every shot on a phone viewport.
import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import http from 'node:http';
import path from 'node:path';
import vm from 'node:vm';
import {fileURLToPath} from 'node:url';
const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..');
const read=f=>fs.readFileSync(path.join(root,f),'utf8');
const src=read('web-src/f_title.js');
function load(){
  const ctx={window:{matchMedia:()=>({matches:false})},localStorage:{getItem:()=>null,setItem(){}},console};
  vm.createContext(ctx);vm.runInContext(src+'\nglobalThis.T=Title;',ctx);return ctx.T;
}
const T=load(),{SHOTS,SHOT,CUT,CAPS,BEATS,SFX_OF,timeline,plan,liveAt,moonPhase}=T._test;
const J=x=>JSON.parse(JSON.stringify(x));// values from the vm realm compare by structure
const BANNED=/\b(delve|leverage|robust|seamless|transformative|empower|elevate|game-changing|cutting-edge|innovative|tapestry)\b/i;

test('shot list: eight shots in story order, 2.8 s apart, each crossfading 0.6 s into the next',()=>{
  assert.deepEqual(J(SHOTS.map(s=>s.id)),['sky','shore','gate','facades','sentinels','write','warden','dawn']);
  SHOTS.forEach((s,i)=>{assert.equal(s.a,+(i*2.8).toFixed(2),s.id+' start');if(i<SHOTS.length-1){assert.equal(+(s.b-SHOTS[i+1].a).toFixed(2),.6,s.id+' crossfade');assert.ok(SHOTS[i+1].a-s.a>=2.8-1e-9)}});
  assert.equal(SHOTS.at(-1).b,1e9,'dawn holds under the wordmark and the menu');
  assert.equal(CUT.dawn,19.6);assert.equal(CUT.end,26.2);assert.deepEqual(J(CUT.cuts),J(SHOTS.slice(1).map(s=>s.a)));
});
test('liveAt: one shot, or two inside a crossfade with a 0..1 weight; past the end it holds dawn',()=>{
  const at=t=>{const L=liveAt(t);return [L.A.id,L.B&&L.B.id,+L.k.toFixed(3)]};
  assert.deepEqual(at(1),['sky',null,0]);assert.deepEqual(at(3.1),['sky','shore',.5]);assert.deepEqual(at(9.9),['facades',null,0]);
  assert.deepEqual(at(17.1),['write','warden',.5]);assert.deepEqual(at(CUT.end),['dawn',null,0]);assert.deepEqual(at(500),['dawn',null,0]);
  for(let t=0;t<CUT.end;t+=.05){const L=liveAt(t);assert.ok(L.k>=0&&L.k<=1);if(L.B)assert.equal(SHOTS.indexOf(L.B),SHOTS.indexOf(L.A)+1)}
  assert.equal(liveAt(1),liveAt(2),'the live pair is one reused object (no per-frame allocation)');
});
test('beats land inside their own shot, clear of the crossfades, and every sound beat names a real VaultAudio cue',()=>{
  const inside=(id,t)=>assert.ok(t>=SHOT[id].a+.3&&t<=SHOT[id].b-.6,`${id} beat at ${t}`);
  inside('gate',BEATS.gate);inside('facades',BEATS.door);inside('sentinels',BEATS.lift);inside('sentinels',BEATS.land);inside('write',BEATS.write);inside('warden',BEATS.greet);
  assert.ok(BEATS.land-BEATS.lift>=1.4,'the lift ride lasts long enough to read');
  const L=BEATS.lamps;inside('shore',L.at);inside('shore',L.at+(L.n-1)*L.step);
  assert.ok(BEATS.lampsOff>CUT.dawn&&BEATS.lampsOff<CUT.end,'lamps go out during the dawn shot');
  const audio=read('web-src/b_audio.js');
  for(const [beat,cue] of Object.entries(SFX_OF))assert.match(audio,new RegExp(`'${cue.replace('.','\\.')}':`),`${beat} -> ${cue}`);
  assert.deepEqual(Object.values(SFX_OF).sort(),['district.gate','note.write','sentinel.land','sentinel.lift','ui.open','warden.blip','warden.blip'].sort());
});
test('full timeline: sorted, ends on the menu, captions inside their shots, no banned words',()=>{
  const {full,sting,still}=J(timeline());
  for(let i=1;i<full.length;i++)assert.ok(full[i][1]>=full[i-1][1],'sorted at '+full[i][0]);
  assert.deepEqual(full.at(-1),['menu',CUT.end]);assert.deepEqual(full[0],['slate',.6]);
  assert.ok(full.every(c=>c[1]>=0&&c[1]<=CUT.end));
  const names=full.map(c=>c[0]);
  for(const k of ['gate','door','lift','land','write','greet'])assert.equal(names.filter(n=>n==='fx:'+k).length,1,k);
  assert.equal(names.filter(n=>n==='fx:lamp').length,BEATS.lamps.n);assert.equal(names.filter(n=>n==='fx:blip').length,6);
  for(const id of [...Object.keys(CAPS),'warden']){const c=full.find(x=>x[0]==='cap:'+id);assert.ok(c,id);assert.ok(c[1]>=SHOT[id].a&&c[1]<SHOT[id].b-.6,id+' caption inside its shot')}
  for(const [n,txt] of Object.values(CAPS)){assert.match(n,/^0[1-5]$/);assert.ok(!BANNED.test(txt),txt);assert.ok(txt.length<=34,txt+' fits a 320 px caption line')}
  // wordmark lands in the dawn shot, in order
  const at=n=>full.find(c=>c[0]===n)[1];assert.ok(CUT.dawn<at('letters')&&at('letters')<at('sweep')&&at('sweep')<at('sub')&&at('sub')<at('rule')&&at('rule')<at('tag')&&at('tag')<CUT.end);
  // sting and still keep their contracts: the sting compresses titles to 1.5 s, the still shows everything at 0
  assert.deepEqual(sting.at(-1),['menu',1.5]);assert.ok(still.every(c=>c[1]===0));assert.deepEqual(still.map(c=>c[0]),['letters','sub','rule','tag','menu']);
  assert.ok(!sting.concat(still).some(c=>/^(fx|cap):/.test(c[0])),'no beats or captions outside the cold open');
});
test('plan: reduced motion always gets the still, a repeat visit or the setting off gets the sting',()=>{
  assert.equal(plan({reduced:true,seenToday:false,cutOn:true}),'still');assert.equal(plan({reduced:true,seenToday:true,cutOn:false}),'still');
  assert.equal(plan({reduced:false,seenToday:true,cutOn:true}),'sting');assert.equal(plan({reduced:false,seenToday:false,cutOn:false}),'sting');
  assert.equal(plan({reduced:false,seenToday:false,cutOn:true}),'full');
});
test('skip and reduced motion: skip jumps to the menu without replaying beats; reduced motion renders one still dawn frame',()=>{
  const start=src.slice(src.indexOf('function start(){'));
  assert.match(start,/function skip\(\)\{gesture\(\);if\(!inMenu\)\{clock=CUT\.end;toMenu\(\)\}\}/);
  assert.match(start,/if\(c\[0\]!=="menu"&&!c\[0\]\.startsWith\("fx:"\)&&!c\[0\]\.startsWith\("cap:"\)\)fire\(c\[0\]\)/,'toMenu fires only the wordmark state cues');
  assert.match(start,/function fx\(name\)\{if\(inMenu\|\|cue!==FULL\)return;/,'beats are silent after skip and outside the full cutscene');
  assert.match(start,/function caption\(id\)\{if\(inMenu\)return;/);
  assert.match(start,/function still\(\)\{if\(city\)try\{city\.render\(CUT\.end,0,0\)\}catch\(e\)\{\}\}/);
  assert.match(start,/if\(noMotion\)\{toMenu\(\);still\(\);window\.addEventListener\("resize",still\)\}else raf=requestAnimationFrame\(frame\)/);
  assert.match(start,/let cue=TL\[plan\(\{reduced:noMotion,seenToday,cutOn\}\)\]/);
  assert.match(start,/aria-label="Skip intro"/);
  // the picture honours reduced motion too: the lighthouse holds still and the data motes stop
  assert.match(src,/beam\.rotation\.y=REDUCED\?\.6:vclk\*\.9/);assert.match(src,/pv\[q\]\*\.06\*\(REDUCED\?0:1\)/);
});
test('the score follows the shot list: one bass pulse per cut, never a negative WebAudio time, at any join point',()=>{
  const section=src.slice(src.indexOf('// ---- shot list.'),src.indexOf('// ---- the picture:'));
  for(const off of [0,4.2,CUT.dawn,CUT.end-.5,CUT.end]){
    let bass=0;const param=()=>({value:0,setValueAtTime(v,t){assert.ok(t>=0&&Number.isFinite(t),'set '+t)},linearRampToValueAtTime(v,t){assert.ok(t>=0&&Number.isFinite(t),'ramp '+t)},exponentialRampToValueAtTime(v,t){assert.ok(v>0&&t>=0,'exp '+t)},cancelScheduledValues(){}});
    const node=()=>({connect(){return this},gain:param(),frequency:param(),detune:param(),Q:param(),delayTime:param(),start(t){assert.ok(t>=0,'start '+t)},stop(t){if(t!==undefined)assert.ok(t>=0,'stop '+t)}});
    class AC{constructor(){this.currentTime=3;this.state='running';this.destination=node()}createGain(){return node()}createBiquadFilter(){return node()}createDelay(){return node()}createOscillator(){const o=node();Object.defineProperty(o.frequency,'value',{set(v){if(v===36.71)bass++},get(){return 0}});return o}close(){}}
    const ctx={window:{AudioContext:AC},S:{get:()=>true},K:{sound:'vault.sound'},clamp:(v,a,b)=>Math.max(a,Math.min(b,v)),setTimeout:()=>0,clearTimeout(){}};
    vm.createContext(ctx);vm.runInContext(section+`\nScore.start(${off});`,ctx);
    if(off===0)assert.equal(bass,CUT.cuts.length+1,'a pulse on each of the seven cuts and under the gold sweep');
  }
});
test('moon phase uses the campus formula (0 new, 0.5 full)',()=>{
  assert.ok(Math.abs(moonPhase(Date.UTC(2000,0,6,18,14)))<1e-9);assert.ok(Math.abs(moonPhase(Date.UTC(2000,0,6,18,14)+29.530588853/2*864e5)-.5)<1e-6);
  assert.match(read('web-src/c_campus.js'),/function moonPhase\(now=Date\.now\(\)\)\{const days=\(now-Date\.UTC\(2000,0,6,18,14\)\)\/864e5;return\(\(days\/29\.530588853\)%1\+1\)%1\}/);
});
test('the title films the shared modules instead of copies, and hands their state back before the city boots',()=>{
  for(const re of [/VFX\.INK_GLSL/,/VFX\.ink\(/,/VFX\.district\(/,/VFX\.trail\(/,/VFX\.arrive\(/,/VFX\.linkMaterial\(/,/VFX\.atmosphere\(/,/VFX\.weatherFor\(/,/VFX\.grade\(/,/VFX\.guardContext\(canvas/,
    /DistrictLook\.paintCourt\(/,/DistrictLook\.patchGround\(/,/DistrictLook\.build\(/,/DistrictLook\.enter\(CT\)/,/DistrictAssets\.build\(/,/Facades\.signal\(/,/Facades\.build\(/,/Facades\.setDoor\(/,/Guides\.costume\(/,/SentinelMesh\.emote\(SPECIAL\.warden,"greet"/])
    assert.match(src,re,String(re));
  const dispose=src.slice(src.indexOf('  function dispose(){ctxDone=true'),src.indexOf('  return{render,dispose,beat'));
  assert.match(dispose,/VFX\.dispose\(\);VFX\.setWeather\(null\)/);assert.match(dispose,/DistrictLook\.reset\(\)/);assert.match(dispose,/costume\.undress\(\)/);
  assert.ok(dispose.indexOf('DistrictLook.reset')<dispose.indexOf('scene.traverse'),'shared materials leave before the scene is disposed');
  assert.match(src,/DistrictAssets\.build\([^;]*,null\)/,'no env map is built on the title renderer (SentinelMesh caches one per page)');
  assert.match(read('web-src/c_npc.js'),/function costume\(m,top,color,name\)\{const g=\{m,top,name,color,arch:archOf\(top,0\)\};dress\(g\);return \{arch:g\.arch,line:voiceOf\(g\)\.open\(g\)/);
  // phone performance: the frame path allocates nothing and every material compiles before the first shot
  const render=src.slice(src.indexOf('  function render(t,time,orbit){'),src.indexOf('  function dispose(){ctxDone=true'));
  assert.ok(!/new |\.filter\(|\.map\(|=>/.test(render),'render() allocates no objects, arrays or closures');
  assert.match(src,/r\.compile\(scene,camA\)/);assert.match(src,/phone\?1\.5:hi\?2:1/);assert.match(src,/VFX\.budget\(tier\)\.atmos/);
});
test('DistrictLook.reset clears the layout, the lit gateway and the cached materials',()=>{
  class V4{set(){return this}}class C{set(){return this}convertSRGBToLinear(){return this}}
  const ctx={THREE:{Vector4:V4,Color:C}};vm.createContext(ctx);vm.runInContext(read('web-src/b_districts.js')+'\nglobalThis.DL=DistrictLook;',ctx);
  const DL=ctx.DL,d={top:'11 - Physical AI',x:0,z:0,w:72,d:96,color:'#22D3EE'};
  DL.bind([d],{},[]);assert.equal(DL.enter(d.top),true);assert.equal(DL.stats().active,d.top);const lamp=DL.uniforms.uLamp;
  DL.reset();assert.equal(DL.stats().districts,0);assert.equal(DL.stats().active,null);assert.equal(DL.uniforms.uDistOn.value,0);assert.equal(DL.uniforms.uDistActive.value,-1);
  assert.notEqual(DL.uniforms.uLamp,lamp,'the next build binds a fresh lamp uniform');assert.equal(DL.enter(d.top),false);
});
test('in-world cutscenes: the district entry lands with the flight, Wardens greet and frame the escort arrival',()=>{
  const campus=read('web-src/c_campus.js'),npc=read('web-src/c_npc.js');
  assert.match(campus,/showDistrict\(d,true,!!flight\);if\(flight\)entryAt=\{d,at:flight\.t0\+Math\.max\(0,flight\.dur-\.55\)\}/);
  assert.match(campus,/function districtMoment\(d\)\{[^}]*DistrictLook\.enter\(d\.top\);if\(VFXOK\)VFX\.district\(d\);/);
  assert.match(campus,/VaultAudio\.sfx\("district\.gate",\{district:d\.top/);assert.match(campus,/stepEntry\(\);\n  if\(stepFlight\(\)\)/);
  assert.match(npc,/VFX\.ring\(g\.x,\.3,g\.z,g\.color,4\.5/);assert.match(npc,/VaultAudio\.sfx\("warden\.blip",\{voice:g\.arch/);
  assert.match(npc,/if\(!walking\)Campus\.flyAt\(door\.x,door\.z,1\.5,28,\.3\)/);assert.match(npc,/VFX\.ring\(door\.x,\.3,door\.z,g\.color,3\.2,\{column:9/);
});

// ---- real browser: the built page, production headers, every shot rendered on a phone viewport, then skip; and the
// reduced-motion still. SwiftShader is slow, so the clock is held and each shot is sought, not played in real time.
test('browser: every shot renders without errors on a 390x844 phone, skip lands on the menu, reduced motion is a still',{timeout:240000},async()=>{
  const {chromium}=await import('playwright');
  const web=path.join(root,'web');const mime={'.html':'text/html','.js':'text/javascript','.css':'text/css','.json':'application/json','.svg':'image/svg+xml','.webp':'image/webp','.png':'image/png','.woff2':'font/woff2'};
  const headers=(JSON.parse(read('vercel.json')).headers.find(h=>h.source==='/(.*)')?.headers)||[];
  const server=http.createServer((q,s)=>{const u=q.url.split('?')[0];const f=path.join(web,decodeURIComponent(u==='/'?'/index.html':u));for(const h of headers)s.setHeader(h.key,h.value);try{s.setHeader('content-type',mime[path.extname(f)]||'application/octet-stream');s.end(fs.readFileSync(f))}catch{s.statusCode=404;s.end()}});
  await new Promise(r=>server.listen(0,'127.0.0.1',r));const url='http://127.0.0.1:'+server.address().port+'/';
  const browser=await chromium.launch({headless:true,args:['--no-sandbox','--use-angle=swiftshader','--enable-unsafe-swiftshader']});
  try{
    const run=async(reduced)=>{
      const page=await browser.newPage({viewport:{width:390,height:844},deviceScaleFactor:2,isMobile:true,hasTouch:true,reducedMotion:reduced?'reduce':'no-preference'});const errors=[];
      page.on('pageerror',e=>errors.push(e.message));page.on('console',m=>{if(m.type()==='error')errors.push(m.text())});
      await page.addInitScript(()=>{localStorage.setItem('vault.title.cutscene','true');localStorage.setItem('vault.sound','false');localStorage.setItem('vault.quality','"high"');document.addEventListener('securitypolicyviolation',e=>console.error('CSP '+e.violatedDirective))});
      await page.goto(url,{waitUntil:'domcontentloaded'});await page.waitForFunction(()=>typeof Title!=='undefined'&&Title.debug(),null,{timeout:60000});
      return {page,errors};
    };
    {const {page,errors}=await run(false);
      const s0=await page.evaluate(()=>{Title.debug().hold(true);return Title.debug().state()});
      assert.equal(s0.mode,'full');assert.ok(await page.evaluate(()=>document.querySelector('#title').classList.contains('cine')));
      assert.deepEqual(s0.info.shots,['sky','shore','gate','facades','sentinels','write','warden','dawn']);
      for(const k of ['vfx','facade','landmark','gate','warden'])assert.equal(s0.info[k],true,k+' built from the shared module');
      assert.equal(s0.info.tier,'medium','a phone at High runs the MID tier');
      const mids={sky:1.6,shore:4.6,gate:7.9,facades:10.4,sentinels:13.4,write:15.4,warden:18.6,dawn:22.6};
      for(const [id,t] of Object.entries(mids)){
        const st=await page.evaluate(t=>{Title.debug().seek(t);return new Promise(r=>{let n=0;const f=()=>{if(++n>=3)r(Title.debug().state());else requestAnimationFrame(f)};requestAnimationFrame(f)})},t);
        assert.equal(st.shots[0],id,'shot at '+t);assert.equal(st.error,null,id+' rendered without throwing');
      }
      const cap=await page.evaluate(()=>{Title.debug().seek(18.6);const r=document.querySelector('#tCap').getBoundingClientRect();return {l:r.left,r:r.right,txt:document.querySelector('#tCap').textContent}});
      assert.ok(cap.l>=0&&cap.r<=390,'caption inside the phone width');assert.match(cap.txt,/^Warden/);
      await page.click('#tSkip');await page.waitForSelector('#title.menu',{timeout:20000});
      const m=await page.evaluate(()=>({st:Title.debug().state(),on:['#tSub','#tRule','#tTag'].every(s=>document.querySelector(s).classList.contains('on')),letters:[...document.querySelectorAll('#tWord span')].every(e=>e.classList.contains('on')||e.classList.contains('sp')),cap:document.querySelector('#tCap').classList.contains('on')}));
      assert.equal(m.st.inMenu,true);assert.ok(m.on&&m.letters,'skip shows the whole wordmark');assert.equal(m.cap,false,'no caption over the menu');
      assert.deepEqual(errors,[]);await page.close()}
    {const {page,errors}=await run(true);
      await page.waitForSelector('#title.menu',{timeout:20000});
      const st=await page.evaluate(()=>({s:Title.debug().state(),cine:document.querySelector('#title').classList.contains('cine')}));
      assert.equal(st.s.mode,'still');assert.equal(st.cine,false);assert.equal(st.s.inMenu,true);assert.deepEqual(st.s.shots,['dawn',null]);
      assert.deepEqual(errors,[]);await page.close()}
  }finally{await browser.close();server.close()}
});
