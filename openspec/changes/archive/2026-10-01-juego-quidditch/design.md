## Context

El Juego 1 ya tiene mecánica propia (`PreguntasPage`): guarda los aciertos en `partida.preguntas` y el reducer reescribe `puntajesPorJuego['preguntas-y-respuestas']` a partir de ellos, así el marcador y Resultados no cambian. Los puntos por acierto viven en `src/domain/puntos.ts`. El Juego 2 sigue hoy en `JuegoEnCursoPage`, con un input numérico por casa.

En Quidditch los equipos tiran por turnos a tres aros. El anfitrión anota cada embocada mientras se juega, en vivo y de pie con la tablet, así que la carga tiene que ser un toque por embocada, sin escribir números.

## Goals / Non-Goals

**Goals:**
- Una sola pantalla para todo el Juego 2: las 4 casas y los 3 aros visibles a la vez.
- Un toque por embocada y una forma simple de corregir.
- Puntaje del Juego 2 derivado de las embocadas, con el mismo patrón que el Juego 1.
- Puntos por aro definidos junto a los puntos del Juego 1.

**Non-Goals:**
- Timer, turnos, rondas o cantidad de tiros por casa: el orden de tiro lo maneja el anfitrión fuera de la app.
- Registrar tiros errados.
- Historial de embocadas o "deshacer último" global.
- Cambios en los Juegos 3 y 4.

## Decisions

### Aros y puntos
En `src/domain/puntos.ts`, junto a `PUNTOS_POR_ACIERTO`:
- Tipo `AroId = 'chico' | 'mediano' | 'grande'` y la constante `AROS: AroId[]` en ese orden (de más a menos puntos).
- `PUNTOS_POR_ARO: Record<AroId, number> = { chico: 30, mediano: 20, grande: 10 }`.

`puntos.ts` queda como el lugar único de los puntos de cada juego, como pidió el anfitrión al definir el Juego 1.

### Estado
Se agrega a `Partida` el campo `quidditch: { embocadas: Record<CasaId, Record<AroId, number>> }`, con todo en 0 al iniciar. Se guarda el conteo por casa y aro, no una lista de eventos: es lo que muestra la pantalla y alcanza para corregir.

Acción nueva `quidditch/registrar-embocada` con `casa`, `aro` y `delta: 1 | -1`. El reducer aplica el delta sin bajar de 0 y reescribe `puntajesPorJuego.quidditch` con una función pura `puntajeQuidditchPorCasa(embocadas)` (por casa, suma de embocadas por los puntos de cada aro). Igual que en el Juego 1, el puntaje se recalcula completo en cada cambio y no puede desfasarse de las embocadas.

Alternativa descartada: dos acciones separadas para sumar y restar. Una sola acción con `delta` comparte toda la lógica.

### Pantalla
Nueva `QuidditchPage` con `Stepper`, `MarcadorCasas` compacto y una grilla:
- Encabezado con los 3 aros: "Aro chico · 30", "Aro mediano · 20", "Aro grande · 10".
- Una fila por casa, con la franja de color de casa (`COLORES_CASA`) y el nombre.
- En cada celda, un botón grande que registra la embocada y muestra el conteo actual ("+30" y "×2" debajo, por ejemplo), y al lado un botón chico "−" para restar, deshabilitado cuando el conteo es 0.
- Al final de la fila, el subtotal de la casa en el Juego 2.
- Debajo, el botón de avanzar a la siguiente etapa, como en el resto de los juegos.

La grilla es una `<table>` (casas como encabezado de fila, aros como encabezado de columna). Los números de encabezados y botones usan EB Garamond con números alineados, igual que el timer del Juego 1, porque los de estilo antiguo de IM Fell se confunden ("10" parece "Io").

El botón grande es el blanco principal para un toque rápido en tablet. El "−" es chico y está separado para que no se toque por accidente.

`App.tsx` renderiza `QuidditchPage` para el Juego 2, `PreguntasPage` para el Juego 1 y `JuegoEnCursoPage` para los Juegos 3 y 4.

### Persistencia
`local-storage-state-port.ts` ya descarta el estado guardado sin `partida.preguntas`. Se extiende el mismo chequeo a `partida.quidditch`.

## Risks / Trade-offs

- [Al desplegar se descarta el estado guardado anterior] → Sin eventos en curso con datos reales; mismo criterio que en los cambios anteriores.
- [Toque doble accidental en un aro] → El conteo visible en el botón y el subtotal muestran el efecto al instante, y el "−" lo corrige.
- [Grilla de 4 filas por 3 aros apretada en pantallas chicas] → El dispositivo del evento es una tablet; en celular no se optimiza en este cambio.

## Migration Plan

Se despliega con el próximo build estático. El estado persistido anterior se descarta al iniciar (ver Persistencia).
