import type { ContentRecord } from "./types";

/**
 * ⚠️ FIRST CONTROLLED BATCH — MANUALLY WRITTEN AND REVIEWED, NOT A TEMPLATE FARM ⚠️
 *
 * This is the traditional-SEO foundation for editorial content: five
 * guides, each covering a distinct search intent with no overlap
 * against each other, a collection, or a product — checked against
 * lib/seo/keyword-ownership.ts before writing a word of copy. See
 * README "Prepared, not built". Deliberately not mass-generated: the
 * approved SEO brief this satisfies is explicit that content should
 * help shoppers first and ranking second, that a page earns its
 * existence by being genuinely useful and distinct (not a reshuffled
 * keyword variant of another page), and that mass content generation
 * waits for a future automated pipeline this architecture is designed
 * to accept — never started here.
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
    searchIntent: "seasonal",
    owningUrl: "/guides/ramadan-table-decor-ideas",
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
  {
    slug: "silver-vs-gold-hammered-casserole",
    contentType: "guide",
    status: "published",
    title: "Silver vs. Gold Hammered Casserole: How to Choose",
    metaTitle: "Silver vs. Gold Hammered Casserole — Which to Choose",
    metaDescription:
      "A real comparison of our silver and gold hand-hammered casseroles — finish, sizing, price, and care — to help you pick the right one.",
    collectionKey: "cookware",
    relatedProductHandles: ["hand-hammered-silver-casserole", "hammered-gold-casserole"],
    primaryKeyword: "silver vs gold hammered casserole",
    secondaryKeywords: [
      "hammered casserole comparison",
      "gold casserole vs silver casserole",
      "which hammered casserole to buy",
    ],
    searchIntent: "comparison",
    owningUrl: "/guides/silver-vs-gold-hammered-casserole",
    intro:
      "Both casseroles share the same hand-hammered silhouette and the same sculpted handles — the differences that actually matter are finish, sizing, and price, not shape. Here's what's genuinely different between them.",
    sections: [
      {
        heading: "Finish and everyday care",
        body: "The silver is polished or brushed hammered stainless steel — hand wash and dry it promptly, and it holds up to regular rotation in a working kitchen. The gold is gold-plated over the same hammered stainless steel, which means the same hand-wash-only rule but with one more caveat: skip abrasive cleaners entirely, since they'll wear the plating faster than the base metal underneath. If it's going into weekly use rather than mostly for guests, the silver is the lower-maintenance choice.",
      },
      {
        heading: "Sizing and options",
        body: "The silver casserole comes in two sizes (8 quart and 10 quart) and two finishes (polished or brushed), four combinations in total, priced from $245 for the 8 quart polished up to $315 for the 10 quart brushed. The gold casserole is offered in a single 10 quart size at $349 — no size or finish choice to make, just the one showpiece version.",
      },
      {
        heading: "Where each one earns its place",
        body: "The silver reads as everyday luxury — it's the one we'd put into regular stovetop-to-table rotation. The gold is the one that changes the mood of a table on its own; it's priced and finished like a piece you bring out rather than reach for nightly. Several of our customers own one of each for exactly that reason.",
      },
    ],
    publishedAt: "2026-08-01",
  },
  {
    slug: "how-to-choose-a-dessert-stand",
    contentType: "guide",
    status: "published",
    title: "How to Choose a Dessert or Cake Stand",
    metaTitle: "How to Choose a Dessert or Cake Stand — Buying Guide",
    metaDescription:
      "Two-tier or rectangular: a practical comparison of our mirror dessert stands, by capacity, footprint, and price, to help you pick the right one.",
    collectionKey: "kitchen-accessories",
    relatedProductHandles: ["two-tier-crystal-blossom-stand", "rectangular-mirror-cake-stand"],
    primaryKeyword: "how to choose a dessert stand",
    secondaryKeywords: [
      "two tier vs single tier cake stand",
      "mirror cake stand buying guide",
      "dessert stand for entertaining",
    ],
    searchIntent: "buying-guide",
    owningUrl: "/guides/how-to-choose-a-dessert-stand",
    intro:
      "Both of our mirror stands are built around the same materials and the same crystal blossom detailing — the real choice is about capacity, footprint, and how tall a table can handle, not style. Here's how we'd think through it.",
    sections: [
      {
        heading: "Start with guest count, not the stand",
        body: "A two-tier stand at a table for six looks generous; the same stand at a table for sixteen looks like it's barely keeping up. As a rough guide, picture the two-tier comfortably holding a spread for 8-12 people before it needs refilling, and the rectangular holding a single cake or arrangement for any size table since it isn't trying to hold volume in the first place. Count your table before you pick the piece.",
      },
      {
        heading: "Two-Tier Crystal Blossom Dessert Stand — more capacity, smaller footprint",
        body: "Two mirror-polished tiers joined by a crystal blossom stem, on a cone pedestal, $215. Because it stacks vertically, it holds noticeably more in the same table space than a flat platter — the tradeoff is height, so it works best as a centerpiece rather than tucked among other serving pieces, and it needs roughly a foot of clearance above it if there's a chandelier or shelf overhead.",
      },
      {
        heading: "Rectangular Mirror Cake Stand — one showpiece, easier to place",
        body: "A single rectangular mirror platter on the same style of cone base, finished with a crystal blossom finial, $169. It holds one cake or a single arrangement rather than layered portions, and its low profile makes it easier to fit alongside other pieces on a crowded table — this is the one we'd pick if the stand needs to share space with a casserole and a tray rather than stand alone.",
      },
      {
        heading: "Our rule of thumb",
        body: "If you're serving a spread — dates, fruit, pastries in volume — the two-tier does more work per square foot of table. If you're presenting one specific thing well — a cake, a single arrangement — the rectangular stand gives it room to be the only thing on the table without dominating the whole surface. If you genuinely can't decide, default to the rectangular: it's easier to place on a table that's already busy, and a busy table is the more common problem.",
      },
    ],
    publishedAt: "2026-08-01",
  },
  {
    slug: "wedding-gift-ideas",
    contentType: "guide",
    status: "published",
    title: "Wedding Gift Ideas from Exception by K&I",
    metaTitle: "Wedding Gift Ideas — Considered Cookware & Serveware",
    metaDescription:
      "Real wedding gift ideas from our catalog — hand-hammered cookware, mirror serveware, and a crystal blossom vanity set, with real prices.",
    collectionKey: "gift-sets",
    relatedProductHandles: [
      "hand-hammered-silver-casserole",
      "hammered-gold-casserole",
      "crystal-blossom-vanity-set",
      "two-tier-crystal-blossom-stand",
      "rectangular-mirror-cake-stand",
    ],
    primaryKeyword: "wedding gift ideas",
    secondaryKeywords: [
      "wedding gift cookware",
      "bridal shower gift ideas",
      "elegant wedding gifts",
    ],
    searchIntent: "gift-guide",
    owningUrl: "/guides/wedding-gift-ideas",
    intro:
      "Most wedding registries are built around what a kitchen needs, not what a marriage deserves to have. That's a fine way to fill in blenders and bakeware, but it leaves a gap for the piece that isn't strictly necessary and gets kept anyway — the one still on the table a decade later, when the toaster's long gone. That's the gap we're writing for here.",
    sections: [
      {
        heading: "Why a piece like this works as a wedding gift",
        body: "A wedding gift has one job a birthday gift doesn't: it has to survive being unwrapped alongside a dozen other gifts and still mean something a year later. Consumable gifts and small appliances rarely clear that bar — they get used up or replaced. Hand-hammered metal doesn't; it's the kind of object that gets handed down rather than upgraded, which is most of why cookware and serveware show up so often on the \"still using it\" list at anniversaries, not just the \"thank you note\" list right after the wedding.",
      },
      {
        heading: "For the couple who cooks together",
        body: "The Hand-Hammered Silver Casserole (from $245) is the safer, more versatile pick — two sizes, two finishes, and a silhouette that fits an everyday kitchen, so it's a good choice if you don't know their exact taste yet. The Hammered Gold Casserole ($349, single size) is the bolder gift for a couple who already has the basics covered and would rather receive a showpiece than another practical pot. If you're genuinely unsure which reads better for them, ask what's already sitting out on their stovetop today — gold suits a kitchen that's already dressed up, silver suits one that isn't yet.",
      },
      {
        heading: "For the couple who hosts",
        body: "The Two-Tier Crystal Blossom Dessert Stand ($215) and Rectangular Mirror Cake Stand ($169) both give a new household an instant centerpiece for their first dinner parties, before they've had time to build up serveware of their own. Pick the two-tier if they're the type to host a crowd; the rectangular if their gatherings tend to be smaller and more intimate. Either pairs naturally with cookware as a two-gift set split across close family members, so no single person has to cover the full cost alone.",
      },
      {
        heading: "For the vanity or the entryway table",
        body: "The Crystal Blossom Vanity Set ($179) is the gift for a couple building their home beyond the kitchen — a stemmed dish, covered jar, and tray, useful as a bakhoor burner and catch-all alike. It's the lowest price point here without reading as a lesser gift, which makes it a genuinely good pick for a bridal shower or an engagement gift rather than saving your budget for the wedding itself.",
      },
      {
        heading: "How to give it well",
        body: "Wrap hammered metal in tissue before a box, not directly in ribbon — a bow cinched around a handle can leave a mark on the finish over time. Include a card that says what the piece is made of and how it's cared for; most people won't know a hand-hammered finish needs hand washing, and a gift that arrives with instructions gets used with more confidence than one that doesn't. If you're giving it ahead of the wedding rather than off a registry, a shower or an engagement dinner both work — there's no rule that a piece like this has to wait for the wedding day itself.",
      },
      {
        heading: "Giving more than one",
        body: "None of these need to be paired to work as a gift, but they're built to. A casserole and a dessert stand cover both cooking and hosting; a casserole and the vanity set cover the kitchen and the rooms beyond it. We'd rather you give one piece you mean than a set assembled just to hit a bigger number — a couple will remember the piece they actually use, not the size of the box it came in.",
      },
    ],
    publishedAt: "2026-08-01",
  },
  {
    slug: "hosting-at-home-serving-pieces",
    contentType: "guide",
    status: "published",
    title: "Hosting at Home: Serving Pieces That Do Double Duty",
    metaTitle: "Serving Pieces for Entertaining at Home",
    metaDescription:
      "Practical entertaining advice using pieces from our catalog that pull double duty — for food, for display, and for the table in between.",
    collectionKey: "kitchen-accessories",
    relatedProductHandles: [
      "hammered-gold-casserole",
      "two-tier-crystal-blossom-stand",
      "mirror-rectangular-tray-set",
      "rectangular-mirror-cake-stand",
      "calligraphy-nesting-bowls-set",
    ],
    primaryKeyword: "entertaining serving pieces",
    secondaryKeywords: [
      "serving pieces for hosting",
      "multi use serving dishes",
      "dinner party serveware",
    ],
    searchIntent: "use-case",
    owningUrl: "/guides/hosting-at-home-serving-pieces",
    intro:
      "The pieces that earn a permanent spot in a hosting rotation are rarely the ones with a single job. Every extra dish you own for one specific purpose is a dish you have to store, find, and wash separately — and on the night of a dinner party, that adds up to real time you don't have. Here's how we think about building a rotation that doesn't do that to you, using five pieces from our own catalog as the example.",
    sections: [
      {
        heading: "Cook and serve in the same vessel",
        body: "The single biggest time cost in hosting isn't the cooking, it's the choreography around it — plating, transferring, keeping things warm while you finish the rest of the meal. The Hammered Gold Casserole goes from stove to table with the lid still on, so there's no second serving dish to wash and no heat lost transferring a stew or rice dish into something else. If you only fix one habit before your next dinner party, make it this: stop dirtying a second dish just to move food six feet.",
      },
      {
        heading: "Let a few pieces cover more ground than they look like they should",
        body: "Mirror Rectangular Trays, Set of Two, work for tea service, appetizers, or a cheese board — the same trays, wiped clean between courses, rather than a cabinet full of single-purpose serveware you only pull out once a year. The smaller tray nests inside the larger one for storage, so owning both doesn't cost you extra cabinet space. The same logic applies to the Calligraphy Nesting Bowls, Set of Three — they hold nuts and dates at the table the same way they'd hold prepped ingredients in the kitchen beforehand, so the prep bowl and the serving bowl end up being the same object instead of two.",
      },
      {
        heading: "Size the centerpiece to the guest list, not the other way around",
        body: "It's tempting to buy one showpiece and use it for every gathering, but a stand sized for twelve looks sparse for four, and a platter sized for four looks stingy for twelve. The Two-Tier Crystal Blossom Dessert Stand is built for the fuller table — figure roughly 8-12 guests before it needs a refill. The Rectangular Mirror Cake Stand is built for the smaller one, a single dessert presented well rather than a spread. If your guest list actually varies gathering to gathering, owning one of each means you're never stretching one piece to do a job it wasn't sized for.",
      },
      {
        heading: "Reset between courses instead of rewashing everything",
        body: "Mirror-polished pieces have one underrated advantage at a multi-course table: a quick wipe with a dry cloth resets them to looking new, which means you can move from appetizers to dessert on the same tray without a trip to the sink in between. Keep a cloth within reach during the meal — this is the difference between a table that looks considered through the whole night and one that only looks good for the first course.",
      },
    ],
    publishedAt: "2026-08-01",
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
