import { getReviewsByProductHandle } from "./mock-data";
import { computeReviewSummary } from "./summary";
import type { Review, ReviewSummary } from "./types";

/**
 * Data adapter boundary, same shape as lib/shopify/client.ts: pages read
 * reviews through these functions instead of importing mock-data
 * directly. Unlike the Shopify adapter, there's no "connected" branch yet
 * — no reviews provider (Judge.me, Yotpo, custom) is wired up, so this
 * always reads the sample data in mock-data.ts. When a provider is
 * connected, replace the bodies below with real API calls; callers don't
 * change.
 */

let hasWarnedAboutSampleReviews = false;
function warnOnceAboutSampleReviews() {
  if (hasWarnedAboutSampleReviews || process.env.NODE_ENV === "production") return;
  hasWarnedAboutSampleReviews = true;
  console.warn(
    "[exception-by-ki] Using sample review data (lib/reviews/mock-data.ts) — " +
      "no reviews provider connected. See README \"Prepared, not built\"."
  );
}

export async function getReviews(productHandle: string): Promise<Review[]> {
  warnOnceAboutSampleReviews();
  return getReviewsByProductHandle(productHandle);
}

export async function getSummary(productHandle: string): Promise<ReviewSummary> {
  warnOnceAboutSampleReviews();
  return computeReviewSummary(getReviewsByProductHandle(productHandle));
}
