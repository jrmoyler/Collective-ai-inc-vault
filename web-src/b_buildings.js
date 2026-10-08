// =====================================================================
// Facades: what a building says about its note.
// Every building is a note. Its windows, door, awning, sign, balconies, scaffolding and roof stubs read the note's
// metadata: status (archived, superseded, chartered, operating, pending), age (fresh, stale), links (orphan,
// unresolved, well linked), the last editor (owner accent) and its open tasks (door light).
// Contract: one InstancedMesh of unit boxes for all dressing (1 draw call), a hard instance budget per quality tier,
// nothing placed inside a street cell (all parts hug the facade or sit on the roof), no per-building animation loop.
// The facade shader in c_campus.js decodes Facades.pack() from aExt.w (window pattern, status tone, weather,
// staleness, recency). All values stay at or below 539 so mediump fragment floats decode them exactly.
// =====================================================================
const Facades=(()=>{
  const HOUR=36e5,DAY=864e5;
  const clamp=(v,a,b)=>Math.max(a,Math.min(b,v));
  const h01=s=>{let h=2166136261;s=String(s);for(let i=0;i<s.length;i++){h^=s.charCodeAt(i);h=Math.imul(h,16777619)}return((h>>>0)%100000)/100000};
  // Window patterns, one per district massing style (districtStyle in c_campus.js).
  const PATTERNS=Object.freeze(['punched','ribbon','pier','civic','curtain']);
  // Status tone in the shader: 0 plain, 1 operating, 2 chartered, 3 pending.
  const TONE={operating:1,chartered:2,pending:3};
  const OWNER=['#E8A33D','#9CD3FF','#7FC8A9','#E07AA0','#C9A4E0','#F2B85B','#6FA8DC','#D9734E'];
  const TASK={open:'#9CD3FF',claimed:'#F2B85B',review:'#22D3EE',blocked:'#E5534B'};
  const LIMIT=Object.freeze({high:16000,medium:9000,low:6000,scaffoldBuildings:48,balconiesPerBuilding:4});
  const contract=Object.freeze({drawCalls:1,maxDrawCalls:4,patterns:PATTERNS.length,maxPack:539,streetObstacles:0});

  function time(v){const t=typeof v==='number'?v:Date.parse(v||'');return Number.isFinite(t)?t:NaN}
  // Last real edit: the frontmatter date or a non-sync write, whichever is newer. A bulk repo sync is not an edit.
  function lastEdit(n){
    const fm=n.fm||{},sync=!n.updated_by||n.updated_by==='repo-sync';
    const a=time(fm.updated),b=sync?NaN:time(n.updated_at);
    return Number.isFinite(a)&&Number.isFinite(b)?Math.max(a,b):Number.isFinite(b)?b:a;
  }
  function unresolvedLinks(n,byName){
    if(!byName||typeof n.body!=='string')return 0;const seen=new Set();
    (n.body.match(/\[\[([^\]|#]+)/g)||[]).forEach(m=>{const k=m.slice(2).trim();if(k&&!byName.has(k))seen.add(k)});
    return seen.size;
  }
  // Everything the facade encodes for one note. Pure: no THREE, no DOM.
  function signal(n,o={}){
    const now=o.now??Date.now(),fm=n.fm||{},status=String(fm.status||'').toLowerCase();
    const edit=lastEdit(n),age=Number.isFinite(edit)?Math.max(0,now-edit):Infinity;
    const raw=Number.isFinite(time(n.updated_at))?Math.max(0,now-time(n.updated_at)):Infinity;
    const archived=status==='archived'||status==='superseded'||n.top==='10 - Archive'||n.folder==='10 - Archive';
    const partly=!archived&&typeof n.body==='string'&&/\[!note\]\s*Superseded/i.test(n.body);
    const deg=(n.out?n.out.size:0)+(n.back?n.back.size:0);
    const unresolved=unresolvedLinks(n,o.byName);
    const editor=n.updated_by&&n.updated_by!=='repo-sync'?String(n.updated_by):'';
    return {
      archived,weather:archived?1:partly?.5:0,
      stale:age>120*DAY?1:age>30*DAY?.5:0,
      recent:age<DAY?1:age<3*DAY?.5:0,
      // Scaffolding marks a real edit within the hour; a repo sync never raises it.
      scaffold:!!editor&&raw<HOUR,
      tone:TONE[status]||0,status,deg,orphan:deg===0,unresolved,
      owner:editor,ownerColor:editor?OWNER[Math.floor(h01(editor)*OWNER.length)%OWNER.length]:'#B8AB8C',
      task:o.task&&TASK[o.task]?o.task:null,age
    };
  }
  // Packed facade code for aExt.w: pattern + 5*(tone + 4*(weather + 3*(stale + 3*recent))) with thirds quantized.
  const q3=v=>v>=.75?2:v>=.25?1:0;
  function pack(pattern,s){
    const p=clamp(Math.round(pattern)||0,0,4),t=clamp(s?.tone|0,0,3);
    return p+5*(t+4*(q3(s?.weather||0)+3*(q3(s?.stale||0)+3*q3(s?.recent||0))));
  }
  function unpack(v){
    let k=Math.round(v);const pattern=k%5;k=Math.floor(k/5);const tone=k%4;k=Math.floor(k/4);
    const weather=(k%3)/2;k=Math.floor(k/3);const stale=(k%3)/2;const recent=Math.floor(k/3)/2;
    return {pattern,tone,weather,stale,recent};
  }
  // Window light probability for the shader (aState.x). Stale notes dim, fresh ones glow, archives go dark.
  function windowLight(s,base){
    let lit=base;
    if(s.tone===1)lit+=.2;else if(s.tone===2)lit+=.05;else if(s.tone===3)lit-=.12;
    lit=lit*(1-.55*s.stale)+.22*s.recent;
    if(s.weather>=1)lit*=.18;else if(s.weather>0)lit*=.7;
    return clamp(lit,.04,.95);
  }
  // Hover sign text. Fixed vocabulary and numbers only, so it is safe inside the label's innerHTML.
  function ago(ms){if(!Number.isFinite(ms))return '';const h=ms/HOUR;return h<1?'edited < 1 h ago':h<48?`edited ${Math.round(h)} h ago`:`edited ${Math.round(h/24)} d ago`}
  function caption(s){
    if(!s)return '';const bits=[];
    if(s.archived)bits.push('archived');else if(s.weather>0)bits.push('partly superseded');
    if(s.tone===1)bits.push('operating');else if(s.tone===2)bits.push('chartered');else if(s.tone===3)bits.push('pending');
    bits.push(s.orphan?'no links':s.deg===1?'1 link':`${s.deg|0} links`);
    if(s.unresolved)bits.push(`${s.unresolved|0} unresolved`);
    if(s.scaffold)bits.push('edited this hour');else{const a=ago(s.age);if(a)bits.push(a)}
    if(s.task)bits.push(s.task==='open'?'open task':s.task==='claimed'?'task claimed':s.task==='review'?'task in review':'task blocked');
    return bits.join(' · ');
  }

  // ---- dressing layout: plain objects {x,y,z,sx,sy,sz,rx,ry,col,glow,kind,id}; local +z points out of the facade.
  function faceOf(t,door){
    const hw=t.w/2,hd=t.d/2,dx=(door?door.x:t.x)-t.x,dz=(door?door.z:t.z+hd+1)-t.z;
    if(Math.abs(dx)/hw>Math.abs(dz)/hd){const nx=Math.sign(dx)||1,half=hd,along=clamp(dz,-Math.max(0,half-1),Math.max(0,half-1));
      return {nx,nz:0,ox:t.x+nx*hw,oz:t.z+along,half,along,ry:Math.atan2(nx,0)}}
    const nz=Math.sign(dz)||1,half=hw,along=clamp(dx,-Math.max(0,half-1),Math.max(0,half-1));
    return {nx:0,nz,ox:t.x+along,oz:t.z+nz*hd,half,along,ry:Math.atan2(0,nz)};
  }
  // world point from face-local (lx along the face, y up, lz out of the wall)
  function at(f,lx,y,lz){const ax=Math.cos(f.ry),az=-Math.sin(f.ry);return {x:f.ox+ax*lx+f.nx*lz,y,z:f.oz+az*lx+f.nz*lz}}
  function part(list,f,lx,y,lz,sx,sy,sz,col,glow,kind,id,rx=0){const p=at(f,lx,y,lz);list.push({x:p.x,y:p.y,z:p.z,sx,sy,sz,rx,ry:f.ry,col,glow,kind,id})}
  // b: {id,tiers,door,h,style,color}; s: signal(); surf(x,z): roof height at a point (c_campus roofSurfaceAt)
  function doorway(out,b,s){
    const t=b.tiers[0],f=faceOf(t,b.door),W=1.3,H=2.4;
    if(s.archived){
      part(out,f,0,H/2,.1,W+.3,H+.1,.16,'#3a2e24',0,'frame',b.id);
      part(out,f,0,H/2,.2,W,H,.08,'#4a3a2c',0,'door',b.id);
      part(out,f,0,H*.62,.27,W+.2,.16,.05,'#6a5440',0,'board',b.id);part(out,f,0,H*.32,.27,W+.2,.16,.05,'#6a5440',0,'board',b.id);
      return -1; // boarded: no door light
    }
    part(out,f,0,(H+.2)/2,.09,W+.36,H+.2,.18,mixHex('#5d5146',s.ownerColor,.35),0,'frame',b.id);
    const di=out.length;part(out,f,0,H/2,.12,W,H,.1,'#D9A066',.35,'door',b.id);
    return di;
  }
  // Storefront ornament: an awning in the district and owner colours, a lit blade sign beside the door.
  function storefront(out,b,s){
    if(s.archived)return;const f=faceOf(b.tiers[0],b.door),W=1.3,side=f.along>0?-1:1;
    const aw=Math.min(W+1,2*(f.half-Math.abs(f.along)));
    part(out,f,0,2.95,.55,aw,.09,1.05,mixHex(b.color||'#9a3e28',s.ownerColor,.45),0,'awning',b.id,.24);
    part(out,f,side*Math.min(1.55,f.half-Math.abs(f.along)+.4),3.15,.55,.12,.72,.86,b.color||'#D4A843',s.tone===3?.15:.85,'sign',b.id);
  }
  function balconies(out,b,s){
    if(b.h<15||s.archived)return;let n=0;const f0=faceOf(b.tiers[0],b.door);
    for(let k=0;k<b.tiers.length&&n<LIMIT.balconiesPerBuilding;k++){
      const t=b.tiers[k];if(t.y1-t.y0<8)continue;
      for(const dir of [1,-1]){
        const f=faceOf(t,{x:t.x+f0.nx*dir*99,z:t.z+f0.nz*dir*99});if(f.half<1.8)continue;
        const lx=(h01(b.id+':'+k+':'+dir)-.5)*2*Math.max(0,f.half-1.3);
        for(let y=Math.max(t.y0+5.6,6);y<t.y1-2.2&&n<LIMIT.balconiesPerBuilding;y+=6.6){
          part(out,f,lx,y,.45,2.2,.16,.9,'#8d867a',0,'balcony',b.id);
          part(out,f,lx,y+.36,.87,2.2,.55,.05,'#c9ced9',0,'rail',b.id);n++;
        }
      }
    }
  }
  // Street-level tectonics: stone reveals and cornices give the skyline real depth.
  // All parts stay within the existing facade pad. The doorway remains unobstructed.
  function architecture(out,b,s,detail=false){
    const t=b.tiers[0],f=faceOf(t,b.door),stone=s.archived?'#69675e':'#b0ab97';
    const trim=mixHex('#687474',b.color||'#D4A843',.14);
    if(!detail){
      // Full-width entablature with two recessed jambs reads from the street and aerial view.
      const span=2*f.half,center=-f.along*(Math.abs(f.nx)>0?-f.nx:f.nz);
      part(out,f,center,Math.min(t.y1-.18,3.5),.14,span,.24,.28,stone,0,'cornice',b.id);
      for(const side of [-1,1])part(out,f,center+side*(f.half-.18),Math.min(t.y1,3.5)/2,.12,.26,Math.min(t.y1,3.5),.24,stone,0,'pier',b.id);
      return;
    }
    for(let k=0;k<b.tiers.length;k++){
      const q=b.tiers[k],height=q.y1-q.y0;
      if(height<2||q.w<1||q.d<1)continue;
      const ff=faceOf(q,{x:q.x+f.nx*100,z:q.z+f.nz*100});
      // Deep overhangs articulate setbacks without touching road cells.
      part(out,ff,0,q.y1-.12,.1,ff.half*2+.2,.2,.35,trim,0,'cornice',b.id);
      const n=b.style===3?4:b.style===4?3:2;
      for(let i=0;i<n;i++){
        const lx=(i/(n-1)-.5)*(ff.half*2-.55);
        part(out,ff,lx,q.y0+height*.55,.1,b.style===3?.23:.1,height*.72,.18,b.style===3?stone:trim,0,'mullion',b.id);
      }
      if(b.style===1||b.style===2){
        for(let j=1;j<=2;j++)part(out,ff,0,q.y0+height*j/3,.2,ff.half*2,.1,.42,trim,0,'sunshade',b.id);
      }
    }
    // Warm wall sconces, sheltered below the canopy; no extra point lights.
    if(!s.archived)for(const side of [-1,1]){
      part(out,f,side*.92,2,.2,.16,.38,.16,'#4b5350',0,'sconce',b.id);
      part(out,f,side*.92,2,.3,.1,.23,.05,'#f6d4a0',.55,'sconce-glass',b.id);
    }
  }
  // Occupied setback terraces: contained planting and timber seats, deterministically varied.
  // Use lower flat setback surfaces only; never float furniture on a pitched roof.
  function terraces(out,b,s){
    if(s.archived||b.tiers.length<2)return;
    for(let k=0;k<b.tiers.length-1;k++){
      const t=b.tiers[k],upper=b.tiers[k+1],gap=t.z+t.d/2-(upper.z+upper.d/2);
      if(gap<1.25||t.w<4)continue;
      const z=t.z+t.d/2-.55,y=t.y1,w=Math.min(2.1,t.w*.3),x=t.x-t.w*.25;
      const add=(xx,yy,zz,sx,sy,sz,col,kind)=>out.push({x:xx,y:yy,z:zz,sx,sy,sz,rx:0,ry:0,col,glow:0,kind,id:b.id});
      add(x,y+.2,z,w,.4,.72,'#8c8877','planter');
      add(x,y+.42,z,w-.14,.06,.58,'#493f2e','soil');
      // Staggered low planting catches light instead of a single flat green slab.
      for(let j=0;j<3;j++)add(x+(j-1)*w*.27,y+.55+h01(b.id+':plant:'+j)*.14,z,.4,.25,.46,j===1?'#81946a':'#506b50','plant');
      add(t.x+t.w*.23,y+.4,z,Math.min(1.6,t.w*.28),.14,.55,'#998365','seat');
      for(const side of [-1,1])add(t.x+t.w*.23+side*.45,y+.18,z,.1,.36,.4,'#4d5958','seat-leg');
      break;
    }
  }
  function roofStubs(out,b,s,surf){
    const t=b.tiers[b.tiers.length-1],y=(x,z)=>surf?surf(x,z):t.y1;
    if(s.orphan){const x=t.x+t.w*.3,z=t.z-t.d*.3,y0=y(x,z);
      out.push({x,y:y0+.6,z,sx:.14,sy:1.2,sz:.14,rx:0,ry:0,col:'#6b6f78',glow:0,kind:'stub',id:b.id});
      out.push({x:x+.22,y:y0+1.14,z,sx:.44,sy:.08,sz:.08,rx:0,ry:.5,col:'#6b6f78',glow:0,kind:'stub',id:b.id});}
    for(let i=0;i<Math.min(3,s.unresolved);i++){const x=t.x+t.w*(.3-i*.14),z=t.z+t.d*.3,y0=y(x,z),hh=.8+i*.25;
      out.push({x,y:y0+hh/2,z,sx:.1,sy:hh,sz:.1,rx:0,ry:0,col:'#4b4f58',glow:0,kind:'frayed',id:b.id});
      out.push({x,y:y0+hh+.1,z,sx:.24,sy:.2,sz:.24,rx:0,ry:.7,col:'#E8A33D',glow:1.6,kind:'frayed',id:b.id});}
    if(s.deg>=Math.max(12,s.mastAt||0)){const x=t.x-t.w*.3,z=t.z+t.d*.3,y0=y(x,z),mh=Math.min(7,1.5+Math.sqrt(s.deg)*.6);
      out.push({x,y:y0+mh/2,z,sx:.16,sy:mh,sz:.16,rx:0,ry:0,col:'#9aa2ae',glow:0,kind:'linkmast',id:b.id});
      out.push({x,y:y0+mh+.15,z,sx:.3,sy:.3,sz:.3,rx:0,ry:.78,col:'#9CD3FF',glow:2.2,kind:'linkmast',id:b.id});}
  }
  function scaffold(out,b){
    const e=.5;
    for(const t of b.tiers){
      const x0=t.x-t.w/2-e,x1=t.x+t.w/2+e,z0=t.z-t.d/2-e,z1=t.z+t.d/2+e,top=t.y1+1,hgt=top-t.y0;
      [[x0,z0],[x1,z0],[x0,z1],[x1,z1]].forEach(([x,z])=>out.push({x,y:t.y0+hgt/2,z,sx:.12,sy:hgt,sz:.12,rx:0,ry:0,col:'#9aa2ae',glow:0,kind:'scaffold',id:b.id}));
      let lv=0;for(let y=t.y0+3.3;y<top&&lv<8;y+=3.3,lv++){
        out.push({x:t.x,y,z:z0,sx:t.w+2*e,sy:.1,sz:.1,rx:0,ry:0,col:'#9aa2ae',glow:0,kind:'scaffold',id:b.id});
        out.push({x:t.x,y,z:z1,sx:t.w+2*e,sy:.1,sz:.1,rx:0,ry:0,col:'#9aa2ae',glow:0,kind:'scaffold',id:b.id});
        out.push({x:x0,y,z:t.z,sx:.1,sy:.1,sz:t.d+2*e,rx:0,ry:0,col:'#9aa2ae',glow:0,kind:'scaffold',id:b.id});
        out.push({x:x1,y,z:t.z,sx:.1,sy:.1,sz:t.d+2*e,rx:0,ry:0,col:'#9aa2ae',glow:0,kind:'scaffold',id:b.id});
        if(lv%2===0)out.push({x:t.x,y:y+.08,z:z1-.18,sx:t.w+2*e,sy:.06,sz:.5,rx:0,ry:0,col:'#b08a55',glow:0,kind:'plank',id:b.id});
      }
    }
    const t=b.tiers[b.tiers.length-1];
    out.push({x:t.x+t.w/2+.5,y:t.y1+1.25,z:t.z+t.d/2+.5,sx:.3,sy:.3,sz:.3,rx:0,ry:.78,col:'#F2B85B',glow:2.4,kind:'beacon',id:b.id});
  }
  // Ordered by what the second brain needs most: live edits and link health, then doors, then ornament.
  function layout(list,opt={}){
    const cap=opt.cap??LIMIT.high,out=[],doors=new Map();
    const take=(fn)=>{for(const it of list){if(out.length>=cap)return;fn(it)}};
    let sc=0;
    // link masts mark the best-connected notes only: the top 6 percent by degree, never fewer than 12 links
    const degs=list.map(it=>it.s.deg|0).sort((a,b)=>a-b),mastAt=degs.length?degs[Math.min(degs.length-1,Math.floor(degs.length*.94))]:12;
    list.forEach(it=>{it.s.mastAt=Math.max(12,mastAt)});
    take(it=>{if(it.s.scaffold&&sc<LIMIT.scaffoldBuildings){const before=out.length;scaffold(out,it.b);if(out.length>cap)out.length=before;else sc++}});
    take(it=>{const before=out.length;const di=doorway(out,it.b,it.s);if(out.length>cap)out.length=before;else if(di>=0)doors.set(it.b.id,di)});
    take(it=>{const before=out.length;roofStubs(out,it.b,it.s,it.surf);if(out.length>cap)out.length=before});
    take(it=>{const before=out.length;storefront(out,it.b,it.s);if(out.length>cap)out.length=before});
    take(it=>{const before=out.length;architecture(out,it.b,it.s);if(out.length>cap)out.length=before});
    take(it=>{const before=out.length;architecture(out,it.b,it.s,true);if(out.length>cap)out.length=before});
    take(it=>{const before=out.length;terraces(out,it.b,it.s);if(out.length>cap)out.length=before});
    take(it=>{const before=out.length;balconies(out,it.b,it.s);if(out.length>cap)out.length=before});
    return {parts:out,doors,scaffolds:sc};
  }
  function mixHex(a,b,t){
    const p=h=>{h=String(h).replace('#','');return [parseInt(h.slice(0,2),16),parseInt(h.slice(2,4),16),parseInt(h.slice(4,6),16)]};
    const x=p(a),y=p(b),m=x.map((v,i)=>Math.round(v+(y[i]-v)*t));
    return '#'+m.map(v=>clamp(v,0,255).toString(16).padStart(2,'0')).join('');
  }
  // Door light states: 0 lobby glow, 1 task (colour by status), 2 open note, 3 walker at the door.
  function doorLight(state,task){
    if(state===2)return {col:'#FFD08A',glow:2.8};
    if(state===3)return {col:'#FFC27A',glow:1.7};
    if(state===1&&TASK[task])return {col:TASK[task],glow:1.5};
    return {col:'#D9A066',glow:.35};
  }

  // Curved joinery is a separate, bounded instancing layer: bevelled stone surrounds,
  // deeply inset arched glass and individually overlapping barrel tiles. No billboards.
  const CRAFT_LIMIT=Object.freeze({high:7000,medium:4200,low:2400,tilesHigh:18000,tilesLow:6000});
  function archGeometry(glass=false){
    const shape=new THREE.Shape();
    shape.moveTo(-.5,0);shape.lineTo(-.5,.7);shape.absarc(0,.7,.5,Math.PI,0,true);shape.lineTo(.5,0);shape.closePath();
    if(!glass){const hole=new THREE.Path();hole.moveTo(-.35,.11);hole.lineTo(.35,.11);hole.lineTo(.35,.7);hole.absarc(0,.7,.35,0,Math.PI,false);hole.lineTo(-.35,.11);shape.holes.push(hole)}
    const geometry=new THREE.ExtrudeGeometry(shape,{depth:glass?.045:.2,steps:1,curveSegments:12,bevelEnabled:!glass,bevelThickness:.025,bevelSize:.025,bevelSegments:2});
    geometry.computeVertexNormals();return geometry;
  }
  function tileGeometry(){
    // Crown across x, downhill lap along z. The rounded lower lip casts an actual shadow.
    const p=[],uv=[],ix=[],nx=6,nz=3;
    for(let z=0;z<=nz;z++)for(let x=0;x<=nx;x++){
      const u=x/nx,v=z/nz;
      p.push(u-.5,.13*Math.sin(u*Math.PI)+.035*(1-v)+.025*Math.sin(v*Math.PI),v-.5);uv.push(u,v);
    }
    for(let z=0;z<nz;z++)for(let x=0;x<nx;x++){const a=z*(nx+1)+x;ix.push(a,a+nx+1,a+1,a+1,a+nx+1,a+nx+2)}
    const g=new THREE.BufferGeometry();g.setAttribute('position',new THREE.Float32BufferAttribute(p,3));g.setAttribute('uv',new THREE.Float32BufferAttribute(uv,2));g.setIndex(ix);g.computeVertexNormals();return g;
  }
  function craftLayout(items,opt={}){
    const high=(opt.cap??LIMIT.high)>LIMIT.medium,low=(opt.cap??LIMIT.high)<=LIMIT.low;
    const cap=opt.craftCap??(high?CRAFT_LIMIT.high:low?CRAFT_LIMIT.low:CRAFT_LIMIT.medium),tileCap=opt.tileCap??(high?CRAFT_LIMIT.tilesHigh:CRAFT_LIMIT.tilesLow);
    const frames=[],tiles=[];
    const stone=['#b4aa91','#aaa394','#c2b59c','#969b91','#b5a186'];
    const add=(b,f,x,y,width,height,door=false)=>{if(frames.length>=cap)return;const p=at(f,x,y,.18);frames.push({...p,ry:f.ry,sx:width,sy:height/1.2,sz:1,id:b.id,door,col:stone[Math.floor(h01(b.id+':stone')*stone.length)]})};
    // First pass gives every active entrance a dimensional arch before spending on windows.
    for(const {b,s} of items){if(s.archived||b.tiers[0].y1<3.1)continue;add(b,faceOf(b.tiers[0],b.door),0,0,1.7,2.9,true)}
    for(const {b,s} of items){
      if(s.archived)continue;
      const t=b.tiers[0],f=faceOf(t,b.door),center=-f.along*(Math.abs(f.nx)>0?-f.nx:f.nz);
      const sideCenters=[center-f.half*.56,center+f.half*.56];
      for(const x of sideCenters){
        if(Math.abs(x)<1.7||f.half<2.1)continue;
        for(let y=1;y<Math.min(t.y1-2.4,11);y+=3.25)add(b,f,x,y,Math.min(1.35,f.half*.32),2.05);
      }
      // These supports are the actual gables made by the campus, excluding authored crowns.
      for(const roof of b.roofSupports||[]){
        if(roof.kind!=='gable'||tiles.length>=tileCap)continue;
        const nx=Math.max(2,Math.ceil(roof.sx/.6)),nr=Math.max(2,Math.ceil(roof.sz/.95));
        const dx=roof.sx/nx,run=roof.sz/2,nz=Math.ceil(nr/2),dz=run/nz,slant=Math.atan2(roof.sy,run);
        const c=Math.cos(roof.ry||0),sn=Math.sin(roof.ry||0),palette=['#735346','#82614e','#956c50','#777567','#5f706e'];
        const base=palette[Math.floor(h01(b.id+':clay')*palette.length)];
        // Only admit a complete tiled roof. A hard cap never leaves a half-painted gable.
        if(tiles.length+nx*nz*2>tileCap)continue;
        for(const side of [-1,1])for(let row=0;row<nz;row++)for(let col=0;col<nx;col++){
          const x=-roof.sx/2+(col+.5)*dx,z=side*(row+.5)*dz;
          tiles.push({x:roof.x+c*x+sn*z,y:roof.y+roof.sy*(1-Math.abs(z)/run)+.025,z:roof.z-sn*x+c*z,rx:side*slant,ry:roof.ry||0,sx:dx*.98,sy:.8,sz:dz/Math.cos(slant)*1.15,col:mixHex(base,'#c2b294',h01(b.id+':'+row+':'+col)*.16),id:b.id});
        }
      }
    }
    return {frames,tiles,cap,tileCap};
  }
  function buildCraft(parent,items,opt){
    const layout=craftLayout(items,opt),o=new THREE.Object3D();o.rotation.order='YXZ';
    const batch=(name,geo,mat,parts,glass=false)=>{
      if(!parts.length){geo.dispose();mat.dispose();return}
      const m=new THREE.InstancedMesh(geo,mat,parts.length);m.name=name;m.frustumCulled=false;
      const ids=[];for(let i=0;i<parts.length;i++){
        const p=parts[i],offset=glass?.035:0;
        o.position.set(p.x+Math.sin(p.ry)*offset,p.y,p.z+Math.cos(p.ry)*offset);o.rotation.set(p.rx||0,p.ry||0,0);o.scale.set(p.sx*(glass?.69:1),p.sy*(glass?.88:1),p.sz);o.updateMatrix();m.setMatrixAt(i,o.matrix);
        m.setColorAt(i,new THREE.Color(glass?(p.door?'#9c865f':'#4e696b'):p.col).convertSRGBToLinear());ids.push(p.id);
      }
      m.instanceMatrix.needsUpdate=true;m.instanceColor.needsUpdate=true;m.castShadow=false;m.receiveShadow=true;m.userData.ids=ids;m.userData.craft=true;parent.add(m);
    };
    batch('Carved arch surrounds',archGeometry(),new THREE.MeshStandardMaterial({color:0xffffff,map:opt.stoneMap||null,roughness:.89,metalness:.02}),layout.frames);
    // Entrance apertures retain the existing signal-driven door light; glass is for upper windows only.
    batch('Recessed arch glazing',archGeometry(true),new THREE.MeshStandardMaterial({color:0xffffff,roughness:.27,metalness:.28}),layout.frames.filter(p=>!p.door),true);
    // Barrel tiles are fired clay, never multiplied by the flat-roof gravel map.
    const clay=new THREE.MeshStandardMaterial({color:0xffffff,roughness:.88,metalness:0,side:THREE.DoubleSide});
    clay.onBeforeCompile=sh=>{
      sh.vertexShader=sh.vertexShader.replace('#include <common>','#include <common>\nvarying vec3 vClayP;').replace('#include <begin_vertex>','#include <begin_vertex>\nvClayP=position;');
      sh.fragmentShader=sh.fragmentShader.replace('#include <common>','#include <common>\nvarying vec3 vClayP;').replace('#include <color_fragment>','#include <color_fragment>\nfloat clayGrain=fract(sin(dot(floor(vClayP*120.0),vec3(12.9898,78.233,37.719)))*43758.5453);diffuseColor.rgb*=0.96+clayGrain*0.08;');
    };
    batch('Overlapping barrel roof tiles',tileGeometry(),clay,layout.tiles);
    parent.userData.craft={frames:layout.frames.length,tiles:layout.tiles.length,drawCalls:parent.children.length,cap:layout.cap,tileCap:layout.tileCap};
  }

  // ---- three.js side
  let MAT=null;
  function material(SH){
    if(MAT)return MAT;
    MAT=new THREE.MeshStandardMaterial({color:0xffffff,roughness:.72,metalness:.18});
    MAT.onBeforeCompile=sh=>{
      sh.uniforms.uLamp=SH&&SH.uLamp?SH.uLamp:{value:0};
      sh.vertexShader=sh.vertexShader.replace('#include <common>','#include <common>\nattribute float aGlow;attribute float aFinish;varying float vGlow;varying float vFinish;')
        .replace('#include <begin_vertex>','#include <begin_vertex>\nvGlow=aGlow;vFinish=aFinish;');
      sh.fragmentShader=sh.fragmentShader.replace('#include <common>','#include <common>\nuniform float uLamp;varying float vGlow;varying float vFinish;')
        .replace('#include <roughnessmap_fragment>','#include <roughnessmap_fragment>\nroughnessFactor=vFinish;')
        .replace('#include <metalnessmap_fragment>','#include <metalnessmap_fragment>\nmetalnessFactor=vFinish<0.5?0.48:0.06;')
        .replace('#include <emissivemap_fragment>','#include <emissivemap_fragment>\ntotalEmissiveRadiance+=diffuseColor.rgb*vGlow*(0.22+uLamp*1.9);');
    };
    return MAT;
  }
  function build(items,opt={}){
    const L=layout(items,opt),n=Math.max(1,L.parts.length);
    const geo=new THREE.BoxGeometry(1,1,1),glow=new Float32Array(n),finish=new Float32Array(n);
    const mesh=new THREE.InstancedMesh(geo,opt.material||material(opt.SH),n);mesh.count=L.parts.length;
    const o=new THREE.Object3D(),c=new THREE.Color(),cache=new Map();
    o.rotation.order='YXZ';
    L.parts.forEach((p,i)=>{
      o.position.set(p.x,p.y,p.z);o.rotation.set(p.rx||0,p.ry||0,0);o.scale.set(p.sx,p.sy,p.sz);o.updateMatrix();mesh.setMatrixAt(i,o.matrix);
      if(!cache.has(p.col))cache.set(p.col,new THREE.Color(p.col).convertSRGBToLinear());mesh.setColorAt(i,cache.get(p.col));glow[i]=p.glow||0;finish[i]=['rail','mullion','sunshade','sconce','seat-leg','scaffold'].includes(p.kind)?.38:['door','sconce-glass'].includes(p.kind)?.25:.86;
    });
    if(!L.parts.length){mesh.setColorAt(0,c.set(0xffffff))}
    geo.setAttribute('aFinish',new THREE.InstancedBufferAttribute(finish,1));
    geo.setAttribute('aGlow',new THREE.InstancedBufferAttribute(glow,1));
    mesh.instanceMatrix.needsUpdate=true;if(mesh.instanceColor)mesh.instanceColor.needsUpdate=true;
    mesh.castShadow=!!opt.shadow;mesh.receiveShadow=true;mesh.frustumCulled=false;mesh.name='facade-dressing';
    mesh.userData={doors:L.doors,scaffolds:L.scaffolds,kinds:L.parts.map(p=>p.kind),ids:L.parts.map(p=>p.id),doorState:new Map()};
    buildCraft(mesh,items,opt);
    return mesh;
  }
  // Light one building's door. Returns true when something changed (caller marks the frame dirty).
  function setDoor(mesh,id,state,task){
    if(!mesh||!mesh.userData.doors)return false;const i=mesh.userData.doors.get(id);if(i==null)return false;
    const key=state+':'+(task||'');if(mesh.userData.doorState.get(id)===key)return false;mesh.userData.doorState.set(id,key);
    const d=doorLight(state,task),g=mesh.geometry.attributes.aGlow;g.array[i]=d.glow;
    mesh.setColorAt(i,new THREE.Color(d.col).convertSRGBToLinear());
    // partial uploads: merge with any range still waiting for the next frame
    [g,mesh.instanceColor].forEach(a=>{const w=a.itemSize,r=a.updateRange;
      if(r.count===-1){r.offset=i*w;r.count=w}else{const lo=Math.min(r.offset,i*w),hi=Math.max(r.offset+r.count,i*w+w);r.offset=lo;r.count=hi-lo}
      a.needsUpdate=true});
    return true;
  }
  function dispose(mesh){if(!mesh)return;mesh.children.slice().forEach(child=>{if(child.userData.craft){child.geometry.dispose();child.material.dispose();mesh.remove(child)}});mesh.geometry.dispose();if(mesh.parent)mesh.parent.remove(mesh)}
  return {contract,PATTERNS,LIMIT,CRAFT_LIMIT,craftLayout,archGeometry,tileGeometry,TASK,signal,pack,unpack,windowLight,caption,lastEdit,unresolvedLinks,faceOf,layout,doorLight,material,build,setDoor,dispose,mixHex};
})();
