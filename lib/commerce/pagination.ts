export const PAGE_SIZE = 12;

export type PaginationResult<T> = {
  items: T[];
  page: number;
  totalPages: number;
  totalItems: number;
};

export function paginate<T>(items: T[], page: number, pageSize = PAGE_SIZE): PaginationResult<T> {
  const totalPages = Math.max(1, Math.ceil(items.length / pageSize));
  const clampedPage = Math.min(Math.max(1, page), totalPages);
  const start = (clampedPage - 1) * pageSize;
  return {
    items: items.slice(start, start + pageSize),
    page: clampedPage,
    totalPages,
    totalItems: items.length,
  };
}

export function parsePageParam(value: string | string[] | undefined): number {
  const v = Array.isArray(value) ? value[0] : value;
  const n = Number(v);
  return Number.isInteger(n) && n > 0 ? n : 1;
}
