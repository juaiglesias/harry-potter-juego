export type CasaId = 'gryffindor' | 'slytherin' | 'ravenclaw' | 'hufflepuff'

export const CASAS: CasaId[] = ['gryffindor', 'slytherin', 'ravenclaw', 'hufflepuff']

export type JuegoId = 'preguntas-y-respuestas' | 'quidditch' | 'tabu-hp' | 'huevo-de-dragon'

export const JUEGOS: JuegoId[] = ['preguntas-y-respuestas', 'quidditch', 'tabu-hp', 'huevo-de-dragon']

export type Etapa =
  | { tipo: 'configuracion' }
  | { tipo: 'sorteo' }
  | { tipo: 'juego'; juego: JuegoId }
  | { tipo: 'resultados' }

export const ETAPAS_ORDEN: Etapa[] = [
  { tipo: 'configuracion' },
  { tipo: 'sorteo' },
  ...JUEGOS.map((juego): Etapa => ({ tipo: 'juego', juego })),
  { tipo: 'resultados' },
]

export interface Invitado {
  id: string
  nombre: string
  casa: CasaId
}

export interface Partida {
  etapaActual: Etapa
  totalParticipantes: number
  cuposPorCasa: Record<CasaId, number>
  invitados: Invitado[]
  puntajesPorJuego: Record<JuegoId, Record<CasaId, number>>
}

export interface AppState {
  partida: Partida
}

function registroCasasEnCero(): Record<CasaId, number> {
  return { gryffindor: 0, slytherin: 0, ravenclaw: 0, hufflepuff: 0 }
}

function puntajesIniciales(): Record<JuegoId, Record<CasaId, number>> {
  return {
    'preguntas-y-respuestas': registroCasasEnCero(),
    quidditch: registroCasasEnCero(),
    'tabu-hp': registroCasasEnCero(),
    'huevo-de-dragon': registroCasasEnCero(),
  }
}

export const initialState: AppState = {
  partida: {
    etapaActual: { tipo: 'configuracion' },
    totalParticipantes: 0,
    cuposPorCasa: registroCasasEnCero(),
    invitados: [],
    puntajesPorJuego: puntajesIniciales(),
  },
}
