import { Info } from 'lucide-react'

/**
 * Mention obligatoire : la formation prépare à une certification d'éditeur, mais LojalyxIT
 * délivre une attestation de formation (la certification s'obtient auprès de l'éditeur).
 * N'affiche rien si l'organisme n'est pas renseigné.
 */
export function MentionCertification({
  organisme,
  variant = 'dark',
  className = '',
}: {
  organisme: string | null | undefined
  variant?: 'dark' | 'light'
  className?: string
}) {
  if (!organisme) return null

  const styles =
    variant === 'dark'
      ? 'bg-accent/10 border-accent/40 text-textlight'
      : 'bg-amber-50 border-amber-200 text-gray-700'

  return (
    <aside role="note" className={`flex gap-3 rounded-card border p-4 text-sm leading-relaxed ${styles} ${className}`}>
      <Info size={18} className={`shrink-0 mt-0.5 ${variant === 'dark' ? 'text-accent' : 'text-amber-700'}`} />
      <p>
        Cette formation prépare à l&apos;examen de certification officiel <strong>{organisme}</strong>.
        À l&apos;issue de la formation, LojalyxIT délivre une <strong>attestation de formation</strong>.
        La certification officielle s&apos;obtient en passant l&apos;examen auprès de {organisme} ou
        d&apos;un centre agréé ; les frais d&apos;examen ne sont pas inclus sauf mention contraire.
      </p>
    </aside>
  )
}
