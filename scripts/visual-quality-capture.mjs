// Canonical evidence from the running vault and its real mirrored-note layout.
// Invoked by tests/browser-smoke.mjs. No fabricated scene or production writes.
import fs from 'node:fs';
import path from 'node:path';
import {execFileSync} from 'node:child_process';

export async function captureVisualQuality(page,outDir,{video=false,only=null}={}){
 fs.mkdirSync(outDir,{recursive:true});
 const evidence=[];
 await page.evaluate(()=>{Campus.skipIntro();Campus.debug().setClock(15);Campus.debug().setWeather('clear');Campus.photo(true)});
 const hide=await page.addStyleTag({content:'#photoBar,#toast{visibility:hidden!important}'});
 const allShots=await page.evaluate(()=>{
  const B=Campus.buildings().filter(Boolean),guide=Guides.list().find(g=>g.top==='01 - Divisions')||Guides.list()[0];
  const world=Campus.world().WORLD;
  const perimeterScore=b=>{const dx=b.door.x-b.cx,dz=b.door.z-b.cz,len=Math.hypot(dx,dz)||1,r=Math.hypot(b.cx,b.cz)||1;return Math.max(Math.abs(b.cx)/(world.W/2),Math.abs(b.cz)/(world.H/2))*100+(dx*b.cx+dz*b.cz)/len/r*10-Math.abs(b.h-15)*.1};
  const candidates=B.filter(b=>b.door&&b.h>=7&&b.h<28).sort((a,b)=>perimeterScore(b)-perimeterScore(a)||a.id-b.id);
  const clear=(target,eye,exclude)=>{
   for(let i=1;i<=24;i++){const f=i/24,x=target[0]+(eye[0]-target[0])*f,y=target[1]+(eye[1]-target[1])*f,z=target[2]+(eye[2]-target[2])*f;
    if(B.some(o=>o!==exclude&&o.tiers.some(t=>y>t.y0-1&&y<t.y1+1&&Math.abs(x-t.x)<t.w/2+.8&&Math.abs(z-t.z)<t.d/2+.8)))return false;
   }return true;
  };
  let b=candidates[0]||B[0],yaw=0,distance=25;
  find:for(const c of candidates){const a=Math.atan2(c.door.x-c.cx,c.door.z-c.cz),dist=Math.max(24,c.fw*1.9),y=Math.min(7,c.h*.45);
   for(const offset of [.22,-.22,0]){const angle=a+offset,eye=[c.cx+Math.sin(angle)*dist,y+dist*.12,c.cz+Math.cos(angle)*dist];
    if([-1,0,1].every(side=>clear([c.cx+Math.cos(angle)*c.fw*.5*side,y,c.cz-Math.sin(angle)*c.fw*.5*side],eye,c))){b=c;yaw=angle;distance=dist;break find}
   }
  }
  const agent=Campus.agentPos('codex');
  const trees=Campus.scene().getObjectByName('Branching hardwood trunks');
  const m=new THREE.Matrix4(),anchors=[];
  if(trees)for(let i=0;i<trees.count;i++){trees.getMatrixAt(i,m);const x=m.elements[12],y=m.elements[13],z=m.elements[14],base=VaultTerrain.height(x,z,Campus.world().WORLD,Campus.world().GSIDE);if(Math.abs(y-base)<.06&&m.elements[5]>1.5)anchors.push({x,y,z})}
  const side=Campus.world().GSIDE;
  // Choose a grove at the waterfront with the camera looking into the planted city.
  const tree=anchors.sort((a,b)=>Math.abs(a.z-(side/2-9))-Math.abs(b.z-(side/2-9))||Math.abs(a.x)-Math.abs(b.x))[0];
  const shots=[{name:'architecture-close',target:[b.cx,Math.min(7,b.h*.45),b.cz],distance,pitch:.12,yaw,subject:NOTES[b.id]?.name},
   {name:'architecture-street',eye:[b.cx+Math.sin(yaw)*distance,2.2,b.cz+Math.cos(yaw)*distance],target:[b.cx,Math.min(5,b.h*.3),b.cz],subject:NOTES[b.id]?.name}];
  if(tree)shots.push({name:'garden-ground',eye:[tree.x+4,tree.y+2.1,tree.z+10],target:[tree.x,tree.y+3.1,tree.z-4],subject:'Existing planted waterfront grove'});
  if(agent)shots.push({name:'sentinel-close',target:[agent[0],agent[1]+.2,agent[2]],distance:7.5,pitch:.06,yaw:.24,subject:'Codex live-presence fixture'});
  if(guide)shots.push({name:'warden-close',target:[guide.x,1.8,guide.z],distance:7.5,pitch:.025,yaw:.32,subject:guide.top});
  return shots;
 });
 const shots=only?allShots.filter(s=>only.split(',').includes(s.name)):allShots;
 if(!shots.length)throw new Error('No requested camera subjects exist in the actual scene: '+only);
 async function aim(shot,angleOffset=0){
  await page.evaluate(({shot,angleOffset})=>{
   let [x,y,z]=shot.target,dist=shot.distance,pitch=shot.pitch,yaw=shot.yaw+angleOffset;
   if(shot.eye){const [ex,ey,ez]=shot.eye;dist=Math.hypot(ex-x,ey-y,ez-z);pitch=Math.asin((ey-y)/dist);yaw=Math.atan2(ex-x,ez-z)+angleOffset}
   Campus.debug().setCamera({tx:x,ty:y,tz:z,dist,pitch,yaw});Campus.pause(false);
  },{shot,angleOffset});
  await page.evaluate(()=>new Promise(resolve=>requestAnimationFrame(()=>requestAnimationFrame(()=>requestAnimationFrame(resolve)))));
 }
 for(const shot of shots){
  console.log('Capturing scene:',shot.name);
  await aim(shot);await page.waitForTimeout(450);
  await page.evaluate(()=>Campus.pause(true));
  const file=shot.name+'.png';await page.screenshot({path:path.join(outDir,file),timeout:90000});
  const actual=await page.evaluate(()=>{const garden=Campus.scene().getObjectByName('Living gardens')?.userData.landscape;return {camera:Campus.camera().position.toArray(),target:{...Campus.debug().cam},performance:Campus.perf(),landscape:garden?{counts:garden.counts,rockAsset:garden.rockAsset,rockTriangles:garden.rockTriangles}:null}});
  evidence.push({...shot,file,...actual});
 }
 let videoResult=null;
 if(video&&shots.length){
  const frames=path.join(outDir,'camera-frames');fs.mkdirSync(frames,{recursive:true});
  let n=0;
  for(const shot of shots.filter(s=>['architecture-close','garden-ground','warden-close'].includes(s.name))){
   console.log('Capturing motion:',shot.name);
   for(let i=0;i<4;i++){await aim(shot,(i/3-.5)*.28);await page.evaluate(()=>Campus.pause(true));await page.screenshot({path:path.join(frames,String(n++).padStart(4,'0')+'.jpg'),type:'jpeg',quality:90,timeout:90000})}
  }
  const file=path.join(outDir,'world-camera-study.mp4');
  try{execFileSync('ffmpeg',['-y','-framerate','2','-i',path.join(frames,'%04d.jpg'),'-frames:v',String(n),'-c:v','libx264','-pix_fmt','yuv420p','-movflags','+faststart',file],{stdio:'pipe'});videoResult={file:path.basename(file),frames:n,fps:2,method:'Offline camera study assembled from actual browser renders; not a real-time performance recording'};fs.rmSync(frames,{recursive:true})}
  catch(error){videoResult={error:String(error.message),frames:n}}
 }
 fs.writeFileSync(path.join(outDir,only?'visual-cameras-'+only.replaceAll(',','-')+'.json':'visual-cameras.json'),JSON.stringify({fixture:'Real mirrored notes with local mocked session/presence',renderer:'Production scene and normal render loop, Chromium software WebGL',clock:15,weather:'clear',shots:evidence,video:videoResult},null,2));
 await hide.evaluate(el=>el.remove());await page.evaluate(()=>{Campus.photo(false);Campus.overview();Campus.pause(false)});
 return {shots:evidence.length,video:videoResult};
}
