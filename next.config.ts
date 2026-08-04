import type { NextConfig } from "next";

/**
 * Content-Security-Policy — static, not nonce-based.
 *
 * A per-request nonce is the stronger option, but it requires reading the
 * nonce via next/headers() to attach it to inline scripts, and doing that
 * anywhere in the root layout (needed for our site-wide Organization/
 * WebSite JSON-LD) forces every single page in the app into dynamic,
 * server-rendered-per-request mode — killing static generation for the
 * whole catalog. That's a worse trade for an SEO/performance-first content
 * site than the reduced script-src protection below.
 *
 * script-src and style-src both need 'unsafe-inline': script-src for
 * Next.js's own inline hydration/RSC-payload scripts and our JSON-LD
 * blocks; style-src for per-product inline `style` attributes (dynamic
 * swatch gradient colors). The other directives (frame-ancestors,
 * base-uri, form-action, object-src, connect-src, img-src) still do real
 * work regardless. Revisit if the site moves to fully dynamic/PPR
 * rendering, or if swatch colors move to CSS custom properties + classes
 * (removing the style-src need) and inline scripts are eliminated.
 */
const csp = [
  `default-src 'self'`,
  `script-src 'self' 'unsafe-inline'`,
  `style-src 'self' 'unsafe-inline'`,
  `img-src 'self' data: blob: https://cdn.shopify.com`,
  `font-src 'self' data:`,
  `connect-src 'self' https://*.myshopify.com`,
  `object-src 'none'`,
  `frame-ancestors 'none'`,
  `base-uri 'self'`,
  `form-action 'self'`,
  `upgrade-insecure-requests`,
].join("; ");

const securityHeaders = [
  { key: "Content-Security-Policy", value: csp },
  {
    key: "Strict-Transport-Security",
    value: "max-age=63072000; includeSubDomains; preload",
  },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "X-Frame-Options", value: "DENY" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  {
    key: "Permissions-Policy",
    value: [
      "camera=()",
      "microphone=()",
      "geolocation=()",
      "browsing-topics=()",
      "interest-cohort=()",
    ].join(", "),
  },
];

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [{ protocol: "https", hostname: "cdn.shopify.com" }],
  },
  async headers() {
    return [
      {
        source: "/:path*",
        headers: securityHeaders,
      },
    ];
  },
};

export default nextConfig;
