// ---------- boot: sign in, load the live vault, raise the campus
(async function boot(){
  const gate=$("#gate");
  // Resumable: a failed step (usually the note load on a bad network) shows a retry card (g_ux.js) instead of a
  // dead end behind the hidden sign-in gate; "Try again" resumes from the step that failed.
  // Each step has its own flag, so a retry resumes at the step that failed and never re-runs one that finished
  // (a second Campus.boot would build a second renderer on the same canvas; a second subscribe would double the feed).
  const done={notes:false,city:false,frame:false,ui:false,live:false,sub:false};
  async function enter(){
    try{await enterSteps()}
    catch(e){console.warn(e);if(typeof UX!=="undefined")UX.fatal(e,enter);else{$("#loading").textContent="The vault did not load. Reload the page to try again."}}
  }
  async function enterSteps(){
    if(!done.notes){
    // UI hook: named loading steps with page progress (b_hud.js); plain text if the HUD module is absent
    if(window.HUD)await HUD.stage("notes","Loading the vault");else $("#loading").textContent="Loading the vault";
    await Live.loadAll();
    buildTree("");done.notes=true}
    if(!done.city){
    if(window.HUD)await HUD.stage("city","Raising the city");
    if(typeof UX!=="undefined")UX.ensureQuality(); // first-run device read when the title did not run
    Campus.boot();done.city=true}
    if(!done.frame){
    // one vector reused every frame (no per-frame allocation for the audio listener)
    const forward=new THREE.Vector3();
    if(Campus.onFrame)Campus.onFrame(()=>{const c=Campus.camera();if(!c)return;c.getWorldDirection(forward);VaultAudio.listener(c.position,forward);const p=Campus.position();if(p.walking){const old=window._vaultLastAudioPos;if(old&&Math.hypot(p.x-old.x,p.z-old.z)>.15)VaultAudio.footstep([p.x,c.position.y-1.6,p.z]);window._vaultLastAudioPos=p}else window._vaultLastAudioPos=null});
    done.frame=true}
    if(!done.ui){
    updateCrumb();
    Journey.boot();
    // No chip row (no WebGL): a floating navigator styled by .navfab in the mobile HUD lanes; its count follows Districts.all
    if(!document.getElementById("districtNavigator")){const openNav=()=>Journey.show(cur?Districts.worldTop(cur):undefined);if(window.HUD)HUD.navFallback(openNav);else{const b=document.createElement("button");b.id="districtNavigator";b.className="btn navfab";b.textContent=Districts.all.length+" districts";b.setAttribute("aria-label","Open district navigator");b.onclick=openNav;document.getElementById("stage").append(b)}}
    if(window.HUD)HUD.syncDistricts();
    // UX: Go-to palette button, breadcrumbs, first walk, hints and the offline pill; wired before the first open below
    if(typeof UX!=="undefined")UX.afterEnter();
    done.ui=true;
    if(!Campus.ok()){open(byName.get("🏠 Home"));sheet.full=true;syncSheet()}
    }
    if(!done.live){
    Live.syncMarkers();Live.pushAgents();
    if(!done.sub){Live.subscribe();done.sub=true}
    Live.drawFloor();setTimeout(Live.brief,2500);
    // Momentum chip: chain, runs and stakes (g_momentum.js)
    if(typeof Momentum!=="undefined")Momentum.start();
    done.live=true;
    const want=decodeURIComponent(location.hash.slice(1));if(want&&byName.get(want))open(byName.get(want));
    }
  }
  // title screen and opening cutscene first; it resolves when the player chooses "Enter the Vault"
  try{if(typeof Title!=="undefined")await Title.start()}catch(e){console.warn(e);document.getElementById("title")?.remove();const app=document.getElementById("app");if(app){app.inert=false;app.removeAttribute("aria-hidden")}}
  try{if(await Live.session()&&await Live.member()){await enter();return}}catch(e){console.warn(e)}
  if(window.HUD)HUD.stage("session","Sign in");else $("#loading").textContent="Sign in";gate.hidden=false;setTimeout(()=>$("#gName").focus(),50);
  $("#gateForm").addEventListener("submit",async e=>{
    e.preventDefault();$("#gErr").textContent="";const b=$("#gGo");b.disabled=true;b.textContent="Checking…";
    try{const m=await Live.join($("#gName").value.trim(),$("#gPass").value);if(!m)throw new Error("Signed in, but not on the team list.");gate.hidden=true;await enter()}
    catch(err){$("#gErr").textContent=err.message||String(err);b.disabled=false;b.textContent="Enter the campus"}
  });
})();

