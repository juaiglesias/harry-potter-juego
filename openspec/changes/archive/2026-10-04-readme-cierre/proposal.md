## Why

El proyecto está terminado y el repositorio no tiene README: quien llegue (o el autor dentro de un tiempo) no encuentra en la raíz qué es esto, para qué se hizo ni cómo está armado. `ARCHITECTURE.md` se escribió antes de implementar: mezcla flujo funcional y reglas de negocio (que quedaron desactualizados y ya viven en `openspec/specs/`) con decisiones técnicas, y no explica las capas del código ni el stack concreto.

## What Changes

- Nuevo `README.md` en la raíz con:
  - Objetivo: juego hecho para el cumpleaños de la novia del autor, construido fuertemente apoyado en coding agents. Es de uso específico y no está preparado para ser genérico (casas, juegos, preguntas y premios están fijos para ese evento).
  - Cómo se trabajó: SDD con OpenSpec, como prueba personal de la herramienta y para tener siempre requerimientos claros; dónde viven specs y changes archivados.
  - Arquitectura por arriba: capas basadas en Clean Architecture (domain, infrastructure, presentation) sin capa de application propia; los casos de uso viven mayormente en presentation.
  - Tecnologías por arriba y comandos para correrlo y buildearlo.
  - Links a `ARCHITECTURE.md` (detalle técnico) y `DESIGN.md` (sistema visual).
  - Un párrafo con la vuelta completa del juego (configuración, sorteo con video del sombrero, 4 juegos, resultados y premios), con link a `openspec/specs/` para el detalle.
  - Publicación en GitHub Pages y build en un único `index.html`.
- `ARCHITECTURE.md` pasa a ser un doc técnico:
  - Se quitan Flujo funcional, Reglas de negocio, Pantallas, Despliegue y Fuera de alcance.
  - "Qué es" se reduce a una línea; "Contexto de uso" se mantiene como restricciones que explican las decisiones técnicas.
  - "Modelo de dominio" se acota a las entidades del estado.
  - Se agrega una sección de capas (contenido de cada carpeta, regla de dependencias, puerto de persistencia, por qué no hay capa de application) y se concreta el stack técnico.

## Capabilities

### New Capabilities
- `documentacion`: documentación de entrada del repositorio (README) y su relación con ARCHITECTURE.md y DESIGN.md.

### Modified Capabilities

## Impact

Solo documentación: `README.md` (nuevo) y `ARCHITECTURE.md`. Sin cambios de código ni de comportamiento de la app.
