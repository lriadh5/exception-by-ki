"use client";

import { useState } from "react";
import type { ProductImage } from "@/lib/shopify/types";
import { ProductSwatch } from "./ProductSwatch";

/**
 * Featured image + thumbnail strip. Falls back to a single ProductSwatch
 * with no strip when there's only one image — most of the catalog.
 *
 * `activeImage` lets a parent (the color/option selector) jump the gallery
 * to a variant's own photo — e.g. the Burgundy cape's own photo when
 * "Burgundy" is selected — by passing that photo directly. The gallery
 * renders it as-is; it does not need to also appear in `images` or match
 * any image there by URL. Matching by URL string across two separate API
 * responses (the product's gallery and a variant's own image) isn't
 * guaranteed to produce byte-identical strings, so this component never
 * relies on that — the caller's object is the source of truth.
 */
export function ProductGallery({
  images,
  activeImage,
}: {
  images: ProductImage[];
  activeImage?: ProductImage;
}) {
  const [manualImage, setManualImage] = useState<ProductImage | null>(null);
  const [prevActiveImage, setPrevActiveImage] = useState(activeImage);

  // A new variant selection always wins over a prior manual thumbnail
  // click — otherwise picking a design after browsing thumbnails would
  // leave the gallery stuck on whatever thumbnail was last clicked. Reset
  // during render (React's documented pattern for this) rather than in an
  // effect, which would cause an extra render pass.
  if (activeImage !== prevActiveImage) {
    setPrevActiveImage(activeImage);
    setManualImage(null);
  }

  const active = manualImage ?? activeImage ?? images[0];

  return (
    <div>
      <ProductSwatch image={active} className="aspect-square rounded-sm" priority />

      {images.length > 1 && (
        <div className="mt-3 grid grid-cols-5 gap-2" role="tablist" aria-label="Product images">
          {images.map((image, i) => {
            const isActive = active.url ? image.url === active.url : image === active;
            return (
              <button
                key={image.url ?? i}
                type="button"
                role="tab"
                aria-selected={isActive}
                aria-label={`Show image ${i + 1} of ${images.length}`}
                onClick={() => setManualImage(image)}
                className={`rounded-sm overflow-hidden ring-1 transition-all ${
                  isActive ? "ring-2 ring-brand" : "ring-line hover:ring-brand-light"
                }`}
              >
                <ProductSwatch image={image} className="aspect-square" showLabel={false} sizes="20vw" />
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
