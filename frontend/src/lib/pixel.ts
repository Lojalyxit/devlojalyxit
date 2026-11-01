// Suivi Meta Pixel. Sans effet si le Pixel n'est pas chargé
// (NEXT_PUBLIC_META_PIXEL_ID vide, bloqueur de publicité, rendu serveur…).

type PixelEvent = 'PageView' | 'Lead' | 'Contact' | 'InitiateCheckout'

declare global {
  interface Window {
    fbq?: (...args: unknown[]) => void
  }
}

export const META_PIXEL_ID = process.env.NEXT_PUBLIC_META_PIXEL_ID ?? ''

export function trackEvent(event: PixelEvent, params?: Record<string, unknown>): void {
  if (typeof window === 'undefined' || typeof window.fbq !== 'function') return
  // Retire les paramètres vides pour garder des événements propres
  const clean = params
    ? Object.fromEntries(Object.entries(params).filter(([, v]) => v !== undefined && v !== ''))
    : undefined
  window.fbq('track', event, clean)
}
