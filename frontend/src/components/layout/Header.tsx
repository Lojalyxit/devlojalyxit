'use client'

import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { useState } from 'react'
import { Menu, X, User, LogOut, LayoutDashboard, ShieldCheck } from 'lucide-react'
import { cn } from '@/lib/utils'
import { useAuth } from '@/contexts/AuthContext'

const NAV_LINKS = [
  { href: '/', label: 'Accueil' },
  { href: '/services', label: 'Services' },
  { href: '/formations', label: 'Formation' },
  { href: '/a-propos', label: 'À propos' },
  { href: '/contact', label: 'Contact' },
]

export function Header() {
  const pathname = usePathname()
  const router = useRouter()
  const { user, logout } = useAuth()
  const [open, setOpen] = useState(false)
  const [userMenuOpen, setUserMenuOpen] = useState(false)

  const handleLogout = () => {
    logout()
    setUserMenuOpen(false)
    router.push('/')
  }

  return (
    <header className="sticky top-0 z-50 bg-bgdark border-b border-white/5">
      <div className="max-w-container mx-auto px-5 md:px-20 flex items-center justify-between h-16">
        {/* Logo */}
        <Link href="/" className="shrink-0">
          <span className="font-display text-title text-xl font-bold leading-none">
            Lojalyx<span className="text-primary">IT</span>
          </span>
        </Link>

        {/* Navigation desktop */}
        <nav className="hidden md:flex items-center gap-6">
          {NAV_LINKS.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              className={cn(
                'font-sans text-sm transition-colors duration-150',
                pathname === href ? 'text-primary font-medium' : 'text-textlight hover:text-white',
              )}
            >
              {label}
            </Link>
          ))}
        </nav>

        {/* CTA / User desktop */}
        <div className="hidden md:flex items-center gap-3">
          {user ? (
            <div className="relative">
              <button
                onClick={() => setUserMenuOpen((v) => !v)}
                className="flex items-center gap-2 text-textlight hover:text-white text-sm transition-colors"
              >
                <div className="w-8 h-8 rounded-full bg-primary/20 border border-primary/40 flex items-center justify-center">
                  <User size={16} className="text-primary" />
                </div>
                <span className="font-medium max-w-[120px] truncate">
                  {user.full_name || user.email.split('@')[0]}
                </span>
              </button>
              {userMenuOpen && (
                <div className="absolute right-0 top-full mt-2 w-52 bg-bgdeep border border-white/10 rounded-card shadow-xl overflow-hidden">
                  <div className="px-4 py-3 border-b border-white/5">
                    <p className="text-title text-sm font-medium truncate">{user.full_name || '—'}</p>
                    <p className="text-muted text-xs truncate">{user.email}</p>
                  </div>
                  <Link
                    href="/dashboard"
                    onClick={() => setUserMenuOpen(false)}
                    className="flex items-center gap-2 px-4 py-2.5 text-textlight hover:bg-white/5 text-sm transition-colors"
                  >
                    <LayoutDashboard size={15} /> Mon espace
                  </Link>
                  {user.role === 'admin' && (
                    <Link
                      href="/admin-panel"
                      onClick={() => setUserMenuOpen(false)}
                      className="flex items-center gap-2 px-4 py-2.5 text-accent hover:bg-white/5 text-sm transition-colors border-t border-white/5"
                    >
                      <ShieldCheck size={15} /> Administration
                    </Link>
                  )}
                  <button
                    onClick={handleLogout}
                    className="w-full flex items-center gap-2 px-4 py-2.5 text-danger hover:bg-white/5 text-sm transition-colors"
                  >
                    <LogOut size={15} /> Se déconnecter
                  </button>
                </div>
              )}
            </div>
          ) : (
            <>
              <Link href="/login" className="text-textlight hover:text-white text-sm transition-colors">
                Connexion
              </Link>
              <Link href="/devis" className="btn-primary text-sm">
                Demander un devis
              </Link>
            </>
          )}
        </div>

        {/* Burger mobile */}
        <button
          className="md:hidden text-textlight p-1"
          onClick={() => setOpen((v) => !v)}
          aria-label={open ? 'Fermer le menu' : 'Ouvrir le menu'}
        >
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Menu mobile */}
      {open && (
        <div className="md:hidden bg-bgdark border-t border-white/5 px-5 py-4 flex flex-col gap-3">
          {NAV_LINKS.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              onClick={() => setOpen(false)}
              className={cn(
                'font-sans text-base py-2 border-b border-white/5',
                pathname === href ? 'text-primary font-medium' : 'text-textlight',
              )}
            >
              {label}
            </Link>
          ))}
          {user ? (
            <>
              <Link href="/dashboard" onClick={() => setOpen(false)} className="text-textlight py-2 border-b border-white/5 flex items-center gap-2">
                <LayoutDashboard size={15} /> Mon espace
              </Link>
              <button onClick={() => { handleLogout(); setOpen(false) }} className="text-danger text-left py-2 flex items-center gap-2">
                <LogOut size={15} /> Se déconnecter
              </button>
            </>
          ) : (
            <>
              <Link href="/login" onClick={() => setOpen(false)} className="text-textlight py-2 border-b border-white/5">
                Connexion
              </Link>
              <Link href="/devis" onClick={() => setOpen(false)} className="btn-primary text-center mt-2">
                Demander un devis
              </Link>
            </>
          )}
        </div>
      )}
    </header>
  )
}
