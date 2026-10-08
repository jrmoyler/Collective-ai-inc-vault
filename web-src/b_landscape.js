// A planted understory and branching grove. All geometry is batched; no downloaded
// models, transparent sorting, per-tree tick loop or extra renderer is required.
const VaultLandscape=(()=>{
  let scannedRockData=null;
  function random(seed){let s=seed>>>0;return()=>{s=(Math.imul(s,1664525)+1013904223)>>>0;return s/4294967296}}
  function build({THREE:T,trees=[],districts=[],buildings=[],side=500,world=null,treeStyle=null,heightAt=()=>0,onChange=()=>{},high=true,reducedMotion=false}){
    const group=new T.Group();group.name='Living gardens';
    const rng=random(0x5641554c),clock={value:0};
    const colour=hex=>new T.Color(hex).convertSRGBToLinear();
    const mats=[],textures=[],geometries=[];
    const material=opts=>{const m=new T.MeshStandardMaterial(opts);mats.push(m);return m};
    const bark=material({color:colour('#a69a7d'),roughness:1});
    bark.onBeforeCompile=shader=>{
      shader.vertexShader=shader.vertexShader.replace('#include <common>','#include <common>\nvarying vec3 vBark;').replace('#include <begin_vertex>','#include <begin_vertex>\nvBark=position;');
      shader.fragmentShader=shader.fragmentShader.replace('#include <common>','#include <common>\nvarying vec3 vBark;').replace('#include <color_fragment>',`#include <color_fragment>
        float barkAngle=atan(vBark.z,vBark.x);
        float fissure=sin(barkAngle*19.+sin(vBark.y*27.)*.5)*sin(barkAngle*37.+vBark.y*14.);
        float ridge=smoothstep(-.4,.8,fissure);
        float moss=(1.-smoothstep(0.,.6,vBark.y))*(.5+.5*sin(barkAngle*4.));
        diffuseColor.rgb*=mix(vec3(.38,.34,.28),vec3(1.08,1.04,.91),ridge);
        diffuseColor.rgb=mix(diffuseColor.rgb,diffuseColor.rgb*vec3(.62,.87,.45),moss*.4);`);
    };
    bark.customProgramCacheKey=()=> 'garden-fissured-bark';
    const grassMat=material({color:0xffffff,roughness:1,side:T.DoubleSide});
    const flowerMat=material({color:0xffffff,roughness:.95,side:T.DoubleSide});
    const stoneMat=material({color:0xffffff,roughness:1});
    const soilMat=material({color:0xffffff,roughness:1,polygonOffset:true,polygonOffsetFactor:-1});
    // Leaf silhouettes, veins and small gaps keep the canopy airy at walking height.
    const canvas=document.createElement('canvas');canvas.width=canvas.height=256;
    const ctx=canvas.getContext('2d');
    for(let i=0;i<108;i++){
      const a=rng()*Math.PI*2,r=Math.sqrt(rng())*101,x=128+Math.cos(a)*r,y=128+Math.sin(a)*r;
      ctx.save();ctx.translate(x,y);ctx.rotate(rng()*6.28);
      ctx.fillStyle=['#f4f2dc','#eeefdb','#d6ddbd','#ffffee','#e1e7ce'][i%5];
      ctx.beginPath();ctx.ellipse(0,0,7+rng()*8,3+rng()*4,0,0,Math.PI*2);ctx.fill();
      ctx.strokeStyle='rgba(126,136,93,.28)';ctx.lineWidth=.7;ctx.beginPath();ctx.moveTo(-6,0);ctx.lineTo(8,0);ctx.stroke();ctx.restore();
    }
    const leafTex=new T.CanvasTexture(canvas);leafTex.encoding=T.sRGBEncoding;textures.push(leafTex);
    const leafMat=material({map:leafTex,color:0xffffff,alphaTest:.36,roughness:.9,side:T.DoubleSide});
    // Match alpha cutouts AND wind in the shadow pass; rectangular dark crown
    // shadows would undo the airy canopy even when the visible texture is correct.
    const leafDepth=new T.MeshDepthMaterial({depthPacking:T.RGBADepthPacking,map:leafTex,alphaTest:.36,side:T.DoubleSide});mats.push(leafDepth);
    function wind(mat,strength){
      mat.onBeforeCompile=shader=>{
        shader.uniforms.uGardenTime=clock;
        shader.vertexShader=shader.vertexShader.replace('#include <common>','#include <common>\nuniform float uGardenTime;');
        shader.vertexShader=shader.vertexShader.replace('#include <begin_vertex>',`#include <begin_vertex>
          #ifdef USE_INSTANCING
          vec3 gardenOrigin=instanceMatrix[3].xyz;
          float gardenWave=sin(uGardenTime*1.2+gardenOrigin.x*.19+gardenOrigin.z*.14)+.35*sin(uGardenTime*2.1+gardenOrigin.z*.41);
          transformed.x+=gardenWave*${strength.toFixed(3)}*max(0.,position.y+.25);
          #endif`);
      };mat.customProgramCacheKey=()=>`garden-wind-${strength}`;
    }
    wind(leafMat,.045);wind(leafDepth,.045);wind(grassMat,.13);wind(flowerMat,.055);
    function geometry(points,indices){const g=new T.BufferGeometry();g.setAttribute('position',new T.Float32BufferAttribute(points,3));if(indices)g.setIndex(indices);g.computeVertexNormals();return g}
    // Foliage is an irregular volume of inclined branch sprays, not a stack of
    // vertical billboard crosses. Rounded normals give a soft canopy light field.
    const lp=[],lu=[],li=[],ln=[];
    for(let k=0;k<7;k++){
      const a=k*2.399,tilt=.22+(k%3)*.31,cx=Math.cos(a)*.33,cy=(k%3-1)*.19,cz=Math.sin(a)*.33;
      const right=new T.Vector3(Math.cos(a),0,Math.sin(a));
      const up=new T.Vector3(-Math.sin(a)*Math.sin(tilt),Math.cos(tilt),Math.cos(a)*Math.sin(tilt));
      const o=lp.length/3;
      for(const [u,v] of [[-1,-.65],[1,-.65],[1,.85],[-1,.85]]){
        const x=cx+right.x*u+up.x*v,y=cy+up.y*v,z=cz+right.z*u+up.z*v;
        lp.push(x,y,z);const normal=new T.Vector3(x*.45,.85+y*.25,z*.45).normalize();ln.push(normal.x,normal.y,normal.z);
      }
      lu.push(0,0,1,0,1,1,0,1);li.push(o,o+1,o+2,o,o+2,o+3);
    }
    const leafGeo=geometry(lp,li);leafGeo.setAttribute('uv',new T.Float32BufferAttribute(lu,2));leafGeo.setAttribute('normal',new T.Float32BufferAttribute(ln,3));
    const trunkGeo=new T.CylinderGeometry(.48,1,1,7,2);trunkGeo.translate(0,.5,0);
    // Each tapered trunk section bends slightly. Segments are joined by branch
    // placement below, so branches meet the wood instead of hovering in leaves.
    const tp=trunkGeo.attributes.position;
    for(let i=0;i<tp.count;i++){const y=tp.getY(i),a=Math.atan2(tp.getZ(i),tp.getX(i)),ridge=1+.065*Math.sin(a*5+y*13);tp.setXYZ(i,tp.getX(i)*ridge+Math.sin(y*2.7)*.07,y,tp.getZ(i)*ridge)}trunkGeo.computeVertexNormals();
    // Bent tapered blades have real silhouette and an exposed center ridge.
    const gp=[];
    for(let j=0;j<9;j++){
      const a=j*2.399,h=.45+rng()*.6,w=.028+rng()*.026,lean=.17+rng()*.18;
      const x=Math.cos(a)*.16,z=Math.sin(a)*.16,dx=Math.cos(a),dz=Math.sin(a);
      gp.push(x-dz*w,0,z+dx*w,x+dz*w,0,z-dx*w,x+dx*lean*.45,h*.55,z+dz*lean*.45,
        x+dz*w,0,z-dx*w,x+dx*lean,h,z+dz*lean,x+dx*lean*.45,h*.55,z+dz*lean*.45);
    }
    const grassGeo=geometry(gp);
    // Arching fern fronds with paired tapered leaflets and visible midribs.
    const fernPoints=[];
    for(let f=0;f<7;f++){
      const a=f*2.399,dx=Math.cos(a),dz=Math.sin(a),length=.72+(f%3)*.16;
      for(let j=1;j<8;j++){
        const t=j/8,along=length*t,y=.08+Math.sin(t*Math.PI*.86)*.52,span=Math.sin(t*Math.PI)*.23;
        for(const sign of [-1,1]){
          const x=dx*along,z=dz*along;
          fernPoints.push(x,y,z,x-dz*span*sign+dx*.11,y-.055,z+dx*span*sign+dz*.11,x+dx*.14,y+.01,z+dz*.14);
        }
      }
    }
    const fernGeo=geometry(fernPoints);
    // Broad, folded hosta leaves fan out from one rooted crown; a raised center
    // ridge catches the sunlight while lower margins curl toward the soil.
    const broadPoints=[];
    for(let f=0;f<6;f++){
      const a=f*2.399,dx=Math.cos(a),dz=Math.sin(a),h=.56+(f%2)*.21;
      const v0=[0,.04,0],vl=[dx*.34-dz*.21,h*.64,dz*.34+dx*.21],vr=[dx*.34+dz*.21,h*.64,dz*.34-dx*.21],vm=[dx*.39,h,dz*.39],vt=[dx*.83,h*.62,dz*.83];
      broadPoints.push(...v0,...vl,...vm,...v0,...vm,...vr,...vl,...vt,...vm,...vm,...vt,...vr);
    }
    const broadGeo=geometry(broadPoints);

    const fp=[],fc=[];
    for(let k=0;k<5;k++){
      const y=.62+k*.12,r=.14*(1-k*.12);
      for(let p=0;p<5;p++){const a=p*6.283/5,b=a+.8;fp.push(0,y,0,Math.cos(a)*r,y+.035,Math.sin(a)*r,Math.cos(b)*r,y+.075,Math.sin(b)*r)}
    }
    for(let i=0;i<fp.length/3;i++)fc.push(1,1,1);
    // Three stems share the bloom material through vertex tint. No detached
    // blossoms floating above empty space at eye level.
    for(let j=0;j<3;j++){
      const a=j*Math.PI/3,dx=Math.cos(a)*.012,dz=Math.sin(a)*.012;
      fp.push(-dx,0,-dz,dx,0,dz,dx,1.14,dz,-dx,0,-dz,dx,1.14,dz,-dx,1.14,-dz);
      for(let i=0;i<6;i++)fc.push(.34,.5,.17);
    }
    const flowerGeo=geometry(fp);flowerGeo.setAttribute('color',new T.Float32BufferAttribute(fc,3));flowerMat.vertexColors=true;
    const rockGeo=new T.IcosahedronGeometry(1,1),rp=rockGeo.attributes.position;
    for(let i=0;i<rp.count;i++){const x=rp.getX(i),y=rp.getY(i),z=rp.getZ(i),n=1+.17*Math.sin(x*13+z*11+y*7);rp.setXYZ(i,x*n,y*n,z*n)}rockGeo.computeVertexNormals();
    const sp=[0,.015,0],si=[];
    for(let j=0;j<16;j++){const a=j*6.283/16,r=1+.12*Math.sin(j*4.3);sp.push(Math.cos(a)*r,.014,Math.sin(a)*r);si.push(0,1+j,1+(j+1)%16)}
    // Reverse winding for an upward facing ground patch.
    for(let i=0;i<si.length;i+=3){const n=si[i+1];si[i+1]=si[i+2];si[i+2]=n}
    const soilGeo=geometry(sp,si);
    const trunks=[],leaves=[],grass=[],flowers=[],rocks=[],soil=[],ferns=[],broadleaves=[];
    const yAxis=new T.Vector3(0,1,0),q=new T.Quaternion(),direction=new T.Vector3();
    const buildingGrid=new Map(),cell=24;
    for(const b of buildings){if(!b)continue;for(let x=Math.floor((b.cx-b.fw/2-3)/cell);x<=Math.floor((b.cx+b.fw/2+3)/cell);x++)for(let z=Math.floor((b.cz-b.fd/2-3)/cell);z<=Math.floor((b.cz+b.fd/2+3)/cell);z++){const key=x+','+z;if(!buildingGrid.has(key))buildingGrid.set(key,[]);buildingGrid.get(key).push(b)}}
    function clear(x,z){return !(buildingGrid.get(Math.floor(x/cell)+','+Math.floor(z/cell))||[]).some(b=>Math.abs(x-b.cx)<b.fw/2+2.2&&Math.abs(z-b.cz)<b.fd/2+2.2)}
    const inGarden=(x,z)=>districts.some(d=>x>d.x+.8&&x<d.x+d.w-.8&&z>d.z+.8&&z<d.z+d.d-.8)||(world&&(Math.abs(x)>world.W/2+6||Math.abs(z)>world.H/2+6)&&Math.abs(x)<side/2-15&&Math.abs(z)<side/2-15)||Math.max(Math.abs(x),Math.abs(z))>side/2-13;
    const leafColours=['#b0bd79','#92ad70','#bcc686','#9db17a','#c3c38c'].map(colour);
    const grassColours=['#92ad61','#a8b976','#b1c17f','#819e5c'].map(colour);
    const flowerColours=['#dbc992','#b9abc2','#cbb5d9','#efe5b9'].map(colour);
    let treeCount=0,understoryCount=0;
    const usable=trees.filter(t=>{
      if(!Number.isFinite(t.x)||!Number.isFinite(t.z)||!clear(t.x,t.z))return false;
      if(t.understoryOnly){if(understoryCount>=(high?2400:700))return false;understoryCount++;return true}
      if(treeCount>=(high?2200:700))return false;treeCount++;return true;
    });
    usable.forEach((t,index)=>{
      const k=Number.isFinite(t.k)?t.k:rng(),style=treeStyle?treeStyle(t.x,t.z,k):null,scale=t.greenbelt?1.6:1,h=(5.7+k*3.7)*scale*(style?.sy||1),width=(1.7+k*1.1)*scale*(style?.sx||1),angle=rng()*6.283;
      // A neutral ivory atlas carries luminance only. Apply green once here.
      // District hue survives, while bounded saturation prevents black foliage.
      const leafColour=style?new T.Color().setHSL(style.h,Math.min(.46,style.s*.65),Math.max(.52,Math.min(.7,style.l+.17))).convertSRGBToLinear():leafColours[index%5];
      const leanX=Math.cos(angle)*h*.065,leanZ=Math.sin(angle)*h*.065,trunkRadius=(.22+k*.13)*scale;
      function branch(x,y,z,ex,ey,ez,r){
        direction.set(ex-x,ey-y,ez-z);const length=direction.length();q.setFromUnitVectors(yAxis,direction.normalize());
        trunks.push({x,y,z,sx:r,sy:length,sz:r,q:q.clone()});
      }
      if(!t.understoryOnly){
      branch(t.x,0,t.z,t.x+leanX*.38,h*.43,t.z+leanZ*.38,trunkRadius);
      branch(t.x+leanX*.38,h*.43,t.z+leanZ*.38,t.x+leanX,h*.91,t.z+leanZ,trunkRadius*.64);
      const branchCount=high?6:4,species=index%3;
      for(let j=0;j<branchCount;j++){
        const a=angle+j*2.399,level=j/branchCount,by=h*(.37+level*.3),reach=width*(species===1?.78:1.15)*(1-level*.32);
        const bx=t.x+leanX*by/h,bz=t.z+leanZ*by/h,ex=bx+Math.cos(a)*reach,ez=bz+Math.sin(a)*reach,ey=by+h*(.15+level*.055);
        branch(bx,by,bz,ex,ey,ez,trunkRadius*(.4-level*.17));
        if(high){const tx=ex+Math.cos(a+.7)*width*.38,tz=ez+Math.sin(a+.7)*width*.38;branch(ex,ey,ez,tx,ey+h*.085,tz,trunkRadius*.105)}
        for(let n=0;n<(high?2:1);n++){
          const vary=.8+rng()*.34,spread=width*(species===1?.72:.89),c=leafColour.clone().multiplyScalar(.87+rng()*.25);
          leaves.push({x:ex+Math.cos(a+.8*n)*spread*.27,y:ey+h*.055+n*.2,z:ez+Math.sin(a+.8*n)*spread*.27,sx:spread*vary,sy:spread*(species===1?.91:.64),sz:spread*(.8+rng()*.3),rx:(rng()-.5)*.4,ry:a,rz:(rng()-.5)*.3,c});
        }
      }
      // An offset leader breaks the repeated dome silhouette of avenue trees.
      leaves.push({x:t.x+leanX,y:h*.91,z:t.z+leanZ,sx:width*.75,sy:width*.82,sz:width*.69,ry:angle,c:leafColour.clone().multiplyScalar(1.08)});
      }
      const radius=(t.understoryOnly ? .8 : 1.3+k*.4)*scale;
      soil.push({x:t.x,y:.028,z:t.z,sx:radius,sy:1,sz:radius*.88,ry:angle,c:colour(index%3?'#65734a':'#777450')});
      const n=Math.max(4,Math.min(high?24:12,Math.floor((high?14000:4300)/Math.max(1,usable.length))));
      for(let j=0;j<n;j++){
        if(grass.length>=(high?14000:4300))break;
        const a=rng()*6.283,r=.3+Math.sqrt(rng())*(t.greenbelt?3.3:2.35),x=t.x+Math.cos(a)*r,z=t.z+Math.sin(a)*r;
        if(!clear(x,z)||!inGarden(x,z))continue;
        const s=(.5+rng()*.65)*(t.greenbelt?1.35:1);grass.push({x,y:.04,z,sx:s,sy:s,sz:s,ry:a,c:grassColours[j%4]});
        if(j%3===0&&index%3===0)flowers.push({x,y:.04,z,sx:.85,sy:.8+rng()*.6,sz:.85,ry:a,c:flowerColours[index%4]});
      }
      for(let j=0;j<(high?3:1);j++){
        const a=angle+j*2.399,r=.7+j*.42,x=t.x+Math.cos(a)*r,z=t.z+Math.sin(a)*r;
        if(!clear(x,z)||!inGarden(x,z))continue;
        const s=.8+k*.5;
        if(index%2)ferns.push({x,y:.04,z,sx:s,sy:s,sz:s,ry:a,c:colour(j%2?'#a5b578':'#89a663')});
        else broadleaves.push({x,y:.04,z,sx:s,sy:s,sz:s,ry:a,c:colour(j%2?'#83a471':'#9bb27b')});
      }
      if(index%3===0){const a=angle+1,x=t.x+Math.cos(a)*1.1,z=t.z+Math.sin(a)*1.1;if(clear(x,z)&&inGarden(x,z))rocks.push({x,y:.018,z,sx:.75+k*.7,sy:.75+k*.7,sz:.75+k*.7,ry:a,c:new T.Color(1,1,1)})}
    });
    function batch(geo,mat,list,name,shadow){
      geometries.push(geo);if(!list.length)return;
      const mesh=new T.InstancedMesh(geo,mat,list.length),o=new T.Object3D(),white=new T.Color(1,1,1);
      list.forEach((p,i)=>{const terrainY=heightAt(p.x,p.z);o.position.set(p.x,p.y+(Number.isFinite(terrainY)?terrainY:0),p.z);o.rotation.set(p.rx||0,p.ry||0,p.rz||0);if(p.q)o.quaternion.copy(p.q);o.scale.set(p.sx||1,p.sy||1,p.sz||1);o.updateMatrix();mesh.setMatrixAt(i,o.matrix);mesh.setColorAt(i,p.c||white)});
      mesh.name=name;mesh.instanceMatrix.needsUpdate=true;mesh.instanceColor.needsUpdate=true;mesh.frustumCulled=false;mesh.castShadow=shadow;mesh.receiveShadow=true;if(mat===leafMat)mesh.customDepthMaterial=leafDepth;group.add(mesh);
    }
    batch(trunkGeo,bark,trunks,'Branching hardwood trunks',high);batch(leafGeo,leafMat,leaves,'Layered leaf sprays',high);
    batch(soilGeo,soilMat,soil,'Irregular moss beds',false);batch(grassGeo,grassMat,grass,'Meadow blades',false);
    batch(flowerGeo,flowerMat,flowers,'Lavender and cream wildflowers',false);batch(rockGeo,stoneMat,rocks.filter((_,i)=>i%Math.max(1,Math.ceil(rocks.length/(high?96:32)))===0),'Weathered garden stones',high);
    batch(fernGeo,grassMat,ferns,'Arching fern fronds',false);batch(broadGeo,grassMat,broadleaves,'Folded broadleaf plants',false);
    group.userData.landscape={clock,reducedMotion,materials:mats,textures,geometries,counts:{trees:treeCount,understory:understoryCount,grass:grass.length,flowers:flowers.length,ferns:ferns.length,broadleaves:broadleaves.length,drawCalls:group.children.length}};
    // One photographed moss-rock scan, instanced at 96/32 placements. Local
    // assets total < 0.75 MB; no glTF parser or network service at runtime.
    // The procedural stone remains only as a loading/offline fallback.
    const stoneMesh=group.children.find(m=>m.name==='Weathered garden stones');
    if(stoneMesh&&typeof fetch==='function'){
      const state=group.userData.landscape;state.rockAsset='loading';
      if(!scannedRockData)scannedRockData=fetch('assets/world/rocks/moss-rock.json').then(r=>{if(!r.ok)throw Error('Rock mesh HTTP '+r.status);return r.json()}).catch(e=>{scannedRockData=null;throw e});
      scannedRockData.then(data=>{
        if(group.userData.landscape!==state)return;
        if(data.version!==1||!Array.isArray(data.position)||data.position.length%3||!Array.isArray(data.normal)||data.normal.length!==data.position.length||!Array.isArray(data.uv)||data.uv.length!==data.position.length/3*2||!Array.isArray(data.index)||data.index.length%3)throw Error('Invalid rock geometry');
        if(!data.position.every(Number.isFinite)||!data.normal.every(Number.isFinite)||!data.uv.every(Number.isFinite)||!data.index.every(i=>Number.isInteger(i)&&i>=0&&i<data.position.length/3))throw Error('Invalid rock attributes');
        const scanned=new T.BufferGeometry();scanned.setAttribute('position',new T.Float32BufferAttribute(data.position,3));scanned.setAttribute('normal',new T.Float32BufferAttribute(data.normal,3));scanned.setAttribute('uv',new T.Float32BufferAttribute(data.uv,2));scanned.setIndex(data.index);scanned.computeBoundingSphere();
        const previous=stoneMesh.geometry;stoneMesh.geometry=scanned;const at=geometries.indexOf(previous);if(at>=0)geometries.splice(at,1);previous.dispose();geometries.push(scanned);
        const loader=new T.TextureLoader();
        let pending=3;
        const load=(file,slot,srgb)=>{
          const texture=loader.load('assets/world/rocks/'+file,tex=>{
            if(group.userData.landscape!==state)return
            tex.flipY=false;if(srgb)tex.encoding=T.sRGBEncoding;tex.anisotropy=2;tex.needsUpdate=true;stoneMat[slot]=tex;stoneMat.needsUpdate=true;
            if(--pending===0)state.rockAsset='ready';onChange();
          },undefined,()=>{if(group.userData.landscape===state){state.rockAsset='texture fallback';onChange()}});
          textures.push(texture);
        };
        load('moss-rock-color.jpg','map',true);load('moss-rock-normal.jpg','normalMap',false);load('moss-rock-roughness.jpg','roughnessMap',false);
        stoneMat.normalScale.set(.7,.7);state.rockAsset='geometry ready';state.rockTriangles=data.index.length/3;onChange();
      }).catch(()=>{if(group.userData.landscape===state)state.rockAsset='procedural fallback'});
    }
    return group;
  }
  function update(group,time){const data=group?.userData.landscape;if(data)data.clock.value=data.reducedMotion?0:time}
  function dispose(group){const d=group?.userData.landscape;if(!d)return;d.materials.forEach(m=>m.dispose());d.textures.forEach(t=>t.dispose());d.geometries.forEach(g=>g.dispose());if(group.parent)group.parent.remove(group);delete group.userData.landscape}
  return {build,update,dispose};
})();
