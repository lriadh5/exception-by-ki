import type { Collection, Product } from "./types";

// Minimal shapes for the fields we query — not the full Storefront API schema.
type ShopifyMoney = { amount: string; currencyCode: string };
type ShopifyEdge<T> = { edges: { node: T }[] };

type ShopifyVariantNode = {
  id: string;
  title: string;
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
  productType: string | null;
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

export function mapShopifyProduct(node: ShopifyProductNode): Product {
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
    collectionHandles: node.collections.edges.map((e) => e.node.handle),
    images,
    options: node.options,
    material: node.productType || undefined,
    careInstructions: undefined,
    occasion: [],
    variants: node.variants.edges.map((e) => ({
      id: e.node.id,
      title: e.node.title,
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
