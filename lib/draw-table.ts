import type {jsPDF} from 'jspdf';
import type {Table} from './plan';
import {tableParts,worldPoint,tableOutline} from './table-layout';
/** Same connected surfaces used by the 3D venue, including the open U center. */
export function drawTable(pdf:jsPDF,t:Table,x:number,y:number,scale:number){const outline=tableOutline(t);if(outline.length){const pts=outline.map(p=>{const v=worldPoint({...t,x:0,z:0},p.x,p.z);return[x+v.x*scale,y+v.z*scale]});pdf.lines(pts.slice(1).map((p,i)=>[p[0]-pts[i][0],p[1]-pts[i][1]]),pts[0][0],pts[0][1],[1,1],'FD',true);return}if(t.shape==='round'){pdf.circle(x,y,1.62*scale,'FD');return}for(const p of tableParts(t)){const pts=[[-1,-1],[1,-1],[1,1],[-1,1]].map(([sx,sz])=>{const v=worldPoint({...t,x:0,z:0},p.x+sx*p.hx,p.z+sz*p.hz);return[x+v.x*scale,y+v.z*scale]});pdf.lines(pts.slice(1).map((pt,i)=>[pt[0]-pts[i][0],pt[1]-pts[i][1]]),pts[0][0],pts[0][1],[1,1],'FD',true)}}
