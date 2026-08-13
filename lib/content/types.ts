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

/**
 * Classifies *why* this page exists in search terms — lets a future
 * pipeline group/report on intent, and keeps the "one URL per intent"
 * rule (see keyword-ownership.ts) legible without inferring it from
 * copy. Not a content-type distinction — all of these render through
 * the same guide template.
 */
export type SearchIntent =
  | "informational"
  | "comparison"
  | "buying-guide"
  | "gift-guide"
  | "use-case"
  | "seasonal";

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
  searchIntent: SearchIntent;
  /**
   * The canonical path that owns `primaryKeyword`'s search intent — see
   * lib/content/keyword-ownership.ts. Almost always this record's own
   * `/guides/{slug}`; stored explicitly (not derived) so the ownership
   * registry stays a flat, auditable list even if a future content type
   * ever points ownership somewhere other than its own URL.
   */
  owningUrl: string;
  intro: string;
  sections: ContentSection[];
  publishedAt: string;
};
