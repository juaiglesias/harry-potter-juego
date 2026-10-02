## Why

El Juego 1 (Preguntas y respuestas) hoy es un bloque genérico donde el anfitrión tipea a mano el puntaje de cada casa. Para jugarlo en vivo, el anfitrión necesita leer las preguntas desde la app, tener la respuesta correcta a la vista y marcar qué casas acertaron, dejando que la app calcule los puntos.

## What Changes

- El Juego 1 pasa a tener una pantalla propia: muestra una pregunta por vez, con sus opciones cuando es multiple choice y la respuesta correcta, y permite navegar entre las 20 preguntas (anterior/siguiente).
- Junto a cada pregunta hay un timer de cuenta regresiva para dar tiempo a responder: arranca en 10 segundos, se ajusta de a 5 segundos con dos botones (subir y bajar) antes de iniciarlo, y un botón de play lo hace descontar hasta 0.
- Las casas responden fuera de la app. Por cada pregunta, el anfitrión marca qué casas respondieron bien, y puede desmarcar para corregir.
- Cada respuesta correcta suma 10 puntos a la casa. El puntaje del Juego 1 se calcula a partir de los aciertos marcados, en lugar de cargarse a mano.
- Los puntos por acierto quedan definidos en un único lugar del dominio, pensado para sumar ahí los valores de los próximos juegos.
- Las 20 preguntas son contenido fijo del proyecto (13 abiertas y 5 multiple choice, más 2 abiertas con respuesta de varios elementos), sin edición desde la interfaz.
- Los aciertos marcados y la pregunta en curso se guardan en el estado persistido: sobreviven un refresh y se conservan al retroceder y volver al Juego 1.
- Los Juegos 2, 3 y 4 siguen con el bloque genérico de carga manual de puntaje.

## Capabilities

### New Capabilities
- `juego-preguntas`: banco de preguntas del Juego 1, navegación entre preguntas, timer de respuesta, marcado de aciertos por casa y cálculo del puntaje a partir de los aciertos.

### Modified Capabilities
- `partida-flow`: el requirement "Bloque genérico de juego" y la carga manual de puntaje dejan de aplicar al Juego 1, que pasa a tener mecánica propia; siguen aplicando a los Juegos 2, 3 y 4.

## Impact

- `src/domain/`: preguntas del Juego 1, puntos por acierto centralizados, nuevo estado de la partida para aciertos y pregunta en curso, nuevas acciones y su manejo en el reducer.
- `src/presentation/pages/`: nueva pantalla del Juego 1; `JuegoEnCursoPage` queda solo para los Juegos 2 a 4.
- `src/infrastructure/local-storage-state-port.ts`: el estado guardado antes de este cambio no tiene los campos nuevos y se descarta al iniciar, igual que con las formas anteriores de `AppState`.
