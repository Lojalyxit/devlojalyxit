import type { Service, FormationListItem, Formation, PaginatedResponse, ContenuAccueil } from '@/types'
import { SLOGAN_LIGNE_1, SLOGAN_LIGNE_2 } from '@/lib/site'

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

// Textes affichés si l'API ne répond pas (identiques à la migration de données Django)
export const CONTENU_ACCUEIL_DEFAUT: ContenuAccueil = {
  titre_ligne_1: SLOGAN_LIGNE_1,
  titre_ligne_2: SLOGAN_LIGNE_2,
  sous_titre:
    'Votre partenaire IT de confiance à Conakry. Solutions cloud, cybersécurité, ' +
    'développement logiciel et centre de formation certifiant.',
  bouton_principal_texte: 'Demander un devis',
  bouton_secondaire_texte: 'Nos formations',
}

export async function getContenuAccueil(): Promise<ContenuAccueil> {
  try {
    const data = await apiFetch<Partial<ContenuAccueil>>('/contenu-accueil/', {
      // Les modifications faites dans l'admin apparaissent en moins d'une minute
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      next: { revalidate: 60 },
    } as any)
    // Un champ vide côté admin retombe sur le texte par défaut
    const contenu = { ...CONTENU_ACCUEIL_DEFAUT }
    for (const key of Object.keys(contenu) as (keyof ContenuAccueil)[]) {
      const value = data[key]
      if (typeof value === 'string' && value.trim() !== '') contenu[key] = value
    }
    return contenu
  } catch {
    return CONTENU_ACCUEIL_DEFAUT
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
    return await apiFetch<Formation>(`/formations/${slug}/`, { cache: 'no-store' })
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
