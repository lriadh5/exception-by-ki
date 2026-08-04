import Link from "next/link";

export function Breadcrumbs({ items }: { items: { name: string; href?: string }[] }) {
  return (
    <nav aria-label="Breadcrumb" className="text-xs text-ink-soft mb-6">
      <ol className="flex flex-wrap gap-2">
        {items.map((item, i) => (
          <li key={item.name} className="flex items-center gap-2">
            {i > 0 && <span aria-hidden>/</span>}
            {item.href ? (
              <Link href={item.href} className="hover:underline">
                {item.name}
              </Link>
            ) : (
              <span className="text-ink" aria-current="page">
                {item.name}
              </span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}
