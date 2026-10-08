// ---------- title: code-only camera choreography, skyline, postprocessing and menu.
// The score is synthesized live; every other sound is a VaultAudio.sfx cue from b_audio.js, cut to the picture.
// The cold open is an eight-shot cutscene rendered live in three.js (shot list: SHOTS below, docs/aaa-swarm.md "Cutscenes"):
// (1) the night sky, Milky Way and today's moon tilting down through a passing shower, (2) the quay lamps lighting one by
// one under the lighthouse, (3) a district gateway lighting up over its moving landmark, (4) note facades with scaffolding
// and a lit door, (5) Sentinels walking, talking and riding a lift, (6) a live write sweeping up a tower, (7) the Warden's
// greeting at the gate, (8) dawn over the skyline as the wordmark lands. Shots crossfade through render targets; letterbox,
// grain, light leaks, slates and captions are code too.
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
@media (max-height:620px){#title{--wm-up:31vh}#title .wm{gap:6px}#title .word{font-size:clamp(26px,6vw,48px)}#title .tag{display:none}#title .mm{top:43%;padding:10px 16px;gap:2px;max-height:48vh;overflow:auto}#title .mm button{min-height:44px;padding:8px 18px;font-size:14px}#title .mm button.pri{padding:10px 20px;margin-bottom:2px}#title .panel{max-height:calc(100dvh - 24px);overflow:auto}}
@media (prefers-reduced-motion: reduce){#title *{transition-duration:.01ms!important;animation-duration:.01ms!important}}
`;
// ---- shot list. One table drives the camera rigs, the crossfades, the score's cut pulses, the cue timeline and the tests.
// Eight shots 2.8 s apart; each overlaps the next by a 0.6 s crossfade. The last (dawn) holds under the wordmark and the menu.
const XF=.6,STEP=2.8;
const SHOT_IDS=["sky","shore","gate","facades","sentinels","write","warden","dawn"];
const SHOTS=Object.freeze(SHOT_IDS.map((id,i)=>Object.freeze({id,a:+(i*STEP).toFixed(2),b:i<SHOT_IDS.length-1?+((i+1)*STEP+XF).toFixed(2):1e9})));
const SHOT=Object.freeze(Object.fromEntries(SHOTS.map(s=>[s.id,s])));
const CUT=Object.freeze({cuts:Object.freeze(SHOTS.slice(1).map(s=>s.a)),dawn:SHOT.dawn.a,end:+(SHOT.dawn.a+6.6).toFixed(2)});
// On-screen captions per shot. The Warden shot speaks the Warden's own opening line (c_npc.js), not a caption.
const CAPS=Object.freeze({shore:["01","The shore lights up"],gate:["02","Every district has a gate"],facades:["03","Every building is a note"],sentinels:["04","Every agent has a place"],write:["05","Every write shows where it lands"]});
// Beats inside the shots. Each one is a cue in the timeline; picture events go to the city, sound to VaultAudio.sfx.
const BEATS=Object.freeze({
  lamps:Object.freeze({at:+(SHOT.shore.a+.45).toFixed(2),step:.26,n:9}), // quay lamps light one by one, a tick each
  gate:+(SHOT.gate.a+.7).toFixed(2),       // gateway lights, light curtain rises: district.gate
  door:+(SHOT.facades.a+1.5).toFixed(2),   // a door lights for the open note: ui.open
  lift:+(SHOT.sentinels.a+.7).toFixed(2),  // a Sentinel rides up a facade, sparks behind it: sentinel.lift
  land:+(SHOT.sentinels.a+2.2).toFixed(2), // and steps onto the roof: sentinel.land
  write:+(SHOT.write.a+.8).toFixed(2),     // a live write climbs a tower: note.write
  greet:+(SHOT.warden.a+.6).toFixed(2),    // the Warden greets: warden.blip in the herald voice
  shower:Object.freeze([.3,1.3,4.4,6.2]),  // on a dry day a passing shower crosses the first two shots (in, full, out, clear)
  lampsOff:+(CUT.dawn+2.2).toFixed(2)      // lamps go out one by one at dawn
});
const SFX_OF=Object.freeze({gate:"district.gate",door:"ui.open",lift:"sentinel.lift",land:"sentinel.land",write:"note.write",blip:"warden.blip",greet:"warden.blip"});
// Cue timelines: FULL (the cold open), STING (seen today, or the cutscene is off) and STILL (reduced motion).
// "fx:" cues are one-shot picture and sound beats and never replay on skip; "cap:" cues set the caption.
function timeline(){
  const F=[["slate",.6],["slateOff",STEP],["leak",+(SHOT.shore.a-.15).toFixed(2)],["leak",+(CUT.dawn-.15).toFixed(2)]];
  Object.keys(CAPS).forEach(id=>F.push(["cap:"+id,+(SHOT[id].a+.45).toFixed(2)],["capOff",+(SHOT[id].b-XF-.05).toFixed(2)]));
  F.push(["cap:warden",+(SHOT.warden.a+.5).toFixed(2)],["capOff",+(SHOT.warden.b-XF-.05).toFixed(2)]);
  for(let i=0;i<BEATS.lamps.n;i++)F.push(["fx:lamp",+(BEATS.lamps.at+i*BEATS.lamps.step).toFixed(2)]);
  ["gate","door","lift","land","write","greet"].forEach(k=>F.push(["fx:"+k,BEATS[k]]));
  for(let i=0;i<6;i++)F.push(["fx:blip",+(BEATS.greet+.3+i*.11).toFixed(2)]);
  F.push(["letters",+(CUT.dawn+.6).toFixed(2)],["sweep",+(CUT.dawn+2.4).toFixed(2)],["sub",+(CUT.dawn+3.3).toFixed(2)],["rule",+(CUT.dawn+3.7).toFixed(2)],["tag",+(CUT.dawn+4.6).toFixed(2)],["menu",CUT.end]);
  F.sort((x,y)=>x[1]-y[1]);
  return {full:F,sting:[["letters",.05],["sweep",.5],["sub",.6],["rule",.7],["tag",.8],["menu",1.5]],still:[["letters",0],["sub",0],["rule",0],["tag",0],["menu",0]]};
}
// Which timeline plays: reduced motion gets one still frame; a repeat visit the same day, or the setting off, the sting.
function plan(o){return o.reduced?"still":(o.seenToday||!o.cutOn)?"sting":"full"}
// The two shots on screen at cutscene time t (B is null outside a crossfade); k is B's crossfade weight. Allocation free.
const LIVE={A:SHOTS[0],B:null,k:0};
function liveAt(t){let a=-1,b=-1;for(let i=0;i<SHOTS.length;i++){const s=SHOTS[i];if(t>=s.a&&t<s.b){if(a<0)a=i;else{b=i;break}}}
  if(a<0)a=t<0?0:SHOTS.length-1;LIVE.A=SHOTS[a];LIVE.B=b<0?null:SHOTS[b];LIVE.k=b<0?0:clamp((t-SHOTS[b].a)/(SHOTS[a].b-SHOTS[b].a),0,1);return LIVE}
// Moon phase from the date (mean synodic month from the 2000-01-06 18:14 UTC new moon), same formula as c_campus.js: 0 new, 0.5 full.
const moonPhase=(now=Date.now())=>{const days=(now-Date.UTC(2000,0,6,18,14))/864e5;return((days/29.530588853)%1+1)%1};
// ---- synth: pad + slow arpeggio under the whole cold open, created on the first user gesture only. Bass pulses land on
// every cut; the arpeggio opens up an octave at dawn.
const Score=(()=>{let ctx=null,master=null,nodes=[],timer=0;
  const on=()=>S.get(K.sound,true)!==false;
  function start(off){const END=CUT.end,D=CUT.dawn;off=clamp(+off||0,0,END);if(ctx||!on())return;try{ctx=new (window.AudioContext||window.webkitAudioContext)()}catch(e){return}
    if(ctx.state==="suspended")ctx.resume();
    const now=ctx.currentTime,t=now-off,at=x=>Math.max(now+.01,t+x);master=ctx.createGain();master.gain.setValueAtTime(0,now);master.gain.linearRampToValueAtTime(.55*(typeof VaultAudio!=="undefined"?VaultAudio.level("music"):1)/* music slider */,now+(off?1.2:2.5));
    const lp=ctx.createBiquadFilter();lp.type="lowpass";lp.frequency.setValueAtTime(420+1480*clamp(off/D,0,1),now);lp.frequency.linearRampToValueAtTime(1900,at(D));lp.Q.value=.6;
    const dl=ctx.createDelay(1);dl.delayTime.value=.37;const fb=ctx.createGain();fb.gain.value=.34;const wet=ctx.createGain();wet.gain.value=.32;
    lp.connect(master);lp.connect(dl);dl.connect(fb);fb.connect(dl);dl.connect(wet);wet.connect(master);master.connect(ctx.destination);
    // pad: two detuned saws per note on a D minor 9 voicing, slow LFO on the filter
    const pad=[73.42,110,146.83,174.61,220,261.63];
    pad.forEach((f,i)=>{[-6,6].forEach(d=>{const o=ctx.createOscillator(),g=ctx.createGain();o.type=i<2?"sawtooth":"triangle";o.frequency.value=f;o.detune.value=d+(i%2?3:-3);
      g.gain.setValueAtTime(0,now);g.gain.linearRampToValueAtTime(.045,Math.max(now+.3,t+3+i*.4));g.gain.setValueAtTime(.045,Math.max(now+.31,t+END-1.2));g.gain.linearRampToValueAtTime(0,Math.max(now+.32,t+END+3.3));
      o.connect(g).connect(lp);o.start(now);o.stop(t+END+4);nodes.push(o)})});
    const lfo=ctx.createOscillator(),lg=ctx.createGain();lfo.frequency.value=.11;lg.gain.value=260;lfo.connect(lg).connect(lp.frequency);lfo.start(now);lfo.stop(t+END+4);nodes.push(lfo);
    // arpeggio: D F A C E G A D, eighth notes at 68 bpm, enters with the city, opens up an octave with the dawn wordmark
    const arp=[293.66,349.23,440,523.25,659.25,783.99,880,1174.66];const step=60/68/2,last=END+1.8;
    for(let n=0,k=0;2.6+n*step<last;n++){if(n%8===7)continue;const x=2.6+n*step,lit=x>=D;const f=arp[k%arp.length]*(lit?1:.5);k++;const a=t+x;if(a<now)continue;
      const o=ctx.createOscillator(),g=ctx.createGain();o.type="sine";o.frequency.value=f;const vol=(lit?.09:.055)*Math.min(1,Math.max(0,(last-x)/4));if(vol<=0)continue;
      g.gain.setValueAtTime(0,a);g.gain.linearRampToValueAtTime(vol,a+.02);g.gain.exponentialRampToValueAtTime(.0001,a+step*1.8);o.connect(g).connect(lp);o.start(a);o.stop(a+step*2);nodes.push(o)}
    // bass pulse on each shot cut and under the gold sweep
    CUT.cuts.concat([D+2.4]).forEach(x=>{if(t+x<now)return;const o=ctx.createOscillator(),g=ctx.createGain(),v=x>=D?.35:.24;o.type="sine";o.frequency.value=36.71;g.gain.setValueAtTime(0,t+x);g.gain.linearRampToValueAtTime(v,t+x+.05);g.gain.exponentialRampToValueAtTime(.0001,t+x+1.6);o.connect(g).connect(master);o.start(t+x);o.stop(t+x+1.8);nodes.push(o)});
    timer=setTimeout(stop,(END+4.3-off)*1000);
  }
  function tick(f=880,len=.08,gain=.05){if(!ctx||!on())return;const t=ctx.currentTime,o=ctx.createOscillator(),g=ctx.createGain();o.type="triangle";o.frequency.value=f;g.gain.setValueAtTime(0,t);g.gain.linearRampToValueAtTime(gain,t+.008);g.gain.exponentialRampToValueAtTime(.0001,t+len);o.connect(g).connect(ctx.destination);o.start(t);o.stop(t+len+.02)}
  function duck(sec){if(!ctx||!master)return;const t=ctx.currentTime;master.gain.cancelScheduledValues(t);master.gain.setValueAtTime(master.gain.value,t);master.gain.linearRampToValueAtTime(0,t+sec)}
  function stop(){clearTimeout(timer);nodes.forEach(o=>{try{o.stop()}catch(e){}});nodes=[];if(ctx){const c=ctx;ctx=null;master=null;setTimeout(()=>{try{c.close()}catch(e){}},200)}}
  return{start,tick,duck,stop,live:()=>!!ctx};
})();
// ---- the picture: one procedural campus filmed by eight camera rigs, crossfaded through two render targets.
// The title runs before the city boots, so it is its own lightweight render, but every district, building, weather and
// effect detail comes from the shared modules: VFX (weather, write sweep, light curtain, trails, conversation beam, rings,
// colour grade), DistrictLook (court paving, gateway, banners, name plates, beacon), DistrictAssets (the landmark and its
// moving parts), Facades (doors, awnings, signs, balconies, scaffolding), SentinelMesh and the Warden kit (Guides).
// Shared state those modules keep is handed back on dispose (VFX.dispose + weather restore, DistrictLook.reset).
function glowTex(stops,size){const c=document.createElement("canvas");c.width=c.height=size||128;const g=c.getContext("2d"),h=c.width/2;
  const gr=g.createRadialGradient(h,h,0,h,h,h);stops.forEach(s=>gr.addColorStop(s[0],s[1]));g.fillStyle=gr;g.fillRect(0,0,c.width,c.height);
  const t=new THREE.CanvasTexture(c);return t}
const NOISE="float h21(vec2 p){return fract(sin(dot(p,vec2(127.1,311.7)))*43758.5453);}\nfloat vn(vec2 p){vec2 i=floor(p),f=fract(p);f=f*f*(3.-2.*f);return mix(mix(h21(i),h21(i+vec2(1.,0.)),f.x),mix(h21(i+vec2(0.,1.)),h21(i+vec2(1.,1.)),f.x),f.y);}\n";
function makeCity(canvas,quality,opt){
  if(typeof THREE==="undefined")return null;
  opt=opt||{};const hi=quality==="high",REDUCED=opt.reduced!=null?!!opt.reduced:reduced();
  const HASV=typeof VFX!=="undefined",tier=HASV?VFX.tierFor(quality==="low"?"low":"high",innerWidth||1024):hi?"high":"low",phone=tier==="medium";
  let r;try{r=new THREE.WebGLRenderer({canvas,antialias:hi&&!phone,alpha:false,powerPreference:"high-performance"})}catch(e){return null}
  r.setPixelRatio(Math.min(window.devicePixelRatio||1,phone?1.5:hi?2:1));// phone tier: 1.5x is enough under grain and letterbox
  r.setClearColor(0x05070e,1);
  // GPU reset (b_vfx.js guard): skip frames while the context is gone and show the dusk backdrop; three restores the rest
  let ctxLost=false,ctxDone=false;const unguard=HASV?VFX.guardContext(canvas,{onLost:()=>{if(ctxDone)return;ctxLost=true;canvas.style.background="radial-gradient(ellipse at 50% 70%,#2a2030,#05070e 70%)"},onRestored:()=>{ctxLost=false;canvas.style.background=""}}):()=>{};
  const scene=new THREE.Scene();const FOG_N=new THREE.Color(0x05070e);scene.fog=new THREE.FogExp2(0x05070e,.016);
  const camA=new THREE.PerspectiveCamera(50,1,.1,1400),camB=new THREE.PerspectiveCamera(50,1,.1,1400);
  const G=hi?46:30,CELL=4.2,N=G*G,SPAN=G*CELL,ISL=SPAN*.62;const X=i=>(i-G/2+.5)*CELL;
  const roadI=i=>i%7===3,roadJ=j=>j%9===4;
  const lerp=(a,b,k)=>a+(b-a)*k,sstep=(a,b,x)=>{const u=clamp((x-a)/(b-a),0,1);return u*u*(3-2*u)};
  const m4=new THREE.Matrix4(),col=new THREE.Color(),tgt=new THREE.Vector3(),tmpV=new THREE.Vector3();
  const lampU={value:1};// lamp level shared with the district gateway and facade glow: 1 at night, 0 by day
  // ---- sky: night to dawn gradient, the Milky Way, the moon in today's real phase, and a cloud veil when it rains
  const moonDir=new THREE.Vector3(.1,.56,-1).normalize(),skyLook=new THREE.Vector3(-.2,-.1,0);// the opening frame puts the moon upper right, clear of the slate
  const skyU={zen:{value:new THREE.Color(0x03050c)},hor:{value:new THREE.Color(0x0b1226)},glow:{value:new THREE.Color(0xe8a33d)},sunDir:{value:new THREE.Vector3(.78,0,-.62)},dawn:{value:0},fogc:{value:new THREE.Color(0x05070e)},
    moonDir:{value:moonDir},uPhase:{value:moonPhase()},uBand:{value:new THREE.Vector3(.82,.36,.44).normalize()},uStars:{value:1},uCloud:{value:0}};
  const sky=new THREE.Mesh(new THREE.SphereGeometry(600,32,16),new THREE.ShaderMaterial({uniforms:skyU,side:THREE.BackSide,depthWrite:false,
    vertexShader:"varying vec3 vP;void main(){vP=normalize(position);gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.);}",
    fragmentShader:"uniform vec3 zen,hor,glow,sunDir,fogc,moonDir,uBand;uniform float dawn,uPhase,uStars,uCloud;varying vec3 vP;\n"+NOISE+
      "void main(){vec3 d=normalize(vP);float h=max(d.y,0.);vec3 c=mix(hor,zen,pow(h,.45));vec2 a=normalize(d.xz+1e-4),b=normalize(sunDir.xz);float s=max(dot(a,b),0.);c+=glow*dawn*(pow(s,10.)*exp(-h*7.)*.55+.08*exp(-h*3.));"+
      // Milky Way: a dusty band with a dark lane
      "float bd=dot(d,normalize(uBand));if(uStars>.01&&h>0.&&bd*bd<.2){float band=exp(-bd*bd/.03);vec2 bp=vec2(atan(d.z,d.x)*3.,bd*9.);float dust=vn(bp*2.)*.6+vn(bp*5.3)*.4;float lane=1.-smoothstep(0.,.05,abs(bd+.03*(vn(bp*3.)-.5)));"+
      "c+=vec3(.55,.6,.85)*band*(.35+.65*dust)*(1.-.6*lane*smoothstep(.35,.7,dust))*uStars*.12*smoothstep(0.,.25,h)*(1.-uCloud);}"+
      // moon: a lit sphere in today's phase, maria, earthshine on the dark limb
      "vec3 md=normalize(moonDir);vec3 mt=normalize(cross(md,vec3(0.,1.,0.)));vec3 mb=cross(mt,md);vec2 ml=vec2(dot(d,mt),dot(d,mb))/.028;float mr=dot(ml,ml);"+
      "float mdisc=(1.-smoothstep(.82,1.,mr))*step(0.,dot(d,md));vec3 mn=vec3(ml,sqrt(max(1.-mr,0.)));float ph=uPhase*6.2832;float mlit=smoothstep(-.04,.14,dot(mn,vec3(sin(ph),0.,-cos(ph))));"+
      "float face=1.-.3*smoothstep(.45,.72,vn(ml*2.3+7.))-.1*smoothstep(.55,.8,vn(ml*6.5+1.));float m=max(dot(d,md),0.),illum=.5-.5*cos(ph);"+
      "c+=vec3(.86,.9,1.)*(mdisc*2.2*face*(.035+.965*mlit)*(1.-uCloud*.7)+(pow(m,900.)*.5+pow(m,60.)*.07)*(.25+.75*illum))*max(uStars,.15);"+
      // rain veil: low cloud drifting over the upper sky
      "if(uCloud>.01&&h>.02){vec2 cp=d.xz/(h+.12);float cl=vn(cp*1.3+vec2(dawn*2.,0.))*.65+vn(cp*3.1)*.35;c=mix(c,hor*1.25+vec3(.01,.012,.02),uCloud*smoothstep(.35,.75,cl)*smoothstep(.02,.25,h)*.8);}"+
      "c=mix(fogc,c,smoothstep(-.02,.14,vP.y));gl_FragColor=vec4(c,1.);}"}));
  sky.renderOrder=-2;scene.add(sky);
  const SN=hi?2600:phone?1600:1200,sp=new Float32Array(SN*3);for(let k=0;k<SN;k++){const u=Math.random()*2*Math.PI,v=Math.pow(Math.random(),.6)*.95+.04,rr=580;/* beyond the far hills, inside the sky dome */const cv=Math.sqrt(1-v*v);sp[k*3]=Math.cos(u)*cv*rr;sp[k*3+1]=v*rr;sp[k*3+2]=Math.sin(u)*cv*rr}
  const sg=new THREE.BufferGeometry();sg.setAttribute("position",new THREE.BufferAttribute(sp,3));
  const starM=new THREE.PointsMaterial({color:0xdfe6ff,size:hi?1.6:1.3,sizeAttenuation:false,transparent:true,opacity:.9,depthWrite:false,fog:false});
  const stars=new THREE.Points(sg,starM);stars.renderOrder=-1;scene.add(stars);
  const sunM=new THREE.SpriteMaterial({map:glowTex([[0,"rgba(255,240,210,1)"],[.12,"rgba(255,214,150,.9)"],[.4,"rgba(232,163,61,.25)"],[1,"rgba(232,163,61,0)"]]),transparent:true,opacity:0,depthWrite:false,blending:THREE.AdditiveBlending,fog:false});
  const sunS=new THREE.Sprite(sunM);sunS.scale.set(160,160,1);scene.add(sunS);
  // ---- the island, its quay and the sea. The water mirrors the moon, the lighthouse, each lit quay lamp and the skyline glow.
  const groundM=new THREE.MeshStandardMaterial({color:0x080b16,roughness:.85,metalness:.2});
  const ground=new THREE.Mesh(new THREE.CircleGeometry(ISL,72),groundM);ground.rotation.x=-Math.PI/2;ground.position.y=-.01;scene.add(ground);
  const grid=new THREE.GridHelper(SPAN,G,0x1d2648,0x141a30);grid.material.transparent=true;grid.material.opacity=.45;scene.add(grid);
  const quay=new THREE.Mesh(new THREE.CylinderGeometry(ISL+.3,ISL+.3,1.4,96,1,true),new THREE.MeshStandardMaterial({color:0x2a2c34,roughness:.8,metalness:.1,side:THREE.DoubleSide}));quay.position.y=-.65;scene.add(quay);
  const NQ=hi?56:phone?40:28,PHI=2.35;// the shore shot sits on the south-west quay and looks along it, counterclockwise
  const shoreP=new THREE.Vector3(Math.cos(PHI)*(ISL+7),0,Math.sin(PHI)*(ISL+7)),tanV=new THREE.Vector3(-Math.sin(PHI),0,Math.cos(PHI)),outV=new THREE.Vector3(Math.cos(PHI),0,Math.sin(PHI));
  const K0=Math.round(PHI/(Math.PI*2/NQ))%NQ;// first lamp to light: the one beside the lens
  const LH=shoreP.clone().addScaledVector(tanV,230).addScaledVector(outV,70);LH.y=25;// the lighthouse lamp, on a headland ahead of the shore shot
  const waterU={uHor:{value:skyU.hor.value},uZen:{value:skyU.zen.value},uFog:{value:scene.fog.color},uSun:{value:skyU.sunDir.value},uMoon:{value:moonDir},uLH:{value:LH},
    uT:{value:0},uWin:{value:0},uLampN:{value:0},uNQ:{value:NQ},uISL:{value:ISL},uK0:{value:K0},uRain:{value:0},uDawn:{value:0},uLHA:{value:0},uMoonI:{value:1}};
  const water=new THREE.Mesh(new THREE.RingGeometry(ISL+.2,590,hi?160:96,1),new THREE.ShaderMaterial({uniforms:waterU,
    vertexShader:"varying vec3 vW;void main(){vec4 w=modelMatrix*vec4(position,1.);vW=w.xyz;gl_Position=projectionMatrix*viewMatrix*w;}",
    fragmentShader:"uniform vec3 uHor,uZen,uFog,uSun,uMoon,uLH;uniform float uT,uWin,uLampN,uNQ,uISL,uK0,uRain,uDawn,uLHA,uMoonI;varying vec3 vW;\n"+NOISE+
      "void main(){vec3 V=normalize(cameraPosition-vW);float fres=.04+.96*pow(1.-max(V.y,0.),5.);vec2 dv=vW.xz-cameraPosition.xz;float dist=length(dv),dE=length(vW.xz)-uISL;"+
      "float rip=sin(vW.x*.31+uT*1.2)*sin(vW.z*.27-uT*.9)+.5*sin((vW.x-vW.z)*.53+uT*1.7)+uRain*.8*sin(vW.x*2.3+uT*9.)*sin(vW.z*2.1-uT*8.);float jit=.82+.18*rip;"+
      "vec3 c=mix(uZen*.55+vec3(.004,.008,.016),uHor*1.1,fres);vec2 tc=dv/max(dist,.001);"+
      "c+=vec3(.75,.82,1.)*pow(max(dot(tc,normalize(uMoon.xz)),0.),260.)*jit*.5*uMoonI*(.4+.6*step(.45,h21(floor(vW.xz*.7)+floor(uT*3.))));"+
      "vec2 ld=uLH.xz-cameraPosition.xz;float ll=length(ld);c+=vec3(1.,.86,.6)*pow(max(dot(tc,ld/ll),0.),1400.)*step(dist,ll)*(.3+1.4*uLHA)*jit;"+
      "float stepA=6.2832/uNQ;float ang=atan(vW.z,vW.x);float k=floor(ang/stepA+.5);float lat=abs(ang/stepA-k)*stepA*uISL;float ord=mod(k-uK0+2.*uNQ,uNQ);"+
      "c+=vec3(1.,.64,.3)*step(ord+.5,uLampN)*exp(-lat*lat*.35)*exp(-max(dE,0.)/12.)*(.55+.45*rip);"+
      "c+=vec3(1.,.66,.32)*uWin*.07*exp(-max(dE,0.)/30.)*(.7+.3*rip);"+
      "c+=vec3(1.,.8,.55)*uDawn*pow(max(dot(tc,normalize(uSun.xz)),0.),50.)*(.35+.65*step(.55,h21(floor(vW.xz*.8)+floor(uT*4.))))*.85;"+
      "c+=uHor*uRain*.35*step(.985,h21(floor(vW.xz*1.3)+floor(uT*7.)));"+
      "c=mix(c,uFog,smoothstep(160.,560.,dist));gl_FragColor=vec4(c,1.);}"}));
  water.rotation.x=-Math.PI/2;water.position.y=-.35;scene.add(water);
  // far shore: three rings of hills open toward the sunrise, a town with lit windows, and the lighthouse on its headland
  const SUNA=Math.atan2(-.62,.78);
  const farU={uHaze:{value:scene.fog.color},uLand:{value:new THREE.Color(0x05070d)},uNight:{value:1}};
  const far=(()=>{const pos=[],kind=[],layer=[],SEG=hi?120:72,quadP=(a,b,c,d,k,l)=>{pos.push(...a,...b,...c,...a,...c,...d);for(let i=0;i<6;i++){kind.push(k);layer.push(l)}};
    const hill=(a,l)=>{let h=0,amp=1,f=1;for(let o=0;o<4;o++){h+=amp*(.5+.5*Math.sin(a*f*(3+l*2)+o*1.7+l*2.3));amp*=.5;f*=2.13}const off=Math.abs(((a-SUNA+Math.PI)%(2*Math.PI)+2*Math.PI)%(2*Math.PI)-Math.PI);return h*(.15+.85*sstep(.25,.7,off))};
    for(let l=0;l<3;l++){const R=430+l*55,base=6+l*12,amp=18+l*22;for(let i=0;i<SEG;i++){const a0=i/SEG*Math.PI*2,a1=(i+1)/SEG*Math.PI*2,p=(a,y)=>[Math.cos(a)*R,y,Math.sin(a)*R];
      quadP(p(a0,-4),p(a1,-4),p(a1,base+amp*hill(a1,l)),p(a0,base+amp*hill(a0,l)),0,l/2)}}
    [PHI+.62,PHI+1.9].forEach((az,t)=>{const n=hi?24:14;for(let i=0;i<n;i++){const s=Math.sin(i*12.9+t*7.1)*43758.5453,q=s-Math.floor(s),a=az+(i-n/2)*.012,w=.004+q*.006,h=8+q*q*34,R=424;
      const p=(aa,y)=>[Math.cos(aa)*R,y,Math.sin(aa)*R];quadP(p(a-w,-2),p(a+w,-2),p(a+w,h),p(a-w,h),1,0)}});
    const g=new THREE.BufferGeometry();g.setAttribute("position",new THREE.Float32BufferAttribute(pos,3));g.setAttribute("aKind",new THREE.Float32BufferAttribute(kind,1));g.setAttribute("aLayer",new THREE.Float32BufferAttribute(layer,1));
    return new THREE.Mesh(g,new THREE.ShaderMaterial({uniforms:farU,side:THREE.DoubleSide,
      vertexShader:"attribute float aKind;attribute float aLayer;varying float vK;varying float vL;varying vec3 vW;void main(){vK=aKind;vL=aLayer;vec4 w=modelMatrix*vec4(position,1.);vW=w.xyz;gl_Position=projectionMatrix*viewMatrix*w;}",
      fragmentShader:"uniform vec3 uHaze,uLand;uniform float uNight;varying float vK;varying float vL;varying vec3 vW;\n"+NOISE+
        "void main(){vec3 land=mix(uLand,uHaze,.3+.45*vL);vec3 c=land*(.85+.15*vn(vW.xz*.03+vW.y*.05));c=mix(c,uHaze,(1.-smoothstep(-2.,16.,vW.y))*.5);"+
        "if(vK>.5){vec2 g=vec2(atan(vW.z,vW.x)*length(vW.xz)/2.4,vW.y/2.6);vec2 id=floor(g),f=fract(g);float win=step(.3,f.x)*step(f.x,.7)*step(.3,f.y)*step(f.y,.75);c=land*.7+vec3(1.,.7,.36)*win*step(.6,h21(id))*uNight*1.2;}"+
        "gl_FragColor=vec4(c,1.);}"}))})();
  scene.add(far);
  const LHB=LH.clone();LHB.y=0;
  const head=new THREE.Mesh(new THREE.ConeGeometry(34,9,28,1),new THREE.MeshStandardMaterial({color:0x0d1018,roughness:.95}));head.position.set(LHB.x,1.5,LHB.z);scene.add(head);
  const tower=new THREE.Mesh(new THREE.CylinderGeometry(1.5,2.4,22,12),new THREE.MeshStandardMaterial({color:0xd9d4c8,roughness:.6,emissive:0x1a1814}));tower.position.set(LHB.x,15,LHB.z);scene.add(tower);
  const lhM=new THREE.SpriteMaterial({map:glowTex([[0,"rgba(255,248,230,1)"],[.2,"rgba(255,220,160,.7)"],[1,"rgba(255,200,120,0)"]],64),transparent:true,depthWrite:false,blending:THREE.AdditiveBlending,fog:false});
  const lhS=new THREE.Sprite(lhM);lhS.position.copy(LH);lhS.scale.set(16,16,1);scene.add(lhS);
  const beamG=new THREE.ConeGeometry(10,190,20,1,true);beamG.translate(0,-95,0);beamG.rotateZ(Math.PI/2);
  const beamU={uOn:{value:1}};const beam=new THREE.Mesh(beamG,new THREE.ShaderMaterial({uniforms:beamU,transparent:true,depthWrite:false,blending:THREE.AdditiveBlending,side:THREE.DoubleSide,
    vertexShader:"varying float vA;void main(){vA=clamp(position.x/190.,0.,1.);gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.);}",
    fragmentShader:"uniform float uOn;varying float vA;void main(){float a=pow(1.-vA,1.6)*.22*uOn;gl_FragColor=vec4(vec3(1.,.9,.7)*a,1.);}"}));
  beam.position.copy(LH);beam.rotation.z=-.035;scene.add(beam);
  // ---- the campus: instanced towers that rise from the plain; avenues stay open
  const geo=new THREE.BoxGeometry(1,1,1);geo.translate(0,.5,0);
  const mat=new THREE.MeshStandardMaterial({color:0xffffff,roughness:.42,metalness:.45,emissive:0x070b1a,emissiveIntensity:1});
  // window grid in world space on every vertical face, a hash per window decides which are lit; VFX.INK_GLSL adds the write sweep
  const winU={value:1};
  mat.onBeforeCompile=sh=>{sh.uniforms.uWin=winU;if(HASV)Object.assign(sh.uniforms,VFX.U);
    sh.vertexShader=sh.vertexShader.replace("#include <common>","#include <common>\nvarying vec3 vWP;varying vec3 vON;").replace("#include <begin_vertex>",
      "#include <begin_vertex>\nvec4 wp=vec4(transformed,1.);\n#ifdef USE_INSTANCING\nwp=instanceMatrix*wp;\n#endif\nvWP=(modelMatrix*wp).xyz;vON=normal;");
    sh.fragmentShader=sh.fragmentShader.replace("#include <common>","#include <common>\nvarying vec3 vWP;varying vec3 vON;uniform float uWin;\n"+(HASV?VFX.DECL+VFX.INK_GLSL:"")).replace("#include <emissivemap_fragment>",
      "#include <emissivemap_fragment>\nfloat side=1.-step(.5,abs(vON.y));vec2 fp=vec2(abs(vON.x)>.5?vWP.z:vWP.x,vWP.y)/vec2(.9,1.2);vec2 cl=floor(fp),fr=fract(fp);"+
      "float win=step(.16,fr.x)*step(fr.x,.8)*step(.22,fr.y)*step(fr.y,.72)*side*step(.9,vWP.y);float hh=fract(sin(dot(cl+floor(vWP.xz*.23)*13.1,vec2(12.9898,78.233)))*43758.5453);"+
      "diffuseColor.rgb*=1.-.45*win;totalEmissiveRadiance+=vec3(1.,.66,.3)*win*step(.58,hh)*(.35+.65*hh)*uWin*1.25+vec3(.25,.4,.8)*win*(1.-step(.58,hh))*.05;"+
      (HASV?"totalEmissiveRadiance+=vfxInk(vWP,side,(1.-side)*step(.5,vON.y));":""))};
  const mesh=new THREE.InstancedMesh(geo,mat,N);mesh.frustumCulled=false;scene.add(mesh);
  const seed=(i,j)=>{const s=Math.sin(i*127.1+j*311.7)*43758.5453;return s-Math.floor(s)};
  // The district court: the block east of the main avenue, between the two cross streets past the centre.
  const nextRoad=(from,test)=>{for(let i=from;i<G;i++)if(test(i))return i;return -1},prevRoad=(from,test)=>{for(let i=from;i>=0;i--)if(test(i))return i;return -1};
  const ci0=nextRoad(Math.ceil(G/2),roadI),ci1=nextRoad(ci0+1,roadI),cj1=nextRoad(Math.ceil(G/2),roadJ),cj0=prevRoad(cj1-1,roadJ);
  const inCourt=(i,j)=>i>ci0&&i<ci1&&j>cj0-4&&j<cj1;// the court plus a forecourt plaza north of its gate
  const road=new Uint8Array(N),H=new Float32Array(N),D=new Float32Array(N),W=new Float32Array(N),lit=new Float32Array(N);
  for(let i=0;i<G;i++)for(let j=0;j<G;j++){const k=i*G+j;const dx=(i-G/2)/(G/2),dz=(j-G/2)/(G/2);const d=Math.sqrt(dx*dx+dz*dz);
    const core=Math.max(0,1-d*1.15);const rnd=seed(i,j);road[k]=(roadI(i)||roadJ(j)||inCourt(i,j))?1:0;H[k]=road[k]?0:(2+rnd*rnd*26)*(.25+core*core*2.2);D[k]=rnd*.5+d*.6;W[k]=CELL*(.46+seed(j,i)*.34);lit[k]=seed(i*3,j*5)}
  let risen=false;
  function write(g,time){const done=g>=1.7;if(!(done&&risen)){for(let i=0;i<G;i++)for(let j=0;j<G;j++){const k=i*G+j;const e=ease(clamp((g-D[k])/.42,0,1));const h=Math.max(.02,H[k]*e);
      m4.makeScale(road[k]?0:W[k],road[k]?0:h,road[k]?0:W[k]);m4.setPosition(X(i),0,X(j));mesh.setMatrixAt(k,m4)}mesh.instanceMatrix.needsUpdate=true;risen=done}
    for(let k=0;k<N;k++){if(road[k])continue;const warm=lit[k]>.86;const e=clamp((g-D[k])/.42,0,1);const glow=e*(warm?.5+.5*Math.sin(time*1.1+lit[k]*40):0);col.setRGB(.11+glow*.3+lit[k]*.04,.13+glow*.18+lit[k]*.04,.22+lit[k]*.06);mesh.setColorAt(k,col)}
    if(mesh.instanceColor)mesh.instanceColor.needsUpdate=true}
  // the write tower: the tallest on the avenue's west side, just south of the centre, so the crane can rise over the road
  let ri=0;for(let i=0;i<G;i++)if(roadI(i)&&Math.abs(i-G/2)<Math.abs(ri-G/2))ri=i;const RX=X(ri);
  let wk=-1;for(let j=0;j<G;j++){const k=(ri-1)*G+j;if(road[k]||X(j)>-SPAN*.02||X(j)<-SPAN*.24)continue;if(wk<0||H[k]>H[wk])wk=k}
  const WT={x:X(Math.floor(wk/G)),z:X(wk%G),h:H[wk],w:W[wk]};
  // the lift tower: on the avenue's west side, ahead of the lens in the second half of the push
  let lk=-1;for(let j=0;j<G;j++){const k=(ri-1)*G+j;if(road[k]||X(j)<SPAN*.03||X(j)>SPAN*.16)continue;if(lk<0||H[k]>H[lk])lk=k}
  const LT={x:X(ri-1),z:X(lk%G),h:Math.max(6,H[lk]),w:W[lk]};
  // gold light lines down the avenues
  const lineM=new THREE.MeshBasicMaterial({color:0xe8a33d,transparent:true,opacity:0,blending:THREE.AdditiveBlending,depthWrite:false});
  const lines=new THREE.Group();const lg=new THREE.PlaneGeometry(.22,SPAN);lg.rotateX(-Math.PI/2);
  for(let i=0;i<G;i++)if(roadI(i))[-1.1,1.1].forEach(o=>{const m=new THREE.Mesh(lg,lineM);m.position.set(X(i)+o,.03,0);lines.add(m)});
  for(let j=0;j<G;j++)if(roadJ(j))[-1.1,1.1].forEach(o=>{const m=new THREE.Mesh(lg,lineM);m.rotation.y=Math.PI/2;m.position.set(0,.03,X(j)+o);lines.add(m)});
  scene.add(lines);
  // ---- lamps. The avenue lamps light as the city rises; the quay lamps light one by one in the shore shot; all go out at dawn.
  // Lit state is a per-lamp colour (additive, so black is off), rewritten only when the lit count changes.
  const LAMP=hi?16:10,poolT=glowTex([[0,"rgba(255,196,120,.55)"],[.45,"rgba(232,163,61,.16)"],[1,"rgba(232,163,61,0)"]],128);
  const poolM=new THREE.MeshBasicMaterial({map:poolT,transparent:true,depthWrite:false,blending:THREE.AdditiveBlending});
  const poolG=new THREE.PlaneGeometry(7,7);poolG.rotateX(-Math.PI/2);const pools=new THREE.InstancedMesh(poolG,poolM,LAMP+NQ);pools.frustumCulled=false;
  const lampP=new Float32Array((LAMP+NQ)*3),lampC=new Float32Array((LAMP+NQ)*3),lampG=new THREE.BufferGeometry();
  for(let k=0;k<LAMP;k++){const z=SPAN*.42-k*(SPAN*.42+34)/(LAMP-1),x=RX+(k%2?2.7:-2.7);m4.makeTranslation(x-(k%2?1:-1)*1.2,.05,z);pools.setMatrixAt(k,m4);lampP[k*3]=x;lampP[k*3+1]=4.6;lampP[k*3+2]=z}
  for(let q=0;q<NQ;q++){const a=q*Math.PI*2/NQ,x=Math.cos(a)*(ISL-1.4),z=Math.sin(a)*(ISL-1.4);m4.makeTranslation(Math.cos(a)*(ISL-3.2),.05,Math.sin(a)*(ISL-3.2));pools.setMatrixAt(LAMP+q,m4);const o=(LAMP+q)*3;lampP[o]=x;lampP[o+1]=3.4;lampP[o+2]=z}
  lampG.setAttribute("position",new THREE.BufferAttribute(lampP,3));lampG.setAttribute("color",new THREE.BufferAttribute(lampC,3));scene.add(pools);
  const lampM=new THREE.PointsMaterial({map:glowTex([[0,"rgba(255,240,215,1)"],[.3,"rgba(255,190,110,.5)"],[1,"rgba(232,163,61,0)"]],64),size:1.8,vertexColors:true,transparent:true,depthWrite:false,blending:THREE.AdditiveBlending});
  const lamps=new THREE.Points(lampG,lampM);lamps.frustumCulled=false;scene.add(lamps);
  const qOrder=q=>(q-K0+NQ)%NQ;let litA=-1,litQ=-1;
  function setLamps(a,q){if(a===litA&&q===litQ)return;litA=a;litQ=q;
    for(let k=0;k<LAMP+NQ;k++){const on=k<LAMP?k<a:qOrder(k-LAMP)<q;const v=on?1:0;lampC[k*3]=v;lampC[k*3+1]=v;lampC[k*3+2]=v;col.setRGB(v,v,v);pools.setColorAt(k,col)}
    lampG.attributes.color.needsUpdate=true;if(pools.instanceColor)pools.instanceColor.needsUpdate=true;waterU.uLampN.value=q}
  const LC={a:0,q:0};
  function lampCounts(t){const off=t<BEATS.lampsOff?0:(t-BEATS.lampsOff)/.11;
    const a=clamp(Math.floor((t-1.6)/.12),0,LAMP)-clamp(Math.floor(off),0,LAMP);
    const L=BEATS.lamps,k=(t-L.at)/L.step;let q=t<L.at?0:k<L.n?Math.floor(k)+1:L.n+Math.floor((t-L.at-L.n*L.step)/.05);q=clamp(q,0,NQ)-clamp(Math.floor(off*.6),0,NQ);
    LC.a=Math.max(0,a);LC.q=Math.max(0,q);return LC}
  // shot key and rim: a warm low light that rides with the subject of each shot, and a cool light from down the avenue
  const street=new THREE.PointLight(0xffb45a,0,18,2);scene.add(street);
  const coolRim=new THREE.DirectionalLight(0x7fb2ff,0);scene.add(coolRim);scene.add(coolRim.target);
  // ---- the district court: one real district (Physical systems lab) built at campus scale by the shared modules
  const CT="11 - Physical AI",CDEF=typeof Districts!=="undefined"?Districts.get(CT):null;
  const CCOL=(CDEF&&CDEF.color)||(typeof FOLDER_COLORS!=="undefined"&&FOLDER_COLORS[CT])||"#22D3EE",CNAME=CT.replace(/^\d+ - /,"");
  const CW=72,CDP=96,cx0=X(ci0+1)-CELL/2,cz0=X(cj0+1)-CELL/2,KS=((ci1-ci0-1)*CELL)/CW;
  const cdist={top:CT,name:CNAME,x:0,z:0,w:CW,d:CDP,color:CCOL,count:0};
  const court=new THREE.Group();court.position.set(cx0,0,cz0);court.scale.setScalar(KS);scene.add(court);
  const toW=(x,y,z)=>tmpV.set(cx0+x*KS,y*KS,cz0+z*KS);
  const gate={x:cx0+36*KS,z:cz0-2.5*KS};
  // paving: DistrictLook.paintCourt on a 96-unit canvas (the court uses 72 of it), entry inlay and ring via patchGround
  const courtTex=(()=>{const c=document.createElement("canvas");c.width=c.height=512;const g=c.getContext("2d"),sc=512/CDP,Xc=x=>x*sc;
    g.fillStyle="#8c8272";g.fillRect(0,0,CW*sc,CDP*sc);// the campus court stone, a step darker for the nightconst v=parseInt(String(CCOL).slice(1),16);g.fillStyle=`rgba(${v>>16&255},${v>>8&255},${v&255},.14)`;g.fillRect(0,0,CW*sc,CDP*sc);
    if(typeof DistrictLook!=="undefined")try{DistrictLook.paintCourt(g,cdist,Xc,Xc,sc)}catch(e){}
    return new THREE.CanvasTexture(c)})();
  const courtM=new THREE.MeshStandardMaterial({map:courtTex,roughness:.9,metalness:0});
  courtM.onBeforeCompile=sh=>{sh.uniforms.uLamp=lampU;sh.vertexShader=sh.vertexShader.replace("#include <common>","#include <common>\nvarying vec3 vGPos;").replace("#include <begin_vertex>","#include <begin_vertex>\nvGPos=position;");
    sh.fragmentShader=sh.fragmentShader.replace("#include <common>","#include <common>\nvarying vec3 vGPos;uniform float uLamp;");if(typeof DistrictLook!=="undefined")DistrictLook.patchGround(sh)};
  const courtG=new THREE.PlaneGeometry(CW,CDP);courtG.rotateX(-Math.PI/2);courtG.translate(CW/2,.06/KS,CDP/2);{const uv=courtG.attributes.uv;for(let i=0;i<uv.count;i++)uv.setX(i,uv.getX(i)*CW/CDP)}
  court.add(new THREE.Mesh(courtG,courtM));
  // six note buildings around the court; the middle one on the west side was edited this hour and stands in scaffolding
  const CB=[{x:9,z:18,w:14,d:16,h:20,ago:2*864e5,by:"claude-code",links:5},{x:9,z:47,w:14,d:18,h:32,ago:20*6e4,by:"codex",links:9},{x:9,z:77,w:14,d:16,h:24,ago:60*864e5,by:"repo-sync",links:3,body:"[[Not yet written]]"},
    {x:63,z:18,w:14,d:16,h:28,ago:5*864e5,by:"cursor",links:14},{x:63,z:47,w:14,d:18,h:18,ago:9*864e5,by:"repo-sync",links:2},{x:63,z:77,w:14,d:16,h:36,ago:30*36e5,by:"hermes",links:6}];
  const cbody=new THREE.InstancedMesh(geo,mat,CB.length);cbody.frustumCulled=false;
  CB.forEach((b,i)=>{m4.makeScale(b.w,b.h,b.d);m4.setPosition(b.x,0,b.z);cbody.setMatrixAt(i,m4);col.setRGB(.12,.14,.22);cbody.setColorAt(i,col)});court.add(cbody);
  let facade=null;const FACM=new THREE.MeshStandardMaterial({color:0xffffff,roughness:.72,metalness:.18});
  FACM.onBeforeCompile=sh=>{sh.uniforms.uLamp=lampU;sh.vertexShader=sh.vertexShader.replace("#include <common>","#include <common>\nattribute float aGlow;varying float vGlow;").replace("#include <begin_vertex>","#include <begin_vertex>\nvGlow=aGlow;");
    sh.fragmentShader=sh.fragmentShader.replace("#include <common>","#include <common>\nuniform float uLamp;varying float vGlow;").replace("#include <emissivemap_fragment>","#include <emissivemap_fragment>\ntotalEmissiveRadiance+=diffuseColor.rgb*vGlow*(0.22+uLamp*1.9);")};
  if(typeof Facades!=="undefined")try{const now=Date.now(),byName=new Map();
    const items=CB.map((b,i)=>{const n={name:"title:"+i,fm:{status:"operating",type:"note"},updated_at:new Date(now-b.ago).toISOString(),updated_by:b.by,out:new Set(Array.from({length:b.links},(_,j)=>j)),back:new Set(),body:b.body||""};
      return {b:{id:i,tiers:[{x:b.x,z:b.z,w:b.w,d:b.d,y0:0,y1:b.h}],door:{x:36,z:b.z},h:b.h,style:i%5,color:CCOL},s:Facades.signal(n,{now,byName})}});
    facade=Facades.build(items,{material:FACM,cap:Facades.LIMIT.low});court.add(facade)}catch(e){facade=null}
  // landmark podium and the lab's landmark with its moving robot arm (DistrictAssets), gateway, banners and beacon (DistrictLook)
  const podium=new THREE.Mesh(new THREE.BoxGeometry(20,3,20),new THREE.MeshStandardMaterial({color:0x8d867a,roughness:.85}));podium.position.set(36,1.5,52);court.add(podium);
  let landmark=null,look=null;
  if(typeof DistrictAssets!=="undefined"&&typeof Districts!=="undefined")try{landmark=DistrictAssets.build([cdist],[{id:0,tiers:[{x:36,z:52,w:20,d:20,y0:0,y1:3}]}],[{id:0,name:"title:landmark",folder:CT,fm:{},out:new Set(),back:new Set()}],null);court.add(landmark)}catch(e){landmark=null}
  if(typeof DistrictLook!=="undefined")try{DistrictLook.bind([cdist],{},[]);look=DistrictLook.build({HI:hi,reduced:REDUCED,SH:{uLamp:lampU}});court.add(look)}catch(e){look=null}
  // The arrival court shares the live world's planted geometry, with a clear central promenade.
  // Keep this group local to the title: disposing it must not touch the live campus gardens.
  let arrivalGarden=null;
  if(typeof VaultLandscape!=="undefined")try{
    const trees=[];
    for(const x of [23,49])for(const z of [10,25,40,66,82,91])trees.push({x,z,k:seed(x,z)});
    arrivalGarden=VaultLandscape.build({THREE,trees,districts:[cdist],buildings:CB.map(b=>({cx:b.x,cz:b.z,fw:b.w,fd:b.d})),side:220,high:hi&&!phone,reducedMotion:REDUCED});
    arrivalGarden.position.y=.07/KS;court.add(arrivalGarden);
  }catch(e){arrivalGarden=null}
  // ---- sentinels: small figures with a warm head light, walking the avenues (fallback when SentinelMesh is absent)
  const roadsI=[],roadsJ=[];for(let i=0;i<G;i++){if(roadI(i))roadsI.push(X(i));if(roadJ(i))roadsJ.push(X(i))}
  const SNT=hi?72:34,sent=[];for(let k=0;k<SNT;k++){const main=k<SNT*.45;const alongZ=main||k%2===0;
    sent.push({alongZ,lane:main?RX:(alongZ?roadsI[k%roadsI.length]:roadsJ[k%roadsJ.length]),off:(k%2?1:-1)*(1.15+seed(k,3)*.5),ph:seed(k,9)*SPAN,sp:(.9+seed(k,5)*.8)*(k%3?1:-1),bob:seed(k,7)*6})}
  const sbody=new THREE.InstancedMesh(new THREE.SphereGeometry(1,14,10),new THREE.MeshStandardMaterial({color:0x1a2036,roughness:.35,metalness:.7,emissive:0xe8a33d,emissiveIntensity:.22}),SNT);sbody.frustumCulled=false;scene.add(sbody);
  const shp=new Float32Array(SNT*3),shg=new THREE.BufferGeometry();shg.setAttribute("position",new THREE.BufferAttribute(shp,3));
  const sheadM=new THREE.PointsMaterial({map:glowTex([[0,"rgba(255,236,200,1)"],[.25,"rgba(255,200,120,.8)"],[1,"rgba(232,163,61,0)"]],64),color:0xffd08a,size:1.9,transparent:true,depthWrite:false,blending:THREE.AdditiveBlending});
  const sheads=new THREE.Points(shg,sheadM);sheads.frustumCulled=false;scene.add(sheads);
  const S5=SHOT.sentinels,streetZ=t=>{const u=clamp((t-S5.a)/(S5.b-S5.a),0,1);return lerp(SPAN*.44,SPAN*.04,u*u*(3-2*u)*.35+u*.65)};
  // real Sentinels: walkers on the main avenue, two in conversation, one riding a lift, and the court's Warden
  const FIG=[],SPECIAL={};
  const norm=m=>{const bb=new THREE.Box3().setFromObject(m.grp),hgt=bb.max.y-bb.min.y;if(hgt>0)m.grp.scale.setScalar(2.1/hgt)};
  if(typeof SentinelMesh!=="undefined"&&SentinelMesh.create){
    const forms=["agent","member","jr","devon","ahmad","kenza","agent","member","agent","member"],small=hi&&Math.min(innerWidth,innerHeight)>=700;
    const n=small?10:6,Z0=SPAN*.4,ZL=SPAN*.36+30;
    for(let k=0;k<n;k++){try{const m=SentinelMesh.create({id:"title:"+k,form:forms[k],level:[0,4,9,14,20,26][k%6],celebrateLevelUp:false});norm(m);
      const dir=k%3===1?-1:1;m.grp.rotation.y=dir>0?0:Math.PI;scene.add(m.grp);
      // the first three are hero walkers, placed by the cutscene clock so they pass close to the lens near the end of the shot
      const hero=k<3?[{d:11.5,x:-1.1,dir:1},{d:16,x:1.3,dir:-1},{d:23,x:-1.4,dir:1}][k]:null;if(hero){m.grp.rotation.y=hero.dir>0?0:Math.PI}
      FIG.push({m,dir,hero,x:RX+(k%2?1.25:-1.25)+(seed(k,11)-.5)*.35,ph:(k+seed(k,13)*.6)/n*ZL,sp:1.2+seed(k,17)*.5,Z0,ZL})}catch(e){break}}
    if(FIG.length){sbody.visible=false;sheads.visible=false}
    const mk=(key,o,parent)=>{try{const m=SentinelMesh.create(o);if(parent!==court)norm(m);(parent||scene).add(m.grp);SPECIAL[key]=m;return m}catch(e){return null}};
    const TZ=SPAN*.2;
    const ta=mk("talkA",{id:"title:talkA",form:"agent",level:9,celebrateLevelUp:false}),tb=mk("talkB",{id:"title:talkB",form:"member",level:4,celebrateLevelUp:false});
    if(ta){ta.grp.position.set(RX-1.35,0,TZ);ta.grp.rotation.y=Math.PI}if(tb){tb.grp.position.set(RX-1.35,0,TZ-1.9);tb.grp.rotation.y=0}
    const lf=mk("lift",{id:"title:lift",form:"agent",level:14,celebrateLevelUp:false});if(lf){lf.grp.position.set(LT.x+LT.w/2+.45,0,LT.z);lf.grp.rotation.y=Math.PI/2}
    const wd=mk("warden",{id:"title:warden",form:"member",palette:["#0B1020",CCOL,"#F4EFE6"],symbol:"PA",level:0},court);
    if(wd){wd.grp.position.set(36,.25,9);wd.grp.rotation.y=Math.PI}
  }
  // the Warden's kit and opening line come from c_npc.js (Guides.costume); without it the figure stands undressed
  let costume=null;if(SPECIAL.warden&&typeof Guides!=="undefined"&&Guides.costume)try{costume=Guides.costume(SPECIAL.warden,CT,CCOL,CNAME)}catch(e){costume=null}
  const wardenLine=costume&&costume.line?costume.line:"A Warden meets you at the gate.";
  // conversation beam between the two talkers (VFX.linkMaterial: packets travel along it)
  let link=null;if(HASV&&SPECIAL.talkA&&SPECIAL.talkB){const lm=VFX.linkMaterial("#9CD3FF");if(lm){const lgeo=new THREE.CylinderGeometry(.045,.045,1,6,1,true);lgeo.rotateX(Math.PI/2);link=new THREE.Mesh(lgeo,lm);link.position.set(RX-1.35,1.75,SPAN*.2-.95);link.scale.set(1,1,1.5);scene.add(link)}}
  function walkFig(t,time,vis,boost){const hT=S5.a+3.0;for(const f of FIG){const g=f.m.grp;g.visible=vis>.01&&!(f.hero&&t>S5.b+.2);if(!g.visible)continue;
      if(f.hero)g.position.set(RX+f.hero.x,0,streetZ(hT)-f.hero.d+(t-hT)*f.sp*f.hero.dir);
      else{const p=((f.ph+time*f.sp)%f.ZL+f.ZL)%f.ZL;g.position.set(f.x,0,f.dir>0?f.Z0-f.ZL+p:f.Z0-p)}
      try{SentinelMesh.pose(f.m,time,"walking",{speed:f.sp});f.m.glow.value*=1+boost*.9;f.m.rimGain.value=Math.max(f.m.rimGain.value,.3+boost*.5)}catch(e){}}}
  function walk(time,vis){for(let k=0;k<SNT;k++){const s=sent[k];let p=((s.ph+time*s.sp*1.4)%SPAN+SPAN)%SPAN-SPAN/2;const b=Math.abs(Math.sin(time*5.2+s.bob))*.08;
      const x=s.alongZ?s.lane+s.off:p,z=s.alongZ?p:s.lane+s.off;m4.makeScale(.42*vis,.78*vis,.42*vis);m4.setPosition(x,.78*vis+b,z);sbody.setMatrixAt(k,m4);
      shp[k*3]=x;shp[k*3+1]=(1.45+b)*vis;shp[k*3+2]=z}
    sbody.instanceMatrix.needsUpdate=true;shg.attributes.position.needsUpdate=true;sheadM.opacity=vis}
  const liftY=t=>LT.h*ease(clamp((t-BEATS.lift)/1.5,0,1));
  const SPK_KEYS=["talkA","talkB","lift"],onS=id=>LIVE.A.id===id||(LIVE.B!==null&&LIVE.B.id===id);
  function specials(t,time,inS5,inCourtShot){const tk=SPECIAL;
    for(const key of SPK_KEYS){const m=tk[key];if(!m)continue;m.grp.visible=inS5;if(!inS5)continue;
      if(key==="lift"){m.grp.position.y=liftY(t);try{SentinelMesh.pose(m,time,t>BEATS.lift&&t<BEATS.land?"lifting":"idle")}catch(e){}}
      else try{SentinelMesh.pose(m,time,"idle")}catch(e){}}
    if(link)link.visible=inS5;
    const w=tk.warden;if(w){w.grp.visible=inCourtShot;if(inCourtShot)try{SentinelMesh.pose(w,vclk,"idle")}catch(e){}}}
  // ---- data lattice: points that drift up through the city
  const PN=hi?1400:600;const pp=new Float32Array(PN*3),pv=new Float32Array(PN);
  for(let k=0;k<PN;k++){pp[k*3]=(Math.random()-.5)*SPAN*1.3;pp[k*3+1]=Math.random()*60;pp[k*3+2]=(Math.random()-.5)*SPAN*1.3;pv[k]=.4+Math.random()}
  const pgeo=new THREE.BufferGeometry();pgeo.setAttribute("position",new THREE.BufferAttribute(pp,3));
  const pts=new THREE.Points(pgeo,new THREE.PointsMaterial({color:0xf2b85b,size:.32,transparent:true,opacity:0,sizeAttenuation:true,depthWrite:false}));scene.add(pts);
  const hemi=new THREE.HemisphereLight(0x55689f,0x0a0c18,.55);scene.add(hemi);
  const sun=new THREE.DirectionalLight(0xf2b85b,0);scene.add(sun);
  const key=new THREE.PointLight(0xe8a33d,0,300,1.4);key.position.set(0,42,0);scene.add(key);
  const rim=new THREE.DirectionalLight(0x5b9bf0,.25);rim.position.set(60,30,80);scene.add(rim);
  // ---- shared effects layer (b_vfx.js): pooled rings, sweeps, curtain, sparks; weather points (rain, motes, fireflies)
  const glow=glowTex([[0,"rgba(255,255,255,1)"],[.3,"rgba(255,255,255,.45)"],[1,"rgba(255,255,255,0)"]],64);
  const SHT={uTime:{value:0},uNight:{value:1},uSkyRef:{value:new THREE.Color(.05,.07,.12)}};
  let vfxOn=false,atmos=null;const WX=HASV?VFX.weatherFor(new Date()):{kind:"clear",rain:0,wet:0,mist:0,wind:.4};
  if(HASV)try{vfxOn=VFX.init(scene,SHT,glow);if(vfxOn){const n=VFX.budget(tier).atmos;if(n>0){atmos=VFX.atmosphere(SHT,glow,n);if(atmos)scene.add(atmos)}}}catch(e){vfxOn=false}
  const dry=WX.kind==="clear"||WX.kind==="mist",SHW=BEATS.shower;
  const WXT={rain:0,wet:0};
  function weather(t){const sh=dry?.62*sstep(SHW[0],SHW[1],t)*(1-sstep(SHW[2],SHW[3],t)):0;WXT.rain=Math.max(WX.rain||0,sh);
    WXT.wet=Math.max(WX.wet||0,dry?.75*sstep(SHW[0],SHW[2],t)*(1-sstep(SHW[3]+2,CUT.dawn+4,t)):0);return WXT}
  // ---- crossfade compositor with bloom and the VFX per-time colour grade
  const rtA=new THREE.WebGLRenderTarget(2,2),rtB=new THREE.WebGLRenderTarget(2,2);
  const postU={a:{value:rtA.texture},b:{value:rtB.texture},f:{value:0},pixel:{value:new THREE.Vector2(1,1)},uGain:{value:new THREE.Vector3(1,1,1)},uLift:{value:new THREE.Vector3(0,0,0)}};
  const post=new THREE.Scene(),ortho=new THREE.OrthographicCamera(-1,1,1,-1,0,1);
  post.add(new THREE.Mesh(new THREE.PlaneGeometry(2,2),new THREE.ShaderMaterial({uniforms:postU,depthTest:false,depthWrite:false,
    vertexShader:"varying vec2 vU;void main(){vU=uv;gl_Position=vec4(position.xy,0.,1.);}",
    fragmentShader:`uniform sampler2D a,b;uniform float f;uniform vec2 pixel;uniform vec3 uGain,uLift;varying vec2 vU;
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
        c=clamp(c*uGain+uLift*(1.-c),0.,1.);
        c*=1.-.21*smoothstep(.18,.72,length(vU-.5));gl_FragColor=vec4(c,1.);
      }`})));
  let w=0,h=0;function size(){const W2=canvas.clientWidth||innerWidth,H2=canvas.clientHeight||innerHeight;if(W2===w&&H2===h)return;w=W2;h=H2;r.setSize(w,h,false);
    [camA,camB].forEach(c=>{c.aspect=w/h;c.updateProjectionMatrix()});const pr=r.getPixelRatio();rtA.setSize(Math.round(w*pr),Math.round(h*pr));rtB.setSize(Math.round(w*pr),Math.round(h*pr));postU.pixel.value.set(1/(w*pr),1/(h*pr));
    if(vfxOn)VFX.setScale(h*pr*.9)}
  // every material compiles up front, so no shot hitches when its district, facades or effects first come into view
  try{r.compile(scene,camA)}catch(e){}
  // ---- camera rigs; each places a camera (and the shot's key light) for cutscene time t. No noise, no shake: eased curves.
  // Portrait screens keep the 16:9 horizontal field of view (capped at 78 degrees); wide shots also pull back, close-ups
  // on the gate and the Warden keep their distance so the subject stays large.
  const wide=Math.max(1,Math.min(1.5,(innerHeight/innerWidth)*1.78));
  const fovFor=base=>{const asp=(w||innerWidth)/(h||innerHeight);if(asp>=1.2)return base;const hf=2*Math.atan(Math.tan(base*Math.PI/360)*16/9);return Math.min(78,Math.max(base,2*Math.atan(Math.tan(hf/2)/asp)*180/Math.PI*.82))};
  const uOf=(s,t)=>clamp((t-s.a)/(s.b-s.a),0,1);
  const keyAt=(x,y,z,i,d)=>{street.position.set(x,y,z);street.intensity=i;street.distance=d||18;coolRim.intensity=0};
  const RIGS={
    sky(c,t){const u=uOf(SHOT.sky,t),tilt=ease(clamp((t-.4)/2.9,0,1));c.position.set(lerp(-26,-16,u),lerp(6,15,u),SPAN*.78*wide-u*14);
      tgt.copy(moonDir).add(skyLook).multiplyScalar(220).add(c.position);tgt.set(lerp(tgt.x,0,tilt),lerp(tgt.y,10,tilt),lerp(tgt.z,0,tilt));c.fov=lerp(54,48,u);keyAt(0,0,0,0)},
    shore(c,t){const u=ease(uOf(SHOT.shore,t));c.position.copy(shoreP).addScaledVector(tanV,lerp(-6,10,u)).addScaledVector(outV,lerp(2,-2,u)*wide);c.position.y=lerp(2.6,4.4,u);
      tgt.copy(shoreP).addScaledVector(tanV,80).addScaledVector(outV,lerp(10,18,u));tgt.y=lerp(4,8,u);c.fov=fovFor(lerp(52,46,u));keyAt(0,0,0,0)},
    gate(c,t){const u=ease(uOf(SHOT.gate,t));c.position.set(gate.x+lerp(2.6,1.1,u),lerp(1.0,1.3,u),gate.z-lerp(9.5,5.2,u));
      tgt.set(gate.x,lerp(1.7,2.1,u),gate.z+lerp(6,11,u));c.fov=fovFor(lerp(50,46,u));keyAt(gate.x,3.2,gate.z+4,1.2,16)},
    facades(c,t){const u=ease(uOf(SHOT.facades,t)),p=toW(lerp(34,30,u),lerp(5.2,6.2,u),lerp(10,31,u));c.position.copy(p);toW(lerp(15,17,u),lerp(5.5,8,u),lerp(27,49,u));tgt.copy(tmpV);
      c.fov=fovFor(lerp(56,50,u));toW(24,10,lerp(22,50,u));keyAt(tmpV.x,tmpV.y,tmpV.z,1.4,22)},
    sentinels(c,t){const u=uOf(S5,t),e=u*u*(3-2*u)*.35+u*.65,z=streetZ(t);
      const rail=typeof VaultEngine!=="undefined"&&VaultEngine.sampleRoute?VaultEngine.sampleRoute([[RX,2.5,SPAN*.44],[RX+.3,2.8,SPAN*.34],[RX+.5,3.5,SPAN*.18],[RX+.4,4.3,SPAN*.04]],e):null;
      if(rail)c.position.set(rail[0],rail[1],rail[2]);else c.position.set(RX+Math.sin(u*2.2)*.5,lerp(2.5,4.3,e),z);
      // the lens drifts toward the lift as the Sentinel rides up, then settles back on the avenue
      const lk=sstep(BEATS.lift-.3,BEATS.lift+.8,t)*(1-sstep(BEATS.land+.4,S5.b,t));
      tgt.set(RX+Math.sin(u*2.2+.5)*1.3,lerp(2.2,4.4,e),z-34);tgt.lerp(tmpV.set(LT.x,liftY(t)*.7+1,LT.z),lk*.3);c.fov=fovFor(lerp(56,48,u));
      keyAt(RX,2.6,z-12,1.6,15);coolRim.position.set(RX,14,z-90);coolRim.target.position.set(RX,0,z);coolRim.intensity=.9},
    // a crane up the avenue that rides with the sweep's head (VFX.INK_GLSL climbs 1.1 x the height in 1.5 s)
    write(c,t){const u=ease(uOf(SHOT.write,t)),k=clamp((t-BEATS.write)/1.36,0,1),hy=WT.h*k;c.position.set(RX+1.5,lerp(1.8,WT.h+5,ease(k)),WT.z+lerp(10,13,u)*wide);
      tgt.set(WT.x+WT.w*.5,Math.max(2.5,Math.min(WT.h,hy+1.5)),WT.z);c.fov=fovFor(58);keyAt(WT.x+6,3,WT.z+6,1.2,20)},
    warden(c,t){const u=ease(uOf(SHOT.warden,t));const wz=cz0+9*KS;c.position.set(gate.x+lerp(1.8,1.1,u),lerp(.95,1.15,u),wz-lerp(9.5,7,u));
      tgt.set(gate.x,lerp(1.75,1.85,u),wz);c.fov=fovFor(lerp(40,36,u));keyAt(gate.x+.8,2.6,wz-2.2,1.8,10)},
    dawn(c,t,orbit){const u=ease(clamp((t-CUT.dawn)/6.6,0,1));
      // Settle into a human-scale district reveal. The menu breathes along a short rail;
      // its camera never drifts around the back of the city or loses the arrival court.
      const drift=REDUCED?0:Math.sin(orbit*.65)*2.2;
      c.position.copy(toW(lerp(32,36,u)+drift,lerp(8,13,u),lerp(-32,-15,u)*Math.min(wide,1.2)));
      tgt.copy(toW(36,lerp(8,11,u),43));c.fov=fovFor(lerp(57,52,u));
      toW(36,15,21);keyAt(tmpV.x,tmpV.y,tmpV.z,.65,35)}};
  function place(c,s,t,orbit){RIGS[s.id](c,t,orbit||0);c.lookAt(tgt);c.updateProjectionMatrix();if(atmos)atmos.material.uniforms.uCenter.value.copy(c.position)}
  // ---- beats: one-shot picture events, fired from the cue timeline so picture and sound land together
  let vclk=0,lastWall=-1,lastNight=-1,doorLit=false;
  // the lamp flares when the beam faces the lens; its streak on the water brightens with it
  function flash(c){tmpV.subVectors(c.position,LH);const ca=Math.atan2(-tmpV.z,tmpV.x),dd=Math.cos(ca-beam.rotation.y);waterU.uLHA.value=Math.pow(Math.max(0,dd),24)*beamU.uOn.value;lhS.scale.setScalar(16+30*waterU.uLHA.value)}
  function beat(name){
    if(name==="gate"){if(typeof DistrictLook!=="undefined")DistrictLook.enter(CT);if(vfxOn){VFX.district({x:cx0,z:cz0,w:CW*KS,d:CDP*KS,color:CCOL});VFX.ring(gate.x,.05,gate.z,CCOL,5,{column:4,life:1.6})}}
    else if(name==="door"){if(facade&&typeof Facades!=="undefined"){Facades.setDoor(facade,0,2);doorLit=true}}
    else if(name==="land"){if(vfxOn)VFX.arrive(LT.x,LT.h,LT.z,"#9CD3FF")}
    else if(name==="write"){if(vfxOn)VFX.ink({id:"title:write",cx:WT.x,cz:WT.z,fw:WT.w,fd:WT.w,h:WT.h},"#9CD3FF")}
    else if(name==="greet"){if(SPECIAL.warden)try{SentinelMesh.emote(SPECIAL.warden,"greet",vclk)}catch(e){}}}
  // t: cutscene clock (s); time: wall clock for loops; orbit: radians added in the menu
  function render(t,time,orbit){if(ctxLost)return;size();
    const dt=lastWall<0?0:clamp(time-lastWall,0,.1);lastWall=time;vclk+=dt;
    write(clamp((t-.2)/4.6,0,1.8),time);
    // which shots are on screen decides which figures pose (off-screen figures cost nothing)
    const L=liveAt(t);
    const wv=clamp((t-2.5)/2,0,1)*(onS("sentinels")||onS("write")||t<SHOT.facades.a?1:0),s2=onS("sentinels")?1:0;
    if(FIG.length)walkFig(t,time,wv,s2);else walk(time,wv);
    specials(t,time,!!s2,onS("gate")||onS("facades")||onS("warden")||onS("dawn"));
    if(SPECIAL.lift&&s2&&vfxOn&&t>BEATS.lift&&t<BEATS.land)VFX.trail(SPECIAL.lift,LT.x+LT.w/2+.45,liftY(t)+.4,LT.z,"#9CD3FF");
    if(t<BEATS.gate&&typeof DistrictLook!=="undefined")DistrictLook.near(null);
    if(doorLit&&t<BEATS.door&&facade&&typeof Facades!=="undefined"){Facades.setDoor(facade,0,0);doorLit=false}
    const lc=lampCounts(t);setLamps(lc.a,lc.q);
    const dawn=clamp((t-(CUT.dawn-.4))/5.5,0,1),night=1-dawn;skyU.dawn.value=dawn;
    skyU.zen.value.setRGB(lerp(.012,.10,dawn),lerp(.02,.13,dawn),lerp(.047,.26,dawn));skyU.hor.value.setRGB(lerp(.043,.46,dawn),lerp(.07,.27,dawn),lerp(.15,.2,dawn));
    starM.opacity=.9*(1-dawn*.9);skyU.uStars.value=1-dawn;
    const sd=skyU.sunDir.value;sunS.position.set(sd.x*470,lerp(-50,46,ease(dawn)),sd.z*470);sunM.opacity=dawn*.75;
    sun.position.set(sd.x*100,lerp(5,60,dawn),sd.z*100);sun.intensity=dawn*1.15;key.intensity=clamp((t-1.5)/4,0,1)*1.5*(1-dawn*.7)*(.85+.15*Math.sin(time*2.1));winU.value=clamp((t-1)/3,0,1)*(1-dawn*.55);hemi.intensity=lerp(.55,.8,dawn);
    lampU.value=night;
    // weather: today's (VFX.weatherFor), plus a passing shower on a dry day; mist thickens the fog, rain veils the sky
    const wx=weather(t),rain=wx.rain,wet=wx.wet;
    scene.fog.color.copy(FOG_N).lerp(skyU.hor.value,.35+dawn*.6);skyU.fogc.value.copy(scene.fog.color);scene.fog.density=lerp(.016,.0055,dawn)*(1+(WX.mist||0)*.8+rain*.4);lineM.opacity=clamp((t-1.6)/3,0,1)*(.55-dawn*.25)*(1+wet*.4);
    skyU.uCloud.value=Math.min(.9,rain*1.1+(WX.mist||0)*.3);groundM.roughness=lerp(.85,.28,wet);groundM.color.setRGB(lerp(.031,.02,wet),lerp(.043,.03,wet),lerp(.086,.06,wet));
    if(HASV){const U=VFX.U;U.uRain.value=rain;U.uWet.value=wet;U.uMist.value=WX.mist||0;U.uWind.value=WX.wind||.4}
    SHT.uTime.value=vclk;SHT.uNight.value=night;SHT.uSkyRef.value.copy(skyU.hor.value);
    waterU.uT.value=vclk;waterU.uWin.value=winU.value;waterU.uRain.value=rain;waterU.uDawn.value=dawn;waterU.uMoonI.value=night;farU.uNight.value=night;farU.uLand.value.setRGB(lerp(.02,.16,dawn),lerp(.024,.14,dawn),lerp(.04,.16,dawn));
    // lighthouse: the beam turns on the wall clock; the lamp flares when the beam faces the lens
    beam.rotation.y=REDUCED?.6:vclk*.9;beamU.uOn.value=night;lhM.opacity=night;
    pts.material.opacity=clamp((t-2)/3,0,1)*.65;const pos=pgeo.attributes.position.array;for(let q=0;q<PN;q++){pos[q*3+1]+=pv[q]*.06*(REDUCED?0:1);if(pos[q*3+1]>70)pos[q*3+1]=0}pgeo.attributes.position.needsUpdate=true;
    if(Math.abs(night-lastNight)>.02&&HASV){lastNight=night;const g=VFX.grade(night,lerp(-.2,.35,dawn));postU.uGain.value.set(g.gain[0],g.gain[1],g.gain[2]);postU.uLift.value.set(g.lift[0],g.lift[1],g.lift[2])}
    if(vfxOn)VFX.step(dt,vclk);
    if(arrivalGarden)VaultLandscape.update(arrivalGarden,vclk);
    if(typeof DistrictLook!=="undefined")DistrictLook.tick(vclk,REDUCED);
    if(L.B){const A=L.A,B=L.B;place(camA,A,t,orbit);flash(camA);r.setRenderTarget(rtA);r.render(scene,camA);place(camB,B,t,orbit);flash(camB);postU.f.value=L.k;
      r.setRenderTarget(rtB);r.render(scene,camB);r.setRenderTarget(null);r.render(post,ortho)}
    else{place(camA,L.A,t,orbit);flash(camA);if(hi){postU.f.value=0;r.setRenderTarget(rtA);r.render(scene,camA);r.setRenderTarget(null);r.render(post,ortho)}else{r.setRenderTarget(null);r.render(scene,camA)}}}
  function dispose(){ctxDone=true;unguard();
    if(arrivalGarden){VaultLandscape.dispose(arrivalGarden);arrivalGarden=null}
    if(costume&&costume.undress)try{costume.undress()}catch(e){}
    FIG.forEach(f=>{scene.remove(f.m.grp);try{SentinelMesh.dispose(f.m.grp)}catch(e){}});FIG.length=0;
    Object.keys(SPECIAL).forEach(k=>{const m=SPECIAL[k];if(m.grp.parent)m.grp.parent.remove(m.grp);try{SentinelMesh.dispose(m.grp)}catch(e){}});
    // hand shared module state back before the city boots: VFX pools and weather, DistrictLook's layout and cached materials
    if(HASV){try{VFX.U.uInkB.value.forEach(v=>{v.x=-99});VFX.dispose();VFX.setWeather(null)}catch(e){}}
    if(look&&look.parent)look.parent.remove(look);if(typeof DistrictLook!=="undefined"&&DistrictLook.reset)try{DistrictLook.reset()}catch(e){}
    scene.traverse(o=>{if(o.geometry)o.geometry.dispose();if(o.material){[].concat(o.material).forEach(m=>{if(m.map)m.map.dispose();m.dispose()})}});
    post.traverse(o=>{if(o.geometry)o.geometry.dispose();if(o.material)o.material.dispose()});rtA.dispose();rtB.dispose();glow.dispose();r.dispose();try{r.forceContextLoss()}catch(e){}}
  return{render,dispose,beat,wardenLine,info:()=>({tier,weather:WX.kind,court:CT,shots:SHOT_IDS.slice(),vfx:vfxOn,facade:!!facade,garden:!!arrivalGarden,landmark:!!landmark,gate:!!look,warden:!!costume,figures:FIG.length+Object.keys(SPECIAL).length})};
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
<div class="tcap" id="tCap" aria-live="off"><b></b><span></span></div>
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
    // timeline (seconds), built from the shot list; the sting compresses the titles to 1.5 s over the finished dawn shot
    const TL=timeline(),FULL=TL.full,STING=TL.sting,STILL=TL.still;
    const seenToday=S.get(K.seen,null)===today();
    const cutOn=S.get(K.cut,true)!==false;
    let cue=TL[plan({reduced:noMotion,seenToday,cutOn})];
    const lettersEls=[...$t("#tWord").querySelectorAll("span")];
    let held=false,renderErr=null,clock=0,last=performance.now(),cueI=0,inMenu=false,done=false,raf=0,menuT=0,sel=0,panel=null,timers=[];
    const soundOn=()=>S.get(K.sound,true)!==false;
    function setCine(){root.classList.toggle("cine",cue===FULL);snd.classList.toggle("on",cue===FULL&&soundOn()&&!gestured)}
    function fire(name){switch(name){
      case"slate":$t("#tSlate").classList.add("on");break;
      case"slateOff":$t("#tSlate").classList.remove("on");break;
      case"capOff":cap.classList.remove("on");break;
      case"leak":if(!inMenu){if(typeof VaultAudio!=="undefined")VaultAudio.play("transition",{volume:.4});leak.classList.remove("go");void leak.offsetWidth;leak.classList.add("go")}break;
      case"letters":lettersEls.forEach((el,i)=>{if(noMotion||inMenu){el.classList.add("on");return}timers.push(setTimeout(()=>{el.classList.add("on");if(i%3===0)Score.tick(660+i*18,.06,.025)},i*70))});break;
      case"sweep":$t("#tSweep").classList.add("go");break;
      case"sub":$t("#tSub").classList.add("on");break;
      case"rule":$t("#tRule").classList.add("on");break;
      case"tag":$t("#tTag").classList.add("on");break;
      case"menu":toMenu();break;
      default:if(name.startsWith("cap:"))caption(name.slice(4));else if(name.startsWith("fx:"))fx(name.slice(3))}}
    // captions: the shot's line, or the Warden's own opening line (from c_npc.js) in the Warden shot
    function caption(id){if(inMenu)return;const c=id==="warden"?["Warden",city&&city.wardenLine||"A Warden meets you at the gate."]:CAPS[id];if(!c)return;
      cap.firstChild.textContent=c[0];cap.lastChild.textContent=c[1];cap.classList.remove("on");void cap.offsetWidth;cap.classList.add("on")}
    // one-shot beats: picture to the city, sound to VaultAudio.sfx (b_audio.js) or the score's tick. Never replayed on skip.
    let lampN=0,blipN=0;
    function fx(name){if(inMenu||cue!==FULL)return;if(city)try{city.beat(name)}catch(e){}
      const A=typeof VaultAudio!=="undefined"?VaultAudio:null;
      if(name==="lamp"){Score.tick(523.25*Math.pow(2,[0,2,4,7,9,12,14,16,19][lampN%9]/12),.09,.022);lampN++;return}
      if(!A)return;const id=SFX_OF[name];if(!id)return;
      try{if(name==="blip"||name==="greet")A.sfx(id,{voice:"herald",jitter:.92+((blipN++%5)*.04),volume:.7});else A.sfx(id,{district:"11 - Physical AI",volume:name==="door"?.5:.8})}catch(e){}}
    function toMenu(){if(inMenu)return;inMenu=true;menuT=0;cue.forEach(c=>{if(c[0]!=="menu"&&!c[0].startsWith("fx:")&&!c[0].startsWith("cap:"))fire(c[0])});cap.classList.remove("on");$t("#tSlate").classList.remove("on");cueI=cue.length;
      root.classList.add("menu");snd.classList.remove("on");S.set(K.seen,today());setSel(0);setTimeout(()=>{if(!done)mbtns[0].focus({preventScroll:true})},700)}
    function setSel(i){sel=(i+mbtns.length)%mbtns.length;mbtns.forEach((b,j)=>b.classList.toggle("on",j===sel))}
    // the picture runs on its own clock: the sting and the menu show the finished dawn shot, the menu drifts on a bounded court rail
    const sceneT=()=>cue===FULL&&!inMenu?clock:CUT.end+(inMenu?menuT:0);
    function frame(now){raf=requestAnimationFrame(frame);if(document.hidden){last=now;return}const dt=Math.min(.1,Math.max(0,(now-last)/1000));last=now;
      if(inMenu)menuT+=dt;else if(!held)clock+=dt;
      while(cueI<cue.length&&clock>=cue[cueI][1]){fire(cue[cueI][0]);cueI++}
      if(city){try{city.render(sceneT(),now/1000,inMenu?menuT*.035:0)}catch(e){renderErr=String(e&&e.message||e)}}}
    // reduced motion: one still frame of the dawn shot, redrawn only on resize
    function still(){if(city)try{city.render(CUT.end,0,0)}catch(e){}}
    if(noMotion){toMenu();still();window.addEventListener("resize",still)}else raf=requestAnimationFrame(frame);
    // dev and test hook (Title.debug()): jump the cold open to a time, with the beats of the last few seconds re-fired silently
    DBG={hold(on){held=!!on;return held},state:()=>({clock,error:renderErr,mode:cue===FULL?"full":cue===STING?"sting":"still",inMenu,shots:(L=>[L.A.id,L.B&&L.B.id])(liveAt(sceneT())),scene:sceneT(),info:city&&city.info?city.info():null}),
      seek(t){if(inMenu||cue!==FULL)return false;t=clamp(+t||0,0,CUT.end-.01);clock=t;cap.classList.remove("on");$t("#tSlate").classList.remove("on");
        let i=0;for(;i<cue.length&&cue[i][1]<=t;i++){const n=cue[i][0];if(n.startsWith("fx:")){if(cue[i][1]>t-2.6&&city)try{city.beat(n.slice(3))}catch(e){}}else if(n!=="leak"&&n!=="menu")fire(n)}cueI=i;return true}};
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
      cue=noMotion?STILL:FULL;cueI=0;clock=0;lampN=0;Score.stop();gestured=false;setCine();gesture();if(noMotion){toMenu();still()}}
    function enter(){if(done)return;done=true;Score.tick(880,.25,.06);Score.duck(.8);if(typeof VaultAudio!=="undefined"){VaultAudio.play("complete",{volume:.38,bus:"work"});VaultAudio.ambient(true)}
      root.classList.add("out");cancelAnimationFrame(raf);timers.forEach(clearTimeout);
      const ms=noMotion?10:920;
      setTimeout(()=>{if(city)city.dispose();DBG=null;Score.stop();root.remove();style.remove();appInert(false);window.removeEventListener("keydown",key);window.removeEventListener("resize",still);resolve()},ms)}
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
let DBG=null;
return{start,version:VERSION,debug:()=>DBG,_test:{SHOTS,SHOT,CUT,CAPS,BEATS,SFX_OF,timeline,plan,liveAt,moonPhase}};
})();

