## 1. Assets de media

- [x] 1.1 Crear `public/media/casas/` en el proyecto.
- [x] 1.2 Copiar los 4 videos definitivos que provee el anfitrión (h264 + aac, 1280x720, 10s cada uno) a `public/media/casas/gryffindor.mp4`, `slytherin.mp4`, `ravenclaw.mp4`, `hufflepuff.mp4`. El de Gryffindor llega como `griffindor.mp4` y se renombra para que coincida con el `CasaId`.

## 2. Componente de animación

- [x] 2.1 Crear `SorteoAnimacion` en `src/presentation/components/`, overlay `position: fixed; inset: 0`, que recibe la `casa` ya asignada y un callback `onFinalizar`.
- [x] 2.2 Reproducir el `<video>` de `media/casas/${casa}.mp4` (ruta relativa, por el `base: './'` del build abierto con `file://`) al montar el componente, sin ningún control visible de skip/cancelar.
- [x] 2.3 Conectar `onEnded` del video para invocar `onFinalizar`.
- [x] 2.4 Conectar `onError` del video para invocar `onFinalizar` directo, sin dejar la animación trabada.

## 3. Integración en el flujo de sorteo

- [x] 3.1 En `SorteoPage`, agregar estado local `sorteoEnCurso` (`{ indice: number } | null`) seteado al confirmar el sorteo, junto con el `dispatch` existente de `partida/agregar-invitado`. Guarda la posición del nuevo invitado porque la casa se sortea en el reducer; la casa se lee del estado ya actualizado.
- [x] 3.2 Renderizar `SorteoAnimacion` cuando `sorteoEnCurso` no es `null`, pasándole la casa y limpiando el estado (`sorteoEnCurso = null`) en `onFinalizar`.
- [x] 3.3 Mantener el foco en el input de nombre después de que la animación termina, igual que en el flujo actual.

## 4. Verificación

- [x] 4.1 Probar en Chromium y WebKit (los targets del proyecto) que el video arranca con audio tras el click de "Sortear" sin quedar bloqueado por políticas de autoplay.
- [x] 4.2 Probar el camino de falla: renombrar temporalmente un archivo de video y confirmar que la animación no deja trabado al anfitrión.
- [x] 4.3 Verificar que el roster y el marcador de casas reflejan el invitado sorteado apenas termina la animación, sin desfasajes.
- [x] 4.4 Verificar que el build (`dist/`) incluye `media/casas/` junto a `index.html` y que los videos cargan abriendo `dist/index.html` con `file://`.
