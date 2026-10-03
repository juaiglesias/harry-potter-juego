## Why

La pantalla de Resultados muestra las 4 casas como etiquetas en fila, pegadas al título y sin una lectura visual de quién ganó por cuánto. Es el cierre de la partida y se proyecta para todos los invitados, así que tiene que leerse de un vistazo y tener algo de ceremonia.

## What Changes

- La pantalla de Resultados pasa a mostrar un podio: un rectángulo por casa, con el color de la casa, cuya altura depende del puntaje total.
- Las casas se ordenan de izquierda a derecha de menor a mayor puntaje; la ganadora queda a la derecha y es la más alta.
- Cada rectángulo muestra el nombre de la casa y su puntaje; la casa ganadora (o las empatadas en el primer puesto) conserva el destacado actual.
- Se agrega separación entre el título "Resultados" y el podio.
- `MarcadorCasas` pierde la variante `destacada`, que solo usaba Resultados; queda como marcador compacto de las pantallas de juego.

## Capabilities

### New Capabilities

Ninguna.

### Modified Capabilities

- `partida-flow`: el requirement "Pantalla de resultados" cambia de ranking en lista descendente a podio ordenado de izquierda (menos puntos) a derecha (más puntos), con altura proporcional al puntaje y color de casa.

## Impact

- `src/presentation/pages/ResultadosPage.tsx`: usa el nuevo componente de podio en lugar de `MarcadorCasas`.
- Nuevo componente `src/presentation/components/PodioCasas.tsx` (+ CSS).
- `src/presentation/components/MarcadorCasas.tsx` y `.css`: se quita la variante `destacada`.
- Sin cambios en `domain/`: se reutiliza `rankingCasas` y `COLORES_CASA`.
