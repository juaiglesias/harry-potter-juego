import type { ComponentType } from 'react'
import type { Screen } from '../domain'
import { localStorageStatePort } from '../infrastructure/local-storage-state-port'
import { HomePage } from './pages/HomePage'
import { AppStateProvider } from './state/AppStateContext'
import { useAppState } from './state/use-app-state'

const pagesByScreen: Record<Screen, ComponentType> = {
  home: HomePage,
}

function ActivePage() {
  const { state } = useAppState()
  const Page = pagesByScreen[state.screen]
  return <Page />
}

export function App() {
  return (
    <AppStateProvider statePort={localStorageStatePort}>
      <ActivePage />
    </AppStateProvider>
  )
}
