export default function ClientLoading() {
  return (
    <div className="p-6 md:p-8 animate-pulse">
      <div className="h-8 w-56 bg-gray-200 rounded mb-2" />
      <div className="h-4 w-40 bg-gray-100 rounded mb-8" />
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 mb-8">
        {[...Array(3)].map((_, i) => (
          <div key={i} className="card border border-gray-200 p-5 h-28 bg-gray-100" />
        ))}
      </div>
      <div className="card border border-gray-200 p-5 h-48 bg-gray-50" />
    </div>
  )
}
