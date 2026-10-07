// =====================================================================
// Reader: turns the rendered note (md() in b_data.js) into a first-class reading surface.
//  - header strip: reading time, words, checklist progress, version and last editor
//  - reading progress bar (sticky, transform-only) and a resume chip that returns to where you stopped
//  - callouts get a type glyph and collapse with Obsidian's "[!type]-" / "[!type]+" syntax
//  - [[Note#Heading]] and [[Note^block]] links resolve to the note (and scroll to the heading)
//  - numeric table cells align right with tabular figures
//  - footer: backlinks with the line that links here, "fly to" chips for every linked note (the camera
//    flies there through open()), previous/next note in the folder, and the latest edits from note_revisions
// Runs once per note render from renderSheet(); no animation loop, no per-frame work.
// =====================================================================
const Reader=(()=>{
  const WPM=220,BACKLINK_MAX=8,CHIP_MAX=24,RESUME_MAX=60;
  const GLYPH={note:"✎",info:"ℹ",tip:"✦",success:"✓",question:"?",warning:"!",danger:"⚠",todo:"☐",quote:"❝",example:"◇",abstract:"≡",summary:"≡",bug:"✕",failure:"✕",agent:"◉"};
  const e=s=>String(s==null?"":s).replace(/[&<>"]/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c]));
  const st=()=>typeof store!=="undefined"?store:{get:(k,d)=>d,set(){}};

  // [[Name#Heading|alias]] -> {name:"Name", anchor:"Heading"}; [[Name^id]] -> {name, block:"id"}
  function parseTarget(t){
    t=String(t||"").trim();let anchor="",block="";
    const b=t.indexOf("^");if(b>=0){block=t.slice(b+1).trim();t=t.slice(0,b)}
    const h=t.indexOf("#");if(h>=0){anchor=t.slice(h+1).trim();t=t.slice(0,h)}
    return {name:t.trim(),anchor,block};
  }
  const slug=s=>String(s||"").toLowerCase().replace(/\[\[|\]\]/g,"").replace(/[^\p{L}\p{N}]+/gu,"-").replace(/^-|-$/g,"");

  // Plain-text statistics of a note body. Code fences, frontmatter-like noise and markup are stripped.
  function stats(body){
    const src=String(body||"");
    const text=src.replace(/```[\s\S]*?```/g," ").replace(/\[( |x|X)\]|\[!\w+\][+-]?|^\s*\d+\.\s/gm," ").replace(/\[\[([^\]|]+)(?:\|([^\]]+))?\]\]/g,(m,a,b)=>b||a).replace(/[#>*_`|\-\[\]()]/g," ");
    const words=(text.match(/[\p{L}\p{N}][\p{L}\p{N}'’.,%$]*/gu)||[]).length;
    let done=0,total=0;src.split("\n").forEach(l=>{const m=l.match(/^\s*(?:[-*]|\d+\.)\s\[( |x|X)\]\s/);if(m){total++;if(m[1]!==" ")done++}});
    const callouts=(src.match(/^>\s*\[!\w+\]/gm)||[]).length;
    const headings=(src.match(/^#{1,3}\s/gm)||[]).length;
    return {words,minutes:Math.max(1,Math.round(words/WPM)),tasks:{done,total},callouts,headings};
  }
  const NUM=/^[−\-+]?[$€£]?\d[\d,]*(\.\d+)?\s?(%|[KMBkmb]|x|×)?$/;
  const isNumeric=s=>NUM.test(String(s||"").trim());

  // The line in `src` that links to `name`, as plain text for a backlink preview.
  function linkLine(src,name){
    const ln=String(src||"").split("\n").find(l=>l.includes("[["+name+"]]")||l.includes("[["+name+"|")||l.includes("[["+name+"#"))||"";
    return ln.replace(/\[( |x)\]/g,"").replace(/\[\[([^\]|#]+)(?:#[^\]|]*)?(\|[^\]]+)?\]\]/g,"$1").replace(/[#>*|`]/g," ").replace(/^\s*[-\d.]+\s+/,"").replace(/\s+/g," ").trim().slice(0,110);
  }
  // Previous and next note in the same folder, in explorer order.
  function siblings(n,all){
    const fs=(all||[]).filter(x=>x&&x.folder===n.folder).sort((a,b)=>a.name.localeCompare(b.name,undefined,{numeric:true}));
    const i=fs.indexOf(n);return {prev:i>0?fs[i-1]:null,next:i>=0&&i<fs.length-1?fs[i+1]:null,count:fs.length};
  }
  // Collapse note_revisions rows to "who changed it": one row per editor run, newest first.
  function editors(rows,limit=4){
    const out=[];(rows||[]).forEach(r=>{const last=out[out.length-1];if(last&&last.by===(r.edited_by||"unknown"))last.n++;else out.push({by:r.edited_by||"unknown",at:r.edited_at,v:r.version,n:1})});
    return out.slice(0,limit);
  }
  function resumeGet(name){const m=st().get("vault.readpos",{});return m&&typeof m[name]==="number"?m[name]:0}
  function resumeSet(name,f){
    let m=st().get("vault.readpos",{});if(!m||typeof m!=="object")m={};
    if(f<.08||f>.95)delete m[name];else m[name]=Math.round(f*1000)/1000;
    const ks=Object.keys(m);if(ks.length>RESUME_MAX)ks.slice(0,ks.length-RESUME_MAX).forEach(k=>delete m[k]);
    st().set("vault.readpos",m);
  }

  let cssDone=false,pendingAnchor="";
  function css(){
    if(cssDone||typeof document==="undefined")return;cssDone=true;
    const s=document.createElement("style");s.id="reader-css";s.textContent=`
.rd-prog{position:sticky;top:0;height:3px;margin:0 -16px;z-index:3;background:transparent;pointer-events:none}
.rd-prog i{display:block;height:100%;background:linear-gradient(90deg,var(--accent),var(--link,var(--accent)));transform-origin:0 50%;transform:scaleX(0)}
.rd-meta{display:flex;flex-wrap:wrap;gap:6px 14px;align-items:center;font-size:12px;color:var(--muted);margin:2px 0 12px;font-variant-numeric:tabular-nums}
.rd-meta b{color:var(--fg);font-weight:600}
.rd-meta .rd-bar{display:inline-block;width:56px;height:4px;border-radius:2px;background:var(--line);vertical-align:middle;margin-left:6px;overflow:hidden}
.rd-meta .rd-bar i{display:block;height:100%;background:var(--ok)}
.rd-resume{min-height:44px;padding:0 14px;border-radius:22px;border:1px solid var(--accent);color:var(--accent);background:var(--bg);font:inherit;font-size:13px;cursor:pointer}
.callout .ct .rd-g{display:inline-grid;place-items:center;width:1.3em;height:1.3em;margin-right:6px;border-radius:50%;font-size:.8em;color:var(--bg);background:var(--c)}
.callout.rd-fold .ct{cursor:pointer;display:flex;align-items:center;min-height:32px}
.callout.rd-fold .ct::after{content:"▾";margin-left:auto;opacity:.6;transition:transform var(--dur-2,.2s)}
.callout.rd-fold.rd-closed .ct::after{transform:rotate(-90deg)}
.callout.rd-fold.rd-closed>:not(.ct){display:none}
.doc td.num,.doc th.num{text-align:right;font-variant-numeric:tabular-nums;white-space:nowrap}
.doc h1,.doc h2,.doc h3{scroll-margin-top:16px}
.doc .rd-flash{animation:rdFlash 1.6s ease-out}
@keyframes rdFlash{0%{background:color-mix(in srgb,var(--accent) 28%,transparent)}100%{background:transparent}}
.rd-foot{margin-top:40px;border-top:1px solid var(--line);padding-top:14px;display:grid;gap:18px}
.rd-foot h4{font-family:var(--display);font-size:11px;text-transform:uppercase;letter-spacing:.08em;color:var(--faint);margin:0 0 8px;display:flex;justify-content:space-between;align-items:center}
.rd-foot h4 span{font-variant-numeric:tabular-nums}
.rd-chips{display:flex;flex-wrap:wrap;gap:8px}
.rd-chip{display:inline-flex;align-items:center;gap:8px;min-height:44px;padding:0 14px;border-radius:22px;border:1px solid var(--line);background:var(--bg);color:var(--fg);font:inherit;font-size:13px;cursor:pointer;max-width:100%}
.rd-chip i{width:8px;height:8px;border-radius:50%;flex:none;background:var(--c,var(--accent));box-shadow:0 0 8px var(--c,var(--accent))}
.rd-chip span{overflow:hidden;text-overflow:ellipsis;white-space:nowrap}
.rd-chip:hover,.rd-chip:focus-visible{border-color:var(--c,var(--accent))}
.rd-back{display:block;width:100%;text-align:left;min-height:44px;padding:8px 12px;margin-bottom:6px;border-radius:8px;border:1px solid var(--line);border-left:3px solid var(--c,var(--line));background:var(--bg);color:var(--fg);font:inherit;cursor:pointer}
.rd-back b{display:block;font-size:13px;font-weight:600}
.rd-back small{display:block;color:var(--muted);font-size:12px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}
.rd-more{min-height:44px;padding:0 12px;border:0;background:none;color:var(--link,var(--accent));font:inherit;font-size:12px;cursor:pointer}
.rd-pn{display:grid;grid-template-columns:1fr 1fr;gap:8px}
.rd-pn .rd-back:last-child{text-align:right}
.rd-ed{display:flex;gap:10px;align-items:baseline;font-size:13px;padding:4px 0;border-bottom:1px dashed var(--line)}
.rd-ed time{color:var(--faint);font-size:12px;min-width:64px;font-variant-numeric:tabular-nums}
@media (prefers-reduced-motion:reduce){.doc .rd-flash{animation:none}.callout.rd-fold .ct::after{transition:none}}
@media (max-width:760px){.rd-pn{grid-template-columns:1fr}.rd-pn .rd-back:last-child{text-align:left}}`;
    document.head.appendChild(s);
  }

  const col=n=>typeof colorOf==="function"?colorOf(n):"var(--accent)";
  const when=ts=>typeof ago==="function"?ago(ts):String(ts||"").slice(0,10);
  function chip(n,label){return `<button type="button" class="rd-chip" data-id="${n.id}" style="--c:${e(col(n))}" title="Fly to ${e(n.name)}"><i></i><span>${e(label||n.name)}</span></button>`}
  function backRow(x,n){return `<button type="button" class="rd-back" data-id="${x.id}" style="--c:${e(col(x))}"><b>${e(x.name)}</b><small>${e(linkLine(x.body,n.name)||x.folder||"/")}</small></button>`}

  function footer(n,all){
    const back=[...(n.back||[])].map(i=>all[i]).filter(Boolean).sort((a,b)=>a.name.localeCompare(b.name));
    const out=[...(n.out||[])].map(i=>all[i]).filter(Boolean);
    const sib=siblings(n,all);
    let h=`<section class="rd-foot" aria-label="Connections">`;
    h+=`<div><h4>Linked from <span>${back.length}</span></h4>${back.slice(0,BACKLINK_MAX).map(x=>backRow(x,n)).join("")||"<p class='note-s'>No notes link here yet. Add it to its MOC.</p>"}${back.length>BACKLINK_MAX?`<button type="button" class="rd-more" data-rd-tab="links">All ${back.length} backlinks</button>`:""}</div>`;
    if(out.length)h+=`<div><h4>Fly to <span>${out.length}</span></h4><div class="rd-chips">${out.slice(0,CHIP_MAX).map(x=>chip(x)).join("")}</div>${out.length>CHIP_MAX?`<button type="button" class="rd-more" data-rd-tab="links">All ${out.length} links</button>`:""}</div>`;
    if(sib.prev||sib.next)h+=`<div><h4>In ${e(n.folder||"the vault root")} <span>${sib.count}</span></h4><div class="rd-pn">${sib.prev?`<button type="button" class="rd-back" data-id="${sib.prev.id}" style="--c:${e(col(sib.prev))}"><small>Previous</small><b>${e(sib.prev.name)}</b></button>`:"<span></span>"}${sib.next?`<button type="button" class="rd-back" data-id="${sib.next.id}" style="--c:${e(col(sib.next))}"><small>Next</small><b>${e(sib.next.name)}</b></button>`:""}</div></div>`;
    h+=`<div><h4>Changed by <button type="button" class="rd-more" data-rd-tab="history">Full history</button></h4><div class="rd-eds">${n.updated_by?`<div class="rd-ed"><time>${e(when(n.updated_at))}</time><span><b>${e(n.updated_by)}</b> · v${e(n.version||1)}</span></div>`:"<p class='note-s'>Loading…</p>"}</div></div>`;
    return h+`</section>`;
  }

  function metaStrip(n){
    const s=stats(n.body);const t=s.tasks;
    const pct=t.total?Math.round(t.done/t.total*100):0;
    return `<div class="rd-meta" role="group" aria-label="Note facts"><span><b>${s.minutes} min</b> read</span><span>${s.words.toLocaleString()} words</span>${t.total?`<span>Checklist <b>${t.done}/${t.total}</b><i class="rd-bar" aria-hidden="true"><i style="width:${pct}%"></i></i></span>`:""}${n.back?`<span><b>${n.back.size}</b> in · <b>${n.out?n.out.size:0}</b> out</span>`:""}${n.updated_by?`<span>v${e(n.version||1)} · ${e(n.updated_by)}</span>`:""}</div>`;
  }

  function scrollToHeading(root,anchor){
    if(!anchor)return false;const want=slug(anchor);
    const h=[...root.querySelectorAll("h1,h2,h3")].find(x=>slug(x.textContent)===want);
    if(!h)return false;h.scrollIntoView({block:"start"});h.classList.add("rd-flash");setTimeout(()=>h.classList.remove("rd-flash"),1700);return true;
  }

  function enhance(sb,n){
    if(!sb||!n)return;css();
    const doc=sb.querySelector("#doc");if(!doc)return;
    const all=typeof NOTES!=="undefined"?NOTES:[];
    // progress bar + resume
    doc.insertAdjacentHTML("afterbegin",`<div class="rd-prog" aria-hidden="true"><i></i></div>`);
    const bar=doc.firstElementChild.firstElementChild;
    if(n.body.trim()==="{{HOME}}"){bindScroll(sb,bar,null);return}
    // headings get stable slug ids alongside md()'s h{line} ids
    doc.querySelectorAll("h1,h2,h3").forEach(h=>{if(!h.dataset.slug)h.dataset.slug=slug(h.textContent)});
    const h1=doc.querySelector("h1");
    const strip=metaStrip(n);if(h1)h1.insertAdjacentHTML("afterend",strip);else doc.querySelector(".props")?.insertAdjacentHTML("afterend",strip);
    // anchors in wikilinks
    doc.querySelectorAll("a.wl").forEach(a=>{
      const t=parseTarget(a.dataset.n);if(!t.anchor&&!t.block)return;
      if(typeof byName!=="undefined"&&byName.get(t.name)){a.dataset.n=t.name;a.classList.remove("unres");if(t.anchor)a.dataset.anchor=t.anchor;if(a.textContent.includes("#")||a.textContent.includes("^"))a.textContent=t.anchor?`${t.name} › ${t.anchor}`:t.name}
    });
    // callouts: glyph, fold
    doc.querySelectorAll(".callout").forEach(c=>{
      const ct=c.querySelector(".ct");if(!ct||ct.querySelector(".rd-g"))return;
      const type=[...c.classList].find(k=>k!=="callout"&&GLYPH[k])||"note";
      c.setAttribute("role","note");
      const m=ct.textContent.match(/^([+-])\s*/);
      if(m){ct.innerHTML=ct.innerHTML.replace(/^([+-])\s*/,"");c.classList.add("rd-fold");if(m[1]==="-")c.classList.add("rd-closed");ct.setAttribute("role","button");ct.tabIndex=0;ct.setAttribute("aria-expanded",m[1]==="+"?"true":"false")}
      if(!ct.textContent.trim())ct.textContent=type[0].toUpperCase()+type.slice(1);
      ct.insertAdjacentHTML("afterbegin",`<span class="rd-g" aria-hidden="true">${GLYPH[type]}</span>`);
    });
    // numeric table columns
    doc.querySelectorAll("table").forEach(tb=>{
      const rows=[...tb.querySelectorAll("tbody tr")];if(!rows.length)return;
      const cols=rows[0].children.length;
      for(let c=0;c<cols;c++){const cells=rows.map(r=>r.children[c]).filter(Boolean);const filled=cells.filter(x=>x.textContent.trim()&&x.textContent.trim()!=="—");
        if(filled.length&&filled.every(x=>isNumeric(x.textContent))){cells.forEach(x=>x.classList.add("num"));tb.querySelector(`thead tr`)?.children[c]?.classList.add("num")}}
    });
    doc.insertAdjacentHTML("beforeend",footer(n,all));
    // history: who changed it
    if(typeof Live!=="undefined"&&Live.history){
      Live.history(n.name).then(rows=>{const box=doc.querySelector(".rd-eds");if(!box||cur!==n)return;const eds=editors(rows);
        if(eds.length)box.innerHTML=eds.map(r=>`<div class="rd-ed"><time>${e(when(r.at))}</time><span><b>${e(r.by)}</b> · v${e(r.v)}${r.n>1?` · ${r.n} edits`:""}</span></div>`).join("");
        else if(!n.updated_by)box.innerHTML="<p class='note-s'>No edits since the vault went live.</p>"}).catch(()=>{});
    }
    // resume chip, or jump to an anchor a link asked for
    const jumped=pendingAnchor&&scrollToHeading(doc,pendingAnchor);pendingAnchor="";
    const pos=resumeGet(n.name);
    if(!jumped&&pos>0){
      const b=document.createElement("button");b.type="button";b.className="rd-resume";b.textContent=`Resume at ${Math.round(pos*100)}%`;
      b.onclick=()=>{sb.scrollTop=pos*(sb.scrollHeight-sb.clientHeight);b.remove()};
      (doc.querySelector(".rd-meta")||doc.firstElementChild).appendChild(b);
    }
    bindScroll(sb,bar,n);
  }

  // One passive scroll listener per #sbody; it reads the current note and bar at event time.
  function bindScroll(sb,bar,n){
    sb._rd={bar,n};
    const paint=()=>{const r=sb._rd;if(!r||!r.bar||!r.bar.isConnected)return;const max=sb.scrollHeight-sb.clientHeight;const f=max>0?Math.min(1,sb.scrollTop/max):0;r.bar.style.transform=`scaleX(${f.toFixed(3)})`;return f};
    paint();
    if(sb._rdBound)return;sb._rdBound=true;
    let raf=0,saveT=0;
    sb.addEventListener("scroll",()=>{if(raf)return;raf=requestAnimationFrame(()=>{raf=0;const f=paint();const r=sb._rd;
      if(r&&r.n&&f!=null){clearTimeout(saveT);const name=r.n.name;saveT=setTimeout(()=>resumeSet(name,f),400)}})},{passive:true});
  }

  if(typeof document!=="undefined"){
    // remember the heading a [[Note#Heading]] link points at; b_data's handler opens the note
    document.addEventListener("click",ev=>{
      const a=ev.target.closest&&ev.target.closest("a.wl[data-anchor]");
      if(a){if(typeof cur!=="undefined"&&cur&&cur.name===a.dataset.n){ev.preventDefault();ev.stopPropagation();const d=document.getElementById("doc");if(d)scrollToHeading(d,a.dataset.anchor);return}pendingAnchor=a.dataset.anchor}
      const tb=ev.target.closest&&ev.target.closest("[data-rd-tab]");
      if(tb&&typeof sheet!=="undefined"&&typeof renderSheet==="function"){ev.preventDefault();sheet.ntab=tb.dataset.rdTab;renderSheet()}
      const ct=ev.target.closest&&ev.target.closest(".callout.rd-fold>.ct");
      if(ct){const c=ct.parentElement;const closed=c.classList.toggle("rd-closed");ct.setAttribute("aria-expanded",closed?"false":"true")}
    },true);
    document.addEventListener("keydown",ev=>{
      if(ev.key!=="Enter"&&ev.key!==" ")return;const ct=ev.target.closest&&ev.target.closest(".callout.rd-fold>.ct");
      if(ct){ev.preventDefault();ct.click()}
    });
  }

  return {enhance,_test:{parseTarget,slug,stats,isNumeric,linkLine,siblings,editors,resumeGet,resumeSet,footer,metaStrip,GLYPH}};
})();
