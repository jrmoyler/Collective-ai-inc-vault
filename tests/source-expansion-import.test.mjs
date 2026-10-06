import test from 'node:test';
import assert from 'node:assert/strict';
import {prepare,importGroup} from '../scripts/import_source_expansion.mjs';
const source={id:'source1',title:'Source',url:'https://drive.google.com/file/d/source1/view'};
test('source plan rejects missing provenance and unresolved links before writes',()=>{
 assert.throws(()=>prepare([{name:'One',body:'text',sources:[]}],[]),/Missing provenance/);
 assert.throws(()=>prepare([{name:'One',body:'[[Absent]]',sources:[source]}],[]),/Unknown link/);
 assert.equal(prepare([{name:'One',body:'[[Two]]',sources:[source]},{name:'Two',body:'facts',sources:[source]}],[]).length,2);
});
test('append preserves existing content and retry does not duplicate source sections',async()=>{
 let note={name:'One',body:'# One\n\nOriginal collaborator text.',folder:'05 - Operations'},writes=0;
 const api=async(action,p)=>{if(action==='notes.get')return{note:{...note}};assert.equal(action,'notes.append');writes++;note.body+='\n\n'+p.section;return{ok:true}};
 const [group]=prepare([{name:'One',append:'## Sourced detail\nSpecific fact.',sources:[source]}],['One']);
 await importGroup(group,api,'CV-014');await importGroup(group,api,'CV-014');
 assert.equal(writes,1);assert.match(note.body,/Original collaborator text/);assert.match(note.body,/Specific fact/);assert.match(note.body,/https:\/\/drive.google.com/);
});
test('failed readback stops import rather than claiming a saved update',async()=>{
 const [group]=prepare([{name:'One',append:'facts',sources:[source]}],['One']);
 await assert.rejects(importGroup(group,async action=>action==='notes.get'?{note:{body:'# One'}}:{ok:true}),/Readback mismatch/);
});
