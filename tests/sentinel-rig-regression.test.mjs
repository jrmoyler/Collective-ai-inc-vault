import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';
import * as THREE from 'three';
const ctx=vm.createContext({THREE,document:{createElement:()=>({getContext:()=>({fillRect(){},fillText(){}})})}});
vm.runInContext(fs.readFileSync('web-src/b_identity.js','utf8')+fs.readFileSync('web-src/b_sentinel.js','utf8')+';this.mesh=SentinelMesh;',ctx);
const {mesh}=ctx;

test('duplicate frame timestamps and invalid clocks do not poison locomotion',()=>{
  const m=mesh.create({id:'repeat-clock',form:'jr'});
  mesh.pose(m,10,'walking');mesh.pose(m,10,'walking');mesh.pose(m,10.016,'walking');
  mesh.pose(m,NaN,'walking');mesh.pose(m,Infinity,'walking');mesh.pose(m,10.032,'walking');
  assert.ok([...m.anim.P,...m.anim.S,...m.anim.V,m.anim.speed,m.anim.gait].every(Number.isFinite));
  mesh.dispose(m.grp);
});

test('cape skinning shares waist motion with normalized finite weights for every identity',()=>{
  for(const form of ['jr','devon','ahmad','kenza','member','agent']){
    const m=mesh.create({id:'skin-'+form,form,level:20});
    const a=m.surfaces.body.geometry.attributes;let blended=0;
    for(let i=0;i<a.position.count;i++){
      const weights=[a.skinWeight.getX(i),a.skinWeight.getY(i),a.skinWeight.getZ(i),a.skinWeight.getW(i)];
      assert.ok(weights.every(w=>Number.isFinite(w)&&w>=0&&w<=1));
      assert.ok(Math.abs(weights.reduce((x,y)=>x+y,0)-1)<1e-6);
      if(a.cloth.getX(i)&&a.position.getZ(i)<-.6&&weights[1]>0&&weights[1]<1){
        blended++;assert.equal(a.skinIndex.getX(i),0);assert.equal(a.skinIndex.getY(i),1);
      }
    }
    assert.ok(blended>0,form+' cape bends across the waist');
    assert.ok(mesh.stats(m).draws<=8);
    mesh.dispose(m.grp);
  }
});

test('compiled cloak wind has defined smoothstep ordering and reduced motion stops wind',()=>{
  const m=mesh.create({id:'cloth-shader',form:'member'});
  const shader={uniforms:{},vertexShader:'#include <begin_vertex>',fragmentShader:'#include <color_fragment>\n#include <roughnessmap_fragment>\n#include <emissivemap_fragment>'};
  m.surfaces.body.material.onBeforeCompile(shader);
  assert.match(shader.vertexShader,/1\.0-smoothstep\(2\.55,4\.35,position.y\)/);
  mesh.reducedMotion(true);mesh.pose(m,1,'walking');assert.equal(shader.uniforms.uSway.value,0);
  mesh.reducedMotion(null);mesh.dispose(m.grp);
});

test('mesh draw diagnostics exclude hidden ancestor subtrees',()=>{
  const m=mesh.create({id:'visibility',form:'agent',level:20});
  assert.equal(mesh.stats(m).draws,8);m.ring.visible=false;
  assert.equal(mesh.stats(m).draws,6);m.grp.visible=false;assert.equal(mesh.stats(m).draws,0);
  mesh.dispose(m.grp);
});
