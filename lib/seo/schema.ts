import { SITE_URL } from "@/lib/env";
import type { Collection, Product } from "@/lib/shopify/types";
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

export function productSchema(product: Product, reviewSummary?: ReviewSummary) {
  const prices = product.variants.map((v) => v.price.amount);
  const inStock = product.variants.some((v) => v.available && v.quantityAvailable > 0);
  const currency = product.variants[0]?.price.currencyCode ?? "USD";

  return {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.title,
    description: product.description,
    url: `${SITE_URL}/products/${product.handle}`,
    brand: { "@type": "Brand", name: BRAND_NAME },
    ...(product.material ? { material: product.material } : {}),
    ...(product.images[0]?.url ? { image: product.images.map((i) => i.url).filter(Boolean) } : {}),
    // Only present when there are real reviews — an aggregateRating with
    // no reviews behind it is exactly the kind of fake data this project
    // avoids elsewhere (see README "Prepared, not built").
    ...(reviewSummary && reviewSummary.count > 0
      ? {
          aggregateRating: {
            "@type": "AggregateRating",
            ratingValue: reviewSummary.average,
            reviewCount: reviewSummary.count,
          },
        }
      : {}),
    offers: {
      "@type": "AggregateOffer",
      priceCurrency: currency,
      lowPrice: Math.min(...prices),
      highPrice: Math.max(...prices),
      offerCount: product.variants.length,
      availability: inStock ? "https://schema.org/InStock" : "https://schema.org/OutOfStock",
      url: `${SITE_URL}/products/${product.handle}`,
    },
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
