import type { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'LojalyxIT',
    short_name: 'LojalyxIT',
    description: 'Solutions IT & Centre de Formation certifiant à Conakry',
    start_url: '/',
    display: 'standalone',
    theme_color: '#074525',
    background_color: '#0A0A0A',
    icons: [
      {
        src: '/icon-512.png',
        sizes: '512x512',
        type: 'image/png',
        purpose: 'any',
      },
      {
        src: '/apple-icon.png',
        sizes: '180x180',
        type: 'image/png',
      },
    ],
  }
}
