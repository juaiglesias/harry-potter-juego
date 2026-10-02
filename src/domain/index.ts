export type { AppAction } from './actions'
export {
  NOMBRE_CASA,
  NOMBRE_JUEGO,
  calcularCuposPorCasa,
  etapaKey,
  etapaSiguiente,
  indiceEtapa,
  nombreEtapa,
  puntajePreguntasPorCasa,
  puntajeTotalPorCasa,
  rankingCasas,
  sortearCasa,
} from './partida'
export type { PosicionRanking } from './partida'
export { PASO_TIMER_SEGUNDOS, PREGUNTAS_JUEGO_1, SEGUNDOS_TIMER_INICIAL } from './preguntas'
export type { Pregunta } from './preguntas'
export { PUNTOS_POR_ACIERTO } from './puntos'
export { appReducer } from './reducer'
export { CASAS, ETAPAS_ORDEN, JUEGOS, initialState } from './state'
export type { AppState, CasaId, Etapa, Invitado, JuegoId, Partida, ProgresoPreguntas } from './state'
export type { StatePort } from './state-port'
