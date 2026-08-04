import { NextResponse } from "next/server";
import type { NewsletterSignupResult } from "@/lib/newsletter/types";

/**
 * No email service provider is connected yet (Klaviyo, per the original
 * architecture plan). This intentionally never claims success — returning
 * a fake "subscribed!" with nowhere for the address to go would be the
 * same problem the Phase 1 checkout fix removed. Wire a real ESP here,
 * then flip this to actually subscribe the address.
 */
export async function POST(request: Request) {
  const body = await request.json().catch(() => null);
  const email = typeof body?.email === "string" ? body.email.trim() : "";

  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json<NewsletterSignupResult>(
      { ok: false, message: "Enter a valid email address." },
      { status: 400 }
    );
  }

  return NextResponse.json<NewsletterSignupResult>(
    { ok: false, message: "Newsletter signup isn't connected yet — check back soon." },
    { status: 501 }
  );
}
