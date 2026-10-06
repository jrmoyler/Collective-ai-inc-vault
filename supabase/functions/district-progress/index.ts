import { createClient } from 'jsr:@supabase/supabase-js@2';
const districts = ['00 - MOCs','01 - Divisions','02 - ZenFlow','03 - Products','04 - People','05 - Operations','06 - Finance','07 - Brand','08 - Research','09 - Projects','10 - Archive','11 - Physical AI','Daily'];
const headers = {'Access-Control-Allow-Origin':'*','Access-Control-Allow-Headers':'authorization,apikey,content-type','Access-Control-Allow-Methods':'POST,OPTIONS','content-type':'application/json'};
const reply = (body:unknown,status=200) => new Response(JSON.stringify(body),{status,headers});
Deno.serve(async req => {
 if(req.method==='OPTIONS') return new Response('ok',{headers});
 if(req.method!=='POST') return reply({error:'POST required'},405);
 const authorization=req.headers.get('authorization')||'';
 if(!/^Bearer\s+\S+$/i.test(authorization)) return reply({error:'Member authentication required'},401);
 // Use the authenticated member client: SQL derives ownership from auth.uid(), never a request user_id.
 const db=createClient(Deno.env.get('SUPABASE_URL')!,Deno.env.get('SUPABASE_ANON_KEY')!,{global:{headers:{Authorization:authorization}},auth:{persistSession:false}});
 const {data:{user},error:authError}=await db.auth.getUser();
 if(authError||!user) return reply({error:'Member authentication required'},401);
 const {data:member,error:memberError}=await db.rpc('is_team');
 if(memberError) return reply({error:'Access check unavailable'},500);
 if(!member) return reply({error:'Vault access required'},403);
 const reader=req.body?.getReader();
 const chunks:Uint8Array[]=[];let bytes=0;
 if(reader) {
  try {
   while(true) {
    const {done,value}=await reader.read();if(done) break;
    bytes+=value.byteLength;
    if(bytes>4096) {await reader.cancel();return reply({error:'Request too large'},413)}
    chunks.push(value);
   }
  }catch{return reply({error:'Invalid request body'},400)}finally{reader.releaseLock()}
 }
 const payload=new Uint8Array(bytes);let offset=0;
 for(const chunk of chunks){payload.set(chunk,offset);offset+=chunk.byteLength}
 const bodyText=new TextDecoder().decode(payload);
 let body; try{body=JSON.parse(bodyText)}catch{return reply({error:'JSON required'},400)}
 if(!body||typeof body!=='object'||Array.isArray(body)) return reply({error:'JSON object required'},400);
 if(Object.keys(body).some(k=>!['action','district','enabled','task_id'].includes(k))) return reply({error:'Unknown field'},400);
 if(body.action==='list') {
  const [journeys,evidence]=await Promise.all([db.from('district_journeys').select('*').eq('user_id',user.id),db.from('district_work_evidence').select('*').eq('user_id',user.id).order('recorded_at',{ascending:false}).limit(200)]);
  if(journeys.error||evidence.error) return reply({error:'Progress unavailable'},500);
  return reply({ok:true,journeys:journeys.data,evidence:evidence.data});
 }
 if(!districts.includes(body.district)||!['visit','shortlist','evidence'].includes(body.action)) return reply({error:'Invalid district or action'},400);
 if(body.action==='shortlist'&&typeof body.enabled!=='boolean') return reply({error:'enabled must be boolean'},400);
 if(body.action==='evidence'&&(typeof body.task_id!=='string'||body.task_id.length<1||body.task_id.length>160)) return reply({error:'task_id required'},400);
 const {data,error}=await db.rpc('record_district_progress',{p_district:body.district,p_action:body.action,p_enabled:body.enabled===true,p_task_id:body.action==='evidence'?body.task_id:null});
 if(error) return reply({error:error.code==='42501'?'Vault access required':error.code==='22023'?'Completed district work required':'Progress unavailable'},error.code==='42501'?403:error.code==='22023'?400:500);
 return reply({ok:true,journey:data});
});
