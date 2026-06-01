'use client'

import { useEffect, useState, useCallback } from 'react'
import { Search, ToggleLeft, ToggleRight } from 'lucide-react'
import { adminApi } from '@/lib/admin-api'
import { Badge } from '@/components/ui/Badge'
import { formatDate } from '@/lib/utils'
import type { UserProfile } from '@/types'

export default function AdminClientsPage() {
  const [clients, setClients] = useState<UserProfile[]>([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [query, setQuery] = useState('')

  const load = useCallback(() => {
    setLoading(true)
    adminApi.clients.list(query || undefined)
      .then((d) => setClients(d.results))
      .finally(() => setLoading(false))
  }, [query])

  useEffect(() => { load() }, [load])

  async function toggleActive(id: number, current: boolean) {
    await adminApi.clients.update(id, { is_active: !current } as unknown as Partial<UserProfile & { is_active: boolean }>)
    setClients((prev) => prev.map((c) => (c.id === id ? { ...c, is_active: !current } as UserProfile : c)))
  }

  return (
    <div className="p-6 md:p-8">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="font-display text-textdark text-2xl font-bold">Clients</h1>
          <p className="text-muted text-sm font-light">{clients.length} compte{clients.length > 1 ? 's' : ''}</p>
        </div>
      </div>

      {/* Recherche */}
      <div className="flex gap-3 mb-6">
        <div className="relative flex-1 max-w-sm">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted" />
          <input
            type="text"
            placeholder="Rechercher par email, nom…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            onKeyDown={(e) => { if (e.key === 'Enter') setQuery(search) }}
            className="w-full border border-gray-200 rounded-btn pl-9 pr-4 py-2 text-sm text-textdark focus:outline-none focus:border-primary"
          />
        </div>
        <button onClick={() => setQuery(search)} className="btn-primary text-sm px-4 py-2">
          Chercher
        </button>
      </div>

      {/* Table */}
      <div className="card border border-gray-200 overflow-x-auto">
        {loading ? (
          <div className="p-8 text-center text-muted">Chargement…</div>
        ) : clients.length === 0 ? (
          <div className="p-8 text-center text-muted">Aucun client trouvé.</div>
        ) : (
          <table className="w-full text-sm">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="text-left px-4 py-3 text-muted font-medium text-xs uppercase">Email</th>
                <th className="text-left px-4 py-3 text-muted font-medium text-xs uppercase hidden sm:table-cell">Nom</th>
                <th className="text-left px-4 py-3 text-muted font-medium text-xs uppercase hidden md:table-cell">Société</th>
                <th className="text-left px-4 py-3 text-muted font-medium text-xs uppercase hidden lg:table-cell">Téléphone</th>
                <th className="text-center px-4 py-3 text-muted font-medium text-xs uppercase">Rôle</th>
                <th className="text-left px-4 py-3 text-muted font-medium text-xs uppercase hidden md:table-cell">Membre depuis</th>
                <th className="text-center px-4 py-3 text-muted font-medium text-xs uppercase">Actif</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {clients.map((c) => (
                <tr key={c.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-4 py-3 text-textdark font-medium">{c.email}</td>
                  <td className="px-4 py-3 text-textdark hidden sm:table-cell">{c.full_name || '—'}</td>
                  <td className="px-4 py-3 text-muted hidden md:table-cell">{c.company || '—'}</td>
                  <td className="px-4 py-3 text-muted hidden lg:table-cell">{c.phone || '—'}</td>
                  <td className="px-4 py-3 text-center">
                    <Badge variant={c.role === 'admin' ? 'gold' : 'muted'}>{c.role}</Badge>
                  </td>
                  <td className="px-4 py-3 text-muted hidden md:table-cell">{formatDate(c.date_joined)}</td>
                  <td className="px-4 py-3 text-center">
                    <button
                      onClick={() => toggleActive(c.id, (c as unknown as { is_active: boolean }).is_active ?? true)}
                      className="transition-colors"
                      title={(c as unknown as { is_active: boolean }).is_active ? 'Désactiver' : 'Activer'}
                    >
                      {(c as unknown as { is_active: boolean }).is_active !== false
                        ? <ToggleRight size={20} className="text-primary" />
                        : <ToggleLeft size={20} className="text-muted" />}
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
