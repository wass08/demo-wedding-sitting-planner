import {getChatGPTUser} from '@/app/chatgpt-auth';
import {plansDb} from '@/db/plans';
import {INITIAL,validatePlan} from '@/lib/plan';
export const dynamic='force-dynamic';
const json=(data:unknown,status=200)=>Response.json(data,{status,headers:{'Cache-Control':'no-store'}});
export async function GET(){const user=await getChatGPTUser();if(!user)return json({error:'Sign in to load your wedding.'},401);try{const row=await plansDb().prepare('SELECT body, revision FROM wedding_plans WHERE owner = ?').bind(user.userId).first<{body:string;revision:number}>();const backup=await plansDb().prepare('SELECT owner FROM wedding_backups WHERE owner = ?').bind(user.userId).first();return json({plan:row?JSON.parse(row.body):null,revision:row?.revision||0,hasBackup:!!backup})}catch(e){console.error('Plan load failed',e);return json({error:'Your wedding cannot be loaded right now.'},503)}}
export async function PUT(req:Request){const user=await getChatGPTUser();if(!user)return json({error:'Sign in to save your wedding.'},401);const origin=req.headers.get('origin');if(origin&&origin!==new URL(req.url).origin)return json({error:'Invalid origin'},403);try{const raw=await req.text();if(raw.length>2000000)return json({error:'Plan is too large.'},413);const {plan,revision}=JSON.parse(raw);if(!validatePlan(plan)||!Number.isInteger(revision)||revision<0)return json({error:'Please check your wedding details.'},400);const db=plansDb(),body=JSON.stringify(plan),now=new Date().toISOString();let result;if(revision===0){result=await db.prepare('INSERT INTO wedding_plans (owner, body, revision, updated_at) VALUES (?, ?, 1, ?) ON CONFLICT(owner) DO NOTHING').bind(user.userId,body,now).run()}else{result=await db.prepare('UPDATE wedding_plans SET body = ?, revision = revision + 1, updated_at = ? WHERE owner = ? AND revision = ?').bind(body,now,user.userId,revision).run()}if(!result.meta.changes)return json({error:'The plan changed in another tab.'},409);return json({revision:revision+1})}catch(e){console.error('Plan save failed',e);return json({error:'Your changes could not be saved. Please try again.'},503)}}

export async function POST(req:Request){
 const user=await getChatGPTUser();if(!user)return json({error:'Sign in to change your wedding.'},401);
 const origin=req.headers.get('origin');if(origin&&origin!==new URL(req.url).origin)return json({error:'Invalid origin'},403);
 try{const raw=await req.text();if(raw.length>1000)return json({error:'Request too large'},413);const {action,revision}=JSON.parse(raw);
 if(!['fresh','restore'].includes(action)||!Number.isInteger(revision)||revision<0)return json({error:'Invalid request'},400);
 const db=plansDb(),row=await db.prepare('SELECT body, revision FROM wedding_plans WHERE owner = ?').bind(user.userId).first<{body:string;revision:number}>(),backup=await db.prepare('SELECT body FROM wedding_backups WHERE owner = ?').bind(user.userId).first<{body:string}>();
 if((row?.revision||0)!==revision)return json({error:'Your wedding changed in another tab. Reload before continuing.'},409);
 if(action==='restore'&&!backup)return json({error:'No previous wedding is available.'},404);
 const body=action==='fresh'?JSON.stringify(INITIAL):backup!.body;
 if(action==='fresh'&&(!row||row.body===body))return json({plan:INITIAL,revision,hasBackup:!!backup});
 const now=new Date().toISOString(),statements=[];
 statements.push(db.prepare('UPDATE wedding_shares SET enabled = 0 WHERE owner = ? AND EXISTS (SELECT 1 FROM wedding_plans WHERE owner = ? AND revision = ?)').bind(user.userId,user.userId,revision));
 statements.push(db.prepare('INSERT INTO wedding_backups (owner, body, updated_at) SELECT owner, body, ? FROM wedding_plans WHERE owner = ? AND revision = ? ON CONFLICT(owner) DO UPDATE SET body = excluded.body, updated_at = excluded.updated_at').bind(now,user.userId,revision));
 statements.push(db.prepare('UPDATE wedding_plans SET body = ?, revision = revision + 1, updated_at = ? WHERE owner = ? AND revision = ?').bind(body,now,user.userId,revision));
 const results=await db.batch(statements);if(!results.at(-1)?.meta.changes)return json({error:'Your wedding changed in another tab. Reload before continuing.'},409);
 return json({plan:JSON.parse(body),revision:revision+1,hasBackup:true});
 }catch(e){console.error('Wedding restart failed',e);return json({error:'Your wedding could not be changed. Please try again.'},503)}
}
