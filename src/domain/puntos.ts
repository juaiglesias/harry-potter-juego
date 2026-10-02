import type { JuegoId } from './state'

/**
 * Puntos que suma cada acierto en los juegos que calculan su puntaje por
 * acierto. Cada juego nuevo con esa mecánica agrega su valor acá.
 */
export const PUNTOS_POR_ACIERTO = {
  'preguntas-y-respuestas': 10,
} as const satisfies Partial<Record<JuegoId, number>>
