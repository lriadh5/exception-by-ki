# Exception by K&I — Storefront

Next.js (App Router) storefront. Runs in **preview mode** on a sample catalog
until a Shopify store is connected — see [Connecting Shopify](#connecting-shopify).
While in preview mode: checkout is disabled, a banner says so site-wide, and
no customer data (email, address, payment) is collected anywhere.

## Local setup

Requires Node 20+.

```bash
npm install
cp .env.example .env.local   # then edit .env.local — see below
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Environment variables

See `.env.example` for the full list with inline docs. Summary:

| Variable | Required | Purpose |
|---|---|---|
| `NEXT_PUBLIC_SITE_URL` | **Yes, in production** | Canonical URLs, sitemap, robots.txt, Open Graph. `npm run build` fails without it when `NODE_ENV=production` — this is intentional (`lib/env.ts`). Optional in development (defaults to `http://localhost:3000`). |
| `SHOPIFY_STORE_DOMAIN` | No | Set together with the token below to leave preview mode and go live. |
| `SHOPIFY_STOREFRONT_ACCESS_TOKEN` | No | Same as above. |
| `SHOPIFY_API_VERSION` | No | Defaults to `2024-10`. |

`lib/env.ts` is the single source of truth for all of this — read it before
adding a new required variable, and add validation there rather than
scattering `process.env` reads through the app.

## Connecting Shopify

Set both `SHOPIFY_STORE_DOMAIN` and `SHOPIFY_STOREFRONT_ACCESS_TOKEN` (get
the token from Shopify Admin → Settings → Apps and sales channels → Develop
apps → your app → Storefront API → install and reveal the token) and
restart the app. `lib/shopify/client.ts` switches from the sample catalog
(`lib/shopify/mock-data.ts`) to real Storefront API GraphQL calls
automatically — no page or component changes needed.

**This path hasn't been exercised against a live store yet.** The GraphQL
queries (`lib/shopify/queries.ts`) and response mapping
(`lib/shopify/map.ts`) are written to the documented 2024-10 schema, but the
first real connection should be treated as an integration test: watch the
server logs for `ShopifyApiError`, and check that product images, prices,
and variant options render as expected. If a field name doesn't match,
that's the file to fix.

Once connected: the preview banner disappears, checkout becomes a real
button that creates a Shopify cart server-side (`app/api/checkout/route.ts`)
and redirects to Shopify's hosted checkout, and the sample-data warning in
server logs stops firing.

## Prepared, not built

Several features have real architecture (types, folder structure, a
working extension point) but aren't fully built out, on purpose — building
them further without a real backend would mean either faking data or
faking success states, both worse than not having the feature yet:

- **Reviews** (`lib/reviews/types.ts`) — no UI yet; needs a real reviews provider.
- **Customer accounts** (`lib/account/types.ts`, `app/account/page.tsx`) — stub "not available" page; needs Shopify Customer Accounts or a custom auth provider.
- **Newsletter** (`components/marketing/NewsletterForm.tsx`, `app/api/newsletter/route.ts`) — real form, but the API route always returns "not connected yet" until an ESP (e.g. Klaviyo) is wired up.
- **Analytics** (`lib/analytics/analytics.ts`) — real event-tracking calls exist at the right call sites (e.g. add-to-cart) and respect cookie consent, but there's no provider (GA4/Meta) wired up yet — see the `TODO(analytics)` in that file.

Fully working today, client-side only, no backend needed: search
(`/search`), collection sort/filter/pagination, product recommendations,
recently viewed, and wishlist (`/wishlist`). Wishlist and recently-viewed
are saved to `localStorage` only — not synced to an account.

## Testing

```bash
npm test          # run once
npm run test:watch
```

Vitest + React Testing Library, `jsdom` environment. Coverage focuses on
business logic that's easy to get subtly wrong: `lib/cart/reducer.test.ts`
(quantity/inventory clamping), `lib/shopify/variant.test.ts` (multi-option
variant matching), `lib/format.test.ts` (pricing), `lib/seo/schema.test.ts`
(JSON-LD builders), `components/layout/Header.test.tsx` (nav + aria state),
and `components/checkout/CheckoutClient.test.tsx` (asserts zero `<input>`
elements ever render on the checkout page — the regression test for the
"don't collect PII on a fake checkout" fix).

There's no E2E suite yet (Playwright would be the natural addition —
nothing here precludes it).

## Deployment

Any Next.js host works (Vercel is the reference target; the app has no
Vercel-specific code). Required at deploy time:

1. Set `NEXT_PUBLIC_SITE_URL` to the real production origin — the build
   fails without it.
2. Set the Shopify variables if going live with a connected store (see
   above); leave them unset to deploy in preview mode.
3. `npm run build` runs `next build`, which also type-checks
   (`next build` fails on TypeScript errors) and lints is a separate step —
   run `npm run lint` in CI too.

Suggested CI gate before merge/deploy: `npm ci && npm run lint && npm run
build && npm test`.

### Rollback

- **Platform-level (Vercel or similar):** use the host's instant rollback
  to the previous deployment — this is the fastest path and doesn't
  require touching git.
- **Git-level:** every meaningful change is its own commit (see git log) —
  `git revert <commit>` the offending commit and redeploy rather than
  force-pushing or resetting history.
- **Content-only issues** (a bad product/collection edit once Shopify is
  connected): fix in Shopify Admin — the storefront re-reads on next
  request/revalidation, no redeploy needed.

## Security headers & CSP

Set in `next.config.ts`: HSTS, `X-Content-Type-Options`,
`X-Frame-Options`, `Referrer-Policy`, `Permissions-Policy`, and a
Content-Security-Policy. The CSP is **static, not nonce-based** —
`next.config.ts` has the full rationale in a comment, short version: a
per-request nonce requires reading `next/headers()`, and doing that in the
root layout (needed for site-wide JSON-LD) forces every page into dynamic
rendering, which is a worse trade for this mostly-static catalog site than
allowing `'unsafe-inline'` on `script-src`/`style-src`. Revisit if the app
moves to fully dynamic rendering.

## Project structure

```
app/                    Routes (App Router)
  collections/[handle]  PLP — sort, filter (by material), pagination
  products/[handle]     PDP — multi-option variants, recommendations, recently viewed
  checkout/              No PII collected — disabled in preview mode, real handoff when connected
  api/checkout/          Server-side Shopify cart creation (credentials never reach the client)
  api/newsletter/        Honest "not connected yet" stub
  search/, wishlist/, account/   See "Prepared, not built" above
  about/, contact/, faq/, ...    Starter legal/info pages
components/
  commerce/              Product cards, variant picker, breadcrumbs, pagination
  layout/                Header, footer, cart drawer, preview banner, cookie consent
  seo/                   JSON-LD renderer
lib/
  shopify/               types.ts, mock-data.ts (sample data, dev-only), client.ts (adapter),
                         queries.ts + map.ts (real Storefront API), variant.ts (pure matching logic)
  cart/                  reducer.ts (pure, tested) + cart-context.tsx (React wrapper)
  seo/                   schema.ts — Organization/WebSite/Product/Breadcrumb/CollectionPage JSON-LD builders
  commerce/               sort.ts, filter.ts, pagination.ts — pure, tested
  env.ts                 Required/optional env var validation — read this first
```
