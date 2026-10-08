import type {Guest} from './plan';
export type GuestAppearance='neutral'|'masculine'|'feminine';
export const usesHighChair=(g:Guest|undefined)=>!!g&&(g.age==='Baby'||g.age==='Child')&&(g.needs||'').split('|').includes('High chair');
export const figureKind=(g:Guest)=>g.age==='Baby'?'baby':g.appearance||'neutral';
export const figureSize=(g:Guest)=>g.age==='Baby'?.55:g.age==='Child'?.75:g.age==='Teenager'?.92:1;
