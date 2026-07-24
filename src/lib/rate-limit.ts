// Simple in-memory login cooldown for /admin (see PROJECT_SPEC.md §6 — single
// password, no accounts). Deliberately NOT backed by an external store: this
// resets on redeploy and isn't shared across serverless instances, but the
// admin panel realistically only ever sees traffic from Ivan, so this is a
// "slow down casual guessing" measure, not a defense against a determined
// attacker (that would need Vercel KV/Upstash — decided against the added
// setup for a single-password personal tool).
const MAX_ATTEMPTS = 5;
const LOCKOUT_MS = 15 * 60 * 1000; // 15 minutes

type Entry = { failures: number; lockedUntil: number };

const attempts = new Map<string, Entry>();

export function isLockedOut(key: string): { locked: boolean; retryAfterMs: number } {
  const entry = attempts.get(key);
  if (!entry) return { locked: false, retryAfterMs: 0 };
  const remaining = entry.lockedUntil - Date.now();
  if (entry.failures >= MAX_ATTEMPTS && remaining > 0) {
    return { locked: true, retryAfterMs: remaining };
  }
  return { locked: false, retryAfterMs: 0 };
}

export function recordFailure(key: string) {
  const entry = attempts.get(key) ?? { failures: 0, lockedUntil: 0 };
  entry.failures += 1;
  if (entry.failures >= MAX_ATTEMPTS) {
    entry.lockedUntil = Date.now() + LOCKOUT_MS;
  }
  attempts.set(key, entry);
}

export function recordSuccess(key: string) {
  attempts.delete(key);
}

// Generic fixed-window throttle — for endpoints like /api/contact where the
// thing to limit is "requests per window" rather than "failures before
// lockout" (every submission counts, not just bad ones, since each one
// costs a real email send against Resend's free-tier daily quota).
const windows = new Map<string, { count: number; resetAt: number }>();

export function checkWindowLimit(
  key: string,
  max: number,
  windowMs: number
): { allowed: boolean; retryAfterMs: number } {
  const now = Date.now();
  const entry = windows.get(key);
  if (!entry || now >= entry.resetAt) {
    windows.set(key, { count: 1, resetAt: now + windowMs });
    return { allowed: true, retryAfterMs: 0 };
  }
  if (entry.count >= max) {
    return { allowed: false, retryAfterMs: entry.resetAt - now };
  }
  entry.count += 1;
  return { allowed: true, retryAfterMs: 0 };
}
