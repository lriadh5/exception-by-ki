import {
  getAllContent,
  getContentBySlug,
  getContentByCollectionKey,
  getContentByProductHandle,
} from "./mock-data";
import type { ContentRecord } from "./types";

/**
 * Data adapter boundary, same shape as lib/shopify/client.ts and
 * lib/reviews/client.ts: pages read guides through these functions
 * instead of importing mock-data directly. There's no CMS/pipeline
 * connected yet, so this always reads mock-data.ts — when the automated
 * SEO pipeline is connected, replace the bodies below with real calls to
 * it; callers don't change.
 */

export async function listGuides(): Promise<ContentRecord[]> {
  return getAllContent();
}

export async function getGuide(slug: string): Promise<ContentRecord | undefined> {
  return getContentBySlug(slug);
}

export async function getGuidesForCollection(collectionKey: string): Promise<ContentRecord[]> {
  return getContentByCollectionKey(collectionKey);
}

export async function getGuidesForProduct(productHandle: string): Promise<ContentRecord[]> {
  return getContentByProductHandle(productHandle);
}
