'use client'

import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import {
  LayoutDashboard, FileSearch, Users, FileText,
  Receipt, Ticket, GraduationCap, CalendarDays, LogOut, ShieldCheck,
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { useAuth } from '@/contexts/AuthContext'

const NAV = [
  { href: '/admin-panel', label: 'Tableau de bord', icon: LayoutDashboard, exact: true },
  { href: '/admin-panel/devis', label: 'Leads & Devis', icon: FileSearch },
  { href: '/admin-panel/clients', label: 'Clients', icon: Users },
  { href: '/admin-panel/contrats', label: 'Contrats', icon: FileText },
  { href: '/admin-panel/factures', label: 'Factures', icon: Receipt },
  { href: '/admin-panel/tickets', label: 'Tickets', icon: Ticket },
  { href: '/admin-panel/formations', label: 'Formations', icon: GraduationCap },
  { href: '/admin-panel/sessions', label: 'Sessions', icon: CalendarDays },
]

export function AdminSidebar() {
  const pathname = usePathname()
  const router = useRouter()
  const { user, logout } = useAuth()

  const isActive = (href: string, exact = false) =>
    exact ? pathname === href : pathname === href || pathname.startsWith(href + '/')

  const handleLogout = () => {
    logout()
    router.push('/')
  }

  return (
    <aside className="w-full md:w-64 shrink-0 bg-bgdark border-r border-white/5 flex flex-col">
      {/* Brand */}
      <div className="p-5 border-b border-white/5">
        <div className="flex items-center gap-2 mb-3">
          <ShieldCheck size={18} className="text-accent" />
          <span className="text-accent text-xs font-medium uppercase tracking-widest">Back-office</span>
        </div>
        <p className="font-display text-title text-lg font-bold leading-none">
          Lojalyx<span className="text-primary">IT</span>
        </p>
        <p className="text-muted text-xs mt-0.5 truncate">{user?.email}</p>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-3 overflow-y-auto">
        <ul className="space-y-0.5">
          {NAV.map(({ href, label, icon: Icon, exact }) => {
            const active = isActive(href, exact)
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

        <div className="mt-4 pt-4 border-t border-white/5">
          <a
            href="/admin"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 px-3 py-2.5 rounded-btn text-sm text-muted hover:text-textlight hover:bg-white/5 transition-colors"
          >
            <ShieldCheck size={16} />
            Django Admin
          </a>
        </div>
      </nav>

      {/* Logout */}
      <div className="p-3 border-t border-white/5">
        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-3 px-3 py-2.5 rounded-btn text-sm text-muted hover:text-danger hover:bg-white/5 transition-colors"
        >
          <LogOut size={16} /> Se déconnecter
        </button>
      </div>
    </aside>
  )
}
