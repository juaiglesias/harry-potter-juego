import { localStorageStatePort } from '../infrastructure/local-storage-state-port'
import { ConfiguracionPage } from './pages/ConfiguracionPage'
import { JuegoEnCursoPage } from './pages/JuegoEnCursoPage'
import { ResultadosPage } from './pages/ResultadosPage'
import { SorteoPage } from './pages/SorteoPage'
import { AppStateProvider } from './state/AppStateContext'
import { useAppState } from './state/use-app-state'

function ActivePage() {
  const { state } = useAppState()

  switch (state.partida.etapaActual.tipo) {
    case 'configuracion':
      return <ConfiguracionPage />
    case 'sorteo':
      return <SorteoPage />
    case 'juego':
      return <JuegoEnCursoPage />
    case 'resultados':
      return <ResultadosPage />
  }
}

export function App() {
  return (
    <AppStateProvider statePort={localStorageStatePort}>
      <ActivePage />
    </AppStateProvider>
  )
}
