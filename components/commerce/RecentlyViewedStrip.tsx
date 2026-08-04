"use client";

import { useEffect } from "react";
import Link from "next/link";
import { useRecentlyViewed, type RecentlyViewedItem } from "@/lib/recently-viewed/recently-viewed-context";
import { ProductSwatch } from "./ProductSwatch";
import { formatMoney } from "@/lib/format";

/** Records the current product as viewed, then renders the "Recently Viewed" strip (excluding it). */
export function RecentlyViewedStrip({ current }: { current: RecentlyViewedItem }) {
  const { items, record } = useRecentlyViewed();

  useEffect(() => {
    record(current);
    // Only record once per product view, not on every items change.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [current.handle]);

  const others = items.filter((i) => i.handle !== current.handle).slice(0, 4);
  if (others.length === 0) return null;

  return (
    <section className="mt-20 border-t border-line pt-10">
      <h2 className="font-serif text-xl mb-6">Recently Viewed</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {others.map((item) => (
          <Link key={item.handle} href={`/products/${item.handle}`} className="group block">
            <ProductSwatch image={item.image} className="aspect-square rounded-sm" />
            <p className="mt-2 text-sm text-ink">{item.title}</p>
            <p className="text-sm text-ink-soft">{formatMoney(item.price)}</p>
          </Link>
        ))}
      </div>
    </section>
  );
}
