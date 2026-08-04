import type { CartLine } from "@/lib/shopify/types";
import { clampQuantity } from "@/lib/shopify/variant";

export type CartState = {
  lines: CartLine[];
  isOpen: boolean;
  isLoading: boolean;
  error: string | null;
  /** Latest change, for the aria-live region. Not persisted. */
  announcement: string;
};

export const initialCartState: CartState = {
  lines: [],
  isOpen: false,
  isLoading: false,
  error: null,
  announcement: "",
};

export type NewCartLine = Omit<CartLine, "lineId" | "quantity">;

export type CartAction =
  | { type: "HYDRATE"; lines: CartLine[] }
  | { type: "ADD_LINE"; line: NewCartLine; requestedQuantity: number }
  | { type: "REMOVE_LINE"; lineId: string }
  | { type: "UPDATE_QUANTITY"; lineId: string; quantity: number }
  | { type: "SET_LOADING"; isLoading: boolean }
  | { type: "SET_ERROR"; error: string | null }
  | { type: "OPEN" }
  | { type: "CLOSE" };

export function cartReducer(state: CartState, action: CartAction): CartState {
  switch (action.type) {
    case "HYDRATE":
      return { ...state, lines: action.lines };

    case "ADD_LINE": {
      const { line, requestedQuantity } = action;
      const existing = state.lines.find((l) => l.variantId === line.variantId);
      const alreadyInCart = existing?.quantity ?? 0;
      const quantity = clampQuantity(alreadyInCart + requestedQuantity, line.quantityAvailable);

      if (quantity <= alreadyInCart) {
        return {
          ...state,
          error:
            line.quantityAvailable <= 0
              ? `${line.title} is out of stock.`
              : `Only ${line.quantityAvailable} of ${line.title} available — you already have the most you can add in your cart.`,
        };
      }

      const added = quantity - alreadyInCart;
      const lines = existing
        ? state.lines.map((l) => (l.variantId === line.variantId ? { ...l, quantity } : l))
        : [...state.lines, { ...line, quantity, lineId: crypto.randomUUID() }];

      return {
        ...state,
        lines,
        error: null,
        isOpen: true,
        announcement: `${added} ${added === 1 ? "item" : "items"} of ${line.title} added to cart.`,
      };
    }

    case "REMOVE_LINE": {
      const removed = state.lines.find((l) => l.lineId === action.lineId);
      return {
        ...state,
        lines: state.lines.filter((l) => l.lineId !== action.lineId),
        announcement: removed ? `${removed.title} removed from cart.` : state.announcement,
      };
    }

    case "UPDATE_QUANTITY": {
      const line = state.lines.find((l) => l.lineId === action.lineId);
      if (!line) return state;

      if (action.quantity <= 0) {
        return {
          ...state,
          lines: state.lines.filter((l) => l.lineId !== action.lineId),
          announcement: `${line.title} removed from cart.`,
        };
      }

      const quantity = clampQuantity(action.quantity, line.quantityAvailable);
      const clamped = quantity !== action.quantity;

      return {
        ...state,
        lines: state.lines.map((l) => (l.lineId === action.lineId ? { ...l, quantity } : l)),
        error: clamped ? `Only ${line.quantityAvailable} of ${line.title} available.` : state.error,
        announcement: `${line.title} quantity updated to ${quantity}.`,
      };
    }

    case "SET_LOADING":
      return { ...state, isLoading: action.isLoading };

    case "SET_ERROR":
      return { ...state, error: action.error };

    case "OPEN":
      return { ...state, isOpen: true };

    case "CLOSE":
      return { ...state, isOpen: false };

    default:
      return state;
  }
}

export function cartSubtotal(lines: CartLine[]): number {
  return lines.reduce((sum, l) => sum + l.price.amount * l.quantity, 0);
}

export function cartTotalQuantity(lines: CartLine[]): number {
  return lines.reduce((sum, l) => sum + l.quantity, 0);
}
