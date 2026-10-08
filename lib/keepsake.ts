import type {Plan} from './plan';

/** The card contains the reception, couple and date; never the guest list. */
export async function createKeepsake(plan:Plan,scene:string):Promise<string>{
 const image=new Image();image.src=scene;await image.decode();
 const canvas=document.createElement('canvas');canvas.width=1080;canvas.height=1350;
 const ctx=canvas.getContext('2d');if(!ctx)throw Error('Image export is unavailable');
 ctx.drawImage(image,0,0,1080,1350);
 const top=ctx.createLinearGradient(0,0,0,570);top.addColorStop(0,'rgba(12,30,24,.92)');top.addColorStop(.6,'rgba(12,30,24,.45)');top.addColorStop(1,'rgba(12,30,24,0)');ctx.fillStyle=top;ctx.fillRect(0,0,1080,570);
 const bottom=ctx.createLinearGradient(0,1060,0,1350);bottom.addColorStop(0,'rgba(12,30,24,0)');bottom.addColorStop(1,'rgba(12,30,24,.88)');ctx.fillStyle=bottom;ctx.fillRect(0,1060,1080,290);
 ctx.strokeStyle='rgba(235,223,195,.48)';ctx.lineWidth=1;ctx.strokeRect(38.5,38.5,1003,1273);
 ctx.fillStyle='#f7efdc';ctx.textAlign='center';ctx.font='18px Arial';ctx.fillText('O U R   E V E N I N G   I N   T H E   G A R D E N',540,111);
 let fontSize=76,lines:string[]=[];
 // Wrap at words and at graphemes for long names, including scripts without spaces.
 const segments=typeof Intl.Segmenter==='function'?Array.from(new Intl.Segmenter(undefined,{granularity:'grapheme'}).segment(plan.couple),x=>x.segment):Array.from(plan.couple);
 do{ctx.font=`${fontSize}px Georgia`;lines=[];let line='';for(const char of segments){if(ctx.measureText(line+char).width>880&&line){const space=line.lastIndexOf(' ');if(space>line.length*.5){lines.push(line.slice(0,space));line=line.slice(space+1)+char}else{lines.push(line);line=char}}else line+=char}if(line.trim())lines.push(line.trim());if(lines.length<=3)break;fontSize-=4;}while(fontSize>=32);
 const lineHeight=fontSize*1.13;lines.forEach((line,i)=>ctx.fillText(line,540,200+i*lineHeight));
 ctx.font='22px Arial';const date=new Date(plan.date+'T12:00:00');ctx.fillText(Number.isNaN(date.getTime())?plan.date:date.toLocaleDateString('en-US',{month:'long',day:'numeric',year:'numeric'}),540,232+lines.length*lineHeight);
 ctx.font='italic 47px Georgia';ctx.fillText('vow',540,1239);ctx.font='15px Arial';ctx.fillText('W E D D I N G   A T E L I E R',540,1275);
 return canvas.toDataURL('image/png');
}
export async function downloadKeepsake(image:string,couple:string){
 const blob=await(await fetch(image)).blob(),url=URL.createObjectURL(blob),link=document.createElement('a');
 link.href=url;link.download=(couple.replace(/[^a-z0-9]+/gi,'-').replace(/^-|-$/g,'').toLowerCase()||'our-wedding')+'-keepsake.png';link.click();setTimeout(()=>URL.revokeObjectURL(url),10000);
}
