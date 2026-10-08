import type {Table} from './plan';
import {localSeats,worldPoint} from './table-layout';
/** Shared physical chair positions for labels, layouts and rendering. */
export function chairPosition(table:Table,index:number){const seat=localSeats(table)[index]||{x:0,z:0,angle:0};return {...worldPoint(table,seat.x,seat.z),angle:seat.angle+table.rotation*Math.PI/180}}
