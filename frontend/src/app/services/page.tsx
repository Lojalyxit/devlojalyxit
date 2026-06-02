import Link from 'next/link'
import { CheckCircle, ArrowRight } from 'lucide-react'
import { getServices } from '@/lib/api'
import { ServiceIcon } from '@/components/ui/ServiceIcon'
import { ServiceImage } from '@/components/ui/ServiceImage'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Nos Services',
  description: 'Découvrez les 7 piliers de service de LojalyxIT : cloud, cybersécurité, développement, réseau, maintenance, équipements et formation à Conakry.',
}

const SERVICE_IMAGES: Record<string, { src: string; alt: string }> = {
  'serveurs-cloud': {
    src: '/images/services/01-serveurs-cloud.webp',
    alt: 'Salle serveurs et infrastructure cloud',
  },
  'developpement-logiciel': {
    src: '/images/services/02-developpement-logiciel.webp',
    alt: "Développement d'applications sur mesure",
  },
  'reseau-infrastructure': {
    src: '/images/services/03-infrastructure-reseau.webp',
    alt: 'Câblage réseau et fibre optique',
  },
  'marketing-digital': {
    src: '/images/services/04-marketing-digital.webp',
    alt: 'Marketing digital et analyse de performance',
  },
  'maintenance-informatique': {
    src: '/images/services/05-maintenance-support.webp',
    alt: 'Support technique et helpdesk',
  },
  'vente-equipements': {
    src: '/images/services/06-vente-equipements.webp',
    alt: "Vente d'équipements informatiques",
  },
  'centre-formation': {
    src: '/images/services/07-formation-certifiante.webp',
    alt: 'Formation certifiante en salle',
  },
}

const SERVICE_DETAILS: Record<string, string[]> = {
  'serveurs-cloud': [
    'Migration vers le cloud (AWS, Azure, GCP)',
    'Virtualisation VMware / Hyper-V',
    'Sauvegarde et plan de reprise d\'activité (PRA)',
    'Monitoring et supervision 24/7',
    'Optimisation des coûts cloud',
  ],
  'developpement-logiciel': [
    'Applications web sur mesure (React, Next.js, Django)',
    'Applications mobiles (React Native)',
    'API et intégrations systèmes',
    'Automatisation de processus métier',
    'Maintenance évolutive et correctrice',
  ],
  'reseau-infrastructure': [
    'Audit et conception réseau (LAN, WAN, Wi-Fi)',
    'Déploiement d\'équipements Cisco',
    'Mise en place de firewalls et VPN',
    'QoS et optimisation de bande passante',
    'Supervision et maintenance réseau',
  ],
  'marketing-digital': [
    'Référencement naturel (SEO) et local',
    'Gestion des réseaux sociaux',
    'Campagnes publicitaires Meta Ads / Google Ads',
    'Création de contenu adapté au marché guinéen',
    'Analyse de données et reporting mensuel',
  ],
  'maintenance-informatique': [
    'Contrats de maintenance préventive et corrective',
    'Support utilisateurs et helpdesk',
    'Infogérance de parc informatique',
    'Gestion des mises à jour et sécurité',
    'SLA garantis selon priorité du ticket',
  ],
  'vente-equipements': [
    'Postes de travail et serveurs professionnels',
    'Équipements réseau Cisco (switches, routeurs, AP)',
    'Onduleurs et protections électriques',
    'Accessoires bureautiques et consommables',
    'Livraison et installation à Conakry',
  ],
  'centre-formation': [
    'CCNA, CCNP — certifications Cisco officielles',
    'CEH v13 — Certified Ethical Hacker',
    'DevOps, Cloud AWS, Python',
    'Formats présentiel, en ligne, intra-entreprise',
    'Formateurs certifiés et expérimentés',
  ],
}

export default async function ServicesPage() {
  const services = await getServices()

  return (
    <>
      {/* Hero court */}
      <section className="bg-bgdark py-16 md:py-20">
        <div className="container-main text-center">
          <h1 className="font-display text-title text-4xl md:text-5xl font-bold mb-4">
            Nos Services
          </h1>
          <p className="text-textlight max-w-xl mx-auto font-light text-lg">
            7 piliers de compétences pour accompagner la transformation numérique des entreprises
            guinéennes et ouest-africaines.
          </p>
        </div>
      </section>

      {/* Services alternés */}
      {services.map((service, index) => {
        const details = SERVICE_DETAILS[service.slug] ?? []
        const image = SERVICE_IMAGES[service.slug]
        const isDark = index % 2 === 1

        return (
          <section
            key={service.slug}
            id={service.slug}
            className={isDark ? 'bg-bgdeep text-textlight py-16 md:py-20' : 'bg-white py-16 md:py-20'}
          >
            <div className="container-main">
              <div className="flex flex-col md:flex-row gap-12 items-center">
                {/* Texte — second sur mobile, gauche sur desktop */}
                <div className="flex-1 order-last md:order-first">
                  <div className="flex items-center gap-3 mb-4">
                    <ServiceIcon
                      name={service.icone}
                      size={28}
                      className="text-primary shrink-0"
                    />
                    <span className="text-muted text-sm font-sans">{String(index + 1).padStart(2, '0')}</span>
                  </div>
                  <h2 className={`font-display text-3xl font-bold mb-4 ${isDark ? 'text-title' : 'text-textdark'}`}>
                    {service.titre}
                  </h2>
                  <p className={`font-light text-base leading-relaxed mb-6 ${isDark ? 'text-textlight' : 'text-textdark'}`}>
                    {service.description}
                  </p>
                  {details.length > 0 && (
                    <ul className="space-y-2 mb-8">
                      {details.map((item) => (
                        <li key={item} className="flex items-start gap-2">
                          <CheckCircle size={16} className="text-primary mt-0.5 shrink-0" />
                          <span className={`text-sm font-light ${isDark ? 'text-textlight' : 'text-textdark'}`}>
                            {item}
                          </span>
                        </li>
                      ))}
                    </ul>
                  )}
                  <Link href="/devis" className="btn-primary inline-flex items-center gap-2">
                    Demander un devis <ArrowRight size={16} />
                  </Link>
                </div>

                {/* Image — premier sur mobile, droite sur desktop */}
                <div className="flex-1 w-full flex justify-center order-first md:order-last">
                  {image ? (
                    <ServiceImage
                      src={image.src}
                      alt={image.alt}
                      iconName={service.icone}
                      priority={index === 0}
                    />
                  ) : (
                    <div className={`w-full max-w-sm aspect-square rounded-card flex items-center justify-center bg-bgdeep`}>
                      <ServiceIcon name={service.icone} size={96} className="text-primary opacity-30" />
                    </div>
                  )}
                </div>
              </div>
            </div>
          </section>
        )
      })}

      {/* CTA final */}
      <section className="bg-primary py-16">
        <div className="container-main text-center">
          <h2 className="font-display text-white text-3xl font-bold mb-4">
            Vous avez un projet IT ?
          </h2>
          <p className="text-white/80 mb-8 font-light max-w-lg mx-auto">
            Décrivez vos besoins en quelques minutes. Notre équipe vous répond sous 24h.
          </p>
          <Link href="/devis" className="inline-flex items-center gap-2 bg-white text-primary px-8 py-4 rounded-btn font-medium hover:bg-title transition-colors duration-200">
            Lancer mon projet <ArrowRight size={18} />
          </Link>
        </div>
      </section>
    </>
  )
}
