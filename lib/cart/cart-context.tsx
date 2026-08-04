"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useReducer,
  useRef,
  type ReactNode,
} from "react";
import type { CartLine } from "@/lib/shopify/types";
import { cartReducer, cartSubtotal, cartTotalQuantity, initialCartState, type NewCartLine } from "./reducer";
import { trackEvent } from "@/lib/analytics/analytics";

type CartContextValue = {
  lines: CartLine[];
  isOpen: boolean;
  isLoading: boolean;
  error: string | null;
  announcement: string;
  openCart: () => void;
  closeCart: () => void;
  addLine: (line: NewCartLine, quantity: number) => Promise<void>;
  removeLine: (lineId: string) => void;
  updateQuantity: (lineId: string, quantity: number) => void;
  clearError: () => void;
  subtotal: number;
  totalQuantity: number;
  /** Ref the drawer's "return focus" logic reads after closing. */
  triggerRef: React.MutableRefObject<HTMLElement | null>;
  /** True when no Shopify store is connected — checkout is disabled. */
  isPreviewMode: boolean;
};

const CartContext = createContext<CartContextValue | null>(null);
const STORAGE_KEY = "exception-by-ki-cart";

export function CartProvider({
  children,
  isPreviewMode,
}: {
  children: ReactNode;
  isPreviewMode: boolean;
}) {
  const [state, dispatch] = useReducer(cartReducer, initialCartState);
  const triggerRef = useRef<HTMLElement | null>(null);

  // `state.hydrated` (reducer state, not a ref) on purpose: the persist
  // effect below only reads it via its own render's closure, so it can
  // only ever run once the render that reflects the HYDRATE dispatch has
  // committed. A ref flipped synchronously inside this effect raced the
  // persist effect on mount (both fire in the same pass) and could write
  // the pre-hydrate empty cart back over real data — most visibly under
  // React Strict Mode's double effect invocation in development, but the
  // underlying race isn't dev-only.
  useEffect(() => {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    let lines: CartLine[] = [];
    if (raw) {
      try {
        lines = JSON.parse(raw);
      } catch {
        // ignore malformed cart in storage
      }
    }
    dispatch({ type: "HYDRATE", lines });
  }, []);

  useEffect(() => {
    if (state.hydrated) {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state.lines));
    }
  }, [state.lines, state.hydrated]);

  const addLine = useCallback(async (line: NewCartLine, quantity: number) => {
    dispatch({ type: "SET_LOADING", isLoading: true });
    try {
      // Placeholder for the real Shopify cart mutation (cartLinesAdd) once
      // connected — see lib/shopify/client.ts createCheckoutCart for the
      // equivalent pattern used at checkout handoff.
      await new Promise((resolve) => setTimeout(resolve, 150));
      dispatch({ type: "ADD_LINE", line, requestedQuantity: quantity });
      trackEvent({
        name: "add_to_cart",
        payload: {
          productHandle: line.productHandle,
          variantId: line.variantId,
          quantity,
          price: line.price.amount,
        },
      });
    } catch {
      dispatch({ type: "SET_ERROR", error: "Couldn't add that item to your cart. Please try again." });
    } finally {
      dispatch({ type: "SET_LOADING", isLoading: false });
    }
  }, []);

  const removeLine = useCallback((lineId: string) => {
    dispatch({ type: "REMOVE_LINE", lineId });
  }, []);

  const updateQuantity = useCallback((lineId: string, quantity: number) => {
    dispatch({ type: "UPDATE_QUANTITY", lineId, quantity });
  }, []);

  const clearError = useCallback(() => dispatch({ type: "SET_ERROR", error: null }), []);

  const openCart = useCallback(() => {
    triggerRef.current = document.activeElement instanceof HTMLElement ? document.activeElement : null;
    dispatch({ type: "OPEN" });
  }, []);

  const closeCart = useCallback(() => {
    dispatch({ type: "CLOSE" });
  }, []);

  const subtotal = useMemo(() => cartSubtotal(state.lines), [state.lines]);
  const totalQuantity = useMemo(() => cartTotalQuantity(state.lines), [state.lines]);

  const value: CartContextValue = {
    lines: state.lines,
    isOpen: state.isOpen,
    isLoading: state.isLoading,
    error: state.error,
    announcement: state.announcement,
    openCart,
    closeCart,
    addLine,
    removeLine,
    updateQuantity,
    clearError,
    subtotal,
    totalQuantity,
    triggerRef,
    isPreviewMode,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within a CartProvider");
  return ctx;
}
