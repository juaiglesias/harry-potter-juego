## MODIFIED Requirements

### Requirement: Bloque genérico de juego
El sistema SHALL mostrar la etapa Juego 4 con una pantalla parametrizada por el nombre del juego activo, sin implementar la mecánica particular de ese juego. Los Juegos 1 (Preguntas y respuestas), 2 (Quidditch) y 3 (Tabú HP) tienen su propia pantalla, definidas en las capabilities `juego-preguntas`, `juego-quidditch` y `juego-tabu`.

#### Scenario: Mostrar el nombre del juego activo
- **WHEN** la partida está en la etapa Juego 4
- **THEN** la pantalla muestra el nombre "Huevo de Dragón" y los controles genéricos de puntaje y avance, sin ningún contenido específico del juego

#### Scenario: El Juego 1 no usa el bloque genérico
- **WHEN** la partida está en la etapa Juego 1
- **THEN** la pantalla muestra las preguntas del Juego 1 en lugar del bloque genérico de puntaje

#### Scenario: El Juego 2 no usa el bloque genérico
- **WHEN** la partida está en la etapa Juego 2
- **THEN** la pantalla muestra los aros del Juego 2 en lugar del bloque genérico de puntaje

#### Scenario: El Juego 3 no usa el bloque genérico
- **WHEN** la partida está en la etapa Juego 3
- **THEN** la pantalla muestra las tarjetas y turnos del Juego 3 en lugar del bloque genérico de puntaje

### Requirement: Carga de puntaje por casa en cada bloque de juego
El sistema SHALL permitir cargar, durante la etapa Juego 4, un puntaje numérico por cada una de las 4 casas, y corregirlo mientras la partida esté en curso. Los puntajes de los Juegos 1, 2 y 3 no se cargan a mano: se calculan a partir de lo registrado en cada juego.

#### Scenario: Cargar puntaje de un juego
- **WHEN** el anfitrión ingresa un valor de puntos para cada casa en la etapa Juego 4 y confirma
- **THEN** el puntaje acumulado de cada casa se actualiza sumando el valor cargado

#### Scenario: Corregir un puntaje ya cargado
- **WHEN** el anfitrión vuelve a una etapa de juego cuyo puntaje ya fue cargado y cambia el valor de una casa
- **THEN** el puntaje acumulado de esa casa se recalcula reemplazando el valor anterior por el nuevo, sin duplicar la suma
