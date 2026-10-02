import type { JuegoId } from './state'

/**
 * Puntos que suma cada acierto en los juegos que calculan su puntaje por
 * acierto. Cada juego nuevo con esa mecánica agrega su valor acá.
 */
export const PUNTOS_POR_ACIERTO = {
  'preguntas-y-respuestas': 10,
} as const satisfies Partial<Record<JuegoId, number>>

export type AroId = 'chico' | 'mediano' | 'grande'

/** Aros del Juego 2 (Quidditch), de más a menos puntos. */
export const AROS: AroId[] = ['chico', 'mediano', 'grande']

/** Puntos que suma cada embocada en un aro del Juego 2. */
export const PUNTOS_POR_ARO: Record<AroId, number> = {
  chico: 30,
  mediano: 20,
  grande: 10,
}

/** Puntos del Juego 3 (Tabú HP) por cada check y cada cruz. */
export const PUNTOS_TABU = {
  acierto: 10,
  error: -10,
}

/** Puntos del Juego 4 (Huevo de Dragón) por puesto de llegada (0 = primero). */
export const PUNTOS_POR_PUESTO_HUEVO = [50, 30, 10, 0]
