import { createContext, useEffect, useReducer } from 'react'
import type { Dispatch, ReactNode } from 'react'
import { appReducer, initialState } from '../../domain'
import type { AppAction, AppState, StatePort } from '../../domain'

export interface AppStateContextValue {
  state: AppState
  dispatch: Dispatch<AppAction>
}

export const AppStateContext = createContext<AppStateContextValue | undefined>(undefined)

function init(statePort: StatePort) {
  return statePort.load() ?? initialState
}

export function AppStateProvider({
  statePort,
  children,
}: {
  statePort: StatePort
  children: ReactNode
}) {
  const [state, dispatch] = useReducer(appReducer, statePort, init)

  useEffect(() => {
    statePort.save(state)
  }, [state, statePort])

  return (
    <AppStateContext.Provider value={{ state, dispatch }}>
      {children}
    </AppStateContext.Provider>
  )
}
