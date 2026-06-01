export default function AProposLoading() {
  return (
    <>
      <div className="bg-bgdark py-16"><div className="container-main text-center space-y-4">
        <div className="h-8 w-48 bg-white/10 rounded mx-auto" />
        <div className="h-10 w-72 bg-white/10 rounded mx-auto" />
      </div></div>
      <div className="bg-white py-16"><div className="container-main max-w-3xl mx-auto space-y-4 animate-pulse">
        {[...Array(4)].map((_, i) => <div key={i} className="h-4 w-full bg-gray-100 rounded" />)}
      </div></div>
    </>
  )
}
