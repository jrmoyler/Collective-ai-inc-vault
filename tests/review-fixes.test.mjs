// Regression guards for the AAA swarm review: far-shore town tone, dusk timing, theme-swap flash, phone close-up HUD,
// and copy that must not claim more than the data says.
import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
const read=p=>fs.readFileSync(p,'utf8');

test('far-shore town cards build on the hazed ridge colour, darken at night and keep a lit far-window floor',()=>{
  const c=read('web-src/c_campus.js');const h=c.slice(c.indexOf('function makeHorizon'),c.indexOf('function makeHorizon')+4000);
  assert.doesNotMatch(h,/uLand\*0\.55\+uHaze\*0\.25/,'raw uLand made a brown cardboard block');
  assert.match(h,/c=mix\(c,land\*0\.7,0\.6\)\*mix\(1\.0,0\.35,uNight\)/);
  assert.match(h,/mix\(win\*on,\(0\.22\+0\.12\*uOcc\)\*4\.0\*farOn,farW\)/,'far windows: sparse lit dots, average floor 0.22+0.12*uOcc');
  assert.match(h,/if\(town>0\.5\)c=mix\(c,uHaze,smoothstep\(600\.0,1400\.0,/,'cards sit in the same air as the ridges');
});

test('dusk holds through a typical evening: night arrives at -16 degrees, not -12',()=>{
  const c=read('web-src/c_campus.js');const b=c.slice(c.indexOf('function blendSky'),c.indexOf('function copySky'));
  assert.match(b,/\(e\+16\)\/16/);assert.doesNotMatch(b,/\(e\+12\)\/12/);
  // the curve: at -8 degrees (about 18:30 in early October at 35N) the sky is now at least half way to the dusk preset
  const t=e=>{let x=Math.pow(Math.min(1,Math.max(0,(e+16)/16)),.7);return x*x*(3-2*x)};
  assert.ok(t(-8)>=.5,'dusk weight at -8: '+t(-8).toFixed(2));assert.equal(t(-16),0);assert.equal(t(0),1);
});

test('theme swaps cut button colour and fill together',()=>{
  const css=read('web-src/a_head.html');
  assert.match(css,/\.btn\{border-radius:8px;transition:[^}]*background \.18s,color \.18s/);
  assert.match(css,/html\.theme-swap \*[^{]*\{transition:none!important\}/);
  assert.match(read('web-src/c_campus.js'),/classList\.add\("theme-swap"\)/);
});

test('phone close-ups fold the first-walk coach without storing it; touch users get a touch recovery hint',()=>{
  const ux=read('web-src/g_ux.js');
  assert.match(ux,/function syncAutoMin\(\)/);assert.match(ux,/\.ux-coach\.auto-min \.ux-coach-body\{display:none\}/);
  assert.match(ux,/innerWidth>760\)return false/);assert.match(ux,/p\.dist<160/);
  assert.match(ux,/TOUCH\(\)\?"First walk hidden\. Go to \(top bar\) › First walk brings it back\."/);
  assert.match(read('web-src/c_campus.js'),/position:\(\)=>\(\{x:cam\.tx,z:cam\.tz,yaw:cam\.yaw,walking:walk,dist:cam\.dist\}\)/);
});

test('the first-visit checklist says it lives on this device',()=>{
  assert.match(read('web-src/g_journey.js'),/node\('p','Checklist kept on this device\.','note-s'\)/);
});
