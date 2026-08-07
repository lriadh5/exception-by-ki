/**
 * Editorial/guide content — the record shape a future automated SEO
 * pipeline will write into (see README "Prepared, not built" and
 * mock-data.ts below). Every relationship is a stable key
 * (collectionKey → Collection.handle, relatedProductHandles →
 * Product.handle), never a free-text name, so linking stays correct as
 * the catalog changes and so a pipeline can resolve them safely without
 * fuzzy matching.
 */
export type ContentType = "guide";

export type ContentStatus = "draft" | "published";

export type ContentSection = {
  heading: string;
  body: string;
};

export type ContentRecord = {
  slug: string;
  contentType: ContentType;
  status: ContentStatus;
  title: string;
  /** Falls back to `title` when unset. */
  metaTitle?: string;
  metaDescription: string;
  /** Primary collection this piece supports — drives category<->guide back-linking. */
  collectionKey?: string;
  /** Products this piece references — drives guide->product and product->guide linking. */
  relatedProductHandles: string[];
  primaryKeyword: string;
  secondaryKeywords: string[];
  intro: string;
  sections: ContentSection[];
  publishedAt: string;
};
