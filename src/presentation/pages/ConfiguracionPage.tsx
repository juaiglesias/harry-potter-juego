import { useState } from 'react'
import type { FormEvent } from 'react'
import { Button } from '../components/Button'
import { Divider } from '../components/Divider'
import { Panel } from '../components/Panel'
import { Stepper } from '../components/Stepper'
import { useAppState } from '../state/use-app-state'

export function ConfiguracionPage() {
  const { state, dispatch } = useAppState()
  const [total, setTotal] = useState(state.partida.totalParticipantes)

  function guardarTotal(event: FormEvent) {
    event.preventDefault()
    dispatch({ type: 'partida/configurar-total', total })
  }

  return (
    <div className="pantalla">
      <Stepper />
      <Panel>
        <h1>Configuración</h1>
        <p>¿Cuántos participantes esperás para esta partida? Podés cambiarlo más adelante.</p>
        <form onSubmit={guardarTotal}>
          <input
            className="campo"
            type="number"
            min={0}
            value={total}
            onChange={(event) => setTotal(Number(event.target.value))}
          />
          <Button type="submit">Guardar cantidad</Button>
        </form>
        <Divider />
        <Button onClick={() => dispatch({ type: 'partida/avanzar-etapa' })}>Empezar sorteo</Button>
      </Panel>
    </div>
  )
}
