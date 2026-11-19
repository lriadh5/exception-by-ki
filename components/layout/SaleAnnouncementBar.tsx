/**
 * Site-wide Black Friday announcement bar. Temporary — remove this
 * component and its mount in app/layout.tsx once the sale ends.
 */
export function SaleAnnouncementBar() {
  return (
    <div className="bg-paper-dim border-b border-brand-dark/20 text-center text-xs sm:text-sm tracking-[0.08em] uppercase text-brand-dark px-4 py-2 font-medium">
      Black Friday Sale — 15% Off Sitewide
    </div>
  );
}
