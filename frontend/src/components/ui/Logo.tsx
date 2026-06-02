import { cn } from '@/lib/utils'

const SIZE: Record<string, string> = {
  sm: 'text-lg',
  md: 'text-xl',
  lg: 'text-2xl',
}

interface Props {
  size?: 'sm' | 'md' | 'lg'
  className?: string
}

export function Logo({ size = 'md', className }: Props) {
  return (
    <span className={cn('inline-flex flex-col items-center leading-none', className)}>
      <span className={cn('font-display text-title font-bold', SIZE[size])}>
        Lojalyx<span className="text-primary">IT</span>
      </span>
      {/* Sparkle 4 branches doré — centré sous le texte */}
      <svg
        width="10"
        height="10"
        viewBox="0 0 10 10"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="mt-1 text-accent"
        aria-hidden="true"
      >
        <path
          d="M5 0L5.65 4.35L10 5L5.65 5.65L5 10L4.35 5.65L0 5L4.35 4.35Z"
          fill="currentColor"
        />
      </svg>
    </span>
  )
}
