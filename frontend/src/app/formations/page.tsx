import Link from 'next/link'
import { Clock, BarChart2, ArrowRight } from 'lucide-react'
import { getFormations } from '@/lib/api'
import { Badge } from '@/components/ui/Badge'
import { formatGNF } from '@/lib/utils'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Centre de Formation Certifiant',
  description: 'Formations certifiantes à Conakry : CCNA, CCNP, CEH v13, DevOps, Python, Windows Server. Tarifs en GNF. Formats présentiel, en ligne et intra-entreprise.',
}

const NIVEAU_LABELS: Record<string, string> = {
  debutant: 'Débutant',
  intermediaire: 'Intermédiaire',
  avance: 'Avancé',
  tous: 'Tous niveaux',
}

const FORMULES = [
  {
    name: 'Individuel',
    description: 'Idéal pour les professionnels souhaitant se former ou se certifier à titre personnel.',
    inclus: ['Accès complet à la formation', 'Support formateur', 'Attestation de formation', 'Accès aux supports'],
    highlight: false,
  },
  {
    name: 'Intra-entreprise',
    description: 'Formation organisée dans vos locaux ou en visio pour vos équipes, sur mesure.',
    inclus: ['Programme adapté à votre contexte', 'Formateur dédié', 'Certificats individuels', 'Rapport de formation', 'Flexibilité des dates'],
    highlight: true,
  },
  {
    name: 'Pack Entreprise',
    description: 'Accès à plusieurs formations pour former plusieurs collaborateurs avec tarifs dégressifs.',
    inclus: ['5 formations ou plus', 'Tableau de bord suivi RH', 'Facturation mensuelle', 'Account manager dédié'],
    highlight: false,
  },
]

export default async function FormationsPage() {
  const formations = await getFormations()

  return (
    <>
      {/* Hero */}
      <section className="bg-bgdark py-16 md:py-20">
        <div className="container-main text-center">
          <p className="font-script text-accent text-3xl mb-3">Centre de Formation</p>
          <h1 className="font-display text-title text-4xl md:text-5xl font-bold mb-4">
            Formations Certifiantes
          </h1>
          <p className="text-textlight max-w-xl mx-auto font-light text-lg">
            Développez vos compétences IT avec des formateurs certifiés. Certifications Cisco,
            cybersécurité, cloud et développement logiciel.
          </p>
        </div>
      </section>

      {/* Grille formations */}
      <section className="bg-white py-16 md:py-20">
        <div className="container-main">
          <h2 className="font-display text-textdark text-3xl font-bold mb-10 text-center">
            Catalogue des formations
          </h2>

          {formations.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {formations.map((f) => (
                <div key={f.slug} className="card border border-gray-100 p-6 flex flex-col hover:shadow-md transition-shadow duration-200">
                  <div className="flex items-start justify-between gap-2 mb-3">
                    <Badge variant="gold">{f.domaine}</Badge>
                    <Badge variant="muted">{NIVEAU_LABELS[f.niveau]}</Badge>
                  </div>
                  <h3 className="font-sans font-semibold text-textdark text-base mb-3 leading-snug flex-1">
                    {f.titre}
                  </h3>
                  <div className="flex items-center gap-4 text-muted text-sm mb-4">
                    <span className="flex items-center gap-1">
                      <Clock size={14} /> {f.duree_heures}h
                    </span>
                    <span className="flex items-center gap-1">
                      <BarChart2 size={14} /> {NIVEAU_LABELS[f.niveau]}
                    </span>
                  </div>
                  <p className="text-primary font-medium text-sm mb-4">
                    {formatGNF(f.tarif_min_gnf)}
                    {f.tarif_min_gnf !== f.tarif_max_gnf && (
                      <> — {formatGNF(f.tarif_max_gnf)}</>
                    )}
                  </p>
                  <Link
                    href={`/formations/${f.slug}`}
                    className="btn-primary text-sm inline-flex items-center gap-1 mt-auto"
                  >
                    Voir les détails <ArrowRight size={14} />
                  </Link>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-center text-muted py-12">Catalogue en cours de chargement…</p>
          )}
        </div>
      </section>

      {/* 3 formules */}
      <section className="bg-gray-50 py-16 md:py-20">
        <div className="container-main">
          <div className="text-center mb-12">
            <h2 className="font-display text-textdark text-3xl font-bold mb-3">
              3 formules pour tous les besoins
            </h2>
            <p className="text-muted font-light max-w-lg mx-auto">
              Choisissez la formule adaptée à votre situation, du professionnel individuel
              aux grandes entreprises.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {FORMULES.map(({ name, description, inclus, highlight }) => (
              <div
                key={name}
                className={`rounded-card p-8 flex flex-col ${
                  highlight
                    ? 'bg-bgdark text-textlight border-2 border-accent'
                    : 'bg-white border border-gray-200'
                }`}
              >
                {highlight && (
                  <span className="badge-gold text-xs self-start mb-4">Recommandé</span>
                )}
                <h3 className={`font-sans font-semibold text-xl mb-3 ${highlight ? 'text-title' : 'text-textdark'}`}>
                  {name}
                </h3>
                <p className={`text-sm font-light mb-6 ${highlight ? 'text-textlight' : 'text-muted'}`}>
                  {description}
                </p>
                <ul className="space-y-2 flex-1">
                  {inclus.map((item) => (
                    <li key={item} className="flex items-start gap-2 text-sm">
                      <span className="text-primary mt-0.5">✓</span>
                      <span className={highlight ? 'text-textlight' : 'text-textdark'}>{item}</span>
                    </li>
                  ))}
                </ul>
                <Link
                  href="/contact"
                  className={`mt-8 text-center py-3 rounded-btn text-sm font-medium transition-colors duration-200 ${
                    highlight
                      ? 'bg-accent text-bgdark hover:bg-accent/90'
                      : 'border border-primary text-primary hover:bg-primary hover:text-white'
                  }`}
                >
                  Nous contacter
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
