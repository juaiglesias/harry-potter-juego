## MODIFIED Requirements

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
