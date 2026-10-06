// Babylon owns authored camera rail sampling; Anime owns cancellable DOM transitions.
// The existing Three renderer owns the city. No second GPU context is created.
const VaultEngine=(()=>{
  const rails=new Map();
  function sampleRoute(points,t){
    if(!Array.isArray(points)||points.length<2||points.some(p=>!Array.isArray(p)||p.length!==3||p.some(v=>!Number.isFinite(v))))throw new TypeError('Camera route needs finite 3D points');
    t=Number.isFinite(t)?Math.max(0,Math.min(1,t)):0;
    const key=JSON.stringify(points);let rail=rails.get(key);
    if(!rail){
      if(typeof VaultLibraries==='undefined')return points[0].map((v,i)=>v+(points[points.length-1][i]-v)*t);
      rail=VaultLibraries.Curve3.CreateCatmullRomSpline(points.map(p=>new VaultLibraries.Vector3(...p)),48,false).getPoints();
      if(rails.size>=16)rails.delete(rails.keys().next().value);rails.set(key,rail);
    }
    if(t===0)return points[0].slice();if(t===1)return points[points.length-1].slice();
    const at=t*(rail.length-1),i=Math.floor(at),a=rail[i],b=rail[Math.min(i+1,rail.length-1)],f=at-i;
    return [a.x+(b.x-a.x)*f,a.y+(b.y-a.y)*f,a.z+(b.z-a.z)*f];
  }
  const transitions=new WeakMap();
  function reveal(el){
    if(!el)return;transitions.get(el)?.cancel();
    if(matchMedia('(prefers-reduced-motion: reduce)').matches||typeof VaultLibraries==='undefined'){el.style.opacity='1';return;}
    const a=VaultLibraries.animate(el,{opacity:[0,1],translateY:[8,0],duration:280,ease:'out(3)'});transitions.set(el,a);return a;
  }
  return {sampleRoute,reveal,versions:{anime:'4.5.0',babylon:'9.29.0'}};
})();
