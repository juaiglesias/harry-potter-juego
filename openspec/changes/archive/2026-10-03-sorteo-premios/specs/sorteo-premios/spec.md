## ADDED Requirements

### Requirement: Premios por puesto de la casa
El sistema SHALL asignar a cada casa una cantidad de premios según su puesto en el ranking final: 5 premios para la 1.ª, 4 para la 2.ª, 3 para la 3.ª y 2 para la 4.ª. Ante empate de puntaje, el puesto de cada casa es el que tiene en el orden del podio.

#### Scenario: Cantidad de premios según el puesto
- **WHEN** la partida termina con Gryffindor 1.ª, Ravenclaw 2.ª, Slytherin 3.ª y Hufflepuff 4.ª
- **THEN** se sortean 5 premios en Gryffindor, 4 en Ravenclaw, 3 en Slytherin y 2 en Hufflepuff

#### Scenario: Casas empatadas
- **WHEN** dos casas terminan con el mismo puntaje
- **THEN** cada una recibe los premios del puesto que ocupa en el podio (por ejemplo, la 1.ª recibe 5 y la 2.ª recibe 4)

### Requirement: Orden de las tandas de sorteo
El sistema SHALL sortear los premios en tandas, una por casa, empezando por la casa 4.ª y siguiendo por la 3.ª, la 2.ª y la 1.ª. Después de las 4 casas SHALL haber un sorteo final de 1 premio entre todos los invitados.

#### Scenario: Primera tanda
- **WHEN** el anfitrión entra a la etapa Premios sin premios sorteados
- **THEN** la tanda en curso es la de la casa que quedó 4.ª, con sus 2 premios por sortear

#### Scenario: Paso a la tanda siguiente
- **WHEN** se sortea el último premio de la casa 4.ª
- **THEN** la tanda en curso pasa a ser la de la casa 3.ª

#### Scenario: Sorteo final
- **WHEN** se sortearon los premios de las 4 casas
- **THEN** la tanda en curso es el sorteo final, con 1 premio entre todos los invitados

### Requirement: Sorteo de un premio
El sistema SHALL sortear de a un premio por acción del anfitrión, eligiendo al azar entre los invitados elegibles de la tanda en curso, y SHALL mostrar el nombre del ganador en grande con el color de su casa.

#### Scenario: Sortear un premio de casa
- **WHEN** el anfitrión toca "Sortear" durante la tanda de Slytherin
- **THEN** sale un invitado de Slytherin al azar y su nombre se muestra como ganador de ese premio

#### Scenario: Sortear el premio final
- **WHEN** el anfitrión toca "Sortear" durante el sorteo final
- **THEN** sale un invitado al azar entre los de todas las casas que todavía no ganaron

### Requirement: Sin premios repetidos
El sistema SHALL excluir de cada sorteo a los invitados que ya ganaron un premio, en cualquier tanda, incluido el sorteo final.

#### Scenario: Ganador de casa en el sorteo final
- **WHEN** un invitado ganó un premio en el sorteo de su casa
- **THEN** no puede salir en el sorteo final

#### Scenario: Dos premios de la misma casa
- **WHEN** se sortea el segundo premio de una casa
- **THEN** el ganador del primero no puede volver a salir

### Requirement: Volver a sortear el último premio
El sistema SHALL permitir volver a sortear el último premio sorteado. El nuevo ganador se elige entre los elegibles de esa tanda sin contar al que se reemplaza, y el reemplazado vuelve al bombo para los sorteos siguientes.

#### Scenario: Re-sorteo por ausente
- **WHEN** el anfitrión toca "Volver a sortear" con Ana como último ganador de Gryffindor
- **THEN** sale otro invitado de Gryffindor en lugar de Ana, y Ana puede salir en los premios que quedan de Gryffindor o en el sorteo final

#### Scenario: Sin otro candidato
- **WHEN** el último ganador es el único elegible que quedaba en su tanda
- **THEN** la acción de volver a sortear no está disponible

### Requirement: Casa sin invitados suficientes
El sistema SHALL dar por terminada una tanda cuando ya no quedan invitados elegibles en ella, aunque falten premios por sortear, y SHALL pasar a la tanda siguiente. Si el sorteo final no tiene elegibles, el sorteo de premios termina.

#### Scenario: Casa con menos invitados que premios
- **WHEN** la casa 1.ª tiene 3 invitados y le corresponden 5 premios
- **THEN** se sortean 3 premios en esa casa y la tanda en curso pasa al sorteo final

### Requirement: Listado de ganadores
El sistema SHALL mostrar en la etapa Premios los ganadores ya sorteados agrupados por tanda, en el orden en que salieron, y SHALL conservarlos al volver a la etapa desde otra o al recargar la página.

#### Scenario: Volver a Premios desde Resultados
- **WHEN** el anfitrión sorteó premios, vuelve a Resultados con el stepper y después avanza a Premios
- **THEN** los ganadores ya sorteados siguen mostrándose y el sorteo continúa desde la tanda en curso
