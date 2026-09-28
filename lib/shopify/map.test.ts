import { describe, expect, it } from "vitest";
import { mapShopifyProduct } from "./map";

type Node = Parameters<typeof mapShopifyProduct>[0];

const node = (overrides: Partial<Node> = {}): Node => ({
  id: "gid://shopify/Product/1",
  handle: "hand-hammered-oval-serving-dish",
  title: "Hand-Hammered Stainless Steel Oval Serving Dish with Gold Handles",
  description: "Plain description.",
  descriptionHtml: "<p>Plain description.</p>",
  productType: "Serving Dish",
  seo: { title: "Hammered Oval Serving Dish | Exception by K&I", description: "SEO description." },
  metafields: [
    { key: "material_detail", value: "Hammered stainless steel; gold-plated handles" },
    { key: "care_instructions", value: "Hand wash only." },
    { key: "occasions", value: '["Everyday","Hosting"]' },
  ],
  images: { edges: [] },
  options: [{ name: "Size", values: ["10 Inch"] }],
  variants: {
    edges: [
      {
        node: {
          id: "gid://shopify/ProductVariant/1",
          title: "10 Inch",
          sku: "EKI-OVAL-10",
          availableForSale: true,
          quantityAvailable: 5,
          selectedOptions: [{ name: "Size", value: "10 Inch" }],
          price: { amount: "35.0", currencyCode: "USD" },
        },
      },
    ],
  },
  collections: { edges: [] },
  ...overrides,
});

describe("mapShopifyProduct", () => {
  it("reads material, care and occasions from specs metafields", () => {
    const product = mapShopifyProduct(node());
    expect(product.material).toBe("Hammered stainless steel; gold-plated handles");
    expect(product.careInstructions).toBe("Hand wash only.");
    expect(product.occasion).toEqual(["Everyday", "Hosting"]);
  });

  it("never uses the product type as the material", () => {
    const product = mapShopifyProduct(node({ metafields: [null, null, null] }));
    expect(product.material).toBeUndefined();
    expect(product.productType).toBe("Serving Dish");
    expect(product.occasion).toEqual([]);
  });

  it("carries SEO fields, formatted description and variant SKUs", () => {
    const product = mapShopifyProduct(node());
    expect(product.seoTitle).toBe("Hammered Oval Serving Dish | Exception by K&I");
    expect(product.seoDescription).toBe("SEO description.");
    expect(product.descriptionHtml).toBe("<p>Plain description.</p>");
    expect(product.variants[0].sku).toBe("EKI-OVAL-10");
  });

  it("leaves SEO fields unset when Shopify has none", () => {
    const product = mapShopifyProduct(node({ seo: { title: null, description: null }, descriptionHtml: "" }));
    expect(product.seoTitle).toBeUndefined();
    expect(product.seoDescription).toBeUndefined();
    expect(product.descriptionHtml).toBeUndefined();
  });
});
