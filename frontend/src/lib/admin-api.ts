import { auth } from './auth'
import type {
  UserProfile, Contrat, Facture, Ticket, Inscription,
  FormationListItem, Session, PaginatedResponse,
} from '@/types'

const API_URL = process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:8000'

async function adminFetch<T>(path: string, init: RequestInit = {}): Promise<T> {
  const token = auth.getToken()
  const res = await fetch(`${API_URL}/api${path}`, {
    ...init,
    headers: {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...(typeof init.headers === 'object' ? (init.headers as Record<string, string>) : {}),
    },
  })
  if (res.status === 401 || res.status === 403) {
    if (typeof window !== 'undefined') window.location.href = '/login'
    throw new Error('Accès refusé')
  }
  if (res.status === 204) return undefined as T
  if (!res.ok) {
    const err = await res.json().catch(() => ({}))
    throw new Error(Object.values(err).flat().join(' ') || `Erreur ${res.status}`)
  }
  return res.json() as Promise<T>
}

function qs(params: Record<string, string | undefined>) {
  const p = new URLSearchParams()
  Object.entries(params).forEach(([k, v]) => { if (v) p.set(k, v) })
  const s = p.toString()
  return s ? `?${s}` : ''
}

// ── Types admin ───────────────────────────────────────────────────────────────

export interface AdminDevis {
  id: number
  user: number | null
  nom: string
  societe: string
  email: string
  telephone: string
  besoin: string
  budget: string
  echeance: string
  statut: 'nouveau' | 'en_cours' | 'envoye' | 'gagne' | 'perdu'
  created_at: string
  services: Array<{ service: number; service_titre: string }>
}

// ── API ───────────────────────────────────────────────────────────────────────

export const adminApi = {
  stats: {
    fetch: () => Promise.all([
      adminFetch<PaginatedResponse<AdminDevis>>('/admin/devis/'),
      adminFetch<PaginatedResponse<UserProfile>>('/admin/users/'),
      adminFetch<PaginatedResponse<Ticket>>('/admin/tickets/'),
      adminFetch<PaginatedResponse<Facture>>('/admin/factures/'),
      adminFetch<PaginatedResponse<Session>>('/admin/sessions/'),
    ]),
  },

  devis: {
    list: (statut?: string): Promise<PaginatedResponse<AdminDevis>> =>
      adminFetch(`/admin/devis/${qs({ statut })}`),
    update: (id: number, data: Partial<AdminDevis>): Promise<AdminDevis> =>
      adminFetch(`/admin/devis/${id}/`, { method: 'PATCH', body: JSON.stringify(data) }),
    destroy: (id: number): Promise<void> =>
      adminFetch(`/admin/devis/${id}/`, { method: 'DELETE' }),
  },

  clients: {
    list: (search?: string): Promise<PaginatedResponse<UserProfile>> =>
      adminFetch(`/admin/users/${qs({ search })}`),
    update: (id: number, data: Partial<UserProfile & { is_active: boolean }>): Promise<UserProfile> =>
      adminFetch(`/admin/users/${id}/`, { method: 'PATCH', body: JSON.stringify(data) }),
  },

  contrats: {
    list: (statut?: string): Promise<PaginatedResponse<Contrat>> =>
      adminFetch(`/admin/contrats/${qs({ statut })}`),
    update: (id: number, data: Partial<Contrat>): Promise<Contrat> =>
      adminFetch(`/admin/contrats/${id}/`, { method: 'PATCH', body: JSON.stringify(data) }),
  },

  factures: {
    list: (statut?: string): Promise<PaginatedResponse<Facture>> =>
      adminFetch(`/admin/factures/${qs({ statut })}`),
    update: (id: number, data: Partial<Facture>): Promise<Facture> =>
      adminFetch(`/admin/factures/${id}/`, { method: 'PATCH', body: JSON.stringify(data) }),
  },

  tickets: {
    list: (params?: { statut?: string; priorite?: string }): Promise<PaginatedResponse<Ticket>> =>
      adminFetch(`/admin/tickets/${qs(params ?? {})}`),
    update: (id: number, data: Partial<Ticket>): Promise<Ticket> =>
      adminFetch(`/admin/tickets/${id}/`, { method: 'PATCH', body: JSON.stringify(data) }),
  },

  formations: {
    list: (): Promise<PaginatedResponse<FormationListItem>> =>
      adminFetch('/admin/formations/'),
    create: (data: unknown): Promise<FormationListItem> =>
      adminFetch('/admin/formations/', { method: 'POST', body: JSON.stringify(data) }),
    update: (id: number, data: unknown): Promise<FormationListItem> =>
      adminFetch(`/admin/formations/${id}/`, { method: 'PATCH', body: JSON.stringify(data) }),
    destroy: (id: number): Promise<void> =>
      adminFetch(`/admin/formations/${id}/`, { method: 'DELETE' }),
  },

  sessions: {
    list: (statut?: string): Promise<PaginatedResponse<Session>> =>
      adminFetch(`/admin/sessions/${qs({ statut })}`),
    create: (data: unknown): Promise<Session> =>
      adminFetch('/admin/sessions/', { method: 'POST', body: JSON.stringify(data) }),
    update: (id: number, data: unknown): Promise<Session> =>
      adminFetch(`/admin/sessions/${id}/`, { method: 'PATCH', body: JSON.stringify(data) }),
    destroy: (id: number): Promise<void> =>
      adminFetch(`/admin/sessions/${id}/`, { method: 'DELETE' }),
  },
}
