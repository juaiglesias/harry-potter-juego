import type { ReactElement } from 'react'
import type { JuegoId } from '../domain'
import { localStorageStatePort } from '../infrastructure/local-storage-state-port'
import { ConfiguracionPage } from './pages/ConfiguracionPage'
import { HuevoDragonPage } from './pages/HuevoDragonPage'
import { PremiosPage } from './pages/PremiosPage'
import { PreguntasPage } from './pages/PreguntasPage'
import { QuidditchPage } from './pages/QuidditchPage'
import { TabuPage } from './pages/TabuPage'
import { ResultadosPage } from './pages/ResultadosPage'
import { SorteoPage } from './pages/SorteoPage'
import { AppStateProvider } from './state/AppStateContext'
import { useAppState } from './state/use-app-state'

// Sin caso por defecto: si se agrega un juego sin pantalla, TypeScript lo
// marca porque la función no devuelve en todos los caminos.
function paginaDeJuego(juego: JuegoId): ReactElement {
  switch (juego) {
    case 'preguntas-y-respuestas':
      return <PreguntasPage />
    case 'quidditch':
      return <QuidditchPage />
    case 'tabu-hp':
      return <TabuPage />
    case 'huevo-de-dragon':
      return <HuevoDragonPage />
  }
}

function ActivePage() {
  const { state } = useAppState()

  const { etapaActual } = state.partida

  switch (etapaActual.tipo) {
    case 'configuracion':
      return <ConfiguracionPage />
    case 'sorteo':
      return <SorteoPage />
    case 'juego':
      return paginaDeJuego(etapaActual.juego)
    case 'resultados':
      return <ResultadosPage />
    case 'premios':
      return <PremiosPage />
  }
}

export function App() {
  return (
    <AppStateProvider statePort={localStorageStatePort}>
      <ActivePage />
    </AppStateProvider>
  )
}
