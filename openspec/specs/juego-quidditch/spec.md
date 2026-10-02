# juego-quidditch

## Purpose

Mecánica del Juego 2 (Quidditch): tres aros con puntaje fijo, registro y corrección de embocadas por casa en una pantalla única, y puntaje calculado a partir de las embocadas.

## Requirements

### Requirement: Aros con puntaje fijo
El sistema SHALL definir para el Juego 2 tres aros con puntaje fijo por embocada: chico (30 puntos), mediano (20 puntos) y grande (10 puntos). Los puntos de cada aro SHALL estar definidos en un único lugar del dominio.

#### Scenario: Puntos por aro
- **WHEN** la pantalla del Juego 2 muestra los aros
- **THEN** cada aro indica su tamaño y los puntos que suma: chico 30, mediano 20, grande 10

### Requirement: Pantalla única del Juego 2
El sistema SHALL mostrar todo el Juego 2 en una sola pantalla, sin timer, con una fila por cada una de las 4 casas y, en cada fila, un control por aro.

#### Scenario: Vista completa del juego
- **WHEN** la partida está en la etapa Juego 2
- **THEN** la pantalla muestra a la vez las 4 casas con sus 3 aros, la cantidad de embocadas de cada casa en cada aro y el subtotal de cada casa en el Juego 2

### Requirement: Registro de embocadas
El sistema SHALL permitir al anfitrión registrar con un solo toque una embocada de una casa en un aro.

#### Scenario: Embocada en el aro chico
- **WHEN** el anfitrión registra una embocada de Slytherin en el aro chico
- **THEN** el conteo de Slytherin en el aro chico sube en 1 y su puntaje del Juego 2 sube 30 puntos

#### Scenario: Varias embocadas de una casa
- **WHEN** Ravenclaw embocó 2 veces en el aro mediano y 1 vez en el aro grande
- **THEN** el subtotal de Ravenclaw en el Juego 2 es 50 y el marcador de casas lo refleja

### Requirement: Corrección de embocadas
El sistema SHALL permitir al anfitrión restar una embocada de una casa en un aro, sin que el conteo baje de 0.

#### Scenario: Restar una embocada registrada por error
- **WHEN** Gryffindor tiene 2 embocadas en el aro grande y el anfitrión resta una
- **THEN** el conteo de Gryffindor en el aro grande pasa a 1 y su puntaje del Juego 2 baja 10 puntos

#### Scenario: Conteo en 0
- **WHEN** Hufflepuff no tiene embocadas en el aro mediano
- **THEN** la acción de restar en ese aro no está disponible o no tiene efecto

### Requirement: Embocadas persistidas
El sistema SHALL conservar las embocadas registradas ante un refresh del navegador y al retroceder a otra etapa y volver al Juego 2.

#### Scenario: Volver al Juego 2
- **WHEN** el anfitrión retrocede desde el Juego 3 al Juego 2
- **THEN** la pantalla muestra las embocadas ya registradas de cada casa en cada aro
