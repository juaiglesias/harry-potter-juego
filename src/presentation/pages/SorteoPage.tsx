import { useCallback, useRef, useState } from 'react'
import type { FormEvent } from 'react'
import { CASAS, NOMBRE_CASA } from '../../domain'
import type { CasaId } from '../../domain'
import { Button } from '../components/Button'
import { Divider } from '../components/Divider'
import { MarcadorCasas } from '../components/MarcadorCasas'
import { Panel } from '../components/Panel'
import { SorteoAnimacion } from '../components/SorteoAnimacion'
import { Stepper } from '../components/Stepper'
import { useAppState } from '../state/use-app-state'

export function SorteoPage() {
  const { state, dispatch } = useAppState()
  const [nombre, setNombre] = useState('')
  const inputNombreRef = useRef<HTMLInputElement>(null)
  // La casa se sortea en el reducer: se guarda la posición que ocupa el nuevo
  // invitado y su casa se lee del estado ya actualizado.
  const [sorteoEnCurso, setSorteoEnCurso] = useState<{ indice: number } | null>(null)
  const casaSorteada = sorteoEnCurso ? state.partida.invitados[sorteoEnCurso.indice]?.casa : undefined

  function sortearInvitado(event: FormEvent) {
    event.preventDefault()
    if (!nombre.trim()) return
    setSorteoEnCurso({ indice: state.partida.invitados.length })
    dispatch({ type: 'partida/agregar-invitado', nombre: nombre.trim() })
    setNombre('')
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
        <form onSubmit={sortearInvitado}>
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
          <ul>
            {state.partida.invitados.map((invitado) => (
              <li key={invitado.id}>
                <input
                  className="campo"
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
                <Button
                  variant="secondary"
                  onClick={() => dispatch({ type: 'partida/eliminar-invitado', id: invitado.id })}
                >
                  Eliminar
                </Button>
              </li>
            ))}
          </ul>
        )}
      </Panel>
      <Button onClick={() => dispatch({ type: 'partida/avanzar-etapa' })}>Empezar juegos</Button>
      {casaSorteada && <SorteoAnimacion casa={casaSorteada} onFinalizar={finalizarSorteo} />}
    </div>
  )
}
