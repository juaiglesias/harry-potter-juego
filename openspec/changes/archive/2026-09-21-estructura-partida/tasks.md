## 1. Modelo de dominio

- [x] 1.1 Reemplazar `Screen` en `src/domain/state.ts` por el tipo `Etapa` (configuracion, sorteo, juego parametrizado por `JuegoId`, resultados) y la constante de orden fijo de etapas.
- [x] 1.2 Agregar los tipos `CasaId`, `JuegoId` (con las 4 casas y los 4 juegos en su orden fijo) e `Invitado`.
- [x] 1.3 Agregar `Partida` al `AppState`: `totalParticipantes`, `cuposPorCasa`, `invitados`, `puntajesPorJuego`, y actualizar `initialState`.
- [x] 1.4 Agregar funciones de dominio puras: cálculo de cupos por casa a partir del total (reparto parejo + resto sorteado), sorteo de casa para un invitado nuevo respetando cupos, y selectores derivados de puntaje total por casa y ranking de resultados.

## 2. Acciones y reducer

- [x] 2.1 Definir en `src/domain/actions.ts` las acciones: configurar total de participantes, agregar/editar/eliminar invitado, avanzar etapa, retroceder etapa, cargar puntaje de casa en la etapa de juego activa.
- [x] 2.2 Implementar cada acción en `src/domain/reducer.ts`, incluyendo el recálculo de cupos al editar el total y el reemplazo (no acumulación) del puntaje al corregir un bloque ya cargado.

## 3. Componentes compartidos

- [x] 3.1 Crear componente `Stepper` que muestra las 7 etapas y resalta la activa, usando los tokens de `DESIGN.md`.
- [x] 3.2 Crear componente `MarcadorCasas` con las 4 casas y su puntaje total, con variante compacta (para las etapas de juego) y variante destacada (para Resultados).

## 4. Pantallas

- [x] 4.1 Pantalla de Configuración: input de cantidad total de participantes, edición posterior, acción de avanzar a Sorteo.
- [x] 4.2 Pantalla de Sorteo: alta de invitado por nombre con sorteo de casa, listado de invitados con edición y eliminación, `Stepper`, `MarcadorCasas`, acciones de avanzar/retroceder.
- [x] 4.3 Pantalla de juego en curso (única, parametrizada por `JuegoId`): nombre del juego activo, carga de puntaje por casa, `Stepper`, `MarcadorCasas` en variante compacta, acciones de avanzar/retroceder.
- [x] 4.4 Pantalla de Resultados: ranking de casas por puntaje descendente, casa(s) ganadora(s) destacada(s) (incluyendo empate), `Stepper`, `MarcadorCasas` en variante destacada, acción de retroceder.

## 5. Integración

- [x] 5.1 Actualizar `src/presentation/App.tsx` para renderizar la pantalla según `etapaActual` en lugar de `HomePage`, y eliminar `HomePage`.
- [x] 5.2 Revisar `src/infrastructure/local-storage-state-port.ts`: confirmar que no necesita cambios (guarda/lee el `AppState` genérico) y limpiar el `localStorage` de desarrollo si quedó estado con la forma vieja.

## 6. Verificación

- [x] 6.1 Recorrer manualmente una partida completa en el navegador: configuración → sorteo de varios invitados → los 4 bloques de juego cargando puntaje → resultados, incluyendo al menos un retroceso y una corrección de puntaje.
- [x] 6.2 Verificar que el build offline (`vite-plugin-singlefile`, abierto vía `file://`) sigue funcionando sin errores tras los cambios.
