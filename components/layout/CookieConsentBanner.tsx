"use client";

import { useCookieConsent } from "@/lib/cookie-consent/cookie-consent-context";

export function CookieConsentBanner() {
  const { status, grant, deny } = useCookieConsent();
  if (status !== "unknown") return null;

  return (
    <div
      role="region"
      aria-label="Cookie consent"
      className="fixed inset-x-0 bottom-0 z-40 border-t border-line bg-paper px-6 py-4 shadow-[0_-4px_16px_rgba(0,0,0,0.06)]"
    >
      <div className="mx-auto flex max-w-7xl flex-col items-start gap-3 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm text-ink-soft">
          We use cookies for essential site features and, with your consent, analytics. See our{" "}
          <a href="/privacy-policy" className="underline">
            Privacy Policy
          </a>
          .
        </p>
        <div className="flex shrink-0 gap-3">
          <button onClick={deny} className="text-sm text-ink-soft underline hover:text-ink">
            Decline
          </button>
          <button onClick={grant} className="bg-ink text-paper text-sm px-4 py-2">
            Accept
          </button>
        </div>
      </div>
    </div>
  );
}
