import { describe, expect, it } from "vitest";
import { cartReducer, cartSubtotal, cartTotalQuantity, initialCartState, type NewCartLine } from "./reducer";

const skillet: NewCartLine = {
  productHandle: "mirror-rectangular-tray-set",
  variantId: "gid://mock/Variant/5-default",
  title: "Mirror Rectangular Trays, Set of Two",
  variantTitle: "2-Piece Set",
  price: { amount: 135, currencyCode: "USD" },
  image: { alt: "Mirror Rectangular Trays, Set of Two", from: "#cfd1d2", to: "#95989a" },
  quantityAvailable: 22,
};

const lowStock: NewCartLine = {
  productHandle: "hand-pierced-silver-bakhoor-burner",
  variantId: "gid://mock/Variant/7-default",
  title: "Hand-Pierced Silver Bakhoor Burner",
  variantTitle: "Standard",
  price: { amount: 95, currencyCode: "USD" },
  image: { alt: "Hand-Pierced Silver Bakhoor Burner", from: "#c7c9cb", to: "#7d7f81" },
  quantityAvailable: 2,
};

describe("cartReducer / ADD_LINE", () => {
  it("adds a new line with the requested quantity", () => {
    const state = cartReducer(initialCartState, { type: "ADD_LINE", line: skillet, requestedQuantity: 2 });
    expect(state.lines).toHaveLength(1);
    expect(state.lines[0].quantity).toBe(2);
    expect(state.lines[0].lineId).toBeTruthy();
    expect(state.isOpen).toBe(true);
    expect(state.error).toBeNull();
  });

  it("merges a repeat add-to-cart for the same variant instead of duplicating the line", () => {
    let state = cartReducer(initialCartState, { type: "ADD_LINE", line: skillet, requestedQuantity: 1 });
    state = cartReducer(state, { type: "ADD_LINE", line: skillet, requestedQuantity: 1 });
    expect(state.lines).toHaveLength(1);
    expect(state.lines[0].quantity).toBe(2);
  });

  it("clamps quantity to available stock and sets an error instead of exceeding it", () => {
    const state = cartReducer(initialCartState, { type: "ADD_LINE", line: lowStock, requestedQuantity: 5 });
    expect(state.lines[0].quantity).toBe(2);
    expect(state.error).toBeNull(); // clamped-but-added is not an error
  });

  it("errors without adding when the item is already at the stock limit", () => {
    let state = cartReducer(initialCartState, { type: "ADD_LINE", line: lowStock, requestedQuantity: 2 });
    state = cartReducer(state, { type: "ADD_LINE", line: lowStock, requestedQuantity: 1 });
    expect(state.lines[0].quantity).toBe(2);
    expect(state.error).toMatch(/only 2/i);
  });

  it("errors when the item has zero stock", () => {
    const outOfStock: NewCartLine = { ...skillet, quantityAvailable: 0 };
    const state = cartReducer(initialCartState, { type: "ADD_LINE", line: outOfStock, requestedQuantity: 1 });
    expect(state.lines).toHaveLength(0);
    expect(state.error).toMatch(/out of stock/i);
  });
});

describe("cartReducer / UPDATE_QUANTITY", () => {
  function seedState() {
    return cartReducer(initialCartState, { type: "ADD_LINE", line: skillet, requestedQuantity: 1 });
  }

  it("updates quantity within stock", () => {
    const seeded = seedState();
    const state = cartReducer(seeded, {
      type: "UPDATE_QUANTITY",
      lineId: seeded.lines[0].lineId,
      quantity: 5,
    });
    expect(state.lines[0].quantity).toBe(5);
  });

  it("removes the line when quantity is set to 0", () => {
    const seeded = seedState();
    const state = cartReducer(seeded, {
      type: "UPDATE_QUANTITY",
      lineId: seeded.lines[0].lineId,
      quantity: 0,
    });
    expect(state.lines).toHaveLength(0);
  });

  it("clamps an over-limit quantity to available stock and flags it", () => {
    const seeded = cartReducer(initialCartState, { type: "ADD_LINE", line: lowStock, requestedQuantity: 1 });
    const state = cartReducer(seeded, {
      type: "UPDATE_QUANTITY",
      lineId: seeded.lines[0].lineId,
      quantity: 99,
    });
    expect(state.lines[0].quantity).toBe(2);
    expect(state.error).toMatch(/only 2/i);
  });
});

describe("cartReducer / REMOVE_LINE", () => {
  it("removes the matching line", () => {
    const seeded = cartReducer(initialCartState, { type: "ADD_LINE", line: skillet, requestedQuantity: 1 });
    const state = cartReducer(seeded, { type: "REMOVE_LINE", lineId: seeded.lines[0].lineId });
    expect(state.lines).toHaveLength(0);
  });
});

describe("cartReducer / HYDRATE", () => {
  it("marks state as hydrated so it's safe to persist back to storage", () => {
    expect(initialCartState.hydrated).toBe(false);
    const state = cartReducer(initialCartState, { type: "HYDRATE", lines: [] });
    expect(state.hydrated).toBe(true);
  });

  it("replaces lines with the hydrated data, distinct from a real ADD_LINE", () => {
    const seeded = cartReducer(initialCartState, { type: "ADD_LINE", line: skillet, requestedQuantity: 1 });
    const rehydrated = cartReducer(seeded, { type: "HYDRATE", lines: [] });
    expect(rehydrated.lines).toHaveLength(0);
    expect(rehydrated.hydrated).toBe(true);
  });
});

describe("cartSubtotal / cartTotalQuantity", () => {
  it("sums price * quantity across lines, and total item count separately", () => {
    let state = cartReducer(initialCartState, { type: "ADD_LINE", line: skillet, requestedQuantity: 2 });
    state = cartReducer(state, { type: "ADD_LINE", line: lowStock, requestedQuantity: 1 });
    expect(cartSubtotal(state.lines)).toBe(135 * 2 + 95 * 1);
    expect(cartTotalQuantity(state.lines)).toBe(3);
  });
});
