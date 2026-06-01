'use client'

import { usePathname } from 'next/navigation'
import { useEffect, useRef, useState } from 'react'

export function NavigationProgress() {
  const pathname = usePathname()
  const [width, setWidth] = useState(0)
  const [visible, setVisible] = useState(false)
  const timers = useRef<ReturnType<typeof setTimeout>[]>([])

  const clear = () => timers.current.forEach(clearTimeout)

  useEffect(() => {
    clear()
    setVisible(true)
    setWidth(0)

    const t1 = setTimeout(() => setWidth(40), 50)
    const t2 = setTimeout(() => setWidth(65), 200)
    const t3 = setTimeout(() => setWidth(85), 500)
    const t4 = setTimeout(() => setWidth(100), 700)
    const t5 = setTimeout(() => setVisible(false), 950)

    timers.current = [t1, t2, t3, t4, t5]
    return clear
  }, [pathname])

  if (!visible && width === 0) return null

  return (
    <div
      className="fixed top-0 left-0 z-[200] h-[3px] bg-primary transition-all ease-out"
      style={{
        width: `${width}%`,
        transitionDuration: width === 0 ? '0ms' : width === 100 ? '150ms' : '400ms',
        opacity: visible ? 1 : 0,
      }}
    />
  )
}
