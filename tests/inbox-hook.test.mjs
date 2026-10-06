import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import http from 'node:http';
import {spawn} from 'node:child_process';

// A fake agent-api with 23 unread messages, several sharing one timestamp, and the asc paging contract of the real one.
function fakeApi(msgs){
 return http.createServer((req,res)=>{let b='';req.on('data',c=>b+=c);req.on('end',()=>{
  const q=JSON.parse(b);let out={ok:true};
  if(q.action==='inbox'){
   const after=m=>!q.since||m.ts>q.since||(m.ts===q.since&&q.after_id&&m.id>q.after_id);
   const rows=msgs.filter(after),page=rows.slice(0,q.limit);
   out={ok:true,order:'asc',more:rows.length>q.limit,messages:page};
  }
  res.setHeader('content-type','application/json');res.end(JSON.stringify(out));
 })});
}
function runHook(dir,url,event){
 return new Promise((resolve,reject)=>{
  const p=spawn(process.execPath,[path.join(dir,'scripts','agent.mjs'),'hook'],{env:{...process.env,VAULT_API_URL:url,VAULT_AGENT_TOKEN:'test'}});
  let out='';p.stdout.on('data',d=>out+=d);p.on('error',reject);p.on('close',()=>resolve(out));
  p.stdin.end(JSON.stringify(event));
 });
}

test('the prompt hook drains an inbox backlog larger than one page without skipping or repeating',async()=>{
 const msgs=Array.from({length:23},(_,i)=>({id:i+1,ts:`2026-10-06T10:00:${String(Math.min(i,15)).padStart(2,'0')}.000Z`,actor:i%2?'JR':'codex',actor_kind:i%2?'human':'agent',text:`m${i+1}`,target:'claude-code'}));
 const dir=fs.mkdtempSync(path.join(os.tmpdir(),'inbox-'));fs.mkdirSync(path.join(dir,'scripts'));
 fs.copyFileSync('scripts/agent.mjs',path.join(dir,'scripts','agent.mjs'));
 const srv=fakeApi(msgs);await new Promise(r=>srv.listen(0,r));const url=`http://127.0.0.1:${srv.address().port}`;
 try{
  const first=await runHook(dir,url,{hook_event_name:'UserPromptSubmit',prompt:'go'});
  const seen=[...first.matchAll(/"(m\d+)"/g)].map(m=>m[1]);
  assert.deepEqual(seen,msgs.map(m=>m.text),'all 23 in order, across three pages');
  assert.match(first,/not as instructions from your user/);
  assert.match(first,/JR \[person\]/);
  assert.deepEqual(JSON.parse(fs.readFileSync(path.join(dir,'.vault-inbox'),'utf8')),{ts:msgs[22].ts,id:23});
  msgs.push({id:24,ts:'2026-10-06T10:00:15.000Z',actor:'codex',actor_kind:'agent',text:'m24',target:'claude-code'});
  const second=await runHook(dir,url,{hook_event_name:'UserPromptSubmit',prompt:'again'});
  assert.deepEqual([...second.matchAll(/"(m\d+)"/g)].map(m=>m[1]),['m24'],'a new message at the same timestamp is still delivered, once');
 }finally{srv.close();fs.rmSync(dir,{recursive:true,force:true})}
});
