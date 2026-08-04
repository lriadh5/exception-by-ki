import type { Product } from "@/lib/shopify/types";

export type SortKey = "relevance" | "price-asc" | "price-desc" | "title-asc";
export const SORT_KEYS: SortKey[] = ["relevance", "price-asc", "price-desc", "title-asc"];

export const SORT_LABELS: Record<SortKey, string> = {
  relevance: "Featured",
  "price-asc": "Price: Low to High",
  "price-desc": "Price: High to Low",
  "title-asc": "Name: A to Z",
};

function lowestPrice(p: Product): number {
  return p.variants.reduce((min, v) => Math.min(min, v.price.amount), Infinity);
}

export function sortProducts(products: Product[], sort: SortKey): Product[] {
  switch (sort) {
    case "price-asc":
      return [...products].sort((a, b) => lowestPrice(a) - lowestPrice(b));
    case "price-desc":
      return [...products].sort((a, b) => lowestPrice(b) - lowestPrice(a));
    case "title-asc":
      return [...products].sort((a, b) => a.title.localeCompare(b.title));
    case "relevance":
    default:
      return products;
  }
}

export function parseSortParam(value: string | string[] | undefined): SortKey {
  const v = Array.isArray(value) ? value[0] : value;
  return (SORT_KEYS as string[]).includes(v ?? "") ? (v as SortKey) : "relevance";
}
