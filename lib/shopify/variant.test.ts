import { describe, expect, it } from "vitest";
import {
  clampQuantity,
  defaultSelections,
  findVariantByOptions,
  isOptionValueAvailable,
} from "./variant";
import { getProductByHandle } from "./mock-data";
import type { Product } from "./types";

// Hand-Hammered Silver Casserole has two option dimensions (Size x Finish)
// with one combination deliberately out of stock — good coverage for
// multi-option variant matching.
const casserole = getProductByHandle("hand-hammered-silver-casserole") as Product;

describe("findVariantByOptions", () => {
  it("finds the exact variant for a two-dimension selection", () => {
    const variant = findVariantByOptions(casserole, { Size: "10 Quart", Finish: "Brushed Nickel" });
    expect(variant?.id).toBe("gid://mock/Variant/1-10qt-brushed");
  });

  it("returns undefined for a combination that doesn't exist", () => {
    const variant = findVariantByOptions(casserole, { Size: "12 Quart", Finish: "Brushed Nickel" });
    expect(variant).toBeUndefined();
  });

  it("still finds an existing but out-of-stock variant (availability is a separate concern)", () => {
    const variant = findVariantByOptions(casserole, { Size: "10 Quart", Finish: "Brushed Nickel" });
    expect(variant?.available).toBe(false);
    expect(variant?.quantityAvailable).toBe(0);
  });
});

describe("defaultSelections", () => {
  it("selects the first variant's own option values", () => {
    expect(defaultSelections(casserole)).toEqual({ Size: "8 Quart", Finish: "Polished Silver" });
  });
});

describe("isOptionValueAvailable", () => {
  it("is true for a value that resolves to an in-stock variant", () => {
    expect(
      isOptionValueAvailable(casserole, "Finish", "Polished Silver", { Size: "8 Quart", Finish: "Polished Silver" })
    ).toBe(true);
  });

  it("is false for a value that resolves to the out-of-stock variant", () => {
    expect(
      isOptionValueAvailable(casserole, "Finish", "Brushed Nickel", { Size: "10 Quart", Finish: "Polished Silver" })
    ).toBe(false);
  });
});

describe("clampQuantity", () => {
  it("clamps to available stock when below the per-line cap", () => {
    expect(clampQuantity(10, 4)).toBe(4);
  });

  it("clamps to the per-line cap when stock exceeds it", () => {
    expect(clampQuantity(50, 999)).toBe(10);
  });

  it("returns 0 when nothing is in stock", () => {
    expect(clampQuantity(1, 0)).toBe(0);
  });

  it("floors fractional input and never goes below 1 when stock allows it", () => {
    expect(clampQuantity(2.9, 5)).toBe(2);
    expect(clampQuantity(0, 5)).toBe(1);
    expect(clampQuantity(-3, 5)).toBe(1);
  });
});
