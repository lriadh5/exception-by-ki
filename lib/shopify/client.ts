import {
  getAllCollections,
  getAllProducts,
  getCollectionByHandle,
  getProductByHandle,
  getProductsByCollection,
} from "./mock-data";
import type { Collection, Product } from "./types";
import { IS_PREVIEW_MODE } from "@/lib/env";
import { shopifyFetch } from "./shopify-fetch";
import {
  CART_CREATE_MUTATION,
  COLLECTIONS_QUERY,
  COLLECTION_BY_HANDLE_QUERY,
  PRODUCTS_QUERY,
  PRODUCT_BY_HANDLE_QUERY,
} from "./queries";
import { mapShopifyCollection, mapShopifyProduct } from "./map";
import type { ShopifyCollectionNode, ShopifyEdge, ShopifyProductNode } from "./map";

/**
 * Data adapter boundary. Every page/component reads the catalog through
 * these functions instead of importing mock-data or Shopify APIs directly.
 *
 * In preview mode (no Shopify store connected — the default) every
 * function below reads the sample catalog in mock-data.ts. Once
 * SHOPIFY_STORE_DOMAIN and SHOPIFY_STOREFRONT_ACCESS_TOKEN are set, the
 * same functions switch to real Storefront API GraphQL calls — no page or
 * component changes required. See README "Connecting Shopify".
 */

let hasWarnedAboutSampleData = false;
function warnOnceAboutSampleData() {
  if (hasWarnedAboutSampleData || process.env.NODE_ENV === "production") return;
  hasWarnedAboutSampleData = true;
  console.warn(
    "[exception-by-ki] Using sample catalog data (lib/shopify/mock-data.ts) — " +
      "no Shopify store connected. Set SHOPIFY_STORE_DOMAIN and " +
      "SHOPIFY_STOREFRONT_ACCESS_TOKEN to go live. See .env.example."
  );
}

export async function listCollections(): Promise<Collection[]> {
  if (IS_PREVIEW_MODE) {
    warnOnceAboutSampleData();
    return getAllCollections();
  }
  const data = await shopifyFetch<{ collections: ShopifyEdge<ShopifyCollectionNode> }>(
    COLLECTIONS_QUERY,
    { first: 25 }
  );
  return data.collections.edges.map((e) => mapShopifyCollection(e.node));
}

export async function getCollection(handle: string): Promise<Collection | undefined> {
  if (IS_PREVIEW_MODE) {
    warnOnceAboutSampleData();
    return getCollectionByHandle(handle);
  }
  const data = await shopifyFetch<{
    collection: (ShopifyCollectionNode & { products: ShopifyEdge<ShopifyProductNode> }) | null;
  }>(COLLECTION_BY_HANDLE_QUERY, { handle, first: 50 });
  return data.collection ? mapShopifyCollection(data.collection) : undefined;
}

export async function listProductsByCollection(handle: string): Promise<Product[]> {
  if (IS_PREVIEW_MODE) {
    warnOnceAboutSampleData();
    return getProductsByCollection(handle);
  }
  const data = await shopifyFetch<{
    collection: { products: ShopifyEdge<ShopifyProductNode> } | null;
  }>(COLLECTION_BY_HANDLE_QUERY, { handle, first: 50 });
  return data.collection ? data.collection.products.edges.map((e) => mapShopifyProduct(e.node)) : [];
}

export async function getProduct(handle: string): Promise<Product | undefined> {
  if (IS_PREVIEW_MODE) {
    warnOnceAboutSampleData();
    return getProductByHandle(handle);
  }
  const data = await shopifyFetch<{ product: ShopifyProductNode | null }>(
    PRODUCT_BY_HANDLE_QUERY,
    { handle }
  );
  return data.product ? mapShopifyProduct(data.product) : undefined;
}

export async function listAllProducts(): Promise<Product[]> {
  if (IS_PREVIEW_MODE) {
    warnOnceAboutSampleData();
    return getAllProducts();
  }
  const data = await shopifyFetch<{ products: ShopifyEdge<ShopifyProductNode> }>(PRODUCTS_QUERY, {
    first: 100,
  });
  return data.products.edges.map((e) => mapShopifyProduct(e.node));
}

export async function getFeaturedProducts(limit = 4): Promise<Product[]> {
  const all = await listAllProducts();
  return all.slice(0, limit);
}

export type CheckoutCartLine = { variantId: string; quantity: number };

/**
 * Creates a real Shopify cart and returns its hosted checkout URL. Only
 * callable when a Shopify store is connected — the checkout UI never
 * offers this path in preview mode. See app/checkout/page.tsx.
 */
export async function createCheckoutCart(
  lines: CheckoutCartLine[]
): Promise<{ checkoutUrl: string }> {
  if (IS_PREVIEW_MODE) {
    throw new Error("createCheckoutCart() is unavailable in preview mode (no Shopify store connected).");
  }
  const data = await shopifyFetch<{
    cartCreate: {
      cart: { id: string; checkoutUrl: string } | null;
      userErrors: { field: string[]; message: string }[];
    };
  }>(CART_CREATE_MUTATION, {
    lines: lines.map((l) => ({ merchandiseId: l.variantId, quantity: l.quantity })),
  });

  if (data.cartCreate.userErrors.length > 0) {
    throw new Error(data.cartCreate.userErrors.map((e) => e.message).join("; "));
  }
  if (!data.cartCreate.cart) {
    throw new Error("Shopify did not return a cart.");
  }
  return { checkoutUrl: data.cartCreate.cart.checkoutUrl };
}
