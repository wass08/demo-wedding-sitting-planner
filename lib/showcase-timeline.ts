export const SHOWCASE_DURATION=18;
export const SHOWCASE_TITLES=['The setting','Make room for your people','Every seat, a place','Your evening begins'];
export const SHOWCASE_STARTS=[0,3,10,13] as const;
export const TABLE_REVEAL_SPAN=4;
export function showcasePhase(seconds:number){return seconds<SHOWCASE_STARTS[1]?0:seconds<SHOWCASE_STARTS[2]?1:seconds<SHOWCASE_STARTS[3]?2:3;}
