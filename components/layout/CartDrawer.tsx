"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { useCart } from "@/lib/cart/cart-context";
import { formatMoney } from "@/lib/format";
import { ProductSwatch } from "@/components/commerce/ProductSwatch";
import { clampQuantity } from "@/lib/shopify/variant";

const FOCUSABLE_SELECTOR =
  'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])';

export function CartDrawer() {
  const {
    lines,
    isOpen,
    isLoading,
    error,
    announcement,
    closeCart,
    updateQuantity,
    removeLine,
    clearError,
    subtotal,
    triggerRef,
    isPreviewMode,
  } = useCart();

  const dialogRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  // Background scroll lock.
  useEffect(() => {
    if (!isOpen) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previous;
    };
  }, [isOpen]);

  // Focus the dialog on open; return focus to the trigger on close.
  useEffect(() => {
    if (isOpen) {
      closeButtonRef.current?.focus();
    } else if (triggerRef.current) {
      triggerRef.current.focus();
    }
  }, [isOpen, triggerRef]);

  // Escape closes; Tab is trapped inside the dialog while open.
  useEffect(() => {
    if (!isOpen) return;

    function handleKeydown(e: KeyboardEvent) {
      if (e.key === "Escape") {
        closeCart();
        return;
      }
      if (e.key !== "Tab" || !dialogRef.current) return;

      const focusable = Array.from(
        dialogRef.current.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR)
      ).filter((el) => el.offsetParent !== null);
      if (focusable.length === 0) return;

      const first = focusable[0];
      const last = focusable[focusable.length - 1];

      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    }

    document.addEventListener("keydown", handleKeydown);
    return () => document.removeEventListener("keydown", handleKeydown);
  }, [isOpen, closeCart]);

  if (!isOpen) {
    return (
      <div aria-live="polite" role="status" className="sr-only">
        {announcement}
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-50">
      <button
        aria-label="Close cart"
        className="absolute inset-0 bg-ink/40"
        onClick={closeCart}
      />
      <aside
        id="cart-drawer"
        ref={dialogRef}
        className="absolute right-0 top-0 h-full w-full max-w-md bg-paper flex flex-col shadow-xl"
        role="dialog"
        aria-modal="true"
        aria-labelledby="cart-heading"
      >
        <div aria-live="polite" role="status" className="sr-only">
          {announcement}
        </div>

        <div className="flex items-center justify-between border-b border-line px-6 py-4">
          <h2 id="cart-heading" className="font-serif text-lg">
            Your Cart
          </h2>
          <button
            ref={closeButtonRef}
            onClick={closeCart}
            aria-label="Close cart"
            className="text-ink-soft hover:text-ink"
          >
            ✕
          </button>
        </div>

        {error && (
          <div
            role="alert"
            className="flex items-start justify-between gap-3 border-b border-line bg-error/10 px-6 py-3 text-sm text-error"
          >
            <span>{error}</span>
            <button onClick={clearError} aria-label="Dismiss error" className="shrink-0 underline">
              Dismiss
            </button>
          </div>
        )}

        <div className="flex-1 overflow-y-auto px-6 py-4">
          {lines.length === 0 ? (
            <p className="text-ink-soft text-sm">Your cart is empty.</p>
          ) : (
            <ul className="space-y-4">
              {lines.map((line) => (
                <li key={line.lineId} className="flex gap-4">
                  <ProductSwatch
                    image={line.image}
                    showLabel={false}
                    className="h-20 w-20 shrink-0 rounded-sm"
                  />
                  <div className="flex-1 space-y-1">
                    <p className="text-sm text-ink">{line.title}</p>
                    {line.variantTitle !== "Default" && (
                      <p className="text-xs text-ink-soft">
                        {line.variantTitle}
                      </p>
                    )}
                    <p className="text-sm text-ink-soft">
                      {formatMoney(line.price)}
                    </p>
                    {line.quantityAvailable <= 5 && (
                      <p className="text-xs text-brass-dark">
                        Only {line.quantityAvailable} left
                      </p>
                    )}
                    <div className="flex items-center gap-2 pt-1">
                      <label className="sr-only" htmlFor={`qty-${line.lineId}`}>
                        Quantity for {line.title}
                      </label>
                      <select
                        id={`qty-${line.lineId}`}
                        value={line.quantity}
                        onChange={(e) =>
                          updateQuantity(line.lineId, Number(e.target.value))
                        }
                        className="border border-line rounded-sm text-sm px-2 py-1"
                      >
                        {Array.from(
                          { length: clampQuantity(line.quantityAvailable, line.quantityAvailable) },
                          (_, i) => i + 1
                        ).map((n) => (
                          <option key={n} value={n}>
                            {n}
                          </option>
                        ))}
                      </select>
                      <button
                        onClick={() => removeLine(line.lineId)}
                        className="text-xs text-ink-soft underline hover:text-error"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        {lines.length > 0 && (
          <div className="border-t border-line px-6 py-4 space-y-3">
            <div className="flex justify-between text-sm">
              <span className="text-ink-soft">Subtotal</span>
              <span className="text-ink">
                {formatMoney({ amount: subtotal, currencyCode: "USD" })}
              </span>
            </div>
            <Link
              href="/checkout"
              onClick={closeCart}
              aria-disabled={isLoading}
              className="block w-full text-center bg-ink text-paper py-3 text-sm tracking-wide hover:bg-ink-soft transition-colors"
            >
              {isLoading ? "Updating…" : isPreviewMode ? "Checkout (preview)" : "Checkout"}
            </Link>
            {isPreviewMode && (
              <p className="text-xs text-ink-soft text-center">
                Preview build — checkout is disabled until Shopify is connected.
              </p>
            )}
          </div>
        )}
      </aside>
    </div>
  );
}
