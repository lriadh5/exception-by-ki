import { SITE_URL } from "@/lib/env";
import type { Collection, Product, ProductVariant } from "@/lib/shopify/types";
import type { ReviewSummary } from "@/lib/reviews/types";
import type { ContentRecord } from "@/lib/content/types";

const BRAND_NAME = "Exception by K&I";

export function organizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: BRAND_NAME,
    url: SITE_URL,
    logo: `${SITE_URL}/logo-badge.png`,
  };
}

export function websiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: BRAND_NAME,
    url: SITE_URL,
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `${SITE_URL}/search?q={search_term_string}`,
      },
      "query-input": "required name=search_term_string",
    },
  };
}

export type BreadcrumbItem = { name: string; path: string };

export function breadcrumbSchema(items: BreadcrumbItem[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: `${SITE_URL}${item.path}`,
    })),
  };
}

// schema.org properties that ProductGroup.variesBy accepts, keyed by the
// lowercased Shopify option name. Options outside this map are still
// described per variant through the variant name.
const VARIES_BY: Record<string, string> = {
  size: "https://schema.org/size",
  color: "https://schema.org/color",
  colour: "https://schema.org/color",
  material: "https://schema.org/material",
  pattern: "https://schema.org/pattern",
};

function variantOffer(product: Product, variant: ProductVariant) {
  return {
    "@type": "Offer",
    price: variant.price.amount.toFixed(2),
    priceCurrency: variant.price.currencyCode,
    availability:
      variant.available && variant.quantityAvailable > 0
        ? "https://schema.org/InStock"
        : "https://schema.org/OutOfStock",
    itemCondition: "https://schema.org/NewCondition",
    url: `${SITE_URL}/products/${product.handle}`,
  };
}

export function productSchema(product: Product, reviewSummary?: ReviewSummary) {
  const url = `${SITE_URL}/products/${product.handle}`;
  const images = product.images
    .map((i) => i.url)
    .filter((u): u is string => Boolean(u))
    .map((u) => (u.startsWith("http") ? u : `${SITE_URL}${u}`));

  // Fields shared by the product (or product group) and each variant.
  // No gtin: only real barcodes may ever be emitted, and none exist yet.
  const shared = {
    description: product.description,
    brand: { "@type": "Brand", name: BRAND_NAME },
    ...(product.material ? { material: product.material } : {}),
    ...(product.productType ? { category: product.productType } : {}),
    ...(images.length > 0 ? { image: images } : {}),
  };

  // Only present when there are real reviews — an aggregateRating with
  // no reviews behind it is exactly the kind of fake data this project
  // avoids elsewhere (see README "Prepared, not built").
  const rating =
    reviewSummary && reviewSummary.count > 0
      ? {
          aggregateRating: {
            "@type": "AggregateRating",
            ratingValue: reviewSummary.average,
            reviewCount: reviewSummary.count,
          },
        }
      : {};

  if (product.variants.length === 1) {
    const [variant] = product.variants;
    return {
      "@context": "https://schema.org",
      "@type": "Product",
      name: product.title,
      url,
      ...shared,
      ...(variant.sku ? { sku: variant.sku } : {}),
      ...rating,
      offers: variantOffer(product, variant),
    };
  }

  // Multiple variants: a ProductGroup with one Product per variant, so each
  // size/finish carries its own SKU, price and availability.
  const variesBy = product.options
    .map((o) => VARIES_BY[o.name.toLowerCase()])
    .filter((v): v is string => Boolean(v));

  return {
    "@context": "https://schema.org",
    "@type": "ProductGroup",
    name: product.title,
    url,
    productGroupID: product.handle,
    ...(variesBy.length > 0 ? { variesBy } : {}),
    ...shared,
    ...rating,
    hasVariant: product.variants.map((variant) => ({
      "@type": "Product",
      name: `${product.title} – ${variant.title}`,
      ...shared,
      ...(variant.sku ? { sku: variant.sku } : {}),
      ...Object.fromEntries(
        variant.selectedOptions
          .filter((o) => VARIES_BY[o.name.toLowerCase()])
          .map((o) => [VARIES_BY[o.name.toLowerCase()].replace("https://schema.org/", ""), o.value])
      ),
      offers: variantOffer(product, variant),
    })),
  };
}

export function collectionPageSchema(collection: Collection, productCount: number) {
  return {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: collection.title,
    description: collection.description,
    url: `${SITE_URL}/collections/${collection.handle}`,
    numberOfItems: productCount,
  };
}

export function articleSchema(content: ContentRecord) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: content.title,
    description: content.metaDescription,
    url: `${SITE_URL}/guides/${content.slug}`,
    datePublished: content.publishedAt,
    author: { "@type": "Organization", name: BRAND_NAME },
    publisher: { "@type": "Organization", name: BRAND_NAME, logo: `${SITE_URL}/logo-badge.png` },
  };
}
