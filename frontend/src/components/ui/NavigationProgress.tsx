'use client'

import { usePathname } from 'next/navigation'
import { useEffect, useRef, useState, useCallback } from 'react'

export function NavigationProgress() {
  const pathname = usePathname()
  const [width, setWidth] = useState(0)
  const [visible, setVisible] = useState(false)
  const timers = useRef<ReturnType<typeof setTimeout>[]>([])
  const prevPathname = useRef(pathname)
  const started = useRef(false)

  const clearTimers = () => timers.current.forEach(clearTimeout)

  const start = useCallback(() => {
    if (started.current) return
    started.current = true
    clearTimers()
    setVisible(true)
    setWidth(0)
    // Progression simulée : démarre immédiatement, ralentit avant 90%
    const t1 = setTimeout(() => setWidth(15), 30)
    const t2 = setTimeout(() => setWidth(40), 150)
    const t3 = setTimeout(() => setWidth(60), 500)
    const t4 = setTimeout(() => setWidth(75), 1200)
    const t5 = setTimeout(() => setWidth(88), 2500)
    // Plafond à 92% — completion arrive via pathname change
    const t6 = setTimeout(() => setWidth(92), 4000)
    timers.current = [t1, t2, t3, t4, t5, t6]
  }, [])

  const finish = useCallback(() => {
    started.current = false
    clearTimers()
    setWidth(100)
    const t1 = setTimeout(() => setVisible(false), 350)
    const t2 = setTimeout(() => setWidth(0), 450)
    timers.current = [t1, t2]
  }, [])

  // Démarre dès le clic sur un lien de navigation interne
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      const a = (e.target as HTMLElement).closest('a[href]') as HTMLAnchorElement | null
      if (!a) return
      const href = a.getAttribute('href') ?? ''
      if (
        !href.startsWith('/') ||
        href.startsWith('/#') ||
        a.target === '_blank' ||
        e.ctrlKey || e.metaKey || e.shiftKey
      ) return
      // Ne démarre pas si c'est la même page
      const targetPath = href.split('?')[0].split('#')[0]
      if (targetPath === window.location.pathname) return
      start()
    }
    document.addEventListener('click', onClick, true)
    return () => document.removeEventListener('click', onClick, true)
  }, [start])

  // Termine dès que pathname change (navigation réussie)
  useEffect(() => {
    if (pathname !== prevPathname.current) {
      prevPathname.current = pathname
      finish()
    }
  }, [pathname, finish])

  if (!visible) return null

  return (
    <div
      aria-hidden="true"
      className="fixed top-0 left-0 z-[200] h-[3px] bg-primary pointer-events-none"
      style={{
        width: `${width}%`,
        transition: width === 0
          ? 'none'
          : width === 100
            ? 'width 200ms ease-out'
            : 'width 600ms ease-out',
      }}
    />
  )
}
