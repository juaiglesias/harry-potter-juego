# Arquitectura

## Qué es

Juego para eventos presenciales: sortea a cada invitado en una de 4 casas de Hogwarts, arma equipos parejos y lleva el puntaje de un evento en vivo con varias fases de juego. Corre desde un único dispositivo (tablet/iPad), operado por un anfitrión. Los invitados solo interactúan con la pantalla en el momento puntual de su propio sorteo.

## Contexto de uso

- Un solo dispositivo, un solo operador. No hay necesidad de sincronizar estado entre dispositivos ni usuarios concurrentes.
- Sesión única por evento: se arranca al principio, se juega en vivo y se cierra con un ganador.
- Debe funcionar sin depender de conexión a internet: el lugar del evento puede no tener wifi confiable.

## Modelo de dominio

- **Casa**: una de 4 (Gryffindor, Slytherin, Ravenclaw, Hufflepuff). Tiene identidad visual (ver `DESIGN.md`), un cupo máximo de integrantes y un puntaje acumulado.
- **Invitado**: nombre y casa asignada. Se da de alta en el momento del sorteo, no hay lista previa de invitados cargada de antemano.
- **Configuración del evento**: cantidad total de participantes esperada, editable en cualquier momento. De ahí se derivan los cupos por casa.

## Flujo funcional

1. **Configuración inicial**: el anfitrión carga el total de participantes esperado. Se calculan los cupos por casa (reparto parejo, y si el total no es múltiplo de 4, el resto se sortea al azar entre las casas para decidir cuáles tienen un cupo extra).
2. **Sorteo**: por cada invitado que llega, el anfitrión carga su nombre y dispara el sorteo. La asignación es al azar entre las casas que todavía no llegaron a su cupo.
3. **Fases de juego**: el anfitrión usa la app para leer preguntas a los participantes durante la fase de preguntas y respuestas, o para cargar puntos de otros juegos que se juegan fuera de la app. El detalle de la fase de preguntas (formato, cronómetro, cómo se cargan las preguntas) queda fuera de este documento y se define más adelante.
4. **Cierre**: gana la casa con más puntos acumulados.

## Reglas de negocio

- El total de participantes se puede editar en cualquier momento, recalculando los cupos por casa.
- Un invitado ya sorteado se puede editar (nombre o casa) o eliminar.
- Una carga de puntos se puede corregir o deshacer.
- No hay ninguna acción de reinicio expuesta en la interfaz. Si hace falta limpiar el estado para pruebas, se hace por fuera de la app.

## Pantallas

- **Vista de sorteo**: la única que ve un invitado, en el momento de su sorteo.
- **Vista de control**: uso exclusivo del anfitrión. Roster de invitados, fases de juego y puntaje.

No hay routing por URL ni historial de navegación: las pantallas son estados internos de una única aplicación de página, acorde a un flujo controlado en un solo dispositivo.

## Estado y persistencia

Todo el estado (configuración del evento, invitados, puntajes) vive en el cliente, manejado con Context + `useReducer` de React, sin librería externa de manejo de estado. Se sincroniza a `localStorage` en cada cambio, para sobrevivir un refresh o cierre accidental del navegador durante el evento.

## Stack técnico

- React + Vite.
- Sin backend ni base de datos.
- Tipografía y assets self-hosteados (sin CDN externo), para que el diseño de `DESIGN.md` se vea igual sin conexión.

## Despliegue

Build estático, sin hosting. Se abre localmente en el navegador del dispositivo (Chrome o Safari), o se sirve desde una notebook en la misma red local como respaldo si hiciera falta.

## Fuera de alcance

- Formato y contenido de la fase de preguntas y respuestas.
- Cualquier lógica de juego para las fases que se juegan fuera de la app: solo se registra el puntaje resultante.
