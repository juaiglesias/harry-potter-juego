import { Button } from '../components/Button'
import { Panel } from '../components/Panel'
import { PodioCasas } from '../components/PodioCasas'
import { Stepper } from '../components/Stepper'
import { useAppState } from '../state/use-app-state'

export function ResultadosPage() {
  const { dispatch } = useAppState()

  return (
    <div className="pantalla">
      <Stepper />
      <Panel>
        <h1>Resultados</h1>
        <PodioCasas />
      </Panel>
      <Button onClick={() => dispatch({ type: 'partida/avanzar-etapa' })}>Sortear premios</Button>
    </div>
  )
}
