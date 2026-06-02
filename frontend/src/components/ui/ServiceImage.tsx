'use client'

import { useState } from 'react'
import Image from 'next/image'
import { ServiceIcon } from '@/components/ui/ServiceIcon'

// 8×8 SVG (#101001) — blur placeholder pendant le chargement
const BLUR_DATA_URL =
  'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI4IiBoZWlnaHQ9IjgiPjxyZWN0IHdpZHRoPSI4IiBoZWlnaHQ9IjgiIGZpbGw9IiMxMDEwMDEiLz48L3N2Zz4='

interface Props {
  src: string
  alt: string
  iconName: string
  priority?: boolean
}

export function ServiceImage({ src, alt, iconName, priority = false }: Props) {
  const [errored, setErrored] = useState(false)

  if (errored) {
    return (
      <div className="relative w-full max-w-sm aspect-square rounded-card overflow-hidden bg-bgdeep flex items-center justify-center">
        <ServiceIcon name={iconName} size={96} className="text-primary opacity-30" />
      </div>
    )
  }

  return (
    <div className="relative w-full max-w-sm aspect-square rounded-card overflow-hidden bg-bgdeep">
      <Image
        src={src}
        alt={alt}
        fill
        sizes="(max-width: 768px) 100vw, 50vw"
        quality={90}
        placeholder="blur"
        blurDataURL={BLUR_DATA_URL}
        priority={priority}
        loading={priority ? undefined : 'lazy'}
        className="object-cover"
        onError={() => setErrored(true)}
      />
    </div>
  )
}
