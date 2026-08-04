/**
 * Architecture placeholder — no reviews are collected or displayed yet.
 * Faking review data or counts would be actively misleading, so this
 * stays types-only until a real reviews provider (Judge.me, Yotpo, or a
 * custom backend) is connected. When it is: populate Product.reviewSummary
 * in lib/shopify/map.ts (or mock-data.ts), and render <ReviewsSection>
 * (not yet built) on the product page using it.
 */
export type Review = {
  id: string;
  productHandle: string;
  author: string;
  rating: 1 | 2 | 3 | 4 | 5;
  title: string;
  body: string;
  createdAt: string;
};

export type ReviewSummary = {
  average: number;
  count: number;
};
