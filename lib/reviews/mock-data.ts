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
    productHandle: "heritage-cast-iron-dutch-oven",
    author: "Amina R.",
    rating: 5,
    title: "Will outlive me",
    body: "Three years in and it still looks brand new. The 6 quart size is perfect for weeknight dinners and it goes straight from stovetop to table.",
    createdAt: "2026-05-12",
  },
  {
    id: "review-2",
    productHandle: "heritage-cast-iron-dutch-oven",
    author: "David K.",
    rating: 4,
    title: "Heavy but worth it",
    body: "Heats evenly and the enamel has held up to daily use. Docking one star only because it's genuinely heavy to lift one-handed when full.",
    createdAt: "2026-04-02",
  },
  {
    id: "review-3",
    productHandle: "heritage-cast-iron-dutch-oven",
    author: "Priya S.",
    rating: 5,
    title: "Bought as a wedding gift, kept one for myself",
    body: "Gave the 8 quart to my sister and liked it so much I ordered the 6 quart for my own kitchen.",
    createdAt: "2026-02-18",
  },
  {
    id: "review-4",
    productHandle: "brass-handled-stainless-skillet",
    author: "Marcus T.",
    rating: 5,
    title: "Even heat, finally",
    body: "No more hot spots. The brass handle stays cool enough to grab without a towel most of the time.",
    createdAt: "2026-06-01",
  },
  {
    id: "review-5",
    productHandle: "brass-handled-stainless-skillet",
    author: "Lena W.",
    rating: 3,
    title: "Good pan, learning curve",
    body: "Took a few tries to get the preheat right before things stopped sticking. Once I did, it's great.",
    createdAt: "2026-03-22",
  },
  {
    id: "review-6",
    productHandle: "brass-mortar-and-pestle",
    author: "Yusuf H.",
    rating: 5,
    title: "Perfect for iftar prep",
    body: "Grinds spices fast and the weight does the work for you. Beautiful on the counter too.",
    createdAt: "2026-05-30",
  },
];

export function getReviewsByProductHandle(handle: string): Review[] {
  return reviews.filter((r) => r.productHandle === handle);
}
