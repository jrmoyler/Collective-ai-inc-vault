import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
import vm from 'node:vm';

const src=await fs.readFile(new URL('../web-src/g_momentum.js',import.meta.url),'utf8');
const identity=await fs.readFile(new URL('../web-src/b_identity.js',import.meta.url),'utf8');
const head=await fs.readFile(new URL('../web-src/a_head.html',import.meta.url),'utf8');
const live=await fs.readFile(new URL('../web-src/d_live.js',import.meta.url),'utf8');
const boot=await fs.readFile(new URL('../web-src/e_boot.js',import.meta.url),'utf8');
const build=await fs.readFile(new URL('../scripts/build_web.py',import.meta.url),'utf8');

// A DOM just big enough for the chip, the panel and the card.
function el(id){
  const e={id,hidden:true,dataset:{},style:{setProperty(){}},children:[],attrs:{},innerHTML:'',
    setAttribute(k,v){this.attrs[k]=v},addEventListener(){},contains:()=>false,focus(){},remove(){e.removed=true},
    querySelector:()=>({textContent:'',focus(){}}),querySelectorAll:()=>[]};
  return e;
}
function world({stats=[],tasks=[],acts=[]}={}){
  const nodes={momo:el('momo'),moPop:el('moPop')},listeners={},toasts=[],body=[];
  const mem=new Map();
  const ctx={
    Date,Math,JSON,String,Number,Array,Set,Map,Object,setTimeout:()=>0,setInterval:()=>0,clearInterval(){},
    matchMedia:()=>({matches:false}),
    document:{hidden:false,readyState:'complete',getElementById:id=>nodes[id]||null,addEventListener(){},
      documentElement:{addEventListener(){}},createElement:()=>{const e=el('card');return e},body:{appendChild:e=>body.push(e)}},
    window:{addEventListener:(t,f)=>{(listeners[t]||=[]).push(f)}},
    store:{get:(k,d)=>mem.has(k)?JSON.parse(mem.get(k)):d,set:(k,v)=>mem.set(k,JSON.stringify(v))},
    toast:m=>toasts.push(m),esc:s=>String(s),byName:new Map([['A',{name:'A',top:'01 - ZenFlow'}],['B',{name:'B',top:'02 - The Collective'}],['C',{name:'C',top:'02 - The Collective'}]]),
    sheet:{},openSheet(){},open(){},
    Live:{me:()=>({id:'u1',name:'JR Moyler'}),snapshot:()=>({tasks,stats,presence:[],agents:[],acts}),
      streakOf:r=>r&&r.last_day?(r.streak|0):0,bounty:p=>({high:120,medium:80,low:50}[p]||80),agentName:a=>a}
  };
  vm.createContext(ctx);
  vm.runInContext(identity+';this.Identity=Identity',ctx);
  vm.runInContext(src+';this.Momentum=Momentum',ctx);
  ctx.Momentum.start();
  return {M:ctx.Momentum,ctx,listeners,toasts,body,nodes};
}
const now=()=>new Date().toISOString();
let seq=0;const act=(kind,extra={})=>({id:++seq,actor:'JR Moyler',kind,ts:now(),...extra});

test('the module ships in the page, behind the live floor',()=>{
  assert.match(build,/"g_momentum\.js", "e_boot\.js"/,'built before boot');
  assert.match(head,/id="momo"[\s\S]*hidden/,'chip sits in the top bar, hidden until live');
  assert.match(head,/id="moPop"/);
  assert.match(boot,/Momentum\.start\(\)/,'started after the live floor loads');
  assert.match(live,/emit\("activity",a\)/,'Live sends activity out as a window event');
  assert.match(live,/window\.__vaultLeaving=true/,'sign-out never trips the leave prompt');
});

test('goals are three, distinct, and stable for a day and run',()=>{
  const {M}=world();
  const a=M.pick('u1|2026-10-10|0'),b=M.pick('u1|2026-10-10|0'),c=M.pick('u1|2026-10-10|1');
  assert.deepEqual([...a],[...b]);assert.equal(new Set(a).size,3);assert.equal(c.length,3);
  assert.equal(M.goals().length,3);
});

test('own work builds a chain; other actors do not',()=>{
  const {M}=world();
  M._test.onActivity({...act('created',{note:'A'}),actor:'codex'});
  assert.equal(M._test.live(),false);
  M._test.onActivity(act('created',{note:'A'}));
  M._test.onActivity(act('added to',{note:'B'}));
  const claim=act('claimed',{task:'T-1'});M._test.onActivity(claim);
  assert.equal(M.state().chain,3);assert.equal(M.heat(3),'Hot');
  assert.equal(M.state().c.write,2);assert.equal(M.state().c.districts,2);
  M._test.onActivity(claim);// same row twice counts once
  assert.equal(M.state().chain,3);
});

test('clearing every goal opens the next, harder run',()=>{
  const {M,toasts}=world();
  for(let i=0;i<40&&M.state().run===0;i++){
    const g=M.goals().find(x=>x.have<x.need).id;
    if(g==='read')M._test.onOpen({name:'n'+i});
    else if(g==='write')M._test.onActivity(act('edited',{note:'A'}));
    else if(g==='claim')M._test.onActivity(act('claimed'));
    else if(g==='ship')M._test.onActivity(act('finished'));
    else if(g==='say')M._test.onActivity(act('say'));
    else if(g==='roam')M._test.onOpen({name:['A','B','C'][i%3]+''}),M._test.onActivity(act('edited',{note:['A','B'][i%2]}));
    else M._test.onActivity(act('say'));
  }
  assert.equal(M.state().run,1);assert.equal(M.state().runsDone,1);
  assert.ok(toasts.some(t=>/Run 1 cleared/.test(t)));
  assert.ok(M.goals().every(g=>g.have<g.need),'the new run starts from zero');
});

test('stakes name what leaving costs, and the browser asks only then',()=>{
  const yesterday=new Date(Date.now()-864e5).toISOString().slice(0,10);
  const cold=world();
  const ev={preventDefault(){ev.prevented=true}};
  cold.listeners.beforeunload[0](ev);
  assert.ok(!ev.prevented,'nothing on the line: the tab closes without a prompt');

  const w=world({stats:[{actor:'JR Moyler',xp:230,streak:4,last_day:yesterday,week_xp:50,week_start:'2000-01-03'},{actor:'codex',xp:900,week_xp:70}],tasks:[{id:'T-9',title:'Fix links',status:'open',priority:'high'}]});
  const s=w.M.atStake();
  assert.ok(s.some(x=>/4-day streak/.test(x)),'unsecured streak is named');
  assert.ok(s.some(x=>/level 2, 10 XP away/.test(x)),'near level-up is named');
  const ev2={preventDefault(){ev2.prevented=true}};
  w.listeners.beforeunload[0](ev2);
  assert.ok(ev2.prevented,'the browser asks before closing');
  w.ctx.window.__vaultLeaving=true;
  const ev3={preventDefault(){ev3.prevented=true}};
  w.listeners.beforeunload[0](ev3);
  assert.ok(!ev3.prevented,'sign-out passes straight through');
});

test('copy follows the voice standard',()=>{
  for(const w of ['delve','leverage','robust','seamless','transformative','empower','elevate','game-changing','cutting-edge','innovative','tapestry'])
    assert.doesNotMatch(src,new RegExp('\\b'+w+'\\b','i'),w);
});

test('phone and desktop lanes: the chip clears the clock, floor pill and breadcrumb; the panel fits',async()=>{
  const {chromium}=await import('playwright');
  const html=head.split('<script')[0].replace(/<link\b[^>]*>/g,'');
  const browser=await chromium.launch({headless:true,args:['--no-sandbox']});
  try{
    for(const viewport of [{width:320,height:568},{width:390,height:844},{width:740,height:360},{width:1280,height:800}]){
      const page=await browser.newPage({viewport});
      try{
        await page.setContent(html);
        await page.addScriptTag({content:identity+`
          const store={get:(k,d)=>d,set(){}};const esc=s=>String(s);const toast=()=>{};const byName=new Map();const sheet={};function openSheet(){}function open(){}
          const Live={me:()=>({id:'u1',name:'JR Moyler'}),streakOf:r=>r.streak,bounty:()=>120,agentName:a=>a,snapshot:()=>({acts:[],presence:[],agents:[],
            stats:[{actor:'JR Moyler',xp:230,streak:4,last_day:'2000-01-01',week_xp:50},{actor:'codex',xp:900,week_xp:70}],
            tasks:[{id:'T-9',title:'Reconcile the Mega Campus cost model links',status:'open',priority:'high'}]})};
          `+src+';window.Momentum=Momentum;'});
        const r=await page.evaluate(()=>{
          document.querySelector('#loading').hidden=true;
          const f=document.querySelector('#floor');f.hidden=false;f.classList.add('min');f.innerHTML='<h3><span>On the floor</span><b>45 live</b></h3>';
          document.querySelector('#wclock').querySelector('.wc-t').textContent='23:59';
          Momentum.start();Momentum.toggle(true);
          const box=s=>document.querySelector(s).getBoundingClientRect();
          const hit=(a,b)=>a.left<b.right-1&&a.right>b.left+1&&a.top<b.bottom-1&&a.bottom>b.top+1;
          const k=box('#momo'),p=box('#moPop');
          return {clock:hit(k,box('#wclock')),floor:hit(k,box('#floor')),crumb:hit(k,box('#crumb')),visible:k.width>0,inside:k.left>=0&&k.right<=innerWidth&&p.left>=0&&p.right<=innerWidth,overflow:document.documentElement.scrollWidth>innerWidth,height:k.height};
        });
        assert.equal(r.visible,true,`${viewport.width}: chip visible`);
        assert.equal(r.clock,false,`${viewport.width}: chip covers the clock`);
        assert.equal(r.floor,false,`${viewport.width}: chip covers the floor pill`);
        assert.equal(r.crumb,false,`${viewport.width}: chip covers the breadcrumb`);
        assert.equal(r.inside,true);assert.equal(r.overflow,false);
        if(viewport.width<=760&&viewport.height>540)assert.ok(r.height>=40,'touch target');
        if(process.env.MOMENTUM_SHOTS)await page.screenshot({path:`${process.env.MOMENTUM_SHOTS}/momentum-${viewport.width}.png`});
      }finally{await page.close()}
    }
  }finally{await browser.close()}
});
