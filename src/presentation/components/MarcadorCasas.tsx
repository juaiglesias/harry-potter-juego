import { CASAS, NOMBRE_CASA, puntajeTotalPorCasa, rankingCasas } from '../../domain'
import { useAppState } from '../state/use-app-state'
import { COLORES_CASA } from './colores-casa'
import './MarcadorCasas.css'

interface MarcadorCasasProps {
  variante?: 'compacta' | 'destacada'
}

export function MarcadorCasas({ variante = 'compacta' }: MarcadorCasasProps) {
  const { state } = useAppState()

  // En "compacta" se mantiene el orden fijo de las casas para que no salten
  // de lugar mientras el anfitrión carga puntaje en vivo. El ranking
  // ordenado por puntaje solo tiene sentido en "destacada" (Resultados).
  const items =
    variante === 'destacada'
      ? rankingCasas(state.partida.puntajesPorJuego)
      : (() => {
          const totales = puntajeTotalPorCasa(state.partida.puntajesPorJuego)
          return CASAS.map((casa) => ({ casa, puntaje: totales[casa], ganadora: false }))
        })()

  return (
    <ul className={`marcador-casas marcador-casas--${variante}`}>
      {items.map(({ casa, puntaje, ganadora }) => {
        const colores = COLORES_CASA[casa]
        const clases = [
          'marcador-casas__item',
          variante === 'destacada' && ganadora && 'marcador-casas__item--ganadora',
        ]
          .filter(Boolean)
          .join(' ')

        return (
          <li
            key={casa}
            className={clases}
            style={{ background: colores.fondo, color: colores.texto }}
          >
            <span className="marcador-casas__nombre">{NOMBRE_CASA[casa]}</span>
            <span className="marcador-casas__puntaje">{puntaje}</span>
          </li>
        )
      })}
    </ul>
  )
}
