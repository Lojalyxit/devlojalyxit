import {
  Server, Code2, Network, TrendingUp, Wrench,
  ShoppingBag, GraduationCap, LucideProps,
} from 'lucide-react'

const iconMap: Record<string, React.ElementType<LucideProps>> = {
  server: Server,
  code: Code2,
  network: Network,
  'trending-up': TrendingUp,
  tool: Wrench,
  'shopping-bag': ShoppingBag,
  'graduation-cap': GraduationCap,
}

interface ServiceIconProps extends LucideProps {
  name: string
}

export function ServiceIcon({ name, ...props }: ServiceIconProps) {
  const Icon = iconMap[name] ?? Server
  return <Icon {...props} />
}
