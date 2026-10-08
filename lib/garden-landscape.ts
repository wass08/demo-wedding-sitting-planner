import * as THREE from 'three';
import {mergeGeometries} from 'three/addons/utils/BufferGeometryUtils.js';

const random=(seed:number)=>()=>{seed=(seed*16807)%2147483647;return(seed-1)/2147483646};
/** Curved, tapered wood. The taper follows the branch, including its final twig. */
function branch(points:THREE.Vector3[],radius:number,material:THREE.Material){
 const curve=new THREE.CatmullRomCurve3(points),steps=14,sides=8,frames=curve.computeFrenetFrames(steps,false),positions:number[]=[],uv:number[]=[],indices:number[]=[];
 for(let i=0;i<=steps;i++){const t=i/steps,c=curve.getPointAt(t),r=radius*(.08+.92*(1-t)**.85);for(let j=0;j<=sides;j++){const a=j/sides*Math.PI*2,p=c.clone().addScaledVector(frames.normals[i],Math.cos(a)*r).addScaledVector(frames.binormals[i],Math.sin(a)*r);positions.push(p.x,p.y,p.z);uv.push(j/sides,t*3);if(i<steps&&j<sides){const k=i*(sides+1)+j;indices.push(k,k+sides+1,k+1,k+1,k+sides+1,k+sides+2)}}}
 const g=new THREE.BufferGeometry();g.setAttribute('position',new THREE.Float32BufferAttribute(positions,3));g.setAttribute('uv',new THREE.Float32BufferAttribute(uv,2));g.setIndex(indices);g.computeVertexNormals();const mesh=new THREE.Mesh(g,material);mesh.castShadow=mesh.receiveShadow=true;return mesh;
}
function leafGeometry(){const g=new THREE.PlaneGeometry(2,1,1,4),p=g.attributes.position;for(let i=0;i<p.count;i++){const u=p.getX(i),v=p.getY(i)+.5;p.setXYZ(i,u*Math.sin(v*Math.PI)*.035,v*.19,.025*Math.sin(v*Math.PI)+u*u*.018)}g.computeVertexNormals();return g;}
/** An olive crown grows on branching limbs, with clustered leaf silhouettes and open pockets. */
export function oliveTree(seed:number,wood:THREE.Material,foliage:THREE.Material){
 const rnd=random(seed),group=new THREE.Group(),centers:THREE.Vector3[]=[];
 const trunk=[new THREE.Vector3(0,-.5,0),new THREE.Vector3(.13,.65,-.06),new THREE.Vector3(-.10,1.55,.09),new THREE.Vector3(.12,2.65,0)];group.add(branch(trunk,.25,wood));
 for(let i=0;i<5;i++){const a=i*2.4+rnd()*.45,reach=1.4+rnd()*.7,origin=new THREE.Vector3(-.04,1.1+i*.19,.02),tip=new THREE.Vector3(Math.cos(a)*reach,3.25+rnd()*.85,Math.sin(a)*reach);
 const limb=[origin,origin.clone().lerp(tip,.4).add(new THREE.Vector3(0,.45,0)),tip],limbCurve=new THREE.CatmullRomCurve3(limb);group.add(branch(limb,.11-i*.01,wood));centers.push(tip,tip.clone().multiplyScalar(.8).add(new THREE.Vector3(0,.45,0)));
 for(let j=0;j<5;j++){const angle=a+(j-2)*.52,start=limbCurve.getPoint(.45+j*.10),end=tip.clone().add(new THREE.Vector3(Math.cos(angle)*(.45+rnd()*.7),.20+rnd()*.65,Math.sin(angle)*(.45+rnd()*.7)));
 const sprig=[start,start.clone().lerp(end,.5).add(new THREE.Vector3(0,.2,0)),end],sprigCurve=new THREE.CatmullRomCurve3(sprig);group.add(branch(sprig,.035,wood));centers.push(end);
 for(let k=0;k<2;k++){const twig=end.clone().add(new THREE.Vector3((rnd()-.5)*.9,(rnd()-.5)*.6,(rnd()-.5)*.9));group.add(branch([sprigCurve.getPoint(.75),twig],.012,wood));centers.push(twig)}
 }}
 // One wood draw per tree; branches share a material and never move independently.
 const woodParts=group.children.map(child=>(child as THREE.Mesh).geometry),merged=mergeGeometries(woodParts);group.clear();woodParts.forEach(g=>g.dispose());const timber=new THREE.Mesh(merged,wood);timber.castShadow=timber.receiveShadow=true;group.add(timber);
 const leaves=new THREE.InstancedMesh(leafGeometry(),foliage,centers.length*50),o=new THREE.Object3D(),color=new THREE.Color();let index=0;
 for(const c of centers)for(let j=0;j<50;j++){const a=rnd()*Math.PI*2,r=Math.sqrt(rnd())*.65;o.position.set(c.x+Math.cos(a)*r,c.y+(rnd()-.5)*.75,c.z+Math.sin(a)*r);o.rotation.set((rnd()-.5)*2.8,rnd()*6.28,(rnd()-.5)*2.8);o.scale.setScalar(.8+rnd()*.65);o.updateMatrix();leaves.setMatrixAt(index,o.matrix);color.setHSL(.22+rnd()*.025,.16+rnd()*.14,.20+rnd()*.18);leaves.setColorAt(index++,color)}
 leaves.castShadow=leaves.receiveShadow=true;leaves.computeBoundingSphere();group.add(leaves);return group;
}
/** A contained hedge volume: leaf centers cannot extend beyond the stone trough. */
export function containedHedge(seed:number,material:THREE.Material){const rnd=random(seed),group=new THREE.Group(),geometry=leafGeometry(),leaves=new THREE.InstancedMesh(geometry,material,4200),o=new THREE.Object3D(),color=new THREE.Color();
 for(let i=0;i<4200;i++){const z=-9.6+rnd()*23.9,x=(rnd()-.5)*.65,top=1.14+.07*Math.sin(z*1.7);o.position.set(x,.76+rnd()*(top-.76),z);o.rotation.set(rnd()*Math.PI,rnd()*Math.PI*2,rnd()*Math.PI);o.scale.setScalar(.75+rnd()*.35);o.updateMatrix();leaves.setMatrixAt(i,o.matrix);color.setHSL(.24,.22,.12+rnd()*.13);leaves.setColorAt(i,color)}
 leaves.castShadow=leaves.receiveShadow=true;group.add(leaves);return group;}
