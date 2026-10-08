import { cookies } from "next/headers";
import { SESSION_COOKIE } from "@/lib/session-cookie";

export type SessionUser = {
  userId: string;
};

// Each browser gets a private, unguessable session id (set in proxy.ts).
// Plans are scoped to that id, so a wedding lives with the browser that made it.
export async function getSessionUser(): Promise<SessionUser | null> {
  const id = (await cookies()).get(SESSION_COOKIE)?.value;
  if (!id || !/^[a-f0-9-]{36}$/.test(id)) return null;
  return { userId: `browser:${id}` };
}

export async function requireSessionUser(returnTo: string): Promise<SessionUser> {
  const user = await getSessionUser();
  if (user) return user;
  // proxy.ts issues the cookie, so this only happens when cookies are blocked.
  throw new Error(`A browser session is required to open ${returnTo}. Please enable cookies.`);
}
