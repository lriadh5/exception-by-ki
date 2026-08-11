import type { ContentRecord } from "./types";

/**
 * ⚠️ SAMPLE CONTENT — ONE MANUALLY-WRITTEN GUIDE, NOT A TEMPLATE FARM ⚠️
 *
 * This is the traditional-SEO foundation for editorial content, seeded
 * with a single real, reviewed guide for the most search-relevant
 * seasonal collection (Ramadan & Eid) — see README "Prepared, not
 * built". Deliberately not mass-generated: Phase 8/14 of the SEO brief
 * this satisfies is explicit that content should help shoppers first and
 * ranking second, and that mass content generation waits for the
 * automated pipeline.
 *
 * A future pipeline writes ContentRecord objects with this exact shape
 * (see types.ts) — collectionKey/relatedProductHandles are stable keys
 * into collections/products, so the site can build guide<->category and
 * guide<->product back-links automatically with zero manual maintenance
 * once more records land here.
 */
export const contentRecords: ContentRecord[] = [
  {
    slug: "ramadan-table-decor-ideas",
    contentType: "guide",
    status: "published",
    title: "Ramadan Table Decor Ideas for Iftar and Eid Gatherings",
    metaTitle: "Ramadan Table Decor Ideas — Iftar & Eid Styling Guide",
    metaDescription:
      "Practical Ramadan table decor ideas — from a mirrored centerpiece to a bakhoor burner for ambience — for iftar and Eid gatherings of any size.",
    collectionKey: "ramadan-eid",
    relatedProductHandles: [
      "hand-hammered-silver-casserole",
      "hammered-gold-casserole",
      "mirror-rectangular-tray-set",
      "two-tier-crystal-blossom-stand",
      "rectangular-mirror-cake-stand",
      "crystal-blossom-vanity-set",
      "hand-pierced-silver-bakhoor-burner",
      "taupe-calligraphy-bakhoor-dome",
      "calligraphy-nesting-bowls-set",
    ],
    primaryKeyword: "ramadan table decor",
    secondaryKeywords: [
      "ramadan decor ideas",
      "eid table setting",
      "iftar table decor",
      "bakhoor burner for ramadan",
      "ma'amoul presentation box",
    ],
    intro:
      "A good iftar table does two things at once: it feeds a full house without chaos, and it makes the breaking of the fast feel like the occasion it is. None of that requires a full redecoration — a handful of considered serving pieces, layered with height and reflection, does most of the work. Here's how we'd build one.",
    sections: [
      {
        heading: "Start with a reflective centerpiece",
        body: "Mirror-polished serving pieces catch candlelight and lamplight in a way matte finishes can't, which is most of why they read as festive without any extra styling. A pair of mirror rectangular trays down the center of the table — one for dates and nuts, one for tea glasses — does this cheaply and resets between courses in seconds.",
      },
      {
        heading: "Serve the main dishes properly, not just quickly",
        body: "The casserole that goes from stovetop to table matters more during Ramadan than any other time of year, since it's usually doing that trip more than once a night. A hand-hammered casserole with a domed lid keeps rice and stews warm through a long table conversation, and looks intentional next to the rest of the spread — the gold-plated finish especially, for the nights guests are coming.",
      },
      {
        heading: "Layer height for dates and dessert",
        body: "A flat table reads as a meal; a table with height reads as a gathering. A two-tier dessert stand does the obvious job of holding more sweets in the same footprint, but it's also just easier to reach across a crowded table than a single low platter. A rectangular mirror cake stand does similar work for a single showpiece, and a set of pierced calligraphy nesting bowls covers the nuts and dates in between.",
      },
      {
        heading: "Present the sweets, don't just serve them",
        body: "Ma'amoul deserves better than a plain plate. A hammered dome — pierced in calligraphy, lifted away at the table — turns the reveal into part of the occasion instead of hiding it in the kitchen. We keep one in polished silver for a formal table and one in matte taupe for everyday use; both use the same laser-cut detailing and open the same way.",
      },
      {
        heading: "Bring in scent, not just sight",
        body: "Bakhoor and oud are as much a part of an iftar or Eid gathering as the food is. Our crystal blossom stemmed dish, part of the vanity set, doubles as a burner — the open bowl lets the smoke move freely, and the matching lidded jar keeps bakhoor within reach without cluttering the table.",
      },
      {
        heading: "Building the table piece by piece",
        body: "None of this needs to happen at once. Most tables we've seen built well started with one or two pieces — usually the serving trays or the casserole — and added a stand, a sweets box, or a burner the following Ramadan. Treat the table as something you're building over a few seasons, not shopping for in one trip.",
      },
    ],
    publishedAt: "2026-07-20",
  },
];

export function getAllContent(): ContentRecord[] {
  return contentRecords.filter((c) => c.status === "published");
}

export function getContentBySlug(slug: string): ContentRecord | undefined {
  return contentRecords.find((c) => c.slug === slug && c.status === "published");
}

export function getContentByCollectionKey(collectionKey: string): ContentRecord[] {
  return getAllContent().filter((c) => c.collectionKey === collectionKey);
}

export function getContentByProductHandle(productHandle: string): ContentRecord[] {
  return getAllContent().filter((c) => c.relatedProductHandles.includes(productHandle));
}
