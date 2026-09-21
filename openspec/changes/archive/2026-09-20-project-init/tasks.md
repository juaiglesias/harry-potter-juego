## 1. Bootstrap del proyecto

- [x] 1.1 Inicializar el proyecto con Vite (template de React)
- [x] 1.2 Configurar `package.json` (scripts de dev, build y preview)
- [x] 1.3 Crear la estructura de carpetas: `src/domain/`, `src/infrastructure/`, `src/presentation/pages/`, `src/presentation/components/`, `src/presentation/state/`, `src/presentation/styles/`, `src/assets/fonts/`

## 2. Sistema visual

- [x] 2.1 Sumar al repo los archivos de las 3 familias tipográficas (Harry P, IM Fell English, EB Garamond) en `assets/fonts/`, confirmando antes que la licencia de IM Fell English y EB Garamond permite redistribución
- [x] 2.2 Declarar `@font-face` para las 3 familias en `presentation/styles/`
- [x] 2.3 Portar a variables CSS globales los tokens de color, tipografía y espaciado definidos en `DESIGN.md`
- [x] 2.4 Implementar en `presentation/components/` los componentes base reutilizables (botón primario, botón secundario, panel, divisor), consumiendo únicamente los tokens definidos

## 3. Estado global

- [x] 3.1 Definir en `domain/` la forma del estado base de la app (por ahora, solo la página activa; sin reglas de negocio del juego)
- [x] 3.2 Implementar el reducer puro y sus acciones en `domain/`
- [x] 3.3 Implementar en `presentation/state/` el `Context` y el provider de React que exponen `state` y `dispatch` del reducer de `domain/` al árbol de componentes

## 4. Persistencia

- [x] 4.1 Definir en `domain/` la interfaz (puerto) de guardado y restauración de estado, independiente del mecanismo concreto
- [x] 4.2 Implementar en `infrastructure/` el adapter concreto de esa interfaz sobre `localStorage`
- [x] 4.3 Conectar el provider de `presentation/state/` para restaurar al iniciar la app y guardar automáticamente ante cada cambio, usando el adapter de `infrastructure/`

## 5. Cambio de pantalla

- [x] 5.1 Modelar el valor de "página activa" dentro del estado de `domain/`
- [x] 5.2 Implementar en `presentation/App.tsx` el componente raíz que mapea la página activa a la página correspondiente en `presentation/pages/`
- [x] 5.3 Crear una página inicial mínima (placeholder) en `presentation/pages/` para verificar el flujo completo de punta a punta

## 6. Build y verificación offline

- [x] 6.1 Generar el build de producción con Vite
- [x] 6.2 Verificar que el build abre correctamente vía `file://` en Safari y Chrome; si falla, documentar el fallback de servirlo desde una notebook en red local
- [x] 6.3 Verificar, con la conexión a internet desactivada, que no hay pedidos de red a fuentes externas ni errores de carga
