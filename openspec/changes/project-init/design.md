## Context

El proyecto arranca de cero: no hay `package.json` ni código fuente. `ARCHITECTURE.md` ya fijó las decisiones de alto nivel (React + Vite, sin backend, estado en cliente con Context + `useReducer`, persistencia en `localStorage`, sin router, build estático offline). Este documento resuelve cómo traducir esas decisiones en una estructura de proyecto concreta, priorizando que el código quede legible y con responsabilidades separadas (SOLID, clean code), ya que sobre este esqueleto se van a construir varias features (sorteo, roster, puntaje, preguntas) en cambios posteriores.

## Goals / Non-Goals

**Goals:**
- Definir una estructura de carpetas por capas (dominio + aplicación, infraestructura, presentación) de forma que cada capa tenga una única responsabilidad y dependa de abstracciones, no de implementaciones concretas.
- Dejar un mecanismo de cambio de pantalla y un proveedor de estado global listos para que las features futuras los usen sin tener que rediseñarlos.
- Integrar el sistema visual de `DESIGN.md` (tokens, tipografía self-hosteada) como base compartida por toda la UI.
- Garantizar que el build final funcione sin conexión a internet.

**Non-Goals:**
- Implementar cualquier regla de negocio del juego (sorteo, cupos por casa, roster, puntaje, preguntas). Este cambio no agrega pantallas con comportamiento real, solo la base sobre la que se construyen.
- Elegir o configurar testing framework, CI, linters avanzados u otras herramientas no imprescindibles para arrancar.

## Decisions

**Estructura de carpetas por capas**
```
src/
  domain/               # dominio + aplicación combinados: entidades, reglas de negocio,
                         # reducer y acciones, puertos (interfaces) que infraestructura implementa
  infrastructure/        # adapters concretos sobre el mundo exterior (localStorage)
  presentation/
    App.tsx             # raíz de la app: monta el provider y selecciona la página activa
    pages/               # pantallas completas, compuestas a partir de componentes (futuras features)
    components/          # componentes reutilizables (Botón, Panel, Divisor, etc. de DESIGN.md)
    state/               # Context + Provider de React que exponen el reducer de domain/ al árbol de UI
    styles/              # tokens de diseño (variables CSS) y declaración de fuentes
  assets/
    fonts/               # las 3 familias tipográficas, self-hosteadas
```
`assets/fonts/` vive dentro de `src/` (no como carpeta hermana) porque así Vite las procesa como parte del grafo de módulos: se referencian con imports/`url()` relativos y quedan versionadas con el resto del build, en vez de depender de rutas absolutas servidas por un directorio público aparte.
`domain/` no importa nada de React ni de `infrastructure/`: ahí vive tanto el modelo de negocio como la orquestación de casos de uso (el reducer y sus acciones), sin conocer cómo se muestra ni cómo se guarda. `domain/` define los puertos (ej. una interfaz de guardado/restauración de estado); `infrastructure/` los implementa, nunca al revés (inversión de dependencias). `presentation/` depende de `domain/` para leer estado y despachar acciones, pero `domain/` no sabe que React existe. Esto deja preparado el terreno para features futuras: van a agregar entidades y acciones en `domain/` y páginas en `presentation/pages/` sin tocar la base.

**Estado global: reducer en `domain/`, Context en `presentation/`**
El reducer y sus acciones viven en `domain/` como funciones puras (una sola responsabilidad: calcular el próximo estado a partir de una acción), sin acceso directo a `localStorage` ni a componentes. El `Context` y el `Provider` de React viven en `presentation/state/` y son la única pieza que conoce React: solo exponen `state` y `dispatch` al árbol de componentes, delegando todo el cálculo al reducer de `domain/`. Esta separación permite testear el reducer de forma aislada sin montar nada de React, y evita que la lógica de negocio termine dispersa en componentes.

**Persistencia como adapter en `infrastructure/`**
`domain/` define una interfaz mínima de guardado/restauración (ej. `load()` / `save(state)`), sin saber cómo se implementa. `infrastructure/` aporta la única implementación concreta, sobre `localStorage`. El resto de la app depende de la interfaz, no de la implementación, siguiendo inversión de dependencias: si en algún momento hiciera falta cambiar el mecanismo de guardado, no habría que tocar el reducer ni la UI, solo agregar un nuevo adapter en `infrastructure/`.

**Cambio de pantalla sin router**
Un único campo de estado (la página activa) vive en el reducer de `domain/`. `presentation/App.tsx` mapea ese valor a la página correspondiente en `presentation/pages/`. No se introduce ninguna librería de routing, acorde a que es un flujo controlado en un solo dispositivo sin necesidad de historial de navegación.

**Sistema visual como base compartida**
Los tokens de color, tipografía y espaciado de `DESIGN.md` se vuelcan tal cual a `presentation/styles/` como variables CSS globales, importadas una sola vez desde `presentation/App.tsx`. Los componentes en `presentation/components/` consumen esos tokens (nunca colores o tamaños hardcodeados), de forma que agregar un componente nuevo no requiera modificar los existentes (abierto/cerrado).

**Tipografía self-hosteada**
Las tres familias (`Harry P`, `IM Fell English`, `EB Garamond`) se sirven como archivos estáticos del propio proyecto (`assets/fonts/`), declaradas con `@font-face` en `presentation/styles/`. No queda ninguna referencia a Google Fonts ni a otro CDN externo, para sostener la decisión de `ARCHITECTURE.md` de que la app funcione sin conexión.

**Build**
Vite con el template estándar de React. El build de producción no depende de variables de entorno ni de ningún endpoint: es HTML/CSS/JS estático, abrible directamente en el navegador del dispositivo o servible desde una notebook en red local.

## Risks / Trade-offs

- [Riesgo] Abrir el build directamente con `file://` puede toparse con restricciones del navegador sobre módulos ES según la versión de Safari/Chrome. → **Confirmado y resuelto**: Vite marca los `<script type="module">` y `<link>` del build con `crossorigin`, y Chromium bloquea esa carga por CORS bajo `file://` (origen `null`). Se resolvió con `vite-plugin-singlefile`, que empaqueta JS, CSS y fuentes en un único `index.html` sin archivos separados que disparen esas etiquetas. Verificado sin errores en Chromium y WebKit headless, sin ningún pedido de red externo.
- [Riesgo] Self-hostear "IM Fell English" y "EB Garamond" sin revisar la licencia podría no estar permitido. → Mitigación: confirmar que ambas están bajo licencia SIL Open Font License (permite redistribución) antes de sumar los archivos al repo.
- [Riesgo] Context + `useReducer` puede quedarse corto si el estado global crece mucho con las features futuras. → Mitigación: mientras el estado siga modelado por dominio (no por pantalla), alcanza; si crece demasiado, se evalúa dividir en varios contextos en un cambio posterior, no ahora.

## Open Questions

Ninguna bloqueante para implementar este cambio. Los nombres concretos de pantallas más allá de la inicial se van a definir en los cambios que agreguen cada feature.
