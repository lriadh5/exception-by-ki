"use client";

import { useState } from "react";
import Link from "next/link";
import { useCart } from "@/lib/cart/cart-context";
import { formatMoney } from "@/lib/format";
import { ProductSwatch } from "@/components/commerce/ProductSwatch";

/**
 * No email, address, or payment fields live on this page — see Phase 1
 * fix notes in README. In preview mode (no Shopify store connected)
 * checkout is a dead end by design: it explains why, and collects
 * nothing. Once connected, "Continue to Secure Checkout" creates a real
 * Shopify cart server-side (app/api/checkout/route.ts) and redirects to
 * Shopify's hosted checkout — payment and address collection happen
 * there, not in this app.
 */
export function CheckoutClient() {
  const { lines, subtotal, isPreviewMode } = useCart();
  const [isRedirecting, setIsRedirecting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  if (lines.length === 0) {
    return (
      <div className="mx-auto max-w-xl px-6 py-24 text-center">
        <h1 className="font-serif text-3xl mb-4">Your cart is empty</h1>
        <Link href="/collections/cookware" className="underline text-sm">
          Shop Cookware
        </Link>
      </div>
    );
  }

  async function handleContinue() {
    setIsRedirecting(true);
    setError(null);
    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          lines: lines.map((l) => ({ variantId: l.variantId, quantity: l.quantity })),
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? "Checkout failed.");
      window.location.href = data.checkoutUrl;
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong. Please try again.");
      setIsRedirecting(false);
    }
  }

  return (
    <div className="mx-auto max-w-5xl px-6 py-16 grid grid-cols-1 md:grid-cols-2 gap-16">
      <div>
        <h1 className="font-serif text-3xl mb-6">Checkout</h1>

        {isPreviewMode ? (
          <div className="space-y-4 border border-line rounded-sm bg-paper-dim p-6">
            <p className="text-sm text-ink">
              Checkout isn&apos;t available yet. This is a preview build — there&apos;s no
              connected Shopify store, payment processor, or order/fulfillment backend behind it.
            </p>
            <p className="text-sm text-ink-soft">
              Nothing is collected on this screen — no email, no address, no payment details.
              Once a Shopify store is connected, this page hands off to Shopify&apos;s own
              secure hosted checkout.
            </p>
            <button
              disabled
              aria-disabled="true"
              className="w-full bg-ink/30 text-paper py-4 text-sm tracking-wide cursor-not-allowed"
            >
              Checkout unavailable in preview
            </button>
          </div>
        ) : (
          <div className="space-y-4">
            <p className="text-sm text-ink-soft">
              You&apos;ll be taken to Shopify&apos;s secure hosted checkout to enter shipping
              and payment details.
            </p>
            {error && (
              <p role="alert" className="text-sm text-error">
                {error}
              </p>
            )}
            <button
              onClick={handleContinue}
              disabled={isRedirecting}
              aria-busy={isRedirecting}
              className="w-full bg-brand text-paper py-4 text-sm tracking-wide transition-all duration-300 hover:bg-brand-dark hover:shadow-md disabled:opacity-50 disabled:hover:shadow-none"
            >
              {isRedirecting ? "Redirecting…" : "Continue to Secure Checkout"}
            </button>
          </div>
        )}
      </div>

      <div className="bg-paper-dim rounded-sm p-6 h-fit">
        <h2 className="font-serif text-lg mb-6">Order Summary</h2>
        <ul className="space-y-4 mb-6">
          {lines.map((line) => (
            <li key={line.lineId} className="flex gap-4">
              <ProductSwatch
                image={line.image}
                showLabel={false}
                className="h-16 w-16 shrink-0 rounded-sm"
              />
              <div className="flex-1 text-sm">
                <p className="text-ink">{line.title}</p>
                <p className="text-ink-soft">Qty {line.quantity}</p>
              </div>
              <p className="text-sm text-ink">
                {formatMoney({
                  amount: line.price.amount * line.quantity,
                  currencyCode: line.price.currencyCode,
                })}
              </p>
            </li>
          ))}
        </ul>
        <div className="border-t border-line pt-4 flex justify-between text-sm">
          <span className="text-ink-soft">Subtotal</span>
          <span className="text-ink">
            {formatMoney({ amount: subtotal, currencyCode: "USD" })}
          </span>
        </div>
        <p className="text-xs text-ink-soft mt-4">
          Shipping and tax calculated by Shopify at checkout.
        </p>
      </div>
    </div>
  );
}
