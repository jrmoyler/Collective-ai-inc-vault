// =====================================================================
// Momentum: reasons to stay on the floor one more task.
// Heat     · every own write, claim, ship, message or new note read inside 8 minutes of the last one adds to a chain.
//            The ring on the chip drains as the window closes; a quiet 8 minutes cools the chain to zero.
// Runs     · three goals at a time, picked from the day's seed. Clearing a run opens the next one, a step harder.
// Stakes   · streak at risk until today's first XP lands (UTC day, as the server counts it), XP to the next level,
//            the gap to whoever is one place above you this week, and the next open commission with its bounty.
// Leaving  · with a hot chain, a run one goal from done or an unsecured streak, the browser asks before the tab closes,
//            and moving the pointer out through the top of the window shows what is on the line. One click still leaves.
// Heat and runs are local to this browser and pay no XP. Every XP figure shown is the server's (d_live.js SCORING).
// =====================================================================
const Momentum=(()=>{
  const WINDOW=8*60e3,AWAY=2*60e3,INTENT_GAP=10*60e3;
  const WRITE=new Set(["created","added to","edited"]),SHIP=new Set(["finished","sent to review"]);
  const HEAT=[[0,"Cold"],[1,"Warm"],[3,"Hot"],[6,"Blazing"],[10,"White hot"]];
  // goal templates: what to count, the label, and the target for run k (0-based)
  const GOALS=[
    {id:"read",what:k=>`Read ${3+2*k} notes`,need:k=>3+2*k,count:c=>c.read},
    {id:"write",what:k=>k?`Write to ${1+k} notes`:"Write to a note",need:k=>1+k,count:c=>c.write},
    {id:"claim",what:()=>"Claim a commission",need:()=>1,count:c=>c.claim},
    {id:"ship",what:k=>k?`Ship ${1+(k>>1)} tasks to review or done`:"Ship a task to review or done",need:k=>1+(k>>1),count:c=>c.ship},
    {id:"say",what:k=>`Send ${2+k} floor messages`,need:k=>2+k,count:c=>c.say},
    {id:"roam",what:k=>`Work in ${2+k} districts`,need:k=>2+k,count:c=>c.districts},
    {id:"chain",what:k=>`Reach a chain of ${4+2*k}`,need:k=>4+2*k,count:c=>c.bestChain}];
  let quiet=false,me=null,st=null,chip=null,pop=null,isOpen=false,tick=0,hiddenAt=0,lastIntent=0,teamWhileAway=0,booted=false;

  const day=(ms=Date.now())=>new Date(ms).toISOString().slice(0,10);
  const key=()=>`vault.mo.${me?.id||"anon"}`;
  const fresh=()=>({day:day(),seen:[],c:{read:0,write:0,claim:0,ship:0,say:0,districts:0,bestChain:0},tops:[],reads:[],chain:0,at:0,rc:0,run:0,base:null,goals:null,runsDone:0,bestRuns:0});
  function load(){
    const s=store.get(key(),null);
    if(!s||s.day!==day()){const best=Math.max(s?.bestRuns|0,s?.runsDone|0);st=fresh();st.bestRuns=best;newRun();save();return}
    st=s;if(!st.goals)newRun();
  }
  const save=()=>store.set(key(),st);
  // deterministic per day and run, so a reload never reshuffles the goals in front of you
  function pick(seed){
    let h=2166136261;for(const ch of seed){h^=ch.charCodeAt(0);h=Math.imul(h,16777619)}
    const pool=GOALS.map(g=>g.id),out=[];while(out.length<3){h=Math.imul(h^(h>>>15),2246822507)>>>0;out.push(pool.splice(h%pool.length,1)[0])}return out;
  }
  function newRun(){st.goals=pick(`${me?.id}|${st.day}|${st.run}`);st.base={...st.c};st.rc=live()?st.chain:0}
  const goalRows=()=>st.goals.map(id=>{const g=GOALS.find(x=>x.id===id),need=g.need(st.run),raw=id==="chain"?(st.rc|0):g.count(st.c)-(st.base?.[id==="roam"?"districts":id]|0);return{id,what:g.what(st.run),need,have:Math.max(0,Math.min(need,raw))}});
  const left=()=>goalRows().filter(g=>g.have<g.need).length;

  // ---- the chain
  const live=()=>st.chain>0&&Date.now()-st.at<WINDOW;
  const remain=()=>live()?1-(Date.now()-st.at)/WINDOW:0;
  const heat=n=>{let h=HEAT[0][1];for(const [min,name] of HEAT)if(n>=min)h=name;return h};
  function bump(){
    st.chain=live()?st.chain+1:1;st.at=Date.now();
    if(st.chain>st.c.bestChain)st.c.bestChain=st.chain;if(st.chain>(st.rc|0))st.rc=st.chain;
    if(!quiet&&[3,6,10].includes(st.chain)){toast(`Chain ${st.chain} · ${heat(st.chain)}. Keep it inside 8 minutes.`);sfx("ui.toggle")}
  }

  // ---- counting
  function note(name){try{return byName.get(name)}catch(e){return null}}
  function district(name){const n=note(name);if(!n)return;const top=typeof Districts!=="undefined"&&Districts.worldTop?Districts.worldTop(n):n.top;if(top&&!st.tops.includes(top)){st.tops.push(top);st.c.districts=st.tops.length}}
  function onActivity(a){
    if(!me||!a)return;
    if(a.actor!==me.name){if(document.hidden&&(WRITE.has(a.kind)||SHIP.has(a.kind)))teamWhileAway++;return}
    if(day(Date.parse(a.ts))!==st.day)return;
    const id=String(a.id??`${a.ts}|${a.kind}|${a.note||a.task||""}`);if(st.seen.includes(id))return;st.seen.push(id);if(st.seen.length>400)st.seen=st.seen.slice(-400);
    const k=a.kind;let counted=true;
    if(WRITE.has(k)){st.c.write++;if(a.note)district(a.note)}
    else if(k==="claimed"||k==="assigned")st.c.claim++;
    else if(SHIP.has(k)){st.c.ship++;if(!quiet)setTimeout(()=>offerNext("Shipped."),900)}
    else if(k==="say")st.c.say++;
    else counted=false;
    if(counted)bump();
    settle();
  }
  // a note opened in this browser: counts once a day per note
  function onOpen(n){
    if(!me||!n||!n.name)return;if(st.day!==day())load();
    if(st.reads.includes(n.name))return;st.reads.push(n.name);if(st.reads.length>300)st.reads=st.reads.slice(-300);
    st.c.read++;district(n.name);bump();settle();
  }
  function settle(){
    if(st.goals&&left()===0){
      st.runsDone++;st.bestRuns=Math.max(st.bestRuns,st.runsDone);const done=st.run+1;st.run++;newRun();
      if(!quiet)toast(`Run ${done} cleared. Run ${done+1} is open: ${goalRows().map(g=>g.what).join(" · ")}`);sfx("task.done");
      try{const n=typeof Campus!=="undefined"&&Campus.selectedName&&Campus.selectedName();if(n&&Campus.celebrate)Campus.celebrate(n)}catch(e){}
    }
    save();draw();
  }

  // ---- stakes from the live snapshot
  function snap(){try{return Live.snapshot()}catch(e){return{tasks:[],stats:[],presence:[],agents:[]}}}
  const PRI={high:0,medium:1,low:2};
  function nextTask(s=snap()){
    return s.tasks.filter(t=>t.status==="open").sort((a,b)=>(PRI[a.priority]??1)-(PRI[b.priority]??1)||String(a.created_at||a.id).localeCompare(String(b.created_at||b.id)))[0]||null;
  }
  function mine(s=snap()){return s.tasks.filter(t=>t.agent===me?.name&&(t.status==="claimed"||t.status==="blocked"))}
  function stakes(){
    const s=snap(),r=s.stats.find(x=>x.actor===me?.name)||null,xp=r?.xp|0,lv=Identity.level(xp),to=Identity.nextAt(lv)-xp;
    const streak=Live.streakOf?Live.streakOf(r):0,secured=!!(r&&r.last_day===day());
    const weekOf=x=>x.week_start&&x.week_start!==weekStart()?0:(x.week_xp|0);
    const board=s.stats.filter(x=>x.actor!=="repo-sync"&&weekOf(x)>0).sort((a,b)=>weekOf(b)-weekOf(a));
    const myWeek=r?weekOf(r):0,above=board.filter(x=>weekOf(x)>myWeek).pop()||null,place=board.findIndex(x=>x.actor===me?.name);
    const liveNow=s.presence.filter(p=>p.status&&p.status!=="offline"&&p.status!=="idle"&&Date.now()-Date.parse(p.last_seen)<15*60e3).length;
    const now=new Date(),midnight=Date.UTC(now.getUTCFullYear(),now.getUTCMonth(),now.getUTCDate()+1);
    return{r,xp,lv,to,streak,secured,myWeek,above,gap:above?weekOf(above)-myWeek:0,place:place<0?null:place+1,liveNow,msLeft:midnight-Date.now(),next:nextTask(s),mine:mine(s)};
  }
  const weekStart=()=>{const d=new Date();d.setUTCHours(0,0,0,0);d.setUTCDate(d.getUTCDate()-((d.getUTCDay()+6)%7));return d.toISOString().slice(0,10)};
  const hm=ms=>{const m=Math.max(0,Math.round(ms/60e3));return m>=60?`${Math.floor(m/60)}h ${m%60}m`:`${m}m`};
  const name=a=>Live.agentName?Live.agentName(a):a;
  // what you would walk away from right now; empty when nothing is on the line
  function atStake(k=stakes()){
    const out=[];
    if(live()&&st.chain>=2)out.push(`a chain of ${st.chain} that cools in ${hm(remain()*WINDOW)}`);
    const l=left();if(l===1)out.push(`run ${st.run+1}, one goal from clear`);
    if(k.streak>0&&!k.secured)out.push(`your ${k.streak}-day streak, ${hm(k.msLeft)} until it breaks`);
    if(k.to>0&&k.to<=40)out.push(`level ${k.lv+1}, ${k.to} XP away`);
    if(k.above&&k.gap<=40)out.push(`place ${k.place||"?"}, ${k.gap} XP behind ${name(k.above.actor)}`);
    if(k.mine.length)out.push(`${k.mine.length} claimed task${k.mine.length===1?"":"s"} still open`);
    return out;
  }

  // ---- drawing
  const sfx=n=>{try{if(typeof VaultAudio!=="undefined")VaultAudio.sfx(n)}catch(e){}};
  const FLAME='<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 3c1 3.5 5 5.5 5 10a5 5 0 0 1-10 0c0-2.2 1.1-3.6 2.4-4.8.3 1.6 1.1 2.6 2.1 3 0-3.2-.6-5.8.5-8.2z"/></svg>';
  function draw(){
    if(!chip||!st)return;const n=live()?st.chain:0,f=remain(),h=heat(n);
    chip.dataset.heat=h.toLowerCase().replace(/\s/g,"");chip.style.setProperty("--mo",f.toFixed(3));
    chip.querySelector(".mo-n").textContent=n?`×${n}`:"0";
    const l=left();chip.querySelector(".mo-g").textContent=`${3-l}/3`;
    const label=`Momentum: ${h}${n?`, chain ${n}, ${hm(f*WINDOW)} left`:""}. Run ${st.run+1}: ${3-l} of 3 goals.`;
    chip.setAttribute("aria-label",label);chip.dataset.tip=label;
    if(isOpen)drawPop();
  }
  function bar(have,need){const p=need?Math.round(100*have/need):0;return `<i class="mo-bar"><i style="width:${p}%"></i></i>`}
  function drawPop(){
    const k=stakes(),n=live()?st.chain:0,goals=goalRows(),t=k.next;
    const streak=k.streak>0?(k.secured?`Day ${k.streak} secured`:`Day ${k.streak} at risk · ${hm(k.msLeft)} left`):k.secured?"Day 1 secured":`No streak · earn XP before ${hm(k.msLeft)} runs out`;
    pop.innerHTML=`<header><small>Momentum · run ${st.run+1}</small><b>${esc(heat(n))}${n?` <span>chain ${n} · ${hm(remain()*WINDOW)}</span>`:` <span>act to start a chain</span>`}</b>${bar(Math.round(remain()*100),100)}</header>
<ul class="mo-goals">${goals.map(g=>`<li class="${g.have>=g.need?"ok":""}"><span>${esc(g.what)}</span><b>${g.have}/${g.need}</b>${bar(g.have,g.need)}</li>`).join("")}</ul>
<dl class="mo-stakes">
<dt>Streak</dt><dd class="${k.streak>0&&!k.secured?"risk":""}">${esc(streak)}</dd>
<dt>Level ${k.lv}</dt><dd>${k.to} XP to ${esc(Identity.title(k.lv+1))}${bar(k.xp-Identity.nextAt(k.lv-1),Identity.nextAt(k.lv)-Identity.nextAt(k.lv-1))}</dd>
<dt>This week</dt><dd>${k.myWeek} XP${k.place?` · place ${k.place}`:""}${k.above?` · ${k.gap} behind ${esc(name(k.above.actor))}`:k.place===1?" · you lead":""}</dd>
<dt>Floor</dt><dd>${k.liveNow} working now · ${st.runsDone} run${st.runsDone===1?"":"s"} cleared today${st.bestRuns>st.runsDone?` · best ${st.bestRuns}`:""}</dd>
</dl>
${t?`<div class="mo-next"><small>Next commission</small><b>${esc(t.title||t.id)}</b><span>${esc(t.priority||"medium")} · +${Live.bounty?Live.bounty(t.priority):80} XP${t.note?` · ${esc(t.note)}`:""}</span></div>`:`<p class="mo-none">No open commissions. Open one from the board and it pays 8 XP.</p>`}
<div class="mo-go">${t?`<button class="btn pri" type="button" data-mo="board">Take it</button>`:`<button class="btn pri" type="button" data-mo="board">Open the board</button>`}${t&&t.note&&note(t.note)?`<button class="btn" type="button" data-mo="note">Read its note</button>`:""}<button class="btn" type="button" data-mo="ranks">Ranks</button></div>`;
  }
  function toggle(on){
    isOpen=on===undefined?!isOpen:!!on;if(!pop)return;pop.hidden=!isOpen;chip.setAttribute("aria-expanded",String(isOpen));
    if(isOpen){drawPop();sfx("ui.open");const b=pop.querySelector("button");if(b&&!matchMedia("(pointer:coarse)").matches)b.focus()}
  }
  function go(what){
    const t=nextTask();toggle(false);closeCard();
    if(what==="note"&&t&&note(t.note)){open(note(t.note));return}
    try{sheet.atab=what==="ranks"?"ranks":"board";openSheet("agents")}catch(e){}
  }

  // ---- one more: after shipping, put the next commission in front of you
  function offerNext(lead){
    const t=nextTask();if(!t)return;
    card(`${lead} Next up: ${t.title||t.id}`,[`${t.priority||"medium"} priority · +${Live.bounty?Live.bounty(t.priority):80} XP`,left()?`${left()} goal${left()===1?"":"s"} left in run ${st.run+1}`:""].filter(Boolean),"Take it","Later");
  }
  // ---- leaving
  let cardEl=null;
  function closeCard(){if(cardEl){cardEl.remove();cardEl=null}}
  function card(title,lines,yes,no){
    closeCard();const el=document.createElement("div");el.className="mo-card";el.setAttribute("role","dialog");el.setAttribute("aria-label",title);
    el.innerHTML=`<div class="k">Momentum</div><b>${esc(title)}</b><ul>${lines.map(x=>`<li>${esc(x)}</li>`).join("")}</ul><div class="mo-go"><button class="btn pri" type="button" data-mo="board">${esc(yes)}</button><button class="btn" type="button" data-mo="x">${esc(no)}</button></div>`;
    el.addEventListener("click",e=>{const b=e.target.closest("[data-mo]");if(!b)return;if(b.dataset.mo==="x")closeCard();else go(b.dataset.mo)});
    document.body.appendChild(el);cardEl=el;sfx("ui.open");
    const b=el.querySelector(".pri");if(b&&!matchMedia("(pointer:coarse)").matches)b.focus();
  }
  function exitIntent(e){
    if(e.relatedTarget||e.clientY>0||!me||cardEl)return;if(Date.now()-lastIntent<INTENT_GAP)return;
    const s=atStake();if(!s.length)return;lastIntent=Date.now();
    card("Before you go",s.map(x=>x[0].toUpperCase()+x.slice(1)+"."),"One more task","Leave it");
  }
  function beforeUnload(e){
    if(window.__vaultLeaving||!me)return;
    if(!atStake().length)return;
    // browsers show their own wording; the card above is what names the stakes
    e.preventDefault();e.returnValue="";return "";
  }
  function onVisible(){
    if(document.hidden){hiddenAt=Date.now();teamWhileAway=0;return}
    if(!hiddenAt||Date.now()-hiddenAt<AWAY){hiddenAt=0;return}
    const away=Date.now()-hiddenAt;hiddenAt=0;if(!me)return;if(st.day!==day())load();
    const parts=[];if(teamWhileAway)parts.push(`${teamWhileAway} write${teamWhileAway===1?"":"s"} landed while you were away`);
    parts.push(live()?`chain ${st.chain} still warm for ${hm(remain()*WINDOW)}`:st.c.bestChain?`your chain cooled after ${hm(away)}`:"");
    const k=stakes();if(k.streak>0&&!k.secured)parts.push(`streak at risk, ${hm(k.msLeft)} left`);
    const msg=parts.filter(Boolean).join(" · ");if(msg)toast(`Welcome back. ${msg}.`);draw();
  }

  function mount(){
    chip=document.getElementById("momo");pop=document.getElementById("moPop");if(!chip||!pop)return false;
    chip.innerHTML=`<i class="mo-ring">${FLAME}</i><b class="mo-n">0</b><small class="mo-g">0/3</small>`;
    chip.addEventListener("click",e=>{e.stopPropagation();toggle()});
    pop.addEventListener("click",e=>{e.stopPropagation();const b=e.target.closest("[data-mo]");if(b)go(b.dataset.mo)});
    document.addEventListener("click",e=>{if(isOpen&&!pop.contains(e.target)&&!chip.contains(e.target))toggle(false)});
    document.addEventListener("keydown",e=>{if(e.key!=="Escape")return;if(cardEl)closeCard();else if(isOpen){toggle(false);chip.focus()}});
    return true;
  }
  // called once the live floor is up (e_boot.js), so me, stats and tasks are loaded
  function start(){
    if(booted)return;me=Live.me&&Live.me();if(!me)return;booted=true;load();
    if(!chip&&!mount())return;chip.hidden=false;
    // today's own rows already on the page (the last 60 activity rows) count once each
    quiet=true;snap().acts?.slice().reverse().forEach(a=>{if(a.actor===me.name&&day(Date.parse(a.ts))===st.day){const id=String(a.id);if(!st.seen.includes(id)){const at=st.at,ch=st.chain;onActivity(a);if(Date.now()-Date.parse(a.ts)>WINDOW){st.chain=ch;st.at=at}}}});quiet=false;
    window.addEventListener("vault:activity",e=>onActivity(e.detail));
    window.addEventListener("vault:stats",e=>{if(e.detail?.actor===me.name)draw()});
    if(typeof open==="function"){const _open=open;open=function(n,push){_open(n,push);onOpen(n)}}
    document.addEventListener("visibilitychange",onVisible);
    window.addEventListener("beforeunload",beforeUnload);
    if(matchMedia("(pointer:fine)").matches)document.documentElement.addEventListener("mouseout",exitIntent);
    clearInterval(tick);tick=setInterval(()=>{if(document.hidden)return;if(st.day!==day())load();draw()},1000);
    save();draw();
  }
  return{start,draw,toggle,stakes,atStake,goals:()=>goalRows(),state:()=>st&&{...st},pick,heat,_test:{onActivity,onOpen,bump,live,remain}};
})();
