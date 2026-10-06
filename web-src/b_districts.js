// Knowledge districts describe the existing folder structure, not the six physical campus districts.
const Districts = (() => {
  const rows = [
    ['00 - MOCs','Atlas','Find the company map and follow the source notes.','navigation',['Read a hub','Follow a linked source','Check unresolved questions']],
    ['01 - Divisions','Division council','Read division charters and operating boundaries.','council',['Read the charter','Check operating status','Find the director']],
    ['02 - ZenFlow','Agent foundry','Work from current agent routing and orchestration notes.','foundry',['Check model routing','Read an agent protocol','Inspect an open task']],
    ['03 - Products','Product workshop','Trace products from specification to delivery.','workshop',['Read a specification','Check dependencies','Find the next delivery task']],
    ['04 - People','Team commons','Find people, responsibilities and collaboration context.','commons',['Read a profile','Check responsibilities','Find the relevant team note']],
    ['05 - Operations','Control room','Use procedures and task records to run the company.','control',['Read a procedure','Review open work','Connect your work tool']],
    ['06 - Finance','Finance chamber','Review financial records and distinguish targets from actuals.','chamber',['Read a financial source','Check assumptions and date','Inspect a finance task']],
    ['07 - Brand','Brand atelier','Use the voice, visual standards and approved brand records.','atelier',['Read a brand standard','Check source assets','Review a brand task']],
    ['08 - Research','Research observatory','Find evidence, research questions and dated findings.','observatory',['Read a research note','Follow its sources','Check what remains unknown']],
    ['09 - Projects','Delivery yard','Find project state, blockers and next actions.','yard',['Read a project record','Review linked tasks','Connect your delivery tool']],
    ['10 - Archive','Archive stacks','Consult historical records while preserving superseded context.','stacks',['Read the archive record','Check superseded notices','Follow the replacement source']],
    ['11 - Physical AI','Physical systems lab','Explore robotics, hardware and physical system records.','lab',['Read a system record','Check validation evidence','Inspect a hardware task']],
    ['Daily','Daily log','Read dated work records and maintain continuity.','log',['Read the latest entry','Check recent changes','Review today’s work']]
  ];
  const all = Object.freeze(rows.map(([folder,title,purpose,theme,kit],index)=>Object.freeze({id:index,folder,title,purpose,theme,kit:Object.freeze(kit)})));
  const top = note => (note.folder || '').split('/')[0];
  function notesFor(folder,notes,query='') {
    const q=query.trim().toLowerCase();
    return notes.filter(n=>top(n)===folder && (!q || [n.name,n.body||'',...(n.fm?.tags||[])].join(' ').toLowerCase().includes(q)))
      .sort((a,b)=>a.name.localeCompare(b.name,undefined,{numeric:true}));
  }
  function tasksFor(folder,notes,tasks) {
    const names=new Set(notesFor(folder,notes).map(n=>n.name));
    return tasks.filter(t=>t.status!=='done' && names.has(t.note)).sort((a,b)=>({high:0,medium:1,low:2}[a.priority]??3)-({high:0,medium:1,low:2}[b.priority]??3));
  }
  function completedWork(folder,notes,tasks) {
    const names=new Set(notesFor(folder,notes).map(n=>n.name));
    return tasks.filter(t=>t.status==='done' && t.done_at && String(t.result||'').trim() && names.has(t.note));
  }
  function landmarks(folder,notes) {
    return notesFor(folder,notes).sort((a,b)=>Number(b.fm?.type==='moc')-Number(a.fm?.type==='moc') || ((b.out?.size||0)+(b.back?.size||0))-((a.out?.size||0)+(a.back?.size||0))).slice(0,6);
  }
  return Object.freeze({all,top,get:folder=>all.find(d=>d.folder===folder),notesFor,tasksFor,completedWork,landmarks});
})();
