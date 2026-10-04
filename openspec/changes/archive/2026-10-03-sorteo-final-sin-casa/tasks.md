## 1. Pantalla de premios

- [x] 1.1 `PremiosPage.tsx`: si el último ganador es del sorteo final, la tarjeta usa la clase `premios__ganador--final` sin colores de casa; si no, sigue con `COLORES_CASA`
- [x] 1.2 `PremiosPage.tsx`: en el listado, las filas del sorteo final usan `premios__fila--final` sin franja de color de casa
- [x] 1.3 `PremiosPage.css`: estilos neutros de `premios__ganador--final` (fondo oscuro, borde y halo, nombre en `--vela`) y `premios__fila--final` (franja `--vela`)

## 2. Verificación

- [x] 2.1 Typecheck, lint y build sin errores
- [x] 2.2 Probar en el navegador: ganadores de casa con su color, ganador final en tarjeta neutra y fila sin color de casa, también después de volver a sortear el final
