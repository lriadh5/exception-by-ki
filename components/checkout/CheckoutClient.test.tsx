import { afterEach, beforeEach, describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import { CheckoutClient } from "./CheckoutClient";
import { CartProvider } from "@/lib/cart/cart-context";
import type { CartLine } from "@/lib/shopify/types";

const STORAGE_KEY = "exception-by-ki-cart";

const seededLine: CartLine = {
  lineId: "line-1",
  productHandle: "mirror-rectangular-tray-set",
  variantId: "gid://mock/Variant/5-default",
  title: "Mirror Rectangular Trays, Set of Two",
  variantTitle: "2-Piece Set",
  price: { amount: 135, currencyCode: "USD" },
  image: { alt: "Mirror Rectangular Trays, Set of Two", from: "#cfd1d2", to: "#95989a" },
  quantity: 1,
  quantityAvailable: 22,
};

function seedCart(lines: CartLine[]) {
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(lines));
}

function renderCheckout(isPreviewMode: boolean) {
  return render(
    <CartProvider isPreviewMode={isPreviewMode}>
      <CheckoutClient />
    </CartProvider>
  );
}

describe("CheckoutClient", () => {
  beforeEach(() => {
    window.localStorage.clear();
  });
  afterEach(() => {
    window.localStorage.clear();
  });

  it("never renders any input field in preview mode — no email or address is collected", async () => {
    seedCart([seededLine]);
    renderCheckout(true);
    await screen.findByText(seededLine.title);
    expect(document.querySelectorAll("input")).toHaveLength(0);
  });

  it("never renders any input field once a Shopify store is connected either", async () => {
    seedCart([seededLine]);
    renderCheckout(false);
    await screen.findByText(seededLine.title);
    expect(document.querySelectorAll("input")).toHaveLength(0);
  });

  it("shows a disabled, explanatory state in preview mode instead of a checkout button", async () => {
    seedCart([seededLine]);
    renderCheckout(true);
    await screen.findByText(seededLine.title);

    const button = screen.getByRole("button", { name: /checkout unavailable/i });
    expect(button).toBeDisabled();
    expect(screen.getByText(/no email, no address, no payment details/i)).toBeInTheDocument();
    expect(screen.queryByRole("button", { name: /continue to secure checkout/i })).not.toBeInTheDocument();
  });

  it("offers a real checkout handoff button once a Shopify store is connected", async () => {
    seedCart([seededLine]);
    renderCheckout(false);
    await screen.findByText(seededLine.title);

    const button = screen.getByRole("button", { name: /continue to secure checkout/i });
    expect(button).toBeEnabled();
    expect(screen.queryByRole("button", { name: /checkout unavailable/i })).not.toBeInTheDocument();
  });

  it("shows an empty-cart state instead of any checkout UI when the cart is empty", () => {
    renderCheckout(true);
    expect(screen.getByText(/your cart is empty/i)).toBeInTheDocument();
    expect(screen.queryByText(/order summary/i)).not.toBeInTheDocument();
  });
});
