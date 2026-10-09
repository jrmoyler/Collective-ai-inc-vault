// =====================================================================
// World clock: the campus time stays on screen. The chip shows the viewer's local time, which is the time the
// sun in the scene is computed from (c_campus.js SOL), with a sun or moon for the light outside. Tapping it opens
// a small panel: the same minute in other cities, the scene mode, and today's note.
// =====================================================================
const WorldClock=(()=>{
  const CITIES=[["New York","America/New_York"],["Los Angeles","America/Los_Angeles"],["London","Europe/London"],["Lagos","Africa/Lagos"],["Dubai","Asia/Dubai"],["Tokyo","Asia/Tokyo"],["Sydney","Australia/Sydney"],["UTC","UTC"]];
  const SUN='<svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M2 12h2M20 12h2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/></svg>';
  const MOON='<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M21 13A9 9 0 1 1 11 3a7 7 0 0 0 10 10z"/></svg>';
  const DUSK='<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M3 18h18M7 18a5 5 0 0 1 10 0M12 7v3M5.6 11.6l1.4 1.4M18.4 11.6L17 13M4 22h16"/></svg>';
  let btn=null,pop=null,timer=0,open=false;
  const local=()=>{try{return Intl.DateTimeFormat().resolvedOptions().timeZone||"UTC"}catch(e){return"UTC"}};
  // wall time in a zone, 24-hour, plus the zone's calendar day for the +1/−1 marker
  function at(zone,now=new Date()){
    try{
      const p=Object.fromEntries(new Intl.DateTimeFormat("en-CA",{timeZone:zone,hourCycle:"h23",year:"numeric",month:"2-digit",day:"2-digit",hour:"2-digit",minute:"2-digit"}).formatToParts(now).map(x=>[x.type,x.value]));
      return{time:`${p.hour}:${p.minute}`,hour:+p.hour+(+p.minute)/60,day:`${p.year}-${p.month}-${p.day}`};
    }catch(e){return null}
  }
  const abbr=(zone,now=new Date())=>{try{return new Intl.DateTimeFormat("en-US",{timeZone:zone,timeZoneName:"short"}).formatToParts(now).find(x=>x.type==="timeZoneName")?.value||zone}catch(e){return zone}};
  // the light outside: the scene's own sun elevation when the scene follows the clock, else the hour
  function phase(hour,elev){
    if(Number.isFinite(elev))return elev>6?"day":elev>-6?"twilight":"night";
    return hour>=7&&hour<18?"day":hour>=5&&hour<20?"twilight":"night";
  }
  const icon=p=>p==="day"?SUN:p==="night"?MOON:DUSK;
  const scene=()=>{try{return typeof Campus!=="undefined"&&Campus.sun?Campus.sun():null}catch(e){return null}};
  const dayShift=(a,b)=>a===b?"":a>b?" +1":" −1";

  function draw(){
    if(!btn)return;const now=new Date(),zone=local(),me=at(zone,now)||{time:"--:--",hour:12,day:""},s=scene();
    const auto=!s||s.mode==="auto",ph=auto?phase(me.hour,s?s.elev:NaN):s.mode==="night"?"night":s.mode==="dawn"||s.mode==="dusk"?"twilight":"day";
    btn.dataset.phase=ph;
    btn.querySelector(".wc-ph").innerHTML=icon(ph);
    btn.querySelector(".wc-t").textContent=me.time;
    btn.querySelector(".wc-z").textContent=auto?abbr(zone,now):s.mode;
    const label=`World clock: ${me.time} ${abbr(zone,now)}, ${ph}${auto?"":`, scene set to ${s.mode}`}`;
    btn.setAttribute("aria-label",label);btn.dataset.tip=label;
    if(open)drawPop(now,zone,me,s,auto);
  }
  function drawPop(now,zone,me,s,auto){
    const rows=[[`Here · ${zone.split("/").pop().replace(/_/g," ")}`,zone]].concat(CITIES.filter(c=>c[1]!==zone));
    const sun=s&&Number.isFinite(s.elev)?` · sun ${Math.round(s.elev)}°`:"";
    pop.innerHTML=`<header><small>World clock</small><b>${me.time} <span>${esc(abbr(zone,now))}</span></b><em>${new Date().toLocaleDateString(undefined,{weekday:"long",month:"long",day:"numeric"})}</em></header>
<ul>${rows.map(([name,z],i)=>{const t=at(z,now);if(!t)return"";const p=i===0&&auto&&s?phase(t.hour,s.elev):phase(t.hour,NaN);return `<li class="${i===0?"here":""}" data-phase="${p}"><i>${icon(p)}</i><span>${esc(name)}</span><b>${t.time}<small>${dayShift(t.day,me.day)}</small></b></li>`}).join("")}</ul>
<p class="wc-scene">Scene: ${auto?`follows this clock${sun}`:`fixed at ${esc(s.mode)}`}</p>
<div class="wc-go"><button class="btn pri" type="button" data-wc="today">Today's note</button><button class="btn" type="button" data-wc="time">${auto?"Change scene":"Next scene"}</button></div>`;
  }
  function toggle(on){
    open=on===undefined?!open:!!on;if(!pop)return;pop.hidden=!open;btn.setAttribute("aria-expanded",String(open));
    if(open){draw();const first=pop.querySelector("button");if(first&&!matchMedia("(pointer:coarse)").matches)first.focus()}
  }
  function schedule(){clearTimeout(timer);const now=new Date();timer=setTimeout(()=>{draw();schedule()},(60-now.getSeconds())*1000-now.getMilliseconds()+30)}
  function mount(){
    btn=document.getElementById("wclock");pop=document.getElementById("wcPop");if(!btn||!pop)return false;
    btn.addEventListener("click",e=>{e.stopPropagation();toggle()});
    pop.addEventListener("click",e=>{
      e.stopPropagation();const b=e.target.closest("[data-wc]");if(!b)return;
      if(b.dataset.wc==="today"){toggle(false);if(typeof openToday==="function")openToday()}
      else if(b.dataset.wc==="time"){if(typeof Campus!=="undefined")Campus.cycleTime();draw()}
    });
    document.addEventListener("click",e=>{if(open&&!pop.contains(e.target)&&e.target!==btn)toggle(false)});
    document.addEventListener("keydown",e=>{if(open&&e.key==="Escape"){toggle(false);btn.focus()}});
    document.addEventListener("visibilitychange",()=>{if(!document.hidden){draw();schedule()}});
    const rt=document.getElementById("rbTime");if(rt)rt.addEventListener("click",()=>setTimeout(draw,0));
    draw();schedule();return true;
  }
  if(document.readyState==="loading")document.addEventListener("DOMContentLoaded",mount);else mount();
  return{draw,toggle,at,phase,isOpen:()=>open};
})();
