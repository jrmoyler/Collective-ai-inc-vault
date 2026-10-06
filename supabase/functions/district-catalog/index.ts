// Read-only projection of approved taxonomy and live notes. No duplicated note bodies.
import {createClient} from 'npm:@supabase/supabase-js@2.117.2';
const headers={'Access-Control-Allow-Origin':'*','Access-Control-Allow-Headers':'authorization,apikey,content-type','Access-Control-Allow-Methods':'POST,OPTIONS','content-type':'application/json'};
const reply=(body:unknown,status=200)=>new Response(JSON.stringify(body),{status,headers});
Deno.serve(async req=>{
 if(req.method==='OPTIONS')return new Response('ok',{headers});
 if(req.method!=='POST')return reply({error:'POST required'},405);
 const authorization=req.headers.get('authorization')||'';
 if(!/^Bearer\s+\S+$/i.test(authorization))return reply({error:'Member authentication required'},401);
 const db=createClient(Deno.env.get('SUPABASE_URL')!,Deno.env.get('SUPABASE_ANON_KEY')!,{global:{headers:{Authorization:authorization}},auth:{persistSession:false}});
 const {data:{user},error:authError}=await db.auth.getUser();
 if(authError||!user)return reply({error:'Member authentication required'},401);
 const {data:member,error:memberError}=await db.rpc('is_team');
 if(memberError)return reply({error:'Access check unavailable'},500);
 if(!member)return reply({error:'Vault access required'},403);
 const reader=req.body?.getReader();const chunks:Uint8Array[]=[];let size=0;
 if(reader)try{while(true){const {done,value}=await reader.read();if(done)break;size+=value.byteLength;if(size>4096){await reader.cancel();return reply({error:'Request too large'},413)}chunks.push(value)}}catch{return reply({error:'Invalid request body'},400)}finally{reader.releaseLock()}
 const bytes=new Uint8Array(size);let offset=0;for(const chunk of chunks){bytes.set(chunk,offset);offset+=chunk.byteLength}
 let body;try{body=JSON.parse(new TextDecoder().decode(bytes))}catch{return reply({error:'JSON required'},400)}
 if(!body||typeof body!=='object'||Array.isArray(body)||Object.keys(body).some(k=>!['action','district','limit','after'].includes(k)))return reply({error:'Invalid request fields'},400);
 if(body.action==='catalog'){
  const [districts,coverage,collections]=await Promise.all([db.from('district_definitions').select('*').order('priority',{ascending:false}).order('id'),db.from('district_source_coverage').select('*').order('district_id'),db.from('source_collection_coverage').select('*').order('id')]);
  if([districts,coverage,collections].some(r=>r.error))return reply({error:'Catalog unavailable'},500);
  const definitions=(districts.data||[]).map(d=>({id:d.id,title:d.title,purpose:d.purpose,kind:d.kind,folders:d.storage_folder?[d.storage_folder]:[],noteNames:d.note_names,priority:d.priority,kit:d.kit,sourceUrls:d.source_urls,sourceNotes:d.source_notes}));
  return reply({ok:true,districts:definitions,coverage:coverage.data,collections:collections.data,membership_paging:'Use action notes to retrieve full district membership'});
 }
 if(body.action!=='notes'||typeof body.district!=='string'||body.district.length<1||body.district.length>100)return reply({error:'Invalid district or action'},400);
 const limit=body.limit===undefined?100:body.limit;
 if(!Number.isInteger(limit)||limit<1||limit>200||(body.after!==undefined&&(typeof body.after!=='string'||body.after.length>500)))return reply({error:'Invalid page bounds'},400);
 const district=await db.from('vault_districts').select('id').eq('id',body.district).maybeSingle();
 if(district.error)return reply({error:'Catalog unavailable'},500);
 if(!district.data)return reply({error:'Unknown district'},400);
 let query=db.from('district_content_catalog').select('*').eq('district_id',body.district).order('name').limit(limit+1);
 if(body.after)query=query.gt('name',body.after);
 const {data,error}=await query;
 if(error)return reply({error:'Catalog unavailable'},500);
 const rows=data||[],hasMore=rows.length>limit,notes=rows.slice(0,limit);
 return reply({ok:true,district:body.district,notes,next:hasMore?notes.at(-1)?.name:null});
});
