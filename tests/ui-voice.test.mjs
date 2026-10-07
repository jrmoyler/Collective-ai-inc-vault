// JR Voice Standard on app copy: no banned words in user-visible strings, and no hardcoded district counts that can
// drift from the live Districts catalog. Comments are code notes, not copy, and are skipped.
import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
const BANNED=['delve','leverage','robust','seamless','transformative','empower','elevate','game-changing','cutting-edge','innovative','tapestry'];
const banned=new RegExp('\\b('+BANNED.map(w=>w.replace('-','[- ]')).join('|')+')[a-z]*\\b','i');
const COUNT=/\b(\d+|nine|ten|eleven|twelve|nineteen|twenty|thirty)\s+districts?\b/i;
function stripComments(src){
 return src.replace(/\/\*[\s\S]*?\*\//g,m=>m.replace(/[^\n]/g,' ')).split('\n').map(l=>l.replace(/(^|[^:\\'"`\w])\/\/.*$/,'$1')).join('\n');
}
function strings(src){
 const out=[],re=/(["'`])((?:\\.|(?!\1)[^\\\n]|(?<=`[^`]*)\n)*)\1/g;let m;
 while((m=re.exec(src)))out.push({text:m[2],line:src.slice(0,m.index).split('\n').length});
 return out;
}
function copyOf(file){
 const src=fs.readFileSync(file,'utf8');
 if(file.endsWith('.html')){
  // visible text and attribute values in the markup; inline scripts and styles are scanned as code
  const html=src.replace(/<style[\s\S]*?<\/style>/g,s=>s.replace(/[^\n]/g,' ')).replace(/<!--[\s\S]*?-->/g,s=>s.replace(/[^\n]/g,' '));
  return html.split('\n').map((t,i)=>({text:t.replace(/<script[\s\S]*?<\/script>/g,''),line:i+1}));
 }
 return strings(stripComments(src));
}
const files=fs.readdirSync('web-src').filter(f=>/\.(js|html)$/.test(f)&&f!=='sentinel_reference.html').map(f=>'web-src/'+f);
test('app copy uses none of the banned words',()=>{
 const hits=[];for(const f of files)for(const s of copyOf(f)){const m=s.text.match(banned);if(m)hits.push(`${f}:${s.line} "${m[0]}"`)}
 assert.deepEqual(hits,[],'JR Voice Standard: rewrite these strings');
});
test('app copy does not hardcode a district count',()=>{
 const hits=[];for(const f of files)for(const s of copyOf(f)){const m=s.text.match(COUNT);if(m)hits.push(`${f}:${s.line} "${m[0]}"`)}
 assert.deepEqual(hits,[],'derive counts from Districts or DIST.length instead');
});
test('the lint itself catches what it should and ignores comments',()=>{
 assert.equal(strings(stripComments('// a seamless loop\nconst a="ok";')).some(s=>banned.test(s.text)),false);
 assert.equal(strings(stripComments('toast("A seamless ride")')).some(s=>banned.test(s.text)),true);
 assert.equal(strings(stripComments('el.textContent=`Walk all 19 districts`')).some(s=>COUNT.test(s.text)),true);
 assert.equal(strings(stripComments('const u="https://x.dev/robust";')).some(s=>banned.test(s.text)),true);
});
