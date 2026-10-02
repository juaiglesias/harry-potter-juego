import { CASAS, NOMBRE_CASA, NOMBRE_JUEGO, PUNTOS_POR_PUESTO_HUEVO } from '../../domain'
import { Button } from '../components/Button'
import { COLORES_CASA } from '../components/colores-casa'
import { Divider } from '../components/Divider'
import { MarcadorCasas } from '../components/MarcadorCasas'
import { Panel } from '../components/Panel'
import { Stepper } from '../components/Stepper'
import { useAppState } from '../state/use-app-state'
import './HuevoDragonPage.css'

export function HuevoDragonPage() {
  const { state, dispatch } = useAppState()
  const { orden } = state.partida.huevo
  const buscando = CASAS.filter((casa) => !orden.includes(casa))

  return (
    <div className="pantalla">
      <Stepper />
      <MarcadorCasas variante="compacta" />
      <Panel>
        <h1>{NOMBRE_JUEGO['huevo-de-dragon']}</h1>
        <p>Tocá cada casa en el momento en que encuentra su huevo.</p>

        <h2 className="huevo__titulo">Orden de llegada</h2>
        {orden.length === 0 ? (
          <p>
            <em>Todavía ninguna casa encontró su huevo.</em>
          </p>
        ) : (
          <ol className="huevo__orden">
            {orden.map((casa, puesto) => (
              <li key={casa} className="huevo__llegada" style={{ borderLeftColor: COLORES_CASA[casa].fondo }}>
                <span className="huevo__puesto">{puesto + 1}.º</span>
                <span className="huevo__casa">{NOMBRE_CASA[casa]}</span>
                <span className="huevo__puntos">{PUNTOS_POR_PUESTO_HUEVO[puesto]} puntos</span>
              </li>
            ))}
          </ol>
        )}
        {orden.length > 0 && (
          <Button variant="secondary" onClick={() => dispatch({ type: 'huevo/deshacer' })}>
            Deshacer último
          </Button>
        )}

        {buscando.length > 0 && (
          <>
            <Divider />
            <h2 className="huevo__titulo">Buscando</h2>
            <div className="huevo__buscando">
              {buscando.map((casa) => (
                <button
                  key={casa}
                  type="button"
                  className="huevo__anotar"
                  style={{ borderLeftColor: COLORES_CASA[casa].fondo }}
                  onClick={() => dispatch({ type: 'huevo/anotar', casa })}
                >
                  <span className="huevo__casa">{NOMBRE_CASA[casa]}</span>
                  <span>encontró su huevo</span>
                </button>
              ))}
            </div>
          </>
        )}
      </Panel>
      <Button onClick={() => dispatch({ type: 'partida/avanzar-etapa' })}>Ver resultados</Button>
    </div>
  )
}
