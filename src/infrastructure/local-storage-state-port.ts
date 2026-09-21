import type { AppState, StatePort } from '../domain'

const STORAGE_KEY = 'harry-potter-juego:state'

export const localStorageStatePort: StatePort = {
  load() {
    const raw = window.localStorage.getItem(STORAGE_KEY)
    if (!raw) return undefined

    try {
      return JSON.parse(raw) as AppState
    } catch {
      return undefined
    }
  },

  save(state) {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state))
  },
}
