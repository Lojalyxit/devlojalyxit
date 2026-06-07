import type { Metadata } from 'next'
import { ContactForm } from './ContactForm'
import { MapPin, Phone, Mail, Clock } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Contact',
  description: 'Contactez LojalyxIT à Conakry. Formulaire en ligne, email ou téléphone — nous répondons sous 24h.',
}

const INFOS = [
  {
    icon: MapPin,
    titre: 'Adresse',
    lines: ['Almamy, Kaloum', 'Conakry, République de Guinée'],
  },
  {
    icon: Mail,
    titre: 'Email',
    lines: ['ceo@lojalyxit.com'],
  },
  {
    icon: Phone,
    titre: 'Téléphone',
    lines: ['+224 622 36 54 20'],
  },
  {
    icon: Clock,
    titre: 'Disponibilité',
    lines: ['Lun — Ven : 8h00 — 18h00', 'Support 7J/7'],
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
                      {lines.map((line) => (
                        <p key={line} className="text-muted text-sm font-light">{line}</p>
                      ))}
                    </div>
                  </div>
                ))}
              </div>

              {/* Carte Google Maps */}
              <div className="mt-10 rounded-card overflow-hidden border border-gray-200 h-56">
                <iframe
                  src="https://maps.google.com/maps?q=Almamy+Kaloum+Conakry+Guin%C3%A9e&output=embed&z=15&hl=fr"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="LojalyxIT — Almamy, Kaloum, Conakry"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
