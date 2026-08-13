import Link from "next/link";
import Image from "next/image";

export default function NotFound() {
  return (
    <div className="mx-auto max-w-xl px-6 py-24 text-center">
      <Image src="/logo-badge.png" alt="" width={64} height={64} className="h-16 w-16 mx-auto mb-6" />
      <p className="text-xs uppercase tracking-widest text-brand mb-4">404</p>
      <h1 className="font-serif text-3xl mb-4">Page not found</h1>
      <p className="text-ink-soft mb-8">
        The page you&apos;re looking for doesn&apos;t exist, or may have moved. Try one of these instead:
      </p>
      <ul className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm">
        <li>
          <Link href="/" className="underline">
            Home
          </Link>
        </li>
        <li>
          <Link href="/collections/cookware" className="underline">
            Cookware
          </Link>
        </li>
        <li>
          <Link href="/collections/ramadan-eid" className="underline">
            Ramadan &amp; Eid
          </Link>
        </li>
        <li>
          <Link href="/guides" className="underline">
            Guides
          </Link>
        </li>
        <li>
          <Link href="/search" className="underline">
            Search
          </Link>
        </li>
      </ul>
    </div>
  );
}
