'use client'

import { Play } from 'lucide-react'

interface Props {
  videoUrl?: string | null
  disponible: boolean
  titre: string
}

function getYoutubeEmbedUrl(url: string): string | null {
  const m = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([A-Za-z0-9_-]{11})/)
  return m ? `https://www.youtube.com/embed/${m[1]}` : null
}

export function VideoPlayer({ videoUrl, disponible, titre }: Props) {
  if (disponible && videoUrl) {
    const youtubeEmbed = getYoutubeEmbedUrl(videoUrl)

    if (youtubeEmbed) {
      return (
        <div className="relative aspect-video rounded-card overflow-hidden bg-bgdeep">
          <iframe
            src={youtubeEmbed}
            title={titre}
            className="w-full h-full"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>
      )
    }

    // Vimeo ou autre iframe
    if (videoUrl.includes('vimeo.com') || videoUrl.startsWith('http')) {
      const isDirectVideo = /\.(mp4|webm|ogg)(\?|$)/i.test(videoUrl)
      if (isDirectVideo) {
        return (
          <div className="relative aspect-video rounded-card overflow-hidden bg-bgdeep">
            <video controls className="w-full h-full" title={titre}>
              <source src={videoUrl} />
              Votre navigateur ne supporte pas la lecture vidéo.
            </video>
          </div>
        )
      }
      return (
        <div className="relative aspect-video rounded-card overflow-hidden bg-bgdeep">
          <iframe
            src={videoUrl}
            title={titre}
            className="w-full h-full"
            allowFullScreen
          />
        </div>
      )
    }
  }

  // Placeholder — vidéo non encore disponible
  return (
    <div className="relative aspect-video rounded-card overflow-hidden bg-bgdeep flex flex-col items-center justify-center gap-3">
      <div className="w-14 h-14 rounded-full border-2 border-primary/30 flex items-center justify-center">
        <Play size={22} className="text-primary opacity-30 ml-1" />
      </div>
      <p className="text-muted text-sm font-light font-sans">Vidéo bientôt disponible</p>
    </div>
  )
}
