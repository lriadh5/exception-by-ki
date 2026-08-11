import type { Collection, Product } from "./types";

/**
 * ⚠️ SAMPLE / PLACEHOLDER DATA — DEVELOPMENT ONLY ⚠️
 *
 * The photos below are real Exception by K&I product photography. The
 * prices, materials, and stock counts are not — no real Shopify store is
 * connected yet, so this catalog exists so the storefront has something
 * real to render before one is. It is shaped to mirror the Shopify
 * Storefront API (Product / ProductVariant / Collection) so
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
      "Hand-hammered pots and casseroles built for a lifetime of everyday cooking.",
  },
  {
    handle: "kitchen-accessories",
    title: "Kitchen Accessories",
    description: "The considered serving pieces that finish a well-run kitchen.",
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
    description: "Curated pieces, ready to give.",
  },
];

export const products: Product[] = [
  {
    id: "gid://mock/Product/1",
    handle: "hand-hammered-silver-casserole",
    title: "Hand-Hammered Silver Casserole with Lid",
    description:
      "A hand-hammered stainless steel casserole with a domed lid and sculpted vine handles — built to travel from stovetop to table and stay there for good.",
    collectionHandles: ["cookware", "gift-sets"],
    images: [
      {
        alt: "Hand-hammered stainless steel casserole with a domed lid and ornate scrolled handles, styled on a marble kitchen counter",
        url: "/products/silver-casserole.jpg",
        from: "#8a8f92",
        to: "#4a4d4f",
      },
    ],
    material: "Hammered Stainless Steel",
    careInstructions: "Hand wash. Dry immediately to preserve the polish.",
    occasion: ["Everyday", "Wedding Gift", "Housewarming"],
    options: [
      { name: "Size", values: ["8 Quart", "10 Quart"] },
      { name: "Finish", values: ["Polished Silver", "Brushed Nickel"] },
    ],
    variants: [
      {
        id: "gid://mock/Variant/1-8qt-polished",
        title: "8 Quart / Polished Silver",
        price: USD(245),
        available: true,
        quantityAvailable: 12,
        selectedOptions: [
          { name: "Size", value: "8 Quart" },
          { name: "Finish", value: "Polished Silver" },
        ],
      },
      {
        id: "gid://mock/Variant/1-8qt-brushed",
        title: "8 Quart / Brushed Nickel",
        price: USD(265),
        available: true,
        quantityAvailable: 5,
        selectedOptions: [
          { name: "Size", value: "8 Quart" },
          { name: "Finish", value: "Brushed Nickel" },
        ],
      },
      {
        id: "gid://mock/Variant/1-10qt-polished",
        title: "10 Quart / Polished Silver",
        price: USD(285),
        available: true,
        quantityAvailable: 7,
        selectedOptions: [
          { name: "Size", value: "10 Quart" },
          { name: "Finish", value: "Polished Silver" },
        ],
      },
      {
        id: "gid://mock/Variant/1-10qt-brushed",
        title: "10 Quart / Brushed Nickel",
        price: USD(315),
        available: false,
        quantityAvailable: 0,
        selectedOptions: [
          { name: "Size", value: "10 Quart" },
          { name: "Finish", value: "Brushed Nickel" },
        ],
      },
    ],
  },
  {
    id: "gid://mock/Product/2",
    handle: "hammered-gold-casserole",
    title: "Hammered Gold Casserole with Lid",
    description:
      "A hand-hammered gold-plated casserole with a domed lid, sharing the same sculpted silhouette in a warm gold finish — a showpiece for stove and table alike.",
    collectionHandles: ["cookware", "gift-sets"],
    images: [
      {
        alt: "Gold-plated hammered casserole pot with a domed lid and sculpted handles, set on a linen table runner",
        url: "/products/gold-casserole.jpg",
        from: "#c9a24a",
        to: "#8a6a24",
      },
      {
        alt: "Gold-plated hammered casserole with the lid on, styled on a dining table with an olive branch",
        url: "/products/gold-casserole-2.jpg",
        from: "#c9a24a",
        to: "#8a6a24",
      },
      {
        alt: "Close-up of the hammered texture and sculpted leaf handle on the gold-plated casserole",
        url: "/products/gold-casserole-3.jpg",
        from: "#c9a24a",
        to: "#8a6a24",
      },
    ],
    material: "Gold-Plated Hammered Stainless Steel",
    careInstructions: "Hand wash only. Avoid abrasive cleaners on the gold finish.",
    occasion: ["Wedding Gift", "Hosting", "Housewarming"],
    options: [{ name: "Size", values: ["10 Quart"] }],
    variants: [
      {
        id: "gid://mock/Variant/2-default",
        title: "10 Quart",
        price: USD(349),
        available: true,
        quantityAvailable: 6,
        selectedOptions: [{ name: "Size", value: "10 Quart" }],
      },
    ],
  },
  {
    id: "gid://mock/Product/3",
    handle: "two-tier-crystal-blossom-stand",
    title: "Two-Tier Crystal Blossom Dessert Stand",
    description:
      "A two-tier mirror-polished dessert stand joined by a crystal blossom stem and balanced on a sculpted pedestal — built to hold dates and sweets for a crowd.",
    collectionHandles: ["kitchen-accessories", "home-decor", "ramadan-eid", "gift-sets"],
    images: [
      {
        alt: "Two-tier mirror-polished dessert stand with a crystal flower stem connecting the tiers, on a cream backdrop",
        url: "/products/two-tier-stand.jpg",
        from: "#c7c9cb",
        to: "#8d9092",
      },
      {
        alt: "Two-tier crystal blossom dessert stand shown empty on a kitchen counter",
        url: "/products/two-tier-stand-2.jpg",
        from: "#c7c9cb",
        to: "#8d9092",
      },
    ],
    material: "Mirror-Polished Stainless Steel, Crystal",
    careInstructions: "Hand wash. Dry immediately to preserve the polish.",
    occasion: ["Hosting", "Wedding Gift", "Ramadan", "Eid"],
    options: [{ name: "Size", values: ["Two-Tier"] }],
    variants: [
      {
        id: "gid://mock/Variant/3-default",
        title: "Two-Tier",
        price: USD(215),
        available: true,
        quantityAvailable: 5,
        selectedOptions: [{ name: "Size", value: "Two-Tier" }],
      },
    ],
  },
  {
    id: "gid://mock/Product/4",
    handle: "crystal-blossom-vanity-set",
    title: "Crystal Blossom Vanity Set",
    description:
      "A crystal blossom vanity set — stemmed dish, covered jar, and tray — finished with hand-set enamel blossoms along a brass vine. The stemmed dish doubles as a bakhoor burner; the covered jar keeps bakhoor or trinkets close at hand.",
    collectionHandles: ["home-decor", "gift-sets", "ramadan-eid"],
    images: [
      {
        alt: "Mirror-polished stemmed goblet and covered jar with hand-set crystal blossom accents, arranged on a matching rectangular tray",
        url: "/products/goblet-set.jpg",
        from: "#d8d3c8",
        to: "#a89c7e",
      },
      {
        alt: "Crystal blossom stemmed dish and covered jar side by side on their tray",
        url: "/products/goblet-set-2.jpg",
        from: "#d8d3c8",
        to: "#a89c7e",
      },
      {
        alt: "Bakhoor smoke rising from the crystal blossom stemmed dish in use",
        url: "/products/goblet-set-3.jpg",
        from: "#d8d3c8",
        to: "#a89c7e",
      },
    ],
    material: "Stainless Steel, Brass, Enamel",
    careInstructions: "Wipe clean with a soft, dry cloth. Hand wash if needed.",
    occasion: ["Wedding Gift", "Housewarming"],
    options: [{ name: "Set", values: ["3-Piece"] }],
    variants: [
      {
        id: "gid://mock/Variant/4-default",
        title: "3-Piece Set",
        price: USD(179),
        available: true,
        quantityAvailable: 9,
        selectedOptions: [{ name: "Set", value: "3-Piece" }],
      },
    ],
  },
  {
    id: "gid://mock/Product/5",
    handle: "mirror-rectangular-tray-set",
    title: "Mirror Rectangular Trays, Set of Two",
    description:
      "A set of two mirror-polished rectangular serving trays in graduated sizes, each finished with a hand-cast brass branch handle for nesting or display.",
    collectionHandles: ["kitchen-accessories", "home-decor", "gift-sets"],
    images: [
      {
        alt: "Two mirror-polished rectangular serving trays with brass branch handles, nested together on a marble countertop",
        url: "/products/mirror-trays.jpg",
        from: "#cfd1d2",
        to: "#95989a",
      },
      {
        alt: "The two mirror rectangular trays shown side by side, empty, on a kitchen island",
        url: "/products/mirror-trays-2.jpg",
        from: "#cfd1d2",
        to: "#95989a",
      },
      {
        alt: "Mirror rectangular tray in use, set with two cups of tea",
        url: "/products/mirror-trays-3.jpg",
        from: "#cfd1d2",
        to: "#95989a",
      },
    ],
    material: "Mirror-Polished Stainless Steel, Brass",
    careInstructions: "Wipe clean with a soft, dry cloth.",
    occasion: ["Everyday", "Hosting", "Housewarming"],
    options: [{ name: "Set", values: ["2-Piece"] }],
    variants: [
      {
        id: "gid://mock/Variant/5-default",
        title: "2-Piece Set",
        price: USD(135),
        available: true,
        quantityAvailable: 18,
        selectedOptions: [{ name: "Set", value: "2-Piece" }],
      },
    ],
  },
  {
    id: "gid://mock/Product/6",
    handle: "rectangular-mirror-cake-stand",
    title: "Rectangular Mirror Cake Stand",
    description:
      "A rectangular mirror-polished cake stand raised on a sculpted cone base and finished with a crystal blossom finial — a centerpiece for cakes, pastries, or dates.",
    collectionHandles: ["kitchen-accessories", "home-decor"],
    images: [
      {
        alt: "Rectangular mirror-polished cake stand on a cone-shaped pedestal base, topped with a crystal flower finial",
        url: "/products/rect-glass-stand.jpg",
        from: "#c7c9cb",
        to: "#8d9092",
      },
      {
        alt: "Rectangular mirror cake stand shown empty on a kitchen counter",
        url: "/products/rect-glass-stand-2.jpg",
        from: "#c7c9cb",
        to: "#8d9092",
      },
    ],
    material: "Mirror-Polished Stainless Steel, Crystal",
    careInstructions: "Hand wash. Dry immediately to preserve the polish.",
    occasion: ["Hosting", "Wedding Gift"],
    options: [{ name: "Size", values: ["Standard"] }],
    variants: [
      {
        id: "gid://mock/Variant/6-default",
        title: "Standard",
        price: USD(169),
        available: true,
        quantityAvailable: 14,
        selectedOptions: [{ name: "Size", value: "Standard" }],
      },
    ],
  },
  {
    id: "gid://mock/Product/7",
    handle: "hand-pierced-silver-bakhoor-burner",
    title: "Hand-Pierced Silver Sweets Box",
    description:
      "A hand-hammered silver dome, laser-cut in flowing calligraphy and topped with a beaded tassel, lifts away to reveal a cream ceramic box beneath — built to present ma'amoul and other sweets at the table, not just store them.",
    collectionHandles: ["ramadan-eid", "home-decor", "gift-sets"],
    images: [
      {
        alt: "Hammered silver dome with a laser-cut calligraphy pattern and cream ceramic base, finished with a beaded tassel",
        url: "/products/silver-burner.jpg",
        from: "#c7c9cb",
        to: "#7d7f81",
      },
      {
        alt: "The silver dome lifted to reveal ma'amoul cookies inside the ceramic box beneath",
        url: "/products/silver-burner-2.jpg",
        from: "#c7c9cb",
        to: "#7d7f81",
      },
    ],
    material: "Hammered Stainless Steel, Ceramic",
    careInstructions: "Wipe clean with a dry cloth.",
    occasion: ["Ramadan", "Eid", "Housewarming"],
    options: [{ name: "Size", values: ["Standard"] }],
    variants: [
      {
        id: "gid://mock/Variant/7-default",
        title: "Standard",
        price: USD(95),
        available: true,
        quantityAvailable: 2,
        selectedOptions: [{ name: "Size", value: "Standard" }],
      },
    ],
  },
  {
    id: "gid://mock/Product/8",
    handle: "taupe-calligraphy-bakhoor-dome",
    title: "Taupe Calligraphy Sweets Box",
    description:
      "A powder-coated dome in matte taupe, pierced in an open calligraphy pattern and topped with a crescent moon finial and tassel — a softer-toned companion to the silver sweets box, built the same way.",
    collectionHandles: ["ramadan-eid", "home-decor", "gift-sets"],
    images: [
      {
        alt: "Taupe powder-coated bakhoor dome with an open calligraphy cutout pattern and a crescent moon tassel finial",
        url: "/products/taupe-dome.jpg",
        from: "#bdb2a0",
        to: "#8a7d68",
      },
    ],
    material: "Powder-Coated Steel",
    careInstructions: "Wipe clean with a dry cloth.",
    occasion: ["Ramadan", "Eid"],
    options: [{ name: "Size", values: ["Standard"] }],
    variants: [
      {
        id: "gid://mock/Variant/8-default",
        title: "Standard",
        price: USD(85),
        available: true,
        quantityAvailable: 11,
        selectedOptions: [{ name: "Size", value: "Standard" }],
      },
    ],
  },
  {
    id: "gid://mock/Product/9",
    handle: "calligraphy-nesting-bowls-set",
    title: "Calligraphy Nesting Bowls, Set of Three",
    description:
      "Three hand-pierced stainless bowls in graduated sizes, each rim cut in flowing Arabic calligraphy and finished with a gold ring handle — nest them for storage or spread them across the table for nuts, dates, and sweets.",
    collectionHandles: ["ramadan-eid", "home-decor", "gift-sets"],
    images: [
      {
        alt: "Three nested stainless steel bowls with laser-cut Arabic calligraphy rims and gold ring handles",
        url: "/products/calligraphy-nesting-bowls.jpg",
        from: "#c7c9cb",
        to: "#8d9092",
      },
      {
        alt: "Close-up of the pierced calligraphy pattern and gold ring handles on the nesting bowls",
        url: "/products/calligraphy-nesting-bowls-2.jpg",
        from: "#c7c9cb",
        to: "#8d9092",
      },
    ],
    material: "Stainless Steel, Brass",
    careInstructions: "Hand wash. Dry immediately to preserve the polish.",
    occasion: ["Ramadan", "Eid", "Hosting", "Housewarming"],
    options: [{ name: "Set", values: ["3-Piece"] }],
    variants: [
      {
        id: "gid://mock/Variant/9-default",
        title: "3-Piece Set",
        price: USD(145),
        available: true,
        quantityAvailable: 8,
        selectedOptions: [{ name: "Set", value: "3-Piece" }],
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
