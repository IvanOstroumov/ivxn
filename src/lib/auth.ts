import { createHash } from "crypto";
import { cookies } from "next/headers";

const SESSION_COOKIE = "ivxn_admin_session";

// Single-password auth (see PROJECT_SPEC.md §6) — no accounts, just one shared
// secret gating /admin. The cookie stores a hash of the password rather than
// the password itself, so it isn't readable plaintext from the cookie value.
function expectedSessionValue() {
  const password = process.env.ADMIN_PASSWORD;
  if (!password) return null;
  return createHash("sha256").update(password).digest("hex");
}

export function checkPassword(candidate: string): boolean {
  const expected = process.env.ADMIN_PASSWORD;
  return !!expected && candidate === expected;
}

export async function createSession() {
  const value = expectedSessionValue();
  if (!value) throw new Error("ADMIN_PASSWORD is not configured");
  const store = await cookies();
  store.set(SESSION_COOKIE, value, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 7,
  });
}

export async function destroySession() {
  const store = await cookies();
  store.delete(SESSION_COOKIE);
}

export async function isAuthenticated(): Promise<boolean> {
  const expected = expectedSessionValue();
  if (!expected) return false;
  const store = await cookies();
  return store.get(SESSION_COOKIE)?.value === expected;
}
