## Context

`app-shell` ya provee el esqueleto: estado global con Context + `useReducer`, persistido en `localStorage`, y una única pantalla activa determinada por un valor de estado (sin router). `ARCHITECTURE.md` ya describe el dominio de casas, invitados y sorteo, pero nada de eso está implementado todavía: el `Screen` actual es solo `'home'` y no hay modelo de partida.

Esta change construye la columna vertebral de una partida completa: desde que el anfitrión define cuántos participantes esperan hasta que se muestra la casa ganadora, pasando por los 4 bloques de juego sin implementar la mecánica de ninguno.

## Goals / Non-Goals

**Goals:**
- Modelar las etapas de una partida como una secuencia fija y navegable (avanzar/retroceder).
- Modelar casas, cupos e invitados con sorteo aleatorio.
- Permitir cargar puntaje por casa en cada bloque de juego y corregirlo sin duplicar el total.
- Mostrar en todo momento un stepper de progreso y un marcador de puntaje.
- Calcular y mostrar el resultado final (ranking y ganadora) a partir del puntaje acumulado.

**Non-Goals:**
- Implementar la mecánica, formato o contenido particular de cada uno de los 4 juegos (preguntas, cronómetro, reglas de Quidditch, tablero de Tabú, mecánica del Huevo de Dragón). Cada uno queda para una change futura propia.
- Reordenar o hacer configurable el orden de los 4 juegos.
- Sincronización entre dispositivos o multiusuario: sigue siendo un solo dispositivo operado por el anfitrión.
- Cualquier acción de reinicio de partida expuesta en la UI (ya excluida en `ARCHITECTURE.md`).

## Decisions

**Una sola pantalla de juego parametrizada, no 4 pantallas dedicadas.** Las 4 etapas de juego comparten hoy exactamente el mismo contenido (nombre del juego + marcador + carga de puntaje + avanzar/retroceder), así que un único componente `JuegoEnCursoPage` recibe el juego activo como dato. Alternativa descartada: crear 4 componentes placeholder casi idénticos; se pospone esa separación al momento en que un juego puntual necesite una UI propia, para no adivinar hoy qué necesitará cada uno.

**El puntaje se carga ya en esta change, de forma genérica.** Cada bloque de juego persiste sus puntos por casa de forma independiente (no como un acumulador único que se va sumando), para poder corregir un valor ya cargado sin duplicar la suma. El puntaje total de una casa es un valor derivado (suma de sus puntos en cada bloque), no un campo que el reducer mute directamente. Alternativa descartada: diferir toda carga de puntaje a los cambios futuros de cada juego; se descarta porque sin puntaje real la pantalla de Resultados no tiene datos que mostrar, y el mecanismo de carga es transversal a los 4 juegos, no específico de ninguno.

**Avance sin bloqueo por cupos, con acción explícita.** Pasar de una etapa a la siguiente es una acción explícita del anfitrión, disponible siempre, sin validar que los cupos de casas estén completos. El evento es en vivo: invitados tarde o cupos que nunca se completan no deben trabar el flujo.

**Retroceso libre a cualquier etapa ya visitada.** El anfitrión puede volver a Configuración, Sorteo o cualquier bloque de juego anterior para corregir un dato, y luego volver a avanzar. No hay una vista de edición separada: la corrección ocurre en la misma pantalla de la etapa. Como el puntaje total y el resultado final son valores derivados, retroceder y corregir no requiere recalcular nada manualmente.

**Modelo de datos (`src/domain/state.ts`):**
```ts
type CasaId = 'gryffindor' | 'slytherin' | 'ravenclaw' | 'hufflepuff'
type JuegoId = 'preguntas-y-respuestas' | 'quidditch' | 'tabu-hp' | 'huevo-de-dragon'
type Etapa =
  | { tipo: 'configuracion' }
  | { tipo: 'sorteo' }
  | { tipo: 'juego'; juego: JuegoId }
  | { tipo: 'resultados' }

interface Invitado {
  id: string
  nombre: string
  casa: CasaId
}

interface Partida {
  etapaActual: Etapa
  totalParticipantes: number
  cuposPorCasa: Record<CasaId, number>
  invitados: Invitado[]
  puntajesPorJuego: Record<JuegoId, Record<CasaId, number>>
}
```
El orden fijo de etapas (`ETAPAS_ORDEN`) vive como constante en el módulo de dominio, no en el estado: avanzar/retroceder mueve `etapaActual` al vecino correspondiente en esa lista. El puntaje total por casa y el ranking de Resultados son selectores derivados de `puntajesPorJuego`, no campos persistidos aparte.

## Risks / Trade-offs

- [Guardar puntaje por bloque de juego en vez de un acumulador simple agrega un nivel de indirección al modelo] → Mitigación: el cálculo de total es un selector puro y simple (suma por casa); el reducer nunca necesita "deshacer" una suma anterior.
- [Retroceder y corregir datos de sorteo o puntaje después de haber visto Resultados podría generar confusión sobre si el resultado mostrado sigue vigente] → Mitigación: Resultados es siempre un cálculo derivado del estado actual, así que cualquier corrección posterior ya se refleja la próxima vez que se visita esa etapa.
- [Cambiar la forma de `AppState` invalida cualquier estado ya guardado en `localStorage` con la forma anterior (`{ screen: 'home' }`)] → Mitigación: el proyecto todavía no corrió en un evento real; alcanza con limpiar `localStorage` manualmente en desarrollo, sin agregar versionado ni migración de esquema.

## Migration Plan

No aplica migración de datos en producción: el proyecto no tiene todavía ningún evento real corrido. En desarrollo, quien tenga estado viejo en `localStorage` lo limpia a mano antes de probar esta change (ya documentado en `ARCHITECTURE.md` que no hay acción de reinicio en la UI).
