"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { primaryNav } from "@/lib/nav";
import { useCart } from "@/lib/cart/cart-context";

export function Header() {
  const { openCart, isOpen, totalQuantity } = useCart();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 bg-paper/95 backdrop-blur border-b border-line">
      <div className="mx-auto max-w-7xl px-6">
        <div className="flex items-center justify-between h-20">
          <button
            className="md:hidden text-ink"
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileOpen}
            aria-controls="mobile-nav"
            onClick={() => setMobileOpen((v) => !v)}
          >
            ☰
          </button>

          <Link href="/" aria-label="Exception by K&amp;I — home" className="shrink-0">
            <Image
              src="/logo.png"
              alt="Exception by K&amp;I"
              width={88}
              height={52}
              priority
              className="h-11 w-auto md:h-13"
            />
          </Link>

          <nav className="hidden md:flex items-center gap-8" aria-label="Primary">
            <ul className="flex items-center gap-8">
              {primaryNav.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-sm text-ink-soft hover:text-ink transition-colors"
                  >
                    {item.title}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="flex items-center gap-5">
            <Link href="/search" className="hidden sm:block text-sm text-ink-soft hover:text-ink">
              Search
            </Link>
            <Link href="/wishlist" className="hidden sm:block text-sm text-ink-soft hover:text-ink">
              Wishlist
            </Link>
            <button
              onClick={openCart}
              aria-label={`Open cart${totalQuantity > 0 ? `, ${totalQuantity} items` : ""}`}
              aria-haspopup="dialog"
              aria-expanded={isOpen}
              aria-controls="cart-drawer"
              className="relative text-sm text-ink"
            >
              Cart
              {totalQuantity > 0 && (
                <span className="absolute -right-3 -top-2 flex h-4 w-4 items-center justify-center rounded-full bg-brand text-[10px] text-paper">
                  {totalQuantity}
                </span>
              )}
            </button>
          </div>
        </div>

        <nav
          id="mobile-nav"
          aria-label="Primary"
          className="md:hidden pb-4"
          hidden={!mobileOpen}
        >
          <ul className="space-y-3">
            {primaryNav.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  onClick={() => setMobileOpen(false)}
                  className="block text-sm text-ink-soft hover:text-ink"
                >
                  {item.title}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  );
}
