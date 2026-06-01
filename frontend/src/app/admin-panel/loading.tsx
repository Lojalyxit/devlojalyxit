export default function AdminLoading() {
  return (
    <div className="p-6 md:p-8 animate-pulse">
      <div className="h-8 w-64 bg-gray-200 rounded mb-2" />
      <div className="h-4 w-48 bg-gray-100 rounded mb-8" />
      <div className="grid grid-cols-2 lg:grid-cols-5 gap-4 mb-8">
        {[...Array(5)].map((_, i) => (
          <div key={i} className="card border border-gray-200 p-4 h-24 bg-gray-100" />
        ))}
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="card border border-gray-200 p-5 h-64 bg-gray-50" />
        <div className="card border border-gray-200 p-5 h-64 bg-gray-50" />
      </div>
    </div>
  )
}
