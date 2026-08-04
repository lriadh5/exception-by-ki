import { shopifyConfig } from "@/lib/env";

export class ShopifyApiError extends Error {}

/**
 * ⚠️ Not yet exercised against a live store. Written to the documented
 * Storefront API 2024-10 shape; verify field names/response structure the
 * first time a real SHOPIFY_STORE_DOMAIN is connected, and adjust
 * lib/shopify/map.ts if anything doesn't match. See README "Connecting
 * Shopify".
 */
export async function shopifyFetch<T>(
  query: string,
  variables?: Record<string, unknown>
): Promise<T> {
  if (!shopifyConfig) {
    throw new ShopifyApiError(
      "shopifyFetch() called without SHOPIFY_STORE_DOMAIN / SHOPIFY_STOREFRONT_ACCESS_TOKEN set."
    );
  }

  const endpoint = `https://${shopifyConfig.storeDomain}/api/${shopifyConfig.apiVersion}/graphql.json`;

  const res = await fetch(endpoint, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-Shopify-Storefront-Access-Token": shopifyConfig.storefrontAccessToken,
    },
    body: JSON.stringify({ query, variables }),
    // Revalidated on a timer as a baseline; wire product/collection webhooks
    // to Next.js on-demand revalidation for near-real-time updates instead
    // of relying on this alone (see README).
    next: { revalidate: 60, tags: ["shopify"] },
  });

  if (!res.ok) {
    throw new ShopifyApiError(
      `Shopify Storefront API request failed: ${res.status} ${res.statusText}`
    );
  }

  const json = (await res.json()) as { data?: T; errors?: unknown };
  if (json.errors) {
    throw new ShopifyApiError(
      `Shopify Storefront API returned errors: ${JSON.stringify(json.errors)}`
    );
  }
  if (!json.data) {
    throw new ShopifyApiError("Shopify Storefront API returned no data.");
  }
  return json.data;
}
