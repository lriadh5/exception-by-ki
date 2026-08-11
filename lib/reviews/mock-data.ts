import type { Review } from "./types";

/**
 * ⚠️ SAMPLE / PLACEHOLDER DATA — DEVELOPMENT ONLY ⚠️
 *
 * These reviews are fake. No reviews provider (Judge.me, Yotpo, or a
 * custom backend) is connected — see README "Prepared, not built". This
 * data exists so the reviews UI (components/commerce/ReviewsSection.tsx)
 * has something real to render and can be swapped for a live provider
 * later without touching the component — see lib/reviews/client.ts for
 * the swap point.
 *
 * Not every sample product has reviews here, on purpose: an empty state
 * needs to render honestly too.
 */
export const reviews: Review[] = [
  {
    id: "review-1",
    productHandle: "hand-hammered-silver-casserole",
    author: "Amina R.",
    rating: 5,
    title: "Will outlive me",
    body: "Three years from now I expect this to still look brand new. The 8 quart size is perfect for weeknight dinners and it goes straight from stovetop to table.",
    createdAt: "2026-05-12",
  },
  {
    id: "review-2",
    productHandle: "hand-hammered-silver-casserole",
    author: "David K.",
    rating: 4,
    title: "Heavy but worth it",
    body: "Heats evenly and the hammered finish has held up to daily use. Docking one star only because it's genuinely heavy to lift one-handed when full.",
    createdAt: "2026-04-02",
  },
  {
    id: "review-3",
    productHandle: "hand-hammered-silver-casserole",
    author: "Priya S.",
    rating: 5,
    title: "Bought as a wedding gift, kept one for myself",
    body: "Gave the 10 quart to my sister and liked it so much I ordered the 8 quart for my own kitchen.",
    createdAt: "2026-02-18",
  },
  {
    id: "review-4",
    productHandle: "mirror-rectangular-tray-set",
    author: "Marcus T.",
    rating: 5,
    title: "Elevates everything on them",
    body: "The mirror finish and the brass handles make even a weeknight snack tray look intentional. Nesting them for storage is a nice touch.",
    createdAt: "2026-06-01",
  },
  {
    id: "review-5",
    productHandle: "mirror-rectangular-tray-set",
    author: "Lena W.",
    rating: 3,
    title: "Beautiful, shows fingerprints",
    body: "Gorgeous on the table but you'll be wiping it down before every use if you're particular about smudges. Worth it anyway.",
    createdAt: "2026-03-22",
  },
  {
    id: "review-6",
    productHandle: "hand-pierced-silver-bakhoor-burner",
    author: "Yusuf H.",
    rating: 5,
    title: "Better than a box",
    body: "Ordered it for ma'amoul at Eid and it made the whole presentation. The dome lifts away cleanly and the pierced pattern throws a lovely shadow even before you open it.",
    createdAt: "2026-05-30",
  },
  {
    id: "review-7",
    productHandle: "crystal-blossom-vanity-set",
    author: "Nadia F.",
    rating: 5,
    title: "Doubles as a bakhoor burner beautifully",
    body: "Didn't expect the stemmed dish to work this well for bakhoor — fills the room with scent and looks like a piece of jewelry on the counter between uses.",
    createdAt: "2026-06-15",
  },
];

export function getReviewsByProductHandle(handle: string): Review[] {
  return reviews.filter((r) => r.productHandle === handle);
}
