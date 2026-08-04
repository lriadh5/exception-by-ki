import type { Product } from "@/lib/shopify/types";

export function collectMaterials(products: Product[]): string[] {
  const set = new Set<string>();
  products.forEach((p) => {
    if (p.material) set.add(p.material);
  });
  return Array.from(set).sort();
}

export function filterByMaterial(products: Product[], material: string | string[] | undefined): Product[] {
  const value = Array.isArray(material) ? material[0] : material;
  if (!value) return products;
  return products.filter((p) => p.material === value);
}
