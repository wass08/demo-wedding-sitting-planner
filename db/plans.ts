import {env} from 'cloudflare:workers';
export function plansDb(){if(!env.DB)throw Error('Wedding storage unavailable');return env.DB;}
