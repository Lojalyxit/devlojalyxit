'use client'

import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import {
  LayoutDashboard, FileText, Ticket, Receipt,
  GraduationCap, LogOut, User,
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { useAuth } from '@/contexts/AuthContext'

const NAV = [
  { href: '/dashboard', label: 'Tableau de bord', icon: LayoutDashboard },
  { href: '/contrats', label: 'Mes contrats', icon: FileText },
  { href: '/tickets', label: 'Mes tickets', icon: Ticket },
  { href: '/factures', label: 'Mes factures', icon: Receipt },
  { href: '/mes-formations', label: 'Mes formations', icon: GraduationCap },
]

export function ClientSidebar() {
  const pathname = usePathname()
  const router = useRouter()
  const { user, logout } = useAuth()

  const handleLogout = () => {
    logout()
    router.push('/')
  }

  return (
    <aside className="w-full md:w-60 shrink-0 bg-bgdark border-r border-white/5 flex flex-col">
      {/* User info */}
      <div className="p-5 border-b border-white/5">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-primary/20 border border-primary/30 flex items-center justify-center shrink-0">
            <User size={18} className="text-primary" />
          </div>
          <div className="min-w-0">
            <p className="text-title text-sm font-medium truncate">{user?.full_name || '—'}</p>
            <p className="text-muted text-xs truncate">{user?.email}</p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-3">
        <ul className="space-y-1">
          {NAV.map(({ href, label, icon: Icon }) => {
            const active = pathname === href
            return (
              <li key={href}>
                <Link
                  href={href}
                  className={cn(
                    'flex items-center gap-3 px-3 py-2.5 rounded-btn text-sm transition-colors duration-150',
                    active
                      ? 'bg-primary/10 text-primary font-medium'
                      : 'text-textlight hover:bg-white/5 hover:text-white',
                  )}
                >
                  <Icon size={16} className={active ? 'text-primary' : 'text-muted'} />
                  {label}
                </Link>
              </li>
            )
          })}
        </ul>
      </nav>

      {/* Logout */}
      <div className="p-3 border-t border-white/5">
        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-3 px-3 py-2.5 rounded-btn text-sm text-muted hover:text-danger hover:bg-white/5 transition-colors"
        >
          <LogOut size={16} />
          Se déconnecter
        </button>
      </div>
    </aside>
  )
}
