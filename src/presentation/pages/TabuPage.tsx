import { useEffect, useRef, useState } from 'react'
import {
  CASAS,
  DURACION_TURNO_TABU_SEGUNDOS,
  NOMBRE_CASA,
  NOMBRE_JUEGO,
  TARJETAS_POR_CASA,
  estadoTurnoTabu,
  tarjetaEnCurso,
  tarjetaTabu,
} from '../../domain'
import type { CasaId, EstadoTurnoTabu } from '../../domain'
import { Button } from '../components/Button'
import { COLORES_CASA } from '../components/colores-casa'
import { MarcadorCasas } from '../components/MarcadorCasas'
import { Panel } from '../components/Panel'
import { Stepper } from '../components/Stepper'
import { useAppState } from '../state/use-app-state'
import './TabuPage.css'

const NOMBRE_ESTADO: Record<EstadoTurnoTabu, string> = {
  pendiente: 'Pendiente',
  'en-curso': 'Jugando',
  terminado: 'Terminado',
}

/** Toques en ✓ o ✗ más seguidos que esto se ignoran, para que un doble toque no salte una tarjeta. */
const ESPERA_ENTRE_MARCAS_MS = 600

function formatearReloj(milisegundos: number): string {
  const segundos = Math.max(Math.ceil(milisegundos / 1000), 0)
  return `${Math.floor(segundos / 60)}:${String(segundos % 60).padStart(2, '0')}`
}

/**
 * Hora actual refrescada cada 250 ms, para el reloj del turno y para que el
 * turno pase solo a terminado cuando vence.
 */
function useAhora(): number {
  const [ahora, setAhora] = useState(() => Date.now())
  useEffect(() => {
    const intervalo = window.setInterval(() => setAhora(Date.now()), 250)
    return () => window.clearInterval(intervalo)
  }, [])
  return ahora
}

export function TabuPage() {
  const { state, dispatch } = useAppState()
  const { reparto, turnos, casaEnTurno } = state.partida.tabu
  const puntajes = state.partida.puntajesPorJuego['tabu-hp']

  const ahora = useAhora()

  return (
    <div className="pantalla">
      <Stepper />
      <MarcadorCasas />
      <Panel>
        <h1>{NOMBRE_JUEGO['tabu-hp']}</h1>
        {casaEnTurno === null ? (
          <SeleccionCasa
            estados={CASAS.map((casa) => ({ casa, estado: estadoTurnoTabu(turnos[casa], ahora), puntos: puntajes[casa] }))}
            onElegir={(casa) => dispatch({ type: 'tabu/elegir-casa', casa })}
          />
        ) : (
          <TurnoCasa casa={casaEnTurno} reparto={reparto[casaEnTurno]} ahora={ahora} />
        )}
      </Panel>
      {casaEnTurno === null && (
        <Button onClick={() => dispatch({ type: 'partida/avanzar-etapa' })}>Siguiente juego</Button>
      )}
    </div>
  )
}

interface SeleccionCasaProps {
  estados: { casa: CasaId; estado: EstadoTurnoTabu; puntos: number }[]
  onElegir: (casa: CasaId) => void
}

function SeleccionCasa({ estados, onElegir }: SeleccionCasaProps) {
  return (
    <>
      <p>Elegí la casa que juega. Cada una tiene {TARJETAS_POR_CASA} tarjetas y {DURACION_TURNO_TABU_SEGUNDOS / 60} minutos.</p>
      <ul className="tabu__casas">
        {estados.map(({ casa, estado, puntos }) => (
          <li key={casa}>
            <button
              type="button"
              className="tabu__casa"
              style={{ borderLeftColor: COLORES_CASA[casa].fondo }}
              onClick={() => onElegir(casa)}
            >
              <span className="tabu__casa-nombre">{NOMBRE_CASA[casa]}</span>
              <span className="tabu__casa-estado">{NOMBRE_ESTADO[estado]}</span>
              {estado !== 'pendiente' && <span className="tabu__casa-puntos">{puntos}</span>}
            </button>
          </li>
        ))}
      </ul>
    </>
  )
}

interface TurnoCasaProps {
  casa: CasaId
  reparto: string[]
  ahora: number
}

function TurnoCasa({ casa, reparto, ahora }: TurnoCasaProps) {
  const { state, dispatch } = useAppState()
  const turno = state.partida.tabu.turnos[casa]
  const estado = estadoTurnoTabu(turno, ahora)
  const ultimaMarca = useRef(0)
  const volver = () => dispatch({ type: 'tabu/elegir-casa', casa: null })
  const deshacer = () => dispatch({ type: 'tabu/deshacer', casa })

  if (estado === 'pendiente') {
    return (
      <div className="tabu__previa">
        <h2>{NOMBRE_CASA[casa]}</h2>
        <p>
          {TARJETAS_POR_CASA} tarjetas · {DURACION_TURNO_TABU_SEGUNDOS / 60} minutos
        </p>
        <Button onClick={() => dispatch({ type: 'tabu/iniciar-turno', casa, ahora: Date.now() })}>Empezar turno</Button>
        <Button variant="secondary" onClick={volver}>
          Volver a las casas
        </Button>
      </div>
    )
  }

  const aciertos = turno.resultados.filter((resultado) => resultado === 'acierto').length
  const errores = turno.resultados.length - aciertos

  if (estado === 'terminado') {
    return (
      <div className="tabu__resumen">
        <h2>Turno de {NOMBRE_CASA[casa]} terminado</h2>
        <p className="tabu__resumen-cifras">
          ✓ {aciertos} · ✗ {errores} · <strong>{state.partida.puntajesPorJuego['tabu-hp'][casa]} puntos</strong>
        </p>
        <div className="tabu__acciones-secundarias">
          {turno.resultados.length > 0 && (
            <Button variant="secondary" onClick={deshacer}>
              Deshacer última marca
            </Button>
          )}
          <Button onClick={volver}>Volver a las casas</Button>
        </div>
      </div>
    )
  }

  const tarjeta = tarjetaTabu(tarjetaEnCurso(reparto, turno) as string)
  const marcar = (resultado: 'acierto' | 'error') => {
    const ahoraMarca = Date.now()
    if (ahoraMarca - ultimaMarca.current < ESPERA_ENTRE_MARCAS_MS) return
    ultimaMarca.current = ahoraMarca
    dispatch({ type: 'tabu/marcar', casa, resultado, ahora: ahoraMarca })
  }

  return (
    <div className="tabu__turno">
      <div className="tabu__encabezado">
        <span>
          {NOMBRE_CASA[casa]} · Tarjeta {turno.resultados.length + 1} de {TARJETAS_POR_CASA}
        </span>
        <span className="tabu__reloj">{formatearReloj((turno.venceEn as number) - ahora)}</span>
      </div>
      <div className="tabu__tarjeta">
        <p className="tabu__palabra">{tarjeta.palabra}</p>
        <ul className="tabu__prohibidas" aria-label="Palabras prohibidas">
          {tarjeta.prohibidas.map((prohibida) => (
            <li key={prohibida}>{prohibida}</li>
          ))}
        </ul>
      </div>
      <div className="tabu__marcas">
        <button type="button" className="tabu__marca tabu__marca--error" onClick={() => marcar('error')}>
          ✗<span>Dijo una prohibida</span>
        </button>
        <button type="button" className="tabu__marca tabu__marca--acierto" onClick={() => marcar('acierto')}>
          ✓<span>Adivinaron</span>
        </button>
      </div>
      {turno.resultados.length > 0 && (
        <button type="button" className="tabu__deshacer" onClick={deshacer}>
          Deshacer última marca
        </button>
      )}
    </div>
  )
}
