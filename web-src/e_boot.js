// ---------- boot: sign in, load the live vault, raise the campus
(async function boot(){
  const gate=$("#gate");
  async function enter(){
    $("#loading").textContent="Loading the vault";
    await Live.loadAll();
    buildTree("");
    Campus.boot();updateCrumb();
    Journey.boot();
    if(!document.getElementById("districtNavigator")){const b=document.createElement("button");b.id="districtNavigator";b.className="btn";b.textContent=Districts.all.length+" districts";b.setAttribute("aria-label","Open district navigator");b.style.cssText="position:absolute;left:16px;bottom:86px;z-index:22";b.onclick=()=>Journey.show(cur?Districts.worldTop(cur):undefined);document.getElementById("stage").append(b)}
    if(Campus.onFrame)Campus.onFrame(()=>{const c=Campus.camera();if(!c)return;const forward=new THREE.Vector3();c.getWorldDirection(forward);VaultAudio.listener(c.position,forward);const p=Campus.position();if(p.walking){const old=window._vaultLastAudioPos;if(old&&Math.hypot(p.x-old.x,p.z-old.z)>.15)VaultAudio.footstep([p.x,c.position.y-1.6,p.z]);window._vaultLastAudioPos=p}else window._vaultLastAudioPos=null});
    if(!Campus.ok()){open(byName.get("🏠 Home"));sheet.full=true;syncSheet()}
    Live.syncMarkers();Live.pushAgents();Live.subscribe();Live.drawFloor();setTimeout(Live.brief,2500);
    const want=decodeURIComponent(location.hash.slice(1));if(want&&byName.get(want))open(byName.get(want));
  }
  // title screen and opening cutscene first; it resolves when the player chooses "Enter the Vault"
  try{if(typeof Title!=="undefined")await Title.start()}catch(e){console.warn(e)}
  try{if(await Live.session()&&await Live.member()){await enter();return}}catch(e){console.warn(e)}
  $("#loading").textContent="Sign in";gate.hidden=false;setTimeout(()=>$("#gName").focus(),50);
  $("#gateForm").addEventListener("submit",async e=>{
    e.preventDefault();$("#gErr").textContent="";const b=$("#gGo");b.disabled=true;b.textContent="Checking…";
    try{const m=await Live.join($("#gName").value.trim(),$("#gPass").value);if(!m)throw new Error("Signed in, but not on the team list.");gate.hidden=true;await enter()}
    catch(err){$("#gErr").textContent=err.message||String(err);b.disabled=false;b.textContent="Enter the campus"}
  });
})();

