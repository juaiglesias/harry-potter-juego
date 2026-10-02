import { useEffect, useRef } from 'react'
import type { CasaId } from '../../domain'
import './SorteoAnimacion.css'

interface SorteoAnimacionProps {
  casa: CasaId
  onFinalizar: () => void
}

/**
 * Overlay a pantalla completa con el video de la casa sorteada. No ofrece
 * forma de saltearlo: se cierra solo al terminar o si el video falla, para
 * no dejar trabado al anfitrión en pleno evento.
 */
export function SorteoAnimacion({ casa, onFinalizar }: SorteoAnimacionProps) {
  const videoRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    // Si el navegador bloquea la reproducción (política de autoplay), play()
    // se rechaza sin disparar onError: se trata igual que una falla.
    videoRef.current?.play().catch(onFinalizar)
  }, [onFinalizar])

  return (
    <div className="sorteo-animacion">
      {/* Ruta relativa: el build usa base './' y se abre con file://. */}
      <video
        ref={videoRef}
        className="sorteo-animacion__video"
        src={`media/casas/${casa}.mp4`}
        playsInline
        onEnded={onFinalizar}
        onError={onFinalizar}
      />
    </div>
  )
}
