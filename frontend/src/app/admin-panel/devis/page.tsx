'use client'

import { useEffect, useState, useCallback } from 'react'
import { Trash2, RefreshCw } from 'lucide-react'
import { adminApi, type AdminDevis } from '@/lib/admin-api'
import { Badge } from '@/components/ui/Badge'
import { cn, formatDate } from '@/lib/utils'

const STATUTS = ['tous', 'nouveau', 'en_cours', 'envoye', 'gagne', 'perdu'] as const
type StatutFilter = (typeof STATUTS)[number]

const STATUT_NEXT: Record<AdminDevis['statut'], AdminDevis['statut'][]> = {
  nouveau: ['en_cours', 'gagne', 'perdu'],
  en_cours: ['envoye', 'gagne', 'perdu'],
  envoye: ['gagne', 'perdu'],
  gagne: [],
  perdu: [],
}

const BADGE: Record<string, 'gold' | 'green' | 'muted' | 'danger'> = {
  nouveau: 'gold', en_cours: 'gold', envoye: 'muted', gagne: 'green', perdu: 'danger',
}

export default function AdminDevisPage() {
  const [filter, setFilter] = useState<StatutFilter>('tous')
  const [items, setItems] = useState<AdminDevis[]>([])
  const [loading, setLoading] = useState(true)

  const load = useCallback(() => {
    setLoading(true)
    adminApi.devis
      .list(filter === 'tous' ? undefined : filter)
      .then((d) => setItems(d.results))
      .finally(() => setLoading(false))
  }, [filter])

  useEffect(() => { load() }, [load])

  async function updateStatut(id: number, statut: AdminDevis['statut']) {
    await adminApi.devis.update(id, { statut })
    setItems((prev) => prev.map((d) => (d.id === id ? { ...d, statut } : d)))
  }

  async function deleteDevis(id: number) {
    if (!confirm('Supprimer ce devis ?')) return
    await adminApi.devis.destroy(id)
    setItems((prev) => prev.filter((d) => d.id !== id))
  }

  return (
    <div className="p-6 md:p-8">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="font-display text-textdark text-2xl font-bold">Leads & Devis</h1>
          <p className="text-muted text-sm font-light">{items.length} résultat{items.length > 1 ? 's' : ''}</p>
        </div>
        <button onClick={load} className="text-muted hover:text-textdark transition-colors p-1">
          <RefreshCw size={16} />
        </button>
      </div>

      {/* Filtre statut */}
      <div className="flex flex-wrap gap-2 mb-6">
        {STATUTS.map((s) => (
          <button
            key={s}
            onClick={() => setFilter(s)}
            className={cn(
              'px-4 py-1.5 rounded-full text-sm font-medium transition-colors capitalize',
              filter === s ? 'bg-primary text-white' : 'bg-gray-100 text-muted hover:bg-gray-200',
            )}
          >
            {s}
          </button>
        ))}
      </div>

      {/* Table */}
      <div className="card border border-gray-200 overflow-x-auto">
        {loading ? (
          <div className="p-8 text-center text-muted">Chargement…</div>
        ) : items.length === 0 ? (
          <div className="p-8 text-center text-muted">Aucun devis pour ce filtre.</div>
        ) : (
          <table className="w-full text-sm">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="text-left px-4 py-3 text-muted font-medium text-xs uppercase">#</th>
                <th className="text-left px-4 py-3 text-muted font-medium text-xs uppercase">Contact</th>
                <th className="text-left px-4 py-3 text-muted font-medium text-xs uppercase hidden md:table-cell">Services</th>
                <th className="text-left px-4 py-3 text-muted font-medium text-xs uppercase hidden lg:table-cell">Budget</th>
                <th className="text-left px-4 py-3 text-muted font-medium text-xs uppercase">Statut</th>
                <th className="text-left px-4 py-3 text-muted font-medium text-xs uppercase hidden sm:table-cell">Date</th>
                <th className="px-4 py-3"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {items.map((d) => (
                <tr key={d.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-4 py-3 text-muted text-xs">#{d.id}</td>
                  <td className="px-4 py-3">
                    <p className="font-medium text-textdark">{d.nom}</p>
                    <p className="text-muted text-xs">{d.email}</p>
                    {d.societe && <p className="text-muted text-xs">{d.societe}</p>}
                  </td>
                  <td className="px-4 py-3 hidden md:table-cell">
                    <div className="flex flex-wrap gap-1">
                      {d.services.map((s) => (
                        <span key={s.service} className="text-xs bg-gray-100 text-textdark px-2 py-0.5 rounded-full">{s.service_titre}</span>
                      ))}
                    </div>
                  </td>
                  <td className="px-4 py-3 text-textdark hidden lg:table-cell">{d.budget || '—'}</td>
                  <td className="px-4 py-3">
                    {STATUT_NEXT[d.statut].length > 0 ? (
                      <select
                        value={d.statut}
                        onChange={(e) => updateStatut(d.id, e.target.value as AdminDevis['statut'])}
                        className="border border-gray-200 rounded-btn px-2 py-1 text-xs text-textdark bg-white focus:outline-none focus:border-primary"
                      >
                        <option value={d.statut}>{d.statut}</option>
                        {STATUT_NEXT[d.statut].map((s) => <option key={s} value={s}>{s}</option>)}
                      </select>
                    ) : (
                      <Badge variant={BADGE[d.statut]}>{d.statut}</Badge>
                    )}
                  </td>
                  <td className="px-4 py-3 text-muted text-xs hidden sm:table-cell">{formatDate(d.created_at)}</td>
                  <td className="px-4 py-3">
                    <button onClick={() => deleteDevis(d.id)} className="text-muted hover:text-danger transition-colors p-1">
                      <Trash2 size={14} />
                    </button>
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
