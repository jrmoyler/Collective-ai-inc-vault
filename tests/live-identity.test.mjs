import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';
function fixture(missingProfiles=false){
 const now=new Date().toISOString(),tables={notes:[],tasks:[],activity:[],team_members:[{user_id:'jr',display_name:'JR',role:'owner'},{user_id:'devon',display_name:'Devon',role:'member'}],agents:[{id:'claude',name:'Claude',color:'#C97B54',active:true}],presence:[{agent:'claude',status:'working',last_seen:now,note:'Note'}],avatar_profiles:[{user_id:'jr',form:'jr',palette:['#050A18','#D4A843','#00D9B5']},{user_id:'devon',form:'devon',palette:['#0B1830','#00A994','#CED7E0']}],agent_sessions:[{user_id:'jr',session_id:'one',agent:'claude',note:'Note',status:'reading',last_seen:now},{user_id:'devon',session_id:'two',agent:'claude',note:'Note',status:'reading',last_seen:now}],member_positions:[{user_id:'jr',session_id:'walk-one',x:10,z:20,yaw:0,walking:true,last_seen:now},{user_id:'devon',session_id:'walk-two',x:30,z:40,yaw:1,walking:true,last_seen:now}]};
 const sb={auth:{getUser:async()=>({data:{user:{id:'jr'}}})},from(table){let data=tables[table];const q={select:()=>q,order:()=>q,range:()=>q,limit:()=>q,eq:(k,v)=>{data=data.filter(r=>r[k]===v);return q},maybeSingle:async()=>({data:data[0]}),then(resolve){return Promise.resolve({data:missingProfiles&&table==='avatar_profiles'?null:data,error:missingProfiles&&table==='avatar_profiles'?{message:'table missing'}:null}).then(resolve)}};return q}};
 let avatars=[];
 const ctx=vm.createContext({window:{VAULT_CONFIG:{url:'https://example.invalid',anonKey:'fixture'},supabase:{createClient:()=>sb}},crypto:{randomUUID:()=> 'test-browser'},document:{addEventListener(){}},store:{get:(_k,d)=>d,set(){}},$ :()=>null,Campus:{setAgents:list=>avatars=list},rebuildNotes(){},BASE:[],sheet:{open:false},esc:s=>String(s).replace(/[&<>"]/g,'_'),console});
 vm.runInContext(fs.readFileSync('web-src/b_identity.js','utf8')+fs.readFileSync('web-src/d_live.js','utf8')+'\nthis.live=Live;',ctx);
 return {live:ctx.live,avatars:()=>avatars};
}
test('live layer separates autonomous Claude, two owned Claude sessions and two walkers',async()=>{
 const f=fixture();await f.live.member();await f.live.loadAll();f.live.pushAgents();const list=f.avatars();
 assert.equal(list.length,5);assert.equal(new Set(list.map(a=>a.id)).size,5);
 const owned=list.filter(a=>a.id.startsWith('session:'));assert.deepEqual(Array.from(owned,a=>a.ownerName),['JR','Devon']);assert.notEqual(owned[0].ownerBadge,owned[1].ownerBadge);assert.notEqual(owned[0].ownerColor,owned[1].ownerColor);
 assert.equal(list.filter(a=>a.form==='agent').length,3);assert.equal(list.filter(a=>a.position).length,2);
});
test('older database keeps autonomous agents and clearly disables unavailable palette saving',async()=>{
 const f=fixture(true);await f.live.member();await f.live.loadAll();f.live.pushAgents();assert.equal(f.avatars().length,1);assert.match(f.live.render('identity'),/id="identitySave" disabled/);assert.match(f.live.render('identity'),/database migration/);
});
