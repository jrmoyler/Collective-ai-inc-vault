import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';

function guides(tasks=[],notes=[]){
  const context=vm.createContext({
    THREE:{Vector3:class{}},matchMedia:()=>({matches:false}),setInterval:()=>0,
    Campus:{districts:()=>[{top:'09 - Projects',name:'Projects'}]},
    NOTES:notes,byName:new Map(notes.map(n=>[n.name,n])),
    Live:{snapshot:()=>({tasks,agents:[],presence:[],acts:[]})},
    esc:s=>String(s).replaceAll('&','&amp;').replaceAll('<','&lt;').replaceAll('"','&quot;')
  });
  vm.runInContext(fs.readFileSync('web-src/c_npc.js','utf8')+';this.guides=Guides;',context);
  return context.guides;
}
const note={name:'Build Plan',top:'09 - Projects',folder:'09 - Projects/Build',fm:{},body:'Plan',tags:new Set()};
test('Warden recommends an open local task, respects priority and does not claim it',()=>{
  const tasks=[{id:'A',title:'Claimed',note:note.name,priority:'high',status:'claimed'},
    {id:'B',title:'Low',note:note.name,priority:'low',status:'open'},
    {id:'C',title:'Ship <review>',note:note.name,priority:'high',status:'open'},
    {id:'D',title:'Other district',note:'Other',priority:'high',status:'open'}];
  const before=JSON.stringify(tasks),r=guides(tasks,[note]).reply(note.top,'Recommend my next task');
  assert.match(r.text,/Ship <review>/);assert.match(r.text,/Read its linked note before claiming/);
  assert.match(r.html,/data-n="Build Plan"/);assert.equal(JSON.stringify(tasks),before);
});
test('Warden handles an empty work board and routes connection questions to real notes',()=>{
  const connection={...note,name:'MCP Connection',folder:'09 - Projects/Access'};
  const g=guides([], [connection]);
  assert.match(g.reply(note.top,'next task').text,/No unclaimed task/);
  const r=g.reply(note.top,'Connect my tools');assert.match(r.html,/MCP Connection/);
  assert.match(r.text,/Never paste credentials/);
  assert.match(guides().reply(note.top,'MCP setup').html,/no matching connection note/);
});
