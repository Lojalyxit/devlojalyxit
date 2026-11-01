import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import type { Metadata } from 'next'
import { SERVICES_OFFRES } from '@/data/services'
import { ServiceCard } from '@/components/sections/ServiceCard'
import { Reveal } from '@/components/ui/Reveal'
import { WhatsAppLink } from '@/components/ui/WhatsAppLink'
import { WhatsAppIcon } from '@/components/ui/WhatsAppIcon'

export const metadata: Metadata = {
  title: 'Nos Services',
  description:
    'Vos problèmes informatiques ont une solution : maintenance, réseaux, cybersécurité, cloud, développement logiciel et automatisation pour les TPE, PME, ONG et administrations de Guinée.',
}

export default function ServicesPage() {
  return (
    <>
      {/* Accroche */}
      <section className="bg-bgdark py-16 md:py-24">
        <div className="container-main text-center">
          <p className="font-script text-accent text-3xl md:text-4xl mb-4">Nos services</p>
          <h1 className="font-display text-title text-4xl md:text-5xl lg:text-6xl font-bold mb-6 max-w-4xl mx-auto leading-tight">
            Vos problèmes informatiques ont une solution.
          </h1>
          <p className="text-textlight max-w-2xl mx-auto font-light text-lg md:text-xl leading-relaxed">
            Nous accompagnons les TPE, PME, ONG et administrations de Guinée avec des solutions fiables,
            sécurisées et adaptées à leur réalité.
          </p>
        </div>
      </section>

      {/* Cartes Problème → Solution */}
      <section className="bg-gray-50 py-16 md:py-24">
        <div className="container-main">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {SERVICES_OFFRES.map((service, i) => (
              <Reveal key={service.slug} delay={(i % 3) * 100} className="h-full">
                <ServiceCard service={service} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Bande d'appel à l'action */}
      <section className="bg-primary py-16 md:py-20">
        <div className="container-main text-center">
          <h2 className="font-display text-white text-3xl md:text-4xl font-bold mb-4 max-w-3xl mx-auto">
            Un problème informatique que vous ne voyez pas ici&nbsp;? Parlons-en.
          </h2>
          <p className="text-white/85 mb-8 font-light max-w-lg mx-auto">
            Décrivez votre situation : nous vous répondons sous 24h avec une proposition adaptée.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/contact?sujet=autre"
              className="inline-flex items-center justify-center gap-2 bg-white text-primary px-8 py-4 rounded-btn font-medium hover:bg-title transition-colors duration-200"
            >
              Demander un devis <ArrowRight size={18} />
            </Link>
            <WhatsAppLink
              contexte="page services : bande CTA"
              className="inline-flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#1EBE5A] text-white px-8 py-4 rounded-btn font-medium transition-colors duration-200"
            >
              <WhatsAppIcon size={20} /> Écrire sur WhatsApp
            </WhatsAppLink>
          </div>
        </div>
      </section>
    </>
  )
}
