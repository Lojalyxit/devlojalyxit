import Link from 'next/link'
import { MapPin, Phone, Mail } from 'lucide-react'

const SERVICES_LINKS = [
  { href: '/services#serveurs-cloud', label: 'Serveurs & Cloud' },
  { href: '/services#developpement-logiciel', label: 'Développement Logiciel' },
  { href: '/services#reseau-infrastructure', label: 'Réseau & Infrastructure' },
  { href: '/services#cybersecurite', label: 'Cybersécurité' },
  { href: '/services#marketing-digital', label: 'Marketing Digital' },
]

const FORMATION_LINKS = [
  { href: '/formations', label: 'Catalogue des formations' },
  { href: '/formations?domaine=Réseaux', label: 'Réseaux (CCNA, CCNP)' },
  { href: '/formations?domaine=Cybersécurité', label: 'Cybersécurité (CEH)' },
  { href: '/formations?domaine=Cloud', label: 'Cloud & DevOps' },
  { href: '/formations?domaine=Développement', label: 'Développement' },
]

export function Footer() {
  return (
    <footer className="bg-bgdark text-textlight border-t border-white/5">
      <div className="max-w-container mx-auto px-5 md:px-20 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="md:col-span-1">
            <p className="font-display text-title text-2xl font-bold mb-1">
              Lojalyx<span className="text-primary">IT</span>
            </p>
            <p className="font-script text-accent text-2xl mb-4">Solutions & Formation</p>
            <p className="text-sm text-textlight font-light leading-relaxed">
              Votre partenaire IT de confiance à Conakry. Innovation, expertise et formation certifiante
              au service des entreprises ouest-africaines.
            </p>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-sans font-semibold text-title text-sm uppercase tracking-wider mb-4">
              Services
            </h4>
            <ul className="space-y-2">
              {SERVICES_LINKS.map(({ href, label }) => (
                <li key={href}>
                  <Link href={href} className="text-sm text-textlight hover:text-primary transition-colors">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Formations */}
          <div>
            <h4 className="font-sans font-semibold text-title text-sm uppercase tracking-wider mb-4">
              Formations
            </h4>
            <ul className="space-y-2">
              {FORMATION_LINKS.map(({ href, label }) => (
                <li key={href}>
                  <Link href={href} className="text-sm text-textlight hover:text-primary transition-colors">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-sans font-semibold text-title text-sm uppercase tracking-wider mb-4">
              Contact
            </h4>
            <ul className="space-y-3">
              <li className="flex items-start gap-2 text-sm">
                <MapPin size={16} className="text-primary mt-0.5 shrink-0" />
                <span>Conakry, République de Guinée</span>
              </li>
              <li className="flex items-center gap-2 text-sm">
                <Mail size={16} className="text-primary shrink-0" />
                <a href="mailto:ceo@lojalyxit.com" className="hover:text-primary transition-colors">
                  ceo@lojalyxit.com
                </a>
              </li>
              <li className="flex items-center gap-2 text-sm">
                <Phone size={16} className="text-primary shrink-0" />
                <span>+224 XXX XXX XXX</span>
              </li>
            </ul>
            <div className="mt-6">
              <Link
                href="/devis"
                className="btn-primary text-sm inline-flex"
              >
                Demander un devis
              </Link>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-6 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-muted">
          <p>© {new Date().getFullYear()} LojalyxIT SARL — Tous droits réservés</p>
          <div className="flex gap-6">
            <Link href="/mentions-legales" className="hover:text-textlight transition-colors">Mentions légales</Link>
            <Link href="/confidentialite" className="hover:text-textlight transition-colors">Confidentialité</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
