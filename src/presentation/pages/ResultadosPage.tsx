import { MarcadorCasas } from '../components/MarcadorCasas'
import { Panel } from '../components/Panel'
import { Stepper } from '../components/Stepper'

export function ResultadosPage() {
  return (
    <div className="pantalla">
      <Stepper />
      <Panel>
        <h1>Resultados</h1>
        <MarcadorCasas variante="destacada" />
      </Panel>
    </div>
  )
}
