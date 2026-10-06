// Local rendering test: real mirrored notes, mocked member session and progress transport. No production writes.
import {chromium} from 'playwright';
import os from 'node:os';
import {execFileSync} from 'node:child_process';
import fs from 'node:fs';
import http from 'node:http';
import path from 'node:path';
const root=new URL('../web/',import.meta.url).pathname;
const mime={'.html':'text/html','.js':'text/javascript','.css':'text/css','.wav':'audio/wav','.png':'image/png','.jpg':'image/jpeg','.webp':'image/webp','.svg':'image/svg+xml','.json':'application/json'};
const server=http.createServer((req,res)=>{const file=path.join(root,decodeURIComponent(req.url.split('?')[0]==='/'?'/index.html':req.url.split('?')[0]));try{res.setHeader('content-type',mime[path.extname(file)]||'application/octet-stream');res.end(fs.readFileSync(file))}catch{res.statusCode=404;res.end('missing')}});
await new Promise(resolve=>server.listen(0,'127.0.0.1',resolve));
const address='http://127.0.0.1:'+server.address().port;
const notes=JSON.parse(execFileSync('python3',['-c','import sys,json;sys.path.insert(0,"scripts");import vaultlib;print(json.dumps(vaultlib.read_vault()))'],{encoding:'utf8',maxBuffer:16*1024*1024,cwd:new URL('../',import.meta.url)}));
const out=new URL('file://'+fs.mkdtempSync(path.join(os.tmpdir(),'vault-browser-qa-'))+'/');
const browser=await chromium.launch({headless:true,args:['--no-sandbox','--use-angle=swiftshader','--enable-unsafe-swiftshader']});
const results=[];
for(const [name,viewport,reduced] of [['desktop',{width:1440,height:900},false],['mobile',{width:390,height:844},true]]){
 const page=await browser.newPage({viewport,reducedMotion:reduced?'reduce':'no-preference'});const errors=[],warnings=[];page.on('requestfailed',r=>console.log(name,'RESOURCE',r.url(),r.failure()?.errorText));
 page.on('pageerror',e=>{errors.push(e.message);console.log(name,'PAGEERROR',e.message)});page.on('console',m=>{if(m.type()==='error')errors.push(m.text());else if(m.type()==='warning')warnings.push(m.text())});
 await page.addInitScript(({notes,reduced})=>{
  localStorage.setItem('vault.title.cutscene','false');localStorage.setItem('vault.sound','false');localStorage.setItem('vault.quality',reduced?'low':'high');
  const now=new Date().toISOString(),uid='qa-fixture-user';
  const tables={notes,team_members:[{user_id:uid,display_name:'QA fixture',role:'member'}],agents:[{id:'codex',name:'Codex',kind:'agent',color:'#14B8A6',active:true}],presence:[{agent:'codex',status:'reading',note:notes[0].name,last_seen:now}],tasks:[{id:'QA-OPEN',title:'QA fixture: inspect source evidence',note:notes[0].name,status:'open',priority:'high'},{id:'QA-DONE',title:'QA fixture: completed team work',note:notes[0].name,status:'done',priority:'medium',done_at:now,result:'QA fixture result'}],activity:[],avatar_profiles:[],agent_sessions:[],member_positions:[],agent_stats:[]};
  const sb={auth:{getSession:async()=>({data:{session:{access_token:'qa-fixture-token'}}}),getUser:async()=>({data:{user:{id:uid}}}),signOut:async()=>({error:null})},from(name){let rows=[...(tables[name]||[])];const q={select:()=>q,order:()=>q,limit:n=>{rows=rows.slice(0,n);return q},range:(a,b)=>{rows=rows.slice(a,b+1);return q},eq:(k,v)=>{rows=rows.filter(r=>r[k]===v);return q},gt:()=>q,in:()=>q,upsert:()=>q,update:()=>q,insert:()=>q,maybeSingle:async()=>({data:rows[0]||null,error:null}),then(resolve){return Promise.resolve({data:rows,error:null}).then(resolve)}};return q},channel(){const ch={on:()=>ch,subscribe(fn){setTimeout(()=>fn('SUBSCRIBED'),20);return ch},track:async()=>{},presenceState:()=>({})};return ch},removeChannel(){},rpc:async()=>({data:null,error:null})};
  Object.defineProperty(window,'supabase',{configurable:true,get:()=>({createClient:()=>sb}),set(){}});
 },{notes,reduced});
 const progress=new Map();let saved=0;
 await page.route('**/functions/v1/district-progress',async route=>{const body=route.request().postDataJSON();if(body.action==='list'){await route.fulfill({json:{ok:true,journeys:[...progress.values()],evidence:[]}});return}const j={user_id:'qa-fixture-user',district:body.district,first_visit:new Date().toISOString(),last_visit:new Date().toISOString(),shortlisted:body.enabled??progress.get(body.district)?.shortlisted??false};progress.set(body.district,j);saved++;await route.fulfill({json:{ok:true,journey:j}})});
 console.log(name,'navigating');await page.goto(address,{waitUntil:'domcontentloaded'});
 await page.waitForSelector('#title.menu',{timeout:30000});await page.screenshot({path:new URL(name+'-title.png',out).pathname});
 console.log(name,'entering');await page.getByRole('button',{name:'Enter the Vault',exact:true}).click({timeout:10000});console.log(name,'entered');
 await page.waitForSelector('#districtNavigator',{timeout:30000});await page.waitForFunction(()=>Campus.ok(),{timeout:30000});
 console.log(name,'campus ready');await page.evaluate(()=>{Campus.skipIntro();Campus.cycleTime();});await page.waitForTimeout(3000);
 const campus=await page.evaluate(()=>({notes:NOTES.length,districts:Campus.districts().length,gpu:Campus.ok(),drawCalls:Campus.renderer().info.render.calls,audio:VaultAudio.status(),versions:VaultEngine.versions}));
 await page.screenshot({path:new URL(name+'-world.png',out).pathname});
 await page.getByRole('button',{name:'Open district navigator'}).click();await page.getByText('District progress saved to your account.',{exact:true}).waitFor();
 const districtCount=await page.locator('.journey-nav button').count();
 await page.getByRole('button',{name:'Shortlist this district',exact:true}).click();await page.getByRole('button',{name:'Remove from district shortlist',exact:true}).waitFor();
 await page.getByRole('button',{name:'11 - Physical AI',exact:true}).click();await page.getByRole('heading',{name:'Physical systems lab',exact:true}).waitFor();
 await page.getByRole('searchbox',{name:'Search notes in 11 - Physical AI'}).fill('Wearable');
 await page.screenshot({path:new URL(name+'-district.png',out).pathname});
 await page.keyboard.press('Escape');await page.waitForFunction(()=>!document.querySelector('.journey-dialog').open);
 await page.evaluate(()=>open(NOTES.find(n=>n.name.startsWith('District Handbook —'))));
 await page.waitForTimeout(500);await page.getByRole('button',{name:'Close reader',exact:true}).count().then(async n=>{if(n)await page.getByRole('button',{name:'Close reader',exact:true}).click()});
 const reader=await page.evaluate(()=>({inlineTransform:document.getElementById('sheet').style.transform,hasContent:document.getElementById('sbody').textContent.length>100}));
 results.push({name,viewport,reduced,title:await page.title(),campus,districtCount,saved,reader,errors,warnings});await page.close();
}
await browser.close();server.close();fs.writeFileSync(new URL('results.json',out),JSON.stringify(results,null,2));console.log(JSON.stringify(results,null,2));
if(results.some(r=>r.errors.length||r.districtCount!==13||!r.campus.gpu||r.reader.inlineTransform))process.exitCode=1;
