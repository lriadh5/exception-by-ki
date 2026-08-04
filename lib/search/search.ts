import type { Product } from "@/lib/shopify/types";

/**
 * Simple client-catalog substring search over title/description/material.
 * Works fine at sample-catalog scale. Swap for Shopify's Predictive
 * Search API or a dedicated search provider (Algolia/Typesense) once the
 * catalog is large enough that relevance ranking matters — see README
 * "Prepared, not built" for the extension point.
 */
export function searchProducts(products: Product[], query: string): Product[] {
  const q = query.trim().toLowerCase();
  if (!q) return [];
  return products.filter((p) =>
    [p.title, p.description, p.material ?? ""].some((field) => field.toLowerCase().includes(q))
  );
}
