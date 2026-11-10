import type { Metadata } from "next";
import { listAllProducts } from "@/lib/shopify/client";
import { ProductCard } from "@/components/commerce/ProductCard";
import { Breadcrumbs } from "@/components/commerce/Breadcrumbs";
import { Pagination } from "@/components/commerce/Pagination";
import { JsonLd } from "@/components/seo/JsonLd";
import { breadcrumbSchema } from "@/lib/seo/schema";
import { SITE_URL } from "@/lib/env";
import { parseSortParam, sortProducts, SORT_KEYS, SORT_LABELS } from "@/lib/commerce/sort";
import { collectMaterials, filterByMaterial } from "@/lib/commerce/filter";
import { paginate, parsePageParam } from "@/lib/commerce/pagination";

type SearchParams = Record<string, string | string[] | undefined>;

export async function generateMetadata({
  searchParams,
}: {
  searchParams: Promise<SearchParams>;
}): Promise<Metadata> {
  const sp = await searchParams;
  const isFiltered = Boolean(sp.sort || sp.material || sp.page);

  return {
    title: "Shop All",
    description: "Browse every piece from Exception by K&I in one place.",
    alternates: { canonical: "/shop-all" },
    robots: isFiltered ? { index: false, follow: true } : undefined,
  };
}

export default async function ShopAllPage({
  searchParams,
}: {
  searchParams: Promise<SearchParams>;
}) {
  const sp = await searchParams;
  const allProducts = await listAllProducts();

  const sort = parseSortParam(sp.sort);
  const materials = collectMaterials(allProducts);
  const filtered = filterByMaterial(allProducts, sp.material);
  const sorted = sortProducts(filtered, sort);
  const { items: products, page, totalPages } = paginate(sorted, parsePageParam(sp.page));

  const activeMaterial = Array.isArray(sp.material) ? sp.material[0] : sp.material;

  return (
    <div className="mx-auto max-w-7xl px-6 py-16">
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Shop All", path: "/shop-all" },
        ])}
      />
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "CollectionPage",
          name: "Shop All",
          description: "Browse every piece from Exception by K&I in one place.",
          url: `${SITE_URL}/shop-all`,
          numberOfItems: allProducts.length,
        }}
      />

      <Breadcrumbs items={[{ name: "Home", href: "/" }, { name: "Shop All" }]} />

      <header className="mb-10 max-w-2xl">
        <h1 className="font-serif text-3xl mb-3">Shop All</h1>
        <p className="text-ink-soft">Every piece from Exception by K&amp;I, in one place.</p>
      </header>

      {allProducts.length === 0 ? (
        <p className="text-ink-soft">New pieces are on their way.</p>
      ) : (
        <>
          <div className="flex flex-wrap items-center justify-between gap-4 mb-8 pb-4 border-b border-line text-sm">
            {materials.length > 1 ? (
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-ink-soft mr-1">Material:</span>
                <a
                  href="/shop-all"
                  className={!activeMaterial ? "text-ink underline" : "text-ink-soft hover:text-ink"}
                >
                  All
                </a>
                {materials.map((m) => (
                  <a
                    key={m}
                    href={`/shop-all?material=${encodeURIComponent(m)}`}
                    className={activeMaterial === m ? "text-ink underline" : "text-ink-soft hover:text-ink"}
                  >
                    {m}
                  </a>
                ))}
              </div>
            ) : (
              <span />
            )}

            <div className="flex items-center gap-2">
              <span className="text-ink-soft">Sort:</span>
              {SORT_KEYS.map((key) => (
                <a
                  key={key}
                  href={`/shop-all?${new URLSearchParams({
                    ...(activeMaterial ? { material: activeMaterial } : {}),
                    ...(key !== "relevance" ? { sort: key } : {}),
                  }).toString()}`}
                  className={sort === key ? "text-ink underline" : "text-ink-soft hover:text-ink"}
                >
                  {SORT_LABELS[key]}
                </a>
              ))}
            </div>
          </div>

          {products.length === 0 ? (
            <p className="text-ink-soft">No pieces match that filter yet.</p>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
              {products.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}

          <Pagination
            basePath="/shop-all"
            currentParams={sp}
            page={page}
            totalPages={totalPages}
          />
        </>
      )}
    </div>
  );
}
