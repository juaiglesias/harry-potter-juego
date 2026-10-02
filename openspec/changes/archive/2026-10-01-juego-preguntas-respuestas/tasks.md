## 1. Dominio

- [x] 1.1 Crear `src/domain/preguntas.ts` con el tipo `Pregunta` (unión `abierta` / `multiple-choice` con `id` estable) y `PREGUNTAS_JUEGO_1` con las 20 preguntas de la sección "Contenido de las preguntas" de `design.md`, en ese orden.
- [x] 1.2 Agregar en `src/domain/preguntas.ts` las constantes `SEGUNDOS_TIMER_INICIAL = 10` y `PASO_TIMER_SEGUNDOS = 5`.
- [x] 1.3 Crear `src/domain/puntos.ts` con `PUNTOS_POR_ACIERTO` y la entrada `'preguntas-y-respuestas': 10`.
- [x] 1.4 Agregar a `Partida` en `src/domain/state.ts` el campo `preguntas` (`preguntaActual`, `aciertos`) y su valor inicial en `initialState`.
- [x] 1.5 Agregar la función pura que calcula el puntaje por casa del Juego 1 a partir de `aciertos` y `PUNTOS_POR_ACIERTO`, y exportar todo desde `src/domain/index.ts`.

## 2. Acciones y reducer

- [x] 2.1 Definir en `src/domain/actions.ts` las acciones `preguntas/ir-a-pregunta` (`indice`) y `preguntas/alternar-acierto` (`preguntaId`, `casa`).
- [x] 2.2 Implementar `preguntas/ir-a-pregunta` en el reducer, acotando el índice al rango del banco.
- [x] 2.3 Implementar `preguntas/alternar-acierto` en el reducer: agregar o sacar la casa de la pregunta y reescribir `puntajesPorJuego['preguntas-y-respuestas']` con la función de 1.5.

## 3. Timer de respuesta

- [x] 3.1 Crear `TimerPregunta` en `src/presentation/components/` que recibe `duracion` y su setter: muestra los segundos restantes, botones de subir y bajar de a 5 (mínimo 5) y un botón de play.
- [x] 3.2 Implementar la cuenta regresiva con `setInterval` dentro de un `useEffect` con cleanup, que se detiene en 0, deshabilita subir/bajar/play mientras corre y muestra el estado de tiempo cumplido.

## 4. Pantalla del Juego 1

- [x] 4.1 Crear `PreguntasPage` con `Stepper`, `MarcadorCasas` compacto, "Pregunta N de 20", el enunciado y `TimerPregunta` al lado, con `key` igual al `id` de la pregunta y la duración configurada guardada en la página.
- [x] 4.2 Mostrar la respuesta correcta en las abiertas, y en las multiple choice las 4 opciones con letra A a D y la correcta destacada.
- [x] 4.3 Agregar los 4 botones de casa que alternan el acierto de la pregunta en curso, con el estado marcado/no marcado visible, usando los colores de casa de `DESIGN.md`.
- [x] 4.4 Agregar Anterior/Siguiente deshabilitados en los extremos y el botón de avanzar etapa.
- [x] 4.5 En `App.tsx`, renderizar `PreguntasPage` para el Juego 1 y `JuegoEnCursoPage` para los Juegos 2 a 4.

## 5. Persistencia

- [x] 5.1 En `local-storage-state-port.ts`, descartar también el estado guardado que no tenga `partida.preguntas`.

## 6. Verificación

- [x] 6.1 Build y lint sin errores.
- [x] 6.2 Recorrer el Juego 1 en el navegador: navegar las 20 preguntas, marcar y desmarcar aciertos en varias casas y confirmar que el marcador suma y resta de a 10.
- [x] 6.3 Probar el timer: arranca en 10, sube y baja de a 5 con mínimo 5, descuenta hasta 0 al tocar play y vuelve a la duración configurada al cambiar de pregunta.
- [x] 6.4 Refrescar la página y retroceder a Sorteo y volver: confirmar que se conservan la pregunta en curso y los aciertos.
- [x] 6.5 Confirmar que los Juegos 2 a 4 siguen con la carga manual y que Resultados suma el Juego 1 al total.
