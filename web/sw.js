// Vault offline shell. Registered by web-src/b_engine.js as sw.js?v=<build content hash> (VAULT_BUILD.hash).
// Same-origin GET only. Supabase (notes, tasks, presence, realtime) and the /api and /mcp rewrites are never touched.
// - network-first: the page itself, config.js, manifest.json and every other *.json manifest under assets/ (a new build,
//   key or portrait set reaches people on the next load)
// - stale-while-revalidate: vendor/, assets/, audio/, icons and fonts (instant repeat loads; a changed file lands next visit)
const VERSION=new URL(self.location.href).searchParams.get('v')||'dev';
const CACHE='vault-shell-'+VERSION;
const STATIC=/^\/(vendor|assets|audio)\/|^\/(icon-[0-9]+\.png|icon\.svg|favicon\.svg|sentinel-concept\.webp)$/;
const FRESH=/^\/(index\.html)?$|^\/(config\.js|manifest\.json)$|^\/assets\/.*\.json$/;
const MAX_ENTRIES=160; // entries kept per cache before the oldest are trimmed

self.addEventListener('install',e=>{
  e.waitUntil(caches.open(CACHE).then(c=>c.addAll(['vendor/three-r128.min.js','vendor/supabase.js','vendor/fonts.css']).catch(()=>{})).then(()=>self.skipWaiting()));
});
self.addEventListener('activate',e=>{
  e.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(k=>k.startsWith('vault-shell-')&&k!==CACHE).map(k=>caches.delete(k)))).then(()=>self.clients.claim()));
});
async function trim(cache){const keys=await cache.keys();for(let i=0;i<keys.length-MAX_ENTRIES;i++)await cache.delete(keys[i])}
async function networkFirst(req){
  const cache=await caches.open(CACHE);
  try{const res=await fetch(req);if(res&&res.ok)cache.put(req,res.clone());return res}
  catch(err){const hit=await cache.match(req)||await cache.match('index.html')||await cache.match('/');if(hit)return hit;throw err}
}
async function staleWhileRevalidate(e){
  const cache=await caches.open(CACHE);const hit=await cache.match(e.request);
  const net=fetch(e.request).then(res=>{if(res&&res.ok&&res.status===200){cache.put(e.request,res.clone()).then(()=>trim(cache))}return res}).catch(()=>hit);
  if(hit){e.waitUntil(net.catch(()=>{}));return hit}
  return net;
}
self.addEventListener('fetch',e=>{
  const req=e.request;if(req.method!=='GET')return;
  const url=new URL(req.url);if(url.origin!==self.location.origin)return;
  if(req.headers.has('range'))return; // audio seeking: let the network answer partial requests
  if(req.mode==='navigate'||FRESH.test(url.pathname)){e.respondWith(networkFirst(req));return}
  if(STATIC.test(url.pathname)){e.respondWith(staleWhileRevalidate(e));return}
});
