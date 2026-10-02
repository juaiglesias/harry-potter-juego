# partida-flow

## Purpose

Flujo de la partida: secuencia fija de etapas, navegación entre ellas, carga de puntaje por casa en los bloques de juego y pantalla de resultados con la casa ganadora.

## Requirements

### Requirement: Etapas fijas de la partida
El sistema SHALL definir la partida como una secuencia fija de etapas: Configuración, Sorteo, Juego 1 (Preguntas y respuestas), Juego 2 (Quidditch), Juego 3 (Tabú HP), Juego 4 (Huevo de Dragón), Resultados.

#### Scenario: Orden de etapas fijo
- **WHEN** la partida arranca
- **THEN** el estado global inicia en la etapa Configuración, y las etapas siguientes le siguen siempre en ese mismo orden

### Requirement: Avance manual entre etapas
El sistema SHALL permitir al anfitrión avanzar a la etapa siguiente mediante una acción explícita, sin exigir ninguna condición sobre los cupos de casas ni la cantidad de invitados.

#### Scenario: Avanzar de Sorteo a Juego 1 con cupos incompletos
- **WHEN** el anfitrión dispara la acción de avanzar durante la etapa Sorteo, aunque no se hayan sorteado todos los cupos esperados
- **THEN** la partida pasa a la etapa Juego 1

### Requirement: Retroceso a una etapa anterior
El sistema SHALL permitir al anfitrión volver a cualquier etapa anterior ya visitada, en cualquier momento posterior.

#### Scenario: Retroceder desde Juego 2 a Sorteo
- **WHEN** el anfitrión dispara la acción de retroceder desde la etapa Juego 2 eligiendo la etapa Sorteo
- **THEN** la partida vuelve a mostrar la etapa Sorteo con los datos ya cargados intactos

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

### Requirement: Marcador de puntaje persistente
El sistema SHALL mostrar el puntaje acumulado de las 4 casas en todo momento desde que existen casas configuradas, en un tamaño reducido durante las etapas de juego.

#### Scenario: Marcador visible durante un bloque de juego
- **WHEN** la partida está en cualquier etapa de juego
- **THEN** el marcador de las 4 casas se muestra en un tamaño reducido junto al contenido del bloque

### Requirement: Pantalla de resultados
El sistema SHALL mostrar, en la etapa Resultados, un ranking de las 4 casas ordenado por puntaje acumulado de mayor a menor, destacando a la casa con más puntos como ganadora.

#### Scenario: Determinar la casa ganadora
- **WHEN** la partida llega a la etapa Resultados
- **THEN** se muestran las 4 casas ordenadas por puntaje descendente y la primera de la lista se marca como ganadora

#### Scenario: Empate en el primer puesto
- **WHEN** dos o más casas tienen el mismo puntaje más alto en la etapa Resultados
- **THEN** todas las casas empatadas en el primer puesto se marcan como ganadoras

### Requirement: Stepper de progreso
El sistema SHALL mostrar en la vista de control un indicador persistente con las 7 etapas de la partida, resaltando cuál está activa.

#### Scenario: Resaltar la etapa activa
- **WHEN** la partida está en la etapa Juego 2
- **THEN** el indicador de progreso muestra las 7 etapas y resalta "Juego 2" como la activa
