## Why

En la pantalla de sorteo, un Enter de más o un toque en "Eliminar" dispara una acción que se nota tarde: el sorteo arranca el video y asigna una casa, y la eliminación saca al invitado del roster y libera su cupo. Durante el evento el anfitrión carga invitados de pie y apurado, así que ambas acciones necesitan un paso de confirmación. El roster además se ve como una lista con viñetas y los campos de cada fila quedan pegados entre sí, lo que dificulta leerlo y tocar el control correcto.

## What Changes

- Al sortear, se abre un modal con la pregunta "¿Realizar sorteo de casa para X?" (X es el nombre cargado). El sorteo y su video arrancan solo al confirmar; al cancelar, el nombre queda en el campo para corregirlo.
- Al tocar "Eliminar" en un invitado, se abre un modal que pide confirmar la eliminación de ese invitado por nombre. Al cancelar, el invitado sigue en el roster sin cambios.
- Un único componente de modal de confirmación sirve a los dos casos.
- El roster de invitados deja la lista con viñetas y pasa a filas con forma de tarjeta, marcadas con el color de la casa asignada.
- Los controles de cada fila (nombre, casa y botón eliminar) quedan separados por un espacio uniforme.

## Capabilities

### New Capabilities
(ninguna)

### Modified Capabilities
- `casas-sorteo`: el alta de invitado con sorteo y la eliminación de un invitado pasan a requerir una confirmación explícita del anfitrión antes de ejecutarse.

## Impact

- `src/presentation/pages/SorteoPage.tsx`: abre el modal antes de sortear y antes de eliminar; nuevo marcado del roster.
- Nuevo componente de presentación `ModalConfirmacion` con su CSS.
- Nuevo CSS para la página de sorteo (filas del roster).
- Sin cambios en `domain/` ni en la persistencia: las acciones `partida/agregar-invitado` y `partida/eliminar-invitado` se despachan igual que hoy, solo después de confirmar.
