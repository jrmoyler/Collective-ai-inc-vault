// Person-owned external tool sessions. Use the member's auth JWT, never a shared agent token.
import { createClient } from 'jsr:@supabase/supabase-js@2';
const db=createClient(Deno.env.get('SUPABASE_URL')!,Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!);
const headers={'Access-Control-Allow-Origin':'*','Access-Control-Allow-Headers':'authorization,apikey,content-type','Access-Control-Allow-Methods':'POST,OPTIONS','content-type':'application/json'};
const reply=(body:unknown,status=200)=>new Response(JSON.stringify(body),{status,headers});
Deno.serve(async req=>{
 if(req.method==='OPTIONS')return new Response('ok',{headers});
 if(req.method!=='POST')return reply({error:'POST required'},405);
 const token=(req.headers.get('authorization')||'').replace(/^Bearer\s+/i,'');
 const {data:{user},error}=await db.auth.getUser(token);if(error||!user)return reply({error:'Member authentication required'},401);
 const member=await db.from('team_members').select('user_id').eq('user_id',user.id).maybeSingle();if(!member.data)return reply({error:'Vault access required'},403);
 let b;try{b=await req.json()}catch{return reply({error:'JSON required'},400)}
 if(!/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(b.session_id||''))return reply({error:'session_id must be a UUID'},400);
 const agent=await db.from('agents').select('id').eq('id',String(b.agent||'')).eq('active',true).maybeSingle();if(!agent.data)return reply({error:'Active agent required'},400);
 const statuses=['working','thinking','reading','writing','reviewing','blocked','idle','offline'];if(!statuses.includes(b.status))return reply({error:'Invalid status'},400);
 const result=await db.from('agent_sessions').upsert({user_id:user.id,session_id:b.session_id,agent:agent.data.id,status:b.status,note:typeof b.note==='string'?b.note.slice(0,180):null,detail:typeof b.detail==='string'?b.detail.slice(0,300):null,last_seen:new Date().toISOString()});
 return result.error?reply({error:result.error.message},500):reply({ok:true});
});
