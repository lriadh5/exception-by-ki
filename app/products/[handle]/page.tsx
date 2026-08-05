import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getCollection, getProduct, listAllProducts, listProductsByCollection } from "@/lib/shopify/client";
import { ProductSwatch } from "@/components/commerce/ProductSwatch";
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
  return {
    title: product.title,
    description: product.description,
    alternates: { canonical: `/products/${product.handle}` },
    openGraph: {
      title: product.title,
      description: product.description,
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
  const [collection, collectionProducts, reviews, reviewSummary] = await Promise.all([
    primaryCollectionHandle ? getCollection(primaryCollectionHandle) : Promise.resolve(undefined),
    primaryCollectionHandle ? listProductsByCollection(primaryCollectionHandle) : Promise.resolve([]),
    getReviews(product.handle),
    getSummary(product.handle),
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
        <ProductSwatch
          image={product.images[0]}
          className="aspect-square rounded-sm"
        />

        <div>
          <div className="flex items-start justify-between gap-4 mb-4">
            <h1 className="font-serif text-3xl">{product.title}</h1>
            <WishlistButton
              item={{ handle: product.handle, title: product.title, image: product.images[0], price: defaultPrice }}
              className="mt-1 shrink-0"
            />
          </div>
          <p className="text-ink-soft mb-8">{product.description}</p>

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
