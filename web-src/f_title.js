// ---------- title: cold open, procedural city rising, wordmark, main menu. Everything here is code; no assets.
// Title.start() -> Promise that resolves once the player chooses "Enter the Vault". The overlay then dissolves over the live app.
const Title=(()=>{
const VERSION="v2.1",TAG="Architecting a Humane Future";
const K={seen:"vault.title.seen",sound:"vault.sound",cut:"vault.title.cutscene",q:"vault.quality"};
const S=(typeof store!=="undefined")?store:{get(k,d){try{const v=localStorage.getItem(k);return v==null?d:JSON.parse(v)}catch(e){return d}},set(k,v){try{localStorage.setItem(k,JSON.stringify(v))}catch(e){}}};
const today=()=>new Date().toISOString().slice(0,10);
const reduced=()=>window.matchMedia&&window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const ease=t=>t<.5?4*t*t*t:1-Math.pow(-2*t+2,3)/2;
const clamp=(v,a,b)=>Math.max(a,Math.min(b,v));
const CSS=`
#title{position:fixed;inset:0;z-index:80;background:#05070e;color:#F4EFE6;font-family:var(--body,system-ui,sans-serif);overflow:hidden;user-select:none;-webkit-user-select:none;--gold:var(--accent,#E8A33D);--t-ease:cubic-bezier(.2,.7,.2,1)}
#title canvas{position:absolute;inset:0;width:100%;height:100%;display:block}
#title .tv{position:absolute;inset:0;pointer-events:none;background:radial-gradient(ellipse at 50% 62%,transparent 40%,rgba(2,3,8,.55) 78%,rgba(2,3,8,.92) 100%)}
#title .tgrain{position:absolute;inset:0;pointer-events:none;opacity:.07;mix-blend-mode:overlay;background:repeating-linear-gradient(0deg,rgba(255,255,255,.08) 0 1px,transparent 1px 3px)}
#title .tbars{position:absolute;inset:0;pointer-events:none}
#title .tbars::before,#title .tbars::after{content:"";position:absolute;left:0;right:0;height:8vh;background:#020308;transition:transform 1.4s var(--t-ease)}
#title .tbars::before{top:0}#title .tbars::after{bottom:0}
#title.menu .tbars::before{transform:translateY(-100%)}#title.menu .tbars::after{transform:translateY(100%)}
#title .layer{position:absolute;inset:0;display:grid;place-items:center;text-align:center;padding:24px 16px;box-sizing:border-box;pointer-events:none}
#title .slate{font-family:var(--mono,ui-monospace,monospace);font-size:11px;letter-spacing:.32em;text-transform:uppercase;color:#8A93AD;opacity:0;transition:opacity .9s}
#title .slate.on{opacity:1}
#title .slate i{display:block;width:1px;height:0;margin:14px auto 0;background:var(--gold);transition:height 1.2s var(--t-ease)}
#title .slate.on i{height:42px}
#title .wm{display:grid;gap:10px;justify-items:center;transform:translateY(0);transition:transform 1s var(--t-ease)}
#title.menu .wm{transform:translateY(calc(-1 * var(--wm-up,26vh)))}
#title .word{font-family:var(--display,"Space Grotesk",sans-serif);font-weight:700;font-size:clamp(34px,7.2vw,96px);line-height:.95;letter-spacing:.06em;position:relative;white-space:nowrap}
#title .word span{display:inline-block;opacity:0;transform:translateY(.35em) rotateX(40deg);filter:blur(6px);transition:opacity .55s var(--t-ease),transform .7s var(--t-ease),filter .6s}
#title .word span.on{opacity:1;transform:none;filter:none}
#title .word span.sp{width:.32em}
#title .sweep{position:absolute;inset:-10% -4%;pointer-events:none;background:linear-gradient(100deg,transparent 35%,rgba(255,236,200,.75) 50%,transparent 65%);transform:translateX(-120%);mix-blend-mode:screen;opacity:0}
#title .sweep.go{animation:tsweep 1.3s var(--t-ease) forwards}
@keyframes tsweep{0%{transform:translateX(-120%);opacity:0}15%{opacity:1}100%{transform:translateX(120%);opacity:0}}
#title .sub{font-family:var(--display,"Space Grotesk",sans-serif);font-weight:500;font-size:clamp(13px,1.6vw,20px);letter-spacing:.62em;text-indent:.62em;color:var(--gold);opacity:0;transform:translateY(8px);transition:opacity .9s,transform .9s var(--t-ease)}
#title .sub.on{opacity:1;transform:none}
#title .rule{width:0;height:1px;background:linear-gradient(90deg,transparent,var(--gold),transparent);transition:width 1.2s var(--t-ease)}
#title .rule.on{width:min(420px,70vw)}
#title .tag{font-family:var(--body,system-ui);font-style:italic;font-size:clamp(13px,1.4vw,17px);color:#C9CFDF;letter-spacing:.04em;opacity:0;transition:opacity 1.2s}
#title .tag.on{opacity:1}
#title .skip{position:absolute;right:18px;bottom:18px;font-family:var(--mono,monospace);font-size:11px;letter-spacing:.2em;text-transform:uppercase;color:#8A93AD;border:1px solid rgba(138,147,173,.35);padding:8px 14px;border-radius:999px;background:rgba(5,7,14,.5);transition:color .2s,border-color .2s,opacity .5s;pointer-events:auto}
#title .skip:hover{color:#fff;border-color:var(--gold)}
#title.menu .skip{opacity:0;pointer-events:none}
#title .mm{position:absolute;left:0;right:0;top:50%;display:grid;justify-items:center;gap:6px;opacity:0;transform:translateY(24px);transition:opacity .8s .2s,transform .9s .2s var(--t-ease);pointer-events:none}
#title.menu .mm{opacity:1;transform:none;pointer-events:auto}
#title .mm button{font-family:var(--display,"Space Grotesk",sans-serif);font-weight:600;font-size:clamp(17px,1.5vw,22px);letter-spacing:.18em;text-transform:uppercase;color:#C9CFDF;padding:12px 28px;position:relative;border-radius:4px;transition:color .18s,transform .18s var(--t-ease)}
#title .mm button::before{content:"";position:absolute;left:8px;top:50%;width:0;height:1px;background:var(--gold);transition:width .22s var(--t-ease)}
#title .mm button:hover,#title .mm button.on{color:#fff;transform:translateX(6px)}
#title .mm button:hover::before,#title .mm button.on::before{width:12px}
#title .mm button.pri{color:#fff;border:1px solid rgba(232,163,61,.55);background:linear-gradient(180deg,rgba(232,163,61,.18),rgba(232,163,61,.06));box-shadow:0 0 0 1px rgba(232,163,61,.12) inset,0 18px 40px -22px var(--gold);margin-bottom:10px;padding:14px 40px}
#title .mm button.pri:hover,#title .mm button.pri.on{background:var(--gold);color:#1a1204;border-color:var(--gold);transform:translateX(0) scale(1.02)}
#title .mm button.pri::before{display:none}
#title .mm button:focus-visible{outline:1px solid var(--gold);outline-offset:3px}
#title .foot{position:absolute;left:18px;right:18px;bottom:18px;display:flex;justify-content:space-between;align-items:flex-end;font-family:var(--mono,monospace);font-size:10.5px;letter-spacing:.18em;text-transform:uppercase;color:#59627D;opacity:0;transition:opacity 1s .6s;pointer-events:none}
#title.menu .foot{opacity:1}
#title .foot b{color:#8A93AD;font-weight:400}
#title .foot .hintk{color:#59627D}
#title .foot kbd{font:inherit;border:1px solid rgba(138,147,173,.35);border-radius:4px;padding:1px 6px;margin-right:4px}
#title .panel{position:absolute;left:50%;top:50%;transform:translate(-50%,-50%) scale(.97);width:min(420px,calc(100% - 32px));background:rgba(10,14,26,.9);border:1px solid rgba(138,147,173,.22);border-top:2px solid var(--gold);border-radius:14px;padding:22px 22px 18px;box-sizing:border-box;opacity:0;pointer-events:none;transition:opacity .25s,transform .3s var(--t-ease);-webkit-backdrop-filter:blur(14px) saturate(1.3);backdrop-filter:blur(14px) saturate(1.3);box-shadow:0 40px 90px -30px rgba(0,0,0,.8);text-align:left}
#title .panel.on{opacity:1;pointer-events:auto;transform:translate(-50%,-50%)}
#title .panel .k{font-family:var(--mono,monospace);font-size:10.5px;letter-spacing:.2em;text-transform:uppercase;color:var(--gold)}
#title .panel h2{font-family:var(--display,"Space Grotesk",sans-serif);font-size:22px;margin:4px 0 14px;letter-spacing:-.01em;color:#fff}
#title .panel .row{display:flex;align-items:center;justify-content:space-between;gap:12px;padding:10px 0;border-top:1px solid rgba(138,147,173,.16);font-size:14px;color:#C9CFDF}
#title .panel .row small{display:block;font-size:12px;color:#8A93AD}
#title .seg{display:flex;border:1px solid rgba(138,147,173,.3);border-radius:999px;overflow:hidden;flex:none}
#title .seg button{font-family:var(--mono,monospace);font-size:11px;letter-spacing:.1em;text-transform:uppercase;padding:6px 12px;color:#8A93AD}
#title .seg button.on{background:var(--gold);color:#1a1204}
#title .panel .act{display:flex;gap:8px;justify-content:flex-end;margin-top:14px;flex-wrap:wrap}
#title .panel .act button{font-size:13px;padding:7px 14px;border:1px solid rgba(138,147,173,.3);border-radius:8px;color:#C9CFDF}
#title .panel .act button:hover{border-color:var(--gold);color:#fff}
#title .panel p{margin:0 0 6px;font-size:14px;color:#C9CFDF;line-height:1.6}
#title .panel p.dim{color:#8A93AD;font-size:12.5px}
#title.out{animation:tout .9s var(--t-ease) forwards}
@keyframes tout{0%{clip-path:inset(0 0 0 0);opacity:1;transform:scale(1)}55%{clip-path:inset(0 0 0 0);opacity:1}100%{clip-path:inset(50% 0 50% 0);opacity:0;transform:scale(1.04)}}
#title.out .wm,#title.out .mm,#title.out .foot{opacity:0;transition:opacity .35s}
#title.out .tbars::before,#title.out .tbars::after{transform:none;transition:transform .55s var(--t-ease)}
@media (max-width:640px){#title .word{letter-spacing:.04em;font-size:clamp(30px,10.5vw,52px)}#title .word span.sp{display:block;height:0;width:0}#title .word span.sp+span{margin-left:0}#title{--wm-up:21vh}#title .mm button{font-size:15px;padding:10px 22px}#title .mm button.pri{padding:12px 32px}#title .foot{font-size:9.5px;letter-spacing:.12em}#title .foot .hintk{display:none}#title .skip{bottom:14px;right:14px}}
@media (prefers-reduced-motion: reduce){#title *{transition-duration:.01ms!important;animation-duration:.01ms!important}}
`;
// ---- synth: pad + slow arpeggio, under 20 s, created on the first user gesture only.
const Score=(()=>{let ctx=null,master=null,nodes=[],timer=0;
  const on=()=>S.get(K.sound,true)!==false;
  function start(){if(ctx||!on())return;try{ctx=new (window.AudioContext||window.webkitAudioContext)()}catch(e){return}
    if(ctx.state==="suspended")ctx.resume();
    const t=ctx.currentTime;master=ctx.createGain();master.gain.setValueAtTime(0,t);master.gain.linearRampToValueAtTime(.55,t+2.5);
    const lp=ctx.createBiquadFilter();lp.type="lowpass";lp.frequency.setValueAtTime(420,t);lp.frequency.linearRampToValueAtTime(1900,t+9);lp.Q.value=.6;
    const dl=ctx.createDelay(1);dl.delayTime.value=.37;const fb=ctx.createGain();fb.gain.value=.34;const wet=ctx.createGain();wet.gain.value=.32;
    lp.connect(master);lp.connect(dl);dl.connect(fb);fb.connect(dl);dl.connect(wet);wet.connect(master);master.connect(ctx.destination);
    // pad: two detuned saws per note on a D minor 9 voicing, slow LFO on the filter
    const pad=[73.42,110,146.83,174.61,220,261.63];
    pad.forEach((f,i)=>{[-6,6].forEach(d=>{const o=ctx.createOscillator(),g=ctx.createGain();o.type=i<2?"sawtooth":"triangle";o.frequency.value=f;o.detune.value=d+(i%2?3:-3);
      g.gain.setValueAtTime(0,t);g.gain.linearRampToValueAtTime(.045,t+3+i*.4);g.gain.setValueAtTime(.045,t+14);g.gain.linearRampToValueAtTime(0,t+18.5);
      o.connect(g).connect(lp);o.start(t);o.stop(t+19);nodes.push(o)})});
    const lfo=ctx.createOscillator(),lg=ctx.createGain();lfo.frequency.value=.11;lg.gain.value=260;lfo.connect(lg).connect(lp.frequency);lfo.start(t);lfo.stop(t+19);nodes.push(lfo);
    // arpeggio: D F A C E G A D, eighth notes at 68 bpm, enters with the city, opens up with the wordmark
    const arp=[293.66,349.23,440,523.25,659.25,783.99,880,1174.66];const step=60/68/2;
    for(let n=0,k=0;t+2.6+n*step<t+17;n++){if(n%8===7)continue;const f=arp[k%arp.length]*(n>=24?1:.5);k++;const at=t+2.6+n*step;
      const o=ctx.createOscillator(),g=ctx.createGain();o.type="sine";o.frequency.value=f;const vol=(n>=24?.09:.055)*(n>=48?Math.max(0,(17-(n*step+2.6))/4):1);
      g.gain.setValueAtTime(0,at);g.gain.linearRampToValueAtTime(vol,at+.02);g.gain.exponentialRampToValueAtTime(.0001,at+step*1.8);o.connect(g).connect(lp);o.start(at);o.stop(at+step*2);nodes.push(o)}
    // bass pulse under the reveal
    [7.4,9.2,11].forEach(at=>{const o=ctx.createOscillator(),g=ctx.createGain();o.type="sine";o.frequency.value=36.71;g.gain.setValueAtTime(0,t+at);g.gain.linearRampToValueAtTime(.35,t+at+.05);g.gain.exponentialRampToValueAtTime(.0001,t+at+1.6);o.connect(g).connect(master);o.start(t+at);o.stop(t+at+1.8);nodes.push(o)});
    timer=setTimeout(stop,19500);
  }
  function tick(f=880,len=.08,gain=.05){if(!ctx||!on())return;const t=ctx.currentTime,o=ctx.createOscillator(),g=ctx.createGain();o.type="triangle";o.frequency.value=f;g.gain.setValueAtTime(0,t);g.gain.linearRampToValueAtTime(gain,t+.008);g.gain.exponentialRampToValueAtTime(.0001,t+len);o.connect(g).connect(ctx.destination);o.start(t);o.stop(t+len+.02)}
  function duck(sec){if(!ctx||!master)return;const t=ctx.currentTime;master.gain.cancelScheduledValues(t);master.gain.setValueAtTime(master.gain.value,t);master.gain.linearRampToValueAtTime(0,t+sec)}
  function stop(){clearTimeout(timer);nodes.forEach(o=>{try{o.stop()}catch(e){}});nodes=[];if(ctx){const c=ctx;ctx=null;master=null;setTimeout(()=>{try{c.close()}catch(e){}},200)}}
  return{start,tick,duck,stop,live:()=>!!ctx};
})();
// ---- the picture: an instanced grid city that grows from a dark plane while the camera drifts up and back.
function makeCity(canvas,quality){
  if(typeof THREE==="undefined")return null;
  let r;try{r=new THREE.WebGLRenderer({canvas,antialias:quality==="high",alpha:false,powerPreference:"high-performance"})}catch(e){return null}
  const dpr=Math.min(window.devicePixelRatio||1,quality==="high"?2:1);r.setPixelRatio(dpr);
  const scene=new THREE.Scene();scene.background=new THREE.Color(0x05070e);scene.fog=new THREE.FogExp2(0x05070e,.016);
  const cam=new THREE.PerspectiveCamera(42,1,.1,600);
  const G=quality==="high"?46:30,CELL=4.2;const N=G*G;
  const geo=new THREE.BoxGeometry(1,1,1);geo.translate(0,.5,0);
  const mat=new THREE.MeshStandardMaterial({color:0xffffff,roughness:.55,metalness:.25,emissive:0x0b1024,emissiveIntensity:.9});
  const mesh=new THREE.InstancedMesh(geo,mat,N);mesh.frustumCulled=false;scene.add(mesh);
  const seed=(i,j)=>{const s=Math.sin(i*127.1+j*311.7)*43758.5453;return s-Math.floor(s)};
  const H=new Float32Array(N),D=new Float32Array(N),W=new Float32Array(N);
  for(let i=0;i<G;i++)for(let j=0;j<G;j++){const k=i*G+j;const dx=(i-G/2)/(G/2),dz=(j-G/2)/(G/2);const d=Math.sqrt(dx*dx+dz*dz);
    const core=Math.max(0,1-d*1.15);const rnd=seed(i,j);H[k]=(2+rnd*rnd*26)*(.25+core*core*2.2)*((i%7===3||j%9===4)?.1:1);D[k]=rnd*.5+d*.6;W[k]=CELL*(.46+seed(j,i)*.34)}
  const m4=new THREE.Matrix4(),col=new THREE.Color();
  const lit=new Float32Array(N);for(let k=0;k<N;k++)lit[k]=seed(k%G*3,Math.floor(k/G)*5);
  function write(g,time){for(let i=0;i<G;i++)for(let j=0;j<G;j++){const k=i*G+j;const p=clamp((g-D[k])/.42,0,1);const e=ease(p);const h=Math.max(.02,H[k]*e);
      m4.makeScale(W[k],h,W[k]);m4.setPosition((i-G/2+.5)*CELL,0,(j-G/2+.5)*CELL);mesh.setMatrixAt(k,m4);
      const warm=lit[k]>.72?1:0;const glow=e*(warm?.55+.45*Math.sin(time*1.3+lit[k]*40):.08);col.setRGB(.16+glow*.85,.19+glow*.55,.34+glow*.1);mesh.setColorAt(k,col)}
    mesh.instanceMatrix.needsUpdate=true;if(mesh.instanceColor)mesh.instanceColor.needsUpdate=true}
  // ground plane with a faint grid of emissive lines
  const ground=new THREE.Mesh(new THREE.PlaneGeometry(G*CELL*3,G*CELL*3),new THREE.MeshStandardMaterial({color:0x070a14,roughness:.9,metalness:.1}));ground.rotation.x=-Math.PI/2;ground.position.y=-.01;scene.add(ground);
  const grid=new THREE.GridHelper(G*CELL,G,0x1d2648,0x141a30);grid.material.transparent=true;grid.material.opacity=.6;scene.add(grid);
  // data lattice: points that rise with the city
  const PN=quality==="high"?1400:600;const pp=new Float32Array(PN*3),pv=new Float32Array(PN);
  for(let k=0;k<PN;k++){pp[k*3]=(Math.random()-.5)*G*CELL*1.3;pp[k*3+1]=Math.random()*60;pp[k*3+2]=(Math.random()-.5)*G*CELL*1.3;pv[k]=.4+Math.random()}
  const pgeo=new THREE.BufferGeometry();pgeo.setAttribute("position",new THREE.BufferAttribute(pp,3));
  const pts=new THREE.Points(pgeo,new THREE.PointsMaterial({color:0xf2b85b,size:.32,transparent:true,opacity:0,sizeAttenuation:true,depthWrite:false}));scene.add(pts);
  scene.add(new THREE.HemisphereLight(0x55689f,0x0a0c18,.9));
  const sun=new THREE.DirectionalLight(0xf2b85b,0);sun.position.set(-40,60,-30);scene.add(sun);
  const key=new THREE.PointLight(0xe8a33d,0,300,1.4);key.position.set(0,42,0);scene.add(key);
  const rim=new THREE.DirectionalLight(0x5b9bf0,.25);rim.position.set(60,30,80);scene.add(rim);
  let w=0,h=0;function size(){const W2=canvas.clientWidth||innerWidth,H2=canvas.clientHeight||innerHeight;if(W2===w&&H2===h)return;w=W2;h=H2;r.setSize(w,h,false);cam.aspect=w/h;cam.updateProjectionMatrix()}
  // camera path: starts low in the streets looking up, ends high and back, then orbits for the menu
  function render(p,time,menu){size();
    const g=clamp((p-.1)/.6,0,1.25);write(g,time);
    const k=ease(clamp(p/.9,0,1));
    const orbit=menu?(time*.05):0;
    const dist=18+k*120,height=1.5+k*58;const a=-.35+k*.9+orbit;
    cam.position.set(Math.sin(a)*dist,height,Math.cos(a)*dist);cam.lookAt(0,8+k*6,0);
    cam.fov=42-k*8;cam.updateProjectionMatrix();
    const dawn=clamp((p-.45)/.4,0,1);sun.intensity=dawn*1.6;key.intensity=clamp((p-.2)/.4,0,1)*3.2*(.85+.15*Math.sin(time*2.1));
    pts.material.opacity=clamp((p-.25)/.3,0,1)*.7;const pos=pgeo.attributes.position.array;for(let q=0;q<PN;q++){pos[q*3+1]+=pv[q]*.06;if(pos[q*3+1]>70)pos[q*3+1]=0}pgeo.attributes.position.needsUpdate=true;
    scene.fog.density=.016-dawn*.011;
    r.render(scene,cam)}
  function dispose(){scene.traverse(o=>{if(o.geometry)o.geometry.dispose();if(o.material){[].concat(o.material).forEach(m=>m.dispose())}});r.dispose();try{r.forceContextLoss()}catch(e){}}
  return{render,dispose};
}
// ---- the overlay
function start(){
  return new Promise(resolve=>{
    if(document.getElementById("title")){resolve();return}
    const style=document.createElement("style");style.id="titleCss";style.textContent=CSS;document.head.appendChild(style);
    const root=document.createElement("div");root.id="title";root.setAttribute("role","dialog");root.setAttribute("aria-label","Collective AI Vault title screen");
    const letters=s=>[...s].map(c=>`<span class="${c===" "?"sp":""}">${c===" "?"":c}</span>`).join("");
    root.innerHTML=`<canvas id="titleGl" aria-hidden="true"></canvas><div class="tv"></div><div class="tgrain"></div><div class="tbars"></div>
<div class="layer"><div class="slate" id="tSlate">Collective AI Inc · 2026<i></i></div></div>
<div class="layer"><div class="wm" id="tWm"><div class="word" id="tWord">${letters("COLLECTIVE AI")}<div class="sweep" id="tSweep"></div></div><div class="sub" id="tSub">VAULT</div><div class="rule" id="tRule"></div><div class="tag" id="tTag">${TAG}</div></div></div>
<nav class="mm" id="tMenu" aria-label="Main menu"><button class="pri" data-act="enter">Enter the Vault</button><button data-act="settings">Settings</button><button data-act="credits">Credits</button></nav>
<div class="panel" id="tSettings" role="dialog" aria-label="Settings"><div class="k">Settings</div><h2>Vault</h2>
<div class="row"><div>Sound<small>Score and campus chimes</small></div><div class="seg" data-k="sound"><button data-v="true">On</button><button data-v="false">Off</button></div></div>
<div class="row"><div>Opening cutscene<small>Plays once a day. Off shows a short sting.</small></div><div class="seg" data-k="cut"><button data-v="true">On</button><button data-v="false">Off</button></div></div>
<div class="row"><div>Quality<small>Low halves the pixel count and the skyline.</small></div><div class="seg" data-k="q"><button data-v="low">Low</button><button data-v="high">High</button></div></div>
<div class="act"><button data-act="replay">Replay intro</button><button data-act="close">Done</button></div></div>
<div class="panel" id="tCredits" role="dialog" aria-label="Credits"><div class="k">Credits</div><h2>Collective AI Vault</h2>
<p>Collective AI Inc</p><p>JR Moyler (Hataalii), Co-Founder and CEO</p><p class="dim">Built with three.js. The skyline, the score and every frame of this opening are generated in code at runtime; nothing is loaded from a file.</p>
<div class="act"><button data-act="close">Done</button></div></div>
<button class="skip" id="tSkip">Skip</button>
<div class="foot"><div><b>Collective AI</b> · Vault · ${VERSION}</div><div class="hintk"><kbd>↑↓</kbd>move <kbd>Enter</kbd>select <kbd>Esc</kbd>back</div></div>`;
    document.body.appendChild(root);
    const $t=s=>root.querySelector(s);
    const canvas=$t("#titleGl"),menu=$t("#tMenu"),mbtns=[...menu.querySelectorAll("button")];
    const quality=S.get(K.q,"high");
    const noMotion=reduced();
    const city=noMotion?null:makeCity(canvas,quality);
    if(!city)canvas.style.background="radial-gradient(ellipse at 50% 70%,#161d3a,#05070e 70%)";
    // timeline (seconds). Full cutscene is ~14 s; the sting compresses it to 1.5 s.
    const full=[["slate",.6],["slateOff",3.2],["letters",6.2],["sweep",8.0],["sub",8.9],["rule",9.3],["tag",10.2],["menu",12.6]];
    const sting=[["letters",.05],["sweep",.5],["sub",.6],["rule",.7],["tag",.8],["menu",1.5]];
    const seenToday=S.get(K.seen,null)===today();
    const cutOn=S.get(K.cut,true)!==false;
    let cue=noMotion?[["letters",0],["sub",0],["rule",0],["tag",0],["menu",0]]:(seenToday||!cutOn)?sting:full;
    const lettersEls=[...$t("#tWord").querySelectorAll("span")];
    let t0=performance.now(),cueI=0,inMenu=false,done=false,raf=0,progress=0,menuAt=0,sel=0,panel=null;
    const CUT_LEN=full[full.length-1][1];
    function fire(name){switch(name){
      case"slate":$t("#tSlate").classList.add("on");break;
      case"slateOff":$t("#tSlate").classList.remove("on");break;
      case"letters":lettersEls.forEach((el,i)=>setTimeout(()=>{el.classList.add("on");if(i%3===0)Score.tick(660+i*18,.06,.025)},noMotion?0:i*70));break;
      case"sweep":$t("#tSweep").classList.add("go");break;
      case"sub":$t("#tSub").classList.add("on");break;
      case"rule":$t("#tRule").classList.add("on");break;
      case"tag":$t("#tTag").classList.add("on");break;
      case"menu":toMenu();break}}
    function toMenu(){if(inMenu)return;inMenu=true;menuAt=performance.now();cue.forEach(c=>{if(c[0]!=="menu")fire(c[0])});cueI=cue.length;root.classList.add("menu");S.set(K.seen,today());setSel(0);setTimeout(()=>{if(!done)mbtns[0].focus({preventScroll:true})},700)}
    function setSel(i){sel=(i+mbtns.length)%mbtns.length;mbtns.forEach((b,j)=>b.classList.toggle("on",j===sel))}
    function frame(now){raf=requestAnimationFrame(frame);const t=(now-t0)/1000;
      while(cueI<cue.length&&t>=cue[cueI][1]){fire(cue[cueI][0]);cueI++}
      if(city){if(!inMenu)progress=cue===full?clamp(t/CUT_LEN,0,1):1;else progress=Math.min(1,progress+(1-progress)*.04+.004);
        try{city.render(progress,t,inMenu)}catch(e){}}}
    raf=requestAnimationFrame(frame);
    // first user gesture starts the score (browser policy); any gesture during the cutscene also skips it
    let gestured=false;function gesture(){if(gestured)return;gestured=true;Score.start()}
    function skip(){gesture();if(!inMenu){t0=performance.now()-CUT_LEN*1000;toMenu()}}
    $t("#tSkip").addEventListener("click",e=>{e.stopPropagation();skip()});
    root.addEventListener("pointerdown",e=>{gesture();if(!inMenu)skip()});
    // panels
    function openPanel(id){panel=id;$t("#tSettings").classList.toggle("on",id==="tSettings");$t("#tCredits").classList.toggle("on",id==="tCredits");if(id==="tSettings")paintSettings();Score.tick(520,.07,.03);const f=$t("#"+id+" .act button:last-child");if(f)f.focus({preventScroll:true})}
    function closePanel(){panel=null;$t("#tSettings").classList.remove("on");$t("#tCredits").classList.remove("on");mbtns[sel].focus({preventScroll:true})}
    function paintSettings(){const v={sound:String(S.get(K.sound,true)!==false),cut:String(S.get(K.cut,true)!==false),q:S.get(K.q,"high")};root.querySelectorAll("#tSettings .seg").forEach(seg=>{const k=seg.dataset.k;seg.querySelectorAll("button").forEach(b=>b.classList.toggle("on",b.dataset.v===v[k]))})}
    $t("#tSettings").addEventListener("click",e=>{const b=e.target.closest("button");if(!b)return;const seg=b.closest(".seg");
      if(seg){const k=seg.dataset.k;const v=b.dataset.v;if(k==="sound"){S.set(K.sound,v==="true");if(v==="false")Score.stop()}else if(k==="cut")S.set(K.cut,v==="true");else S.set(K.q,v);paintSettings();Score.tick(760,.06,.03);return}
      if(b.dataset.act==="replay"){replay();return}if(b.dataset.act==="close")closePanel()});
    $t("#tCredits").addEventListener("click",e=>{const b=e.target.closest("button[data-act=close]");if(b)closePanel()});
    function replay(){closePanel();root.classList.remove("menu");inMenu=false;progress=0;S.set(K.seen,"");
      ["#tSlate","#tSub","#tRule","#tTag"].forEach(s=>$t(s).classList.remove("on"));$t("#tSweep").classList.remove("go");lettersEls.forEach(el=>el.classList.remove("on"));
      cue=noMotion?[["letters",0],["sub",0],["rule",0],["tag",0],["menu",0]]:full;cueI=0;t0=performance.now();Score.stop();gestured=false;gesture()}
    function enter(){if(done)return;done=true;Score.tick(880,.25,.06);Score.duck(.8);
      root.classList.add("out");cancelAnimationFrame(raf);
      const ms=noMotion?10:920;
      setTimeout(()=>{if(city)city.dispose();Score.stop();root.remove();style.remove();window.removeEventListener("keydown",key);resolve()},ms)}
    menu.addEventListener("click",e=>{const b=e.target.closest("button");if(!b)return;act(b.dataset.act)});
    menu.addEventListener("pointermove",e=>{const b=e.target.closest("button");if(b)setSel(mbtns.indexOf(b))});
    function act(a){if(a==="enter")enter();else if(a==="settings")openPanel("tSettings");else if(a==="credits")openPanel("tCredits")}
    function key(e){if(done)return;gesture();
      if(!inMenu){if(e.key!=="Tab")e.preventDefault();skip();return}
      if(panel){if(e.key==="Escape"){e.preventDefault();closePanel()}return}
      if(e.key==="ArrowDown"||e.key==="ArrowUp"||e.key==="w"||e.key==="s"){e.preventDefault();setSel(sel+(e.key==="ArrowDown"||e.key==="s"?1:-1));Score.tick(620,.05,.02);mbtns[sel].focus({preventScroll:true})}
      else if(e.key==="Enter"||e.key===" "){if(document.activeElement&&document.activeElement.closest&&document.activeElement.closest("#tMenu"))return;e.preventDefault();act(mbtns[sel].dataset.act)}}
    window.addEventListener("keydown",key);
  });
}
return{start,version:VERSION};
})();
