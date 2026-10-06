import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import vm from 'node:vm';
const context=vm.createContext({});
vm.runInContext(readFileSync(new URL('../web-src/b_districts.js',import.meta.url),'utf8')+'\nglobalThis.registry=Districts;',context);
const D=context.registry;
test('all 13 knowledge folders have distinct kits and are not physical districts',()=>{
 assert.equal(D.all.length,13);assert.equal(new Set(D.all.map(d=>d.folder)).size,13);assert.equal(new Set(D.all.map(d=>d.theme)).size,13);
 assert.ok(D.all.every(d=>d.kit.length===3));assert.equal(D.get('Daily').title,'Daily log');assert.equal(D.get('pending'),undefined);
});
test('district search includes nested folders, tags and bodies without leaking adjacent notes',()=>{
 const notes=[{name:'Plan',folder:'09 - Projects/Nested',body:'Evidence',fm:{tags:['shipping']}},{name:'Other',folder:'08 - Research',body:'Evidence'}];
 assert.equal(D.notesFor('09 - Projects',notes,'shipping').length,1);assert.equal(D.notesFor('09 - Projects',notes,'evidence').length,1);assert.equal(D.notesFor('09 - Projects',notes,'missing').length,0);
});
test('missions derive only from unfinished tasks linked to existing district notes',()=>{
 const notes=[{name:'Plan',folder:'09 - Projects'}];const tasks=[{id:'low',note:'Plan',priority:'low',status:'open'},{id:'high',note:'Plan',priority:'high',status:'blocked'},{id:'done',note:'Plan',status:'done'},{id:'unknown',note:'Missing',status:'open'}];
 assert.deepEqual(Array.from(D.tasksFor('09 - Projects',notes,tasks),t=>t.id),['high','low']);
});
test('navigator uses safe DOM text and real work panel hooks',()=>{
 const source=readFileSync(new URL('../web-src/g_journey.js',import.meta.url),'utf8');assert.ok(!source.includes('innerHTML'));assert.ok(source.includes('textContent=text'));assert.ok(source.includes("launchTab('connect')"));assert.ok(source.includes("launchTab('board')"));assert.ok(source.includes('showModal()'));
});
test('completed evidence requires linked note, completion timestamp and actual result',()=>{
 const notes=[{name:'System',folder:'11 - Physical AI/Robotics'}];
 const tasks=[{id:'verified',note:'System',status:'done',done_at:'2026-10-06',result:'Validation passed'},
 {id:'empty',note:'System',status:'done',done_at:'2026-10-06',result:'  '},
 {id:'undated',note:'System',status:'done',result:'Passed'},
 {id:'outside',note:'Unknown',status:'done',done_at:'2026-10-06',result:'Passed'},
 {id:'open',note:'System',status:'open',done_at:'2026-10-06',result:'Passed'}];
 assert.deepEqual(Array.from(D.completedWork('11 - Physical AI',notes,tasks),t=>t.id),['verified']);
});
