import { getAllCollections, getAllProducts } from "@/lib/shopify/mock-data";
import { getAllContent } from "@/lib/content/mock-data";

export type OwnedIntent = {
  keyword: string;
  owningUrl: string;
  type: "product" | "collection" | "guide";
};

/**
 * Derived, always-in-sync registry of every search intent currently
 * owned by a live URL — one product, collection, or guide per keyword.
 * Not hand-maintained: computed from the same catalog/content data
 * every page already reads, so it can't silently drift out of sync
 * with what's actually live.
 *
 * The rule this exists to enforce (see the approved SEO architecture,
 * "keyword ownership"): before creating any new SEO page, check this
 * registry for the target keyword first. If something already owns
 * it — or something close enough that a searcher wouldn't tell them
 * apart — improve that page instead of creating a competing one.
 * This module only answers "who owns this keyword today"; it does not
 * publish anything itself.
 */
export function getKeywordOwnershipRegistry(): OwnedIntent[] {
  const products: OwnedIntent[] = getAllProducts().map((p) => ({
    keyword: p.title.toLowerCase(),
    owningUrl: `/products/${p.handle}`,
    type: "product",
  }));

  const collections: OwnedIntent[] = getAllCollections().map((c) => ({
    keyword: c.title.toLowerCase(),
    owningUrl: `/collections/${c.handle}`,
    type: "collection",
  }));

  const guides: OwnedIntent[] = getAllContent().flatMap((c) => [
    { keyword: c.primaryKeyword.toLowerCase(), owningUrl: c.owningUrl, type: "guide" as const },
    ...c.secondaryKeywords.map((k) => ({
      keyword: k.toLowerCase(),
      owningUrl: c.owningUrl,
      type: "guide" as const,
    })),
  ]);

  return [...products, ...collections, ...guides];
}

/** Exact-match lookup. Real usage should also eyeball near-variants by hand — this is a floor, not a substitute for judgment. */
export function findKeywordOwner(keyword: string): OwnedIntent | undefined {
  const q = keyword.trim().toLowerCase();
  return getKeywordOwnershipRegistry().find((entry) => entry.keyword === q);
}
