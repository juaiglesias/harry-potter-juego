## Why

El Juego 2 (Quidditch) hoy usa el bloque genérico donde el anfitrión tipea el puntaje final de cada casa. En el evento, los equipos van tirando a tres aros y el anfitrión necesita sumar cada embocada en el momento, con un toque, sin hacer cuentas.

## What Changes

- El Juego 2 pasa a tener una pantalla propia, única para todo el juego y sin timer.
- Hay 3 aros con puntaje fijo: chico (30 puntos), mediano (20 puntos) y grande (10 puntos).
- La pantalla muestra una fila por casa con un botón por aro. Cada toque registra una embocada de esa casa en ese aro y suma sus puntos. Cada botón muestra cuántas embocadas lleva la casa en ese aro, y la fila muestra el subtotal de la casa.
- Cada aro de cada casa tiene una acción para restar una embocada, para corregir un toque por error. El conteo no baja de 0.
- El puntaje del Juego 2 se calcula a partir de las embocadas, en lugar de cargarse a mano.
- Los puntos de cada aro se definen en el mismo lugar del dominio que los puntos por acierto del Juego 1.
- Las embocadas se guardan en el estado persistido: sobreviven un refresh y se conservan al retroceder y volver al Juego 2.
- Los Juegos 3 y 4 siguen con el bloque genérico de carga manual de puntaje.

## Capabilities

### New Capabilities
- `juego-quidditch`: aros con su puntaje, registro y corrección de embocadas por casa y cálculo del puntaje del Juego 2 a partir de las embocadas.

### Modified Capabilities
- `partida-flow`: el bloque genérico de juego y la carga manual de puntaje dejan de aplicar al Juego 2; siguen aplicando a los Juegos 3 y 4.

## Impact

- `src/domain/`: aros y sus puntos en `puntos.ts`, estado de embocadas en la partida, nuevas acciones y su manejo en el reducer.
- `src/presentation/pages/`: nueva pantalla del Juego 2; `JuegoEnCursoPage` queda solo para los Juegos 3 y 4.
- `src/infrastructure/local-storage-state-port.ts`: el estado guardado antes de este cambio no tiene las embocadas y se descarta al iniciar, igual que con las formas anteriores de `AppState`.
