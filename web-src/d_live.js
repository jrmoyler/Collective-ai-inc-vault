// =====================================================================
// Live layer: Supabase Postgres + Realtime.
// Notes, tasks, activity and agent presence stream in as they change, so the team watches agents work.
// =====================================================================
const Live=(()=>{
  const CFG=window.VAULT_CONFIG;
  const sb=window.supabase.createClient(CFG.url,CFG.anonKey,{auth:{persistSession:true,autoRefreshToken:true,storageKey:"cv-vault-auth"},realtime:{params:{eventsPerSecond:20}}});
  let me=null,ch=null,tasks=[],acts=[],watchers=[],agents=new Map(),pres=new Map(),pending=new Set(),rebT=0,connected=false;
  const LIVE_WINDOW=15*60e3,ORDER=["claimed","review","blocked","open","done"],PRI={high:0,medium:1,low:2};
  const LIVE_ST=["working","writing","reading","thinking","reviewing","blocked"];
  const code=t=>`<div class="code"><button class="cp" type="button">Copy</button><pre><code>${esc(t)}</code></pre></div>`;
  const short=ts=>{const d=Date.parse(ts);if(!d)return"";const s=(Date.now()-d)/1000;if(s<60)return Math.max(1,Math.round(s))+"s";if(s<3600)return Math.round(s/60)+"m";if(s<86400)return Math.round(s/3600)+"h";return String(ts).slice(5,10)};
  const isLive=p=>p&&p.status!=="offline"&&Date.now()-Date.parse(p.last_seen)<LIVE_WINDOW;
  const agentName=id=>agents.get(id)?.name||id;

  async function session(){const {data}=await sb.auth.getSession();return data.session}
  async function member(){
    const {data:{user}}=await sb.auth.getUser();if(!user)return null;
    const {data}=await sb.from("team_members").select("display_name,role").eq("user_id",user.id).maybeSingle();
    me=data?{id:user.id,name:data.display_name,role:data.role}:null;return me;
  }
  async function join(name,passcode){
    const r=await fetch(CFG.url+"/functions/v1/team-join",{method:"POST",headers:{"content-type":"application/json",apikey:CFG.anonKey},body:JSON.stringify({name,passcode})});
    const j=await r.json().catch(()=>({}));if(!r.ok)throw new Error(j.error||"Sign-in failed");
    const {error}=await sb.auth.signInWithPassword({email:j.email,password:j.password});if(error)throw error;
    return member();
  }
  async function loadAll(){
    const rows=[];
    for(let from=0;;from+=1000){
      const {data,error}=await sb.from("notes").select("name,folder,fm,body,version,updated_at,updated_by").order("name").range(from,from+999);
      if(error)throw error;rows.push(...data);if(data.length<1000)break;
    }
    BASE=rows;
    const [a,p,t,ac]=await Promise.all([sb.from("agents").select("id,name,kind,color,active"),sb.from("presence").select("*"),sb.from("tasks").select("*"),sb.from("activity").select("*").order("ts",{ascending:false}).limit(60)]);
    (a.data||[]).forEach(x=>agents.set(x.id,x));(p.data||[]).forEach(x=>pres.set(x.agent,x));tasks=t.data||[];acts=ac.data||[];
    rebuildNotes();
  }

  // ---- realtime
  function subscribe(){
    ch=sb.channel("vault-live",{config:{presence:{key:me.id}}})
      .on("postgres_changes",{event:"*",schema:"public",table:"notes"},onNote)
      .on("postgres_changes",{event:"*",schema:"public",table:"tasks"},e=>{const r=e.new&&e.new.id?e.new:e.old;tasks=tasks.filter(x=>x.id!==r.id);if(e.eventType!=="DELETE")tasks.push(e.new);syncMarkers();refresh()})
      .on("postgres_changes",{event:"INSERT",schema:"public",table:"activity"},e=>{acts.unshift(e.new);acts=acts.slice(0,80);drawFloor();refresh()})
      .on("postgres_changes",{event:"*",schema:"public",table:"presence"},e=>{if(e.new&&e.new.agent){pres.set(e.new.agent,e.new);pushAgents();drawFloor();if(sheet.open&&sheet.view==="agents"&&sheet.atab==="floor")renderSheet()}})
      .on("presence",{event:"sync"},()=>{watchers=Object.values(ch.presenceState()).map(x=>x[0]&&x[0].name).filter(Boolean);drawFloor()})
      .subscribe(async st=>{connected=st==="SUBSCRIBED";if(connected){stopPolling();await ch.track({name:me.name,at:Date.now()})}else if(/ERROR|TIMED_OUT|CLOSED/.test(st))startPolling();drawFloor()});
    setTimeout(()=>{if(!connected)startPolling()},9000);
    setInterval(()=>{pushAgents();drawFloor()},10000);
  }
  // Fallback for networks that block websockets: the same view, refreshed every 8 seconds.
  let pollT=0;
  function startPolling(){if(pollT)return;pollT=setInterval(poll,8000);poll();drawFloor()}
  function stopPolling(){if(pollT){clearInterval(pollT);pollT=0}}
  async function poll(){
    try{
      const since=BASE.reduce((m,n)=>n.updated_at>m?n.updated_at:m,"1970-01-01T00:00:00Z"),lastId=acts.reduce((m,a)=>Math.max(m,a.id||0),0);
      const [n,p,t,a]=await Promise.all([sb.from("notes").select("name,folder,fm,body,version,updated_at,updated_by").gt("updated_at",since),sb.from("presence").select("*"),sb.from("tasks").select("*"),sb.from("activity").select("*").gt("id",lastId).order("id",{ascending:true})]);
      (n.data||[]).forEach(r=>onNote({eventType:"UPDATE",new:r}));
      (p.data||[]).forEach(r=>pres.set(r.agent,r));pushAgents();
      if(t.data){tasks=t.data;syncMarkers()}
      (a.data||[]).forEach(r=>acts.unshift(r));acts=acts.slice(0,80);
      drawFloor();refresh();
    }catch(e){console.warn("poll",e)}
  }
  function onNote(e){
    if(e.eventType==="DELETE"){BASE=BASE.filter(n=>n.name!==e.old.name)}
    else{const r=e.new,i=BASE.findIndex(n=>n.name===r.name);if(i>=0)BASE[i]=r;else BASE.push(r);pending.add(r.name)}
    clearTimeout(rebT);rebT=setTimeout(applyNotes,700);
  }
  function applyNotes(){
    const prev=new Set(NOTES.map(n=>n.name)),curName=cur&&cur.name,changed=[...pending];pending.clear();
    rebuildNotes();if(curName)cur=byName.get(curName)||null;
    buildTree($("#filter").value.trim().toLowerCase());Campus.rebuild(prev);
    changed.forEach(n=>Campus.pulse(n));
    const added=changed.filter(n=>!prev.has(n));
    const last=changed.length?BASE.find(n=>n.name===changed[changed.length-1]):null;
    if(last&&last.updated_by)toast(`${agentName(last.updated_by)} ${added.length?"created":"updated"} “${last.name}”${changed.length>1?` and ${changed.length-1} more`:""}`);
    if(sheet.open&&sheet.view==="note"&&cur&&changed.includes(cur.name)){const y=$("#sbody").scrollTop;renderSheet();$("#sbody").scrollTop=y}
    pushAgents();
  }
  function pushAgents(){
    const list=[];agents.forEach(a=>{const p=pres.get(a.id);if(isLive(p)&&a.id!=="repo-sync")list.push({id:a.id,name:a.name,color:a.color,status:p.status,note:p.note,task:p.task,detail:p.detail})});
    Campus.setAgents(list);
    const n=list.length,pp=$("#agpip");if(pp)pp.hidden=!n&&!tasks.some(t=>t.status==="review");
  }
  function syncMarkers(){Campus.setMarkers(tasks.filter(t=>t.status!=="done"&&t.note).map(t=>({note:t.note,status:t.status})))}
  const refresh=()=>{if(sheet.open&&sheet.view==="agents")renderSheet()};

  // ---- floor HUD
  const KINDS=[["coding agent","Coding agents"],["agent","Agents"],["assistant","Assistants"],["app builder","App builders"],["automation","Automation"]];
  const kindOf=a=>KINDS.some(k=>k[0]===a.kind)?a.kind:"agent";
  function rowsHTML(compact,liveOnly,kind){
    const list=[...agents.values()].filter(a=>a.id!=="repo-sync"&&a.active!==false&&(!liveOnly||isLive(pres.get(a.id)))&&(!kind||kindOf(a)===kind)).map(a=>({a,p:pres.get(a.id)})).sort((x,y)=>(isLive(y.p)-isLive(x.p))||Date.parse(y.p?.last_seen||0)-Date.parse(x.p?.last_seen||0)||x.a.name.localeCompare(y.a.name));
    return list.map(({a,p})=>{const live=isLive(p);const what=live?[p.status,p.task,p.note].filter(Boolean).join(" · "):"offline";
      return `<button class="ag-row${live?"":" off"}" ${p&&p.note?`data-note="${esc(p.note)}"`:""}><i style="background:${a.color}"></i><div><b>${esc(a.name)}</b><span>${esc(what)}</span>${live&&p.detail&&!compact?`<span>${esc(p.detail)}</span>`:""}</div><em>${p?short(p.last_seen):""}</em></button>`}).join("");
  }
  function drawFloor(){
    const el=$("#floor");if(!el||!me)return;
    const ids=[...agents.keys()].filter(id=>id!=="repo-sync"),live=ids.filter(id=>isLive(pres.get(id))).length;
    el.hidden=false;
    el.innerHTML=`<h3><span>On the floor</span><b>${connected||pollT?(live?live+" live":"quiet"):"connecting"}${pollT&&!connected?" · polling":""}</b></h3>${rowsHTML(true,true)}${ids.length-live?`<div class="watch">${ids.length-live} agents offline · <a class="wl" id="floorAll">see all</a></div>`:""}
      <div class="ticker">${acts.slice(0,4).map(a=>`<div><b>${esc(agentName(a.actor))}</b> ${esc(a.kind)} ${esc(a.note||a.text||"")}</div>`).join("")||"<div>No activity yet</div>"}</div>
      <div class="watch">Watching now: ${esc(watchers.join(", ")||me.name)}</div>`;
  }
  document.addEventListener("click",e=>{if(e.target.id==="floorAll"){e.preventDefault();sheet.atab="floor";openSheet("agents");return}const r=e.target.closest(".ag-row[data-note]");if(r){const n=byName.get(r.dataset.note);if(n)open(n)}});

  // ---- sheet tabs
  function floorTab(){const all=[...agents.values()].filter(a=>a.id!=="repo-sync"&&a.active!==false),live=all.filter(a=>isLive(pres.get(a.id)));
    return `${live.length?`<div class="sec"><h4>Live now <span>${live.length}</span></h4>${rowsHTML(false,true)}</div>`:`<div class="sec"><h4>Agents <span>0 live · ${all.length} connected</span></h4></div>`}
    ${KINDS.map(([k,l])=>{const n=all.filter(a=>kindOf(a)===k).length;return n?`<details class="sec"${live.length?"":" open"}><summary style="cursor:pointer"><h4 style="display:inline">${l} <span>${n}</span></h4></summary>${rowsHTML(false,false,k)}</details>`:""}).join("")}
    <div class="sec"><h4>Teammates watching <span>${watchers.length}</span></h4><p class="note-s">${esc(watchers.join(", ")||"Just you")}</p></div>
    <p class="note-s">An agent shows as live for 15 minutes after its last heartbeat. Its lantern sits on the building of the note it is touching and moves when it moves.</p>`}
  function taskCard(t){
    const A={claimed:[["review","Send to review"],["block","Block"],["release","Release"]],open:[],review:[["done","Mark done"],["reopen","Reopen"]],blocked:[["unblock","Unblock"],["release","Release"]],done:[["reopen","Reopen"]]}[t.status]||[];
    const assign=t.status==="open"?`<select class="btn" data-assign="${esc(t.id)}"><option value="">Assign to…</option>${KINDS.map(([k,l])=>{const g=[...agents.values()].filter(a=>a.id!=="repo-sync"&&a.active!==false&&kindOf(a)===k).sort((x,y)=>x.name.localeCompare(y.name));return g.length?`<optgroup label="${l}">${g.map(a=>`<option value="${a.id}">${esc(a.name)}</option>`).join("")}</optgroup>`:""}).join("")}</select>`:"";
    return `<div class="tc ${t.status}"><div class="t">${esc(t.title||t.id)}</div>
      <div class="m"><span>${esc(t.id)}</span><span>${esc(t.priority||"medium")}</span><span>${t.agent?esc(agentName(t.agent)):"unassigned"}</span>${t.division?`<span>${esc(t.division)}</span>`:""}${t.note?`<a class="wl" data-n="${esc(t.note)}">${esc(t.note)}</a>`:""}</div>
      ${t.detail?`<div class="d">${esc(t.detail)}</div>`:""}${t.result?`<div class="d"><b>Result:</b> ${esc(t.result)}</div>`:""}
      <div class="ac">${assign}${A.map(([k,l])=>`<button class="btn" data-act="${k}" data-id="${esc(t.id)}">${l}</button>`).join("")}</div></div>`;
  }
  function board(){
    const by={};ORDER.forEach(s=>by[s]=[]);tasks.forEach(t=>(by[t.status]||by.open).push(t));
    ORDER.forEach(s=>by[s].sort((a,b)=>(PRI[a.priority]??1)-(PRI[b.priority]??1)||String(a.id).localeCompare(String(b.id))));
    const labels={claimed:"In progress",review:"In review",blocked:"Blocked",open:"Open",done:"Done"};
    return `<details class="card"><summary style="cursor:pointer;font-weight:500">New task</summary><div class="frm" style="margin-top:10px">
      <label>Title<input id="ntTitle" maxlength="200" placeholder="What needs doing"></label>
      <label>Detail<textarea id="ntDetail" style="min-height:70px;font-family:var(--body)" placeholder="Acceptance criteria, sources, what not to touch"></textarea></label>
      <label>Note it touches<input id="ntNote" list="dlNotes" placeholder="Exact note name (optional)"></label>
      <label>Priority<select id="ntPri"><option>high</option><option selected>medium</option><option>low</option></select></label>
      <div><button class="btn pri" id="ntGo">Add to board</button></div></div></details>`
      +ORDER.map(s=>by[s].length?`<div class="sec"><h4>${labels[s]} <span>${by[s].length}</span></h4><div class="agrid">${(s==="done"?by[s].slice(-10).reverse():by[s]).map(taskCard).join("")}</div></div>`:"").join("");
  }
  function activity(){
    return acts.length?acts.map(a=>`<div class="act"><time>${short(a.ts)}</time><div><b>${esc(agentName(a.actor))}</b> <span>${esc(a.kind)}</span> ${esc(a.text||"")}${a.task?` <span>${esc(a.task)}</span>`:""}${a.note?` <a class="wl" data-n="${esc(a.note)}">${esc(a.note)}</a>`:""}</div></div>`).join(""):"<p class='note-s'>Nothing yet.</p>";
  }
  function desk(){
    const folders=[...new Set(BASE.map(n=>n.folder).filter(Boolean))].sort();
    return `<p class="note-s" style="margin-top:0">Writes straight into the live vault as <b>${esc(me.name)}</b>. Everyone watching sees the building change. The repo picks it up on the next sync.</p>
    <div class="frm">
      <label>Action<select id="dkMode"><option value="new">New note</option><option value="append">Add a section to an existing note</option></select></label>
      <label>Note name<input id="dkName" list="dlNotes" placeholder="Exact name" autocomplete="off"></label>
      <div id="dkNewOnly" class="frm"><label>Folder<select id="dkFolder">${folders.map(f=>`<option${f==="09 - Projects"?" selected":""}>${esc(f)}</option>`).join("")}</select></label>
      <label>Type<select id="dkType">${["note","project","research","sop","decision","registry","client","product"].map(t=>`<option>${t}</option>`).join("")}</select></label>
      <label>Tags<input id="dkTags" placeholder="comma separated, lowercase"></label></div>
      <label>Body (markdown, wikilinks as [[Exact Note Name]])<textarea id="dkBody" placeholder="Facts, sources, links. Say what is unknown."></textarea></label>
      <div><button class="btn pri" id="dkGo">Publish to the vault</button></div></div>`;
  }
  function connect(){
    const api=CFG.url+"/functions/v1/agent-api",mcp=CFG.url+"/functions/v1/vault-mcp";
    return `<div class="callout info"><div class="ct">How agents get in</div><p>Each agent has its own token. JR holds them. The token goes in the agent's environment as <code>VAULT_AGENT_TOKEN</code>, never in a note or a commit.</p></div>
    <div class="sec"><h4>Claude Code</h4><p class="note-s">Open the repo. <code>.mcp.json</code> and the hooks in <code>.claude/settings.json</code> are already there: every file Claude Code reads or edits shows up here live.</p>${code(`export VAULT_AGENT_TOKEN=cv_claudecode_…   # or put it in .vault-agent (gitignored)
claude`)}</div>
    <div class="sec"><h4>Local MCP, no install</h4><p class="note-s">Codex, Cursor, Hermes, Windsurf, Cline, Grok Build, Qwen Code, Google Antigravity, OpenClaw. Any tool with an MCP config file: point it at <code>node mcp/stdio.mjs</code> in this repo with the agent's own token in env.</p>${code(`# ~/.codex/config.toml
[mcp_servers.collective-vault]
command = "node"
args = ["/ABS/PATH/collective-ai-inc-vault/mcp/stdio.mjs"]
env = { VAULT_AGENT_TOKEN = "cv_codex_…" }`)}</div>
    <div class="sec"><h4>Remote MCP</h4><p class="note-s">ChatGPT, GrokBot, Muse Spark, Grok, Gemini, Qwen, GLM, Kimi, MiniMax, Perplexity, Manus, Devin, Replit Agent, MaxClaw, Kimi Claw, MiMo Claw, MaxHermes, Buzz, Abacus.AI, Notion AI, Lovable, v0, n8n (MCP Client node), LangChain (MCP adapters).</p>${code(mcp)}<p class="note-s">Send the token as <code>Authorization: Bearer &lt;token&gt;</code>. Connectors that can't set headers can use <code>${esc(mcp)}?token=&lt;token&gt;</code>.</p></div>
    <div class="sec"><h4>HTTP API</h4><p class="note-s">DeepSeek, Jev, Xiaomi MiMo Studio, Bolt.new, Blink.new, Magic Patterns, Base44, Google AI Studio, Hugging Face, Jules, and anything else that can make an HTTP call. App builders: store the token as a backend secret, never in client code.</p>${code(`curl -s ${api} \\
  -H "Authorization: Bearer $VAULT_AGENT_TOKEN" -H "content-type: application/json" \\
  -d '{"action":"heartbeat","status":"working","task":"CV-001","note":"SOLOFORGE","detail":"drafting the offer"}'`)}
    <p class="note-s">Actions: whoami, heartbeat, log, tasks.list, tasks.claim, tasks.update, tasks.create, notes.get, notes.search, notes.upsert, notes.append, notes.history, activity.recent.</p></div>
    <div class="sec"><h4>CLI</h4>${code(`node scripts/agent.mjs tasks open
node scripts/agent.mjs claim CV-001
node scripts/agent.mjs status writing --note SOLOFORGE --detail "pricing table"
node scripts/agent.mjs append SOLOFORGE --file offer.md --task CV-001
node scripts/agent.mjs update CV-001 review --result "Offer section drafted; price TBD (JR)"`)}</div>`;
  }
  function render(tab){
    if(!me)return"<p class='note-s'>Sign in first.</p>";
    return `<div class="who"><span class="live ${connected||pollT?"on":""}"><i></i>${connected?"live":pollT?"polling every 8s":"connecting"}</span><span>Signed in as ${esc(me.name)}${me.role==="owner"?" (owner)":""}</span></div>`+
      (tab==="board"?board():tab==="activity"?activity():tab==="desk"?desk():tab==="connect"?connect():floorTab());
  }
  async function logHuman(kind,text,note,task){await sb.from("activity").insert({actor:me.name,actor_kind:"human",kind,text:text||null,note:note||null,task:task||null})}
  function bind(root){
    const nt=root.querySelector("#ntGo");if(nt)nt.onclick=async()=>{
      const title=root.querySelector("#ntTitle").value.trim();if(!title){toast("Give the task a title");return}
      const note=root.querySelector("#ntNote").value.trim();if(note&&!byName.has(note)){toast("No note has that exact name");return}
      const n=Math.max(0,...tasks.map(t=>/^CV-\d+$/.test(t.id)?+t.id.slice(3):0))+1,id="CV-"+String(n).padStart(3,"0");
      const {error}=await sb.from("tasks").insert({id,title,detail:root.querySelector("#ntDetail").value.trim()||null,note:note||null,priority:root.querySelector("#ntPri").value,requested_by:me.name});
      if(error){toast("Could not save: "+error.message);return}await logHuman("opened",title,note,id);toast("Task "+id+" added")};
    root.querySelectorAll("select[data-assign]").forEach(s=>s.onchange=async()=>{if(!s.value)return;const t=tasks.find(x=>x.id===s.dataset.assign);
      const {error}=await sb.from("tasks").update({status:"claimed",agent:s.value,claimed_at:new Date().toISOString()}).eq("id",t.id);if(error){toast(error.message);return}
      await logHuman("assigned",`${t.title} → ${agentName(s.value)}`,t.note,t.id)});
    root.onclick=async e=>{const b=e.target.closest("[data-act]");if(!b)return;const t=tasks.find(x=>x.id===b.dataset.id);if(!t)return;const a=b.dataset.act,now=new Date().toISOString();
      const p={review:{status:"review"},done:{status:"done",done_at:now},block:{status:"blocked"},unblock:{status:"claimed"},release:{status:"open",agent:null,claimed_at:null},reopen:{status:"open",agent:null,claimed_at:null}}[a];if(!p)return;
      const {error}=await sb.from("tasks").update(p).eq("id",t.id);if(error){toast(error.message);return}
      await logHuman({review:"sent to review",done:"finished",block:"blocked",unblock:"unblocked",release:"released",reopen:"reopened"}[a],t.title,t.note,t.id)};
    const mode=root.querySelector("#dkMode");if(mode){const sync=()=>root.querySelector("#dkNewOnly").hidden=mode.value!=="new";mode.onchange=sync;sync()}
    const go=root.querySelector("#dkGo");if(go)go.onclick=()=>desk_submit(root);
  }
  async function desk_submit(root){
    const v=s=>root.querySelector(s).value,mode=v("#dkMode"),name=v("#dkName").trim();let body=v("#dkBody").trim();
    if(!name){toast("Name the note");return}if(!body){toast("Write something first");return}
    if(/[\/\\:\[\]|#^]/.test(name)){toast("Names can't contain / \\ : [ ] | # ^");return}
    const ex=BASE.find(n=>n.name===name),today=new Date().toISOString().slice(0,10);
    if(mode==="append"&&!ex){toast("No note has that exact name. Pick it from the list.");return}
    if(mode==="new"&&ex){toast("That name exists. Switch to adding a section.");return}
    let res;
    if(mode==="new"){
      if(!/^#\s/.test(body))body=`# ${name}\n\n${body}`;
      const tags=v("#dkTags").split(",").map(s=>s.trim().toLowerCase().replace(/\s+/g,"-")).filter(Boolean);
      res=await sb.from("notes").insert({name,folder:v("#dkFolder"),fm:{type:v("#dkType"),tags,updated:today,owner:"JR Moyler (Hataalii)",source:me.name},body:body+"\n",updated_by:me.name});
    }else{
      res=await sb.from("notes").update({body:ex.body.replace(/\s+$/,"")+`\n\n## Update · ${me.name} · ${today}\n${body}\n`,fm:{...(ex.fm||{}),updated:today},updated_by:me.name}).eq("name",name);
    }
    if(res.error){toast("Could not save: "+res.error.message);return}
    await logHuman(mode==="new"?"created":"added to","",name);
    const bad=(body.match(/\[\[([^\]|#]+)/g)||[]).map(m=>m.slice(2)).filter(t=>!byName.has(t)&&t!==name);
    toast(bad.length?`Saved. ${bad.length} link${bad.length>1?"s don't":" doesn't"} resolve yet.`:"Published");
    root.querySelector("#dkBody").value="";root.querySelector("#dkName").value="";
    setTimeout(()=>{const n=byName.get(name);if(n)open(n)},1200);
  }
  async function history(name){const {data}=await sb.from("note_revisions").select("version,edited_by,edited_at").eq("name",name).order("edited_at",{ascending:false}).limit(30);return (data||[]).map(r=>({...r,edited_by:agentName(r.edited_by)}))}
  async function signOut(){await sb.auth.signOut();location.reload()}
  return {session,member,join,loadAll,subscribe,render,bind,history,pushAgents,syncMarkers,drawFloor,signOut,me:()=>me};
})();
