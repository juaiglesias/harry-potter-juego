# documentacion

## Purpose

Documentación de entrada del repositorio: un README con el objetivo, el resumen funcional, la forma de trabajo y cómo correrlo, y un ARCHITECTURE.md limitado a lo técnico.

## Requirements

### Requirement: README de entrada al repositorio
El repositorio SHALL tener un `README.md` en la raíz que explique el objetivo del proyecto: un juego hecho para el cumpleaños de la novia del autor, desarrollado fuertemente apoyado en coding agents, de uso específico para ese evento y no preparado para usarse de forma genérica.

#### Scenario: Lectura del objetivo
- **WHEN** alguien abre el repositorio
- **THEN** el README dice para qué evento se hizo el juego, que se construyó con coding agents y que no está pensado para reutilizarse en otros eventos

### Requirement: Resumen funcional en el README
El README SHALL resumir en un párrafo la vuelta completa del juego (configuración, sorteo de casas con el video del sombrero, los 4 juegos, resultados y premios) y SHALL remitir a `openspec/specs/` para el detalle de cada etapa.

#### Scenario: Entender qué hace el juego
- **WHEN** alguien lee el README
- **THEN** entiende las etapas de la partida sin abrir otro archivo, y sabe dónde está el detalle de cada una

### Requirement: ARCHITECTURE.md como doc técnico
`ARCHITECTURE.md` SHALL limitarse a lo técnico: qué es en una línea, restricciones del contexto de uso, modelo de estado, capas y regla de dependencias, estado y persistencia, y stack. MUST NOT incluir flujo funcional, reglas de negocio, pantallas, despliegue ni fuera de alcance.

#### Scenario: Sin contenido funcional duplicado
- **WHEN** alguien abre `ARCHITECTURE.md`
- **THEN** no encuentra descripciones de flujo ni reglas de juego que contradigan o repitan las specs

### Requirement: Forma de trabajo con OpenSpec
El README SHALL explicar que el desarrollo siguió SDD con OpenSpec, como prueba personal de la herramienta y para tener siempre requerimientos claros, e indicar dónde están las specs vigentes y los changes archivados.

#### Scenario: Encontrar los requerimientos
- **WHEN** alguien quiere saber cómo funciona una pantalla
- **THEN** el README lo dirige a `openspec/specs/` y a `openspec/changes/archive/`

### Requirement: Arquitectura y tecnologías por arriba
El README SHALL resumir la arquitectura en capas basada en Clean Architecture (domain, infrastructure, presentation, sin capa de application propia, con los casos de uso mayormente en presentation) y las tecnologías principales, y SHALL linkear a `ARCHITECTURE.md` para el detalle técnico y a `DESIGN.md` para el sistema visual.

#### Scenario: Profundizar en lo técnico
- **WHEN** alguien necesita más detalle que el resumen del README
- **THEN** encuentra el link a `ARCHITECTURE.md`, que describe cada capa, la regla de dependencias y el stack concreto

### Requirement: Cómo correrlo
El README SHALL indicar los comandos para instalar, levantar en desarrollo y generar el build, y cómo se publica.

#### Scenario: Levantar el proyecto
- **WHEN** alguien clona el repositorio
- **THEN** el README le da los comandos `npm install`, `npm run dev` y `npm run build`, y aclara que el build es un único `index.html` que se despliega a GitHub Pages al pushear a `main`
