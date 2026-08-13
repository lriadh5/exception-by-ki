import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import {
  getCollection,
  listCollections,
  listProductsByCollection,
} from "@/lib/shopify/client";
import { getGuidesForCollection } from "@/lib/content/client";
import { ProductCard } from "@/components/commerce/ProductCard";
import { Breadcrumbs } from "@/components/commerce/Breadcrumbs";
import { Pagination } from "@/components/commerce/Pagination";
import { JsonLd } from "@/components/seo/JsonLd";
import { breadcrumbSchema, collectionPageSchema } from "@/lib/seo/schema";
import { parseSortParam, sortProducts, SORT_KEYS, SORT_LABELS } from "@/lib/commerce/sort";
import { collectMaterials, filterByMaterial } from "@/lib/commerce/filter";
import { paginate, parsePageParam } from "@/lib/commerce/pagination";

type SearchParams = Record<string, string | string[] | undefined>;

export async function generateStaticParams() {
  const collections = await listCollections();
  return collections.map((c) => ({ handle: c.handle }));
}

export async function generateMetadata({
  params,
  searchParams,
}: {
  params: Promise<{ handle: string }>;
  searchParams: Promise<SearchParams>;
}): Promise<Metadata> {
  const { handle } = await params;
  const sp = await searchParams;
  const collection = await getCollection(handle);
  if (!collection) return {};

  // Filtered/sorted/paginated views are index-diluting duplicates of the
  // base collection page — keep only the canonical URL indexable.
  const isFiltered = Boolean(sp.sort || sp.material || sp.page);

  return {
    title: collection.title,
    description: collection.description,
    alternates: { canonical: `/collections/${collection.handle}` },
    robots: isFiltered ? { index: false, follow: true } : undefined,
  };
}

export default async function CollectionPage({
  params,
  searchParams,
}: {
  params: Promise<{ handle: string }>;
  searchParams: Promise<SearchParams>;
}) {
  const { handle } = await params;
  const sp = await searchParams;
  const [collection, allProducts, guides] = await Promise.all([
    getCollection(handle),
    listProductsByCollection(handle),
    getGuidesForCollection(handle),
  ]);

  if (!collection) notFound();

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
          { name: collection.title, path: `/collections/${collection.handle}` },
        ])}
      />
      <JsonLd data={collectionPageSchema(collection, allProducts.length)} />

      <Breadcrumbs items={[{ name: "Home", href: "/" }, { name: collection.title }]} />

      <header className="mb-10 max-w-2xl">
        <h1 className="font-serif text-3xl mb-3">{collection.title}</h1>
        <p className="text-ink-soft">{collection.description}</p>
        {guides.length > 0 && (
          <ul className="mt-4 space-y-1 text-sm">
            {guides.map((guide) => (
              <li key={guide.slug}>
                <Link href={`/guides/${guide.slug}`} className="text-brand-dark underline">
                  Read: {guide.title}
                </Link>
              </li>
            ))}
          </ul>
        )}
      </header>

      {allProducts.length === 0 ? (
        <p className="text-ink-soft">New pieces are on their way to this collection.</p>
      ) : (
        <>
          <div className="flex flex-wrap items-center justify-between gap-4 mb-8 pb-4 border-b border-line text-sm">
            {materials.length > 1 ? (
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-ink-soft mr-1">Material:</span>
                <a
                  href={`/collections/${handle}`}
                  className={!activeMaterial ? "text-ink underline" : "text-ink-soft hover:text-ink"}
                >
                  All
                </a>
                {materials.map((m) => (
                  <a
                    key={m}
                    href={`/collections/${handle}?material=${encodeURIComponent(m)}`}
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
                  href={`/collections/${handle}?${new URLSearchParams({
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
            basePath={`/collections/${handle}`}
            currentParams={sp}
            page={page}
            totalPages={totalPages}
          />
        </>
      )}
    </div>
  );
}
