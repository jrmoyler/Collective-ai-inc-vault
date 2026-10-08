import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';
import * as THREE from 'three';

test('late facade albedo replaces neutral placeholders without changing custom shader encoding',()=>{
 const source=fs.readFileSync('web-src/c_campus.js','utf8');
 const images=[],TEX={},uni={t_stone:{value:null}},groundUni={t_stone:{value:null}};
 const facade=new THREE.Group(),material=new THREE.MeshStandardMaterial();facade.add(new THREE.Mesh(new THREE.BoxGeometry(),material));
 const c=vm.createContext({THREE,TEX,uni,groundUni,facade,dirty:false,console,renderer:{capabilities:{getMaxAnisotropy:()=>4}},Image:class{constructor(){images.push(this)}}});
 vm.runInContext(source.slice(source.indexOf('function tile(name,'),source.indexOf('function loadTiles()')),c);
 const placeholder=c.tile('stone','fixture.jpg',190,172,140);material.map=placeholder;
 images[0].onload();
 assert.notEqual(material.map,placeholder,'standard material receives the loaded image');
 assert.equal(material.map,TEX.stoneSRGB);assert.equal(material.map.image,images[0]);
 assert.equal(material.map.encoding,THREE.sRGBEncoding);
 assert.equal(uni.t_stone.value,TEX.stone);assert.equal(groundUni.t_stone.value,TEX.stone);
 assert.equal(TEX.stone.encoding,THREE.LinearEncoding,'custom shader sampler remains raw to avoid double decoding');
 assert.equal(c.dirty,true);assert.equal(c.tile('stone','fixture.jpg',0,0,0),TEX.stone);
 facade.children[0].geometry.dispose();material.dispose();TEX.stone.dispose();TEX.stoneSRGB.dispose();placeholder.dispose();
});
