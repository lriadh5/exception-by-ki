import type { Metadata } from "next";
import Link from "next/link";
import { listAllProducts } from "@/lib/shopify/client";
import { searchProducts } from "@/lib/search/search";
import { ProductCard } from "@/components/commerce/ProductCard";

// Search results are per-query filtered views — never index them (see
// robots.ts, which also disallows crawling /search entirely).
export const metadata: Metadata = {
  title: "Search",
  robots: { index: false, follow: false },
};

export default async function SearchPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>;
}) {
  const { q = "" } = await searchParams;
  const products = q ? searchProducts(await listAllProducts(), q) : [];

  return (
    <div className="mx-auto max-w-7xl px-6 py-16">
      <h1 className="font-serif text-3xl mb-3">Search</h1>

      <form action="/search" method="get" role="search" className="mb-10 max-w-md">
        <label htmlFor="search-q" className="sr-only">
          Search products
        </label>
        <div className="flex gap-2">
          <input
            id="search-q"
            name="q"
            type="search"
            defaultValue={q}
            placeholder="Search cookware, décor, gifts…"
            className="flex-1 border border-line rounded-sm px-3 py-2 text-sm"
          />
          <button type="submit" className="bg-ink text-paper px-5 py-2 text-sm">
            Search
          </button>
        </div>
      </form>

      {!q ? (
        <p className="text-ink-soft text-sm">Enter a search term above.</p>
      ) : products.length === 0 ? (
        <p className="text-ink-soft text-sm">
          No results for &ldquo;{q}&rdquo;. Try a different word, or browse{" "}
          <Link href="/collections/cookware" className="underline">
            Cookware
          </Link>
          .
        </p>
      ) : (
        <>
          <p className="text-ink-soft text-sm mb-8">
            {products.length} {products.length === 1 ? "result" : "results"} for &ldquo;{q}&rdquo;
          </p>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </>
      )}
    </div>
  );
}
