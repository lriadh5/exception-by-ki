import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import { listGuides, getGuide } from "@/lib/content/client";
import { getCollection, listAllProducts } from "@/lib/shopify/client";
import { Breadcrumbs } from "@/components/commerce/Breadcrumbs";
import { ProductCard } from "@/components/commerce/ProductCard";
import { JsonLd } from "@/components/seo/JsonLd";
import { articleSchema, breadcrumbSchema } from "@/lib/seo/schema";

export async function generateStaticParams() {
  const guides = await listGuides();
  return guides.map((g) => ({ slug: g.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const guide = await getGuide(slug);
  if (!guide) return {};
  return {
    title: guide.metaTitle ?? guide.title,
    description: guide.metaDescription,
    alternates: { canonical: `/guides/${guide.slug}` },
    openGraph: {
      title: guide.metaTitle ?? guide.title,
      description: guide.metaDescription,
    },
  };
}

export default async function GuidePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const guide = await getGuide(slug);
  if (!guide) notFound();

  const [collection, allProducts] = await Promise.all([
    guide.collectionKey ? getCollection(guide.collectionKey) : Promise.resolve(undefined),
    listAllProducts(),
  ]);

  const relatedProducts = guide.relatedProductHandles
    .map((handle) => allProducts.find((p) => p.handle === handle))
    .filter((p): p is NonNullable<typeof p> => Boolean(p));

  return (
    <div className="mx-auto max-w-3xl px-6 py-16">
      <JsonLd data={articleSchema(guide)} />
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Guides", path: "/guides" },
          { name: guide.title, path: `/guides/${guide.slug}` },
        ])}
      />

      <Breadcrumbs
        items={[
          { name: "Home", href: "/" },
          { name: "Guides", href: "/guides" },
          { name: guide.title },
        ]}
      />

      <article>
        <header className="mb-8">
          <h1 className="font-serif text-3xl mb-4">{guide.title}</h1>
          <p className="text-ink-soft leading-relaxed">{guide.intro}</p>
        </header>

        <div className="space-y-8">
          {guide.sections.map((section) => (
            <section key={section.heading}>
              <h2 className="font-serif text-lg mb-2">{section.heading}</h2>
              <p className="text-sm text-ink-soft leading-relaxed">{section.body}</p>
            </section>
          ))}
        </div>

        {collection && (
          <p className="mt-10 pt-6 border-t border-line text-sm text-ink-soft">
            Shop the full{" "}
            <Link href={`/collections/${collection.handle}`} className="text-brand-dark underline">
              {collection.title}
            </Link>{" "}
            collection.
          </p>
        )}
      </article>

      {relatedProducts.length > 0 && (
        <section className="mt-16 border-t border-line pt-10">
          <h2 className="font-serif text-xl mb-6">Pieces from This Guide</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {relatedProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
