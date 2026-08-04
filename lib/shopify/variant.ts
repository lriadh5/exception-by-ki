import type { Product, ProductVariant } from "./types";

export type OptionSelections = Record<string, string>;

/** The default selection: the first variant's own option values. */
export function defaultSelections(product: Product): OptionSelections {
  const first = product.variants[0];
  const selections: OptionSelections = {};
  first?.selectedOptions.forEach((opt) => {
    selections[opt.name] = opt.value;
  });
  return selections;
}

/**
 * Finds the variant matching every selected option value exactly.
 * Returns undefined if the combination doesn't exist (e.g. a size/color
 * pairing that was never stocked) so callers can show "not available"
 * instead of silently falling back to an unrelated variant.
 */
export function findVariantByOptions(
  product: Product,
  selections: OptionSelections
): ProductVariant | undefined {
  return product.variants.find((variant) =>
    variant.selectedOptions.every((opt) => selections[opt.name] === opt.value)
  );
}

/** True if a given value is selectable for an option, holding the other selections fixed. */
export function isOptionValueAvailable(
  product: Product,
  optionName: string,
  value: string,
  selections: OptionSelections
): boolean {
  const candidate = { ...selections, [optionName]: value };
  const variant = findVariantByOptions(product, candidate);
  return Boolean(variant && variant.available && variant.quantityAvailable > 0);
}

export const MAX_CART_QUANTITY_PER_LINE = 10;

/**
 * Clamps a requested quantity to a positive integer within stock and the
 * per-line cap. Returns 0 when nothing is in stock — callers should treat
 * 0 as "cannot add" rather than silently rounding up to 1.
 */
export function clampQuantity(requested: number, quantityAvailable: number): number {
  if (quantityAvailable <= 0) return 0;
  const cap = Math.min(MAX_CART_QUANTITY_PER_LINE, quantityAvailable);
  if (!Number.isFinite(requested)) return 1;
  const whole = Math.floor(requested);
  return Math.max(1, Math.min(whole, cap));
}
