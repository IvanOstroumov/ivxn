import { NextResponse } from "next/server";
import { CONTACT_EMAIL } from "@/lib/contact-info";

export async function POST(request: Request) {
  const body = await request.json();
  const { name, email, message, website } = body as {
    name?: string;
    email?: string;
    message?: string;
    website?: string; // honeypot — real visitors never fill this in
  };

  if (website) {
    // Bot caught the honeypot field. Report success without sending anything.
    return NextResponse.json({ ok: true });
  }

  if (!name?.trim() || !email?.trim() || !message?.trim()) {
    return NextResponse.json({ error: "All fields are required." }, { status: 400 });
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

  const { Resend } = await import("resend");
  const resend = new Resend(process.env.RESEND_API_KEY);

  const { error } = await resend.emails.send({
    // Sends from Resend's shared sandbox address until Ivan verifies ivxn.dev
    // with Resend — at that point this can become e.g. contact@ivxn.dev.
    from: "Ivan Labs Contact <onboarding@resend.dev>",
    to: CONTACT_EMAIL,
    replyTo: email,
    subject: `New message from ${name} (via ivxn.dev)`,
    text: `From: ${name} <${email}>\n\n${message}`,
  });

  if (error) {
    return NextResponse.json({ error: "Failed to send. Try again in a moment." }, { status: 502 });
  }

  return NextResponse.json({ ok: true });
}
