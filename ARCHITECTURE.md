# Arquitectura

## Qué es

Una app de página única, sin backend, que lleva una partida del juego de Harry Potter de principio a fin: sorteo de casas, cuatro juegos con su puntaje y sorteo de premios. Qué hace cada etapa está en `openspec/specs/`; este documento cubre cómo está armado el código.

## Contexto de uso

Estas restricciones explican la mayoría de las decisiones de abajo:

- Un solo dispositivo (tablet o notebook) y un solo operador, el anfitrión. No hay que sincronizar estado entre dispositivos ni manejar usuarios concurrentes.
- Una sesión por evento: se arranca al principio, se juega en vivo y se cierra con los premios.
- Tiene que funcionar sin conexión a internet, porque el lugar del evento puede no tener wifi confiable.
- Un refresh o un cierre accidental del navegador no puede hacer perder la partida.

## Modelo de dominio

El estado completo es un `AppState` con una única `Partida` (`src/domain/state.ts`):

- **Etapa actual**: una de una secuencia fija (`ETAPAS_ORDEN`): configuración, sorteo, los cuatro juegos, resultados y premios.
- **Configuración**: total de participantes esperado y cupos por casa derivados de ese total.
- **Invitados**: nombre y casa asignada. Se dan de alta en el momento del sorteo.
- **Progreso de cada juego**: un objeto por juego con lo mínimo para reconstruir su pantalla y su puntaje (aciertos por pregunta, embocadas por aro, turnos de tabú, orden de llegada del huevo).
- **Puntajes por juego**: puntos de cada casa en cada juego. El reducer los recalcula a partir del progreso del juego cada vez que este cambia, con las funciones de `src/domain/partida.ts`.
- **Premios**: ganadores en el orden en que salieron.

## Capas

El código sigue una arquitectura en capas inspirada en Clean Architecture, con tres carpetas bajo `src/`:

- **`domain/`**: TypeScript puro, sin React ni APIs del navegador. Tiene el tipo del estado, las acciones, el reducer, las reglas de puntaje, el reparto de cupos, el banco de preguntas, las tarjetas de tabú, las tandas de premios y el puerto de persistencia (`StatePort`). Todo se exporta desde `domain/index.ts`.
- **`infrastructure/`**: implementaciones de los puertos del dominio. Hoy hay una sola, `local-storage-state-port.ts`, que guarda y restaura el estado en `localStorage` y completa campos que falten en un estado guardado por una versión anterior.
- **`presentation/`**: todo lo que es React. `pages/` tiene una pantalla por etapa, `components/` los componentes compartidos, `state/` el contexto que expone el store y `styles/` los tokens de `DESIGN.md`. `App.tsx` es el punto de composición: elige la pantalla según la etapa actual y le pasa al provider el puerto de `localStorage`.

Las dependencias apuntan hacia `domain/`: `presentation/` e `infrastructure/` importan del dominio y el dominio no importa de ninguna de las dos. La única excepción es `App.tsx`, que importa el adaptador de infraestructura para inyectarlo.

No hay una capa de application propia. Los casos de uso son chicos y la orquestación (qué acción despachar, cuándo pedir confirmación, cuándo disparar el video del sorteo) vive mayormente en las páginas y en `presentation/state`. Separarla habría sumado una capa de pasamanos sin beneficio para una app de este tamaño.

El azar no está resuelto de una sola forma. El sorteo de casa, el reparto del resto de los cupos y el reparto de tarjetas de tabú llaman a `Math.random` dentro del dominio. El sorteo de premios, que se escribió más tarde, recibe el número al azar dentro de la acción y deja ese reducer puro.

## Estado y persistencia

El estado vive en el cliente, en un único store hecho con Context + `useReducer` de React, sin librería externa de manejo de estado. Después de cada cambio se guarda a través del `StatePort`, y al iniciar se restaura desde ahí.

No hay routing por URL ni historial de navegación. La pantalla visible sale de `partida.etapaActual`, acorde a un flujo controlado desde un solo dispositivo.

## Stack técnico

- React 19 y TypeScript.
- Vite como build y servidor de desarrollo, con `vite-plugin-singlefile`: el build es un único `index.html` con código, estilos y tipografías embebidos (los videos de `public/media` se copian aparte). Vite marca los scripts del build con `crossorigin`, y Chromium los bloquea al abrir el archivo con `file://`; empaquetar todo en un solo archivo evita esas etiquetas y permite abrir la app sin servidor.
- oxlint como linter.
- Tipografías y videos self-hosteados (`src/assets/fonts`, `public/media`), sin CDN externo, para que todo se vea igual sin conexión.
- Sin backend ni base de datos.
