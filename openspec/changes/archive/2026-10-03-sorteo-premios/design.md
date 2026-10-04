## Context

La partida termina hoy en Resultados, que muestra el podio con `rankingCasas` (orden descendente, estable por el orden de `CASAS` ante empates). Los invitados viven en `partida.invitados`, cada uno con su casa ya sorteada. El estado se persiste completo en localStorage y `local-storage-state-port.ts` descarta formas viejas que no tengan alguna clave de `partida`.

El sorteo de premios se proyecta para todos: tiene que leerse a distancia y avanzar con un toque del anfitrión. Cantidades: 2 premios a la casa 4.ª, 3 a la 3.ª, 4 a la 2.ª y 5 a la 1.ª, más 1 premio final entre todos (15 en total). Decisiones del anfitrión: nadie gana dos premios, y el nombre descartado en un re-sorteo vuelve al bombo.

## Goals / Non-Goals

**Goals:**
- Etapa Premios después de Resultados, con su pantalla.
- Sorteo de a un premio, tanda por tanda, de la casa 4.ª a la 1.ª y después el final.
- Re-sorteo del último premio.
- Ganadores persistidos en la partida.

**Non-Goals:**
- Animación del sorteo (ruleta, nombres pasando); el nombre aparece directo.
- Configurar la cantidad de premios por puesto o describir qué es cada premio.
- Re-sortear un premio que no sea el último.
- Confirmación modal antes de sortear.

## Decisions

**Estado: lista plana de ganadores, tandas derivadas.** `partida.premios = { ganadores: Ganador[] }` con `Ganador = { tanda: Tanda; invitadoId: string }` y `Tanda = CasaId | 'final'`, en el orden en que salieron. La tanda en curso, los premios restantes y los elegibles se derivan del ranking, los invitados y esa lista; no se guarda cuál es la tanda actual. Mismo criterio que el resto de los juegos: guardar lo mínimo y calcular lo demás para que no se desfase. Alternativa descartada: guardar un plan precalculado de tandas al entrar a la etapa, porque obliga a decidir cuándo se arma y qué pasa si el anfitrión vuelve atrás.

**Dominio en `src/domain/premios.ts`.**
- `PREMIOS_POR_PUESTO = [5, 4, 3, 2]` (índice = puesto 0-based) y `PREMIOS_FINAL = 1`.
- `tandasPremios(puntajesPorJuego)`: lista de `{ tanda, cantidad }` en orden de sorteo, desde la 4.ª casa de `rankingCasas` hasta la 1.ª, y al final `{ tanda: 'final', cantidad: 1 }`. Usar `rankingCasas` hace que el puesto ante empate sea el mismo que muestra el podio.
- `elegiblesPremio(tanda, invitados, ganadores)`: invitados de la casa (o todos, si es `'final'`) que no figuran en `ganadores`.
- `tandaEnCurso(puntajesPorJuego, invitados, ganadores)`: la primera tanda con menos ganadores que su cantidad y al menos un elegible; `null` si no queda ninguna (sorteo terminado).

**El azar viene en la acción.** `premios/sortear` y `premios/volver-a-sortear` llevan `azar: number` en `[0, 1)`, generado con `Math.random()` en el handler de la página; el reducer elige `elegibles[Math.floor(azar * elegibles.length)]`. Así el reducer queda puro, como `tabu/iniciar-turno` que recibe `ahora`. En desarrollo StrictMode ejecuta el reducer dos veces, y con el azar en la acción ambas corridas dan el mismo ganador.

**Acciones.**
- `premios/sortear`: calcula la tanda en curso; si es `null` no hace nada; si no, agrega un ganador elegido entre sus elegibles.
- `premios/volver-a-sortear`: toma el último ganador, calcula los elegibles de su tanda sacando también a ese ganador (que todavía está en la lista) y lo reemplaza por uno de ellos. Si no hay otro elegible, no hace nada. Al reemplazarlo, el descartado deja de estar en `ganadores` y vuelve a ser elegible para los sorteos siguientes, que es lo que pidió el anfitrión.

**Etapa `premios`.** Se agrega `{ tipo: 'premios' }` al final de `ETAPAS_ORDEN` y `nombreEtapa` devuelve "Premios". `App.tsx` resuelve `PremiosPage`; el `switch` de `ActivePage` no tiene default, así que TypeScript obliga a cubrir el caso nuevo. `ResultadosPage` suma el botón "Sortear premios" que despacha `partida/avanzar-etapa`, igual que el botón de avance de las pantallas de juego.

**Pantalla `PremiosPage`.**
- Encabezado de la tanda en curso: nombre de la casa y su puesto ("Hufflepuff, 4.º puesto") o "Sorteo final", y "Premio N de M".
- Tarjeta grande con el último ganador: nombre en tamaño de título, fondo o franja con el color de su casa y, debajo, la tanda en la que salió. Sin ganador todavía, un texto que invita a sortear.
- Botones: "Sortear" (primario, deshabilitado si no hay tanda en curso) y "Volver a sortear" (secundario, visible si hay un último ganador y deshabilitado si no queda otro elegible en su tanda).
- Cuando no queda tanda en curso, el encabezado dice que el sorteo terminó.
- Debajo, el listado de ganadores agrupado por tanda en el orden de sorteo, con la franja del color de la casa del invitado (en el final también, para saber de qué casa es). Mismo estilo de fila que `huevo__llegada`.
- Sin `MarcadorCasas`: el puntaje ya no cambia en esta etapa.

**Persistencia.** `initialState` agrega `premios: { ganadores: [] }`. Si el estado guardado no tiene `partida.premios`, `local-storage-state-port.ts` lo completa con `{ ganadores: [] }` en vez de descartarlo. Con los juegos se descartaba porque todavía no había partidas reales; los premios llegan cuando ya puede haber invitados y puntajes cargados, y descartar el estado los borra.

## Risks / Trade-offs

- [El anfitrión vuelve a un juego y cambia puntajes después de sortear premios] → el orden de tandas se recalcula y una casa puede quedar con más ganadores que su nueva cantidad. Se muestran igual en el listado y esa tanda cuenta como completa. No se bloquea porque volver atrás después del cierre es improbable y bloquearlo agrega estado.
- [Un invitado se elimina o cambia de casa después de ganar] → el listado busca el invitado por id; si no existe se omite. La edición de invitados ocurre en Sorteo, mucho antes.
- [Stepper con 8 etapas] → ya usa `flex-wrap`, así que en pantallas angostas baja de línea sin romper.
- [Re-sorteo solo del último premio] → si se descubre tarde que un ganador anterior no está, no se puede re-sortear ese. Se acepta por simplicidad; coincide con "Deshacer último" del Huevo de Dragón.
