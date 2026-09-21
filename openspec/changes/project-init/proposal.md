## Why

El repositorio todavía no tiene código: solo `DESIGN.md` (sistema visual) y `ARCHITECTURE.md` (decisiones de arquitectura). Antes de construir cualquier funcionalidad del juego (sorteo, roster, puntaje, preguntas) hace falta el esqueleto del proyecto: tooling, estructura de carpetas y las piezas base de arquitectura (estado, persistencia, integración del sistema visual) sobre las que se van a apoyar todas las features siguientes.

## What Changes

- Inicializar el proyecto con React + Vite, sin backend ni base de datos, según lo definido en `ARCHITECTURE.md`.
- Definir una estructura de carpetas por capas (dominio + aplicación, infraestructura, presentación) que separe responsabilidades siguiendo principios SOLID y clean code, para que el código quede legible y cada pieza tenga un único motivo de cambio.
- Armar el mecanismo de cambio de pantalla interno (sin router ni URLs), como base para las futuras vistas de sorteo y de control del anfitrión.
- Armar el proveedor de estado global (Context + `useReducer`) como base para el estado de configuración del evento, roster y puntaje que van a definir features futuras.
- Armar la capa de persistencia que sincroniza el estado global a `localStorage` y lo restaura al cargar la app.
- Integrar el sistema visual de `DESIGN.md`: tokens de color, tipografía self-hosteada (sin dependencia de Google Fonts) y componentes base (botón, panel, divisor).
- Configurar el build para que la app funcione completamente offline, sin depender de conexión a internet.

Fuera de esta propuesta: la lógica de sorteo de casas, el roster de invitados, el puntaje por casa y la fase de preguntas y respuestas. Esas son features que se apoyan sobre este esqueleto y se proponen por separado.

## Capabilities

### New Capabilities
- `app-shell`: esqueleto base de la aplicación: bootstrap de React + Vite, cambio de pantalla interno, proveedor de estado global, capa de persistencia en `localStorage` e integración del sistema visual de `DESIGN.md`. No incluye ninguna regla de negocio del juego.

### Modified Capabilities
(ninguna, no hay specs previas)

## Impact

- Código nuevo: todo el proyecto (`package.json`, configuración de Vite, estructura de carpetas, componentes base, proveedor de estado, capa de persistencia).
- Dependencias nuevas: React, Vite, `vite-plugin-singlefile` (necesario para que el build abra vía `file://` sin bloqueos de CORS, ver `design.md`), y las fuentes self-hosteadas de `DESIGN.md`.
- No afecta `DESIGN.md` ni `ARCHITECTURE.md`, los implementa.
