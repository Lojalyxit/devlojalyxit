'use client'

import { useEffect, useState } from 'react'
import { usePathname } from 'next/navigation'
import { WhatsAppLink } from '@/components/ui/WhatsAppLink'
import { WhatsAppIcon } from '@/components/ui/WhatsAppIcon'

/**
 * Bouton WhatsApp flottant (bas droite), présent sur toutes les pages.
 * Il se masque automatiquement lorsqu'un élément marqué `data-hide-whatsapp-float`
 * (ex. bouton d'envoi d'un formulaire) est visible à l'écran, pour ne jamais le recouvrir.
 */
export function WhatsAppFloat() {
  const pathname = usePathname()
  const [hidden, setHidden] = useState(false)

  useEffect(() => {
    setHidden(false)
    const targets = document.querySelectorAll('[data-hide-whatsapp-float]')
    if (targets.length === 0 || typeof IntersectionObserver === 'undefined') return

    const visibles = new Set<Element>()
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) visibles.add(entry.target)
          else visibles.delete(entry.target)
        }
        setHidden(visibles.size > 0)
      },
      // Ne compte que la partie basse de l'écran, là où se trouve le bouton flottant
      { rootMargin: '-60% 0px 0px 0px' },
    )
    targets.forEach((t) => observer.observe(t))
    return () => observer.disconnect()
  }, [pathname])

  // Pas de bouton dans les espaces client / admin
  if (pathname.startsWith('/admin-panel')) return null

  return (
    <WhatsAppLink
      contexte="bouton flottant"
      aria-label="Nous écrire sur WhatsApp"
      className={`fixed z-40 bottom-5 right-5 md:bottom-8 md:right-8 flex items-center gap-2 rounded-full
        bg-[#25D366] text-white shadow-lg shadow-black/30 px-4 py-3 md:px-5
        hover:bg-[#1EBE5A] focus:outline-none focus-visible:ring-4 focus-visible:ring-[#25D366]/40
        transition-all duration-300
        ${hidden ? 'opacity-0 pointer-events-none translate-y-4' : 'opacity-100 translate-y-0'}`}
    >
      <WhatsAppIcon size={24} />
      <span className="hidden sm:inline font-sans font-medium text-sm">WhatsApp</span>
    </WhatsAppLink>
  )
}
