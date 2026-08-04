/**
 * Renders inline JSON-LD. No CSP nonce is attached — see next.config.ts
 * for why: a per-request nonce requires reading next/headers(), and doing
 * that from the root layout forces the entire site into dynamic
 * (server-rendered-per-request) rendering, which is a worse trade for a
 * mostly-static catalog site than allowing 'unsafe-inline' on script-src.
 */
export function JsonLd({ data }: { data: unknown }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
