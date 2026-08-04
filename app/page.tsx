import Link from "next/link";
import { getFeaturedProducts, listCollections } from "@/lib/shopify/client";
import { ProductCard } from "@/components/commerce/ProductCard";

export default async function HomePage() {
  const [collections, featured] = await Promise.all([
    listCollections(),
    getFeaturedProducts(4),
  ]);

  return (
    <div>
      <section className="bg-ink text-paper">
        <div className="mx-auto max-w-7xl px-6 py-28 md:py-36 text-center">
          <p className="text-brass-light text-xs tracking-[0.3em] uppercase mb-4">
            Est. for the everyday table
          </p>
          <h1 className="font-serif text-4xl md:text-6xl leading-tight max-w-3xl mx-auto">
            Cookware and home pieces built to be kept
          </h1>
          <p className="mt-6 text-paper/70 max-w-xl mx-auto">
            Considered materials, honest craftsmanship, and a catalog that
            grows with your table — from everyday cookware to Ramadan &amp;
            Eid gifting.
          </p>
          <Link
            href="/collections/cookware"
            className="inline-block mt-10 bg-paper text-ink px-8 py-3 text-sm tracking-wide hover:bg-brass-light transition-colors"
          >
            Shop Cookware
          </Link>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-20">
        <h2 className="font-serif text-2xl text-center mb-12">
          Shop by Category
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          {collections.map((collection) => (
            <Link
              key={collection.handle}
              href={`/collections/${collection.handle}`}
              className="group border border-line rounded-sm p-6 flex flex-col items-center text-center gap-2 hover:border-brass transition-colors"
            >
              <span className="text-sm text-ink group-hover:text-brass-dark transition-colors">
                {collection.title}
              </span>
            </Link>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-20">
        <div className="flex items-end justify-between mb-10">
          <h2 className="font-serif text-2xl">Featured</h2>
          <Link
            href="/collections/cookware"
            className="text-sm text-ink-soft hover:text-ink underline"
          >
            Shop all Cookware
          </Link>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {featured.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      <section className="bg-paper-dim">
        <div className="mx-auto max-w-3xl px-6 py-20 text-center">
          <h2 className="font-serif text-2xl mb-4">Ramadan &amp; Eid, considered</h2>
          <p className="text-ink-soft">
            Serving pieces and gifts for the season of gathering — from
            brass mortars to iftar trays.
          </p>
          <Link
            href="/collections/ramadan-eid"
            className="inline-block mt-8 border border-ink px-8 py-3 text-sm tracking-wide hover:bg-ink hover:text-paper transition-colors"
          >
            Shop Ramadan &amp; Eid
          </Link>
        </div>
      </section>
    </div>
  );
}
