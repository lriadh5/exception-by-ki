import Image from "next/image";
import type { ProductImage } from "@/lib/shopify/types";

/**
 * Renders the real product photo when `image.url` is set (Shopify data).
 * Falls back to a brand-toned gradient placeholder with the product name
 * when it isn't — i.e. always, for the sample catalog — so pages/layouts
 * can be built and reviewed before photography exists.
 */
export function ProductSwatch({
  image,
  className = "",
  showLabel = true,
  sizes,
  priority = false,
}: {
  image: ProductImage;
  className?: string;
  showLabel?: boolean;
  sizes?: string;
  /** Set for the single above-the-fold hero image on a page (e.g. the
   * active PDP gallery image) so it's preloaded instead of lazy-loaded —
   * it's typically the LCP element. Leave false everywhere else,
   * including gallery thumbnails and grid/card images. */
  priority?: boolean;
}) {
  if (image.url) {
    return (
      <div className={`relative overflow-hidden bg-paper-dim ${className}`}>
        <Image
          src={image.url}
          alt={image.alt}
          fill
          sizes={sizes ?? "(min-width: 768px) 50vw, 100vw"}
          className="object-cover"
          priority={priority}
        />
      </div>
    );
  }

  return (
    <div
      className={`flex items-end overflow-hidden p-4 ${className}`}
      style={{
        background: `linear-gradient(135deg, ${image.from}, ${image.to})`,
      }}
      role="img"
      aria-label={image.alt}
    >
      {showLabel && (
        <span className="font-serif text-sm text-paper/90 leading-snug">
          {image.alt}
        </span>
      )}
    </div>
  );
}
