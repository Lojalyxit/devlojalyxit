import Link from 'next/link'
import { ArrowRight, CheckCircle, Shield, Clock, Award, ChevronRight } from 'lucide-react'
import { getContenuAccueil } from '@/lib/api'
import { SERVICES_OFFRES } from '@/data/services'
import { ServiceCard } from '@/components/sections/ServiceCard'
import { Reveal } from '@/components/ui/Reveal'
import ReferencesSection from '@/components/sections/ReferencesSection'
import { ChiffresCles } from '@/components/sections/ChiffresCles'
import { SLOGAN } from '@/lib/site'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: { absolute: `LojalyxIT — ${SLOGAN} | Solutions IT & Formation à Conakry` },
}

const REASSURANCE = [
  { icon: CheckCircle, label: 'Satisfait ou remboursé 30 jours' },
  { icon: Clock, label: 'Support client français 7J/7' },
  { icon: Shield, label: 'Paiement 100% sécurisé SSL' },
]

export default async function HomePage() {
  const hero = await getContenuAccueil()

  return (
    <>
      {/* ── Hero (textes éditables dans l'admin : Contenu du site) ── */}
      <section className="bg-bgdark min-h-[90vh] flex items-center">
        <div className="container-main py-24 md:py-32 text-center">
          <p className="font-script text-accent text-4xl md:text-5xl mb-6">LojalyxIT</p>
          <h1 className="font-display text-title text-4xl md:text-6xl lg:text-7xl font-bold leading-tight mb-6">
            {hero.titre_ligne_1}
            <br />
            <span className="text-brand-green-light">{hero.titre_ligne_2}</span>
          </h1>
          <p className="text-textlight text-lg md:text-xl max-w-2xl mx-auto mb-10 font-light leading-relaxed">
            {hero.sous_titre}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/devis" className="btn-primary text-base">
              {hero.bouton_principal_texte} <ArrowRight size={18} />
            </Link>
            <Link href="/formations" className="btn-ghost text-base">
              {hero.bouton_secondaire_texte}
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

      {/* ── Services : Problème → Solution ── */}
      <section className="bg-gray-50 py-20 md:py-28">
        <div className="container-main">
          <div className="text-center mb-14">
            <h2 className="font-display text-textdark text-3xl md:text-4xl font-bold mb-4">
              Vos problèmes informatiques ont une solution.
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto font-light text-lg">
              Nous accompagnons les TPE, PME, ONG et administrations de Guinée avec des solutions
              fiables, sécurisées et adaptées à leur réalité.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {SERVICES_OFFRES.filter((s) => s.accueil).map((service, i) => (
              <Reveal key={service.slug} delay={(i % 3) * 100} className="h-full">
                <ServiceCard service={service} showTechnologies={false} />
              </Reveal>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link href="/services" className="btn-secondary inline-flex items-center gap-2">
              Voir tous nos services <ChevronRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      {/* ── Références fondateur ── */}
      <ReferencesSection />

      {/* ── Chiffres clés ── */}
      <section className="bg-bgdark py-20">
        <div className="container-main">
          <ChiffresCles />
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
