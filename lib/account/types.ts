/**
 * Architecture placeholder — no customer accounts/auth exist yet. Real
 * accounts need a backend (Shopify Customer Account API or a custom auth
 * provider) — see app/account/page.tsx for the current "not available"
 * stub and README "Prepared, not built".
 */
export type Customer = {
  id: string;
  email: string;
  firstName?: string;
  lastName?: string;
};
