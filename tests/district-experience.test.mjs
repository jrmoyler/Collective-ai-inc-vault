import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import vm from 'node:vm';
const context=vm.createContext({URL});
vm.runInContext(readFileSync(new URL('../web-src/b_districts.js',import.meta.url),'utf8')+'\nglobalThis.registry=Districts;',context);
const D=context.registry;
test('storage and source-curated knowledge districts have distinct kits and are not physical districts',()=>{
 assert.ok(D.all.some(d=>d.folder==='00 - MOCs'));assert.ok(D.all.some(d=>d.folder==='11 - Physical AI'));assert.equal(new Set(D.all.map(d=>d.folder)).size,D.all.length);assert.equal(new Set(D.all.map(d=>d.theme)).size,D.all.length);
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
test('directory counts and combined filters follow loaded metadata without guessing operating status',()=>{
 const notes=[{name:'A',folder:'03 - Products/Medical',fm:{type:'product',status:'pending',tags:['health','health']}},{name:'B',folder:'03 - Products/Medical',fm:{type:'build-spec',tags:['health']}},{name:'C',folder:'03 - Products',fm:{type:'product',status:'operating'}}];
 const dir=D.directory('03 - Products',notes);assert.equal(dir.total,3);assert.equal(dir.categories.find(c=>c.value==='Medical').count,2);assert.equal(dir.tags[0].count,2);
 assert.deepEqual(Array.from(D.browse('03 - Products',notes,{category:'Medical',type:'product',status:'pending',tag:'health'}),n=>n.name),['A']);
 assert.equal(D.browse('03 - Products',notes,{status:'active'}).length,0);assert.equal(D.directory('Daily',notes).total,0);
});
test('source provenance rejects unsafe URLs and tolerates non-array metadata',()=>{
 const refs=D.sources({fm:{source_url:'javascript:alert(1)',url:'https://example.com/doc',sources:'not an array'},body:'[Drive](https://drive.google.com/file/d/actual/view) [Duplicate](https://example.com/doc) [bad](https://user:secret@example.com/)'});
 assert.equal(refs.length,2);assert.ok(refs.every(r=>r.url.startsWith('https://')));
});
test('browser navigation reaches all results and retains filters after durable visit saves',async()=>{
 const {chromium}=await import('playwright');const browser=await chromium.launch({headless:true,args:['--no-sandbox']});
 try{const page=await browser.newPage();await page.setContent('<button id="entry">Enter</button>');
 const fixtures=Array.from({length:85},(_,i)=>({name:'Product '+String(i).padStart(2,'0'),folder:'03 - Products/Medical',fm:{type:'product',tags:['health']},body:'[Source](https://example.com/source)'}));fixtures.push({name:'Person',folder:'04 - People',fm:{type:'person'},body:''},{name:'Integration Fabric',folder:'05 - Operations',fm:{type:'system'},body:'Source record'});
 await page.evaluate(notes=>{window.NOTES=notes;window.rebuildCount=0;window.Campus={ok:()=>true,rebuild:(_,options)=>{window.rebuildCount++;window.preservedCamera=options.preserveCamera}};window.sheet={};window.open=n=>window.opened=n.name;window.openSheet=v=>window.openedTab=v;window.VAULT_CONFIG={url:'https://example.com',anonKey:'public'};window.Live={session:async()=>({access_token:'member'}),snapshot:()=>({tasks:[]})};window.fetch=async(url,options)=>{const b=JSON.parse(options.body);if(url.endsWith('/district-catalog'))return {ok:true,json:async()=>({ok:true,districts:window.catalogDefs,coverage:[{district_id:'03 - Products',note_count:85,linked_note_count:10,reviewed_current_note_count:4}],collections:[{id:'sources',title:'Recorded sources',scan_complete:false,inventoried_count:12,reviewed_count:4,imported_count:2,blocked_count:1}]})};return {ok:true,json:async()=>b.action==='list'?{ok:true,journeys:[],evidence:[]}:{ok:true,journey:{district:b.district,first_visit:'2026-10-06',last_visit:'2026-10-06'}}}}},fixtures);
 await page.evaluate(defs=>{window.catalogDefs=defs.map(d=>({...d,kind:'thematic',noteNames:d.id==='12 - Tools and Integrations'?[...d.noteNames,'Product 84']:d.noteNames}))},D.all.filter(d=>d.virtual));
 await page.addScriptTag({content:readFileSync(new URL('../web-src/b_districts.js',import.meta.url),'utf8')});await page.addScriptTag({content:readFileSync(new URL('../web-src/g_journey.js',import.meta.url),'utf8')});
 await page.evaluate(()=>Journey.show('03 - Products'));await page.getByText('District progress saved to your account.',{exact:true}).waitFor();await page.getByText('Live source coverage',{exact:true}).waitFor();assert.ok((await page.locator('.journey-coverage').textContent()).includes('10 source-linked notes'));assert.ok((await page.locator('.journey-coverage').textContent()).includes('4 notes reviewed'));assert.ok((await page.locator('.journey-coverage').textContent()).includes('do not certify every document'));assert.equal(await page.evaluate(()=>window.rebuildCount),1);assert.equal(await page.evaluate(()=>window.preservedCamera),true);await page.evaluate(()=>Journey.loadCatalog());assert.equal(await page.evaluate(()=>window.rebuildCount),1);
 assert.equal(await page.locator('.journey-nav button').count(),D.all.length);assert.equal(await page.locator('.journey-note').count(),40);await page.getByRole('button',{name:/Show next 40 notes/}).click();assert.equal(await page.locator('.journey-note').count(),80);await page.getByRole('button',{name:/Show next 40 notes/}).click();assert.equal(await page.locator('.journey-note').count(),85);
 await page.getByRole('searchbox').fill('Product 84');assert.equal(await page.locator('.journey-note').count(),1);await page.evaluate(()=>Journey.refresh());assert.equal(await page.getByRole('searchbox').inputValue(),'Product 84');
 await page.getByRole('button',{name:'Product 84',exact:true}).click();assert.equal(await page.evaluate(()=>window.opened),'Product 84');
 await page.evaluate(()=>Journey.show('12 - Tools and Integrations'));await page.getByRole('button',{name:'Integration Fabric',exact:true}).last().click();assert.equal(await page.evaluate(()=>window.opened),'Integration Fabric');
 await page.evaluate(()=>Journey.show('04 - People'));await page.getByRole('button',{name:'Connect a tool',exact:true}).click();assert.equal(await page.evaluate(()=>window.sheet.atab),'connect');
 }finally{await browser.close()}
});

test('source-curated districts preserve storage browsing and assign one deterministic world district',()=>{
 const original=D.all.filter(d=>d.virtual);
 const note={name:'Actual curriculum',folder:'03 - Products/Academy',fm:{type:'product'}};
 D.define([{id:'theme:learning',title:'Learning',purpose:'Source curriculum',noteNames:['Actual curriculum']},{id:'theme:products',title:'Product systems',folders:['03 - Products'],priority:10}]);
 assert.equal(D.notesFor('03 - Products',[note]).length,1);assert.equal(D.notesFor('theme:learning',[note]).length,1);assert.equal(D.worldTop(note),'theme:learning');assert.equal(D.worldTop({name:'Other',folder:'Daily'}),'Daily');
 D.define(original);
});
test('realtime task insert, completion and deletion refresh district work after snapshot changes',()=>{
 const live=readFileSync(new URL('../web-src/d_live.js',import.meta.url),'utf8');
 const line=live.split('\n').find(line=>line.includes('table:"tasks"'));
 const callback=line.match(/table:"tasks"\},(e=>\{.*\})\)/)[1];
 const snapshots=[];let markers=0,sheets=0,completed=0;
 const ctx=vm.createContext({tasks:[],Journey:{refresh:()=>snapshots.push(Array.from(ctx.tasks,t=>({...t})))},syncMarkers:()=>markers++,refresh:()=>sheets++,onDone:()=>completed++});
 const apply=vm.runInContext('('+callback+')',ctx);
 apply({eventType:'INSERT',new:{id:'one',note:'Plan',status:'open'},old:{}});
 assert.equal(snapshots.at(-1)[0].status,'open');
 apply({eventType:'UPDATE',new:{id:'one',note:'Plan',status:'done',done_at:'2026-10-06',result:'Verified'},old:{id:'one'}});
 assert.equal(D.completedWork('09 - Projects',[{name:'Plan',folder:'09 - Projects'}],snapshots.at(-1)).length,1);
 apply({eventType:'DELETE',new:{},old:{id:'one'}});
 assert.equal(snapshots.at(-1).length,0);assert.equal(completed,1);assert.equal(markers,3);assert.equal(sheets,3);
});
