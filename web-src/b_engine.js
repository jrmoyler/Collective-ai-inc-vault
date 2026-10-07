// Camera rails and reader transitions without a library bundle.
// Rails: a uniform Catmull-Rom spline with clamped ends, 48 samples per segment. It reproduces the curve the Babylon
// Curve3.CreateCatmullRomSpline(points,48,false) bundle produced (tests/engine-kit.test.mjs compares them), so authored
// title and camera paths do not move. Transitions: the Web Animations API (an injected VaultLibraries.animate adapter
// still wins when present, for tests). Dropping vendor/vault-libraries.js saves ~102 KB of parse on phones.
// The existing Three renderer owns the city. No second GPU context is created.
const VaultEngine=(()=>{
  const rails=new Map(),SEG=48;
  function cr(p0,p1,p2,p3,t){const t2=t*t,t3=t2*t;return p1.map((_,k)=>.5*(2*p1[k]+(-p0[k]+p2[k])*t+(2*p0[k]-5*p1[k]+4*p2[k]-p3[k])*t2+(-p0[k]+3*p1[k]-3*p2[k]+p3[k])*t3))}
  function rail(points){
    const P=[points[0],...points,points[points.length-1]],out=[];let i=0;
    for(;i<P.length-3;i++)for(let c=0;c<SEG;c++)out.push(cr(P[i],P[i+1],P[i+2],P[i+3],c/SEG));
    out.push(cr(P[i-1],P[i],P[i+1],P[i+2],1));
    return out;
  }
  function sampleRoute(points,t){
    if(!Array.isArray(points)||points.length<2||points.some(p=>!Array.isArray(p)||p.length!==3||p.some(v=>!Number.isFinite(v))))throw new TypeError('Camera route needs finite 3D points');
    t=Number.isFinite(t)?Math.max(0,Math.min(1,t)):0;
    const key=JSON.stringify(points);let r=rails.get(key);
    if(!r){r=rail(points);if(rails.size>=16)rails.delete(rails.keys().next().value);rails.set(key,r)}
    if(t===0)return points[0].slice();if(t===1)return points[points.length-1].slice();
    const at=t*(r.length-1),i=Math.floor(at),a=r[i],b=r[Math.min(i+1,r.length-1)],f=at-i;
    return [a[0]+(b[0]-a[0])*f,a[1]+(b[1]-a[1])*f,a[2]+(b[2]-a[2])*f];
  }
  // Ease-in-out with a configurable arc: shared by the campus fly-to (c_campus.js) so every camera move has one feel.
  const easeInOut=x=>{x=Math.max(0,Math.min(1,x));return x<.5?4*x*x*x:1-Math.pow(-2*x+2,3)/2};
  const transitions=new WeakMap();
  function reveal(el){
    if(!el)return;transitions.get(el)?.cancel();
    if(matchMedia('(prefers-reduced-motion: reduce)').matches){el.style.opacity='1';return;}
    let a=null;
    if(typeof VaultLibraries!=='undefined'&&VaultLibraries.animate)a=VaultLibraries.animate(el,{opacity:[0,1],translateY:[8,0],duration:280,ease:'out(3)'});
    else if(typeof el.animate==='function')a=el.animate([{opacity:0,transform:'translateY(8px)'},{opacity:1,transform:'none'}],{duration:280,easing:'cubic-bezier(.22,1,.36,1)'});
    else{el.style.opacity='1';return;}
    transitions.set(el,a);return a;
  }
  // Offline shell: a small service worker (web/sw.js) caches vendor, assets and audio; index.html and config.js stay
  // network-first. Versioned by the build so a new release installs a fresh cache. Never on file:// or plain http.
  function registerOffline(){
    try{
      if(typeof navigator==='undefined'||!('serviceWorker' in navigator)||typeof location==='undefined')return false;
      const local=/^(localhost|127\.0\.0\.1|\[::1\])$/.test(location.hostname);
      if(location.protocol!=='https:'&&!local)return false;
      if(local&&!/[?&]sw=1/.test(location.search))return false; // local runs (smoke tests) stay uncached unless asked
      const v=typeof VAULT_BUILD!=='undefined'?(VAULT_BUILD.hash||VAULT_BUILD.version):'dev'; // content hash: each deploy gets its own cache
      const go=()=>navigator.serviceWorker.register('sw.js?v='+encodeURIComponent(v)).catch(e=>console.warn('offline cache unavailable:',e&&e.message||e));
      if(document.readyState==='complete')go();else addEventListener('load',go,{once:true});
      return true;
    }catch(e){return false}
  }
  registerOffline();
  return {sampleRoute,reveal,easeInOut,registerOffline,versions:{rail:'catmull-rom-48',reveal:'waapi'}};
})();
