import type { AppState } from './state'

/**
 * Puerto de persistencia: domain/ depende de esta interfaz, nunca de un
 * mecanismo de guardado concreto. infrastructure/ aporta la implementación.
 */
export interface StatePort {
  load(): AppState | undefined
  save(state: AppState): void
}
