## MODIFIED Requirements

### Requirement: Etapas fijas de la partida
El sistema SHALL definir la partida como una secuencia fija de etapas: Configuración, Sorteo, Juego 1 (Preguntas y respuestas), Juego 2 (Quidditch), Juego 3 (Tabú HP), Juego 4 (Huevo de Dragón), Resultados, Premios.

#### Scenario: Orden de etapas fijo
- **WHEN** la partida arranca
- **THEN** el estado global inicia en la etapa Configuración, y las etapas siguientes le siguen siempre en ese mismo orden

#### Scenario: Avanzar de Resultados a Premios
- **WHEN** el anfitrión dispara la acción de avanzar durante la etapa Resultados
- **THEN** la partida pasa a la etapa Premios

### Requirement: Stepper de progreso
El sistema SHALL mostrar en la vista de control un indicador persistente con las 8 etapas de la partida, resaltando cuál está activa.

#### Scenario: Resaltar la etapa activa
- **WHEN** la partida está en la etapa Juego 2
- **THEN** el indicador de progreso muestra las 8 etapas y resalta "Juego 2" como la activa
