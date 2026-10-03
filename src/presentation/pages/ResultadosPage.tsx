import { Panel } from '../components/Panel'
import { PodioCasas } from '../components/PodioCasas'
import { Stepper } from '../components/Stepper'

export function ResultadosPage() {
  return (
    <div className="pantalla">
      <Stepper />
      <Panel>
        <h1>Resultados</h1>
        <PodioCasas />
      </Panel>
    </div>
  )
}
