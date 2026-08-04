import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Account",
  robots: { index: false, follow: false },
};

export default function AccountPage() {
  return (
    <div className="mx-auto max-w-xl px-6 py-24 text-center">
      <h1 className="font-serif text-3xl mb-4">Accounts aren&apos;t available yet</h1>
      <p className="text-ink-soft mb-8">
        Sign-in and order history will be available once a Shopify store is connected. Your cart
        and wishlist are saved on this device in the meantime.
      </p>
      <Link href="/" className="underline text-sm">
        Back home
      </Link>
    </div>
  );
}
