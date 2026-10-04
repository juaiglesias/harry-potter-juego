## Context

El repo tiene `ARCHITECTURE.md` (qué es el juego, dominio, flujo, reglas, estado y stack en tres líneas) y `DESIGN.md` (sistema visual), pero no README. El código está en `src/domain` (estado, acciones, reducer puro, reglas de puntos, preguntas, tabú, premios y el puerto de persistencia), `src/infrastructure` (adaptador de `localStorage` para ese puerto) y `src/presentation` (React: páginas, componentes, contexto de estado y estilos). No hay carpeta `application`: la orquestación de cada pantalla (qué acción despachar, cuándo generar el azar, cuándo pedir confirmación) vive en las páginas y en `presentation/state`.

Stack real: React 19, TypeScript 6, Vite 8 con `vite-plugin-singlefile` (todo el build en un único `index.html` para poder abrirlo con `file://`), oxlint, sin backend. Deploy a GitHub Pages con GitHub Actions al pushear a `main`.

## Goals / Non-Goals

**Goals:**
- README corto, en castellano, que se lea como texto humano: objetivo, contexto personal, cómo se trabajó, arquitectura y stack por arriba, cómo correrlo.
- Convertir `ARCHITECTURE.md` en un mapa técnico del código: restricciones, modelo de estado, capas, estado y persistencia, stack.

**Non-Goals:**
- Tocar `DESIGN.md`.
- Documentar cada juego o regla en el README ni en `ARCHITECTURE.md` (eso está en `openspec/specs/`).
- Hacer el proyecto reutilizable o configurable.

## Decisions

- **README como puerta de entrada, ARCHITECTURE.md como mapa técnico.** Sigue la convención habitual de un `ARCHITECTURE.md` (vista general, mapa del código, invariantes y temas transversales), sin flujo funcional ni reglas de negocio. El README resume la vuelta del juego en un párrafo y nombra capas y tecnologías; `ARCHITECTURE.md` explica contenido de cada carpeta, dirección de dependencias, por qué no hay application y el stack. Alternativa descartada: corregir el flujo y las reglas dentro de `ARCHITECTURE.md`, que duplicaría las specs y volvería a desactualizarse.
- **Despliegue solo en el README.** GitHub Pages y el build en un único archivo son información de uso; en `ARCHITECTURE.md` queda el build single-file solo como parte del stack (porque responde a la restricción de abrirlo sin conexión).
- **Aclarar explícitamente que no es genérico.** Evita que alguien intente usarlo para otro evento esperando configuración.
- **Mencionar OpenSpec con rutas concretas** (`openspec/specs/` como requerimientos vigentes, `openspec/changes/archive/` como historia de cada cambio), porque es la mejor fuente para entender cada pantalla.
- **Sin badges, sin capturas.** Mantenerlo mínimo; las capturas quedarían desactualizadas y no aportan para un proyecto cerrado.

## Risks / Trade-offs

- [Al sacar flujo y reglas de `ARCHITECTURE.md`, el detalle funcional queda solo en las specs] → El README linkea a `openspec/specs/`, que es lo que se mantuvo al día durante todo el desarrollo.
