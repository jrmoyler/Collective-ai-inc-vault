// ---------- UX: the paths between the title, the city and the work.
// Go-to palette (Ctrl/Cmd+K and a 44 px HUD button) for notes, districts, Wardens, agents and actions; keyboard
// stepping through nearby buildings ([ ]) and districts (Shift [ ]) with a screen-reader announcement; a tracked first
// walk (Warden, note, link cable, task board) that can be skipped and resumed; one-time contextual hints; clickable
// breadcrumbs; undo on dismissals; offline and boot-failure states; first-run quality detection.
// Pure DOM. Other modules reach it through window.UX and must tolerate its absence.
const UX=window.UX=(()=>{
  const S=typeof store!=="undefined"?store:{get(k,d){try{const v=localStorage.getItem(k);return v==null?d:JSON.parse(v)}catch(e){return d}},set(k,v){try{localStorage.setItem(k,JSON.stringify(v))}catch(e){}}};
  const K={walk:"vault.ux.walk",hints:"vault.ux.hints",recent:"vault.ux.recent",kit:"vault.ux.kit",q:"vault.quality",qAuto:"vault.quality.auto",qWhy:"vault.quality.why"};
  const q=s=>document.querySelector(s);
  const has=(c,id)=>!!c&&(typeof c.has==="function"?c.has(id):Array.isArray(c)&&c.includes(id));
  const RM=()=>{try{return matchMedia("(prefers-reduced-motion: reduce)").matches}catch(e){return false}};
  const TOUCH=()=>{try{return matchMedia("(pointer:coarse)").matches}catch(e){return false}};
  const typingIn=el=>!!el&&(/^(INPUT|TEXTAREA|SELECT)$/.test(el.tagName)||el.isContentEditable===true);
  const el=(tag,cls,text)=>{const e=document.createElement(tag);if(cls)e.className=cls;if(text!==undefined)e.textContent=text;return e};
  const notes=()=>typeof NOTES==="undefined"?[]:NOTES;
  const campusOk=()=>typeof Campus!=="undefined"&&typeof Campus.ok==="function"&&Campus.ok();
  const noteOf=id=>{const n=notes()[id];return n&&n.id===id?n:notes().find(x=>x.id===id)};
  const topOf=n=>typeof Districts!=="undefined"&&Districts.worldTop?Districts.worldTop(n):n.top||(n.folder||"").split("/")[0];
  const titleOf=top=>{const d=typeof Districts!=="undefined"?Districts.get(top):null;return d?.title||String(top||"").replace(/^\d+ - /,"")};

  // ---- live region: one polite announcer for keyboard stepping and coach progress
  let live=null;
  function say(text){if(!live)return;live.textContent="";setTimeout(()=>{live.textContent=String(text)},30)}

  // ---- first-run quality: a cheap device read before the first renderer exists. Never overrides a choice the user made.
  function detectQuality(env={}){
    const gpu=String(env.gpu||"");
    if(/swiftshader|llvmpipe|software|basic render/i.test(gpu))return{q:"low",why:"software renderer"};
    if(/mali-[gt]\d|powervr|adreno[^0-9]*([1-5]\d\d|6[0-2]\d)\b|intel\(r\) u?hd graphics/i.test(gpu))return{q:"low",why:"mobile-class GPU"};
    if(Number.isFinite(env.memory)&&env.memory>0&&env.memory<=4)return{q:"low",why:env.memory+" GB memory"};
    if(Number.isFinite(env.cores)&&env.cores>0&&env.cores<=4)return{q:"low",why:env.cores+" CPU cores"};
    if(env.saveData)return{q:"low",why:"data saver"};
    return{q:"high",why:"capable device"};
  }
  function deviceEnv(){
    const env={memory:+navigator.deviceMemory||0,cores:+navigator.hardwareConcurrency||0,saveData:!!navigator.connection?.saveData,gpu:""};
    try{const c=document.createElement("canvas"),gl=c.getContext("webgl",{failIfMajorPerformanceCaveat:false});
      if(gl){const info=gl.getExtension("WEBGL_debug_renderer_info");env.gpu=info?gl.getParameter(info.UNMASKED_RENDERER_WEBGL):gl.getParameter(gl.RENDERER);const lose=gl.getExtension("WEBGL_lose_context");if(lose)lose.loseContext()}
      else env.gpu="software"}catch(e){}
    return env;
  }
  // Called by the title (before its renderer) and by boot. Writes vault.quality only when nothing is stored yet.
  function ensureQuality(){
    if(S.get(K.q,null)!=null)return S.get(K.q,"high");
    const r=detectQuality(deviceEnv());S.set(K.q,r.q);S.set(K.qAuto,true);S.set(K.qWhy,r.why);return r.q;
  }
  function qualityLabel(){const v=S.get(K.q,"high");return S.get(K.qAuto,false)?"Auto · "+(v==="low"?"Low":"High")+(S.get(K.qWhy,"")?" ("+S.get(K.qWhy,"")+")":""):(v==="low"?"Low":"High")}
  // "auto" re-detects. The campus re-reads quality live through its hook; the title reads it on start.
  function setQuality(v,quiet){
    if(v==="auto"){const r=detectQuality(deviceEnv());S.set(K.q,r.q);S.set(K.qAuto,true);S.set(K.qWhy,r.why)}
    else if(v==="low"||v==="high"){S.set(K.q,v);S.set(K.qAuto,false);S.set(K.qWhy,"")}
    else return S.get(K.q,"high");
    let applied=false;try{if(campusOk()&&typeof Campus.applyQuality==="function"){Campus.applyQuality();applied=true}}catch(e){}
    if(!quiet)notify("Quality: "+qualityLabel()+(applied||!campusOk()?".":". Reload to apply everything."));
    return S.get(K.q,"high");
  }
  function notify(m,ms){if(window.HUD&&HUD.toast)return HUD.toast(m,ms?{ms}:{});if(typeof toast==="function")return toast(m)}

  // ---- undo: a toast with an Undo button; Ctrl/Cmd+Z also undoes while it shows
  let undoFn=null,undoT=0;
  function undo(message,fn,ms=7000){
    undoFn=fn;clearTimeout(undoT);undoT=setTimeout(()=>{undoFn=null},ms);
    const t=notify(message,ms);if(!t||t.nodeType!==1)return null;if(t.querySelector(".ux-undo"))return t.querySelector(".ux-undo");
    const b=el("button","ux-undo","Undo");b.type="button";b.onclick=e=>{e.stopPropagation();runUndo();t.querySelector(".tx")?.click()};
    const x=t.querySelector(".tx");if(x)t.insertBefore(b,x);else t.append(b);
    return b;
  }
  function runUndo(){const f=undoFn;undoFn=null;clearTimeout(undoT);if(f){try{f()}catch(e){console.warn(e)}return true}return false}

  // ---- hints: shown once per id, remembered, dismissable (they ride the toast stack)
  function hint(id,text){
    const seen=S.get(K.hints,{})||{};if(seen[id])return false;seen[id]=Date.now();S.set(K.hints,seen);
    notify(text,9000);return true;
  }

  // ---- recent notes and district first-visit kit progress
  function remember(n){const r=(S.get(K.recent,[])||[]).filter(x=>x!==n.name);r.unshift(n.name);S.set(K.recent,r.slice(0,8))}
  function kitState(top,len){const all=S.get(K.kit,{})||{};const v=Array.isArray(all[top])?all[top]:[];return Array.from({length:len},(_,i)=>!!v[i])}
  function kitMark(top,i,on=true,quiet=false){const all=S.get(K.kit,{})||{};const v=Array.isArray(all[top])?all[top].slice():[];if(!!v[i]===!!on)return false;v[i]=!!on;all[top]=v;S.set(K.kit,all);if(!quiet&&typeof Journey!=="undefined"&&Journey.refresh)Journey.refresh();return true}

  // ---- first walk: Warden, note, link cable, task board. Progress persists; skip hides it with undo.
  const STEPS=[
    {id:"warden",title:"Meet a Warden",body:"Each district has a Warden. It knows the district's notes and the open work that points at them.",act:"Fly to a Warden"},
    {id:"note",title:"Open one note",body:"Every building is a note. Taller means longer and more linked.",act:"Open a note"},
    {id:"cable",title:"Follow a link cable",body:"Gold cables lead out of the open note, blue ones lead in. Open a linked note to follow one.",act:"Follow a link"},
    {id:"task",title:"Find work to claim",body:"The live board lists open tasks. Claim one there, or point an agent at it.",act:"Open the task board"}
  ];
  const walkState=()=>{const w=S.get(K.walk,null);const narrow=true;/* Every arrival starts with a compact, expandable objective. Explicit user choices persist. */return w&&typeof w==="object"?{done:w.done||{},hidden:!!w.hidden,finished:!!w.finished,minUser:!!w.minUser,min:w.minUser?!!w.min:narrow}:{done:{},hidden:false,finished:false,minUser:false,min:narrow}};
  const saveWalk=w=>S.set(K.walk,w);
  const nextStep=w=>STEPS.find(s=>!w.done[s.id])||null;
  let coach=null,coachPoll=0;
  function homeTop(){
    if(typeof cur!=="undefined"&&cur)return topOf(cur);
    const h=typeof byName!=="undefined"?byName.get("🏠 Home"):null;if(h)return topOf(h);
    const d=campusOk()?Campus.districts()[0]:null;return d?d.top:null;
  }
  function stepRun(id){
    if(id==="warden"){const top=homeTop();let ok=false;try{ok=typeof Guides!=="undefined"&&top&&Guides.talk(top)}catch(e){}if(!ok&&top&&campusOk())Campus.flyDistrict(top);if(!ok)mark("warden")/* no Warden available: flying there counts */;return}
    if(id==="note"){const h=typeof byName!=="undefined"&&byName.get("🏠 Home");const recent=(S.get(K.recent,[])||[]).map(n=>byName?.get(n)).find(Boolean);const n=recent||h||notes()[0];if(n)open(n);return}
    if(id==="cable"){const c=typeof cur!=="undefined"&&cur?cur:null;const pick=c?[...(c.out||[])].map(noteOf).find(Boolean)||[...(c.back||[])].map(noteOf).find(Boolean):null;
      if(pick){open(pick);return}const h=typeof byName!=="undefined"&&byName.get("🏠 Home");if(h&&h!==c){open(h);notify("Home links out to most of the vault. Pick a gold cable or a link in the reader.")}else notify("This note has no links yet. Open another building.");return}
    if(id==="task"){if(typeof sheet!=="undefined")sheet.atab="board";if(typeof openSheet==="function")openSheet("agents")}
  }
  function mark(id){
    const w=walkState();if(w.done[id]||!STEPS.some(s=>s.id===id))return false;w.done[id]=Date.now();
    const finishing=!nextStep(w);if(finishing)w.finished=true;saveWalk(w);
    const s=STEPS.find(x=>x.id===id);say("First walk: "+s.title+" done."+(finishing?" Walk complete.":" Next: "+nextStep(w).title+"."));
    if(typeof VaultAudio!=="undefined"&&VaultAudio.sfx)try{VaultAudio.sfx(finishing?"task.done":"ui.toggle")}catch(e){}
    drawCoach(finishing);return true;
  }
  function buildCoach(){
    if(coach)return coach;const host=q("#stage")||document.body;
    coach=el("section","ux-coach");coach.id="uxCoach";coach.setAttribute("aria-labelledby","uxCoachT");coach.hidden=true;
    host.append(coach);
    // integrator: stack under the live floor panel (same top-right lane on desktop and phones) instead of covering it
    const place=()=>{if(!coach||coach.hidden)return;const f=q("#floor"),h=coach.offsetParent||host;let top="";
      if(f&&h){const fr=f.getBoundingClientRect(),hr=h.getBoundingClientRect(),cs=getComputedStyle(f);
        if(cs.display!=="none"&&cs.visibility!=="hidden"&&fr.height>0)top=Math.round(fr.bottom-hr.top+8)}
      coach.style.top=top===""?"":top+"px";coach.style.maxHeight=top===""?"":Math.max(120,Math.round((h?h.clientHeight:innerHeight)-top-12))+"px"};
    coach._place=place;addEventListener("resize",place,{passive:true});
    if(typeof ResizeObserver!=="undefined"){const ro=new ResizeObserver(place);const f=q("#floor");if(f)ro.observe(f);ro.observe(coach)}
    return coach;
  }
  function drawCoach(celebrate){
    if(!coach)return;const w=walkState();const done=STEPS.filter(s=>w.done[s.id]).length,next=nextStep(w);
    coach.replaceChildren();coach.classList.toggle("min",w.min);coach.classList.toggle("fin",!next);
    const head=el("button","ux-coach-head");head.type="button";head.setAttribute("aria-expanded",String(!w.min));head.setAttribute("aria-controls","uxCoachBody");
    const t=el("span","ux-coach-t");t.id="uxCoachT";t.append(el("small",undefined,"First walk · "+done+" of "+STEPS.length),el("b",undefined,next?next.title:"Walk complete"));
    const bar=el("i","ux-coach-bar");bar.setAttribute("aria-hidden","true");bar.style.setProperty("--p",String(done/STEPS.length));
    head.append(t,bar,el("span","ux-coach-chev","▾"));head.onclick=()=>{if(coach.classList.contains("auto-min")){autoMinOff=true;coach.classList.remove("auto-min");head.setAttribute("aria-expanded","true");return}const s=walkState();s.min=!s.min;s.minUser=true;saveWalk(s);drawCoach()};
    const body=el("div","ux-coach-body");body.id="uxCoachBody";
    const ol=el("ol","ux-coach-steps");STEPS.forEach(s=>{const li=el("li",w.done[s.id]?"done":s===next?"now":"",s.title);if(w.done[s.id])li.setAttribute("aria-label",s.title+", done");else if(s===next)li.setAttribute("aria-current","step");ol.append(li)});
    body.append(ol);
    if(next){body.append(el("p",undefined,next.body));const go=el("button","btn pri",next.act);go.type="button";go.onclick=()=>stepRun(next.id);
      const skip=el("button","btn ux-link","Skip the walk");skip.type="button";skip.onclick=hideWalk;const row=el("div","ux-coach-act");row.append(go,skip);body.append(row)}
    else{body.append(el("p",undefined,"That is the loop: a Warden for context, a note for the facts, cables for what connects, the board for what to do next."));
      const ok=el("button","btn pri","Done");ok.type="button";ok.onclick=()=>{const s=walkState();s.hidden=true;saveWalk(s);coach.hidden=true;stopPoll()};const row=el("div","ux-coach-act");row.append(ok);body.append(row)}
    coach.append(head,body);syncAutoMin();
    if(celebrate&&!RM()){coach.classList.remove("pop");void coach.offsetWidth;coach.classList.add("pop")}
  }
  // Street-level close-ups on phones: fold the coach to its header so in-world titles stay readable. Not stored; tapping the header
  // reopens it for this close-up, and pulling back out clears the fold.
  let autoMinOff=false;
  const closeUp=()=>{if(!campusOk()||typeof innerWidth==="undefined"||innerWidth>760)return false;try{const p=Campus.position();return !!p&&(p.walking||(Number.isFinite(p.dist)&&p.dist<160))}catch(e){return false}};
  function syncAutoMin(){if(!coach)return;const near=closeUp();if(!near)autoMinOff=false;const on=near&&!autoMinOff&&!coach.classList.contains("min");
    if(coach.classList.contains("auto-min")!==on){coach.classList.toggle("auto-min",on);coach.querySelector(".ux-coach-head")?.setAttribute("aria-expanded",String(!on&&!coach.classList.contains("min")))}}
  function stopPoll(){clearInterval(coachPoll);coachPoll=0}
  function startPoll(){
    if(coachPoll)return;
    // the Warden can be reached through its own prompt (E) or a chip, which do not pass through here; read its state lazily
    coachPoll=setInterval(()=>{const w=walkState();if(w.hidden||w.finished||document.hidden)return;syncAutoMin();try{if(!w.done.warden&&typeof Guides!=="undefined"&&Guides.isTalking())mark("warden")}catch(e){}},1000);
  }
  function showWalk(force){
    const w=walkState();if(force){w.hidden=false;if(w.finished){w.done={};w.finished=false}w.min=false;w.minUser=true;saveWalk(w)}
    if(!force&&(w.hidden||w.finished))return false;
    buildCoach();drawCoach();coach.hidden=false;if(coach._place)coach._place();startPoll();
    // move focus to the step only if nothing else took it meanwhile (a dialog, the retry card)
    if(force){const before=document.activeElement;setTimeout(()=>{const a=document.activeElement;if(a===before||a===document.body)coach.querySelector(".ux-coach-act .pri")?.focus({preventScroll:true})},40)}
    return true;
  }
  function hideWalk(){
    const w=walkState();w.hidden=true;saveWalk(w);if(coach)coach.hidden=true;stopPoll();
    undo(TOUCH()?"First walk hidden. Go to (top bar) › First walk brings it back.":"First walk hidden. Ctrl K › First walk brings it back.",()=>showWalk(true));
  }

  // ---- go-to palette
  let pal=null,palIn=null,palList=null,palItems=[],palSel=0,palOpener=null;
  function score(name,query){
    const n=String(name).toLowerCase(),qq=query;if(!qq)return 1;if(n===qq)return 100;if(n.startsWith(qq))return 70;
    if(n.split(/[\s\-–—_/·]+/).some(w=>w.startsWith(qq)))return 55;if(n.includes(qq))return 40;
    let j=0;for(const c of n)if(c===qq[j])j++;return j===qq.length?12:0;
  }
  function actions(){
    const w=walkState(),out=[
      {kind:"action",label:w.finished?"Replay the first walk":"First walk",sub:w.finished?"Warden, note, cable, task":(STEPS.filter(s=>w.done[s.id]).length+" of "+STEPS.length+" done"),run:()=>showWalk(true)},
      {kind:"action",label:"Campus overview",sub:"R",run:()=>{if(typeof closeSheet==="function")closeSheet();if(campusOk())Campus.overview()}},
      {kind:"action",label:"Walk the streets",sub:"F",run:()=>{if(campusOk())Campus.toggleWalk(true)}},
      {kind:"action",label:"District navigator",sub:(typeof Districts!=="undefined"?Districts.all.length:0)+" districts",run:()=>{if(typeof Journey!=="undefined")Journey.show(typeof cur!=="undefined"&&cur?topOf(cur):undefined)}},
      {kind:"action",label:"Live task board",sub:"Claim open work",run:()=>stepRun("task")},
      {kind:"action",label:"Search inside notes",sub:"/",run:query=>{if(typeof openSwitcher==="function")openSwitcher(query||"")}},
      {kind:"action",label:"Keyboard shortcuts",sub:"?",run:()=>{if(window.HUD)HUD.showKeys()}},
      {kind:"action",label:"Quality: Auto",sub:"Now "+qualityLabel(),run:()=>setQuality("auto")},
      {kind:"action",label:"Quality: Low",sub:"Fewer effects, faster on phones",run:()=>setQuality("low")},
      {kind:"action",label:"Quality: High",sub:"Full lighting and effects",run:()=>setQuality("high")}
    ];
    if(campusOk())out.splice(3,0,{kind:"action",label:"Cycle the sky",sub:"Dawn, day, dusk, night, auto",run:()=>Campus.cycleTime()});
    return out;
  }
  function sources(query){
    const qq=query.trim().toLowerCase();const only=qq[0]===">"?"action":qq[0]==="@"?"agent":"";const term=only?qq.slice(1).trim():qq;
    const groups=[];const push=(label,items,limit)=>{const ranked=items.map(it=>({...it,s:score(it.label,term)+(it.bias||0)})).filter(it=>it.s>0).sort((a,b)=>b.s-a.s).slice(0,limit);if(ranked.length)groups.push({label,items:ranked})};
    if(!only||only==="action")push("Actions",actions(),only?10:term?4:3);
    if(only==="action")return groups;
    if(!only){
      const dist=campusOk()?Campus.districts():[];
      push("Districts",(typeof Districts!=="undefined"?Districts.all:[]).map(d=>({kind:"district",label:d.title||d.folder,sub:d.folder+" · "+(typeof Districts.notesFor==="function"?Districts.notesFor(d.folder,notes()).length:0)+" notes",color:dist.find(x=>x.top===d.folder)?.color,run:()=>{if(campusOk()&&dist.some(x=>x.top===d.folder))Campus.flyDistrict(d.folder);else if(typeof Journey!=="undefined")Journey.show(d.folder)}})),term?5:6);
      let wardens=[];try{wardens=typeof Guides!=="undefined"?Guides.list():[]}catch(e){}
      push("Wardens",wardens.map(g=>({kind:"warden",label:"Warden of "+g.name,sub:g.open?g.open+" open task"+(g.open===1?"":"s"):"No open task here",color:g.color,run:()=>{try{Guides.talk(g.top)}catch(e){}}})),term?4:0);
    }
    let agents=[];try{agents=typeof Live!=="undefined"?Live.snapshot().agents:[]}catch(e){}
    push("Agents on campus",agents.filter(a=>a&&a.id&&a.id!=="repo-sync"&&(!campusOk()||!Campus.agentPos||Campus.agentPos(a.id))).map(a=>({kind:"agent",label:a.name||a.id,sub:a.id,color:a.color,run:()=>{if(campusOk()&&Campus.flyTo(a.id))say("Flying to "+(a.name||a.id));else notify((a.name||a.id)+" is not on the campus right now.")}})),term?4:(only?12:0));
    if(only)return groups;
    if(term){push("Notes",notes().map(n=>({kind:"note",label:n.name,sub:n.folder||"/",run:()=>open(n),bias:n.fm?.type==="moc"||n.fm?.type==="home"?4:0})),12)}
    else{const rec=(S.get(K.recent,[])||[]).map(nm=>typeof byName!=="undefined"?byName.get(nm):null).filter(Boolean);
      const base=rec.length?rec:notes().filter(n=>n.fm?.type==="home"||n.fm?.type==="moc").slice(0,6);
      if(base.length)groups.push({label:rec.length?"Recent notes":"Start here",items:base.slice(0,6).map(n=>({kind:"note",label:n.name,sub:n.folder||"/",run:()=>open(n)}))})}
    if(term)groups.push({label:"Search",items:[{kind:"action",label:"Search inside notes for “"+term+"”",sub:"/",run:()=>{if(typeof openSwitcher==="function")openSwitcher(term)}}]});
    return groups;
  }
  function drawPal(){
    const groups=sources(palIn.value);palItems=[];palList.replaceChildren();
    groups.forEach((g,gi)=>{const h=el("li","ux-pal-g",g.label);h.setAttribute("role","presentation");h.id="uxg"+gi;palList.append(h);
      g.items.forEach(it=>{const i=palItems.length;palItems.push(it);const li=el("li","ux-pal-o k-"+it.kind);li.id="uxo"+i;li.setAttribute("role","option");li.dataset.i=i;
        const dot=el("i","ux-pal-dot");dot.setAttribute("aria-hidden","true");if(it.color)dot.style.background=it.color;
        const b=el("b",undefined,it.label),s=el("small",undefined,it.sub||"");li.append(dot,b,s);li.setAttribute("aria-label",it.label+(it.sub?", "+it.sub:"")+", "+({note:"note",district:"district",warden:"Warden",agent:"agent",action:"action"})[it.kind]);palList.append(li)})});
    if(!palItems.length){const li=el("li","ux-pal-none","Nothing matches. Try fewer letters, > for actions, @ for agents.");li.setAttribute("role","presentation");palList.append(li)}
    palSel=Math.min(palSel,Math.max(0,palItems.length-1));paintSel();
  }
  function paintSel(){
    palList.querySelectorAll(".ux-pal-o").forEach(li=>{const on=+li.dataset.i===palSel;li.classList.toggle("on",on);li.setAttribute("aria-selected",String(on));if(on&&li.scrollIntoView)li.scrollIntoView({block:"nearest"})});
    if(palItems.length)palIn.setAttribute("aria-activedescendant","uxo"+palSel);else palIn.removeAttribute("aria-activedescendant");
  }
  function buildPal(){
    if(pal)return;pal=el("div","ux-pal");pal.id="uxPal";pal.hidden=true;
    const box=el("div","ux-pal-box");box.setAttribute("role","dialog");box.setAttribute("aria-modal","true");box.setAttribute("aria-label","Go to");
    const row=el("div","ux-pal-in");palIn=el("input");palIn.id="uxPalQ";palIn.type="text";palIn.autocomplete="off";palIn.spellcheck=false;palIn.placeholder="Go to a note, district, Warden or agent";
    palIn.setAttribute("role","combobox");palIn.setAttribute("aria-label","Go to");palIn.setAttribute("aria-autocomplete","list");palIn.setAttribute("aria-controls","uxPalL");palIn.setAttribute("aria-expanded","true");
    const x=el("button","ib ux-pal-x");x.type="button";x.setAttribute("aria-label","Close Go to");x.innerHTML='<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M6 6l12 12M18 6L6 18"/></svg>';x.onclick=()=>closePal();
    row.append(palIn,x);palList=el("ul","ux-pal-l");palList.id="uxPalL";palList.setAttribute("role","listbox");palList.setAttribute("aria-label","Places and actions");
    const foot=el("div","ux-pal-foot");foot.innerHTML="<span><kbd>↑</kbd><kbd>↓</kbd> move</span><span><kbd>Enter</kbd> go</span><span><kbd>&gt;</kbd> actions · <kbd>@</kbd> agents</span><span><kbd>Esc</kbd> close</span>";
    box.append(row,palList,foot);pal.append(box);document.body.append(pal);
    palIn.addEventListener("input",()=>{palSel=0;drawPal()});
    pal.addEventListener("keydown",e=>{
      e.stopPropagation();
      if(e.key==="ArrowDown"||e.key==="ArrowUp"){e.preventDefault();if(palItems.length){palSel=(palSel+(e.key==="ArrowDown"?1:-1)+palItems.length)%palItems.length;paintSel()}}
      else if(e.key==="Home"&&e.ctrlKey){e.preventDefault();palSel=0;paintSel()}
      else if(e.key==="Enter"){e.preventDefault();choose(palSel)}
      else if(e.key==="Escape"||((e.metaKey||e.ctrlKey)&&e.key.toLowerCase()==="k")){e.preventDefault();closePal()}
      else if(e.key==="Tab"){e.preventDefault();(document.activeElement===palIn?x:palIn).focus()}
    });
    palList.addEventListener("click",e=>{const li=e.target.closest(".ux-pal-o");if(li)choose(+li.dataset.i)});
    palList.addEventListener("pointermove",e=>{const li=e.target.closest(".ux-pal-o");if(li&&+li.dataset.i!==palSel){palSel=+li.dataset.i;paintSel()}});
    pal.addEventListener("pointerdown",e=>{if(e.target===pal)closePal()});
  }
  const setInert=on=>{const app=q("#app");if(!app)return;try{app.inert=on}catch(e){}if(on)app.setAttribute("aria-hidden","true");else app.removeAttribute("aria-hidden")};
  function openPal(query=""){
    if(q("#title"))return false;buildPal();if(!pal.hidden){palIn.select();return true}
    palOpener=document.activeElement;pal.hidden=false;setInert(true);palIn.value=query;palSel=0;drawPal();
    palIn.focus({preventScroll:true});requestAnimationFrame(()=>pal.classList.add("on"));
    if(typeof VaultAudio!=="undefined"&&VaultAudio.sfx)try{VaultAudio.sfx("ui.open")}catch(e){}
    return true;
  }
  function closePal(returnFocus=true){
    if(!pal||pal.hidden)return;pal.classList.remove("on");pal.hidden=true;setInert(false);
    if(returnFocus&&palOpener&&palOpener.isConnected&&palOpener!==document.body)palOpener.focus({preventScroll:true});palOpener=null;
  }
  function choose(i){
    const it=palItems[i];if(!it)return;const query=palIn.value.trim().replace(/^[>@]/,"").trim();
    closePal(true);
    try{it.run(query)}catch(e){console.warn(e);notify("That did not work. The rest of the vault is unaffected.")}
  }

  // ---- keyboard stepping through nearby buildings ([ ]) and districts (Shift [ ]); Enter opens the chosen building
  const step={list:[],i:-1,at:0,id:-1,dIdx:-1};
  function nearbyIds(B,px,pz,limit=24){
    const out=[];for(let i=0;i<B.length;i++){const b=B[i];if(!b||!Number.isFinite(b.cx))continue;out.push([i,(b.cx-px)**2+(b.cz-pz)**2])}
    out.sort((a,b)=>a[1]-b[1]);return out.slice(0,limit).map(x=>x[0]);
  }
  let cue=null,cueT=0;
  function showCue(text){
    if(!cue){cue=el("div","ux-cue");cue.setAttribute("aria-hidden","true");(q("#stage")||document.body).append(cue)}
    cue.textContent=text;cue.hidden=false;cue.classList.add("on");clearTimeout(cueT);cueT=setTimeout(()=>{cue.classList.remove("on");cue.hidden=true},5200);
  }
  function stepBuilding(dir){
    if(!campusOk())return false;const B=Campus.buildings();const now=Date.now();
    if(!step.list.length||now-step.at>6000){const p=Campus.position();step.list=nearbyIds(B,p.x,p.z);step.i=dir>0?-1:0}
    step.at=now;if(!step.list.length)return false;
    step.i=(step.i+dir+step.list.length)%step.list.length;const id=step.list[step.i],n=noteOf(id);if(!n)return false;
    step.id=id;Campus.focus(n);
    const links=(n.out?.size??n.out?.length??0)+(n.back?.size??n.back?.length??0);
    const text=(step.i+1)+" of "+step.list.length+" nearby · "+n.name+" · "+titleOf(topOf(n))+" · "+links+" link"+(links===1?"":"s");
    say(text+". Enter opens it.");showCue(text+"   Enter opens");return true;
  }
  function stepDistrict(dir){
    if(!campusOk())return false;const D=Campus.districts();if(!D.length)return false;
    step.dIdx=(step.dIdx+dir+D.length)%D.length;const d=D[step.dIdx];Campus.flyDistrict(d.top);step.list=[];step.id=-1;
    const text=(step.dIdx+1)+" of "+D.length+" districts · "+titleOf(d.top)+" · "+(d.count||0)+" notes";
    say(text+". Square brackets step through its buildings.");showCue(text);return true;
  }
  function blocked(){
    if(q("#title")||(pal&&!pal.hidden))return true;const m=q("#modal");if(m&&!m.hidden)return true;
    if(document.querySelector("dialog[open]"))return true;try{if(typeof Guides!=="undefined"&&Guides.isTalking())return true}catch(e){}
    return false;
  }
  function onKey(e){
    if((e.metaKey||e.ctrlKey)&&!e.altKey&&e.key.toLowerCase()==="k"){if(q("#title")||document.querySelector("dialog[open]"))return;const sw=q("#modal");if(sw&&!sw.hidden&&typeof closeModal==="function")closeModal();e.preventDefault();e.stopImmediatePropagation();if(pal&&!pal.hidden)closePal();else openPal();return}
    if((e.metaKey||e.ctrlKey)&&!e.shiftKey&&e.key.toLowerCase()==="z"&&undoFn&&!typingIn(document.activeElement)){e.preventDefault();runUndo();return}
    if(e.metaKey||e.ctrlKey||e.altKey||typingIn(document.activeElement)||blocked())return;
    if(e.key==="]"||e.key==="["){e.preventDefault();stepBuilding(e.key==="]"?1:-1);return}
    if(e.key==="}"||e.key==="{"){e.preventDefault();stepDistrict(e.key==="}"?1:-1);return}
    if(e.key==="Enter"&&step.id>=0&&Date.now()-step.at<20000){const a=document.activeElement;if(a&&a!==document.body&&a.id!=="gl")return;const n=noteOf(step.id);if(n){e.preventDefault();step.id=-1;open(n)}}
  }

  // ---- breadcrumbs: Campus › District › path › Note, with the first two clickable
  function renderCrumb(){
    const c=q("#crumb");if(!c||typeof cur==="undefined"||!cur)return;const n=cur,top=topOf(n);
    const cb=(label,fn,aria)=>{const b=el("button","ux-cb",label);b.type="button";if(aria)b.setAttribute("aria-label",aria);b.onclick=e=>{e.stopPropagation();fn()};return b};
    const parts=[cb("Campus",()=>{if(typeof closeSheet==="function")closeSheet();if(campusOk())Campus.overview()},"Campus overview")];
    parts.push(cb(titleOf(top),()=>{if(campusOk()&&Campus.districts().some(d=>d.top===top))Campus.flyDistrict(top);else if(typeof Journey!=="undefined")Journey.show(top)},"Fly to the "+titleOf(top)+" district"));
    const sub=(n.folder||"").split("/").slice(1).filter(Boolean);
    c.replaceChildren();const sep=()=>{const s=el("span","ux-cs"," › ");s.setAttribute("aria-hidden","true");return s};
    parts.forEach((p,i)=>{if(i)c.append(sep());c.append(p)});sub.forEach(s=>{const w=el("span","ux-sub");w.append(sep(),document.createTextNode(s));c.append(w)});
    const b=el("b",undefined,n.name);b.setAttribute("aria-current","page");c.append(sep(),b);
  }

  // ---- offline and boot failure
  let net=null;
  function netState(){
    const off=typeof navigator!=="undefined"&&navigator.onLine===false;
    if(off){if(!net){net=el("div","ux-net");net.setAttribute("role","status");const top=q(".hudtop");(top||document.body).append(net)}
      net.innerHTML="<i aria-hidden=\"true\"></i><b>Offline</b><span> · loaded notes stay readable; saves and live updates resume when you reconnect</span>";net.hidden=false}
    else if(net&&!net.hidden){net.hidden=true;notify("Back online. Live updates resume.")}
  }
  let fail=null;
  function fatal(err,retry){
    if(!fail){fail=el("div","ux-fail");fail.setAttribute("role","alertdialog");fail.setAttribute("aria-modal","true");fail.setAttribute("aria-labelledby","uxFailT");document.body.append(fail)}
    const off=navigator.onLine===false,msg=String(err&&err.message||err||"Unknown error").slice(0,240);
    fail.innerHTML="";const card=el("div","ux-fail-card");const h=el("h2",undefined,off?"You are offline":"The vault did not load");h.id="uxFailT";
    card.append(el("small",undefined,"Collective AI · Vault"),h,el("p",undefined,off?"Reconnect, then try again. Nothing was lost.":"Your notes are safe on the server. This is usually a network hiccup."),el("code",undefined,msg));
    const row=el("div","ux-coach-act");const again=el("button","btn pri","Try again");again.type="button";again.onclick=async()=>{again.disabled=true;again.textContent="Trying…";fail.hidden=true;try{await retry()}catch(e){fatal(e,retry)}};
    const reload=el("button","btn","Reload page");reload.type="button";reload.onclick=()=>location.reload();row.append(again,reload);card.append(row);fail.append(card);fail.hidden=false;
    again.focus({preventScroll:true});
  }

  // ---- shortcut sheet: add the go-anywhere keys, correct Ctrl K
  function patchKeys(){
    const grid=q("#keys .keys-grid");if(!grid||grid.querySelector(".ux-keys"))return;
    grid.querySelectorAll("dd").forEach(dd=>{if(/^Find a note/.test(dd.textContent))dd.textContent="Go to a note, district, Warden or agent"});
    const s=el("section","ux-keys");s.innerHTML="<h3>Go anywhere</h3><dl><dt><kbd>/</kbd></dt><dd>Search inside notes</dd><dt><kbd>]</kbd><kbd>[</kbd></dt><dd>Step through nearby buildings</dd><dt><kbd>Shift</kbd><kbd>]</kbd></dt><dd>Step through districts</dd><dt><kbd>Enter</kbd></dt><dd>Open the chosen building</dd><dt><kbd>Ctrl</kbd><kbd>Z</kbd></dt><dd>Undo the last dismissal</dd></dl>";
    grid.append(s);
  }

  // ---- styles (theme tokens from a_head.html, so day, dusk, night and light all apply)
  const CSS=`
.ux-vh{position:absolute!important;width:1px;height:1px;overflow:hidden;clip:rect(0 0 0 0);white-space:nowrap}
.ux-go{gap:6px}.ux-go svg{width:16px;height:16px;fill:none;stroke:currentColor;stroke-width:2;stroke-linecap:round}
.ux-pal{position:fixed;inset:0;z-index:62;display:flex;justify-content:center;align-items:flex-start;padding:12vh 12px 12px;background:rgba(4,6,12,.5);opacity:0;transition:opacity var(--dur-2,.18s)}
.ux-pal.on{opacity:1}.ux-pal[hidden]{display:none}
.ux-pal-box{width:min(640px,100%);max-height:76vh;display:flex;flex-direction:column;background:var(--panel);border:1px solid var(--line);border-top:2px solid var(--accent);border-radius:14px;box-shadow:0 24px 70px rgba(0,0,0,.45);overflow:hidden;transform:translateY(-6px) scale(.985);transition:transform var(--dur-2,.18s) var(--ease-out,ease)}
.ux-pal.on .ux-pal-box{transform:none}
.ux-pal-in{display:flex;align-items:center;gap:6px;padding:6px 6px 6px 14px;border-bottom:1px solid var(--line)}
.ux-pal-in input{flex:1;min-width:0;min-height:44px;font:16px var(--body);color:var(--fg);background:transparent;border:0;outline:0}
.ux-pal-x{min-width:44px;min-height:44px}
.ux-pal-l{list-style:none;margin:0;padding:6px;overflow:auto;overscroll-behavior:contain}
.ux-pal-g{font:600 10.5px var(--mono);letter-spacing:.08em;text-transform:uppercase;color:var(--faint);padding:10px 10px 4px}
.ux-pal-o{display:grid;grid-template-columns:10px minmax(0,1fr) auto;align-items:center;gap:10px;min-height:44px;padding:0 10px;border-radius:9px;cursor:pointer}
.ux-pal-o b{font-weight:500;color:var(--fg);overflow:hidden;text-overflow:ellipsis;white-space:nowrap}
.ux-pal-o small{font:11px var(--mono);color:var(--muted);overflow:hidden;text-overflow:ellipsis;white-space:nowrap;max-width:40vw}
.ux-pal-o.on{background:var(--accent-soft);box-shadow:inset 2px 0 0 var(--accent)}
.ux-pal-dot{width:8px;height:8px;border-radius:50%;background:var(--muted)}
.ux-pal-o.k-action .ux-pal-dot{border-radius:2px;background:var(--accent)}.ux-pal-o.k-warden .ux-pal-dot{transform:rotate(45deg);border-radius:1px}
.ux-pal-none{padding:18px 12px;color:var(--muted)}
.ux-pal-foot{display:flex;flex-wrap:wrap;gap:4px 14px;padding:8px 14px;border-top:1px solid var(--line);font:11px var(--mono);color:var(--faint)}
.ux-pal-foot kbd{margin-right:2px}
.ux-coach{position:absolute;right:14px;top:60px;z-index:12;width:min(310px,calc(100% - 28px));overflow-y:auto;overscroll-behavior:contain;background:linear-gradient(180deg,var(--accent-soft),transparent 40%),var(--hud);-webkit-backdrop-filter:var(--glass);backdrop-filter:var(--glass);border:1px solid var(--line);border-radius:14px;box-shadow:var(--lift);color:var(--fg)}
.ux-coach[hidden]{display:none}
.ux-coach-head{all:unset;box-sizing:border-box;display:grid;grid-template-columns:minmax(0,1fr) auto;align-items:center;gap:2px 10px;width:100%;min-height:48px;padding:8px 14px;cursor:pointer;position:relative}
.ux-coach-head:focus-visible{outline:3px solid var(--accent);outline-offset:-3px}
.ux-coach-t{display:grid;gap:2px}.ux-coach-t small{font:600 10.5px var(--mono);letter-spacing:.08em;text-transform:uppercase;color:var(--accent-ink)}.ux-coach-t b{font:600 15px var(--display)}
.ux-coach-bar{position:absolute;left:0;bottom:0;height:2px;width:100%;background:var(--line)}
.ux-coach-bar::after{content:"";position:absolute;inset:0;background:var(--accent);transform-origin:left;transform:scaleX(var(--p,0));transition:transform var(--dur-3,.3s) var(--ease-out,ease)}
.ux-coach-chev{color:var(--muted);transition:transform var(--dur-2,.18s)}.ux-coach.min .ux-coach-chev{transform:rotate(-90deg)}
.ux-coach.min .ux-coach-body,.ux-coach.auto-min .ux-coach-body{display:none}.ux-coach.auto-min .ux-coach-chev{transform:rotate(-90deg)}
.ux-coach-body{padding:4px 14px 14px}.ux-coach-body p{margin:8px 0 10px;font-size:13px;line-height:1.5;color:var(--muted)}
.ux-coach-steps{list-style:none;margin:4px 0 0;padding:0;display:grid;gap:4px;counter-reset:s}
.ux-coach-steps li{counter-increment:s;display:flex;align-items:center;gap:8px;font-size:12.5px;color:var(--muted)}
.ux-coach-steps li::before{content:counter(s);display:grid;place-items:center;width:18px;height:18px;border-radius:50%;border:1px solid var(--line);font:600 10px var(--mono)}
.ux-coach-steps li.now{color:var(--fg)}.ux-coach-steps li.now::before{border-color:var(--accent);color:var(--accent-ink)}
.ux-coach-steps li.done{text-decoration:line-through}.ux-coach-steps li.done::before{content:"✓";background:var(--accent);border-color:var(--accent);color:#1a1204}
.ux-coach-act{display:flex;flex-wrap:wrap;gap:8px;align-items:center}.ux-coach-act .btn{min-height:40px;padding:0 14px}
.ux-link{background:none!important;border-color:transparent!important;color:var(--muted)!important;text-decoration:underline}
.ux-coach.pop{animation:uxPop .6s var(--ease-spring,ease) both}
@keyframes uxPop{0%{transform:scale(1)}35%{transform:scale(1.03);box-shadow:0 0 0 3px var(--accent-soft),var(--lift)}100%{transform:scale(1)}}
@media (min-width:761px){body:has(#sheet.open:not(.full)) .ux-coach{right:calc(min(520px,100%) + 14px)}}
.ux-cue{position:absolute;left:50%;bottom:96px;transform:translateX(-50%);z-index:13;max-width:min(560px,calc(100% - 24px));padding:9px 14px;border-radius:10px;background:var(--hud);-webkit-backdrop-filter:var(--glass);backdrop-filter:var(--glass);border:1px solid var(--accent);font:12px var(--mono);color:var(--fg);white-space:pre;overflow:hidden;text-overflow:ellipsis;opacity:0;transition:opacity var(--dur-2,.18s);pointer-events:none}
.ux-cue.on{opacity:1}
.ux-net{display:flex;align-items:center;gap:6px;min-height:32px;padding:0 11px;border-radius:9px;background:var(--hud);border:1px solid var(--warn);font:11.5px var(--mono);color:var(--fg);min-width:0;overflow:hidden;white-space:nowrap;text-overflow:ellipsis}
.ux-net i{width:7px;height:7px;border-radius:50%;background:var(--warn);flex:none}.ux-net[hidden]{display:none}
.ux-fail{position:fixed;inset:0;z-index:90;display:grid;place-items:center;padding:16px;background:rgba(4,6,12,.72)}.ux-fail[hidden]{display:none}
.ux-fail-card{width:min(440px,100%);background:var(--panel);color:var(--fg);border:1px solid var(--line);border-top:2px solid var(--bad);border-radius:14px;padding:20px}
.ux-fail-card small{font:600 10.5px var(--mono);letter-spacing:.08em;text-transform:uppercase;color:var(--muted)}.ux-fail-card h2{margin:6px 0 8px;font:600 22px var(--display)}
.ux-fail-card p{color:var(--muted);line-height:1.5}.ux-fail-card code{display:block;margin:0 0 14px;padding:8px 10px;border-radius:8px;background:var(--panel2);font:11.5px var(--mono);color:var(--muted);overflow-wrap:anywhere}
.ux-fail-card .btn{min-height:44px;padding:0 18px}
.ux-undo{flex:none;min-height:32px;padding:0 10px;border-radius:7px;border:1px solid var(--accent);background:transparent;color:var(--accent-ink);font:600 12px var(--body);cursor:pointer}
.crumb .ux-cb{all:unset;cursor:pointer;border-radius:4px;padding:0 1px}.crumb .ux-cb:hover{color:var(--fg);text-decoration:underline}.crumb .ux-cb:focus-visible{outline:2px solid var(--accent);outline-offset:1px}
.journey-kit{list-style:none;margin:8px 0 14px;padding:0;display:grid;gap:6px}
.journey-kit label{display:flex;align-items:center;gap:10px;min-height:44px;padding:0 12px;border:1px solid var(--line);border-radius:9px;cursor:pointer}
.journey-kit input{width:18px;height:18px;flex:none;accent-color:var(--accent)}
.journey-kit .done span{color:var(--muted);text-decoration:line-through}
@media (hover:none) and (pointer:coarse){.ux-undo{min-height:44px;min-width:56px}}
@media (max-width:760px){
  .ux-coach{left:8px;right:8px;width:auto;top:calc(max(6px,env(safe-area-inset-top,0px)) + 52px)}
  .stage.walking .ux-coach{opacity:0;pointer-events:none}
  .stage:has(.dbanner:not([hidden])) .ux-coach{visibility:hidden}
  .ux-coach-act .btn{min-height:44px}
  .ux-net span{display:none}
  .ux-cue{bottom:calc(var(--rbh,46px) + 70px);white-space:normal}
  .ux-pal{padding:calc(max(8px,env(safe-area-inset-top,0px))) 8px 8px}.ux-pal-box{max-height:calc(100dvh - 24px)}
  .ux-pal-o small{display:none}
  .crumb .ux-cb:first-child,.crumb .ux-cb:first-child+.ux-cs,.crumb .ux-sub{display:none}
}
@media (prefers-reduced-motion:reduce){.ux-pal,.ux-pal-box,.ux-coach-bar::after,.ux-cue,.ux-coach-chev{transition:none}.ux-coach.pop{animation:none}}
`;

  // ---- wiring: wrap the shared note/sheet/crumb functions once, without changing what they do
  let wired=false,afterEntered=false;
  function wire(){
    if(wired)return;wired=true;
    if(typeof open==="function"){const base=open;open=function(n){const prev=typeof cur!=="undefined"?cur:null;const r=base.apply(this,arguments);try{afterOpen(n,prev)}catch(e){console.warn(e)}return r}}
    if(typeof openSheet==="function"){const base=openSheet;openSheet=function(){const r=base.apply(this,arguments);try{if(typeof sheet!=="undefined"&&sheet.view==="agents"&&sheet.atab==="board")mark("task")}catch(e){}return r}}
    if(typeof updateCrumb==="function"){const base=updateCrumb;updateCrumb=function(){const r=base.apply(this,arguments);try{renderCrumb()}catch(e){}return r}}
    if(typeof Campus!=="undefined"&&typeof Campus.flyDistrict==="function"){const base=Campus.flyDistrict;Campus.flyDistrict=function(top){const r=base.apply(this,arguments);hint("district",TOUCH()?"Tap the district's Warden to hear what is open here.":"Walk up to the district's Warden and press E to hear what is open here.");return r}}
    if(typeof Campus!=="undefined"&&typeof Campus.toggleWalk==="function"){const base=Campus.toggleWalk;Campus.toggleWalk=function(){const r=base.apply(this,arguments);try{if(Campus.position().walking)hint("walk",TOUCH()?"Left stick moves. Drag anywhere to look. Tap a building to read it.":"WASD or the arrows move. Shift runs, Q and E turn, F stops walking.")}catch(e){}return r}}
  }
  function afterOpen(n,prev){
    if(!n)return;remember(n);mark("note");
    const top=topOf(n),d=typeof Districts!=="undefined"?Districts.get(top):null;
    if(d&&d.kit&&d.kit.length)kitMark(top,0,true);
    if(prev&&prev!==n&&(has(prev.out,n.id)||has(prev.back,n.id))){mark("cable");if(d&&d.kit&&d.kit.length>1)kitMark(top,1,true)}
    hint("note",TOUCH()?"Tap Go to at the top to jump to any note, district or Warden.":"Alt ← and Alt → step back and forward. Ctrl K goes anywhere.");
  }
  function addGoButton(){
    const top=q(".hudtop");if(!top||q("#uxGo"))return;
    const b=el("button","hudbtn ux-go");b.id="uxGo";b.type="button";b.setAttribute("aria-label","Go to a note, district, Warden or agent (Ctrl K)");b.title="Go to (Ctrl K)";b.setAttribute("aria-haspopup","dialog");
    b.innerHTML='<svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="11" cy="11" r="6.5"/><path d="M20 20l-4.2-4.2"/></svg>';b.onclick=()=>openPal();
    const crumb=q("#crumb");if(crumb&&crumb.parentElement===top)crumb.after(b);else top.append(b);
    if(crumb){crumb.setAttribute("role","navigation");crumb.setAttribute("aria-label","You are here")}
  }
  function addWorldInfo(){
    const top=q(".hudtop"),plate=q("#plate");if(!top||!plate||q("#uxWorldInfo"))return;
    const b=el("button","hudbtn");b.id="uxWorldInfo";b.type="button";b.title="About this city";b.setAttribute("aria-label","About this city");b.setAttribute("aria-controls","plate");b.setAttribute("aria-expanded",String(!plate.hidden));
    b.innerHTML='<svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="9"/><path d="M12 10v7M12 6v1"/></svg>';
    b.onclick=()=>{plate.hidden=!plate.hidden;b.setAttribute("aria-expanded",String(!plate.hidden))};top.append(b);
    // Existing Dismiss and navigation actions also update this disclosure state.
    if(typeof MutationObserver!=="undefined")new MutationObserver(()=>b.setAttribute("aria-expanded",String(!plate.hidden))).observe(plate,{attributes:true,attributeFilter:["hidden"]});
  }
  // Called by e_boot once the city is up: the first walk, the canvas hint and the HUD button.
  function afterEnter(){
    if(afterEntered)return;afterEntered=true;wire();addGoButton();addWorldInfo();patchKeys();netState();
    const gl=q("#gl");if(gl){gl.setAttribute("aria-label","3D campus. Drag to orbit, scroll to zoom, click a building to open its note. Square brackets step through nearby buildings, Enter opens one, Ctrl K goes anywhere.");gl.addEventListener("focus",()=>{if(!TOUCH())hint("canvas","[ and ] step through nearby buildings. Enter opens one. Shift [ ] steps through districts.")},{once:false})}
    // the walk needs the 3D city (Wardens, cables); without WebGL the reader-first layout stays uncluttered
    const w=walkState();if(campusOk()&&!w.hidden&&!w.finished)setTimeout(()=>{if(!q("#title"))showWalk(false)},RM()?200:1400);
  }
  function init(){
    if(!document.getElementById("uxCss")){const s=document.createElement("style");s.id="uxCss";s.textContent=CSS;document.head.append(s)}
    if(!live){live=el("div","ux-vh");live.id="uxLive";live.setAttribute("role","status");live.setAttribute("aria-live","polite");live.setAttribute("aria-atomic","true");document.body.append(live)}
    window.addEventListener("keydown",onKey,true);
    window.addEventListener("online",netState);window.addEventListener("offline",netState);
  }
  if(typeof document!=="undefined"){if(document.readyState==="loading")document.addEventListener("DOMContentLoaded",init,{once:true});else init()}
  return{ensureQuality,setQuality,qualityLabel,detectQuality,undo,runUndo,hint,say,openPal,closePal,showWalk,hideWalk,mark,walk:walkState,kitState,kitMark,afterEnter,fatal,
    stepBuilding,stepDistrict,_test:{score,nearbyIds,sources,STEPS,nextStep,closeUp,syncAutoMin}};
})();
