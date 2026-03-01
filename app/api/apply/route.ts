import { NextResponse } from "next/server";

type ApplyPayload = {
  fullName: string;
  email: string;
  phone: string;
  occupation: string;
  why: string;
  tier: "affiliate" | "iso" | "agency";
  smsOptIn: boolean;
  utm?: Record<string, string>;
  ab?: { variant: string };
  meta?: { userAgent?: string; referrer?: string };
};

function safeJsonParse<T>(value: string | null): T | null {
  if (!value) return null;
  try {
    return JSON.parse(value) as T;
  } catch {
    return null;
  }
}

export async function POST(req: Request) {
  const webhookUrl = process.env.PARTNER_WEBHOOK_URL;

  const body = (await req.json()) as ApplyPayload;

  // Basic validation
  const required = ["fullName", "email", "phone", "occupation", "why", "tier"] as const;
  for (const key of required) {
    if (!body?.[key]) {
      return NextResponse.json({ ok: false, error: `Missing ${key}` }, { status: 400 });
    }
  }

  // Always respond fast; webhook forwarding is best-effort.
  // (If you need strict guarantees, change to blocking + retry w/ queue.)
  if (webhookUrl) {
    const payload = {
      source: "partnerhub",
      timestamp: new Date().toISOString(),
      ...body
    };

    try {
      await fetch(webhookUrl, {
        method: "POST",
        headers: {
          "content-type": "application/json"
        },
        body: JSON.stringify(payload)
      });
    } catch {
      // swallow; do not leak internal errors to client
    }
  }

  // Optional: email/SMS automations via your own providers
  // Provide separate endpoints if needed, e.g. RESEND_WEBHOOK_URL or SMS_WEBHOOK_URL.
  const emailWebhook = process.env.EMAIL_WEBHOOK_URL;
  if (emailWebhook) {
    try {
      await fetch(emailWebhook, {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          type: "application_confirmation",
          to: body.email,
          name: body.fullName
        })
      });
    } catch {}
  }

  const smsWebhook = process.env.SMS_WEBHOOK_URL;
  if (smsWebhook && body.smsOptIn) {
    try {
      await fetch(smsWebhook, {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          type: "application_confirmation_sms",
          to: body.phone,
          name: body.fullName
        })
      });
    } catch {}
  }

  // Capture UTMs from cookie if you decide to add it later
  const cookie = (req.headers.get("cookie") || "").split(";").map(s => s.trim());
  const utmCookie = cookie.find(c => c.startsWith("ph_utm="))?.slice("ph_utm=".length) ?? null;
  const utm = safeJsonParse<Record<string, string>>(utmCookie ? decodeURIComponent(utmCookie) : null);

  return NextResponse.json({ ok: true, utmCaptured: !!utm, webhookConfigured: !!webhookUrl });
}
