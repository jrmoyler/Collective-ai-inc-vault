import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
import vm from 'node:vm';
import {chromium} from 'playwright';

const head=await fs.readFile(new URL('../web-src/a_head.html',import.meta.url),'utf8');
const clock=await fs.readFile(new URL('../web-src/g_clock.js',import.meta.url),'utf8');
const data=await fs.readFile(new URL('../web-src/b_data.js',import.meta.url),'utf8');
const build=await fs.readFile(new URL('../scripts/build_web.py',import.meta.url),'utf8');

test('the world clock ships in the page and Today follows the calendar',()=>{
  assert.match(build,/"g_clock\.js"/,'clock module is in the build list');
  assert.match(head,/<div class="hudtop">[\s\S]*id="wclock"[\s\S]*<\/div>\s*<div class="wcpop" id="wcPop"/,'clock sits in the top bar with its panel');
  assert.doesNotMatch(data,/byName\.get\("2026-10-04"\)/,'Today is not pinned to one date');
  assert.match(data,/function todayNote\(\)/);
});

test('clock helpers: zone time, day shift and light phase',()=>{
  const ctx={document:{readyState:'complete',getElementById:()=>null},Intl,Date,setTimeout,clearTimeout,matchMedia:()=>({matches:false})};
  vm.createContext(ctx);vm.runInContext(clock+';this.WorldClock=WorldClock',ctx);
  const W=ctx.WorldClock,noon=new Date('2026-10-09T12:00:00Z');
  assert.equal(W.at('UTC',noon).time,'12:00');
  assert.equal(W.at('Asia/Tokyo',noon).time,'21:00');
  assert.equal(W.at('America/Los_Angeles',new Date('2026-10-09T03:00:00Z')).day,'2026-10-08');
  assert.equal(W.phase(13,NaN),'day');assert.equal(W.phase(23,NaN),'night');assert.equal(W.phase(6,NaN),'twilight');
  assert.equal(W.phase(3,-20),'night','scene sun elevation wins over the hour');assert.equal(W.phase(3,30),'day');
});

test('phone lanes: the clock never covers the floor pill or the top bar',async()=>{
  const html=head.split('<script')[0].replace(/<link\b[^>]*>/g,'');
  const browser=await chromium.launch({headless:true,args:['--no-sandbox']});
  try{
    for(const viewport of [{width:320,height:568},{width:390,height:844},{width:740,height:360},{width:1280,height:800}]){
      const page=await browser.newPage({viewport});
      try{
        await page.setContent(html);
        const r=await page.evaluate(()=>{
          document.querySelector('#loading').hidden=true;
          const c=document.querySelector('#wclock');c.querySelector('.wc-t').textContent='23:59';c.querySelector('.wc-z').textContent='GMT+10';
          const f=document.querySelector('#floor');f.hidden=false;f.classList.add('min');f.innerHTML='<h3><span>On the floor</span><b>45 live</b></h3>';
          const box=s=>document.querySelector(s).getBoundingClientRect();
          const hit=(a,b)=>a.left<b.right-1&&a.right>b.left+1&&a.top<b.bottom-1&&a.bottom>b.top+1;
          const k=box('#wclock');
          return {floor:hit(k,box('#floor')),crumb:hit(k,box('#crumb')),visible:k.width>0&&getComputedStyle(c).visibility!=='hidden',inside:k.left>=0&&k.right<=innerWidth,overflow:document.documentElement.scrollWidth>innerWidth,height:k.height};
        });
        assert.equal(r.visible,true,`${viewport.width}: clock visible`);
        assert.equal(r.floor,false,`${viewport.width}: clock covers the floor pill`);
        assert.equal(r.crumb,false,`${viewport.width}: clock covers the breadcrumb`);
        assert.equal(r.inside,true);assert.equal(r.overflow,false);
        if(viewport.width<=760)assert.ok(r.height>=40,'touch target');
      }finally{await page.close()}
    }
  }finally{await browser.close()}
});
