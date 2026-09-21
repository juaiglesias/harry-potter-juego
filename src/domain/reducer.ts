import type { AppAction } from './actions'
import type { AppState } from './state'

export function appReducer(state: AppState, action: AppAction): AppState {
  switch (action.type) {
    case 'screen/navigate':
      return { ...state, screen: action.screen }
    default:
      return state
  }
}
