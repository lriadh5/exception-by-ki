"use client";

import { createContext, useCallback, useContext, useEffect, useRef, useState, type ReactNode } from "react";
import type { Money, ProductImage } from "@/lib/shopify/types";

export type WishlistItem = {
  handle: string;
  title: string;
  image: ProductImage;
  price: Money;
};

type WishlistContextValue = {
  items: WishlistItem[];
  has: (handle: string) => boolean;
  toggle: (item: WishlistItem) => void;
};

const WishlistContext = createContext<WishlistContextValue | null>(null);
const STORAGE_KEY = "exception-by-ki-wishlist";

/**
 * Client-only "save for later" list, persisted to localStorage. Deliberately
 * not synced to any backend — see lib/reviews and lib/account for the
 * heavier features (reviews, real accounts) that need one and aren't built
 * yet.
 */
export function WishlistProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<WishlistItem[]>([]);
  const hydrated = useRef(false);

  useEffect(() => {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (raw) {
      try {
        // State must start empty so the client's first render matches the
        // server-rendered (window-less) HTML; syncing from localStorage
        // only after mount is what avoids a hydration mismatch here.
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setItems(JSON.parse(raw));
      } catch {
        // ignore malformed data
      }
    }
    hydrated.current = true;
  }, [hydrated]);

  useEffect(() => {
    if (hydrated.current) {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    }
  }, [items, hydrated]);

  const has = useCallback((handle: string) => items.some((i) => i.handle === handle), [items]);

  const toggle = useCallback((item: WishlistItem) => {
    setItems((prev) =>
      prev.some((i) => i.handle === item.handle)
        ? prev.filter((i) => i.handle !== item.handle)
        : [item, ...prev]
    );
  }, []);

  return (
    <WishlistContext.Provider value={{ items, has, toggle }}>{children}</WishlistContext.Provider>
  );
}

export function useWishlist() {
  const ctx = useContext(WishlistContext);
  if (!ctx) throw new Error("useWishlist must be used within a WishlistProvider");
  return ctx;
}
