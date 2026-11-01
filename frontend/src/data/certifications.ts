// Certifications professionnelles du fondateur, affichées en badges sur la page À propos.
// Pour ajouter une certification : ajouter une ligne { nom, editeur }.

export interface Certification {
  /** Nom affiché sur le badge */
  nom: string
  /** Éditeur / organisme (affiché en petit) */
  editeur: string
}

// TODO Jérôme : compléter jusqu'à 11 certifications
export const CERTIFICATIONS: Certification[] = [
  { nom: 'CCNA', editeur: 'Cisco' },
  { nom: 'CSCU', editeur: 'EC-Council' },
  { nom: 'RHCSA', editeur: 'Red Hat' },
  { nom: 'MCSA', editeur: 'Microsoft' },
  { nom: 'Python PCEP', editeur: 'Python Institute' },
  { nom: 'FortiGate', editeur: 'Fortinet' },
  { nom: 'Palo Alto', editeur: 'Palo Alto Networks' },
  { nom: 'MikroTik', editeur: 'MikroTik' },
  { nom: 'AWS', editeur: 'Amazon Web Services' },
  { nom: 'CEH', editeur: 'EC-Council' },
]
