'use client'

import { useEffect, useRef, useState, type ReactNode } from 'react'

/**
 * Apparition légère au scroll (fondu + léger glissement vers le haut).
 * Contenu visible par défaut côté serveur et si l'utilisateur préfère réduire les animations.
 */
export function Reveal({
  children,
  delay = 0,
  className = '',
}: {
  children: ReactNode
  delay?: number
  className?: string
}) {
  const ref = useRef<HTMLDivElement>(null)
  const [state, setState] = useState<'static' | 'hidden' | 'shown'>('static')

  useEffect(() => {
    const el = ref.current
    if (!el || typeof IntersectionObserver === 'undefined') return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    // Déjà à l'écran au chargement : pas d'animation (évite un clignotement)
    if (el.getBoundingClientRect().top < window.innerHeight * 0.9) return

    setState('hidden')
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setState('shown')
          observer.disconnect()
        }
      },
      { rootMargin: '0px 0px -10% 0px' },
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return (
    <div
      ref={ref}
      className={`${className} ${state === 'hidden' ? 'opacity-0 translate-y-6' : 'opacity-100 translate-y-0'}
        ${state === 'static' ? '' : 'transition-all duration-700 ease-out'}`}
      style={state === 'shown' ? { transitionDelay: `${delay}ms` } : undefined}
    >
      {children}
    </div>
  )
}
