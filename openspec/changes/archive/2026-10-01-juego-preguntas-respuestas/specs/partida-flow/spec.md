## MODIFIED Requirements

### Requirement: Bloque genérico de juego
El sistema SHALL mostrar las etapas Juego 2, Juego 3 y Juego 4 con una única pantalla parametrizada por el nombre del juego activo, sin implementar la mecánica particular de ese juego. El Juego 1 (Preguntas y respuestas) tiene su propia pantalla, definida en la capability `juego-preguntas`.

#### Scenario: Mostrar el nombre del juego activo
- **WHEN** la partida está en la etapa Juego 3
- **THEN** la pantalla muestra el nombre "Tabú HP" y los controles genéricos de puntaje y avance, sin ningún contenido específico del juego

#### Scenario: El Juego 1 no usa el bloque genérico
- **WHEN** la partida está en la etapa Juego 1
- **THEN** la pantalla muestra las preguntas del Juego 1 en lugar del bloque genérico de puntaje

### Requirement: Carga de puntaje por casa en cada bloque de juego
El sistema SHALL permitir cargar, durante las etapas Juego 2, Juego 3 y Juego 4, un puntaje numérico por cada una de las 4 casas, y corregirlo mientras la partida esté en curso. El puntaje del Juego 1 no se carga a mano: se calcula a partir de los aciertos marcados.

#### Scenario: Cargar puntaje de un juego
- **WHEN** el anfitrión ingresa un valor de puntos para cada casa en la etapa Juego 2 y confirma
- **THEN** el puntaje acumulado de cada casa se actualiza sumando el valor cargado

#### Scenario: Corregir un puntaje ya cargado
- **WHEN** el anfitrión vuelve a una etapa de juego cuyo puntaje ya fue cargado y cambia el valor de una casa
- **THEN** el puntaje acumulado de esa casa se recalcula reemplazando el valor anterior por el nuevo, sin duplicar la suma
