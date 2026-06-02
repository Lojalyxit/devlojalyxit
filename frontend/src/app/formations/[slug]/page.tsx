import { notFound } from 'next/navigation'
import Link from 'next/link'
import {
  Clock, BarChart2, Award, ArrowLeft, ArrowRight,
  CheckCircle, BookOpen, Calendar, Users,
} from 'lucide-react'
import { getFormation, getFormations } from '@/lib/api'
import { Badge } from '@/components/ui/Badge'
import { VideoPlayer } from '@/components/ui/VideoPlayer'
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
    title: `${formation.titre} | Centre de Formation LojalyxIT`,
    description: formation.description_longue
      ? formation.description_longue.slice(0, 155)
      : `Formation ${formation.titre} — ${formation.duree_heures}h — ${formation.domaine} — Conakry, Guinée`,
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

const STATUT_LABELS: Record<string, { label: string; color: 'green' | 'muted' | 'danger' | 'gold' }> = {
  ouverte: { label: 'Inscriptions ouvertes', color: 'green' },
  complete: { label: 'Complète', color: 'muted' },
  terminee: { label: 'Terminée', color: 'muted' },
  annulee: { label: 'Annulée', color: 'danger' },
}

export default async function FormationDetailPage({ params }: Props) {
  const { slug } = await params
  const formation = await getFormation(slug)
  if (!formation) notFound()

  const sessionsOuvertes = formation.sessions.filter((s) => s.statut === 'ouverte')
  const hasModules = formation.modules && formation.modules.length > 0

  return (
    <div className="bg-bgdark min-h-screen">

      {/* ── Hero ─────────────────────────────────────────────────────────── */}
      <section className="bg-bgdark border-b border-white/10 py-14 md:py-16">
        <div className="container-main">
          <Link
            href="/formations"
            className="inline-flex items-center gap-2 text-muted hover:text-textlight text-sm mb-8 transition-colors font-sans"
          >
            <ArrowLeft size={16} /> Retour au catalogue
          </Link>

          <div className="flex flex-wrap gap-3 mb-5">
            <Badge variant="gold">{formation.domaine}</Badge>
            <Badge variant="muted">{NIVEAU_LABELS[formation.niveau]}</Badge>
          </div>

          <h1 className="font-display text-title text-3xl md:text-5xl font-bold mb-5 max-w-3xl leading-tight">
            {formation.titre}
          </h1>

          {formation.certification && (
            <div className="flex items-center gap-2 mb-5">
              <Award size={16} className="text-accent shrink-0" />
              <span className="text-accent text-sm font-sans font-light">
                Certification visée : <strong className="font-medium">{formation.certification}</strong>
              </span>
            </div>
          )}

          <div className="flex flex-wrap gap-6 text-textlight text-sm mb-8">
            <span className="flex items-center gap-2">
              <Clock size={15} className="text-primary" />
              {formation.duree_heures} heures de formation
            </span>
            <span className="flex items-center gap-2">
              <BarChart2 size={15} className="text-primary" />
              {NIVEAU_LABELS[formation.niveau]}
            </span>
            <span className="flex items-center gap-2">
              <BookOpen size={15} className="text-primary" />
              {hasModules ? `${formation.modules.length} modules` : 'Présentiel & En ligne'}
            </span>
          </div>

          {/* Tarif + CTA visible en hero sur mobile */}
          <div className="flex flex-col sm:flex-row sm:items-center gap-4 md:hidden">
            <div>
              <span className="text-primary font-display text-xl font-bold">
                {formatGNF(formation.tarif_min_gnf)}
              </span>
              {formation.tarif_min_gnf !== formation.tarif_max_gnf && (
                <span className="text-muted text-sm ml-2">→ {formatGNF(formation.tarif_max_gnf)}</span>
              )}
            </div>
            {sessionsOuvertes.length > 0 ? (
              <Link href={`/inscription?session=${sessionsOuvertes[0].id}`} className="btn-primary text-sm shrink-0">
                S&apos;inscrire maintenant
              </Link>
            ) : (
              <Link href="/contact" className="btn-secondary text-sm shrink-0">
                Demander une session
              </Link>
            )}
          </div>
        </div>
      </section>

      {/* ── Contenu + Sidebar ─────────────────────────────────────────────── */}
      <section className="py-12 md:py-16">
        <div className="container-main">
          <div className="flex flex-col lg:flex-row gap-12">

            {/* ── Colonne principale ──────────────────────────────────────── */}
            <div className="flex-1 min-w-0">

              {/* Description */}
              {formation.description_longue && (
                <div className="mb-12">
                  <h2 className="font-display text-title text-2xl font-bold mb-4">
                    À propos de cette formation
                  </h2>
                  <p className="text-textlight font-light leading-relaxed text-base">
                    {formation.description_longue}
                  </p>
                </div>
              )}

              {/* Modules détaillés */}
              {hasModules && (
                <div className="mb-12">
                  <h2 className="font-display text-title text-2xl font-bold mb-6">
                    Programme détaillé
                  </h2>
                  <div className="space-y-5">
                    {formation.modules.map((mod) => {
                      const objectifsLines = mod.objectifs.split('\n').filter(Boolean)
                      const contenuLines = mod.contenu.split('\n').filter(Boolean)

                      return (
                        <div
                          key={mod.id}
                          className="bg-bgdeep border border-white/10 rounded-card overflow-hidden"
                        >
                          {/* En-tête module */}
                          <div className="flex items-center justify-between gap-4 px-6 py-4 border-b border-white/10">
                            <div className="flex items-center gap-3">
                              <span className="w-8 h-8 rounded-full bg-primary/20 text-primary text-xs font-medium font-sans flex items-center justify-center shrink-0">
                                {String(mod.ordre).padStart(2, '0')}
                              </span>
                              <h3 className="font-sans font-semibold text-title text-base leading-snug">
                                {mod.titre}
                              </h3>
                            </div>
                            <span className="text-muted text-sm font-sans shrink-0 flex items-center gap-1">
                              <Clock size={13} />
                              {mod.duree_heures}h
                            </span>
                          </div>

                          {/* Corps du module */}
                          <div className="p-6 space-y-5">
                            {/* Objectifs */}
                            {objectifsLines.length > 0 && (
                              <div>
                                <p className="text-accent text-xs font-sans font-medium uppercase tracking-wider mb-2">
                                  Objectifs
                                </p>
                                <ul className="space-y-1.5">
                                  {objectifsLines.map((line, i) => (
                                    <li key={i} className="flex items-start gap-2">
                                      <CheckCircle size={14} className="text-primary mt-0.5 shrink-0" />
                                      <span className="text-textlight font-light text-sm">{line}</span>
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            )}

                            {/* Contenu */}
                            {contenuLines.length > 0 && (
                              <div>
                                <p className="text-accent text-xs font-sans font-medium uppercase tracking-wider mb-2">
                                  Contenu
                                </p>
                                <ul className="space-y-1.5">
                                  {contenuLines.map((line, i) => (
                                    <li key={i} className="flex items-start gap-2">
                                      <span className="text-primary mt-1 shrink-0 text-xs">▸</span>
                                      <span className="text-textlight font-light text-sm">{line}</span>
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            )}

                            {/* Lecteur vidéo */}
                            <VideoPlayer
                              videoUrl={mod.video_url}
                              disponible={mod.video_disponible}
                              titre={mod.titre}
                            />
                          </div>
                        </div>
                      )
                    })}
                  </div>
                </div>
              )}

              {/* Fallback : programme texte si pas de modules */}
              {!hasModules && formation.programme && (
                <div className="mb-12">
                  <h2 className="font-display text-title text-2xl font-bold mb-6">Programme</h2>
                  <ul className="space-y-3">
                    {formation.programme.split('\n').filter(Boolean).map((line, i) => (
                      <li key={i} className="flex items-start gap-3">
                        <span className="w-6 h-6 rounded-full bg-primary/20 text-primary text-xs font-medium flex items-center justify-center shrink-0 mt-0.5">
                          {i + 1}
                        </span>
                        <span className="text-textlight font-light">{line}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Sessions disponibles */}
              {sessionsOuvertes.length > 0 && (
                <div>
                  <h2 className="font-display text-title text-2xl font-bold mb-6">
                    Sessions disponibles
                  </h2>
                  <div className="space-y-4">
                    {sessionsOuvertes.map((session) => {
                      const statut = STATUT_LABELS[session.statut] ?? STATUT_LABELS.ouverte
                      return (
                        <div
                          key={session.id}
                          className="bg-bgdeep border border-white/10 rounded-card p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                        >
                          <div className="flex flex-col gap-1">
                            <div className="flex items-center gap-2 flex-wrap">
                              <Badge variant={statut.color}>{statut.label}</Badge>
                              <span className="text-muted text-sm font-sans">{FORMAT_LABELS[session.format]}</span>
                            </div>
                            <div className="flex items-center gap-4 text-sm text-textlight mt-1 font-sans">
                              <span className="flex items-center gap-1.5">
                                <Calendar size={13} className="text-primary" />
                                {formatDate(session.date_debut)} → {formatDate(session.date_fin)}
                              </span>
                              <span className="flex items-center gap-1.5">
                                <Users size={13} className="text-primary" />
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
                </div>
              )}
            </div>

            {/* ── Sidebar sticky ──────────────────────────────────────────── */}
            <aside className="hidden md:block lg:w-80 shrink-0">
              <div className="bg-bgdeep border border-white/10 rounded-card p-6 lg:sticky lg:top-24">
                <p className="text-muted text-xs font-sans uppercase tracking-wider mb-3">
                  Tarif de la formation
                </p>
                <p className="font-display text-primary text-3xl font-bold mb-1">
                  {formatGNF(formation.tarif_min_gnf)}
                </p>
                {formation.tarif_min_gnf !== formation.tarif_max_gnf && (
                  <p className="text-muted text-sm mb-1 font-sans">
                    jusqu&apos;à {formatGNF(formation.tarif_max_gnf)}
                  </p>
                )}
                <p className="text-muted text-xs mb-6 font-light font-sans">
                  En Francs Guinéens. Paiement par virement, Mobile Money ou espèces.
                </p>

                {sessionsOuvertes.length > 0 ? (
                  <Link
                    href={`/inscription?session=${sessionsOuvertes[0].id}`}
                    className="btn-primary w-full text-center block mb-3"
                  >
                    S&apos;inscrire maintenant
                  </Link>
                ) : (
                  <Link href="/contact" className="btn-secondary w-full text-center block mb-3">
                    Demander une session
                  </Link>
                )}
                <Link href="/contact" className="btn-ghost w-full text-center block text-sm">
                  Nous contacter
                </Link>

                <div className="mt-6 pt-6 border-t border-white/10 space-y-3 text-sm font-sans">
                  <div className="flex justify-between">
                    <span className="text-muted">Durée</span>
                    <span className="text-textlight">{formation.duree_heures}h</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted">Niveau</span>
                    <span className="text-textlight">{NIVEAU_LABELS[formation.niveau]}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted">Domaine</span>
                    <span className="text-textlight">{formation.domaine}</span>
                  </div>
                  {hasModules && (
                    <div className="flex justify-between">
                      <span className="text-muted">Modules</span>
                      <span className="text-textlight">{formation.modules.length}</span>
                    </div>
                  )}
                  {formation.certification && (
                    <div className="pt-3 border-t border-white/10">
                      <p className="text-muted text-xs mb-1">Certification visée</p>
                      <p className="text-accent text-xs font-light leading-snug">{formation.certification}</p>
                    </div>
                  )}
                </div>
              </div>
            </aside>

          </div>
        </div>
      </section>

      {/* ── CTA bas de page ──────────────────────────────────────────────── */}
      <section className="bg-primary py-14">
        <div className="container-main text-center">
          <h2 className="font-display text-white text-2xl md:text-3xl font-bold mb-3">
            Prêt à vous certifier ?
          </h2>
          <p className="text-white/80 font-light mb-8 max-w-lg mx-auto">
            Inscrivez-vous à une session ou contactez-nous pour une formation intra-entreprise sur mesure.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            {sessionsOuvertes.length > 0 ? (
              <Link
                href={`/inscription?session=${sessionsOuvertes[0].id}`}
                className="inline-flex items-center justify-center gap-2 bg-white text-primary px-8 py-3 rounded-btn font-medium hover:bg-title transition-colors duration-200"
              >
                S&apos;inscrire maintenant <ArrowRight size={16} />
              </Link>
            ) : null}
            <Link
              href="/contact"
              className="inline-flex items-center justify-center gap-2 border border-white/50 text-white px-8 py-3 rounded-btn font-medium hover:border-white transition-colors duration-200"
            >
              Contacter notre équipe
            </Link>
          </div>
        </div>
      </section>

    </div>
  )
}
