import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';

// UI pass regressions: tokens, contrast, live district counts, loading progress, toasts,
// switcher dialog semantics, the shortcut sheet, the no-WebGL navigator lane and sky phase.
const read=f=>fs.readFileSync(new URL('../'+f,import.meta.url),'utf8');
const head=read('web-src/a_head.html');
const html=head.split('<script')[0].replace(/<link\b[^>]*>/g,'');

function tokens(block){const out={};for(const m of block.matchAll(/--([a-z0-9-]+):\s*(#[0-9A-Fa-f]{6})/g))out[m[1]]=m[2];return out}
const lum=h=>{const n=parseInt(h.slice(1),16);return [n>>16,(n>>8)&255,n&255].map(v=>{v/=255;return v<=.03928?v/12.92:((v+.055)/1.055)**2.4}).reduce((a,v,i)=>a+v*[.2126,.7152,.0722][i],0)};
const ratio=(a,b)=>{const x=lum(a),y=lum(b);return (Math.max(x,y)+.05)/(Math.min(x,y)+.05)};

test('theme text tokens meet WCAG AA on every panel surface, day and night',()=>{
  const dark=tokens(head.slice(head.indexOf(':root{'),head.indexOf('}',head.indexOf(':root{'))));
  const lightStart=head.indexOf(':root[data-theme="light"]{--bg');
  const light={...dark,...tokens(head.slice(lightStart,head.indexOf('}',lightStart)))};
  for(const [name,set] of [['dark',dark],['light',light]]){
    for(const fg of ['fg','muted','faint','accent-ink','link','unres','ok','warn','bad','info'])
      for(const bg of ['bg','panel','panel2']){
        assert.ok(set[fg]&&set[bg],`${name} ${fg}/${bg} defined`);
        assert.ok(ratio(set[fg],set[bg])>=4.5,`${name} --${fg} on --${bg} is ${ratio(set[fg],set[bg]).toFixed(2)}:1`);
      }
  }
  // the primary button keeps dark ink on the accent fill in both themes
  assert.ok(ratio('#1a1204',dark.accent)>=4.5&&ratio('#1a1204',light.accent)>=4.5);
});

test('motion tokens exist and collapse to zero under reduced motion',()=>{
  for(const t of ['--dur-1','--dur-2','--dur-3','--dur-4','--ease-out','--ease-spring','--ring'])assert.ok(head.includes(t+':'),t);
  assert.match(head,/@media \(prefers-reduced-motion:reduce\)\{:root\{--dur-1:0ms;--dur-2:0ms;--dur-3:0ms;--dur-4:0ms\}\}/);
});

test('stale copy and inline layout are gone from the sources',()=>{
  assert.ok(!head.includes('19 districts'),'plate count is derived, not hardcoded');
  assert.match(head,/id="districtCount"/);
  const boot=read('web-src/e_boot.js');assert.ok(!/cssText/.test(boot),'fallback navigator uses the .navfab class');assert.match(boot,/navfab/);
  const journey=read('web-src/g_journey.js');assert.ok(!/#10141e|#E6E9F2|node\('style'\)/i.test(journey),'navigator styles live in a_head.html');
  assert.match(head,/\.journey-dialog\{color:var\(--fg\)/);
  assert.match(journey,/HUD\.syncDistricts\(\)/);
  const title=read('web-src/f_title.js');assert.ok(!title.includes('"v3.0"'));assert.match(title,/VAULT_BUILD/);
  const build=read('scripts/build_web.py');assert.match(build,/package\.json/);assert.match(build,/"b_districts\.js", "b_hud\.js"/);
  const live=read('web-src/d_live.js');assert.match(live,/HUD\.progress\(\{loaded:rows\.length,total:count/);
  assert.match(head,/class="sw" role="dialog" aria-modal="true"/);
});

test('built page carries the package version',()=>{
  const pkg=JSON.parse(read('package.json'));const built=read('web/index.html');
  assert.match(built,new RegExp('const VAULT_BUILD=Object\\.freeze\\(\\{version:'+JSON.stringify(pkg.version).replace(/\./g,'\\.')+',hash:"[0-9a-f]{12}"\\}\\)'),'run python3 scripts/build_web.py');
});

test('HUD behaviour in a real browser: counts, progress, toasts, dialogs, navigator lane, sky phase',async()=>{
  const {chromium}=await import('playwright');
  const browser=await chromium.launch({headless:true,args:['--no-sandbox']});
  try{
    for(const viewport of [{width:1440,height:900},{width:390,height:844},{width:320,height:568}]){
      const page=await browser.newPage({viewport,reducedMotion:'reduce'});
      try{
        const errors=[];page.on('pageerror',e=>errors.push(e.message));
        await page.setContent(html);
        await page.addScriptTag({content:read('web-src/b_districts.js')+'\nwindow.Districts=Districts;'});
        await page.addScriptTag({content:read('web-src/b_hud.js')});
        // district counts follow Districts.all, including a catalog redefinition
        const counts=await page.evaluate(()=>{
          const a=HUD.syncDistricts(),t1=document.querySelector('#districtCount').textContent;
          Districts.define([{id:'zz-test-a',title:'Test A',purpose:'p',theme:'t1'},{id:'zz-test-b',title:'Test B',purpose:'p',theme:'t2'}]);
          const b=HUD.syncDistricts(),t2=document.querySelector('#districtCount').textContent;
          return {a,b,t1,t2,len:Districts.all.length};
        });
        assert.equal(counts.t1,' · '+counts.a+' districts');assert.equal(counts.b,counts.len);assert.equal(counts.t2,' · '+counts.len+' districts');
        // no-WebGL navigator: classed, labelled, 44px, inside the stage, clear of the ribbon
        const nav=await page.evaluate(()=>{
          let opened=0;const b=HUD.navFallback(()=>opened++);b.click();
          const r=b.getBoundingClientRect(),rb=document.querySelector('.ribbon').getBoundingClientRect(),st=document.querySelector('#stage').getBoundingClientRect();
          const overlap=(x,y)=>x.left<y.right&&x.right>y.left&&x.top<y.bottom&&x.bottom>y.top;
          return {inline:b.getAttribute('style'),h:r.height,ribbon:overlap(r,rb),inStage:r.left>=st.left&&r.right<=st.right&&r.bottom<=st.bottom&&r.top>=st.top,text:b.textContent,label:b.getAttribute('aria-label'),opened,second:HUD.navFallback(()=>{})};
        });
        assert.equal(nav.inline,null);assert.ok(nav.h>=44,`navfab height ${nav.h}`);assert.equal(nav.ribbon,false);assert.equal(nav.inStage,true);
        assert.equal(nav.text,counts.len+' districts');assert.equal(nav.label,'Open district navigator');assert.equal(nav.opened,1);assert.equal(nav.second,null);
        // loading: steps, page counts and a determinate bar once the total is known
        const ld=await page.evaluate(async()=>{
          await HUD.stage('notes','Loading the vault');const ind=document.querySelector('#ldBar').classList.contains('ind');
          HUD.progress({loaded:1000,total:1405,page:1});
          const s=[...document.querySelectorAll('#ldSteps li')].map(li=>li.dataset.state);
          const r={ind,count:document.querySelector('#ldCount').textContent,now:document.querySelector('#ldBar').getAttribute('aria-valuenow'),indAfter:document.querySelector('#ldBar').classList.contains('ind'),s,title:document.querySelector('#ldTitle').textContent};
          await HUD.stage('city','Raising the city');r.city=[...document.querySelectorAll('#ldSteps li')].map(li=>li.dataset.state);r.cityCount=document.querySelector('#ldCount').textContent;return r;
        });
        assert.equal(ld.ind,true);assert.equal(ld.indAfter,false);assert.equal(ld.now,'71');assert.equal(ld.title,'Loading the vault');
        assert.equal(ld.count,'1,000 of 1,405 notes · page 1 of 2');assert.deepEqual(ld.s,['done','now','next','next']);assert.deepEqual(ld.city,['done','done','done','now']);
        assert.match(ld.cityCount,/1,000 notes/);
        // toasts: stack of three, duplicates collapse, tone from the message
        const ts=await page.evaluate(()=>{['one','two','three','four'].forEach(m=>HUD.toast(m));HUD.toast('four');HUD.toast('Could not save: offline');
          const live=[...document.querySelectorAll('#toasts .toast:not(.out)')];
          return {n:live.length,dup:[...document.querySelectorAll('#toasts .toast')].find(t=>t.dataset.msg==='four')?.querySelector('.tn').textContent,bad:live.some(t=>t.classList.contains('tone-bad')),role:document.querySelector('#toasts').getAttribute('aria-live'),closeLabel:live[0].querySelector('.tx').getAttribute('aria-label')};
        });
        assert.ok(ts.n<=3,`live toasts ${ts.n}`);assert.equal(ts.dup,'×2');assert.equal(ts.bad,true);assert.equal(ts.role,'polite');assert.equal(ts.closeLabel,'Dismiss message');
        // quick switcher: modal semantics, background inert, focus held, focus returned
        await page.evaluate(()=>{const b=document.querySelector('#rbSwitch');b.focus();document.querySelector('#modal').hidden=false;document.querySelector('#swq').focus();document.querySelector('#swl').innerHTML='<li class="on"><b>A</b></li><li><b>B</b></li>'});
        await page.keyboard.press('Tab');
        const sw=await page.evaluate(()=>({inert:document.querySelector('#app').inert,expanded:document.querySelector('#swq').getAttribute('aria-expanded'),focus:document.activeElement.id,role:document.querySelector('#swl li').getAttribute('role'),sel:document.querySelector('#swl li').getAttribute('aria-selected'),active:document.querySelector('#swq').getAttribute('aria-activedescendant')}));
        assert.equal(sw.inert,true);assert.equal(sw.expanded,'true');assert.equal(sw.focus,'swq');assert.equal(sw.role,'option');assert.equal(sw.sel,'true');assert.equal(sw.active,'swo0');
        await page.evaluate(()=>{document.querySelector('#modal').hidden=true});await page.waitForFunction(()=>document.activeElement?.id==='rbSwitch');
        assert.equal(await page.evaluate(()=>document.querySelector('#app').inert),false);
        // shortcut sheet: ? opens a native modal dialog; Escape closes it without reaching the global handler
        await page.evaluate(()=>{window.escapes=0;document.addEventListener('keydown',e=>{if(e.key==='Escape')window.escapes++});document.querySelector('#gl').focus()});
        await page.keyboard.press('Shift+Slash');
        assert.equal(await page.evaluate(()=>document.querySelector('#keys').open),true);
        assert.equal(await page.evaluate(()=>document.activeElement.closest('#keys')!==null),true);
        await page.keyboard.press('Escape');
        assert.equal(await page.evaluate(()=>document.querySelector('#keys').open),false);
        assert.equal(await page.evaluate(()=>window.escapes),0);
        assert.equal(await page.evaluate(()=>document.activeElement.id),'gl');
        // typing a ? in a field never opens the sheet
        await page.evaluate(()=>document.querySelector('#filter').focus());await page.keyboard.type('?');
        assert.equal(await page.evaluate(()=>document.querySelector('#keys').open),false);
        // sky phase drives the HUD tint and the browser theme colour
        const ph=await page.evaluate(()=>{const r=[HUD.phase(30,'light'),HUD.phase(6,'light'),HUD.phase(-4,'dark'),HUD.phase(-20,'dark'),HUD.phase('dusk','dark'),HUD.phase('day','dark')];return {r,attr:document.documentElement.dataset.phase,meta:document.querySelector('meta[name="theme-color"]').content}});
        assert.deepEqual(ph.r,['day','golden','dusk','night','dusk','dusk']);assert.equal(ph.attr,'dusk');assert.equal(ph.meta,'#141026');
        // daylight paper: accent text switches to the darker ink token
        const ink=await page.evaluate(()=>{document.documentElement.dataset.theme='light';return getComputedStyle(document.querySelector('.plate .k')).color});
        assert.equal(ink,'rgb(138, 84, 16)');
        // touch copy replaces mouse copy on coarse pointers only (desktop Chromium reports a fine pointer)
        const hint=await page.evaluate(()=>({fine:getComputedStyle(document.querySelector('#hint .hk-fine')).display,touch:getComputedStyle(document.querySelector('#hint .hk-touch')).display,first:document.querySelector('#hint').firstElementChild.className}));
        assert.equal(hint.touch,'none');assert.equal(hint.first,'hk-fine');
        assert.deepEqual(errors,[]);
      }finally{await page.close()}
    }
  }finally{await browser.close()}
});

test('touch devices get gesture copy in the hint card and the shortcut sheet',async()=>{
  const {chromium}=await import('playwright');
  const browser=await chromium.launch({headless:true,args:['--no-sandbox']});
  try{
    const context=await browser.newContext({viewport:{width:1024,height:768},hasTouch:true,isMobile:true});
    const page=await context.newPage();await page.setContent(html);
    const r=await page.evaluate(()=>{const s=document.querySelector('#stage');const d=e=>getComputedStyle(e).display;
      const orbit=d(document.querySelector('.hk-orbit')),walkHidden=d(document.querySelector('.hk-walk'));s.classList.add('walking');
      return {fine:d(document.querySelector('.hk-fine')),orbit,walkHidden,walk:d(document.querySelector('.hk-walk')),orbitWalking:d(document.querySelector('.hk-orbit')),sheet:d(document.querySelector('.kt-touch'))}});
    assert.deepEqual(r,{fine:'none',orbit:'block',walkHidden:'none',walk:'block',orbitWalking:'none',sheet:'block'});
    await context.close();
  }finally{await browser.close()}
});
