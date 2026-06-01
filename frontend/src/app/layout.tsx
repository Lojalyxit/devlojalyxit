import type { Metadata } from 'next'
import { Playfair_Display, Great_Vibes, Poppins } from 'next/font/google'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { AuthProvider } from '@/contexts/AuthContext'
import { NavigationProgress } from '@/components/ui/NavigationProgress'
import './globals.css'

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
  display: 'swap',
})

const greatVibes = Great_Vibes({
  weight: '400',
  subsets: ['latin'],
  variable: '--font-great-vibes',
  display: 'swap',
})

const poppins = Poppins({
  weight: ['300', '400', '500', '600'],
  subsets: ['latin'],
  variable: '--font-poppins',
  display: 'swap',
})

export const metadata: Metadata = {
  title: {
    default: 'LojalyxIT — Solutions IT & Centre de Formation | Conakry',
    template: '%s | LojalyxIT',
  },
  description:
    'LojalyxIT SARL : cloud, cybersécurité, développement logiciel, réseau, marketing digital et centre de formation certifiant à Conakry, Guinée.',
  metadataBase: new URL('https://lojalyxit.com'),
  keywords: ['IT Conakry', 'formation CCNA', 'cybersécurité Guinée', 'développement logiciel', 'cloud Afrique'],
  openGraph: {
    type: 'website',
    locale: 'fr_GN',
    url: 'https://lojalyxit.com',
    siteName: 'LojalyxIT',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="fr"
      className={`${playfair.variable} ${greatVibes.variable} ${poppins.variable}`}
    >
      <body className="font-sans antialiased flex flex-col min-h-screen">
        <AuthProvider>
          <NavigationProgress />
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
        </AuthProvider>
      </body>
    </html>
  )
}
