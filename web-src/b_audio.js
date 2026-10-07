// Procedural campus sound. Every sound is synthesized in Web Audio at runtime from code recipes:
// no files, no fetch, no decode. scripts/generate_audio.py renders the same bank offline for auditioning only.
// One gesture-unlocked mixer serves the title, world ambience, Wardens, Sentinels and work events.
//   VaultAudio.sfx(name,{position,district,voice,volume})   one-shot from the SFX table (see names())
//   VaultAudio.tone(freq,len,type,gain,{delay,position})     plain tone on the effects bus (Wardens use it)
//   VaultAudio.workEvent(kind,position,district)              live activity, spatial when a position is given
//   VaultAudio.footstep(position,speed,surface)              stone, gravel, grass or roof; inferred when omitted
//   VaultAudio.ambient(on) · district(id) · listener(pos,fwd) · setLevel(name,v) · level(name) · mixerHTML() · bindMixer(root)
// Ambience: a filtered-noise wind bed, a per-theme district drone that crossfades with the district under the camera,
// birds and distant bells by day, crickets and an owl at night (keyed to SH.uNight), and sparse district accents.
const VaultAudio=(()=>{
  const RATE=22050,TAU=Math.PI*2;
  const BANK=['air','hum','footstep','ui','notification','complete','transition'];
  const SURFACES=['stone','gravel','grass','roof'];
  const busLevel={ambient:.55,effects:.5,work:.55};
  const MIX_KEY='vault.audio.mix',MIX_DEFAULT={master:1,music:1,effects:1};
  const MAX_VOICES=28,TICK_MS=450,FAR=220;
  const clamp=(v,a,b)=>Math.max(a,Math.min(b,v));
  const nowMs=()=>globalThis.performance?.now?.()??Date.now();
  const hash=s=>[...String(s)].reduce((n,c)=>(Math.imul(n,31)+c.charCodeAt(0))>>>0,7);
  const point=p=>Array.isArray(p)?p:[p?.x||0,p?.y||0,p?.z||0];
  const readEnabled=()=>{try{return JSON.parse(localStorage.getItem('vault.sound')||'true')!==false}catch{return true}};
  const readMix=()=>{const o={...MIX_DEFAULT};try{const m=JSON.parse(localStorage.getItem(MIX_KEY)||'{}');for(const k in o)if(Number.isFinite(m?.[k]))o[k]=clamp(m[k],0,1)}catch{}return o};
  let ctx=null,master=null,buses=null,ready=null,unlocked=false,enabled=readEnabled(),disposed=false,generation=0,lite=false;
  let ambientWanted=false,districtId='',underTop='',bed=null,timer=0,night=0,lastStep=-Infinity,stepN=0,lastGate=-Infinity,lastSpecific=-Infinity,hoverEl=null;
  let mix=readMix(),ear=null;
  const buffers=new Map(),steps=new Map(),voices=new Set(),loops=new Map(),lastKind=new Map();

  // ---- offline recipes (same maths as scripts/generate_audio.py), rendered once into AudioBuffers on unlock
  function prng(seed){let a=seed>>>0;return()=>{a=a+0x6D2B79F5>>>0;let t=a;t=Math.imul(t^t>>>15,t|1);t^=t+Math.imul(t^t>>>7,t|61);return((t^t>>>14)>>>0)/4294967296}}
  const envl=(t,d,a=.015,r=.1)=>Math.min(1,t/a,Math.max(0,(d-t)/r));
  function render(seconds,seed,fn,peakTo=.88){const n=Math.round(seconds*RATE),out=new Float32Array(n),r=prng(seed);let peak=0;
    for(let i=0;i<n;i++){const v=fn(i/RATE,r,seconds);out[i]=v;const a=Math.abs(v);if(a>peak)peak=a}
    const s=peak?Math.min(1,peakTo/peak):1;if(s!==1)for(let i=0;i<n;i++)out[i]*=s;return out}
  // Pink noise with the tail crossfaded into the head: a seamless loop that phone speakers can actually play.
  function pinkLoop(seconds,seed){const n=Math.round(seconds*RATE),fade=Math.round(.5*RATE),raw=new Float32Array(n+fade),r=prng(seed);let b0=0,b1=0,b2=0,peak=0;
    for(let i=0;i<raw.length;i++){const w=r()*2-1;b0=.99765*b0+w*.099046;b1=.963*b1+w*.2965164;b2=.57*b2+w*1.0526913;raw[i]=(b0+b1+b2+w*.1848)*.2}
    const out=raw.slice(0,n);for(let i=0;i<fade;i++){const k=i/fade*Math.PI/2;out[i]=raw[n+i]*Math.cos(k)+raw[i]*Math.sin(k)}
    for(let i=0;i<n;i++)peak=Math.max(peak,Math.abs(out[i]));const s=.7/(peak||1);for(let i=0;i<n;i++)out[i]*=s;return out}
  const RECIPES={
    air:()=>pinkLoop(4,713),
    // 220, 330 and 440.125 Hz complete whole cycles in 8 s, so the loop point is continuous and audible on phones.
    hum:()=>render(8,714,t=>.05*Math.sin(TAU*220*t)+.032*Math.sin(TAU*330*t)*(1+.35*Math.sin(TAU*t/4))+.018*Math.sin(TAU*440.125*t)*(1+.5*Math.sin(TAU*t/8))),
    footstep:()=>stepRecipe('stone',0),
    ui:()=>render(.14,715,(t,r,d)=>.25*Math.sin(TAU*740*t)*envl(t,d,.004,.09)*Math.exp(-12*t)),
    notification:()=>render(.9,716,(t,r,d)=>envl(t,d)*[[523.25,0],[783.99,.09],[1046.5,.18]].reduce((v,[f,dl])=>v+(t>=dl?.18*Math.sin(TAU*f*t)*Math.exp(-5*(t-dl)):0),0)),
    complete:()=>render(1.6,717,(t,r,d)=>envl(t,d)*[[293.66,0],[440,.12],[587.33,.24],[880,.36]].reduce((v,[f,dl])=>v+(t>=dl?.12*Math.sin(TAU*f*t)*Math.exp(-3*(t-dl)):0),0)),
    transition:()=>render(2.4,718,(t,r,d)=>{const ph=TAU*(42*t+170*(t-1.5*t*t/d+t**3/d**2-t**4/(4*d**3)));return envl(t,d,.03,.7)*(.42*Math.sin(ph)*Math.exp(-1.6*t)+.08*(r()*2-1)*Math.sin(Math.PI*t/d))}),
    noise:()=>render(1,719,(t,r)=>r()*2-1,.9)
  };
  // Footsteps: three variants per surface, each a different seed.
  function stepRecipe(surface,v){const seed=900+SURFACES.indexOf(surface)*10+v;
    if(surface==='stone'){let p=0;return render(.16,seed,(t,r,d)=>{const w=r()*2-1,hp=w-p;p=w;return envl(t,d,.002,.05)*(.55*hp*Math.exp(-70*t)+.3*Math.sin(TAU*(185+v*12)*t)*Math.exp(-38*t)+.12*Math.sin(TAU*1250*t)*Math.exp(-90*t))})}
    if(surface==='gravel'){const r0=prng(seed+50),grains=Array.from({length:7},()=>({t:r0()*.09,a:.25+r0()*.5}));return render(.22,seed,(t,r,d)=>{let s=.15*(r()*2-1)*Math.exp(-25*t);for(const g of grains){const k=t-g.t;if(k>=0)s+=g.a*(r()*2-1)*Math.exp(-140*k)}return envl(t,d,.002,.05)*s})}
    if(surface==='grass'){let lp=0;return render(.24,seed,(t,r,d)=>{lp+=.18*((r()*2-1)-lp);return envl(t,d,.018,.06)*(1.6*lp*Math.exp(-16*t)+(t>.02?.1*(r()*2-1)*Math.exp(-40*t):0))})}
    return render(.22,seed,(t,r,d)=>envl(t,d,.002,.05)*(.4*(r()*2-1)*Math.exp(-55*t)+.22*Math.sin(TAU*(420+v*25)*t)*Math.exp(-20*t)+.14*Math.sin(TAU*693*t)*Math.exp(-26*t)+.08*Math.sin(TAU*1130*t)*Math.exp(-35*t)))}
  function toBuffer(data){const b=ctx.createBuffer(1,data.length,RATE);if(b.copyToChannel)b.copyToChannel(data,0);else b.getChannelData(0).set(data);return b}

  // ---- mixer
  function ramp(param,value,seconds=.2){if(!ctx||!param)return;const t=ctx.currentTime;param.cancelScheduledValues(t);param.setValueAtTime(param.value,t);param.linearRampToValueAtTime(value,t+seconds)}
  function applyMix(seconds=.12){if(!ctx||!buses)return;const set=(p,v)=>seconds?ramp(p,v,seconds):(p.value=v);
    set(master.gain,enabled?.65*mix.master:0);set(buses.ambient.gain,busLevel.ambient*mix.music);set(buses.effects.gain,busLevel.effects*mix.effects);set(buses.work.gain,busLevel.work*mix.effects)}
  function init(){
    if(ctx)return true;
    const Audio=globalThis.AudioContext||globalThis.webkitAudioContext;
    if(!Audio)return false;
    try{ctx=new Audio();disposed=false;enabled=readEnabled();mix=readMix();
      // Phones and small CPUs get equal-power panning; HRTF convolution per voice is too heavy for an A15-class device.
      lite=(globalThis.navigator?.hardwareConcurrency||8)<=4||!!globalThis.matchMedia?.('(pointer:coarse)')?.matches;
      master=ctx.createGain();
      const limiter=ctx.createDynamicsCompressor();limiter.threshold.value=-16;limiter.knee.value=18;limiter.ratio.value=4;
      master.connect(limiter);limiter.connect(ctx.destination);buses={};
      for(const name of Object.keys(busLevel)){const g=ctx.createGain();g.connect(master);buses[name]=g}
      applyMix(0);return true;
    }catch{ctx=null;return false}
  }
  function preload(){
    if(ready)return ready;if(!init())return Promise.resolve(false);
    const audio=ctx,epoch=generation;
    ready=Promise.resolve().then(()=>{
      if(epoch!==generation||disposed||audio!==ctx)return false;
      for(const [name,make] of Object.entries(RECIPES)){try{buffers.set(name,toBuffer(make()))}catch{/* A failed recipe must never block work or sign-in. */}}
      for(const s of SURFACES){const list=[];for(let v=0;v<3;v++){try{list.push(toBuffer(stepRecipe(s,v)))}catch{}}steps.set(s,list)}
      if(ambientWanted)ambient(true);return true;
    });
    return ready;
  }
  function unlock(){if(!init())return Promise.resolve(false);unlocked=true;enabled=readEnabled();applyMix(0);
    const resumed=ctx.state==='suspended'?ctx.resume():Promise.resolve();
    return resumed.then(()=>preload()).then(()=>{if(ambientWanted)ambient(true);return true}).catch(()=>false);
  }
  const audible=()=>!!(ctx&&unlocked&&enabled&&ctx.state==='running'&&!globalThis.document?.hidden);
  function tooFar(position){if(!ear)return false;const [x,,z]=point(position);return Math.hypot(x-ear[0],z-ear[2])>FAR}
  function makePanner(position){const p=ctx.createPanner();p.panningModel=lite?'equalpower':'HRTF';p.distanceModel='inverse';p.refDistance=6;p.maxDistance=160;p.rolloffFactor=1.1;
    const [x,y,z]=point(position);if(p.positionX){p.positionX.value=x;p.positionY.value=y;p.positionZ.value=z}else p.setPosition?.(x,y,z);return p}

  // ---- buffer voices (bank sounds and footsteps)
  function voice(name,{position=null,volume=1,loop=false,bus='effects',rate=1,buffer=null}={}){
    if(!audible())return null;
    buffer=buffer||buffers.get(name);if(!buffer)return null;
    if(voices.size>=MAX_VOICES&&!loop)return null;
    if(position&&tooFar(position))return null;
    const source=ctx.createBufferSource(),gain=ctx.createGain();source.buffer=buffer;source.loop=loop;source.playbackRate.value=clamp(rate,.5,2);
    gain.gain.value=clamp(volume,0,1);source.connect(gain);
    let panner=null;
    if(position&&ctx.createPanner){panner=makePanner(position);gain.connect(panner);panner.connect(buses[bus]||buses.effects)}
    else gain.connect(buses[bus]||buses.effects);
    let done=false;const cleanup=()=>{if(done)return;done=true;voices.delete(handle);try{source.disconnect();gain.disconnect();panner?.disconnect()}catch{}};
    const handle={source,gain,panner,stop(){try{source.stop()}catch{}cleanup()}};voices.add(handle);
    source.onended=cleanup;source.start();return handle;
  }
  function play(name,options){return voice(name,options)}

  // ---- synth voices: a group gain (optionally panned) that oscillators and noise bursts feed; cleaned up when the last source ends
  function group(bus='effects',{position=null,volume=1}={}){
    if(!audible()||voices.size>=MAX_VOICES)return null;
    if(position&&tooFar(position))return null;
    const g=ctx.createGain();g.gain.value=clamp(volume,0,2);const nodes=[g],srcs=[];let panner=null,tail=null,end=-1,done=false;
    if(position&&ctx.createPanner){panner=makePanner(position);g.connect(panner);panner.connect(buses[bus]||buses.effects);nodes.push(panner)}else g.connect(buses[bus]||buses.effects);
    const cleanup=()=>{if(done)return;done=true;voices.delete(handle);for(const n of nodes){try{n.disconnect()}catch{}}};
    const handle={gain:g,panner,t:ctx.currentTime+.01,
      add(n){nodes.push(n);return n},
      src(n,start,stop,offset){nodes.push(n);srcs.push(n);if(offset!==undefined)n.start(start,offset);else n.start(start);n.stop(stop);if(stop>end){end=stop;tail=n}return n},
      stop(){for(const s of srcs){try{s.stop()}catch{}}cleanup()},
      finish(){if(!tail){cleanup();return null}tail.onended=cleanup;return handle}};
    voices.add(handle);return handle;
  }
  function osc(G,{f=440,type='sine',at=0,len=.2,gain=.1,attack=.006,to=0,glide=0,dest=null,detune=0}){
    const o=ctx.createOscillator(),g=ctx.createGain(),t=G.t+at;o.type=type;o.frequency.setValueAtTime(f,t);if(to)o.frequency.exponentialRampToValueAtTime(to,t+(glide||len));if(detune&&o.detune)o.detune.value=detune;
    g.gain.setValueAtTime(0,t);g.gain.linearRampToValueAtTime(gain,t+attack);g.gain.exponentialRampToValueAtTime(.0001,t+attack+len);
    o.connect(g);g.connect(dest||G.gain);G.add(g);G.src(o,t,t+attack+len+.03);return o}
  function noise(G,{at=0,len=.2,gain=.1,type='bandpass',f=1200,q=1,to=0,attack=.004,dest=null,rate=1}){
    const b=buffers.get('noise');if(!b)return null;
    const s=ctx.createBufferSource(),fl=ctx.createBiquadFilter(),g=ctx.createGain(),t=G.t+at;
    s.buffer=b;s.loop=true;s.playbackRate.value=rate;fl.type=type;fl.frequency.setValueAtTime(f,t);if(to)fl.frequency.exponentialRampToValueAtTime(to,t+attack+len);fl.Q.value=q;
    g.gain.setValueAtTime(0,t);g.gain.linearRampToValueAtTime(gain,t+attack);g.gain.exponentialRampToValueAtTime(.0001,t+attack+len);
    s.connect(fl);fl.connect(g);g.connect(dest||G.gain);G.add(fl);G.add(g);G.src(s,t,t+attack+len+.03,Math.random()*.9);return s}
  function filter(G,type,f,q=.8){const fl=G.add(ctx.createBiquadFilter());fl.type=type;fl.frequency.value=f;fl.Q.value=q;fl.connect(G.gain);return fl}
  function bell(G,{f,at=0,gain=.08,decay=1.2,partials=[[1,1],[2.76,.45],[5.4,.2]],dest=null}){partials.forEach(([m,a],i)=>osc(G,{f:f*m,at,len:decay/(1+i*.8),gain:gain*a,attack:.004,dest}))}

  // ---- district beds: one oscillator-and-filter recipe per Districts theme (19 themes, 19 districts)
  const THEMES={
    navigation:{root:330,ratios:[1,1.5],type:'triangle',cut:900,lfo:.08,accent:'ping',rate:.07},
    council:{root:262,ratios:[1,1.26,1.5],type:'sine',cut:800,lfo:.05,accent:'lowbell',rate:.05},
    foundry:{root:220,ratios:[1,1.5,2.02],type:'sawtooth',cut:520,q:2.2,lfo:.21,accent:'clank',rate:.11},
    workshop:{root:294,ratios:[1,1.5],type:'triangle',cut:760,lfo:.09,accent:'knock',rate:.09},
    commons:{root:349,ratios:[1,1.26],type:'sine',cut:1100,lfo:.06,accent:'murmur',rate:.08},
    control:{root:440,ratios:[1,2],type:'square',cut:640,lfo:.15,accent:'tick',rate:.1},
    chamber:{root:311,ratios:[1,1.19,1.5],type:'sine',cut:900,lfo:.05,accent:'clink',rate:.06},
    atelier:{root:392,ratios:[1,1.26,1.5],type:'triangle',cut:1300,lfo:.07,accent:'marimba',rate:.07},
    observatory:{root:523,ratios:[1,1.5,2.01],type:'sine',cut:1800,lfo:.04,accent:'chime',rate:.07},
    yard:{root:233,ratios:[1,1.5],type:'sawtooth',cut:480,lfo:.12,accent:'hammer',rate:.09},
    stacks:{root:277,ratios:[1,1.5],type:'sine',cut:420,lfo:.03,accent:'rustle',rate:.06},
    lab:{root:370,ratios:[1,1.5,1.78],type:'triangle',cut:1000,lfo:.11,accent:'servo',rate:.08},
    log:{root:415,ratios:[1,1.26],type:'sine',cut:950,lfo:.06,accent:'scratch',rate:.08},
    integrations:{root:466,ratios:[1,1.5,2],type:'square',cut:700,lfo:.17,accent:'data',rate:.11},
    academy:{root:349,ratios:[1,1.26,1.5,2],type:'sine',cut:1400,lfo:.05,accent:'ping',rate:.06},
    governance:{root:247,ratios:[1,1.5],type:'triangle',cut:620,lfo:.04,accent:'gavel',rate:.05},
    delivery:{root:262,ratios:[1,1.5],type:'sawtooth',cut:560,lfo:.13,accent:'cart',rate:.08},
    infrastructure:{root:240,ratios:[1,2,3],type:'sawtooth',cut:700,q:1.6,lfo:.19,accent:'arc',rate:.09},
    synergy:{root:440,ratios:[1,1.26,1.5,2],type:'sine',cut:1500,lfo:.06,accent:'swell',rate:.06}
  };
  const THEME_KEYS=Object.keys(THEMES);
  function themeOf(top){let key=null;try{const d=typeof Districts!=='undefined'&&Districts.get?Districts.get(top):null;if(d&&THEMES[d.theme])key=d.theme}catch{}
    key=key||THEME_KEYS[hash(top||'')%THEME_KEYS.length];return {key,...THEMES[key]}}
  function makeBed(top){
    const th=themeOf(top),t=ctx.currentTime,out=ctx.createGain(),fl=ctx.createBiquadFilter(),nodes=[out,fl],srcs=[];
    fl.type='lowpass';fl.frequency.value=th.cut;fl.Q.value=th.q||.8;fl.connect(out);out.connect(buses.ambient);out.gain.value=0;
    th.ratios.forEach((m,i)=>{const o=ctx.createOscillator(),g=ctx.createGain();o.type=th.type;o.frequency.value=th.root*m;if(o.detune)o.detune.value=i%2?4:-4;g.gain.value=.11/(1+i*.6);o.connect(g);g.connect(fl);o.start(t);srcs.push(o);nodes.push(g)});
    // A slow swell on the filter keeps the drone breathing.
    const lfo=ctx.createOscillator(),lg=ctx.createGain();lfo.frequency.value=th.lfo;lg.gain.value=th.cut*.35;lfo.connect(lg);lg.connect(fl.frequency);lfo.start(t);srcs.push(lfo);nodes.push(lg);
    const hb=buffers.get('hum');if(hb){const s=ctx.createBufferSource(),g=ctx.createGain();s.buffer=hb;s.loop=true;s.playbackRate.value=clamp(th.root/330,.5,2);g.gain.value=.22;s.connect(g);g.connect(fl);s.start(t);srcs.push(s);nodes.push(g)}
    ramp(out.gain,1,2.4);
    let stopped=false;
    return {top,theme:th.key,th,filter:fl,stop(sec=2.4){if(stopped)return;stopped=true;ramp(out.gain,0,sec);const end=ctx.currentTime+sec+.05;
      srcs[0].onended=()=>{for(const n of [...srcs,...nodes]){try{n.disconnect()}catch{}}};for(const s of srcs){try{s.stop(end)}catch{}}}};
  }
  function setBed(top){if(!audible())return;if(bed&&bed.top===top)return;const old=bed;bed=makeBed(top);if(old)old.stop(2.4)}

  // ---- ambient loops and the scheduler
  function startWind(){
    if(loops.has('wind'))return;const b=buffers.get('air');if(!b)return;
    const t=ctx.currentTime,s=ctx.createBufferSource(),lp=ctx.createBiquadFilter(),bp=ctx.createBiquadFilter(),g=ctx.createGain(),hiss=ctx.createGain(),lfo=ctx.createOscillator(),lg=ctx.createGain(),gust=ctx.createOscillator(),gg=ctx.createGain();
    s.buffer=b;s.loop=true;lp.type='lowpass';lp.frequency.value=700;lp.Q.value=.7;bp.type='bandpass';bp.frequency.value=1900;bp.Q.value=.6;
    lfo.frequency.value=.07;lg.gain.value=420;lfo.connect(lg);lg.connect(lp.frequency);
    gust.frequency.value=.13;gg.gain.value=.08;gust.connect(gg);gg.connect(g.gain);
    g.gain.value=0;ramp(g.gain,.3,2.5);hiss.gain.value=.12;
    s.connect(lp);lp.connect(g);s.connect(bp);bp.connect(hiss);hiss.connect(g);g.connect(buses.ambient);
    s.start(t,Math.random()*(b.duration||1));lfo.start(t);gust.start(t);
    const all=[s,lp,bp,g,hiss,lfo,lg,gust,gg];
    loops.set('wind',{filter:lp,gain:g,hiss,band:bp,stop(){ramp(g.gain,0,.25);for(const n of [s,lfo,gust]){try{n.stop(ctx.currentTime+.3)}catch{}}s.onended=()=>{for(const n of all){try{n.disconnect()}catch{}}}}});
  }
  let rainLevel=0;function readRain(){try{if(typeof SH!=='undefined'&&SH.uRain)return clamp(+SH.uRain.value||0,0,1)}catch{}return 0}
  function readNight(){try{if(typeof SH!=='undefined'&&SH.uNight)return clamp(+SH.uNight.value||0,0,1)}catch{}const h=new Date().getHours();return h<6||h>=20?1:h<7||h>=19?.5:0}
  function districtsNow(){try{return typeof Campus!=='undefined'&&Campus.districts?Campus.districts()||[]:[]}catch{return []}}
  function underCamera(){try{if(typeof Campus==='undefined'||!Campus.position)return null;const p=Campus.position();if(!p||!Number.isFinite(p.x))return null;
    for(const d of districtsNow())if(p.x>=d.x&&p.x<=d.x+d.w&&p.z>=d.z&&p.z<=d.z+d.d)return d}catch{}return null}
  // A spot around the listener (or inside a district) so ambient life pans around the camera instead of sitting in the head.
  function spotNear(radius=26){if(!ear)return null;const a=Math.random()*TAU,r=radius*(.4+Math.random()*.6);return [ear[0]+Math.cos(a)*r,ear[1]+2+Math.random()*6,ear[2]+Math.sin(a)*r]}
  function spotIn(top){const d=districtsNow().find(x=>x.top===top);if(!d)return spotNear();return [d.x+Math.random()*d.w,4+Math.random()*4,d.z+Math.random()*d.d]}
  const LIFE={
    bird(){const G=group('ambient',{position:spotNear(30)});if(!G)return;const n=2+(Math.random()*3|0),up=Math.random()<.5,f0=2600+Math.random()*1200;
      for(let i=0;i<n;i++)osc(G,{f:f0*(1+i*.04),to:f0*(up?1.35:.72),at:i*.13+Math.random()*.03,len:.06+Math.random()*.05,gain:.05});G.finish()},
    crickets(){const G=group('ambient',{position:spotNear(18)});if(!G)return;const f=4300+Math.random()*400,g=.028*night;
      for(let k=0;k<2;k++)for(let i=0;i<4;i++)osc(G,{f,at:k*.32+i*.045,len:.022,gain:g,attack:.003});G.finish()},
    owl(){const G=group('ambient',{position:spotNear(40)});if(!G)return;const lp=filter(G,'lowpass',900);
      osc(G,{f:392,to:370,len:.35,type:'triangle',gain:.06,attack:.05,dest:lp});osc(G,{f:392,to:349,at:.55,len:.6,type:'triangle',gain:.06,attack:.06,dest:lp});G.finish()},
    bell(){const G=group('ambient',{position:spotNear(70)});if(!G)return;const lp=filter(G,'lowpass',1800);bell(G,{f:Math.random()<.5?392:523.25,gain:.05,decay:2.6,dest:lp});G.finish()}
  };
  const ACCENT={
    ping:(G,r)=>bell(G,{f:r*4,gain:.04,decay:.9,partials:[[1,1],[2.01,.3]]}),
    lowbell:(G,r)=>bell(G,{f:r*2,gain:.05,decay:2.2}),
    clank:(G,r)=>{noise(G,{len:.08,gain:.12,f:2400,q:4});[1,2.32,3.98].forEach((m,i)=>osc(G,{f:r*3.1*m,len:.4/(i+1),type:'triangle',gain:.03}))},
    knock:G=>{for(const at of [0,.16]){osc(G,{f:330,to:240,at,len:.08,gain:.08});noise(G,{at,len:.03,gain:.05,f:1200,q:3})}},
    murmur:G=>{for(let i=0;i<3;i++)noise(G,{at:i*.18,len:.22,gain:.035,f:500+Math.random()*400,q:3,attack:.06})},
    tick:G=>{for(let i=0;i<3;i++)osc(G,{f:2093,at:i*.24,len:.02,type:'square',gain:.012})},
    clink:G=>{bell(G,{f:2637,gain:.03,decay:.4,partials:[[1,1],[1.51,.5]]});bell(G,{f:3136,at:.09,gain:.025,decay:.35,partials:[[1,1]]})},
    marimba:(G,r)=>[1,1.26,1.5].forEach((m,i)=>{osc(G,{f:r*2*m,at:i*.16,len:.3,gain:.045});osc(G,{f:r*8*m,at:i*.16,len:.06,gain:.01})}),
    chime:(G,r)=>[1,1.5,2,2.5].forEach((m,i)=>bell(G,{f:r*2*m,at:i*.22+Math.random()*.05,gain:.025,decay:2,partials:[[1,1],[2.76,.25]]})),
    hammer:G=>{for(const at of [0,.42]){noise(G,{at,len:.06,gain:.09,f:1800,q:2});osc(G,{f:620,at,len:.18,type:'triangle',gain:.03})}},
    rustle:G=>noise(G,{len:.5,gain:.03,type:'highpass',f:3000,attack:.12}),
    servo:G=>{const lp=filter(G,'lowpass',2400);osc(G,{f:300,to:900,glide:.35,len:.4,type:'sawtooth',gain:.02,attack:.04,dest:lp});osc(G,{f:900,to:500,at:.45,glide:.25,len:.3,type:'sawtooth',gain:.016,dest:lp})},
    scratch:G=>{for(let i=0;i<3;i++)noise(G,{at:i*.12,len:.09,gain:.025,f:3500+i*400,q:5,attack:.02})},
    data:G=>{for(let i=0;i<5;i++)osc(G,{f:[1760,2093,2349,2637][Math.random()*4|0],at:i*.06,len:.03,type:'square',gain:.008})},
    gavel:G=>{noise(G,{len:.06,gain:.1,type:'lowpass',f:900});osc(G,{f:196,len:.25,gain:.08})},
    cart:G=>noise(G,{len:1.1,gain:.04,f:250,to:500,q:1.5,attack:.3}),
    arc:G=>{osc(G,{f:240,len:.25,type:'sawtooth',gain:.02,attack:.01});noise(G,{len:.12,gain:.04,type:'highpass',f:5000})},
    swell:(G,r)=>[1,1.26,1.5,2].forEach(m=>osc(G,{f:r*m,len:1.6,gain:.02,attack:.7}))
  };
  function accent(){if(!bed)return;const fn=ACCENT[bed.th.accent];if(!fn)return;const G=group('ambient',{position:spotIn(bed.top),volume:.9});if(!G)return;try{fn(G,bed.th.root)}catch{}G.finish()}
  function tick(){
    if(!ambientWanted||!audible())return;
    night=readNight();
    const d=underCamera();
    if(d&&d.top!==underTop){const first=!underTop;underTop=d.top;setBed(d.top);if(!first)gate(d.top)}
    else if(!bed)setBed(districtId||'');
    const t=ctx.currentTime,wind=loops.get('wind');
    if(wind)wind.filter.frequency.setTargetAtTime(700-260*night,t,3);
    // integrator: VFX weather (SH.uRain, 0..1) turns the wind hiss into rain on the pavers; dry days are unchanged
    if(wind&&wind.hiss){const rain=readRain();wind.hiss.gain.setTargetAtTime(.12+.55*rain,t,2.5);wind.band.frequency.setTargetAtTime(1900+1500*rain,t,2.5);rainLevel=rain}
    if(bed)bed.filter.frequency.setTargetAtTime(bed.th.cut*(1-.35*night),t,3);
    const R=Math.random;
    if(night<.7&&R()<(1-night)*.16)LIFE.bird();
    if(night>.25&&R()<night*.5)LIFE.crickets();
    if(night>.6&&R()<.012)LIFE.owl();
    if(night<.5&&R()<.018)LIFE.bell();
    if(bed&&R()<(bed.th.rate||.07))accent();
  }
  function stopAmbient(){if(timer){clearInterval(timer);timer=0}for(const l of loops.values())l.stop();loops.clear();if(bed){bed.stop(.3);bed=null}underTop=''}
  function ambient(on=true){ambientWanted=!!on;if(!on||!audible()){stopAmbient();return}
    startWind();if(!bed)setBed(underCamera()?.top||districtId||'');
    if(!timer&&typeof setInterval==='function')timer=setInterval(tick,TICK_MS);
  }

  // ---- one-shots
  const PENTA=[0,2,4,7,9,12,14,16,19,21];
  const pitchOf=top=>392*Math.pow(2,PENTA[hash(top||'')%PENTA.length]/12);
  // Warden voices: one waveform and vowel formant per archetype.
  const VOICE={keeper:{f:330,type:'triangle',formant:900},archivist:{f:440,type:'sine',formant:1400},herald:{f:560,type:'triangle',formant:1900},vanguard:{f:260,type:'square',formant:700}};
  const SFX={
    'ui.click':G=>{osc(G,{f:1320,to:990,len:.035,type:'triangle',gain:.07});noise(G,{len:.012,gain:.03,type:'highpass',f:4000})},
    'ui.hover':G=>osc(G,{f:1760,len:.03,gain:.016}),
    'ui.open':G=>{osc(G,{f:587.33,len:.18,gain:.06});osc(G,{f:880,at:.06,len:.26,gain:.05});noise(G,{len:.2,gain:.025,f:700,to:2600,q:.8})},
    'ui.close':G=>{osc(G,{f:880,len:.14,gain:.045});osc(G,{f:587.33,at:.05,len:.2,gain:.04});noise(G,{len:.16,gain:.02,f:2400,to:600,q:.8})},
    'ui.toggle':G=>{osc(G,{f:990,len:.05,type:'triangle',gain:.05});osc(G,{f:1480,at:.045,len:.07,gain:.04})},
    'ui.error':G=>{const lp=filter(G,'lowpass',1100);osc(G,{f:233,len:.12,type:'sawtooth',gain:.05,dest:lp});osc(G,{f:220,at:.13,len:.18,type:'sawtooth',gain:.05,dest:lp})},
    'ui.minimap':G=>{osc(G,{f:1568,len:.25,gain:.045});osc(G,{f:2349,at:.03,len:.18,gain:.02})},
    'note.write':(G,o)=>{const f=o.pitch||pitchOf(o.district);bell(G,{f,gain:.075,decay:1.3});bell(G,{f:f*1.5,at:.11,gain:.045,decay:1});noise(G,{len:.05,gain:.02,type:'highpass',f:5000})},
    'task.done':G=>{[587.33,739.99,880,1174.66].forEach((f,i)=>{osc(G,{f,at:i*.085,len:.42,type:'triangle',gain:.06});osc(G,{f:f*2,at:i*.085,len:.3,gain:.018})});
      [587.33,880,1174.66].forEach(f=>osc(G,{f,at:.36,len:1.1,gain:.035,attack:.03}));osc(G,{f:147,to:110,len:.4,gain:.12});noise(G,{at:.32,len:.7,gain:.025,type:'highpass',f:6000})},
    'level.up':G=>{[293.66,369.99,440,587.33,739.99,880,1174.66,1479.98].forEach((f,i)=>osc(G,{f,at:i*.07,len:.35,type:'triangle',gain:.05}));
      [587.33,739.99,880,1174.66].forEach(f=>{osc(G,{f,at:.6,len:1.6,gain:.03,attack:.04});osc(G,{f,at:.6,len:1.6,gain:.02,attack:.04,detune:7})});osc(G,{f:147,to:98,at:.56,len:.6,gain:.14});noise(G,{at:.56,len:1.2,gain:.03,type:'highpass',f:7000})},
    'say':G=>{osc(G,{f:880,len:.07,gain:.05});osc(G,{f:1318.5,at:.07,len:.1,gain:.04})},
    'warden.blip':(G,o)=>{const v=VOICE[o.voice]||VOICE.keeper,f=v.f*(o.jitter||1),bp=filter(G,'bandpass',v.formant,2.5);osc(G,{f,to:f*1.06,len:.035,type:v.type,gain:.12,dest:bp})},
    'sentinel.lift':G=>{const lp=filter(G,'lowpass',1400);osc(G,{f:170,to:520,glide:.9,len:.95,type:'sawtooth',gain:.035,attack:.08,dest:lp});noise(G,{len:.9,gain:.05,f:500,to:2200,q:1.2,attack:.1})},
    'sentinel.land':G=>{const lp=filter(G,'lowpass',1200);osc(G,{f:480,to:150,glide:.7,len:.75,type:'sawtooth',gain:.03,attack:.05,dest:lp});noise(G,{at:.62,len:.18,gain:.08,type:'lowpass',f:500});osc(G,{f:150,at:.62,len:.2,gain:.08})},
    'district.gate':(G,o)=>{const r=themeOf(o.district).root;bell(G,{f:r*2,gain:.05,decay:1.6,partials:[[1,1],[2,.35],[3.01,.18]]});bell(G,{f:r*3,at:.14,gain:.035,decay:1.4,partials:[[1,1],[2,.3]]});noise(G,{len:.9,gain:.03,f:300,to:1600,q:.7,attack:.25})}
  };
  const WORK=new Set(['note.write','task.done','level.up','say']);
  const GAP={'ui.hover':70,'warden.blip':55,'ui.click':40,'district.gate':1500};
  function sfx(name,o={}){
    const fn=SFX[name];if(!fn)return null;const t=nowMs();if(t-(lastKind.get(name)??-Infinity)<(GAP[name]??40))return null;
    const G=group(WORK.has(name)?'work':'effects',{position:o.position||null,volume:o.volume??1});if(!G)return null;
    lastKind.set(name,t);if(name!=='ui.click'&&name!=='ui.hover')lastSpecific=t;
    try{fn(G,o)}catch{G.stop();return null}return G.finish();
  }
  function tone(freq,len=.2,type='sine',gain=.05,{delay=0,position=null,bus='effects'}={}){
    const G=group(bus,{position});if(!G)return null;try{osc(G,{f:freq,at:delay,len,type,gain:clamp(gain,0,.5)})}catch{G.stop();return null}return G.finish()}
  function gate(top){const t=nowMs();if(t-lastGate<1500)return;lastGate=t;sfx('district.gate',{district:top,volume:.8})}

  // ---- public helpers
  function setEnabled(value){enabled=!!value;try{localStorage.setItem('vault.sound',JSON.stringify(enabled))}catch{}
    applyMix(.1);
    if(!enabled){stopAmbient();for(const v of [...voices])v.stop()}else{unlock();if(ambientWanted)ambient()}
  }
  function setLevel(name,value){if(!(name in MIX_DEFAULT))return;mix[name]=clamp(+value||0,0,1);try{localStorage.setItem(MIX_KEY,JSON.stringify(mix))}catch{}applyMix(.08)}
  // Effective level for code outside the mixer (the title score): master times the named slider, zero when muted.
  function level(name){if(!readEnabled())return 0;const m=readMix();return name==='master'?m.master:m.master*(m[name]??1)}
  function listener(position,forward=[0,0,-1]){
    if(!ctx)return;const l=ctx.listener,[x,y,z]=point(position),[fx,fy,fz]=point(forward);ear=[x,y,z];
    if(l.positionX){l.positionX.value=x;l.positionY.value=y;l.positionZ.value=z;l.forwardX.value=fx;l.forwardY.value=fy;l.forwardZ.value=fz;l.upX.value=0;l.upY.value=1;l.upZ.value=0}
    else{l.setPosition?.(x,y,z);l.setOrientation?.(fx,fy,fz,0,1,0)}
  }
  function surfaceAt(position){const [x,y,z]=point(position);if(y>2.2)return 'roof';
    for(const d of districtsNow())if(x>=d.x&&x<=d.x+d.w&&z>=d.z&&z<=d.z+d.d)return Math.min(x-d.x,d.x+d.w-x,z-d.z,d.z+d.d-z)<4?'grass':'stone';
    return 'gravel'}
  function footstep(position,speed=1,surface){const now=nowMs();if(now-lastStep<Math.max(180,460/Math.max(.5,speed)))return null;lastStep=now;
    const s=SURFACES.includes(surface)?surface:surfaceAt(position),list=steps.get(s)||[],buffer=list.length?list[stepN++%list.length]:buffers.get('footstep');
    return voice('footstep',{buffer,position,volume:(s==='grass'?.5:.38)*(.85+Math.random()*.3),rate:.92+Math.random()*.16})}
  function district(id){if(id===districtId)return;districtId=id;if(ambientWanted&&audible()&&!underTop)setBed(id);gate(id)}
  function workEvent(kind,position,top){const k=String(kind||'');
    const name=/done|complete|finish/.test(k)?'task.done':/level/.test(k)?'level.up':/say|message/.test(k)?'say':/write|append|edit|creat|added|task/.test(k)?'note.write':'ui.click';
    const t=nowMs();if(t-(lastKind.get('work:'+name)??-Infinity)<350)return null;lastKind.set('work:'+name,t);
    return sfx(name,{position:position||null,district:top||districtId})}
  function mixerHTML(){mix=readMix();const row=(k,label)=>`<label class="audiomix-row" style="display:flex;align-items:center;gap:12px;min-height:44px">${label}<input type="range" min="0" max="100" step="5" data-audio-level="${k}" value="${Math.round(mix[k]*100)}" aria-label="${label} volume" style="flex:1;min-height:44px;accent-color:#E8A33D"></label>`;
    return `<fieldset class="audiomix" style="border:0;padding:0;margin:8px 0 0;min-width:0"><legend style="font-size:12px;opacity:.75;padding:0">Sound mix</legend>${row('master','Master')}${row('music','Ambience and music')}${row('effects','Effects')}</fieldset>`}
  function bindMixer(root){root?.querySelectorAll?.('[data-audio-level]').forEach(i=>{i.oninput=()=>setLevel(i.dataset.audioLevel,i.value/100);i.onchange=()=>{if(i.dataset.audioLevel!=='music')sfx('ui.toggle')}})}

  // ---- browser wiring: unlock on the first gesture, page visibility, and UI clicks and hovers by delegation
  function visibility(){if(document.hidden){stopAmbient();if(ctx)ctx.suspend().catch(()=>{})}else if(ctx&&unlocked){ctx.resume().then(()=>{if(ambientWanted)ambient()}).catch(()=>{})}}
  const GESTURES=['pointerup','touchend','keydown','mousedown'];
  function onGesture(){if(!readEnabled()||disposed)return;if(unlocked&&ctx?.state==='running'){detachGestures();return}unlock().then(ok=>{if(ok&&ctx?.state==='running')detachGestures()})}
  function detachGestures(){for(const k of GESTURES)document.removeEventListener?.(k,onGesture,true)}
  const CLICKABLE='button,.btn,[role="button"],summary,a,input[type="checkbox"],input[type="radio"],select,#miniC,.file';
  function onClick(e){const el=e.target?.closest?.(CLICKABLE);if(!el||el.closest('#title,#wd,[data-sfx="off"]'))return;
    if(el.id==='miniC'){sfx('ui.minimap');return}
    const at=nowMs(),name=el.matches('input')?'ui.toggle':'ui.click';
    // Deferred one tick so a specific sound fired by the handler itself (open, close, chime) wins over the generic click.
    (globalThis.setTimeout||(f=>f()))(()=>{if(lastSpecific<at)sfx(name)},0)}
  function onHover(e){if(e.pointerType!=='mouse')return;const el=e.target?.closest?.('button,.btn,[role="button"],.file');if(!el||el===hoverEl||el.closest('#title,#wd,[data-sfx="off"]')){if(!el)hoverEl=null;return}hoverEl=el;sfx('ui.hover')}
  if(typeof document!=='undefined'&&document.addEventListener){
    document.addEventListener('visibilitychange',visibility);
    for(const k of GESTURES)document.addEventListener(k,onGesture,true);
    document.addEventListener('click',onClick,true);
    document.addEventListener('pointerover',onHover,{passive:true});
  }
  async function dispose(){disposed=true;generation++;ambientWanted=false;stopAmbient();for(const v of [...voices])v.stop();buffers.clear();steps.clear();ready=null;unlocked=false;
    const audio=ctx;ctx=null;master=null;buses=null;if(audio)await audio.close().catch(()=>{});
  }
  return{unlock,preload,play,sfx,tone,ambient,setEnabled,setLevel,level,listener,footstep,district,workEvent,mixerHTML,bindMixer,dispose,surfaceAt,
    names:()=>Object.keys(SFX),themes:()=>THEME_KEYS.slice(),
    status:()=>({unlocked,enabled,loaded:BANK.filter(n=>buffers.has(n)).length,steps:[...steps.values()].reduce((n,l)=>n+l.length,0),voices:voices.size,loops:loops.size+(bed?1:0),
      district:districtId,under:underTop,theme:bed?.theme||null,night,rain:rainLevel,running:ctx?.state==='running',mix:{...mix}})};
})();
