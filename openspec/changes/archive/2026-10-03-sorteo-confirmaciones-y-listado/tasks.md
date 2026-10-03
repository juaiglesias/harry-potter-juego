## 1. Componente de confirmación

- [x] 1.1 Crear `src/presentation/components/ModalConfirmacion.tsx` con un `<dialog>` que llama a `showModal()` al montarse (verificando `dialog.open`, por StrictMode) y lo cierra en el cleanup del efecto. Props: `pregunta`, `textoConfirmar`, `enfocarConfirmar`, `onConfirmar`, `onCancelar`.
- [x] 1.2 Renderizar la pregunta y los botones "Cancelar" (`variant="secondary"`) y de confirmar con `Button`, enfocando por ref, después de `showModal()`, el de confirmar si `enfocarConfirmar` es verdadero y "Cancelar" si no. `Button` pasa a aceptar `ref`.
- [x] 1.3 Escuchar el evento `close` del `<dialog>` (Escape lo dispara) y llamar a `onCancelar`. El click en el fondo no cierra el modal.
- [x] 1.4 Crear `ModalConfirmacion.css` con estilos del panel (fondo, borde y tipografía con tokens), `::backdrop` oscurecido y botones alineados con separación.

## 2. Confirmación del sorteo

- [x] 2.1 En `SorteoPage`, agregar estado `nombreAConfirmar: string | null`. El submit del formulario, si el nombre recortado no está vacío, lo guarda en vez de despachar.
- [x] 2.2 Renderizar `ModalConfirmacion` cuando `nombreAConfirmar` no es `null`, con la pregunta "¿Realizar sorteo de casa para {nombre}?", botón "Sortear" y `enfocarConfirmar`.
- [x] 2.3 Al confirmar: guardar `sorteoEnCurso`, despachar `partida/agregar-invitado` con el nombre confirmado, vaciar el campo y limpiar `nombreAConfirmar`. Al cancelar: solo limpiar `nombreAConfirmar`, dejando el texto en el campo.

## 3. Confirmación de la eliminación

- [x] 3.1 Agregar estado `idAEliminar: string | null`. El botón "Eliminar" de cada fila lo setea en vez de despachar.
- [x] 3.2 Renderizar `ModalConfirmacion` cuando hay un invitado a eliminar, con la pregunta "¿Eliminar a {nombre} del sorteo?" leyendo el nombre del estado (o "este invitado" si está vacío) y botón "Eliminar", con el foco en "Cancelar".
- [x] 3.3 Al confirmar: despachar `partida/eliminar-invitado` y limpiar `idAEliminar`. Al cancelar: solo limpiar `idAEliminar`.

## 4. Roster

- [x] 4.1 Crear `src/presentation/pages/SorteoPage.css` e importarlo desde `SorteoPage`.
- [x] 4.2 Cambiar el `<ul>` a `className="roster"` (sin viñetas ni padding, filas separadas por `--espacio-2`) y cada `<li>` a `className="roster__fila"`.
- [x] 4.3 Estilar `.roster__fila` como tarjeta: fondo translúcido, borde `--borde`, franja izquierda de 4px con `COLORES_CASA[casa].fondo` vía estilo inline, grid `1fr auto auto` con `gap: var(--espacio-3)` y padding `var(--espacio-3) var(--espacio-4)`.
- [x] 4.4 Bajo 761px, pasar el nombre a ocupar toda la primera fila y dejar el select y el botón en la segunda.

## 5. Verificación

- [x] 5.1 `npm run build` y `npm run lint` sin errores.
- [x] 5.2 Sorteo con teclado: escribir un nombre, Enter abre el modal con el nombre correcto, Enter confirma, el video de la casa arranca con audio (Chromium y WebKit) y al terminar el foco vuelve al input.
- [x] 5.3 Cancelar el sorteo con el botón y con Escape: no se agrega invitado, el nombre sigue en el campo y no arranca video. Con el campo vacío o con espacios no se abre el modal.
- [x] 5.4 Eliminar: el modal nombra al invitado correcto, Enter inmediato cancela (foco en "Cancelar"), Escape cancela y confirmar lo saca del roster y libera el cupo en el marcador.
- [x] 5.5 Roster sin viñetas, con la franja del color de la casa que cambia al editar la casa, controles separados en escritorio y en ancho de celular.
