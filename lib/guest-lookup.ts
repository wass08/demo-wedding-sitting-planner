export function normalizeGuestName(name:string){return name.normalize('NFKD').replace(/\p{M}/gu,'').toLocaleLowerCase('en').replace(/[’‘]/g,"'").replace(/\s+/g,' ').trim();}
