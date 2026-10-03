# partida-flow

## Purpose

Flujo de la partida: secuencia fija de etapas, navegación entre ellas, marcador de puntaje acumulado y pantalla de resultados con la casa ganadora.

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

### Requirement: Marcador de puntaje persistente
El sistema SHALL mostrar el puntaje acumulado de las 4 casas en todo momento desde que existen casas configuradas, en un tamaño reducido durante las etapas de juego.

#### Scenario: Marcador visible durante un bloque de juego
- **WHEN** la partida está en cualquier etapa de juego
- **THEN** el marcador de las 4 casas se muestra en un tamaño reducido junto al contenido del bloque

### Requirement: Pantalla de resultados
El sistema SHALL mostrar, en la etapa Resultados, un podio con las 4 casas: un rectángulo por casa con el color de la casa, el nombre y el puntaje acumulado. Los rectángulos se ordenan de izquierda a derecha por puntaje ascendente y su altura crece con el puntaje, de modo que la casa con más puntos queda a la derecha y es la más alta. La casa con más puntos se destaca como ganadora.

#### Scenario: Determinar la casa ganadora
- **WHEN** la partida llega a la etapa Resultados
- **THEN** se muestran las 4 casas ordenadas de izquierda a derecha por puntaje ascendente, la de la derecha se marca como ganadora y su rectángulo es el más alto

#### Scenario: Altura según puntaje
- **WHEN** una casa tiene más puntos que otra en la etapa Resultados
- **THEN** el rectángulo de la casa con más puntos es más alto que el de la otra

#### Scenario: Puntaje cero o negativo
- **WHEN** una casa termina con 0 puntos o con puntaje negativo
- **THEN** su rectángulo se muestra con una altura mínima que deja legibles el nombre y el puntaje

#### Scenario: Empate en el primer puesto
- **WHEN** dos o más casas tienen el mismo puntaje más alto en la etapa Resultados
- **THEN** todas las casas empatadas en el primer puesto se marcan como ganadoras y sus rectángulos tienen la misma altura

### Requirement: Stepper de progreso
El sistema SHALL mostrar en la vista de control un indicador persistente con las 7 etapas de la partida, resaltando cuál está activa.

#### Scenario: Resaltar la etapa activa
- **WHEN** la partida está en la etapa Juego 2
- **THEN** el indicador de progreso muestra las 7 etapas y resalta "Juego 2" como la activa

