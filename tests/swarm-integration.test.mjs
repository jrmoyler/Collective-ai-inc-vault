// Integration guards for the ten-module upgrade: the assembled page parses as one script, every web-src module is
// bundled exactly once, the build is byte-stable, the document can never scroll sideways, and HUD panels stack.
import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import crypto from 'node:crypto';
import {execFileSync} from 'node:child_process';
const root=new URL('../',import.meta.url);
const read=p=>fs.readFileSync(new URL(p,root),'utf8');

test('every web-src module is bundled once, in load order, and the page script parses as one unit', () => {
 const build=read('scripts/build_web.py');
 const list=JSON.parse('['+build.match(/for f in \[([^\]]+)\] if _need/)[1]+']');
 assert.equal(new Set(list).size,list.length,'a module is listed twice');
 const mods=fs.readdirSync(new URL('web-src/',root)).filter(f=>f.endsWith('.js'));
 for(const f of mods)assert.ok(list.includes(f),f+' exists but is not bundled');
 const at=f=>list.indexOf(f);
 assert.ok(at('b_hud.js')<at('c_campus.js')&&at('b_buildings.js')<at('b_vfx.js')&&at('b_vfx.js')<at('c_campus.js'),'support modules load before the campus');
 assert.ok(at('d_live.js')<at('d_reader.js')&&at('g_journey.js')<at('g_ux.js')&&at('g_ux.js')<at('f_title.js')&&at('e_boot.js')===list.length-1);
 const html=read('web/index.html');
 const scripts=[...html.matchAll(/<script(?![^>]*src)[^>]*>([\s\S]*?)<\/script>/g)].map(m=>m[1]);
 const main=scripts.sort((a,b)=>b.length-a.length)[0];
 assert.doesNotThrow(()=>new Function(main),'duplicate top-level const/let across modules would throw here');
});

test('the build is deterministic', () => {
 const hash=()=>crypto.createHash('sha256').update(fs.readFileSync(new URL('web/index.html',root))).digest('hex');
 execFileSync('python3',['scripts/build_web.py'],{cwd:root});const a=hash();
 execFileSync('python3',['scripts/build_web.py'],{cwd:root});assert.equal(hash(),a);
});

test('the app shell clips its off-canvas reader instead of making the document scrollable', () => {
 const css=read('web-src/a_head.html');
 const app=css.match(/\n\.app\{[^}]*\}/)[0];
 assert.match(app,/position:relative/);
 assert.match(app,/overflow:clip/,'the translated reader (and the chip row) must not widen the document, or a click scrolls the whole page sideways');
});

test('the first-walk coach stacks under the live floor panel instead of covering it', () => {
 const ux=read('web-src/g_ux.js');
 assert.match(ux,/q\("#floor"\)[\s\S]{0,200}getBoundingClientRect\(\)/,'coach reads the floor panel rect');
 assert.match(ux,/new ResizeObserver\(place\)/,'coach follows the floor as it folds and grows');
 assert.match(ux,/coach\.hidden=false;if\(coach\._place\)coach\._place\(\)/,'coach is placed whenever it is shown');
 assert.doesNotMatch(ux.match(/\.ux-coach\{[^}]*\}/)[0],/overflow:hidden/,'a tall coach scrolls inside itself');
 const smoke=read('tests/browser-smoke.mjs');
 assert.match(smoke,/r\.overlaps\.length/,'the browser smoke fails on overlapping HUD panels');
 assert.match(smoke,/'vault\.quality',JSON\.stringify\(/,'the smoke stores quality the way store.get reads it');
});

test('a GPU context restore rebuilds the Sentinel environment map and repoints every metal at it', () => {
 const campus=read('web-src/c_campus.js'),sent=read('web-src/b_sentinel.js');
 const restore=campus.slice(campus.indexOf('function restoreGL(){'),campus.indexOf('function restoreGL(){')+1400);
 assert.match(restore,/SentinelMesh\.refreshEnvironment\(renderer,scene\)/);
 assert.match(sent,/function refreshEnvironment\(renderer,scene\)\{\s*const old=ENV,oldRT=ENV_RT;ENV=null;ENV_RT=null;const next=environment\(renderer\)/);
 assert.match(sent,/oldRT\.dispose\(\)/,'the whole PMREM target is released (review fix)');assert.match(sent,/ENV_USERS\.forEach\(repoint\)/);
 assert.match(sent,/m\.envMap===old\)\{m\.envMap=next;m\.needsUpdate=true\}/);
 assert.match(sent,/environment,refreshEnvironment,/);
});

test('without WebGL the time button still moves the HUD sky phase', () => {
 const campus=read('web-src/c_campus.js');
 const cycle=campus.slice(campus.indexOf('function cycleTime(){'),campus.indexOf('function shift('));
 assert.match(cycle,/if\(!C\.ok\)\{[^}]*HUD\.phase\(/);
});
