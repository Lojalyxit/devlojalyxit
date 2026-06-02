'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { CheckCircle2, ChevronRight, ChevronLeft, Send, UserPlus } from 'lucide-react'
import { getServices } from '@/lib/api'
import { clientApi } from '@/lib/client-api'
import { auth } from '@/lib/auth'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/Button'
import { Field, Textarea } from '@/components/ui/Field'
import type { Service } from '@/types'

interface FormState {
  service_ids: number[]
  besoin: string
  budget: string
  echeance: string
  nom: string
  societe: string
  email: string
  telephone: string
}

const INIT: FormState = {
  service_ids: [], besoin: '', budget: '', echeance: '',
  nom: '', societe: '', email: '', telephone: '',
}

const BUDGETS = ['< 5 000 000 GNF', '5 – 20 M GNF', '20 – 50 M GNF', '50 – 100 M GNF', '> 100 M GNF']
const ECHEANCES = ['Urgent (< 2 semaines)', '1 mois', '2 – 3 mois', '3 – 6 mois', 'Flexible']
const STEPS = ['Services', 'Détails', 'Coordonnées', 'Confirmation']

export default function DevisPage() {
  const router = useRouter()
  const [step, setStep] = useState(1)
  const [form, setForm] = useState<FormState>(INIT)
  const [services, setServices] = useState<Service[]>([])
  const [submitting, setSubmitting] = useState(false)
  const [done, setDone] = useState(false)
  const [error, setError] = useState('')
  const [password, setPassword] = useState('')
  const [password2, setPassword2] = useState('')
  const [registering, setRegistering] = useState(false)
  const [registerError, setRegisterError] = useState('')

  useEffect(() => {
    getServices().then(setServices)
  }, [])

  const toggleService = (id: number) =>
    setForm((p) => ({
      ...p,
      service_ids: p.service_ids.includes(id)
        ? p.service_ids.filter((x) => x !== id)
        : [...p.service_ids, id],
    }))

  const set = (k: keyof FormState) => (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => setForm((p) => ({ ...p, [k]: e.target.value }))

  const canNext = () => {
    if (step === 1) return form.service_ids.length > 0
    if (step === 2) return form.besoin.trim().length > 10
    if (step === 3) return form.nom.trim() !== '' && form.email.includes('@')
    return true
  }

  async function handleSubmit() {
    setSubmitting(true)
    setError('')
    try {
      await clientApi.devis.create({
        nom: form.nom,
        societe: form.societe,
        email: form.email,
        telephone: form.telephone,
        besoin: form.besoin,
        budget: form.budget,
        echeance: form.echeance,
        service_ids: form.service_ids,
      })
      setDone(true)
    } catch {
      setError('Une erreur est survenue. Veuillez réessayer.')
    } finally {
      setSubmitting(false)
    }
  }

  async function handleRegister() {
    setRegisterError('')
    if (password.length < 8) {
      setRegisterError('Le mot de passe doit contenir au moins 8 caractères.')
      return
    }
    if (password !== password2) {
      setRegisterError('Les mots de passe ne correspondent pas.')
      return
    }
    setRegistering(true)
    try {
      await clientApi.auth.register({
        email: form.email,
        password,
        password2,
        full_name: form.nom,
        company: form.societe || undefined,
        phone: form.telephone || undefined,
      })
      const tokens = await clientApi.auth.login(form.email, password)
      auth.setTokens(tokens.access, tokens.refresh)
      router.push('/espace-client/dashboard')
    } catch (err) {
      setRegisterError(err instanceof Error ? err.message : 'Erreur lors de la création du compte.')
    } finally {
      setRegistering(false)
    }
  }

  function resetForm() {
    setDone(false)
    setForm(INIT)
    setStep(1)
    setPassword('')
    setPassword2('')
    setRegisterError('')
  }

  if (done) {
    return (
      <div className="min-h-[70vh] bg-white flex items-center justify-center px-5 py-12">
        <div className="max-w-md w-full space-y-5">
          {/* Confirmation */}
          <div className="card border border-gray-100 p-8 text-center shadow-sm">
            <CheckCircle2 size={52} className="text-primary mx-auto mb-4" />
            <h2 className="font-display text-textdark text-2xl font-bold mb-2">Demande envoyée !</h2>
            <p className="text-muted font-light text-sm">
              Votre demande a bien été enregistrée. Notre équipe vous contactera sous 24h à{' '}
              <strong className="text-textdark">{form.email}</strong>.
            </p>
          </div>

          {/* Invitation optionnelle */}
          <div className="card border border-primary/25 p-8 shadow-sm">
            <div className="flex items-center gap-2 mb-1">
              <UserPlus size={18} className="text-primary shrink-0" />
              <h3 className="font-sans font-semibold text-textdark text-base">Suivez votre dossier en ligne</h3>
            </div>
            <p className="text-muted text-sm font-light mb-5">
              Créez un espace client gratuit pour consulter vos devis, contrats et factures à tout moment.
            </p>
            <div className="space-y-4">
              <Field
                id="reg-email"
                type="email"
                label="Email"
                value={form.email}
                onChange={() => {}}
                readOnly
                className="bg-gray-50 cursor-default"
              />
              <Field
                id="reg-password"
                type="password"
                label="Mot de passe *"
                placeholder="Au moins 8 caractères"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <Field
                id="reg-password2"
                type="password"
                label="Confirmer le mot de passe *"
                placeholder="Répétez votre mot de passe"
                value={password2}
                onChange={(e) => setPassword2(e.target.value)}
              />
              {registerError && <p className="text-danger text-sm">{registerError}</p>}
              <Button onClick={handleRegister} disabled={registering} className="w-full" size="sm">
                {registering ? 'Création en cours…' : 'Créer mon compte'}
              </Button>
            </div>
            <div className="text-center mt-4">
              <button
                type="button"
                onClick={resetForm}
                className="text-sm text-muted hover:text-textdark transition-colors underline-offset-2 hover:underline"
              >
                Non merci, continuer sans compte
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-white min-h-screen py-12 px-5">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="text-center mb-10">
          <h1 className="font-display text-textdark text-3xl md:text-4xl font-bold mb-2">
            Demande de devis
          </h1>
          <p className="text-muted font-light">Décrivez votre besoin en 4 étapes — réponse sous 24h</p>
        </div>

        {/* Stepper barre */}
        <div className="flex items-center mb-10">
          {STEPS.map((label, i) => {
            const n = i + 1
            const active = step === n
            const done = step > n
            return (
              <div key={label} className="flex items-center flex-1 last:flex-none">
                <div className="flex flex-col items-center gap-1">
                  <div
                    className={cn(
                      'w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium transition-colors',
                      done ? 'bg-primary text-white' : active ? 'bg-primary text-white ring-4 ring-primary/20' : 'bg-gray-100 text-muted',
                    )}
                  >
                    {done ? '✓' : n}
                  </div>
                  <span className={cn('text-xs hidden sm:block', active ? 'text-primary font-medium' : 'text-muted')}>
                    {label}
                  </span>
                </div>
                {i < STEPS.length - 1 && (
                  <div className={cn('flex-1 h-0.5 mx-2 mb-5', step > n ? 'bg-primary' : 'bg-gray-200')} />
                )}
              </div>
            )
          })}
        </div>

        {/* Contenu */}
        <div className="card border border-gray-100 p-6 md:p-8 shadow-sm">

          {/* Étape 1 — Services */}
          {step === 1 && (
            <div>
              <h2 className="font-sans font-semibold text-textdark text-lg mb-1">Quel(s) service(s) vous intéresse(nt) ?</h2>
              <p className="text-muted text-sm mb-6 font-light">Sélectionnez un ou plusieurs services.</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {services.map((s) => {
                  const selected = form.service_ids.includes(s.id)
                  return (
                    <button
                      key={s.id}
                      type="button"
                      onClick={() => toggleService(s.id)}
                      className={cn(
                        'text-left border rounded-card p-4 transition-colors duration-150',
                        selected ? 'border-primary bg-primary/5' : 'border-gray-200 hover:border-primary/40',
                      )}
                    >
                      <div className="flex items-center gap-2">
                        <div className={cn('w-4 h-4 rounded border-2 flex items-center justify-center shrink-0', selected ? 'border-primary bg-primary' : 'border-muted')}>
                          {selected && <span className="text-white text-[10px] leading-none">✓</span>}
                        </div>
                        <span className={cn('text-sm font-medium', selected ? 'text-primary' : 'text-textdark')}>{s.titre}</span>
                      </div>
                    </button>
                  )
                })}
              </div>
              {form.service_ids.length === 0 && (
                <p className="text-muted text-xs mt-4">Sélectionnez au moins un service pour continuer.</p>
              )}
            </div>
          )}

          {/* Étape 2 — Détails */}
          {step === 2 && (
            <div className="space-y-5">
              <div>
                <h2 className="font-sans font-semibold text-textdark text-lg mb-1">Décrivez votre besoin</h2>
                <p className="text-muted text-sm mb-6 font-light">Plus vous êtes précis, plus notre proposition sera adaptée.</p>
              </div>
              <Textarea
                id="besoin"
                label="Description du besoin *"
                placeholder="Ex : Nous cherchons à migrer notre infrastructure vers le cloud AWS, actuellement 3 serveurs on-premise…"
                value={form.besoin}
                onChange={set('besoin')}
                required
              />
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div className="flex flex-col gap-1.5">
                  <label className="text-sm font-medium text-textdark font-sans">Budget estimé</label>
                  <select value={form.budget} onChange={set('budget')} className="field">
                    <option value="">Sélectionner…</option>
                    {BUDGETS.map((b) => <option key={b} value={b}>{b}</option>)}
                  </select>
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-sm font-medium text-textdark font-sans">Échéance souhaitée</label>
                  <select value={form.echeance} onChange={set('echeance')} className="field">
                    <option value="">Sélectionner…</option>
                    {ECHEANCES.map((e) => <option key={e} value={e}>{e}</option>)}
                  </select>
                </div>
              </div>
            </div>
          )}

          {/* Étape 3 — Coordonnées */}
          {step === 3 && (
            <div className="space-y-5">
              <div>
                <h2 className="font-sans font-semibold text-textdark text-lg mb-1">Vos coordonnées</h2>
                <p className="text-muted text-sm mb-6 font-light">Pour que nous puissions vous recontacter.</p>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <Field id="nom" label="Nom complet *" placeholder="Prénom Nom" value={form.nom} onChange={set('nom')} required />
                <Field id="societe" label="Société" placeholder="Votre entreprise" value={form.societe} onChange={set('societe')} />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <Field id="email" type="email" label="Email *" placeholder="vous@exemple.com" value={form.email} onChange={set('email')} required />
                <Field id="telephone" type="tel" label="Téléphone" placeholder="+224 XXX XXX XXX" value={form.telephone} onChange={set('telephone')} />
              </div>
            </div>
          )}

          {/* Étape 4 — Récapitulatif */}
          {step === 4 && (
            <div>
              <h2 className="font-sans font-semibold text-textdark text-lg mb-6">Récapitulatif de votre demande</h2>
              <dl className="space-y-4 text-sm">
                <div className="flex flex-col gap-1">
                  <dt className="text-muted font-sans">Services sélectionnés</dt>
                  <dd className="text-textdark font-medium">
                    {services.filter(s => form.service_ids.includes(s.id)).map(s => s.titre).join(', ')}
                  </dd>
                </div>
                <div className="border-t border-gray-100 pt-4 flex flex-col gap-1">
                  <dt className="text-muted font-sans">Besoin</dt>
                  <dd className="text-textdark font-light leading-relaxed">{form.besoin}</dd>
                </div>
                {form.budget && (
                  <div className="border-t border-gray-100 pt-4 flex flex-col gap-1">
                    <dt className="text-muted font-sans">Budget</dt>
                    <dd className="text-textdark">{form.budget}</dd>
                  </div>
                )}
                {form.echeance && (
                  <div className="border-t border-gray-100 pt-4 flex flex-col gap-1">
                    <dt className="text-muted font-sans">Échéance</dt>
                    <dd className="text-textdark">{form.echeance}</dd>
                  </div>
                )}
                <div className="border-t border-gray-100 pt-4 flex flex-col gap-1">
                  <dt className="text-muted font-sans">Contact</dt>
                  <dd className="text-textdark">{form.nom} {form.societe && `— ${form.societe}`}</dd>
                  <dd className="text-textdark">{form.email} {form.telephone && `· ${form.telephone}`}</dd>
                </div>
              </dl>
              {error && <p className="text-danger text-sm mt-6">{error}</p>}
            </div>
          )}

          {/* Navigation */}
          <div className="flex justify-between mt-8 pt-6 border-t border-gray-100">
            <Button
              variant="secondary"
              onClick={() => setStep((s) => Math.max(1, s - 1) as 1 | 2 | 3 | 4)}
              disabled={step === 1}
              size="sm"
            >
              <ChevronLeft size={16} /> Retour
            </Button>

            {step < 4 ? (
              <Button
                onClick={() => setStep((s) => Math.min(4, s + 1) as 1 | 2 | 3 | 4)}
                disabled={!canNext()}
                size="sm"
              >
                Suivant <ChevronRight size={16} />
              </Button>
            ) : (
              <Button onClick={handleSubmit} disabled={submitting} size="sm">
                {submitting ? 'Envoi…' : <><Send size={16} /> Envoyer ma demande</>}
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
