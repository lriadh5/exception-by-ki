import Link from "next/link";
import Image from "next/image";

export default function NotFound() {
  return (
    <div className="mx-auto max-w-xl px-6 py-24 text-center">
      <Image src="/logo-badge.png" alt="" width={64} height={64} className="h-16 w-16 mx-auto mb-6" />
      <p className="text-xs uppercase tracking-widest text-brand mb-4">404</p>
      <h1 className="font-serif text-3xl mb-4">Page not found</h1>
      <p className="text-ink-soft mb-8">
        The page you&apos;re looking for doesn&apos;t exist, or may have moved.
      </p>
      <Link href="/" className="underline text-sm">
        Back home
      </Link>
    </div>
  );
}
