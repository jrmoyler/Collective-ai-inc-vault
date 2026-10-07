// ---------- HUD: loading progress, toast stack, district counts, switcher dialog semantics, shortcut sheet, sky phase.
// Pure DOM, no Three.js. Other modules reach it only through window.HUD, so a missing HUD never throws.
// Styles live in a_head.html (.ld-*, .toasts, .keys, .navfab, [data-phase]).
const HUD=window.HUD=(()=>{
  const q=s=>document.querySelector(s);
  const typingIn=el=>!!el&&(/^(INPUT|TEXTAREA|SELECT)$/.test(el.tagName)||el.isContentEditable===true);
  const nf=n=>Number(n).toLocaleString("en-US");

  // ---- loading: named steps, notes paged in 1,000-row chunks, a real bar when the total is known
  const STEPS=["session","notes","live","city"];
  const ld={step:"",loaded:0,total:null,page:0};
  function paint(){
    const steps=q("#ldSteps");if(steps){const at=STEPS.indexOf(ld.step);steps.querySelectorAll("li[data-step]").forEach(li=>{const i=STEPS.indexOf(li.dataset.step);li.dataset.state=i<at?"done":i===at?"now":"next"})}
    const bar=q("#ldBar"),count=q("#ldCount");
    if(bar){
      const known=ld.step==="notes"&&ld.total>0;
      const pct=known?Math.min(100,Math.round(ld.loaded/ld.total*100)):null;
      bar.classList.toggle("ind",pct===null);
      if(pct===null){bar.removeAttribute("aria-valuenow");bar.removeAttribute("aria-valuetext")}
      else{bar.setAttribute("aria-valuenow",String(pct));bar.setAttribute("aria-valuetext",pct+"%")}
      bar.setAttribute("aria-valuemin","0");bar.setAttribute("aria-valuemax","100");
      const fill=bar.firstElementChild;if(fill)fill.style.width=pct===null?"":pct+"%";
    }
    if(count){
      if(ld.step==="notes")count.textContent=ld.total>0?nf(ld.loaded)+" of "+nf(ld.total)+" notes · page "+ld.page+" of "+Math.max(1,Math.ceil(ld.total/1000)):ld.page?nf(ld.loaded)+" notes · page "+ld.page:"Asking for the first page";
      else if(ld.step==="live")count.textContent=nf(ld.loaded)+" notes loaded · agents, tasks and presence next";
      else if(ld.step==="city")count.textContent=nf(ld.loaded)+" notes · placing buildings";
      else if(ld.step==="session")count.textContent="Team members only";
    }
  }
  // stage(step,title) returns a promise that resolves after the browser has had a chance to paint it,
  // so a long synchronous step (building the city) shows its label first.
  function stage(step,title){
    if(STEPS.includes(step))ld.step=step;
    const t=q("#ldTitle");if(t&&title)t.textContent=title;
    const l=q("#loading");if(l&&step==="session")l.classList.add("gated");else if(l)l.classList.remove("gated");
    paint();
    return new Promise(r=>{let done=false;const go=()=>{if(!done){done=true;r()}};setTimeout(go,60);if(typeof requestAnimationFrame==="function")requestAnimationFrame(()=>setTimeout(go,0))});
  }
  function progress(p={}){
    if(Number.isFinite(p.loaded))ld.loaded=p.loaded;
    if(Number.isFinite(p.total)&&p.total>0)ld.total=p.total;
    if(Number.isFinite(p.page))ld.page=p.page;
    paint();
  }

  // ---- toasts: a stack of at most three, duplicates collapse into a count, hover or focus holds them
  let stack=null;
  function tone(m){
    const s=String(m);
    if(/^(could not|couldn't|cannot|can't|no note|that note doesn't|use |give |name |write something|that name exists|names can't)/i.test(s)||/\b(failed|error|unavailable|paused)\b/i.test(s))return"bad";
    if(/\b(finished|published|saved|added|achievement|\+\d+ XP)\b/i.test(s))return"ok";
    if(/\bsays:/i.test(s))return"info";
    return"accent";
  }
  function dismiss(t){
    if(!t||t.classList.contains("out"))return;clearTimeout(t._timer);t.classList.add("out");
    const rm=()=>t.remove();t.addEventListener("animationend",rm,{once:true});setTimeout(rm,400);
  }
  function arm(t){clearTimeout(t._timer);t._timer=setTimeout(()=>dismiss(t),t._life);const bar=t.querySelector(".tl");if(bar){bar.style.animation="none";void bar.offsetWidth;bar.style.animation="";bar.style.setProperty("--life",t._life+"ms")}}
  function toast(m,opts={}){
    const msg=String(m==null?"":m);
    if(!stack||!stack.isConnected){stack=document.createElement("div");stack.id="toasts";stack.className="toasts";stack.setAttribute("role","status");stack.setAttribute("aria-live","polite");document.body.appendChild(stack)}
    const same=[...stack.children].find(t=>t.dataset.msg===msg&&!t.classList.contains("out"));
    if(same){const n=(+same.dataset.n||1)+1;same.dataset.n=String(n);same.querySelector(".tn").textContent="×"+n;same.querySelector(".tn").hidden=false;arm(same);return same}
    const live=[...stack.children].filter(t=>!t.classList.contains("out"));
    while(live.length>=3)dismiss(live.shift());
    const kind=opts.tone||tone(msg);
    const t=document.createElement("div");t.className="toast tone-"+kind;t.dataset.msg=msg;
    const dot=document.createElement("i");dot.className="ti";dot.setAttribute("aria-hidden","true");
    const text=document.createElement("span");text.className="tm";text.textContent=msg;
    const n=document.createElement("b");n.className="tn";n.hidden=true;
    const x=document.createElement("button");x.type="button";x.className="tx";x.setAttribute("aria-label","Dismiss message");x.innerHTML='<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M7 7l10 10M17 7L7 17"/></svg>';x.onclick=e=>{e.stopPropagation();dismiss(t)};
    const life=document.createElement("i");life.className="tl";life.setAttribute("aria-hidden","true");
    t.append(dot,text,n,x,life);
    t._life=opts.ms||Math.max(2600,Math.min(7000,2000+msg.length*45))+(kind==="bad"?1500:0);
    const hold=()=>{clearTimeout(t._timer);t.classList.add("held")},resume=()=>{t.classList.remove("held");clearTimeout(t._timer);t._timer=setTimeout(()=>dismiss(t),1600)};
    t.addEventListener("pointerenter",hold);t.addEventListener("pointerleave",resume);t.addEventListener("focusin",hold);t.addEventListener("focusout",resume);
    stack.appendChild(t);arm(t);return t;
  }

  // ---- district counts follow Districts.all, including after Journey.loadCatalog redefines the thematic set
  function syncDistricts(){
    const n=typeof Districts!=="undefined"&&Districts.all?Districts.all.length:0;
    const label=n?n+" districts":"Districts";
    const c=q("#districtCount");if(c)c.textContent=n?" · "+label:"";
    const b=q("#districtNavigator.navfab");if(b){const s=b.querySelector("span");if(s)s.textContent=label;else b.textContent=label}
    return n;
  }
  // The no-WebGL path has no chip row, so boot asks for a floating navigator button styled by .navfab.
  function navFallback(onOpen){
    if(document.getElementById("districtNavigator"))return null;
    const b=document.createElement("button");b.id="districtNavigator";b.type="button";b.className="btn navfab";b.setAttribute("aria-label","Open district navigator");
    b.innerHTML='<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 5h7v6H4zM13 5h7v4h-7zM13 11h7v8h-7zM4 13h7v6H4z"/></svg><span></span>';
    b.onclick=onOpen;(q("#stage")||document.body).append(b);syncDistricts();return b;
  }

  // ---- quick switcher: modal semantics (aria-modal, inert background, focus held, focus returned, listbox roles)
  function bindSwitcher(){
    const modal=q("#modal"),app=q("#app"),input=q("#swq"),list=q("#swl");if(!modal||!app||!input||!list)return;
    // Remember the last focus outside the switcher: openSwitcher moves focus into it before this observer runs.
    let opener=null,lastOutside=null;
    document.addEventListener("focusin",e=>{if(!modal.contains(e.target))lastOutside=e.target},true);
    const setInert=on=>{try{app.inert=on}catch(e){}if(on)app.setAttribute("aria-hidden","true");else app.removeAttribute("aria-hidden")};
    new MutationObserver(()=>{
      if(!modal.hidden){if(!opener){const a=document.activeElement;opener=a&&a!==document.body&&!modal.contains(a)?a:lastOutside}setInert(true);input.setAttribute("aria-expanded","true")}
      else{setInert(false);input.setAttribute("aria-expanded","false");input.removeAttribute("aria-activedescendant");const a=document.activeElement;if(opener&&opener.isConnected&&(!a||a===document.body||modal.contains(a)))opener.focus({preventScroll:true});opener=null}
    }).observe(modal,{attributes:true,attributeFilter:["hidden"]});
    new MutationObserver(()=>{
      let active="";list.querySelectorAll(":scope>li").forEach((li,i)=>{li.id="swo"+i;li.setAttribute("role","option");const on=li.classList.contains("on");li.setAttribute("aria-selected",String(on));if(on)active=li.id});
      if(active)input.setAttribute("aria-activedescendant",active);else input.removeAttribute("aria-activedescendant");
    }).observe(list,{childList:true,subtree:true,attributes:true,attributeFilter:["class"]});
    modal.addEventListener("keydown",e=>{
      if(e.key!=="Tab")return;
      const f=[...modal.querySelectorAll('input,button,[href],select,textarea,[tabindex]:not([tabindex="-1"])')].filter(el=>!el.disabled&&el.getClientRects().length);
      if(!f.length){e.preventDefault();return}
      const i=f.indexOf(document.activeElement);
      if(e.shiftKey&&i<=0){e.preventDefault();f[f.length-1].focus()}else if(!e.shiftKey&&i===f.length-1){e.preventDefault();f[0].focus()}else if(i<0){e.preventDefault();f[0].focus()}
    });
  }

  // ---- keyboard shortcut sheet (?), a native modal dialog like the district navigator
  function keysDialog(){return q("#keys")}
  function showKeys(){
    const d=keysDialog();if(!d)return;
    d._opener=document.activeElement;
    const v=q("#keysVer");if(v)v.textContent=typeof VAULT_BUILD!=="undefined"?"Vault v"+VAULT_BUILD.version:"Vault";
    if(typeof d.showModal==="function"){if(!d.open)d.showModal()}else d.setAttribute("open","");
    const x=d.querySelector("[data-close]");if(x)x.focus({preventScroll:true});
  }
  function hideKeys(){const d=keysDialog();if(!d)return;if(typeof d.close==="function"&&d.open)d.close();else d.removeAttribute("open")}
  function toggleKeys(){const d=keysDialog();if(d&&d.open)hideKeys();else showKeys()}
  function bindKeys(){
    const d=keysDialog();if(!d)return;
    d.addEventListener("click",e=>{if(e.target===d||e.target.closest("[data-close]"))hideKeys()});
    d.addEventListener("close",()=>{const o=d._opener;d._opener=null;if(o&&o.isConnected&&o!==document.body)o.focus({preventScroll:true})});
    // Keys typed in the sheet stay in the sheet (no walking or orbiting behind it).
    // Escape is handled here too, so the global handler does not also close the reader behind the sheet.
    d.addEventListener("keydown",e=>{e.stopPropagation();if(e.key==="?"||e.key==="Escape"){e.preventDefault();hideKeys()}});
    const rb=q("#rbKeys");if(rb)rb.onclick=showKeys;
    document.addEventListener("keydown",e=>{
      if(e.key!=="?"||e.metaKey||e.ctrlKey||e.altKey||typingIn(document.activeElement))return;
      const modal=q("#modal");if(modal&&!modal.hidden)return;
      if(document.querySelector("dialog[open]:not(#keys)"))return;
      e.preventDefault();toggleKeys();
    });
  }

  // ---- sky phase: c_campus passes the sun elevation (auto) or the fixed mode name; CSS tints the HUD glass
  let phaseNow="";
  function phase(sky,ui){
    let p;
    if(typeof sky==="string")p=sky==="dawn"?"golden":sky==="day"||sky==="dusk"||sky==="night"?sky:"day";
    else if(Number.isFinite(sky))p=sky>=12?"day":sky>=2?"golden":sky>=-9?"dusk":"night";
    else return phaseNow;
    if(p==="day"&&ui==="dark")p="dusk";
    if(p!==phaseNow){phaseNow=p;document.documentElement.dataset.phase=p;
      const meta=q('meta[name="theme-color"]');if(meta)meta.setAttribute("content",p==="day"||p==="golden"&&ui!=="dark"?"#F6F4EF":p==="dusk"?"#141026":"#0A0E1A")}
    return p;
  }

  function init(){bindSwitcher();bindKeys();syncDistricts();paint()}
  if(document.readyState==="loading")document.addEventListener("DOMContentLoaded",init,{once:true});else init();
  return {stage,progress,toast,syncDistricts,navFallback,phase,showKeys,hideKeys,toggleKeys,state:()=>({...ld,phase:phaseNow})};
})();
