import type { Collection, Product } from "./types";

/**
 * ⚠️ SAMPLE / PLACEHOLDER DATA — DEVELOPMENT ONLY ⚠️
 *
 * This catalog is fake. It exists so the storefront has something to
 * render before a real Shopify store is connected. It is shaped to mirror
 * the Shopify Storefront API (Product / ProductVariant / Collection) so
 * lib/shopify/client.ts can swap this out for real GraphQL calls without
 * touching any page or component — see client.ts for the switch.
 *
 * This module must never be imported by anything that runs when
 * SHOPIFY_STORE_DOMAIN / SHOPIFY_STOREFRONT_ACCESS_TOKEN are set — only
 * client.ts imports it, and only on the preview-mode code path.
 */

const USD = (amount: number) => ({ amount, currencyCode: "USD" });

export const collections: Collection[] = [
  {
    handle: "cookware",
    title: "Cookware",
    description:
      "Heirloom-grade pots, pans, and Dutch ovens built for a lifetime of everyday cooking.",
  },
  {
    handle: "kitchen-accessories",
    title: "Kitchen Accessories",
    description: "The considered details that finish a well-run kitchen.",
  },
  {
    handle: "home-decor",
    title: "Home Décor",
    description: "Quiet, elevated pieces for the rooms beyond the kitchen.",
  },
  {
    handle: "ramadan-eid",
    title: "Ramadan & Eid",
    description: "Seasonal pieces for iftar tables, gifting, and gathering.",
  },
  {
    handle: "gift-sets",
    title: "Gift Sets",
    description: "Curated sets, ready to give.",
  },
];

export const products: Product[] = [
  {
    id: "gid://mock/Product/1",
    handle: "heritage-cast-iron-dutch-oven",
    title: "Heritage Cast Iron Dutch Oven",
    description:
      "A enameled Dutch oven built to move from stovetop to oven to table, and to outlast the kitchen it started in.",
    collectionHandles: ["cookware", "gift-sets"],
    images: [{ alt: "Heritage Cast Iron Dutch Oven", from: "#3d3129", to: "#7d5c33" }],
    material: "Enameled Cast Iron",
    careInstructions: "Hand wash. Avoid metal utensils on the enamel surface.",
    occasion: ["Everyday", "Wedding Gift", "Housewarming"],
    options: [
      { name: "Size", values: ["6 Quart", "8 Quart"] },
      { name: "Finish", values: ["Charcoal", "Brass Rim"] },
    ],
    variants: [
      {
        id: "gid://mock/Variant/1-6qt-charcoal",
        title: "6 Quart / Charcoal",
        price: USD(189),
        available: true,
        quantityAvailable: 14,
        selectedOptions: [
          { name: "Size", value: "6 Quart" },
          { name: "Finish", value: "Charcoal" },
        ],
      },
      {
        id: "gid://mock/Variant/1-6qt-brass",
        title: "6 Quart / Brass Rim",
        price: USD(209),
        available: true,
        quantityAvailable: 4,
        selectedOptions: [
          { name: "Size", value: "6 Quart" },
          { name: "Finish", value: "Brass Rim" },
        ],
      },
      {
        id: "gid://mock/Variant/1-8qt-charcoal",
        title: "8 Quart / Charcoal",
        price: USD(229),
        available: true,
        quantityAvailable: 9,
        selectedOptions: [
          { name: "Size", value: "8 Quart" },
          { name: "Finish", value: "Charcoal" },
        ],
      },
      {
        id: "gid://mock/Variant/1-8qt-brass",
        title: "8 Quart / Brass Rim",
        price: USD(249),
        available: false,
        quantityAvailable: 0,
        selectedOptions: [
          { name: "Size", value: "8 Quart" },
          { name: "Finish", value: "Brass Rim" },
        ],
      },
    ],
  },
  {
    id: "gid://mock/Product/2",
    handle: "brass-handled-stainless-skillet",
    title: "Brass-Handled Stainless Skillet",
    description:
      "Tri-ply stainless steel with a solid brass handle — even heat, every day, for decades.",
    collectionHandles: ["cookware"],
    images: [{ alt: "Brass-Handled Stainless Skillet", from: "#5b5b5b", to: "#a97f4a" }],
    material: "Tri-Ply Stainless Steel, Brass",
    careInstructions: "Dishwasher safe. Hand wash recommended to preserve the brass finish.",
    occasion: ["Everyday"],
    options: [{ name: "Size", values: ["10 inch", "12 inch"] }],
    variants: [
      {
        id: "gid://mock/Variant/2-10in",
        title: "10 inch",
        price: USD(129),
        available: true,
        quantityAvailable: 22,
        selectedOptions: [{ name: "Size", value: "10 inch" }],
      },
      {
        id: "gid://mock/Variant/2-12in",
        title: "12 inch",
        price: USD(149),
        available: true,
        quantityAvailable: 3,
        selectedOptions: [{ name: "Size", value: "12 inch" }],
      },
    ],
  },
  {
    id: "gid://mock/Product/3",
    handle: "copper-core-saucepan-set",
    title: "Copper Core Saucepan Set",
    description:
      "Three saucepans with a copper core for precise heat control, finished in brushed stainless.",
    collectionHandles: ["cookware", "gift-sets"],
    images: [{ alt: "Copper Core Saucepan Set", from: "#6b4326", to: "#c98a4b" }],
    material: "Copper Core, Stainless Steel",
    careInstructions: "Hand wash recommended.",
    occasion: ["Wedding Gift", "Housewarming"],
    options: [{ name: "Set", values: ["3-Piece"] }],
    variants: [
      {
        id: "gid://mock/Variant/3-set",
        title: "3-Piece Set",
        price: USD(249),
        available: true,
        quantityAvailable: 11,
        selectedOptions: [{ name: "Set", value: "3-Piece" }],
      },
    ],
  },
  {
    id: "gid://mock/Product/4",
    handle: "everyday-non-stick-frying-pan",
    title: "Everyday Non-Stick Frying Pan",
    description: "A dependable non-stick pan for the meals you make on repeat.",
    collectionHandles: ["cookware"],
    images: [{ alt: "Everyday Non-Stick Frying Pan", from: "#2f2f2f", to: "#5b5b5b" }],
    material: "Forged Aluminum",
    careInstructions: "Dishwasher safe.",
    occasion: ["Everyday"],
    options: [{ name: "Size", values: ["9.5 inch"] }],
    variants: [
      {
        id: "gid://mock/Variant/4-default",
        title: "9.5 inch",
        price: USD(59),
        available: true,
        quantityAvailable: 40,
        selectedOptions: [{ name: "Size", value: "9.5 inch" }],
      },
    ],
  },
  {
    id: "gid://mock/Product/5",
    handle: "enamel-cast-iron-grill-pan",
    title: "Enamel Cast Iron Grill Pan",
    description: "Sear marks and smoky flavor, no grill required.",
    collectionHandles: ["cookware"],
    images: [{ alt: "Enamel Cast Iron Grill Pan", from: "#3d3129", to: "#8c6b3e" }],
    material: "Enameled Cast Iron",
    careInstructions: "Hand wash. Avoid metal utensils.",
    occasion: ["Everyday"],
    options: [{ name: "Size", values: ["11 inch"] }],
    variants: [
      {
        id: "gid://mock/Variant/5-default",
        title: "11 inch",
        price: USD(99),
        available: true,
        quantityAvailable: 17,
        selectedOptions: [{ name: "Size", value: "11 inch" }],
      },
    ],
  },
  {
    id: "gid://mock/Product/6",
    handle: "stockpot-with-brass-accents",
    title: "Stockpot with Brass Accents",
    description: "An 8-quart stockpot for family dinners, holiday batches, and everything between.",
    collectionHandles: ["cookware"],
    images: [{ alt: "Stockpot with Brass Accents", from: "#4a433c", to: "#a97f4a" }],
    material: "Stainless Steel, Brass",
    careInstructions: "Dishwasher safe.",
    occasion: ["Everyday", "Housewarming"],
    options: [{ name: "Size", values: ["8 quart"] }],
    variants: [
      {
        id: "gid://mock/Variant/6-default",
        title: "8 quart",
        price: USD(159),
        available: true,
        quantityAvailable: 6,
        selectedOptions: [{ name: "Size", value: "8 quart" }],
      },
    ],
  },
  {
    id: "gid://mock/Product/7",
    handle: "brass-mortar-and-pestle",
    title: "Brass Mortar & Pestle",
    description: "Hand-cast brass, weighted for grinding spices the way they've always been ground.",
    collectionHandles: ["kitchen-accessories", "ramadan-eid", "gift-sets"],
    images: [{ alt: "Brass Mortar & Pestle", from: "#7d5c33", to: "#d8bc8e" }],
    material: "Solid Brass",
    careInstructions: "Hand wash and dry immediately.",
    occasion: ["Ramadan", "Eid", "Housewarming"],
    options: [{ name: "Size", values: ["Standard"] }],
    variants: [
      {
        id: "gid://mock/Variant/7-default",
        title: "Standard",
        price: USD(69),
        available: true,
        quantityAvailable: 25,
        selectedOptions: [{ name: "Size", value: "Standard" }],
      },
    ],
  },
  {
    id: "gid://mock/Product/8",
    handle: "iftar-serving-tray",
    title: "Iftar Serving Tray",
    description: "A brass-rimmed serving tray sized for dates, tea, and the table it opens.",
    collectionHandles: ["ramadan-eid", "home-decor", "gift-sets"],
    images: [{ alt: "Iftar Serving Tray", from: "#3d3129", to: "#c98a4b" }],
    material: "Brass, Walnut",
    careInstructions: "Wipe clean with a dry cloth.",
    occasion: ["Ramadan", "Eid"],
    options: [{ name: "Size", values: ["18 inch"] }],
    variants: [
      {
        id: "gid://mock/Variant/8-default",
        title: "18 inch",
        price: USD(89),
        available: true,
        quantityAvailable: 2,
        selectedOptions: [{ name: "Size", value: "18 inch" }],
      },
    ],
  },
];

export function getAllProducts(): Product[] {
  return products;
}

export function getProductByHandle(handle: string): Product | undefined {
  return products.find((p) => p.handle === handle);
}

export function getCollectionByHandle(handle: string): Collection | undefined {
  return collections.find((c) => c.handle === handle);
}

export function getProductsByCollection(handle: string): Product[] {
  return products.filter((p) => p.collectionHandles.includes(handle));
}

export function getAllCollections(): Collection[] {
  return collections;
}
