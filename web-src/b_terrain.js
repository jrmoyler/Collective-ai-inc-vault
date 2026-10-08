// Sculpted landscape surrounding the working city. City foundations and avenue
// approaches remain level; a shared height sampler keeps planting and walking grounded.
const VaultTerrain=(()=>{
  const smooth=(a,b,x)=>{const t=Math.max(0,Math.min(1,(x-a)/(b-a)));return t*t*(3-2*t)};
  const noise=(x,z)=>{
    const ix=Math.floor(x),iz=Math.floor(z),fx=x-ix,fz=z-iz,u=fx*fx*(3-2*fx),v=fz*fz*(3-2*fz);
    const h=(a,b)=>{const n=Math.sin(a*127.1+b*311.7)*43758.5453;return n-Math.floor(n)};
    return (h(ix,iz)*(1-u)+h(ix+1,iz)*u)*(1-v)+(h(ix,iz+1)*(1-u)+h(ix+1,iz+1)*u)*v;
  };
  function height(x,z,world,side){
    if(!world||!side)return 0;
    const outside=Math.max(Math.abs(x)-world.W/2,Math.abs(z)-world.H/2);
    const shore=side/2-Math.max(Math.abs(x),Math.abs(z));
    const edge=smooth(10,30,outside)*smooth(12,26,shore);
    const avenue=smooth(5,13,Math.min(Math.abs(x),Math.abs(z)));
    return edge*avenue*(1.2+noise(x*.027,z*.027)*5.2+noise(x*.075+31,z*.075-13)*1.1);
  }
  function geometry(T,side,world,high){
    const segments=high?256:160,g=new T.PlaneGeometry(side,side,segments,segments);g.rotateX(-Math.PI/2);
    const p=g.attributes.position;for(let i=0;i<p.count;i++)p.setY(i,height(p.getX(i),p.getZ(i),world,side));
    g.computeVertexNormals();return g;
  }
  return {height,geometry};
})();
