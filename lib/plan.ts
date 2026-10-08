import {validVenue,type Venue} from './venue';
import {receptionGuest} from './guest-profile';
import {seatLimits} from './table-layout';
export type Table = {sizeX?:number;sizeZ?:number;id:string;name:string;shape:'round'|'square'|'long'|'u'|'oval'|'half'|'curve';x:number;z:number;rotation:number;seats:number};
export type Guest = {appearance?:'neutral'|'masculine'|'feminine';id:string;name:string;tableId:string|null;seat?:number;connection?:string;relationship?:string;household?:string;age?:string;rsvp?:string;attendance?:string;meal?:string;diet?:string;allergies?:string;needs?:string;notes?:string};
export type Plan = {venue?:Venue;coupleTable?:boolean;coupleGuestIds?:string[];mood?:string;couple:string;date:string;linen:string;florals:string;light:number;tables:Table[];guests:Guest[]};
export const INITIAL:Plan={coupleTable:true,mood:'champagne',couple:'Your wedding',date:'2027-06-19',linen:'#e9e2d4',florals:'#f1eadc',light:68,tables:[
{id:'t1',name:'01',shape:'round',x:-6.5,z:-3,rotation:0,seats:8},
{id:'t2',name:'02',shape:'round',x:6.5,z:-3,rotation:0,seats:8},
{id:'t3',name:'03',shape:'round',x:-6.5,z:3.8,rotation:0,seats:8},
{id:'t4',name:'04',shape:'round',x:6.5,z:3.8,rotation:0,seats:8},
{id:'t5',name:'05',shape:'square',x:-6.5,z:10.5,rotation:0,seats:8},
{id:'t6',name:'06',shape:'square',x:6.5,z:10.5,rotation:0,seats:8}],
guests:[]};
export const COUPLE_TABLE:Table={id:'couple-table',name:'Couple’s table',shape:'square',x:0,z:-7.8,rotation:0,seats:2};
export const seatingTables=(p:Plan):Table[]=>p.coupleTable!==false?[...p.tables,COUPLE_TABLE]:p.tables;
export function setCoupleTable(p:Plan,enabled:boolean):Plan {let next:Plan={...p,coupleTable:enabled};if(!enabled)return {...next,guests:next.guests.map(g=>g.tableId===COUPLE_TABLE.id?{...g,tableId:null,seat:undefined}:g)};for(const id of p.coupleGuestIds||[])next=placeGuest(next,id,COUPLE_TABLE.id);return next;}
export function selectCoupleGuest(p:Plan,index:number,id:string):Plan {const ids=[p.coupleGuestIds?.[0]||'',p.coupleGuestIds?.[1]||''];const old=ids[index];ids[index]=id;let next:Plan={...p,coupleGuestIds:ids};if(old&&old!==id&&p.guests.find(g=>g.id===old)?.tableId===COUPLE_TABLE.id)next=placeGuest(next,old,null);if(id&&p.coupleTable!==false)next=placeGuest(next,id,COUPLE_TABLE.id,index);return next;}
export function validatePlan(v:unknown):v is Plan {
 const p=v as Plan;
 if(!p||(p.coupleTable!==undefined&&typeof p.coupleTable!=='boolean')||(p.mood!==undefined&&!['champagne','rose','riviera','citrus'].includes(p.mood))||typeof p.couple!=='string'||p.couple.length>100||typeof p.date!=='string'||!/^\d{4}-\d{2}-\d{2}$/.test(p.date)||!Number.isFinite(p.light)||p.light<0||p.light>100||!/^#[a-f\d]{6}$/i.test(p.linen)||!/^#[a-f\d]{6}$/i.test(p.florals)||!Array.isArray(p.tables)||p.tables.length>24||!Array.isArray(p.guests)||p.guests.length>300)return false;
 if(p.coupleGuestIds!==undefined&&(!Array.isArray(p.coupleGuestIds)||p.coupleGuestIds.length>2||p.coupleGuestIds.some(id=>typeof id!=='string'||(id!==''&&!p.guests.some(g=>g.id===id)))||new Set(p.coupleGuestIds.filter(Boolean)).size!==p.coupleGuestIds.filter(Boolean).length))return false;
 if(p.venue!==undefined&&!validVenue(p.venue))return false;
 if(p.guests.some(g=>g.appearance!==undefined&&!['neutral','masculine','feminine'].includes(g.appearance)))return false;
 if(p.guests.some(g=>[g.connection,g.relationship,g.household,g.age,g.rsvp,g.attendance,g.meal,g.diet,g.allergies,g.needs,g.notes].some(v=>v!==undefined&&(typeof v!=='string'||v.length>300))))return false;
 if(p.guests.some(g=>(g.rsvp!==undefined&&!['pending','confirmed','declined',''].includes(g.rsvp))||(g.attendance!==undefined&&!['both','ceremony','reception','none',''].includes(g.attendance))||(g.connection!==undefined&&!['first','second','shared',''].includes(g.connection))))return false;
 const tables=seatingTables(p);const ids=new Set(p.tables.map(t=>t.id));
 if(ids.has(COUPLE_TABLE.id)||ids.size!==p.tables.length)return false;
 if(!p.tables.every(t=>typeof t.id==='string'&&t.id.length<80&&typeof t.name==='string'&&t.name.length<=30&&['round','square','long','u','oval','half','curve'].includes(t.shape)&&[t.sizeX,t.sizeZ].every(v=>v===undefined||(Number.isFinite(v)&&v>=.7&&v<=1.4))&&Number.isFinite(t.x)&&Math.abs(t.x)<=10&&Number.isFinite(t.z)&&t.z>=-6&&t.z<=12&&Number.isFinite(t.rotation)&&Number.isInteger(t.seats)&&t.seats>=seatLimits(t.shape).min&&t.seats<=seatLimits(t.shape).max))return false;
 if(new Set(p.guests.map(g=>g.id)).size!==p.guests.length)return false;
 if(p.guests.some(g=>g.seat!==undefined&&(!Number.isInteger(g.seat)||g.seat<0||g.seat>39||(g.tableId!==null&&g.seat>=(tables.find(t=>t.id===g.tableId)?.seats||0)))))return false;
 const explicit=p.guests.filter(g=>g.tableId&&g.seat!==undefined).map(g=>g.tableId+':'+g.seat);if(new Set(explicit).size!==explicit.length)return false;
 return p.guests.every(g=>typeof g.id==='string'&&typeof g.name==='string'&&g.name.trim().length>0&&g.name.length<=100&&(g.tableId===null||tables.some(t=>t.id===g.tableId)))&&tables.every(t=>p.guests.filter(g=>g.tableId===t.id).length<=t.seats);
}

/** Resolve legacy table-only assignments without changing saved data. */
export function seatsAt(plan:Plan,table:Table):(Guest|undefined)[]{
 const seats:(Guest|undefined)[]=Array(table.seats).fill(undefined),guests=plan.guests.filter(g=>g.tableId===table.id);
 guests.filter(g=>g.seat!==undefined).forEach(g=>{if(g.seat!<table.seats)seats[g.seat!]=g});
 guests.filter(g=>g.seat===undefined).forEach(g=>{const free=seats.findIndex(x=>!x);if(free>=0)seats[free]=g});return seats;
}
export function placeGuest(plan:Plan,guestId:string,tableId:string|null,seat?:number):Plan {
 const guest=plan.guests.find(g=>g.id===guestId);if(!guest||(!receptionGuest(guest)&&tableId))return plan;
 const normalized=plan.guests.map(g=>({...g}));for(const t of seatingTables(plan))seatsAt(plan,t).forEach((g,i)=>{if(g)normalized.find(x=>x.id===g.id)!.seat=i});
 const moving=normalized.find(g=>g.id===guestId)!;
 if(!tableId){moving.tableId=null;delete moving.seat;return {...plan,guests:normalized}}
 const table=seatingTables(plan).find(t=>t.id===tableId);if(!table)return plan;
 const positions=seatsAt({...plan,guests:normalized},table);const target=seat??positions.findIndex(g=>!g||g.id===guestId);
 if(target<0||target>=table.seats)return plan;
 const occupant=positions[target];if(occupant&&occupant.id!==guestId){const other=normalized.find(g=>g.id===occupant.id)!;other.tableId=moving.tableId;other.seat=moving.seat;if(!other.tableId)delete other.seat}
 moving.tableId=tableId;moving.seat=target;return {...plan,guests:normalized};
}
