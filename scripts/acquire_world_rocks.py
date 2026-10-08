#!/usr/bin/env python3
"""Acquire one CC0 Poly Haven scan; preserve UVs, normals and indexed topology.
Run from repository root with Python 3. No Blender or runtime glTF loader needed.
"""
import hashlib,json,pathlib,struct,urllib.request
ROOT=pathlib.Path(__file__).resolve().parents[1]
OUT=ROOT/'web/assets/world/rocks'
AGENT='CollectiveAI-Vault-AssetBuild/1.0'
def read(url):
    return urllib.request.urlopen(urllib.request.Request(url,headers={'User-Agent':AGENT}),timeout=120).read()
def checked(item):
    data=read(item['url'])
    if hashlib.md5(data).hexdigest()!=item['md5']:raise ValueError('Source checksum mismatch')
    return data
files=json.loads(read('https://api.polyhaven.com/files/rock_moss_set_01'))
info=json.loads(read('https://api.polyhaven.com/info/rock_moss_set_01'))
license_url='https://polyhaven.com/license'
license_page=read(license_url).decode()
if 'CC0' not in license_page:raise ValueError('License verification failed')
source=files['gltf']['1k']['gltf'];gltf=json.loads(checked(source))
buffer_item=next(v for k,v in source['include'].items() if k.endswith('.bin'))
binary=checked(buffer_item)
primitive=gltf['meshes'][2]['primitives'][0]
def accessor(index):
    a=gltf['accessors'][index];v=gltf['bufferViews'][a['bufferView']]
    width={'SCALAR':1,'VEC2':2,'VEC3':3}[a['type']]
    char={5123:'H',5125:'I',5126:'f'}[a['componentType']]
    step=v.get('byteStride',struct.calcsize('<'+char)*width)
    start=v.get('byteOffset',0)+a.get('byteOffset',0)
    return [n for i in range(a['count']) for n in struct.unpack_from('<'+char*width,binary,start+i*step)]
p=accessor(primitive['attributes']['POSITION']);normal=accessor(primitive['attributes']['NORMAL']);uv=accessor(primitive['attributes']['TEXCOORD_0']);index=accessor(primitive['indices'])
# Keep scanned dimensions and proportions; only seat the rock on y=0.
floor=min(p[1::3]);p[1::3]=[y-floor for y in p[1::3]]
geometry={'version':1,'source':'rock_moss_set_01_rock03','position':[round(x,6) for x in p],'normal':[round(x,6) for x in normal],'uv':[round(x,6) for x in uv],'index':index}
OUT.mkdir(parents=True,exist_ok=True)
(OUT/'moss-rock.json').write_text(json.dumps(geometry,separators=(',',':'))+'\n')
outputs={}
for channel,name in [('Diffuse','moss-rock-color.jpg'),('nor_gl','moss-rock-normal.jpg'),('Rough','moss-rock-roughness.jpg')]:
    item=files[channel]['1k']['jpg'];data=checked(item);(OUT/name).write_bytes(data);outputs[name]={'url':item['url'],'md5':item['md5'],'bytes':len(data)}
manifest={'asset':'Rock Moss Set 01','author':info['authors'],'source':'https://polyhaven.com/a/rock_moss_set_01','license':'CC0-1.0','license_url':license_url,'metadata_url':'https://api.polyhaven.com/info/rock_moss_set_01','files_url':'https://api.polyhaven.com/files/rock_moss_set_01','model':{'url':source['url'],'md5':source['md5'],'buffer_url':buffer_item['url'],'buffer_md5':buffer_item['md5'],'source_mesh':2,'triangles':len(index)//3,'vertices':len(p)//3,'modification':'Extract rock03, shift minimum y to zero, round attributes to six decimals; original topology/UVs/normals retained.'},'textures':outputs}
(OUT/'source.json').write_text(json.dumps(manifest,indent=2)+'\n')
print(json.dumps({'triangles':len(index)//3,'bytes':sum(p.stat().st_size for p in OUT.iterdir())}))
