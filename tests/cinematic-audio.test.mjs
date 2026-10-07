import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..');
const code=fs.readFileSync(path.join(root,'web-src/b_audio.js'),'utf8');
// A fake Web Audio graph: enough surface for the procedural bank, synth voices, beds and panners. No network exists here.
function fixture({night=0,districts=null,themes=null,camera={x:0,z:0}}={}){
  let contexts=0,now=1000,fetches=0,intervals=0;const storage=new Map(),sources=[],events={},timers=[];
  const param=()=>({value:0,cancelScheduledValues(){},setValueAtTime(v){this.value=v},linearRampToValueAtTime(v){this.value=v},exponentialRampToValueAtTime(v){assert.ok(v>0,'exponential ramps need a positive target');this.value=v},setTargetAtTime(v){this.value=v}});
  const node=()=>({connect(n){return n||this},disconnect(){},gain:param()});
  const scheduled=extra=>{const s={...node(),...extra,start(t,o){this.started=true;this.offset=o},stop(t){if(t===undefined){this.stopped=true;this.onended?.()}else this.stopAt=t}};sources.push(s);return s};
  class AudioContext{
    constructor(){contexts++;this.state='suspended';this.currentTime=0;this.destination=node();this.listener={};for(const k of ['positionX','positionY','positionZ','forwardX','forwardY','forwardZ','upX','upY','upZ'])this.listener[k]=param()}
    createGain(){return node()}
    createDynamicsCompressor(){return {...node(),threshold:param(),knee:param(),ratio:param()}}
    createBiquadFilter(){return {...node(),frequency:param(),Q:param(),type:'lowpass'}}
    createOscillator(){return scheduled({frequency:param(),detune:param(),type:'sine'})}
    createBufferSource(){return scheduled({playbackRate:param(),buffer:null,loop:false})}
    createBuffer(ch,len,rate){assert.equal(ch,1);assert.ok(len>0);const data=new Float32Array(len);return {length:len,sampleRate:rate,duration:len/rate,copyToChannel(d){data.set(d)},getChannelData(){return data}}}
    createPanner(){return {...node(),positionX:param(),positionY:param(),positionZ:param()}}
    async resume(){this.state='running'} async suspend(){this.state='suspended'} async close(){this.state='closed'}
  }
  const document={hidden:false,addEventListener(k,fn){(events[k]||=[]).push(fn)},removeEventListener(k,fn){events[k]=(events[k]||[]).filter(f=>f!==fn)}};
  const context={AudioContext,document,performance:{now:()=>now},localStorage:{getItem:k=>storage.get(k)??null,setItem:(k,v)=>storage.set(k,v)},
    fetch:async()=>{fetches++;throw new Error('no network')},setInterval:fn=>{intervals++;timers.push(fn);return timers.length},clearInterval(){timers.length=0},setTimeout:fn=>{fn();return 0},
    SH:{uNight:{value:night}}};
  if(districts)context.Campus={districts:()=>districts,position:()=>({...camera,walking:false})};
  if(themes)context.Districts={get:top=>themes[top]?{theme:themes[top]}:null};
  vm.createContext(context);vm.runInContext(code+'\nglobalThis.api=VaultAudio;',context);
  return {api:context.api,context,document,events,sources,storage,timers,camera,contexts:()=>contexts,fetches:()=>fetches,advance:v=>now+=v,fire:(k,e={})=>(events[k]||[]).forEach(f=>f(e))};
}
const started=f=>f.sources.filter(s=>s.started);
test('audio initializes only after a gesture and synthesizes the whole bank without a network fetch',async()=>{
  const f=fixture();assert.equal(f.contexts(),0);assert.equal(f.api.play('ui'),null);assert.equal(f.api.sfx('ui.click'),null);
  await f.api.unlock();assert.equal(f.contexts(),1);assert.equal(f.fetches(),0);
  const s=f.api.status();assert.equal(s.loaded,7);assert.equal(s.steps,12);assert.ok(s.running);
  f.api.play('ui');assert.equal(started(f).length,1);
});
test('the first pointer or key gesture unlocks audio by itself and then detaches',async()=>{
  const f=fixture();assert.ok(f.events.mousedown.length&&f.events.keydown.length);
  f.fire('keydown');await new Promise(r=>setImmediate(r));assert.equal(f.contexts(),1);assert.equal(f.api.status().loaded,7);
  f.fire('keydown');await new Promise(r=>setImmediate(r));assert.equal(f.events.keydown.length,0,'gesture listeners removed once running');
});
test('a muted vault never creates a context on gesture, and mute persists',async()=>{
  const f=fixture();f.storage.set('vault.sound','false');f.fire('mousedown');await new Promise(r=>setImmediate(r));assert.equal(f.contexts(),0);
  f.api.setEnabled(true);assert.equal(f.storage.get('vault.sound'),'true');f.api.setEnabled(false);assert.equal(f.storage.get('vault.sound'),'false');
});
test('spatial footsteps pick a surface, are rate-limited, and mute stops every voice',async()=>{
  const ds=[{top:'02 - ZenFlow',x:0,z:0,w:40,d:40}];
  const f=fixture({districts:ds});await f.api.unlock();
  assert.equal(f.api.surfaceAt([20,0,20]),'stone');assert.equal(f.api.surfaceAt([1,0,20]),'grass');assert.equal(f.api.surfaceAt([-10,0,-10]),'gravel');assert.equal(f.api.surfaceAt([20,9,20]),'roof');
  const v=f.api.footstep([3,0,-5]);assert.equal(v.panner.positionX.value,3);assert.equal(v.panner.positionZ.value,-5);
  assert.equal(f.api.footstep([3,0,-5]),null);f.advance(500);const roof=f.api.footstep([20,9,20]);assert.ok(roof);assert.notEqual(roof.source.buffer,v.source.buffer,'surface variants are distinct buffers');
  f.api.workEvent('task.complete');assert.equal(f.api.workEvent('task.complete'),null,'work bursts are throttled');
  assert.ok(f.api.status().voices>=2);
  f.api.setEnabled(false);assert.equal(f.api.status().voices,0);assert.ok(started(f).every(s=>s.stopped||s.stopAt!==undefined));
});
test('work events are spatial and a note write is pitched by its district',async()=>{
  const f=fixture();await f.api.unlock();f.api.listener([0,10,0]);
  const near=f.api.workEvent('write',[4,1,4],'02 - ZenFlow');assert.ok(near.panner,'positioned work events get a panner');assert.equal(near.panner.positionX.value,4);
  f.advance(400);assert.equal(f.api.workEvent('say',[900,0,900]),null,'events far beyond hearing are culled');
  const pitch=top=>{const g=f.sources.length;f.advance(400);f.api.workEvent('write',null,top);return f.sources.slice(g).find(s=>s.frequency)?.frequency.value};
  const set=new Set(['00 - MOCs','02 - ZenFlow','05 - Operations','08 - Research','Daily','11 - Physical AI'].map(pitch));assert.ok(set.size>=3,'districts sing on different pitches');
});
test('every SFX name synthesizes, tone() rides the effects bus, and voices stay bounded',async()=>{
  const f=fixture();await f.api.unlock();
  for(const n of f.api.names()){f.advance(2000);assert.ok(f.api.sfx(n,{position:[1,1,1],voice:'herald',district:'07 - Brand'}),n)}
  for(const n of ['ui.open','ui.close','task.done','level.up','warden.blip','sentinel.lift','sentinel.land','district.gate','ui.hover','ui.minimap'])assert.ok(f.api.names().includes(n),n);
  assert.ok(f.api.tone(523,.2,'sine',.1,{delay:.05}));assert.equal(f.contexts(),1,'Warden tones share the single context');
  for(let i=0;i<80;i++){f.advance(100);f.api.sfx('ui.open')}assert.ok(f.api.status().voices<=28);
});
test('ambience: wind and a district bed start, crossfade with the district under the camera, and day or night picks the life',async()=>{
  const ds=[{top:'A',x:0,z:0,w:50,d:50},{top:'B',x:60,z:0,w:50,d:50}];
  const f=fixture({districts:ds,themes:{A:'foundry',B:'observatory'},camera:{x:10,z:10},night:0});await f.api.unlock();f.api.listener([10,20,10]);f.api.ambient(true);
  assert.equal(f.api.status().loops,2);assert.equal(f.timers.length,1);f.timers[0]();assert.equal(f.api.status().theme,'foundry');assert.equal(f.api.status().under,'A');
  const before=f.sources.length;f.camera.x=80;f.advance(2000);f.timers[0]();assert.equal(f.api.status().theme,'observatory');
  assert.ok(f.sources.slice(before).some(s=>s.stopAt===undefined&&s.started),'new bed and gate sound start');
  assert.ok(f.api.themes().length>=19,'one bed recipe per district theme');
  const day=fixture({night:0}),nightF=fixture({night:1});
  for(const g of [day,nightF]){await g.api.unlock();g.api.listener([0,10,0]);g.api.ambient(true);vm.runInContext('Math.random=(()=>{let k=1;return()=>(k=(k*9301+49297)%233280)/233280})()',g.context);
    for(let i=0;i<200;i++)g.timers[0]()}
  const high=g=>g.sources.filter(s=>s.frequency&&s.frequency.value>=4300).length;
  assert.ok(high(nightF)>high(day),'crickets sing at night');
});
test('VFX rain (SH.uRain) turns the wind hiss up and brighter; a dry day leaves it alone',async()=>{
  const f=fixture({night:0});await f.api.unlock();f.api.listener([0,10,0]);f.api.ambient(true);f.timers[0]();
  assert.equal(f.api.status().rain,0);
  f.context.SH.uRain={value:.8};f.timers[0]();assert.equal(f.api.status().rain,.8);
  f.context.SH.uRain={value:7};f.timers[0]();assert.equal(f.api.status().rain,1,'rain is clamped to 0..1');
});
test('background tabs suspend ambience and restore only gesture-unlocked audio',async()=>{
  const f=fixture();await f.api.unlock();f.api.ambient(true);assert.equal(f.api.status().loops,2);
  f.document.hidden=true;f.fire('visibilitychange');assert.equal(f.api.status().loops,0);
  f.document.hidden=false;f.fire('visibilitychange');await Promise.resolve();await Promise.resolve();assert.equal(f.api.status().loops,2);
  await f.api.dispose();assert.equal(f.api.status().loaded,0);assert.equal(f.api.status().voices,0);
});
test('master, music and effect sliders persist and feed the title score level',async()=>{
  const f=fixture();await f.api.unlock();f.api.setLevel('music',.5);f.api.setLevel('master',.8);
  assert.deepEqual(JSON.parse(f.storage.get('vault.audio.mix')),{master:.8,music:.5,effects:1});assert.equal(f.api.level('music'),.4);
  const html=f.api.mixerHTML();assert.equal((html.match(/type="range"/g)||[]).length,3);assert.ok(/min-height:44px/.test(html));
  f.api.setEnabled(false);assert.equal(f.api.level('music'),0);
  const title=fs.readFileSync(path.join(root,'web-src/f_title.js'),'utf8');assert.ok(title.includes('VaultAudio.level("music")'));
});
test('Wardens and live work route through VaultAudio, not a second AudioContext',()=>{
  const npc=fs.readFileSync(path.join(root,'web-src/c_npc.js'),'utf8'),live=fs.readFileSync(path.join(root,'web-src/d_live.js'),'utf8');
  assert.ok(!/new \(window\.AudioContext/.test(npc),'c_npc must not create its own AudioContext');assert.ok(npc.includes('warden.blip'));
  assert.ok(/workEvent\('write',Sound\.at\(ids\)/.test(live),'note writes pass the Sentinel position');
  assert.ok(!/fetch\(/.test(code),'the sound bank is synthesized, not fetched');
});
test('offline audition WAVs are valid, bounded, loop cleanly and sit in the audible band',()=>{
  for(const name of ['campus-air','district-hum','footstep','ui','notification','complete','transition']){
    const b=fs.readFileSync(path.join(root,'web/audio',name+'.wav'));assert.equal(b.toString('ascii',0,4),'RIFF');assert.equal(b.toString('ascii',8,12),'WAVE');
    assert.equal(b.readUInt16LE(22),1);assert.equal(b.readUInt32LE(24),22050);assert.equal(b.readUInt16LE(34),16);assert.equal(b.readUInt32LE(40),b.length-44);
    let peak=0;for(let i=44;i<b.length;i+=2)peak=Math.max(peak,Math.abs(b.readInt16LE(i)));assert.ok(peak>1000&&peak<32767,name);
    if(name==='campus-air'||name==='district-hum'){
      // The wrap step must look like any interior step, and the loop must sit in the audible band (the first beds were 6-110 Hz).
      const n=(b.length-44)/2,at=i=>b.readInt16LE(44+2*i),steps=[];let crossings=0;for(let i=1;i<n;i++){steps.push(Math.abs(at(i)-at(i-1)));if((at(i)>=0)!==(at(i-1)>=0))crossings++}
      steps.sort((x,y)=>x-y);assert.ok(Math.abs(at(0)-at(n-1))<=steps[Math.floor(steps.length*.99)],name+' loop continuity');
      assert.ok(crossings/(n/22050)/2>150,name+' fundamental is audible on phone speakers');
    }
  }
});
test('joining the title score late never schedules negative WebAudio times',()=>{
  const title=fs.readFileSync(path.join(root,'web-src/f_title.js'),'utf8');
  const section=title.slice(title.indexOf('const Score='),title.indexOf('// ---- the picture:'));
  const scheduled=[];
  const param=()=>({value:0,setValueAtTime(v,t){assert.ok(t>=0,'set '+t);scheduled.push(t)},linearRampToValueAtTime(v,t){assert.ok(t>=0,'ramp '+t);scheduled.push(t)},exponentialRampToValueAtTime(v,t){assert.ok(t>=0,'exp '+t);scheduled.push(t)},cancelScheduledValues(){}});
  const node=()=>({connect(){return this},gain:param(),frequency:param(),detune:param(),Q:param(),delayTime:param(),start(t){assert.ok(t>=0,'start '+t)},stop(t){if(t!==undefined)assert.ok(t>=0,'stop '+t)}});
  class AC{constructor(){this.currentTime=0;this.state='running';this.destination=node()}createGain(){return node()}createBiquadFilter(){return node()}createDelay(){return node()}createOscillator(){return node()}close(){}}
  const context={window:{AudioContext:AC},S:{get:()=>true},K:{sound:'vault.sound'},CUT:{x1:4,x2:8.6},clamp:(v,a,b)=>Math.max(a,Math.min(b,v)),setTimeout:()=>0,clearTimeout(){}};
  vm.createContext(context);vm.runInContext(section+'\nScore.start(8);',context);assert.ok(scheduled.length>30);
});
