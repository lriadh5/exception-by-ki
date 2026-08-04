/**
 * No real reviews provider (Judge.me, Yotpo, or a custom backend) is
 * connected yet — see README "Prepared, not built". The UI
 * (components/commerce/ReviewsSection.tsx) renders against sample data
 * (lib/reviews/mock-data.ts) via the lib/reviews/client.ts adapter, so
 * the real integration is a client.ts swap, not a UI rewrite.
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
