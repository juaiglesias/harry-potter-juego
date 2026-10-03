## Context

`SorteoPage` hoy sortea al enviar el formulario (Enter o botón "Sortear") y elimina al tocar "Eliminar", ambos sin paso intermedio. El sorteo además abre `SorteoAnimacion`, un overlay de video que no se puede saltear, así que un sorteo accidental cuesta los segundos del video más la corrección manual. El roster es un `<ul>` con viñetas por defecto del navegador, y cada `<li>` pone el input de nombre, el select de casa y el botón uno al lado del otro sin espacio entre ellos.

El proyecto no usa librerías de UI: componentes propios en `src/presentation/components/` con su CSS al lado, y tokens en `styles/tokens.css`. El build es un único HTML que se abre con `file://`.

## Goals / Non-Goals

**Goals:**
- Confirmar antes de sortear y antes de eliminar, con un solo componente de modal reutilizable.
- Mantener ágil el flujo de carga con teclado: escribir el nombre, Enter, Enter.
- Un roster legible, con la casa de cada invitado reconocible de un vistazo y controles bien separados, también en pantalla angosta.

**Non-Goals:**
- Confirmar la edición de nombre o casa de un invitado (sigue aplicándose en el momento).
- Cambiar el reducer, las acciones o la persistencia.
- Rediseñar el resto de la pantalla de sorteo (formulario, marcador, stepper).

## Decisions

### Modal con `<dialog>` nativo y `showModal()`
`ModalConfirmacion` renderiza un `<dialog>` y llama a `showModal()` al montarse. El navegador resuelve la capa superior, el fondo (`::backdrop`), el bloqueo del resto de la página y el atrapado de foco. La tecla Escape cierra el diálogo de forma nativa y el evento `close` llama a `onCancelar`, que desmonta el componente. Interceptar `cancel` con `preventDefault()` queda descartado: Chrome ignora el `preventDefault()` en Escapes repetidos sin interacción de por medio, y el modal quedaría cerrado en el DOM con el estado de React diciendo que sigue abierto.

Abrir y cerrar se hace en un `useLayoutEffect`: su cleanup corre antes de que React saque el `<dialog>` del DOM, así `close()` devuelve el foco al elemento que lo tenía al abrir.

Alternativa descartada: un `div` fijo como el de `SorteoAnimacion`. Obliga a reimplementar foco, Escape y bloqueo de scroll a mano.

### Montaje condicional, sin prop `abierto`
La página renderiza `{pendiente && <ModalConfirmacion ... />}`. Montar equivale a abrir y desmontar a cerrar, sin sincronizar un booleano con `showModal()`/`close()`.

Interfaz:
- `pregunta`: texto del modal.
- `textoConfirmar`: etiqueta del botón de confirmar ("Sortear", "Eliminar").
- `enfocarConfirmar`: si el foco inicial va al botón de confirmar (por defecto va a "Cancelar").
- `onConfirmar`, `onCancelar`.

Hacer click en el fondo no cierra el modal: el objetivo es evitar acciones por toques accidentales y un cierre por toque en el fondo agregaría otro.

### Foco inicial distinto por caso
- Sorteo: foco en "Sortear". El anfitrión escribe el nombre, Enter abre el modal y otro Enter confirma. La confirmación agrega un vistazo al nombre sin frenar la carga.
- Eliminar: foco en "Cancelar". Un Enter de más deja al invitado en el roster.

Al cerrar, `<dialog>` devuelve el foco al elemento que lo tenía antes de abrirse (el input de nombre o el botón "Eliminar"). Tras confirmar un sorteo el foco lo maneja `finalizarSorteo`, que ya lo devuelve al input al terminar el video.

### Estado de confirmación en `SorteoPage`
- `nombreAConfirmar: string | null`: el nombre ya recortado al momento de pedir el sorteo. Confirmar ejecuta lo que hoy hace `sortearInvitado` (guardar el índice del sorteo en curso, despachar `partida/agregar-invitado`, vaciar el campo) y pone el estado en `null`. Cancelar solo lo pone en `null`, el campo conserva el texto.
- `idAEliminar: string | null`: el nombre del modal se lee del invitado en el estado, así refleja ediciones recientes. Si el nombre quedó vacío, la pregunta usa "este invitado".

Textos:
- Sorteo: "¿Realizar sorteo de casa para {nombre}?", botones "Sortear" y "Cancelar".
- Eliminar: "¿Eliminar a {nombre} del sorteo?", botones "Eliminar" y "Cancelar".

### Roster como filas con franja de color de casa
El `<ul>` pasa a `className="roster"` con `list-style: none` y sin padding. Cada `<li className="roster__fila">`:
- Fondo translúcido como el de `.campo`, borde `--borde` y una franja izquierda de 4px con `COLORES_CASA[casa].fondo`, que se actualiza al cambiar la casa en el select.
- Grid de tres columnas (`1fr auto auto`) con `gap: var(--espacio-3)` y padding `var(--espacio-3) var(--espacio-4)`. Las filas se separan entre sí con `gap: var(--espacio-2)` en la lista.
- Bajo 761px (el mismo corte que usa `global.css`), el nombre ocupa la primera fila completa y el select y el botón quedan debajo.

Los estilos viven en `pages/SorteoPage.css`, importado desde la página, igual que cada componente importa su CSS.

## Risks / Trade-offs

- [Soporte de `<dialog>` y `showModal()`] → Los navegadores actuales lo soportan sin polyfill y la app corre en el navegador del anfitrión.
- [`showModal()` llamado dos veces en desarrollo por StrictMode] → El efecto verifica `dialog.open` antes de abrir y cierra en el cleanup.
- [`autoFocus` de React] → React hace `focus()` al montar, antes de `showModal()`, y el diálogo al abrirse mueve el foco al primer botón. El foco inicial se pone por ref después de `showModal()`.
- [Un paso más por invitado] → Con el foco en "Sortear" el costo es una tecla.
