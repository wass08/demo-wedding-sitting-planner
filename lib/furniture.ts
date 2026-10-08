import * as THREE from 'three';
import {RoundedBoxGeometry} from 'three/addons/geometries/RoundedBoxGeometry.js';

type Palette={fabric:THREE.Material;metal:THREE.Material;wood:THREE.Material;dark:THREE.Material;accent:THREE.Material;icing:THREE.Material};
function mesh(p:THREE.Group,g:THREE.BufferGeometry,m:THREE.Material,x=0,y=0,z=0){const o=new THREE.Mesh(g,m);o.position.set(x,y,z);o.castShadow=o.receiveShadow=true;p.add(o);return o}
function soft(p:THREE.Group,w:number,h:number,d:number,x:number,y:number,z:number,m:THREE.Material,r=.04){return mesh(p,new RoundedBoxGeometry(w,h,d,3,Math.min(r,w/3,h/3,d/3)),m,x,y,z)}
function cyl(p:THREE.Group,r:number,b:number,h:number,x:number,y:number,z:number,m:THREE.Material,n=16){return mesh(p,new THREE.CylinderGeometry(r,b,h,n),m,x,y,z)}
function rod(p:THREE.Group,a:number[],b:number[],r:number,m:THREE.Material){const av=new THREE.Vector3(...a),bv=new THREE.Vector3(...b),o=mesh(p,new THREE.CylinderGeometry(r,r*.8,av.distanceTo(bv),6),m);o.position.copy(av).add(bv).multiplyScalar(.5);o.quaternion.setFromUnitVectors(new THREE.Vector3(0,1,0),bv.sub(av).normalize())}
export function atelierChair(p:THREE.Group,m:Palette){
 soft(p,.53,.10,.49,0,.47,0,m.fabric,.045);
 soft(p,.5,.035,.46,0,.408,0,m.wood,.015);
 for(const x of [-.21,.21])for(const z of [-.18,.18]){rod(p,[x,.42,z],[x*1.12,.035,z*1.15],.021,m.wood);cyl(p,.018,.016,.065,x*1.12,.033,z*1.15,m.metal,6)}
 for(const x of [-.21,.21])rod(p,[x,.41,.25],[x*.93,.89,.27],.02,m.wood);
 const back=mesh(p,new THREE.SphereGeometry(1,28,16),m.fabric,0,.84,.235);back.scale.set(.218,.233,.025);
 const rim=mesh(p,new THREE.TorusGeometry(1,.047,8,40),m.wood,0,.84,.235);rim.scale.set(.237,.254,.55);
}
export function atelierSofa(p:THREE.Group,w:number,d:number,m:Palette){
 const g=new THREE.Group();p.add(g);g.scale.set(w/2.4,1,d);
 soft(g,2.26,.15,.85,0,.20,0,m.wood,.035);
 for(const x of [-.94,.94])for(const z of [-.32,.32])cyl(g,.033,.025,.18,x,.09,z,m.metal,8);
 soft(g,2.4,.30,1,0,.38,0,m.fabric,.11);
 const shell=soft(g,2.3,.61,.27,0,.69,-.36,m.fabric,.12);shell.rotation.x=-.08;
 for(const x of [-1.08,1.08])soft(g,.26,.40,.91,x,.56,0,m.fabric,.12);
 for(const x of [-.48,.48]){
 soft(g,.94,.19,.72,x,.565,.045,m.fabric,.085);
 const seam=new THREE.CatmullRomCurve3([new THREE.Vector3(x-.40,.56,-.24),new THREE.Vector3(x-.44,.56,.32),new THREE.Vector3(x,.56,.38),new THREE.Vector3(x+.44,.56,.32),new THREE.Vector3(x+.40,.56,-.24)],true);mesh(g,new THREE.TubeGeometry(seam,28,.004,4,true),m.fabric);
 const back=soft(g,.95,.40,.19,x,.77,-.235,m.fabric,.08);back.rotation.x=-.12;
 const pillow=soft(g,.34,.34,.13,x*1.6,.77,-.04,x<0?m.accent:m.fabric,.065);pillow.rotation.set(-.18,0,x<0?-.18:.18);
 }
}
export function atelierConsole(p:THREE.Group,w:number,d:number,m:Palette,dj:boolean){
 const g=new THREE.Group();p.add(g);g.scale.set(w/2,1,d);
 soft(g,1.92,1,.92,0,.55,0,m.wood,.07);
 soft(g,1.86,.12,.86,0,.08,0,m.dark,.025);
 for(let i=0;i<28;i++)cyl(g,.024,.024,.85,-.88+i*1.76/27,.57,.458,m.wood,6);
 soft(g,2,.055,1,0,1.078,0,m.wood,.025);
 for(const x of [-.94,.94])soft(g,.012,.88,.025,x,.57,.475,m.metal,.003);
 soft(g,1.96,.04,.96,0,1.122,0,m.dark,.018);
 if(!dj)return;
 // Raised controller shelf and a tilted display distinguish the booth from the bar.
 rod(g,[.35,1.15,-.30],[.35,1.46,-.30],.018,m.metal);
 const screen=soft(g,.40,.25,.026,.35,1.55,-.31,m.dark,.012);screen.rotation.x=-.18;
 const display=soft(g,.34,.19,.006,.35,1.55,-.292,m.metal,.008);display.rotation.x=-.18;
 soft(g,1.32,.055,.62,0,1.17,0,m.dark,.018);
 for(const x of [-.43,.43]){
 cyl(g,.185,.185,.025,x,1.211,0,m.metal,32);cyl(g,.151,.151,.012,x,1.23,0,m.dark,24);
 for(let i=0;i<3;i++)soft(g,.046,.012,.032,x-.08+i*.08,1.211,.245,m.metal,.004);
 }
 for(const x of [-.09,0,.09]){
 for(let j=0;j<3;j++)cyl(g,.014,.014,.024,x,1.21,-.18+j*.06,m.metal,8);
 soft(g,.008,.005,.15,x,1.201,.12,m.metal,.002);soft(g,.048,.016,.025,x,1.213,.12+x*.5,m.metal,.003);
 }
 for(const x of [-.83,.83]){soft(g,.19,.26,.19,x,1.28,-.30,m.dark,.025);const cone=mesh(g,new THREE.CircleGeometry(.06,16),m.metal,x,1.28,-.198);cone.rotation.y=0;}
}
export function atelierCake(p:THREE.Group,m:Palette){
 cyl(p,.23,.28,.035,0,.873,0,m.metal,32);cyl(p,.07,.13,.11,0,.938,0,m.metal,24);cyl(p,.34,.31,.025,0,1.005,0,m.metal,40);
 let y=1.019;
 for(const [r,h] of [[.29,.23],[.215,.22],[.145,.20]]){
 const profile=[new THREE.Vector2(0,0),new THREE.Vector2(r-.012,0),new THREE.Vector2(r,.012),new THREE.Vector2(r,h-.014),new THREE.Vector2(r-.008,h),new THREE.Vector2(0,h)];
 mesh(p,new THREE.LatheGeometry(profile,40),m.icing,0,y,0);
 const band=mesh(p,new THREE.TorusGeometry(r,.005,5,40),m.icing,0,y+.02,0);band.rotation.x=Math.PI/2;
 for(let i=0;i<24;i++){const a=i*Math.PI/12,o=mesh(p,new THREE.SphereGeometry(.009,6,4),m.icing,Math.cos(a)*(r-.004),y+h,Math.sin(a)*(r-.004));o.scale.y=.7}
 y+=h;
 }
}
/** Solid timber high chair, with a raised seat, safety back and compact tray. */
export function atelierHighChair(p:THREE.Group,m:Palette){
 for(const x of [-.20,.20])for(const z of [-.18,.18])rod(p,[x,.76,z],[x*1.45,.035,z*1.45],.025,m.wood);
 soft(p,.43,.065,.40,0,.747,0,m.wood,.025);soft(p,.38,.035,.35,0,.794,0,m.fabric,.015);
 soft(p,.43,.32,.055,0,.95,.18,m.wood,.025);for(const x of [-.215,.215])rod(p,[x,.77,.15],[x,1.02,-.27],.025,m.wood);
 soft(p,.55,.045,.27,0,1.015,-.27,m.wood,.04);soft(p,.29,.025,.12,0,.43,-.22,m.wood,.015);
}
