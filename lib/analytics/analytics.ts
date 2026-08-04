const CONSENT_STORAGE_KEY = "exception-by-ki-consent";

export type AnalyticsEvent =
  | { name: "view_item"; payload: { productHandle: string; price: number } }
  | { name: "add_to_cart"; payload: { productHandle: string; variantId: string; quantity: number; price: number } }
  | { name: "begin_checkout"; payload: { value: number; itemCount: number } };

/**
 * No analytics provider is wired up yet — this only respects consent and
 * logs in development, so the *shape* of every commerce event is decided
 * now rather than retrofitted later. To go live: swap the dev-only
 * console.debug below for real calls (GA4 gtag, Meta Pixel/Conversions
 * API, etc.), gated the same way on hasConsent().
 */
export function hasConsent(): boolean {
  if (typeof window === "undefined") return false;
  return window.localStorage.getItem(CONSENT_STORAGE_KEY) === "granted";
}

export function trackEvent(event: AnalyticsEvent): void {
  if (!hasConsent()) return;
  if (process.env.NODE_ENV !== "production") {
    console.debug("[analytics]", event.name, event.payload);
  }
  // TODO(analytics): forward to GA4 / Meta CAPI / etc. once connected.
}
