import type { Metadata } from "next";
import Link from "next/link";
import { listGuides } from "@/lib/content/client";
import { Breadcrumbs } from "@/components/commerce/Breadcrumbs";
import { JsonLd } from "@/components/seo/JsonLd";
import { breadcrumbSchema } from "@/lib/seo/schema";

export const metadata: Metadata = {
  title: "Guides & Inspiration",
  description:
    "Styling ideas, care guides, and gathering inspiration from Exception by K&I — built around the pieces in our catalog, not around a sales pitch.",
  alternates: { canonical: "/guides" },
};

export default async function GuidesIndexPage() {
  const guides = await listGuides();

  return (
    <div className="mx-auto max-w-4xl px-6 py-16">
      <JsonLd data={breadcrumbSchema([{ name: "Home", path: "/" }, { name: "Guides", path: "/guides" }])} />

      <Breadcrumbs items={[{ name: "Home", href: "/" }, { name: "Guides" }]} />

      <header className="mb-12 max-w-2xl">
        <h1 className="font-serif text-3xl mb-3">Guides &amp; Inspiration</h1>
        <p className="text-ink-soft">
          Styling ideas and gathering guides built around the pieces we actually
          carry — not generic advice.
        </p>
      </header>

      {guides.length === 0 ? (
        <p className="text-ink-soft text-sm">New guides are on their way.</p>
      ) : (
        <ul className="space-y-8">
          {guides.map((guide) => (
            <li key={guide.slug} className="border-t border-line pt-8 first:border-t-0 first:pt-0">
              <Link href={`/guides/${guide.slug}`} className="group block">
                <h2 className="font-serif text-xl group-hover:text-brand-dark transition-colors">
                  {guide.title}
                </h2>
                <p className="text-sm text-ink-soft mt-2 max-w-2xl">{guide.metaDescription}</p>
                <span className="inline-block mt-3 text-sm text-brand-dark underline">
                  Read the guide
                </span>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
