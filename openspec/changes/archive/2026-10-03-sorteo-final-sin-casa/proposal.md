## Why

El sorteo final de la etapa Premios es entre todos los invitados, pero el ganador se muestra con el color de su casa: la tarjeta grande toma el fondo de la casa y su fila del listado lleva la franja de ese color. Visto en pantalla, el premio final parece de una casa en particular y no de toda la partida.

## What Changes

- La tarjeta del ganador del sorteo final se muestra con un estilo neutro, sin el color de ninguna casa.
- En el listado de ganadores, la fila del sorteo final no lleva la franja de color de casa.
- El sorteo final sigue eligiendo entre los invitados de todas las casas que todavía no ganaron; eso no cambia.

## Capabilities

### New Capabilities

Ninguna.

### Modified Capabilities

- `sorteo-premios`: el requirement "Sorteo de un premio" deja de pintar con el color de casa al ganador del sorteo final, y "Listado de ganadores" muestra la fila del final sin color de casa.

## Impact

- `src/presentation/pages/PremiosPage.tsx`: estilo del ganador según la tanda (casa o final).
- `src/presentation/pages/PremiosPage.css`: variante neutra de la tarjeta y de la fila.
- Sin cambios en `domain/`.
