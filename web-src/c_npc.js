// =====================================================================
// Guides: one Warden per district. A member-form Sentinel, dressed in a district-coloured kit
// (robe, cape or mantle, hood or halo, staff, tome or banner), hovers on a free plaza cell near the
// district centre. It tracks the viewer with its head, barks short facts drawn from loaded data,
// carries a quest marker while tasks are open in its district, and talks through a dialogue panel
// (portrait, typewriter, keyboard and touch choices). Answers come only from data already in the
// page (NOTES, the layout, Live.snapshot()). No network, no model call.
// Guides are not agents: they never go through Campus.setAgents and carry no presence row.
// Portrait art: web/assets/guides/warden-<hex>.webp when present; otherwise the Warden is rendered
// live into the portrait from the campus scene.
// =====================================================================
const Guides=(()=>{
  const BOUNTY={high:120,medium:80,low:50},NEAR=60,TALK_R=28,LEAVE_R=110,WEEK=7*864e5;
  const RM=matchMedia("(prefers-reduced-motion: reduce)");
  let G=[],lastDist=null,curTop=null,booted=false,memo=new Map();
  const two=name=>{const w=String(name).replace(/[^A-Za-z ]/g," ").trim().split(/\s+/).filter(Boolean);return (w.length>=2?w[0][0]+w[1][0]:(w[0]||"GD").slice(0,2)).toUpperCase()};
  const wrap=a=>((a+Math.PI)%(2*Math.PI)+2*Math.PI)%(2*Math.PI)-Math.PI;
  const clamp=(v,a,b)=>v<a?a:v>b?b:v;
  const district=top=>Campus.districts().find(d=>d.top===top)||null;
  const notesIn=top=>NOTES.filter(n=>n.top===top);
  const inDistrict=(top,name)=>{const n=name&&byName.get(name);return !!n&&n.top===top};
  const clean=s=>String(s).replace(/\[\[([^\]|]+)(\|[^\]]+)?\]\]/g,"$1").replace(/[#>*|`_]/g," ").replace(/\s+/g," ").trim();
  const link=n=>`<a class="wl" data-n="${esc(n.name)}">${esc(n.name)}</a>`;
  const snap=()=>{try{return Live.snapshot()}catch(e){return {tasks:[],acts:[],agents:[],presence:[],stats:[]}}};
  const agentName=id=>snap().agents.find(a=>a.id===id)?.name||id;
  const plural=(n,w,ws)=>n+" "+(n===1?w:(ws||w+"s"));
  const isOpen=t=>t.status==="open",isLiveTask=t=>t.status!=="done";

  // ---- archetypes. Fixed per known folder so the silhouette (and any portrait art) stays stable; unknown districts cycle.
  const ARCH={keeper:{title:"Keeper",robe:3.0,hood:1,cape:1,staff:"lantern"},archivist:{title:"Archivist",robe:3.0,hood:2,stole:1,tome:1},herald:{title:"Herald",robe:1.75,mantle:1,cape:1,banner:1},vanguard:{title:"Vanguard",robe:1.75,mantle:1,halo:1,cape:1,staff:"blade"}};
  const ORDER=["keeper","archivist","herald","vanguard"];
  const FIXED={"00 - MOCs":"keeper","01 - Divisions":"vanguard","02 - ZenFlow":"archivist","03 - Products":"herald","04 - People":"keeper","05 - Operations":"vanguard","06 - Finance":"archivist","07 - Brand":"herald","08 - Research":"archivist","09 - Projects":"vanguard","10 - Archive":"keeper","11 - Physical AI":"herald","Daily":"archivist","Root":"keeper"};
  const archOf=(top,i)=>FIXED[top]||ORDER[i%ORDER.length];

  // ---- shared kit: geometry built once, materials cached per district colour
  let KIT=null;const MATS=new Map();
  function kit(){
    if(KIT)return KIT;
    const top=g=>{g.translate(0,-.5,0);return g};
    KIT={
      robe:top(new THREE.CylinderGeometry(.62,1,1,20,1,true)),
      hem:top(new THREE.CylinderGeometry(1,1,1,20,1,true)),
      mantle:top(new THREE.CylinderGeometry(.56,.94,1,20,1,true)),
      // Tailored cloth with scalloped shoulders and a folded cross section, built once.
      cape:(()=>{const p=[],idx=[],w=12,h=10;for(let y=0;y<=h;y++)for(let x=0;x<=w;x++){const u=x/w,v=y/h,edge=Math.abs(u-.5)*2;p.push((u-.5)*(1-.12*(1-v)),-v+.055*edge*edge*(1-v),Math.sin(u*Math.PI*6)*.045*(.35+.65*v)+v*v*.075)}for(let y=0;y<h;y++)for(let x=0;x<w;x++){const a=y*(w+1)+x,b=a+w+1;idx.push(a,b,a+1,b,b+1,a+1)}const g=new THREE.BufferGeometry();g.setAttribute("position",new THREE.Float32BufferAttribute(p,3));g.setIndex(idx);g.computeVertexNormals();return g})(),
      strip:new THREE.BoxGeometry(1,1,1),
      hood:new THREE.SphereGeometry(.5,16,10,Math.PI*.85,Math.PI*1.3,0,Math.PI*.64),
      peak:new THREE.ConeGeometry(.26,.8,10,1,true),
      halo:new THREE.TorusGeometry(.62,.035,8,44),
      haloIn:new THREE.TorusGeometry(.44,.018,6,36),
      rod:top(new THREE.CylinderGeometry(.045,.06,1,8)),
      gem:new THREE.OctahedronGeometry(.22,0),
      blade:new THREE.ConeGeometry(.12,.75,4),
      flag:top(new THREE.BoxGeometry(1,1,.03)),
      tome:new THREE.BoxGeometry(.56,.1,.42),
      pages:new THREE.BoxGeometry(.5,.07,.36),
      mote:new THREE.OctahedronGeometry(.06,0),
      marker:new THREE.OctahedronGeometry(.3,0),
      markerRing:new THREE.TorusGeometry(.5,.025,6,40),
      metal:new THREE.MeshStandardMaterial({color:new THREE.Color(0x2a2f3d).convertSRGBToLinear(),roughness:.35,metalness:.85}),
      paper:new THREE.MeshStandardMaterial({color:new THREE.Color(0xF1EADB).convertSRGBToLinear(),roughness:.9,metalness:0,emissive:0x4a4436,emissiveIntensity:.25}),
      gold:new THREE.MeshBasicMaterial({color:0xF5C04A,fog:false}),
      steel:new THREE.MeshBasicMaterial({color:0x9AA6C4,fog:false,transparent:true,opacity:.75}),
      glowTex:(()=>{const c=document.createElement("canvas");c.width=c.height=64;const x=c.getContext("2d"),g=x.createRadialGradient(32,32,0,32,32,32);g.addColorStop(0,"rgba(255,255,255,1)");g.addColorStop(.25,"rgba(255,255,255,.55)");g.addColorStop(1,"rgba(255,255,255,0)");x.fillStyle=g;x.fillRect(0,0,64,64);const t=new THREE.CanvasTexture(c);return t})()
    };
    KIT.goldGlow=new THREE.SpriteMaterial({map:KIT.glowTex,color:0xF5C04A,blending:THREE.AdditiveBlending,depthWrite:false,transparent:true,opacity:.8,fog:false});
    KIT.geos=new Set(Object.values(KIT).filter(v=>v&&v.isBufferGeometry));
    return KIT;
  }
  function mats(hex){
    if(MATS.has(hex))return MATS.get(hex);
    const lin=h=>new THREE.Color(h).convertSRGBToLinear(),c=lin(hex),dark=lin("#0B1020").lerp(c,.09);
    const m={
      cloth:new THREE.MeshStandardMaterial({color:dark,roughness:.86,metalness:.05,side:THREE.DoubleSide}),
      lining:new THREE.MeshStandardMaterial({color:lin("#0B1020").lerp(c,.22),roughness:.7,metalness:.1,side:THREE.DoubleSide}),
      trim:new THREE.MeshStandardMaterial({color:c,emissive:c,emissiveIntensity:1.1,roughness:.4,metalness:.3}),
      glow:new THREE.SpriteMaterial({map:kit().glowTex,color:c,blending:THREE.AdditiveBlending,depthWrite:false,transparent:true,opacity:.75,fog:false})
    };
    MATS.set(hex,m);return m;
  }
  const mesh=(geo,mat,x,y,z,sx,sy,sz)=>{const o=new THREE.Mesh(geo,mat);o.position.set(x||0,y||0,z||0);if(sx!=null)o.scale.set(sx,sy,sz);o.castShadow=true;return o};

  // Dress a Sentinel as a Warden. Everything hangs off two roots (kit on the body, cap on the head) so it can be detached before disposal.
  function dress(g){
    const K=kit(),M=mats(g.color),A=ARCH[g.arch],m=g.m,root=new THREE.Group(),cap=new THREE.Group();
    // robe from the waist, with a lit hem
    const long=A.robe>2.5,rx=long?1:.86,rz=long?.86:.78;
    root.add(mesh(K.robe,M.cloth,0,3.45,0,rx,A.robe,rz));
    root.add(mesh(K.hem,M.trim,0,3.45-A.robe+.11,0,rx*1.012,.1,rz*1.012));
    root.add(mesh(K.hem,M.trim,0,3.42,0,.63,.06,.56));                              // sash at the waist
    if(A.mantle){root.add(mesh(K.mantle,M.lining,0,5.04,0,1,.4,.72));root.add(mesh(K.hem,M.trim,0,4.67,0,.955,.05,.735))}
    if(A.stole)for(const s of [-1,1])root.add(mesh(K.strip,M.trim,s*.22,4.2,.4,.13,1.35,.03));
    // cape: three hinged panels; the frame sways them and trails them behind turns
    if(A.cape){
      const w=[1.3,1.42,1.56],len=long?[1.25,1.25,1.2]:[1.2,1.2,1.15];let parent=root,y=4.94,z=-.44;g.cape=[];
      for(let i=0;i<3;i++){const h=new THREE.Group();h.position.set(0,y,z);const p=mesh(K.cape,i===0?M.cloth:M.cloth,0,0,0,w[i],len[i],1);h.add(p);if(i===2)h.add(mesh(K.strip,M.trim,0,-len[i]+.05,0,w[i]*1.01,.08,.05));parent.add(h);g.cape.push(h);parent=h;y=-len[i];z=0}
    }
    // head pieces
    if(A.hood){cap.add(mesh(K.hood,M.cloth,0,.5,-.03,1.05,1.22,1.1));cap.add(mesh(K.strip,M.trim,0,.9,.18,.5,.03,.03));
      if(A.hood===2){const pk=mesh(K.peak,M.cloth,0,1.25,-.22);pk.rotation.x=-.45;cap.add(pk)}}
    if(A.halo){const h=mesh(K.halo,M.trim,0,.62,-.46);cap.add(h);cap.add(mesh(K.haloIn,M.trim,0,.62,-.47));g.halo=h}
    // hand props
    if(A.staff){root.add(mesh(K.rod,K.metal,.98,6.75,.28,1,6.6,1));
      if(A.staff==="lantern"){const gm=mesh(K.gem,M.trim,.98,6.95,.28,1,1.35,1);root.add(gm);g.spin=gm;const sp=new THREE.Sprite(M.glow);sp.position.set(.98,6.95,.28);sp.scale.setScalar(1.9);root.add(sp);g.glow=sp}
      else{const bl=mesh(K.blade,M.trim,.98,7.1,.28);root.add(bl);root.add(mesh(K.strip,K.metal,.98,6.72,.28,.5,.06,.08))}}
    if(A.banner){root.add(mesh(K.rod,K.metal,.42,7.6,-.62,.8,3.2,.8));root.add(mesh(K.strip,K.metal,.42,7.5,-.62,.08,.05,1.2));
      const fl=new THREE.Group();fl.position.set(.42,7.48,-.62);fl.rotation.y=Math.PI/2;fl.add(mesh(K.flag,M.lining,0,0,0,1.1,1.55,1));fl.add(mesh(K.strip,M.trim,0,-.75,.02,1.12,.08,.05));fl.add(mesh(K.gem,M.trim,0,-.62,.03,.75,.75,.3));root.add(fl);g.flag=fl}
    if(A.tome){const t=new THREE.Group();t.position.set(-1.05,3.35,.6);t.add(mesh(K.tome,M.lining));t.add(mesh(K.pages,K.paper,0,.06,0));const motes=[];for(let i=0;i<3;i++){const o=mesh(K.mote,M.trim);t.add(o);motes.push(o)}root.add(t);g.tome=t;g.motes=motes}
    // quest marker
    const mk=new THREE.Group();mk.position.y=8.05;mk.scale.setScalar(1.5);const dia=mesh(K.marker,K.gold,0,0,0,1,1.7,1);dia.castShadow=false;mk.add(dia);const ring=mesh(K.markerRing,K.gold,0,-.62,0);ring.rotation.x=Math.PI/2;ring.castShadow=false;mk.add(ring);
    const halo=new THREE.Sprite(K.goldGlow);halo.scale.setScalar(2.2);mk.add(halo);mk.visible=false;root.add(mk);
    // Layered collar and fasteners create a readable guild silhouette without touching personal identities.
    for(const side of [-1,1]){const clasp=mesh(K.gem,K.metal,side*.48,4.65,.43,.32,.44,.25);root.add(clasp);root.add(mesh(K.strip,M.trim,side*.48,4.65,.49,.025,.15,.018));}
    g.marker=mk;g.markerDia=dia;g.markerRing=ring;g.markerGlow=halo;
    m.grp.add(root);m.head.add(cap);g.kitRoot=root;g.cap=cap;g.trim=M.trim;
  }
  function undress(g){if(g.kitRoot)g.kitRoot.parent&&g.kitRoot.parent.remove(g.kitRoot);if(g.cap)g.cap.parent&&g.cap.parent.remove(g.cap)}

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
    G.forEach(g=>{undress(g);SentinelMesh.dispose(g.m.grp);scene.remove(g.m.grp)});G=[];
    lastDist=Campus.districts();
    lastDist.forEach((d,i)=>{
      const p=spot(d),m=SentinelMesh.create({id:"guide:"+d.top,form:"member",palette:["#0B1020",d.color,"#F4EFE6"],symbol:two(d.name),level:0});
      m.pos.set(p.x,.25,p.z);m.grp.position.copy(m.pos);m.grp.rotation.y=Math.atan2(d.x+d.w/2-p.x,d.z+d.d/2-p.z)+Math.PI;m.ring.scale.setScalar(2.2);
      scene.add(m.grp);
      const g={top:d.top,name:d.name,color:d.color,x:p.x,z:p.z,m,near:false,home:m.grp.rotation.y,arch:archOf(d.top,i),
        hy:0,hp:0,yawVel:0,gest:null,gt:0,speakUntil:0,bark:null,barkUntil:0,nextBark:0,barkI:0,stats:null,
        lbl:{x:p.x,y:9.5,z:p.z,t:"",s:"",cls:"guide",prio:105,c:d.color},blb:{x:p.x,y:9.3,z:p.z,t:"",s:"",cls:"say",prio:120,c:d.color,guide:true}};
      dress(g);G.push(g);
    });
    refreshStats(true);
  }

  // ---- facts per district, refreshed every few seconds (never per frame)
  let statsAt=0;
  function refreshStats(force){
    const now=performance.now();if(!force&&now-statsAt<3000)return;statsAt=now;
    const S=snap(),t0=Date.now();
    G.forEach(g=>{
      const ns=notesIn(g.top),types={};let changed=0;ns.forEach(n=>{const t=n.fm.type||"untyped";types[t]=(types[t]||0)+1;if(n.updated_at&&t0-Date.parse(n.updated_at)<WEEK)changed++});
      const topType=Object.entries(types).sort((a,b)=>b[1]-a[1])[0];
      const Bld=Campus.buildings();let tall=null;ns.forEach(n=>{const b=Bld[n.id];if(b&&(!tall||b.h>tall.h))tall={name:n.name,h:b.h}});
      const open=S.tasks.filter(t=>isOpen(t)&&inDistrict(g.top,t.note)).length,live=S.tasks.filter(t=>isLiveTask(t)&&inDistrict(g.top,t.note)).length;
      const here=S.presence.filter(p=>p.status!=="offline"&&t0-Date.parse(p.last_seen)<15*60e3&&inDistrict(g.top,p.note)).length;
      g.stats={notes:ns.length,blocks:new Set(ns.map(n=>(n.folder||"").split("/")[1]||"·")).size,changed,topType,tall,open,live,here};
      g.lbl.t="Warden · "+g.name;g.lbl.s=esc(open?plural(open,"open task")+" · talk":"click to talk");
      g.marker.visible=live>0;const mat=open?kit().gold:kit().steel;g.markerDia.material=mat;g.markerRing.material=mat;g.markerGlow.visible=open>0;
    });
  }
  // Barks: one short fact at a time, each computed from g.stats. Lines with no data are skipped.
  function barkLine(g){
    const s=g.stats;if(!s)return null;
    const L=[`${plural(s.notes,"note")} stand in ${plural(s.blocks,"block")} here.`,
      s.changed?`${plural(s.changed,"note")} changed here this week.`:"Nothing here changed this week.",
      s.open?`${plural(s.open,"open task")} ${s.open===1?"points":"point"} here. Ask me.`:null,
      s.here?`${plural(s.here,"agent")} working here now.`:null,
      s.tall?`Tallest here: ${s.tall.name.slice(0,34)}.`:null,
      s.topType?`Most notes here are type ${s.topType[0]}.`:null].filter(Boolean);
    return L[(g.barkI++)%L.length];
  }

  // ---- sound: soft UI tones, only when the vault sound setting is on
  const Sfx=(()=>{let ctx=null,lastType=0;
    const ac=()=>{if(!store.get("vault.sound",true))return null;try{ctx=ctx||new (window.AudioContext||window.webkitAudioContext)();if(ctx.state==="suspended")ctx.resume()}catch(e){return null}return ctx};
    const tone=(f,t0,len,type,gain)=>{const c=ac();if(!c)return;const o=c.createOscillator(),g=c.createGain(),t=c.currentTime+t0;o.type=type;o.frequency.setValueAtTime(f,t);g.gain.setValueAtTime(0,t);g.gain.linearRampToValueAtTime(gain,t+.01);g.gain.exponentialRampToValueAtTime(.0001,t+len);o.connect(g).connect(c.destination);o.start(t);o.stop(t+len+.05)};
    return {open:()=>{tone(523,0,.22,"sine",.045);tone(784,.08,.3,"sine",.035)},close:()=>{tone(784,0,.18,"sine",.03);tone(523,.07,.24,"sine",.025)},
      move:()=>tone(1180,0,.05,"triangle",.012),pick:()=>{tone(660,0,.12,"triangle",.03);tone(990,.05,.16,"sine",.025)},
      type:()=>{const n=performance.now();if(n-lastType<55)return;lastType=n;tone(1500+Math.random()*200,0,.025,"square",.004)}};
  })();

  // ---- per frame: hover, head tracking, cape, gestures, marker, barks and the talk prompt. No allocation in here.
  const _v=new THREE.Vector3(),_h=new THREE.Vector3();
  let promptG=null,proxT=0,camDist=0,tgtX=0,tgtZ=0,walking=false,frameT=0;
  function frame(dt,time){
    if(Campus.districts()!==lastDist)place();
    if(!G.length)return false;
    frameT=time;const reduced=RM.matches;
    const cam=Campus.camera(),cp=cam.position;
    proxT-=dt;if(proxT<=0){proxT=.12;const p=Campus.position();tgtX=p.x;tgtZ=p.z;walking=p.walking;camDist=Math.hypot(cp.x-tgtX,cp.z-tgtZ);refreshStats(false);updatePrompt()}
    const L=Campus.labelCands;for(let i=L.length-1;i>=0;i--)if(L[i].cls==="guide"||L[i].guide)L.splice(i,1);
    let live=false;
    for(let i=0;i<G.length;i++){
      const g=G[i],m=g.m,dCam=Math.hypot(cp.x-g.x,cp.z-g.z),dT=Math.hypot(tgtX-g.x,tgtZ-g.z),near=Math.min(dCam,dT)<NEAR,talking=D.open&&D.g===g;
      if(near&&!g.near){if(!reduced)SentinelMesh.emote(m,"greet",time);g.nextBark=time+1.2}
      g.near=near;
      if(dCam<280)L.push(g.lbl);
      if(near&&!talking&&time>g.nextBark&&(!promptG||promptG===g)){const b=barkLine(g);if(b){g.blb.t=b;g.barkUntil=time+5.2}g.nextBark=time+16}
      if(time<g.barkUntil&&!talking&&dCam<520)L.push(g.blb);
      if(dCam>=520){if(!talking)continue}
      live=true;
      // body: face the viewer while talking; otherwise the head leads and the body follows past 55 degrees
      const toCam=Math.atan2(cp.x-g.x,cp.z-g.z),y0=m.grp.rotation.y;
      let rel=wrap(toCam-y0),want=y0;
      if(talking)want=toCam;else if(near){if(Math.abs(rel)>.95)want=toCam-Math.sign(rel)*.55}else want=g.home;
      const turn=wrap(want-y0)*(reduced?1:Math.min(1,dt*(talking?5:near?2.4:1.4)));
      m.grp.rotation.y=y0+turn;g.yawVel+=((dt>0?turn/dt:0)-g.yawVel)*Math.min(1,dt*6);
      rel=wrap(toCam-m.grp.rotation.y);
      const tilt=-Math.atan2(cp.y-(m.pos.y+5.3),Math.max(1,dCam));
      const wantHy=near?clamp(rel,-1,1):0,wantHp=near?clamp(tilt,-.45,.35):0,kh=reduced?1:Math.min(1,dt*5);
      g.hy+=(wantHy-g.hy)*kh;g.hp+=(wantHp-g.hp)*kh;
      // pose: shared Sentinel idle, then hover, head and gesture overrides
      const t=reduced?0:time;
      m.pos.y=reduced?.25:.25+Math.sin(time*1.3+m.phase)*.07;
      SentinelMesh.pose(m,t,"idle");
      const speaking=time<g.speakUntil;
      m.head.rotation.y=g.hy;m.head.rotation.x+=g.hp+(speaking&&!reduced?Math.sin(time*11)*.035:0);
      if(ARCH[g.arch].staff)m.arms[1].rotation.z+=.08;
      if(g.gest&&!reduced){
        const e=time-g.gt,dur=g.gest==="bow"?1.4:1.9;
        if(e>dur)g.gest=null;else{const k=Math.min(1,e/.25)*Math.min(1,(dur-e)/.3),A=m.arms;
          if(g.gest==="present"){A[0].rotation.x+=(-.95-A[0].rotation.x)*k;A[0].rotation.z+=(-.5-A[0].rotation.z)*k;A[1].rotation.x+=(-.95-A[1].rotation.x)*k;A[1].rotation.z+=(.5-A[1].rotation.z)*k}
          else if(g.gest==="point"){A[1].rotation.x+=(-1.5-A[1].rotation.x)*k;A[1].rotation.z+=(.12-A[1].rotation.z)*k;m.head.rotation.x-=.08*k}
          else if(g.gest==="bow"){m.head.rotation.x+=.5*k;A[0].rotation.x+=(.18-A[0].rotation.x)*k;A[1].rotation.x+=(.18-A[1].rotation.x)*k}}}
      if(speaking&&!reduced){const p=.5+.5*Math.sin(time*7);m.glow.value*=1+.6*p;g.trim.emissiveIntensity=1.1+.9*p}else g.trim.emissiveIntensity=1.1;
      // cloth and props
      if(g.cape){const sw=reduced?0:Math.sin(time*1.1+m.phase)*.035,tr=clamp(Math.abs(g.yawVel)*.25,0,.5),side=clamp(-g.yawVel*.15,-.25,.25);
        g.cape[0].rotation.x=.2+sw+tr;g.cape[1].rotation.x=.05+sw*1.4+tr*.5;g.cape[2].rotation.x=.04+sw*1.8;g.cape[0].rotation.z=side;g.cape[1].rotation.z=side*.6}
      if(!reduced){
        if(g.spin){g.spin.rotation.y=time*1.6;g.glow.material.opacity=.6+.2*Math.sin(time*3+m.phase)}
        if(g.flag)g.flag.rotation.z=Math.sin(time*1.7+m.phase)*.06;
        if(g.halo)g.halo.rotation.z=time*.4;
        if(g.tome){g.tome.position.y=3.35+Math.sin(time*1.6)*.1;g.tome.rotation.y=Math.sin(time*.7)*.3;for(let j=0;j<g.motes.length;j++){const a=time*(1.4+j*.35)+j*2.1;g.motes[j].position.set(Math.cos(a)*.42,.3+Math.sin(a*1.5)*.1,Math.sin(a)*.42)}}
        if(g.marker.visible){g.markerDia.rotation.y=time*1.8;g.marker.position.y=8.05+Math.sin(time*2.2)*.16;g.markerRing.scale.setScalar(1+.08*Math.sin(time*3))}
      }
    }
    if(D.open)portraitFrame(time);
    return live||D.open;
  }

  // ---- talk prompt: nearest Warden in range shows "E Talk"; a button, so touch can tap it
  let P=null;
  function updatePrompt(){
    let best=null,bd=1e9;
    if(!D.open)for(let i=0;i<G.length;i++){const g=G[i],cp=Campus.camera().position,d=walking?Math.hypot(cp.x-g.x,cp.z-g.z):Math.hypot(tgtX-g.x,tgtZ-g.z);if(d<TALK_R&&(walking||camDist<95)&&d<bd){bd=d;best=g}}
    if(best!==promptG){promptG=best;if(P){if(best){P.querySelector(".gp-n").textContent=best.name;P.style.setProperty("--c",best.color);P.hidden=false;requestAnimationFrame(()=>P.classList.add("on"))}else{P.classList.remove("on");P.hidden=true}}}
    if(D.open&&D.g){const g=D.g,d=Math.min(Math.hypot(tgtX-g.x,tgtZ-g.z),Math.hypot(Campus.camera().position.x-g.x,Campus.camera().position.z-g.z));if(d>LEAVE_R)close(false)}
  }

  // ---- dialogue panel
  const D={open:false,g:null,top:null,sel:0,full:"",n:0,timer:0,typing:false,prev:null,asked:new Set(),extra:"",onDone:null};
  let W=null;
  const CHOICES=[
    {id:"about",t:"What is this district?"},
    {id:"new",t:"What changed this week?"},
    {id:"who",t:"Who is working here?"},
    {id:"tasks",t:"What needs doing?"},
    {id:"land",t:"Show me the landmarks."},
    {id:"ask",t:"Ask about something else…"},
    {id:"ledger",t:"Open the full ledger (Ask, Map, Work)."},
    {id:"bye",t:"Farewell."}];
  function css(){
    if(document.getElementById("wdCss"))return;
    const s=document.createElement("style");s.id="wdCss";s.textContent=`
#wd{--c:#E8A33D;--wbg:rgba(9,12,22,.9);--wfg:#EEF0F6;--wmut:#97A0BA;--wline:rgba(255,255,255,.09);position:fixed;left:50%;bottom:calc(64px + env(safe-area-inset-bottom,0px));transform:translate(-50%,16px);width:min(880px,calc(100% - 32px));z-index:30;opacity:0;transition:opacity .22s ease,transform .32s cubic-bezier(.2,.8,.2,1);color:var(--wfg);font-family:var(--body)}
#wd.on{opacity:1;transform:translate(-50%,0)}
#wd .wd-card{position:relative;display:grid;grid-template-columns:128px 1fr;gap:18px;padding:18px 20px 14px;border-radius:16px;background:linear-gradient(180deg,rgba(18,23,40,.94),var(--wbg));-webkit-backdrop-filter:blur(14px) saturate(1.2);backdrop-filter:blur(14px) saturate(1.2);border:1px solid var(--wline);box-shadow:0 24px 60px -20px rgba(0,0,0,.75),0 0 0 1px rgba(0,0,0,.4),inset 0 1px 0 rgba(255,255,255,.06)}
#wd .wd-card::before{content:"";position:absolute;inset:-1px;border-radius:16px;padding:1px;background:linear-gradient(120deg,var(--c),transparent 38%,transparent 70%,color-mix(in srgb,var(--c) 60%,transparent));-webkit-mask:linear-gradient(#000 0 0) content-box,linear-gradient(#000 0 0);-webkit-mask-composite:xor;mask-composite:exclude;pointer-events:none}
#wd .wd-por{position:relative;width:128px;height:128px;border-radius:14px;overflow:hidden;background:radial-gradient(120% 90% at 50% 20%,color-mix(in srgb,var(--c) 30%,#0B1020),#05070F);box-shadow:0 0 0 1px color-mix(in srgb,var(--c) 55%,transparent),0 10px 30px -10px var(--c)}
#wd .wd-por canvas,#wd .wd-por img,#wd .wd-por svg{position:absolute;inset:0;width:100%;height:100%;object-fit:cover;display:block}
#wd .wd-por img{opacity:0;transition:opacity .3s}#wd .wd-por img.ok{opacity:1}
#wd .wd-por::after{content:"";position:absolute;inset:0;background:repeating-linear-gradient(0deg,rgba(255,255,255,.035) 0 1px,transparent 1px 3px),linear-gradient(180deg,transparent 55%,rgba(5,7,15,.65));pointer-events:none}
#wd .wd-arch{position:absolute;left:8px;bottom:7px;z-index:1;font-family:var(--mono);font-size:10px;letter-spacing:.16em;text-transform:uppercase;color:var(--c)}
#wd .wd-plate{position:absolute;left:162px;top:-15px;display:flex;align-items:baseline;gap:10px;padding:5px 14px 6px;border-radius:9px;background:linear-gradient(180deg,#151C33,#0C1122);border:1px solid color-mix(in srgb,var(--c) 70%,transparent);box-shadow:0 8px 20px -8px var(--c)}
#wd .wd-plate b{font-family:var(--display);font-size:15px;letter-spacing:.01em}
#wd .wd-plate span{font-family:var(--mono);font-size:10.5px;color:var(--wmut);letter-spacing:.04em}
#wd .wd-x{position:absolute;right:12px;top:10px;font-family:var(--mono);font-size:10.5px;color:var(--wmut);border:1px solid var(--wline);border-radius:6px;padding:2px 7px;background:transparent}
#wd .wd-x:hover{color:var(--wfg);border-color:var(--c)}
#wd .wd-main{min-width:0;display:flex;flex-direction:column}
#wd .wd-text{font-size:16px;line-height:1.5;min-height:3em;margin:6px 34px 6px 0;color:var(--wfg);cursor:pointer}
#wd .wd-text .cur{display:inline-block;width:.5em;height:1em;vertical-align:-2px;margin-left:2px;background:var(--c);animation:wdBlink .9s steps(2) infinite}
#wd .wd-text.done .cur{display:none}
@keyframes wdBlink{50%{opacity:0}}
#wd .wd-extra{max-height:min(24vh,200px);overflow:auto;margin:0 0 8px;padding-right:4px}
.wd-types{display:flex;flex-wrap:wrap;gap:6px;margin:2px 0 6px}.wd-types span{font-family:var(--mono);font-size:11px;padding:2px 8px;border-radius:999px;border:1px solid var(--wline,var(--line));color:var(--wmut,var(--muted))}.wd-types b{color:var(--wfg,var(--fg));font-weight:600;margin-left:5px}
#wd .wd-extra p{margin:0 0 6px;font-size:13px;color:var(--wmut)}
#wd .wd-extra:empty{display:none}
#wd .wd-extra .bl{background:rgba(255,255,255,.03);border-color:var(--wline);color:var(--wfg)}
#wd .wd-extra .bl:hover{border-color:var(--c)}
#wd .wd-extra .bl small{color:var(--wmut)}
#wd .wd-extra table{font-size:12.5px}
#wd .wd-ch{display:grid;grid-template-columns:1fr 1fr;gap:4px 10px;margin:4px 0 0;padding:0;list-style:none}
#wd .wd-ch button{width:100%;min-height:36px;display:flex;align-items:center;gap:10px;text-align:left;padding:6px 10px;border-radius:9px;border:1px solid transparent;background:transparent;color:var(--wfg);font-size:13.5px;transition:background .15s,border-color .15s,transform .15s}
#wd .wd-ch button kbd{flex:none;width:20px;height:20px;display:grid;place-items:center;border-radius:5px;font-family:var(--mono);font-size:10.5px;color:var(--wmut);border:1px solid var(--wline)}
#wd .wd-ch button.sel,#wd .wd-ch button:hover{background:color-mix(in srgb,var(--c) 14%,transparent);border-color:color-mix(in srgb,var(--c) 45%,transparent)}
#wd .wd-ch button.sel kbd{color:#0B1020;background:var(--c);border-color:var(--c)}
#wd .wd-ch button.sel::after{content:"";margin-left:auto;width:0;height:0;border-left:6px solid var(--c);border-top:5px solid transparent;border-bottom:5px solid transparent}
#wd .wd-ch button.asked{color:var(--wmut)}
#wd .wd-ch button:focus-visible{outline:2px solid var(--c);outline-offset:1px}
#wd.typing .wd-ch{opacity:.45}
#wd form{display:flex;gap:8px;margin:6px 0 2px}#wd form[hidden]{display:none}
#wd form input{flex:1;min-width:0;background:rgba(255,255,255,.04);border:1px solid var(--wline);border-radius:9px;color:var(--wfg);padding:8px 11px;font:inherit;font-size:14px}
#wd form input:focus{outline:none;border-color:var(--c)}
#wd .wd-foot{display:flex;gap:14px;flex-wrap:wrap;margin-top:8px;font-family:var(--mono);font-size:10.5px;color:var(--wmut);letter-spacing:.03em}
#wd .wd-foot kbd{font-family:inherit;color:var(--wfg);border:1px solid var(--wline);border-radius:4px;padding:0 4px;margin-right:3px}
#wd .sr{position:absolute;width:1px;height:1px;overflow:hidden;clip:rect(0 0 0 0);white-space:nowrap}
#gPrompt{--c:#E8A33D;position:fixed;left:50%;bottom:calc(76px + env(safe-area-inset-bottom,0px));transform:translate(-50%,10px);z-index:29;display:flex;align-items:center;gap:10px;padding:8px 14px 8px 8px;border-radius:999px;background:rgba(9,12,22,.86);-webkit-backdrop-filter:blur(10px);backdrop-filter:blur(10px);border:1px solid color-mix(in srgb,var(--c) 60%,transparent);color:#EEF0F6;font-family:var(--display);font-size:13.5px;opacity:0;transition:opacity .2s,transform .25s;box-shadow:0 10px 28px -10px var(--c)}
#gPrompt.on{opacity:1;transform:translate(-50%,0)}
#gPrompt kbd{width:26px;height:26px;display:grid;place-items:center;border-radius:50%;background:var(--c);color:#0B1020;font-family:var(--mono);font-weight:700;font-size:12px}
#gPrompt small{color:#97A0BA;font-family:var(--mono);font-size:10.5px}
@media (hover:none){#gPrompt kbd{font-size:0}#gPrompt kbd::before{content:"●";font-size:11px}}
@media (max-width:760px){
 #wd{bottom:calc(8px + env(safe-area-inset-bottom,0px));width:calc(100% - 16px)}
 #wd .wd-card{grid-template-columns:64px 1fr;gap:12px;padding:16px 12px 10px}
 #wd .wd-por{width:64px;height:64px;border-radius:10px}#wd .wd-arch{display:none}
 #wd .wd-card{max-height:64vh;grid-template-rows:auto 1fr}#wd .wd-main{overflow:auto;min-height:0}
 #wd .wd-plate{left:12px;right:56px;top:-14px;overflow:hidden;white-space:nowrap}#wd .wd-plate span{display:none}#wd .wd-plate b{font-size:14px;overflow:hidden;text-overflow:ellipsis}
 #wd .wd-text{font-size:14.5px;margin:4px 0 6px}
 #wd .wd-ch{grid-template-columns:1fr 1fr;gap:4px}#wd .wd-ch button{min-height:44px;font-size:12.5px;padding:5px 7px;gap:7px}
 #wd .wd-foot{display:none}#wd .wd-extra{max-height:22vh}
}
@media (prefers-reduced-motion:reduce){#wd,#gPrompt{transition:none}#wd .wd-text .cur{animation:none}}
`;document.head.appendChild(s);
  }
  function ui(){
    if(W)return W;css();
    W=document.createElement("section");W.id="wd";W.hidden=true;W.setAttribute("role","dialog");W.setAttribute("aria-modal","false");W.setAttribute("aria-labelledby","wdName");W.setAttribute("aria-describedby","wdLive");
    W.innerHTML=`<div class="wd-card"><div class="wd-por" aria-hidden="true"><canvas width="176" height="176"></canvas><img alt="" decoding="async"><span class="wd-arch"></span></div>
<div class="wd-main"><div class="wd-text" id="wdText" aria-hidden="true"><span class="t"></span><span class="cur"></span></div><div class="sr" id="wdLive" aria-live="polite" aria-atomic="true"></div>
<div class="wd-extra"></div><form id="wdAsk" hidden><input maxlength="200" placeholder="Ask the Warden…" autocomplete="off" aria-label="Question for the Warden"><button class="btn pri" type="submit">Ask</button></form>
<ol class="wd-ch" role="group" aria-label="Replies"></ol>
<div class="wd-foot"><span><kbd>↑</kbd><kbd>↓</kbd>choose</span><span><kbd>1</kbd>–<kbd>8</kbd>pick</span><span><kbd>Enter</kbd>select</span><span><kbd>Space</kbd>skip</span><span><kbd>Esc</kbd>leave</span></div></div>
<div class="wd-plate"><b id="wdName"></b><span class="wd-dist"></span></div><button class="wd-x" type="button" aria-label="Leave the conversation">Esc</button></div>`;
    document.body.appendChild(W);
    W.querySelector(".wd-x").onclick=()=>close(true);
    W.querySelector(".wd-text").onclick=()=>skip();
    W.querySelector("#wdAsk").onsubmit=e=>{e.preventDefault();const i=W.querySelector("#wdAsk input"),q=i.value.trim();if(!q)return;Sfx.pick();const r=reply(D.top,q);memo.set(D.top,{q,a:answerHTML(r)});say(r.text,r.html,r.gest);i.value="";W.querySelector("#wdAsk").hidden=true;focusSel()};
    W.querySelector(".wd-ch").addEventListener("click",e=>{const b=e.target.closest("button[data-i]");if(b)choose(+b.dataset.i)});
    W.querySelector(".wd-extra").addEventListener("click",e=>{const b=e.target.closest("[data-n]");if(b){const n=byName.get(b.dataset.n);if(n){close(false);open(n)}return}if(e.target.closest("#wdWalk")){const d=district(D.top);if(d){Campus.flyAt(d.x+d.w/2,d.z+d.d/2,0,Math.max(d.w,d.d)*1.05+70,.72);close(false)}}});
    P=document.createElement("button");P.id="gPrompt";P.type="button";P.hidden=true;P.innerHTML=`<kbd>E</kbd><span>Talk to the Warden of <b class="gp-n"></b></span><small>Warden</small>`;
    P.onclick=()=>{if(promptG)talk(promptG.top)};document.body.appendChild(P);
    window.addEventListener("keydown",onKey,true);
    return W;
  }
  function drawChoices(){
    const ol=W.querySelector(".wd-ch");
    ol.innerHTML=CHOICES.map((c,i)=>`<li><button type="button" data-i="${i}" class="${i===D.sel?"sel":""}${D.asked.has(c.id)?" asked":""}"><kbd>${i+1}</kbd><span>${esc(c.t)}</span></button></li>`).join("");
  }
  function setSel(i,focus=true){
    const bs=W.querySelectorAll(".wd-ch button");if(!bs.length)return;i=(i+bs.length)%bs.length;
    if(i!==D.sel)Sfx.move();D.sel=i;bs.forEach((b,k)=>b.classList.toggle("sel",k===i));if(focus)bs[i].focus({preventScroll:true});
  }
  const focusSel=()=>{const b=W&&W.querySelectorAll(".wd-ch button")[D.sel];if(b)b.focus({preventScroll:true})};
  // typewriter. The visible text is aria-hidden; the full line goes to the polite live region at once.
  function say(text,html,gest){
    const g=D.g;clearInterval(D.timer);D.full=text;D.n=0;D.extra=html||"";
    const t=W.querySelector(".wd-text .t"),box=W.querySelector(".wd-text"),ex=W.querySelector(".wd-extra");
    ex.innerHTML="";W.querySelector("#wdLive").textContent=text;
    if(g&&gest&&!RM.matches){if(gest==="greet"||gest==="nod")SentinelMesh.emote(g.m,gest,frameT);else{g.gest=gest;g.gt=frameT}}
    const done=()=>{clearInterval(D.timer);D.typing=false;t.textContent=D.full;box.classList.add("done");W.classList.remove("typing");ex.innerHTML=D.extra;if(g)g.speakUntil=0};
    if(RM.matches){done();return}
    D.typing=true;box.classList.remove("done");W.classList.add("typing");t.textContent="";if(g)g.speakUntil=1e9;
    D.timer=setInterval(()=>{D.n+=2;t.textContent=D.full.slice(0,D.n);if(D.full[D.n-1]&&D.full[D.n-1]!==" ")Sfx.type();if(D.n>=D.full.length)done()},28);
    D.finish=done;
  }
  function skip(){if(D.typing&&D.finish)D.finish()}
  function greeting(g){
    const s=g.stats||{notes:notesIn(g.top).length,blocks:0,open:0};
    return `I keep ${g.name}. ${plural(s.notes,"note")} ${s.notes===1?"stands":"stand"} here in ${plural(s.blocks,"block")}. ${s.open?`${plural(s.open,"open task")} ${s.open===1?"points":"point"} at this district.`:"No open task points at this district."} What do you need?`;
  }
  function talk(top,fly=true){
    const g=G.find(x=>x.top===top),d=district(top);if(!g||!d)return false;
    ui();refreshStats(true);
    const wasOpen=D.open;D.open=true;D.g=g;D.top=top;curTop=top;D.sel=0;D.asked=new Set();
    if(!wasOpen){D.prev=document.activeElement}
    W.style.setProperty("--c",g.color);W.querySelector("#wdName").textContent="Warden of "+g.name;
    W.querySelector(".wd-dist").textContent=`${ARCH[g.arch].title} · ${g.top} · ${plural(g.stats.notes,"note")}`;
    W.querySelector(".wd-arch").textContent=ARCH[g.arch].title;W.querySelector("#wdAsk").hidden=true;
    portraitSetup(g);
    W.hidden=false;requestAnimationFrame(()=>W.classList.add("on"));
    if(P){P.classList.remove("on");P.hidden=true;promptG=null}
    // frame the Warden above the panel: the viewer stands off to one side, a few steps out
    if(fly){const cp=Campus.camera().position;let dx=cp.x-g.x,dz=cp.z-g.z;const l=Math.hypot(dx,dz)||1;dx/=l;dz/=l;Campus.flyAt(g.x+dx*.6-dz*2.8,g.z+dz*.6+dx*2.8,1.6,14.5,.07)}
    drawChoices();Sfx.open();say(greeting(g),"","greet");
    setTimeout(focusSel,30);
    return true;
  }
  function close(sound=true){
    if(!D.open)return;D.open=false;clearInterval(D.timer);D.typing=false;
    const g=D.g;if(g){g.speakUntil=0;if(!RM.matches){g.gest="bow";g.gt=frameT}}
    if(sound)Sfx.close();
    W.classList.remove("on");setTimeout(()=>{if(!D.open)W.hidden=true},260);
    const p=D.prev;D.prev=null;D.g=null;if(p&&p.isConnected&&p!==document.body)try{p.focus({preventScroll:true})}catch(e){}
  }
  function choose(i){
    const c=CHOICES[i];if(!c||!D.open)return;
    if(D.typing){skip();return}
    setSel(i,false);Sfx.pick();
    const top=D.top,d=district(top);if(!d)return;
    if(c.id==="bye"){say("Walk well.","", "bow");setTimeout(()=>close(true),RM.matches?0:650);return}
    if(c.id==="ledger"){close(false);sheet.view="guide";sheet.gtab=sheet.gtab||"ask";openSheet("guide");return}
    if(c.id==="ask"){const f=W.querySelector("#wdAsk");f.hidden=false;const inp=f.querySelector("input");inp.focus();return}
    D.asked.add(c.id);drawChoices();
    const r=c.id==="about"?overviewR(top,d):c.id==="new"?whatsNewR(top):c.id==="who"?whoHereR(top):c.id==="tasks"?openTasksR(top):landmarksR(top,d);
    say(r.text,r.html,r.gest);focusSel();
  }
  function onKey(e){
    if(!D.open){
      if(!promptG||e.metaKey||e.ctrlKey||e.altKey||e.repeat)return;
      if(/^(INPUT|TEXTAREA|SELECT)$/.test(document.activeElement?.tagName||""))return;
      if(e.key==="e"||e.key==="E"){e.preventDefault();e.stopPropagation();talk(promptG.top)}
      return;
    }
    const inInput=e.target&&e.target.closest&&e.target.closest("#wdAsk input");
    if(e.key==="Escape"){e.preventDefault();e.stopPropagation();if(inInput){W.querySelector("#wdAsk").hidden=true;focusSel()}else close(true);return}
    if(inInput||e.metaKey||e.ctrlKey||e.altKey)return;
    const inPanel=W.contains(e.target)||e.target===document.body||e.target===document.documentElement||(e.target.tagName==="CANVAS");
    if(!inPanel)return;
    const k=e.key;
    if(k==="Tab")return;
    e.stopPropagation();
    if(k===" "||k==="Enter"){e.preventDefault();if(D.typing){skip();return}if(e.target.closest&&e.target.closest(".wd-extra [data-n],#wdWalk")){e.target.click();return}const fb=e.target.closest&&e.target.closest(".wd-ch button[data-i]");choose(fb?+fb.dataset.i:D.sel);return}
    if(D.typing&&k!=="ArrowUp"&&k!=="ArrowDown")return;
    if(k==="ArrowDown"||k==="s"||k==="S"){e.preventDefault();setSel(D.sel+1)}
    else if(k==="ArrowUp"||k==="w"||k==="W"){e.preventDefault();setSel(D.sel-1)}
    else if(k==="ArrowRight"&&innerWidth>760){e.preventDefault();setSel(D.sel+4)}
    else if(k==="ArrowLeft"&&innerWidth>760){e.preventDefault();setSel(D.sel-4)}
    else if(/^[1-8]$/.test(k)){e.preventDefault();choose(+k-1)}
  }

  // ---- portrait. Painted art from web/assets/guides when it exists; otherwise a live render of the Warden's head from the campus scene.
  const PS=176;let PCAM=null,pctx=null,pLast=-1,pStatic=false;
  const artFail=new Set();
  function portraitSetup(g){
    const img=W.querySelector(".wd-por img"),cv=W.querySelector(".wd-por canvas"),file="assets/guides/warden-"+g.color.replace("#","").toLowerCase()+".webp";
    img.classList.remove("ok");img.onload=null;img.onerror=null;pStatic=false;pLast=-1;
    if(!artFail.has(file)){img.onload=()=>{if(D.g===g){img.classList.add("ok");pStatic=true}};img.onerror=()=>{artFail.add(file)};img.src=file}else img.removeAttribute("src");
    cv.style.display="";
    if(!pctx)try{pctx=cv.getContext("2d")}catch(e){pctx=null}
    if(pctx){pctx.fillStyle="#05070F";pctx.fillRect(0,0,PS,PS)}
  }
  // Render the Warden's head and shoulders from the campus scene into a 2D context. Buffers are cached per size.
  const PB=new Map();
  function renderHead(g,ctx,size,back){
    const r=Campus.renderer();if(!r)throw new Error("no renderer");
    let b=PB.get(size);if(!b){b={rt:new THREE.WebGLRenderTarget(size,size,{encoding:THREE.sRGBEncoding}),buf:new Uint8Array(size*size*4),img:ctx.createImageData(size,size)};PB.set(size,b)}
    if(!PCAM)PCAM=new THREE.PerspectiveCamera(28,1,.1,400);
    PCAM.near=Math.max(.1,back-1.1);PCAM.updateProjectionMatrix();                  // clip trees or walls between the lens and the Warden
    g.m.head.getWorldPosition(_h);_h.y+=.3;
    const ry=g.m.grp.rotation.y+g.hy*.6;_v.set(_h.x+Math.sin(ry)*back+Math.cos(ry)*.6,_h.y+.25,_h.z+Math.cos(ry)*back-Math.sin(ry)*.6);
    PCAM.position.copy(_v);PCAM.lookAt(_h.x,_h.y-.6,_h.z);PCAM.updateMatrixWorld();
    const prev=r.getRenderTarget();r.setRenderTarget(b.rt);r.clear();r.render(Campus.scene(),PCAM);r.readRenderTargetPixels(b.rt,0,0,size,size,b.buf);r.setRenderTarget(prev);
    const d=b.img.data,row=size*4;for(let y=0;y<size;y++){const s=(size-1-y)*row,o=y*row;for(let x=0;x<row;x++)d[o+x]=b.buf[s+x]}
    ctx.putImageData(b.img,0,0);
  }
  function portraitFrame(time){
    const g=D.g;if(!g||pStatic||!pctx)return;
    const speaking=time<g.speakUntil,rate=RM.matches?1e9:speaking?1/12:1/5;
    if(pLast>=0&&time-pLast<rate)return;pLast=time;
    try{renderHead(g,pctx,PS,5.4)}
    catch(e){pStatic=true;const svg=typeof Identity!=="undefined"?Identity.preview({form:"member",palette:["#0B1020",g.color,"#F4EFE6"]}):"";const por=W.querySelector(".wd-por");por.querySelector("canvas").style.display="none";if(svg&&!por.querySelector("svg"))por.insertAdjacentHTML("afterbegin",svg)}
  }
  // Stand-in art: a still of the code-built Warden at a given size, as a data URL. Used to produce web/assets/guides/warden-<hex>.webp
  // until painted portraits replace those files.
  function still(top,size=384,type="image/webp"){
    const g=G.find(x=>x.top===top);if(!g)return null;const c=document.createElement("canvas");c.width=c.height=size;
    const y=g.hy;g.hy=0;try{renderHead(g,c.getContext("2d"),size,5.6)}finally{g.hy=y}
    return c.toDataURL(type,.86);
  }
  function picker(rc){
    if(!G.length)return false;
    const hits=rc.intersectObjects(G.map(g=>g.m.grp),true);if(!hits.length)return false;
    let o=hits[0].object,g=null;while(o&&!g){g=G.find(x=>x.m.grp===o)||null;o=o.parent}
    if(!g)return false;
    talk(g.top,true);return true;
  }
  // openFor keeps its old contract for callers: open the guide for a district. It now starts the conversation.
  function openFor(top,fly=true){return talk(top,fly)}
  function ledger(top){if(top)curTop=top;sheet.view="guide";sheet.gtab=sheet.gtab||"ask";openSheet("guide");return true}
  function boot(){
    if(booted||!Campus.ok())return;booted=true;
    ui();place();Campus.onFrame(frame);Campus.addPicker(picker);
  }

  // ---- answers. Every answer is computed from loaded data; nothing is guessed. Each returns {text, html, gest}.
  const CHIPS=["What is this district","What's new","Who is working here","Open tasks","Recommend my next task","Connect my tools"];
  const noteBtn=(n,sub)=>`<button class="bl" type="button" data-n="${esc(n.name)}"><b>${esc(n.name)}</b><small>${sub}</small></button>`;
  function overviewR(top,d){
    const ns=notesIn(top),mocs=ns.filter(n=>n.fm.type==="moc"),types={};ns.forEach(n=>{const t=n.fm.type||"untyped";types[t]=(types[t]||0)+1});
    const rows=Object.entries(types).sort((a,b)=>b[1]-a[1]);
    const blocks=new Set(ns.map(n=>(n.folder||"").split("/")[1]||"·"));
    const text=`${plural(ns.length,"note")} in ${plural(blocks.size,"block")}.${rows.length?` Most are type ${rows[0][0]} (${rows[0][1]}).`:""} ${mocs.length?`${plural(mocs.length,"map")} of content ${mocs.length===1?"lives":"live"} here.`:"No map of content lives here."}`;
    const html=`<div class="wd-types">${rows.slice(0,8).map(([t,c])=>`<span>${esc(t)}<b>${c}</b></span>`).join("")}</div>${mocs.length?`<p>Maps of content: ${mocs.map(link).join(", ")}.</p>`:""}`;
    return {text,html,gest:"present"};
  }
  function whatsNewR(top){
    const now=Date.now(),ns=notesIn(top).filter(n=>n.updated_at&&now-Date.parse(n.updated_at)<WEEK).sort((a,b)=>Date.parse(b.updated_at)-Date.parse(a.updated_at));
    if(!ns.length)return {text:"Nothing in this district changed in the last 7 days.",html:"",gest:"nod"};
    return {text:`${plural(ns.length,"note")} changed in the last 7 days. Newest first.`,html:ns.slice(0,8).map(n=>noteBtn(n,`${esc(ago(n.updated_at))}${n.updated_by?" · "+esc(n.updated_by):""}`)).join(""),gest:"present"};
  }
  function whoHereR(top){
    const S=snap(),live=S.presence.filter(p=>p.status!=="offline"&&Date.now()-Date.parse(p.last_seen)<15*60e3&&inDistrict(top,p.note));
    if(!live.length)return {text:"No agent is standing in this district right now.",html:"",gest:"nod"};
    return {text:`${plural(live.length,"agent")} ${live.length===1?"is":"are"} working here now.`,html:live.map(p=>`<button class="bl" type="button" data-n="${esc(p.note)}"><b>${esc(agentName(p.agent))} · ${esc(p.status)}</b><small>${esc(p.note)}${p.task?" · "+esc(p.task):""}${p.detail?" · "+esc(p.detail):""}</small></button>`).join(""),gest:"present"};
  }
  function openTasksR(top){
    const ts=snap().tasks.filter(t=>t.status!=="done"&&inDistrict(top,t.note)).sort((a,b)=>(BOUNTY[b.priority]||80)-(BOUNTY[a.priority]||80));
    if(!ts.length)return {text:"No open task points at a note in this district.",html:"",gest:"nod"};
    const open=ts.filter(isOpen).length;
    return {text:`${plural(ts.length,"task")} not done here, ${open} open. Highest bounty first.`,html:ts.map(t=>`<button class="bl" type="button" data-n="${esc(t.note)}"><b>${esc(t.title||t.id)} <em class="bounty">+${BOUNTY[t.priority]||80} XP</em></b><small>${esc(t.id)} · ${esc(t.status)}${t.agent?" · "+esc(agentName(t.agent)):" · unassigned"} · ${esc(t.note)}</small></button>`).join(""),gest:"present"};
  }
  function nextWorkR(top){
    const tasks=snap().tasks.filter(t=>isOpen(t)&&inDistrict(top,t.note)).sort((a,b)=>(BOUNTY[b.priority]||80)-(BOUNTY[a.priority]||80)||String(a.id).localeCompare(String(b.id)));
    if(!tasks.length)return {text:"No unclaimed task is open here. Review recent changes or ask another district's Warden.",html:chips(),gest:"nod"};
    const t=tasks[0];return {text:`Start with ${t.title||t.id}. It is ${t.priority||"medium"} priority. Read its linked note before claiming it in the task board.`,html:noteBtn({name:t.note},`${esc(t.id)} · ${esc(t.status)} · +${BOUNTY[t.priority]||80} XP on completion`),gest:"point"};
  }
  function toolsR(top){
    const ns=notesIn(top).filter(n=>/mcp|connector|integration|tool registry|agent api|onboarding/i.test(n.name)).slice(0,6);
    return {text:"Your tools join through the vault's agent API or MCP connection. Follow the connection notes for identity and access. Never paste credentials into a note or floor chat.",html:ns.length?ns.map(n=>noteBtn(n,esc(n.folder||""))).join(""):"<p>Connection setup is in the Live and onboarding panels. This district has no matching connection note.</p>",gest:"present"};
  }
  function landmarksR(top,d){
    const Bld=Campus.buildings(),tall=notesIn(top).filter(n=>Bld[n.id]).map(n=>({n,h:Bld[n.id].h,deg:n.out.size+n.back.size})).sort((a,b)=>b.h-a.h||b.deg-a.deg).slice(0,6);
    if(!tall.length)return {text:"No buildings are placed in this district yet.",html:"",gest:"nod"};
    const t=tall[0];
    return {text:`The tallest here is ${t.n.name}, ${Math.round(t.h)} m with ${plural(t.deg,"link")}.`,html:tall.map(x=>noteBtn(x.n,`${Math.round(x.h)} m · ${plural(x.deg,"link")}${x.n.fm.type?" · "+esc(x.n.fm.type):""}`)).join("")+`<button class="btn pri" id="wdWalk" type="button">Walk me to the district centre</button>`,gest:"point"};
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
  const chips=()=>`<div class="taglist gchips">${CHIPS.map(c=>`<button class="chip gq" type="button" data-q="${esc(c)}">${esc(c)}</button>`).join("")}</div>`;
  function reply(top,q){
    const d=district(top);q=String(q||"").trim();if(!d||!q)return {text:"",html:""};
    const ql=q.toLowerCase();
    let m;
    if(m=ql.match(/^(?:where(?:'s| is| are)?|find|take me to|go to|show me|fly to)\s+(.+?)\??$/)){
      const want=m[1].replace(/^(the|a)\s+/,"");const r=best(top,want)[0]||NOTES.map(n=>({n,s:n.name.toLowerCase().includes(want)?1:0})).find(r=>r.s);
      if(r){setTimeout(()=>{if(D.open)close(false);open(r.n)},D.open?900:60);return {text:`${r.n.name} is ${r.n.top===top?"in this district":"in "+r.n.top}. Flying there.`,html:"",gest:"point"}}
      return {text:`I do not have a note called “${want}”. Try one of these.`,html:chips(),gest:"nod"};
    }
    if(/what(?:'s| is)? (?:this|the) (?:district|place|area)|about (?:this|the) district|what is here|what'?s here/.test(ql))return overviewR(top,d);
    if(/what'?s new|new here|recent|changed|updated|latest/.test(ql))return whatsNewR(top);
    if(/who(?:'s| is)?\s*(?:working|here|around|standing)|anyone (?:here|working)|working here/.test(ql))return whoHereR(top);
    if(/recommend|next task|start working|where (?:should|can) i start/.test(ql))return nextWorkR(top);
    if(/connect|integration|\bmcp\b|my tools|tool setup/.test(ql))return toolsR(top);
    if(/open tasks?|tasks?\b|commissions?|to-?do|work here|what needs doing/.test(ql))return openTasksR(top);
    if(/landmark|tallest|biggest/.test(ql))return landmarksR(top,d);
    const rs=best(top,q).slice(0,5);
    if(!rs.length)return {text:"I do not have that. Try one of these.",html:chips(),gest:"nod"};
    return {text:`${plural(rs.length,"note")} in this district ${rs.length===1?"matches":"match"}.`,html:rs.map(r=>noteBtn(r.n,esc(snippetFor(r.n,q)||r.n.folder||""))).join(""),gest:"present"};
  }
  const answerHTML=r=>(r.text?`<p>${esc(r.text)}</p>`:"")+(r.html||"");
  function answer(top,q){return answerHTML(reply(top,q))}

  // ---- sheet tabs (the full ledger)
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
  const list=()=>G.map(g=>({top:g.top,name:g.name,color:g.color,x:g.x,z:g.z,arch:g.arch,open:g.stats?g.stats.open:0}));
  const current=()=>district(curTop);
  return {boot,render,bind,answer,reply,list,openFor,talk,close,ledger,current,CHIPS,isTalking:()=>D.open,still};
})();
(function(){const t=setInterval(()=>{if(typeof Campus!=="undefined"&&Campus.ok()){clearInterval(t);Guides.boot()}},300)})();

