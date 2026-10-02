import type { AppAction } from './actions'
import { calcularCuposPorCasa, etapaSiguiente, indiceEtapa, puntajePreguntasPorCasa, sortearCasa } from './partida'
import { PREGUNTAS_JUEGO_1 } from './preguntas'
import type { AppState } from './state'

export function appReducer(state: AppState, action: AppAction): AppState {
  const { partida } = state

  switch (action.type) {
    case 'partida/configurar-total': {
      const total = Math.max(0, action.total)
      return {
        ...state,
        partida: {
          ...partida,
          totalParticipantes: total,
          cuposPorCasa: calcularCuposPorCasa(total),
        },
      }
    }

    case 'partida/agregar-invitado': {
      const casa = sortearCasa(partida.cuposPorCasa, partida.invitados)
      return {
        ...state,
        partida: {
          ...partida,
          invitados: [...partida.invitados, { id: crypto.randomUUID(), nombre: action.nombre, casa }],
        },
      }
    }

    case 'partida/editar-invitado': {
      return {
        ...state,
        partida: {
          ...partida,
          invitados: partida.invitados.map((invitado) =>
            invitado.id === action.id
              ? {
                  ...invitado,
                  nombre: action.nombre ?? invitado.nombre,
                  casa: action.casa ?? invitado.casa,
                }
              : invitado,
          ),
        },
      }
    }

    case 'partida/eliminar-invitado': {
      return {
        ...state,
        partida: {
          ...partida,
          invitados: partida.invitados.filter((invitado) => invitado.id !== action.id),
        },
      }
    }

    case 'partida/avanzar-etapa': {
      return {
        ...state,
        partida: { ...partida, etapaActual: etapaSiguiente(partida.etapaActual) },
      }
    }

    case 'partida/ir-a-etapa': {
      if (indiceEtapa(action.etapa) > indiceEtapa(partida.etapaActual)) return state
      return {
        ...state,
        partida: { ...partida, etapaActual: action.etapa },
      }
    }

    case 'partida/cargar-puntaje': {
      return {
        ...state,
        partida: {
          ...partida,
          puntajesPorJuego: {
            ...partida.puntajesPorJuego,
            [action.juego]: {
              ...partida.puntajesPorJuego[action.juego],
              [action.casa]: action.puntos,
            },
          },
        },
      }
    }

    case 'preguntas/ir-a-pregunta': {
      const indice = Math.min(Math.max(action.indice, 0), PREGUNTAS_JUEGO_1.length - 1)
      return {
        ...state,
        partida: { ...partida, preguntas: { ...partida.preguntas, preguntaActual: indice } },
      }
    }

    case 'preguntas/alternar-acierto': {
      const acertadas = partida.preguntas.aciertos[action.preguntaId] ?? []
      const aciertos = {
        ...partida.preguntas.aciertos,
        [action.preguntaId]: acertadas.includes(action.casa)
          ? acertadas.filter((casa) => casa !== action.casa)
          : [...acertadas, action.casa],
      }
      // El puntaje del Juego 1 se reescribe completo desde los aciertos,
      // así nunca se desfasa de lo marcado.
      return {
        ...state,
        partida: {
          ...partida,
          preguntas: { ...partida.preguntas, aciertos },
          puntajesPorJuego: {
            ...partida.puntajesPorJuego,
            'preguntas-y-respuestas': puntajePreguntasPorCasa(aciertos),
          },
        },
      }
    }

    default:
      return state
  }
}
