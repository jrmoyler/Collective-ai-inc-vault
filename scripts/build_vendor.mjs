import { build } from 'esbuild';
import { mkdir, copyFile } from 'node:fs/promises';
await mkdir('web/vendor', { recursive: true });
await build({ entryPoints: ['scripts/vendor-entry.mjs'], outfile: 'web/vendor/vault-libraries.js', bundle: true, minify: true, format: 'iife', globalName: 'VaultLibraries', target: 'es2020', legalComments: 'linked' });
await copyFile('node_modules/three/build/three.min.js', 'web/vendor/three-r128.min.js');

await build({ entryPoints: ['scripts/supabase-entry.mjs'], outfile: 'web/vendor/supabase.js', bundle: true, minify: true, format: 'iife', globalName: 'supabase', target: 'es2020', legalComments: 'linked' });

const postFiles=['shaders/CopyShader.js','shaders/LuminosityHighPassShader.js','postprocessing/EffectComposer.js','postprocessing/RenderPass.js','postprocessing/ShaderPass.js','postprocessing/UnrealBloomPass.js'];
for(const file of postFiles){await mkdir('web/vendor/three/examples/js/'+file.split('/')[0],{recursive:true});await copyFile('node_modules/three/examples/js/'+file,'web/vendor/three/examples/js/'+file)}
const fonts=[['space-grotesk','Space Grotesk',[500,600,700]],['ibm-plex-sans','IBM Plex Sans',[400,500,600]],['jetbrains-mono','JetBrains Mono',[400,500]]];
await mkdir('web/vendor/fonts',{recursive:true});let css='';
for(const [pkg,family,weights] of fonts)for(const weight of weights){const file=`${pkg}-latin-${weight}-normal.woff2`;await copyFile(`node_modules/@fontsource/${pkg}/files/${file}`,`web/vendor/fonts/${file}`);css+=`@font-face{font-family:'${family}';font-style:normal;font-weight:${weight};font-display:swap;src:url('fonts/${file}') format('woff2');}\n`;}
await copyFile('node_modules/@fontsource/ibm-plex-sans/files/ibm-plex-sans-latin-400-italic.woff2','web/vendor/fonts/ibm-plex-sans-latin-400-italic.woff2');
css+=`@font-face{font-family:'IBM Plex Sans';font-style:italic;font-weight:400;font-display:swap;src:url('fonts/ibm-plex-sans-latin-400-italic.woff2') format('woff2');}\n`;
const {writeFile}=await import('node:fs/promises');await writeFile('web/vendor/fonts.css',css);
for(const [pkg] of fonts)await copyFile(`node_modules/@fontsource/${pkg}/LICENSE`,`web/vendor/fonts/${pkg}-LICENSE.txt`);
for(const [from,to] of [['three/LICENSE','three-LICENSE.txt'],['animejs/LICENSE.md','anime-LICENSE.txt'],['@babylonjs/core/license.md','babylon-LICENSE.txt'],['@supabase/supabase-js/LICENSE','supabase-LICENSE.txt']])await copyFile('node_modules/'+from,'web/vendor/'+to);
