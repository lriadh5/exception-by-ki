import type { Review, ReviewSummary } from "@/lib/reviews/types";

function Stars({ rating, label }: { rating: number; label: string }) {
  const rounded = Math.round(rating);
  return (
    <span className="text-amber-600 tracking-tight" aria-label={label}>
      {"★".repeat(rounded)}
      <span className="text-line">{"★".repeat(5 - rounded)}</span>
    </span>
  );
}

export function ReviewsSection({
  reviews,
  summary,
}: {
  reviews: Review[];
  summary: ReviewSummary;
}) {
  return (
    <section className="mt-20 border-t border-line pt-10">
      <div className="flex items-baseline justify-between gap-4 mb-6">
        <h2 className="font-serif text-xl">Reviews</h2>
        {summary.count > 0 && (
          <div className="flex items-center gap-2 text-sm text-ink-soft">
            <Stars rating={summary.average} label={`${summary.average} out of 5 stars`} />
            <span>
              {summary.average} ({summary.count} {summary.count === 1 ? "review" : "reviews"})
            </span>
          </div>
        )}
      </div>

      {reviews.length === 0 ? (
        <p className="text-ink-soft text-sm">No reviews yet for this product.</p>
      ) : (
        <ul className="space-y-8">
          {reviews.map((review) => (
            <li key={review.id} className="border-t border-line pt-6 first:border-t-0 first:pt-0">
              <div className="flex items-center justify-between gap-4 mb-1">
                <Stars rating={review.rating} label={`${review.rating} out of 5 stars`} />
                <time dateTime={review.createdAt} className="text-xs text-ink-soft">
                  {new Date(review.createdAt).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </time>
              </div>
              <h3 className="font-medium text-ink mb-1">{review.title}</h3>
              <p className="text-ink-soft text-sm mb-2">{review.body}</p>
              <p className="text-xs text-ink-soft">{review.author}</p>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
