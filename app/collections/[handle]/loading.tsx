export default function Loading() {
  return (
    <div className="mx-auto max-w-7xl px-6 py-16 animate-pulse">
      <div className="h-3 w-40 bg-line rounded-sm mb-6" />
      <div className="h-8 w-64 bg-line rounded-sm mb-3" />
      <div className="h-4 w-96 max-w-full bg-line rounded-sm mb-10" />
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {Array.from({ length: 8 }, (_, i) => (
          <div key={i}>
            <div className="aspect-square bg-line rounded-sm" />
            <div className="h-4 w-3/4 bg-line rounded-sm mt-3" />
            <div className="h-4 w-1/3 bg-line rounded-sm mt-2" />
          </div>
        ))}
      </div>
    </div>
  );
}
