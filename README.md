# Juego de Harry Potter

Juego que armé para el cumpleaños de mi novia, una fiesta temática de Harry Potter. Lo desarrollé muy apoyado en coding agents, que escribieron buena parte del código a partir de requerimientos que fui definiendo cambio por cambio.

Es de uso específico. Las casas, los cuatro juegos, las preguntas, las tarjetas de tabú, los puntajes y los premios están fijos en el código para ese evento, y no hay nada pensado para configurarlo o reutilizarlo en otra fiesta. Por la misma razón, el código no pasó por una revisión exhaustiva ni está optimizado: alcanzaba con que funcionara bien esa noche.

## Cómo se juega

La app corre en un solo dispositivo y la maneja el anfitrión. Primero se carga cuántos invitados se esperan y se calculan los cupos de cada casa. A medida que llega cada invitado se carga su nombre y el sombrero seleccionador lo sortea a una casa, con un video de esa casa en pantalla. Después vienen cuatro juegos (preguntas y respuestas, Quidditch, Tabú y Huevo de Dragón), cada uno con su pantalla para ir anotando lo que pasa y sumar puntos a las casas. Al final se muestra el podio y se sortean premios entre los integrantes de cada casa, según el puesto que sacó, más un premio final entre todos.

El detalle de cada etapa está en las specs de `openspec/specs/`.

## Cómo se trabajó

Usé SDD (spec-driven development) con [OpenSpec](https://github.com/Fission-AI/OpenSpec). Fue una prueba personal de la herramienta y también una forma de tener siempre claros los requerimientos antes de que un agente tocara el código. Cada cambio pasó por propuesta, diseño, specs y tareas, después se implementó y al final se archivó.

- `openspec/specs/`: los requerimientos vigentes de cada parte de la app.
- `openspec/changes/archive/`: la historia de cada cambio, con su propuesta y su diseño.

## Arquitectura y tecnologías

El código está en capas, basado en Clean Architecture: `domain` (estado, reglas y puntajes en TypeScript puro), `infrastructure` (persistencia en `localStorage`) y `presentation` (React). No tiene una capa de application propia; la orquestación de cada pantalla vive mayormente en presentation.

Es una app de página única hecha con React, TypeScript y Vite, sin backend. El estado vive en el navegador y sobrevive a un refresh. Funciona sin conexión, con tipografías y videos incluidos en el proyecto.

El detalle técnico está en [ARCHITECTURE.md](ARCHITECTURE.md) y el sistema visual en [DESIGN.md](DESIGN.md).

## Correrlo

```bash
npm install
npm run dev      # servidor de desarrollo
npm run build    # build en dist/
npm run lint
```

El build genera un único `dist/index.html` con el código, los estilos y las tipografías embebidos, más los videos del sorteo en `dist/media/`. Se puede abrir directo en el navegador sin servidor. Cada push a `main` lo publica en GitHub Pages mediante GitHub Actions (`.github/workflows/deploy.yml`).
