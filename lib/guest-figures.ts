import * as THREE from 'three';
import {mergeGeometries} from 'three/addons/utils/BufferGeometryUtils.js';
import {seatingTables,seatsAt,COUPLE_TABLE,type Plan,type Table} from './plan';
import {chairPosition} from './seat-position';
import {receptionGuest} from './guest-profile';
import {figureKind,figureSize,usesHighChair} from './guest-appearance';
export function guestChair(t:Table,i:number){return t.id===COUPLE_TABLE.id?{x:i===0?-.68:.68,z:-8.64,angle:Math.PI,y:.225,scale:1}:{...chairPosition(t,i),y:0,scale:1.2};}
type Kind='neutral'|'masculine'|'feminine'|'baby';
type Person={id:string;name:string;table:string;seat:number;size:number;high:boolean;kind:Kind};
/** A connected tailored silhouette, with vertex-colored clothing and understated hair. */
function silhouette(kind:Kind){const parts:THREE.BufferGeometry[]=[];const cloth=kind==='masculine'?'#596779':kind==='feminine'?'#927e77':kind==='baby'?'#c0bda9':'#929687',skin='#d8bc9d',hair='#514639',trouser=kind==='feminine'?cloth:'#454b50';
 const add=(g:THREE.BufferGeometry,color:string)=>{const a=new Float32Array(g.attributes.position.count*3),c=new THREE.Color(color);for(let i=0;i<a.length;i+=3){a[i]=c.r;a[i+1]=c.g;a[i+2]=c.b}g.setAttribute('color',new THREE.BufferAttribute(a,3));parts.push(g);};
 const oval=(x:number,y:number,z:number,sx:number,sy:number,sz:number,color:string)=>{const g=new THREE.SphereGeometry(1,12,8);g.scale(sx,sy,sz);g.translate(x,y,z);add(g,color)};
 const limb=(a:number[],b:number[],r:number,color:string)=>{const from=new THREE.Vector3(...a),to=new THREE.Vector3(...b),g=new THREE.CapsuleGeometry(r,Math.max(.005,from.distanceTo(to)-2*r),3,8);g.applyQuaternion(new THREE.Quaternion().setFromUnitVectors(new THREE.Vector3(0,1,0),to.clone().sub(from).normalize()));g.translate(...from.add(to).multiplyScalar(.5).toArray() as [number,number,number]);add(g,color)};
 // Shaped torso tapers at the waist instead of a stack of spherical body parts.
 const baby=kind==='baby',feminine=kind==='feminine',profile=[[.13,.52],[.15,.61],[feminine?.125:.15,.70],[feminine?.16:.19,.91],[.15,.98],[.065,1.00]].map(([r,y])=>new THREE.Vector2(r,baby?.52+(y-.52)*.78:y));const torso=new THREE.LatheGeometry(profile,16);torso.scale(1,1,.64);add(torso,cloth);
 oval(0,.555,-.07,.16,.06,.18,trouser);
 for(const x of [-.09,.09]){limb([x,.555,-.07],[x,.54,-.30],.066,trouser);limb([x,.53,-.30],[x,baby?.31:.105,-.33],.046,feminine?skin:trouser);oval(x,baby?.27:.065,-.40,.055,.042,.105,'#443f37');}
 if(feminine){const skirt=new THREE.CylinderGeometry(.16,.20,.24,16);skirt.scale(1,1,1.25);skirt.rotateX(-.9);skirt.translate(0,.55,-.19);add(skirt,cloth)}
 for(const side of [-1,1]){limb([side*.16,.91,0],[side*.20,.71,-.07],.047,cloth);limb([side*.20,.71,-.07],[side*.12,.64,-.24],.036,kind==='masculine'?cloth:skin);oval(side*.115,.64,-.265,.037,.026,.052,skin)}
 limb([0,baby?.89:.98,0],[0,baby?.98:1.05,0],.047,skin);oval(0,baby?1.07:1.16,-.005,baby?.13:.087,baby?.14:.115,baby?.12:.09,skin);
 // Hair caps leave the face open; longer hair is a single clean silhouette.
 const cap=new THREE.SphereGeometry(1,14,8,0,Math.PI*2,0,Math.PI*.52);cap.scale(baby?.133:.091,baby?.143:.116,baby?.123:.095);cap.translate(0,baby?1.08:1.17,.004);add(cap,hair);
 if(feminine){oval(0,1.12,.065,.097,.125,.05,hair);for(const side of [-1,1])oval(side*.078,1.13,.026,.026,.10,.07,hair)}
 if(kind==='masculine'){const shirt=new THREE.ConeGeometry(.065,.19,3);shirt.scale(1,1,.16);shirt.rotateZ(Math.PI);shirt.translate(0,.90,-.12);add(shirt,'#e6e1d4')}
 if(kind==='baby'){oval(0,1.20,.025,.035,.025,.032,hair)}
 const geometry=mergeGeometries(parts);parts.forEach(g=>g.dispose());return geometry;
}
/** At most four instanced draws, independent of guest count. */
export class GuestFigures extends THREE.Group{
 private pickBounds=new Map<string,THREE.Box3>();private pickPoint=new THREE.Vector3();private settled=false;private progress=new Map<string,number>();private plan?:Plan;private object=new THREE.Object3D();private meshes=new Map<Kind,THREE.InstancedMesh>();private byMesh=new Map<THREE.Object3D,Person[]>();private reduced=matchMedia('(prefers-reduced-motion: reduce)').matches;
 private material=new THREE.MeshStandardMaterial({color:'#ffffff',vertexColors:true,roughness:.9});entries:Person[]=[];
 constructor(){super();this.material.onBeforeCompile=shader=>{shader.vertexShader='attribute float guestReveal; varying float vGuestReveal;\n'+shader.vertexShader;shader.vertexShader=shader.vertexShader.replace('#include <begin_vertex>','#include <begin_vertex>\nvGuestReveal = guestReveal;');shader.fragmentShader='varying float vGuestReveal;\n'+shader.fragmentShader;shader.fragmentShader=shader.fragmentShader.replace('#include <alphatest_fragment>','#include <alphatest_fragment>\nif(fract(sin(dot(gl_FragCoord.xy,vec2(12.9898,78.233)))*43758.5453)>vGuestReveal) discard;');};
 for(const kind of ['neutral','masculine','feminine','baby'] as Kind[]){const geometry=silhouette(kind);geometry.setAttribute('guestReveal',new THREE.InstancedBufferAttribute(new Float32Array(300),1));const mesh=new THREE.InstancedMesh(geometry,this.material,300);mesh.count=0;mesh.castShadow=mesh.receiveShadow=true;mesh.instanceMatrix.setUsage(THREE.DynamicDrawUsage);this.meshes.set(kind,mesh);this.add(mesh)}}
 reveal(){this.progress.clear();this.settled=false;}
 setPlan(plan:Plan){this.settled=false;this.pickBounds.clear();this.plan=plan;this.entries=seatingTables(plan).flatMap(t=>seatsAt(plan,t).flatMap((g,seat)=>g&&receptionGuest(g)?[{id:g.id,name:g.name,table:t.id,seat,size:figureSize(g),high:usesHighChair(g),kind:figureKind(g)}]:[]));const keys=new Set(this.entries.map(g=>g.id));for(const id of this.progress.keys())if(!keys.has(id))this.progress.delete(id);for(const [kind,mesh] of this.meshes){const entries=this.entries.filter(g=>g.kind===kind);this.byMesh.set(mesh,entries);mesh.count=entries.length;mesh.visible=entries.length>0}this.update(0);}
 update(delta:number,override?:Table){if(!this.plan||(this.settled&&delta>0&&!override))return;let finished=true;const tables=seatingTables(this.plan);for(const mesh of this.meshes.values()){const entries=this.byMesh.get(mesh)||[];entries.forEach((g,i)=>{const t=override?.id===g.table?override:tables.find(t=>t.id===g.table)!;const p=guestChair(t,g.seat),old=this.progress.get(g.id)||0,progress=this.reduced?1:Math.min(1,old+delta*3);this.progress.set(g.id,progress);if(progress<1)finished=false;(mesh.geometry.attributes.guestReveal as THREE.InstancedBufferAttribute).setX(i,progress);const size=p.scale*g.size;this.object.position.set(p.x,p.y+p.scale*((g.high?.84:.55)-.52*g.size),p.z);this.object.rotation.set(0,p.angle,0);this.object.scale.setScalar(size);this.object.updateMatrix();mesh.setMatrixAt(i,this.object.matrix);const box=this.pickBounds.get(g.id)||new THREE.Box3();box.min.set(-.23,.49,-.36);box.max.set(.23,1.32,.16);box.applyMatrix4(this.object.matrix);this.pickBounds.set(g.id,box)});if(entries.length){mesh.geometry.attributes.guestReveal.needsUpdate=true;mesh.instanceMatrix.needsUpdate=true;mesh.computeBoundingSphere()}}this.settled=finished;}
 hit(ray:THREE.Raycaster){if(!this.visible)return;let nearest=Infinity,person:Person|undefined;for(const g of this.entries){const box=this.pickBounds.get(g.id);if(!box||!ray.ray.intersectBox(box,this.pickPoint))continue;const distance=ray.ray.origin.distanceTo(this.pickPoint);if(distance>=ray.near&&distance<=ray.far&&distance<nearest){nearest=distance;person=g}}return person;}

 dispose(){this.material.dispose();this.meshes.forEach(m=>m.dispose());}
}
