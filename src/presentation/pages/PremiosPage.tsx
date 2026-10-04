import { NOMBRE_CASA, elegiblesPremio, tandaEnCurso, tandasPremios } from '../../domain'
import type { TandaPremios } from '../../domain'
import { Button } from '../components/Button'
import { COLORES_CASA } from '../components/colores-casa'
import { Divider } from '../components/Divider'
import { Panel } from '../components/Panel'
import { Stepper } from '../components/Stepper'
import { useAppState } from '../state/use-app-state'
import './PremiosPage.css'

function nombreTanda({ tanda, puesto }: TandaPremios): string {
  return tanda === 'final' ? 'Sorteo final' : `${NOMBRE_CASA[tanda]}, ${(puesto ?? 0) + 1}.º puesto`
}

export function PremiosPage() {
  const { state, dispatch } = useAppState()
  const { puntajesPorJuego, invitados, premios } = state.partida
  const { ganadores } = premios

  const tandas = tandasPremios(puntajesPorJuego)
  const enCurso = tandaEnCurso(puntajesPorJuego, invitados, ganadores)
  const ultimo = ganadores.at(-1)
  const invitadoUltimo = ultimo && invitados.find((invitado) => invitado.id === ultimo.invitadoId)
  const tandaUltimo = ultimo && tandas.find(({ tanda }) => tanda === ultimo.tanda)
  const puedeVolverASortear = ultimo !== undefined && elegiblesPremio(ultimo.tanda, invitados, ganadores).length > 0
  const sorteadosEnCurso = enCurso ? ganadores.filter(({ tanda }) => tanda === enCurso.tanda).length : 0
  // Si la casa tiene menos invitados que premios, se cuentan solo los que se pueden sortear.
  const totalEnCurso = enCurso
    ? Math.min(enCurso.cantidad, sorteadosEnCurso + elegiblesPremio(enCurso.tanda, invitados, ganadores).length)
    : 0

  return (
    <div className="pantalla">
      <Stepper />
      <Panel>
        <h1>Premios</h1>
        {enCurso ? (
          <p className="premios__tanda">
            <span>{nombreTanda(enCurso)}</span>
            <span className="premios__contador">
              Premio {sorteadosEnCurso + 1} de {totalEnCurso}
            </span>
          </p>
        ) : (
          <p className="premios__tanda">Sorteo terminado</p>
        )}

        {invitadoUltimo && tandaUltimo ? (
          // El premio final es de toda la partida: sin color de casa.
          <div
            className={tandaUltimo.tanda === 'final' ? 'premios__ganador premios__ganador--final' : 'premios__ganador'}
            style={
              tandaUltimo.tanda === 'final'
                ? undefined
                : { background: COLORES_CASA[invitadoUltimo.casa].fondo, color: COLORES_CASA[invitadoUltimo.casa].texto }
            }
          >
            <span className="premios__nombre">{invitadoUltimo.nombre}</span>
            <span className="premios__detalle">{nombreTanda(tandaUltimo)}</span>
          </div>
        ) : (
          <p className="premios__vacio">
            <em>Tocá Sortear para el primer premio.</em>
          </p>
        )}

        <div className="premios__acciones">
          <Button disabled={!enCurso} onClick={() => dispatch({ type: 'premios/sortear', azar: Math.random() })}>
            Sortear
          </Button>
          {ultimo && (
            <Button
              variant="secondary"
              disabled={!puedeVolverASortear}
              onClick={() => dispatch({ type: 'premios/volver-a-sortear', azar: Math.random() })}
            >
              Volver a sortear
            </Button>
          )}
        </div>

        {ganadores.length > 0 && (
          <>
            <Divider />
            <h2 className="premios__titulo">Ganadores</h2>
            {tandas.map((tandaPremios) => {
              const ganadoresTanda = ganadores
                .filter(({ tanda }) => tanda === tandaPremios.tanda)
                .map(({ invitadoId }) => invitados.find((invitado) => invitado.id === invitadoId))
                .filter((invitado) => invitado !== undefined)
              if (ganadoresTanda.length === 0) return null

              return (
                <section key={tandaPremios.tanda} className="premios__grupo">
                  <h3 className="premios__grupo-titulo">{nombreTanda(tandaPremios)}</h3>
                  <ol className="premios__lista">
                    {ganadoresTanda.map((invitado) => (
                      <li
                        key={invitado.id}
                        className={tandaPremios.tanda === 'final' ? 'premios__fila premios__fila--final' : 'premios__fila'}
                        style={tandaPremios.tanda === 'final' ? undefined : { borderLeftColor: COLORES_CASA[invitado.casa].fondo }}
                      >
                        {invitado.nombre}
                      </li>
                    ))}
                  </ol>
                </section>
              )
            })}
          </>
        )}
      </Panel>
    </div>
  )
}
