#!/usr/bin/env node
// Versioned, append-only source import. Plan by default; --apply is explicit.
import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import {fileURLToPath} from 'node:url';
import {call} from './agent.mjs';

export function prepare(entries, existingNames) {
  const known=new Set([...existingNames,...entries.map(n=>n.name)]), grouped=new Map();
  for(const n of entries){
    if(typeof n.name!=='string'||!/^[^/\\:\[\]|#^]{1,180}$/.test(n.name))throw Error('Invalid note name: '+n.name);
    const content=n.append||n.body;
    if(typeof content!=='string'||!content.trim())throw Error('Empty content: '+n.name);
    if(!Array.isArray(n.sources)||!n.sources.length)throw Error('Missing provenance: '+n.name);
    for(const s of n.sources){const u=new URL(s.url);if(!['drive.google.com','docs.google.com'].includes(u.hostname)||u.protocol!=='https:'||!s.id||!s.title)throw Error('Invalid source: '+n.name)}
    for(const m of content.matchAll(/\[\[([^\]|#]+)(?:[^\]]*)\]\]/g))if(!known.has(m[1].trim()))throw Error('Unknown link '+m[1]+' in '+n.name);
    const citation='\n\n### Source records\n'+n.sources.map(s=>'- ['+s.title.replace(/[\[\]\n]/g,' ')+']('+s.url+')').join('\n');
    const section=content.trim()+citation;
    const marker='<!-- drive-expansion:'+crypto.createHash('sha256').update(section).digest('hex').slice(0,20)+' -->';
    const item={...n,section,marker};
    if(!grouped.has(n.name))grouped.set(n.name,[]);grouped.get(n.name).push(item);
  }
  return [...grouped].map(([name,parts])=>({name,parts}));
}

export async function importGroup(group, api, task) {
  let current;
  try{current=(await api('notes.get',{name:group.name})).note}catch(e){if(!/no such note/.test(e.message))throw e}
  let changed=false,created=false;
  for(const part of group.parts){
    if(current?.body.includes(part.marker))continue;
    const section=part.section+'\n\n'+part.marker;
    if(current){await api('notes.append',{name:group.name,section,task,summary:'Append source-reviewed detail; preserve prior content'});}
    else {
      if(!part.folder)throw Error('Missing folder: '+group.name);
      const body=section.startsWith('# '+group.name+'\n')?section:'# '+group.name+'\n\n'+section;
      await api('notes.upsert',{name:group.name,folder:part.folder,body,fm:{type:'reference',tags:['drive-source-expansion'],...part.fm,source_refs:part.sources.map(s=>({id:s.id,title:s.title,url:s.url}))},task,summary:'Create detailed record from reviewed Drive sources'});created=true;
    }
    current=(await api('notes.get',{name:group.name})).note;
    if(!current?.body.includes(part.marker))throw Error('Readback mismatch: '+group.name);
    changed=true;
  }
  return {name:group.name,changed,created,note:current};
}

async function main(){
  const args=process.argv.slice(2),option=k=>args[args.indexOf(k)+1],file=option('--plan'),out=option('--out');
  if(!args.includes('--plan')||!args.includes('--out'))throw Error('Usage: --plan plan.json --out readback.json [--apply] [--task CV-014]');
  const input=JSON.parse(fs.readFileSync(file,'utf8')),entries=Array.isArray(input)?input:input.notes;
  const api=(action,body)=>call(action,body,{timeout:45000});
  const existing=(await api('notes.list')).notes.map(n=>n.name),groups=prepare(entries,existing);
  console.log(JSON.stringify({groups:groups.length,entries:entries.length,mode:args.includes('--apply')?'apply':'plan'}));
  if(!args.includes('--apply'))return;
  const result={started_at:new Date().toISOString(),results:[]},task=args.includes('--task')?option('--task'):undefined;
  // Independent note groups share no writes. Four workers bound API pressure; per-note appends stay serial.
  let cursor=0;await Promise.all(Array.from({length:Math.min(4,groups.length)},async()=>{
    while(cursor<groups.length){const group=groups[cursor++];const r=await importGroup(group,api,task);result.results.push(r);fs.writeFileSync(out,JSON.stringify(result,null,2));console.log(r.created?'Created':r.changed?'Expanded':'Verified',r.name)}
  }));
  result.finished_at=new Date().toISOString();fs.writeFileSync(out,JSON.stringify(result,null,2));
  console.log(JSON.stringify({created:result.results.filter(n=>n.created).length,expanded:result.results.filter(n=>n.changed&&!n.created).length,unchanged:result.results.filter(n=>!n.changed).length}));
}
if(process.argv[1]&&path.resolve(process.argv[1])===fileURLToPath(import.meta.url))main().catch(e=>{console.error(e.message);process.exitCode=1});
