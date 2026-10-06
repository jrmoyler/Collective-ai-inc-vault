import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..');
const code=fs.readFileSync(path.join(root,'web-src/b_audio.js'),'utf8');
function fixture(){
  let contexts=0,now=1000;const storage=new Map(),sources=[],events={};
  const param=()=>({value:0,cancelScheduledValues(){},setValueAtTime(v){this.value=v},linearRampToValueAtTime(v){this.value=v}});
  const node=()=>({connect(){return this},disconnect(){},gain:param()});
  class AudioContext{
    constructor(){contexts++;this.state='suspended';this.currentTime=0;this.destination=node();this.listener={};for(const k of ['positionX','positionY','positionZ','forwardX','forwardY','forwardZ','upX','upY','upZ'])this.listener[k]=param()}
    createGain(){return node()}
    createDynamicsCompressor(){return {...node(),threshold:param(),knee:param(),ratio:param()}}
    createBufferSource(){const source={...node(),playbackRate:param(),start(){this.started=true},stop(){this.stopped=true;this.onended?.()}};sources.push(source);return source}
    createPanner(){return {...node(),positionX:param(),positionY:param(),positionZ:param()}}
    async decodeAudioData(bytes){assert.ok(bytes.byteLength>0);return {duration:.5}}
    async resume(){this.state='running'} async suspend(){this.state='suspended'} async close(){this.state='closed'}
  }
  const document={hidden:false,addEventListener(k,fn){events[k]=fn}};
  const context={AudioContext,document,performance:{now:()=>now},localStorage:{getItem:k=>storage.get(k)||null,setItem:(k,v)=>storage.set(k,v)},fetch:async()=>({ok:true,arrayBuffer:async()=>new ArrayBuffer(5)})};
  vm.createContext(context);vm.runInContext(code+'\nglobalThis.api=VaultAudio;',context);
  return {api:context.api,document,events,sources,storage,contexts:()=>contexts,advance:v=>now+=v};
}
test('audio only initializes after a gesture and loads all original PCM files',async()=>{
  const f=fixture();assert.equal(f.contexts(),0);assert.equal(f.api.play('ui'),null);await f.api.unlock();assert.equal(f.contexts(),1);assert.equal(f.api.status().loaded,7);
  f.api.play('ui');assert.equal(f.sources.length,1);assert.ok(f.sources[0].started);
});
test('spatial footsteps are rate-limited, work bursts are bounded, and mute stops active sources',async()=>{
  const f=fixture();await f.api.unlock();const v=f.api.footstep([3,2,-5]);assert.equal(v.panner.positionX.value,3);assert.equal(v.panner.positionZ.value,-5);
  f.api.footstep([3,2,-5]);assert.equal(f.sources.length,1);f.advance(500);f.api.footstep([4,2,-5]);assert.equal(f.sources.length,2);
  f.api.workEvent('task.complete');f.api.workEvent('task.complete');assert.equal(f.sources.length,3);
  f.api.setEnabled(false);assert.equal(f.storage.get('vault.sound'),'false');assert.equal(f.api.status().voices,0);assert.ok(f.sources.every(s=>s.stopped));
});
test('background tabs suspend ambience and restore only gesture-unlocked audio',async()=>{
  const f=fixture();await f.api.unlock();f.api.ambient(true);assert.equal(f.api.status().voices,2);
  f.document.hidden=true;f.events.visibilitychange();assert.equal(f.api.status().voices,0);
  f.document.hidden=false;f.events.visibilitychange();await Promise.resolve();assert.equal(f.api.status().voices,2);
  await f.api.dispose();assert.equal(f.api.status().loaded,0);assert.equal(f.api.status().voices,0);
});
test('all shipped PCM files have valid bounded mono sample payloads and loop boundaries',()=>{
  for(const name of ['campus-air','district-hum','footstep','ui','notification','complete','transition']){
    const b=fs.readFileSync(path.join(root,'web/audio',name+'.wav'));assert.equal(b.toString('ascii',0,4),'RIFF');assert.equal(b.toString('ascii',8,12),'WAVE');
    assert.equal(b.readUInt16LE(22),1);assert.equal(b.readUInt32LE(24),22050);assert.equal(b.readUInt16LE(34),16);assert.equal(b.readUInt32LE(40),b.length-44);
    let peak=0;for(let i=44;i<b.length;i+=2)peak=Math.max(peak,Math.abs(b.readInt16LE(i)));assert.ok(peak>1000&&peak<32767,name);
    if(name==='campus-air'||name==='district-hum')assert.ok(Math.abs(b.readInt16LE(44)-b.readInt16LE(b.length-2))<300,name+' loop continuity');
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
