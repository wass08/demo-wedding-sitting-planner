import * as THREE from 'three';

/** A broad, cupped petal with a rounded perimeter and a gently rolled tip. */
export function rosePetal(){
 const g=new THREE.PlaneGeometry(2,1,8,10),p=g.attributes.position;
 for(let i=0;i<p.count;i++){
  const u=p.getX(i),v=p.getY(i)+.5,angle=u*Math.pow(Math.sin(v*Math.PI*.73),.55)*.80;
  const radius=.018+.115*v,edge=Math.pow(v,5),scallop=.006*Math.cos(u*Math.PI*3)*edge;
  p.setXYZ(i,Math.sin(angle)*radius,.075*Math.sin(v*1.6)-.030*edge+.015*u*u*v+scallop,Math.cos(angle)*radius);
 }
 g.computeVertexNormals();return g;
}

/** Curved shell petals form a rounded head without dozens of intersecting sheets. */
export function gardenRose(material:THREE.Material,seed:number){
 const group=new THREE.Group();
 for(const [ring,count,scale,lift] of [[0,7,1,0],[1,5,.68,.023],[2,4,.37,.046]]){
  for(let i=0;i<count;i++){
   const petal=new THREE.Mesh(rosePetal(),material),a=i/count*Math.PI*2+ring*.65+seed*.12;
   petal.rotation.y=a;petal.rotation.z=.035*Math.sin(i*3+seed);petal.scale.setScalar(scale);
   petal.position.y=lift;group.add(petal);
  }
 }
 const heart=new THREE.Mesh(new THREE.SphereGeometry(.012,8,6),material);heart.position.y=.077;heart.scale.set(1,1.15,1);group.add(heart);
 return group;
}

/** Long oval leaves curve around a central vein instead of forming flat triangles. */
export function oliveLeaf(length=.16,width=.035){
 const g=new THREE.PlaneGeometry(2,1,6,10),p=g.attributes.position;
 for(let i=0;i<p.count;i++){const u=p.getX(i),v=p.getY(i)+.5;
 p.setXYZ(i,u*Math.pow(Math.sin(v*Math.PI),.75)*width,length*v,.012*Math.sin(v*Math.PI)+.008*u*u);}
 g.computeVertexNormals();return g;
}

/** One tapered, irregular crown, rather than disconnected spherical tree lobes. */
export function cypressCrown(height:number,radius:number,seed:number){
 const profile:THREE.Vector2[]=[];for(let i=0;i<=24;i++){const v=i/24;profile.push(new THREE.Vector2(Math.max(.006,radius*Math.pow(Math.sin(Math.PI*v),.55)*(1-.38*v)),v*height));}
 const g=new THREE.LatheGeometry(profile,28),p=g.attributes.position;
 for(let i=0;i<p.count;i++){const x=p.getX(i),y=p.getY(i),z=p.getZ(i),a=Math.atan2(z,x),v=y/height;
 const irregular=1+.06*Math.sin(a*11+v*39+seed)+.035*Math.sin(a*19-v*53);
 p.setXYZ(i,x*irregular+.035*Math.sin(v*5+seed),y,z*irregular);}
 g.computeVertexNormals();return g;
}
