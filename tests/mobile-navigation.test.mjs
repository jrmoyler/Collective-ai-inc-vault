import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
const head=fs.readFileSync('web-src/a_head.html','utf8');
const campus=fs.readFileSync('web-src/c_campus.js','utf8');
const journey=fs.readFileSync('web-src/g_journey.js','utf8');
const live=fs.readFileSync('web-src/d_live.js','utf8');
test('phone layout uses the dynamic viewport and keeps the stage clear of the bottom ribbon and safe area',()=>{
 assert.match(head,/height:100dvh/);
 assert.match(head,/--rbh:calc\(46px \+ env\(safe-area-inset-bottom/);
 assert.match(head,/\.stage\{margin-bottom:var\(--rbh\)\}/);
 assert.match(head,/\.plate dl\{display:none\}/);
 assert.match(head,/\.floor\.min>\*:not\(h3\)\{display:none!important\}/);
});
test('every district is reachable from the world: navigator chip, fly, walk and an arrival card',()=>{
 assert.match(campus,/id="districtNavigator"[^`]*aria-label="Open district navigator"/);
 assert.match(campus,/return \{boot,[^}]*flyDistrict,walkDistrict,/);
 assert.match(campus,/function walkDistrict\(top\)/);
 assert.match(campus,/if\(walk&&best&&bd===0&&best\.top!==bannerTop\)showDistrict\(best,false\)/);
 assert.match(head,/id="districtBanner"/);
 assert.match(journey,/'Fly to district'/);assert.match(journey,/'Walk this district'/);
});
test('touch walking feeds an analog stick into the same walk step as the keyboard',()=>{
 assert.match(head,/id="joy"/);
 assert.match(campus,/if\(walk&&\(joy\.f\|\|joy\.r\)\)\{[^}]*walkMove\(joy\.f\*v,joy\.r\*v\)/);
 assert.match(campus,/function exitWalk\(\)[\s\S]*?joyReset\(\)/);
});
test('the live floor folds on phones and never wipes a message being typed',()=>{
 assert.match(live,/matchMedia\("\(max-width:760px\)"\)\.matches\)el\.classList\.add\("min"\)/);
 assert.match(live,/if\(el\.contains\(document\.activeElement\)&&document\.activeElement\.value\)return;/);
});
