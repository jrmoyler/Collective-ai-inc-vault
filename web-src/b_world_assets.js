// Interpretive knowledge landmarks, not blueprints for the six physical campus districts.
// Design contract: retain the existing stone/steel city and district legend; render actual
// 3D parts at note-roof scale, preserve street navigation, and open real district content.
// Evidence: b_districts.js purpose/kit + current loaded notes; visual style reference:
// docs/district-upgrade-evidence/desktop-world.jpg. No exact-image reconstruction claim.
const DistrictAssets=(()=>{
  const contract=Object.freeze({kind:'interpretive',reference:'docs/district-upgrade-evidence/desktop-world.jpg',authority:'AGENTS.md',maxDrawCalls:3,streetObstacles:0});
  function recipe(theme){
    const parts=[];
    const add=(name,shape,size,p,material='metal',r=[0,0,0])=>parts.push({name,shape,size,p,material,r});
    const box=(n,s,p,m='metal',r)=>add(n,'box',s,p,m,r);
    const cylinder=(n,s,p,m='metal',r)=>add(n,'cylinder',s,p,m,r);
    const ring=(n,rad,y,m='accent',r=[Math.PI/2,0,0],p=[0,y,0])=>add(n,'torus',[rad,.08],p,m,r);
    box('foundation',[8,.3,6],[0,.15,0],'stone');
    switch(theme){
      case 'navigation':
        cylinder('atlas-table',[2.6,2.8,.3],[0,1.35,0],'stone');cylinder('atlas-pedestal',[.65,.9,1.1],[0,.7,0]);
        for(let i=0;i<8;i++){const a=i*Math.PI/4,x=Math.cos(a)*2,z=Math.sin(a)*2;box('map-node-'+i,[.48,.2,.48],[x,1.6,z],'accent');box('source-spoke-'+i,[2,.055,.08],[x*.5,1.6,z*.5],'metal',[0,-a,0])}ring('hub-orbit',2.35,1.62);break;
      case 'council':
        cylinder('council-dais',[1.4,1.6,.45],[0,.5,0],'stone');
        for(let i=0;i<7;i++){const a=Math.PI*(.15+i*.7/6),x=Math.cos(a)*2.8,z=Math.sin(a)*2;box('charter-seat-'+i,[.7,.25,.65],[x,.7,z],'stone');box('seat-back-'+i,[.7,1,.16],[x,1.1,z+.3]);box('charter-tab-'+i,[.45,.09,.2],[x,1.63,z+.3],'accent')}
        ring('council-light',1.2,.77);break;
      case 'foundry':
        for(let x=-2.6;x<=2.6;x+=2.6){box('routing-rack-'+x,[1.3,4,1.2],[x,2.3,0]);for(let i=0;i<7;i++){box('compute-tray-'+x+'-'+i,[1.05,.29,1.28],[x,.7+i*.48,0],'stone');box('routing-signal-'+x+'-'+i,[.78,.035,.04],[x,.83+i*.48,.68],'accent')}}box('bus-bridge',[6,.2,.32],[0,4.45,0],'accent');break;
      case 'workshop':
        box('fabrication-bed',[5,.65,3],[0,.65,0],'stone');for(const x of [-2.8,2.8])box('gantry-leg-'+x,[.3,3.6,.45],[x,2.1,0]);box('gantry-beam',[6,.3,.45],[0,3.85,0]);box('tool-carriage',[1,.7,.85],[.8,3.45,0],'accent');cylinder('tool-spindle',[.16,.2,1.1],[.8,2.6,0]);for(let i=0;i<6;i++)box('workpiece-'+i,[.4,.3,.8],[-1.9+i*.75,1.13,0],'accent');break;
      case 'commons':
        cylinder('meeting-table',[1.3,1.4,.18],[0,1.1,0],'stone');cylinder('table-support',[.18,.35,.7],[0,.65,0]);for(let i=0;i<8;i++){const a=i*Math.PI/4,x=Math.cos(a)*2.4,z=Math.sin(a)*2.4;box('team-seat-'+i,[.8,.25,.8],[x,.62,z],'stone');box('seat-stand-'+i,[.18,.4,.18],[x,.36,z]);ring('seat-badge-'+i,.24,.8,'accent',[Math.PI/2,0,0],[x,.8,z])}break;
      case 'control':
        for(let i=0;i<3;i++){box('dispatch-console-'+i,[1.8,1.2,1.3],[-2.1+i*2.1,.9,0]);box('dispatch-screen-'+i,[1.65,.95,.09],[-2.1+i*2.1,2.05,-.5],'accent',[-.2,0,0]);for(let j=0;j<4;j++)box('control-key-'+i+'-'+j,[.15,.06,.15],[-2.6+i*2.1+j*.3,1.53,.2],'stone')}break;
      case 'chamber':
        box('ledger-vault',[4.7,3.8,2.3],[0,2.2,0],'stone');cylinder('vault-door',[1.5,1.5,.2],[0,2.2,1.25],'metal',[Math.PI/2,0,0]);ring('audit-wheel',.8,2.2,'accent',[0,0,0],[0,2.2,1.43]);for(let i=0;i<8;i++){const a=i*Math.PI/4;box('lock-spoke-'+i,[.85,.08,.08],[Math.cos(a)*.4,2.2+Math.sin(a)*.4,1.43],'metal',[0,0,a])}box('ledger-seal',[.3,.3,.12],[0,2.2,1.55],'accent');break;
      case 'atelier':
        for(let i=0;i<6;i++){const x=-2.7+i*1.08;box('material-fin-'+i,[.35,2.4+i*.22,1.3],[x,1.65+i*.11,0],i%2?'stone':'metal',[0,(i-2.5)*.12,0]);box('brand-inlay-'+i,[.08,2+i*.22,1.35],[x+.2,1.65+i*.11,0],'accent',[0,(i-2.5)*.12,0])}box('voice-desk',[4,.25,1.1],[0,.8,1.9],'stone');break;
      case 'observatory':
        cylinder('observatory-plinth',[2.25,2.4,.4],[0,.5,0],'stone');for(const x of [-.9,.9])box('telescope-yoke-'+x,[.25,2.4,.3],[x,1.8,0]);cylinder('telescope-barrel',[.65,.85,3.9],[0,3,0],'metal',[.95,0,0]);cylinder('objective-lens',[.59,.59,.07],[0,4.15,1.61],'accent',[.95,0,0]);box('research-camera',[.7,.5,.6],[0,1.9,-1.7],'stone');for(const t of [-1.2,0,1.2])ring('focus-collar-'+t,.78,3+t*Math.cos(.95),'metal',[.95-Math.PI/2,0,0],[0,3+t*Math.cos(.95),t*Math.sin(.95)]);ring('observation-orbit',2.15,.73);break;
      case 'yard':
        box('crane-tower',[.5,5,.5],[-2.5,2.8,0]);box('crane-boom',[6.4,.4,.4],[.1,5.2,0]);box('counterweight',[1.1,.7,1],[-2.7,4.7,0],'stone');box('hoist-cable',[.06,2.5,.06],[2,3.8,0],'accent');ring('delivery-hook',.2,2.5,'metal',[0,0,0],[2,2.5,0]);for(let i=0;i<4;i++)box('project-package-'+i,[1.3,.8,1.1],[-1.1+i*.95,.7,1.5],i%2?'stone':'metal');break;
      case 'stacks':
        for(let x=-3;x<=1;x+=2){box('archive-side-'+x,[.18,3.7,2.8],[x,2.15,0]);for(let y=0;y<4;y++){box('archive-shelf-'+x+'-'+y,[1.9,.12,2.8],[x+.85,.6+y*.86,0],'stone');for(let z=0;z<3;z++)box('historical-record-'+x+'-'+y+'-'+z,[.4,.62,.7],[x+.35+z*.5,.97+y*.86,.2],z===0?'accent':'metal')}}break;
      case 'lab':
        cylinder('test-turntable',[2.2,2.4,.25],[0,.48,0],'stone');cylinder('robot-base',[.6,.75,.6],[0,.9,0]);box('robot-upright',[.55,1.9,.6],[0,2.08,0],'accent',[0,0,-.25]);cylinder('shoulder-joint',[.45,.45,.75],[.3,2.95,0],'metal',[Math.PI/2,0,0]);box('robot-forearm',[1.8,.45,.5],[1.13,3.04,0],'accent',[0,0,.15]);cylinder('wrist-joint',[.27,.27,.65],[2.04,3.17,0],'metal',[Math.PI/2,0,0]);for(const z of [-.3,.3])box('test-gripper-'+z,[.6,.13,.12],[2.36,2.92,z]);ring('calibration-loop',2,.64);break;
      case 'log':
        box('calendar-stand',[.35,3.2,.35],[0,1.95,0]);cylinder('clock-face',[1.65,1.65,.2],[0,3.45,0],'stone',[Math.PI/2,0,0]);for(let i=0;i<12;i++){const a=i*Math.PI/6;box('hour-index-'+i,[.08,.28,.08],[Math.sin(a)*1.4,3.45+Math.cos(a)*1.4,.16],'accent',[0,0,-a])}box('clock-hand',[.08,1.05,.08],[0,3.97,.19],'metal');box('minute-hand',[.8,.07,.08],[.37,3.45,.2],'metal');for(let i=0;i<5;i++)box('dated-entry-'+i,[1.1,.18,1.5],[-2.4+i*1.2,.45,1.5],i%2?'stone':'accent');break;
      case 'integrations':
        for(const x of [-2.4,2.4]){box('connector-tower-'+x,[1.1,3.6,1.4],[x,2.1,0]);for(let i=0;i<4;i++){cylinder('connection-port-'+x+'-'+i,[.24,.24,.16],[x,.95+i*.76,.8],'accent',[Math.PI/2,0,0]);box('port-latch-'+x+'-'+i,[.5,.1,.2],[x,1.28+i*.76,.8],'stone')}}
        ring('integration-bus',1.9,2.2,'metal',[0,0,0],[0,2.2,0]);box('mcp-gateway',[1.6,.65,1.8],[0,.68,0],'stone');for(let i=0;i<5;i++)box('gateway-contact-'+i,[.12,.08,.4],[-.5+i*.25,1.03,0],'accent');break;
      case 'academy':
        for(let i=0;i<3;i++){box('learning-terrace-'+i,[6.2-i*.5,.45,1.2],[0,.53+i*.4,1.9-i*1.25],'stone');for(let j=0;j<4;j++){box('study-desk-'+i+'-'+j,[.95,.12,.45],[-2.2+j*1.45,1.03+i*.4,1.9-i*1.25]);box('curriculum-tab-'+i+'-'+j,[.55,.025,.3],[-2.2+j*1.45,1.11+i*.4,1.9-i*1.25],'accent')}}box('lesson-board',[5.8,2.6,.18],[0,3.1,-2.1]);for(let i=0;i<4;i++)box('lesson-rule-'+i,[3.8-i*.5,.05,.02],[-.4,3.9-i*.5,-1.98],'accent');break;
      case 'governance':
        cylinder('decision-dais',[2.2,2.4,.4],[0,.53,0],'stone');box('decision-spine',[.3,3.7,.3],[0,2.6,0]);box('balanced-crossbar',[5,.2,.3],[0,4.15,0]);for(const x of [-2,2]){box('review-suspension-'+x,[.05,1.25,.05],[x,3.53,0],'accent');cylinder('review-pan-'+x,[.75,.25,.18],[x,2.86,0],'metal');box('decision-record-'+x,[.8,.16,.55],[x,3.02,0],'stone')}ring('guardrail',2.05,.8);break;
      case 'delivery':
        for(const x of [-3.2,3.2])box('delivery-hall-pier-'+x,[.4,3.5,.5],[x,2.05,0]);box('delivery-canopy',[7, .35,3.5],[0,3.94,0]);for(let i=0;i<3;i++){box('handoff-crate-'+i,[1.4,1.1,1.4],[-2+i*2,1,0],'stone');box('verified-seal-'+i,[.6,.08,1.44],[-2+i*2,1.34,0],'accent');box('delivery-ramp-'+i,[1.5,.13,1.8],[-2+i*2,.44,1.9],'metal',[-.12,0,0])}box('client-handoff-desk',[4.5,.3,.9],[0,2.3,-1.5],'accent');break;
      case 'infrastructure':
        for(let i=0;i<3;i++){cylinder('cooling-vessel-'+i,[.8,.8,3.5],[-2+i*2,2.1,0],'stone');for(let j=0;j<4;j++)ring('cooling-band-'+i+'-'+j,.84,.9+j*.8,'metal',[Math.PI/2,0,0],[-2+i*2,.9+j*.8,0]);cylinder('service-pipe-'+i,[.16,.16,3],[-2+i*2,1.3,1.5],'metal',[Math.PI/2,0,0]);box('facility-status-'+i,[.24,1.4,.12],[-2+i*2,2.2,.88],'accent')}box('utility-bus',[6,.2,.3],[0,3.5,-1.4],'accent');break;
      case 'synergy':
        // Three connected work nodes represent the existing Synergy Mandate, not a new division.
        for(let i=0;i<3;i++){const a=i*Math.PI*2/3,x=Math.cos(a)*2.2,z=Math.sin(a)*2.2;cylinder('division-node-'+i,[.9,1.1,1.3],[x,1, z],'stone');ring('division-link-'+i,.83,1.72,'accent',[Math.PI/2,0,0],[x,1.72,z]);const b=(i+1)*Math.PI*2/3,xx=Math.cos(b)*2.2,zz=Math.sin(b)*2.2,len=Math.hypot(xx-x,zz-z);box('shared-engagement-'+i,[len,.12,.16],[(x+xx)/2,1.3,(z+zz)/2],'metal',[0,-Math.atan2(zz-z,xx-x),0])}cylinder('engagement-core',[.35,.45,2.2],[0,1.4,0],'accent');ring('mandate-crown',.58,2.5);break;
      default: return [];
    }
    // The working exhibit sits inside a district-specific piece of architecture.
    // These are navigable knowledge landmarks, not additional company facilities.
    parts.forEach(p=>p.p[1]+=.48);
    box('terrace-shadow-course',[9.2,.18,7.2],[0,.09,0],'metal');
    box('terrace-stone-course',[9,.3,7],[0,.33,0],'stone');
    for(let i=0;i<3;i++)box('arrival-stair-'+i,[3.6,.12, .35],[0,.06+i*.12,4.05-i*.35],'stone');
    for(const x of [-4.25,4.25])box('recessed-edge-light-'+x,[.035,.035,6.4],[x,.497,0],'accent');
    // Each setting has its own skyline. None places a collider in a street.
    const portal=(name,x,z,h,w,angle=0)=>{
      for(const side of [-1,1])box(name+'-jamb-'+side,[.17,h,.22],[x+Math.cos(angle)*side*w/2,.48+h/2,z-Math.sin(angle)*side*w/2],'stone',[0,angle,0]);
      box(name+'-lintel',[w+.17,.19,.24],[x,.48+h,z],'metal',[0,angle,0]);
      box(name+'-light',[w-.2,.035,.04],[x,.36+h,z+.13],'accent',[0,angle,0]);
    };
    const fins=(name,count,h,z,spread=7)=>{for(let i=0;i<count;i++){const x=-spread/2+i*spread/(count-1);box(name+'-'+i,[.14,h,.45],[x,.48+h/2,z],'stone');box(name+'-cap-'+i,[.17,.06,.49],[x,.51+h,z],'metal')}};
    const arc=(name,r,y,start,end,count)=>{for(let i=0;i<count;i++){const a=start+(end-start)*i/(count-1),x=Math.cos(a)*r,z=Math.sin(a)*r;box(name+'-rib-'+i,[.13,y,.35],[x,.48+y/2,z],'stone',[0,-a,0]);box(name+'-crown-'+i,[.2,.045,.39],[x,.51+y,z],'accent',[0,-a,0])}};
    switch(theme){
      case 'navigation':
        arc('atlas-colonnade',3.15,2.4,Math.PI,Math.PI*2,11);portal('atlas-entry',0,2.7,2.7,3.1);break;
      case 'council':
        arc('council-chamber',3.4,3.6,Math.PI*.95,Math.PI*2.05,13);box('council-entablature',[7.5,.24,.8],[0,4.18,-2.4],'stone');break;
      case 'foundry':
        for(const z of [-2.3,2.3])portal('compute-vault-'+z,0,z,5.2,7.2);for(const x of [-3.6,3.6])box('foundry-trunk-'+x,[.12,.18,4.6],[x,5.74,0],'accent');break;
      case 'workshop':
        portal('workshop-service-frame',0,-2.5,4.5,7.5);for(let i=0;i<5;i++)box('sawtooth-roof-'+i,[1.22,.12,2],[-2.7+i*1.35,5.1,-1.9],'metal',[0,0,.18]);break;
      case 'commons':
        for(const x of [-3.7,3.7]){box('commons-bench-'+x,[.65,.5,4],[x,.76,0],'stone');box('commons-back-'+x,[.12,.7,4],[x+(x<0?-.27:.27),1.12,0],'metal')}
        portal('commons-pergola',0,-2.8,3.6,7.5);for(let i=0;i<9;i++)box('pergola-louver-'+i,[.25,.12,2],[-3.6+i*.9,4.2,-1.9],'metal');break;
      case 'control':
        fins('operations-screen-wall',9,3.8,-2.5);box('operations-brow',[7.8,.26,1.2],[0,4.42,-2.1],'metal');for(const x of [-3.8,3.8])box('operations-wing-'+x,[.2,2.1,2],[x,1.53,-1.2],'stone');break;
      case 'chamber':
        portal('treasury-outer-portal',0,-1.8,5.0,7.5);portal('treasury-inner-portal',0,-1.5,4.55,6.65);for(const x of [-3.7,3.7])box('treasury-buttress-'+x,[.5,2.7,3.5],[x,1.83,.2],'stone');break;
      case 'atelier':
        for(let i=0;i<4;i++)box('atelier-floating-roof-'+i,[1.55,.1,2.7],[-2.7+i*1.8,4.8+i*.12,-1.6],'stone',[0,0,.1]);for(const x of [-3.7,3.7])box('atelier-thin-support-'+x,[.12,4.6,.14],[x,2.78,-2.7],'metal');break;
      case 'observatory':
        arc('observatory-windbreak',3.3,1.65,Math.PI*.85,Math.PI*2.15,15);for(const x of [-3.4,3.4])box('instrument-bench-'+x,[.7,.55,2.4],[x,.76,.9],'stone');break;
      case 'yard':
        for(const x of [-3.7,3.7]){box('yard-service-rail-'+x,[.12,.15,6],[x,.58,0],'metal');for(let i=0;i<6;i++)box('yard-sleeper-'+x+'-'+i,[.55,.07,.2],[x,.49,-2.5+i],'stone')}
        portal('delivery-yard-gate',0,-2.7,3.8,7.5);break;
      case 'stacks':
        portal('archive-portico-back',0,-2.7,4.7,7.6);portal('archive-portico-front',0,2.6,4.7,7.6);for(let i=0;i<7;i++)box('archive-roof-rib-'+i,[.18,.25,5.6],[-3.5+i*7/6,5.27,0],'stone');break;
      case 'lab':
        for(const x of [-3.5,3.5])portal('lab-calibration-frame-'+x,x,0,4.7,5.2,Math.PI/2);box('lab-overhead-sensor',[7.2,.2,.6],[0,5.24,-2.3],'metal');break;
      case 'log':
        arc('chronicle-radial-wall',3.4,2.1,Math.PI,Math.PI*2,13);for(let i=0;i<7;i++)box('chronicle-date-step-'+i,[.5,.12+i*.09,1],[-3+i, .54+i*.045,2.6],i===3?'accent':'stone');break;
      case 'integrations':
        for(const x of [-3.7,3.7]){portal('gateway-side-'+x,x,0,4.6,4.7,Math.PI/2);box('gateway-conduit-'+x,[.12,.1,4.8],[x,5.21,0],'accent')}
        box('gateway-crosslink',[7.6,.25,.4],[0,5.25,-2.4],'metal');break;
      case 'academy':
        for(let i=0;i<3;i++)portal('academy-learning-arch-'+i,0,-2.8+i*.45,4.5-i*.17,7.6-i*.35);break;
      case 'governance':
        for(const x of [-3.6,3.6]){box('review-pier-'+x,[.6,4.8,.65],[x,2.88,-2.4],'stone');box('review-capital-'+x,[.95,.22,.95],[x,5.36,-2.4],'metal')}
        box('review-pediment',[8,.35,1],[0,5.62,-2.4],'stone');break;
      case 'delivery':
        fins('delivery-loading-screen',7,2.2,-2.6);for(const x of [-3.9,3.9])box('delivery-bay-marker-'+x,[.15,3.4,.3],[x,2.18,2.4],'accent');break;
      case 'infrastructure':
        for(let i=0;i<3;i++)portal('utility-pipe-bridge-'+i,0,-2.5+i*.45,4.3+i*.12,7.8);for(const x of [-3.9,3.9])box('utility-service-bank-'+x,[.6,1.25,3.4],[x,1.105,.5],'stone');break;
      case 'synergy':
        for(let i=0;i<3;i++){const a=i*Math.PI*2/3,x=Math.cos(a)*3.2,z=Math.sin(a)*3.2;portal('synergy-participant-'+i,x,z,3.7,1.5,-a+Math.PI/2)}break;
    }
    return parts;
  }
  // Landmark motion: one shared time uniform drives every moving part on the GPU. Each vertex carries
  // aMot=(kind,amplitude,speed,phase) and its pivot, so motion adds no draw calls and no per-building loop.
  // Kinds: 1 Y swing, 2 Z spin, 3 Y spin, 4 accent blink, 5 Z swing, 6 X slide. Swings stay inside the roof footprint.
  // Pivots are in recipe space before the exhibit lift (+.48), matching the authored part positions.
  const MOTION=Object.freeze({
    navigation:[[/^(map-node|source-spoke)-/,3,0,.12,[0,0,0]]],
    foundry:[[/^routing-signal-/,4,0,1.3,null],[/^bus-bridge$/,4,0,.35,null]],
    workshop:[[/^(tool-carriage|tool-spindle)$/,6,1.5,.45,null]],
    control:[[/^dispatch-screen-/,4,0,.22,null]],
    chamber:[[/^(audit-wheel|lock-spoke-\d+|ledger-seal)$/,2,0,.32,[0,2.2,0]]],
    observatory:[[/^(telescope-yoke|telescope-barrel|objective-lens|focus-collar)/,1,.55,.16,[0,0,0]]],
    yard:[[/^(crane-boom|counterweight|hoist-cable|delivery-hook)$/,1,.34,.2,[-2.5,0,0]]],
    lab:[[/^(robot-upright|shoulder-joint|robot-forearm|wrist-joint|test-gripper)/,1,.5,.3,[0,0,0]]],
    log:[[/^clock-hand$/,2,0,-.05,[0,3.45,0]],[/^minute-hand$/,2,0,-.6,[0,3.45,0]]],
    integrations:[[/^(connection-port|gateway-contact)-/,4,0,.9,null]],
    governance:[[/^(balanced-crossbar|review-suspension|review-pan|decision-record)/,5,.07,.35,[0,4.15,0]]],
    infrastructure:[[/^facility-status-/,4,0,.5,null]],
    synergy:[[/^engagement-core$/,4,0,.25,null],[/^division-link-/,4,0,.4,null]]
  });
  const U={uLmTime:{value:0},uLmMotion:{value:1}};
  const phaseOf=name=>{let h=2166136261;for(let i=0;i<name.length;i++)h=Math.imul(h^name.charCodeAt(i),16777619);return ((h>>>0)%6283)/1000};
  function motion(theme,name){
    const row=(MOTION[theme]||[]).find(([re])=>re.test(name));if(!row)return null;
    const [,kind,amp,speed,pivot]=row;
    return {kind,amp,speed,phase:kind===4?phaseOf(name):0,pivot:pivot?[pivot[0],pivot[1]+.48,pivot[2]]:[0,0,0]};
  }
  const MOTION_VERT='attribute vec4 aMot;attribute vec3 aPiv;uniform float uLmTime;uniform float uLmMotion;varying float vLmBlink;\n'+
    'mat3 lmRot(vec4 m){float k=m.x,a=0.0;if((k>0.5&&k<1.5)||(k>4.5&&k<5.5))a=m.y*sin(uLmTime*m.z+m.w);else if(k>1.5&&k<3.5)a=uLmTime*m.z+m.w;a*=uLmMotion;float c=cos(a),s=sin(a);'+
    'if((k>1.5&&k<2.5)||(k>4.5&&k<5.5))return mat3(c,s,0.0,-s,c,0.0,0.0,0.0,1.0);if((k>0.5&&k<1.5)||(k>2.5&&k<3.5))return mat3(c,0.0,-s,0.0,1.0,0.0,s,0.0,c);return mat3(1.0);}\n';
  function patchMotion(sh,accent){
    sh.uniforms.uLmTime=U.uLmTime;sh.uniforms.uLmMotion=U.uLmMotion;
    sh.vertexShader=sh.vertexShader.replace('#include <common>','#include <common>\n'+MOTION_VERT)
      .replace('#include <beginnormal_vertex>','#include <beginnormal_vertex>\nmat3 lmR=lmRot(aMot);objectNormal=lmR*objectNormal;')
      .replace('#include <begin_vertex>','#include <begin_vertex>\ntransformed=lmR*(transformed-aPiv)+aPiv;if(aMot.x>5.5)transformed.x+=aMot.y*sin(uLmTime*aMot.z+aMot.w)*uLmMotion;\nvLmBlink=(aMot.x>3.5&&aMot.x<4.5)?mix(1.0,0.3+0.7*smoothstep(0.35,0.5,abs(fract(uLmTime*aMot.z+aMot.w)-0.5)*2.0),uLmMotion):1.0;');
    sh.fragmentShader=sh.fragmentShader.replace('#include <common>','#include <common>\nvarying float vLmBlink;');
    if(accent)sh.fragmentShader=sh.fragmentShader.replace('#include <emissivemap_fragment>','#include <emissivemap_fragment>\n#ifdef USE_COLOR\ntotalEmissiveRadiance *= vColor;\n#endif\ntotalEmissiveRadiance *= vLmBlink;');
  }
  // Called from the render loop only when a frame is already being drawn; reduced motion holds every part at rest.
  function tick(t,reduced){U.uLmTime.value=t%3600;U.uLmMotion.value=reduced?0:1}
  function geometry(part){const s=part.size;switch(part.shape){case'box':return new THREE.BoxGeometry(...s);case'cylinder':return new THREE.CylinderGeometry(s[0],s[1],s[2],16);case'torus':return new THREE.TorusGeometry(s[0],s[1],6,32);default:throw new Error('Unsupported landmark part')}}
  function build(districts,buildings,notes,renderer){
    // Metal and accent parts reflect the Sentinels' prefiltered env map; without one they fall back to a lighter, less metallic finish.
    const env=renderer&&typeof SentinelMesh!=='undefined'&&SentinelMesh.environment?(()=>{try{return SentinelMesh.environment(renderer)}catch(e){return null}})():null;
    const group=new THREE.Group();group.name='Knowledge district landmarks';const buckets=new Map(),records=[];
    const colors={stone:'#8D867A',metal:env?'#303B4B':'#4A5568'};
    districts.forEach(d=>{
      const identity=typeof Districts!=='undefined'?Districts.get(d.top):null;if(!identity)return;
      const choices=buildings.filter(b=>b&&notes[b.id]&&(Districts.worldTop?Districts.worldTop(notes[b.id]):notes[b.id].top)===d.top).sort((a,b)=>{const ta=a.tiers.at(-1),tb=b.tiers.at(-1);return tb.w*tb.d-ta.w*ta.d});
      const anchor=choices[0];if(!anchor)return;const roof=anchor.tiers.at(-1);
      // Derive the fit from transformed geometry, including rotated supports and torus tubes.
      // A fixed nominal footprint silently clips the larger architectural settings.
      const assembly=recipe(identity.theme).map(part=>{
        const raw=geometry(part),geo=raw.index?raw.toNonIndexed():raw;if(geo!==raw)raw.dispose();
        const obj=new THREE.Object3D();obj.position.set(...part.p);obj.rotation.set(...part.r);obj.updateMatrix();geo.applyMatrix4(obj.matrix);geo.computeBoundingBox();return {part,geo};
      });
      if(!assembly.length)return;
      const bounds=new THREE.Box3();assembly.forEach(p=>bounds.union(p.geo.boundingBox));
      const width=2*Math.max(Math.abs(bounds.min.x),Math.abs(bounds.max.x)),depth=2*Math.max(Math.abs(bounds.min.z),Math.abs(bounds.max.z));
      const scale=Math.min(roof.w/(width+.5),roof.d/(depth+.5),1.65);
      const sources=Districts.landmarks(d.top,notes).map(n=>n.name);
      const record={folder:d.top,title:identity.title,theme:identity.theme,noteId:anchor.id,sourceNotes:sources,x:roof.x,y:roof.y1+.04,z:roof.z,scale,height:bounds.max.y*scale,partCount:0};records.push(record);
      assembly.forEach(({part,geo})=>{
        geo.scale(scale,scale,scale);geo.translate(record.x,record.y,record.z);
        const color=new THREE.Color(part.material==='accent'?d.color:colors[part.material]).convertSRGBToLinear();
        const mo=motion(identity.theme,part.name);if(mo){mo.pivot=[mo.pivot[0]*scale+record.x,mo.pivot[1]*scale+record.y,mo.pivot[2]*scale+record.z];if(mo.kind===6)mo.amp*=scale;record.moving=(record.moving||0)+1}
        if(!buckets.has(part.material))buckets.set(part.material,[]);buckets.get(part.material).push({geo,color,record,name:part.name,mo});record.partCount++;
      });
    });
    buckets.forEach((parts,key)=>{
      const size=parts.reduce((n,p)=>n+p.geo.attributes.position.count,0),pos=new Float32Array(size*3),norm=new Float32Array(size*3),col=new Float32Array(size*3),mot=new Float32Array(size*4),piv=new Float32Array(size*3),ranges=[];let offset=0;
      parts.forEach(p=>{const a=p.geo.attributes.position,n=p.geo.attributes.normal;pos.set(a.array,offset*3);norm.set(n.array,offset*3);for(let i=offset;i<offset+a.count;i++){col.set([p.color.r,p.color.g,p.color.b],i*3);if(p.mo){mot.set([p.mo.kind,p.mo.amp,p.mo.speed,p.mo.phase],i*4);piv.set(p.mo.pivot,i*3)}}ranges.push({first:offset/3,last:(offset+a.count)/3,record:p.record,part:p.name,moving:!!p.mo});offset+=a.count;p.geo.dispose()});
      const g=new THREE.BufferGeometry();g.setAttribute('position',new THREE.BufferAttribute(pos,3));g.setAttribute('normal',new THREE.BufferAttribute(norm,3));g.setAttribute('color',new THREE.BufferAttribute(col,3));g.setAttribute('aMot',new THREE.BufferAttribute(mot,4));g.setAttribute('aPiv',new THREE.BufferAttribute(piv,3));g.computeBoundingSphere();
      const m=new THREE.MeshStandardMaterial({vertexColors:true,roughness:key==='stone'?.82:.4,metalness:key==='stone'?.08:env?.65:.3});
      if(env&&key!=='stone'){m.envMap=env;m.envMapIntensity=.8;if(SentinelMesh.useEnvironment)SentinelMesh.useEnvironment(m)}
      if(key==='accent'){m.emissive.set('#ffffff');m.emissiveIntensity=.32}
      m.onBeforeCompile=sh=>patchMotion(sh,key==='accent');
      const mesh=new THREE.Mesh(g,m);mesh.name='District landmark '+key;mesh.userData.landmarkRanges=ranges;mesh.castShadow=true;mesh.receiveShadow=true;group.add(mesh);
    });
    group.userData.records=records;
    return group;
  }
  function hit(intersection){if(!intersection)return null;return intersection.object.userData.landmarkRanges?.find(r=>intersection.faceIndex>=r.first&&intersection.faceIndex<r.last)?.record||null}
  function dispose(group){if(!group)return;group.traverse(o=>{if(o.isMesh){o.geometry.dispose();o.material.dispose()}});if(group.parent)group.parent.remove(group)}
  return Object.freeze({contract,recipe,build,hit,dispose,tick,motion,patchMotion,uniforms:U});
})();

