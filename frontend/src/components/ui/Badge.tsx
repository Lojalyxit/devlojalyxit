import { cn } from '@/lib/utils'

type BadgeVariant = 'gold' | 'green' | 'muted' | 'danger'

interface BadgeProps {
  variant?: BadgeVariant
  className?: string
  children: React.ReactNode
}

const variantClasses: Record<BadgeVariant, string> = {
  gold: 'bg-accent text-bgdark',
  green: 'bg-primary text-white',
  muted: 'bg-muted/20 text-muted',
  danger: 'bg-danger/10 text-danger',
}

export function Badge({ variant = 'gold', className, children }: BadgeProps) {
  return (
    <span
      className={cn(
        'inline-block rounded px-2.5 py-0.5 text-xs font-medium font-sans',
        variantClasses[variant],
        className,
      )}
    >
      {children}
    </span>
  )
}
