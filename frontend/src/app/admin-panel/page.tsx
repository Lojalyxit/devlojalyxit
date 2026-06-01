'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { FileSearch, Users, Ticket, Receipt, CalendarDays, ArrowRight, TrendingUp } from 'lucide-react'
import { adminApi } from '@/lib/admin-api'
import { Badge } from '@/components/ui/Badge'
import { formatDate } from '@/lib/utils'
import type { AdminDevis } from '@/lib/admin-api'
import type { Ticket as TicketType } from '@/types'

interface Stats {
  totalDevis: number
  devisNouveaux: number
  totalClients: number
  ticketsOuverts: number
  facturesImpayees: number
  sessionsOuvertes: number
}

const DEVIS_STATUT_BADGE: Record<string, 'gold' | 'green' | 'muted' | 'danger'> = {
  nouveau: 'gold', en_cours: 'gold', envoye: 'muted', gagne: 'green', perdu: 'danger',
}

export default function AdminDashboard() {
  const [stats, setStats] = useState<Stats | null>(null)
  const [recentDevis, setRecentDevis] = useState<AdminDevis[]>([])
  const [recentTickets, setRecentTickets] = useState<TicketType[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    adminApi.stats
      .fetch()
      .then(([devis, clients, tickets, factures, sessions]) => {
        setStats({
          totalDevis: devis.count,
          devisNouveaux: devis.results.filter((d) => d.statut === 'nouveau').length,
          totalClients: clients.count,
          ticketsOuverts: tickets.results.filter((t) => t.statut === 'ouvert' || t.statut === 'en_cours').length,
          facturesImpayees: factures.results.filter((f) => f.statut !== 'payee').length,
          sessionsOuvertes: sessions.results.filter((s) => s.statut === 'ouverte').length,
        })
        setRecentDevis(devis.results.slice(0, 5))
        setRecentTickets(tickets.results.slice(0, 5))
      })
      .finally(() => setLoading(false))
  }, [])

  const STAT_CARDS = [
    { label: 'Total devis', value: stats?.totalDevis ?? '—', sub: `${stats?.devisNouveaux ?? 0} nouveaux`, icon: FileSearch, href: '/admin-panel/devis', color: 'text-primary' },
    { label: 'Clients', value: stats?.totalClients ?? '—', sub: 'comptes actifs', icon: Users, href: '/admin-panel/clients', color: 'text-accent' },
    { label: 'Tickets ouverts', value: stats?.ticketsOuverts ?? '—', sub: 'en attente', icon: Ticket, href: '/admin-panel/tickets', color: 'text-danger' },
    { label: 'Factures impayées', value: stats?.facturesImpayees ?? '—', sub: 'à relancer', icon: Receipt, href: '/admin-panel/factures', color: 'text-danger' },
    { label: 'Sessions ouvertes', value: stats?.sessionsOuvertes ?? '—', sub: 'inscriptions actives', icon: CalendarDays, href: '/admin-panel/sessions', color: 'text-green-500' },
  ]

  return (
    <div className="p-6 md:p-8">
      <div className="flex items-center gap-3 mb-8">
        <TrendingUp size={22} className="text-primary" />
        <div>
          <h1 className="font-display text-textdark text-2xl md:text-3xl font-bold">Tableau de bord</h1>
          <p className="text-muted text-sm font-light">Vue d&apos;ensemble de l&apos;activité LojalyxIT</p>
        </div>
      </div>

      {/* Stat cards */}
      <div className="grid grid-cols-2 lg:grid-cols-5 gap-4 mb-8">
        {STAT_CARDS.map(({ label, value, sub, icon: Icon, href, color }) => (
          <Link key={href} href={href} className="card border border-gray-200 p-4 hover:shadow-md transition-shadow group">
            <div className="flex items-center justify-between mb-2">
              <Icon size={18} className={color} />
              <ArrowRight size={12} className="text-muted group-hover:text-textdark transition-colors" />
            </div>
            <p className="font-display text-textdark text-2xl font-bold">{loading ? '—' : value}</p>
            <p className="text-muted text-xs font-light mt-0.5">{label}</p>
            <p className="text-xs text-muted/70 mt-0.5 italic">{sub}</p>
          </Link>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Devis récents */}
        <div className="card border border-gray-200 p-5">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-sans font-semibold text-textdark text-base">Derniers devis</h2>
            <Link href="/admin-panel/devis" className="text-primary text-sm hover:underline flex items-center gap-1">
              Voir tout <ArrowRight size={12} />
            </Link>
          </div>
          {loading ? (
            <div className="space-y-3">{[1,2,3].map(i => <div key={i} className="h-10 bg-gray-100 rounded animate-pulse" />)}</div>
          ) : recentDevis.length === 0 ? (
            <p className="text-muted text-sm font-light">Aucun devis.</p>
          ) : (
            <div className="space-y-3">
              {recentDevis.map((d) => (
                <div key={d.id} className="flex items-center justify-between gap-3 py-1.5 border-b border-gray-100 last:border-0">
                  <div className="min-w-0">
                    <p className="text-sm text-textdark font-medium truncate">{d.nom} {d.societe && <span className="text-muted font-light">— {d.societe}</span>}</p>
                    <p className="text-xs text-muted">{formatDate(d.created_at)}</p>
                  </div>
                  <Badge variant={DEVIS_STATUT_BADGE[d.statut]}>{d.statut}</Badge>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Tickets récents */}
        <div className="card border border-gray-200 p-5">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-sans font-semibold text-textdark text-base">Tickets récents</h2>
            <Link href="/admin-panel/tickets" className="text-primary text-sm hover:underline flex items-center gap-1">
              Voir tout <ArrowRight size={12} />
            </Link>
          </div>
          {loading ? (
            <div className="space-y-3">{[1,2,3].map(i => <div key={i} className="h-10 bg-gray-100 rounded animate-pulse" />)}</div>
          ) : recentTickets.length === 0 ? (
            <p className="text-muted text-sm font-light">Aucun ticket.</p>
          ) : (
            <div className="space-y-3">
              {recentTickets.map((t) => (
                <div key={t.id} className="flex items-center justify-between gap-3 py-1.5 border-b border-gray-100 last:border-0">
                  <div className="min-w-0">
                    <p className="text-sm text-textdark font-medium truncate">#{t.id} — {t.sujet}</p>
                    <p className="text-xs text-muted">{t.client_email}</p>
                  </div>
                  <div className="flex gap-1.5 shrink-0">
                    <Badge variant={t.priorite === 'critique' ? 'danger' : t.priorite === 'haute' ? 'gold' : 'muted'}>{t.priorite}</Badge>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
