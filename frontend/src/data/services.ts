// Services LojalyxIT présentés en « Problème → Solution ».
// Source unique pour : page Services, bloc services de l'accueil, sujets du formulaire
// de contact, messages WhatsApp. Ces textes servent de base aux publicités Meta.
//
// Le `slug` correspond au slug du modèle Django Service (formulaire de devis) et sert
// d'ancre (/services#slug). Le `sujet` est la valeur du paramètre /contact?sujet=…

import {
  Wrench, Network, ShieldCheck, Cloud, Server, Code2, Bot, Megaphone, ShoppingBag, GraduationCap,
  type LucideIcon,
} from 'lucide-react'

export interface ServiceOffre {
  slug: string
  sujet: string
  titre: string
  icone: LucideIcon
  probleme: string
  solution: string
  benefices: [string, string, string]
  technologies: string[]
  image?: { src: string; alt: string }
  /** Affiché dans le bloc services de la page d'accueil */
  accueil: boolean
}

export const SERVICES_OFFRES: ServiceOffre[] = [
  {
    slug: 'maintenance-informatique',
    sujet: 'maintenance',
    titre: 'Maintenance & infogérance',
    icone: Wrench,
    probleme: 'Vos ordinateurs tombent en panne et votre activité s’arrête ?',
    solution:
      'Nous prenons en charge votre parc informatique avec des contrats de maintenance préventive et corrective, et des délais d’intervention garantis.',
    benefices: [
      'Moins d’interruptions d’activité',
      'Support utilisateur réactif',
      'Coûts informatiques maîtrisés et prévisibles',
    ],
    technologies: ['Windows', 'Linux', 'Active Directory', 'Supervision du parc'],
    image: { src: '/images/services/05-maintenance-support.webp', alt: 'Technicien en intervention de maintenance informatique' },
    accueil: true,
  },
  {
    slug: 'reseau-infrastructure',
    sujet: 'reseaux',
    titre: 'Réseaux & infrastructure',
    icone: Network,
    probleme: 'Votre réseau est lent, instable ou coupe régulièrement ?',
    solution:
      'Nous diagnostiquons, sécurisons et optimisons votre infrastructure (câblage, Wi-Fi, routage, serveurs).',
    benefices: [
      'Connexion stable pour toutes vos équipes',
      'Infrastructure documentée et évolutive',
      'Supervision pour anticiper les pannes',
    ],
    technologies: ['Cisco', 'MikroTik', 'Wi-Fi professionnel', 'Fibre optique'],
    image: { src: '/images/services/03-infrastructure-reseau.webp', alt: 'Baie de brassage et câblage réseau' },
    accueil: true,
  },
  {
    slug: 'cybersecurite',
    sujet: 'cybersecurite',
    titre: 'Cybersécurité',
    icone: ShieldCheck,
    probleme: 'Vos données et celles de vos clients sont-elles vraiment protégées ?',
    solution:
      'Nous auditons vos systèmes et déployons des protections professionnelles (pare-feu FortiGate et Palo Alto, sauvegardes, politiques d’accès).',
    benefices: [
      'Risques identifiés et corrigés',
      'Protection contre les attaques et les pertes de données',
      'Équipes sensibilisées aux bonnes pratiques',
    ],
    technologies: ['FortiGate', 'Palo Alto', 'VPN', 'Sauvegardes 3-2-1'],
    accueil: true,
  },
  {
    slug: 'serveurs-cloud',
    sujet: 'cloud',
    titre: 'Cloud & DevOps',
    icone: Cloud,
    probleme: 'Vos serveurs coûtent cher, sont difficiles à gérer ou mal sauvegardés ?',
    solution:
      'Nous migrons et gérons vos applications sur le cloud (AWS, VPS), avec conteneurisation Docker et déploiement automatisé.',
    benefices: [
      'Haute disponibilité de vos services',
      'Sauvegardes automatiques',
      'Coûts adaptés à votre usage réel',
    ],
    technologies: ['AWS', 'VPS', 'Docker', 'CI/CD'],
    image: { src: '/images/services/01-serveurs-cloud.webp', alt: 'Salle serveurs et infrastructure cloud' },
    accueil: true,
  },
  {
    slug: 'virtualisation',
    sujet: 'virtualisation',
    titre: 'Virtualisation (Proxmox)',
    icone: Server,
    probleme: 'Vous avez besoin de plusieurs serveurs mais votre budget est limité ?',
    solution:
      'Nous virtualisons votre infrastructure avec Proxmox pour faire tourner plusieurs serveurs sur une seule machine.',
    benefices: [
      'Matériel mieux utilisé',
      'Sauvegardes et restaurations rapides',
      'Infrastructure facile à faire évoluer',
    ],
    technologies: ['Proxmox VE', 'Proxmox Backup Server', 'Linux', 'Windows Server'],
    accueil: false,
  },
  {
    slug: 'developpement-logiciel',
    sujet: 'developpement',
    titre: 'Développement logiciel',
    icone: Code2,
    probleme: 'Vous gérez encore votre activité sur Excel ou sur papier ?',
    solution:
      'Nous développons des applications web et mobiles sur mesure, adaptées à vos processus réels.',
    benefices: [
      'Gain de temps quotidien',
      'Données centralisées et accessibles partout',
      'Outil qui évolue avec votre entreprise',
    ],
    technologies: ['React', 'Next.js', 'Django', 'React Native'],
    image: { src: '/images/services/02-developpement-logiciel.webp', alt: "Développement d'une application sur mesure" },
    accueil: true,
  },
  {
    slug: 'automatisation-ia',
    sujet: 'automatisation',
    titre: 'Automatisation & IA',
    icone: Bot,
    probleme: 'Vos équipes perdent des heures sur des tâches répétitives ?',
    solution:
      'Nous automatisons vos processus (relances, rapports, saisie, notifications) avec des workflows intelligents et l’IA.',
    benefices: [
      'Tâches répétitives éliminées',
      'Moins d’erreurs humaines',
      'Équipes concentrées sur l’essentiel',
    ],
    technologies: ['n8n', 'Make', 'API d’IA', 'WhatsApp Business'],
    accueil: true,
  },
  // ── Services existants hors liste initiale : textes rédigés à relire ─────────
  {
    slug: 'marketing-digital',
    sujet: 'marketing',
    titre: 'Marketing digital',
    icone: Megaphone,
    probleme: 'Vos clients ne vous trouvent ni sur Google ni sur les réseaux sociaux ?',
    solution:
      'Nous construisons et animons votre présence en ligne (réseaux sociaux, Google, publicité ciblée) pour attirer de vrais clients.',
    benefices: [
      'Entreprise visible localement sur Google et les réseaux',
      'Campagnes publicitaires mesurables',
      'Plus de demandes de clients qualifiés',
    ],
    technologies: ['Meta Ads', 'Google Ads', 'Google Business Profile', 'Canva'],
    image: { src: '/images/services/04-marketing-digital.webp', alt: 'Analyse de performance marketing digital' },
    accueil: false,
  },
  {
    slug: 'vente-equipements',
    sujet: 'equipements',
    titre: "Vente d'équipements",
    icone: ShoppingBag,
    probleme: 'Vous hésitez sur le matériel informatique à acheter pour votre structure ?',
    solution:
      'Nous vous conseillons et fournissons des équipements professionnels adaptés à vos besoins, livrés et installés à Conakry.',
    benefices: [
      'Matériel adapté à votre usage réel',
      'Livraison et installation à Conakry',
      'Conseil avant achat pour éviter les mauvais choix',
    ],
    technologies: ['Postes de travail', 'Serveurs', 'Équipements Cisco', 'Onduleurs'],
    image: { src: '/images/services/06-vente-equipements.webp', alt: 'Équipements informatiques professionnels' },
    accueil: false,
  },
  {
    slug: 'centre-formation',
    sujet: 'formation',
    titre: 'Formation certifiante',
    icone: GraduationCap,
    probleme: 'Vos équipes manquent de compétences pour gérer vos outils informatiques ?',
    solution:
      'Nous formons vos collaborateurs et les professionnels IT avec des programmes pratiques qui préparent aux certifications internationales.',
    benefices: [
      'Équipes plus autonomes et plus efficaces',
      'Préparation aux certifications CCNA, CEH, AWS…',
      'Formats présentiel, en ligne ou dans vos locaux',
    ],
    technologies: ['Cisco', 'EC-Council', 'Red Hat', 'AWS', 'Fortinet'],
    image: { src: '/images/services/07-formation-certifiante.webp', alt: 'Formation certifiante en salle' },
    accueil: false,
  },
]

/** Options du champ « Sujet » du formulaire de contact. */
export const SUJETS_CONTACT: { value: string; label: string }[] = [
  ...SERVICES_OFFRES.filter((s) => s.sujet !== 'formation').map((s) => ({ value: s.sujet, label: s.titre })),
  { value: 'formation', label: 'Formation' },
  { value: 'autre', label: 'Autre' },
]

export function messageWhatsAppService(titre: string): string {
  return `Bonjour LojalyxIT, je souhaite en savoir plus sur votre service « ${titre} ».`
}
