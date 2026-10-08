import Atelier from '../atelier';
import {requireChatGPTUser} from '../chatgpt-auth';
export const dynamic='force-dynamic';
export default async function Planner(){await requireChatGPTUser('/plan');return <Atelier/>;}
