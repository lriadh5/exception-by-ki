export default function Loading() {
  return (
    <div className="mx-auto max-w-7xl px-6 py-16 animate-pulse">
      <div className="h-3 w-56 bg-line rounded-sm mb-6" />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        <div className="aspect-square bg-line rounded-sm" />
        <div>
          <div className="h-8 w-2/3 bg-line rounded-sm mb-4" />
          <div className="h-4 w-full bg-line rounded-sm mb-2" />
          <div className="h-4 w-5/6 bg-line rounded-sm mb-8" />
          <div className="h-6 w-24 bg-line rounded-sm mb-6" />
          <div className="h-12 w-full bg-line rounded-sm" />
        </div>
      </div>
    </div>
  );
}
