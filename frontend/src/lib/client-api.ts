import { auth } from './auth'
import type {
  UserProfile, Contrat, Facture, Ticket, Inscription,
  PaginatedResponse,
} from '@/types'

const API_URL = process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:8000'

async function authFetch<T>(path: string, init: RequestInit = {}): Promise<T> {
  const token = auth.getToken()
  const res = await fetch(`${API_URL}/api${path}`, {
    ...init,
    headers: {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...(init.headers as Record<string, string> ?? {}),
    },
  })
  if (res.status === 401) {
    auth.clear()
    if (typeof window !== 'undefined') window.location.href = '/login?expired=1'
    throw new Error('Session expirée')
  }
  if (!res.ok) {
    const err = await res.json().catch(() => ({}))
    const msg = Object.values(err).flat().join(' ')
    throw new Error(msg || `Erreur ${res.status}`)
  }
  return res.json() as Promise<T>
}

export const clientApi = {
  auth: {
    login: async (email: string, password: string): Promise<{ access: string; refresh: string }> => {
      const res = await fetch(`${API_URL}/api/token/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      })
      if (!res.ok) {
        const err = await res.json().catch(() => ({}))
        throw new Error(err.detail || 'Identifiants incorrects')
      }
      return res.json()
    },
    register: async (payload: {
      email: string
      password: string
      password2: string
      full_name: string
      company?: string
      phone?: string
    }): Promise<UserProfile> => {
      const res = await fetch(`${API_URL}/api/register/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })
      if (!res.ok) {
        const err = await res.json().catch(() => ({}))
        const msg = Object.values(err).flat().join(' ')
        throw new Error(msg || 'Erreur lors de l\'inscription')
      }
      return res.json()
    },
    me: (): Promise<UserProfile> => authFetch('/me/'),
  },
  contrats: {
    list: (): Promise<PaginatedResponse<Contrat>> => authFetch('/contrats/'),
  },
  factures: {
    list: (): Promise<PaginatedResponse<Facture>> => authFetch('/factures/'),
  },
  tickets: {
    list: (): Promise<PaginatedResponse<Ticket>> => authFetch('/tickets/'),
    create: (data: { sujet: string; description: string; priorite: string; contrat?: number }): Promise<Ticket> =>
      authFetch('/tickets/', { method: 'POST', body: JSON.stringify(data) }),
  },
  inscriptions: {
    list: (): Promise<PaginatedResponse<Inscription>> => authFetch('/inscriptions/'),
    create: (data: { session: number; formule: string; mode_paiement: string }): Promise<Inscription> =>
      authFetch('/inscriptions/', { method: 'POST', body: JSON.stringify(data) }),
  },
  devis: {
    create: (data: {
      nom: string; societe?: string; email: string; telephone?: string
      besoin: string; budget?: string; echeance?: string; service_ids: number[]
    }) =>
      fetch(`${API_URL}/api/devis/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...(auth.getToken() ? { Authorization: `Bearer ${auth.getToken()}` } : {}),
        },
        body: JSON.stringify(data),
      }).then((r) => (r.ok ? r.json() : Promise.reject(new Error('Erreur envoi devis')))),
  },
}
