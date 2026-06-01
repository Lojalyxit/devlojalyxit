'use client'

import { useEffect, useState, useCallback } from 'react'
import { Plus, Trash2, X, Check } from 'lucide-react'
import { adminApi } from '@/lib/admin-api'
import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'
import { cn, formatDate } from '@/lib/utils'
import type { Session, FormationListItem } from '@/types'

const STATUTS = ['tous', 'ouverte', 'complete', 'terminee', 'annulee'] as const
const FORMATS = ['presentiel', 'en_ligne', 'intra']
const FORMAT_LABEL: Record<string, string> = { presentiel: 'Présentiel', en_ligne: 'En ligne', intra: 'Intra' }
const STATUT_BADGE: Record<string, 'green' | 'gold' | 'muted' | 'danger'> = {
  ouverte: 'green', complete: 'gold', terminee: 'muted', annulee: 'danger',
}

const NEXT_STATUT: Record<string, string[]> = {
  ouverte: ['complete', 'terminee', 'annulee'],
  complete: ['terminee', 'annulee'],
  terminee: [],
  annulee: [],
}

const EMPTY = { formation: '', date_debut: '', date_fin: '', format: 'presentiel', places_max: 15, statut: 'ouverte' }

export default function AdminSessionsPage() {
  const [filter, setFilter] = useState('tous')
  const [items, setItems] = useState<Session[]>([])
  const [formations, setFormations] = useState<FormationListItem[]>([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [form, setForm] = useState<typeof EMPTY>({ ...EMPTY })
  const [saving, setSaving] = useState(false)

  const load = useCallback(() => {
    setLoading(true)
    Promise.all([
      adminApi.sessions.list(filter === 'tous' ? undefined : filter),
      adminApi.formations.list(),
    ]).then(([s, f]) => {
      setItems(s.results)
      setFormations(f.results)
    }).finally(() => setLoading(false))
  }, [filter])

  useEffect(() => { load() }, [load])

  const set = (k: keyof typeof form) => (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => setForm((p) => ({ ...p, [k]: e.target.value }))

  async function handleSave() {
    setSaving(true)
    try {
      const created = await adminApi.sessions.create({ ...form, places_max: Number(form.places_max), formation: Number(form.formation) })
      setItems((prev) => [created as Session, ...prev])
      setShowForm(false)
      setForm({ ...EMPTY })
    } finally {
      setSaving(false)
    }
  }

  async function updateStatut(id: number, statut: string) {
    await adminApi.sessions.update(id, { statut })
    setItems((prev) => prev.map((s) => (s.id === id ? { ...s, statut: statut as Session['statut'] } : s)))
  }

  async function handleDelete(id: number) {
    if (!confirm('Supprimer cette session ?')) return
    await adminApi.sessions.destroy(id)
    setItems((prev) => prev.filter((s) => s.id !== id))
  }

  return (
    <div className="p-6 md:p-8">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="font-display text-textdark text-2xl font-bold">Sessions</h1>
          <p className="text-muted text-sm font-light">{items.length} session{items.length > 1 ? 's' : ''}</p>
        </div>
        <Button size="sm" onClick={() => setShowForm((v) => !v)}>
          {showForm ? <><X size={15} /> Annuler</> : <><Plus size={15} /> Nouvelle session</>}
        </Button>
      </div>

      {/* Formulaire */}
      {showForm && (
        <div className="card border border-gray-200 p-5 mb-6">
          <h2 className="font-sans font-semibold text-textdark mb-4">Créer une session</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-medium text-textdark">Formation *</label>
              <select value={form.formation} onChange={set('formation')} className="field" required>
                <option value="">Choisir…</option>
                {formations.map((f) => <option key={f.id} value={f.id}>{f.titre}</option>)}
              </select>
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-medium text-textdark">Format *</label>
              <select value={form.format} onChange={set('format')} className="field">
                {FORMATS.map((f) => <option key={f} value={f}>{FORMAT_LABEL[f]}</option>)}
              </select>
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-medium text-textdark">Places max</label>
              <input type="number" value={form.places_max} onChange={set('places_max')} className="field" min={1} />
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-medium text-textdark">Date début *</label>
              <input type="date" value={form.date_debut} onChange={set('date_debut')} className="field" required />
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-medium text-textdark">Date fin *</label>
              <input type="date" value={form.date_fin} onChange={set('date_fin')} className="field" required />
            </div>
          </div>
          <div className="flex gap-3 mt-4">
            <Button size="sm" onClick={handleSave} disabled={saving}>
              <Check size={15} /> {saving ? 'Enregistrement…' : 'Créer la session'}
            </Button>
            <Button size="sm" variant="secondary" onClick={() => setShowForm(false)}>Annuler</Button>
          </div>
        </div>
      )}

      {/* Filtre */}
      <div className="flex flex-wrap gap-2 mb-6">
        {STATUTS.map((s) => (
          <button key={s} onClick={() => setFilter(s)}
            className={cn('px-4 py-1.5 rounded-full text-sm font-medium transition-colors capitalize',
              filter === s ? 'bg-primary text-white' : 'bg-gray-100 text-muted hover:bg-gray-200')}>
            {s}
          </button>
        ))}
      </div>

      {/* Table */}
      <div className="card border border-gray-200 overflow-x-auto">
        {loading ? <div className="p-8 text-center text-muted">Chargement…</div>
          : items.length === 0 ? <div className="p-8 text-center text-muted">Aucune session.</div>
          : (
            <table className="w-full text-sm">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="text-left px-4 py-3 text-muted font-medium text-xs uppercase">Formation</th>
                  <th className="text-left px-4 py-3 text-muted font-medium text-xs uppercase hidden sm:table-cell">Dates</th>
                  <th className="text-left px-4 py-3 text-muted font-medium text-xs uppercase hidden md:table-cell">Format</th>
                  <th className="text-center px-4 py-3 text-muted font-medium text-xs uppercase">Places</th>
                  <th className="text-left px-4 py-3 text-muted font-medium text-xs uppercase">Statut</th>
                  <th className="px-4 py-3"></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {items.map((s) => (
                  <tr key={s.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-4 py-3 font-medium text-textdark">{s.formation_titre}</td>
                    <td className="px-4 py-3 text-muted text-xs hidden sm:table-cell">
                      {formatDate(s.date_debut)} → {formatDate(s.date_fin)}
                    </td>
                    <td className="px-4 py-3 text-muted hidden md:table-cell">{FORMAT_LABEL[s.format]}</td>
                    <td className="px-4 py-3 text-center">
                      <span className="text-textdark font-medium">{s.places_restantes}</span>
                      <span className="text-muted">/{s.places_max}</span>
                    </td>
                    <td className="px-4 py-3">
                      {NEXT_STATUT[s.statut]?.length > 0 ? (
                        <select value={s.statut} onChange={(e) => updateStatut(s.id, e.target.value)}
                          className="border border-gray-200 rounded-btn px-2 py-1 text-xs bg-white focus:outline-none focus:border-primary">
                          <option value={s.statut}>{s.statut}</option>
                          {NEXT_STATUT[s.statut].map((st) => <option key={st} value={st}>{st}</option>)}
                        </select>
                      ) : <Badge variant={STATUT_BADGE[s.statut]}>{s.statut}</Badge>}
                    </td>
                    <td className="px-4 py-3">
                      <button onClick={() => handleDelete(s.id)} className="text-muted hover:text-danger transition-colors p-1">
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
