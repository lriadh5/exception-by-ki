import type { MetadataRoute } from "next";
import { listAllProducts, listCollections } from "@/lib/shopify/client";
import { SITE_URL } from "@/lib/env";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [products, collections] = await Promise.all([
    listAllProducts(),
    listCollections(),
  ]);

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: SITE_URL, changeFrequency: "daily", priority: 1 },
  ];

  const collectionRoutes: MetadataRoute.Sitemap = collections.map((c) => ({
    url: `${SITE_URL}/collections/${c.handle}`,
    changeFrequency: "daily",
    priority: 0.8,
  }));

  const productRoutes: MetadataRoute.Sitemap = products.map((p) => ({
    url: `${SITE_URL}/products/${p.handle}`,
    changeFrequency: "weekly",
    priority: 0.6,
  }));

  return [...staticRoutes, ...collectionRoutes, ...productRoutes];
}
