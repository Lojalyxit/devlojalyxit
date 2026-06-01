import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="bg-bgdark min-h-[80vh] flex items-center justify-center">
      <div className="container-main text-center py-24">
        <p className="font-display text-accent text-7xl font-bold mb-4">404</p>
        <h1 className="font-display text-title text-3xl md:text-4xl font-bold mb-4">
          Page introuvable
        </h1>
        <p className="text-textlight mb-10 font-light max-w-md mx-auto">
          La page que vous recherchez n&apos;existe pas ou a été déplacée.
        </p>
        <Link href="/" className="btn-primary">
          Retour à l&apos;accueil
        </Link>
      </div>
    </div>
  )
}
