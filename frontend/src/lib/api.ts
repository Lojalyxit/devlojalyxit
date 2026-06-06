import type { Service, FormationListItem, Formation, PaginatedResponse } from '@/types'

const API_URL = process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:8000'

async function apiFetch<T>(path: string, init: RequestInit = {}): Promise<T> {
  const res = await fetch(`${API_URL}/api${path}`, {
    headers: { 'Content-Type': 'application/json' },
    ...init,
  })
  if (!res.ok) throw new Error(`API ${res.status} — ${path}`)
  return res.json() as Promise<T>
}

export async function getServices(): Promise<Service[]> {
  try {
    const data = await apiFetch<PaginatedResponse<Service>>('/services/', {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      next: { revalidate: 3600 },
    } as any)
    return data.results
  } catch {
    return []
  }
}

export async function getFormations(): Promise<FormationListItem[]> {
  try {
    const data = await apiFetch<PaginatedResponse<FormationListItem>>('/formations/', {
      cache: 'no-store',
    })
    return data.results
  } catch {
    return []
  }
}

export async function getFormation(slug: string): Promise<Formation | null> {
  try {
    return await apiFetch<Formation>(`/formations/${slug}/`, {
      next: { revalidate: 3600 },
    } as any)
  } catch {
    return null
  }
}

export async function postDevis(payload: unknown): Promise<{ ok: boolean; error?: string }> {
  try {
    await apiFetch('/devis/', { method: 'POST', body: JSON.stringify(payload) })
    return { ok: true }
  } catch (e) {
    return { ok: false, error: String(e) }
  }
}
