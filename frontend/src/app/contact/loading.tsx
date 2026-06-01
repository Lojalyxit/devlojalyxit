export default function ContactLoading() {
  return (
    <>
      <div className="bg-bgdark py-14">
        <div className="container-main text-center space-y-3">
          <div className="h-10 w-64 bg-white/10 rounded mx-auto" />
          <div className="h-5 w-96 bg-white/5 rounded mx-auto" />
        </div>
      </div>
      <div className="bg-white py-16">
        <div className="container-main grid grid-cols-1 lg:grid-cols-2 gap-14 animate-pulse">
          <div className="space-y-5">
            {[...Array(5)].map((_, i) => <div key={i} className="h-12 bg-gray-100 rounded" />)}
          </div>
          <div className="space-y-6">
            {[...Array(4)].map((_, i) => <div key={i} className="h-10 bg-gray-100 rounded" />)}
          </div>
        </div>
      </div>
    </>
  )
}
