export type { AppAction } from './actions'
export {
  NOMBRE_CASA,
  NOMBRE_JUEGO,
  calcularCuposPorCasa,
  etapaKey,
  etapaSiguiente,
  indiceEtapa,
  nombreEtapa,
  puntajeHuevoPorCasa,
  puntajePreguntasPorCasa,
  puntajeQuidditchPorCasa,
  puntajeTabuPorCasa,
  puntajeTotalPorCasa,
  rankingCasas,
  sortearCasa,
} from './partida'
export type { PosicionRanking } from './partida'
export { PREMIOS_FINAL, PREMIOS_POR_PUESTO, elegiblesPremio, tandaEnCurso, tandasPremios } from './premios'
export type { TandaPremios } from './premios'
export { PASO_TIMER_SEGUNDOS, PREGUNTAS_JUEGO_1, SEGUNDOS_TIMER_INICIAL } from './preguntas'
export type { Pregunta } from './preguntas'
export { AROS, PUNTOS_POR_ACIERTO, PUNTOS_POR_ARO, PUNTOS_POR_PUESTO_HUEVO, PUNTOS_TABU } from './puntos'
export type { AroId } from './puntos'
export { appReducer } from './reducer'
export {
  DURACION_TURNO_TABU_SEGUNDOS,
  TARJETAS_POR_CASA,
  TARJETAS_TABU,
  estadoTurnoTabu,
  repartirTarjetas,
  tarjetaEnCurso,
  tarjetaTabu,
} from './tabu'
export type { EstadoTurnoTabu, ResultadoTabu, TarjetaTabu, TurnoTabu } from './tabu'
export { CASAS, ETAPAS_ORDEN, JUEGOS, initialState } from './state'
export type { AppState, CasaId, Etapa, Invitado, JuegoId, Partida, Ganador, ProgresoHuevo, ProgresoPreguntas, ProgresoPremios, ProgresoQuidditch, ProgresoTabu, Tanda } from './state'
export type { StatePort } from './state-port'
