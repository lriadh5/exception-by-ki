import { describe, expect, it } from "vitest";
import { formatMoney } from "./format";

describe("formatMoney", () => {
  it("formats whole dollar amounts", () => {
    expect(formatMoney({ amount: 189, currencyCode: "USD" })).toBe("$189.00");
  });

  it("formats fractional amounts", () => {
    expect(formatMoney({ amount: 59.9, currencyCode: "USD" })).toBe("$59.90");
  });

  it("respects a different currency code", () => {
    expect(formatMoney({ amount: 100, currencyCode: "CAD" })).toBe("CA$100.00");
  });

  it("formats zero", () => {
    expect(formatMoney({ amount: 0, currencyCode: "USD" })).toBe("$0.00");
  });
});
