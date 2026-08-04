"use client";

import { useState } from "react";

export function NewsletterForm() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setIsSubmitting(true);
    setMessage(null);
    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const data = await res.json();
      setMessage(data.message ?? (data.ok ? "Subscribed." : "Something went wrong."));
    } catch {
      setMessage("Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-2">
      <label htmlFor="newsletter-email" className="text-sm text-ink block">
        Get seasonal updates
      </label>
      <div className="flex gap-2">
        <input
          id="newsletter-email"
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="you@example.com"
          className="flex-1 border border-line rounded-sm px-3 py-2 text-sm bg-paper"
        />
        <button
          type="submit"
          disabled={isSubmitting}
          className="bg-ink text-paper px-4 py-2 text-sm shrink-0 disabled:opacity-50"
        >
          {isSubmitting ? "…" : "Sign up"}
        </button>
      </div>
      {message && (
        <p role="status" className="text-xs text-ink-soft">
          {message}
        </p>
      )}
    </form>
  );
}
