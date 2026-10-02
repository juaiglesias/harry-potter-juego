import { AROS, PUNTOS_POR_ACIERTO, PUNTOS_POR_ARO, PUNTOS_TABU } from './puntos'
import type { AroId } from './puntos'
import { CASAS, ETAPAS_ORDEN, JUEGOS } from './state'
import type { CasaId, Etapa, Invitado, JuegoId } from './state'
import type { TurnoTabu } from './tabu'

export const NOMBRE_CASA: Record<CasaId, string> = {
  gryffindor: 'Gryffindor',
  slytherin: 'Slytherin',
  ravenclaw: 'Ravenclaw',
  hufflepuff: 'Hufflepuff',
}

export const NOMBRE_JUEGO: Record<JuegoId, string> = {
  'preguntas-y-respuestas': 'Preguntas y respuestas',
  quidditch: 'Quidditch',
  'tabu-hp': 'Tabú HP',
  'huevo-de-dragon': 'Huevo de Dragón',
}

export function nombreEtapa(etapa: Etapa): string {
  switch (etapa.tipo) {
    case 'configuracion':
      return 'Configuración'
    case 'sorteo':
      return 'Sorteo'
    case 'juego':
      return NOMBRE_JUEGO[etapa.juego]
    case 'resultados':
      return 'Resultados'
  }
}

export function etapaKey(etapa: Etapa): string {
  return etapa.tipo === 'juego' ? `juego:${etapa.juego}` : etapa.tipo
}

export function indiceEtapa(etapa: Etapa): number {
  const clave = etapaKey(etapa)
  return ETAPAS_ORDEN.findIndex((candidata) => etapaKey(candidata) === clave)
}

export function etapaSiguiente(etapaActual: Etapa): Etapa {
  const indice = indiceEtapa(etapaActual)
  return ETAPAS_ORDEN[Math.min(indice + 1, ETAPAS_ORDEN.length - 1)]
}

/**
 * Reparto parejo del total entre las 4 casas; si no es múltiplo de 4, el
 * resto se sortea al azar entre las casas (cada una recibe como máximo un
 * cupo extra).
 */
export function calcularCuposPorCasa(totalParticipantes: number): Record<CasaId, number> {
  const base = Math.floor(totalParticipantes / CASAS.length)
  const resto = totalParticipantes % CASAS.length

  const cupos = CASAS.reduce<Record<CasaId, number>>(
    (acc, casa) => ({ ...acc, [casa]: base }),
    {} as Record<CasaId, number>,
  )

  const casasSorteadas = [...CASAS].sort(() => Math.random() - 0.5)
  for (let i = 0; i < resto; i++) {
    cupos[casasSorteadas[i]] += 1
  }

  return cupos
}

/**
 * Sortea una casa al azar entre las que todavía no llegaron a su cupo. Si
 * todas están completas (o no hay cupos configurados), sortea entre las 4
 * para no bloquear el alta de un invitado.
 */
export function sortearCasa(
  cuposPorCasa: Record<CasaId, number>,
  invitados: Invitado[],
): CasaId {
  const ocupacionPorCasa = CASAS.reduce<Record<CasaId, number>>(
    (acc, casa) => ({ ...acc, [casa]: invitados.filter((invitado) => invitado.casa === casa).length }),
    {} as Record<CasaId, number>,
  )

  const disponibles = CASAS.filter((casa) => ocupacionPorCasa[casa] < cuposPorCasa[casa])
  const elegibles = disponibles.length > 0 ? disponibles : CASAS

  return elegibles[Math.floor(Math.random() * elegibles.length)]
}

/** Puntaje del Juego 1 por casa: preguntas acertadas por puntos por acierto. */
export function puntajePreguntasPorCasa(aciertos: Record<string, CasaId[]>): Record<CasaId, number> {
  const casasAcertadas = Object.values(aciertos).flat()
  return CASAS.reduce<Record<CasaId, number>>(
    (acc, casa) => ({
      ...acc,
      [casa]:
        casasAcertadas.filter((acertada) => acertada === casa).length *
        PUNTOS_POR_ACIERTO['preguntas-y-respuestas'],
    }),
    {} as Record<CasaId, number>,
  )
}

/** Puntaje del Juego 2 por casa: embocadas de cada aro por sus puntos. */
export function puntajeQuidditchPorCasa(
  embocadas: Record<CasaId, Record<AroId, number>>,
): Record<CasaId, number> {
  return CASAS.reduce<Record<CasaId, number>>(
    (acc, casa) => ({
      ...acc,
      [casa]: AROS.reduce((suma, aro) => suma + embocadas[casa][aro] * PUNTOS_POR_ARO[aro], 0),
    }),
    {} as Record<CasaId, number>,
  )
}

/** Puntaje del Juego 3 por casa: checks y cruces por sus puntos (puede ser negativo). */
export function puntajeTabuPorCasa(turnos: Record<CasaId, TurnoTabu>): Record<CasaId, number> {
  return CASAS.reduce<Record<CasaId, number>>(
    (acc, casa) => ({
      ...acc,
      [casa]: turnos[casa].resultados.reduce((suma, resultado) => suma + PUNTOS_TABU[resultado], 0),
    }),
    {} as Record<CasaId, number>,
  )
}

export function puntajeTotalPorCasa(
  puntajesPorJuego: Record<JuegoId, Record<CasaId, number>>,
): Record<CasaId, number> {
  return CASAS.reduce<Record<CasaId, number>>(
    (acc, casa) => ({
      ...acc,
      [casa]: JUEGOS.reduce((suma, juego) => suma + puntajesPorJuego[juego][casa], 0),
    }),
    {} as Record<CasaId, number>,
  )
}

export interface PosicionRanking {
  casa: CasaId
  puntaje: number
  ganadora: boolean
}

export function rankingCasas(
  puntajesPorJuego: Record<JuegoId, Record<CasaId, number>>,
): PosicionRanking[] {
  const totales = puntajeTotalPorCasa(puntajesPorJuego)
  const ordenadas = [...CASAS].sort((a, b) => totales[b] - totales[a])
  const puntajeMaximo = totales[ordenadas[0]]

  return ordenadas.map((casa) => ({
    casa,
    puntaje: totales[casa],
    ganadora: totales[casa] === puntajeMaximo,
  }))
}
