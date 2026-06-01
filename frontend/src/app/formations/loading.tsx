export default function FormationsLoading() {
  return (
    <>
      {/* Hero skeleton */}
      <div className="bg-bgdark py-16 md:py-20">
        <div className="container-main text-center space-y-4">
          <div className="h-6 w-40 bg-white/10 rounded mx-auto" />
          <div className="h-10 w-80 bg-white/10 rounded mx-auto" />
          <div className="h-5 w-96 bg-white/5 rounded mx-auto" />
        </div>
      </div>

      {/* Cards skeleton */}
      <div className="bg-white py-16">
        <div className="container-main">
          <div className="h-8 w-64 bg-gray-200 rounded mb-10 mx-auto" />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="card border border-gray-100 p-6 animate-pulse">
                <div className="flex justify-between mb-3">
                  <div className="h-5 w-20 bg-gray-200 rounded" />
                  <div className="h-5 w-24 bg-gray-100 rounded" />
                </div>
                <div className="h-5 w-full bg-gray-200 rounded mb-2" />
                <div className="h-5 w-3/4 bg-gray-200 rounded mb-4" />
                <div className="flex gap-4 mb-4">
                  <div className="h-4 w-12 bg-gray-100 rounded" />
                  <div className="h-4 w-20 bg-gray-100 rounded" />
                </div>
                <div className="h-4 w-32 bg-gray-100 rounded mb-4" />
                <div className="h-9 w-full bg-gray-200 rounded" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  )
}
