'use client'

import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { trackEvent } from '@/lib/pixel'
import { WhatsAppLink } from '@/components/ui/WhatsAppLink'
import { WhatsAppIcon } from '@/components/ui/WhatsAppIcon'

interface Props {
  slug: string
  titre: string
  lienPaiement?: string | null
  /** Session ouverte pour l'inscription en ligne interne (si pas de lien Chariow) */
  sessionId?: number | null
  /** Thème du bloc : boutons sur fond clair ou sombre */
  theme?: 'light' | 'dark'
  /** Disposition : empilés (cartes, sidebar) ou en ligne (bandeau) */
  layout?: 'stack' | 'row'
  className?: string
}

/**
 * « S'inscrire maintenant » : lien Chariow (nouvel onglet) si renseigné, sinon inscription
 * en ligne interne s'il y a une session ouverte, sinon formulaire de contact.
 * + bouton secondaire WhatsApp avec le nom de la formation.
 */
export function InscriptionActions({
  slug, titre, lienPaiement, sessionId, theme = 'light', layout = 'stack', className = '',
}: Props) {
  const href = lienPaiement
    ? lienPaiement
    : sessionId
      ? `/inscription?session=${sessionId}`
      : `/contact?sujet=formation&formation=${encodeURIComponent(slug)}`

  const onInscription = () =>
    trackEvent('InitiateCheckout', {
      content_name: titre,
      content_ids: [slug],
      content_category: 'formation',
      method: lienPaiement ? 'chariow' : sessionId ? 'inscription_en_ligne' : 'contact',
    })

  const classePrincipal = 'btn-primary inline-flex items-center justify-center gap-2 w-full text-center'
  const classeWhatsApp =
    theme === 'dark'
      ? 'inline-flex items-center justify-center gap-2 w-full rounded-btn border border-white/20 text-textlight hover:border-[#25D366] hover:text-white px-6 py-3 text-sm font-medium transition-colors'
      : 'inline-flex items-center justify-center gap-2 w-full rounded-btn border border-gray-300 text-textdark hover:border-[#25D366] px-6 py-3 text-sm font-medium transition-colors'

  return (
    <div className={`flex gap-3 ${layout === 'row' ? 'flex-col sm:flex-row' : 'flex-col'} ${className}`}>
      {lienPaiement ? (
        <a href={href} target="_blank" rel="noopener noreferrer" onClick={onInscription} className={classePrincipal}>
          S&apos;inscrire maintenant <ArrowRight size={16} />
        </a>
      ) : (
        <Link href={href} onClick={onInscription} className={classePrincipal}>
          S&apos;inscrire maintenant <ArrowRight size={16} />
        </Link>
      )}
      <WhatsAppLink
        message={`Bonjour LojalyxIT, je souhaite des informations sur la formation « ${titre} ».`}
        contexte={`formation : ${titre}`}
        className={classeWhatsApp}
      >
        <WhatsAppIcon size={18} className="text-[#25D366]" /> Poser une question sur WhatsApp
      </WhatsAppLink>
    </div>
  )
}
