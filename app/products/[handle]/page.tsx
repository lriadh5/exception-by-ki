import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import { getCollection, getProduct, listAllProducts, listProductsByCollection } from "@/lib/shopify/client";
import { getGuidesForProduct } from "@/lib/content/client";
import { ProductGallery } from "@/components/commerce/ProductGallery";
import { AddToCartForm } from "@/components/commerce/AddToCartForm";
import { Breadcrumbs } from "@/components/commerce/Breadcrumbs";
import { WishlistButton } from "@/components/commerce/WishlistButton";
import { RecentlyViewedStrip } from "@/components/commerce/RecentlyViewedStrip";
import { ProductCard } from "@/components/commerce/ProductCard";
import { ReviewsSection } from "@/components/commerce/ReviewsSection";
import { JsonLd } from "@/components/seo/JsonLd";
import { breadcrumbSchema, productSchema } from "@/lib/seo/schema";
import { getReviews, getSummary } from "@/lib/reviews/client";

export async function generateStaticParams() {
  const products = await listAllProducts();
  return products.map((p) => ({ handle: p.handle }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ handle: string }>;
}): Promise<Metadata> {
  const { handle } = await params;
  const product = await getProduct(handle);
  if (!product) return {};
  // A Shopify SEO title already carries the brand, so it bypasses the
  // layout's "%s | Exception by K&I" template instead of doubling it.
  const description = product.seoDescription ?? product.description;
  return {
    title: product.seoTitle ? { absolute: product.seoTitle } : product.title,
    description,
    alternates: { canonical: `/products/${product.handle}` },
    openGraph: {
      title: product.seoTitle ?? product.title,
      description,
    },
  };
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{ handle: string }>;
}) {
  const { handle } = await params;
  const product = await getProduct(handle);
  if (!product) notFound();

  const primaryCollectionHandle = product.collectionHandles[0];
  const [collection, collectionProducts, reviews, reviewSummary, guides] = await Promise.all([
    primaryCollectionHandle ? getCollection(primaryCollectionHandle) : Promise.resolve(undefined),
    primaryCollectionHandle ? listProductsByCollection(primaryCollectionHandle) : Promise.resolve([]),
    getReviews(product.handle),
    getSummary(product.handle),
    getGuidesForProduct(product.handle),
  ]);
  const recommendations = collectionProducts.filter((p) => p.handle !== product.handle).slice(0, 4);

  const defaultPrice = product.variants[0].price;

  return (
    <div className="mx-auto max-w-7xl px-6 py-16">
      <JsonLd data={productSchema(product, reviewSummary)} />
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
          ...(collection ? [{ name: collection.title, path: `/collections/${collection.handle}` }] : []),
          { name: product.title, path: `/products/${product.handle}` },
        ])}
      />

      <Breadcrumbs
        items={[
          { name: "Home", href: "/" },
          ...(collection ? [{ name: collection.title, href: `/collections/${collection.handle}` }] : []),
          { name: product.title },
        ]}
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        <ProductGallery images={product.images} />

        <div>
          <div className="flex items-start justify-between gap-4 mb-4">
            <h1 className="font-serif text-3xl">{product.title}</h1>
            <WishlistButton
              item={{ handle: product.handle, title: product.title, image: product.images[0], price: defaultPrice }}
              className="mt-1 shrink-0"
            />
          </div>
          {product.descriptionHtml ? (
            // Merchant-authored HTML from the Shopify admin (see
            // docs/catalog-standard.md §3), not user input.
            <div
              className="text-ink-soft mb-8 space-y-3 [&_h3]:font-serif [&_h3]:text-lg [&_h3]:text-ink [&_h3]:pt-3 [&_ul]:list-disc [&_ul]:pl-5 [&_ul]:space-y-1 [&_a]:text-brand-dark [&_a]:underline"
              dangerouslySetInnerHTML={{ __html: product.descriptionHtml }}
            />
          ) : (
            <p className="text-ink-soft mb-8">{product.description}</p>
          )}

          <AddToCartForm product={product} />

          <dl className="mt-10 space-y-3 border-t border-line pt-6 text-sm">
            {product.material && (
              <div className="flex justify-between">
                <dt className="text-ink-soft">Material</dt>
                <dd className="text-ink">{product.material}</dd>
              </div>
            )}
            {product.careInstructions && (
              <div className="flex justify-between gap-8">
                <dt className="text-ink-soft shrink-0">Care</dt>
                <dd className="text-ink text-right">
                  {product.careInstructions}
                </dd>
              </div>
            )}
          </dl>

          {guides.length > 0 && (
            <p className="mt-6 text-sm text-ink-soft">
              Featured in{" "}
              {guides.map((guide, i) => (
                <span key={guide.slug}>
                  {i > 0 && ", "}
                  <Link href={`/guides/${guide.slug}`} className="text-brand-dark underline">
                    {guide.title}
                  </Link>
                </span>
              ))}
            </p>
          )}
        </div>
      </div>

      {recommendations.length > 0 && (
        <section className="mt-20 border-t border-line pt-10">
          <h2 className="font-serif text-xl mb-6">You May Also Like</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {recommendations.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </section>
      )}

      <RecentlyViewedStrip
        current={{ handle: product.handle, title: product.title, image: product.images[0], price: defaultPrice }}
      />

      <ReviewsSection reviews={reviews} summary={reviewSummary} />
    </div>
  );
}
