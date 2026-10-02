import type { AppAction } from './actions'
import { calcularCuposPorCasa, etapaSiguiente, indiceEtapa, puntajeHuevoPorCasa, puntajePreguntasPorCasa, puntajeQuidditchPorCasa, puntajeTabuPorCasa, sortearCasa } from './partida'
import { PREGUNTAS_JUEGO_1 } from './preguntas'
import type { AppState, CasaId } from './state'
import { DURACION_TURNO_TABU_SEGUNDOS, estadoTurnoTabu } from './tabu'
import type { TurnoTabu } from './tabu'

/** Reemplaza el orden del Juego 4 y reescribe su puntaje desde ese orden. */
function conOrdenHuevo(state: AppState, orden: CasaId[]): AppState {
  const { partida } = state
  return {
    ...state,
    partida: {
      ...partida,
      huevo: { orden },
      puntajesPorJuego: { ...partida.puntajesPorJuego, 'huevo-de-dragon': puntajeHuevoPorCasa(orden) },
    },
  }
}

/** Reemplaza el turno de una casa y reescribe el puntaje del Juego 3 desde los turnos. */
function conTurnoTabu(state: AppState, casa: CasaId, turno: TurnoTabu): AppState {
  const { partida } = state
  const turnos = { ...partida.tabu.turnos, [casa]: turno }
  return {
    ...state,
    partida: {
      ...partida,
      tabu: { ...partida.tabu, turnos },
      puntajesPorJuego: { ...partida.puntajesPorJuego, 'tabu-hp': puntajeTabuPorCasa(turnos) },
    },
  }
}

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

    case 'quidditch/registrar-embocada': {
      const delCasa = partida.quidditch.embocadas[action.casa]
      const embocadas = {
        ...partida.quidditch.embocadas,
        [action.casa]: { ...delCasa, [action.aro]: Math.max(delCasa[action.aro] + action.delta, 0) },
      }
      // Igual que en el Juego 1: el puntaje se reescribe completo desde las
      // embocadas para que nunca se desfase.
      return {
        ...state,
        partida: {
          ...partida,
          quidditch: { embocadas },
          puntajesPorJuego: { ...partida.puntajesPorJuego, quidditch: puntajeQuidditchPorCasa(embocadas) },
        },
      }
    }

    case 'tabu/elegir-casa': {
      return { ...state, partida: { ...partida, tabu: { ...partida.tabu, casaEnTurno: action.casa } } }
    }

    case 'tabu/iniciar-turno': {
      const turno = partida.tabu.turnos[action.casa]
      if (turno.venceEn !== null) return state
      return conTurnoTabu(state, action.casa, {
        ...turno,
        venceEn: action.ahora + DURACION_TURNO_TABU_SEGUNDOS * 1000,
      })
    }

    case 'tabu/marcar': {
      const turno = partida.tabu.turnos[action.casa]
      if (estadoTurnoTabu(turno, action.ahora) !== 'en-curso') return state
      return conTurnoTabu(state, action.casa, { ...turno, resultados: [...turno.resultados, action.resultado] })
    }

    case 'tabu/deshacer': {
      const turno = partida.tabu.turnos[action.casa]
      if (turno.resultados.length === 0) return state
      return conTurnoTabu(state, action.casa, { ...turno, resultados: turno.resultados.slice(0, -1) })
    }

    case 'huevo/anotar': {
      if (partida.huevo.orden.includes(action.casa)) return state
      return conOrdenHuevo(state, [...partida.huevo.orden, action.casa])
    }

    case 'huevo/deshacer': {
      if (partida.huevo.orden.length === 0) return state
      return conOrdenHuevo(state, partida.huevo.orden.slice(0, -1))
    }

    default:
      return state
  }
}
