'use client'

import { useState, FormEvent } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { UserPlus } from 'lucide-react'
import { clientApi } from '@/lib/client-api'
import { useAuth } from '@/contexts/AuthContext'
import { Logo } from '@/components/ui/Logo'
import { Field } from '@/components/ui/Field'
import { Button } from '@/components/ui/Button'

export default function RegisterPage() {
  const { login } = useAuth()
  const router = useRouter()

  const [form, setForm] = useState({
    full_name: '',
    company: '',
    phone: '',
    email: '',
    password: '',
    password2: '',
  })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const set = (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement>) =>
    setForm((p) => ({ ...p, [k]: e.target.value }))

  async function handleSubmit(e: FormEvent) {
    e.preventDefault()
    setError('')
    if (form.password !== form.password2) {
      setError('Les mots de passe ne correspondent pas.')
      return
    }
    setLoading(true)
    try {
      await clientApi.auth.register(form)
      await login(form.email, form.password)
      router.push('/dashboard')
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur lors de l\'inscription')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-[80vh] bg-bgdeep flex items-center justify-center px-5 py-16">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <Link href="/">
            <Logo size="lg" />
          </Link>
          <p className="text-muted text-sm mt-2 font-light">Créez votre espace client</p>
        </div>

        <div className="card border border-white/5 bg-bgdark p-8">
          <h1 className="font-display text-title text-2xl font-bold mb-6">Créer un compte</h1>

          {error && (
            <div className="bg-danger/10 border border-danger/20 text-danger text-sm rounded-btn px-4 py-3 mb-6">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-col gap-1.5">
                <label htmlFor="full_name" className="text-sm font-medium text-textlight font-sans">Nom complet *</label>
                <input id="full_name" value={form.full_name} onChange={set('full_name')} required placeholder="Prénom Nom" className="border border-white/10 rounded-btn px-4 py-3 font-sans font-light text-textlight bg-bgdeep placeholder:text-muted focus:outline-none focus:border-primary transition-colors text-sm" />
              </div>
              <div className="flex flex-col gap-1.5">
                <label htmlFor="company" className="text-sm font-medium text-textlight font-sans">Société</label>
                <input id="company" value={form.company} onChange={set('company')} placeholder="Votre entreprise" className="border border-white/10 rounded-btn px-4 py-3 font-sans font-light text-textlight bg-bgdeep placeholder:text-muted focus:outline-none focus:border-primary transition-colors text-sm" />
              </div>
            </div>

            <div className="flex flex-col gap-1.5">
              <label htmlFor="email" className="text-sm font-medium text-textlight font-sans">Email *</label>
              <input id="email" type="email" value={form.email} onChange={set('email')} required placeholder="vous@exemple.com" className="border border-white/10 rounded-btn px-4 py-3 font-sans font-light text-textlight bg-bgdeep placeholder:text-muted focus:outline-none focus:border-primary transition-colors text-base" />
            </div>

            <div className="flex flex-col gap-1.5">
              <label htmlFor="phone" className="text-sm font-medium text-textlight font-sans">Téléphone</label>
              <input id="phone" type="tel" value={form.phone} onChange={set('phone')} placeholder="+224 XXX XXX XXX" className="border border-white/10 rounded-btn px-4 py-3 font-sans font-light text-textlight bg-bgdeep placeholder:text-muted focus:outline-none focus:border-primary transition-colors text-base" />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-col gap-1.5">
                <label htmlFor="password" className="text-sm font-medium text-textlight font-sans">Mot de passe *</label>
                <input id="password" type="password" value={form.password} onChange={set('password')} required placeholder="8 car. min." className="border border-white/10 rounded-btn px-4 py-3 font-sans font-light text-textlight bg-bgdeep placeholder:text-muted focus:outline-none focus:border-primary transition-colors text-sm" />
              </div>
              <div className="flex flex-col gap-1.5">
                <label htmlFor="password2" className="text-sm font-medium text-textlight font-sans">Confirmer *</label>
                <input id="password2" type="password" value={form.password2} onChange={set('password2')} required placeholder="••••••••" className="border border-white/10 rounded-btn px-4 py-3 font-sans font-light text-textlight bg-bgdeep placeholder:text-muted focus:outline-none focus:border-primary transition-colors text-sm" />
              </div>
            </div>

            <Button type="submit" disabled={loading} className="w-full justify-center mt-2">
              {loading ? 'Création…' : <><UserPlus size={16} /> Créer mon compte</>}
            </Button>
          </form>

          <p className="text-center text-muted text-sm mt-6 font-light">
            Déjà un compte ?{' '}
            <Link href="/login" className="text-primary hover:underline font-medium">
              Se connecter
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}
