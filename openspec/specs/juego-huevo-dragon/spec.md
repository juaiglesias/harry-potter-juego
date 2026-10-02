# juego-huevo-dragon

## Purpose

Mecánica del Juego 4 (Huevo de Dragón): orden en que cada casa encuentra su huevo, puntos por puesto, corrección del último puesto y puntaje calculado a partir del orden.

## Requirements

### Requirement: Puntos por puesto
El sistema SHALL asignar en el Juego 4 puntos según el puesto en que cada casa encuentra su huevo: 1.º 50 puntos, 2.º 30 puntos, 3.º 10 puntos y 4.º 0 puntos. Los puntos por puesto SHALL estar definidos en un único lugar del dominio.

#### Scenario: Puntos de los tres primeros
- **WHEN** Ravenclaw encuentra su huevo primero, Gryffindor segundo y Hufflepuff tercero
- **THEN** el Juego 4 suma 50 puntos a Ravenclaw, 30 a Gryffindor y 10 a Hufflepuff, y el marcador de casas lo refleja

#### Scenario: Cuarto puesto
- **WHEN** Slytherin es la última casa en encontrar su huevo
- **THEN** Slytherin queda en el 4.º puesto con 0 puntos en el Juego 4

### Requirement: Anotar el orden de llegada
El sistema SHALL permitir al anfitrión anotar con un toque que una casa encontró su huevo, asignándole el siguiente puesto libre. Una casa que ya tiene puesto no SHALL poder anotarse de nuevo.

#### Scenario: Primera casa en encontrar el huevo
- **WHEN** ninguna casa tiene puesto y el anfitrión anota a Slytherin
- **THEN** Slytherin queda en el 1.º puesto

#### Scenario: Casa ya anotada
- **WHEN** Slytherin ya tiene puesto
- **THEN** la acción de anotar a Slytherin no está disponible

### Requirement: Vista del orden y de las casas que buscan
El sistema SHALL mostrar en una sola pantalla el orden de llegada (puesto, casa y puntos) y, aparte, las casas que todavía no encontraron su huevo.

#### Scenario: Juego a mitad de camino
- **WHEN** dos casas ya encontraron su huevo
- **THEN** la pantalla muestra esas dos casas con su puesto y puntos, y las otras dos como pendientes de encontrar el huevo

### Requirement: Deshacer el último puesto
El sistema SHALL permitir deshacer el último puesto anotado, devolviendo esa casa a las pendientes.

#### Scenario: Corregir un toque equivocado
- **WHEN** el anfitrión anotó a Hufflepuff en 2.º puesto por error y toca deshacer
- **THEN** Hufflepuff vuelve a las casas pendientes, el 2.º puesto queda libre y el puntaje se recalcula

### Requirement: Orden persistido
El sistema SHALL conservar el orden anotado ante un refresh del navegador y al retroceder a otra etapa y volver al Juego 4.

#### Scenario: Volver al Juego 4
- **WHEN** el anfitrión pasa a Resultados y vuelve al Juego 4
- **THEN** la pantalla muestra el mismo orden de llegada ya anotado
