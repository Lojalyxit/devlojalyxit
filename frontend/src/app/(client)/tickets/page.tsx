'use client'

import { useEffect, useState } from 'react'
import { Ticket as TicketIcon, Plus, X, Clock } from 'lucide-react'
import { clientApi } from '@/lib/client-api'
import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'
import { Field, Textarea } from '@/components/ui/Field'
import { formatDate } from '@/lib/utils'
import type { Ticket } from '@/types'

const PRIORITE_BADGE: Record<string, 'danger' | 'gold' | 'muted' | 'green'> = {
  critique: 'danger', haute: 'gold', normale: 'muted', faible: 'muted',
}
const STATUT_BADGE: Record<string, 'green' | 'muted' | 'danger' | 'gold'> = {
  ouvert: 'gold', en_cours: 'green', resolu: 'muted', ferme: 'muted',
}

export default function TicketsPage() {
  const [tickets, setTickets] = useState<Ticket[]>([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [form, setForm] = useState({ sujet: '', description: '', priorite: 'normale' })
  const [submitting, setSubmitting] = useState(false)
  const [formError, setFormError] = useState('')

  const load = () =>
    clientApi.tickets.list().then((d) => setTickets(d.results)).finally(() => setLoading(false))

  useEffect(() => { load() }, [])

  const set = (k: keyof typeof form) => (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => setForm((p) => ({ ...p, [k]: e.target.value }))

  async function handleCreate() {
    if (!form.sujet.trim() || !form.description.trim()) {
      setFormError('Sujet et description sont obligatoires.')
      return
    }
    setSubmitting(true)
    setFormError('')
    try {
      await clientApi.tickets.create(form)
      setForm({ sujet: '', description: '', priorite: 'normale' })
      setShowForm(false)
      load()
    } catch (err) {
      setFormError(err instanceof Error ? err.message : 'Erreur')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="p-6 md:p-8">
      <div className="flex items-center justify-between mb-6">
        <h1 className="font-display text-textdark text-2xl font-bold">Mes tickets</h1>
        <Button size="sm" onClick={() => setShowForm((v) => !v)}>
          {showForm ? <><X size={15} /> Annuler</> : <><Plus size={15} /> Nouveau ticket</>}
        </Button>
      </div>

      {/* Formulaire création */}
      {showForm && (
        <div className="card border border-gray-200 p-5 mb-6">
          <h2 className="font-sans font-semibold text-textdark mb-4">Nouveau ticket de support</h2>
          <div className="space-y-4">
            <Field id="sujet" label="Sujet *" placeholder="Décrivez brièvement le problème" value={form.sujet} onChange={set('sujet')} />
            <Textarea id="description" label="Description *" placeholder="Décrivez le problème en détail, les étapes pour le reproduire…" value={form.description} onChange={set('description')} />
            <div className="flex flex-col gap-1.5">
              <label htmlFor="priorite" className="text-sm font-medium text-textdark font-sans">Priorité</label>
              <select id="priorite" value={form.priorite} onChange={set('priorite')} className="field w-48">
                <option value="faible">Faible</option>
                <option value="normale">Normale</option>
                <option value="haute">Haute</option>
                <option value="critique">Critique</option>
              </select>
            </div>
            {formError && <p className="text-danger text-sm">{formError}</p>}
            <div className="flex gap-3">
              <Button onClick={handleCreate} disabled={submitting} size="sm">
                {submitting ? 'Envoi…' : 'Créer le ticket'}
              </Button>
              <Button variant="secondary" size="sm" onClick={() => setShowForm(false)}>Annuler</Button>
            </div>
          </div>
        </div>
      )}

      {/* Liste */}
      {loading ? (
        <div className="space-y-3">
          {[1,2,3].map(i => <div key={i} className="card border border-gray-200 p-4 h-20 animate-pulse bg-gray-100" />)}
        </div>
      ) : tickets.length === 0 ? (
        <div className="card border border-gray-200 p-10 text-center">
          <TicketIcon size={36} className="text-muted mx-auto mb-3" />
          <p className="text-muted font-light">Aucun ticket pour le moment.</p>
        </div>
      ) : (
        <div className="space-y-3">
          {tickets.map((t) => (
            <div key={t.id} className="card border border-gray-200 p-5">
              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-2 mb-2">
                <div>
                  <span className="text-muted text-xs mr-2">#{t.id}</span>
                  <span className="font-medium text-textdark text-sm">{t.sujet}</span>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  <Badge variant={PRIORITE_BADGE[t.priorite]}>{t.priorite}</Badge>
                  <Badge variant={STATUT_BADGE[t.statut]}>{t.statut.replace('_', ' ')}</Badge>
                </div>
              </div>
              <p className="text-muted text-sm font-light line-clamp-2 mb-3">{t.description}</p>
              <div className="flex items-center gap-4 text-xs text-muted">
                <span className="flex items-center gap-1">
                  <Clock size={12} /> Créé le {formatDate(t.created_at)}
                </span>
                {t.sla?.reponse && (
                  <span>SLA réponse : {t.sla.reponse}h · résolution : {t.sla.resolution}h</span>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
