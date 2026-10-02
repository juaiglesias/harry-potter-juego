## Why

El Juego 4 (Huevo de Dragón) es el último que sigue con el bloque genérico de carga manual de puntaje. En el evento, cada casa busca su huevo y el anfitrión necesita anotar en qué orden lo encuentran, con un toque por casa, y que la app asigne los puntos según el puesto.

## What Changes

- El Juego 4 pasa a tener una pantalla propia con las 4 casas. Cuando una casa encuentra su huevo, el anfitrión la toca y la app le asigna el siguiente puesto libre.
- Puntos por puesto: 1.º 50, 2.º 30, 3.º 10 y 4.º 0. Se definen en `puntos.ts`, con los del resto de los juegos.
- La pantalla muestra el orden de llegada con el puesto y los puntos de cada casa, y las casas que todavía buscan.
- Se puede deshacer el último puesto anotado para corregir un toque equivocado.
- El puntaje del Juego 4 se calcula a partir del orden anotado, en lugar de cargarse a mano.
- El orden se guarda en el estado persistido: sobrevive un refresh y se conserva al retroceder y volver.
- Con este juego, los 4 juegos tienen mecánica propia: se eliminan el bloque genérico de juego (`JuegoEnCursoPage`) y la acción de carga manual de puntaje, que quedan sin uso. **BREAKING** para la spec de `partida-flow`: se quitan esos dos requirements.

## Capabilities

### New Capabilities
- `juego-huevo-dragon`: orden de llegada de las casas al encontrar el huevo, puntos por puesto, corrección y cálculo del puntaje del Juego 4.

### Modified Capabilities
- `partida-flow`: se quitan los requirements "Bloque genérico de juego" y "Carga de puntaje por casa en cada bloque de juego", porque ningún juego los usa.

## Impact

- `src/domain/`: puntos por puesto en `puntos.ts`, estado del orden de llegada en la partida, nuevas acciones y su manejo en el reducer; se elimina la acción `partida/cargar-puntaje`.
- `src/presentation/pages/`: nueva pantalla del Juego 4; se elimina `JuegoEnCursoPage`.
- `src/infrastructure/local-storage-state-port.ts`: el estado guardado antes de este cambio no tiene el orden del Juego 4 y se descarta al iniciar, igual que en los cambios anteriores.
