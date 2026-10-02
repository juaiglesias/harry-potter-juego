import { useEffect, useState } from 'react'
import { PASO_TIMER_SEGUNDOS } from '../../domain'
import { Button } from './Button'
import './TimerPregunta.css'

interface TimerPreguntaProps {
  /** Duración configurada. Vive en la página para conservarla entre preguntas. */
  duracion: number
  onCambiarDuracion: (duracion: number) => void
}

/**
 * Cuenta regresiva para responder una pregunta. Estado local de
 * presentación: no se persiste ni afecta el puntaje. La página lo monta con
 * `key` por pregunta, así cada pregunta arranca detenida en la duración.
 */
export function TimerPregunta({ duracion, onCambiarDuracion }: TimerPreguntaProps) {
  const [restantes, setRestantes] = useState(duracion)
  const [corriendo, setCorriendo] = useState(false)

  useEffect(() => {
    if (!corriendo) return
    const intervalo = window.setInterval(() => {
      setRestantes((actual) => Math.max(actual - 1, 0))
    }, 1000)
    return () => window.clearInterval(intervalo)
  }, [corriendo])

  if (corriendo && restantes === 0) setCorriendo(false)

  function cambiarDuracion(nueva: number) {
    onCambiarDuracion(nueva)
    setRestantes(nueva)
  }

  function iniciar() {
    setRestantes(duracion)
    setCorriendo(true)
  }

  const cumplido = !corriendo && restantes === 0

  return (
    <div className="timer-pregunta">
      <div className="timer-pregunta__ajuste">
        <Button
          variant="secondary"
          aria-label={`Sumar ${PASO_TIMER_SEGUNDOS} segundos`}
          disabled={corriendo}
          onClick={() => cambiarDuracion(duracion + PASO_TIMER_SEGUNDOS)}
        >
          ▲
        </Button>
        <Button
          variant="secondary"
          aria-label={`Restar ${PASO_TIMER_SEGUNDOS} segundos`}
          disabled={corriendo || duracion <= PASO_TIMER_SEGUNDOS}
          onClick={() => cambiarDuracion(duracion - PASO_TIMER_SEGUNDOS)}
        >
          ▼
        </Button>
      </div>
      <span className={`timer-pregunta__segundos${cumplido ? ' timer-pregunta__segundos--cumplido' : ''}`}>
        {restantes}s
      </span>
      <Button aria-label="Iniciar timer" disabled={corriendo} onClick={iniciar}>
        ▶
      </Button>
      {cumplido && <span className="timer-pregunta__aviso">Tiempo cumplido</span>}
    </div>
  )
}
