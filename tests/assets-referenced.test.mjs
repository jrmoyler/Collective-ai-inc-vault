// Every asset, audio and vendor path the app names must ship in web/. Missing files fail quietly in the browser
// (a neutral texel, a silent voice, a console warning), so this catches them before a deploy does.
import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import vm from 'node:vm';
import * as THREE from 'three';
const SRC=fs.readdirSync('web-src').filter(f=>/\.(js|html)$/.test(f)).map(f=>'web-src/'+f);
const REF=/["'`(]((?:vendor|assets|audio)\/[A-Za-z0-9_\-./]+\.(?:jpe?g|png|webp|wav|mp3|ogg|json|js|css|woff2))(?:\?[^"'`)]*)?["'`)]/g;
function referenced(){
 const refs=new Map();
 for(const f of SRC){const s=fs.readFileSync(f,'utf8');let m;while((m=REF.exec(s)))if(!m[1].includes('${'))refs.set(m[1],f)}
 // composed paths: the post-processing chain and the Sentinel surface textures
 const campus=fs.readFileSync('web-src/c_campus.js','utf8');
 const base=campus.match(/const POST_SRC="([^"]+)"/)[1];
 const files=JSON.parse(campus.match(/const POST_FILES=(\[[^\]]+\])/)[1]);
 files.forEach(p=>refs.set(base+p,'web-src/c_campus.js'));
 const sentinel=fs.readFileSync('web-src/b_sentinel.js','utf8'),sb=sentinel.match(/base:'([^']+)'/);
 if(sb){const ks=(sentinel.match(/for\(const k of (\[[^\]]+\]\))L\.load\(TEX\.base\+k\+'\.webp'/)||[])[1];
  (ks?JSON.parse(ks.slice(0,-1).replace(/'/g,'"')):[]).forEach(k=>refs.set(sb[1]+k+'.webp','web-src/b_sentinel.js'));
  [...sentinel.matchAll(/TEX\.base\+'([A-Za-z0-9_-]+\.webp)'/g)].forEach(m=>refs.set(sb[1]+m[1],'web-src/b_sentinel.js'))}
 return refs;
}
test('every asset, audio and vendor path referenced in web-src ships in web/',()=>{
 const refs=referenced(),missing=[];
 assert.ok(refs.size>=12,'the scan found too few references to be trusted: '+refs.size);
 for(const [p,f] of refs)if(!fs.existsSync(path.join('web',p)))missing.push(`${p} (named in ${f})`);
 assert.deepEqual(missing,[]);
});
test('sentinel surface textures and the facade set are all covered by the scan',()=>{
 const refs=[...referenced().keys()];
 for(const k of ['plating','carbon','circuit','iridescence'])assert.ok(refs.includes('assets/sentinels/'+k+'.webp'),k);
 for(const k of ['facade-glass','facade-steel','facade-stone','roof-gravel','ground-asphalt','ground-pavers'])assert.ok(refs.includes('assets/'+k+'.jpg'),k);
 assert.ok(refs.includes('vendor/three-r128.min.js'));
});
test('warden portrait manifest: every file exists, one entry per district, no duplicate files or slugs',()=>{
 const mf='web/assets/guides/manifest.json';if(!fs.existsSync(mf))return;
 const m=JSON.parse(fs.readFileSync(mf,'utf8')),list=m.portraits||[];
 const missing=list.filter(e=>!fs.existsSync(path.join('web/assets/guides',e.file))).map(e=>e.file);
 assert.deepEqual(missing,[]);
 const dup=(k)=>list.map(e=>e[k]).filter((v,i,a)=>a.indexOf(v)!==i);
 assert.deepEqual(dup('file'),[]);assert.deepEqual(dup('slug'),[]);assert.deepEqual(dup('top'),[]);
 const doc={createElement:()=>({width:0,height:0,getContext:()=>new Proxy({},{get:(t,k)=>k==='measureText'?s=>({width:String(s).length*9}):()=>{}})})};
 const ctx=vm.createContext({THREE,document:doc,URL});
 vm.runInContext(fs.readFileSync('web-src/b_districts.js','utf8')+'\nthis.D=Districts;',ctx);
 const all=(typeof ctx.D.all==='function'?ctx.D.all():ctx.D.all)||[];
 if(all.length){
  const tops=new Set(all.map(d=>d.folder||d.top));
  const stray=list.filter(e=>!tops.has(e.top)).map(e=>e.top);assert.deepEqual(stray,[],'manifest entries for districts that no longer exist');
  const bare=[...tops].filter(t=>!list.some(e=>e.top===t));assert.deepEqual(bare,[],'districts without a Warden portrait entry');
 }
});
test('the offline worker and vercel headers cover the shipped asset folders',()=>{
 const sw=fs.readFileSync('web/sw.js','utf8');for(const d of ['vendor','assets','audio'])assert.match(sw,new RegExp(d));
 const v=JSON.parse(fs.readFileSync('vercel.json','utf8')),src=v.headers.map(h=>h.source);
 for(const s of ['/assets/(.*)','/audio/(.*)','/vendor/fonts/(.*)','/sw.js'])assert.ok(src.includes(s),s);
 const csp=v.headers[0].headers.find(h=>h.key==='Content-Security-Policy');assert.ok(csp,'CSP header');
 assert.match(csp.value,/default-src 'self'/);assert.match(csp.value,/wss:\/\/vczwabqqmiskrqxmiomi\.supabase\.co/);assert.match(csp.value,/frame-ancestors 'none'/);
 const cfg=fs.readFileSync('web/config.js','utf8').match(/url:\s*"([^"]+)"/);if(cfg)assert.ok(csp.value.includes(cfg[1]),'connect-src must allow the configured Supabase URL');
});
