function hrefFor(basePath: string, params: URLSearchParams, page: number) {
  const next = new URLSearchParams(params);
  if (page <= 1) next.delete("page");
  else next.set("page", String(page));
  const qs = next.toString();
  return qs ? `${basePath}?${qs}` : basePath;
}

export function Pagination({
  basePath,
  currentParams,
  page,
  totalPages,
}: {
  basePath: string;
  currentParams: Record<string, string | string[] | undefined>;
  page: number;
  totalPages: number;
}) {
  if (totalPages <= 1) return null;

  const params = new URLSearchParams();
  Object.entries(currentParams).forEach(([key, value]) => {
    if (key === "page" || value === undefined) return;
    params.set(key, Array.isArray(value) ? value[0] : value);
  });

  return (
    <nav aria-label="Pagination" className="mt-12 flex items-center justify-center gap-4">
      {page > 1 ? (
        <a href={hrefFor(basePath, params, page - 1)} className="text-sm underline text-ink-soft hover:text-ink">
          Previous
        </a>
      ) : (
        <span className="text-sm text-ink-soft/40" aria-disabled="true">
          Previous
        </span>
      )}
      <span className="text-sm text-ink-soft" aria-current="page">
        Page {page} of {totalPages}
      </span>
      {page < totalPages ? (
        <a href={hrefFor(basePath, params, page + 1)} className="text-sm underline text-ink-soft hover:text-ink">
          Next
        </a>
      ) : (
        <span className="text-sm text-ink-soft/40" aria-disabled="true">
          Next
        </span>
      )}
    </nav>
  );
}
