## Context

Los Juegos 1 y 2 ya tienen mecánica propia con el mismo patrón: lo registrado en el juego vive en un campo de `Partida` (`preguntas`, `quidditch`) y el reducer reescribe `puntajesPorJuego[juego]` a partir de eso, así el marcador y Resultados no cambian. Los puntos de cada juego están en `src/domain/puntos.ts`. El Juego 3 sigue hoy en `JuegoEnCursoPage`.

El Tabú cambia quién usa la pantalla: durante un turno, la tablet la tiene el participante que hace adivinar, no el anfitrión. La pantalla del turno tiene que ser legible a distancia de brazo y tener dos acciones grandes y difíciles de confundir.

## Goals / Non-Goals

**Goals:**
- Mazo de 60 tarjetas repartido al azar, 15 por casa, fijo durante toda la partida.
- Un turno de 3 minutos por casa, con check y cruz que avanzan de tarjeta, y deshacer la última marca.
- Puntaje del Juego 3 derivado de las marcas, con el mismo patrón que los Juegos 1 y 2.
- Reloj que sobrevive un refresh en medio de un turno.

**Non-Goals:**
- Pasar una tarjeta sin marcar.
- Pausar o extender un turno, o volver a jugar el turno de una casa.
- Editar el mazo desde la interfaz.
- Sonido al terminar el tiempo.
- Cambios en el Juego 4.

## Decisions

### Mazo
Nuevo módulo `src/domain/tabu.ts` con:
- `TarjetaTabu = { id: string; palabra: string; prohibidas: [string, string, string, string] }`.
- `TARJETAS_TABU: TarjetaTabu[]` con las 60 tarjetas de la sección "Contenido de las tarjetas". El `id` es estable y único aunque la palabra se repita (por ejemplo `pocion-1` y `pocion-2`).
- `TARJETAS_POR_CASA = 15` y `DURACION_TURNO_TABU_SEGUNDOS = 180`.
- `repartirTarjetas(casas): Record<CasaId, string[]>`: recibe las casas por parámetro (así `tabu.ts` no importa valores de `state.ts`, que a su vez lo importa para el estado inicial), mezcla los ids con Fisher-Yates, asigna 15 consecutivos a cada casa y, si alguna casa quedó con dos tarjetas de la misma palabra, descarta el sorteo y vuelve a mezclar. La comparación de palabras ignora mayúsculas y tildes.

Con 7 pares repetidos en 60 tarjetas, un sorteo cumple la condición en alrededor del 15% de los casos (simulado), así que en promedio hacen falta 6 o 7 intentos, cada uno de microsegundos. Como resguardo, después de 1000 intentos fallidos se usa el último sorteo igual: solo podría pasar si el mazo cambia y deja de admitir un reparto sin repetidos (por ejemplo, una palabra con 5 copias).

Alternativa descartada: intercambiar solo las tarjetas repetidas con otra casa. Es más código para el mismo resultado, y volver a sortear todo mantiene el reparto uniformemente al azar.

Agrupar por casa al cargar el mazo no tiene efecto: se mezclan las 60 y cualquier casa puede recibir cualquier tarjeta.

### Puntos
En `puntos.ts`: `PUNTOS_TABU = { acierto: 10, error: -10 }`.

### Estado
Se agrega a `Partida` el campo `tabu`:
- `reparto: Record<CasaId, string[]>`: ids de tarjeta por casa, en el orden en que se juegan.
- `turnos: Record<CasaId, TurnoTabu>`, con `TurnoTabu = { venceEn: number | null; resultados: ('acierto' | 'error')[] }`.
- `casaEnTurno: CasaId | null`: la casa cuyo turno está en pantalla.

`resultados[i]` es el resultado de la tarjeta `i` de la casa, así que la tarjeta en curso es `reparto[casa][resultados.length]` y deshacer es quitar el último elemento. `venceEn` es un timestamp (ms) que se fija al iniciar el turno: `null` significa que la casa todavía no jugó.

El estado del turno se deriva en lugar de guardarse: terminado si `resultados.length === 15` o si `Date.now() >= venceEn`; en curso si tiene `venceEn` y no terminó; pendiente si `venceEn` es `null`. Así no hace falta una acción que "cierre" el turno al vencer el reloj, y un refresh lo recalcula solo.

El reparto se hace en `initialState` llamando a `repartirTarjetas()`. Una partida nueva siempre arranca de `initialState`, y desde ahí el reparto queda persistido.

Alternativa descartada: repartir al entrar al Juego 3 con una acción. Agrega un estado intermedio "sin reparto" que la pantalla tendría que contemplar, sin ningún beneficio.

### Acciones
- `tabu/elegir-casa` (`casa | null`): pone `casaEnTurno`; `null` vuelve a la selección. Solo cambia qué casa se ve; no inicia nada.
- `tabu/iniciar-turno` (`casa`, `ahora`): fija `venceEn = ahora + 180 s` si la casa no jugó. El `ahora` lo pasa la pantalla para que el reducer siga siendo determinístico respecto del reloj.
- `tabu/marcar` (`casa`, `resultado`, `ahora`): agrega el resultado si el turno está en curso (quedan tarjetas y `ahora < venceEn`).
- `tabu/deshacer` (`casa`): quita el último resultado de esa casa, si hay.

Después de `marcar` y `deshacer`, el reducer reescribe `puntajesPorJuego['tabu-hp']` con `puntajeTabuPorCasa(turnos)`: por casa, aciertos por `PUNTOS_TABU.acierto` más errores por `PUNTOS_TABU.error`.

Deshacer no exige que el turno siga en curso: si el reloj ya venció, deshacer corrige el puntaje igual, pero la tarjeta que vuelve a mostrarse no se puede marcar.

### Pantalla
Nueva `TabuPage`, con `Stepper` y `MarcadorCasas` compacto arriba, y tres estados según la casa elegida:
- **Selección**: las 4 casas con su estado (pendiente, jugando, terminado y su puntaje del juego). Tocar una la elige.
- **Antes de empezar**: nombre de la casa, "15 tarjetas · 3 minutos" y el botón "Empezar turno".
- **Turno en curso**: reloj m:ss arriba, "Tarjeta N de 15", la palabra en grande y las 4 prohibidas debajo, y dos botones grandes lado a lado: ✓ (adivinaron) y ✗ (dijo una prohibida), separados entre sí. Debajo, "Deshacer" en chico.
- **Turno terminado**: resumen con checks, cruces y puntos del turno, "Deshacer" y el botón para volver a la selección.

El reloj se actualiza con un `setInterval` de 250 ms que guarda la hora actual en un estado local de la página mientras se está en el Juego 3, y lo restante se calcula desde `venceEn`. La hora se lee de ese estado y no con `Date.now()` durante el render (regla de pureza del lint); las acciones sí usan `Date.now()` dentro de sus handlers. Cuando llega a 0, la pantalla pasa a "Turno terminado" sola.

Los toques en ✓ y ✗ tienen un throttle de 600 ms (`ESPERA_ENTRE_MARCAS_MS` en `TabuPage`): un segundo toque dentro de ese lapso, en cualquiera de los dos botones, se ignora. Evita que un doble toque marque dos tarjetas y deje pasar una sin que el equipo la vea. Se guarda la hora de la última marca en un `useRef` y no se deshabilitan los botones, para no generar un parpadeo visual en cada marca.

Los colores de los botones respetan `DESIGN.md`: los colores de casa no se usan como estado. El check usa el botón primario (oro, accionable) y la cruz el patrón de aviso (`--vitral` con borde `#C2566B`).

`App.tsx` renderiza `TabuPage` para el Juego 3; `JuegoEnCursoPage` queda solo para el Juego 4.

### Persistencia
`local-storage-state-port.ts` suma `partida.tabu` al chequeo que descarta estado guardado con una forma anterior.

### Contenido de las tarjetas
Tal como las definió el anfitrión (agrupadas por casa solo para cargarlas; se reparten al azar). Formato: palabra: prohibidas.

1. VARITA: magia, hechizo, madera, Harry
2. HERMIONE: Harry, Ron, Granger, bruja
3. DRAGÓN: fuego, alas, animal, escamas
4. POCIÓN: beber, líquido, caldero, magia
5. QUIDDITCH: escoba, deporte, pelota, Harry
6. DEMENTOR: Azkaban, beso, alma, negro
7. CASTILLO: Hogwarts, edificio, rey, princesa
8. DUMBLEDORE: director, barba, Hogwarts, Harry
9. INVISIBILIDAD: invisible, capa, ver, Harry
10. ARAÑA: ocho, patas, Aragog, Ron
11. HECHIZO: magia, varita, palabras, lanzar
12. VOLDEMORT: Harry, Tom, villano, nariz
13. ESPEJO: reflejo, mirar, imagen, Oesed
14. ESCOBA: volar, Quidditch, Harry, palo
15. FANTASMA: muerto, espíritu, transparente, Hogwarts
16. RON: Harry, Hermione, Weasley, pelirrojo
17. HOGWARTS: escuela, castillo, magia, estudiantes
18. AVADA KEDAVRA: maldición, muerte, verde, Voldemort
19. LEVIOSA: Wingardium, Hermione, pluma, volar
20. AZKABAN: prisión, Sirius, Dementores, cárcel
21. HAGRID: gigante, barba, Hogwarts, criaturas
22. FUEGO: caliente, quemar, llamas, rojo
23. HORROCRUX: Voldemort, alma, inmortal, objeto
24. NIMBUS 2000: escoba, Harry, volar, Quidditch
25. MAPA DEL MERODEADOR: Fred, George, Hogwarts, mapa
26. SOMBRERO SELECCIONADOR: casas, cabeza, Gryffindor, hablar
27. LOBO: Lupin, luna, animal, aullar
28. DIARIO: escribir, Tom Riddle, páginas, Horrocrux
29. MÁGICO: bruja, hechizo, varita, Hogwarts
30. GRYFFINDOR: león, rojo, Harry, casa
31. HECHIZO: magia, varita, encantamiento, palabras
32. GRINGOTTS: banco, duendes, dinero, bóveda
33. SNAPE: profesor, pociones, Lily, negro
34. LECHUZA: ave, carta, volar, Hedwig
35. SLYTHERIN: serpiente, verde, casa, Voldemort
36. GIRATIEMPO: Hermione, tiempo, reloj, pasado
37. DOBBY: elfo, calcetín, Harry, Malfoy
38. BOSQUE PROHIBIDO: árboles, Hogwarts, arañas, centauros
39. PATRONUS: animal, Dementor, protección, hechizo
40. CICATRIZ: Harry, frente, rayo, Voldemort
41. MANDRÁGORA: planta, grito, raíz, invernadero
42. SNITCH DORADA: Quidditch, pelota, alas, dorada
43. CALLEJÓN DIAGON: tiendas, magia, Londres, Gringotts
44. SOMBRERO SELECCIONADOR: casas, cabeza, Hogwarts, elegir
45. RANA DE CHOCOLATE: dulce, comer, saltar, chocolate
46. ESPADA: Gryffindor, cortar, acero, arma
47. POCIÓN: beber, caldero, líquido, ingredientes
48. ESCUDO: proteger, defensa, guerra, cubrir
49. CALDERO: poción, olla, cocinar, bruja
50. ESCOBA: volar, Quidditch, barrer, palo
51. CARTA: sobre, escribir, correo, Hogwarts
52. MANDRÁGORA: planta, grito, raíz, invernadero
53. MORTÍFAGO: Voldemort, máscara, marca, negro
54. TROLL: gigante, baño, piedra, Hermione
55. PROFECÍA: futuro, predicción, bola, Trelawney
56. SALA DE LOS MENESTERES: Hogwarts, habitación, esconder, objetos
57. DRAGÓN: fuego, alas, escamas, criatura
58. PIEDRA FILOSOFAL: Nicolas Flamel, roja, inmortalidad, Voldemort
59. QUIDDITCH: escoba, deporte, pelota, equipo
60. SIEMPRE / ALWAYS: Snape, Lily, amor, pregunta

Hay 7 palabras repetidas en el mazo (DRAGÓN, POCIÓN, QUIDDITCH, HECHIZO, ESCOBA, MANDRÁGORA y SOMBRERO SELECCIONADOR). El reparto garantiza que las dos copias de una palabra terminen en casas distintas.

## Risks / Trade-offs

- [El reloj depende de la hora del dispositivo] → Un cambio de hora en medio de un turno lo afectaría; en una tablet durante un evento no es un caso realista.
- [El participante toca ✗ en lugar de ✓] → Botones grandes y separados, y "Deshacer" para corregir.
- [Doble toque que marca dos tarjetas] → Throttle de 600 ms entre marcas.
- [El participante ve la siguiente tarjeta antes de tiempo] → Se muestra una sola tarjeta y la próxima aparece recién al marcar.

## Migration Plan

Se despliega con el próximo build estático. El estado persistido anterior se descarta al iniciar (ver Persistencia).
