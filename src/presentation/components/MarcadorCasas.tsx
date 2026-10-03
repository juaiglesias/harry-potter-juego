import { CASAS, NOMBRE_CASA, puntajeTotalPorCasa } from '../../domain'
import { useAppState } from '../state/use-app-state'
import { COLORES_CASA } from './colores-casa'
import './MarcadorCasas.css'

// Orden fijo de las casas para que no salten de lugar mientras el anfitrión
// carga puntaje en vivo.
export function MarcadorCasas() {
  const { state } = useAppState()
  const totales = puntajeTotalPorCasa(state.partida.puntajesPorJuego)

  return (
    <ul className="marcador-casas">
      {CASAS.map((casa) => {
        const colores = COLORES_CASA[casa]
        return (
          <li
            key={casa}
            className="marcador-casas__item"
            style={{ background: colores.fondo, color: colores.texto }}
          >
            <span className="marcador-casas__nombre">{NOMBRE_CASA[casa]}</span>
            <span className="marcador-casas__puntaje">{totales[casa]}</span>
          </li>
        )
      })}
    </ul>
  )
}
