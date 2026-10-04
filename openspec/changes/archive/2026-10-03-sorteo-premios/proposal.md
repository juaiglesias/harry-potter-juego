## Why

La partida termina en Resultados, pero el evento cierra con premios para los invitados y hoy ese sorteo se hace fuera de la app. La cantidad de premios por casa depende del puesto final (más premios cuanto mejor quedó la casa), así que la app ya tiene todo lo necesario para conducirlo y proyectarlo.

## What Changes

- Se agrega una etapa nueva, Premios, después de Resultados. El stepper pasa de 7 a 8 etapas y Resultados suma un botón para avanzar a Premios.
- Los premios se sortean por casa, empezando por la que quedó 4.ª y terminando por la 1.ª: 2 premios para la 4.ª, 3 para la 3.ª, 4 para la 2.ª y 5 para la 1.ª. Cada premio se sortea entre los invitados de esa casa.
- Al final hay un sorteo de 1 premio entre todos los invitados.
- Cada premio se sortea de a uno: aparece el nombre del ganador y se puede volver a sortear ese último premio. El nombre descartado vuelve al bombo.
- Una persona no puede ganar dos premios: quien ya ganó queda fuera de los sorteos siguientes, incluido el final.
- Si una casa tiene menos invitados disponibles que premios, se sortean los que alcancen y se pasa a la siguiente tanda.
- Los ganadores se guardan en el estado de la partida, así sobreviven a una recarga.

## Capabilities

### New Capabilities

- `sorteo-premios`: sorteo de premios por casa según el puesto final y sorteo final entre todos, con re-sorteo del último premio y sin ganadores repetidos.

### Modified Capabilities

- `partida-flow`: la secuencia de etapas suma Premios después de Resultados, y el stepper muestra 8 etapas.

## Impact

- `src/domain/state.ts`: etapa `premios`, estado `partida.premios` con los ganadores.
- Nuevo `src/domain/premios.ts`: premios por puesto, orden de las tandas y elegibles de cada sorteo.
- `src/domain/actions.ts` y `reducer.ts`: acciones para sortear el próximo premio y volver a sortear el último.
- `src/domain/partida.ts`: nombre de la etapa Premios.
- Nueva pantalla `src/presentation/pages/PremiosPage.tsx` (+ CSS); `App.tsx` la resuelve para la etapa nueva.
- `ResultadosPage.tsx`: botón para pasar a Premios.
- `src/infrastructure/local-storage-state-port.ts`: completar con premios vacíos el estado guardado sin `partida.premios`, para no perder una partida ya cargada.
