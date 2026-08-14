import type { Review } from "./types";

/**
 * No reviews provider (Judge.me, Yotpo, or a custom backend) is
 * connected yet — see README "Prepared, not built". This array is
 * intentionally empty: fabricated review text and star ratings must
 * never render on live product pages as if they were real customer
 * feedback. Every product correctly falls through to the honest empty
 * state in components/commerce/ReviewsSection.tsx ("No reviews yet for
 * this product.") until a real provider is connected — see
 * lib/reviews/client.ts for the swap point. Do not repopulate this
 * with sample data; if you need to exercise the "has reviews" render
 * path, do it in a test fixture, not here.
 */
export const reviews: Review[] = [];

export function getReviewsByProductHandle(handle: string): Review[] {
  return reviews.filter((r) => r.productHandle === handle);
}
