## Context

`PremiosPage` pinta la tarjeta del último ganador con `COLORES_CASA[invitado.casa]` (fondo y texto) y cada fila del listado con una franja izquierda de ese color, sin distinguir la tanda. El dominio ya resuelve bien el sorteo final: `elegiblesPremio('final', ...)` toma invitados de todas las casas que no ganaron. El problema es solo de presentación.

## Goals / Non-Goals

**Goals:**
- El ganador del sorteo final se ve como premio de toda la partida, sin color de casa, en la tarjeta y en el listado.

**Non-Goals:**
- Cambiar cómo se elige al ganador del final.
- Cambiar el estilo de los ganadores de las tandas de casa.
- Animación o ceremonia especial para el final.

## Decisions

**El estilo depende de la tanda, no del invitado.** La página decide por `ganador.tanda === 'final'`. En las tandas de casa sigue usando `COLORES_CASA`; en el final no pasa `style` de color y aplica un modificador de clase.

**Estilo neutro con los tokens de la app.** Tarjeta: `.premios__ganador--final` con fondo oscuro translúcido como el de las filas, borde `--borde-fuerte`, halo y nombre en `--vela`. Fila: `.premios__fila--final` con franja `--vela`. El dorado de la vela es el color de acento de la app y no pertenece a ninguna casa. Alternativa descartada: quitar la franja por completo, porque la fila quedaría desalineada respecto de las demás.

## Risks / Trade-offs

- [El dorado de `--vela` se parece al amarillo de Hufflepuff] → la tarjeta del final usa fondo oscuro con texto dorado, mientras que Hufflepuff tiene fondo amarillo con texto oscuro; no se confunden.
