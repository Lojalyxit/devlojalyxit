'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { GraduationCap, Calendar, Clock } from 'lucide-react'
import { clientApi } from '@/lib/client-api'
import { Badge } from '@/components/ui/Badge'
import { formatDate } from '@/lib/utils'
import type { Inscription } from '@/types'

const STATUT_BADGE: Record<Inscription['statut'], 'muted' | 'green' | 'gold' | 'danger'> = {
  en_attente: 'gold', confirmee: 'green', payee: 'green', annulee: 'danger',
}

const STATUT_LABEL: Record<Inscription['statut'], string> = {
  en_attente: 'En attente', confirmee: 'Confirmée', payee: 'Payée', annulee: 'Annulée',
}

const FORMAT_LABEL: Record<string, string> = {
  presentiel: 'Présentiel', en_ligne: 'En ligne', intra: 'Intra',
}

export default function MesFormationsPage() {
  const [inscriptions, setInscriptions] = useState<Inscription[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    clientApi.inscriptions.list().then((d) => setInscriptions(d.results)).finally(() => setLoading(false))
  }, [])

  return (
    <div className="p-6 md:p-8">
      <div className="flex items-center justify-between mb-6">
        <h1 className="font-display text-textdark text-2xl font-bold">Mes formations</h1>
        <Link href="/formations" className="btn-secondary text-sm inline-flex items-center gap-1.5">
          <GraduationCap size={15} /> Catalogue
        </Link>
      </div>

      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[1,2].map(i => <div key={i} className="card border border-gray-200 p-5 h-32 animate-pulse bg-gray-100" />)}
        </div>
      ) : inscriptions.length === 0 ? (
        <div className="card border border-gray-200 p-10 text-center">
          <GraduationCap size={36} className="text-muted mx-auto mb-3" />
          <p className="text-muted font-light mb-5">Vous n&apos;êtes inscrit à aucune formation.</p>
          <Link href="/formations" className="btn-primary inline-flex">Découvrir les formations</Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {inscriptions.map((ins) => {
            const session = ins.session_info
            return (
              <div key={ins.id} className="card border border-gray-200 p-5">
                <div className="flex items-start justify-between gap-2 mb-3">
                  <h3 className="font-sans font-semibold text-textdark text-sm leading-snug">
                    {session?.formation_titre || `Session #${ins.session}`}
                  </h3>
                  <Badge variant={STATUT_BADGE[ins.statut]}>{STATUT_LABEL[ins.statut]}</Badge>
                </div>
                {session && (
                  <div className="space-y-1.5 text-xs text-muted">
                    <p className="flex items-center gap-1.5">
                      <Calendar size={12} className="text-primary" />
                      {formatDate(session.date_debut)} → {formatDate(session.date_fin)}
                    </p>
                    <p className="flex items-center gap-1.5">
                      <Clock size={12} className="text-primary" />
                      {FORMAT_LABEL[session.format]}
                    </p>
                  </div>
                )}
                <div className="mt-3 pt-3 border-t border-gray-100 flex items-center gap-3 text-xs text-muted">
                  <span className="capitalize">{ins.formule}</span>
                  <span>·</span>
                  <span>{ins.mode_paiement.replace('_', ' ')}</span>
                  <span>·</span>
                  <span>Inscrit le {formatDate(ins.created_at)}</span>
                </div>
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}
