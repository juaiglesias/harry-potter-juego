import { useState } from 'react'
import { CASAS, NOMBRE_CASA, NOMBRE_JUEGO, PREGUNTAS_JUEGO_1, SEGUNDOS_TIMER_INICIAL } from '../../domain'
import { Button } from '../components/Button'
import { Divider } from '../components/Divider'
import { COLORES_CASA } from '../components/colores-casa'
import { MarcadorCasas } from '../components/MarcadorCasas'
import { Panel } from '../components/Panel'
import { Stepper } from '../components/Stepper'
import { TimerPregunta } from '../components/TimerPregunta'
import { useAppState } from '../state/use-app-state'
import './PreguntasPage.css'

const LETRAS = ['A', 'B', 'C', 'D']

export function PreguntasPage() {
  const { state, dispatch } = useAppState()
  const [duracionTimer, setDuracionTimer] = useState(SEGUNDOS_TIMER_INICIAL)

  const { preguntaActual, aciertos } = state.partida.preguntas
  const pregunta = PREGUNTAS_JUEGO_1[preguntaActual]
  const acertadas = aciertos[pregunta.id] ?? []
  const esPrimera = preguntaActual === 0
  const esUltima = preguntaActual === PREGUNTAS_JUEGO_1.length - 1

  return (
    <div className="pantalla">
      <Stepper />
      <MarcadorCasas variante="compacta" />
      <Panel>
        <h1>{NOMBRE_JUEGO['preguntas-y-respuestas']}</h1>
        <p className="preguntas__numero">
          Pregunta {preguntaActual + 1} de {PREGUNTAS_JUEGO_1.length}
        </p>
        <div className="preguntas__encabezado">
          <h2>{pregunta.enunciado}</h2>
          <TimerPregunta key={pregunta.id} duracion={duracionTimer} onCambiarDuracion={setDuracionTimer} />
        </div>

        {pregunta.tipo === 'abierta' ? (
          <p className="preguntas__respuesta">{pregunta.respuesta}</p>
        ) : (
          <ol className="preguntas__opciones">
            {pregunta.opciones.map((opcion, indice) => (
              <li
                key={opcion}
                className={indice === pregunta.correcta ? 'preguntas__opcion--correcta' : undefined}
              >
                {LETRAS[indice]}) {opcion}
              </li>
            ))}
          </ol>
        )}

        <Divider />
        <p>¿Qué casas respondieron bien?</p>
        <div className="preguntas__casas">
          {CASAS.map((casa) => {
            const acerto = acertadas.includes(casa)
            const colores = COLORES_CASA[casa]
            return (
              <button
                key={casa}
                type="button"
                aria-pressed={acerto}
                className={`preguntas__casa${acerto ? ' preguntas__casa--acerto' : ''}`}
                style={{
                  borderLeftColor: colores.fondo,
                  ...(acerto && { background: colores.fondo, color: colores.texto }),
                }}
                onClick={() => dispatch({ type: 'preguntas/alternar-acierto', preguntaId: pregunta.id, casa })}
              >
                {acerto ? '✓ ' : ''}
                {NOMBRE_CASA[casa]}
              </button>
            )
          })}
        </div>

        <Divider />
        <div className="preguntas__navegacion">
          <Button
            variant="secondary"
            disabled={esPrimera}
            onClick={() => dispatch({ type: 'preguntas/ir-a-pregunta', indice: preguntaActual - 1 })}
          >
            Anterior
          </Button>
          <Button
            variant="secondary"
            disabled={esUltima}
            onClick={() => dispatch({ type: 'preguntas/ir-a-pregunta', indice: preguntaActual + 1 })}
          >
            Siguiente
          </Button>
        </div>
      </Panel>
      <Button onClick={() => dispatch({ type: 'partida/avanzar-etapa' })}>Siguiente juego</Button>
    </div>
  )
}
