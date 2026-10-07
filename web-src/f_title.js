// ---------- title: code-only camera choreography, skyline, postprocessing and menu.
// Original PCM Foley is generated offline by scripts/generate_audio.py; score is synthesized live.
// The cold open is a three-shot cutscene rendered live in three.js: (1) night sky tilting down onto a campus rising from
// the plain, (2) a low push down a lit avenue with sentinels walking, (3) dawn over the skyline as the wordmark lands.
// Shots crossfade through render targets; letterbox, grain, light leaks, slates and the WebAudio score are code too.
// Title.start() -> Promise that resolves once the player chooses "Enter the Vault". The overlay then dissolves over the live app.
const Title=(()=>{
// Version comes from package.json, injected by scripts/build_web.py as VAULT_BUILD (UI pass).
const VERSION=typeof VAULT_BUILD!=="undefined"&&VAULT_BUILD.version?"v"+VAULT_BUILD.version:"dev",TAG="Architecting a Humane Future";
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
#title .tgrain{position:absolute;inset:-120px;pointer-events:none;opacity:.07;mix-blend-mode:overlay;background:repeating-linear-gradient(0deg,rgba(255,255,255,.08) 0 1px,transparent 1px 3px)}
#title .tgrain.noise{opacity:.045;background-repeat:repeat;background-size:128px 128px;animation:tgrain .6s steps(6) infinite}
@keyframes tgrain{0%{transform:translate(0,0)}17%{transform:translate(-37px,21px)}33%{transform:translate(29px,-44px)}50%{transform:translate(-52px,-13px)}67%{transform:translate(18px,47px)}83%{transform:translate(61px,-29px)}100%{transform:translate(0,0)}}
#title .tleak{position:absolute;inset:0;pointer-events:none;mix-blend-mode:screen;opacity:0;background:radial-gradient(ellipse 60% 70% at 14% 38%,rgba(232,163,61,.55),transparent 60%),radial-gradient(ellipse 50% 40% at 88% 72%,rgba(255,214,150,.28),transparent 60%)}
#title .tleak.go{animation:tleak 1.5s ease-out}
@keyframes tleak{0%{opacity:0}28%{opacity:.85}100%{opacity:0}}
#title .tcap{position:absolute;left:16px;right:16px;bottom:calc(11vh + 22px);text-align:center;font-family:var(--mono,ui-monospace,monospace);font-size:12px;letter-spacing:.34em;text-transform:uppercase;color:#E9E3D6;opacity:0;transform:translateY(6px);transition:opacity .8s,transform .8s var(--t-ease);pointer-events:none;text-shadow:0 1px 12px rgba(0,0,0,.8)}
#title .tcap.on{opacity:1;transform:none}
#title .tcap b{color:var(--gold);font-weight:400;margin-right:.9em}
#title .tsnd{position:absolute;left:18px;bottom:18px;font-family:var(--mono,monospace);font-size:11px;letter-spacing:.2em;text-transform:uppercase;color:#8A93AD;border:1px solid rgba(138,147,173,.35);padding:8px 14px;border-radius:999px;background:rgba(5,7,14,.5);transition:color .2s,border-color .2s,opacity .5s;pointer-events:auto;display:none}
#title .tsnd.on{display:block}
#title .tsnd:hover{color:#fff;border-color:var(--gold)}
#title.menu .tsnd{opacity:0;pointer-events:none}
#title .tbars{position:absolute;inset:0;pointer-events:none}
#title.cine .tbars::before,#title.cine .tbars::after{height:11vh}
#title .tbars::before,#title .tbars::after{content:"";position:absolute;left:0;right:0;height:8vh;z-index:1;background:#020308;transition:transform 1.4s var(--t-ease)}
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
#title .mm{position:absolute;left:50%;top:50%;width:min(380px,calc(100% - 48px));box-sizing:border-box;display:grid;justify-items:stretch;gap:8px;padding:18px 20px;background:rgba(5,10,24,.84);border:1px solid rgba(212,168,67,.22);border-radius:12px;box-shadow:0 24px 70px rgba(0,0,0,.35);-webkit-backdrop-filter:blur(14px);backdrop-filter:blur(14px);opacity:0;transform:translate(-50%,24px);transition:opacity .8s .2s,transform .9s .2s var(--t-ease);pointer-events:none}
#title.menu .mm{opacity:1;transform:translate(-50%,0);pointer-events:auto}
#title.menu .tgrain.noise{opacity:.018;animation:none}
#title.menu .tv{background:linear-gradient(180deg,rgba(2,3,8,.12),rgba(2,3,8,.08) 36%,rgba(2,3,8,.30) 70%,rgba(2,3,8,.64)),radial-gradient(ellipse at 50% 50%,transparent 24%,rgba(2,3,8,.38) 82%)}
#title.menu .word,#title.menu .tag{text-shadow:0 2px 24px rgba(0,0,0,.72)}
#title.menu .sub{color:#EDC46C;text-shadow:0 2px 14px #050A18}
#title .mm button{font-family:var(--display,"Space Grotesk",sans-serif);font-weight:600;font-size:clamp(17px,1.5vw,22px);letter-spacing:.18em;text-transform:uppercase;color:#C9CFDF;padding:12px 28px;position:relative;border-radius:4px;transition:color .18s,transform .18s var(--t-ease)}
#title .mm button::before{content:"";position:absolute;left:8px;top:50%;width:0;height:1px;background:var(--gold);transition:width .22s var(--t-ease)}
#title .mm button:hover,#title .mm button.on{color:#fff;transform:translateX(6px)}
#title .mm button:hover::before,#title .mm button.on::before{width:12px}
#title .mm button.pri{color:#fff;border:1px solid rgba(232,163,61,.55);background:#D4A843;color:#15100A;box-shadow:0 0 0 1px rgba(255,236,190,.12) inset,0 12px 30px -20px var(--gold);margin-bottom:10px;padding:14px 40px}
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
@media (pointer:coarse){#title .seg button{min-height:44px;min-width:44px;padding:6px 10px}#title .skip,#title .tsnd{min-height:44px;min-width:44px}}
#title .panel .act{display:flex;gap:8px;justify-content:flex-end;margin-top:14px;flex-wrap:wrap}
#title .panel .act button{font-size:13px;padding:7px 14px;border:1px solid rgba(138,147,173,.3);border-radius:8px;color:#C9CFDF}
#title .panel .act button:hover{border-color:var(--gold);color:#fff}
#title .panel p{margin:0 0 6px;font-size:14px;color:#C9CFDF;line-height:1.6}
#title .panel p.dim{color:#8A93AD;font-size:12.5px}
#title.out{animation:tout .9s var(--t-ease) forwards}
@keyframes tout{0%{clip-path:inset(0 0 0 0);opacity:1;transform:scale(1)}55%{clip-path:inset(0 0 0 0);opacity:1}100%{clip-path:inset(50% 0 50% 0);opacity:0;transform:scale(1.04)}}
#title.out .wm,#title.out .mm,#title.out .foot{opacity:0;transition:opacity .35s}
#title.out .tbars::before,#title.out .tbars::after{transform:none;transition:transform .55s var(--t-ease)}
@media (max-width:640px){#title.cine .tbars::before,#title.cine .tbars::after{height:7vh}#title .tcap{bottom:calc(7vh + 18px);font-size:10.5px;letter-spacing:.24em}#title .tsnd{bottom:14px;left:14px}#title .word{letter-spacing:.04em;font-size:clamp(30px,10.5vw,52px)}#title .word span.sp{display:block;height:0;width:0}#title .word span.sp+span{margin-left:0}#title{--wm-up:21vh}#title .mm button{font-size:15px;padding:10px 22px}#title .mm button.pri{padding:12px 32px}#title .foot{font-size:9.5px;letter-spacing:.12em}#title .foot .hintk{display:none}#title .skip{bottom:14px;right:14px}}
@media (prefers-reduced-motion: reduce){#title *{transition-duration:.01ms!important;animation-duration:.01ms!important}}
`;
// ---- synth: pad + slow arpeggio, under 20 s, created on the first user gesture only.
const Score=(()=>{let ctx=null,master=null,nodes=[],timer=0;
  const on=()=>S.get(K.sound,true)!==false;
  function start(off){off=clamp(+off||0,0,14);if(ctx||!on())return;try{ctx=new (window.AudioContext||window.webkitAudioContext)()}catch(e){return}
    if(ctx.state==="suspended")ctx.resume();
    const now=ctx.currentTime,t=now-off;master=ctx.createGain();master.gain.setValueAtTime(0,now);master.gain.linearRampToValueAtTime(.55*(typeof VaultAudio!=="undefined"?VaultAudio.level("music"):1)/* music slider */,now+(off?1.2:2.5));
    const lp=ctx.createBiquadFilter();lp.type="lowpass";lp.frequency.setValueAtTime(420+1480*clamp(off/9,0,1),now);lp.frequency.linearRampToValueAtTime(1900,Math.max(now+.01,t+9));lp.Q.value=.6;
    const dl=ctx.createDelay(1);dl.delayTime.value=.37;const fb=ctx.createGain();fb.gain.value=.34;const wet=ctx.createGain();wet.gain.value=.32;
    lp.connect(master);lp.connect(dl);dl.connect(fb);fb.connect(dl);dl.connect(wet);wet.connect(master);master.connect(ctx.destination);
    // pad: two detuned saws per note on a D minor 9 voicing, slow LFO on the filter
    const pad=[73.42,110,146.83,174.61,220,261.63];
    pad.forEach((f,i)=>{[-6,6].forEach(d=>{const o=ctx.createOscillator(),g=ctx.createGain();o.type=i<2?"sawtooth":"triangle";o.frequency.value=f;o.detune.value=d+(i%2?3:-3);
      g.gain.setValueAtTime(0,now);g.gain.linearRampToValueAtTime(.045,Math.max(now+.3,t+3+i*.4));g.gain.setValueAtTime(.045,Math.max(now+.31,t+14));g.gain.linearRampToValueAtTime(0,Math.max(now+.32,t+18.5));
      o.connect(g).connect(lp);o.start(now);o.stop(t+19);nodes.push(o)})});
    const lfo=ctx.createOscillator(),lg=ctx.createGain();lfo.frequency.value=.11;lg.gain.value=260;lfo.connect(lg).connect(lp.frequency);lfo.start(now);lfo.stop(t+19);nodes.push(lfo);
    // arpeggio: D F A C E G A D, eighth notes at 68 bpm, enters with the city, opens up with the wordmark
    const arp=[293.66,349.23,440,523.25,659.25,783.99,880,1174.66];const step=60/68/2;
    for(let n=0,k=0;t+2.6+n*step<t+17;n++){if(n%8===7)continue;const f=arp[k%arp.length]*(n>=24?1:.5);k++;const at=t+2.6+n*step;if(at<now)continue;
      const o=ctx.createOscillator(),g=ctx.createGain();o.type="sine";o.frequency.value=f;const vol=(n>=24?.09:.055)*(n>=48?Math.max(0,(17-(n*step+2.6))/4):1);
      g.gain.setValueAtTime(0,at);g.gain.linearRampToValueAtTime(vol,at+.02);g.gain.exponentialRampToValueAtTime(.0001,at+step*1.8);o.connect(g).connect(lp);o.start(at);o.stop(at+step*2);nodes.push(o)}
    // bass pulse on each shot cut and under the gold sweep
    [CUT.x1,CUT.x2,CUT.x2+2.4].forEach(at=>{if(t+at<now)return;const o=ctx.createOscillator(),g=ctx.createGain();o.type="sine";o.frequency.value=36.71;g.gain.setValueAtTime(0,t+at);g.gain.linearRampToValueAtTime(.35,t+at+.05);g.gain.exponentialRampToValueAtTime(.0001,t+at+1.6);o.connect(g).connect(master);o.start(t+at);o.stop(t+at+1.8);nodes.push(o)});
    timer=setTimeout(stop,(19.5-off)*1000);
  }
  function tick(f=880,len=.08,gain=.05){if(!ctx||!on())return;const t=ctx.currentTime,o=ctx.createOscillator(),g=ctx.createGain();o.type="triangle";o.frequency.value=f;g.gain.setValueAtTime(0,t);g.gain.linearRampToValueAtTime(gain,t+.008);g.gain.exponentialRampToValueAtTime(.0001,t+len);o.connect(g).connect(ctx.destination);o.start(t);o.stop(t+len+.02)}
  function duck(sec){if(!ctx||!master)return;const t=ctx.currentTime;master.gain.cancelScheduledValues(t);master.gain.setValueAtTime(master.gain.value,t);master.gain.linearRampToValueAtTime(0,t+sec)}
  function stop(){clearTimeout(timer);nodes.forEach(o=>{try{o.stop()}catch(e){}});nodes=[];if(ctx){const c=ctx;ctx=null;master=null;setTimeout(()=>{try{c.close()}catch(e){}},200)}}
  return{start,tick,duck,stop,live:()=>!!ctx};
})();
// ---- the picture: one procedural campus, three camera shots, crossfaded through two render targets.
// Shot 1 (0-4.7 s) night sky tilting down onto towers rising from the plain. Shot 2 (4.0-9.3 s) low push down a lit
// avenue with sentinels walking. Shot 3 (8.6 s on) dawn over the skyline; the menu keeps orbiting this shot.
const CUT={x1:4.0,x2:8.6,end:15.2};
function glowTex(stops,size){const c=document.createElement("canvas");c.width=c.height=size||128;const g=c.getContext("2d"),h=c.width/2;
  const gr=g.createRadialGradient(h,h,0,h,h,h);stops.forEach(s=>gr.addColorStop(s[0],s[1]));g.fillStyle=gr;g.fillRect(0,0,c.width,c.height);
  const t=new THREE.CanvasTexture(c);return t}
function nebulaTex(){const c=document.createElement("canvas");c.width=512;c.height=256;const g=c.getContext("2d");g.globalCompositeOperation="lighter";
  const blob=(x,y,r,col)=>{const gr=g.createRadialGradient(x,y,0,x,y,r);gr.addColorStop(0,col);gr.addColorStop(1,"rgba(0,0,0,0)");g.fillStyle=gr;g.fillRect(0,0,512,256)};
  let s=7;const rnd=()=>{s=(s*16807)%2147483647;return s/2147483647};
  for(let i=0;i<26;i++){const x=60+rnd()*392,y=128+(rnd()-.5)*90*(1-Math.abs(x-256)/300);blob(x,y,30+rnd()*70,i%4===0?"rgba(91,155,240,.10)":"rgba(232,163,61,.13)")}
  return new THREE.CanvasTexture(c)}
function makeCity(canvas,quality){
  if(typeof THREE==="undefined")return null;
  const hi=quality==="high";
  let r;try{r=new THREE.WebGLRenderer({canvas,antialias:hi,alpha:false,powerPreference:"high-performance"})}catch(e){return null}
  r.setPixelRatio(Math.min(window.devicePixelRatio||1,hi?2:1));r.setClearColor(0x05070e,1);
  // GPU reset (b_vfx.js guard): skip frames while the context is gone and show the dusk backdrop; three restores the rest
  let ctxLost=false,ctxDone=false;const unguard=typeof VFX!=="undefined"?VFX.guardContext(canvas,{onLost:()=>{if(ctxDone)return;ctxLost=true;canvas.style.background="radial-gradient(ellipse at 50% 70%,#2a2030,#05070e 70%)"},onRestored:()=>{ctxLost=false;canvas.style.background=""}}):()=>{};
  const scene=new THREE.Scene();const FOG_N=new THREE.Color(0x05070e);scene.fog=new THREE.FogExp2(0x05070e,.016);
  const camA=new THREE.PerspectiveCamera(50,1,.1,1200),camB=new THREE.PerspectiveCamera(50,1,.1,1200);
  const G=hi?46:30,CELL=4.2,N=G*G,SPAN=G*CELL;const X=i=>(i-G/2+.5)*CELL;
  const roadI=i=>i%7===3,roadJ=j=>j%9===4;
  // sky dome: night to dawn gradient with a sun glow on the horizon
  const skyU={zen:{value:new THREE.Color(0x03050c)},hor:{value:new THREE.Color(0x0b1226)},glow:{value:new THREE.Color(0xe8a33d)},sunDir:{value:new THREE.Vector3(.78,0,-.62)},dawn:{value:0},fogc:{value:new THREE.Color(0x05070e)}};
  const sky=new THREE.Mesh(new THREE.SphereGeometry(600,32,16),new THREE.ShaderMaterial({uniforms:skyU,side:THREE.BackSide,depthWrite:false,
    vertexShader:"varying vec3 vP;void main(){vP=normalize(position);gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.);}",
    fragmentShader:"uniform vec3 zen,hor,glow,sunDir,fogc;uniform float dawn;varying vec3 vP;void main(){float h=max(vP.y,0.);vec3 c=mix(hor,zen,pow(h,.45));vec2 a=normalize(vP.xz+1e-4),b=normalize(sunDir.xz);float s=max(dot(a,b),0.);c+=glow*dawn*(pow(s,10.)*exp(-h*7.)*.55+.08*exp(-h*3.));c=mix(fogc,c,smoothstep(-.02,.14,vP.y));gl_FragColor=vec4(c,1.);}"}));
  sky.renderOrder=-2;scene.add(sky);
  // stars and a thin amber nebula, both fade as the sun comes up
  const SN=hi?2600:1200,sp=new Float32Array(SN*3);for(let k=0;k<SN;k++){const u=Math.random()*2*Math.PI,v=Math.pow(Math.random(),.6)*.95+.04,rr=520;const cv=Math.sqrt(1-v*v);sp[k*3]=Math.cos(u)*cv*rr;sp[k*3+1]=v*rr;sp[k*3+2]=Math.sin(u)*cv*rr}
  const sg=new THREE.BufferGeometry();sg.setAttribute("position",new THREE.BufferAttribute(sp,3));
  const starM=new THREE.PointsMaterial({color:0xdfe6ff,size:hi?1.6:1.3,sizeAttenuation:false,transparent:true,opacity:.9,depthWrite:false,fog:false});
  const stars=new THREE.Points(sg,starM);stars.renderOrder=-1;scene.add(stars);
  const nebM=new THREE.SpriteMaterial({map:nebulaTex(),transparent:true,opacity:.9,depthWrite:false,blending:THREE.AdditiveBlending,fog:false});
  const neb=new THREE.Sprite(nebM);neb.scale.set(620,310,1);neb.position.set(-60,330,-380);neb.material.rotation=-.35;neb.renderOrder=-1;scene.add(neb);
  const sunM=new THREE.SpriteMaterial({map:glowTex([[0,"rgba(255,240,210,1)"],[.12,"rgba(255,214,150,.9)"],[.4,"rgba(232,163,61,.25)"],[1,"rgba(232,163,61,0)"]]),transparent:true,opacity:0,depthWrite:false,blending:THREE.AdditiveBlending,fog:false});
  const sunS=new THREE.Sprite(sunM);sunS.scale.set(160,160,1);scene.add(sunS);
  // the campus: instanced towers that rise from the plain; avenues stay open
  const geo=new THREE.BoxGeometry(1,1,1);geo.translate(0,.5,0);
  const mat=new THREE.MeshStandardMaterial({color:0xffffff,roughness:.42,metalness:.45,emissive:0x070b1a,emissiveIntensity:1});
  // window grid in world space on every vertical face; a hash per window decides which are lit
  const winU={value:1};
  mat.onBeforeCompile=sh=>{sh.uniforms.uWin=winU;
    sh.vertexShader=sh.vertexShader.replace("#include <common>","#include <common>\nvarying vec3 vWP;varying vec3 vON;").replace("#include <begin_vertex>",
      "#include <begin_vertex>\nvec4 wp=vec4(transformed,1.);\n#ifdef USE_INSTANCING\nwp=instanceMatrix*wp;\n#endif\nvWP=(modelMatrix*wp).xyz;vON=normal;");
    sh.fragmentShader=sh.fragmentShader.replace("#include <common>","#include <common>\nvarying vec3 vWP;varying vec3 vON;uniform float uWin;").replace("#include <emissivemap_fragment>",
      "#include <emissivemap_fragment>\nfloat side=1.-step(.5,abs(vON.y));vec2 fp=vec2(abs(vON.x)>.5?vWP.z:vWP.x,vWP.y)/vec2(.9,1.2);vec2 cl=floor(fp),fr=fract(fp);"+
      "float win=step(.16,fr.x)*step(fr.x,.8)*step(.22,fr.y)*step(fr.y,.72)*side*step(.9,vWP.y);float hh=fract(sin(dot(cl+floor(vWP.xz*.23)*13.1,vec2(12.9898,78.233)))*43758.5453);"+
      "diffuseColor.rgb*=1.-.45*win;totalEmissiveRadiance+=vec3(1.,.66,.3)*win*step(.58,hh)*(.35+.65*hh)*uWin*1.25+vec3(.25,.4,.8)*win*(1.-step(.58,hh))*.05;")};
  const mesh=new THREE.InstancedMesh(geo,mat,N);mesh.frustumCulled=false;scene.add(mesh);
  const seed=(i,j)=>{const s=Math.sin(i*127.1+j*311.7)*43758.5453;return s-Math.floor(s)};
  const road=new Uint8Array(N),H=new Float32Array(N),D=new Float32Array(N),W=new Float32Array(N),lit=new Float32Array(N);
  for(let i=0;i<G;i++)for(let j=0;j<G;j++){const k=i*G+j;const dx=(i-G/2)/(G/2),dz=(j-G/2)/(G/2);const d=Math.sqrt(dx*dx+dz*dz);
    const core=Math.max(0,1-d*1.15);const rnd=seed(i,j);road[k]=(roadI(i)||roadJ(j))?1:0;H[k]=road[k]?0:(2+rnd*rnd*26)*(.25+core*core*2.2);D[k]=rnd*.5+d*.6;W[k]=CELL*(.46+seed(j,i)*.34);lit[k]=seed(i*3,j*5)}
  const m4=new THREE.Matrix4(),col=new THREE.Color();
  function write(g,time){for(let i=0;i<G;i++)for(let j=0;j<G;j++){const k=i*G+j;const e=ease(clamp((g-D[k])/.42,0,1));const h=Math.max(.02,H[k]*e);
      m4.makeScale(road[k]?0:W[k],road[k]?0:h,road[k]?0:W[k]);m4.setPosition(X(i),0,X(j));mesh.setMatrixAt(k,m4);
      const warm=lit[k]>.86;const glow=e*(warm?.5+.5*Math.sin(time*1.1+lit[k]*40):0);col.setRGB(.11+glow*.3+lit[k]*.04,.13+glow*.18+lit[k]*.04,.22+lit[k]*.06);mesh.setColorAt(k,col)}
    mesh.instanceMatrix.needsUpdate=true;if(mesh.instanceColor)mesh.instanceColor.needsUpdate=true}
  // ground: a disc inside the sky dome that writes no depth, so it never clips the low dawn sun; fog carries it into the horizon
  const ground=new THREE.Mesh(new THREE.CircleGeometry(580,72),new THREE.MeshStandardMaterial({color:0x070a14,roughness:.85,metalness:.2,depthWrite:false}));ground.rotation.x=-Math.PI/2;ground.position.y=-.01;ground.renderOrder=-1;scene.add(ground);
  const grid=new THREE.GridHelper(SPAN,G,0x1d2648,0x141a30);grid.material.transparent=true;grid.material.opacity=.45;scene.add(grid);
  // gold light lines down the avenues
  const lineM=new THREE.MeshBasicMaterial({color:0xe8a33d,transparent:true,opacity:0,blending:THREE.AdditiveBlending,depthWrite:false});
  const lines=new THREE.Group();const lg=new THREE.PlaneGeometry(.22,SPAN);lg.rotateX(-Math.PI/2);
  for(let i=0;i<G;i++)if(roadI(i))[-1.1,1.1].forEach(o=>{const m=new THREE.Mesh(lg,lineM);m.position.set(X(i)+o,.03,0);lines.add(m)});
  for(let j=0;j<G;j++)if(roadJ(j))[-1.1,1.1].forEach(o=>{const m=new THREE.Mesh(lg,lineM);m.rotation.y=Math.PI/2;m.position.set(0,.03,X(j)+o);lines.add(m)});
  scene.add(lines);
  // sentinels: small figures with a warm head light, walking the avenues
  let ri=0;for(let i=0;i<G;i++)if(roadI(i)&&Math.abs(i-G/2)<Math.abs(ri-G/2))ri=i;const RX=X(ri);
  const roadsI=[],roadsJ=[];for(let i=0;i<G;i++){if(roadI(i))roadsI.push(X(i));if(roadJ(i))roadsJ.push(X(i))}
  const SNT=hi?72:34,sent=[];for(let k=0;k<SNT;k++){const main=k<SNT*.45;const alongZ=main||k%2===0;
    sent.push({alongZ,lane:main?RX:(alongZ?roadsI[k%roadsI.length]:roadsJ[k%roadsJ.length]),off:(k%2?1:-1)*(1.15+seed(k,3)*.5),ph:seed(k,9)*SPAN,sp:(.9+seed(k,5)*.8)*(k%3?1:-1),bob:seed(k,7)*6})}
  const sbody=new THREE.InstancedMesh(new THREE.SphereGeometry(1,14,10),new THREE.MeshStandardMaterial({color:0x1a2036,roughness:.35,metalness:.7,emissive:0xe8a33d,emissiveIntensity:.22}),SNT);sbody.frustumCulled=false;scene.add(sbody);
  const shp=new Float32Array(SNT*3),shg=new THREE.BufferGeometry();shg.setAttribute("position",new THREE.BufferAttribute(shp,3));
  const sheadM=new THREE.PointsMaterial({map:glowTex([[0,"rgba(255,236,200,1)"],[.25,"rgba(255,200,120,.8)"],[1,"rgba(232,163,61,0)"]],64),color:0xffd08a,size:1.9,transparent:true,depthWrite:false,blending:THREE.AdditiveBlending});
  const sheads=new THREE.Points(shg,sheadM);sheads.frustumCulled=false;scene.add(sheads);
  const streetZ=t=>{const u=clamp((t-CUT.x1)/(9.3-CUT.x1),0,1);return lerp(SPAN*.44,SPAN*.04,u*u*(3-2*u)*.35+u*.65)};
  // street lamps down the main avenue: warm pools on the ground and a glow at lamp height, all additive and unlit
  const LAMP=hi?16:10,poolT=glowTex([[0,"rgba(255,196,120,.55)"],[.45,"rgba(232,163,61,.16)"],[1,"rgba(232,163,61,0)"]],128);
  const poolM=new THREE.MeshBasicMaterial({map:poolT,transparent:true,opacity:0,depthWrite:false,blending:THREE.AdditiveBlending});
  const poolG=new THREE.PlaneGeometry(7,7);poolG.rotateX(-Math.PI/2);const pools=new THREE.InstancedMesh(poolG,poolM,LAMP);pools.frustumCulled=false;
  const lampP=new Float32Array(LAMP*3),lampG=new THREE.BufferGeometry();
  for(let k=0;k<LAMP;k++){const z=SPAN*.42-k*(SPAN*.42+34)/(LAMP-1),x=RX+(k%2?2.7:-2.7);m4.makeTranslation(x-(k%2?1:-1)*1.2,.05,z);pools.setMatrixAt(k,m4);lampP[k*3]=x;lampP[k*3+1]=4.6;lampP[k*3+2]=z}
  lampG.setAttribute("position",new THREE.BufferAttribute(lampP,3));scene.add(pools);
  const lampM=new THREE.PointsMaterial({map:glowTex([[0,"rgba(255,240,215,1)"],[.3,"rgba(255,190,110,.5)"],[1,"rgba(232,163,61,0)"]],64),size:1.6,transparent:true,opacity:0,depthWrite:false,blending:THREE.AdditiveBlending});
  const lamps=new THREE.Points(lampG,lampM);lamps.frustumCulled=false;scene.add(lamps);
  // shot 2 key and rim: a warm low light that rides ahead of the camera, and a cool light from down the avenue behind the walkers
  const street=new THREE.PointLight(0xffb45a,0,15,2);scene.add(street);
  const coolRim=new THREE.DirectionalLight(0x7fb2ff,0);scene.add(coolRim);scene.add(coolRim.target);
  // real Sentinels on the main avenue (skinned rig, speed-matched gait). The instanced walkers above are the fallback.
  const FIG=[];
  if(typeof SentinelMesh!=="undefined"&&SentinelMesh.create){
    const forms=["agent","member","jr","devon","ahmad","kenza","agent","member","agent","member"],small=hi&&Math.min(innerWidth,innerHeight)>=700;
    const n=small?10:6,Z0=SPAN*.4,ZL=SPAN*.36+30;
    for(let k=0;k<n;k++){try{const m=SentinelMesh.create({id:"title:"+k,form:forms[k],level:[0,4,9,14,20,26][k%6],celebrateLevelUp:false});
      const bb=new THREE.Box3().setFromObject(m.grp),hgt=bb.max.y-bb.min.y;if(hgt>0)m.grp.scale.setScalar(2.1/hgt);
      const dir=k%3===1?-1:1;m.grp.rotation.y=dir>0?0:Math.PI;scene.add(m.grp);
      // the first three are hero walkers, placed by the cutscene clock so they pass close to the lens near the end of the shot
      const hero=k<3?[{d:11.5,x:-1.1,dir:1},{d:16,x:1.3,dir:-1},{d:23,x:-1.4,dir:1}][k]:null;if(hero){m.grp.rotation.y=hero.dir>0?0:Math.PI}
      FIG.push({m,dir,hero,x:RX+(k%2?1.25:-1.25)+(seed(k,11)-.5)*.35,ph:(k+seed(k,13)*.6)/n*ZL,sp:1.2+seed(k,17)*.5,Z0,ZL})}catch(e){break}}
    if(FIG.length){sbody.visible=false;sheads.visible=false}}
  function walkFig(t,time,vis,boost){for(const f of FIG){const g=f.m.grp;g.visible=vis>.01&&!(f.hero&&t>CUT.x2+.8);if(!g.visible)continue;
      if(f.hero)g.position.set(RX+f.hero.x,0,streetZ(8.2)-f.hero.d+(t-8.2)*f.sp*f.hero.dir);
      else{const p=((f.ph+time*f.sp)%f.ZL+f.ZL)%f.ZL;g.position.set(f.x,0,f.dir>0?f.Z0-f.ZL+p:f.Z0-p)}
      try{SentinelMesh.pose(f.m,time,"walking",{speed:f.sp});f.m.glow.value*=1+boost*.9;f.m.rimGain.value=Math.max(f.m.rimGain.value,.3+boost*.5)}catch(e){}}}
  function walk(time,vis){for(let k=0;k<SNT;k++){const s=sent[k];let p=((s.ph+time*s.sp*1.4)%SPAN+SPAN)%SPAN-SPAN/2;const b=Math.abs(Math.sin(time*5.2+s.bob))*.08;
      const x=s.alongZ?s.lane+s.off:p,z=s.alongZ?p:s.lane+s.off;m4.makeScale(.42*vis,.78*vis,.42*vis);m4.setPosition(x,.78*vis+b,z);sbody.setMatrixAt(k,m4);
      shp[k*3]=x;shp[k*3+1]=(1.45+b)*vis;shp[k*3+2]=z}
    sbody.instanceMatrix.needsUpdate=true;shg.attributes.position.needsUpdate=true;sheadM.opacity=vis}
  // data lattice: points that drift up through the city
  const PN=hi?1400:600;const pp=new Float32Array(PN*3),pv=new Float32Array(PN);
  for(let k=0;k<PN;k++){pp[k*3]=(Math.random()-.5)*SPAN*1.3;pp[k*3+1]=Math.random()*60;pp[k*3+2]=(Math.random()-.5)*SPAN*1.3;pv[k]=.4+Math.random()}
  const pgeo=new THREE.BufferGeometry();pgeo.setAttribute("position",new THREE.BufferAttribute(pp,3));
  const pts=new THREE.Points(pgeo,new THREE.PointsMaterial({color:0xf2b85b,size:.32,transparent:true,opacity:0,sizeAttenuation:true,depthWrite:false}));scene.add(pts);
  const hemi=new THREE.HemisphereLight(0x55689f,0x0a0c18,.55);scene.add(hemi);
  const sun=new THREE.DirectionalLight(0xf2b85b,0);scene.add(sun);
  const key=new THREE.PointLight(0xe8a33d,0,300,1.4);key.position.set(0,42,0);scene.add(key);
  const rim=new THREE.DirectionalLight(0x5b9bf0,.25);rim.position.set(60,30,80);scene.add(rim);
  // crossfade compositor
  const rtA=new THREE.WebGLRenderTarget(2,2),rtB=new THREE.WebGLRenderTarget(2,2);
  const postU={a:{value:rtA.texture},b:{value:rtB.texture},f:{value:0},pixel:{value:new THREE.Vector2(1,1)}};
  const post=new THREE.Scene(),ortho=new THREE.OrthographicCamera(-1,1,1,-1,0,1);
  post.add(new THREE.Mesh(new THREE.PlaneGeometry(2,2),new THREE.ShaderMaterial({uniforms:postU,depthTest:false,depthWrite:false,
    vertexShader:"varying vec2 vU;void main(){vU=uv;gl_Position=vec4(position.xy,0.,1.);}",
    fragmentShader:`uniform sampler2D a,b;uniform float f;uniform vec2 pixel;varying vec2 vU;
      vec3 frame(vec2 uv){return mix(texture2D(a,uv).rgb,texture2D(b,uv).rgb,smoothstep(0.,1.,f));}
      void main(){vec3 c=frame(vU);vec3 bloom=vec3(0.);
        bloom+=max(frame(vU+pixel*vec2(3.,0.))-.65,0.);
        bloom+=max(frame(vU-pixel*vec2(3.,0.))-.65,0.);
        bloom+=max(frame(vU+pixel*vec2(0.,3.))-.65,0.);
        bloom+=max(frame(vU-pixel*vec2(0.,3.))-.65,0.);
        c+=bloom*.085;float k=smoothstep(0.,1.,f);c+=vec3(.91,.64,.24)*.22*k*(1.-k);
        float lum=dot(c,vec3(.2126,.7152,.0722));c=mix(vec3(lum),c,1.08);
        c=mix(c,c*vec3(.94,.98,1.07),.28*(1.-smoothstep(.15,.6,lum)));
        c=mix(c,c*vec3(1.05,1.015,.96),.25*smoothstep(.35,.85,lum));
        c*=1.-.21*smoothstep(.18,.72,length(vU-.5));gl_FragColor=vec4(c,1.);
      }`})));
  let w=0,h=0;function size(){const W2=canvas.clientWidth||innerWidth,H2=canvas.clientHeight||innerHeight;if(W2===w&&H2===h)return;w=W2;h=H2;r.setSize(w,h,false);
    [camA,camB].forEach(c=>{c.aspect=w/h;c.updateProjectionMatrix()});const pr=r.getPixelRatio();rtA.setSize(Math.round(w*pr),Math.round(h*pr));rtB.setSize(Math.round(w*pr),Math.round(h*pr));postU.pixel.value.set(1/(w*pr),1/(h*pr))}
  // camera rigs; each places a camera for cutscene time t. No noise, no shake: every move is an eased curve.
  const tgt=new THREE.Vector3(),lerp=(a,b,k)=>a+(b-a)*k;
  const wide=Math.max(1,Math.min(1.5,(innerHeight/innerWidth)*1.78));// pull back on portrait screens
  function shotSky(c,t){const u=clamp(t/CUT.x2,0,1),tilt=ease(clamp((t-.7)/4.2,0,1));
    c.position.set(lerp(-26,-14,u),lerp(5,16,u),SPAN*.78*wide-u*16);tgt.set(lerp(-14,0,tilt),lerp(170,10,tilt),lerp(-80,0,tilt));c.fov=lerp(52,46,u)}
  function shotStreet(c,t){const u=clamp((t-CUT.x1)/(9.3-CUT.x1),0,1),e=u*u*(3-2*u)*.35+u*.65;
    const z=streetZ(t);
    // Babylon Curve3 camera rail when the shared engine is present; legacy rail keeps offline startup usable.
    const rail=typeof VaultEngine!=="undefined"&&VaultEngine.sampleRoute?VaultEngine.sampleRoute([[RX,2.5,SPAN*.44],[RX+.3,2.8,SPAN*.34],[RX+.5,3.5,SPAN*.18],[RX+.4,4.3,SPAN*.04]],e):null;
    if(rail)c.position.set(rail[0],rail[1],rail[2]);else c.position.set(RX+Math.sin(u*2.2)*.5,lerp(2.5,4.3,e),z);tgt.set(RX+Math.sin(u*2.2+.5)*1.3,lerp(2.2,4.4,e),z-34);c.fov=lerp(56,48,u)}
  function shotDawn(c,t,orbit){const u=ease(clamp((t-CUT.x2)/6.6,0,1));const a=-1.02+u*.3+orbit;const d=SPAN*lerp(.86,.78,u)*wide;
    c.position.set(Math.sin(a)*d,SPAN*lerp(.2,.27,u),Math.cos(a)*d);tgt.set(0,lerp(9,14,u),0);c.fov=lerp(40,36,u)}
  const SHOTS=[{a:-1,b:CUT.x1+.7,f:shotSky},{a:CUT.x1,b:CUT.x2+.7,f:shotStreet},{a:CUT.x2,b:1e9,f:shotDawn}];
  function place(c,s,t,orbit){s.f(c,t,orbit);c.lookAt(tgt);c.updateProjectionMatrix()}
  // t: cutscene clock (s); time: wall clock for loops; orbit: radians added in the menu
  function render(t,time,orbit){if(ctxLost)return;size();
    write(clamp((t-.2)/5.4,0,1.8),time);const wv=clamp((t-2.5)/2,0,1),s2=clamp((t-CUT.x1+.5)/.6,0,1)*clamp((CUT.x2+1-t)/.6,0,1);if(FIG.length)walkFig(t,time,wv,s2);else walk(time,wv);
    const cz=streetZ(t);street.position.set(RX,2.6,cz-12);street.intensity=s2*1.6;coolRim.position.set(RX,14,cz-90);coolRim.target.position.set(RX,0,cz);coolRim.intensity=s2*.9;
    poolM.opacity=clamp((t-2)/2.5,0,1)*(1-clamp((t-9)/4,0,.7));lampM.opacity=poolM.opacity;
    const dawn=clamp((t-8.2)/5.5,0,1);skyU.dawn.value=dawn;
    skyU.zen.value.setRGB(lerp(.012,.10,dawn),lerp(.02,.13,dawn),lerp(.047,.26,dawn));skyU.hor.value.setRGB(lerp(.043,.46,dawn),lerp(.07,.27,dawn),lerp(.15,.2,dawn));
    starM.opacity=.9*(1-dawn*.9);nebM.opacity=.9*(1-dawn);
    const sd=skyU.sunDir.value;sunS.position.set(sd.x*470,lerp(-50,46,ease(dawn)),sd.z*470);sunM.opacity=dawn*.75;
    sun.position.set(sd.x*100,lerp(5,60,dawn),sd.z*100);sun.intensity=dawn*1.15;key.intensity=clamp((t-1.5)/4,0,1)*1.5*(1-dawn*.7)*(.85+.15*Math.sin(time*2.1));winU.value=clamp((t-1)/3,0,1)*(1-dawn*.55);hemi.intensity=lerp(.55,.8,dawn);
    scene.fog.color.copy(FOG_N).lerp(skyU.hor.value,.35+dawn*.6);skyU.fogc.value.copy(scene.fog.color);scene.fog.density=lerp(.016,.0055,dawn);lineM.opacity=clamp((t-1.6)/3,0,1)*(.55-dawn*.25);
    pts.material.opacity=clamp((t-2)/3,0,1)*.65;const pos=pgeo.attributes.position.array;for(let q=0;q<PN;q++){pos[q*3+1]+=pv[q]*.06;if(pos[q*3+1]>70)pos[q*3+1]=0}pgeo.attributes.position.needsUpdate=true;
    const live=SHOTS.filter(s=>t>=s.a&&t<s.b);
    if(live.length>1){const A=live[0],B=live[1];place(camA,A,t,orbit);place(camB,B,t,orbit);postU.f.value=(t-B.a)/(A.b-B.a);
      r.setRenderTarget(rtA);r.render(scene,camA);r.setRenderTarget(rtB);r.render(scene,camB);r.setRenderTarget(null);r.render(post,ortho)}
    else{place(camA,live[0]||SHOTS[2],t,orbit);if(hi){postU.f.value=0;r.setRenderTarget(rtA);r.render(scene,camA);r.setRenderTarget(null);r.render(post,ortho)}else{r.setRenderTarget(null);r.render(scene,camA)}}}
  function dispose(){ctxDone=true;unguard();FIG.forEach(f=>{scene.remove(f.m.grp);try{SentinelMesh.dispose(f.m.grp)}catch(e){}});FIG.length=0;scene.traverse(o=>{if(o.geometry)o.geometry.dispose();if(o.material){[].concat(o.material).forEach(m=>{if(m.map)m.map.dispose();m.dispose()})}});
    post.traverse(o=>{if(o.geometry)o.geometry.dispose();if(o.material)o.material.dispose()});rtA.dispose();rtB.dispose();r.dispose();try{r.forceContextLoss()}catch(e){}}
  return{render,dispose};
}
// ---- the overlay
function start(){
  return new Promise(resolve=>{
    if(document.getElementById("title")){resolve();return}
    const style=document.createElement("style");style.id="titleCss";style.textContent=CSS;document.head.appendChild(style);
    const root=document.createElement("div");root.id="title";root.setAttribute("role","dialog");root.setAttribute("aria-label","Collective AI Vault title screen");root.setAttribute("aria-modal","true");
    // UX: the app behind the title is inert (no stray Tab stops, no screen-reader leakage) until the overlay resolves
    const app=document.getElementById("app");const appInert=on=>{if(!app)return;try{app.inert=on}catch(e){}if(on)app.setAttribute("aria-hidden","true");else app.removeAttribute("aria-hidden")};appInert(true);
    const letters=s=>[...s].map(c=>`<span class="${c===" "?"sp":""}">${c===" "?"":c}</span>`).join("");
    root.innerHTML=`<canvas id="titleGl" aria-hidden="true"></canvas><div class="tleak" id="tLeak"></div><div class="tv"></div><div class="tgrain" id="tGrain"></div><div class="tbars"></div>
<div class="layer"><div class="slate" id="tSlate">Collective AI Inc · 2026<i></i></div></div>
<div class="tcap" id="tCap"><b>02</b>Every agent has a place</div>
<div class="layer"><div class="wm" id="tWm"><div class="word" id="tWord">${letters("COLLECTIVE AI")}<div class="sweep" id="tSweep"></div></div><div class="sub" id="tSub">VAULT</div><div class="rule" id="tRule"></div><div class="tag" id="tTag">${TAG}</div></div></div>
<nav class="mm" id="tMenu" aria-label="Main menu"><button class="pri" data-act="enter">Enter the Vault</button><button data-act="settings">Settings</button><button data-act="credits">Credits</button></nav>
<div class="panel" id="tSettings" role="dialog" aria-label="Settings"><div class="k">Settings</div><h2>Vault</h2>
<div class="row"><div>Sound<small>Score and campus chimes</small></div><div class="seg" data-k="sound"><button data-v="true">On</button><button data-v="false">Off</button></div></div>
<div class="row"><div>Opening cutscene<small>Plays once a day. Off shows a short sting.</small></div><div class="seg" data-k="cut"><button data-v="true">On</button><button data-v="false">Off</button></div></div>
<div class="row"><div>Quality<small id="tQWhy">Auto reads this device. Low halves the pixel count and the skyline.</small></div><div class="seg" data-k="q"><button data-v="auto">Auto</button><button data-v="low">Low</button><button data-v="high">High</button></div></div>
<div class="act"><button data-act="replay">Replay intro</button><button data-act="close">Done</button></div></div>
<div class="panel" id="tCredits" role="dialog" aria-label="Credits"><div class="k">Credits</div><h2>Collective AI Vault</h2>
<p>Collective AI Inc</p><p>JR Moyler (Hataalii), Co-Founder and CEO</p><p class="dim">Built with three.js. The skyline, the sentinels, the dawn, the score and every frame of this opening are generated in code at runtime; the original Foley and ambience are generated as PCM audio in code.</p>
<div class="act"><button data-act="close">Done</button></div></div>
<button class="tsnd" id="tSnd" type="button">Tap for sound</button>
<button class="skip" id="tSkip" type="button" aria-label="Skip intro">Skip</button>
<div class="foot"><div><b>Collective AI</b> · Vault · ${VERSION}</div><div class="hintk"><kbd>↑↓</kbd>move <kbd>Enter</kbd>select <kbd>Esc</kbd>back</div></div>`;
    document.body.appendChild(root);
    const $t=s=>root.querySelector(s);
    const canvas=$t("#titleGl"),cap=$t("#tCap"),snd=$t("#tSnd"),leak=$t("#tLeak"),menu=$t("#tMenu"),mbtns=[...menu.querySelectorAll("button")];
    // UX: first run picks Low or High from the device (g_ux.js) before the first renderer exists
    if(typeof UX!=="undefined")try{UX.ensureQuality()}catch(e){}
    const quality=S.get(K.q,"high");
    const noMotion=reduced();
    // grain: one 128 px noise tile, stepped across the frame (CSS stops it under reduced motion)
    try{const c=document.createElement("canvas");c.width=c.height=128;const g=c.getContext("2d");const d=g.createImageData(128,128);
      for(let i=0;i<d.data.length;i+=4){const v=Math.random()*255|0;d.data[i]=d.data[i+1]=d.data[i+2]=v;d.data[i+3]=255}g.putImageData(d,0,0);
      const gr=$t("#tGrain");gr.style.backgroundImage=`url(${c.toDataURL("image/png")})`;gr.classList.add("noise")}catch(e){}
    const city=makeCity(canvas,quality);
    if(!city)canvas.style.background="radial-gradient(ellipse at 50% 70%,#2a2030,#05070e 70%)";
    // timeline (seconds). Shot cuts at CUT.x1 and CUT.x2; the sting compresses the titles to 1.5 s over the finished dawn shot.
    const FULL=[["slate",.6],["slateOff",3.4],["leak",CUT.x1-.15],["cap",CUT.x1+.9],["capOff",CUT.x2-.6],["leak",CUT.x2-.15],["letters",CUT.x2+.6],["sweep",CUT.x2+2.4],["sub",CUT.x2+3.3],["rule",CUT.x2+3.7],["tag",CUT.x2+4.6],["menu",CUT.end]];
    const STING=[["letters",.05],["sweep",.5],["sub",.6],["rule",.7],["tag",.8],["menu",1.5]];
    const STILL=[["letters",0],["sub",0],["rule",0],["tag",0],["menu",0]];
    const seenToday=S.get(K.seen,null)===today();
    const cutOn=S.get(K.cut,true)!==false;
    let cue=noMotion?STILL:(seenToday||!cutOn)?STING:FULL;
    const lettersEls=[...$t("#tWord").querySelectorAll("span")];
    let clock=0,last=performance.now(),cueI=0,inMenu=false,done=false,raf=0,menuT=0,sel=0,panel=null,timers=[];
    const soundOn=()=>S.get(K.sound,true)!==false;
    function setCine(){root.classList.toggle("cine",cue===FULL);snd.classList.toggle("on",cue===FULL&&soundOn()&&!gestured)}
    function fire(name){switch(name){
      case"slate":$t("#tSlate").classList.add("on");break;
      case"slateOff":$t("#tSlate").classList.remove("on");break;
      case"cap":cap.classList.add("on");break;
      case"capOff":cap.classList.remove("on");break;
      case"leak":if(!inMenu){if(typeof VaultAudio!=="undefined")VaultAudio.play("transition",{volume:.4});leak.classList.remove("go");void leak.offsetWidth;leak.classList.add("go")}break;
      case"letters":lettersEls.forEach((el,i)=>{if(noMotion||inMenu){el.classList.add("on");return}timers.push(setTimeout(()=>{el.classList.add("on");if(i%3===0)Score.tick(660+i*18,.06,.025)},i*70))});break;
      case"sweep":$t("#tSweep").classList.add("go");break;
      case"sub":$t("#tSub").classList.add("on");break;
      case"rule":$t("#tRule").classList.add("on");break;
      case"tag":$t("#tTag").classList.add("on");break;
      case"menu":toMenu();break}}
    function toMenu(){if(inMenu)return;inMenu=true;menuT=0;cue.forEach(c=>{if(c[0]!=="menu")fire(c[0])});cap.classList.remove("on");$t("#tSlate").classList.remove("on");cueI=cue.length;
      root.classList.add("menu");snd.classList.remove("on");S.set(K.seen,today());setSel(0);setTimeout(()=>{if(!done)mbtns[0].focus({preventScroll:true})},700)}
    function setSel(i){sel=(i+mbtns.length)%mbtns.length;mbtns.forEach((b,j)=>b.classList.toggle("on",j===sel))}
    // the picture runs on its own clock: the sting and the menu show the finished dawn shot, the menu slowly orbits it
    const sceneT=()=>cue===FULL&&!inMenu?clock:CUT.end+(inMenu?menuT:0);
    function frame(now){raf=requestAnimationFrame(frame);if(document.hidden){last=now;return}const dt=Math.min(.1,Math.max(0,(now-last)/1000));last=now;
      if(inMenu)menuT+=dt;else clock+=dt;
      while(cueI<cue.length&&clock>=cue[cueI][1]){fire(cue[cueI][0]);cueI++}
      if(city){try{city.render(sceneT(),now/1000,inMenu?menuT*.035:0)}catch(e){}}}
    // reduced motion: one still frame of the dawn shot, redrawn only on resize
    function still(){if(city)try{city.render(CUT.end,0,0)}catch(e){}}
    if(noMotion){toMenu();still();window.addEventListener("resize",still)}else raf=requestAnimationFrame(frame);
    // first user gesture starts the score (browser policy). "Tap for sound" joins it in time; any other gesture skips.
    let gestured=false;function gesture(at){if(gestured)return;gestured=true;snd.classList.remove("on");Score.start(at||0);if(typeof VaultAudio!=="undefined")VaultAudio.unlock()}
    setCine();
    function skip(){gesture();if(!inMenu){clock=CUT.end;toMenu()}}
    snd.addEventListener("pointerdown",e=>e.stopPropagation());
    snd.addEventListener("click",e=>{e.stopPropagation();gesture(cue===FULL&&!inMenu?clock:0)});
    $t("#tSkip").addEventListener("click",e=>{e.stopPropagation();skip()});
    root.addEventListener("pointerdown",e=>{if(e.target.closest("#tSnd"))return;gesture();if(!inMenu)skip()});
    // panels
    function openPanel(id){panel=id;$t("#tSettings").classList.toggle("on",id==="tSettings");$t("#tCredits").classList.toggle("on",id==="tCredits");if(id==="tSettings")paintSettings();Score.tick(520,.07,.03);const f=$t("#"+id+" .act button:last-child");if(f)f.focus({preventScroll:true})}
    function closePanel(){panel=null;$t("#tSettings").classList.remove("on");$t("#tCredits").classList.remove("on");mbtns[sel].focus({preventScroll:true})}
    function paintSettings(){const v={sound:String(soundOn()),cut:String(S.get(K.cut,true)!==false),q:S.get("vault.quality.auto",false)?"auto":S.get(K.q,"high")};const why=$t("#tQWhy");if(why)why.textContent=v.q==="auto"&&typeof UX!=="undefined"?"Auto chose "+UX.qualityLabel().replace(/^Auto · /,"")+". Low halves the pixel count and the skyline.":"Auto reads this device. Low halves the pixel count and the skyline.";root.querySelectorAll("#tSettings .seg").forEach(seg=>{const k=seg.dataset.k;seg.querySelectorAll("button").forEach(b=>{b.classList.toggle("on",b.dataset.v===v[k]);b.setAttribute("aria-pressed",String(b.dataset.v===v[k]))})})}
    $t("#tSettings").addEventListener("click",e=>{const b=e.target.closest("button");if(!b)return;const seg=b.closest(".seg");
      if(seg){const k=seg.dataset.k;const v=b.dataset.v;if(k==="sound"){S.set(K.sound,v==="true");if(v==="false")Score.stop();else if(gestured)Score.start(0);if(typeof VaultAudio!=="undefined")VaultAudio.setEnabled(v==="true")}else if(k==="cut")S.set(K.cut,v==="true");else if(typeof UX!=="undefined")UX.setQuality(v,true);else if(v!=="auto")S.set(K.q,v);paintSettings();Score.tick(760,.06,.03);return}
      if(b.dataset.act==="replay"){replay();return}if(b.dataset.act==="close")closePanel()});
    $t("#tCredits").addEventListener("click",e=>{const b=e.target.closest("button[data-act=close]");if(b)closePanel()});
    function replay(){closePanel();root.classList.remove("menu");inMenu=false;S.set(K.seen,"");timers.forEach(clearTimeout);timers=[];
      ["#tSlate","#tSub","#tRule","#tTag"].forEach(s=>$t(s).classList.remove("on"));cap.classList.remove("on");$t("#tSweep").classList.remove("go");lettersEls.forEach(el=>el.classList.remove("on"));
      cue=noMotion?STILL:FULL;cueI=0;clock=0;Score.stop();gestured=false;setCine();gesture();if(noMotion){toMenu();still()}}
    function enter(){if(done)return;done=true;Score.tick(880,.25,.06);Score.duck(.8);if(typeof VaultAudio!=="undefined"){VaultAudio.play("complete",{volume:.38,bus:"work"});VaultAudio.ambient(true)}
      root.classList.add("out");cancelAnimationFrame(raf);timers.forEach(clearTimeout);
      const ms=noMotion?10:920;
      setTimeout(()=>{if(city)city.dispose();Score.stop();root.remove();style.remove();appInert(false);window.removeEventListener("keydown",key);window.removeEventListener("resize",still);resolve()},ms)}
    menu.addEventListener("click",e=>{const b=e.target.closest("button");if(!b)return;act(b.dataset.act)});
    menu.addEventListener("pointermove",e=>{const b=e.target.closest("button");if(b)setSel(mbtns.indexOf(b))});
    function act(a){if(a==="enter")enter();else if(a==="settings")openPanel("tSettings");else if(a==="credits")openPanel("tCredits")}
    function key(e){if(done)return;gesture();
      if(!inMenu){if(e.key!=="Tab")e.preventDefault();skip();return}
      if(panel){if(e.key==="Escape"){e.preventDefault();closePanel()}
        // keep Tab inside the open panel
        else if(e.key==="Tab"){const f=[...$t("#"+panel).querySelectorAll("button")];const i=f.indexOf(document.activeElement);if(e.shiftKey&&i<=0){e.preventDefault();f[f.length-1].focus()}else if(!e.shiftKey&&i===f.length-1){e.preventDefault();f[0].focus()}else if(i<0){e.preventDefault();f[0].focus()}}
        return}
      if(e.key==="ArrowDown"||e.key==="ArrowUp"||e.key==="w"||e.key==="s"){e.preventDefault();setSel(sel+(e.key==="ArrowDown"||e.key==="s"?1:-1));Score.tick(620,.05,.02);mbtns[sel].focus({preventScroll:true})}
      else if(e.key==="Enter"||e.key===" "){if(document.activeElement&&document.activeElement.closest&&document.activeElement.closest("#tMenu"))return;e.preventDefault();act(mbtns[sel].dataset.act)}}
    window.addEventListener("keydown",key);
  });
}
return{start,version:VERSION};
})();

