'use client'

import { useEffect, useState, useCallback } from 'react'
import { Plus, Trash2, Pencil, X, Check } from 'lucide-react'
import { adminApi } from '@/lib/admin-api'
import { Button } from '@/components/ui/Button'
import { Field, Textarea } from '@/components/ui/Field'
import { formatGNF } from '@/lib/utils'
import type { FormationListItem } from '@/types'

const NIVEAUX = ['debutant', 'intermediaire', 'avance', 'tous']

const NIVEAU_LABEL: Record<string, string> = {
  debutant: 'Débutant', intermediaire: 'Intermédiaire', avance: 'Avancé', tous: 'Tous',
}

const EMPTY = {
  slug: '', titre: '', domaine: '', duree_heures: 0, niveau: 'intermediaire',
  programme: '', tarif_min_gnf: '0', tarif_max_gnf: '0',
}

export default function AdminFormationsPage() {
  const [items, setItems] = useState<FormationListItem[]>([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [editId, setEditId] = useState<number | null>(null)
  const [form, setForm] = useState<typeof EMPTY>({ ...EMPTY })
  const [saving, setSaving] = useState(false)

  const load = useCallback(() => {
    setLoading(true)
    adminApi.formations.list().then((d) => setItems(d.results)).finally(() => setLoading(false))
  }, [])

  useEffect(() => { load() }, [load])

  const set = (k: keyof typeof form) => (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => setForm((p) => ({ ...p, [k]: e.target.value }))

  function openCreate() {
    setEditId(null)
    setForm({ ...EMPTY })
    setShowForm(true)
  }

  function openEdit(f: FormationListItem) {
    setEditId(f.id)
    setForm({
      slug: f.slug, titre: f.titre, domaine: f.domaine,
      duree_heures: f.duree_heures, niveau: f.niveau, programme: '',
      tarif_min_gnf: f.tarif_min_gnf, tarif_max_gnf: f.tarif_max_gnf,
    })
    setShowForm(true)
  }

  async function handleSave() {
    setSaving(true)
    try {
      const payload = { ...form, duree_heures: Number(form.duree_heures) }
      if (editId) {
        const updated = await adminApi.formations.update(editId, payload)
        setItems((prev) => prev.map((f) => (f.id === editId ? { ...f, ...updated } : f)))
      } else {
        const created = await adminApi.formations.create(payload)
        setItems((prev) => [created, ...prev])
      }
      setShowForm(false)
    } finally {
      setSaving(false)
    }
  }

  async function handleDelete(id: number) {
    if (!confirm('Supprimer cette formation et toutes ses sessions ?')) return
    await adminApi.formations.destroy(id)
    setItems((prev) => prev.filter((f) => f.id !== id))
  }

  return (
    <div className="p-6 md:p-8">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="font-display text-textdark text-2xl font-bold">Formations</h1>
          <p className="text-muted text-sm font-light">{items.length} formation{items.length > 1 ? 's' : ''}</p>
        </div>
        <Button size="sm" onClick={openCreate}>
          <Plus size={15} /> Nouvelle formation
        </Button>
      </div>

      {/* Formulaire */}
      {showForm && (
        <div className="card border border-gray-200 p-5 mb-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-sans font-semibold text-textdark">{editId ? 'Modifier la formation' : 'Nouvelle formation'}</h2>
            <button onClick={() => setShowForm(false)} className="text-muted hover:text-textdark"><X size={18} /></button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Field id="titre" label="Titre *" value={form.titre} onChange={set('titre')} required />
            <Field id="slug" label="Slug *" placeholder="ex: ccna-cisco" value={form.slug} onChange={set('slug')} required />
            <Field id="domaine" label="Domaine *" placeholder="Réseaux, Cybersécurité…" value={form.domaine} onChange={set('domaine')} required />
            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-medium text-textdark">Niveau</label>
              <select value={form.niveau} onChange={set('niveau')} className="field">
                {NIVEAUX.map((n) => <option key={n} value={n}>{NIVEAU_LABEL[n]}</option>)}
              </select>
            </div>
            <Field id="duree" label="Durée (heures) *" type="number" value={String(form.duree_heures)} onChange={set('duree_heures')} required />
            <div className="grid grid-cols-2 gap-3">
              <Field id="tarif_min" label="Tarif min GNF" type="number" value={form.tarif_min_gnf} onChange={set('tarif_min_gnf')} />
              <Field id="tarif_max" label="Tarif max GNF" type="number" value={form.tarif_max_gnf} onChange={set('tarif_max_gnf')} />
            </div>
          </div>
          <div className="mt-4">
            <Textarea id="programme" label="Programme" value={form.programme} onChange={set('programme')}
              placeholder="Module 1 : …&#10;Module 2 : …" />
          </div>
          <div className="flex gap-3 mt-4">
            <Button size="sm" onClick={handleSave} disabled={saving}>
              <Check size={15} /> {saving ? 'Enregistrement…' : 'Enregistrer'}
            </Button>
            <Button size="sm" variant="secondary" onClick={() => setShowForm(false)}>Annuler</Button>
          </div>
        </div>
      )}

      {/* Table */}
      <div className="card border border-gray-200 overflow-x-auto">
        {loading ? <div className="p-8 text-center text-muted">Chargement…</div>
          : items.length === 0 ? <div className="p-8 text-center text-muted">Aucune formation.</div>
          : (
            <table className="w-full text-sm">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="text-left px-4 py-3 text-muted font-medium text-xs uppercase">Titre</th>
                  <th className="text-left px-4 py-3 text-muted font-medium text-xs uppercase hidden sm:table-cell">Domaine</th>
                  <th className="text-left px-4 py-3 text-muted font-medium text-xs uppercase hidden md:table-cell">Niveau</th>
                  <th className="text-right px-4 py-3 text-muted font-medium text-xs uppercase hidden lg:table-cell">Durée</th>
                  <th className="text-right px-4 py-3 text-muted font-medium text-xs uppercase">Tarif min</th>
                  <th className="px-4 py-3"></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {items.map((f) => (
                  <tr key={f.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-4 py-3 font-medium text-textdark">{f.titre}</td>
                    <td className="px-4 py-3 text-muted hidden sm:table-cell">{f.domaine}</td>
                    <td className="px-4 py-3 text-muted hidden md:table-cell">{NIVEAU_LABEL[f.niveau]}</td>
                    <td className="px-4 py-3 text-right text-muted hidden lg:table-cell">{f.duree_heures}h</td>
                    <td className="px-4 py-3 text-right text-primary font-medium">{formatGNF(f.tarif_min_gnf)}</td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2 justify-end">
                        <button onClick={() => openEdit(f)} className="text-muted hover:text-primary transition-colors p-1"><Pencil size={14} /></button>
                        <button onClick={() => handleDelete(f.id)} className="text-muted hover:text-danger transition-colors p-1"><Trash2 size={14} /></button>
                      </div>
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
