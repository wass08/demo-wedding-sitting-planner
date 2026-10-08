import type {Guest,Plan} from './plan';
export const receptionGuest=(g:Guest)=>g.rsvp!=='declined'&&g.attendance!=='ceremony'&&g.attendance!=='none';
export const receptionGuests=(p:Plan)=>p.guests.filter(receptionGuest);
export function updateGuest(p:Plan,id:string,patch:Partial<Guest>):Plan{return {...p,guests:p.guests.map(g=>{if(g.id!==id)return g;const next={...g,...patch};return receptionGuest(next)?next:{...next,tableId:null,seat:undefined}})}}
export const relationshipOptions=['Parent','Close relative','Relative','Bridesmaid','Groomsman','Friend','Close friend','Colleague','Partner / plus-one'];
export const needOptions=['High chair','Pushchair space','Wheelchair space','Step-free access','Quieter position'];
