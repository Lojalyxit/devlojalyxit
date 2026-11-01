import { Award, Users, BookOpen, Cpu, BadgeCheck } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import type { Metadata } from 'next'
import { CHIFFRES_CLES } from '@/lib/site'
import { CERTIFICATIONS } from '@/data/certifications'
import { ChiffresCles } from '@/components/sections/ChiffresCles'

export const metadata: Metadata = {
  title: 'À propos',
  description: 'Découvrez LojalyxIT SARL : notre histoire, nos valeurs, le profil du fondateur et nos certifications professionnelles.',
}

const VALEURS = [
  {
    icon: Award,
    titre: 'Excellence',
    texte: 'Nous visons l\'excellence dans chaque projet, avec des solutions robustes et des formations de haut niveau.',
  },
  {
    icon: Users,
    titre: 'Proximité',
    texte: 'Partenaire de confiance, nous accompagnons nos clients sur le long terme avec un support réactif.',
  },
  {
    icon: BookOpen,
    titre: 'Formation',
    texte: 'Nous croyons que la montée en compétences est le meilleur investissement pour les entreprises africaines.',
  },
  {
    icon: Cpu,
    titre: 'Innovation',
    texte: 'Nous intégrons les technologies émergentes pour préparer nos clients aux défis de demain.',
  },
]

const [EXPERIENCE, NB_CERTIFICATIONS, ENSEIGNEMENT] = CHIFFRES_CLES

export default function AProposPage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-bgdark py-16 md:py-20">
        <div className="container-main text-center">
          <p className="font-script text-accent text-3xl mb-3">Notre histoire</p>
          <h1 className="font-display text-title text-4xl md:text-5xl font-bold mb-4">
            À propos de LojalyxIT
          </h1>
          <p className="text-textlight max-w-xl mx-auto font-light text-lg">
            Une entreprise guinéenne née d&apos;une passion pour la technologie et l&apos;enseignement,
            au service du développement numérique de l&apos;Afrique de l&apos;Ouest.
          </p>
        </div>
      </section>

      {/* Histoire */}
      <section className="bg-white py-16 md:py-20">
        <div className="container-main">
          <div className="max-w-3xl mx-auto">
            <h2 className="font-display text-textdark text-3xl font-bold mb-6">Notre mission</h2>
            <p className="text-textdark font-light text-lg leading-relaxed mb-6">
              LojalyxIT SARL est une entreprise de solutions IT fondée à Conakry, République de Guinée.
              Nous combinons expertise technique de haut niveau et pédagogie éprouvée pour accompagner
              les entreprises, administrations et professionnels dans leur transformation numérique.
            </p>
            <p className="text-textdark font-light leading-relaxed mb-6">
              Avec plus de {EXPERIENCE.valeur} ans d&apos;expérience, {NB_CERTIFICATIONS.valeur} certifications
              professionnelles et {ENSEIGNEMENT.valeur} années d&apos;enseignement, notre fondateur a bâti
              une équipe capable de répondre aux défis IT les plus complexes du marché guinéen et
              ouest-africain.
            </p>
            <p className="text-textdark font-light leading-relaxed">
              Notre Centre de Formation Certifiant propose des programmes reconnus internationalement,
              dispensés par des formateurs certifiés, pour développer les talents IT locaux.
            </p>
          </div>
        </div>
      </section>

      {/* Chiffres */}
      <section className="bg-bgdark py-16 md:py-20">
        <div className="container-main">
          <ChiffresCles />
        </div>
      </section>

      {/* Valeurs */}
      <section className="bg-white py-16 md:py-20">
        <div className="container-main">
          <h2 className="font-display text-textdark text-3xl font-bold text-center mb-12">
            Nos valeurs
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {VALEURS.map(({ icon: Icon, titre, texte }) => (
              <div key={titre} className="text-center">
                <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                  <Icon size={24} className="text-primary" />
                </div>
                <h3 className="font-sans font-semibold text-textdark text-lg mb-2">{titre}</h3>
                <p className="text-muted text-sm font-light leading-relaxed">{texte}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Certifications */}
      <section className="bg-gray-50 py-16 md:py-20">
        <div className="container-main">
          <h2 className="font-display text-textdark text-3xl font-bold text-center mb-3">
            Certifications professionnelles
          </h2>
          <p className="text-gray-600 text-center font-light mb-10">
            Une expertise validée par les éditeurs de référence.
          </p>
          <ul className="flex flex-wrap justify-center gap-3 md:gap-4 max-w-4xl mx-auto">
            {CERTIFICATIONS.map(({ nom, editeur }) => (
              <li
                key={nom}
                className="flex items-center gap-3 bg-white border border-gray-200 rounded-full pl-2 pr-5 py-2
                           shadow-sm hover:border-accent hover:shadow-md transition-all duration-150"
              >
                <span className="w-9 h-9 rounded-full bg-primary text-accent flex items-center justify-center shrink-0">
                  <BadgeCheck size={18} />
                </span>
                <span className="flex flex-col leading-tight">
                  <span className="font-sans font-semibold text-textdark text-sm">{nom}</span>
                  <span className="font-sans text-gray-600 text-xs">{editeur}</span>
                </span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ── Fondateur ─────────────────────────────────────────────────────── */}
      <section className="bg-bgdark py-16 md:py-24">
        <div className="container-main">

          {/* En-tête de section */}
          <div className="text-center mb-14">
            <p className="font-script text-accent text-3xl mb-3">Parcours</p>
            <h2 className="font-display text-title text-3xl md:text-4xl font-bold">
              Le mot du fondateur
            </h2>
          </div>

          {/* Layout : photo à gauche (desktop) / en haut (mobile) */}
          <div className="flex flex-col md:flex-row gap-10 md:gap-16 items-start max-w-5xl mx-auto">

            {/* ── Photo + identité ── */}
            <div className="flex flex-col items-center md:items-start gap-5 shrink-0 w-full md:w-auto">

              <div className="relative w-44 h-44 md:w-52 md:h-52 rounded-full overflow-hidden
                              border-4 border-primary/40 shadow-lg shadow-primary/20 shrink-0">
                <Image
                  src="/images/fondateur.jpg"
                  alt="HABA Cece Jérôme — Fondateur &amp; Directeur Général de LojalyxIT"
                  fill
                  className="object-cover object-top"
                  priority
                />
              </div>

              {/* Identité */}
              <div className="text-center md:text-left">
                <p className="font-display text-title text-xl font-bold leading-snug">
                  HABA Cece Jérôme
                </p>
                <p className="text-brand-green-light text-sm font-sans font-medium mt-1">
                  Fondateur &amp; Directeur Général
                </p>
                <p className="text-muted text-xs font-light mt-0.5">
                  DevOps &amp; Systems Engineer
                </p>

                {/* Séparateur doré */}
                <div className="w-10 h-0.5 bg-accent mt-4 mx-auto md:mx-0" />
              </div>
            </div>

            {/* ── Le mot du fondateur (1re personne) ── */}
            <div className="flex-1 max-w-2xl space-y-6 text-textlight font-light leading-relaxed text-base md:text-lg">
              <p>
                J&apos;ai fondé LojalyxIT avec une conviction simple : les entreprises guinéennes
                méritent des solutions informatiques de niveau international, et les talents guinéens
                méritent des formations qui les y préparent réellement.
              </p>

              <p>
                Depuis plus de douze ans, j&apos;exerce dans les technologies de l&apos;information, en
                Guinée comme à l&apos;international. Titulaire d&apos;un Master en Administration
                Réseaux et Systèmes (Sup&apos;Info Dakar) et d&apos;une Maîtrise en Télécommunications
                (Université Gamal Abdel Nasser de Conakry), j&apos;ai occupé des postes stratégiques :
                Responsable de la Cellule Système du projet FUGAS et Chef de Division Exploitation au
                Ministère du Travail et de la Fonction Publique, Superviseur Réseaux chez Orange Guinée,
                Coordinateur IT à la CENI et Responsable IT chez Likak Research à Dakar.
              </p>

              <p>
                Ces expériences m&apos;ont appris une chose : derrière chaque problème technique, il y a
                une organisation qui a besoin de fonctionner. C&apos;est pourquoi LojalyxIT ne vend pas
                seulement de la technologie, mais des solutions concrètes et durables : infrastructures
                fiables, sécurité, cloud, automatisation et logiciels sur mesure.
              </p>

              <p>
                Enseignant en Administration Réseaux et Systèmes depuis 2018, notamment à
                l&apos;Université Mercure International et à l&apos;Université Titi Camara, je crois
                profondément à la transmission. LojalyxIT Academy est née de cette conviction : former la
                prochaine génération de professionnels IT de Guinée et d&apos;Afrique de l&apos;Ouest.
              </p>

              <blockquote className="border-l-4 border-accent pl-5 py-1">
                <p className="text-accent italic">
                  Notre ambition est claire : faire de la technologie un moteur de développement pour
                  nos entreprises et notre pays.
                </p>
              </blockquote>

              <p className="pt-2 text-base">
                <strong className="font-semibold text-title">HABA Cece Jérôme</strong>, Fondateur
                &amp; Directeur Général
              </p>
            </div>
          </div>
        </div>
      </section>
      {/* ── Fin Fondateur ──────────────────────────────────────────────────── */}

      {/* CTA */}
      <section className="bg-primary py-14">
        <div className="container-main text-center">
          <h2 className="font-display text-white text-3xl font-bold mb-4">
            Travaillons ensemble
          </h2>
          <p className="text-white/80 mb-8 font-light max-w-md mx-auto">
            Vous avez un projet IT ou vous souhaitez former vos équipes ? Contactez-nous.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/devis" className="inline-flex items-center justify-center gap-2 bg-white text-primary px-8 py-4 rounded-btn font-medium hover:bg-title transition-colors duration-200">
              Demander un devis
            </Link>
            <Link href="/formations" className="inline-flex items-center justify-center gap-2 border border-white text-white px-8 py-4 rounded-btn font-medium hover:bg-white/10 transition-colors duration-200">
              Voir nos formations
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
