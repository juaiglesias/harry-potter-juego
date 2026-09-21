import { CASAS, NOMBRE_CASA, NOMBRE_JUEGO } from '../../domain'
import { Button } from '../components/Button'
import { MarcadorCasas } from '../components/MarcadorCasas'
import { Panel } from '../components/Panel'
import { Stepper } from '../components/Stepper'
import { useAppState } from '../state/use-app-state'

export function JuegoEnCursoPage() {
  const { state, dispatch } = useAppState()
  const { etapaActual, puntajesPorJuego } = state.partida

  if (etapaActual.tipo !== 'juego') return null

  const juego = etapaActual.juego
  const puntajes = puntajesPorJuego[juego]

  return (
    <div className="pantalla">
      <Stepper />
      <MarcadorCasas variante="compacta" />
      <Panel>
        <h1>{NOMBRE_JUEGO[juego]}</h1>
        <p>Cargá el puntaje que sacó cada casa en este juego.</p>
        <ul>
          {CASAS.map((casa) => (
            <li key={casa}>
              <label className="fila-campo">
                <span>{NOMBRE_CASA[casa]}</span>
                <input
                  className="campo"
                  type="number"
                  value={puntajes[casa]}
                  onChange={(event) =>
                    dispatch({
                      type: 'partida/cargar-puntaje',
                      juego,
                      casa,
                      puntos: Number(event.target.value),
                    })
                  }
                />
              </label>
            </li>
          ))}
        </ul>
      </Panel>
      <Button onClick={() => dispatch({ type: 'partida/avanzar-etapa' })}>Siguiente</Button>
    </div>
  )
}
