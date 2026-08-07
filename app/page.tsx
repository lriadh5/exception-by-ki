import Link from "next/link";
import { getFeaturedProducts, listCollections } from "@/lib/shopify/client";
import { ProductCard } from "@/components/commerce/ProductCard";
import { FadeIn } from "@/components/ui/FadeIn";

export default async function HomePage() {
  const [collections, featured] = await Promise.all([
    listCollections(),
    getFeaturedProducts(4),
  ]);

  return (
    <div>
      <section className="hero-brand-gradient text-paper">
        <div className="mx-auto max-w-7xl px-6 py-28 md:py-36 text-center">
          <p className="text-brand-light text-xs tracking-[0.3em] uppercase mb-4">
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
            className="inline-block mt-10 bg-paper text-ink px-8 py-3 text-sm tracking-wide transition-all duration-300 hover:bg-brand-light hover:shadow-lg hover:-translate-y-0.5"
          >
            Shop Cookware
          </Link>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-20">
        <FadeIn>
          <h2 className="font-serif text-2xl text-center mb-12">
            Shop by Category
          </h2>
        </FadeIn>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          {collections.map((collection, i) => (
            <FadeIn key={collection.handle} delayMs={i * 60}>
              <Link
                href={`/collections/${collection.handle}`}
                className="group border border-line rounded-sm p-6 flex flex-col items-center text-center gap-2 transition-all duration-300 hover:border-brand hover:shadow-sm hover:-translate-y-0.5"
              >
                <span className="text-sm text-ink group-hover:text-brand-dark transition-colors">
                  {collection.title}
                </span>
              </Link>
            </FadeIn>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-20">
        <FadeIn>
          <div className="flex items-end justify-between mb-10">
            <h2 className="font-serif text-2xl">Featured</h2>
            <Link
              href="/collections/cookware"
              className="text-sm text-ink-soft hover:text-ink underline"
            >
              Shop all Cookware
            </Link>
          </div>
        </FadeIn>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {featured.map((product, i) => (
            <FadeIn key={product.id} delayMs={i * 60}>
              <ProductCard product={product} />
            </FadeIn>
          ))}
        </div>
      </section>

      <section className="bg-paper-dim">
        <FadeIn className="mx-auto max-w-3xl px-6 py-20 text-center block">
          <h2 className="font-serif text-2xl mb-4">Ramadan &amp; Eid, considered</h2>
          <p className="text-ink-soft">
            Serving pieces and gifts for the season of gathering — from
            bakhoor burners to dessert stands built for a full table.
          </p>
          <Link
            href="/collections/ramadan-eid"
            className="inline-block mt-8 border border-brand px-8 py-3 text-sm tracking-wide transition-all duration-300 hover:bg-brand hover:text-paper hover:-translate-y-0.5"
          >
            Shop Ramadan &amp; Eid
          </Link>
        </FadeIn>
      </section>
    </div>
  );
}
