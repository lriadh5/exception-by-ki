import Image from "next/image";

export default function Loading() {
  return (
    <div className="mx-auto max-w-7xl px-6 py-24 flex items-center justify-center">
      <Image
        src="/logo-badge.png"
        alt=""
        width={64}
        height={64}
        role="status"
        aria-label="Loading"
        className="h-16 w-16 animate-pulse"
      />
    </div>
  );
}
