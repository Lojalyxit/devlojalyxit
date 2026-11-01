import {
  ADRESSE, EMAIL_PUBLIC, NOM_SOCIETE, SITE_URL, SLOGAN, TELEPHONE_E164, lienWhatsApp,
} from '@/lib/site'

/** Données structurées schema.org LocalBusiness (SEO local / Google Business). */
export function LocalBusinessJsonLd() {
  const data = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    '@id': `${SITE_URL}/#organisation`,
    name: NOM_SOCIETE,
    alternateName: 'LojalyxIT',
    slogan: SLOGAN,
    url: SITE_URL,
    logo: `${SITE_URL}/icon-512.png`,
    image: `${SITE_URL}/icon-512.png`,
    telephone: TELEPHONE_E164,
    email: EMAIL_PUBLIC,
    address: {
      '@type': 'PostalAddress',
      streetAddress: `${ADRESSE.quartier}, ${ADRESSE.commune}`,
      addressLocality: ADRESSE.ville,
      addressRegion: ADRESSE.commune,
      addressCountry: ADRESSE.codePays,
    },
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
        opens: '08:00',
        closes: '18:00',
      },
    ],
    areaServed: ['Guinée', "Afrique de l'Ouest"],
    sameAs: [lienWhatsApp()],
  }

  return (
    <script
      type="application/ld+json"
      // JSON.stringify n'échappe pas « < » : on le fait pour éviter toute injection de balise
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, '\\u003c') }}
    />
  )
}
