// A planted understory and branching grove. All geometry is batched; no downloaded
// models, transparent sorting, per-tree tick loop or extra renderer is required.
const VaultLandscape=(()=>{
  function random(seed){let s=seed>>>0;return()=>{s=(Math.imul(s,1664525)+1013904223)>>>0;return s/4294967296}}
  function build({THREE:T,trees=[],districts=[],buildings=[],side=500,world=null,treeStyle=null,high=true,reducedMotion=false}){
    const group=new T.Group();group.name='Living gardens';
    const rng=random(0x5641554c),clock={value:0};
    const colour=hex=>new T.Color(hex).convertSRGBToLinear();
    const mats=[],textures=[],geometries=[];
    const material=opts=>{const m=new T.MeshStandardMaterial(opts);mats.push(m);return m};
    const bark=material({color:colour('#77624a'),roughness:1});
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
      ctx.fillStyle=['#b5c58b','#91ab65','#688750','#d0d399','#a0b773'][i%5];
      ctx.beginPath();ctx.ellipse(0,0,7+rng()*8,3+rng()*4,0,0,Math.PI*2);ctx.fill();
      ctx.strokeStyle='rgba(60,87,36,.4)';ctx.lineWidth=.7;ctx.beginPath();ctx.moveTo(-6,0);ctx.lineTo(8,0);ctx.stroke();ctx.restore();
    }
    const leafTex=new T.CanvasTexture(canvas);leafTex.encoding=T.sRGBEncoding;textures.push(leafTex);
    const leafMat=material({map:leafTex,color:0xffffff,alphaTest:.46,roughness:.93,side:T.DoubleSide});
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
    wind(leafMat,.065);wind(grassMat,.13);wind(flowerMat,.055);
    function geometry(points,indices){const g=new T.BufferGeometry();g.setAttribute('position',new T.Float32BufferAttribute(points,3));if(indices)g.setIndex(indices);g.computeVertexNormals();return g}
    // Three intersecting leafy sprays. The texture is cut out, not blended.
    const lp=[],lu=[],li=[];
    for(let k=0;k<3;k++){
      const a=k*Math.PI/3,dx=Math.cos(a),dz=Math.sin(a),o=lp.length/3;
      lp.push(-dx,-.8,-dz,dx,-.8,dz,dx,1.2,dz,-dx,1.2,-dz);lu.push(0,0,1,0,1,1,0,1);li.push(o,o+1,o+2,o,o+2,o+3);
    }
    const leafGeo=geometry(lp,li);leafGeo.setAttribute('uv',new T.Float32BufferAttribute(lu,2));
    const trunkGeo=new T.CylinderGeometry(.56,1,1,7,2);trunkGeo.translate(0,.5,0);
    // Bent tapered blades have real silhouette and an exposed center ridge.
    const gp=[];
    for(let j=0;j<9;j++){
      const a=j*2.399,h=.45+rng()*.6,w=.028+rng()*.026,lean=.17+rng()*.18;
      const x=Math.cos(a)*.16,z=Math.sin(a)*.16,dx=Math.cos(a),dz=Math.sin(a);
      gp.push(x-dz*w,0,z+dx*w,x+dz*w,0,z-dx*w,x+dx*lean*.45,h*.55,z+dz*lean*.45,
        x+dz*w,0,z-dx*w,x+dx*lean,h,z+dz*lean,x+dx*lean*.45,h*.55,z+dz*lean*.45);
    }
    const grassGeo=geometry(gp);
    const fp=[];
    for(let k=0;k<5;k++){
      const y=.4+k*.09,r=.10*(1-k*.1);
      for(let p=0;p<5;p++){const a=p*6.283/5,b=a+.8;fp.push(0,y,0,Math.cos(a)*r,y+.035,Math.sin(a)*r,Math.cos(b)*r,y+.075,Math.sin(b)*r)}
    }
    const flowerGeo=geometry(fp);
    const rockGeo=new T.IcosahedronGeometry(1,1),rp=rockGeo.attributes.position;
    for(let i=0;i<rp.count;i++){const x=rp.getX(i),y=rp.getY(i),z=rp.getZ(i),n=1+.17*Math.sin(x*13+z*11+y*7);rp.setXYZ(i,x*n,y*n,z*n)}rockGeo.computeVertexNormals();
    const sp=[0,.015,0],si=[];
    for(let j=0;j<16;j++){const a=j*6.283/16,r=1+.12*Math.sin(j*4.3);sp.push(Math.cos(a)*r,.014,Math.sin(a)*r);si.push(0,1+j,1+(j+1)%16)}
    // Reverse winding for an upward facing ground patch.
    for(let i=0;i<si.length;i+=3){const n=si[i+1];si[i+1]=si[i+2];si[i+2]=n}
    const soilGeo=geometry(sp,si);
    const trunks=[],leaves=[],grass=[],flowers=[],rocks=[],soil=[];
    const yAxis=new T.Vector3(0,1,0),q=new T.Quaternion(),direction=new T.Vector3();
    const buildingGrid=new Map(),cell=24;
    for(const b of buildings){if(!b)continue;for(let x=Math.floor((b.cx-b.fw/2-3)/cell);x<=Math.floor((b.cx+b.fw/2+3)/cell);x++)for(let z=Math.floor((b.cz-b.fd/2-3)/cell);z<=Math.floor((b.cz+b.fd/2+3)/cell);z++){const key=x+','+z;if(!buildingGrid.has(key))buildingGrid.set(key,[]);buildingGrid.get(key).push(b)}}
    function clear(x,z){return !(buildingGrid.get(Math.floor(x/cell)+','+Math.floor(z/cell))||[]).some(b=>Math.abs(x-b.cx)<b.fw/2+2.2&&Math.abs(z-b.cz)<b.fd/2+2.2)}
    const inGarden=(x,z)=>districts.some(d=>x>d.x+.8&&x<d.x+d.w-.8&&z>d.z+.8&&z<d.z+d.d-.8)||(world&&(Math.abs(x)>world.W/2+6||Math.abs(z)>world.H/2+6)&&Math.abs(x)<side/2-15&&Math.abs(z)<side/2-15)||Math.max(Math.abs(x),Math.abs(z))>side/2-13;
    const leafColours=['#77944a','#658445','#8c9a53','#587647','#939d59'].map(colour);
    const grassColours=['#627f3f','#83964e','#9aab62','#526f3f'].map(colour);
    const flowerColours=['#dbc992','#b9abc2','#cbb5d9','#efe5b9'].map(colour);
    const usable=trees.filter(t=>Number.isFinite(t.x)&&Number.isFinite(t.z)&&clear(t.x,t.z)).slice(0,high?2200:700);
    usable.forEach((t,index)=>{
      const k=Number.isFinite(t.k)?t.k:rng(),style=treeStyle?treeStyle(t.x,t.z,k):null,scale=t.greenbelt?1.6:1,h=(5.7+k*3.7)*scale*(style?.sy||1),width=(1.7+k*1.1)*scale*(style?.sx||1),angle=rng()*6.283;
      const leafColour=style?new T.Color().setHSL(style.h,style.s,style.l).convertSRGBToLinear():leafColours[index%5];
      trunks.push({x:t.x,y:0,z:t.z,sx:.25+k*.13,sy:h*.73,sz:.25+k*.13,ry:angle});
      const branchCount=high?5:3;
      for(let j=0;j<branchCount;j++){
        const a=angle+j*2.4,by=h*(.32+j*.075),length=1.5+k*.8;
        direction.set(Math.cos(a)*.65,.75,Math.sin(a)*.65).normalize();q.setFromUnitVectors(yAxis,direction);
        trunks.push({x:t.x,y:by,z:t.z,sx:.10,sy:length,sz:.10,q:q.clone()});
      }
      for(let j=0;j<(high?8:5);j++){
        const a=angle+j*2.399,r=j===0?0:width*.58,y=h*.7+Math.sin(j*1.3)*h*.14;
        leaves.push({x:t.x+Math.cos(a)*r,y,z:t.z+Math.sin(a)*r,sx:width*(.83+rng()*.3),sy:width*(.73+rng()*.2),sz:width*(.83+rng()*.3),ry:a,c:leafColour});
      }
      const radius=(1.3+k*.4)*scale;
      soil.push({x:t.x,y:.028,z:t.z,sx:radius,sy:1,sz:radius*.88,ry:angle,c:colour(index%3?'#65734a':'#777450')});
      const n=high?18:9;
      for(let j=0;j<n;j++){
        if(grass.length>=(high?14000:4300))break;
        const a=rng()*6.283,r=.25+Math.sqrt(rng())*2.2,x=t.x+Math.cos(a)*r,z=t.z+Math.sin(a)*r;
        if(!clear(x,z)||!inGarden(x,z))continue;
        const s=(.5+rng()*.65)*(t.greenbelt?1.35:1);grass.push({x,y:.04,z,sx:s,sy:s,sz:s,ry:a,c:grassColours[j%4]});
        if(j%4===0&&index%3===0)flowers.push({x,y:.04,z,sx:.85,sy:.8+rng()*.6,sz:.85,ry:a,c:flowerColours[index%4]});
      }
      if(index%3===0){const a=angle+1,x=t.x+Math.cos(a)*1.1,z=t.z+Math.sin(a)*1.1;if(clear(x,z)&&inGarden(x,z))rocks.push({x,y:.18,z,sx:.4+k*.4,sy:.23+k*.3,sz:.45,ry:a,c:colour(index%2?'#9b9d87':'#7e8771')})}
    });
    function batch(geo,mat,list,name,shadow){
      geometries.push(geo);if(!list.length)return;
      const mesh=new T.InstancedMesh(geo,mat,list.length),o=new T.Object3D(),white=new T.Color(1,1,1);
      list.forEach((p,i)=>{o.position.set(p.x,p.y,p.z);o.rotation.set(0,p.ry||0,0);if(p.q)o.quaternion.copy(p.q);o.scale.set(p.sx||1,p.sy||1,p.sz||1);o.updateMatrix();mesh.setMatrixAt(i,o.matrix);mesh.setColorAt(i,p.c||white)});
      mesh.name=name;mesh.instanceMatrix.needsUpdate=true;mesh.instanceColor.needsUpdate=true;mesh.frustumCulled=false;mesh.castShadow=shadow;mesh.receiveShadow=true;group.add(mesh);
    }
    batch(trunkGeo,bark,trunks,'Branching hardwood trunks',high);batch(leafGeo,leafMat,leaves,'Layered leaf sprays',high);
    batch(soilGeo,soilMat,soil,'Irregular moss beds',false);batch(grassGeo,grassMat,grass,'Meadow blades',false);
    batch(flowerGeo,flowerMat,flowers,'Lavender and cream wildflowers',false);batch(rockGeo,stoneMat,rocks,'Weathered garden stones',high);
    group.userData.landscape={clock,reducedMotion,materials:mats,textures,geometries,counts:{trees:usable.length,grass:grass.length,flowers:flowers.length,drawCalls:group.children.length}};
    return group;
  }
  function update(group,time){const data=group?.userData.landscape;if(data)data.clock.value=data.reducedMotion?0:time}
  function dispose(group){const d=group?.userData.landscape;if(!d)return;d.materials.forEach(m=>m.dispose());d.textures.forEach(t=>t.dispose());d.geometries.forEach(g=>g.dispose());if(group.parent)group.parent.remove(group);delete group.userData.landscape}
  return {build,update,dispose};
})();
