import {SHOWCASE_TITLES} from './showcase-timeline';
export function videoType(){if(typeof MediaRecorder==='undefined'||typeof HTMLCanvasElement.prototype.captureStream!=='function')return null;return ['video/mp4','video/webm;codecs=vp9','video/webm;codecs=vp8','video/webm'].find(type=>MediaRecorder.isTypeSupported(type))||null;}
/** Records the rendered scene locally; no microphone, guest names or network upload. */
export function recordShowcase(source:HTMLCanvasElement,couple:string,phase:()=>number,onFailure:()=>void,onReady:(blob:Blob)=>void){
 const type=videoType();if(!type)throw Error('Video recording is unavailable');
 const canvas=document.createElement('canvas');canvas.width=1280;canvas.height=720;const ctx=canvas.getContext('2d');if(!ctx)throw Error('Canvas unavailable');
 const stream=canvas.captureStream(30),chunks:Blob[]=[];let frame=0,stopped=false,save=false;
 const recorder=new MediaRecorder(stream,{mimeType:type,videoBitsPerSecond:6000000});
 const release=()=>{cancelAnimationFrame(frame);stream.getTracks().forEach(t=>t.stop())};
 recorder.ondataavailable=e=>{if(e.data.size)chunks.push(e.data)};
 recorder.onerror=()=>{stopped=true;save=false;release();onFailure()};
 recorder.onstop=()=>{release();if(!save||!chunks.length)return;onReady(new Blob(chunks,{type}))};
 const draw=()=>{ctx.fillStyle='#10261f';ctx.fillRect(0,0,1280,720);const scale=Math.max(1280/source.width,720/source.height),w=source.width*scale,h=source.height*scale;ctx.drawImage(source,(1280-w)/2,(720-h)/2,w,h);const shade=ctx.createLinearGradient(0,530,0,720);shade.addColorStop(0,'#10261f00');shade.addColorStop(1,'#10261ff2');ctx.fillStyle=shade;ctx.fillRect(0,530,1280,190);ctx.textAlign='center';ctx.fillStyle='#f7efdc';ctx.font='34px Georgia';ctx.fillText(SHOWCASE_TITLES[Math.max(0,phase())]||SHOWCASE_TITLES[3],640,632);ctx.font='18px Arial';ctx.fillText(couple,640,671,1120);frame=requestAnimationFrame(draw)};
 try{draw();recorder.start(200)}catch(e){release();throw e}
 return {stop(download:boolean){if(stopped)return;stopped=true;save=download;cancelAnimationFrame(frame);if(recorder.state!=='inactive')recorder.stop();else release()}};
}
