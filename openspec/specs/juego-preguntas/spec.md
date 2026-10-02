# juego-preguntas

## Purpose

Mecánica del Juego 1 (Preguntas y respuestas): banco fijo de preguntas que lee el anfitrión, timer de respuesta, marcado de las casas que acertaron y puntaje calculado a partir de los aciertos.

## Requirements

### Requirement: Banco fijo de preguntas del Juego 1
El sistema SHALL ofrecer en el Juego 1 un banco fijo de 20 preguntas en un orden fijo. Cada pregunta SHALL ser abierta (enunciado y respuesta correcta) o multiple choice (enunciado, 4 opciones identificadas de la A a la D y la opción correcta).

#### Scenario: Pregunta abierta
- **WHEN** la pregunta en curso es abierta
- **THEN** la pantalla muestra el enunciado y la respuesta correcta, sin opciones

#### Scenario: Pregunta multiple choice
- **WHEN** la pregunta en curso es multiple choice
- **THEN** la pantalla muestra el enunciado, las 4 opciones con su letra y destaca cuál es la correcta

### Requirement: Una pregunta por vez con navegación
El sistema SHALL mostrar una sola pregunta por vez, indicando su número sobre el total, y permitir al anfitrión pasar a la siguiente o volver a la anterior.

#### Scenario: Avanzar a la siguiente pregunta
- **WHEN** el anfitrión está en la pregunta 3 de 20 y elige pasar a la siguiente
- **THEN** la pantalla muestra la pregunta 4 de 20

#### Scenario: Límites del banco
- **WHEN** el anfitrión está en la primera pregunta
- **THEN** no puede retroceder a una pregunta anterior; y en la última pregunta no puede avanzar a una siguiente

### Requirement: Timer de respuesta por pregunta
El sistema SHALL mostrar junto a la pregunta en curso un timer de cuenta regresiva en segundos, con valor inicial de 10 segundos. El anfitrión SHALL poder subirlo o bajarlo de a 5 segundos antes de iniciarlo, con un mínimo de 5 segundos, e iniciarlo con un botón de play que lo hace descontar de a 1 segundo hasta llegar a 0.

#### Scenario: Valor por defecto
- **WHEN** el anfitrión entra al Juego 1 por primera vez
- **THEN** el timer muestra 10 segundos, detenido

#### Scenario: Ajustar antes de iniciar
- **WHEN** el timer está detenido en 10 segundos y el anfitrión toca el botón de subir dos veces y el de bajar una vez
- **THEN** el timer muestra 15 segundos

#### Scenario: Mínimo de 5 segundos
- **WHEN** el timer está detenido en 5 segundos
- **THEN** el botón de bajar no lo reduce más

#### Scenario: Cuenta regresiva
- **WHEN** el anfitrión toca play con el timer en 15 segundos
- **THEN** el timer descuenta de a 1 segundo hasta 0, se detiene ahí y se indica que el tiempo se cumplió; mientras descuenta, los botones de subir, bajar y play no tienen efecto

#### Scenario: Reiniciar al cambiar de pregunta
- **WHEN** el anfitrión pasa a otra pregunta con el timer en marcha o en 0
- **THEN** el timer se detiene y vuelve al último valor configurado

#### Scenario: Volver a iniciar
- **WHEN** el timer llegó a 0 y el anfitrión toca play
- **THEN** la cuenta regresiva arranca de nuevo desde el último valor configurado

### Requirement: Marcado de aciertos por casa
El sistema SHALL permitir al anfitrión marcar, para la pregunta en curso, qué casas respondieron correctamente (ninguna, una o varias), y desmarcar una casa para corregir.

#### Scenario: Varias casas aciertan
- **WHEN** el anfitrión marca a Gryffindor y a Ravenclaw como acertadas en una pregunta
- **THEN** ambas casas quedan marcadas en esa pregunta y las otras dos no

#### Scenario: Corregir un acierto marcado por error
- **WHEN** el anfitrión desmarca a una casa que había marcado como acertada en una pregunta
- **THEN** esa casa deja de contar como acertada en esa pregunta

### Requirement: Puntaje del Juego 1 calculado por aciertos
El sistema SHALL calcular el puntaje de cada casa en el Juego 1 como la cantidad de preguntas en que fue marcada como acertada multiplicada por los puntos por respuesta correcta del Juego 1 (10 puntos). El valor de puntos por respuesta correcta SHALL estar definido en un único lugar del dominio.

#### Scenario: Puntaje por aciertos
- **WHEN** Hufflepuff fue marcada como acertada en 3 preguntas
- **THEN** el puntaje de Hufflepuff en el Juego 1 es 30 y el marcador de casas lo refleja

#### Scenario: Desmarcar resta puntos
- **WHEN** el anfitrión desmarca un acierto de Hufflepuff que tenía 30 puntos en el Juego 1
- **THEN** el puntaje de Hufflepuff en el Juego 1 pasa a 20

### Requirement: Progreso del Juego 1 persistido
El sistema SHALL conservar la pregunta en curso y los aciertos marcados ante un refresh del navegador y al retroceder a otra etapa y volver al Juego 1.

#### Scenario: Volver al Juego 1
- **WHEN** el anfitrión retrocede desde el Juego 2 al Juego 1
- **THEN** la pantalla muestra la última pregunta en curso con los aciertos ya marcados en cada pregunta
