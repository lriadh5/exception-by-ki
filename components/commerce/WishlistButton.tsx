"use client";

import { useWishlist, type WishlistItem } from "@/lib/wishlist/wishlist-context";

export function WishlistButton({ item, className = "" }: { item: WishlistItem; className?: string }) {
  const { has, toggle } = useWishlist();
  const saved = has(item.handle);

  return (
    <button
      type="button"
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        toggle(item);
      }}
      aria-pressed={saved}
      aria-label={saved ? `Remove ${item.title} from wishlist` : `Save ${item.title} to wishlist`}
      className={`text-lg leading-none transition-colors ${saved ? "text-brass-dark" : "text-ink-soft hover:text-ink"} ${className}`}
    >
      {saved ? "♥" : "♡"}
    </button>
  );
}
