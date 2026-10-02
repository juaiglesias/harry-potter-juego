import type { AroId } from './puntos'
import type { CasaId, Etapa, JuegoId } from './state'

export type AppAction =
  | { type: 'partida/configurar-total'; total: number }
  | { type: 'partida/agregar-invitado'; nombre: string }
  | { type: 'partida/editar-invitado'; id: string; nombre?: string; casa?: CasaId }
  | { type: 'partida/eliminar-invitado'; id: string }
  | { type: 'partida/avanzar-etapa' }
  | { type: 'partida/ir-a-etapa'; etapa: Etapa }
  | { type: 'partida/cargar-puntaje'; juego: JuegoId; casa: CasaId; puntos: number }
  | { type: 'preguntas/ir-a-pregunta'; indice: number }
  | { type: 'preguntas/alternar-acierto'; preguntaId: string; casa: CasaId }
  | { type: 'quidditch/registrar-embocada'; casa: CasaId; aro: AroId; delta: 1 | -1 }
