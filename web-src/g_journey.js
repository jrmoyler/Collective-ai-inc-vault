// A work navigator backed only by loaded notes and the live task snapshot.
const Journey = (() => {
  let dialog,nav,content,selected=Districts.all[0].folder,opener;
  const filters=new Map();
  let catalogLoading=false,catalogLoaded=false,catalogMessage='',coverage=new Map(),collections=[];
  let journeys=new Map(),evidence=[],progressMessage="",loaded=false,pending=false;
  async function request(body,endpoint='district-progress'){
    const session=await Live.session();if(!session?.access_token)throw new Error("Sign in to save district progress.");
    const response=await fetch(window.VAULT_CONFIG.url+"/functions/v1/"+endpoint,{method:"POST",headers:{"content-type":"application/json",apikey:window.VAULT_CONFIG.anonKey,Authorization:"Bearer "+session.access_token},body:JSON.stringify(body),signal:AbortSignal.timeout(10000)});
    const result=await response.json();if(!response.ok||!result.ok)throw new Error("District progress could not be saved. Your notes and tasks remain available.");return result;
  }
  async function loadCatalog(){
    if(catalogLoading)return;catalogLoading=true;
    try{
      const result=await request({action:'catalog'},'district-catalog');
      if(!Array.isArray(result.districts)||!Array.isArray(result.coverage)||!Array.isArray(result.collections))throw new Error('Catalog response unavailable');
      const thematic=result.districts.filter(d=>d.kind==='thematic');
      // Keep the source-curated fallback if the server registry has not been seeded yet.
      const current=Districts.all.filter(d=>d.virtual);
      const taxonomyCurrent=current.every(d=>thematic.some(server=>server.id===d.id&&(d.noteNames||[]).every(name=>(server.noteNames||[]).includes(name))));
      if(taxonomyCurrent){
        const before=Districts.placementSignature(notes());Districts.define(thematic);
        if(before!==Districts.placementSignature(notes())&&typeof Campus!=='undefined'&&Campus.ok()){Campus.rebuild(new Set(notes().map(n=>n.name)),{preserveCamera:true});if(typeof Live.syncMarkers==='function')Live.syncMarkers()}
      }
      coverage=new Map(result.coverage.map(row=>[row.district_id,row]));collections=result.collections;catalogLoaded=true;catalogMessage=taxonomyCurrent?'':'Live catalog membership is older than this city build. The reviewed district layout is preserved.';
    }catch{catalogMessage='Live source coverage is unavailable. Source-curated district navigation remains available.'}
    finally{catalogLoading=false;if(nav){renderNav();if(dialog?.open)draw()}if(window.HUD)HUD.syncDistricts()/* UI hook: HUD district counts follow the catalog */}
  }
  // target: an explicit district (undo of a shortlist removal while another district is shown)
  async function persist(action,extra={},target){
    if(pending)return;pending=true;const district=target||selected;progressMessage="Saving district progress…";if(dialog?.open)draw();
    try{if(!loaded){const state=await request({action:"list"});journeys=new Map(state.journeys.map(j=>[j.district,j]));evidence=state.evidence;loaded=true}
      const result=await request({action,district,...extra});journeys.set(district,result.journey);
      if(action==="evidence"){const state=await request({action:"list"});evidence=state.evidence}
      progressMessage="District progress saved to your account.";
    }catch{progressMessage="Progress is unavailable. This visit is not saved; notes and tasks remain available."}
    finally{pending=false;if(dialog?.open){draw();if(selected!==district)persist("visit")}}
  }
  const node=(tag,text,className)=>{const e=document.createElement(tag);if(text!==undefined)e.textContent=text;if(className)e.className=className;return e};
  const button=(text,fn)=>{const b=node('button',text,'btn');b.type='button';b.onclick=fn;return b};
  const notes=()=>typeof NOTES==='undefined'?[]:NOTES;
  const tasks=()=>typeof Live==='undefined'?[]:Live.snapshot().tasks;
  function launchTab(tab){close();sheet.atab=tab;openSheet('agents')}
  function read(name){const n=notes().find(x=>x.name===name);if(n){close();open(n)}}
  function draw(query=''){
    const d=Districts.get(selected);content.replaceChildren();
    content.append(node('p','Knowledge district · '+d.folder,'journey-eyebrow'),node('h2',d.title),node('p',d.purpose));
    // Travel: every district, including the six thematic ones, is a place in the city.
    if(typeof Campus!=='undefined'&&Campus.ok()&&typeof Campus.flyDistrict==='function'&&Campus.districts().some(x=>x.top===d.folder)){const travel=node('div',undefined,'journey-actions journey-travel');const fly=button('Fly to district',()=>{close();Campus.flyDistrict(d.folder)});fly.classList.add('pri');travel.append(fly,button('Walk this district',()=>{close();Campus.walkDistrict(d.folder)}));content.append(travel)}
    if(d.virtual){const basis=node('details');basis.append(node('summary','District source basis'));(d.sourceNotes||[]).forEach(name=>{if(notes().some(n=>n.name===name))basis.append(button(name,()=>read(name)));else basis.append(node('p',name+' · source note not loaded','note-s'))});Districts.sources({fm:{sources:d.sourceUrls||[]}}).forEach(ref=>{const a=node('a',ref.label);a.href=ref.url;a.target='_blank';a.rel='noopener noreferrer';basis.append(a,document.createTextNode(' '))});content.append(basis)}
    // First-visit path: the district kit as a tracked checklist (g_ux.js remembers it; reading a note here ticks the first step)
    const kitDone=typeof UX!=='undefined'?UX.kitState(selected,d.kit.length):d.kit.map(()=>false);const kitHead=node('h3','First visit path · '+kitDone.filter(Boolean).length+' of '+d.kit.length);kitHead.id='journey-kit-h';
    const kit=node('ol',undefined,'journey-kit');kit.setAttribute('aria-labelledby','journey-kit-h');d.kit.forEach((s,i)=>{const li=node('li',undefined,kitDone[i]?'done':'');const label=node('label');const box=node('input');box.type='checkbox';box.checked=kitDone[i];box.disabled=typeof UX==='undefined';const top=selected;box.onchange=()=>{UX.kitMark(top,i,box.checked,true);li.classList.toggle('done',box.checked);kitHead.textContent='First visit path · '+UX.kitState(top,d.kit.length).filter(Boolean).length+' of '+d.kit.length};label.append(box,node('span',s));li.append(label);kit.append(li)});content.append(kitHead,kit,node('p','Checklist kept on this device.','note-s'));
    if(typeof UX!=='undefined'&&!UX.walk().finished&&typeof Campus!=='undefined'&&Campus.ok()){const walk=button('Take the first walk',()=>{close();UX.showWalk(true)});walk.classList.add('ux-link');content.append(walk)}
    const saved=journeys.get(selected);const state=node('p',saved?.first_visit?'Visited · '+new Date(saved.last_visit).toLocaleDateString():'No saved visit yet.','note-s');content.append(state);
    if(progressMessage){const message=node('p',progressMessage,'note-s');message.setAttribute('role','status');content.append(message)}
    const pin=button(saved?.shortlisted?'Remove from district shortlist':'Shortlist this district',()=>{const top=selected,was=!!saved?.shortlisted;persist('shortlist',{enabled:!was});if(was&&typeof UX!=='undefined')UX.undo(Districts.get(top)?.title+' removed from your shortlist.',()=>persist('shortlist',{enabled:true},top))});pin.disabled=pending;content.append(pin);
    const actions=node('div',undefined,'journey-actions');actions.append(button('Live task board',()=>launchTab('board')),button('Connect a tool',()=>launchTab('connect')),button('Write a note',()=>launchTab('desk')));content.append(actions);
    const linked=Districts.tasksFor(selected,notes(),tasks());content.append(node('h3','Work in this district · '+linked.length));
    if(!linked.length)content.append(node('p','No unfinished task points at a loaded note in this district.','note-s'));
    linked.slice(0,8).forEach(t=>{const card=node('div',undefined,'journey-task');card.append(node('strong',t.title),node('p',`${t.status} · ${t.priority||'priority not set'} · ${t.agent||'unassigned'}`),button('Read '+t.note,()=>read(t.note)),button('Manage on board',()=>launchTab('board')));content.append(card)});
    const completed=Districts.completedWork(selected,notes(),tasks());
    content.append(node('h3','Completed team work · '+completed.length),node('p','Save verified task references. These records describe team work, not personal authorship.','note-s'));
    completed.slice(0,8).forEach(t=>{const row=node('div',undefined,'journey-task');row.append(node('strong',t.title),node('p',t.result),button('Read '+t.note,()=>read(t.note)));const recorded=evidence.some(e=>e.district===selected&&e.task_id===t.id);const save=button(recorded?'Evidence saved':'Save completed work evidence',()=>persist('evidence',{task_id:t.id}));save.disabled=pending||recorded;row.append(save);content.append(row)});
    const liveCoverage=coverage.get(selected);
    if(liveCoverage){const count=value=>Number.isFinite(Number(value))?Number(value):0;const status=node('div',undefined,'journey-coverage');status.append(node('h3','Live source coverage'),node('p',count(liveCoverage.note_count)+' current notes · '+count(liveCoverage.linked_note_count)+' source-linked notes · '+count(liveCoverage.reviewed_current_note_count)+' notes reviewed at their current version.','note-s'));if(liveCoverage.latest_note_update)status.append(node('p','Latest note update: '+new Date(liveCoverage.latest_note_update).toLocaleString(),'note-s'));status.append(node('p','These counts describe the recorded source inventory and current note versions. They do not certify every document in Drive.','note-s'));content.append(status)}
    if(catalogMessage)content.append(node('p',catalogMessage,'note-s'));
    if(catalogLoaded&&collections.length){const inventory=node('details');inventory.append(node('summary','Recorded source collections · '+collections.length));collections.forEach(c=>{const row=node('p');const title=c.title||c.name||c.id||c.collection_id||'Source collection';row.textContent=title+' · '+(c.scan_complete===true?'Inventory scan recorded complete':'Inventory scan completion not confirmed')+' · '+(c.inventoried_count??0)+' inventoried · '+(c.reviewed_count??0)+' reviewed · '+(c.imported_count??0)+' imported · '+(c.blocked_count??0)+' blocked';inventory.append(row)});content.append(inventory)}
    const taxonomy=Districts.directory(selected,notes());const filter=filters.get(selected)||{query:'',category:'',type:'',tag:'',status:'',limit:40};filters.set(selected,filter);
    content.append(node('h3','District directory · '+taxonomy.total+' notes'),node('p',taxonomy.categories.length+' categories · '+taxonomy.types.length+' note types · '+taxonomy.tags.length+' tags. Status labels come from note metadata.','note-s'));
    const entries=node('details');entries.append(node('summary','Entry points and recent updates'));
    const landmarks=Districts.landmarks(selected,notes());landmarks.forEach(n=>entries.append(button(n.name,()=>read(n.name))));
    const updates=Districts.recent(selected,notes());if(updates.length)entries.append(node('h4','Recently updated'));updates.forEach(n=>entries.append(button(n.name+' · '+new Date(n.updated_at).toLocaleDateString(),()=>read(n.name))));
    if(!landmarks.length)entries.append(node('p','This district has no loaded entry notes.'));content.append(entries);
    const search=node('input');search.type='search';search.placeholder='Search this district';search.setAttribute('aria-label','Search notes in '+d.folder);search.value=filter.query;
    const controls=node('div',undefined,'journey-filters');const list=node('div',undefined,'journey-notes');const count=node('h3');
    function noteCard(n){const card=node('div',undefined,'journey-note');card.append(button(n.name,()=>read(n.name)),node('p',Districts.category(n)+' · '+(n.fm?.type||'untyped')+' · '+(n.fm?.status||'status unspecified'),'note-s'));
      const refs=Districts.sources(n);if(refs.length){const provenance=node('details');provenance.append(node('summary','Sources · '+refs.length));refs.forEach(ref=>{const a=node('a',ref.label);a.href=ref.url;a.target='_blank';a.rel='noopener noreferrer';provenance.append(a,document.createTextNode(' '))});card.append(provenance)}
      else card.append(node('p','No external source link is recorded in this note.','note-s'));if(typeof n.fm?.source==='string'&&!/^https?:/.test(n.fm.source))card.append(node('p','Recorded source: '+n.fm.source,'note-s'));return card}
    const renderResults=()=>{const results=Districts.browse(selected,notes(),filter);count.textContent='Matching notes · '+results.length+' / '+taxonomy.total;list.replaceChildren();results.slice(0,filter.limit).forEach(n=>list.append(noteCard(n)));if(!results.length)list.append(node('p','No notes match these filters. Clear filters to see the full district.','note-s'));if(results.length>filter.limit)list.append(button('Show next 40 notes · '+(results.length-filter.limit)+' remaining',()=>{filter.limit+=40;renderResults()}))};
    [['category','Category',taxonomy.categories],['type','Note type',taxonomy.types],['tag','Tag',taxonomy.tags],['status','Recorded status',taxonomy.statuses]].forEach(([key,label,values])=>{const wrapper=node('label',label);const select=node('select');select.setAttribute('aria-label',label);const all=node('option','All '+label.toLowerCase());all.value='';select.append(all);values.forEach(v=>{const option=node('option',v.value+' · '+v.count);option.value=v.value;select.append(option)});select.value=filter[key];select.onchange=()=>{filter[key]=select.value;filter.limit=40;renderResults()};wrapper.append(select);controls.append(wrapper)});
    controls.append(button('Clear filters',()=>{Object.assign(filter,{query:'',category:'',type:'',tag:'',status:'',limit:40});draw()}));
    search.oninput=()=>{filter.query=search.value;filter.limit=40;renderResults()};content.append(search,controls,count,list);renderResults();
    nav.querySelectorAll('button').forEach(b=>{b.setAttribute('aria-pressed',String(b.dataset.folder===selected));const def=Districts.get(b.dataset.folder);b.textContent=(def?.title||b.dataset.folder)+' · '+Districts.notesFor(b.dataset.folder,notes()).length;b.title=b.dataset.folder});
  }
  function close(){if(dialog?.open)dialog.close();opener?.focus({preventScroll:true})}
  function show(folder){boot();if(Districts.get(folder))selected=folder;opener=document.activeElement;draw();if(!dialog.open)dialog.showModal();dialog.querySelector('.journey-close').focus();persist('visit')}
  function renderNav(){
    if(!nav)return;nav.replaceChildren();Districts.all.forEach(d=>{const b=button(d.title||d.folder,()=>{selected=d.folder;draw();persist('visit');dialog.scrollTop=0;b.scrollIntoView({block:'nearest',inline:'center'})});b.dataset.folder=d.folder;b.title=d.folder;b.setAttribute('aria-pressed',String(d.folder===selected));nav.append(b)});
  }
  function boot(){
    if(dialog){if(!catalogLoaded&&!catalogLoading)loadCatalog();return;}
    // Navigator styles live in a_head.html (.journey-*) on the shared theme tokens, so day, dusk and night all apply.
    dialog=node('dialog',undefined,'journey-dialog');dialog.setAttribute('aria-labelledby','journey-title');
    const header=node('div',undefined,'journey-header');const title=node('h2','District navigator');title.id='journey-title';header.append(title,button('Close',close));header.lastChild.classList.add('journey-close');
    const layout=node('div',undefined,'journey-layout');nav=node('nav',undefined,'journey-nav');nav.setAttribute('aria-label','Knowledge districts');content=node('section',undefined,'journey-content');
    renderNav();layout.append(nav,content);dialog.append(header,layout);dialog.addEventListener('close',()=>opener?.focus({preventScroll:true}));dialog.addEventListener('keydown',e=>{e.stopPropagation();if(e.key==='Escape'){e.preventDefault();close()}});document.body.append(dialog);loadCatalog();
  }
  return {boot,show,close,loadCatalog,refresh:()=>{if(dialog?.open)draw()}};
})();
