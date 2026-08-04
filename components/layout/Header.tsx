"use client";

import Link from "next/link";
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

          <Link href="/" className="text-center leading-none">
            <span className="block font-serif text-2xl tracking-widest text-ink">
              EXCEPTION
            </span>
            <span className="block text-[10px] tracking-[0.3em] text-brass uppercase">
              by K&amp;I
            </span>
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
                <span className="absolute -right-3 -top-2 flex h-4 w-4 items-center justify-center rounded-full bg-brass text-[10px] text-paper">
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
