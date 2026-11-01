'use client'

import { useEffect, useRef } from 'react'
import { usePathname } from 'next/navigation'
import Script from 'next/script'
import { META_PIXEL_ID, trackEvent } from '@/lib/pixel'

/**
 * Meta Pixel. Rien n'est chargé si NEXT_PUBLIC_META_PIXEL_ID est vide.
 * - PageView initial envoyé par le script de base
 * - PageView à chaque changement de page (navigation côté client de Next.js)
 * Les événements Lead / Contact / InitiateCheckout sont envoyés via trackEvent().
 */
export function MetaPixel() {
  const pathname = usePathname()
  const premierRendu = useRef(true)

  useEffect(() => {
    if (!META_PIXEL_ID) return
    if (premierRendu.current) {
      premierRendu.current = false // le PageView initial est envoyé par le script de base
      return
    }
    trackEvent('PageView')
  }, [pathname])

  if (!META_PIXEL_ID || !/^\d+$/.test(META_PIXEL_ID)) return null

  return (
    <>
      <Script id="meta-pixel" strategy="afterInteractive">
        {`!function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?
n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;
n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;
t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window,
document,'script','https://connect.facebook.net/en_US/fbevents.js');
fbq('init','${META_PIXEL_ID}');
fbq('track','PageView');`}
      </Script>
      <noscript>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          height="1"
          width="1"
          style={{ display: 'none' }}
          alt=""
          src={`https://www.facebook.com/tr?id=${META_PIXEL_ID}&ev=PageView&noscript=1`}
        />
      </noscript>
    </>
  )
}
