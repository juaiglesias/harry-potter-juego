import { useCallback, useRef, useState } from 'react'
import type { FormEvent } from 'react'
import { CASAS, NOMBRE_CASA } from '../../domain'
import type { CasaId } from '../../domain'
import { Button } from '../components/Button'
import { COLORES_CASA } from '../components/colores-casa'
import { Divider } from '../components/Divider'
import { MarcadorCasas } from '../components/MarcadorCasas'
import { ModalConfirmacion } from '../components/ModalConfirmacion'
import { Panel } from '../components/Panel'
import { SorteoAnimacion } from '../components/SorteoAnimacion'
import { Stepper } from '../components/Stepper'
import { useAppState } from '../state/use-app-state'
import './SorteoPage.css'

export function SorteoPage() {
  const { state, dispatch } = useAppState()
  const [nombre, setNombre] = useState('')
  const inputNombreRef = useRef<HTMLInputElement>(null)
  // La casa se sortea en el reducer: se guarda la posición que ocupa el nuevo
  // invitado y su casa se lee del estado ya actualizado.
  const [sorteoEnCurso, setSorteoEnCurso] = useState<{ indice: number } | null>(null)
  const casaSorteada = sorteoEnCurso ? state.partida.invitados[sorteoEnCurso.indice]?.casa : undefined
  const [nombreAConfirmar, setNombreAConfirmar] = useState<string | null>(null)
  const [idAEliminar, setIdAEliminar] = useState<string | null>(null)
  const invitadoAEliminar = state.partida.invitados.find((invitado) => invitado.id === idAEliminar)

  function pedirSorteo(event: FormEvent) {
    event.preventDefault()
    if (!nombre.trim()) return
    setNombreAConfirmar(nombre.trim())
  }

  function sortearInvitado(nombreConfirmado: string) {
    setNombreAConfirmar(null)
    setSorteoEnCurso({ indice: state.partida.invitados.length })
    dispatch({ type: 'partida/agregar-invitado', nombre: nombreConfirmado })
    setNombre('')
  }

  function eliminarInvitado(id: string) {
    setIdAEliminar(null)
    dispatch({ type: 'partida/eliminar-invitado', id })
  }

  const finalizarSorteo = useCallback(() => {
    setSorteoEnCurso(null)
    inputNombreRef.current?.focus()
  }, [])

  return (
    <div className="pantalla">
      <Stepper />
      <MarcadorCasas variante="compacta" />
      <Panel>
        <h1>Sorteo</h1>
        <p>Cargá el nombre de cada invitado a medida que llega y sorteá su casa.</p>
        <form onSubmit={pedirSorteo}>
          <input
            ref={inputNombreRef}
            className="campo"
            value={nombre}
            onChange={(event) => setNombre(event.target.value)}
            placeholder="Nombre del invitado"
          />
          <Button type="submit">Sortear</Button>
        </form>
        <Divider />
        {state.partida.invitados.length === 0 ? (
          <p>
            <em>Todavía no se sorteó ningún invitado.</em>
          </p>
        ) : (
          <ul className="roster">
            {state.partida.invitados.map((invitado) => (
              <li
                key={invitado.id}
                className="roster__fila"
                style={{ borderLeftColor: COLORES_CASA[invitado.casa].fondo }}
              >
                <input
                  className="campo roster__nombre"
                  value={invitado.nombre}
                  onChange={(event) =>
                    dispatch({ type: 'partida/editar-invitado', id: invitado.id, nombre: event.target.value })
                  }
                />
                <select
                  className="campo"
                  value={invitado.casa}
                  onChange={(event) =>
                    dispatch({
                      type: 'partida/editar-invitado',
                      id: invitado.id,
                      casa: event.target.value as CasaId,
                    })
                  }
                >
                  {CASAS.map((casa) => (
                    <option key={casa} value={casa}>
                      {NOMBRE_CASA[casa]}
                    </option>
                  ))}
                </select>
                <Button variant="secondary" onClick={() => setIdAEliminar(invitado.id)}>
                  Eliminar
                </Button>
              </li>
            ))}
          </ul>
        )}
      </Panel>
      <Button onClick={() => dispatch({ type: 'partida/avanzar-etapa' })}>Empezar juegos</Button>
      {nombreAConfirmar !== null && (
        <ModalConfirmacion
          pregunta={`¿Realizar sorteo de casa para ${nombreAConfirmar}?`}
          textoConfirmar="Sortear"
          enfocarConfirmar
          onConfirmar={() => sortearInvitado(nombreAConfirmar)}
          onCancelar={() => setNombreAConfirmar(null)}
        />
      )}
      {invitadoAEliminar && (
        <ModalConfirmacion
          pregunta={`¿Eliminar a ${invitadoAEliminar.nombre.trim() || 'este invitado'} del sorteo?`}
          textoConfirmar="Eliminar"
          onConfirmar={() => eliminarInvitado(invitadoAEliminar.id)}
          onCancelar={() => setIdAEliminar(null)}
        />
      )}
      {casaSorteada && <SorteoAnimacion casa={casaSorteada} onFinalizar={finalizarSorteo} />}
    </div>
  )
}
