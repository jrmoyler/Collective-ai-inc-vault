// Notes load from Supabase after sign-in (see e_boot.js) and stay live through Realtime.
let BASE = [];
const FOLDER_COLORS = {"00 - MOCs":"#E8A33D","01 - Divisions":"#7C3AED","02 - ZenFlow":"#3B82F6","03 - Products":"#14B8A6","04 - People":"#F43F5E","05 - Operations":"#A3E635","06 - Finance":"#C9A84C","07 - Brand":"#FF85C2","08 - Research":"#5B9BF0","09 - Projects":"#FB923C","10 - Archive":"#6B7280","11 - Physical AI":"#22D3EE","Daily":"#E6E9F2","Root":"#E8A33D"};
const store={get(k,d){try{const v=localStorage.getItem(k);return v==null?d:JSON.parse(v)}catch(e){return d}},set(k,v){try{localStorage.setItem(k,JSON.stringify(v))}catch(e){}}};
const $=s=>document.querySelector(s);
const esc=s=>String(s).replace(/[&<>"]/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c]));
const colorOf=n=>n.fm.accent||FOLDER_COLORS[n.top]||"#8A93AD";
let NOTES=[],byName=new Map(),cur=null,hist=[],hpos=-1;
const checks=store.get("vault.checks",{});

// ---------- index (re-run whenever an agent adds or extends a note)
function indexAll(){
  byName=new Map();NOTES.forEach((n,i)=>{n.id=i;n.top=(n.folder||"").split("/")[0]||"Root";byName.set(n.name,n)});
  NOTES.forEach(n=>{n.out=new Set();(n.body.match(/\[\[([^\]|#]+)/g)||[]).forEach(m=>{const t=byName.get(m.slice(2));if(t&&t!==n)n.out.add(t.id)});n.back=new Set();n.tags=new Set(n.fm.tags||[]);(n.body.match(/(^|\s)#([a-z][\w\-/]*)/gi)||[]).forEach(t=>n.tags.add(t.trim().slice(1)))});
  NOTES.forEach(n=>n.out.forEach(o=>NOTES[o].back.add(n.id)));
}
function rebuildNotes(){
  const day=Date.now()-864e5;
  NOTES=BASE.map(n=>({folder:n.folder,name:n.name,fm:n.fm||{},body:n.body,version:n.version,updated_at:n.updated_at,updated_by:n.updated_by,agentTouched:!!(n.updated_by&&n.updated_by!=="repo-sync"&&Date.parse(n.updated_at)>day)}));
  indexAll();
  $("#dlNotes").innerHTML=NOTES.map(n=>`<option value="${esc(n.name)}">`).join("");
  const lc=NOTES.reduce((a,n)=>a+n.out.size,0);$("#vstat").textContent=`${NOTES.length} notes · ${lc} links`;
}
// ---------- markdown
function inline(s){
  s=esc(s);
  s=s.replace(/`([^`]+)`/g,(m,c)=>`<code>${c}</code>`);
  s=s.replace(/\[\[([^\]|]+)(?:\|([^\]]+))?\]\]/g,(m,t,a)=>{const n=byName.get(t);return `<a class="wl${n?"":" unres"}" data-n="${esc(t)}">${a||t}</a>`});
  s=s.replace(/\[([^\]]+)\]\((https?:[^)\s]+)\)/g,(m,t,u)=>`<a class="ext" href="${u}" target="_blank" rel="noopener">${t}</a>`);
  s=s.replace(/~~([^~]+)~~/g,"<del>$1</del>");
  s=s.replace(/\*\*([^*]+)\*\*/g,"<b>$1</b>").replace(/(^|[^*])\*([^*\s][^*]*)\*/g,"$1<i>$2</i>");
  s=s.replace(/(^|\s)#([a-z][\w\-/]*)/gi,(m,p,t)=>`${p}<a class="tag" data-tag="${t}">#${t}</a>`);
  return s;
}
let taskIdx=0;
function md(src,note){
  taskIdx=0;const lines=src.split("\n");let h="",i=0;
  const listBlock=(ordered)=>{let out=ordered?"<ol>":"<ul>";while(i<lines.length&&(ordered?/^\d+\.\s/.test(lines[i]):/^\s*[-*]\s/.test(lines[i]))){let l=lines[i].replace(ordered?/^\d+\.\s/:/^\s*[-*]\s/,"");const m=l.match(/^\[( |x)\]\s(.*)/);if(m){const key=note.id+":"+(taskIdx++);const done=key in checks?checks[key]:m[1]==="x";out+=`<li class="task${done?" done":""}"><input type="checkbox" data-k="${key}" ${done?"checked":""} aria-label="Task"><span>${inline(m[2])}</span></li>`}else out+=`<li>${inline(l)}</li>`;i++}return out+(ordered?"</ol>":"</ul>")};
  while(i<lines.length){const l=lines[i];
    if(!l.trim()){i++;continue}
    if(/^```/.test(l)){const buf=[];i++;while(i<lines.length&&!/^```/.test(lines[i])){buf.push(lines[i]);i++}i++;h+=`<div class="code"><button class="cp" type="button">Copy</button><pre><code>${esc(buf.join("\n"))}</code></pre></div>`;continue}
    let m;
    if(m=l.match(/^(#{1,3})\s(.*)/)){const lv=m[1].length;h+=`<h${lv} id="h${i}">${inline(m[2])}</h${lv}>`;i++;continue}
    if(/^---+$/.test(l)){h+="<hr>";i++;continue}
    if(l.startsWith(">")){const block=[];while(i<lines.length&&lines[i].startsWith(">")){block.push(lines[i].replace(/^>\s?/,""));i++}
      const c=block[0].match(/^\[!(\w+)\]\s*(.*)/);
      if(c){h+=`<div class="callout ${c[1].toLowerCase()}"><div class="ct">${inline(c[2]||c[1])}</div>${block.slice(1).map(b=>`<p>${inline(b)}</p>`).join("")}</div>`}
      else h+=`<blockquote>${block.map(b=>`<p>${inline(b)}</p>`).join("")}</blockquote>`;continue}
    if(l.startsWith("|")){const rows=[];while(i<lines.length&&lines[i].startsWith("|")){rows.push(lines[i]);i++}
      const cells=r=>r.replace(/^\||\|$/g,"").split("|").map(c=>c.trim());
      let t="<div class='tw'><table><thead><tr>"+cells(rows[0]).map(c=>`<th>${inline(c)}</th>`).join("")+"</tr></thead><tbody>";
      rows.slice(2).forEach(r=>t+="<tr>"+cells(r).map(c=>`<td>${inline(c)}</td>`).join("")+"</tr>");h+=t+"</tbody></table></div>";continue}
    if(/^\s*[-*]\s/.test(l)){h+=listBlock(false);continue}
    if(/^\d+\.\s/.test(l)){h+=listBlock(true);continue}
    const para=[];while(i<lines.length&&lines[i].trim()&&!/^(#{1,3}\s|>|\||\s*[-*]\s|\d+\.\s|---|```)/.test(lines[i])){para.push(lines[i]);i++}
    h+=`<p>${inline(para.join(" "))}</p>`;
  }
  return h;
}
function props(n){
  const fm=n.fm;let h="<dl class='props'>";
  for(const [k,v] of Object.entries(fm)){if(k==="owner")continue;
    let val;if(k==="tags")val=(v||[]).map(t=>`<a class="tag" data-tag="${t}">#${t}</a>`).join(" ");
    else if(k==="status")val=`<span class="chip ${v}">${v}</span>`;
    else if(k==="accent")val=`<span class="chip" style="color:${v};border-color:${v}">${v}</span>`;
    else val=esc(String(v));
    h+=`<dt>${k}</dt><dd>${val}</dd>`}
  if(n.updated_by){h+=`<dt>last edit</dt><dd>${esc(n.updated_by)} · ${esc(ago(n.updated_at))} · v${n.version||1}</dd>`}
  return h+"</dl>";
}
function ago(ts){const d=Date.parse(ts);if(!d)return"";const s=(Date.now()-d)/1000;if(s<45)return"just now";if(s<3600)return Math.round(s/60)+"m ago";if(s<86400)return Math.round(s/3600)+"h ago";return new Date(d).toLocaleDateString()}

// ---------- explorer
const DEFAULT_CLOSED={"02 - ZenFlow/Agents":1,"05 - Operations/n8n":1,"03 - Products":1,"11 - Physical AI":1,"09 - Projects/MVP Build Guide":1,"02 - ZenFlow/Synergy Nodes":1,"02 - ZenFlow/God Prompts":1,"05 - Operations/Knowledge Graphs":1,"05 - Operations/MCP Servers":1,"09 - Projects/Mega Campus":1,"09 - Projects/Apps":1,"09 - Projects/Games":1};
function buildTree(filter){
  const root={kids:{},files:[]};
  NOTES.forEach(n=>{if(filter&&!n.name.toLowerCase().includes(filter))return;let node=root;if(n.folder)n.folder.split("/").forEach(p=>{node=node.kids[p]=node.kids[p]||{kids:{},files:[]}});node.files.push(n)});
  const closed=store.get("vault.closed",DEFAULT_CLOSED);
  const count=nd=>nd.files.length+Object.values(nd.kids).reduce((a,k)=>a+count(k),0);
  const render=(nd,path)=>{let h="";Object.keys(nd.kids).sort().forEach(k=>{const p=path?path+"/"+k:k;const c=nd.kids[k];h+=`<div class="fold${closed[p]&&!filter?" closed":""}" data-p="${esc(p)}"><button><svg class="chev" viewBox="0 0 10 10"><path d="M2 3l3 3 3-3" stroke="currentColor" fill="none" stroke-width="1.5"/></svg><span>${esc(k)}</span><span class="ct">${count(c)}</span></button><div class="kids">${render(c,p)}</div></div>`});
    nd.files.sort((a,b)=>a.name.localeCompare(b.name,undefined,{numeric:true})).forEach(f=>{h+=`<button class="file${cur&&cur.id===f.id?" on":""}" data-id="${f.id}"><i class="dot" style="background:${colorOf(f)}"></i><span>${esc(f.name)}</span></button>`});return h};
  $("#tree").innerHTML=render(root,"");
}
$("#tree").addEventListener("click",e=>{const f=e.target.closest(".file");if(f){open(NOTES[+f.dataset.id]);if(innerWidth<760)$("#side").classList.remove("open");return}
  const fb=e.target.closest(".fold>button");if(fb){const fold=fb.parentElement;fold.classList.toggle("closed");const c=store.get("vault.closed",DEFAULT_CLOSED);if(fold.classList.contains("closed"))c[fold.dataset.p]=1;else delete c[fold.dataset.p];store.set("vault.closed",c)}});
$("#filter").addEventListener("input",e=>buildTree(e.target.value.trim().toLowerCase()));

// ---------- home note
function home(){
  const divs=NOTES.filter(n=>n.fm.type==="division").sort((a,b)=>a.fm.division_no-b.fm.division_no);
  const cnt=s=>divs.filter(d=>d.fm.status===s).length;
  const tasks=[];NOTES.forEach(n=>{let k=0;n.body.split("\n").forEach(l=>{const m=l.match(/^\s*[-*]\s\[( |x)\]\s(.*)/);if(m){const key=n.id+":"+(k++);const done=key in checks?checks[key]:m[1]==="x";if(!done)tasks.push({n,key,text:m[2]})}})});
  const pri=tasks.filter(t=>/^(Daily|06 - Finance|09 - Projects|09 - Projects\/Clients)$/.test(t.n.folder)||t.n.fm.status==="blocked").slice(0,12);
  const mocs=NOTES.filter(n=>n.fm.type==="moc"&&n.name!=="000 — Collective AI Knowledge Base");
  const recent=NOTES.filter(n=>["project","client"].includes(n.fm.type)).slice(0,10);
  const tagCount={};NOTES.forEach(n=>n.tags.forEach(t=>tagCount[t]=(tagCount[t]||0)+1));
  const topTags=Object.entries(tagCount).sort((a,b)=>b[1]-a[1]).slice(0,22);
  return `<div class="hero"><div class="date">Sunday · Oct 4, 2026</div><h1>Collective AI Vault</h1><p>Architecting a Humane Future. Second brain for John-Ross Moyler (Hataalii).</p></div>
  <div class="stats"><div class="stat"><b>${NOTES.length}</b><span>notes</span></div><div class="stat"><b>${cnt("operating")}/${divs.length}</b><span>divisions operating</span></div><div class="stat"><b>${NOTES.filter(n=>n.fm.type==="agent-blueprint").length}</b><span>agent blueprints</span></div><div class="stat"><b>${tasks.length}</b><span>open checklist items</span></div></div>
  <div class="mocs">${mocs.map(m=>`<button class="moc" data-id="${m.id}"><b>${esc(m.name.replace(/^\d+ — /,"").replace(" MOC",""))}</b><small>${m.out.size} notes</small></button>`).join("")}</div>
  <h2>Divisions</h2>
  <div class="divgrid">${divs.map(d=>`<button class="dv" data-id="${d.id}"><i style="background:${d.fm.accent||"transparent"}"></i><span>${esc(d.name.replace(" Division",""))}</span><em class="${d.fm.status}">${d.fm.status.slice(0,4)}</em></button>`).join("")}</div>
  <div class="card"><h3>Needs you</h3><ul class="tasklist">${pri.map(t=>`<li><input type="checkbox" data-k="${t.key}" aria-label="Done"><span>${inline(t.text)}</span><span class="src" data-id="${t.n.id}">${esc(t.n.name)}</span></li>`).join("")}</ul></div>
  <div class="card"><h3>Projects and clients</h3><ul class="tasklist">${recent.map(r=>`<li><a class="wl" data-n="${esc(r.name)}">${esc(r.name)}</a><span class="src" style="cursor:default"><span class="chip ${r.fm.status}">${r.fm.status}</span></span></li>`).join("")}</ul></div>
  <h2>Tags</h2><div class="taglist">${topTags.map(([t,c])=>`<a class="tag" data-tag="${t}">#${t} ${c}</a>`).join("")}</div>
  <h2>Today</h2><p><a class="wl" data-n="2026-10-04">Open today's daily note</a> · <a class="wl" data-n="000 — Collective AI Knowledge Base">Knowledge Base root</a> · <a class="wl" data-n="Collective AI — Company Charter">Company Charter</a></p>`;
}

// ---------- reader sheet
const sheet={open:false,full:false,view:"note",ntab:"note",atab:"floor"};
function snippet(src,target){const ln=src.body.split("\n").find(l=>l.includes("[["+target))||"";return ln.replace(/\[( |x)\]/g,"").replace(/\[\[([^\]|]+)(\|[^\]]+)?\]\]/g,"$1").replace(/[#>*|`-]/g," ").trim().slice(0,90)}
function renderSheet(){
  const sb=$("#sbody"),tabs=$("#stabs");
  const T=sheet.view==="note"?[["note","Note"],["links","Links"],["outline","Outline"],["history","History"]]:[["floor","Floor"],["board","Board"],["activity","Activity"],["desk","Desk"],["connect","Connect"]];
  const act=sheet.view==="note"?sheet.ntab:sheet.atab;
  tabs.innerHTML=T.map(([k,l])=>`<button data-st="${k}" class="${k===act?"on":""}">${l}</button>`).join("");
  $("#crumb2").innerHTML=sheet.view==="note"&&cur?(cur.folder?esc(cur.folder)+" / ":"")+"<b>"+esc(cur.name)+"</b>":"<b>Live</b> · agents, tasks, desk";
  $("#sBack").disabled=hpos<=0;$("#sFwd").disabled=hpos>=hist.length-1;
  if(sheet.view==="agents"){sb.innerHTML=`<div class="pane">${Live.render(sheet.atab)}</div>`;Live.bind(sb);return}
  const n=cur;if(!n){sb.innerHTML="";return}
  if(sheet.ntab==="note"){sb.innerHTML=`<article class="doc" id="doc">${n.body.trim()==="{{HOME}}"?home():props(n)+md(n.body,n)}</article>`}
  else if(sheet.ntab==="links"){
    const back=[...n.back].map(i=>NOTES[i]),out=[...n.out].map(i=>NOTES[i]);
    const unl=NOTES.filter(x=>x!==n&&!n.back.has(x.id)&&n.name.length>4&&x.body.includes(n.name)&&!x.body.includes("[["+n.name)).slice(0,6);
    const bl=x=>`<button class="bl" data-id="${x.id}"><b>${esc(x.name)}</b><small>${esc(x.folder||"/")}</small></button>`;
    sb.innerHTML=`<div class="pane"><div class="sec"><h4>Links out <span>${out.length}</span></h4>${out.map(bl).join("")||"<p class='note-s'>No outgoing links.</p>"}</div>
    <div class="sec"><h4>Links in <span>${back.length}</span></h4>${back.map(x=>`<button class="bl" data-id="${x.id}"><b>${esc(x.name)}</b><small>${esc(snippet(x,n.name))}</small></button>`).join("")||"<p class='note-s'>No notes link here yet.</p>"}</div>
    ${unl.length?`<div class="sec"><h4>Unlinked mentions <span>${unl.length}</span></h4>${unl.map(bl).join("")}</div>`:""}</div>`;
  }else if(sheet.ntab==="outline"){
    const hs=[];n.body.split("\n").forEach((l,i)=>{const m=l.match(/^(#{1,3})\s(.*)/);if(m)hs.push([m[1].length,i,m[2]])});
    sb.innerHTML=`<div class="pane"><div class="sec ol"><h4>Outline</h4>${hs.map(([lv,i,t])=>`<a data-h="h${i}" style="padding-left:${(lv-1)*12}px">${esc(t.replace(/\[\[|\]\]/g,""))}</a>`).join("")||"<p class='note-s'>No headings.</p>"}</div></div>`;
  }else if(sheet.ntab==="history"){
    sb.innerHTML=`<div class="pane"><div class="sec"><h4>Edits</h4><div id="histList"><p class="note-s">Loading…</p></div></div><div class="sec"><h4>Tags</h4><div class="taglist">${[...n.tags].map(t=>`<a class="tag" data-tag="${t}">#${t}</a>`).join("")||"—"}</div></div></div>`;
    Live.history(n.name).then(rows=>{const el=$("#histList");if(!el)return;el.innerHTML=(rows||[]).length?rows.map(r=>`<div class="act"><time>${esc(ago(r.edited_at))}</time><div><b>${esc(r.edited_by||"unknown")}</b> <span>replaced v${r.version}</span></div></div>`).join(""):"<p class='note-s'>No edits since the vault went live.</p>"});
  }else{
    const tc={};NOTES.forEach(x=>x.tags.forEach(t=>tc[t]=(tc[t]||0)+1));
    sb.innerHTML=`<div class="pane"><div class="sec"><h4>This note</h4><div class="taglist">${[...n.tags].map(t=>`<a class="tag" data-tag="${t}">#${t}</a>`).join("")||"—"}</div></div><div class="sec"><h4>All tags <span>${Object.keys(tc).length}</span></h4><div class="taglist">${Object.entries(tc).sort((a,b)=>b[1]-a[1]).map(([t,c])=>`<a class="tag" data-tag="${t}">#${t} ${c}</a>`).join("")}</div></div></div>`;
  }
  sb.scrollTop=0;
}
function syncSheet(){
  const s=$("#sheet");s.classList.toggle("open",sheet.open);s.classList.toggle("full",sheet.open&&sheet.full);
  $("#rbAgents").classList.toggle("on",sheet.open&&sheet.view==="agents");
  Campus.shift(sheet.open&&!sheet.full?s:null);Campus.pause(sheet.open&&sheet.full&&innerWidth>760);
}
function openSheet(view){if(view)sheet.view=view;sheet.open=true;renderSheet();syncSheet()}
function closeSheet(){sheet.open=false;sheet.full=false;syncSheet()}
$("#sClose").onclick=closeSheet;
$("#sFull").onclick=()=>{sheet.full=!sheet.full;syncSheet()};
$("#stabs").addEventListener("click",e=>{const b=e.target.closest("button[data-st]");if(!b)return;if(sheet.view==="note")sheet.ntab=b.dataset.st;else sheet.atab=b.dataset.st;renderSheet()});

// ---------- open a note: read it and fly to it
function open(n,push=true){
  if(!n)return;cur=n;
  if(push){hist=hist.slice(0,hpos+1);hist.push(n.id);hpos=hist.length-1}
  sheet.view="note";sheet.ntab="note";
  $("#back").disabled=$("#sBack").disabled=hpos<=0;$("#fwd").disabled=$("#sFwd").disabled=hpos>=hist.length-1;
  document.querySelectorAll(".file.on").forEach(f=>f.classList.remove("on"));
  const fe=document.querySelector(`.file[data-id="${n.id}"]`);if(fe){fe.classList.add("on");let p=fe.parentElement;while(p&&p.id!=="tree"){if(p.classList.contains("fold"))p.classList.remove("closed");p=p.parentElement}fe.scrollIntoView({block:"nearest"})}
  store.set("vault.last",n.name);
  Campus.focus(n);$("#plate").hidden=true;
  openSheet("note");updateCrumb();
}
function updateCrumb(){const n=cur;$("#crumb").innerHTML=n?"Campus › "+(n.folder?esc(n.folder.replace(/\//g," › "))+" › ":"")+"<b>"+esc(n.name)+"</b>":"Campus";}
function goBack(){if(hpos>0){hpos--;open(NOTES[hist[hpos]],false)}}
function goFwd(){if(hpos<hist.length-1){hpos++;open(NOTES[hist[hpos]],false)}}
$("#back").onclick=$("#sBack").onclick=goBack;$("#fwd").onclick=$("#sFwd").onclick=goFwd;

// ---------- clicks, checks, copy
document.addEventListener("click",e=>{
  const w=e.target.closest("a.wl");if(w){e.preventDefault();const n=byName.get(w.dataset.n);if(n)open(n);else toast("That note doesn't exist yet");closeModal();return}
  const t=e.target.closest("a.tag");if(t){e.preventDefault();openSwitcher("#"+t.dataset.tag);return}
  const hh=e.target.closest("[data-h]");if(hh){sheet.ntab="note";renderSheet();document.getElementById(hh.dataset.h)?.scrollIntoView({behavior:"smooth"});return}
  const id=e.target.closest("#sheet [data-id],#stage [data-id]");if(id&&!e.target.matches("input")){open(NOTES[+id.dataset.id]);return}
});
document.addEventListener("click",e=>{const b=e.target.closest(".cp");if(!b)return;const code=b.parentElement.querySelector("code");const done=()=>{b.textContent="Copied";setTimeout(()=>b.textContent="Copy",1400)};if(navigator.clipboard)navigator.clipboard.writeText(code.textContent).then(done,()=>{const r=document.createRange();r.selectNodeContents(code);const sel=getSelection();sel.removeAllRanges();sel.addRange(r);b.textContent="Selected"});});
document.addEventListener("change",e=>{if(e.target.matches("input[data-k]")){checks[e.target.dataset.k]=e.target.checked;store.set("vault.checks",checks);const li=e.target.closest("li.task");if(li)li.classList.toggle("done",e.target.checked);toast(e.target.checked?"Marked done":"Reopened")}});
function toast(m){const t=document.createElement("div");t.className="toast";t.textContent=m;document.body.appendChild(t);setTimeout(()=>t.remove(),1800)}

// ---------- quick switcher
let swSel=0,swRes=[];
function openSwitcher(q=""){$("#modal").hidden=false;const i=$("#swq");i.value=q;runSearch();setTimeout(()=>i.focus(),10)}
function closeModal(){$("#modal").hidden=true}
function runSearch(){
  const q=$("#swq").value.trim().toLowerCase();let res;
  if(q.startsWith("#")){const tg=q.slice(1);res=NOTES.filter(n=>[...n.tags].some(t=>t.toLowerCase().startsWith(tg))).map(n=>({n,s:1,ex:"#"+[...n.tags].join(" #")}))}
  else if(!q){res=NOTES.filter(n=>n.fm.type==="moc"||n.fm.type==="home").map(n=>({n,s:1}))}
  else res=NOTES.map(n=>{const nm=n.name.toLowerCase();let s=0;if(nm===q)s=100;else if(nm.startsWith(q))s=60;else if(nm.includes(q))s=40;else{let j=0;for(const c of nm)if(c===q[j])j++;if(j===q.length)s=15}
    let ex="";const bi=n.body.toLowerCase().indexOf(q);if(bi>=0){s+=8;ex=n.body.slice(Math.max(0,bi-30),bi+60).replace(/\n/g," ")}return {n,s,ex}}).filter(r=>r.s>0).sort((a,b)=>b.s-a.s);
  swRes=res.slice(0,40);swSel=0;drawSw(q);
}
function hl(s,q){if(!q||q.startsWith("#"))return esc(s);const i=s.toLowerCase().indexOf(q);return i<0?esc(s):esc(s.slice(0,i))+"<mark>"+esc(s.slice(i,i+q.length))+"</mark>"+esc(s.slice(i+q.length))}
function drawSw(q){$("#swl").innerHTML=swRes.map((r,i)=>`<li class="${i===swSel?"on":""}" data-i="${i}"><b>${hl(r.n.name,q)}</b><small>${esc(r.n.folder||"/")}</small>${r.ex?`<em>${hl(r.ex.replace(/\[\[|\]\]/g,""),q)}</em>`:""}</li>`).join("")||"<li style='color:var(--faint)'>No matches</li>"}
$("#swq").addEventListener("input",runSearch);
$("#swq").addEventListener("keydown",e=>{const q=$("#swq").value.trim().toLowerCase();if(e.key==="ArrowDown"){swSel=Math.min(swSel+1,swRes.length-1);drawSw(q);e.preventDefault()}else if(e.key==="ArrowUp"){swSel=Math.max(swSel-1,0);drawSw(q);e.preventDefault()}else if(e.key==="Enter"&&swRes[swSel]){open(swRes[swSel].n);closeModal()}else if(e.key==="Escape")closeModal()});
$("#swl").addEventListener("click",e=>{const li=e.target.closest("li[data-i]");if(li){open(swRes[+li.dataset.i].n);closeModal()}});
$("#modal").addEventListener("click",e=>{if(e.target.id==="modal")closeModal()});

// ---------- ribbon and keys
$("#rbCampus").onclick=()=>{closeSheet();Campus.overview()};
$("#rbSwitch").onclick=()=>openSwitcher();
$("#rbTree").onclick=()=>{$("#side").classList.toggle("open");$("#rbTree").classList.toggle("on",$("#side").classList.contains("open"))};
$("#rbHome").onclick=()=>open(byName.get("🏠 Home"));
$("#rbToday").onclick=()=>open(byName.get("2026-10-04"));
$("#rbRandom").onclick=()=>open(NOTES[Math.floor(Math.random()*NOTES.length)]);
$("#rbAgents").onclick=()=>{if(sheet.open&&sheet.view==="agents")closeSheet();else openSheet("agents")};
$("#rbWalk").onclick=()=>Campus.toggleWalk();
$("#rbTime").onclick=()=>Campus.cycleTime();
$("#plateX").onclick=()=>$("#plate").hidden=true;
$("#plateHome").onclick=()=>open(byName.get("🏠 Home"));
$("#plateWalk").onclick=()=>{$("#plate").hidden=true;Campus.toggleWalk(true)};
document.addEventListener("keydown",e=>{
  const typing=/^(INPUT|TEXTAREA|SELECT)$/.test(document.activeElement?.tagName||"");
  if((e.metaKey||e.ctrlKey)&&e.key.toLowerCase()==="k"){e.preventDefault();openSwitcher();return}
  if(e.key==="Escape"){if(!$("#modal").hidden)closeModal();else if($("#side").classList.contains("open")){$("#side").classList.remove("open");$("#rbTree").classList.remove("on")}else if(sheet.open)closeSheet();else Campus.clear();return}
  if(typing)return;
  if(e.altKey&&e.key==="ArrowLeft")goBack();else if(e.altKey&&e.key==="ArrowRight")goFwd();
  else if(e.key==="/"){e.preventDefault();openSwitcher()}
});
