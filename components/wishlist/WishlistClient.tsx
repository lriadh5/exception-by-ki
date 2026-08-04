"use client";

import Link from "next/link";
import { useWishlist } from "@/lib/wishlist/wishlist-context";
import { ProductSwatch } from "@/components/commerce/ProductSwatch";
import { WishlistButton } from "@/components/commerce/WishlistButton";
import { formatMoney } from "@/lib/format";

export function WishlistClient() {
  const { items } = useWishlist();

  if (items.length === 0) {
    return (
      <div className="mx-auto max-w-xl px-6 py-24 text-center">
        <h1 className="font-serif text-3xl mb-4">Your wishlist is empty</h1>
        <p className="text-ink-soft mb-8">
          Tap the heart on any piece to save it here — saved on this device only.
        </p>
        <Link href="/collections/cookware" className="underline text-sm">
          Shop Cookware
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl px-6 py-16">
      <h1 className="font-serif text-3xl mb-2">Wishlist</h1>
      <p className="text-ink-soft mb-10 text-sm">Saved on this device only — not synced to an account yet.</p>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {items.map((item) => (
          <div key={item.handle} className="relative">
            <Link href={`/products/${item.handle}`} className="group block">
              <ProductSwatch image={item.image} className="aspect-square rounded-sm" />
              <div className="mt-3 space-y-1">
                <h3 className="text-sm text-ink">{item.title}</h3>
                <p className="text-sm text-ink-soft">{formatMoney(item.price)}</p>
              </div>
            </Link>
            <WishlistButton
              item={item}
              className="absolute top-3 right-3 bg-paper/80 backdrop-blur rounded-full h-8 w-8 flex items-center justify-center"
            />
          </div>
        ))}
      </div>
    </div>
  );
}
