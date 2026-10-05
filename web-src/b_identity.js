// Vault Sentinel identity. Core forms are assigned by the owner, never by a display name.
const Identity=(()=>{
  const HEX=/^#[0-9a-f]{6}$/i;
  const FORMS={agent:{name:'Agent Sentinel',palette:['#111827','#C97B54','#E6E9F2'],symbol:'AI'},member:{name:'Member Navigator',palette:['#101B32','#3977C7','#E6E9F2'],symbol:'MN'},jr:{name:'Hataalii · Architect',palette:['#050A18','#D4A843','#00D9B5'],symbol:'H'},devon:{name:'Devon · Builder',palette:['#0B1830','#00A994','#CED7E0'],symbol:'DS'},ahmad:{name:'Ahmad · Steward',palette:['#191923','#75518D','#C9A84C'],symbol:'AM'},kenza:{name:'Kenza · Conductor',palette:['#151B29','#A62C48','#E7BBA0'],symbol:'KD'}};
  function palette(p,f='member'){return Array.isArray(p)&&p.length===3&&p.every(c=>typeof c==='string'&&HEX.test(c))?p.map(c=>c.toUpperCase()):FORMS[f]?.palette.slice()||FORMS.member.palette.slice()}
  function form(f){return Object.hasOwn(FORMS,f)?f:'member'}
  function badge(id){let h=2166136261;for(const c of String(id)){h=Math.imul(h^c.charCodeAt(0),16777619)}return (h>>>0).toString(36).toUpperCase().padStart(7,'0')}
  const PLATFORM={ 'claude-code':'CC',claude:'CW',codex:'CX',cursor:'CU',windsurf:'WS',cline:'CL','grok-build':'GB','qwen-code':'QC',antigravity:'AG',devin:'DV',replit:'RP',aider:'AD',jules:'JL',hermes:'HE',openclaw:'OC',grokbot:'GT','muse-spark':'MS',manus:'MA',maxclaw:'MC','kimi-claw':'KC','mimo-claw':'MM',maxhermes:'MH',buzz:'BZ',abacus:'AB','notion-ai':'NA',jev:'JV',chatgpt:'GPT',gemini:'GM',grok:'GK',qwen:'QW',glm:'GL',kimi:'KM',minimax:'MX',perplexity:'PP',deepseek:'DS','mimo-studio':'MI',lovable:'LV',v0:'V0',bolt:'BT',blink:'BK','magic-patterns':'MP',base44:'B44','ai-studio':'AS',n8n:'N8',langchain:'LC','hugging-face':'HF'};
  function platformCode(id){return PLATFORM[id]||badge(id).slice(-4)}
  function profile(p={}){const f=form(p.form);return {form:f,palette:palette(p.palette,f),symbol:FORMS[f].symbol}}

  // ---- Blueprint: the one part list behind the 3D mesh and the 2D preview.
  // Units are meters on a 5.7 m figure, eight heads tall. +z faces forward.
  // k: 0 body (60%), 1 armor (30%), 2 accent, lit (10%), 3 owner band, lit, 4 joint, 5 accent cloth, 6 visor glass.
  // Slots: torso is rigid; head, arms and legs are articulated around their pivots.
  const BROAD={jr:1.12,ahmad:1.08,devon:1.04,kenza:.97,member:.95,agent:1};
  function blueprint(f,opt={}){
    f=form(f);const b=BROAD[f],parts=[],S=[-1,1];
    const add=slot=>(shape,w,h,d,x,y,z,k,rz=0,rx=0)=>parts.push({slot,shape,w,h,d,x,y,z,k,rz,rx});
    const T=add('torso'),H=add('head'),side=s=>s<0?'L':'R';
    // pelvis, belt, waist
    T('bevel',.74*b,.42,.5,0,3.05,0,0);T('bevel',.8*b,.14,.56,0,3.3,0,1);T('taper',.6*b,.44,.42,0,3.52,0,0);
    for(const y of [3.42,3.53,3.64])T('box',.4*b,.05,.04,0,y,.2,1);
    // chest: a V-shaped core with a front armor plate, terminal backing, collar and back spine
    T('taper',1.14*b,1,.62,0,4.2,0,0);T('taper',.98*b,.78,.12,0,4.28,.3,1);T('box',.5,.38,.03,0,4.3,.36,4);
    T('bevel',.66*b,.16,.52,0,4.76,0,1);T('box',.5*b,.03,.03,0,4.62,.37,2);
    T('bevel',.6*b,.74,.22,0,4.24,-.38,0);T('box',.05,.56,.03,0,4.24,-.5,2);
    for(const s of S){
      T('box',.035,.66,.03,s*.4*b,4.26,.37,2,-s*.17);
      T('bevel',.24,.44,.38,s*.4*b,2.98,0,1,s*.14);
      if(f==='jr'){for(let l=0;l<4;l++)T('bevel',.66-.07*l,.13,.68-.05*l,s*(.72+.07*l)*b,5-.14*l,0,1,-s*(.2+.11*l))}
      else if(f==='ahmad')T('bevel',.6,.52,.68,s*.84*b,4.74,0,1);
      else{T('bevel',.5*b,.16,.6,s*.74*b,4.9,0,1,-s*.26);T('bevel',.44*b,.14,.56,s*.8*b,4.76,0,1,-s*.4);T('bevel',.34*b,.12,.5,s*.86*b,4.6,0,1,-s*.55)}
      if(f==='devon'){T('bevel',.13,1.05,.15,s*.78*b,5.05,-.2,1);T('box',.15,.06,.17,s*.78*b,5.6,-.2,2)}
      if(f==='kenza')T('bevel',.09,.95,.34,s*.6*b,5.15,-.05,1,-s*.32);
      if(f==='member')T('box',.045,.74,.03,s*.29*b,4.24,.37,2);
      if(f==='agent')for(const x of [.27,.32])T('box',.035,.6,.03,s*x*b,4.27,.37,0);
    }
    if(f==='jr')T('taper',.24,.78,.04,0,2.8,.3,5);
    if(f==='devon'){T('bevel',1.5*b,.2,.22,0,4.98,-.42,0);T('box',1.1*b,.04,.03,0,4.98,-.54,2)}
    if(f==='ahmad'){T('box',.62*b,.07,.04,0,4.02,.37,2);T('box',.62*b,.07,.04,0,3.93,.37,2);T('taper',.82*b,.85,.06,0,2.92,-.36,1,Math.PI,.18)}
    // head: neck, skull, crown, cheek guards, chin, visor glass with three lit slits
    H('box',.22,.26,.24,0,.06,0,4);H('taper',.44,.62,.5,0,.5,0,0);H('bevel',.47,.14,.53,0,.82,-.01,1);
    for(const s of S)H('bevel',.07,.46,.44,s*.235,.48,0,1);
    H('bevel',.34,.12,.1,0,.2,.2,1);H('box',.3,.4,.04,0,.52,.24,6);for(const x of [-.09,0,.09])H('box',.035,.32,.02,x,.53,.265,2);
    if(f==='jr')H('bevel',.06,.22,.4,0,.98,0,1);
    if(f==='kenza')H('bevel',.05,.3,.36,0,.92,-.1,1,0,-.4);
    if(f==='devon')H('bevel',.5,.08,.2,0,.9,-.18,1);
    if(f==='ahmad')H('bevel',.5,.1,.5,0,.94,0,1);
    if(f==='agent')H('box',.03,.2,.03,.14,.98,-.12,2);
    // arms and legs, mirrored
    for(const s of S){
      const A=add('arm'+side(s)),L=add('leg'+side(s));
      A('bevel',.3,.3,.3,s*.04,0,0,4);A('taper',.23,.7,.25,s*.08,-.42,0,0);A('bevel',.07,.5,.22,s*.22,-.4,0,1);
      A('bevel',.2,.16,.22,s*.08,-.84,0,4);A('taper',.27,.7,.29,s*.08,-1.22,.02,1);A('box',.03,.48,.02,s*.08,-1.2,.18,2);
      A('bevel',.18,.24,.2,s*.08,-1.7,.02,4);A('box',.15,.13,.07,s*.08,-1.87,.07,4);
      if(opt.owner&&s>0)A('bevel',.33,.13,.35,s*.08,-.98,.02,3);
      if(f==='member')A('box',.31,.05,.33,s*.08,-1.53,.02,2);
      if(f==='ahmad')A('bevel',.08,.5,.3,s*.25,-1.2,0,1);
      L('bevel',.27,.27,.29,0,-.02,0,4);L('taper',.33,1.1,.37,0,-.6,0,0);L('taper',.27,.72,.08,0,-.55,.2,1);
      L('bevel',.25,.24,.3,0,-1.24,.03,4);L('bevel',.22,.22,.1,0,-1.22,.19,1);
      L('taper',.31,1.12,.35,0,-1.9,0,0);L('taper',.23,.84,.08,0,-1.86,.18,1);L('box',.03,.56,.02,0,-1.86,.225,2);
      L('bevel',.2,.18,.22,0,-2.56,0,4);L('bevel',.31,.3,.56,0,-2.8,.08,1);L('box',.27,.12,.16,0,-2.89,.38,4);
      if(f==='jr')L('bevel',.09,.74,.32,s*.2,-.6,0,1);
      if(f==='kenza'){L('taper',.3,.9,.05,s*.06,-.35,.25,1,s*.12);L('box',.03,.8,.02,s*.2,-.35,.28,2,s*.12)}
      if(f==='devon')L('box',.05,.9,.05,s*.17,-1.9,.1,2);
    }
    const pivots={head:[0,4.78,0],armL:[-.74*b,4.62,0],armR:[.74*b,4.62,0],legL:[-.26*b,2.95,0],legR:[.26*b,2.95,0]};
    return {form:f,broad:b,parts,pivots,terminal:{x:0,y:4.3,z:.38,w:.42,h:.295}};
  }

  // ---- Colors for the seven material slots, derived from the three account colors.
  const rgb=h=>[1,3,5].map(i=>parseInt(h.slice(i,i+2),16));
  const hex=c=>'#'+c.map(v=>Math.round(Math.max(0,Math.min(255,v))).toString(16).padStart(2,'0')).join('').toUpperCase();
  const mix=(a,b,t)=>{const x=rgb(a),y=rgb(b);return hex(x.map((v,i)=>v+(y[i]-v)*t))};
  function tones(pal,owner){return [pal[0],pal[1],pal[2],owner&&HEX.test(owner)?owner.toUpperCase():pal[2],mix(pal[0],'#000000',.45),mix(pal[2],pal[0],.4),mix(pal[0],'#000000',.7)]}

  // ---- 2D preview: an orthographic front projection of the blueprint, shaded per material.
  let uid=0;
  function preview(p){p=profile(p);const pal=p.palette,f=p.form,bp=blueprint(f),tone=tones(pal),id='sp'+(++uid);
    const X=u=>70+u*31.6,Y=v=>202-v*31.6;
    const shapes=bp.parts.map(q=>{const pv=bp.pivots[q.slot]||[0,0,0],cx=pv[0]+q.x,cy=pv[1]+q.y,hw=q.w/2,hh=q.h/2,bw=q.shape==='taper'?hw*.72:hw;
      const pts=[[-hw,hh],[hw,hh],[bw,-hh],[-bw,-hh]].map(([x,y])=>[x*Math.cos(q.rz)-y*Math.sin(q.rz),x*Math.sin(q.rz)+y*Math.cos(q.rz)]);
      return {z:pv[2]+q.z+q.d/2,k:q.k,pts:pts.map(([x,y])=>X(cx+x).toFixed(1)+','+Y(cy+y).toFixed(1)).join(' ')}}).sort((a,b)=>a.z-b.z);
    const grad=(k,c)=>`<linearGradient id="${id}g${k}" x1="0" x2="1" y1="0" y2="1"><stop offset="0" stop-color="${mix(c,'#FFFFFF',k===1?.28:.12)}"/><stop offset=".55" stop-color="${c}"/><stop offset="1" stop-color="${mix(c,'#000000',.45)}"/></linearGradient>`;
    const fill=k=>k===2||k===3?pal[2]:`url(#${id}g${k})`;
    const t=bp.terminal,lit=shapes.filter(s=>s.k===2).map(s=>`<polygon points="${s.pts}"/>`).join('');
    return `<svg viewBox="0 0 140 210" role="img" aria-label="${FORMS[f].name}" style="width:140px;max-width:100%"><defs>${[0,1,4,5,6].map(k=>grad(k,tone[k])).join('')}<radialGradient id="${id}f"><stop offset="0" stop-color="${pal[2]}" stop-opacity=".5"/><stop offset="1" stop-color="${pal[2]}" stop-opacity="0"/></radialGradient><filter id="${id}b" x="-50%" y="-50%" width="200%" height="200%"><feGaussianBlur stdDeviation="1.6"/></filter></defs>
<ellipse cx="70" cy="202" rx="46" ry="7" fill="url(#${id}f)"/><ellipse cx="70" cy="202" rx="31" ry="3.4" fill="none" stroke="${pal[2]}" stroke-opacity=".55" stroke-width=".8"/>
<g stroke="${mix(pal[0],'#000000',.6)}" stroke-width=".35" stroke-linejoin="round">${shapes.map(s=>`<polygon points="${s.pts}" fill="${fill(s.k)}"/>`).join('')}</g>
<g fill="${pal[2]}" filter="url(#${id}b)" opacity=".9">${lit}</g>
<rect x="${X(t.x-t.w/2).toFixed(1)}" y="${Y(t.y+t.h/2).toFixed(1)}" width="${(t.w*31.6).toFixed(1)}" height="${(t.h*31.6).toFixed(1)}" rx="1" fill="${tone[6]}" stroke="${pal[2]}" stroke-width=".6"/><text x="70" y="${(Y(t.y)+2.6).toFixed(1)}" text-anchor="middle" fill="${pal[2]}" font-family="monospace" font-weight="700" font-size="7.5">${FORMS[f].symbol}</text></svg>`}
  return {HEX,FORMS,palette,form,badge,platformCode,profile,preview,blueprint,tones,mix};
})();
