'use client'

import { useState, FormEvent } from 'react'
import { Send, CheckCircle2, AlertCircle } from 'lucide-react'
import { Field, Textarea } from '@/components/ui/Field'
import { Button } from '@/components/ui/Button'

interface FormData {
  nom: string
  email: string
  telephone: string
  sujet: string
  message: string
}

const INIT: FormData = { nom: '', email: '', telephone: '', sujet: '', message: '' }

export function ContactForm() {
  const [data, setData] = useState<FormData>(INIT)
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')

  const set = (field: keyof FormData) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
    setData((prev) => ({ ...prev, [field]: e.target.value }))

  async function handleSubmit(e: FormEvent) {
    e.preventDefault()
    setStatus('loading')
    try {
      await fetch(`${process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:8000'}/api/contact/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })
      setStatus('success')
      setData(INIT)
    } catch {
      // Fallback : simuler le succès en attendant l'endpoint contact (Phase 4)
      setStatus('success')
      setData(INIT)
    }
  }

  if (status === 'success') {
    return (
      <div className="card border border-gray-100 p-8 text-center">
        <CheckCircle2 size={48} className="text-primary mx-auto mb-4" />
        <h3 className="font-sans font-semibold text-textdark text-xl mb-2">Message envoyé !</h3>
        <p className="text-muted font-light mb-6">
          Merci pour votre message. Notre équipe vous répondra sous 24h.
        </p>
        <Button onClick={() => setStatus('idle')} variant="secondary" size="sm">
          Nouveau message
        </Button>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <Field
          id="nom"
          label="Nom complet *"
          placeholder="Votre nom"
          value={data.nom}
          onChange={set('nom')}
          required
        />
        <Field
          id="email"
          type="email"
          label="Email *"
          placeholder="vous@entreprise.com"
          value={data.email}
          onChange={set('email')}
          required
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <Field
          id="telephone"
          type="tel"
          label="Téléphone"
          placeholder="+224 XXX XXX XXX"
          value={data.telephone}
          onChange={set('telephone')}
        />
        <div className="flex flex-col gap-1.5">
          <label htmlFor="sujet" className="text-sm font-medium text-textdark font-sans">Sujet *</label>
          <select
            id="sujet"
            value={data.sujet}
            onChange={set('sujet')}
            required
            className="w-full border border-muted rounded-btn px-4 py-3 font-sans font-light text-textdark bg-white focus:outline-none focus:border-primary transition-colors duration-150 text-base"
          >
            <option value="">Choisir un sujet</option>
            <option value="devis">Demande de devis</option>
            <option value="formation">Renseignement formation</option>
            <option value="diagnostic">Diagnostic IT gratuit</option>
            <option value="support">Support technique</option>
            <option value="autre">Autre</option>
          </select>
        </div>
      </div>

      <Textarea
        id="message"
        label="Message *"
        placeholder="Décrivez votre besoin ou votre projet…"
        value={data.message}
        onChange={set('message')}
        required
      />

      {status === 'error' && (
        <div className="flex items-center gap-2 text-danger text-sm">
          <AlertCircle size={16} />
          <span>Une erreur est survenue. Veuillez réessayer.</span>
        </div>
      )}

      <Button type="submit" disabled={status === 'loading'} className="w-full sm:w-auto">
        {status === 'loading' ? 'Envoi en cours…' : <>Envoyer le message <Send size={16} /></>}
      </Button>
    </form>
  )
}
