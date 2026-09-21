import { ETAPAS_ORDEN, etapaKey, indiceEtapa, nombreEtapa } from '../../domain'
import { useAppState } from '../state/use-app-state'
import './Stepper.css'

export function Stepper() {
  const { state, dispatch } = useAppState()
  const indiceActual = indiceEtapa(state.partida.etapaActual)

  return (
    <ol className="stepper">
      {ETAPAS_ORDEN.map((etapa, indice) => {
        const activa = indice === indiceActual
        const visitada = indice <= indiceActual
        const clases = ['stepper__item', activa && 'stepper__item--activa'].filter(Boolean).join(' ')

        return (
          <li key={etapaKey(etapa)} className={clases}>
            {visitada && !activa ? (
              <button
                type="button"
                className="stepper__boton"
                onClick={() => dispatch({ type: 'partida/ir-a-etapa', etapa })}
              >
                {nombreEtapa(etapa)}
              </button>
            ) : (
              <span className="stepper__texto">{nombreEtapa(etapa)}</span>
            )}
          </li>
        )
      })}
    </ol>
  )
}
