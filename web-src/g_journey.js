// A work navigator backed only by loaded notes and the live task snapshot.
const Journey = (() => {
  let dialog,nav,content,selected=Districts.all[0].folder,opener;
  let journeys=new Map(),evidence=[],progressMessage="",loaded=false,pending=false;
  async function request(body){
    const session=await Live.session();if(!session?.access_token)throw new Error("Sign in to save district progress.");
    const response=await fetch(window.VAULT_CONFIG.url+"/functions/v1/district-progress",{method:"POST",headers:{"content-type":"application/json",apikey:window.VAULT_CONFIG.anonKey,Authorization:"Bearer "+session.access_token},body:JSON.stringify(body),signal:AbortSignal.timeout(10000)});
    const result=await response.json();if(!response.ok||!result.ok)throw new Error("District progress could not be saved. Your notes and tasks remain available.");return result;
  }
  async function persist(action,extra={}){
    if(pending)return;pending=true;const district=selected;progressMessage="Saving district progress…";if(dialog?.open)draw();
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
    const kit=node('ol');d.kit.forEach(s=>kit.append(node('li',s)));content.append(kit);
    const saved=journeys.get(selected);const state=node('p',saved?.first_visit?'Visited · '+new Date(saved.last_visit).toLocaleDateString():'No saved visit yet.','note-s');content.append(state);
    if(progressMessage){const message=node('p',progressMessage,'note-s');message.setAttribute('role','status');content.append(message)}
    const pin=button(saved?.shortlisted?'Remove from district shortlist':'Shortlist this district',()=>persist('shortlist',{enabled:!saved?.shortlisted}));pin.disabled=pending;content.append(pin);
    const actions=node('div',undefined,'journey-actions');actions.append(button('Live task board',()=>launchTab('board')),button('Connect a tool',()=>launchTab('connect')),button('Write a note',()=>launchTab('desk')));content.append(actions);
    const linked=Districts.tasksFor(selected,notes(),tasks());content.append(node('h3','Work in this district · '+linked.length));
    if(!linked.length)content.append(node('p','No unfinished task points at a loaded note in this district.','note-s'));
    linked.slice(0,8).forEach(t=>{const card=node('div',undefined,'journey-task');card.append(node('strong',t.title),node('p',`${t.status} · ${t.priority||'medium'} · ${t.agent||'unassigned'}`),button('Read '+t.note,()=>read(t.note)),button('Manage on board',()=>launchTab('board')));content.append(card)});
    const completed=Districts.completedWork(selected,notes(),tasks());
    content.append(node('h3','Completed team work · '+completed.length),node('p','Save verified task references. These records describe team work, not personal authorship.','note-s'));
    completed.slice(0,8).forEach(t=>{const row=node('div',undefined,'journey-task');row.append(node('strong',t.title),node('p',t.result),button('Read '+t.note,()=>read(t.note)));const recorded=evidence.some(e=>e.district===selected&&e.task_id===t.id);const save=button(recorded?'Evidence saved':'Save completed work evidence',()=>persist('evidence',{task_id:t.id}));save.disabled=pending||recorded;row.append(save);content.append(row)});
    const search=node('input');search.type='search';search.placeholder='Search this district';search.setAttribute('aria-label','Search notes in '+d.folder);search.value=query;
    const list=node('div',undefined,'journey-notes');const count=node('h3');
    const renderResults=()=>{const results=Districts.notesFor(selected,notes(),search.value);count.textContent='Source notes · '+results.length;list.replaceChildren();results.slice(0,80).forEach(n=>list.append(button(n.name,()=>read(n.name))));if(!results.length)list.append(node('p','No matching notes are loaded.','note-s'));if(results.length>80)list.append(node('p','Showing 80 notes. Search to narrow the results.','note-s'))};
    search.oninput=renderResults;content.append(count,search,list);renderResults();
    nav.querySelectorAll('button').forEach(b=>b.setAttribute('aria-pressed',String(b.dataset.folder===selected)));
  }
  function close(){if(dialog?.open)dialog.close();opener?.focus()}
  function show(folder){boot();if(Districts.get(folder))selected=folder;opener=document.activeElement;draw();if(!dialog.open)dialog.showModal();dialog.querySelector('.journey-close').focus();persist('visit')}
  function boot(){
    if(dialog)return;
    const style=node('style');style.textContent=`.journey-dialog{color:#E6E9F2;background:#10141e;border:1px solid #677080;border-radius:14px;width:min(1040px,94vw);max-height:90dvh;padding:20px}.journey-dialog::backdrop{background:#000b}.journey-dialog .note-s{color:#AAB6C9}.journey-header{display:flex;justify-content:space-between;align-items:center;gap:12px}.journey-layout{display:grid;grid-template-columns:220px minmax(0,1fr);gap:24px}.journey-nav{display:flex;flex-direction:column;gap:7px}.journey-nav button{text-align:left}.journey-nav [aria-pressed=true]{border-color:#E8A33D;background:#302818}.journey-content{min-width:0}.journey-content h2{font-size:30px}.journey-content p{line-height:1.6}.journey-eyebrow{font-size:12px;color:#E8A33D}.journey-actions{display:flex;gap:8px;flex-wrap:wrap}.journey-task{padding:12px 0;border-bottom:1px solid #394150}.journey-task button{margin-right:8px}.journey-notes{display:grid;gap:6px;margin-top:12px}.journey-notes button{text-align:left;overflow-wrap:anywhere;white-space:normal}.journey-content input{box-sizing:border-box;width:100%;padding:12px;background:#070b13;color:inherit;border:1px solid #677080;border-radius:6px}.journey-dialog button:focus-visible,.journey-dialog input:focus-visible{outline:3px solid #E8A33D;outline-offset:3px}@media(max-width:640px){.journey-layout{grid-template-columns:1fr}.journey-nav{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:5px}.journey-dialog{padding:14px}.journey-nav button{font-size:12px}}`;
    document.head.append(style);dialog=node('dialog',undefined,'journey-dialog');dialog.setAttribute('aria-labelledby','journey-title');
    const header=node('div',undefined,'journey-header');const title=node('h2','District navigator');title.id='journey-title';header.append(title,button('Close',close));header.lastChild.classList.add('journey-close');
    const layout=node('div',undefined,'journey-layout');nav=node('nav',undefined,'journey-nav');nav.setAttribute('aria-label','Knowledge districts');content=node('section',undefined,'journey-content');
    Districts.all.forEach(d=>{const b=button(d.folder,()=>{selected=d.folder;draw();persist('visit')});b.dataset.folder=d.folder;nav.append(b)});layout.append(nav,content);dialog.append(header,layout);dialog.addEventListener('close',()=>opener?.focus());dialog.addEventListener('keydown',e=>{e.stopPropagation();if(e.key==='Escape'){e.preventDefault();close()}});document.body.append(dialog);
  }
  return {boot,show,close,refresh:()=>{if(dialog?.open)draw()}};
})();
