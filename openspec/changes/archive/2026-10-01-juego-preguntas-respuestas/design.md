## Context

Hoy las 4 etapas de juego se renderizan con `JuegoEnCursoPage`, que muestra un input numérico por casa y despacha `partida/cargar-puntaje`. El puntaje de cada juego vive en `partida.puntajesPorJuego[juego][casa]`, y de ahí lo leen `MarcadorCasas` y el ranking de Resultados (`puntajeTotalPorCasa`, `rankingCasas`).

El Juego 1 es el primero con mecánica propia: el anfitrión lee una pregunta, las casas responden fuera de la app y el anfitrión marca cuáles acertaron. La pantalla es la vista de control, de uso exclusivo del anfitrión (`ARCHITECTURE.md`), así que la respuesta correcta puede estar siempre visible.

## Goals / Non-Goals

**Goals:**
- Pantalla propia del Juego 1 con las 20 preguntas, navegación y marcado de aciertos por casa.
- Puntaje del Juego 1 derivado de los aciertos, sin carga manual, y sin tocar cómo leen el puntaje el marcador y Resultados.
- Timer de cuenta regresiva junto a cada pregunta, ajustable antes de iniciarlo.
- Puntos por acierto definidos en un único lugar del dominio, extensible a los próximos juegos.
- Persistencia de aciertos y pregunta en curso con el mismo mecanismo de `localStorage` que el resto del estado.

**Non-Goals:**
- Edición o carga de preguntas desde la interfaz.
- Persistir el estado del timer, pausarlo a mitad de cuenta o alertar con sonido al llegar a 0.
- Turnos por casa o cualquier regla de juego más allá de marcar aciertos.
- Mostrar las preguntas a los invitados (proyección, segunda pantalla).
- Cambios en los Juegos 2, 3 y 4.

## Decisions

### Preguntas como datos estáticos del dominio
Nuevo módulo `src/domain/preguntas.ts` con el tipo `Pregunta` como unión discriminada:
- `{ id, tipo: 'abierta', enunciado, respuesta }`
- `{ id, tipo: 'multiple-choice', enunciado, opciones: [string, string, string, string], correcta: 0 | 1 | 2 | 3 }`

y la constante `PREGUNTAS_JUEGO_1: Pregunta[]` con las 20 preguntas en el orden en que se leen. Las letras A a D se derivan del índice al mostrar, no se guardan en el texto. El `id` es un string estable (`'banco-magos'`, `'patronus-harry'`, etc.) usado como clave de los aciertos, para que reordenar o corregir el texto de una pregunta no mezcle aciertos ya marcados.

Alternativa descartada: un JSON en `public/`. No hay necesidad de reemplazar las preguntas sin rebuild y como módulo TypeScript quedan tipadas.

### Contenido de las preguntas
Orden de lectura y contenido de `PREGUNTAS_JUEGO_1`, tal como lo definió el anfitrión. Se corrigió la ortografía de "Avada Kedavra" y se completó "¿Cuáles".

Abiertas:
1. ¿Cómo se llama el banco de los magos? → Gringotts.
2. ¿Cuál es el Patronus de Harry? → Un ciervo.
3. ¿Cómo se llama el mapa que muestra todos los pasadizos y personas de Hogwarts? → El Mapa del Merodeador.
4. ¿Cuál es el nombre de la madre de Draco Malfoy? → Narcissa Malfoy.
5. ¿Qué criatura vive en la Cámara de los Secretos? → Un basilisco.
6. ¿Qué tienda vende varitas en el Callejón Diagon? → Ollivanders.
7. ¿Cuál es el nombre completo de Voldemort? → Tom Marvolo Riddle.
8. ¿Cuáles son las tres Reliquias de la Muerte? → La Varita de Saúco, la Piedra de la Resurrección y la Capa de Invisibilidad.
9. ¿Quién mata a Nagini? → Neville Longbottom.
10. ¿Quién fue el primer amor de Severus Snape? → Lily Potter.
11. ¿Cómo se llama el hermano de Dumbledore? → Aberforth Dumbledore.
12. ¿Cómo se llama la lechuza de Harry? → Hedwig.
13. ¿Cuál fue el primer Horrocrux que Harry destruyó? → El diario de Tom Riddle.

Multiple choice (correcta marcada con ✓):
14. ¿Quién destruye el guardapelo de Slytherin? A) Harry, B) Hermione, C) Neville, D) Ron ✓
15. ¿Cuál es el Patronus de Hermione? A) Gato, B) Nutria ✓, C) Cisne, D) Zorro
16. ¿Quién es el padrino de Harry? A) Remus Lupin, B) Arthur Weasley, C) Sirius Black ✓, D) Alastor Moody
17. ¿Quién mata a Dumbledore? A) Voldemort, B) Snape ✓, C) Draco, D) Bellatrix
18. ¿Qué hechizo se utiliza para invocar objetos? A) Accio ✓, B) Alohomora, C) Wingardium Leviosa, D) Reparo

Abiertas de varios elementos:
19. ¿Cuáles son los tres hechizos imperdonables? → Avada Kedavra, Imperio y Crucio.
20. ¿Cuáles son los 7 Horrocruxes? → El diario de Tom Riddle, el anillo de Marvolo Gaunt, el guardapelo de Salazar Slytherin, la copa de Helga Hufflepuff, la diadema de Rowena Ravenclaw, Nagini y Harry.

### Puntos centralizados
Nuevo módulo `src/domain/puntos.ts` con `PUNTOS_POR_ACIERTO`, un objeto con los puntos que suma cada acierto en los juegos que los calculan por acierto. Hoy tiene una sola entrada: `'preguntas-y-respuestas': 10`. Los próximos juegos agregan la suya ahí.

### Estado del Juego 1
Se agrega a `Partida` un campo `preguntas`:
- `preguntaActual: number`: índice en `PREGUNTAS_JUEGO_1`.
- `aciertos: Record<string, CasaId[]>`: por `id` de pregunta, las casas marcadas como acertadas. Una pregunta sin entrada equivale a ninguna casa.

Acciones nuevas:
- `preguntas/ir-a-pregunta` con `indice`, acotado en el reducer a `[0, total - 1]`.
- `preguntas/alternar-acierto` con `preguntaId` y `casa`: agrega la casa si no estaba, la saca si estaba.

### Puntaje derivado y escrito en `puntajesPorJuego`
Al procesar `preguntas/alternar-acierto`, el reducer recalcula `puntajesPorJuego['preguntas-y-respuestas']` con una función pura de dominio: por casa, cantidad de preguntas donde figura en `aciertos` por `PUNTOS_POR_ACIERTO['preguntas-y-respuestas']`.

Así `MarcadorCasas`, `puntajeTotalPorCasa` y `rankingCasas` siguen leyendo `puntajesPorJuego` sin cambios. Los aciertos son la fuente de verdad del Juego 1 y el puntaje se reescribe completo en cada cambio, nunca se suma o resta incrementalmente, así que no puede desfasarse.

Alternativa descartada: no guardar el puntaje del Juego 1 y calcularlo en `puntajeTotalPorCasa`. Obliga a que los selectores conozcan la mecánica de cada juego y a pasarles los aciertos.

### Pantallas
- Nueva `PreguntasPage` en `src/presentation/pages/`: `Stepper`, `MarcadorCasas` compacto, "Pregunta N de 20", enunciado, opciones con letra y la correcta destacada (multiple choice) o la respuesta (abierta), 4 botones de casa que alternan el acierto con estado visible, y botones Anterior/Siguiente. Al final, el mismo botón de avanzar etapa que el resto de los juegos.
- Los botones de casa usan los colores de casa como franja de pertenencia (borde izquierdo) y como relleno cuando la casa está marcada, junto con un ✓ y `aria-pressed`. `COLORES_CASA` pasa de `MarcadorCasas.tsx` a `components/colores-casa.ts` para compartirlo sin romper el fast refresh.
- `App.tsx` renderiza `PreguntasPage` cuando la etapa es `{ tipo: 'juego', juego: 'preguntas-y-respuestas' }` y `JuegoEnCursoPage` para los demás juegos.

### Timer de respuesta
Componente `TimerPregunta` en `src/presentation/components/`, ubicado al lado del enunciado. Muestra los segundos restantes, dos botones (subir y bajar de a 5) apilados junto al número y un botón de play.

El estado es local de presentación (`useState`), no pasa por el reducer ni se persiste: es un apoyo para el anfitrión durante la lectura y no afecta el puntaje. Ante un refresh vuelve al valor configurado, que es aceptable.

- Estado: `duracion` (valor configurado, arranca en 10), `restantes` y `corriendo`.
- Subir/bajar modifican `duracion` y `restantes` juntos, con mínimo 5 y sin máximo. Quedan deshabilitados mientras corre.
- Play pone `restantes = duracion` y `corriendo = true`. Un `setInterval` de 1 segundo, creado en un `useEffect` que depende de `corriendo`, descuenta hasta 0 y ahí pone `corriendo = false`. El cleanup del efecto limpia el intervalo.
- Al llegar a 0 el número pasa a `--texto-tenue` y aparece el aviso "Tiempo cumplido" con el patrón de aviso de `DESIGN.md` (fondo `--vitral`, borde izquierdo). Los segundos usan EB Garamond con números alineados: los números de estilo antiguo de IM Fell hacían que "10s" se leyera como "IOS".
- `PreguntasPage` renderiza el timer con `key` igual al `id` de la pregunta, así cada cambio de pregunta lo desmonta y lo vuelve a montar detenido. Para conservar la duración ajustada entre preguntas, `duracion` vive en `PreguntasPage` y se pasa al timer junto con su setter.

Los valores 10 (inicial) y 5 (paso y mínimo) quedan como constantes junto a las preguntas en `src/domain/preguntas.ts` (`SEGUNDOS_TIMER_INICIAL`, `PASO_TIMER_SEGUNDOS`), para ajustarlos en un solo lugar.

Alternativa descartada: guardar el timer en el estado global. Un tick por segundo dispararía una escritura en `localStorage` por segundo sin ningún beneficio real.

### Persistencia
`local-storage-state-port.ts` hoy descarta el estado guardado solo si falta `partida`. Un estado guardado antes de este cambio tiene `partida` pero no `partida.preguntas`, y la pantalla del Juego 1 rompería al leerlo. Se extiende el chequeo para descartarlo también si falta `partida.preguntas`, con el mismo criterio que ya existe.

## Risks / Trade-offs

- [Al desplegar, un estado guardado de antes se descarta y se pierde la partida en curso] → No hay eventos en curso con datos reales; se acepta igual que en el cambio anterior.
- [Marcar la casa equivocada en el apuro del evento] → El botón alterna, así que se corrige con un segundo toque, y el marcador muestra el efecto al instante.
- [Error de contenido en una pregunta o respuesta] → Se corrige editando `preguntas.ts` y rehaciendo el build; el `id` estable conserva los aciertos ya marcados.

## Migration Plan

Se despliega con el próximo build estático. El estado persistido anterior se descarta al iniciar (ver Persistencia).
