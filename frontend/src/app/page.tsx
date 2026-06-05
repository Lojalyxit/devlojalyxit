import Link from 'next/link'
import { ArrowRight, CheckCircle, Shield, Clock, Award, ChevronRight } from 'lucide-react'
import { getServices } from '@/lib/api'
import { ServiceIcon } from '@/components/ui/ServiceIcon'
import ReferencesSection from '@/components/sections/ReferencesSection'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'LojalyxIT — Solutions IT & Centre de Formation | Conakry',
}

const REASSURANCE = [
  { icon: CheckCircle, label: 'Satisfait ou remboursé 30 jours' },
  { icon: Clock, label: 'Support client français 7J/7' },
  { icon: Shield, label: 'Paiement 100% sécurisé SSL' },
]

const CHIFFRES = [
  { value: '12+', label: 'Années d\'expérience' },
  { value: '11', label: 'Certifications professionnelles' },
  { value: '7', label: 'Années d\'enseignement' },
]

export default async function HomePage() {
  const services = await getServices()

  return (
    <>
      {/* ── Hero ── */}
      <section className="bg-bgdark min-h-[90vh] flex items-center">
        <div className="container-main py-24 md:py-32 text-center">
          <p className="font-script text-accent text-4xl md:text-5xl mb-6">LojalyxIT</p>
          <h1 className="font-display text-title text-4xl md:text-6xl lg:text-7xl font-bold leading-tight mb-6">
            Innover · Connecter
            <br />
            <span className="text-primary">Transformer</span>
          </h1>
          <p className="text-textlight text-lg md:text-xl max-w-2xl mx-auto mb-10 font-light leading-relaxed">
            Votre partenaire IT de confiance à Conakry. Solutions cloud, cybersécurité,
            développement logiciel et centre de formation certifiant.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/devis" className="btn-primary text-base">
              Demander un devis <ArrowRight size={18} />
            </Link>
            <Link href="/formations" className="btn-ghost text-base">
              Nos formations
            </Link>
          </div>
        </div>
      </section>

      {/* ── Réassurance ── */}
      <section className="bg-white border-b border-gray-100">
        <div className="container-main py-5">
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 sm:gap-12 text-sm text-textdark font-sans">
            {REASSURANCE.map(({ icon: Icon, label }) => (
              <div key={label} className="flex items-center gap-2">
                <Icon size={18} className="text-primary shrink-0" />
                <span className="font-light">{label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 7 Services ── */}
      <section className="bg-white py-20 md:py-28">
        <div className="container-main">
          <div className="text-center mb-14">
            <h2 className="font-display text-textdark text-3xl md:text-4xl font-bold mb-4">
              Nos 7 piliers de service
            </h2>
            <p className="text-muted max-w-xl mx-auto font-light">
              De l'infrastructure au développement logiciel, en passant par la cybersécurité
              et la formation certifiante.
            </p>
          </div>

          {services.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {services.map((s) => (
                <Link
                  key={s.slug}
                  href={`/services#${s.slug}`}
                  className="card p-6 group border-2 border-gray-100 hover:border-primary hover:-translate-y-0.5 hover:shadow-[0_8px_20px_rgba(42,74,58,0.15)] transition-[border-color,transform,box-shadow] duration-200 ease-out"
                >
                  <ServiceIcon
                    name={s.icone}
                    size={32}
                    className="text-primary mb-4 group-hover:scale-110 transition-transform duration-200"
                  />
                  <h3 className="font-sans font-semibold text-textdark text-base mb-2">{s.titre}</h3>
                  <p className="text-muted text-sm font-light leading-relaxed line-clamp-3">{s.description}</p>
                  <span className="inline-flex items-center gap-1 text-primary text-sm mt-4 font-medium">
                    En savoir plus <ChevronRight size={14} />
                  </span>
                </Link>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {[...Array(7)].map((_, i) => (
                <div key={i} className="card p-6 border border-gray-100 animate-pulse">
                  <div className="w-8 h-8 bg-gray-200 rounded mb-4" />
                  <div className="h-4 bg-gray-200 rounded w-3/4 mb-2" />
                  <div className="h-3 bg-gray-100 rounded w-full" />
                </div>
              ))}
            </div>
          )}

          <div className="text-center mt-10">
            <Link href="/services" className="btn-secondary">
              Voir tous nos services
            </Link>
          </div>
        </div>
      </section>

      {/* ── Références fondateur ── */}
      <ReferencesSection />

      {/* ── Chiffres clés ── */}
      <section className="bg-bgdark py-20">
        <div className="container-main">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-10 text-center">
            {CHIFFRES.map(({ value, label }) => (
              <div key={label}>
                <p className="font-display text-accent text-5xl md:text-6xl font-bold mb-2">{value}</p>
                <p className="text-textlight font-light text-base">{label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA Diagnostic ── */}
      <section className="bg-primary py-16 md:py-20">
        <div className="container-main text-center">
          <Award size={40} className="text-white mx-auto mb-4 opacity-80" />
          <h2 className="font-display text-white text-3xl md:text-4xl font-bold mb-4">
            Diagnostic IT Gratuit
          </h2>
          <p className="text-white/80 max-w-lg mx-auto mb-8 font-light text-lg">
            Obtenez une analyse complète de votre infrastructure informatique, sans engagement.
          </p>
          <Link href="/contact?sujet=diagnostic" className="inline-flex items-center gap-2 bg-white text-primary px-8 py-4 rounded-btn font-medium hover:bg-title transition-colors duration-200 text-base">
            Demander mon diagnostic gratuit <ArrowRight size={18} />
          </Link>
        </div>
      </section>
    </>
  )
}
