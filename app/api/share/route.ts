import {getChatGPTUser} from '@/app/chatgpt-auth';
import {plansDb} from '@/db/plans';
import {publishedSeating} from '@/lib/guest-invitations';
export const dynamic='force-dynamic';
const json=(data:unknown,status=200)=>Response.json(data,{status,headers:{'Cache-Control':'no-store'}});
export async function GET(){const user=await getChatGPTUser();if(!user)return json({error:'Sign in to share your seating.'},401);try{const share=await plansDb().prepare('SELECT token, enabled FROM wedding_shares WHERE owner = ?').bind(user.userId).first();return json({share});}catch{return json({error:'Sharing is unavailable. Please try again.'},503)}}
export async function POST(req:Request){const user=await getChatGPTUser();if(!user)return json({error:'Sign in to share your seating.'},401);if(req.headers.get('origin')&&req.headers.get('origin')!==new URL(req.url).origin)return json({error:'Invalid origin'},403);
 try{const raw=await req.text();if(raw.length>200)return json({error:'Invalid request'},400);const {enabled}=JSON.parse(raw);if(typeof enabled!=='boolean')return json({error:'Invalid request'},400);const db=plansDb();
 if(enabled){const row=await db.prepare('SELECT body FROM wedding_plans WHERE owner = ?').bind(user.userId).first<{body:string}>();if(!row||!publishedSeating(JSON.parse(row.body)).assignments.length)return json({error:'Save your plan with at least one seated reception guest first.'},400);}
 await db.prepare('INSERT INTO wedding_shares (owner, token, enabled) VALUES (?, ?, ?) ON CONFLICT(owner) DO UPDATE SET enabled = excluded.enabled').bind(user.userId,crypto.randomUUID()+crypto.randomUUID(),enabled?1:0).run();return GET();
 }catch{return json({error:'Sharing could not be changed. Please try again.'},503)}}
