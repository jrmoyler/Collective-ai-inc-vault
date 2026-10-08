#!/usr/bin/env python3
"""Extract compact CC0 Poly Haven botanical variants with original UVs/topology."""
import pathlib,json,struct,urllib.request,hashlib
ROOT=pathlib.Path(__file__).resolve().parents[1];OUT=ROOT/'web/assets/world/plants';AGENT='CollectiveAI-Vault-AssetBuild/1.0'
def read(url):return urllib.request.urlopen(urllib.request.Request(url,headers={'User-Agent':AGENT}),timeout=120).read()
def check(v):
 b=read(v['url'])
 if hashlib.md5(b).hexdigest()!=v['md5']:raise ValueError('Checksum mismatch')
 return b
assert 'CC0' in read('https://polyhaven.com/license').decode()
OUT.mkdir(parents=True,exist_ok=True)
for name,mesh,target in [('fern_02',2,1.8),('shrub_sorrel_01',2,1.1)]:
 files=json.loads(read('https://api.polyhaven.com/files/'+name));info=json.loads(read('https://api.polyhaven.com/info/'+name));src=files['gltf']['1k']['gltf'];j=json.loads(check(src));bi=next(v for k,v in src['include'].items()if k.endswith('.bin'));b=check(bi);primitive=j['meshes'][mesh]['primitives'][0]
 def acc(n):
  a=j['accessors'][n];v=j['bufferViews'][a['bufferView']];w={'SCALAR':1,'VEC2':2,'VEC3':3}[a['type']];c={5123:'H',5125:'I',5126:'f'}[a['componentType']];step=v.get('byteStride',struct.calcsize('<'+c)*w);start=v.get('byteOffset',0)+a.get('byteOffset',0);return [x for i in range(a['count'])for x in struct.unpack_from('<'+c*w,b,start+i*step)]
 xyz=acc(primitive['attributes']['POSITION']);low=[min(xyz[d::3])for d in range(3)];high=[max(xyz[d::3])for d in range(3)];scale=target/max(high[0]-low[0],high[2]-low[2]);offset=[(low[0]+high[0])/2,low[1],(low[2]+high[2])/2]
 xyz=[(v-offset[i%3])*scale for i,v in enumerate(xyz)];g={'version':1,'position':[round(x,6)for x in xyz],'normal':[round(x,6)for x in acc(primitive['attributes']['NORMAL'])],'uv':[round(x,6)for x in acc(primitive['attributes']['TEXCOORD_0'])],'index':acc(primitive['indices'])};(OUT/(name+'.json')).write_text(json.dumps(g,separators=(',',':'))+'\n')
 tex={}
 for ch,suffix in [('Diffuse','diff'),('nor_gl','normal'),('Alpha','alpha'),('arm','arm')]:
  item=files[ch]['1k']['jpg'];data=check(item);fn=name+'-'+suffix+'.jpg';(OUT/fn).write_bytes(data);tex[fn]={'url':item['url'],'md5':item['md5']}
 manifest={'asset':name,'authors':info['authors'],'source':'https://polyhaven.com/a/'+name,'license':'CC0-1.0','license_url':'https://polyhaven.com/license','model':{'url':src['url'],'md5':src['md5'],'buffer_url':bi['url'],'buffer_md5':bi['md5'],'mesh':mesh,'triangles':len(g['index'])//3,'conversion':'Center x/z, seat y=0, uniformly normalize width; retain topology, UVs and normals.'},'textures':tex};(OUT/(name+'-source.json')).write_text(json.dumps(manifest,indent=2)+'\n')
 print(name,len(g['index'])//3)
