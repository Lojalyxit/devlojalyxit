// Informations officielles de LojalyxIT — source unique pour tout le site.

/** Slogan officiel (ne pas modifier la casse ni la ponctuation). */
export const SLOGAN = 'We build smart digital futures.'

/** Découpage du slogan pour le titre de l'accueil (ligne 1 en clair, ligne 2 en vert). */
export const SLOGAN_LIGNE_1 = 'We build smart'
export const SLOGAN_LIGNE_2 = 'digital futures.'

/**
 * Chiffres clés — identiques partout sur le site (accueil, à propos…).
 * Enseignement : professeur depuis 2018.
 */
export const CHIFFRES_CLES = [
  { valeur: 12, suffixe: '+', label: "Années d'expérience" },
  { valeur: 11, suffixe: '', label: 'Certifications professionnelles' },
  { valeur: 8, suffixe: '', label: "Années d'enseignement" },
] as const

export const SITE_URL = 'https://lojalyxit.com'
export const NOM_SOCIETE = 'LojalyxIT SARL'

// ── Coordonnées ─────────────────────────────────────────────────────────────

/** Adresse officielle unique : Almamy, Kaloum, Conakry, République de Guinée. */
export const ADRESSE = {
  quartier: 'Almamy',
  commune: 'Kaloum',
  ville: 'Conakry',
  pays: 'République de Guinée',
  codePays: 'GN',
  ligne1: 'Almamy, Kaloum',
  ligne2: 'Conakry, République de Guinée',
  complete: 'Almamy, Kaloum, Conakry, République de Guinée',
} as const

export const HORAIRES_AFFICHES = 'Lun — Ven : 8h00 — 18h00'

export const TELEPHONE_AFFICHE = '+224 622 36 54 20'
export const TELEPHONE_E164 = '+224622365420'
export const TELEPHONE_HREF = `tel:${TELEPHONE_E164}`

/**
 * Email public affiché sur le site (page Contact, footer, données structurées).
 * Pour basculer vers contact@lojalyxit.com : définir NEXT_PUBLIC_CONTACT_EMAIL
 * (ou changer la valeur par défaut ci-dessous) puis rebuild le frontend.
 */
export const EMAIL_PUBLIC = process.env.NEXT_PUBLIC_CONTACT_EMAIL || 'ceo@lojalyxit.com'

// ── WhatsApp ────────────────────────────────────────────────────────────────

export const WHATSAPP_NUMERO = '224622365420'
export const WHATSAPP_MESSAGE_DEFAUT =
  'Bonjour LojalyxIT, je souhaite avoir des informations sur vos services.'

/** Lien wa.me avec message prérempli. */
export function lienWhatsApp(message: string = WHATSAPP_MESSAGE_DEFAUT): string {
  return `https://wa.me/${WHATSAPP_NUMERO}?text=${encodeURIComponent(message)}`
}
