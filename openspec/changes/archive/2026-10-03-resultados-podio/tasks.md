## 1. Podio

- [x] 1.1 Crear `src/presentation/components/PodioCasas.tsx`: lee `rankingCasas` del estado, invierte el orden (menor a mayor), calcula la altura de cada casa como `max(20%, puntaje / máximo)` (piso para puntajes ≤ 0 o máximo ≤ 0) y renderiza un `<ol>` con un rectángulo por casa con nombre y puntaje, colores de `COLORES_CASA` y clase de ganadora
- [x] 1.2 Crear `PodioCasas.css`: contenedor flex de alto fijo alineado abajo con `margin-top: var(--espacio-6)`, columnas de igual ancho, halo y borde para la ganadora, puntaje con números lining y ajustes de tamaño para mobile

## 2. Pantalla de resultados

- [x] 2.1 `ResultadosPage.tsx`: reemplazar `MarcadorCasas variante="destacada"` por `PodioCasas`
- [x] 2.2 `MarcadorCasas.tsx` y `MarcadorCasas.css`: quitar la variante `destacada` (prop, rama de ranking y estilos), dejando el orden fijo de casas del marcador compacto

## 3. Verificación

- [x] 3.1 Typecheck, lint y build sin errores
- [x] 3.2 Probar en el navegador: casas ordenadas de izquierda (menos puntos) a derecha (más puntos), alturas según puntaje, colores de casa, separación con el título, casa con puntaje negativo en el piso, empate en el primer puesto con misma altura y ambas destacadas, vista mobile
