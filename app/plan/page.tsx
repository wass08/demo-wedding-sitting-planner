import Atelier from '../atelier';
import {requireSessionUser} from '../session';
export const dynamic='force-dynamic';
export default async function Planner(){await requireSessionUser('/plan');return <Atelier/>;}
