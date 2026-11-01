import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight, CheckCircle2 } from 'lucide-react'
import { messageWhatsAppService, type ServiceOffre } from '@/data/services'
import { WhatsAppLink } from '@/components/ui/WhatsAppLink'
import { WhatsAppIcon } from '@/components/ui/WhatsAppIcon'

/**
 * Carte service « Problème → Solution » :
 * problème (question) → solution → 3 bénéfices → CTA devis + WhatsApp → technologies.
 */
export function ServiceCard({ service, showTechnologies = true }: { service: ServiceOffre; showTechnologies?: boolean }) {
  const Icon = service.icone

  return (
    <article
      id={service.slug}
      className="scroll-mt-24 h-full flex flex-col bg-white rounded-card border border-gray-200 overflow-hidden
                 shadow-sm hover:shadow-[0_10px_30px_rgba(42,74,58,0.15)] hover:border-primary/40
                 transition-[box-shadow,border-color] duration-200"
    >
      {/* Visuel */}
      <div className="relative h-36 bg-bgdark overflow-hidden">
        {service.image ? (
          <Image
            src={service.image.src}
            alt={service.image.alt}
            fill
            sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
            className="object-cover opacity-80"
          />
        ) : (
          <div className="absolute inset-0 bg-gradient-to-br from-primary via-bgdeep to-bgdark" aria-hidden="true" />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-bgdark/90 via-bgdark/30 to-transparent" aria-hidden="true" />
        <div className="absolute bottom-4 left-5 right-5 flex items-center gap-3">
          <span className="w-11 h-11 rounded-full bg-primary border border-accent/60 text-accent flex items-center justify-center shrink-0">
            <Icon size={22} />
          </span>
          <h3 className="font-sans font-semibold text-white text-lg leading-tight">{service.titre}</h3>
        </div>
      </div>

      <div className="flex-1 flex flex-col p-6">
        {/* 1. Le problème */}
        <p className="text-xs font-sans font-semibold uppercase tracking-wider text-primary mb-1.5">
          Le problème
        </p>
        <p className="font-sans font-bold text-textdark text-lg leading-snug mb-5">{service.probleme}</p>

        {/* 2. Notre solution */}
        <p className="text-xs font-sans font-semibold uppercase tracking-wider text-primary mb-1.5">
          Notre solution
        </p>
        <p className="text-gray-700 text-[15px] leading-relaxed mb-5">{service.solution}</p>

        {/* 3. Ce que vous obtenez */}
        <p className="text-xs font-sans font-semibold uppercase tracking-wider text-primary mb-2">
          Ce que vous obtenez
        </p>
        <ul className="space-y-2 mb-6">
          {service.benefices.map((b) => (
            <li key={b} className="flex items-start gap-2 text-[15px] text-textdark">
              <CheckCircle2 size={18} className="text-primary mt-0.5 shrink-0" />
              <span>{b}</span>
            </li>
          ))}
        </ul>

        {/* 4. Actions */}
        <div className="mt-auto flex flex-col gap-3">
          <Link
            href={`/contact?sujet=${service.sujet}`}
            className="btn-primary inline-flex items-center justify-center gap-2 w-full"
          >
            Demander un devis <ArrowRight size={16} />
          </Link>
          <WhatsAppLink
            message={messageWhatsAppService(service.titre)}
            contexte={service.titre}
            className="inline-flex items-center justify-center gap-2 text-sm font-medium text-primary
                       hover:text-primary-dark hover:underline underline-offset-2 py-1"
          >
            <WhatsAppIcon size={16} className="text-[#1EBE5A]" /> En parler sur WhatsApp
          </WhatsAppLink>
        </div>

        {showTechnologies && service.technologies.length > 0 && (
          <p className="mt-5 pt-4 border-t border-gray-100 text-xs text-gray-500">
            <span className="font-medium">Technologies :</span> {service.technologies.join(' · ')}
          </p>
        )}
      </div>
    </article>
  )
}
