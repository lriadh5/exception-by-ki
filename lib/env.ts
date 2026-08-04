const isProduction = process.env.NODE_ENV === "production";

function requiredInProduction(name: string, value: string | undefined, devFallback: string): string {
  if (value && value.trim().length > 0) return value;
  if (isProduction) {
    throw new Error(
      `Missing required environment variable "${name}". ` +
        `Production builds must set this — see .env.example. ` +
        `(Local development falls back to a default; production does not.)`
    );
  }
  return devFallback;
}

/**
 * Site URL is required for production builds (used for canonical URLs, the
 * sitemap, robots.txt, and Open Graph metadata). Missing it in production
 * is a build-time failure by design — see .env.example.
 */
export const SITE_URL = requiredInProduction(
  "NEXT_PUBLIC_SITE_URL",
  process.env.NEXT_PUBLIC_SITE_URL,
  "http://localhost:3000"
).replace(/\/$/, "");

const SHOPIFY_STORE_DOMAIN = process.env.SHOPIFY_STORE_DOMAIN?.trim();
const SHOPIFY_STOREFRONT_ACCESS_TOKEN = process.env.SHOPIFY_STOREFRONT_ACCESS_TOKEN?.trim();

/**
 * True whenever no Shopify store is connected. The app runs entirely on
 * placeholder sample data in this mode, and checkout is disabled — see
 * lib/shopify/client.ts and app/checkout/page.tsx.
 */
export const IS_PREVIEW_MODE = !(SHOPIFY_STORE_DOMAIN && SHOPIFY_STOREFRONT_ACCESS_TOKEN);

export const shopifyConfig = IS_PREVIEW_MODE
  ? null
  : {
      storeDomain: SHOPIFY_STORE_DOMAIN as string,
      storefrontAccessToken: SHOPIFY_STOREFRONT_ACCESS_TOKEN as string,
      apiVersion: process.env.SHOPIFY_API_VERSION?.trim() || "2024-10",
    };

export const NODE_ENV = process.env.NODE_ENV;
