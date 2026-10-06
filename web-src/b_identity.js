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
  // Cosmetic tier: 0 below level 3, 1 from 3, 2 from 6 (aura ring), 3 from 10, 4 from 20.
  const TIERS=['Plain','Trimmed','Haloed','Crested','Ascendant'];
  const tier=l=>{l=l|0;return l>=20?4:l>=10?3:l>=6?2:l>=3?1:0};
  const BROAD={jr:1.12,ahmad:1.08,devon:1.04,kenza:.97,member:.95,agent:1};
  function blueprint(f,opt={}){
    f=form(f);const b=BROAD[f],parts=[],S=[-1,1],lvl=Math.max(0,Math.min(30,opt.level|0));
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
      A('bevel',.12,.2,.26,s*.2,-.84,0,1);A('box',.2,.025,.03,s*.08,-1.05,.17,4);A('box',.2,.025,.03,s*.08,-1.4,.17,4);
      for(let i=0;i<3;i++)A('box',.03,.1,.02,s*.08+(i-1)*.045,-1.95,.11,4);A('box',.16,.03,.03,s*.08,-1.82,.11,2);
      if(opt.owner&&s>0)A('bevel',.33,.13,.35,s*.08,-.98,.02,3);
      if(f==='member')A('box',.31,.05,.33,s*.08,-1.53,.02,2);
      if(f==='ahmad')A('bevel',.08,.5,.3,s*.25,-1.2,0,1);
      L('bevel',.27,.27,.29,0,-.02,0,4);L('taper',.33,1.1,.37,0,-.6,0,0);L('taper',.27,.72,.08,0,-.55,.2,1);
      L('bevel',.25,.24,.3,0,-1.24,.03,4);L('bevel',.22,.22,.1,0,-1.22,.19,1);
      L('taper',.31,1.12,.35,0,-1.9,0,0);L('taper',.23,.84,.08,0,-1.86,.18,1);L('box',.03,.56,.02,0,-1.86,.225,2);
      L('bevel',.28,.2,.14,0,-1.23,.2,1);L('box',.2,.03,.02,0,-1.18,.28,2);L('box',.24,.025,.03,0,-.3,.21,4);L('box',.24,.025,.03,0,-.85,.21,4);
      L('box',.03,.5,.02,s*.11,-1.9,.18,4);L('box',.22,.025,.03,0,-2.25,.19,4);
      L('bevel',.2,.18,.22,0,-2.56,0,4);L('bevel',.31,.3,.56,0,-2.8,.08,1);L('box',.27,.12,.16,0,-2.89,.38,4);
      if(f==='jr')L('bevel',.09,.74,.32,s*.2,-.6,0,1);
      if(f==='kenza'){L('taper',.3,.9,.05,s*.06,-.35,.25,1,s*.12);L('box',.03,.8,.02,s*.2,-.35,.28,2,s*.12)}
      if(f==='devon')L('box',.05,.9,.05,s*.17,-1.9,.1,2);
    }
    // ---- craft pass: seams, rivets, segmented plates, cables, guards and rank marks. k=4 is the dark joint tone.
    for(const y of [3.78,3.92,4.06])T('box',.5*b,.025,.025,0,y,.33,4);                 // abdominal seams
    for(const s of S){T('box',.02,.9,.03,s*.3*b,4.22,.37,4);T('box',.02,.5,.05,s*.46*b,4.2,.2,4)}  // chest plate seams
    for(const s of S)for(const [x,y] of [[.33,4.66],[.33,3.86],[.14,4.74]])T('box',.035,.035,.03,s*x*b,y,.39,2);  // rivets, lit
    T('box',.34*b,.025,.03,0,4.5,.37,4);T('box',.025,.22,.03,0,4.5,.37,4);                 // terminal mount
    for(const s of S){T('bevel',.05,.05,.62,s*.52*b,4.74,-.2,4,0,.45);T('bevel',.05,.05,.5,s*.34*b,4.9,-.3,4,0,.3)}  // shoulder cables to the back
    for(const s of S)for(let i=0;i<3;i++)T('box',.18,.04,.1,s*.33*b,3.33-.11*i,.27,1);     // belt pouches, stepped
    T('bevel',.3,.22,.1,0,3.3,.3,1);T('box',.1,.1,.03,0,3.3,.36,2);                      // belt buckle with lit core
    T('box',.42*b,.025,.03,0,4.9,.26,2);                                                 // collar light line
    for(let i=0;i<Math.min(5,lvl);i++)T('box',.16,.022,.04,-.74*b,4.98-.065*i,.26,2,-.28);  // rank chevrons, left pauldron
    if(lvl>=10)H('bevel',.05,.3,.46,0,1.02,-.06,1);                                        // level 10: helmet crest
    if(lvl>=20)for(const s of S)T('bevel',.05,.5,.05,s*.56*b,5.3,-.1,2);                   // level 20: twin aerials
    // ---- fidelity pass: face, plating, hinge caps and back hardware. 'cap' is a short cylinder on the x axis.
    H('bevel',.4,.07,.14,0,.77,.2,1);                                                      // brow ridge over the visor
    for(const s of S){H('box',.03,.42,.05,s*.165,.52,.235,4);H('cap',.08,.16,.16,s*.265,.5,-.02,4);H('box',.02,.05,.05,s*.31,.5,-.02,2)}  // visor frame, comm pods with lit dots
    H('box',.27,.022,.012,0,.6,.27,2);                                                     // face glow: eye line across the slits
    for(let i=0;i<3;i++)H('box',.16-.03*i,.016,.02,0,.23-.032*i,.255,4);                  // chin vents
    H('bevel',.38,.18,.1,0,.3,-.25,1,0,.3);                                                // rear neck guard
    T('bevel',.1,.26,.06,0,3.93,.37,1);                                                    // sternum plate under the terminal
    for(const s of S){T('bevel',.42*b,.1,.2,s*.3*b,4.69,.2,1,s*.16);                       // clavicle plates
      for(let i=0;i<3;i++){const y=4.42-.16*i;T('box',.03,.12,.22,s*(.42+.16*(y-3.7))*b,y,.04,4,-s*.16)}  // side rib vents
      T('cap',.06,.24,.24,s*.44*b,2.95,0,4)}                                               // hip hinge caps
    for(let i=0;i<3;i++)T('bevel',.22-.03*i,.08,.08,0,3.8-.12*i,-.24,1);                    // lower spine plates
    T('bevel',.34,.42,.16,0,4.3,-.56,4);T('box',.12,.26,.03,0,4.3,-.645,2);                // power core with lit cell
    T('bevel',.3,.26,.08,0,2.96,.27,1,0,.1);                                               // pelvis front plate
    for(const s of S){const A=add('arm'+side(s)),L=add('leg'+side(s));
      A('bevel',.33,.2,.35,s*.1,-.2,0,1,-s*.12);                                           // deltoid cap
      A('cap',.05,.17,.17,s*.27,-.84,0,4);A('box',.012,.06,.06,s*.297,-.84,0,2);           // elbow hinge, lit pin
      A('bevel',.29,.24,.31,s*.08,-.98,.02,1);A('bevel',.3,.1,.3,s*.08,-1.56,.02,1);        // forearm top plate and wrist cuff
      A('bevel',.17,.06,.1,s*.08,-1.85,.1,1);                                              // knuckle guard
      L('bevel',.24,.38,.06,s*.05,-.12,.22,1,0,-.12);                                      // tasset
      L('cap',.05,.2,.2,s*.14,-1.24,0,4);L('box',.012,.06,.06,s*.168,-1.24,0,2);           // knee hinge, lit pin
      L('bevel',.24,.6,.1,0,-1.75,-.2,1);L('bevel',.16,.14,.12,0,-2.86,-.22,1)}            // calf plate, heel spur
    // Traveler cloak. k=5 is cloth on the body mesh, so it costs no extra draw call.
    // Upper panels sit on the spine (y>=3.38). The hem sits on the hips (y<3.38) so a bow does not drive cloth through the thighs.
    // The power core backs up to about z=-0.64; every cloth face stays behind z=-0.70.
    const cloak={jr:1.08,devon:.96,ahmad:1.02,kenza:.74,member:.68,agent:.86}[f];
    const cw=.98*b*cloak;
    T('bevel',cw*1.08,.24,.2,0,4.78,-.82,5,0,.18);
    T('taper',cw*.9,.78,.1,0,4.22,-.88,5,0,.05);
    T('taper',cw*1.02,1.35,.09,0,3.05,-.9,5,0,.03);
    T('taper',cw*.48,.95,.07,-cw*.34,3.02,-.8,5,.16,.06);
    T('taper',cw*.48,.95,.07,cw*.34,3.02,-.8,5,-.16,.06);
    if(f==='jr'||f==='devon'||f==='ahmad')T('bevel',cw*.62,.14,.12,0,4.62,-.74,1);
    if(f==='kenza'||f==='member'||f==='agent')H('bevel',.48*cloak,.16,.34,0,.9,-.28,5,0,-.22);
    // ---- cosmetic tier from level: more lit trim per tier; the mesh adds the aura ring from tier 2.
    const tr=tier(lvl);
    if(tr>=1){for(const s of S)T('box',.4*b,.02,.03,s*.74*b,4.86,.305,2,-s*.26);T('box',.7*b,.02,.03,0,3.24,.285,2)}  // pauldron edge lights, belt line
    if(tr>=2){for(const s of S){T('box',.2,.025,.03,s*.085,3.99,.405,2,s*.45);add('leg'+side(s))('box',.2,.02,.02,0,-1.36,.25,2)}}  // chest chevron, knee lights
    if(tr>=3)for(const s of S){T('bevel',.04,.7,.3,s*.22,4.62,-.62,1,-s*.25,-.2);T('box',.02,.6,.02,s*.235,4.62,-.78,2,-s*.25,-.2);H('box',.02,.2,.02,s*.2,.66,.2,2)}  // back fins with lit edges, temple lights
    if(tr>=4){for(const s of S){add('arm'+side(s))('box',.31,.02,.32,s*.08,-1.62,.02,2);add('leg'+side(s))('box',.02,.7,.02,s*.13,-1.86,.19,2)}T('box',.03,.36,.02,0,3.68,-.29,2)}  // gauntlet rings, shin rails, lit spine
    const pivots={head:[0,4.78,0],armL:[-.74*b,4.62,0],armR:[.74*b,4.62,0],legL:[-.26*b,2.95,0],legR:[.26*b,2.95,0]};
    return {form:f,broad:b,tier:tr,parts,pivots,terminal:{x:0,y:4.3,z:.38,w:.42,h:.295}};
  }

  // ---- Colors for the seven material slots, derived from the three account colors.
  const rgb=h=>[1,3,5].map(i=>parseInt(h.slice(i,i+2),16));
  const hex=c=>'#'+c.map(v=>Math.round(Math.max(0,Math.min(255,v))).toString(16).padStart(2,'0')).join('').toUpperCase();
  const mix=(a,b,t)=>{const x=rgb(a),y=rgb(b);return hex(x.map((v,i)=>v+(y[i]-v)*t))};
  function tones(pal,owner){return [pal[0],pal[1],pal[2],owner&&HEX.test(owner)?owner.toUpperCase():pal[2],mix(pal[0],'#000000',.45),mix(pal[2],pal[0],.4),mix(pal[0],'#000000',.7)]}

  // ---- 2D preview: an orthographic front projection of the blueprint, shaded per material.
  let uid=0;
  function preview(p){const lvl=p&&p.level|0;p=profile(p);const pal=p.palette,f=p.form,bp=blueprint(f,{level:lvl}),tone=tones(pal),id='sp'+(++uid);
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
  const TITLES=['Initiate','Surveyor','Mason','Drafter','Builder','Architect','Keeper','Warden','Chancellor','Luminary','Sentinel Prime'];
  const level=xp=>Math.floor(Math.sqrt(Math.max(0,xp|0)/60)),nextAt=l=>60*(l+1)*(l+1),title=l=>TITLES[Math.min(TITLES.length-1,Math.max(0,l|0))];
  const ACHIEVEMENTS=[
    {id:'first-stone',name:'First Stone',what:'Create a note',test:c=>(c.created|0)>=1},
    {id:'ten-towers',name:'Ten Towers',what:'Create ten notes',test:c=>(c.created|0)>=10},
    {id:'chronicler',name:'Chronicler',what:'Extend or edit notes 25 times',test:c=>((c['added to']|0)+(c.edited|0))>=25},
    {id:'closer',name:'Closer',what:'Finish five tasks',test:c=>(c.done|0)>=5},
    {id:'commissioner',name:'Commissioner',what:'Open ten tasks',test:c=>(c.opened|0)>=10},
    {id:'diplomat',name:'Diplomat',what:'Send ten floor messages',test:c=>(c.say|0)>=10},
    {id:'ensemble',name:'Ensemble',what:'Work with three different teammates',test:(c,s)=>Object.keys(s.peers||{}).length>=3},
    {id:'cartographer',name:'Cartographer',what:'Touch fifty different notes',test:(c,s)=>Object.keys(s.touched||{}).length>=50},
    {id:'week-watch',name:'Week Watch',what:'Seven-day streak',test:(c,s)=>(s.best_streak|0)>=7},
    {id:'luminary',name:'Luminary',what:'Reach level 9',test:(c,s)=>level(s.xp)>=9}];
  const achievements=s=>ACHIEVEMENTS.map(a=>({...a,done:!!(s&&a.test(s.counters||{},s))}));
  return {HEX,FORMS,palette,form,badge,platformCode,profile,preview,blueprint,tones,mix,level,nextAt,title,TITLES,tier,TIERS,achievements,ACHIEVEMENTS};
})();
