import { NOMBRE_CASA, rankingCasas } from '../../domain'
import { useAppState } from '../state/use-app-state'
import { COLORES_CASA } from './colores-casa'
import './PodioCasas.css'

// Altura mínima (en % del podio) para que entren nombre y puntaje. Es la que
// reciben también las casas con 0 puntos o puntaje negativo.
const ALTURA_MINIMA = 20

function alturaPorcentaje(puntaje: number, puntajeMaximo: number): number {
  if (puntaje <= 0 || puntajeMaximo <= 0) return ALTURA_MINIMA
  return Math.max(ALTURA_MINIMA, (puntaje / puntajeMaximo) * 100)
}

export function PodioCasas() {
  const { state } = useAppState()
  // rankingCasas ordena de mayor a menor; el podio va de menor (izquierda)
  // a mayor (derecha).
  const items = rankingCasas(state.partida.puntajesPorJuego).reverse()
  const puntajeMaximo = items[items.length - 1].puntaje

  return (
    <ol className="podio-casas">
      {items.map(({ casa, puntaje, ganadora }) => {
        const colores = COLORES_CASA[casa]
        const clases = ['podio-casas__columna', ganadora && 'podio-casas__columna--ganadora']
          .filter(Boolean)
          .join(' ')

        return (
          <li
            key={casa}
            className={clases}
            // min-height y no height: si el porcentaje no alcanza para nombre
            // y puntaje, el rectángulo crece hasta contenerlos.
            style={{
              minHeight: `${alturaPorcentaje(puntaje, puntajeMaximo)}%`,
              background: colores.fondo,
              color: colores.texto,
            }}
          >
            <span className="podio-casas__nombre">{NOMBRE_CASA[casa]}</span>
            <span className="podio-casas__puntaje">{puntaje}</span>
          </li>
        )
      })}
    </ol>
  )
}
