import { describe, expect, it } from "vitest";
import { computeReviewSummary } from "./summary";
import type { Review } from "./types";

function review(rating: Review["rating"]): Review {
  return {
    id: `r-${rating}-${Math.random()}`,
    productHandle: "test-product",
    author: "Test",
    rating,
    title: "Title",
    body: "Body",
    createdAt: "2026-01-01",
  };
}

describe("computeReviewSummary", () => {
  it("returns a zeroed summary for no reviews", () => {
    expect(computeReviewSummary([])).toEqual({ average: 0, count: 0 });
  });

  it("averages ratings and rounds to one decimal", () => {
    const summary = computeReviewSummary([review(5), review(4), review(4)]);
    expect(summary.count).toBe(3);
    expect(summary.average).toBe(4.3);
  });

  it("handles a single review", () => {
    expect(computeReviewSummary([review(3)])).toEqual({ average: 3, count: 1 });
  });
});
