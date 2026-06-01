export default function ServicesLoading() {
  return (
    <>
      {/* Hero skeleton */}
      <div className="bg-bgdark py-16 md:py-20">
        <div className="container-main text-center space-y-4">
          <div className="h-10 w-64 bg-white/10 rounded mx-auto" />
          <div className="h-5 w-96 bg-white/5 rounded mx-auto" />
        </div>
      </div>

      {/* Services skeleton */}
      {[...Array(3)].map((_, i) => (
        <div key={i} className={`py-16 ${i % 2 === 1 ? 'bg-bgdeep' : 'bg-white'}`}>
          <div className="container-main">
            <div className="flex flex-col md:flex-row gap-12 items-center animate-pulse">
              <div className="flex-1 space-y-4">
                <div className="h-8 w-8 bg-gray-300 rounded" />
                <div className="h-8 w-64 bg-gray-200 rounded" />
                <div className="h-4 w-full bg-gray-100 rounded" />
                <div className="h-4 w-5/6 bg-gray-100 rounded" />
                <div className="space-y-2 pt-2">
                  {[...Array(4)].map((_, j) => (
                    <div key={j} className="h-4 w-3/4 bg-gray-100 rounded" />
                  ))}
                </div>
                <div className="h-10 w-40 bg-gray-200 rounded" />
              </div>
              <div className="flex-1 aspect-square max-w-sm bg-gray-100 rounded-card" />
            </div>
          </div>
        </div>
      ))}
    </>
  )
}
