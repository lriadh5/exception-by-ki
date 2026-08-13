"use client";

import { useState } from "react";
import type { ProductImage } from "@/lib/shopify/types";
import { ProductSwatch } from "./ProductSwatch";

/**
 * Featured image + thumbnail strip. Falls back to a single ProductSwatch
 * with no strip when there's only one image — most of the catalog.
 */
export function ProductGallery({ images }: { images: ProductImage[] }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const active = images[activeIndex] ?? images[0];

  return (
    <div>
      <ProductSwatch image={active} className="aspect-square rounded-sm" priority />

      {images.length > 1 && (
        <div className="mt-3 grid grid-cols-5 gap-2" role="tablist" aria-label="Product images">
          {images.map((image, i) => (
            <button
              key={image.url ?? i}
              type="button"
              role="tab"
              aria-selected={i === activeIndex}
              aria-label={`Show image ${i + 1} of ${images.length}`}
              onClick={() => setActiveIndex(i)}
              className={`rounded-sm overflow-hidden ring-1 transition-all ${
                i === activeIndex ? "ring-2 ring-brand" : "ring-line hover:ring-brand-light"
              }`}
            >
              <ProductSwatch image={image} className="aspect-square" showLabel={false} sizes="20vw" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
