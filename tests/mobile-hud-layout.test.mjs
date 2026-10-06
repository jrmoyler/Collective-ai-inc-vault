import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
import {chromium} from 'playwright';

// Exercise the shipping HTML/CSS without authentication, network or a GPU.
// Install Chromium with `npx playwright install chromium` before running.
const html=(await fs.readFile(new URL('../web-src/a_head.html',import.meta.url),'utf8'))
  .split('<script')[0].replace(/<link\b[^>]*>/g,'');

test('mobile HUD keeps navigation and reader usable in portrait, landscape and reduced motion',async()=>{
  const browser=await chromium.launch({headless:true,args:['--no-sandbox']});
  try{
    for(const viewport of [{width:390,height:844},{width:320,height:568},{width:740,height:360}]){
      for(const reducedMotion of ['reduce','no-preference']){
        const page=await browser.newPage({viewport,reducedMotion});
        try{
          await page.setContent(html);
          await page.evaluate(()=>{
            document.querySelector('#chips').innerHTML='<button class="chip2">District navigator</button>';
            document.querySelector('#crumb').textContent='Collective AI / A deliberately long district title to check narrow navigation';
            document.querySelector('#loading').hidden=true;
          });
          // Finish finite entrance animations deterministically; no timing sleeps.
          await page.evaluate(()=>document.getAnimations().filter(a=>Number.isFinite(a.effect.getComputedTiming().endTime)).forEach(a=>a.finish()));
          const initial=await page.evaluate(()=>{
            const r=s=>document.querySelector(s).getBoundingClientRect();
            return {gap:r('.chips').top-r('.plate').bottom,back:r('#back').width,
              forward:r('#fwd').width,overflow:document.documentElement.scrollWidth>innerWidth,
              closedReaderHidden:getComputedStyle(document.querySelector('#sheet')).visibility==='hidden',
              labels:[...document.querySelectorAll('.ribbon button')].every(e=>!!e.getAttribute('aria-label')),
              reducedAnimation:getComputedStyle(document.querySelector('.plate')).animationName};
          });
          assert.ok(initial.gap>=8,`${JSON.stringify(viewport)} panel covers chips`);
          assert.equal(initial.back,44);assert.equal(initial.forward,44);
          assert.equal(initial.overflow,false);assert.equal(initial.labels,true);assert.equal(initial.closedReaderHidden,true);
          if(reducedMotion==='reduce')assert.equal(initial.reducedAnimation,'none');
          await page.evaluate(()=>{
            document.querySelector('#stage').classList.add('walking','touch');
            const floor=document.querySelector('#floor');floor.hidden=false;floor.classList.add('min');
            floor.innerHTML='<h3><span>On the floor</span><b>45 live</b></h3>';
            const banner=document.querySelector('#districtBanner');banner.hidden=false;
            banner.innerHTML='<i></i><div><small>District</small><b>Hybrid Living Academy</b><span>Explore learning and community.</span></div><div class="db-go"><button class="btn">Explore district</button></div>';
          });
          const walking=await page.evaluate(()=>{
            const r=s=>document.querySelector(s).getBoundingClientRect();
            const overlap=(a,b)=>a.left<b.right&&a.right>b.left&&a.top<b.bottom&&a.bottom>b.top;
            return {floorBanner:overlap(r('#floor'),r('#districtBanner')),bannerJoystick:overlap(r('#districtBanner'),r('#joy'))};
          });
          assert.equal(walking.floorBanner,false);assert.equal(walking.bannerJoystick,false);
          await page.evaluate(()=>document.querySelector('#floor').classList.remove('min'));
          assert.equal(await page.locator('#districtBanner').evaluate(e=>getComputedStyle(e).visibility),'hidden');
          await page.evaluate(()=>{document.querySelector('#sheet').classList.add('open','full');document.getAnimations().filter(a=>Number.isFinite(a.effect.getComputedTiming().endTime)).forEach(a=>a.finish())});
          const readerOnTop=await page.evaluate(()=>{
            const joy=document.querySelector('#joy').getBoundingClientRect();
            return !!document.elementFromPoint(joy.x+joy.width/2,joy.y+joy.height/2)?.closest('#sheet');
          });
          assert.equal(readerOnTop,true,'joystick must not intercept reader input');
        }finally{await page.close()}
      }
    }
  }finally{await browser.close()}
});


test('Warden prompt, brief and district chips occupy separate HUD lanes',async()=>{
  const source=await fs.readFile(new URL('../web-src/c_npc.js',import.meta.url),'utf8');
  const css=source.split('s.id="wdCss";s.textContent=`')[1].split('`;document.head.appendChild(s)')[0];
  const browser=await chromium.launch({headless:true,args:['--no-sandbox']});
  try{
    for(const viewport of [{width:1440,height:900},{width:390,height:844}]){
      const page=await browser.newPage({viewport,reducedMotion:'reduce'});
      try{
        await page.setContent(html);await page.addStyleTag({content:css});
        await page.evaluate(()=>{
          document.querySelector('#chips').innerHTML='<button class="chip2">District navigator</button>';
          document.body.insertAdjacentHTML('beforeend','<div class="brief"><div>Campus brief</div><b>Welcome back</b><span>Level 0 Initiate</span><span>1 open commission worth 120 XP</span></div><button id="gPrompt" class="on"><kbd>E</kbd><span>Talk to the Warden of <b>Hybrid Living</b></span><small>Warden</small></button>');
        });
        const result=await page.evaluate(()=>{
          const r=s=>document.querySelector(s).getBoundingClientRect();
          return {promptGap:r('.brief').top-r('#gPrompt').bottom,chipsGap:r('.chips').top-r('.brief').bottom};
        });
        assert.ok(result.promptGap>=8,`Prompt/brief overlap at ${viewport.width}: ${JSON.stringify(result)}`);
        assert.ok(result.chipsGap>=8,`Brief/chips overlap at ${viewport.width}`);
      }finally{await page.close()}
    }
  }finally{await browser.close()}
});
