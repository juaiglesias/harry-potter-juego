import type { AroId } from './puntos'
import type { CasaId, Etapa } from './state'
import type { ResultadoTabu } from './tabu'

export type AppAction =
  | { type: 'partida/configurar-total'; total: number }
  | { type: 'partida/agregar-invitado'; nombre: string }
  | { type: 'partida/editar-invitado'; id: string; nombre?: string; casa?: CasaId }
  | { type: 'partida/eliminar-invitado'; id: string }
  | { type: 'partida/avanzar-etapa' }
  | { type: 'partida/ir-a-etapa'; etapa: Etapa }
  | { type: 'preguntas/ir-a-pregunta'; indice: number }
  | { type: 'preguntas/alternar-acierto'; preguntaId: string; casa: CasaId }
  | { type: 'quidditch/registrar-embocada'; casa: CasaId; aro: AroId; delta: 1 | -1 }
  | { type: 'tabu/elegir-casa'; casa: CasaId | null }
  | { type: 'tabu/iniciar-turno'; casa: CasaId; ahora: number }
  | { type: 'tabu/marcar'; casa: CasaId; resultado: ResultadoTabu; ahora: number }
  | { type: 'tabu/deshacer'; casa: CasaId }
  | { type: 'huevo/anotar'; casa: CasaId }
  | { type: 'huevo/deshacer' }
