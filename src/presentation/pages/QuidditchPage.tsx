import { AROS, CASAS, NOMBRE_CASA, NOMBRE_JUEGO, PUNTOS_POR_ARO } from '../../domain'
import type { AroId } from '../../domain'
import { Button } from '../components/Button'
import { COLORES_CASA } from '../components/colores-casa'
import { MarcadorCasas } from '../components/MarcadorCasas'
import { Panel } from '../components/Panel'
import { Stepper } from '../components/Stepper'
import { useAppState } from '../state/use-app-state'
import './QuidditchPage.css'

const NOMBRE_ARO: Record<AroId, string> = {
  chico: 'Aro chico',
  mediano: 'Aro mediano',
  grande: 'Aro grande',
}

export function QuidditchPage() {
  const { state, dispatch } = useAppState()
  const { embocadas } = state.partida.quidditch
  const subtotales = state.partida.puntajesPorJuego.quidditch

  return (
    <div className="pantalla">
      <Stepper />
      <MarcadorCasas />
      <Panel>
        <h1>{NOMBRE_JUEGO.quidditch}</h1>
        <p>Tocá el aro cada vez que una casa emboca. Con − corregís un toque de más.</p>
        <table className="quidditch">
          <thead>
            <tr>
              <th scope="col">Casa</th>
              {AROS.map((aro) => (
                <th key={aro} scope="col">
                  {NOMBRE_ARO[aro]} · {PUNTOS_POR_ARO[aro]}
                </th>
              ))}
              <th scope="col" className="quidditch__subtotal">
                Subtotal
              </th>
            </tr>
          </thead>
          <tbody>
            {CASAS.map((casa) => (
              <tr key={casa}>
                <th scope="row" className="quidditch__casa" style={{ borderLeftColor: COLORES_CASA[casa].fondo }}>
                  {NOMBRE_CASA[casa]}
                </th>
                {AROS.map((aro) => {
                  const cantidad = embocadas[casa][aro]
                  return (
                    <td key={aro}>
                      <div className="quidditch__celda">
                        <button
                          type="button"
                          className="quidditch__embocada"
                          aria-label={`Embocada de ${NOMBRE_CASA[casa]} en ${NOMBRE_ARO[aro].toLowerCase()}`}
                          onClick={() => dispatch({ type: 'quidditch/registrar-embocada', casa, aro, delta: 1 })}
                        >
                          <span className="quidditch__puntos">+{PUNTOS_POR_ARO[aro]}</span>
                          <span className="quidditch__cantidad">×{cantidad}</span>
                        </button>
                        <button
                          type="button"
                          className="quidditch__restar"
                          aria-label={`Restar embocada de ${NOMBRE_CASA[casa]} en ${NOMBRE_ARO[aro].toLowerCase()}`}
                          disabled={cantidad === 0}
                          onClick={() => dispatch({ type: 'quidditch/registrar-embocada', casa, aro, delta: -1 })}
                        >
                          −
                        </button>
                      </div>
                    </td>
                  )
                })}
                <td className="quidditch__subtotal">{subtotales[casa]}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </Panel>
      <Button onClick={() => dispatch({ type: 'partida/avanzar-etapa' })}>Siguiente juego</Button>
    </div>
  )
}
