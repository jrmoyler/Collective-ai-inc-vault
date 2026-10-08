import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';
import * as ThreeModule from 'three';
const src=fs.readFileSync('web-src/c_campus.js','utf8');
function fixture(){
 const THREE={...ThreeModule};
 const scene=new THREE.Scene(),camera=new THREE.PerspectiveCamera(58,1,.35,5000);
 const skyMesh=new THREE.Mesh(new THREE.SphereGeometry(),new THREE.MeshBasicMaterial());
 const water=new THREE.Mesh(new THREE.PlaneGeometry(),new THREE.MeshBasicMaterial());
 const ghost=new THREE.Mesh(new THREE.BoxGeometry(),new THREE.MeshBasicMaterial({transparent:true}));
 scene.add(skyMesh,water,ghost);
 const ctx=vm.createContext({THREE,scene,camera,skyMesh,water,renderer:{capabilities:{isWebGL2:true}},console});
 for(const p of ['postprocessing/EffectComposer.js','shaders/CopyShader.js','shaders/SSAOShader.js','math/SimplexNoise.js','postprocessing/SSAOPass.js'])vm.runInContext(fs.readFileSync('node_modules/three/examples/js/'+p,'utf8'),ctx);
 vm.runInContext(src.slice(src.indexOf('function makeContactPass(){'),src.indexOf('function setupPost(){'))+';this.pass=makeContactPass()',ctx);
 return {ctx,scene,camera,skyMesh,water,ghost,p:ctx.pass};
}
test('contact occlusion uses bounded buffers and keeps the full-resolution beauty target',()=>{
 const {p}=fixture();p.setSize(4000,2400);
 assert.equal(p.beautyRenderTarget.width,1);
 assert.ok(p.normalRenderTarget.width<=900);assert.equal(p.kernel.length,16);
 assert.equal(p.needsSwap,false);
 const target={tag:'existing beauty'},seen=[];
 p.renderOverride=()=>{};p.renderPass=(_r,_m,t)=>seen.push(t);
 p.render({},null,target);
 assert.equal(seen.at(-1),target,'AO multiplies the existing beauty instead of replacing it');
});
test('contact pass restores visibility even when normal rendering fails',()=>{
 const {p,skyMesh,water,ghost,scene}=fixture();
 p.renderOverride=()=>{assert.equal(skyMesh.visible,false);assert.equal(water.visible,false);assert.equal(ghost.visible,false);scene.overrideMaterial={};throw Error('GPU unavailable')};
 assert.throws(()=>p.render({},null,{}),/GPU unavailable/);
 assert.equal(skyMesh.visible,true);assert.equal(water.visible,true);assert.equal(ghost.visible,true);
 assert.equal(scene.overrideMaterial,null);
});
