export default function DocumentSkeleton({ viewMode = 'grid' }: { viewMode?: 'grid' | 'list' }) {
  if (viewMode === 'list') {
    return (
      <div className="space-y-2">
        {[...Array(5)].map((_, i) => (
          <div key={i} className="bg-white border border-gray-200 rounded-lg p-4">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-gray-200 rounded animate-shimmer" />
              <div className="flex-1 space-y-2">
                <div className="h-4 bg-gray-200 rounded w-3/4 animate-shimmer" />
                <div className="h-3 bg-gray-200 rounded w-1/2 animate-shimmer" />
              </div>
              <div className="w-16 h-4 bg-gray-200 rounded animate-shimmer" />
            </div>
          </div>
        ))}
      </div>
    )
  }

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {[...Array(8)].map((_, i) => (
        <div key={i} className="bg-white border border-gray-200 rounded-lg overflow-hidden">
          <div className="aspect-square bg-gray-200 animate-shimmer" />
          <div className="p-3 space-y-2">
            <div className="h-4 bg-gray-200 rounded w-3/4 animate-shimmer" />
            <div className="h-3 bg-gray-200 rounded w-1/2 animate-shimmer" />
          </div>
        </div>
      ))}
    </div>
  )
}
