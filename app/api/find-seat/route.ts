import {plansDb} from '@/db/plans';
import {publishedSeating} from '@/lib/guest-invitations';
import {normalizeGuestName} from '@/lib/guest-lookup';
export const dynamic='force-dynamic';
const json=(data:unknown,status=200)=>Response.json(data,{status,headers:{'Cache-Control':'no-store','Referrer-Policy':'no-referrer','X-Robots-Tag':'noindex, nofollow'}});
// The wedding token grants name lookup, never a guest-list download.
export async function POST(req:Request){try{const raw=await req.text();if(raw.length>1000)return json({error:'Please check your invitation.'},400);const {token,name}=JSON.parse(raw);if(typeof token!=='string'||!/^([a-f0-9-]{36}){2}$/.test(token))return json({error:'This seating link is unavailable.'},404);
 const row=await plansDb().prepare('SELECT p.body, p.updated_at FROM wedding_shares s JOIN wedding_plans p ON p.owner = s.owner WHERE s.token = ? AND s.enabled = 1').bind(token).first<{body:string;updated_at:string}>();if(!row)return json({error:'Seating is not available right now. Please check with the couple.'},404);
 const snapshot=publishedSeating(JSON.parse(row.body));if(name===undefined)return json({couple:snapshot.plan.couple,date:snapshot.plan.date});if(typeof name!=='string'||name.length>180||normalizeGuestName(name).length<2)return json({error:'Please enter your full name.'},400);
 const matches=snapshot.assignments.filter(g=>normalizeGuestName(g.name)===normalizeGuestName(name));if(matches.length!==1)return json({error:matches.length>1?'More than one guest has this name. Please ask the couple for your personal seating link.':'We could not find a seat for that name yet. Try your full name as given to the couple, or ask your hosts.'},404);
 const g=matches[0];return json({plan:snapshot.plan,guest:{name:g.name,tableId:g.tableId,seat:g.seat},publishedAt:row.updated_at});
 }catch{return json({error:'Your seat could not be loaded. Please try again.'},503)}}
