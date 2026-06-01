import { Award, Users, BookOpen, Cpu } from 'lucide-react'
import Link from 'next/link'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'À propos',
  description: 'Découvrez LojalyxIT SARL : notre histoire, nos valeurs, le profil du fondateur et nos certifications professionnelles.',
}

const VALEURS = [
  {
    icon: Award,
    titre: 'Excellence',
    texte: 'Nous visons l\'excellence dans chaque projet, avec des solutions robustes et des formations de haut niveau.',
  },
  {
    icon: Users,
    titre: 'Proximité',
    texte: 'Partenaire de confiance, nous accompagnons nos clients sur le long terme avec un support réactif.',
  },
  {
    icon: BookOpen,
    titre: 'Formation',
    texte: 'Nous croyons que la montée en compétences est le meilleur investissement pour les entreprises africaines.',
  },
  {
    icon: Cpu,
    titre: 'Innovation',
    texte: 'Nous intégrons les technologies émergentes pour préparer nos clients aux défis de demain.',
  },
]

const CERTIFICATIONS = [
  'Cisco CCNA', 'Cisco CCNP Enterprise', 'CEH v13 (EC-Council)',
  'CompTIA Security+', 'AWS Solutions Architect', 'Microsoft Azure Fundamentals',
  'ITIL 4 Foundation', 'Prince2 Practitioner', 'Google Analytics', 'HubSpot Marketing',
  'Python Institute PCEP',
]

export default function AProposPage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-bgdark py-16 md:py-20">
        <div className="container-main text-center">
          <p className="font-script text-accent text-3xl mb-3">Notre histoire</p>
          <h1 className="font-display text-title text-4xl md:text-5xl font-bold mb-4">
            À propos de LojalyxIT
          </h1>
          <p className="text-textlight max-w-xl mx-auto font-light text-lg">
            Une entreprise guinéenne née d&apos;une passion pour la technologie et l&apos;enseignement,
            au service du développement numérique de l&apos;Afrique de l&apos;Ouest.
          </p>
        </div>
      </section>

      {/* Histoire */}
      <section className="bg-white py-16 md:py-20">
        <div className="container-main">
          <div className="max-w-3xl mx-auto">
            <h2 className="font-display text-textdark text-3xl font-bold mb-6">Notre mission</h2>
            <p className="text-textdark font-light text-lg leading-relaxed mb-6">
              LojalyxIT SARL est une entreprise de solutions IT fondée à Conakry, République de Guinée.
              Nous combinons expertise technique de haut niveau et pédagogie éprouvée pour accompagner
              les entreprises, administrations et professionnels dans leur transformation numérique.
            </p>
            <p className="text-textdark font-light leading-relaxed mb-6">
              Avec plus de 12 ans d&apos;expérience, 11 certifications professionnelles et 7 années
              d&apos;enseignement, notre fondateur a bâti une équipe capable de répondre aux défis IT
              les plus complexes du marché guinéen et ouest-africain.
            </p>
            <p className="text-textdark font-light leading-relaxed">
              Notre Centre de Formation Certifiant propose des programmes reconnus internationalement,
              dispensés par des formateurs certifiés, pour développer les talents IT locaux.
            </p>
          </div>
        </div>
      </section>

      {/* Chiffres */}
      <section className="bg-bgdeep py-16">
        <div className="container-main">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              { value: '12+', label: 'Années d\'expérience' },
              { value: '11', label: 'Certifications' },
              { value: '7', label: 'Ans d\'enseignement' },
              { value: '7', label: 'Domaines de service' },
            ].map(({ value, label }) => (
              <div key={label}>
                <p className="font-display text-accent text-4xl md:text-5xl font-bold mb-2">{value}</p>
                <p className="text-textlight text-sm font-light">{label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Valeurs */}
      <section className="bg-white py-16 md:py-20">
        <div className="container-main">
          <h2 className="font-display text-textdark text-3xl font-bold text-center mb-12">
            Nos valeurs
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {VALEURS.map(({ icon: Icon, titre, texte }) => (
              <div key={titre} className="text-center">
                <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                  <Icon size={24} className="text-primary" />
                </div>
                <h3 className="font-sans font-semibold text-textdark text-lg mb-2">{titre}</h3>
                <p className="text-muted text-sm font-light leading-relaxed">{texte}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Certifications */}
      <section className="bg-gray-50 py-16 md:py-20">
        <div className="container-main">
          <h2 className="font-display text-textdark text-3xl font-bold text-center mb-10">
            Certifications professionnelles
          </h2>
          <div className="flex flex-wrap justify-center gap-3">
            {CERTIFICATIONS.map((cert) => (
              <span
                key={cert}
                className="bg-white border border-gray-200 text-textdark text-sm font-sans font-medium px-4 py-2 rounded-btn hover:border-primary hover:text-primary transition-colors duration-150"
              >
                {cert}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-primary py-14">
        <div className="container-main text-center">
          <h2 className="font-display text-white text-3xl font-bold mb-4">
            Travaillons ensemble
          </h2>
          <p className="text-white/80 mb-8 font-light max-w-md mx-auto">
            Vous avez un projet IT ou vous souhaitez former vos équipes ? Contactez-nous.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/devis" className="inline-flex items-center justify-center gap-2 bg-white text-primary px-8 py-4 rounded-btn font-medium hover:bg-title transition-colors duration-200">
              Demander un devis
            </Link>
            <Link href="/formations" className="inline-flex items-center justify-center gap-2 border border-white text-white px-8 py-4 rounded-btn font-medium hover:bg-white/10 transition-colors duration-200">
              Voir nos formations
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
