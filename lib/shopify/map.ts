import type { Collection, Product } from "./types";

// Minimal shapes for the fields we query — not the full Storefront API schema.
type ShopifyMoney = { amount: string; currencyCode: string };
type ShopifyEdge<T> = { edges: { node: T }[] };

type ShopifyVariantNode = {
  id: string;
  title: string;
  sku: string | null;
  availableForSale: boolean;
  quantityAvailable: number | null;
  selectedOptions: { name: string; value: string }[];
  price: ShopifyMoney;
};

type ShopifyProductNode = {
  id: string;
  handle: string;
  title: string;
  description: string;
  descriptionHtml: string;
  productType: string | null;
  seo: { title: string | null; description: string | null };
  // Requested by identifier, so entries are null when a product has no value.
  metafields: ({ key: string; value: string } | null)[];
  images: ShopifyEdge<{ url: string; altText: string | null }>;
  options: { name: string; values: string[] }[];
  variants: ShopifyEdge<ShopifyVariantNode>;
  collections: ShopifyEdge<{ handle: string }>;
};

type ShopifyCollectionNode = {
  handle: string;
  title: string;
  description: string;
};

// Neutral placeholder gradient used only if a Shopify product somehow has
// no images yet — ProductSwatch renders the real photo whenever url exists.
const FALLBACK_GRADIENT = { from: "#e4dccb", to: "#f1ebe1" };

// Values of the storefront-readable `specs.*` metafields (see
// docs/catalog-standard.md), keyed without the namespace.
function specsOf(node: ShopifyProductNode): Record<string, string> {
  const specs: Record<string, string> = {};
  for (const m of node.metafields ?? []) {
    if (m) specs[m.key] = m.value;
  }
  return specs;
}

function parseList(value: string | undefined): string[] {
  if (!value) return [];
  try {
    const parsed: unknown = JSON.parse(value);
    return Array.isArray(parsed) ? parsed.filter((v): v is string => typeof v === "string") : [];
  } catch {
    return [];
  }
}

export function mapShopifyProduct(node: ShopifyProductNode): Product {
  const specs = specsOf(node);

  const images =
    node.images.edges.length > 0
      ? node.images.edges.map((e) => ({
          alt: e.node.altText ?? node.title,
          url: e.node.url,
          ...FALLBACK_GRADIENT,
        }))
      : [{ alt: node.title, ...FALLBACK_GRADIENT }];

  return {
    id: node.id,
    handle: node.handle,
    title: node.title,
    description: node.description,
    descriptionHtml: node.descriptionHtml || undefined,
    seoTitle: node.seo?.title || undefined,
    seoDescription: node.seo?.description || undefined,
    productType: node.productType || undefined,
    collectionHandles: node.collections.edges.map((e) => e.node.handle),
    images,
    options: node.options,
    // Product type is the product noun ("Serving Dish"), never a material —
    // material comes only from the confirmed specs.material_detail field.
    material: specs.material_detail || undefined,
    careInstructions: specs.care_instructions || undefined,
    occasion: parseList(specs.occasions),
    variants: node.variants.edges.map((e) => ({
      id: e.node.id,
      title: e.node.title,
      sku: e.node.sku || undefined,
      price: {
        amount: Number(e.node.price.amount),
        currencyCode: e.node.price.currencyCode,
      },
      available: e.node.availableForSale,
      quantityAvailable: e.node.quantityAvailable ?? 0,
      selectedOptions: e.node.selectedOptions,
    })),
  };
}

export function mapShopifyCollection(node: ShopifyCollectionNode): Collection {
  return {
    handle: node.handle,
    title: node.title,
    description: node.description,
  };
}

export type { ShopifyProductNode, ShopifyCollectionNode, ShopifyEdge };
