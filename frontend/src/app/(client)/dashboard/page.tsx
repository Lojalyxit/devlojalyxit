'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { FileText, Ticket, Receipt, GraduationCap, ArrowRight } from 'lucide-react'
import { clientApi } from '@/lib/client-api'
import { useAuth } from '@/contexts/AuthContext'
import { Badge } from '@/components/ui/Badge'
import { formatDate, formatGNF } from '@/lib/utils'
import type { Contrat, Ticket as TicketType, Facture } from '@/types'

export default function DashboardPage() {
  const { user } = useAuth()
  const [contrats, setContrats] = useState<Contrat[]>([])
  const [tickets, setTickets] = useState<TicketType[]>([])
  const [factures, setFactures] = useState<Facture[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    Promise.all([
      clientApi.contrats.list(),
      clientApi.tickets.list(),
      clientApi.factures.list(),
    ]).then(([c, t, f]) => {
      setContrats(c.results)
      setTickets(t.results)
      setFactures(f.results)
    }).finally(() => setLoading(false))
  }, [])

  const contratsActifs = contrats.filter(c => c.statut === 'actif').length
  const ticketsOuverts = tickets.filter(t => t.statut === 'ouvert' || t.statut === 'en_cours').length
  const facturesImpayees = factures.filter(f => f.statut === 'impayee' || f.statut === 'en_retard').length

  const CARDS = [
    { label: 'Contrats actifs', value: contratsActifs, icon: FileText, href: '/contrats', color: 'text-primary' },
    { label: 'Tickets ouverts', value: ticketsOuverts, icon: Ticket, href: '/tickets', color: 'text-accent' },
    { label: 'Factures impayées', value: facturesImpayees, icon: Receipt, href: '/factures', color: 'text-danger' },
  ]

  return (
    <div className="p-6 md:p-8">
      {/* En-tête */}
      <div className="mb-8">
        <h1 className="font-display text-textdark text-2xl md:text-3xl font-bold mb-1">
          Bonjour, {user?.full_name?.split(' ')[0] || user?.email.split('@')[0]} 👋
        </h1>
        <p className="text-muted font-light text-sm">Voici un aperçu de votre espace client.</p>
      </div>

      {/* Cartes */}
      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 mb-8">
          {[1,2,3].map(i => <div key={i} className="card border border-gray-200 p-5 h-28 animate-pulse bg-gray-100" />)}
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 mb-8">
          {CARDS.map(({ label, value, icon: Icon, href, color }) => (
            <Link key={href} href={href} className="card border border-gray-200 p-5 hover:shadow-md transition-shadow group">
              <div className="flex items-start justify-between mb-3">
                <Icon size={20} className={color} />
                <ArrowRight size={14} className="text-muted group-hover:text-textdark transition-colors" />
              </div>
              <p className="font-display text-textdark text-3xl font-bold">{value}</p>
              <p className="text-muted text-sm font-light mt-1">{label}</p>
            </Link>
          ))}
        </div>
      )}

      {/* Tickets récents */}
      <div className="card border border-gray-200 p-5 mb-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-sans font-semibold text-textdark text-base">Tickets récents</h2>
          <Link href="/tickets" className="text-primary text-sm hover:underline flex items-center gap-1">
            Voir tout <ArrowRight size={12} />
          </Link>
        </div>
        {tickets.length === 0 ? (
          <p className="text-muted text-sm font-light py-4">Aucun ticket pour le moment.</p>
        ) : (
          <div className="space-y-3">
            {tickets.slice(0, 3).map((t) => (
              <div key={t.id} className="flex items-center justify-between gap-4 py-2 border-b border-gray-100 last:border-0">
                <div className="min-w-0">
                  <p className="text-sm text-textdark font-medium truncate">#{t.id} — {t.sujet}</p>
                  <p className="text-xs text-muted">{formatDate(t.created_at)}</p>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  <Badge variant={t.priorite === 'critique' ? 'danger' : t.priorite === 'haute' ? 'gold' : 'muted'}>
                    {t.priorite}
                  </Badge>
                  <Badge variant={t.statut === 'ouvert' ? 'green' : 'muted'}>
                    {t.statut}
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Factures récentes */}
      <div className="card border border-gray-200 p-5">
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-sans font-semibold text-textdark text-base">Factures récentes</h2>
          <Link href="/factures" className="text-primary text-sm hover:underline flex items-center gap-1">
            Voir tout <ArrowRight size={12} />
          </Link>
        </div>
        {factures.length === 0 ? (
          <p className="text-muted text-sm font-light py-4">Aucune facture pour le moment.</p>
        ) : (
          <div className="space-y-3">
            {factures.slice(0, 3).map((f) => (
              <div key={f.id} className="flex items-center justify-between gap-4 py-2 border-b border-gray-100 last:border-0">
                <div>
                  <p className="text-sm text-textdark font-medium">{f.numero}</p>
                  <p className="text-xs text-muted">Échéance : {formatDate(f.date_echeance)}</p>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  <span className="text-sm font-medium text-textdark">{formatGNF(f.montant_ttc)}</span>
                  <Badge variant={f.statut === 'payee' ? 'green' : f.statut === 'en_retard' ? 'danger' : 'muted'}>
                    {f.statut}
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
