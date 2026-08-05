import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Account",
  robots: { index: false, follow: false },
};

/**
 * No sign-in or order history yet — planned on Shopify Customer Account
 * API once a store is connected (see lib/account/types.ts and README
 * "Prepared, not built"). This stays an honest "not available" page
 * rather than a fake login form: there's no auth backend behind it to
 * accept a submission yet.
 */
export default function AccountPage() {
  return (
    <div className="mx-auto max-w-xl px-6 py-24 text-center">
      <h1 className="font-serif text-3xl mb-4">Accounts aren&apos;t available yet</h1>
      <p className="text-ink-soft mb-4">
        Sign-in and order history will be available once a Shopify store is connected. In the
        meantime:
      </p>
      <ul className="text-ink-soft text-sm mb-8 space-y-1">
        <li>
          Your <Link href="/wishlist" className="underline">wishlist</Link> and cart are saved on
          this device.
        </li>
        <li>
          Placed an order? Shopify emails your order confirmation and tracking directly — no
          account needed to check it.
        </li>
      </ul>
      <Link href="/" className="underline text-sm">
        Back home
      </Link>
    </div>
  );
}
