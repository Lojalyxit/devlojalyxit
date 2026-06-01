'use client'

import { useEffect, useState, useCallback } from 'react'
import { adminApi } from '@/lib/admin-api'
import { Badge } from '@/components/ui/Badge'
import { cn, formatDate, formatGNF } from '@/lib/utils'
import type { Facture } from '@/types'

const STATUTS = ['tous', 'impayee', 'en_retard', 'payee'] as const
type StatutFilter = (typeof STATUTS)[number]

const BADGE: Record<string, 'green' | 'muted' | 'danger'> = {
  payee: 'green', impayee: 'muted', en_retard: 'danger',
}

const LABEL: Record<string, string> = {
  payee: 'Payée', impayee: 'Impayée', en_retard: 'En retard',
}

export default function AdminFacturesPage() {
  const [filter, setFilter] = useState<StatutFilter>('tous')
  const [items, setItems] = useState<Facture[]>([])
  const [loading, setLoading] = useState(true)

  const load = useCallback(() => {
    setLoading(true)
    adminApi.factures.list(filter === 'tous' ? undefined : filter)
      .then((d) => setItems(d.results))
      .finally(() => setLoading(false))
  }, [filter])

  useEffect(() => { load() }, [load])

  async function markPaid(id: number) {
    await adminApi.factures.update(id, { statut: 'payee' } as Partial<Facture>)
    setItems((prev) => prev.map((f) => (f.id === id ? { ...f, statut: 'payee' } : f)))
  }

  const totalImpaye = items.filter(f => f.statut !== 'payee').reduce((s, f) => s + parseFloat(f.montant_ttc), 0)

  return (
    <div className="p-6 md:p-8">
      <div className="flex items-center justify-between mb-2">
        <h1 className="font-display text-textdark text-2xl font-bold">Factures</h1>
        {totalImpaye > 0 && (
          <div className="text-right">
            <p className="text-xs text-muted">Total impayé</p>
            <p className="text-danger font-semibold">{formatGNF(totalImpaye)}</p>
          </div>
        )}
      </div>
      <p className="text-muted text-sm font-light mb-6">{items.length} facture{items.length > 1 ? 's' : ''}</p>

      <div className="flex flex-wrap gap-2 mb-6">
        {STATUTS.map((s) => (
          <button key={s} onClick={() => setFilter(s)}
            className={cn('px-4 py-1.5 rounded-full text-sm font-medium transition-colors capitalize',
              filter === s ? 'bg-primary text-white' : 'bg-gray-100 text-muted hover:bg-gray-200')}>
            {s === 'en_retard' ? 'En retard' : s}
          </button>
        ))}
      </div>

      <div className="card border border-gray-200 overflow-x-auto">
        {loading ? <div className="p-8 text-center text-muted">Chargement…</div>
          : items.length === 0 ? <div className="p-8 text-center text-muted">Aucune facture.</div>
          : (
            <table className="w-full text-sm">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="text-left px-4 py-3 text-muted font-medium text-xs uppercase">Numéro</th>
                  <th className="text-right px-4 py-3 text-muted font-medium text-xs uppercase">TTC</th>
                  <th className="text-left px-4 py-3 text-muted font-medium text-xs uppercase hidden sm:table-cell">Émission</th>
                  <th className="text-left px-4 py-3 text-muted font-medium text-xs uppercase hidden md:table-cell">Échéance</th>
                  <th className="text-center px-4 py-3 text-muted font-medium text-xs uppercase">Statut</th>
                  <th className="px-4 py-3"></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {items.map((f) => (
                  <tr key={f.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-4 py-3 font-mono text-xs text-textdark">{f.numero}</td>
                    <td className="px-4 py-3 text-right font-medium text-textdark">{formatGNF(f.montant_ttc)}</td>
                    <td className="px-4 py-3 text-muted hidden sm:table-cell">{formatDate(f.date_emission)}</td>
                    <td className="px-4 py-3 hidden md:table-cell">
                      <span className={f.statut === 'en_retard' ? 'text-danger font-medium' : 'text-muted'}>
                        {formatDate(f.date_echeance)}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-center">
                      <Badge variant={BADGE[f.statut]}>{LABEL[f.statut]}</Badge>
                    </td>
                    <td className="px-4 py-3">
                      {f.statut !== 'payee' && (
                        <button onClick={() => markPaid(f.id)} className="text-xs text-primary hover:underline font-medium">
                          Marquer payée
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
      </div>
    </div>
  )
}
