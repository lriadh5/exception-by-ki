export type Money = {
  amount: number;
  currencyCode: string;
};

/**
 * Product image. `url` is a real photo (from Shopify). `from`/`to` are a
 * brand-toned gradient used as a placeholder when no photo exists yet —
 * see components/commerce/ProductSwatch.tsx, which renders the photo when
 * `url` is present and falls back to the gradient otherwise.
 */
export type ProductImage = {
  alt: string;
  url?: string;
  from: string;
  to: string;
};

export type SelectedOption = {
  name: string;
  value: string;
};

/** One option dimension a product varies by, e.g. { name: "Size", values: ["10 inch", "12 inch"] }. */
export type ProductOption = {
  name: string;
  values: string[];
};

export type ProductVariant = {
  id: string;
  title: string;
  price: Money;
  available: boolean;
  /** Units in stock. 0 means out of stock regardless of `available`. */
  quantityAvailable: number;
  selectedOptions: SelectedOption[];
};

export type Product = {
  id: string;
  handle: string;
  title: string;
  description: string;
  collectionHandles: string[];
  images: ProductImage[];
  /** Option dimensions this product varies by (size, color, material, finish, ...). */
  options: ProductOption[];
  variants: ProductVariant[];
  occasion: string[];
  material?: string;
  careInstructions?: string;
};

export type Collection = {
  handle: string;
  title: string;
  description: string;
};

export type CartLine = {
  lineId: string;
  productHandle: string;
  variantId: string;
  title: string;
  variantTitle: string;
  price: Money;
  image: ProductImage;
  quantity: number;
  /** Stock snapshot at add-to-cart time, used to clamp quantity changes in the cart. */
  quantityAvailable: number;
};
