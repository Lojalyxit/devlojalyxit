'use client'

import { useState, useEffect, Suspense } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import Link from 'next/link'
import { CheckCircle2, AlertCircle } from 'lucide-react'
import { clientApi } from '@/lib/client-api'
import { useAuth } from '@/contexts/AuthContext'
import { Button } from '@/components/ui/Button'
import { formatDate, formatGNF } from '@/lib/utils'

const FORMAT_LABELS: Record<string, string> = {
  presentiel: 'Présentiel',
  en_ligne: 'En ligne',
  intra: 'Intra-entreprise',
}

function InscriptionContent() {
  const { user, isLoading } = useAuth()
  const router = useRouter()
  const params = useSearchParams()
  const sessionId = params.get('session')

  const [formule, setFormule] = useState('individuel')
  const [modePaiement, setModePaiement] = useState('virement')
  const [submitting, setSubmitting] = useState(false)
  const [done, setDone] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    if (!isLoading && !user) {
      router.replace(`/login?redirect=/inscription?session=${sessionId}`)
    }
  }, [user, isLoading, router, sessionId])

  if (!sessionId) {
    return (
      <div className="text-center py-20">
        <AlertCircle size={40} className="text-muted mx-auto mb-4" />
        <p className="text-textdark font-light">Aucune session sélectionnée.</p>
        <Link href="/formations" className="btn-primary inline-flex mt-6">Voir les formations</Link>
      </div>
    )
  }

  if (isLoading || !user) {
    return <div className="flex justify-center py-20"><div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" /></div>
  }

  if (done) {
    return (
      <div className="max-w-md mx-auto py-20 text-center">
        <CheckCircle2 size={56} className="text-primary mx-auto mb-5" />
        <h2 className="font-display text-textdark text-2xl font-bold mb-3">Inscription enregistrée !</h2>
        <p className="text-muted font-light mb-8">
          Votre inscription est en attente de confirmation. Vous recevrez un email
          à <strong>{user.email}</strong> une fois votre place confirmée.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link href="/mes-formations" className="btn-primary">Mes formations</Link>
          <Link href="/formations" className="btn-secondary">Voir le catalogue</Link>
        </div>
      </div>
    )
  }

  async function handleSubmit() {
    if (!sessionId) return
    setSubmitting(true)
    setError('')
    try {
      await clientApi.inscriptions.create({
        session: parseInt(sessionId),
        formule,
        mode_paiement: modePaiement,
      })
      setDone(true)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur lors de l\'inscription')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="max-w-lg mx-auto py-12 px-5">
      <h1 className="font-display text-textdark text-3xl font-bold mb-2">Inscription à la formation</h1>
      <p className="text-muted font-light mb-8">Session #{sessionId}</p>

      {error && (
        <div className="bg-danger/10 border border-danger/20 text-danger text-sm rounded-btn px-4 py-3 mb-6 flex items-center gap-2">
          <AlertCircle size={16} /> {error}
        </div>
      )}

      <div className="card border border-gray-100 p-6 space-y-6">
        {/* Formule */}
        <div>
          <p className="font-sans font-semibold text-textdark text-sm mb-3">Formule *</p>
          <div className="grid grid-cols-3 gap-3">
            {['individuel', 'intra', 'pack'].map((f) => (
              <button
                key={f}
                type="button"
                onClick={() => setFormule(f)}
                className={`border rounded-btn py-3 text-sm font-medium capitalize transition-colors ${
                  formule === f ? 'border-primary bg-primary/5 text-primary' : 'border-gray-200 text-textdark hover:border-primary/40'
                }`}
              >
                {f === 'pack' ? 'Pack Entreprise' : f.charAt(0).toUpperCase() + f.slice(1)}
              </button>
            ))}
          </div>
        </div>

        {/* Mode paiement */}
        <div>
          <p className="font-sans font-semibold text-textdark text-sm mb-3">Mode de paiement *</p>
          <div className="space-y-2">
            {[
              { value: 'virement', label: 'Virement bancaire' },
              { value: 'mobile_money', label: 'Mobile Money (Orange / MTN)' },
              { value: 'especes', label: 'Espèces (en agence)' },
            ].map(({ value, label }) => (
              <label key={value} className="flex items-center gap-3 cursor-pointer">
                <input
                  type="radio"
                  name="mode_paiement"
                  value={value}
                  checked={modePaiement === value}
                  onChange={() => setModePaiement(value)}
                  className="accent-primary"
                />
                <span className="text-sm text-textdark font-light">{label}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Info paiement */}
        <div className="bg-gray-50 rounded-btn p-4 text-xs text-muted font-light">
          Le paiement sera validé manuellement par notre équipe. Votre place est réservée
          une fois le paiement confirmé.
        </div>

        <Button onClick={handleSubmit} disabled={submitting} className="w-full justify-center">
          {submitting ? 'Enregistrement…' : 'Confirmer l\'inscription'}
        </Button>
      </div>
    </div>
  )
}

export default function InscriptionPage() {
  return (
    <div className="bg-white min-h-screen">
      <Suspense fallback={<div className="flex justify-center py-20"><div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" /></div>}>
        <InscriptionContent />
      </Suspense>
    </div>
  )
}
