import Image from 'next/image'

const REFERENCES = [
  {
    name: 'Ministère du Travail et de la Fonction Publique',
    file: 'ministere-travail.svg',
  },
  { name: 'Orange Guinée', file: 'orange-guinee.svg' },
  {
    name: 'CENI — Commission Électorale Nationale Indépendante',
    file: 'ceni.svg',
  },
  { name: 'Université Mercure International', file: 'universite-mercure.svg' },
  { name: 'Université Titi Camara', file: 'universite-titi-camara.svg' },
  { name: 'Likak Research', file: 'likak-research.svg' },
  { name: 'Chambre des Mines de Guinée', file: 'chambre-mines.svg' },
  { name: 'Sotelgui S.A', file: 'sotelgui.svg' },
]

// Pour remplacer un placeholder par le vrai logo :
// déposez le fichier dans frontend/public/images/references/
// et mettez à jour le champ `file` dans le tableau REFERENCES ci-dessus.

export default function ReferencesSection() {
  return (
    <section className="bg-bgdeep py-20 md:py-28">
      <div className="container-main">

        {/* En-tête */}
        <div className="text-center mb-12">
          <h2 className="font-display text-title text-3xl md:text-4xl font-bold mb-4">
            Ils m&apos;ont fait confiance
          </h2>
          <p className="text-textlight font-light max-w-2xl mx-auto leading-relaxed">
            Le fondateur de LojalyxIT a accompagné des institutions et entreprises
            de référence en Guinée et à l&apos;international.
          </p>
          <p className="text-muted font-light text-xs mt-3 max-w-xl mx-auto">
            * Références professionnelles de HABA Cece Jérôme, fondateur —
            et non des partenariats commerciaux actuels de LojalyxIT.
          </p>
        </div>

        {/* Grille logos — 2 col mobile / 3 tablette / 4 desktop */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
          {REFERENCES.map((ref) => (
            <div
              key={ref.file}
              className="group flex items-center justify-center p-5 md:p-6 rounded-card border border-accent/10 hover:border-accent/30 bg-black/20 transition-all duration-300 cursor-default"
              title={ref.name}
            >
              <div className="relative w-full h-14 md:h-16 grayscale opacity-70 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-500 ease-out">
                <Image
                  src={`/images/references/${ref.file}`}
                  alt={ref.name}
                  fill
                  sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                  className="object-contain"
                  unoptimized
                />
              </div>
            </div>
          ))}
        </div>

        {/* Note de bas de section */}
        <p className="text-center text-muted font-light italic text-sm mt-10">
          Une expérience de plus de 12 ans au service d&apos;institutions publiques,
          d&apos;opérateurs télécoms et d&apos;établissements universitaires.
        </p>

      </div>
    </section>
  )
}
