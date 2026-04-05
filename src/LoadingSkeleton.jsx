export function ListSkeleton() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {[...Array(12)].map((_, i) => (
        <div key={i} className="animate-pulse bg-white p-4 rounded-2xl border border-gray-100 flex items-center gap-4">
          <div className="w-12 h-12 bg-gray-200 rounded-xl"></div>
          <div className="flex-1 space-y-2">
            <div className="h-4 bg-gray-200 rounded w-1/2"></div>
            <div className="h-3 bg-gray-200 rounded w-1/3"></div>
          </div>
        </div>
      ))}
    </div>
  );
}

export function DetailSkeleton() {
  return (
    <div className="space-y-6">
      <div className="animate-pulse h-48 bg-gray-200 rounded-2xl w-full"></div>
      {[...Array(5)].map((_, i) => (
        <div key={i} className="animate-pulse h-32 bg-gray-200 rounded-2xl w-full"></div>
      ))}
    </div>
  );
}