import { Award, Users, BookOpen, Cpu } from 'lucide-react'
import Link from 'next/link'
import type { Metadata } from 'next'

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

const CERTIFICATIONS = [
  'Cisco CCNA', 'Cisco CCNP Enterprise', 'CEH v13 (EC-Council)',
  'CompTIA Security+', 'AWS Solutions Architect', 'Microsoft Azure Fundamentals',
  'ITIL 4 Foundation', 'Prince2 Practitioner', 'Google Analytics', 'HubSpot Marketing',
  'Python Institute PCEP',
]

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
              Avec plus de 12 ans d&apos;expérience, 11 certifications professionnelles et 7 années
              d&apos;enseignement, notre fondateur a bâti une équipe capable de répondre aux défis IT
              les plus complexes du marché guinéen et ouest-africain.
            </p>
            <p className="text-textdark font-light leading-relaxed">
              Notre Centre de Formation Certifiant propose des programmes reconnus internationalement,
              dispensés par des formateurs certifiés, pour développer les talents IT locaux.
            </p>
          </div>
        </div>
      </section>

      {/* Chiffres */}
      <section className="bg-bgdeep py-16">
        <div className="container-main">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              { value: '12+', label: 'Années d\'expérience' },
              { value: '11', label: 'Certifications' },
              { value: '7', label: 'Ans d\'enseignement' },
              { value: '7', label: 'Domaines de service' },
            ].map(({ value, label }) => (
              <div key={label}>
                <p className="font-display text-accent text-4xl md:text-5xl font-bold mb-2">{value}</p>
                <p className="text-textlight text-sm font-light">{label}</p>
              </div>
            ))}
          </div>
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
          <h2 className="font-display text-textdark text-3xl font-bold text-center mb-10">
            Certifications professionnelles
          </h2>
          <div className="flex flex-wrap justify-center gap-3">
            {CERTIFICATIONS.map((cert) => (
              <span
                key={cert}
                className="bg-white border border-gray-200 text-textdark text-sm font-sans font-medium px-4 py-2 rounded-btn hover:border-primary hover:text-primary transition-colors duration-150"
              >
                {cert}
              </span>
            ))}
          </div>
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

              {/*
                EMPLACEMENT PHOTO DU FONDATEUR
                ──────────────────────────────
                Quand la photo est disponible, remplacer le bloc ci-dessous par :

                import Image from 'next/image'

                <div className="relative w-44 h-44 md:w-52 md:h-52 rounded-full overflow-hidden
                                border-4 border-primary/40 shadow-lg shadow-primary/20">
                  <Image
                    src="/images/fondateur.jpg"   ← placer la photo dans /frontend/public/images/
                    alt="HABA Cece Jérôme — Fondateur LojalyxIT"
                    fill
                    className="object-cover object-top"
                    priority
                  />
                </div>
              */}
              <div className="w-44 h-44 md:w-52 md:h-52 rounded-full
                              bg-gradient-to-br from-primary/30 to-primary/10
                              border-4 border-primary/40 shadow-lg shadow-primary/20
                              flex items-center justify-center shrink-0">
                <span className="font-display text-primary text-4xl font-bold select-none tracking-wide">
                  HCJ
                </span>
              </div>

              {/* Identité */}
              <div className="text-center md:text-left">
                <p className="font-display text-title text-xl font-bold leading-snug">
                  HABA Cece Jérôme
                </p>
                <p className="text-primary text-sm font-sans font-medium mt-1">
                  Fondateur &amp; Directeur Général
                </p>
                <p className="text-muted text-xs font-light mt-0.5">
                  DevOps &amp; Systems Engineer
                </p>

                {/* Séparateur doré */}
                <div className="w-10 h-0.5 bg-accent mt-4 mx-auto md:mx-0" />
              </div>
            </div>

            {/* ── Biographie ── */}
            <div className="flex-1 space-y-6">

              {/* Paragraphe 1 */}
              <p className="text-textlight font-light leading-relaxed text-base md:text-lg">
                DevOps &amp; Systems Engineer, HABA Cece Jérôme cumule plus de douze années
                d&apos;expérience dans les technologies de l&apos;information, en Guinée comme à
                l&apos;international. Titulaire d&apos;un Master en Administration Réseaux et Systèmes
                obtenu à Sup&apos;Info Dakar et d&apos;une Maîtrise en Télécommunications de
                l&apos;Université Gamal Abdel Nasser de Conakry, il a forgé son expertise au fil de
                postes stratégiques : Responsable de la Cellule Système du projet FUGAS et Chef de
                Division Exploitation au Ministère du Travail et de la Fonction Publique, Superviseur
                Réseaux chez Orange Guinée, Coordinateur IT à la CENI, ou encore Responsable IT chez
                Likak Research à Dakar.
              </p>

              {/* Paragraphe 2 */}
              <p className="text-textlight font-light leading-relaxed text-base md:text-lg">
                Son parcours se distingue par une rare combinaison de compétences : administration des
                systèmes Linux et Windows Server, cybersécurité (Fortigate, Palo Alto), cloud computing
                (AWS), téléphonie IP et supervision réseau, ainsi qu&apos;une maîtrise des pratiques
                DevOps modernes — conteneurisation Docker, intégration et déploiement continus (CI/CD)
                et automatisation d&apos;infrastructures. Cette expertise est validée par un portefeuille
                de certifications internationales reconnues — CCNA, CSCU, RHCSA, MSCA, Python PCEP,
                Fortigate — auxquelles s&apos;ajoute une formation en cours en Intelligence
                Artificielle. Professeur d&apos;Administration Réseaux et Systèmes depuis 2018 à
                l&apos;Université Mercure International et à l&apos;Université Titi Camara, il met
                également son savoir au service de la formation de la prochaine génération de talents IT
                guinéens.
              </p>

              {/* Paragraphe 3 — avec citation mise en valeur */}
              <p className="text-textlight font-light leading-relaxed text-base md:text-lg">
                C&apos;est cette double culture — celle du terrain et celle de l&apos;enseignement, de
                l&apos;administration publique et de l&apos;entreprise — qui fonde la vision de
                LojalyxIT.
              </p>

              <blockquote className="border-l-4 border-accent pl-5 py-1">
                <p className="text-accent font-light italic leading-relaxed text-base md:text-lg">
                  &laquo;&nbsp;Mon ambition est de mettre la technologie au service de la performance
                  des organisations guinéennes, avec des solutions fiables, accessibles et alignées sur
                  les standards internationaux. La confiance se construit par l&apos;expertise, la
                  rigueur et la transparence à chaque étape.&nbsp;&raquo;
                </p>
              </blockquote>

              <p className="text-textlight font-light leading-relaxed text-base md:text-lg">
                Avec LojalyxIT, HABA Cece Jérôme entend faire de cette conviction le moteur de la
                transformation digitale en Guinée et en Afrique de l&apos;Ouest.
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
