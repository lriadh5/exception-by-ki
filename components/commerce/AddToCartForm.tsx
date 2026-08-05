"use client";

import { useMemo, useState } from "react";
import type { Product } from "@/lib/shopify/types";
import { formatMoney } from "@/lib/format";
import { useCart } from "@/lib/cart/cart-context";
import {
  clampQuantity,
  defaultSelections,
  findVariantByOptions,
  isOptionValueAvailable,
  type OptionSelections,
} from "@/lib/shopify/variant";

export function AddToCartForm({ product }: { product: Product }) {
  const { addLine, error: cartError, isLoading } = useCart();
  const [selections, setSelections] = useState<OptionSelections>(() => defaultSelections(product));
  const [quantity, setQuantity] = useState(1);
  const [justAdded, setJustAdded] = useState(false);
  const [localError, setLocalError] = useState<string | null>(null);

  const variant = useMemo(
    () => findVariantByOptions(product, selections),
    [product, selections]
  );

  const inStock = Boolean(variant && variant.available && variant.quantityAvailable > 0);
  const maxQuantity = variant ? clampQuantity(variant.quantityAvailable, variant.quantityAvailable) : 1;

  function selectOption(name: string, value: string) {
    setSelections((prev) => ({ ...prev, [name]: value }));
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
              const available = isOptionValueAvailable(product, option.name, value, selections);
              return (
                <button
                  key={value}
                  type="button"
                  onClick={() => selectOption(option.name, value)}
                  aria-pressed={active}
                  disabled={!available && !active}
                  title={!available && !active ? `${value} — not available with current selection` : undefined}
                  className={`px-4 py-2 text-sm border rounded-sm transition-colors ${
                    active
                      ? "border-ink bg-ink text-paper"
                      : available
                        ? "border-line text-ink-soft hover:border-ink"
                        : "border-line text-ink-soft/40 line-through cursor-not-allowed"
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
        <p className="text-sm text-brass-dark">Only {variant.quantityAvailable} left in stock.</p>
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
        className="w-full bg-ink text-paper py-4 text-sm tracking-wide transition-all duration-300 hover:bg-ink-soft hover:shadow-md disabled:opacity-50 disabled:hover:shadow-none"
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
