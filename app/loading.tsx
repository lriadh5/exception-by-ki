export default function Loading() {
  return (
    <div className="mx-auto max-w-7xl px-6 py-24 flex items-center justify-center">
      <div
        role="status"
        aria-label="Loading"
        className="h-8 w-8 rounded-full border-2 border-line border-t-brass animate-spin"
      />
    </div>
  );
}
