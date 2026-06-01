'use client'

import { useState, FormEvent } from 'react'
import Link from 'next/link'
import { useRouter, useSearchParams } from 'next/navigation'
import { Eye, EyeOff, LogIn } from 'lucide-react'
import { useAuth } from '@/contexts/AuthContext'
import { Field } from '@/components/ui/Field'
import { Button } from '@/components/ui/Button'
import type { Metadata } from 'next'

export default function LoginPage() {
  const { login } = useAuth()
  const router = useRouter()
  const params = useSearchParams()
  const expired = params.get('expired')

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPwd, setShowPwd] = useState(false)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e: FormEvent) {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      await login(email, password)
      router.push('/dashboard')
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Erreur de connexion')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-[80vh] bg-bgdeep flex items-center justify-center px-5 py-16">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <Link href="/">
            <span className="font-display text-title text-2xl font-bold">
              Lojalyx<span className="text-primary">IT</span>
            </span>
          </Link>
          <p className="text-muted text-sm mt-2 font-light">Espace client</p>
        </div>

        <div className="card border border-white/5 bg-bgdark p-8">
          <h1 className="font-display text-title text-2xl font-bold mb-6">Connexion</h1>

          {expired && (
            <div className="bg-danger/10 border border-danger/20 text-danger text-sm rounded-btn px-4 py-3 mb-6">
              Votre session a expiré. Veuillez vous reconnecter.
            </div>
          )}

          {error && (
            <div className="bg-danger/10 border border-danger/20 text-danger text-sm rounded-btn px-4 py-3 mb-6">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="flex flex-col gap-1.5">
              <label htmlFor="email" className="text-sm font-medium text-textlight font-sans">Email</label>
              <input
                id="email"
                type="email"
                autoComplete="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder="vous@exemple.com"
                className="w-full border border-white/10 rounded-btn px-4 py-3 font-sans font-light text-textlight bg-bgdeep placeholder:text-muted focus:outline-none focus:border-primary transition-colors duration-150 text-base"
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label htmlFor="password" className="text-sm font-medium text-textlight font-sans">Mot de passe</label>
              <div className="relative">
                <input
                  id="password"
                  type={showPwd ? 'text' : 'password'}
                  autoComplete="current-password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  placeholder="••••••••"
                  className="w-full border border-white/10 rounded-btn px-4 py-3 pr-11 font-sans font-light text-textlight bg-bgdeep placeholder:text-muted focus:outline-none focus:border-primary transition-colors duration-150 text-base"
                />
                <button
                  type="button"
                  onClick={() => setShowPwd((v) => !v)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted hover:text-textlight"
                >
                  {showPwd ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            <Button type="submit" disabled={loading} className="w-full justify-center">
              {loading ? 'Connexion…' : <><LogIn size={16} /> Se connecter</>}
            </Button>
          </form>

          <p className="text-center text-muted text-sm mt-6 font-light">
            Pas encore de compte ?{' '}
            <Link href="/register" className="text-primary hover:underline font-medium">
              Créer un compte
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}
