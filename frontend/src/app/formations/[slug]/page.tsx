import { notFound } from 'next/navigation'
import Link from 'next/link'
import { Clock, BarChart2, MonitorPlay, Calendar, Users, ArrowLeft } from 'lucide-react'
import { getFormation, getFormations } from '@/lib/api'
import { Badge } from '@/components/ui/Badge'
import { formatGNF, formatDate } from '@/lib/utils'
import type { Metadata } from 'next'

interface Props {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  const formations = await getFormations()
  return formations.map((f) => ({ slug: f.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const formation = await getFormation(slug)
  if (!formation) return { title: 'Formation introuvable' }
  return {
    title: formation.titre,
    description: `Formation ${formation.titre} — ${formation.duree_heures}h — ${formation.domaine} — Conakry, Guinée`,
  }
}

const NIVEAU_LABELS: Record<string, string> = {
  debutant: 'Débutant',
  intermediaire: 'Intermédiaire',
  avance: 'Avancé',
  tous: 'Tous niveaux',
}

const FORMAT_LABELS: Record<string, string> = {
  presentiel: 'Présentiel',
  en_ligne: 'En ligne',
  intra: 'Intra-entreprise',
}

const STATUT_LABELS: Record<string, { label: string; color: string }> = {
  ouverte: { label: 'Inscriptions ouvertes', color: 'green' },
  complete: { label: 'Complète', color: 'muted' },
  terminee: { label: 'Terminée', color: 'muted' },
  annulee: { label: 'Annulée', color: 'danger' },
}

export default async function FormationDetailPage({ params }: Props) {
  const { slug } = await params
  const formation = await getFormation(slug)
  if (!formation) notFound()

  const programmeLines = formation.programme.split('\n').filter(Boolean)
  const sessionsOuvertes = formation.sessions.filter((s) => s.statut === 'ouverte')

  return (
    <div className="bg-white min-h-screen">
      {/* Hero */}
      <section className="bg-bgdark py-14 md:py-16">
        <div className="container-main">
          <Link href="/formations" className="inline-flex items-center gap-2 text-muted hover:text-textlight text-sm mb-8 transition-colors">
            <ArrowLeft size={16} /> Retour au catalogue
          </Link>
          <div className="flex flex-wrap gap-3 mb-4">
            <Badge variant="gold">{formation.domaine}</Badge>
            <Badge variant="muted">{NIVEAU_LABELS[formation.niveau]}</Badge>
          </div>
          <h1 className="font-display text-title text-3xl md:text-5xl font-bold mb-6 max-w-3xl leading-tight">
            {formation.titre}
          </h1>
          <div className="flex flex-wrap gap-6 text-textlight text-sm">
            <span className="flex items-center gap-2">
              <Clock size={16} className="text-primary" /> {formation.duree_heures} heures
            </span>
            <span className="flex items-center gap-2">
              <BarChart2 size={16} className="text-primary" /> {NIVEAU_LABELS[formation.niveau]}
            </span>
            <span className="flex items-center gap-2">
              <MonitorPlay size={16} className="text-primary" /> Présentiel & En ligne
            </span>
          </div>
        </div>
      </section>

      {/* Contenu + Sidebar */}
      <section className="py-12 md:py-16">
        <div className="container-main">
          <div className="flex flex-col lg:flex-row gap-10">
            {/* Contenu principal */}
            <div className="flex-1 min-w-0">
              {/* Programme */}
              <h2 className="font-display text-textdark text-2xl font-bold mb-6">Programme</h2>
              <ul className="space-y-3 mb-10">
                {programmeLines.map((line, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <span className="w-6 h-6 rounded-full bg-primary/10 text-primary text-xs font-medium flex items-center justify-center shrink-0 mt-0.5">
                      {i + 1}
                    </span>
                    <span className="text-textdark font-light">{line}</span>
                  </li>
                ))}
              </ul>

              {/* Sessions disponibles */}
              {sessionsOuvertes.length > 0 && (
                <>
                  <h2 className="font-display text-textdark text-2xl font-bold mb-6">
                    Sessions disponibles
                  </h2>
                  <div className="space-y-4">
                    {sessionsOuvertes.map((session) => {
                      const statut = STATUT_LABELS[session.statut] ?? STATUT_LABELS.ouverte
                      return (
                        <div key={session.id} className="border border-gray-100 rounded-card p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                          <div className="flex flex-col gap-1">
                            <div className="flex items-center gap-2 flex-wrap">
                              <Badge variant={statut.color as 'green' | 'muted' | 'danger' | 'gold'}>
                                {statut.label}
                              </Badge>
                              <span className="text-muted text-sm">{FORMAT_LABELS[session.format]}</span>
                            </div>
                            <div className="flex items-center gap-4 text-sm text-textdark mt-1">
                              <span className="flex items-center gap-1.5">
                                <Calendar size={14} className="text-primary" />
                                {formatDate(session.date_debut)} → {formatDate(session.date_fin)}
                              </span>
                              <span className="flex items-center gap-1.5">
                                <Users size={14} className="text-primary" />
                                {session.places_restantes} place{session.places_restantes > 1 ? 's' : ''} restante{session.places_restantes > 1 ? 's' : ''}
                              </span>
                            </div>
                          </div>
                          <Link href={`/inscription?session=${session.id}`} className="btn-primary text-sm shrink-0">
                            S&apos;inscrire
                          </Link>
                        </div>
                      )
                    })}
                  </div>
                </>
              )}
            </div>

            {/* Sidebar tarif */}
            <aside className="lg:w-80 shrink-0">
              <div className="card border border-gray-100 p-6 lg:sticky lg:top-24">
                <p className="text-muted text-sm font-sans mb-2">Tarif de la formation</p>
                <p className="font-display text-primary text-2xl font-bold mb-1">
                  {formatGNF(formation.tarif_min_gnf)}
                </p>
                {formation.tarif_min_gnf !== formation.tarif_max_gnf && (
                  <p className="text-muted text-sm mb-4">jusqu&apos;à {formatGNF(formation.tarif_max_gnf)}</p>
                )}
                <p className="text-xs text-muted mb-6 font-light">
                  Tarif en Francs Guinéens (GNF). Paiement par virement, Mobile Money ou espèces.
                </p>
                {sessionsOuvertes.length > 0 ? (
                  <Link href={`/inscription?session=${sessionsOuvertes[0].id}`} className="btn-primary w-full text-center block">
                    S&apos;inscrire maintenant
                  </Link>
                ) : (
                  <Link href="/contact" className="btn-secondary w-full text-center block">
                    Demander une session
                  </Link>
                )}
                <Link href="/contact" className="btn-ghost w-full text-center block mt-3 text-sm">
                  Nous contacter
                </Link>

                <div className="mt-6 pt-6 border-t border-gray-100 space-y-2 text-sm text-textdark font-light">
                  <div className="flex justify-between">
                    <span className="text-muted">Durée</span>
                    <span>{formation.duree_heures}h</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted">Niveau</span>
                    <span>{NIVEAU_LABELS[formation.niveau]}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted">Domaine</span>
                    <span>{formation.domaine}</span>
                  </div>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </section>
    </div>
  )
}
