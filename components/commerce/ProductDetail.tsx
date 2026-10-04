"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import type { Product } from "@/lib/shopify/types";
import type { ContentRecord } from "@/lib/content/types";
import { ProductGallery } from "./ProductGallery";
import { AddToCartForm } from "./AddToCartForm";
import { WishlistButton } from "./WishlistButton";
import { defaultSelections, findVariantByOptions, type OptionSelections } from "@/lib/shopify/variant";

/**
 * Owns the selected-option state (size, color, ...) so the gallery can jump
 * to a variant's own photo — e.g. clicking "Burgundy" shows the Burgundy
 * cape — at the same time the add-to-cart form updates price/stock.
 */
export function ProductDetail({ product, guides }: { product: Product; guides: ContentRecord[] }) {
  const [selections, setSelections] = useState<OptionSelections>(() => defaultSelections(product));

  const variant = useMemo(() => findVariantByOptions(product, selections), [product, selections]);
  const defaultPrice = product.variants[0].price;

  function selectOption(name: string, value: string) {
    setSelections((prev) => ({ ...prev, [name]: value }));
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
      <ProductGallery images={product.images} activeImageUrl={variant?.image?.url} />

      <div>
        <div className="flex items-start justify-between gap-4 mb-4">
          <h1 className="font-serif text-3xl">{product.title}</h1>
          <WishlistButton
            item={{ handle: product.handle, title: product.title, image: product.images[0], price: defaultPrice }}
            className="mt-1 shrink-0"
          />
        </div>
        <p className="text-ink-soft mb-8">{product.description}</p>

        <AddToCartForm
          product={product}
          selections={selections}
          onSelectOption={selectOption}
          variant={variant}
        />

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
              <dd className="text-ink text-right">{product.careInstructions}</dd>
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
  );
}
