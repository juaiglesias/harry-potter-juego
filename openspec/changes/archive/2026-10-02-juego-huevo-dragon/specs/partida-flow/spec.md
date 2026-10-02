## REMOVED Requirements

### Requirement: Bloque genérico de juego
**Reason**: Los 4 juegos tienen pantalla propia (capabilities `juego-preguntas`, `juego-quidditch`, `juego-tabu` y `juego-huevo-dragon`); ninguna etapa de juego usa ya el bloque genérico.
**Migration**: Cada etapa de juego se muestra con la pantalla definida en su capability.

### Requirement: Carga de puntaje por casa en cada bloque de juego
**Reason**: El puntaje de cada juego se calcula a partir de lo que se registra en su mecánica (aciertos, embocadas, marcas de Tabú y orden de llegada); ya no se carga a mano.
**Migration**: Las correcciones de puntaje se hacen con las acciones de corrección de cada juego (desmarcar acierto, restar embocada, deshacer marca, deshacer puesto).
