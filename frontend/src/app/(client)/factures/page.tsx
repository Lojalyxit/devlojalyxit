'use client'

import { useEffect, useState } from 'react'
import { Receipt } from 'lucide-react'
import { clientApi } from '@/lib/client-api'
import { Badge } from '@/components/ui/Badge'
import { formatDate, formatGNF } from '@/lib/utils'
import type { Facture } from '@/types'

const STATUT_BADGE: Record<Facture['statut'], 'green' | 'muted' | 'danger'> = {
  payee: 'green', impayee: 'muted', en_retard: 'danger',
}

const STATUT_LABEL: Record<Facture['statut'], string> = {
  payee: 'Payée', impayee: 'Impayée', en_retard: 'En retard',
}

export default function FacturesPage() {
  const [factures, setFactures] = useState<Facture[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    clientApi.factures.list().then((d) => setFactures(d.results)).finally(() => setLoading(false))
  }, [])

  const totalImpayé = factures
    .filter((f) => f.statut !== 'payee')
    .reduce((sum, f) => sum + parseFloat(f.montant_ttc), 0)

  return (
    <div className="p-6 md:p-8">
      <div className="flex items-center justify-between mb-6">
        <h1 className="font-display text-textdark text-2xl font-bold">Mes factures</h1>
        {totalImpayé > 0 && (
          <div className="text-right">
            <p className="text-xs text-muted font-light">Solde impayé</p>
            <p className="text-danger font-semibold">{formatGNF(totalImpayé)}</p>
          </div>
        )}
      </div>

      {loading ? (
        <div className="space-y-3">
          {[1,2,3].map(i => <div key={i} className="card border border-gray-200 p-4 h-16 animate-pulse bg-gray-100" />)}
        </div>
      ) : factures.length === 0 ? (
        <div className="card border border-gray-200 p-10 text-center">
          <Receipt size={36} className="text-muted mx-auto mb-3" />
          <p className="text-muted font-light">Aucune facture pour le moment.</p>
        </div>
      ) : (
        <div className="card border border-gray-200 overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="text-left px-4 py-3 text-muted font-medium text-xs uppercase tracking-wider">Numéro</th>
                <th className="text-left px-4 py-3 text-muted font-medium text-xs uppercase tracking-wider hidden sm:table-cell">Émission</th>
                <th className="text-left px-4 py-3 text-muted font-medium text-xs uppercase tracking-wider hidden md:table-cell">Échéance</th>
                <th className="text-right px-4 py-3 text-muted font-medium text-xs uppercase tracking-wider">Montant TTC</th>
                <th className="text-center px-4 py-3 text-muted font-medium text-xs uppercase tracking-wider">Statut</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {factures.map((f) => (
                <tr key={f.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-4 py-3 font-mono text-xs text-textdark">{f.numero}</td>
                  <td className="px-4 py-3 text-textdark hidden sm:table-cell">{formatDate(f.date_emission)}</td>
                  <td className="px-4 py-3 hidden md:table-cell">
                    <span className={f.statut === 'en_retard' ? 'text-danger' : 'text-textdark'}>
                      {formatDate(f.date_echeance)}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-right font-medium text-textdark">{formatGNF(f.montant_ttc)}</td>
                  <td className="px-4 py-3 text-center">
                    <Badge variant={STATUT_BADGE[f.statut]}>{STATUT_LABEL[f.statut]}</Badge>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}
