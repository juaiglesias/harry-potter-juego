import { rankingCasas } from './partida'
import type { CasaId, Ganador, Invitado, JuegoId, Tanda } from './state'

/** Premios de cada casa según su puesto final: índice 0 = 1.ª, índice 3 = 4.ª. */
export const PREMIOS_POR_PUESTO = [5, 4, 3, 2]

/** Premios del sorteo final entre todos los invitados. */
export const PREMIOS_FINAL = 1

export interface TandaPremios {
  tanda: Tanda
  cantidad: number
  /** Puesto final de la casa (0 = 1.ª); null en el sorteo final. */
  puesto: number | null
}

/**
 * Tandas en el orden en que se sortean: de la casa 4.ª a la 1.ª y después el
 * final. El puesto sale de `rankingCasas`, así ante empate coincide con el
 * orden del podio.
 */
export function tandasPremios(puntajesPorJuego: Record<JuegoId, Record<CasaId, number>>): TandaPremios[] {
  const porCasa = rankingCasas(puntajesPorJuego).map(({ casa }, puesto) => ({
    tanda: casa,
    cantidad: PREMIOS_POR_PUESTO[puesto],
    puesto,
  }))
  return [...porCasa.reverse(), { tanda: 'final', cantidad: PREMIOS_FINAL, puesto: null }]
}

/** Invitados de la tanda (todos, en el final) que todavía no ganaron un premio. */
export function elegiblesPremio(tanda: Tanda, invitados: Invitado[], ganadores: Ganador[]): Invitado[] {
  const ganaron = new Set(ganadores.map((ganador) => ganador.invitadoId))
  return invitados.filter(
    (invitado) => (tanda === 'final' || invitado.casa === tanda) && !ganaron.has(invitado.id),
  )
}

/**
 * Primera tanda que todavía tiene premios por sortear y algún elegible; null
 * cuando el sorteo de premios terminó.
 */
export function tandaEnCurso(
  puntajesPorJuego: Record<JuegoId, Record<CasaId, number>>,
  invitados: Invitado[],
  ganadores: Ganador[],
): TandaPremios | null {
  return (
    tandasPremios(puntajesPorJuego).find(
      ({ tanda, cantidad }) =>
        ganadores.filter((ganador) => ganador.tanda === tanda).length < cantidad &&
        elegiblesPremio(tanda, invitados, ganadores).length > 0,
    ) ?? null
  )
}
