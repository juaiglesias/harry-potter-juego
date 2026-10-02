# juego-tabu

## Purpose

Mecánica del Juego 3 (Tabú HP): mazo de tarjetas repartido al azar por casa sin palabras repetidas, turnos de tiempo limitado en los que el participante marca aciertos y errores, y puntaje calculado a partir de esas marcas.

## Requirements

### Requirement: Mazo y reparto al azar
El sistema SHALL contar con un mazo fijo de 60 tarjetas, cada una con una palabra a adivinar y 4 palabras prohibidas. Al iniciar una partida, el sistema SHALL mezclar el mazo y repartir 15 tarjetas a cada casa, sin que una casa reciba dos tarjetas con la misma palabra, y mantener ese reparto durante toda la partida.

#### Scenario: Reparto al iniciar la partida
- **WHEN** arranca una partida nueva
- **THEN** cada una de las 4 casas tiene 15 tarjetas asignadas, sin que una misma tarjeta del mazo quede asignada a dos casas

#### Scenario: Ninguna casa repite palabra
- **WHEN** el mazo tiene dos tarjetas con la misma palabra y un sorteo se las asigna a la misma casa
- **THEN** el sistema descarta ese sorteo y vuelve a repartir, hasta que cada casa tenga 15 tarjetas con palabras distintas entre sí

#### Scenario: El reparto no cambia durante la partida
- **WHEN** el anfitrión recarga la página o retrocede y vuelve al Juego 3
- **THEN** cada casa conserva las mismas tarjetas en el mismo orden

### Requirement: Turno por casa con tiempo límite
El sistema SHALL permitir al anfitrión elegir una casa que todavía no jugó e iniciar su turno. El turno SHALL durar 3 minutos desde que se inicia, con el tiempo restante visible, y terminar cuando se acaba el tiempo o cuando se marcaron las 15 tarjetas de la casa.

#### Scenario: Iniciar un turno
- **WHEN** el anfitrión elige a Hufflepuff, que todavía no jugó, e inicia su turno
- **THEN** se muestra la primera tarjeta de Hufflepuff y un reloj que descuenta desde 3:00

#### Scenario: Se acaba el tiempo
- **WHEN** el reloj del turno llega a 0:00
- **THEN** el turno termina, no se pueden marcar más tarjetas y las que no se jugaron no suman ni restan

#### Scenario: Se terminan las tarjetas
- **WHEN** el participante marca la tarjeta 15 de su casa antes de que se acabe el tiempo
- **THEN** el turno termina y el reloj se detiene

#### Scenario: Una casa juega un solo turno
- **WHEN** el turno de una casa ya terminó
- **THEN** esa casa no puede iniciar otro turno

### Requirement: Una tarjeta por vez con check y cruz
El sistema SHALL mostrar durante el turno una tarjeta por vez, con la palabra a adivinar destacada y sus 4 palabras prohibidas, y ofrecer dos acciones: check (el equipo adivinó) y cruz (el participante dijo una palabra prohibida). Las dos acciones SHALL registrar el resultado y pasar a la próxima tarjeta. No SHALL existir una acción para pasar una tarjeta sin marcarla.

#### Scenario: Check
- **WHEN** el equipo adivina la palabra y el participante marca check
- **THEN** la tarjeta queda registrada como acierto y se muestra la próxima

#### Scenario: Cruz
- **WHEN** el participante dice una palabra prohibida y marca cruz
- **THEN** la tarjeta queda registrada como error y se muestra la próxima

### Requirement: Deshacer la última marca
El sistema SHALL permitir deshacer la última marca del turno en curso o del último turno jugado, volviendo a mostrar esa tarjeta sin resultado.

#### Scenario: Corregir un toque equivocado
- **WHEN** el participante marcó cruz por error y toca deshacer
- **THEN** se elimina esa cruz, el puntaje se recalcula y vuelve a mostrarse la misma tarjeta

### Requirement: Puntaje del Juego 3 por checks y cruces
El sistema SHALL calcular el puntaje de cada casa en el Juego 3 sumando 10 puntos por cada check y restando 10 puntos por cada cruz, aunque el resultado sea negativo. Los puntos por check y por cruz SHALL estar definidos en un único lugar del dominio.

#### Scenario: Puntaje de un turno
- **WHEN** Slytherin terminó su turno con 6 checks y 2 cruces
- **THEN** el puntaje de Slytherin en el Juego 3 es 40 y el marcador de casas lo refleja

#### Scenario: Puntaje negativo
- **WHEN** Gryffindor terminó su turno con 1 check y 3 cruces
- **THEN** el puntaje de Gryffindor en el Juego 3 es -20

### Requirement: Turnos persistidos
El sistema SHALL conservar el reparto, las marcas de cada turno y el momento en que vence el turno en curso ante un refresh del navegador, de modo que el reloj siga descontando desde el momento en que se inició el turno.

#### Scenario: Refresh en medio de un turno
- **WHEN** el turno de Ravenclaw lleva 1 minuto y la página se recarga
- **THEN** se muestra la misma tarjeta en curso, con las marcas previas intactas y alrededor de 2:00 en el reloj
