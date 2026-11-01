'use client'

import type { ReactNode } from 'react'
import { lienWhatsApp } from '@/lib/site'
import { trackEvent } from '@/lib/pixel'

interface Props {
  /** Message prérempli ; message générique par défaut. */
  message?: string
  className?: string
  children: ReactNode
  /** Contexte envoyé avec l'événement Pixel « Contact » (ex. nom du service). */
  contexte?: string
  'aria-label'?: string
}

/** Lien WhatsApp (nouvel onglet) qui déclenche l'événement Meta Pixel « Contact ». */
export function WhatsAppLink({ message, className, children, contexte, ...rest }: Props) {
  return (
    <a
      href={lienWhatsApp(message)}
      target="_blank"
      rel="noopener noreferrer"
      className={className}
      onClick={() => trackEvent('Contact', { method: 'whatsapp', content_name: contexte })}
      {...rest}
    >
      {children}
    </a>
  )
}
