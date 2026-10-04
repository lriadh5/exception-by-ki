"use client";

import { useState } from "react";
import type { Product, ProductVariant } from "@/lib/shopify/types";
import { formatMoney } from "@/lib/format";
import { useCart } from "@/lib/cart/cart-context";
import {
  clampQuantity,
  isOptionValueAvailable,
  isOptionValueValid,
  type OptionSelections,
} from "@/lib/shopify/variant";

/**
 * Selections/variant are owned by ProductDetail (the parent) rather than
 * this form, so the gallery can react to color changes too — see
 * ProductDetail.tsx.
 */
export function AddToCartForm({
  product,
  selections,
  onSelectOption,
  variant,
}: {
  product: Product;
  selections: OptionSelections;
  onSelectOption: (name: string, value: string) => void;
  variant: ProductVariant | undefined;
}) {
  const { addLine, error: cartError, isLoading } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [justAdded, setJustAdded] = useState(false);
  const [localError, setLocalError] = useState<string | null>(null);

  const inStock = Boolean(variant && variant.available && variant.quantityAvailable > 0);
  const maxQuantity = variant ? clampQuantity(variant.quantityAvailable, variant.quantityAvailable) : 1;

  function selectOption(name: string, value: string) {
    onSelectOption(name, value);
    setQuantity(1);
    setLocalError(null);
  }

  async function handleAddToCart() {
    if (!variant) {
      setLocalError("This combination isn't available.");
      return;
    }
    setLocalError(null);
    await addLine(
      {
        productHandle: product.handle,
        variantId: variant.id,
        title: product.title,
        variantTitle: variant.title,
        price: variant.price,
        image: product.images[0],
        quantityAvailable: variant.quantityAvailable,
      },
      quantity
    );
    setJustAdded(true);
    window.setTimeout(() => setJustAdded(false), 2000);
  }

  return (
    <div className="space-y-6">
      <p className="text-2xl text-ink">{variant ? formatMoney(variant.price) : "—"}</p>

      {product.options.map((option) => (
        <fieldset key={option.name}>
          <legend className="text-sm text-ink mb-2">{option.name}</legend>
          <div className="flex flex-wrap gap-2">
            {option.values.map((value) => {
              const active = selections[option.name] === value;
              // A swatch stays clickable (to preview the photo/details) as
              // long as the combination genuinely exists, even when it's
              // out of stock — only Add to Cart is gated on real stock.
              const valid = isOptionValueValid(product, option.name, value, selections);
              const inStock = isOptionValueAvailable(product, option.name, value, selections);
              return (
                <button
                  key={value}
                  type="button"
                  onClick={() => selectOption(option.name, value)}
                  aria-pressed={active}
                  disabled={!valid}
                  title={valid && !inStock ? `${value} — out of stock` : !valid ? `${value} — not available` : undefined}
                  className={`px-4 py-2 text-sm border rounded-sm transition-colors ${
                    active
                      ? "border-brand bg-brand text-paper"
                      : !valid
                        ? "border-line text-ink-soft/40 line-through cursor-not-allowed"
                        : inStock
                          ? "border-line text-ink-soft hover:border-brand"
                          : "border-line text-ink-soft hover:border-brand opacity-60"
                  }`}
                >
                  {value}
                </button>
              );
            })}
          </div>
        </fieldset>
      ))}

      <div className="flex items-center gap-4">
        <label htmlFor="quantity" className="text-sm text-ink">
          Quantity
        </label>
        <select
          id="quantity"
          value={quantity}
          onChange={(e) => setQuantity(clampQuantity(Number(e.target.value), maxQuantity))}
          disabled={!inStock}
          className="border border-line rounded-sm text-sm px-3 py-2 disabled:opacity-50"
        >
          {Array.from({ length: Math.max(maxQuantity, 1) }, (_, i) => i + 1).map((n) => (
            <option key={n} value={n}>
              {n}
            </option>
          ))}
        </select>
      </div>

      {variant && variant.quantityAvailable > 0 && variant.quantityAvailable <= 5 && (
        <p className="text-sm text-warning">Only {variant.quantityAvailable} left in stock.</p>
      )}

      {(localError || cartError) && (
        <p role="alert" className="text-sm text-error">
          {localError ?? cartError}
        </p>
      )}

      <button
        onClick={handleAddToCart}
        disabled={!inStock || isLoading}
        aria-busy={isLoading}
        className="w-full bg-brand text-paper py-4 text-sm tracking-wide transition-all duration-300 hover:bg-brand-dark hover:shadow-md disabled:opacity-50 disabled:hover:shadow-none"
      >
        {!variant
          ? "Select options"
          : !inStock
            ? "Out of Stock"
            : isLoading
              ? "Adding…"
              : justAdded
                ? "Added ✓"
                : "Add to Cart"}
      </button>
    </div>
  );
}
