## 1. Dominio

- [x] 1.1 Crear `src/domain/tabu.ts` con `TarjetaTabu`, `TARJETAS_TABU` (las 60 tarjetas de la sección "Contenido de las tarjetas" de `design.md`, con ids únicos), `TARJETAS_POR_CASA` y `DURACION_TURNO_TABU_SEGUNDOS`.
- [x] 1.2 Agregar `repartirTarjetas()` (Fisher-Yates, 15 por casa, volviendo a sortear si una casa repite palabra, con tope de 1000 intentos) y las funciones puras para derivar el estado de un turno (pendiente, en curso, terminado) y la tarjeta en curso.
- [x] 1.3 Agregar `PUNTOS_TABU` en `src/domain/puntos.ts` y la función `puntajeTabuPorCasa`.
- [x] 1.4 Agregar a `Partida` el campo `tabu` (`reparto`, `turnos`, `casaEnTurno`) y su valor inicial en `initialState` con `repartirTarjetas()`. Exportar lo nuevo desde `src/domain/index.ts`.

## 2. Acciones y reducer

- [x] 2.1 Definir las acciones `tabu/elegir-casa`, `tabu/iniciar-turno`, `tabu/marcar` y `tabu/deshacer`.
- [x] 2.2 Implementar `tabu/elegir-casa` y `tabu/iniciar-turno` (solo si la casa no jugó).
- [x] 2.3 Implementar `tabu/marcar` (solo con el turno en curso) y `tabu/deshacer`, reescribiendo `puntajesPorJuego['tabu-hp']` con `puntajeTabuPorCasa`.

## 3. Pantalla del Juego 3

- [x] 3.1 Crear `TabuPage` con `Stepper`, `MarcadorCasas` compacto y la selección de casa con el estado y puntaje de cada una.
- [x] 3.2 Pantalla previa al turno con el botón "Empezar turno".
- [x] 3.3 Pantalla del turno en curso: reloj m:ss calculado desde `venceEn`, "Tarjeta N de 15", palabra, prohibidas, botones ✓ y ✗ grandes y separados, y "Deshacer".
- [x] 3.4 Pantalla de turno terminado con el resumen (checks, cruces, puntos), "Deshacer" y vuelta a la selección; pasar a ella sola cuando el reloj llega a 0.
- [x] 3.5 Botón de avanzar etapa y, en `App.tsx`, renderizar `TabuPage` para el Juego 3 y `JuegoEnCursoPage` solo para el Juego 4.
- [x] 3.6 Aplicar un throttle de 600 ms a los botones ✓ y ✗ para que un doble toque no marque dos tarjetas.

## 4. Persistencia

- [x] 4.1 En `local-storage-state-port.ts`, descartar también el estado guardado sin `partida.tabu`.

## 5. Verificación

- [x] 5.1 Build y lint sin errores.
- [x] 5.2 Confirmar que el reparto da 15 tarjetas por casa sin repetir ids, que ninguna casa repite palabra (corriendo `repartirTarjetas()` muchas veces) y que se mantiene tras un refresh.
- [x] 5.3 Jugar un turno completo: checks y cruces avanzan de tarjeta, el puntaje suma y resta de a 10 (incluido un total negativo) y deshacer corrige.
- [x] 5.4 Confirmar que el turno termina al llegar a 0 (acortando la duración en la prueba) y al marcar las 15 tarjetas, y que una casa que ya jugó no puede volver a iniciar.
- [x] 5.5 Recargar en medio de un turno y confirmar que el reloj sigue desde donde iba y que las marcas se conservan.
- [x] 5.6 Confirmar que los Juegos 1 y 2 siguen igual, que el Juego 4 sigue con carga manual y que Resultados suma el Juego 3.
- [x] 5.7 Revisar la pantalla del turno en Chromium y WebKit a 1024px y 768px.
- [x] 5.8 Confirmar que un doble clic en ✓ o ✗ marca una sola tarjeta y que dos toques separados por más de 600 ms marcan dos.
