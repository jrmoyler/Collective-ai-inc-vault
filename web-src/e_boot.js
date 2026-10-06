// ---------- boot: sign in, load the live vault, raise the campus
(async function boot(){
  const gate=$("#gate");
  async function enter(){
    $("#loading").textContent="Loading the vault";
    await Live.loadAll();
    buildTree("");
    Campus.boot();updateCrumb();
    if(!Campus.ok()){open(byName.get("🏠 Home"));sheet.full=true;syncSheet()}
    Live.syncMarkers();Live.pushAgents();Live.subscribe();Live.drawFloor();setTimeout(Live.brief,2500);
    const want=decodeURIComponent(location.hash.slice(1));if(want&&byName.get(want))open(byName.get(want));
  }
  try{if(await Live.session()&&await Live.member()){await enter();return}}catch(e){console.warn(e)}
  $("#loading").textContent="Sign in";gate.hidden=false;setTimeout(()=>$("#gName").focus(),50);
  $("#gateForm").addEventListener("submit",async e=>{
    e.preventDefault();$("#gErr").textContent="";const b=$("#gGo");b.disabled=true;b.textContent="Checking…";
    try{const m=await Live.join($("#gName").value.trim(),$("#gPass").value);if(!m)throw new Error("Signed in, but not on the team list.");gate.hidden=true;await enter()}
    catch(err){$("#gErr").textContent=err.message||String(err);b.disabled=false;b.textContent="Enter the campus"}
  });
})();
