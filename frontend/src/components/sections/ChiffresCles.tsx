'use client'

import { useEffect, useRef, useState } from 'react'
import { CHIFFRES_CLES } from '@/lib/site'

const DUREE_MS = 1400

/** Un compteur : affiche la valeur finale côté serveur, puis s'anime à l'apparition. */
function Compteur({ valeur, suffixe, label }: { valeur: number; suffixe: string; label: string }) {
  const ref = useRef<HTMLDivElement>(null)
  const [affiche, setAffiche] = useState(valeur)

  useEffect(() => {
    const el = ref.current
    if (!el || typeof IntersectionObserver === 'undefined') return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    let frame = 0
    setAffiche(0)
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return
        observer.disconnect()
        const debut = performance.now()
        const tick = (now: number) => {
          const t = Math.min((now - debut) / DUREE_MS, 1)
          const eased = 1 - Math.pow(1 - t, 3) // ease-out cubic
          setAffiche(Math.round(valeur * eased))
          if (t < 1) frame = requestAnimationFrame(tick)
        }
        frame = requestAnimationFrame(tick)
      },
      { threshold: 0.4 },
    )
    observer.observe(el)
    return () => {
      observer.disconnect()
      cancelAnimationFrame(frame)
    }
  }, [valeur])

  return (
    <div ref={ref} className="text-center">
      <div
        className="mx-auto mb-4 w-32 h-32 md:w-36 md:h-36 rounded-full border-2 border-accent/60
                   bg-primary/25 flex items-center justify-center shadow-lg shadow-black/30"
      >
        <span className="font-display text-accent text-5xl md:text-6xl font-bold tabular-nums" aria-hidden="true">
          {affiche}
          {suffixe}
        </span>
        <span className="sr-only">
          {valeur}
          {suffixe}
        </span>
      </div>
      <p className="text-textlight font-light text-base">{label}</p>
    </div>
  )
}

/** Les 3 chiffres clés de LojalyxIT, sur fond sombre. */
export function ChiffresCles({ className = '' }: { className?: string }) {
  return (
    <div className={`grid grid-cols-1 sm:grid-cols-3 gap-10 ${className}`}>
      {CHIFFRES_CLES.map((c) => (
        <Compteur key={c.label} valeur={c.valeur} suffixe={c.suffixe} label={c.label} />
      ))}
    </div>
  )
}
