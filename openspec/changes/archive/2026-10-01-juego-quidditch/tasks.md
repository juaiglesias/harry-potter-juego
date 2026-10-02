## 1. Dominio

- [x] 1.1 Agregar en `src/domain/puntos.ts` el tipo `AroId`, la constante `AROS` (chico, mediano, grande) y `PUNTOS_POR_ARO` (30, 20, 10).
- [x] 1.2 Agregar a `Partida` en `src/domain/state.ts` el campo `quidditch` con `embocadas` por casa y aro, en 0 en `initialState`.
- [x] 1.3 Agregar la función pura `puntajeQuidditchPorCasa` y exportar lo nuevo desde `src/domain/index.ts`.

## 2. Acciones y reducer

- [x] 2.1 Definir en `src/domain/actions.ts` la acción `quidditch/registrar-embocada` (`casa`, `aro`, `delta: 1 | -1`).
- [x] 2.2 Implementarla en el reducer: aplicar el delta sin bajar de 0 y reescribir `puntajesPorJuego.quidditch` con `puntajeQuidditchPorCasa`.

## 3. Pantalla del Juego 2

- [x] 3.1 Crear `QuidditchPage` con `Stepper`, `MarcadorCasas` compacto y el encabezado de los 3 aros con sus puntos.
- [x] 3.2 Agregar una fila por casa con franja de color, un botón grande por aro que registra la embocada y muestra el conteo, un botón "−" deshabilitado en 0 y el subtotal de la casa.
- [x] 3.3 Agregar el botón de avanzar etapa.
- [x] 3.4 En `App.tsx`, renderizar `QuidditchPage` para el Juego 2 y `JuegoEnCursoPage` solo para los Juegos 3 y 4.

## 4. Persistencia

- [x] 4.1 En `local-storage-state-port.ts`, descartar también el estado guardado sin `partida.quidditch`.

## 5. Verificación

- [x] 5.1 Build y lint sin errores.
- [x] 5.2 Registrar embocadas en distintos aros y casas y confirmar conteos, subtotales y marcador (por ejemplo, 2 en mediano y 1 en grande = 50).
- [x] 5.3 Restar embocadas y confirmar que el puntaje baja y que el "−" queda deshabilitado en 0.
- [x] 5.4 Refrescar la página y retroceder y volver al Juego 2: confirmar que se conservan las embocadas.
- [x] 5.5 Confirmar que el Juego 1 sigue igual, que los Juegos 3 y 4 siguen con carga manual y que Resultados suma el Juego 2 al total.
- [x] 5.6 Revisar la pantalla en Chromium y WebKit a ancho de tablet (1024px y 768px).
