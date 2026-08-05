"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

/**
 * Reveals children with the fade-in-up animation (app/globals.css) the
 * first time they scroll into view. Renders content immediately (not
 * hidden) so it degrades gracefully with JS disabled or slow hydration —
 * only the animation is deferred, never the content itself.
 */
export function FadeIn({
  children,
  delayMs = 0,
  className = "",
}: {
  children: ReactNode;
  delayMs?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.15, rootMargin: "0px 0px -10% 0px" }
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      // "js-fade-hidden" (not a bare opacity-0 utility) so app/layout.tsx
      // can force it visible via <noscript> — without JS, isVisible never
      // flips true, and this content must not stay invisible forever.
      className={`${isVisible ? "animate-fade-in-up" : "js-fade-hidden"} ${className}`}
      style={isVisible && delayMs ? { animationDelay: `${delayMs}ms` } : undefined}
    >
      {children}
    </div>
  );
}
