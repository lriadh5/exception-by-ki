import Link from "next/link";
import type { Product } from "@/lib/shopify/types";
import { formatMoney } from "@/lib/format";
import { ProductSwatch } from "./ProductSwatch";
import { WishlistButton } from "./WishlistButton";

export function ProductCard({ product }: { product: Product }) {
  const price = product.variants[0]?.price;
  return (
    <Link
      href={`/products/${product.handle}`}
      className="group block relative"
    >
      <ProductSwatch
        image={product.images[0]}
        className="aspect-square rounded-sm overflow-hidden shadow-sm transition-all duration-500 ease-out group-hover:scale-[1.03] group-hover:shadow-md"
      />
      {price && (
        <WishlistButton
          item={{ handle: product.handle, title: product.title, image: product.images[0], price }}
          className="absolute top-3 right-3 bg-paper/80 backdrop-blur rounded-full h-8 w-8 flex items-center justify-center transition-transform duration-300 group-hover:scale-105"
        />
      )}
      <div className="mt-3 space-y-1">
        <h3 className="text-sm text-ink transition-colors duration-300 group-hover:text-brass-dark">
          {product.title}
        </h3>
        {price && (
          <p className="text-sm text-ink-soft">{formatMoney(price)}</p>
        )}
      </div>
    </Link>
  );
}
