import type { Metadata } from 'next'
import { ContactForm } from './ContactForm'
import { MapPin, Phone, Mail, Clock } from 'lucide-react'
import { ADRESSE, EMAIL_PUBLIC, HORAIRES_AFFICHES, TELEPHONE_AFFICHE, TELEPHONE_HREF } from '@/lib/site'
import { WhatsAppLink } from '@/components/ui/WhatsAppLink'
import { WhatsAppIcon } from '@/components/ui/WhatsAppIcon'

export const metadata: Metadata = {
  title: 'Contact',
  description: 'Contactez LojalyxIT à Conakry. Formulaire en ligne, WhatsApp, email ou téléphone — nous répondons sous 24h.',
}

const MAP_QUERY = encodeURIComponent(`${ADRESSE.quartier}, ${ADRESSE.commune}, ${ADRESSE.ville}, Guinée`)
const MAP_EMBED_URL = `https://www.google.com/maps?q=${MAP_QUERY}&z=16&hl=fr&output=embed`
const MAP_LINK_URL = `https://www.google.com/maps/search/?api=1&query=${MAP_QUERY}`

const INFOS:{ icon: typeof MapPin; titre: string; lines: { texte: string; href?: string }[] }[] = [
  {
    icon: MapPin,
    titre: 'Adresse',
    lines: [{ texte: ADRESSE.ligne1 }, { texte: ADRESSE.ligne2 }],
  },
  {
    icon: Mail,
    titre: 'Email',
    lines: [{ texte: EMAIL_PUBLIC, href: `mailto:${EMAIL_PUBLIC}` }],
  },
  {
    icon: Phone,
    titre: 'Téléphone',
    lines: [{ texte: TELEPHONE_AFFICHE, href: TELEPHONE_HREF }],
  },
  {
    icon: Clock,
    titre: 'Disponibilité',
    lines: [{ texte: HORAIRES_AFFICHES }, { texte: 'Support 7J/7' }],
  },
]

export default function ContactPage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-bgdark py-14 md:py-16">
        <div className="container-main text-center">
          <h1 className="font-display text-title text-4xl md:text-5xl font-bold mb-4">
            Contactez-nous
          </h1>
          <p className="text-textlight max-w-xl mx-auto font-light text-lg">
            Une question, un projet, ou vous souhaitez un diagnostic IT gratuit ?
            Notre équipe vous répond sous 24h.
          </p>
        </div>
      </section>

      {/* Contenu */}
      <section className="bg-white py-16 md:py-20">
        <div className="container-main">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-14">
            {/* Formulaire */}
            <div>
              <h2 className="font-display text-textdark text-2xl font-bold mb-8">
                Envoyez-nous un message
              </h2>
              <ContactForm />
            </div>

            {/* Informations */}
            <div>
              <h2 className="font-display text-textdark text-2xl font-bold mb-8">
                Nos coordonnées
              </h2>
              <div className="space-y-8">
                {INFOS.map(({ icon: Icon, titre, lines }) => (
                  <div key={titre} className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                      <Icon size={18} className="text-primary" />
                    </div>
                    <div>
                      <p className="font-sans font-semibold text-textdark text-sm mb-1">{titre}</p>
                      {lines.map(({ texte, href }) =>
                        href ? (
                          <a
                            key={texte}
                            href={href}
                            className="block text-gray-600 text-sm hover:text-primary underline-offset-2 hover:underline"
                          >
                            {texte}
                          </a>
                        ) : (
                          <p key={texte} className="text-gray-600 text-sm">{texte}</p>
                        ),
                      )}
                    </div>
                  </div>
                ))}
              </div>

              <WhatsAppLink
                contexte="page contact"
                className="mt-8 inline-flex items-center justify-center gap-2 w-full sm:w-auto rounded-btn
                  bg-[#25D366] hover:bg-[#1EBE5A] text-white font-sans font-medium px-6 py-3 transition-colors duration-200"
              >
                <WhatsAppIcon size={20} /> Écrire sur WhatsApp
              </WhatsAppLink>

              {/* Carte Google Maps (embed sans clé API ; domaine www.google.com pour la CSP frame-src) */}
              <div className="mt-10 rounded-card overflow-hidden border border-gray-200 bg-gray-100
                              h-64 sm:h-80 lg:h-96 shadow-sm">
                <iframe
                  src={MAP_EMBED_URL}
                  className="w-full h-full block"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Carte : LojalyxIT, Almamy, Kaloum, Conakry, Guinée"
                />
              </div>
              <a
                href={MAP_LINK_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 mt-3 text-sm text-gray-600 hover:text-primary hover:underline underline-offset-2"
              >
                <MapPin size={14} /> Ouvrir dans Google Maps
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
