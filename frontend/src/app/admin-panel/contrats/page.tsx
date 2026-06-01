'use client'

import { useEffect, useState, useCallback } from 'react'
import { adminApi } from '@/lib/admin-api'
import { Badge } from '@/components/ui/Badge'
import { cn, formatDate, formatGNF } from '@/lib/utils'
import type { Contrat } from '@/types'

const STATUTS = ['tous', 'actif', 'suspendu', 'termine'] as const
type StatutFilter = (typeof STATUTS)[number]

const NEXT_STATUT: Record<string, string[]> = {
  actif: ['suspendu', 'termine'],
  suspendu: ['actif', 'termine'],
  termine: [],
}

const BADGE: Record<string, 'green' | 'muted' | 'danger'> = {
  actif: 'green', suspendu: 'muted', termine: 'muted',
}

export default function AdminContratsPage() {
  const [filter, setFilter] = useState<StatutFilter>('tous')
  const [items, setItems] = useState<Contrat[]>([])
  const [loading, setLoading] = useState(true)

  const load = useCallback(() => {
    setLoading(true)
    adminApi.contrats.list(filter === 'tous' ? undefined : filter)
      .then((d) => setItems(d.results))
      .finally(() => setLoading(false))
  }, [filter])

  useEffect(() => { load() }, [load])

  async function updateStatut(id: number, statut: string) {
    await adminApi.contrats.update(id, { statut } as Partial<Contrat>)
    setItems((prev) => prev.map((c) => (c.id === id ? { ...c, statut: statut as Contrat['statut'] } : c)))
  }

  return (
    <div className="p-6 md:p-8">
      <h1 className="font-display text-textdark text-2xl font-bold mb-2">Contrats</h1>
      <p className="text-muted text-sm font-light mb-6">{items.length} contrat{items.length > 1 ? 's' : ''}</p>

      <div className="flex flex-wrap gap-2 mb-6">
        {STATUTS.map((s) => (
          <button key={s} onClick={() => setFilter(s)}
            className={cn('px-4 py-1.5 rounded-full text-sm font-medium transition-colors capitalize',
              filter === s ? 'bg-primary text-white' : 'bg-gray-100 text-muted hover:bg-gray-200')}>
            {s}
          </button>
        ))}
      </div>

      <div className="card border border-gray-200 overflow-x-auto">
        {loading ? <div className="p-8 text-center text-muted">Chargement…</div>
          : items.length === 0 ? <div className="p-8 text-center text-muted">Aucun contrat.</div>
          : (
            <table className="w-full text-sm">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="text-left px-4 py-3 text-muted font-medium text-xs uppercase">Numéro</th>
                  <th className="text-left px-4 py-3 text-muted font-medium text-xs uppercase hidden sm:table-cell">Client</th>
                  <th className="text-left px-4 py-3 text-muted font-medium text-xs uppercase">Formule</th>
                  <th className="text-right px-4 py-3 text-muted font-medium text-xs uppercase hidden md:table-cell">Mensuel</th>
                  <th className="text-left px-4 py-3 text-muted font-medium text-xs uppercase hidden lg:table-cell">Début</th>
                  <th className="text-left px-4 py-3 text-muted font-medium text-xs uppercase">Statut</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {items.map((c) => (
                  <tr key={c.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-4 py-3 font-mono text-xs text-textdark">{c.numero}</td>
                    <td className="px-4 py-3 text-muted hidden sm:table-cell">{c.client_email}</td>
                    <td className="px-4 py-3"><Badge variant="gold">{c.formule}</Badge></td>
                    <td className="px-4 py-3 text-right font-medium text-textdark hidden md:table-cell">{formatGNF(c.montant_mensuel)}</td>
                    <td className="px-4 py-3 text-muted hidden lg:table-cell">{formatDate(c.date_debut)}</td>
                    <td className="px-4 py-3">
                      {NEXT_STATUT[c.statut]?.length > 0 ? (
                        <select value={c.statut} onChange={(e) => updateStatut(c.id, e.target.value)}
                          className="border border-gray-200 rounded-btn px-2 py-1 text-xs text-textdark bg-white focus:outline-none focus:border-primary">
                          <option value={c.statut}>{c.statut}</option>
                          {NEXT_STATUT[c.statut].map((s) => <option key={s} value={s}>{s}</option>)}
                        </select>
                      ) : <Badge variant={BADGE[c.statut]}>{c.statut}</Badge>}
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
