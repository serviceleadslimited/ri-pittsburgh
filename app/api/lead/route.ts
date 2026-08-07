import { NextResponse } from "next/server";
import { Resend } from "resend";
import { SITE_NAME } from "@/lib/site";

const MAX_FIELD = 2000;

function clean(value: unknown): string {
  return typeof value === "string" ? value.trim().slice(0, MAX_FIELD) : "";
}

// Cloudflare Turnstile server-side check (gates.yaml build.form_spam_gate,
// added 2026-08-03). A token is mandatory: the widget is present on the form,
// and accepting a missing token would leave the API unprotected. Managed mode
// may show an interactive challenge, but a successful challenge still returns
// a token for ordinary browser and agent-invoked submissions.
async function verifyTurnstile(token: string, remoteIp: string | null): Promise<boolean> {
  const secret = process.env.TURNSTILE_SECRET_KEY;
  if (!secret || !token) return false;
  try {
    const body = new URLSearchParams({ secret, response: token });
    if (remoteIp) body.set("remoteip", remoteIp);
    const res = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body,
    });
    const outcome = await res.json();
    return Boolean(outcome.success);
  } catch (err) {
    console.error("Turnstile verify request failed:", err);
    return false;
  }
}

export async function POST(req: Request) {
  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false }, { status: 400 });
  }

  // Honeypot: bots fill "company_website"; pretend success and drop it.
  if (clean(body.company_website)) {
    return NextResponse.json({ ok: true });
  }

  const turnstileOk = await verifyTurnstile(
    clean(body["cf-turnstile-response"]),
    req.headers.get("cf-connecting-ip")
  );
  if (!turnstileOk) {
    // Explicit invalid/tampered token — reject outright, no silent success.
    return NextResponse.json(
      { ok: false, error: "Verification failed. Please try again." },
      { status: 400 }
    );
  }

  const name = clean(body.name);
  const phone = clean(body.phone);
  const email = clean(body.email);
  const city = clean(body.city);
  const details = clean(body.details);

  if (!name || !phone) {
    return NextResponse.json(
      { ok: false, error: "Name and phone are required." },
      { status: 400 }
    );
  }

  // Accept both the template's original names and the portfolio-wide
  // MESSAGING_RESEND_* convention, so a site can carry either.
  const apiKey = process.env.RESEND_API_KEY ?? process.env.MESSAGING_RESEND_API_KEY;
  const to = process.env.LEAD_EMAIL;
  if (!apiKey || !to) {
    console.error(
      "Lead not sent: need an API key (RESEND_API_KEY or MESSAGING_RESEND_API_KEY) and a recipient (LEAD_EMAIL)."
    );
    return NextResponse.json({ ok: false }, { status: 500 });
  }

  // Sender: explicit LEAD_FROM wins; otherwise build one on the verified
  // sending domain (RESEND_EMAIL_DOMAIN or MESSAGING_RESEND_EMAIL_DOMAIN);
  // else Resend's shared onboarding sender (only delivers to the account owner).
  const domain =
    process.env.RESEND_EMAIL_DOMAIN ?? process.env.MESSAGING_RESEND_EMAIL_DOMAIN;
  const from =
    process.env.LEAD_FROM ??
    (domain
      ? `${SITE_NAME} <leads@${domain}>`
      : `${SITE_NAME} <onboarding@resend.dev>`);

  const resend = new Resend(apiKey);
  const { error } = await resend.emails.send({
    from,
    to,
    replyTo: email || undefined,
    subject: `New lead: ${name}${city ? ` — ${city}` : ""}`,
    text: [
      `Name: ${name}`,
      `Phone: ${phone}`,
      `Email: ${email || "(not provided)"}`,
      `City/Neighborhood: ${city || "(not provided)"}`,
      "",
      "Project details:",
      details || "(not provided)",
      "",
      `Source: ${SITE_NAME} free inspection request`,
    ].join("\n"),
  });

  if (error) {
    console.error("Resend error:", error);
    return NextResponse.json({ ok: false }, { status: 500 });
  }

  return NextResponse.json({ ok: true });
}
