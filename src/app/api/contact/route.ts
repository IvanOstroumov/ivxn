import { NextResponse } from "next/server";
import { headers } from "next/headers";
import { CONTACT_EMAIL } from "@/lib/contact-info";
import { checkWindowLimit } from "@/lib/rate-limit";

const MAX_SUBMISSIONS = 3;
const WINDOW_MS = 10 * 60 * 1000; // 10 minutes

const MAX_NAME_LEN = 100;
const MAX_EMAIL_LEN = 200;
const MAX_MESSAGE_LEN = 5000;

// Strips characters that have no business in a one-line email subject —
// defense-in-depth against header-injection-style tricks via user input,
// even though Resend's JSON API (not raw SMTP) already makes classic header
// injection unlikely.
function sanitizeForSubject(value: string): string {
  return value.replace(/[\r\n]+/g, " ").trim();
}

export async function POST(request: Request) {
  const h = await headers();
  const clientKey = h.get("x-forwarded-for") ?? h.get("x-real-ip") ?? "unknown";

  const { allowed, retryAfterMs } = checkWindowLimit(
    `contact:${clientKey}`,
    MAX_SUBMISSIONS,
    WINDOW_MS
  );
  if (!allowed) {
    const minutes = Math.ceil(retryAfterMs / 60000);
    return NextResponse.json(
      { error: `Too many messages sent — try again in ${minutes} minute${minutes === 1 ? "" : "s"}.` },
      { status: 429 }
    );
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  const { name, email, message, website } = body as {
    name?: string;
    email?: string;
    message?: string;
    website?: string; // honeypot — real visitors never fill this in
  };

  if (website) {
    // Bot caught the honeypot field. Report success without sending anything
    // (and without counting further against the rate limit beyond this hit).
    return NextResponse.json({ ok: true });
  }

  if (!name?.trim() || !email?.trim() || !message?.trim()) {
    return NextResponse.json({ error: "All fields are required." }, { status: 400 });
  }
  if (name.length > MAX_NAME_LEN || email.length > MAX_EMAIL_LEN || message.length > MAX_MESSAGE_LEN) {
    return NextResponse.json({ error: "One of the fields is too long." }, { status: 400 });
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json({ error: "That doesn't look like a valid email." }, { status: 400 });
  }

  if (!process.env.RESEND_API_KEY) {
    return NextResponse.json(
      { error: "Contact form isn't configured yet (missing RESEND_API_KEY)." },
      { status: 501 }
    );
  }

  const safeName = sanitizeForSubject(name);

  const { Resend } = await import("resend");
  const resend = new Resend(process.env.RESEND_API_KEY);

  const { error } = await resend.emails.send({
    // Sends from Resend's shared sandbox address until Ivan verifies ivxn.dev
    // with Resend — at that point this can become e.g. contact@ivxn.dev.
    from: "Ivan Labs Contact <onboarding@resend.dev>",
    to: CONTACT_EMAIL,
    replyTo: email,
    subject: `New message from ${safeName} (via ivxn.dev)`,
    text: `From: ${safeName} <${email}>\n\n${message}`,
  });

  if (error) {
    return NextResponse.json({ error: "Failed to send. Try again in a moment." }, { status: 502 });
  }

  return NextResponse.json({ ok: true });
}
