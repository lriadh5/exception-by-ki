import { describe, expect, it } from "vitest";
import { breadcrumbSchema, collectionPageSchema, organizationSchema, productSchema, websiteSchema } from "./schema";
import { getProductByHandle, getCollectionByHandle } from "@/lib/shopify/mock-data";
import type { Product } from "@/lib/shopify/types";

describe("organizationSchema / websiteSchema", () => {
  it("produce valid Organization and WebSite JSON-LD shapes", () => {
    expect(organizationSchema()).toMatchObject({
      "@context": "https://schema.org",
      "@type": "Organization",
      name: "Exception by K&I",
    });
    expect(websiteSchema()).toMatchObject({
      "@context": "https://schema.org",
      "@type": "WebSite",
      potentialAction: { "@type": "SearchAction" },
    });
  });
});

describe("breadcrumbSchema", () => {
  it("numbers items by position and builds absolute URLs", () => {
    const schema = breadcrumbSchema([
      { name: "Home", path: "/" },
      { name: "Cookware", path: "/collections/cookware" },
    ]);
    expect(schema.itemListElement).toHaveLength(2);
    expect(schema.itemListElement[0]).toMatchObject({ position: 1, name: "Home" });
    expect(schema.itemListElement[1].item).toMatch(/\/collections\/cookware$/);
  });
});

// Narrows productSchema's union to the ProductGroup shape.
function asGroup(schema: ReturnType<typeof productSchema>) {
  if (!("hasVariant" in schema)) throw new Error("expected a ProductGroup");
  return schema;
}

describe("productSchema", () => {
  const casserole = getProductByHandle("hand-hammered-silver-casserole") as Product;
  const ovalDish = getProductByHandle("hand-hammered-oval-serving-dish") as Product;

  it("describes a multi-variant product as a ProductGroup with one offer per variant", () => {
    const schema = asGroup(productSchema(ovalDish));
    expect(schema["@type"]).toBe("ProductGroup");
    expect(schema).toMatchObject({ productGroupID: "hand-hammered-oval-serving-dish", variesBy: ["https://schema.org/size"] });
    expect(schema.hasVariant).toHaveLength(3);
    expect(schema.hasVariant[0]).toMatchObject({
      "@type": "Product",
      sku: "EKI-OVAL-10",
      size: "10 Inch",
      material: "Hammered stainless steel; gold-plated handles",
      offers: {
        "@type": "Offer",
        price: "35.00",
        priceCurrency: "USD",
        availability: "https://schema.org/InStock",
        itemCondition: "https://schema.org/NewCondition",
      },
    });
  });

  it("marks each variant's availability separately", () => {
    const offers = asGroup(productSchema(casserole)).hasVariant.map((v) => v.offers.availability);
    expect(offers).toEqual([
      "https://schema.org/InStock",
      "https://schema.org/InStock",
      "https://schema.org/InStock",
      "https://schema.org/OutOfStock",
    ]);
  });

  it("describes a single-variant product as a Product with one Offer", () => {
    const single: Product = { ...ovalDish, variants: [ovalDish.variants[0]] };
    const schema = productSchema(single);
    expect(schema["@type"]).toBe("Product");
    expect(schema).toMatchObject({ sku: "EKI-OVAL-10", offers: { "@type": "Offer", price: "35.00" } });
  });

  it("never emits a gtin", () => {
    expect(JSON.stringify(productSchema(ovalDish))).not.toMatch(/gtin/i);
  });

  it("omits aggregateRating when there are no reviews", () => {
    const schema = productSchema(casserole, { average: 0, count: 0 });
    expect(schema).not.toHaveProperty("aggregateRating");
  });

  it("includes aggregateRating when there are reviews", () => {
    const schema = productSchema(casserole, { average: 4.5, count: 3 });
    expect(schema.aggregateRating).toEqual({
      "@type": "AggregateRating",
      ratingValue: 4.5,
      reviewCount: 3,
    });
  });
});

describe("collectionPageSchema", () => {
  it("includes the product count", () => {
    const cookware = getCollectionByHandle("cookware")!;
    const schema = collectionPageSchema(cookware, 6);
    expect(schema.numberOfItems).toBe(6);
    expect(schema["@type"]).toBe("CollectionPage");
  });
});
