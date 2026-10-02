## Context

Los Juegos 1, 2 y 3 ya tienen mecánica propia con el mismo patrón: lo registrado vive en un campo de `Partida` y el reducer reescribe `puntajesPorJuego[juego]` desde eso. Los puntos de todos los juegos están en `src/domain/puntos.ts`. El Juego 4 es el único que todavía usa `JuegoEnCursoPage` y la acción `partida/cargar-puntaje`.

En Huevo de Dragón cada casa busca un huevo y el anfitrión anota el orden en que lo encuentran. Puede pasar que dos casas lleguen casi juntas, así que anotar tiene que ser un toque por casa y corregir tiene que ser inmediato.

## Goals / Non-Goals

**Goals:**
- Pantalla del Juego 4 con un toque por casa para anotar el puesto.
- Puntos por puesto definidos en `puntos.ts`.
- Puntaje del Juego 4 derivado del orden, con el mismo patrón que el resto.
- Quitar el bloque genérico y la carga manual, que quedan sin uso.

**Non-Goals:**
- Timer o registro de la hora en que cada casa encontró el huevo.
- Empates en un mismo puesto.
- Reordenar casas arrastrando o editar un puesto que no sea el último.

## Decisions

### Puntos por puesto
En `puntos.ts`: `PUNTOS_POR_PUESTO_HUEVO = [50, 30, 10, 0]`, indexado por puesto (0 = primero). El 4.º puesto vale 0 de forma explícita para que la pantalla lo pueda mostrar igual que los demás.

### Estado
Se agrega a `Partida` el campo `huevo: { orden: CasaId[] }`. La posición en el arreglo es el puesto. Una casa con puesto es una casa que está en `orden`; las pendientes son las de `CASAS` que no están.

Acciones nuevas:
- `huevo/anotar` (`casa`): agrega la casa al final de `orden` si no está.
- `huevo/deshacer`: quita la última casa de `orden`.

Después de cada una, el reducer reescribe `puntajesPorJuego['huevo-de-dragon']` con `puntajeHuevoPorCasa(orden)`: cada casa en `orden` recibe `PUNTOS_POR_PUESTO_HUEVO[puesto]`; las que no están, 0.

Alternativa descartada: guardar el puesto por casa (`Record<CasaId, number | null>`). El arreglo ordenado hace imposible tener dos casas en el mismo puesto o un hueco en el medio, sin validaciones extra, y deshacer es quitar el último.

### Pantalla
Nueva `HuevoDragonPage`, con `Stepper` y `MarcadorCasas` compacto:
- **Orden de llegada**: lista con puesto, casa (franja de color de casa) y puntos, en orden. Vacía muestra una frase en cursiva, según el estado vacío de `DESIGN.md`.
- **Buscando**: un botón grande por casa pendiente ("Gryffindor encontró su huevo"), con la franja de color de casa. Al tocarlo pasa a la lista de llegada.
- "Deshacer último" debajo del orden, solo si hay alguna casa anotada.
- Botón de avanzar etapa, que lleva a Resultados.

### Eliminación del bloque genérico
Se borran `JuegoEnCursoPage.tsx`, la acción `partida/cargar-puntaje` de `actions.ts` y su caso en el reducer. `App.tsx` resuelve la pantalla de cada juego en una función `paginaDeJuego(juego): ReactElement` con un caso por juego y sin caso por defecto. Con el tipo de retorno explícito, un juego sin pantalla da error de compilación (TS2366). Un `switch` anidado dentro de `ActivePage` no alcanzaba: un caso faltante seguía de largo hasta `case 'resultados'` sin error. Las specs de `partida-flow` quitan los dos requirements correspondientes.

Si `JuegoEnCursoPage` tiene estilos propios, se borran con ella. La clase global `.fila-campo` de `global.css` queda, porque es parte de la base de estilos.

### Persistencia
`local-storage-state-port.ts` suma `partida.huevo` al chequeo que descarta estado guardado con una forma anterior.

## Risks / Trade-offs

- [Dos casas encuentran el huevo casi a la vez y el anfitrión toca en el orden equivocado] → Deshacer los dos últimos y volver a anotar; son 4 toques.
- [Sin carga manual no hay forma de ajustar un puntaje "a mano" por fuera de las reglas] → Es lo buscado: todos los puntajes salen de lo registrado en cada juego y se corrigen ahí.

## Migration Plan

Se despliega con el próximo build estático. El estado persistido anterior se descarta al iniciar (ver Persistencia).
