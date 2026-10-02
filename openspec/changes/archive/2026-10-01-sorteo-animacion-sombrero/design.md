## Context

El sorteo de la casa ya es instantáneo y síncrono (`sortearCasa` en `domain/partida.ts`), disparado por el reducer al recibir `partida/agregar-invitado`. Este cambio no toca esa lógica: agrega una capa de presentación que retrasa cuándo se le muestra el resultado al anfitrión, para dar lugar a una animación de video + audio.

Restricciones del proyecto que aplican directo a este diseño (`ARCHITECTURE.md`):
- Un solo dispositivo, sin backend, debe funcionar sin conexión a internet en el lugar del evento.
- Assets self-hosteados, sin CDN externo.
- No hay acción de reinicio expuesta en la interfaz: si algo se traba en vivo, el anfitrión no tiene forma de "resetear" ese sorteo puntual salvo recargar la página.

## Goals / Non-Goals

**Goals:**
- Reproducir, al confirmar el sorteo, el video correspondiente a la casa sorteada (un video por casa, con audio ya incluido en el archivo).
- Que la animación nunca deje al anfitrión trabado si el archivo de video falla o tarda en cargar, dado que no hay acción de reinicio en la app.
- Dejar una estructura de archivos de video clara y documentada, para que el anfitrión pueda reemplazar los videos entre un evento y otro.

**Non-Goals:**
- Un video genérico compartido entre casas o audio como archivo separado del video.
- Botón o gesto para saltear/cancelar la animación.
- Cualquier herramienta dentro de la app para subir o gestionar los archivos de media (se colocan directo en el proyecto, por fuera de la UI).
- Contenido de los 4 videos (grabación, edición): los provee el anfitrión, este cambio solo los incorpora al proyecto.

## Decisions

### Estructura de assets
Los archivos van en `public/media/casas/`, servidos estáticos sin build step adicional:
- `public/media/casas/gryffindor.mp4`, `slytherin.mp4`, `ravenclaw.mp4`, `hufflepuff.mp4`: un video por `CasaId` (mismos ids ya usados en `domain/state.ts`), con audio incluido en el propio archivo (h264 + aac, 1280x720, 10s cada uno). El componente resuelve el archivo con `` `media/casas/${casa}.mp4` `` sin mapeos adicionales. La ruta es relativa porque el build usa `base: './'` y se abre con `file://`: una ruta absoluta apuntaría a la raíz del disco.

Alternativa descartada: empaquetar los archivos con `import` de Vite. Con `vite-plugin-singlefile` terminarían inlineados en base64 dentro de `index.html` (unos 15 MB). Se prefiere `public/`, que Vite copia a `dist/media/casas/` junto al `index.html`: son binarios grandes que el anfitrión reemplaza directamente en el sistema de archivos entre un evento y otro, sin tocar código ni rehacer el build.

### Secuencia y componente
Nuevo componente `SorteoAnimacion`, overlay a pantalla completa (`position: fixed; inset: 0`), montado condicionalmente desde `SorteoPage` cuando hay un sorteo en curso.

- `sortearInvitado` en `SorteoPage` sigue disparando `partida/agregar-invitado` de inmediato (la casa queda asignada en el estado global al toque, como hoy). Como la casa se sortea dentro del reducer, la página no la conoce al hacer el `dispatch`: guarda en un estado local `sorteoEnCurso` la posición que ocupa el nuevo invitado (`{ indice }`) y lee su casa del estado ya actualizado. Así `domain/` no cambia.
- El overlay recibe la `casa` ya resuelta como prop: no vuelve a sortear. Mientras está abierto tapa la pantalla, así que el anfitrión no puede editar el roster en el medio.
- El overlay reproduce el `<video>` de esa casa. Evento `onEnded` cierra el overlay (`sorteoEnCurso = null`) y devuelve el foco al input de nombre, igual que el flujo actual.
- El `click` que dispara "Sortear" es el gesto de usuario que habilita el autoplay con sonido del video en navegadores basados en Chromium/WebKit (Chrome y Safari, los targets de `ARCHITECTURE.md`).

### Manejo de fallas de media
Dado que no hay acción de reinicio en la app y el evento es en vivo:
- `onError` del `<video>` cierra el overlay directo, como si el video hubiese terminado.
- Si el navegador rechaza `play()` (política de autoplay), la promesa se rechaza sin disparar `onError`: ese rechazo también cierra el overlay.
- No se agrega timeout adicional: los eventos `ended`/`error` del elemento nativo alcanzan para no bloquear el flujo indefinidamente.

## Risks / Trade-offs

- [Un video de reemplazo pesado o en un formato no soportado podría tardar en cargar o fallar] → Mitigación: el anfitrión prueba los archivos antes del evento (no hay chequeo automático de tamaño/formato). Los actuales pesan unos 3 MB cada uno y cargan desde disco local.
- [Autoplay con sonido bloqueado en algún navegador no probado] → Mitigación: el trigger es siempre un click directo del anfitrión (nunca autoplay al cargar la página), que es el caso que los navegadores permiten.

## Migration Plan

No aplica migración de datos: no hay estado persistido nuevo (la animación es puramente de presentación, no se guarda en `localStorage`). Se despliega como parte del próximo build estático.
