// Regenerates the Warden portraits in web/assets/guides from the code-built kit.
// Boots the built web/index.html in headless Chromium against the mirrored notes (mocked session, no production
// writes), calls Guides.still(top) for every Warden and writes warden-<slug>.webp plus manifest.json. The manifest
// records the kit revision, archetype, symbol and colour each file was made from; the app requests only files whose
// entry still matches, so a district that changes identity falls back to the live render instead of a wrong face.
// Usage: python3 scripts/build_web.py && node scripts/render_warden_portraits.mjs [--size 384] [--prune]
import {chromium} from 'playwright';
import {execFileSync} from 'node:child_process';
import fs from 'node:fs';
import http from 'node:http';
import path from 'node:path';

const args=process.argv.slice(2),size=Number(args[args.indexOf('--size')+1])||384,prune=args.includes('--prune');
const root=new URL('../web/',import.meta.url).pathname,outDir=path.join(root,'assets','guides');
const mime={'.html':'text/html','.js':'text/javascript','.css':'text/css','.wav':'audio/wav','.png':'image/png','.jpg':'image/jpeg','.webp':'image/webp','.svg':'image/svg+xml','.json':'application/json'};
const server=http.createServer((req,res)=>{const file=path.join(root,decodeURIComponent(req.url.split('?')[0]==='/'?'/index.html':req.url.split('?')[0]));try{res.setHeader('content-type',mime[path.extname(file)]||'application/octet-stream');res.end(fs.readFileSync(file))}catch{res.statusCode=404;res.end('missing')}});
await new Promise(resolve=>server.listen(0,'127.0.0.1',resolve));
const address='http://127.0.0.1:'+server.address().port;
const notes=JSON.parse(execFileSync('python3',['-c','import sys,json;sys.path.insert(0,"scripts");import vaultlib;print(json.dumps(vaultlib.read_vault()))'],{encoding:'utf8',maxBuffer:16*1024*1024,cwd:new URL('../',import.meta.url)}));
const thematic=JSON.parse(fs.readFileSync(new URL('../docs/source-district-definitions.json',import.meta.url),'utf8')).map(d=>({...d,kind:'thematic'}));
const browser=await chromium.launch({headless:true,args:['--no-sandbox','--use-angle=swiftshader','--enable-unsafe-swiftshader']});
try{
  const page=await browser.newPage({viewport:{width:1280,height:800},colorScheme:'dark',reducedMotion:'reduce'});
  page.on('pageerror',e=>console.log('PAGEERROR',e.message));
  await page.addInitScript(({notes})=>{
    localStorage.setItem('vault.title.cutscene','false');localStorage.setItem('vault.sound','false');localStorage.setItem('vault.quality','high');
    const uid='portrait-render',tables={notes,team_members:[{user_id:uid,display_name:'Portrait render',role:'member'}],agents:[],presence:[],tasks:[],activity:[],avatar_profiles:[],agent_sessions:[],member_positions:[],agent_stats:[]};
    const sb={auth:{getSession:async()=>({data:{session:{access_token:'portrait-render'}}}),getUser:async()=>({data:{user:{id:uid}}}),signOut:async()=>({error:null})},from(name){let rows=[...(tables[name]||[])];const q={select:()=>q,order:()=>q,limit:n=>{rows=rows.slice(0,n);return q},range:(a,b)=>{rows=rows.slice(a,b+1);return q},eq:(k,v)=>{rows=rows.filter(r=>r[k]===v);return q},gt:()=>q,in:()=>q,upsert:()=>q,update:()=>q,insert:()=>q,maybeSingle:async()=>({data:rows[0]||null,error:null}),then(resolve){return Promise.resolve({data:rows,error:null}).then(resolve)}};return q},channel(){const ch={on:()=>ch,subscribe(fn){setTimeout(()=>fn('SUBSCRIBED'),20);return ch},track:async()=>{},presenceState:()=>({})};return ch},removeChannel(){},rpc:async()=>({data:null,error:null})};
    Object.defineProperty(window,'supabase',{configurable:true,get:()=>({createClient:()=>sb}),set(){}});
  },{notes});
  await page.route('**/functions/v1/district-catalog',route=>route.fulfill({json:{ok:true,districts:thematic,coverage:[],collections:[]}}));
  await page.route('**/functions/v1/district-progress',route=>route.fulfill({json:{ok:true,journeys:[],evidence:[]}}));
  await page.goto(address,{waitUntil:'domcontentloaded'});
  await page.waitForSelector('#title.menu',{timeout:30000});
  await page.getByRole('button',{name:'Enter the Vault',exact:true}).click({timeout:10000});
  await page.waitForFunction(()=>typeof Campus!=='undefined'&&Campus.ok()&&typeof Guides!=='undefined'&&Guides.list().length>0,undefined,{timeout:180000});
  // Let the thematic catalog place districts 12–17, then settle at midday.
  for(let i=0;i<60;i++){const st=await page.evaluate(()=>({g:Guides.list().length,d:Campus.districts().length}));if(st.g>=st.d&&st.d>=14)break;if(i%10===0)console.log('waiting for Wardens',st);await page.waitForTimeout(1000)}
  await page.evaluate(()=>{try{Campus.skipIntro();Campus.debug().setClock(13)}catch(e){}});
  await page.waitForTimeout(2500);
  const shots=await page.evaluate(size=>{const m=Guides.portraits();return {manifest:m,images:m.portraits.map(p=>({file:p.file,url:Guides.still(p.top,size,'image/webp')}))}},size);
  fs.mkdirSync(outDir,{recursive:true});
  const keep=new Set(['manifest.json']);
  for(const s of shots.images){if(!s.url||!s.url.startsWith('data:image/webp'))throw new Error('no webp still for '+s.file);fs.writeFileSync(path.join(outDir,s.file),Buffer.from(s.url.split(',')[1],'base64'));keep.add(s.file);console.log('wrote',s.file)}
  const manifest={...shots.manifest,size,generated:new Date().toISOString().slice(0,10),by:'scripts/render_warden_portraits.mjs'};
  fs.writeFileSync(path.join(outDir,'manifest.json'),JSON.stringify(manifest,null,1)+'\n');
  if(prune)for(const f of fs.readdirSync(outDir))if(!keep.has(f)&&/^warden-.*\.webp$/.test(f)){fs.unlinkSync(path.join(outDir,f));console.log('removed',f)}
  console.log(`${shots.images.length} portraits, kit ${manifest.kit}`);
}finally{await browser.close();server.close()}
