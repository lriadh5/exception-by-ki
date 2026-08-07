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

describe("productSchema", () => {
  const casserole = getProductByHandle("hand-hammered-silver-casserole") as Product;

  it("computes low/high price across variants and marks in-stock when any variant has stock", () => {
    const schema = productSchema(casserole);
    expect(schema.offers.lowPrice).toBe(245);
    expect(schema.offers.highPrice).toBe(315);
    expect(schema.offers.availability).toBe("https://schema.org/InStock");
  });

  it("marks a fully sold-out product as OutOfStock", () => {
    const soldOut: Product = {
      ...casserole,
      variants: casserole.variants.map((v) => ({ ...v, available: false, quantityAvailable: 0 })),
    };
    expect(productSchema(soldOut).offers.availability).toBe("https://schema.org/OutOfStock");
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
