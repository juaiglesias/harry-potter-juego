import type { AppState, StatePort } from '../domain'

const STORAGE_KEY = 'harry-potter-juego:state'

export const localStorageStatePort: StatePort = {
  load() {
    const raw = window.localStorage.getItem(STORAGE_KEY)
    if (!raw) return undefined

    try {
      const parsed: unknown = JSON.parse(raw)
      // Si el estado guardado es de una forma anterior de AppState (por
      // ejemplo, de antes de existir `partida` o de los datos de un juego), se
      // descarta en vez de romper: la app arranca con el estado inicial.
      if (!parsed || typeof parsed !== 'object' || !('partida' in parsed)) return undefined
      const { partida } = parsed
      if (
        !partida ||
        typeof partida !== 'object' ||
        !('preguntas' in partida) ||
        !('quidditch' in partida) ||
        !('tabu' in partida) ||
        !('huevo' in partida)
      ) {
        return undefined
      }
      return parsed as AppState
    } catch {
      return undefined
    }
  },

  save(state) {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state))
  },
}
