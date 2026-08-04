"use client";

import { useEffect } from "react";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="mx-auto max-w-xl px-6 py-24 text-center">
      <p className="text-xs uppercase tracking-widest text-error mb-4">Error</p>
      <h1 className="font-serif text-3xl mb-4">Something went wrong</h1>
      <p className="text-ink-soft mb-8">
        Sorry about that — please try again. If it keeps happening, the issue has been logged.
      </p>
      <button onClick={reset} className="bg-ink text-paper px-6 py-3 text-sm">
        Try again
      </button>
    </div>
  );
}
