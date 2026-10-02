## Why

Hoy el sorteo de un invitado es instantáneo: se carga el nombre y la casa asignada aparece de inmediato en la lista. Para un juego presencial en vivo, ese momento pierde el efecto de expectativa que tiene el sorteo del Sombrero Seleccionador en los libros/películas. Agregar una animación de "el sombrero está pensando" seguida de la revelación sonora de la casa hace que cada alta de invitado sea un momento compartido con el grupo, en vez de un dato que se completa en un formulario.

## What Changes

- Al confirmar el sorteo de un invitado, se abre una pantalla de animación a pantalla completa que reproduce el video correspondiente a la casa que le fue asignada (un video distinto por cada una de las 4 casas, con audio ya incluido en el propio archivo de video).
- No hay un video genérico de "pensando" compartido ni audios separados: cada video de casa cubre tanto la espera como la revelación en un solo archivo.
- La animación se reproduce siempre completa: no hay forma de saltearla ni cancelarla desde la interfaz.
- El invitado se agrega al roster con su casa ya definida desde el momento en que se dispara el sorteo (la lógica de asignación no cambia); la animación solo retrasa cuándo se le muestra el resultado al anfitrión/invitado.
- Los 4 videos (uno por casa) son assets estáticos del proyecto (self-hosteados, sin conexión a internet), provistos por el anfitrión y reemplazables en el sistema de archivos sin rehacer el build.

## Capabilities

### New Capabilities
- `sorteo-animacion`: reproducción del video de revelación de casa al sortear un invitado, incluyendo la estructura de assets de video esperada.

### Modified Capabilities
(sin cambios de requerimientos en capabilities existentes; `casas-sorteo` mantiene igual su lógica de asignación de casa, solo cambia cuándo se le muestra el resultado al usuario, lo cual queda cubierto por la nueva capability)

## Impact

- `src/presentation/pages/SorteoPage.tsx`: dispara la animación al confirmar el alta de un invitado, en vez de mostrar el resultado de inmediato.
- Nuevo componente de presentación para la animación (un video por casa, pantalla completa, sin controles de skip).
- Nuevos assets estáticos: 4 videos (uno por casa), servidos localmente desde `public/media/casas/`.
- Sin cambios en `domain/` (la asignación de casa sigue siendo síncrona y aleatoria vía `sortearCasa`).
