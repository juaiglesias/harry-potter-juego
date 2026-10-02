## Why

El Juego 3 (Tabú HP) hoy usa el bloque genérico de carga manual de puntaje. En el evento, un participante de cada casa toma la tablet y tiene que hacer adivinar palabras a su equipo sin decir las palabras prohibidas. La app tiene que mostrarle las tarjetas, dejarle marcar aciertos y errores con un toque, controlar el tiempo del turno y calcular el puntaje.

## What Changes

- El Juego 3 pasa a tener una pantalla propia, pensada para que la use el participante con la tablet en la mano.
- Hay un mazo fijo de 60 tarjetas, cada una con una palabra a adivinar y 4 palabras prohibidas. Al empezar la partida se mezclan y se reparten 15 por casa al azar. Si a una casa le toca dos veces la misma palabra (el mazo tiene palabras repetidas), el reparto se vuelve a sortear internamente hasta que ninguna casa repita palabra.
- Cada casa juega un turno de 3 minutos con sus 15 tarjetas. El anfitrión elige qué casa juega y el turno arranca con un botón; desde ahí el timer descuenta.
- Durante el turno se muestra una tarjeta por vez. El participante marca check si su equipo adivinó (suma 10) o cruz si dijo una palabra prohibida (resta 10); en los dos casos pasa a la próxima tarjeta. No se puede pasar una tarjeta sin marcar.
- El turno termina cuando se acaba el tiempo o cuando se juegan las 15 tarjetas. Las tarjetas que no llegó a jugar no suman ni restan.
- Se puede deshacer la última marca del turno para corregir un toque equivocado.
- El puntaje del Juego 3 se calcula a partir de los checks y cruces, y puede quedar negativo para una casa.
- Los puntos por check y por cruz se definen en `puntos.ts`, junto con los del resto de los juegos.
- El reparto, las marcas y el momento en que vence cada turno se guardan en el estado persistido: un refresh en medio de un turno no reinicia el reloj ni pierde las marcas.
- El Juego 4 sigue con el bloque genérico de carga manual de puntaje.

## Capabilities

### New Capabilities
- `juego-tabu`: mazo de tarjetas y reparto al azar por casa, turnos con tiempo límite, marcado de aciertos y errores con corrección, y cálculo del puntaje del Juego 3.

### Modified Capabilities
- `partida-flow`: el bloque genérico de juego y la carga manual de puntaje dejan de aplicar al Juego 3; siguen aplicando solo al Juego 4.

## Impact

- `src/domain/`: mazo de tarjetas y reparto, puntos del Juego 3 en `puntos.ts`, estado de turnos en la partida, nuevas acciones y su manejo en el reducer.
- `src/presentation/pages/`: nueva pantalla del Juego 3; `JuegoEnCursoPage` queda solo para el Juego 4.
- `src/infrastructure/local-storage-state-port.ts`: el estado guardado antes de este cambio no tiene los datos del Juego 3 y se descarta al iniciar, igual que en los cambios anteriores.
