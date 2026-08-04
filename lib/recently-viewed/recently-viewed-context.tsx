"use client";

import { createContext, useCallback, useContext, useEffect, useRef, useState, type ReactNode } from "react";
import type { Money, ProductImage } from "@/lib/shopify/types";

export type RecentlyViewedItem = {
  handle: string;
  title: string;
  image: ProductImage;
  price: Money;
};

const MAX_ITEMS = 6;

type RecentlyViewedContextValue = {
  items: RecentlyViewedItem[];
  record: (item: RecentlyViewedItem) => void;
};

const RecentlyViewedContext = createContext<RecentlyViewedContextValue | null>(null);
const STORAGE_KEY = "exception-by-ki-recently-viewed";

export function RecentlyViewedProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<RecentlyViewedItem[]>([]);
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
  }, []);

  useEffect(() => {
    if (hydrated.current) {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    }
  }, [items]);

  const record = useCallback((item: RecentlyViewedItem) => {
    setItems((prev) => [item, ...prev.filter((i) => i.handle !== item.handle)].slice(0, MAX_ITEMS));
  }, []);

  return (
    <RecentlyViewedContext.Provider value={{ items, record }}>
      {children}
    </RecentlyViewedContext.Provider>
  );
}

export function useRecentlyViewed() {
  const ctx = useContext(RecentlyViewedContext);
  if (!ctx) throw new Error("useRecentlyViewed must be used within a RecentlyViewedProvider");
  return ctx;
}
