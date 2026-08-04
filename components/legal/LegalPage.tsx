import type { ReactNode } from "react";

export function LegalPage({
  title,
  updated,
  children,
}: {
  title: string;
  updated?: string;
  children: ReactNode;
}) {
  return (
    <div className="mx-auto max-w-3xl px-6 py-16">
      <h1 className="font-serif text-3xl mb-2">{title}</h1>
      {updated && <p className="text-xs text-ink-soft mb-10">Last updated {updated}</p>}
      <div className="space-y-6 text-sm text-ink-soft leading-relaxed [&_h2]:font-serif [&_h2]:text-lg [&_h2]:text-ink [&_h2]:mt-10 [&_h2]:mb-2 [&_p]:mb-3 [&_ul]:list-disc [&_ul]:pl-5 [&_ul]:space-y-1 [&_a]:underline [&_a]:text-ink">
        {children}
      </div>
    </div>
  );
}
