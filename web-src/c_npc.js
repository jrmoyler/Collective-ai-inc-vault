// =====================================================================
// Guides: one Warden per district. A Member-form Sentinel stands on a free plaza cell near the
// district center, greets when the camera comes close, and answers questions about that district
// from data already in the page (NOTES, the layout, Live.snapshot()). No network, no model call.
// Guides are not agents: they never go through Campus.setAgents and carry no presence row.
// =====================================================================
const Guides=(()=>{
  const BOUNTY={high:120,medium:80,low:50},NEAR=60,WEEK=7*864e5;
  let G=[],lastDist=null,curTop=null,booted=false,memo=new Map();
  const two=name=>{const w=String(name).replace(/[^A-Za-z ]/g," ").trim().split(/\s+/).filter(Boolean);return (w.length>=2?w[0][0]+w[1][0]:(w[0]||"GD").slice(0,2)).toUpperCase()};
  const wrap=a=>((a+Math.PI)%(2*Math.PI)+2*Math.PI)%(2*Math.PI)-Math.PI;
  const district=top=>Campus.districts().find(d=>d.top===top)||null;
  const notesIn=top=>NOTES.filter(n=>n.top===top);
  const inDistrict=(top,name)=>{const n=name&&byName.get(name);return !!n&&n.top===top};
  const clean=s=>String(s).replace(/\[\[([^\]|]+)(\|[^\]]+)?\]\]/g,"$1").replace(/[#>*|`_]/g," ").replace(/\s+/g," ").trim();
  const link=n=>`<a class="wl" data-n="${esc(n.name)}">${esc(n.name)}</a>`;
  const snap=()=>{try{return Live.snapshot()}catch(e){return {tasks:[],acts:[],agents:[],presence:[],stats:[]}}};
  const agentName=id=>snap().agents.find(a=>a.id===id)?.name||id;

  // ---- placement: the free NAV cell nearest the district center, inside the district, with free neighbors.
  // NAV.blocked already pads every building footprint by 1.1 units, so a free cell is street or plaza.
  function spot(d){
    const {NAV}=Campus.world(),c=NAV.cell,n=NAV.n,bl=NAV.blocked;
    const cx=d.x+d.w/2,cz=d.z+d.d/2;
    if(!bl||!n)return {x:cx,z:cz};
    const free=(x,z)=>x>=0&&z>=0&&x<n&&z<n&&!bl[z*n+x];
    const roomy=(x,z)=>{for(let dz=-1;dz<=1;dz++)for(let dx=-1;dx<=1;dx++)if(!free(x+dx,z+dz))return false;return true};
    const inside=(x,z)=>{const wx=NAV.ox+(x+.5)*c,wz=NAV.oz+(z+.5)*c;return wx>d.x+1&&wx<d.x+d.w-1&&wz>d.z+1&&wz<d.z+d.d-1};
    const gx=Math.floor((cx-NAV.ox)/c),gz=Math.floor((cz-NAV.oz)/c);
    let fallback=null;
    for(let r=0;r<60;r++)for(let dz=-r;dz<=r;dz++)for(let dx=-r;dx<=r;dx++){
      if(Math.max(Math.abs(dx),Math.abs(dz))!==r)continue;const x=gx+dx,z=gz+dz;
      if(!free(x,z)||!inside(x,z))continue;
      if(roomy(x,z))return {x:NAV.ox+(x+.5)*c,z:NAV.oz+(z+.5)*c};
      if(!fallback)fallback={x:NAV.ox+(x+.5)*c,z:NAV.oz+(z+.5)*c};
    }
    return fallback||{x:cx,z:cz};
  }
  function place(){
    const scene=Campus.scene();
    G.forEach(g=>{SentinelMesh.dispose(g.m.grp);scene.remove(g.m.grp)});G=[];
    lastDist=Campus.districts();
    lastDist.forEach(d=>{
      const p=spot(d),m=SentinelMesh.create({id:"guide:"+d.top,form:"member",palette:["#0B1020",d.color,"#F4EFE6"],symbol:two(d.name),level:0});
      m.pos.set(p.x,0,p.z);m.grp.position.copy(m.pos);m.grp.rotation.y=Math.atan2(d.x+d.w/2-p.x,d.z+d.d/2-p.z)+Math.PI;m.ring.scale.setScalar(2.2);
      scene.add(m.grp);
      G.push({top:d.top,name:d.name,color:d.color,x:p.x,z:p.z,m,near:false,home:m.grp.rotation.y});
    });
  }

  // ---- per frame: idle pose, turn and greet when the camera target comes close, labels
  function frame(dt,time){
    if(Campus.districts()!==lastDist)place();
    if(!G.length)return false;
    const cam=Campus.camera(),cp=cam.position,tgt=Campus.position();
    const L=Campus.labelCands;for(let i=L.length-1;i>=0;i--)if(L[i].cls==="guide")L.splice(i,1);
    let live=false;
    G.forEach(g=>{
      const m=g.m,dCam=Math.hypot(cp.x-g.x,cp.z-g.z),dT=Math.hypot(tgt.x-g.x,tgt.z-g.z),near=Math.min(dCam,dT)<NEAR;
      if(near&&!g.near)SentinelMesh.emote(m,"greet",time);
      g.near=near;
      const want=near?Math.atan2(cp.x-g.x,cp.z-g.z):g.home;
      m.grp.rotation.y+=wrap(want-m.grp.rotation.y)*Math.min(1,dt*(near?6:2));
      if(dCam<520){SentinelMesh.pose(m,time,"idle");live=true}
      if(dCam<900)L.push({x:g.x,y:7.4,z:g.z,t:"Guide · "+g.name,s:"click to ask",cls:"guide",prio:105,c:g.color});
    });
    return live;
  }
  function picker(rc){
    if(!G.length)return false;
    const hits=rc.intersectObjects(G.map(g=>g.m.grp),true);if(!hits.length)return false;
    let o=hits[0].object,g=null;while(o&&!g){g=G.find(x=>x.m.grp===o)||null;o=o.parent}
    if(!g)return false;
    openFor(g.top,true);return true;
  }
  function openFor(top,fly=true){
    const g=G.find(x=>x.top===top),d=district(top);if(!d)return false;
    curTop=top;
    // target a step in front of the guide, toward the viewer, so the viewer's own Sentinel stands facing it rather than on it
    if(fly&&g){const cp=Campus.camera().position,dx=cp.x-g.x,dz=cp.z-g.z,l=Math.hypot(dx,dz)||1;Campus.flyAt(g.x+dx/l*5,g.z+dz/l*5,2,28,.3)}
    sheet.view="guide";sheet.gtab=sheet.gtab||"ask";openSheet("guide");
    return true;
  }
  function boot(){
    if(booted||!Campus.ok())return;booted=true;
    place();Campus.onFrame(frame);Campus.addPicker(picker);
  }

  // ---- answers. Every answer is computed from loaded data; nothing is guessed.
  const CHIPS=["What is this district","What's new","Who is working here","Open tasks"];
  function overview(top,d){
    const ns=notesIn(top),mocs=ns.filter(n=>n.fm.type==="moc"),types={};ns.forEach(n=>{const t=n.fm.type||"untyped";types[t]=(types[t]||0)+1});
    const rows=Object.entries(types).sort((a,b)=>b[1]-a[1]);
    const blocks=new Set(ns.map(n=>(n.folder||"").split("/")[1]||"·"));
    return `<p>${ns.length} notes in ${blocks.size} block${blocks.size===1?"":"s"}. ${mocs.length?`Maps of content: ${mocs.map(link).join(", ")}.`:"No MOC lives in this district."}</p>
    <div class="tw"><table><thead><tr><th>Type</th><th>Notes</th></tr></thead><tbody>${rows.map(([t,c])=>`<tr><td>${esc(t)}</td><td>${c}</td></tr>`).join("")}</tbody></table></div>`;
  }
  function whatsNew(top){
    const now=Date.now(),ns=notesIn(top).filter(n=>n.updated_at&&now-Date.parse(n.updated_at)<WEEK).sort((a,b)=>Date.parse(b.updated_at)-Date.parse(a.updated_at));
    if(!ns.length)return "<p>Nothing in this district changed in the last 7 days.</p>";
    return `<p>${ns.length} note${ns.length===1?"":"s"} changed in the last 7 days.</p>${ns.slice(0,8).map(n=>`<button class="bl" data-n="${esc(n.name)}"><b>${esc(n.name)}</b><small>${esc(ago(n.updated_at))}${n.updated_by?" · "+esc(n.updated_by):""}</small></button>`).join("")}`;
  }
  function whoHere(top){
    const S=snap(),live=S.presence.filter(p=>p.status!=="offline"&&Date.now()-Date.parse(p.last_seen)<15*60e3&&inDistrict(top,p.note));
    if(!live.length)return "<p>No agent is standing in this district right now.</p>";
    return live.map(p=>`<button class="bl" data-n="${esc(p.note)}"><b>${esc(agentName(p.agent))} · ${esc(p.status)}</b><small>${esc(p.note)}${p.task?" · "+esc(p.task):""}${p.detail?" · "+esc(p.detail):""}</small></button>`).join("");
  }
  function openTasks(top){
    const ts=snap().tasks.filter(t=>t.status!=="done"&&inDistrict(top,t.note)).sort((a,b)=>(BOUNTY[b.priority]||80)-(BOUNTY[a.priority]||80));
    if(!ts.length)return "<p>No open task points at a note in this district.</p>";
    return ts.map(t=>`<button class="bl" data-n="${esc(t.note)}"><b>${esc(t.title||t.id)} <em class="bounty">+${BOUNTY[t.priority]||80} XP</em></b><small>${esc(t.id)} · ${esc(t.status)}${t.agent?" · "+esc(agentName(t.agent)):""} · ${esc(t.note)}</small></button>`).join("");
  }
  function best(top,q){
    const ql=q.toLowerCase().trim(),terms=ql.split(/[^a-z0-9]+/).filter(t=>t.length>2);
    const score=n=>{const nm=n.name.toLowerCase();let s=0;
      if(nm===ql)s+=100;else if(nm.startsWith(ql))s+=70;else if(nm.includes(ql))s+=50;
      terms.forEach(t=>{if(nm.includes(t))s+=18;if([...n.tags].some(x=>x.toLowerCase().includes(t)))s+=12});
      const body=n.body.toLowerCase();terms.forEach(t=>{let i=0,c=0;while((i=body.indexOf(t,i))>=0&&c<12){c++;i+=t.length}s+=Math.min(12,c)*1.5});
      return s};
    return notesIn(top).map(n=>({n,s:score(n)})).filter(r=>r.s>0).sort((a,b)=>b.s-a.s);
  }
  function snippetFor(n,q){
    const terms=q.toLowerCase().split(/[^a-z0-9]+/).filter(t=>t.length>2);
    const line=n.body.split("\n").find(l=>{const ll=l.toLowerCase();return !/^#/.test(l)&&terms.some(t=>ll.includes(t))})||n.body.split("\n").find(l=>l.trim()&&!/^#/.test(l))||"";
    return clean(line).slice(0,110);
  }
  function answer(top,q){
    const d=district(top);q=String(q||"").trim();if(!d||!q)return "";
    const ql=q.toLowerCase();
    let m;
    if(m=ql.match(/^(?:where(?:'s| is| are)?|find|take me to|go to|show me|fly to)\s+(.+?)\??$/)){
      const want=m[1].replace(/^(the|a)\s+/,"");const r=best(top,want)[0]||NOTES.map(n=>({n,s:n.name.toLowerCase().includes(want)?1:0})).find(r=>r.s);
      if(r){setTimeout(()=>open(r.n),60);return `<p>${esc(r.n.name)} is ${r.n.top===top?"in this district":"in "+esc(r.n.top)}. Flying there.</p>`}
      return `<p>I do not have a note called “${esc(want)}”. Try one of these.</p>`+chips();
    }
    if(/what(?:'s| is)? (?:this|the) (?:district|place|area)|about (?:this|the) district|what is here|what'?s here/.test(ql))return overview(top,d);
    if(/what'?s new|new here|recent|changed|updated|latest/.test(ql))return whatsNew(top);
    if(/who(?:'s| is)?\s*(?:working|here|around|standing)|anyone (?:here|working)|working here/.test(ql))return whoHere(top);
    if(/open tasks?|tasks?\b|commissions?|to-?do|work here|what needs doing/.test(ql))return openTasks(top);
    const rs=best(top,q).slice(0,5);
    if(!rs.length)return "<p>I do not have that. Try one of these.</p>"+chips();
    return `<p>${rs.length} note${rs.length===1?"":"s"} in this district match.</p>`+rs.map(r=>`<button class="bl" data-n="${esc(r.n.name)}"><b>${esc(r.n.name)}</b><small>${esc(snippetFor(r.n,q)||r.n.folder||"")}</small></button>`).join("");
  }
  const chips=()=>`<div class="taglist gchips">${CHIPS.map(c=>`<button class="chip gq" type="button" data-q="${esc(c)}">${esc(c)}</button>`).join("")}</div>`;

  // ---- tabs
  function askTab(top,d){
    const ns=notesIn(top),blocks=new Set(ns.map(n=>(n.folder||"").split("/")[1]||"·")),last=memo.get(top);
    return `<div class="callout agent" style="--c:${esc(d.color)}"><div class="ct">Warden of ${esc(d.name)}</div><p>${ns.length} notes stand here in ${blocks.size} block${blocks.size===1?"":"s"}. Ask where a note is, what changed this week, who is working here, or what is open. I answer from the vault as loaded; I do not guess.</p></div>
    <form class="sayrow" id="gAsk"><input maxlength="200" placeholder="Ask the Warden…" autocomplete="off" aria-label="Question for the guide" value="${esc(last?last.q:"")}"><button class="btn pri" type="submit">Ask</button></form>
    ${chips()}
    <div class="sec" id="gAns" style="margin-top:14px">${last?`<h4>${esc(last.q)}</h4>${last.a}`:""}</div>`;
  }
  function mapTab(top,d){
    const Bld=Campus.buildings(),ns=notesIn(top),groups=new Map();
    ns.forEach(n=>{const k=(n.folder||"").split("/")[1]||"·";groups.set(k,(groups.get(k)||0)+1)});
    const blocks=[...groups].sort((a,b)=>b[1]-a[1]);
    const tall=ns.filter(n=>Bld[n.id]).map(n=>({n,h:Bld[n.id].h,deg:n.out.size+n.back.size})).sort((a,b)=>b.h-a.h||b.deg-a.deg).slice(0,8);
    return `<div class="sec"><h4>Blocks <span>${blocks.length}</span></h4>${blocks.map(([k,c])=>`<div class="act"><time>${c}</time><div><b>${esc(k==="·"?d.top+" (root)":k)}</b></div></div>`).join("")}</div>
    <div class="sec"><h4>Landmarks <span>tallest ${tall.length}</span></h4>${tall.map(t=>`<button class="bl" data-n="${esc(t.n.name)}"><b>${esc(t.n.name)}</b><small>${Math.round(t.h)} m · ${t.deg} links${t.n.fm.type?" · "+esc(t.n.fm.type):""}</small></button>`).join("")||"<p class='note-s'>No buildings placed yet.</p>"}</div>
    <div class="sec"><button class="btn pri" id="gWalk" type="button">Walk me there</button> <span class="note-s">Centers the camera over ${esc(d.name)}.</span></div>`;
  }
  function workTab(top,d){
    const S=snap(),ts=S.tasks.filter(t=>(t.status==="open"||t.status==="claimed")&&inDistrict(top,t.note)).sort((a,b)=>(a.status>b.status?1:-1)||(BOUNTY[b.priority]||80)-(BOUNTY[a.priority]||80));
    const acts=S.acts.filter(a=>inDistrict(top,a.note)).slice(0,10);
    return `<div class="sec"><h4>Open and claimed <span>${ts.length}</span></h4>${ts.map(t=>`<button class="bl" data-n="${esc(t.note)}"><b>${esc(t.title||t.id)} <em class="bounty">+${BOUNTY[t.priority]||80} XP</em></b><small>${esc(t.id)} · ${esc(t.status)}${t.agent?" · "+esc(agentName(t.agent)):" · unassigned"} · ${esc(t.note)}</small></button>`).join("")||"<p class='note-s'>No open or claimed task points at this district.</p>"}</div>
    <div class="sec"><h4>Recent activity <span>${acts.length}</span></h4>${acts.map(a=>`<div class="act"><time>${esc(ago(a.ts))}</time><div><b>${esc(agentName(a.actor))}</b> <span>${esc(a.kind)}</span> ${esc(a.text||"")} <a class="wl" data-n="${esc(a.note)}">${esc(a.note)}</a></div></div>`).join("")||"<p class='note-s'>No recorded activity in this district.</p>"}</div>
    <div class="callout info"><div class="ct">Say to this district's workers</div><p>Floor chat lives in Live → Floor. Messages reach every agent on the floor, or one agent you pick. <a class="wl" id="gFloor">Open the floor</a>.</p></div>`;
  }
  function render(tab){
    const d=district(curTop);if(!d)return "<p class='note-s'>Pick a guide on the campus first.</p>";
    const head=`<div class="who"><i style="width:10px;height:10px;border-radius:2px;background:${esc(d.color)};display:inline-block"></i><span>${esc(d.top)} · ${notesIn(curTop).length} notes</span></div>`;
    return head+(tab==="map"?mapTab(curTop,d):tab==="work"?workTab(curTop,d):askTab(curTop,d));
  }
  function ask(root,q){
    const top=curTop;q=String(q||"").trim();if(!q)return;
    const a=answer(top,q);memo.set(top,{q,a});
    const el=root.querySelector("#gAns");if(el)el.innerHTML=`<h4>${esc(q)}</h4>${a}`;
  }
  function bind(root){
    const f=root.querySelector("#gAsk");if(f)f.onsubmit=e=>{e.preventDefault();ask(root,f.querySelector("input").value)};
    root.querySelectorAll(".gq").forEach(b=>b.onclick=()=>{const i=root.querySelector("#gAsk input");if(i)i.value=b.dataset.q;ask(root,b.dataset.q)});
    const w=root.querySelector("#gWalk");if(w)w.onclick=()=>{const d=district(curTop);if(d)Campus.flyAt(d.x+d.w/2,d.z+d.d/2,0,Math.max(d.w,d.d)*1.05+70,.72)};
    const fl=root.querySelector("#gFloor");if(fl)fl.onclick=e=>{e.preventDefault();sheet.atab="floor";openSheet("agents")};
    root.querySelectorAll(".bl[data-n]").forEach(b=>b.onclick=()=>{const n=byName.get(b.dataset.n);if(n)open(n)});
  }
  const list=()=>G.map(g=>({top:g.top,name:g.name,color:g.color,x:g.x,z:g.z}));
  const current=()=>district(curTop);
  return {boot,render,bind,answer,list,openFor,current,CHIPS};
})();
(function(){const t=setInterval(()=>{if(typeof Campus!=="undefined"&&Campus.ok()){clearInterval(t);Guides.boot()}},300)})();
