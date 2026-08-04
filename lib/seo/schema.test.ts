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
  const dutchOven = getProductByHandle("heritage-cast-iron-dutch-oven") as Product;

  it("computes low/high price across variants and marks in-stock when any variant has stock", () => {
    const schema = productSchema(dutchOven);
    expect(schema.offers.lowPrice).toBe(189);
    expect(schema.offers.highPrice).toBe(249);
    expect(schema.offers.availability).toBe("https://schema.org/InStock");
  });

  it("marks a fully sold-out product as OutOfStock", () => {
    const soldOut: Product = {
      ...dutchOven,
      variants: dutchOven.variants.map((v) => ({ ...v, available: false, quantityAvailable: 0 })),
    };
    expect(productSchema(soldOut).offers.availability).toBe("https://schema.org/OutOfStock");
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
