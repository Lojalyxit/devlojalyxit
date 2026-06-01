'use client'

import { useEffect, useState, useCallback } from 'react'
import { adminApi } from '@/lib/admin-api'
import { Badge } from '@/components/ui/Badge'
import { cn, formatDate } from '@/lib/utils'
import type { Ticket } from '@/types'

const STATUTS = ['tous', 'ouvert', 'en_cours', 'resolu', 'ferme'] as const
const PRIORITES = ['tous', 'critique', 'haute', 'normale', 'faible'] as const

const STATUT_NEXT: Record<string, string[]> = {
  ouvert: ['en_cours', 'resolu', 'ferme'],
  en_cours: ['resolu', 'ferme'],
  resolu: ['ferme'],
  ferme: [],
}
const STATUT_BADGE: Record<string, 'gold' | 'green' | 'muted'> = {
  ouvert: 'gold', en_cours: 'gold', resolu: 'green', ferme: 'muted',
}
const PRIORITE_BADGE: Record<string, 'danger' | 'gold' | 'muted'> = {
  critique: 'danger', haute: 'gold', normale: 'muted', faible: 'muted',
}

export default function AdminTicketsPage() {
  const [statutFilter, setStatutFilter] = useState('tous')
  const [prioriteFilter, setPrioriteFilter] = useState('tous')
  const [items, setItems] = useState<Ticket[]>([])
  const [loading, setLoading] = useState(true)

  const load = useCallback(() => {
    setLoading(true)
    adminApi.tickets.list({
      statut: statutFilter !== 'tous' ? statutFilter : undefined,
      priorite: prioriteFilter !== 'tous' ? prioriteFilter : undefined,
    }).then((d) => setItems(d.results)).finally(() => setLoading(false))
  }, [statutFilter, prioriteFilter])

  useEffect(() => { load() }, [load])

  async function updateStatut(id: number, statut: string) {
    await adminApi.tickets.update(id, { statut } as Partial<Ticket>)
    setItems((prev) => prev.map((t) => (t.id === id ? { ...t, statut: statut as Ticket['statut'] } : t)))
  }

  const FilterBar = ({ values, current, onChange }: { values: readonly string[]; current: string; onChange: (v: string) => void }) => (
    <div className="flex flex-wrap gap-1.5">
      {values.map((v) => (
        <button key={v} onClick={() => onChange(v)}
          className={cn('px-3 py-1 rounded-full text-xs font-medium transition-colors capitalize',
            current === v ? 'bg-primary text-white' : 'bg-gray-100 text-muted hover:bg-gray-200')}>
          {v}
        </button>
      ))}
    </div>
  )

  return (
    <div className="p-6 md:p-8">
      <h1 className="font-display text-textdark text-2xl font-bold mb-2">Tickets</h1>
      <p className="text-muted text-sm font-light mb-6">{items.length} ticket{items.length > 1 ? 's' : ''}</p>

      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <div>
          <p className="text-xs text-muted mb-1.5 font-medium">Statut</p>
          <FilterBar values={STATUTS} current={statutFilter} onChange={setStatutFilter} />
        </div>
        <div>
          <p className="text-xs text-muted mb-1.5 font-medium">Priorité</p>
          <FilterBar values={PRIORITES} current={prioriteFilter} onChange={setPrioriteFilter} />
        </div>
      </div>

      <div className="card border border-gray-200 overflow-x-auto">
        {loading ? <div className="p-8 text-center text-muted">Chargement…</div>
          : items.length === 0 ? <div className="p-8 text-center text-muted">Aucun ticket.</div>
          : (
            <table className="w-full text-sm">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="text-left px-4 py-3 text-muted font-medium text-xs uppercase">#</th>
                  <th className="text-left px-4 py-3 text-muted font-medium text-xs uppercase">Sujet</th>
                  <th className="text-left px-4 py-3 text-muted font-medium text-xs uppercase hidden sm:table-cell">Client</th>
                  <th className="text-center px-4 py-3 text-muted font-medium text-xs uppercase">Priorité</th>
                  <th className="text-left px-4 py-3 text-muted font-medium text-xs uppercase hidden md:table-cell">SLA</th>
                  <th className="text-left px-4 py-3 text-muted font-medium text-xs uppercase">Statut</th>
                  <th className="text-left px-4 py-3 text-muted font-medium text-xs uppercase hidden lg:table-cell">Créé le</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {items.map((t) => (
                  <tr key={t.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-4 py-3 text-muted text-xs">#{t.id}</td>
                    <td className="px-4 py-3">
                      <p className="font-medium text-textdark line-clamp-1">{t.sujet}</p>
                    </td>
                    <td className="px-4 py-3 text-muted text-xs hidden sm:table-cell">{t.client_email}</td>
                    <td className="px-4 py-3 text-center">
                      <Badge variant={PRIORITE_BADGE[t.priorite]}>{t.priorite}</Badge>
                    </td>
                    <td className="px-4 py-3 text-xs text-muted hidden md:table-cell">
                      {t.sla ? `Rép. ${t.sla.reponse}h / Rés. ${t.sla.resolution}h` : '—'}
                    </td>
                    <td className="px-4 py-3">
                      {STATUT_NEXT[t.statut]?.length > 0 ? (
                        <select value={t.statut} onChange={(e) => updateStatut(t.id, e.target.value)}
                          className="border border-gray-200 rounded-btn px-2 py-1 text-xs bg-white focus:outline-none focus:border-primary">
                          <option value={t.statut}>{t.statut}</option>
                          {STATUT_NEXT[t.statut].map((s) => <option key={s} value={s}>{s}</option>)}
                        </select>
                      ) : <Badge variant={STATUT_BADGE[t.statut]}>{t.statut}</Badge>}
                    </td>
                    <td className="px-4 py-3 text-muted text-xs hidden lg:table-cell">{formatDate(t.created_at)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
      </div>
    </div>
  )
}
