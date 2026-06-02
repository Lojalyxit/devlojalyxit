export interface Service {
  id: number
  slug: string
  titre: string
  description: string
  icone: string
  ordre: number
}

export interface FormationListItem {
  id: number
  slug: string
  titre: string
  domaine: string
  duree_heures: number
  niveau: 'debutant' | 'intermediaire' | 'avance' | 'tous'
  tarif_min_gnf: string
  tarif_max_gnf: string
}

export interface Session {
  id: number
  formation: number
  formation_titre: string
  date_debut: string
  date_fin: string
  format: 'presentiel' | 'en_ligne' | 'intra'
  places_max: number
  statut: 'ouverte' | 'complete' | 'terminee' | 'annulee'
  places_restantes: number
}

export interface FormationModule {
  id: number
  titre: string
  ordre: number
  duree_heures: number
  objectifs: string
  contenu: string
  video_url: string | null
  video_disponible: boolean
}

export interface Formation extends FormationListItem {
  programme: string
  description_longue: string
  certification: string
  sessions: Session[]
  modules: FormationModule[]
}

export interface PaginatedResponse<T> {
  count: number
  next: string | null
  previous: string | null
  results: T[]
}

// ── Auth ──────────────────────────────────────────────────────────────────────

export interface UserProfile {
  id: number
  email: string
  full_name: string
  company: string
  phone: string
  role: 'client' | 'admin'
  date_joined: string
}

// ── Espace client ─────────────────────────────────────────────────────────────

export interface ContratService {
  service: number
  service_titre: string
}

export interface Facture {
  id: number
  contrat: number
  numero: string
  montant_ttc: string
  montant_ht: string
  tva: string
  date_emission: string
  date_echeance: string
  statut: 'payee' | 'impayee' | 'en_retard'
}

export interface Contrat {
  id: number
  user: number
  client_email: string
  numero: string
  formule: 'starter' | 'pro' | 'premium'
  montant_mensuel: string
  date_debut: string
  date_fin: string | null
  statut: 'actif' | 'suspendu' | 'termine'
  created_at: string
  services: ContratService[]
  factures: Facture[]
}

export interface Ticket {
  id: number
  user: number
  client_email: string
  contrat: number | null
  sujet: string
  description: string
  priorite: 'critique' | 'haute' | 'normale' | 'faible'
  statut: 'ouvert' | 'en_cours' | 'resolu' | 'ferme'
  created_at: string
  resolved_at: string | null
  sla: { reponse: number; resolution: number }
}

export interface Inscription {
  id: number
  user: number
  session: number
  formule: 'individuel' | 'intra' | 'pack'
  mode_paiement: 'virement' | 'mobile_money' | 'especes'
  statut: 'en_attente' | 'confirmee' | 'payee' | 'annulee'
  created_at: string
  session_info: Session
}
