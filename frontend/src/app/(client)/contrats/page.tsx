'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { FileText } from 'lucide-react'
import { clientApi } from '@/lib/client-api'
import { Badge } from '@/components/ui/Badge'
import { formatDate, formatGNF } from '@/lib/utils'
import type { Contrat } from '@/types'

const STATUT_BADGE: Record<Contrat['statut'], 'green' | 'muted' | 'danger'> = {
  actif: 'green', suspendu: 'gold' as never, termine: 'muted',
}

const FORMULE_LABEL: Record<string, string> = {
  starter: 'Starter', pro: 'Pro', premium: 'Premium',
}

export default function ContratsPage() {
  const [contrats, setContrats] = useState<Contrat[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    clientApi.contrats.list().then((d) => setContrats(d.results)).finally(() => setLoading(false))
  }, [])

  return (
    <div className="p-6 md:p-8">
      <h1 className="font-display text-textdark text-2xl font-bold mb-6">Mes contrats</h1>

      {loading ? (
        <div className="space-y-4">
          {[1,2].map(i => <div key={i} className="card border border-gray-200 p-5 h-24 animate-pulse bg-gray-100" />)}
        </div>
      ) : contrats.length === 0 ? (
        <div className="card border border-gray-200 p-10 text-center">
          <FileText size={36} className="text-muted mx-auto mb-3" />
          <p className="text-muted font-light">Aucun contrat pour le moment.</p>
          <Link href="/devis" className="btn-primary inline-flex mt-5">Demander un devis</Link>
        </div>
      ) : (
        <div className="space-y-4">
          {contrats.map((c) => (
            <div key={c.id} className="card border border-gray-200 p-5">
              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3 mb-4">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-mono text-sm font-semibold text-textdark">{c.numero}</span>
                    <Badge variant={c.statut === 'actif' ? 'green' : 'muted'}>{c.statut}</Badge>
                    <Badge variant="gold">{FORMULE_LABEL[c.formule]}</Badge>
                  </div>
                  <p className="text-muted text-sm">
                    Du {formatDate(c.date_debut)} {c.date_fin ? `au ${formatDate(c.date_fin)}` : '(en cours)'}
                  </p>
                </div>
                <p className="text-primary font-semibold text-lg shrink-0">
                  {formatGNF(c.montant_mensuel)}<span className="text-muted text-sm font-light">/mois</span>
                </p>
              </div>
              {c.services.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {c.services.map((s) => (
                    <span key={s.service} className="text-xs bg-gray-100 text-textdark px-2.5 py-1 rounded-full">
                      {s.service_titre}
                    </span>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
