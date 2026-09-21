## Why

Hoy la app solo tiene el esqueleto técnico (`app-shell`): una única pantalla `home` sin contenido de juego. Falta la estructura que lleva una partida real desde que arranca hasta que termina: elegir cuántos participantes vienen, sumarlos a medida que llegan, recorrer los bloques de juego en orden y cerrar con un resultado. Sin esa columna vertebral no hay dónde enchufar después cada juego en particular.

## What Changes

- Pantalla de configuración inicial: el anfitrión carga la cantidad total de participantes esperados (editable después).
- Pantalla de sorteo (fase 0): alta de invitados a medida que llegan, con asignación aleatoria de casa respetando los cupos calculados a partir del total.
- Pantalla única de "juego en curso" (fase 1), parametrizada por cuál de los 4 juegos está activo, en orden fijo: Preguntas y respuestas, Quidditch, Tabú HP, Huevo de Dragón. No se implementa la mecánica particular de ningún juego, solo el bloque genérico con su nombre y la carga de puntaje.
- Carga genérica de puntaje por casa en cada bloque de juego (4 valores numéricos, uno por casa), editable/corregible mientras la partida esté en curso.
- Pantalla de resultados (fase 2): ranking de las 4 casas por puntaje acumulado, con la ganadora destacada.
- Marcador de puntaje de las 4 casas visible en todo momento: chico y al costado durante los bloques de juego, protagonista en resultados.
- Navegación entre bloques con botón explícito de avanzar (sin exigir cupos completos) y posibilidad de retroceder a cualquier bloque anterior para corregir datos.
- Stepper persistente en la vista de control con las 7 etapas (Configuración, Sorteo, Juego 1 a 4, Resultados), marcando cuál está activa.

## Capabilities

### New Capabilities
- `partida-flow`: estado y navegación de la partida (etapas, stepper, avanzar/retroceder, marcador de puntaje persistente, pantalla de resultados).
- `casas-sorteo`: configuración de cupos por casa a partir del total de participantes, alta de invitados con sorteo aleatorio, edición y eliminación de un invitado ya sorteado.

### Modified Capabilities
- Ninguna. `app-shell` no cambia sus requisitos: sigue determinando la pantalla activa desde un único valor de estado sin router; esta change solo agrega nuevos valores posibles a ese estado.

## Impact

- `src/domain/state.ts`: reemplaza el `Screen` de solo `'home'` por el modelo de etapas de la partida, y agrega el modelo de casas, invitados y puntajes.
- `src/domain/actions.ts` y `src/domain/reducer.ts`: nuevas acciones para configurar el total de participantes, sortear/editar/eliminar invitados, avanzar/retroceder de etapa y cargar puntaje por casa.
- `src/presentation/pages`: nuevas pantallas (configuración, sorteo, juego en curso, resultados) reemplazando `HomePage`.
- `src/presentation/components`: nuevo stepper de progreso y marcador de puntaje, reutilizando los componentes visuales existentes (`Panel`, `Button`, `Divider`).
- No afecta infraestructura de persistencia (`local-storage-state-port.ts` sigue guardando el mismo store, solo cambia su forma).
