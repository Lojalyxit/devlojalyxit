'use client'

import { useEffect, useState, type FormEvent } from 'react'
import { useSearchParams } from 'next/navigation'
import { Send, CheckCircle2, AlertCircle } from 'lucide-react'
import { Field, Textarea } from '@/components/ui/Field'
import { Button } from '@/components/ui/Button'
import { SUJETS_CONTACT } from '@/data/services'
import { trackEvent } from '@/lib/pixel'
import { WhatsAppLink } from '@/components/ui/WhatsAppLink'

interface FormData {
  nom: string
  email: string
  telephone: string
  sujet: string
  message: string
  formation: string
  /** Champ piège anti-spam : doit rester vide */
  site_web: string
}

const INIT: FormData = { nom: '', email: '', telephone: '', sujet: '', message: '', formation: '', site_web: '' }

const SUJETS_VALIDES = new Set(SUJETS_CONTACT.map((s) => s.value))

/** Anciennes valeurs de ?sujet= encore présentes dans des liens → sujet + message prérempli */
const ALIAS_SUJETS: Record<string, { sujet: string; message?: string }> = {
  diagnostic: { sujet: 'autre', message: 'Je souhaite un diagnostic IT gratuit de mon entreprise.' },
  devis: { sujet: '' },
  support: { sujet: 'maintenance' },
}

type Status = 'idle' | 'loading' | 'success' | 'error'

export function ContactForm() {
  const params = useSearchParams()
  const [data, setData] = useState<FormData>(INIT)
  const [status, setStatus] = useState<Status>('idle')
  const [erreur, setErreur] = useState('')
  const [erreursChamps, setErreursChamps] = useState<Partial<Record<keyof FormData, string>>>({})

  // Présélection depuis l'URL : /contact?sujet=maintenance ou ?sujet=formation&formation=ccna
  useEffect(() => {
    const sujetParam = (params.get('sujet') ?? '').toLowerCase()
    const formation = params.get('formation') ?? ''
    let sujet = SUJETS_VALIDES.has(sujetParam) ? sujetParam : ''
    let message = ''
    if (!sujet && ALIAS_SUJETS[sujetParam]) {
      sujet = ALIAS_SUJETS[sujetParam].sujet
      message = ALIAS_SUJETS[sujetParam].message ?? ''
    }
    if (formation) {
      sujet = 'formation'
      message = `Je souhaite m'inscrire ou avoir des informations sur la formation « ${formation} ».`
    }
    if (sujet || message || formation) {
      setData((prev) => ({ ...prev, sujet: sujet || prev.sujet, message: prev.message || message, formation }))
    }
  }, [params])

  const set = (field: keyof FormData) => (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
  ) => setData((prev) => ({ ...prev, [field]: e.target.value }))

  async function handleSubmit(e: FormEvent) {
    e.preventDefault()
    setStatus('loading')
    setErreur('')
    setErreursChamps({})

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:8000'}/api/contact/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })

      if (res.ok) {
        trackEvent('Lead', { content_name: 'Formulaire de contact', content_category: data.sujet })
        setStatus('success')
        setData(INIT)
        return
      }

      if (res.status === 429) {
        setErreur(
          'Vous avez envoyé plusieurs messages en peu de temps. Merci de réessayer plus tard ou de nous écrire sur WhatsApp.',
        )
      } else if (res.status === 400) {
        const body = (await res.json().catch(() => ({}))) as Record<string, string[] | string>
        const champs: Partial<Record<keyof FormData, string>> = {}
        for (const [k, v] of Object.entries(body)) {
          champs[k as keyof FormData] = Array.isArray(v) ? v[0] : String(v)
        }
        setErreursChamps(champs)
        setErreur('Certains champs sont à corriger.')
      } else {
        setErreur("Le message n'a pas pu être envoyé. Veuillez réessayer ou nous écrire sur WhatsApp.")
      }
      setStatus('error')
    } catch {
      setErreur('Connexion impossible. Vérifiez votre connexion Internet ou écrivez-nous sur WhatsApp.')
      setStatus('error')
    }
  }

  if (status === 'success') {
    return (
      <div role="status" className="card border border-primary/30 bg-primary/5 p-8 text-center">
        <CheckCircle2 size={48} className="text-primary mx-auto mb-4" />
        <h3 className="font-sans font-semibold text-textdark text-xl mb-2">Message bien reçu, merci !</h3>
        <p className="text-gray-700 mb-6">
          Notre équipe vous répond sous 24h (jours ouvrés) par email ou par téléphone.
          Besoin d&apos;une réponse immédiate ? Écrivez-nous sur WhatsApp.
        </p>
        <Button onClick={() => setStatus('idle')} variant="secondary" size="sm">
          Envoyer un autre message
        </Button>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="relative space-y-5">
      {/* Champ piège anti-spam : invisible et ignoré par les humains */}
      <div aria-hidden="true" className="absolute -left-[9999px] w-px h-px overflow-hidden">
        <label htmlFor="site_web">Ne pas remplir ce champ</label>
        <input
          id="site_web"
          name="site_web"
          type="text"
          tabIndex={-1}
          autoComplete="off"
          value={data.site_web}
          onChange={set('site_web')}
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <Field
          id="nom"
          label="Nom complet *"
          placeholder="Votre nom"
          value={data.nom}
          onChange={set('nom')}
          error={erreursChamps.nom}
          autoComplete="name"
          required
        />
        <Field
          id="email"
          type="email"
          label="Email *"
          placeholder="vous@entreprise.com"
          value={data.email}
          onChange={set('email')}
          error={erreursChamps.email}
          autoComplete="email"
          required
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <Field
          id="telephone"
          type="tel"
          label="Téléphone / WhatsApp"
          placeholder="+224 XXX XXX XXX"
          value={data.telephone}
          onChange={set('telephone')}
          error={erreursChamps.telephone}
          autoComplete="tel"
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
            {SUJETS_CONTACT.map(({ value, label }) => (
              <option key={value} value={value}>{label}</option>
            ))}
          </select>
          {erreursChamps.sujet && <p className="text-danger text-xs">{erreursChamps.sujet}</p>}
        </div>
      </div>

      <Textarea
        id="message"
        label="Message *"
        placeholder="Décrivez votre besoin ou votre projet…"
        value={data.message}
        onChange={set('message')}
        error={erreursChamps.message}
        required
      />

      {status === 'error' && erreur && (
        <div role="alert" className="flex items-start gap-2 text-danger text-sm bg-danger/5 border border-danger/30 rounded-btn p-3">
          <AlertCircle size={16} className="shrink-0 mt-0.5" />
          <span>
            {erreur}{' '}
            <WhatsAppLink contexte="erreur formulaire contact" className="underline font-medium">
              Ouvrir WhatsApp
            </WhatsAppLink>
          </span>
        </div>
      )}

      <Button type="submit" disabled={status === 'loading'} className="w-full sm:w-auto" data-hide-whatsapp-float>
        {status === 'loading' ? 'Envoi en cours…' : <>Envoyer le message <Send size={16} /></>}
      </Button>
    </form>
  )
}
