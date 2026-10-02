## 1. Dominio

- [x] 1.1 Agregar `PUNTOS_POR_PUESTO_HUEVO` (50, 30, 10, 0) en `src/domain/puntos.ts`.
- [x] 1.2 Agregar a `Partida` el campo `huevo` (`orden: CasaId[]`), vacío en `initialState`.
- [x] 1.3 Agregar la función pura `puntajeHuevoPorCasa` y exportar lo nuevo desde `src/domain/index.ts`.

## 2. Acciones y reducer

- [x] 2.1 Definir las acciones `huevo/anotar` (`casa`) y `huevo/deshacer`.
- [x] 2.2 Implementarlas en el reducer (sin duplicar casas en `orden`) y reescribir `puntajesPorJuego['huevo-de-dragon']` con `puntajeHuevoPorCasa`.

## 3. Pantalla del Juego 4

- [x] 3.1 Crear `HuevoDragonPage` con `Stepper`, `MarcadorCasas` compacto, la lista de orden de llegada (puesto, casa, puntos) y su estado vacío.
- [x] 3.2 Agregar un botón grande por casa pendiente para anotar que encontró el huevo, y "Deshacer último".
- [x] 3.3 Agregar el botón de avanzar a Resultados y renderizar `HuevoDragonPage` desde `App.tsx`.

## 4. Eliminación del bloque genérico

- [x] 4.1 Borrar `JuegoEnCursoPage` (y sus estilos propios si tiene), la acción `partida/cargar-puntaje` y su caso en el reducer.
- [x] 4.2 Dejar en `App.tsx` un caso por juego sin caso por defecto, para que TypeScript avise si falta una pantalla.

## 5. Persistencia

- [x] 5.1 En `local-storage-state-port.ts`, descartar también el estado guardado sin `partida.huevo`.

## 6. Verificación

- [x] 6.1 Build y lint sin errores.
- [x] 6.2 Anotar las 4 casas y confirmar puestos y puntos (50, 30, 10, 0) en la pantalla y en el marcador.
- [x] 6.3 Deshacer el último puesto y confirmar que la casa vuelve a pendientes y el puntaje se recalcula; confirmar que una casa anotada no puede anotarse de nuevo.
- [x] 6.4 Refrescar la página y retroceder y volver al Juego 4: confirmar que se conserva el orden.
- [x] 6.5 Recorrer la partida completa (Juegos 1 a 4 y Resultados) y confirmar que Resultados suma los 4 juegos.
- [x] 6.6 Revisar la pantalla en Chromium y WebKit a 1024px y 768px.
